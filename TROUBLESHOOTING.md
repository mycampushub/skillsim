# 🔧 Supabase Connection Troubleshooting Guide

## 🚨 **"Failed to Fetch" Error - Step by Step Solution**

### **Step 1: Check Environment Variables in Vercel**

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Verify you have EXACTLY these two variables:

```
VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

4. **IMPORTANT:** Make sure all environments are checked:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development

### **Step 2: Verify Your Supabase Project Settings**

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. **Check CORS Settings:**
   - Under "Configuration", find "Additional Headers"
   - Add your Vercel domain to allowed origins:
     ```
     https://your-app-name.vercel.app
     https://localhost:3000 (for local testing)
     ```

### **Step 3: Test with Debug Components**

I've added debug components to your app. Deploy and check:

1. **Debug Information:** Shows if environment variables are loaded
2. **Connection Test:** Tests actual Supabase connectivity

### **Step 4: Common Issues & Solutions**

#### **Issue 1: Environment Variables Not Loading**
**Symptoms:** Debug shows "Not found" for URL/Key
**Solution:**
- Variables must have `VITE_` prefix
- Redeploy after changing variables
- Check spelling exactly

#### **Issue 2: CORS Error**
**Symptoms:** Browser console shows CORS error
**Solution:**
- Add your Vercel domain to Supabase CORS settings
- Wait 2-3 minutes for changes to take effect

#### **Issue 3: Invalid URL Format**
**Symptoms:** URL doesn't look right
**Solution:**
- URL should be: `https://abcdefgh1234.supabase.co`
- Must include `https://` prefix
- Must end with `.supabase.co`

#### **Issue 4: Invalid Key Format**
**Symptoms:** Key doesn't start with `eyJ`
**Solution:**
- Get the **anon public** key, not service role key
- Key should be a long JWT token

### **Step 5: Manual Testing**

#### **Test 1: Direct API Call**
Open browser console and run:
```javascript
fetch('https://your-project.supabase.co/rest/v1/', {
  headers: {
    'apikey': 'your-anon-key',
    'Authorization': 'Bearer your-anon-key'
  }
})
.then(res => res.json())
.then(data => console.log('Success:', data))
.catch(err => console.error('Error:', err))
```

#### **Test 2: Check Network Tab**
1. Open browser dev tools (F12)
2. Go to Network tab
3. Try to sign up
4. Look for failed requests to `supabase.co`
5. Check the error details

### **Step 6: Supabase Project Configuration**

#### **Authentication Settings:**
1. In Supabase Dashboard → Authentication → Settings
2. **Site URL:** Set to `https://your-app-name.vercel.app`
3. **Redirect URLs:** Add the same URL
4. **Enable email confirmations:** Based on your preference

#### **Database Setup:**
1. Go to SQL Editor
2. Run this to create basic users table:
```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);
```

### **Step 7: Environment Variable Debugging**

Create a test route to verify variables:

```javascript
// Add this to any component to debug
console.log('Environment Debug:');
console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
console.log('Mode:', import.meta.env.MODE);
```

### **Step 8: Final Checklist**

Before giving up, verify:

- [ ] Supabase project is active (not paused)
- [ ] Environment variables have `VITE_` prefix
- [ ] All environments selected in Vercel
- [ ] App redeployed after variables added
- [ ] CORS configured in Supabase
- [ ] Authentication settings configured
- [ ] Database tables exist
- [ ] No typos in variable names

### **Step 9: Alternative Solutions**

If still not working:

1. **Create new Supabase project**
2. **Use different Vercel account**
3. **Check if Supabase is down:** [Supabase Status](https://status.supabase.com)
4. **Contact Vercel/Supabase support**

---

## 🆘 **If You Need Help**

1. **Share your debug info** from the debug components
2. **Share browser console errors**
3. **Share network tab failures**
4. **Share your environment variable names** (not values)

Deploy the updated code with debug components and check what information they show you!