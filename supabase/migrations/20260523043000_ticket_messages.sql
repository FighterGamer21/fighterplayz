CREATE TABLE IF NOT EXISTS public.ticket_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid REFERENCES public.hire_tickets(id) ON DELETE CASCADE NOT NULL,
  sender_type text NOT NULL CHECK (sender_type IN ('user', 'admin')),
  sender_name text,
  sender_email text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.ticket_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins manage ticket messages" ON public.ticket_messages;
CREATE POLICY "Admins manage ticket messages"
  ON public.ticket_messages FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Anyone can add public ticket message" ON public.ticket_messages;
CREATE POLICY "Anyone can add public ticket message"
  ON public.ticket_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (sender_type = 'user');

CREATE INDEX IF NOT EXISTS ticket_messages_ticket_idx ON public.ticket_messages(ticket_id, created_at);

CREATE OR REPLACE FUNCTION public.create_hire_ticket(
  _name text,
  _email text,
  _discord text,
  _project_type text,
  _budget_range text,
  _timeline text,
  _details text,
  _reference_link text,
  _priority text,
  _service_slug text,
  _service_price_inr numeric,
  _display_currency text,
  _converted_amount numeric
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _ticket_id text;
BEGIN
  INSERT INTO public.hire_tickets (
    name,
    email,
    discord,
    project_type,
    budget_range,
    timeline,
    details,
    reference_link,
    priority,
    service_slug,
    service_price_inr,
    display_currency,
    converted_amount
  )
  VALUES (
    _name,
    _email,
    NULLIF(_discord, ''),
    _project_type,
    NULLIF(_budget_range, ''),
    NULLIF(_timeline, ''),
    _details,
    NULLIF(_reference_link, ''),
    COALESCE(NULLIF(_priority, ''), 'NORMAL'),
    NULLIF(_service_slug, ''),
    _service_price_inr,
    _display_currency,
    _converted_amount
  )
  RETURNING ticket_id INTO _ticket_id;

  RETURN _ticket_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_ticket_thread(_ticket_id text, _email text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _ticket public.hire_tickets%ROWTYPE;
  _messages jsonb;
BEGIN
  SELECT *
  INTO _ticket
  FROM public.hire_tickets
  WHERE ticket_id = _ticket_id
    AND lower(email) = lower(_email)
  LIMIT 1;

  IF _ticket.id IS NULL THEN
    RAISE EXCEPTION 'Ticket not found. Check ticket ID and email.';
  END IF;

  SELECT COALESCE(jsonb_agg(to_jsonb(tm) ORDER BY tm.created_at), '[]'::jsonb)
  INTO _messages
  FROM public.ticket_messages tm
  WHERE tm.ticket_id = _ticket.id;

  RETURN jsonb_build_object(
    'ticket', to_jsonb(_ticket),
    'messages', _messages
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.submit_ticket_reply(
  _ticket_id text,
  _email text,
  _sender_name text,
  _message text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _ticket_uuid uuid;
BEGIN
  SELECT id
  INTO _ticket_uuid
  FROM public.hire_tickets
  WHERE ticket_id = _ticket_id
    AND lower(email) = lower(_email)
  LIMIT 1;

  IF _ticket_uuid IS NULL THEN
    RAISE EXCEPTION 'Ticket not found. Check ticket ID and email.';
  END IF;

  INSERT INTO public.ticket_messages (
    ticket_id,
    sender_type,
    sender_name,
    sender_email,
    message
  )
  VALUES (
    _ticket_uuid,
    'user',
    _sender_name,
    _email,
    _message
  );

  RETURN true;
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_hire_ticket(text, text, text, text, text, text, text, text, text, text, numeric, text, numeric) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_ticket_thread(text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_ticket_reply(text, text, text, text) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.bootstrap_admin_role()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _email text := lower(COALESCE(auth.jwt() ->> 'email', ''));
  _user_id uuid := auth.uid();
BEGIN
  IF _user_id IS NULL OR _email <> 'fightergamerofficial1@gmail.com' THEN
    RETURN false;
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (_user_id, 'admin'::public.app_role)
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN true;
END;
$$;

GRANT EXECUTE ON FUNCTION public.bootstrap_admin_role() TO authenticated;
