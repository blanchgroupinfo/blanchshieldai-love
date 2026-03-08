
CREATE TABLE public.enrollment_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  program_name TEXT NOT NULL,
  program_duration TEXT NOT NULL,
  deposit_amount TEXT NOT NULL,
  compounding TEXT NOT NULL DEFAULT 'no',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.enrollment_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit enrollments (public form)
CREATE POLICY "Anyone can submit enrollments"
ON public.enrollment_submissions
FOR INSERT
WITH CHECK (true);

-- Admins can view all enrollments
CREATE POLICY "Admins can view all enrollments"
ON public.enrollment_submissions
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update enrollment status
CREATE POLICY "Admins can update enrollments"
ON public.enrollment_submissions
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete enrollments
CREATE POLICY "Admins can delete enrollments"
ON public.enrollment_submissions
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));
