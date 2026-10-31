"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const POSTER = "/images/telvor-hero-poster.webp";

/** 1920×1080, 5.7 MB — the same footage, re-encoded without the unused audio track. */
const WIDE_SOURCE = "/videos/telvor-hero.mp4";
/** 1280×720, 2.5 MB — phones never need 1080p pixels for a 390 px viewport. */
const COMPACT_SOURCE = "/videos/telvor-hero-720.mp4";

type HeroVideoProps = {
  /** Scroll-linked travel for the footage and poster together. */
  y: MotionValue<number>;
  /** Scroll-linked scale for the same layer. */
  scale: MotionValue<number>;
  /** Scroll-linked darkening as the hero leaves the viewport. */
  veil: MotionValue<number>;
  className?: string;
};

/**
 * Cinematic hero backdrop: one video, one still, three gradient scrims.
 *
 * Every rule below exists because of a bug that was actually observed:
 *
 * 1. **No `opacity: 0` base state on the video.** An earlier version faded it in
 *    from `opacity: 0` on a `playing` event. If that event was missed or the tree
 *    re-mounted, the video stayed invisible for the whole visit. The reveal is
 *    now a CSS keyframe whose base style is opaque, so the worst case is "no
 *    fade", never "no video".
 *
 * 2. **No overlay may be rendered with an unset `opacity`.** The scroll-darkening
 *    layer used to be `style={reduceMotion ? undefined : { opacity: veil }}`.
 *    `undefined` means *no inline style*, so the element fell back to the default
 *    `opacity: 1` — a full-bleed solid obsidian rectangle covering the whole hero.
 *    Under `prefers-reduced-motion` that hid both the video and the poster, which
 *    is exactly the "video is not visible" symptom. It is now not rendered at all
 *    when reduced motion is on, and when rendered its opacity is always bound.
 *
 * 3. **No negative z-index.** The media layer used `-z-20`. A negative-z element
 *    paints behind its stacking context's background, so any ancestor that picks
 *    up a background — or any browser that handles isolated/transformed ancestors
 *    differently (iOS Safari is notorious here) — can hide the footage entirely.
 *    The media layer now sits at z-index `auto` and the content is lifted above it
 *    with `z-10`, which is unconditional.
 *
 * 4. **The poster is a real element, not just the `poster` attribute.** A `<video>`
 *    with no source does not reliably paint its poster, and the no-JS, data-saver
 *    and reduced-motion paths all leave the source unset. The `<Image>` underneath
 *    is what guarantees a visible still in every one of those cases.
 *
 * 5. **Source selection happens in an effect, not during render** — guessing the
 *    viewport server-side would send 1080p to phones, and holding it in state
 *    would mean `setState` in an effect. The poster covers the gap, and a failed
 *    source falls back to the other encode before giving up on the still.
 */
