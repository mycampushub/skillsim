# 🚀 Vercel Deployment Guide

## Prerequisites
- Supabase project created and configured
- Git repository with your code pushed

## Step 1: Configure Environment Variables

### Local Development (.env)
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Vercel Environment Variables
In your Vercel dashboard → Settings → Environment Variables:

**Production Variables:**
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Step 2: Database Setup

1. Run the SQL schema in your Supabase project:
   - Go to SQL Editor in Supabase dashboard
   - Run `add_admin_functionality.sql`

2. Verify tables are created:
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```

## Step 3: Deploy to Vercel

### Option 1: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy

### Option 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel --prod
```

## Step 4: Post-Deployment Checks

### 1. Test Authentication
- Visit your deployed app
- Try signing up a new user
- Check if user appears in Supabase Auth

### 2. Test Database Connection
- Check browser console for errors
- Verify user profiles are created in database

### 3. Test Admin Access
- Create admin user using admin functionality
- Test admin login and dashboard access

## Troubleshooting

### "Failed to fetch data" Error
1. **Check environment variables** in Vercel dashboard
2. **Verify Supabase project** is active
3. **Check CORS settings** in Supabase
4. **Clear browser cache** and retry

### Build Errors
1. Check Vercel build logs
2. Ensure all dependencies are installed
3. Verify TypeScript configuration

### Authentication Issues
1. Verify Supabase Auth settings
2. Check email confirmation settings
3. Test RLS policies

## Environment Variable Checklist

Before deploying, ensure you have:

- [ ] `VITE_SUPABASE_URL` - Your Supabase project URL
- [ ] `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

Both variables must be set in:
- [ ] Local `.env` file
- [ ] Vercel environment variables

## Default Admin Credentials

After running the SQL schema:
- **Email**: `admin@careertodo.com`
- **Password**: `admin123`

## Support

If you encounter issues:
1. Check Vercel function logs
2. Check Supabase dashboard logs
3. Verify environment variables
4. Test locally first