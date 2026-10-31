"use client";

import { useState } from "react";
import { ArrowRight, Check } from "../Icons";
import { Field } from "./ContactForm";

type Status = "idle" | "sending" | "sent" | "error";
type Kind = "new" | "reset";

/** Staff email request: new mailbox or password reset. Posts to /api/email-request. */
export function EmailRequestForm({ domain, needsCode, sendTo }: { domain: string; needsCode: boolean; sendTo: string }) {
  const [kind, setKind] = useState<Kind>("new");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = { ...Object.fromEntries(new FormData(form).entries()), type: kind };
    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("/api/email-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("sent");
        form.reset();
      } else {
        if (json.errors) {
          setErrors(json.errors);
          form.querySelector<HTMLElement>(`[name="${Object.keys(json.errors)[0]}"]`)?.focus();
        }
        setMessage(json.error ?? "");
        setStatus(json.errors ? "idle" : "error");
      }
    } catch {
      setMessage("");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="fade-up" role="status">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-green text-white">
          <Check size={24} />
        </span>
        <h2 className="mt-6 text-[26px] font-semibold">Request received</h2>
        <p className="mt-3 max-w-lg text-[16px] leading-relaxed text-ink-2">
          {kind === "new" ? "The new account" : "The password reset"} will be set up and the details sent to <strong>{sendTo}</strong>.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-ghost mt-8">
          Make another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <fieldset>
        <legend className="font-display text-[15px] font-semibold text-ink">What do you need?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {(
            [
              ["new", "New email account", `Create an @${domain} mailbox for an employee`],
              ["reset", "Password reset", "An employee forgot their password"],
            ] as [Kind, string, string][]
          ).map(([k, title, sub]) => (
            <label
              key={k}
              className={`flex cursor-pointer gap-3 rounded-md border p-4 transition-colors ${
                kind === k ? "border-navy bg-accent-50" : "border-line-2 hover:border-ink/40"
              }`}
            >
              <input type="radio" name="kindChoice" value={k} checked={kind === k} onChange={() => setKind(k)} className="mt-1 accent-[#0d2b45]" />
              <span>
                <span className="block font-semibold text-ink">{title}</span>
                <span className="block text-[14px] text-muted">{sub}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-5">
        <p className="font-display text-[15px] font-semibold text-ink">Employee</p>
        <Field name="fullName" label="Employee's full name" required error={errors.fullName} />
        {kind === "new" ? (
          <>
            <div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
                <div className="min-w-0 flex-1">
                  <Field name="username" label="Email name, e.g. john.smith" required error={undefined} />
                </div>
                <span className="flex items-center rounded-lg bg-tint px-4 py-2 text-[15px] font-medium text-ink-2 ring-1 ring-line-2 sm:py-0">@{domain}</span>
              </div>
              {errors.username && <p className="mt-2 pl-1 text-[13px] text-red-600">{errors.username}</p>}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field name="jobTitle" label="Job title / department" />
              <Field name="startDate" label="Needed by (date)" />
            </div>
          </>
        ) : (
          <Field name="existingEmail" label={`Their @${domain} email address`} type="email" required error={errors.existingEmail} />
        )}
        <Field name="recoveryEmail" label="Personal recovery email (optional)" type="email" error={errors.recoveryEmail} />
      </div>

      <div className="space-y-5 border-t border-line pt-6">
        <p className="font-display text-[15px] font-semibold text-ink">Requested by</p>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field name="requestedBy" label="Your name" required autoComplete="name" error={errors.requestedBy} />
          <Field name="requesterEmail" label="Your email" type="email" required autoComplete="email" error={errors.requesterEmail} />
        </div>
        <Field name="notes" label="Anything else? (optional)" textarea />
        {needsCode && <Field name="code" label="Access code" type="password" required error={errors.code} />}
      </div>

      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-md bg-red-50 px-5 py-4 text-[14.5px] text-red-700">
          {message || "Something went wrong."} Please try again.
        </p>
      )}

      <div className="flex justify-end pt-2">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary h-14 px-8 disabled:opacity-60">
          {status === "sending" ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Sending…
            </>
          ) : (
            <>
              Send request <ArrowRight />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
