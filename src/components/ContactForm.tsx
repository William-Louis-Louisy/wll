"use client";
import {
  CONTACT_DEFAULTS,
  buildContactSchema,
  type ContactInput,
  type ContactOutput,
} from "@/lib/contactFormSchema";
import { motion } from "framer-motion";
import RotateWords from "./RotateWords";
import { cn } from "@/utils/classnames";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { formDeploy } from "@/lib/motionVariants";

const words = ["mission", "contract", "project"];

type ApiStatus =
  | { state: "idle" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

export default function ContactForm() {
  const t = useTranslations("Contact");
  const schema = useMemo(() => buildContactSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset,
    watch,
  } = useForm<ContactInput>({
    resolver: zodResolver(schema),
    defaultValues: CONTACT_DEFAULTS,
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "firstError",
    shouldFocusError: true,
  });

  const subject = watch("subject");
  const message = watch("message");

  const [apiStatus, setApiStatus] = useState<ApiStatus>({ state: "idle" });
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const onSubmit: SubmitHandler<ContactInput> = async (values) => {
    setApiStatus({ state: "idle" });

    if (values.website && values.website.trim().length > 0) {
      reset(CONTACT_DEFAULTS);
      setApiStatus({
        state: "success",
        message: t("success") || "Your message has been sent. Thank you !",
      });
      return;
    }
    const parsed: ContactOutput = schema.parse(values);
    const baseUrl = process.env.API_URL;
    if (!baseUrl) {
      setApiStatus({
        state: "error",
        message: t("errors.missingConfig"),
      });
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(`${baseUrl}/contact/send-mail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: parsed.email,
          subject: parsed.subject,
          message: parsed.message,
        }),
        signal: controller.signal,
      });
      const json = (await res.json().catch(() => ({}))) as {
        message?: string;
        error?: string;
      };

      if (!res.ok) {
        throw new Error(
          json?.error || json?.message || `HTTP error ${res.status}`
        );
      }

      setApiStatus({
        state: "success",
        message:
          t("success") ||
          json?.message ||
          "Your message has been sent. Thank you !",
      });
      reset(CONTACT_DEFAULTS);
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return;
      setApiStatus({
        state: "error",
        message: (err as Error)?.message || t("errors.unknown"),
      });
    } finally {
      abortRef.current = null;
    }
  };

  return (
    <div className="size-full lg:min-h-page mb-6 lg:mb-0 flex flex-col lg:justify-center items-center">
      <motion.form
        className="p-4 lg:p-8 bg-element sm:rounded-2xl border border-foreground/5 shadow-2xl place-items-center w-full max-w-md space-y-3"
        noValidate
        aria-busy={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
        variants={formDeploy}
        initial="initial"
        animate="animate"
      >
        <div className="text-left w-full inline-flex items-baseline gap-2">
          <h2 className="text-3xl text-primary font-bebas-neue font-bold mb-2">
            {t("title")}
          </h2>
          <RotateWords words={words} />
        </div>

        {/* Email */}
        <div className="w-full max-w-96">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-alternative"
          >
            {t("labels.email")}
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              id="email"
              type="email"
              inputMode="email"
              placeholder={t("placeholders.email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={cn(
                "custom-input",
                errors.email && "custom-input-error"
              )}
              {...register("email")}
            />
            {errors.email && (
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <WarningCircle aria-hidden="true" className="form-error-icon" />
              </div>
            )}
          </div>
          {errors.email ? (
            <p
              id="email-error"
              className="form-error"
              role="alert"
              aria-live="polite"
            >
              {errors.email.message}
            </p>
          ) : (
            <span className="h-4 mt-2 bg-transparent text-xs text-transparent select-none">
              o
            </span>
          )}
        </div>

        {/* Subject */}
        <div className="w-full max-w-96">
          <label
            htmlFor="subject"
            className="block text-sm font-medium leading-6 text-alternative"
          >
            {t("labels.subject")}
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              id="subject"
              type="text"
              placeholder={t("placeholders.subject")}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              maxLength={120}
              className={cn(
                "custom-input",
                errors.subject && "custom-input-error"
              )}
              {...register("subject")}
            />
            {errors.subject && (
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <WarningCircle aria-hidden="true" className="form-error-icon" />
              </div>
            )}
          </div>
          {errors.subject ? (
            <p
              id="subject-error"
              className="form-error"
              role="alert"
              aria-live="polite"
            >
              {errors.subject.message}
            </p>
          ) : (
            <div
              id="subject-help"
              className="mt-2 flex items-center justify-between text-xs text-alternative/70"
            >
              <p>{t("helpers.subject")}</p>
              <span>{subject?.length ?? 0}/120</span>
            </div>
          )}
        </div>
        {/* Message */}
        <div className="w-full max-w-96">
          <label
            htmlFor="message"
            className="block text-sm font-medium leading-6 text-alternative"
          >
            {t("labels.message")}
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <textarea
              id="message"
              rows={4}
              placeholder={t("placeholders.message")}
              aria-invalid={!!errors.message}
              aria-describedby={
                errors.message ? "message-error" : "message-help"
              }
              maxLength={2000}
              className={cn(
                "custom-input",
                errors.message && "custom-input-error"
              )}
              {...register("message")}
            />
            {errors.message && (
              <div className="pointer-events-none absolute top-0 right-0 flex items-center pt-3 pr-3">
                <WarningCircle aria-hidden="true" className="form-error-icon" />
              </div>
            )}
          </div>
          {errors.message ? (
            <p
              id="message-error"
              className="form-error"
              role="alert"
              aria-live="polite"
            >
              {errors.message.message}
            </p>
          ) : (
            <div
              id="message-help"
              className="mt-2 flex items-center justify-between text-xs text-alternative/70"
            >
              <span>{t("helpers.message")}</span>
              <span>{message?.length ?? 0}/2000</span>
            </div>
          )}
        </div>
        {/* Honeypot (anti-bot) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>
        {/* Submit */}
        <div className="max-w-96 w-full flex flex-col gap-3">
          <div className="w-full flex items-center justify-end gap-4">
            <button
              type="reset"
              disabled={isSubmitting}
              onClick={() => {
                reset(CONTACT_DEFAULTS);
                setApiStatus({ state: "idle" });
              }}
              className={cn(
                "custom-button",
                isSubmitting ? "disabled-button" : "secondary-button"
              )}
            >
              {t("labels.reset")}
            </button>
            <button
              type="submit"
              disabled={!isDirty || !isValid || isSubmitting}
              className={cn(
                "custom-button",
                !isDirty || !isValid || isSubmitting
                  ? "disabled-button"
                  : "primary-button"
              )}
            >
              {t("labels.submit")}
            </button>
          </div>

          {(apiStatus.state === "success" || apiStatus.state === "error") && (
            <p
              role="status"
              aria-live="polite"
              className={cn(
                "text-xs bg-foreground/10 px-4 py-2 rounded-md inline-flex items-center gap-2",
                apiStatus.state === "success" && "text-green-500",
                apiStatus.state === "error" && "text-red-500"
              )}
            >
              {apiStatus.state === "success" && (
                <>
                  <CheckCircle size={18} /> {apiStatus.message}
                </>
              )}
              {apiStatus.state === "error" && (
                <>
                  <WarningCircle size={18} /> {apiStatus.message}
                </>
              )}
            </p>
          )}
        </div>
      </motion.form>
    </div>
  );
}
