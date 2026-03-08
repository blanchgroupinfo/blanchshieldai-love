
-- Create file_versions table for tracking file version history
CREATE TABLE public.file_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  file_path TEXT NOT NULL,
  version_number INTEGER NOT NULL DEFAULT 1,
  file_size BIGINT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.file_versions ENABLE ROW LEVEL SECURITY;

-- Users can manage their own file versions
CREATE POLICY "Users can view own file versions"
ON public.file_versions FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can create file versions"
ON public.file_versions FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own file versions"
ON public.file_versions FOR DELETE TO authenticated
USING (user_id = auth.uid());
