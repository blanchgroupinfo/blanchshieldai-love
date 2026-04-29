import { describe, it, expect } from "vitest";
import { prayerRequestSchema } from "@/schemas/calendarSchemas";

/**
 * CreatorsCalendar prayer-request form submission validation.
 * The form invokes prayerRequestSchema.safeParse before calling supabase.insert,
 * which prevents the previous TS errors caused by undefined `hebrewName`,
 * `community`, `prayerRequest`, `requestType` references.
 */
describe("CreatorsCalendar prayer-request submission", () => {
  it("accepts a fully-filled valid form", () => {
    const result = prayerRequestSchema.safeParse({
      full_name: "John Doe",
      hebrew_name: "Yochanan",
      prayer_message: "Pray for healing",
      request_type: "healing",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a form missing full_name", () => {
    const result = prayerRequestSchema.safeParse({
      full_name: "",
      hebrew_name: "",
      prayer_message: "msg",
      request_type: "healing",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a form missing prayer_message", () => {
    const result = prayerRequestSchema.safeParse({
      full_name: "John",
      hebrew_name: "",
      prayer_message: "",
      request_type: "guidance",
    });
    expect(result.success).toBe(false);
  });

  it("preserves request_type as a known enum", () => {
    const valid = ["healing", "guidance", "thanksgiving", "deliverance", "provision", "family", "other"] as const;
    valid.forEach((t) => {
      const r = prayerRequestSchema.safeParse({
        full_name: "X",
        prayer_message: "Y",
        request_type: t,
      });
      expect(r.success).toBe(true);
    });
  });
});
