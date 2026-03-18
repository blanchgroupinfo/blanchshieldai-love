
-- Prayer Requests table
CREATE TABLE public.prayer_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  full_name TEXT NOT NULL,
  hebrew_name TEXT,
  prayer_message TEXT NOT NULL,
  request_type TEXT NOT NULL DEFAULT 'healing',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create prayer requests" ON public.prayer_requests
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view own prayer requests" ON public.prayer_requests
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Admins can view all prayer requests" ON public.prayer_requests
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Baptism Registrations table
CREATE TABLE public.baptism_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  full_name TEXT NOT NULL,
  hebrew_name TEXT,
  registration_type TEXT NOT NULL DEFAULT 'want_baptism',
  date_of_baptism DATE,
  location_of_baptism TEXT,
  officiant TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.baptism_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create baptism registrations" ON public.baptism_registrations
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view own baptism registrations" ON public.baptism_registrations
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Admins can view all baptism registrations" ON public.baptism_registrations
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
