-- Add channel columns to holy_day_reminders
ALTER TABLE public.holy_day_reminders
  ADD COLUMN IF NOT EXISTS email_enabled boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS sms_enabled boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS whatsapp_enabled boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS phone_number text,
  ADD COLUMN IF NOT EXISTS email_address text;

-- Build status tracking table
CREATE TABLE IF NOT EXISTS public.build_status (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  component_name text NOT NULL,
  file_path text,
  status text NOT NULL DEFAULT 'success',
  category text NOT NULL DEFAULT 'component',
  error_message text,
  suggested_fix text,
  run_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.build_status ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view build status"
  ON public.build_status FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert build status"
  ON public.build_status FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update build status"
  ON public.build_status FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete build status"
  ON public.build_status FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX IF NOT EXISTS idx_build_status_run_at ON public.build_status(run_at DESC);
CREATE INDEX IF NOT EXISTS idx_build_status_status ON public.build_status(status);