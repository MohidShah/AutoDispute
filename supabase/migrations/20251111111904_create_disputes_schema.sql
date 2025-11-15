/*
  # Create disputes and accounts schema for AutoDispute

  1. New Tables
    - `accounts`: User payment account connections
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `account_type` (text: 'stripe', 'bank')
      - `account_name` (text)
      - `is_primary` (boolean)
      - `last_synced` (timestamp)
      - `created_at` (timestamp)
    
    - `disputes`: Transaction disputes
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `account_id` (uuid, foreign key to accounts)
      - `merchant_name` (text)
      - `transaction_amount` (numeric)
      - `transaction_date` (date)
      - `dispute_reason` (text)
      - `status` (text: 'draft', 'pending', 'won', 'lost')
      - `evidence_notes` (text)
      - `created_at` (timestamp)
      - `submitted_at` (timestamp)
      - `resolved_at` (timestamp)
    
    - `dispute_attachments`: File uploads for disputes
      - `id` (uuid, primary key)
      - `dispute_id` (uuid, foreign key to disputes)
      - `file_name` (text)
      - `file_type` (text)
      - `file_size` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Users can only access their own data
    - Service role can manage all data

  3. Indexes
    - Add indexes on frequently queried columns for performance
*/

CREATE TABLE IF NOT EXISTS accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_type text NOT NULL CHECK (account_type IN ('stripe', 'bank')),
  account_name text NOT NULL,
  is_primary boolean DEFAULT false,
  last_synced timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS disputes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id uuid NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  merchant_name text NOT NULL,
  transaction_amount numeric(12, 2) NOT NULL,
  transaction_date date NOT NULL,
  dispute_reason text NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'won', 'lost')),
  evidence_notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  submitted_at timestamptz,
  resolved_at timestamptz
);

CREATE TABLE IF NOT EXISTS dispute_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dispute_id uuid NOT NULL REFERENCES disputes(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  file_type text NOT NULL,
  file_size integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE dispute_attachments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own accounts"
  ON accounts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own accounts"
  ON accounts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own accounts"
  ON accounts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own accounts"
  ON accounts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own disputes"
  ON disputes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own disputes"
  ON disputes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own disputes"
  ON disputes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own disputes"
  ON disputes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view attachments for own disputes"
  ON dispute_attachments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM disputes
      WHERE disputes.id = dispute_attachments.dispute_id
      AND disputes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create attachments for own disputes"
  ON dispute_attachments FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM disputes
      WHERE disputes.id = dispute_attachments.dispute_id
      AND disputes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete attachments for own disputes"
  ON dispute_attachments FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM disputes
      WHERE disputes.id = dispute_attachments.dispute_id
      AND disputes.user_id = auth.uid()
    )
  );

CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_disputes_user_id ON disputes(user_id);
CREATE INDEX idx_disputes_status ON disputes(status);
CREATE INDEX idx_disputes_created_at ON disputes(created_at);
CREATE INDEX idx_dispute_attachments_dispute_id ON dispute_attachments(dispute_id);
