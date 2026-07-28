# Environment Setup

## Supabase Configuration

1. Create a new Supabase project at [https://supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy your Project URL and Anon Key
4. Create a `.env.local` file in the project root with the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

NEXT_PUBLIC_APP_NAME=Acquire Workflow
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Database Setup

Run the SQL schema from `DATABASE_SCHEMA.md` in your Supabase SQL Editor to create the required tables and indexes.

## Initial Data Setup

After creating the database, run the seed script to create:
- Admin role
- Team member role
- Initial categories
- Sample workflows
- Sample scripts
- Synonym groups

## Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)
