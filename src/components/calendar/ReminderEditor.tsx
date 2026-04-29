import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Bell, Mail, MessageSquare, Phone } from "lucide-react";
import { reminderEditorSchema, type ReminderEditorInput } from "@/schemas/calendarSchemas";
import { useToast } from "@/hooks/use-toast";

interface ReminderEditorProps {
  initial?: Partial<ReminderEditorInput>;
  onSave: (data: ReminderEditorInput) => Promise<void> | void;
  onCancel?: () => void;
}

const defaults: ReminderEditorInput = {
  holy_day_name: "",
  remind_days_before: 1,
  reminder_enabled: true,
  email_enabled: true,
  sms_enabled: false,
  whatsapp_enabled: false,
  email_address: "",
  phone_number: "",
};

export const ReminderEditor = ({ initial, onSave, onCancel }: ReminderEditorProps) => {
  const [form, setForm] = useState<ReminderEditorInput>({ ...defaults, ...initial });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const update = <K extends keyof ReminderEditorInput>(k: K, v: ReminderEditorInput[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const handleSave = async () => {
    const parsed = reminderEditorSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        const key = err.path[0]?.toString();
        if (key) fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      toast({
        title: "Validation Error",
        description: Object.values(fieldErrors)[0] ?? "Please review the form",
        variant: "destructive",
      });
      return;
    }
    setSaving(true);
    try {
      await onSave(parsed.data);
      toast({ title: "Reminder Saved", description: `${parsed.data.holy_day_name} updated` });
    } catch (err) {
      toast({
        title: "Save Failed",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Bell className="w-4 h-4 text-primary" /> Reminder Editor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="hd-name">Holy Day Name</Label>
          <Input
            id="hd-name"
            value={form.holy_day_name}
            onChange={(e) => update("holy_day_name", e.target.value)}
            className="mt-1"
            placeholder="e.g. Passover"
          />
          {errors.holy_day_name && (
            <p className="text-xs text-destructive mt-1">{errors.holy_day_name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="hd-days">Remind days before</Label>
          <Input
            id="hd-days"
            type="number"
            min={0}
            max={60}
            value={form.remind_days_before}
            onChange={(e) => update("remind_days_before", Number(e.target.value))}
            className="mt-1"
          />
          {errors.remind_days_before && (
            <p className="text-xs text-destructive mt-1">{errors.remind_days_before}</p>
          )}
        </div>

        <div className="flex items-center justify-between border border-border/50 rounded p-2">
          <Label htmlFor="hd-enabled" className="cursor-pointer">Reminder Active</Label>
          <Switch
            id="hd-enabled"
            checked={form.reminder_enabled}
            onCheckedChange={(v) => update("reminder_enabled", v)}
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">Channels</p>
          {[
            { key: "email_enabled" as const, label: "Email", icon: Mail },
            { key: "sms_enabled" as const, label: "SMS", icon: MessageSquare },
            { key: "whatsapp_enabled" as const, label: "WhatsApp", icon: Phone },
          ].map(({ key, label, icon: Icon }) => (
            <div key={key} className="flex items-center justify-between border border-border/50 rounded p-2">
              <Label htmlFor={key} className="cursor-pointer flex items-center gap-2">
                <Icon className="w-4 h-4" /> {label}
              </Label>
              <Switch id={key} checked={form[key]} onCheckedChange={(v) => update(key, v)} />
            </div>
          ))}
          {errors.email_enabled && (
            <p className="text-xs text-destructive">{errors.email_enabled}</p>
          )}
        </div>

        {form.email_enabled && (
          <div>
            <Label htmlFor="hd-email">Email Address</Label>
            <Input
              id="hd-email"
              type="email"
              value={form.email_address ?? ""}
              onChange={(e) => update("email_address", e.target.value)}
              className="mt-1"
              placeholder="you@example.com"
            />
            {errors.email_address && (
              <p className="text-xs text-destructive mt-1">{errors.email_address}</p>
            )}
          </div>
        )}

        {(form.sms_enabled || form.whatsapp_enabled) && (
          <div>
            <Label htmlFor="hd-phone">Phone Number</Label>
            <Input
              id="hd-phone"
              value={form.phone_number ?? ""}
              onChange={(e) => update("phone_number", e.target.value)}
              className="mt-1"
              placeholder="+1 555 123 4567"
            />
            {errors.phone_number && (
              <p className="text-xs text-destructive mt-1">{errors.phone_number}</p>
            )}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button onClick={handleSave} disabled={saving} className="flex-1">
            {saving ? "Saving..." : "Save Reminder"}
          </Button>
          {onCancel && (
            <Button variant="outline" onClick={onCancel} disabled={saving}>
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
