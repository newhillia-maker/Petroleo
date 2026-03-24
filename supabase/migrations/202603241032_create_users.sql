-- Create system_users table
CREATE TABLE IF NOT EXISTS system_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL,
  access_level TEXT NOT NULL CHECK (access_level IN ('Administrator', 'Operator', 'Auditor')),
  status TEXT NOT NULL CHECK (status IN ('Active', 'Suspended')),
  last_login TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE system_users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow all access for now" ON system_users
  FOR ALL
  USING (true)
  WITH CHECK (true);
