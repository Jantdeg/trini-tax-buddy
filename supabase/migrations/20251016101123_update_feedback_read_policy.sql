/*
  # Update feedback table read policy

  1. Changes
    - Add policy to allow anyone to read feedback
    - This enables the admin page to display feedback without authentication
  
  2. Security Notes
    - In a production environment, you should add authentication
    - For now, feedback is publicly readable via the /admin page
    - Consider adding password protection or auth in the future
*/

CREATE POLICY "Anyone can read feedback"
  ON feedback
  FOR SELECT
  TO anon, authenticated
  USING (true);