-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  certificate_url TEXT,
  verification_code VARCHAR(50) UNIQUE NOT NULL,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, course_id)
);

-- Create RLS policies for certificates
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Students can read their own certificates
CREATE POLICY "Students can read own certificates" ON certificates
  FOR SELECT USING (student_id = auth.uid());

-- Anyone can verify certificates (for public verification)
CREATE POLICY "Anyone can verify certificates" ON certificates
  FOR SELECT USING (true);

-- Admins can manage all certificates
CREATE POLICY "Admins can manage all certificates" ON certificates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );
