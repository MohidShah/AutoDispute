/*
  # Add Stripe connections, notifications, and evidence tables

  1. New Tables
    - `stripe_connections`: Store connected Stripe accounts with OAuth tokens
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `stripe_account_id` (text, unique)
      - `stripe_access_token` (text, encrypted)
      - `stripe_refresh_token` (text, encrypted)
      - `business_name` (text)
      - `is_connected` (boolean)
      - `last_synced` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `disputes_stripe`: Store Stripe dispute data
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `stripe_connection_id` (uuid, foreign key to stripe_connections)
      - `stripe_dispute_id` (text, unique per connection)
      - `charge_id` (text)
      - `amount` (numeric)
      - `currency` (text)
      - `reason` (text)
      - `status` (text: 'warning_under_review', 'warning_closed', 'under_review', 'charge_refunded', 'won', 'lost', 'warning_needs_response')
      - `evidence_due_at` (timestamp)
      - `evidence_submitted_at` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `evidence`: Store generated and uploaded evidence
      - `id` (uuid, primary key)
      - `dispute_id` (uuid, foreign key to disputes_stripe)
      - `user_id` (uuid, foreign key to auth.users)
      - `evidence_type` (text: 'generated', 'uploaded')
      - `content` (text)
      - `storage_path` (text, nullable for uploaded files)
      - `file_name` (text, nullable)
      - `file_size` (integer, nullable)
      - `mime_type` (text, nullable)
      - `created_at` (timestamp)
    
    - `notifications`: Email and in-app notifications
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `type` (text: 'dispute_created', 'dispute_updated', 'evidence_generated', 'submission_required')
      - `title` (text)
      - `message` (text)
      - `dispute_id` (uuid, nullable, foreign key to disputes_stripe)
      - `is_read` (boolean)
      - `sent_at` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Users can only access their own data
    - Service role can manage all data

  3. Indexes
    - Add indexes for frequently queried columns
*/

CREATE TABLE IF NOT EXISTS stripe_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_account_id text NOT NULL UNIQUE,
  stripe_access_token text NOT NULL,
  stripe_refresh_token text NOT NULL,
  business_name text NOT NULL,
  is_connected boolean DEFAULT true,
  last_synced timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS disputes_stripe (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_connection_id uuid NOT NULL REFERENCES stripe_connections(id) ON DELETE CASCADE,
  stripe_dispute_id text NOT NULL,
  charge_id text NOT NULL,
  amount numeric(12, 2) NOT NULL,
  currency text DEFAULT 'USD',
  reason text NOT NULL,
  status text DEFAULT 'under_review' CHECK (status IN ('warning_under_review', 'warning_closed', 'under_review', 'charge_refunded', 'won', 'lost', 'warning_needs_response')),
  evidence_due_at timestamptz,
  evidence_submitted_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(stripe_connection_id, stripe_dispute_id)
);

CREATE TABLE IF NOT EXISTS evidence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dispute_id uuid NOT NULL REFERENCES disputes_stripe(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  evidence_type text NOT NULL CHECK (evidence_type IN ('generated', 'uploaded')),
  content text,
  storage_path text,
  file_name text,
  file_size integer,
  mime_type text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('dispute_created', 'dispute_updated', 'evidence_generated', 'submission_required')),
  title text NOT NULL,
  message text NOT NULL,
  dispute_id uuid REFERENCES disputes_stripe(id) ON DELETE SET NULL,
  is_read boolean DEFAULT false,
  sent_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE stripe_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes_stripe ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own Stripe connections"
  ON stripe_connections FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own Stripe connections"
  ON stripe_connections FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own Stripe connections"
  ON stripe_connections FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own Stripe connections"
  ON stripe_connections FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own Stripe disputes"
  ON disputes_stripe FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own Stripe disputes"
  ON disputes_stripe FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own Stripe disputes"
  ON disputes_stripe FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view evidence for own disputes"
  ON evidence FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create evidence for own disputes"
  ON evidence FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_stripe_connections_user_id ON stripe_connections(user_id);
CREATE INDEX idx_disputes_stripe_user_id ON disputes_stripe(user_id);
CREATE INDEX idx_disputes_stripe_status ON disputes_stripe(status);
CREATE INDEX idx_disputes_stripe_created_at ON disputes_stripe(created_at);
CREATE INDEX idx_disputes_stripe_evidence_due_at ON disputes_stripe(evidence_due_at);
CREATE INDEX idx_evidence_dispute_id ON evidence(dispute_id);
CREATE INDEX idx_evidence_user_id ON evidence(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);