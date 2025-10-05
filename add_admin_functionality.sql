-- Add admin functionality to existing CareerToDo database
-- Run this after your original schema to add admin features

-- Add role column to users table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'role') THEN
        ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin'));
    END IF;
END $$;

-- Create admin_users table (for extended admin functionality)
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    permissions JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for admin_users
CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON admin_users(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- Add index for users role
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Add trigger for admin_users table
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS for admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Drop existing admin policies if they exist
DROP POLICY IF EXISTS "Admins can manage admin users" ON admin_users;

-- Create admin users policies
CREATE POLICY "Admins can manage admin users" ON admin_users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Update existing users policies to include admin access
DROP POLICY IF EXISTS "Admins can view all users" ON users;
DROP POLICY IF EXISTS "Admins can update all users" ON users;

CREATE POLICY "Admins can view all users" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update all users" ON users
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Update payments policies for admin access
DROP POLICY IF EXISTS "Admins can view all payments" ON payments;

CREATE POLICY "Admins can view all payments" ON payments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Update devices policies for admin access
DROP POLICY IF EXISTS "Admins can view all devices" ON devices;

CREATE POLICY "Admins can view all devices" ON devices
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create default admin user (if not exists)
INSERT INTO users (name, email, phone, password, role, is_paid, payment_status)
VALUES (
    'Admin User',
    'admin@careertodo.com',
    '+1234567890',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6ukx.LFvOe', -- password: admin123
    'admin',
    true,
    'verified'
) ON CONFLICT (email) DO NOTHING;

-- Create admin profile for default admin
INSERT INTO admin_users (user_id, email, name, phone, role, permissions)
SELECT 
    id,
    email,
    name,
    phone,
    role,
    '{"users": "read_write", "payments": "read_write", "admin": "full"}'::jsonb
FROM users 
WHERE email = 'admin@careertodo.com' AND role = 'admin'
ON CONFLICT (email) DO NOTHING;