-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  progress DECIMAL(5,2) DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(student_id, course_id)
);

-- Create RLS policies for enrollments
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Students can read their own enrollments
CREATE POLICY "Students can read own enrollments" ON enrollments
  FOR SELECT USING (student_id = auth.uid());

-- Instructors can read enrollments for their courses
CREATE POLICY "Instructors can read course enrollments" ON enrollments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM courses 
      WHERE id = course_id AND instructor_id = auth.uid()
    )
  );

-- Admins can read all enrollments
CREATE POLICY "Admins can read all enrollments" ON enrollments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );
