import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  calendar_month: number;
  calendar_day: number;
  calendar_year: number;
  event_type: string;
  is_recurring: boolean;
  created_at: string;
  updated_at: string;
}

export interface HolyDayReminder {
  id: string;
  holy_day_name: string;
  remind_days_before: number;
  reminder_enabled: boolean;
  created_at: string;
}

export const useCalendarEvents = (year: number) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [reminders, setReminders] = useState<HolyDayReminder[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const { toast } = useToast();

  // Check auth status
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load events for the year
  const loadEvents = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('calendar_events')
        .select('*')
        .eq('user_id', user.id)
        .eq('calendar_year', year);

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  }, [user, year]);

  // Load reminders
  const loadReminders = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('holy_day_reminders')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setReminders(data || []);
    } catch (err) {
      console.error('Error loading reminders:', err);
    }
  }, [user]);

  // Create event
  const createEvent = useCallback(async (event: {
    title: string;
    description?: string;
    calendar_month: number;
    calendar_day: number;
    calendar_year: number;
    event_type?: string;
    is_recurring?: boolean;
  }) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create events",
        variant: "destructive",
      });
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('calendar_events')
        .insert({
          ...event,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      setEvents(prev => [...prev, data]);
      toast({
        title: "Event Created",
        description: `${event.title} has been added to the calendar`,
      });
      return data;
    } catch (err) {
      console.error('Error creating event:', err);
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive",
      });
      return null;
    }
  }, [user, toast]);

  // Update event
  const updateEvent = useCallback(async (id: string, updates: Partial<CalendarEvent>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('calendar_events')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setEvents(prev => prev.map(e => e.id === id ? data : e));
      toast({
        title: "Event Updated",
        description: "Your event has been updated",
      });
      return data;
    } catch (err) {
      console.error('Error updating event:', err);
      toast({
        title: "Error",
        description: "Failed to update event",
        variant: "destructive",
      });
      return null;
    }
  }, [user, toast]);

  // Delete event
  const deleteEvent = useCallback(async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('calendar_events')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setEvents(prev => prev.filter(e => e.id !== id));
      toast({
        title: "Event Deleted",
        description: "Your event has been removed",
      });
      return true;
    } catch (err) {
      console.error('Error deleting event:', err);
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
      return false;
    }
  }, [user, toast]);

  // Create or update reminder
  const setReminder = useCallback(async (holyDayName: string, daysBefore: number, enabled: boolean) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to set reminders",
        variant: "destructive",
      });
      return null;
    }

    try {
      // Check if reminder exists
      const existing = reminders.find(r => r.holy_day_name === holyDayName);

      if (existing) {
        const { data, error } = await supabase
          .from('holy_day_reminders')
          .update({
            remind_days_before: daysBefore,
            reminder_enabled: enabled,
          })
          .eq('id', existing.id)
          .select()
          .single();

        if (error) throw error;

        setReminders(prev => prev.map(r => r.id === existing.id ? data : r));
        return data;
      } else {
        const { data, error } = await supabase
          .from('holy_day_reminders')
          .insert({
            user_id: user.id,
            holy_day_name: holyDayName,
            remind_days_before: daysBefore,
            reminder_enabled: enabled,
          })
          .select()
          .single();

        if (error) throw error;

        setReminders(prev => [...prev, data]);
        toast({
          title: "Reminder Set",
          description: `You will be reminded ${daysBefore} day(s) before ${holyDayName}`,
        });
        return data;
      }
    } catch (err) {
      console.error('Error setting reminder:', err);
      toast({
        title: "Error",
        description: "Failed to set reminder",
        variant: "destructive",
      });
      return null;
    }
  }, [user, reminders, toast]);

  // Delete reminder
  const deleteReminder = useCallback(async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('holy_day_reminders')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setReminders(prev => prev.filter(r => r.id !== id));
      return true;
    } catch (err) {
      console.error('Error deleting reminder:', err);
      return false;
    }
  }, [user]);

  // Get events for a specific day
  const getEventsForDay = useCallback((month: number, day: number): CalendarEvent[] => {
    return events.filter(e => 
      e.calendar_month === month && 
      e.calendar_day === day && 
      (e.calendar_year === year || e.is_recurring)
    );
  }, [events, year]);

  // Get reminder for a holy day
  const getReminderForHolyDay = useCallback((holyDayName: string): HolyDayReminder | undefined => {
    return reminders.find(r => r.holy_day_name === holyDayName);
  }, [reminders]);

  // Load data when user or year changes
  useEffect(() => {
    if (user) {
      loadEvents();
      loadReminders();
    } else {
      setEvents([]);
      setReminders([]);
    }
  }, [user, year, loadEvents, loadReminders]);

  return {
    events,
    reminders,
    loading,
    user,
    createEvent,
    updateEvent,
    deleteEvent,
    setReminder,
    deleteReminder,
    getEventsForDay,
    getReminderForHolyDay,
    refresh: loadEvents,
  };
};
