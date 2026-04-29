import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Bell, Calendar as CalendarIcon } from "lucide-react";
import { useMemo } from "react";
import type { HolyDayReminderRow } from "@/schemas/calendarSchemas";

interface ScriptureMonth {
  month: string;
  scriptures: string[];
}

interface CalendarInsightsWidgetProps {
  scripturesByMonth: ScriptureMonth[];
  reminders: HolyDayReminderRow[];
}

export const CalendarInsightsWidget = ({
  scripturesByMonth,
  reminders,
}: CalendarInsightsWidgetProps) => {
  const totals = useMemo(() => {
    const monthsCount = scripturesByMonth.length;
    const totalScriptures = scripturesByMonth.reduce(
      (sum, m) => sum + m.scriptures.length,
      0,
    );
    const upcoming = reminders
      .filter((r) => r.reminder_enabled)
      .slice(0, 5);
    return { monthsCount, totalScriptures, upcoming };
  }, [scripturesByMonth, reminders]);

  return (
    <Card className="border-primary/20 bg-card/60 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <CalendarIcon className="w-5 h-5 text-primary" />
          Calendar Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border/50 p-3">
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <Book className="w-3 h-3" /> Scriptures
            </div>
            <div className="text-2xl font-bold mt-1">{totals.totalScriptures}</div>
            <div className="text-xs text-muted-foreground">
              across {totals.monthsCount} months
            </div>
          </div>
          <div className="rounded-lg border border-border/50 p-3">
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <Bell className="w-3 h-3" /> Active Reminders
            </div>
            <div className="text-2xl font-bold mt-1">{totals.upcoming.length}</div>
            <div className="text-xs text-muted-foreground">
              of {reminders.length} total
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
            <Bell className="w-3 h-3" /> Upcoming Holy-Day Reminders
          </h4>
          {totals.upcoming.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              No active reminders. Set one in the Reminders tab.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {totals.upcoming.map((r) => (
                <li
                  key={r.id}
                  className="flex items-center justify-between text-sm border border-border/40 rounded px-2 py-1.5"
                >
                  <span className="truncate">{r.holy_day_name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {r.remind_days_before ?? 1}d before
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
            <Book className="w-3 h-3" /> Scriptures by Month
          </h4>
          <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto">
            {scripturesByMonth.map((m) => (
              <div
                key={m.month}
                className="flex items-center justify-between text-xs px-2 py-1 rounded bg-muted/30"
              >
                <span className="truncate">{m.month}</span>
                <Badge variant="outline" className="text-[10px]">
                  {m.scriptures.length}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
