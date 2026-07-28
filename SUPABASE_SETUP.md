# Supabase Setup Instructions

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for an account (or log in if you already have one)
3. Click "New Project"
4. Fill in the project details:
   - **Name**: acquire-workflow
   - **Database Password**: (choose a strong password - save this!)
   - **Region**: Choose closest to your location
   - **Pricing Plan**: Free tier is fine for MVP

## Step 2: Get Your Credentials

Once your project is created (takes 1-2 minutes):

1. Go to Project Settings → API
2. Copy these values:
   - **Project URL**: Something like `https://xyz.supabase.co`
   - **anon public**: Something like `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## Step 3: Configure Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_APP_NAME=Acquire Workflow
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 4: Run Database Schema

1. Go to your Supabase project
2. Navigate to SQL Editor (in the left sidebar)
3. Copy the contents of `DATABASE_SCHEMA.md`
4. Paste it into the SQL Editor
5. Click "Run" to execute the schema

## Step 5: Create Initial Data

After the schema is created, run the seed data SQL (I'll provide this next) to create:
- Admin and team member roles
- Initial categories
- Sample workflows
- Sample scripts

## Step 6: Enable Row Level Security

The schema includes RLS policies, but make sure they're enabled:
1. Go to Authentication → Policies
2. Verify that RLS is enabled on all tables
3. Review the policies to ensure they match your requirements

## Troubleshooting

**Connection Issues:**
- Make sure your project URL and anon key are correct
- Check that your project is not paused (Supabase free tier pauses after 1 week of inactivity)

**Schema Errors:**
- Make sure you ran the entire schema SQL
- Check for any syntax errors in the SQL Editor

**Permission Issues:**
- Verify RLS policies are correctly configured
- Check that your anon key has the right permissions

## Next Steps

After setup is complete:
1. Test the connection by running the development server
2. Verify that authentication works
3. Check that database queries return data
4. Proceed with importing your Excel data
