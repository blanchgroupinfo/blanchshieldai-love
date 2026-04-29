import { describe, it, expect } from "vitest";
import {
  reminderEditorSchema,
  prayerRequestSchema,
} from "@/schemas/calendarSchemas";

describe("reminderEditorSchema", () => {
  const base = {
    holy_day_name: "Passover",
    remind_days_before: 3,
    reminder_enabled: true,
    email_enabled: true,
    sms_enabled: false,
    whatsapp_enabled: false,
    email_address: "user@example.com",
    phone_number: "",
  };

  it("accepts a valid email-only reminder", () => {
    expect(reminderEditorSchema.safeParse(base).success).toBe(true);
  });

  it("rejects when email is enabled but address is missing", () => {
    const result = reminderEditorSchema.safeParse({ ...base, email_address: "" });
    expect(result.success).toBe(false);
  });

  it("rejects when SMS is enabled but phone is missing", () => {
    const result = reminderEditorSchema.safeParse({
      ...base,
      sms_enabled: true,
      phone_number: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects when no channel is selected but reminder enabled", () => {
    const result = reminderEditorSchema.safeParse({
      ...base,
      email_enabled: false,
      sms_enabled: false,
      whatsapp_enabled: false,
    });
    expect(result.success).toBe(false);
  });

  it("rejects negative remind_days_before", () => {
    expect(reminderEditorSchema.safeParse({ ...base, remind_days_before: -1 }).success).toBe(false);
  });

  it("rejects remind_days_before > 60", () => {
    expect(reminderEditorSchema.safeParse({ ...base, remind_days_before: 99 }).success).toBe(false);
  });

  it("validates phone format for whatsapp", () => {
    const result = reminderEditorSchema.safeParse({
      ...base,
      whatsapp_enabled: true,
      phone_number: "abc",
    });
    expect(result.success).toBe(false);
  });
});

describe("prayerRequestSchema", () => {
  const base = {
    full_name: "John Doe",
    hebrew_name: "Yochanan",
    prayer_message: "Please pray for healing",
    request_type: "healing" as const,
  };

  it("accepts a valid request", () => {
    expect(prayerRequestSchema.safeParse(base).success).toBe(true);
  });

  it("rejects empty full_name", () => {
    expect(prayerRequestSchema.safeParse({ ...base, full_name: "" }).success).toBe(false);
  });

  it("rejects empty prayer_message", () => {
    expect(prayerRequestSchema.safeParse({ ...base, prayer_message: "   " }).success).toBe(false);
  });

  it("rejects invalid request_type", () => {
    const result = prayerRequestSchema.safeParse({ ...base, request_type: "invalid" as never });
    expect(result.success).toBe(false);
  });

  it("allows omitting hebrew_name", () => {
    const { hebrew_name: _h, ...rest } = base;
    expect(prayerRequestSchema.safeParse({ ...rest, hebrew_name: "" }).success).toBe(true);
  });

  it("rejects message > 2000 chars", () => {
    expect(
      prayerRequestSchema.safeParse({ ...base, prayer_message: "a".repeat(2001) }).success,
    ).toBe(false);
  });
});
