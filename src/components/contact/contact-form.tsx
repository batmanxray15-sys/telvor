"use client";

import { useId, useRef, useState } from "react";
import { Check, Copy, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FieldName = "name" | "email" | "message";
type Errors = Partial<Record<FieldName, string>>;
type Status = { kind: "success" | "error"; message: string } | null;

const fields: { name: FieldName; label: string; hint?: string; type: string }[] = [
  { name: "name", label: "Name", type: "text" },
  {
    name: "email",
    label: "Email",
    hint: "So a reply has somewhere to go.",
    type: "email",
  },
  {
    name: "message",
    label: "What do you need built?",
    hint: "Goals, scope, constraints — a few sentences is enough.",
    type: "textarea",
  },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Record<FieldName, string>): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Enter your name (at least 2 characters).";
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address, for example name@domain.com.";
  }

  if (values.message.trim().length < 20) {
    errors.message = "Add a little more detail — at least 20 characters.";
  }

  return errors;
}

/**
 * Contact form with no delivery backend.
 *
 * Nothing is sent anywhere and no success message claims otherwise: the form
 * validates input and helps you copy a clean, ready-to-send message. Automatic
 * delivery is intentionally reported as not configured.
 */
export function ContactForm() {
  const uid = useId();
  const fieldId = (name: FieldName) => `${uid}-${name}`;
  const errorId = (name: FieldName) => `${uid}-${name}-error`;
  const hintId = (name: FieldName) => `${uid}-${name}-hint`;

  const [values, setValues] = useState<Record<FieldName, string>>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [prepared, setPrepared] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>(null);
  const [isCopying, setIsCopying] = useState(false);

  const summaryRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const errorEntries = Object.entries(errors) as [FieldName, string][];

  const updateValue = (name: FieldName, value: string) => {
    setValues((previous) => ({ ...previous, [name]: value }));
    // Clear this field's error as soon as the visitor starts correcting it.
    setErrors((previous) => {
      if (!previous[name]) return previous;
      const next = { ...previous };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setPrepared(null);
      setStatus({
        kind: "error",
        message: "Your message is not ready yet — please fix the highlighted fields.",
      });
      // Move focus to the error summary so the problems are announced.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    const composed = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      "",
      values.message.trim(),
    ].join("\n");

    setPrepared(composed);
    setStatus(null);
  };

  const copyMessage = async () => {
    if (!prepared) return;
    setIsCopying(true);

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }
      await navigator.clipboard.writeText(prepared);
      setStatus({
        kind: "success",
        message:
          "Message copied to your clipboard. Paste it into your email client to send it.",
      });
    } catch {
      setStatus({
        kind: "error",
        message:
          "Your browser blocked clipboard access. Select the text below and copy it manually — nothing has been sent.",
      });
    } finally {
      setIsCopying(false);
    }
  };

  const editDetails = () => {
    setPrepared(null);
    setStatus(null);
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>("input")?.focus());
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-7">
      <p className="flex items-start gap-2.5 rounded-xl border border-cyan/20 bg-cyan/[0.06] p-4 text-sm leading-relaxed text-white/70">
        <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan" />
        <span>
          <span className="font-semibold text-ink">Not connected to a delivery service.</span>{" "}
          This form does not send email — no backend or email provider is
          configured yet. It validates your details and prepares a message you
          can copy and send yourself.
        </span>
      </p>

      {errorEntries.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mt-4 rounded-xl border border-red-400/30 bg-red-500/[0.08] p-4"
        >
          <p className="text-sm font-semibold text-red-200">
            {errorEntries.length === 1
              ? "One field needs attention:"
              : `${errorEntries.length} fields need attention:`}
          </p>
          <ul className="mt-2 space-y-1">
            {errorEntries.map(([name, message]) => (
              <li key={name}>
                <a
                  href={`#${fieldId(name)}`}
                  className="text-sm text-red-200 underline decoration-red-300/40 underline-offset-2 hover:decoration-red-200"
                >
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {prepared ? (
        <div className="mt-5">
          <label
            htmlFor={`${uid}-prepared`}
            className="text-sm font-medium text-ink"
          >
            Your message
          </label>
          <p
            id={`${uid}-prepared-hint`}
            className="mt-1 text-xs leading-relaxed text-white/50"
          >
            Nothing has been sent. Copy this text, or edit your details.
          </p>
          <textarea
            id={`${uid}-prepared`}
            aria-describedby={`${uid}-prepared-hint`}
            readOnly
            rows={8}
            value={prepared}
            onFocus={(event) => event.currentTarget.select()}
            className="mt-2 w-full resize-y rounded-xl border border-white/12 bg-obsidian/70 p-3 font-sans text-sm leading-relaxed text-white/80"
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button onClick={copyMessage} disabled={isCopying} size="lg">
              <Copy aria-hidden="true" className="size-4" />
              {isCopying ? "Copying…" : "Copy message"}
            </Button>
            <Button variant="secondary" size="lg" onClick={editDetails}>
              Edit details
            </Button>
          </div>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-5">
          <div className="space-y-5">
            {fields.map((field) => {
              const invalid = Boolean(errors[field.name]);
              const describedBy = [
                field.hint ? hintId(field.name) : null,
                invalid ? errorId(field.name) : null,
              ]
                .filter(Boolean)
                .join(" ");

              const commonProps = {
                id: fieldId(field.name),
                name: field.name,
                value: values[field.name],
                "aria-invalid": invalid || undefined,
                "aria-describedby": describedBy || undefined,
                className: cn(
                  "mt-2 w-full rounded-xl border bg-obsidian/70 px-3.5 py-2.5 text-sm text-white/85 placeholder:text-white/55 transition-colors duration-200",
                  invalid
                    ? "border-red-400/60"
                    : "border-white/12 hover:border-white/20",
                ),
              };

              return (
                <div key={field.name}>
                  <label
                    htmlFor={fieldId(field.name)}
                    className="text-sm font-medium text-ink"
                  >
                    {field.label}
                    <span aria-hidden="true" className="ml-1 text-cyan">
                      *
                    </span>
                  </label>

                  {field.hint && (
                    <p
                      id={hintId(field.name)}
                      className="mt-1 text-xs leading-relaxed text-white/55"
                    >
                      {field.hint}
                    </p>
                  )}

                  {field.type === "textarea" ? (
                    <textarea
                      {...commonProps}
                      rows={6}
                      required
                      onChange={(event) =>
                        updateValue(field.name, event.currentTarget.value)
                      }
                      className={cn(commonProps.className, "resize-y")}
                    />
                  ) : (
                    <input
                      {...commonProps}
                      type={field.type}
                      autoComplete={field.name === "name" ? "name" : "email"}
                      required
                      onChange={(event) =>
                        updateValue(field.name, event.currentTarget.value)
                      }
                    />
                  )}

                  {invalid && (
                    <p
                      id={errorId(field.name)}
                      className="mt-1.5 text-xs font-medium text-red-300"
                    >
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button type="submit" size="lg">
              Prepare message
            </Button>
            <p className="text-xs leading-relaxed text-white/55">
              Required fields are marked with{" "}
              <span aria-hidden="true" className="text-cyan">
                *
              </span>
              . Nothing is transmitted when you submit.
            </p>
          </div>
        </form>
      )}

      <div aria-live="polite" role="status" className="mt-4">
        {status && (
          <p
            className={cn(
              "flex items-start gap-2 rounded-xl border p-3.5 text-sm leading-relaxed",
              status.kind === "success"
                ? "border-cyan/25 bg-cyan/[0.07] text-white/80"
                : "border-red-400/30 bg-red-500/[0.08] text-red-100",
            )}
          >
            {status.kind === "success" ? (
              <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-cyan" />
            ) : (
              <TriangleAlert
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-red-300"
              />
            )}
            {status.message}
          </p>
        )}
      </div>
    </div>
  );
}
