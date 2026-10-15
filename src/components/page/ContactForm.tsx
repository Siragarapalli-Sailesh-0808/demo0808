"use client";

import { useState } from "react";
import { contactInterests } from "@/lib/content-pages";
import { site } from "@/lib/site";
import { ArrowRight, Check } from "../Icons";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [interest, setInterest] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    payload.interest = interest;

    // Quick client-side checks (the server validates again)
    const errs: Record<string, string> = {};
    if (String(payload.name ?? "").trim().length < 2) errs.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(payload.email ?? "").trim())) errs.email = "Please enter a valid email address.";
    if (String(payload.message ?? "").trim().length < 10) errs.message = "Please tell us a little more (at least 10 characters).";
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("sent");
        form.reset();
        setInterest("");
      } else {
        if (json.errors) setErrors(json.errors);
        setMessage(json.error ?? "");
        setStatus("error");
      }
    } catch {
      setMessage("");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="fade-up flex min-h-[520px] flex-col items-start justify-center" role="status">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-navy text-white shadow-lift">
          <Check size={28} />
        </span>
        <h2 className="mt-8 text-[clamp(1.8rem,1.4rem+1.4vw,2.6rem)] font-bold">
          Thank you — <span className="accent-word">message received.</span>
        </h2>
        <p className="mt-4 max-w-md text-[16.5px] leading-relaxed text-ink-2">
          A member of our team will get back to you within one business day. If it&apos;s urgent, call us on {site.phone}.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-ghost mt-8">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <fieldset>
        <legend className="font-display text-[15px] font-semibold text-ink">What can we help with?</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {contactInterests.map((i) => {
            const on = interest === i;
            return (
              <button
                key={i}
                type="button"
                aria-pressed={on}
                onClick={() => setInterest(on ? "" : i)}
                className={`rounded-full px-4 py-2 text-[14px] font-medium transition-[background-color,color,box-shadow] duration-300 ${
                  on ? "bg-navy text-white" : "bg-white text-ink-2 ring-1 ring-line-2 hover:text-accent hover:ring-accent"
                }`}
              >
                {i}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Full name" required autoComplete="name" error={errors.name} />
        <Field name="email" label="Work email" type="email" required autoComplete="email" error={errors.email} />
        <Field name="company" label="Company" autoComplete="organization" />
        <Field name="phone" label="Phone" type="tel" autoComplete="tel" />
      </div>
      <Field name="message" label="Tell us about your project or role" required textarea error={errors.message} />

      {/* Honeypot — hidden from people, tempting to bots */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-lg bg-red-50 px-5 py-4 text-[14.5px] text-red-700">
          {message || "Something went wrong."} Please try again, or email us at{" "}
          <a href={`mailto:${site.email}`} className="font-semibold underline">
            {site.email}
          </a>
          .
        </p>
      )}

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[13px] leading-relaxed text-muted">
          We&apos;ll only use your details to respond to this enquiry. See our{" "}
          <a href="/privacy-policy" className="underline hover:text-ink">
            privacy policy
          </a>
          .
        </p>
        <button type="submit" disabled={status === "sending"} className="btn btn-primary h-14 px-8 disabled:opacity-60">
          {status === "sending" ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Sending…
            </>
          ) : (
            <>
              Send message <ArrowRight />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export function Field({
  name,
  label,
  type = "text",
  required,
  textarea,
  autoComplete,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  const cls = `peer w-full rounded-lg bg-white px-5 pb-3 pt-7 text-[16px] text-ink outline-none ring-1 transition-[box-shadow] duration-300 placeholder:text-transparent focus:ring-2 focus:ring-accent ${
    error ? "ring-red-400" : "ring-line-2 hover:ring-ink/40"
  }`;
  const id = `f-${name}`;
  return (
    <div className="relative">
      {textarea ? (
        <textarea id={id} name={name} rows={5} required={required} placeholder={label} aria-invalid={!!error} aria-describedby={error ? `${id}-e` : undefined} className={`${cls} resize-y`} />
      ) : (
        <input id={id} name={name} type={type} required={required} placeholder={label} autoComplete={autoComplete} aria-invalid={!!error} aria-describedby={error ? `${id}-e` : undefined} className={cls} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-5 top-2.5 text-[12px] font-medium text-muted transition-all duration-300 peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-[15.5px] peer-focus:top-2.5 peer-focus:text-[12px] peer-focus:text-accent"
      >
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {error && (
        <p id={`${id}-e`} className="mt-2 pl-1 text-[13px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
