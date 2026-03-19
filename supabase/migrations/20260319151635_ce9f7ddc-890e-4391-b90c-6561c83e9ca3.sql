
-- Allow admins to delete prayer requests
CREATE POLICY "Admins can delete prayer requests"
ON public.prayer_requests
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to delete baptism registrations
CREATE POLICY "Admins can delete baptism registrations"
ON public.baptism_registrations
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to update user_roles (needed for role changes)
CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
