-- Create alerts table
CREATE TABLE IF NOT EXISTS system_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('Critical', 'Warning', 'Info')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  batch_id TEXT,
  node_id TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE system_alerts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow all access for now" ON system_alerts
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Insert some sample alerts
INSERT INTO system_alerts (type, title, message, batch_id, node_id) VALUES
('Critical', 'Hash Mismatch Detected', 'Singapore Port Node reported inconsistent ledger entry for batch B-9282.', 'B-9282', 'Singapore_Port_Node'),
('Warning', 'High Latency Warning', 'Synchronization delay exceeding 500ms threshold at Rotterdam Hub.', NULL, 'Rotterdam_Hub_04'),
('Info', 'Batch Sealed', 'Batch B-9281 has been successfully sealed and verified by all nodes.', 'B-9281', 'Global_Network'),
('Critical', 'Unauthorized Access Attempt', 'Multiple failed login attempts detected from unrecognized IP at Terminal Manager node.', NULL, 'Terminal_Manager_Node');
