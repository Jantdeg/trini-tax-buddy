/*
  # Create feedback table

  1. New Tables
    - `feedback`
      - `id` (uuid, primary key) - Unique identifier for each feedback entry
      - `page` (text) - The page where feedback was submitted
      - `message` (text) - The feedback message from the user
      - `email` (text, optional) - Optional email address if user wants to be contacted
      - `created_at` (timestamptz) - Timestamp when feedback was submitted
  
  2. Security
    - Enable RLS on `feedback` table
    - Add policy to allow anyone to insert feedback (public form)
    - Only authenticated admins can read feedback (restrictive by default)
  
  3. Notes
    - The table allows anonymous users to submit feedback
    - Email is optional for users who want follow-up
    - Created_at is automatically set to current timestamp
*/

CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  message text NOT NULL,
  email text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit feedback"
  ON feedback
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);