export function HeroVideo({ y, scale, veil, className }: HeroVideoProps) {
  const reduceMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    /*
     * Playback state is written to `data-playback` rather than React state: it
     * changes a handful of times at most, never per frame, and it turns an
     * invisible failure ("looks static") into something inspectable in the
     * elements panel: playing | blocked | failed | reduced-motion.
     */
    const mark = (state: string) => {
      video.dataset.playback = state;
    };

    const teardownMedia = () => {
      video.pause();
      video.removeAttribute("src");
      video.load();
      mark("reduced-motion");
    };

    if (reduceMotion) {
      teardownMedia();
      return;
    }

    // Data saver is a request to spend less bandwidth, not a request for a dead
    // hero: pick the smaller encode and keep it playing.
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    const compact = window.matchMedia("(max-width: 767px)").matches;
    const order = connection?.saveData || compact
      ? [COMPACT_SOURCE, WIDE_SOURCE]
      : [WIDE_SOURCE, COMPACT_SOURCE];

    let sourceIndex = 0;
    let disposed = false;
    let watchdog: ReturnType<typeof setTimeout> | undefined;

    const clearWatchdog = () => {
      if (watchdog !== undefined) clearTimeout(watchdog);
      watchdog = undefined;
    };

    // Loading a media element is asynchronous and can fail in ways that never
    // surface an `error` event: a stalled stream, a proxy that answers 200 with
    // the wrong body, a decoder that never produces a frame. In every one of
    // those the element reports `paused === false` with `readyState === 0`, so
    // "not paused" is not evidence of playback. The only honest check is whether
    // frames are arriving: readyState >= 2 and a clock that moves.
    const isActuallyPlaying = () => video.readyState >= 2 && !video.paused;

    const tryNextSource = () => {
      sourceIndex += 1;
      if (sourceIndex >= order.length) {
        mark("failed");
        console.warn(
          "[TELVOR] hero video could not be decoded; showing the poster instead.",
          video.error ? `MediaError code ${video.error.code}` : "no error event fired",
        );
        return false;
      }
      attach(order[sourceIndex]);
      return true;
    };

    const verify = () => {
      if (disposed) return;
      if (isActuallyPlaying()) {
        mark("playing");
        clearWatchdog();
        return;
      }
      if (!tryNextSource()) clearWatchdog();
    };

    // 1. Ask for playback straight away. Waiting for `canplay` means a stream
    //    that never reaches that state never gets a play request at all.
    // 2. Set `muted` as a *property* before every attempt. Muted media is exempt
    //    from autoplay policy; an unmuted element is refused outright, and the
    //    attribute alone does not always survive to the media state machine.
    const attemptPlay = () => {
      if (disposed || !video.currentSrc) return;
      video.muted = true;
      video.defaultMuted = true;

      const promise = video.play();
      if (promise) {
        promise
          .then(() => {
            if (!disposed && isActuallyPlaying()) mark("playing");
          })
          .catch((error: unknown) => {
            if (disposed) return;
            const reason = error instanceof DOMException ? error.name : "Error";
            mark(reason === "NotAllowedError" ? "blocked" : "failed");
            // Never swallow this: the rejection name is the whole diagnosis.
            console.warn(`[TELVOR] hero video play() rejected: ${reason}`, error);
            if (reason === "NotAllowedError") armGestureRetry();
          });
      }

      // Safety net for the silent case: play() pending forever on a stream that
      // never delivers a frame.
      if (watchdog === undefined) watchdog = setTimeout(verify, 4000);
    };

    const attach = (src: string) => {
      video.src = src;
      video.load();
      attemptPlay();
    };

    // Gesture retry stays armed until playback genuinely starts — a one-shot
    // listener is lost the moment the first interaction happens to be the one
    // that fails.
    const gestures = ["pointerdown", "touchstart", "keydown", "wheel"] as const;
    const onGesture = () => {
      if (disposed) return;
      if (isActuallyPlaying()) return disarmGestureRetry();
      attemptPlay();
    };
    let gestureArmed = false;
    const armGestureRetry = () => {
      if (gestureArmed || disposed) return;
      gestureArmed = true;
      gestures.forEach((type) =>
        window.addEventListener(type, onGesture, { passive: true }),
      );
    };
    const disarmGestureRetry = () => {
      if (!gestureArmed) return;
      gestureArmed = false;
      gestures.forEach((type) => window.removeEventListener(type, onGesture));
    };

    const onError = () => {
      if (disposed) return;
      console.warn("[TELVOR] hero video source failed:", video.currentSrc);
      tryNextSource();
    };

    // Media events that mean "there is data now — try again". Any of these may
    // arrive before or after the initial play() attempt.
    const retryEvents = ["loadeddata", "canplay", "canplaythrough"] as const;
    const onReady = () => {
      if (disposed) return;
      if (!isActuallyPlaying()) attemptPlay();
      else {
        mark("playing");
        disarmGestureRetry();
      }
    };

    // Returning to the tab or unlocking a phone can leave a paused element.
    const onVisibility = () => {
      if (document.visibilityState === "visible") attemptPlay();
    };

    video.addEventListener("error", onError);
    retryEvents.forEach((type) => video.addEventListener(type, onReady));
    document.addEventListener("visibilitychange", onVisibility);
    armGestureRetry();

    attach(order[0]);

    // Stop decoding once the hero is off-screen — this is a 7.8 s loop that sits
    // behind the fold for most of a visit, and a paused decoder costs nothing.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) attemptPlay();
        else video.pause();
      },
      { threshold: 0.01 },
    );
    observer.observe(video);

    return () => {
      disposed = true;
      clearWatchdog();
      disarmGestureRetry();
      video.removeEventListener("error", onError);
      retryEvents.forEach((type) => video.removeEventListener(type, onReady));
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
      video.pause();
    };
  }, [reduceMotion]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden bg-obsidian",
        className,
      )}
    >
      {/* Overscanned by 8% so the parallax travel can never expose an edge. */}
      <motion.div
        style={reduceMotion ? undefined : { y, scale }}
        className="absolute inset-[-8%]"
      >
        <Image
          src={POSTER}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />

        {/*
          No `opacity` or `transform` in the base classes: the reveal comes from
          `.animate-media-in`, which animates *from* transparent. If that animation
          never runs, this renders fully visible.
        */}
        <video
          ref={videoRef}
          poster={POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          tabIndex={-1}
          data-playback="idle"
          className="animate-media-in absolute inset-0 size-full object-cover object-center"
        />
      </motion.div>

      {/*
        Readability scrims. Phones get a heavier vertical wash because cropping a
        16:9 frame to a tall viewport leaves the brightest structures directly
        behind the copy; desktop can afford a lighter wash plus a left-to-right
        one that protects the text column and lets the right side read clean.
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/55 via-obsidian/75 to-obsidian sm:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-b from-obsidian/70 via-obsidian/40 to-obsidian sm:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-obsidian/85 via-obsidian/25 to-transparent sm:block" />

      {/*
        Scroll-away darkening: the hero sinks into black instead of scrolling off
        flat. Rendered only when scroll-linked motion is allowed — rendering it
        with an unbound opacity is what blacked out the hero under reduced motion.
      */}
      {!reduceMotion && (
        <motion.div
          style={{ opacity: veil }}
          className="absolute inset-0 bg-obsidian"
        />
      )}

      {/*
        Entrance veil — the "entering the universe" beat. Pure CSS and timed from
        load rather than from playback, so a slow connection reveals the poster
        instead of holding a black screen, and it still lifts if JavaScript never
        runs. The reduced-motion rule in globals.css collapses it to its end state.
      */}
      <div className="absolute inset-0 animate-veil-in bg-obsidian" />
    </div>
  );
}
