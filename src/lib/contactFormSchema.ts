import { useTranslations } from "next-intl";
import { z } from "zod";

export type TLike = ReturnType<typeof useTranslations>;

export const buildContactSchema = (t: TLike) =>
  z.object({
    email: z
      .string({ required_error: t("errors.email_required") })
      .trim()
      .min(1, t("errors.email_required"))
      .email(t("errors.email_invalid")),

    subject: z
      .string({ required_error: t("errors.subject_required") })
      .trim()
      .min(3, { message: t("errors.subject_min", { min: 3 }) })
      .max(120, { message: t("errors.subject_max", { max: 120 }) }),

    message: z
      .string({ required_error: t("errors.message_required") })
      .trim()
      .min(10, { message: t("errors.message_min", { min: 10 }) })
      .max(2000, { message: t("errors.message_max", { max: 2000 }) }),
    website: z.string().max(0, { message: t("errors.bot_detected") }),
  });

export type ContactInput = z.input<ReturnType<typeof buildContactSchema>>;
export type ContactOutput = z.output<ReturnType<typeof buildContactSchema>>;

export const CONTACT_DEFAULTS: ContactInput = {
  email: "",
  subject: "",
  message: "",
  website: "",
};
