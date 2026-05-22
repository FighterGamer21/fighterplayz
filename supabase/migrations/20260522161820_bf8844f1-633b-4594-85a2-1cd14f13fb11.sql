
-- Hire ticket status enum
DO $$ BEGIN
  CREATE TYPE public.hire_status AS ENUM ('NEW','REVIEWING','ACCEPTED','IN_PROGRESS','COMPLETED','REJECTED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Sequence + table for hire tickets
CREATE SEQUENCE IF NOT EXISTS public.hire_ticket_seq START 1;

CREATE TABLE IF NOT EXISTS public.hire_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id text UNIQUE NOT NULL DEFAULT ('FP-REQ-' || lpad(nextval('public.hire_ticket_seq')::text, 4, '0')),
  name text NOT NULL,
  email text NOT NULL,
  discord text,
  project_type text NOT NULL,
  budget_range text,
  timeline text,
  details text NOT NULL,
  reference_link text,
  priority text NOT NULL DEFAULT 'NORMAL',
  status public.hire_status NOT NULL DEFAULT 'NEW',
  admin_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.hire_tickets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit a hire ticket" ON public.hire_tickets;
CREATE POLICY "Anyone can submit a hire ticket"
  ON public.hire_tickets FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins read hire tickets" ON public.hire_tickets;
CREATE POLICY "Admins read hire tickets"
  ON public.hire_tickets FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins update hire tickets" ON public.hire_tickets;
CREATE POLICY "Admins update hire tickets"
  ON public.hire_tickets FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins delete hire tickets" ON public.hire_tickets;
CREATE POLICY "Admins delete hire tickets"
  ON public.hire_tickets FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- updated_at trigger
DROP TRIGGER IF EXISTS hire_tickets_set_updated_at ON public.hire_tickets;
CREATE TRIGGER hire_tickets_set_updated_at
  BEFORE UPDATE ON public.hire_tickets
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS hire_tickets_status_idx ON public.hire_tickets(status);
CREATE INDEX IF NOT EXISTS hire_tickets_created_idx ON public.hire_tickets(created_at DESC);
