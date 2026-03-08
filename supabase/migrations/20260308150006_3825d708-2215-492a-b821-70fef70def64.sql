
-- Create shared_files table for file sharing functionality
CREATE TABLE public.shared_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID NOT NULL,
  file_path TEXT NOT NULL,
  share_token TEXT NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
  access_type TEXT NOT NULL DEFAULT 'view' CHECK (access_type IN ('view', 'download')),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(share_token)
);

-- Enable RLS
ALTER TABLE public.shared_files ENABLE ROW LEVEL SECURITY;

-- Owners can manage their shared files
CREATE POLICY "Users can view own shared files"
ON public.shared_files FOR SELECT TO authenticated
USING (owner_id = auth.uid());

CREATE POLICY "Users can create shared files"
ON public.shared_files FOR INSERT TO authenticated
WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Users can update own shared files"
ON public.shared_files FOR UPDATE TO authenticated
USING (owner_id = auth.uid());

CREATE POLICY "Users can delete own shared files"
ON public.shared_files FOR DELETE TO authenticated
USING (owner_id = auth.uid());

-- Anyone can read active shares by token (for public access)
CREATE POLICY "Anyone can view active shares by token"
ON public.shared_files FOR SELECT TO anon
USING (is_active = true AND (expires_at IS NULL OR expires_at > now()));
