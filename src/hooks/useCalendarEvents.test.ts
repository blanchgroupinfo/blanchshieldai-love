import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useCalendarEvents } from "./useCalendarEvents";

// ----- Supabase mock -----
const mockUser = { id: "user-1" };
const mockEvent = {
  id: "ev-1",
  user_id: "user-1",
  title: "Sabbath Prep",
  description: null,
  calendar_month: 1,
  calendar_day: 7,
  calendar_year: 2026,
  event_type: "personal",
  is_recurring: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};
const mockReminder = {
  id: "rem-1",
  user_id: "user-1",
  holy_day_name: "Passover",
  remind_days_before: 3,
  reminder_enabled: true,
  email_enabled: true,
  sms_enabled: false,
  whatsapp_enabled: false,
  email_address: null,
  phone_number: null,
  created_at: new Date().toISOString(),
};

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: vi.fn() }),
}));

vi.mock("@/integrations/supabase/client", () => {
  const builder = (rows: unknown[], single?: unknown) => {
    const chain: Record<string, unknown> = {};
    const passthrough = () => chain;
    chain.select = passthrough;
    chain.eq = passthrough;
    chain.insert = (_v: unknown) => ({
      select: () => ({ single: async () => ({ data: single ?? rows[0], error: null }) }),
    });
    chain.update = (_v: unknown) => ({
      eq: () => ({
        eq: () => ({ select: () => ({ single: async () => ({ data: single ?? rows[0], error: null }) }) }),
        select: () => ({ single: async () => ({ data: single ?? rows[0], error: null }) }),
      }),
    });
    chain.delete = () => ({ eq: () => ({ eq: async () => ({ error: null }) }) });
    chain.then = (fn: (v: { data: unknown[]; error: null }) => unknown) =>
      Promise.resolve({ data: rows, error: null }).then(fn);
    return chain;
  };

  return {
    supabase: {
      auth: {
        getUser: async () => ({ data: { user: mockUser } }),
        onAuthStateChange: (_cb: unknown) => ({
          data: { subscription: { unsubscribe: () => {} } },
        }),
      },
      from: (table: string) => {
        if (table === "calendar_events") return builder([mockEvent], mockEvent);
        if (table === "holy_day_reminders") return builder([mockReminder], mockReminder);
        return builder([]);
      },
    },
  };
});

describe("useCalendarEvents", () => {
  beforeEach(() => vi.clearAllMocks());

  it("loads events and reminders for the year", async () => {
    const { result } = renderHook(() => useCalendarEvents(2026));
    await waitFor(() => expect(result.current.user).toBeTruthy());
    await waitFor(() => expect(result.current.events.length).toBeGreaterThan(0));
    expect(result.current.reminders.length).toBeGreaterThan(0);
  });

  it("createEvent returns a new event", async () => {
    const { result } = renderHook(() => useCalendarEvents(2026));
    await waitFor(() => expect(result.current.user).toBeTruthy());
    let created: unknown = null;
    await act(async () => {
      created = await result.current.createEvent({
        title: "Test",
        calendar_month: 2,
        calendar_day: 14,
        calendar_year: 2026,
      });
    });
    expect(created).toBeTruthy();
  });

  it("setReminder accepts both number and string[] for remindOptions", async () => {
    const { result } = renderHook(() => useCalendarEvents(2026));
    await waitFor(() => expect(result.current.user).toBeTruthy());

    let r1: unknown = null;
    await act(async () => {
      r1 = await result.current.setReminder("Yom Kippur", 5, true);
    });
    expect(r1).toBeTruthy();

    let r2: unknown = null;
    await act(async () => {
      r2 = await result.current.setReminder("Sukkot", ["1", "3"], true);
    });
    expect(r2).toBeTruthy();
  });

  it("getEventsForDay filters by month/day", async () => {
    const { result } = renderHook(() => useCalendarEvents(2026));
    await waitFor(() => expect(result.current.events.length).toBeGreaterThan(0));
    const matches = result.current.getEventsForDay(1, 7);
    expect(matches.length).toBe(1);
    const noMatch = result.current.getEventsForDay(12, 31);
    expect(noMatch.length).toBe(0);
  });

  it("getReminderForHolyDay finds existing reminder", async () => {
    const { result } = renderHook(() => useCalendarEvents(2026));
    await waitFor(() => expect(result.current.reminders.length).toBeGreaterThan(0));
    expect(result.current.getReminderForHolyDay("Passover")).toBeTruthy();
    expect(result.current.getReminderForHolyDay("Nonexistent")).toBeUndefined();
  });
});
