/**
 * Single source of truth for HolyDayReminder & PrayerRequest shapes.
 * Database columns are mirrored from Supabase types; UI extensions are layered on top.
 */
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

// ---------- DB-derived row types ----------
export type HolyDayReminderRow = Database["public"]["Tables"]["holy_day_reminders"]["Row"];
export type HolyDayReminderInsert = Database["public"]["Tables"]["holy_day_reminders"]["Insert"];
export type PrayerRequestRow = Database["public"]["Tables"]["prayer_requests"]["Row"];
export type PrayerRequestInsert = Database["public"]["Tables"]["prayer_requests"]["Insert"];

// ---------- Reminder editor schema (UI -> DB) ----------
export const reminderEditorSchema = z
  .object({
    holy_day_name: z.string().trim().min(1, "Holy day name is required").max(120),
    remind_days_before: z
      .number({ invalid_type_error: "Days must be a number" })
      .int("Must be a whole number")
      .min(0, "Cannot be negative")
      .max(60, "Maximum 60 days"),
    reminder_enabled: z.boolean(),
    email_enabled: z.boolean(),
    sms_enabled: z.boolean(),
    whatsapp_enabled: z.boolean(),
    email_address: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
    phone_number: z
      .string()
      .trim()
      .regex(/^[+]?[0-9 ()-]{7,20}$/, "Invalid phone number")
      .optional()
      .or(z.literal("")),
  })
  .superRefine((val, ctx) => {
    if (val.email_enabled && !val.email_address) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email_address"],
        message: "Email required when email channel is enabled",
      });
    }
    if ((val.sms_enabled || val.whatsapp_enabled) && !val.phone_number) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone_number"],
        message: "Phone required for SMS/WhatsApp",
      });
    }
    if (!val.email_enabled && !val.sms_enabled && !val.whatsapp_enabled && val.reminder_enabled) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email_enabled"],
        message: "Pick at least one channel",
      });
    }
  });

export type ReminderEditorInput = z.infer<typeof reminderEditorSchema>;

// ---------- Prayer request schema ----------
export const prayerRequestSchema = z.object({
  full_name: z.string().trim().min(1, "Name is required").max(120),
  hebrew_name: z.string().trim().max(120).optional().or(z.literal("")),
  prayer_message: z.string().trim().min(1, "Prayer message is required").max(2000),
  request_type: z.enum([
    "healing",
    "guidance",
    "thanksgiving",
    "deliverance",
    "provision",
    "family",
    "other",
  ]),
});

export type PrayerRequestInput = z.infer<typeof prayerRequestSchema>;
