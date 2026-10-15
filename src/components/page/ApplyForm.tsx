"use client";

import { useRef, useState } from "react";
import { site } from "@/lib/site";
import { ArrowRight, Check } from "../Icons";
import { Field } from "./ContactForm";

type Status = "idle" | "sending" | "sent" | "error";

export const CV_MAX_MB = 4;
const CV_TYPES = [".pdf", ".doc", ".docx"];

/** Job application with résumé upload. Posts multipart data to /api/apply. */
export function ApplyForm({ job }: { job?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function checkFile(f: File | undefined) {
    if (!f) return "Please attach your résumé.";
    if (!CV_TYPES.some((ext) => f.name.toLowerCase().endsWith(ext))) return "Please upload a PDF or Word document.";
    if (f.size > CV_MAX_MB * 1024 * 1024) return `Please keep your résumé under ${CV_MAX_MB} MB.`;
    return "";
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const errs: Record<string, string> = {};
    if (String(fd.get("name") ?? "").trim().length < 2) errs.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(fd.get("email") ?? "").trim())) errs.email = "Please enter a valid email address.";
    const fileErr = checkFile(fileRef.current?.files?.[0]);
    if (fileErr) errs.cv = fileErr;
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/apply", { method: "POST", body: fd });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("sent");
        form.reset();
        setFileName("");
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
      <div className="fade-up flex min-h-[360px] flex-col items-start justify-center" role="status">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-navy text-white shadow-lift">
          <Check size={28} />
        </span>
        <h2 className="mt-8 text-[clamp(1.6rem,1.3rem+1.2vw,2.3rem)] font-bold">
          Thank you — <span className="accent-word">application received.</span>
        </h2>
        <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink-2">
          Our recruiting team reviews every application. If your experience matches an opening, we&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate encType="multipart/form-data" className="space-y-5">
      <input type="hidden" name="job" value={job ?? ""} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Full name" required autoComplete="name" error={errors.name} />
        <Field name="email" label="Email" type="email" required autoComplete="email" error={errors.email} />
        <Field name="phone" label="Phone" type="tel" autoComplete="tel" />
        <Field name="location" label="City, State" autoComplete="address-level2" />
      </div>
      {!job && <Field name="role" label="Role or skills you're interested in" />}
      <Field name="message" label="Anything else we should know? (optional)" textarea />

      <div>
        <label
          htmlFor="f-cv"
          className={`flex cursor-pointer items-center gap-4 rounded-lg border-2 border-dashed bg-white px-5 py-5 transition-colors duration-300 hover:border-accent focus-within:border-accent ${
            errors.cv ? "border-red-400" : "border-line-2"
          }`}
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 16V4m0 0-4 4m4-4 4 4M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-[15.5px] font-semibold text-ink">
              {fileName || "Upload your résumé"} <span className="text-accent">*</span>
            </span>
            <span className="block text-[13px] text-muted">PDF or Word, up to {CV_MAX_MB} MB</span>
          </span>
          <input
            ref={fileRef}
            id="f-cv"
            name="cv"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            aria-invalid={!!errors.cv}
            aria-describedby={errors.cv ? "f-cv-e" : undefined}
            onChange={(e) => {
              const f = e.target.files?.[0];
              setFileName(f?.name ?? "");
              setErrors((x) => ({ ...x, cv: f ? checkFile(f) : "" }));
            }}
          />
        </label>
        {errors.cv && (
          <p id="f-cv-e" className="mt-2 pl-1 text-[13px] text-red-600">
            {errors.cv}
          </p>
        )}
      </div>

      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-lg bg-red-50 px-5 py-4 text-[14.5px] text-red-700">
          {message || "Something went wrong."} Please try again, or email your résumé to{" "}
          <a href={`mailto:${site.email}`} className="font-semibold underline">
            {site.email}
          </a>
          .
        </p>
      )}

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[13px] leading-relaxed text-muted">
          We use your details only to consider you for roles. See our{" "}
          <a href="/privacy-policy" className="underline hover:text-ink">
            privacy policy
          </a>
          . {site.legalName} is an equal opportunity employer.
        </p>
        <button type="submit" disabled={status === "sending"} className="btn btn-primary h-14 px-8 disabled:opacity-60">
          {status === "sending" ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Sending…
            </>
          ) : (
            <>
              Submit application <ArrowRight />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
