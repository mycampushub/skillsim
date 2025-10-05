# 🔍 Environment Variable Troubleshooting Checklist

## 🚨 **Most Common Issues with VITE_SUPABASE_ANON_KEY**

### **1. Variable Name Issues**
❌ **Wrong:** `SUPABASE_ANON_KEY`
❌ **Wrong:** `VITE_SUPABASE_KEY`  
❌ **Wrong:** `VITE_SUPABASE_ANON`
✅ **Correct:** `VITE_SUPABASE_ANON_KEY`

### **2. Value Format Issues**
❌ **Wrong:** `your-supabase-anon-key-here` (placeholder)
❌ **Wrong:** `https://your-project.supabase.co` (this is URL, not key)
❌ **Wrong:** Short keys under 100 characters
✅ **Correct:** Long JWT token starting with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### **3. Vercel Configuration Issues**
❌ **Wrong:** Only Production environment selected
❌ **Wrong:** Extra spaces in variable name or value
❌ **Wrong:** Quotes around the value
✅ **Correct:** All environments selected (Production, Preview, Development)

### **4. Key Source Issues**
Make sure you're copying the **right key** from Supabase:

**Go to:** Supabase Dashboard → Settings → API

✅ **Use:** `anon public` key
❌ **Don't use:** `service_role` key (for server-side only)

## 📋 **Step-by-Step Verification**

### **Step 1: Check Your Supabase Dashboard**
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy the **anon public** key (should be 200+ characters)

### **Step 2: Check Vercel Environment Variables**
1. Go to your Vercel project
2. **Settings** → **Environment Variables**
3. You should see EXACTLY these two variables:

```
Variable Name: VITE_SUPABASE_URL
Variable Value: https://your-project-id.supabase.co
Environments: ✅Production ✅Preview ✅Development

Variable Name: VITE_SUPABASE_ANON_KEY
Variable Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (long token)
Environments: ✅Production ✅Preview ✅Development
```

### **Step 3: Deploy and Check Debug Info**
1. Deploy the updated code with detailed debugging
2. Check the red debug box at the top of your app
3. Look for these specific indicators:

**✅ Good Signs:**
- `VITE_SUPABASE_URL: https://your-project.supabase.co`
- `VITE_SUPABASE_ANON_KEY: eyJ...`
- `Exists: ✅ YES` for both
- `Starts with eyJ: ✅`

**❌ Bad Signs:**
- `Value: NULL` or `Value: undefined`
- `Exists: ❌ NO`
- `Length: 0`
- `All VITE_ Variables Found: []` (empty list)

## 🚨 **Quick Fixes to Try**

### **Fix 1: Recreate Variables**
1. **Delete** all existing environment variables in Vercel
2. **Add them back** with exact names and values
3. **Select all three environments**
4. **Redeploy**

### **Fix 2: Check for Typos**
Common typos:
- `VITE_SUPABASE_ANON_KEY` vs `VITE_SUPABASE_ANONKEY`
- Extra spaces: ` VITE_SUPABASE_ANON_KEY ` 
- Wrong case: `vite_supabase_anon_key`

### **Fix 3: Verify Key Source**
Make sure you're copying from the right place:
```
Supabase Dashboard → Settings → API → anon public
```

The key should look like:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdC1pZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjE2NjQ5MDIyLCJleHAiOjE5MzIyMjUwMjJ9.abc123def456...
```

## 🔧 **Test These Values**

### **Valid URL Example:**
```
https://abcdefghijk123456.supabase.co
```

### **Valid Key Example:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdC1pZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjE2NjQ5MDIyLCJleHAiOjE5MzIyMjUwMjJ9.longstringhere...
```

## 📱 **Deploy and Test**

1. **Deploy this updated code:**
   ```bash
   git add .
   git commit -m "Add detailed environment debugging"
   git push origin main
   ```

2. **Check the debug output** - it will tell you exactly what's wrong

3. **Share the debug output** if you're still stuck

---

**🎯 The detailed debug component I added will show you exactly what's wrong with your environment variables!**