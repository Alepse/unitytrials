# 🚀 UnityTrials Environment Setup Guide

This guide will help you set up your environment to use the ClinicalTrials.gov API with UnityTrials.

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control
- A code editor (VS Code recommended)

## 🔧 Step 1: Environment Variables Setup

Create a `.env.local` file in your project root with the following variables:

```bash
# Supabase Configuration (Optional - for advanced features)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# ClinicalTrials.gov API Configuration
CLINICAL_TRIALS_API_BASE_URL=https://clinicaltrials.gov/api/v2/studies
CLINICAL_TRIALS_API_RATE_LIMIT=1000
CLINICAL_TRIALS_API_CACHE_DURATION=3600000

# Application Configuration
NEXT_PUBLIC_APP_NAME=UnityTrials
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🗄️ Step 2: Supabase Setup (Optional but Recommended)

### 2.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login with your GitHub account
3. Click "New Project"
4. Fill in project details:
   - Organization: Select your org
   - Project name: `unity-trials`
   - Database password: Create a strong password
   - Region: Choose closest to your users
5. Click "Create new project"
6. Wait for setup (1-2 minutes)

### 2.2 Get Your Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values to your `.env.local`:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2.3 Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Copy and paste the entire content from `lib/supabase-schema.sql`
3. Click "Run" to execute the schema

## 🔌 Step 3: Install Dependencies

```bash
# Install required packages
npm install @supabase/supabase-js

# Install development dependencies (if not already installed)
npm install -D @types/node typescript
```

## 🧪 Step 4: Test the Setup

### 4.1 Test API Connection

Create a test file `test-api.js` in your project root:

```javascript
// Test API connection
async function testAPI() {
  try {
    const response = await fetch('/api/trials?condition=diabetes&limit=1')
    const data = await response.json()
    
    if (data.success) {
      console.log('✅ API connection successful!')
      console.log('Sample trial:', data.data[0])
    } else {
      console.error('❌ API error:', data.error)
    }
  } catch (error) {
    console.error('❌ Connection failed:', error)
  }
}

testAPI()
```

### 4.2 Test Supabase Connection (if configured)

```javascript
// Test Supabase connection
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (supabaseUrl && supabaseKey) {
  const supabase = createClient(supabaseUrl, supabaseKey)
  
  async function testSupabase() {
    try {
      const { data, error } = await supabase
        .from('trial_searches')
        .select('*')
        .limit(1)
      
      if (error) {
        console.error('❌ Supabase error:', error)
      } else {
        console.log('✅ Supabase connected successfully!')
      }
    } catch (err) {
      console.error('❌ Supabase test failed:', err)
    }
  }
  
  testSupabase()
} else {
  console.log('⚠️ Supabase not configured - skipping test')
}
```

## 🚀 Step 5: Run the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build
npm start
```

## 🔍 Step 6: Verify Everything Works

1. **Open your browser** to `http://localhost:3000`
2. **Click the chatbot** in the bottom right corner
3. **Test the chatbot** by asking:
   - "Find cancer trials"
   - "Show me diabetes studies"
   - "Heart disease research"

## 🛠️ Troubleshooting

### Common Issues

#### 1. API Rate Limiting
**Error**: "Rate limit exceeded"
**Solution**: Wait 1 hour or implement caching

#### 2. Network Errors
**Error**: "Unable to connect to clinical trials database"
**Solution**: Check internet connection and firewall settings

#### 3. Environment Variables Not Loading
**Error**: "process.env is undefined"
**Solution**: Restart your development server after adding `.env.local`

#### 4. Supabase Connection Issues
**Error**: "Invalid API key"
**Solution**: Verify your Supabase credentials in `.env.local`

### Debug Mode

Enable debug logging by adding to your `.env.local`:

```bash
DEBUG=true
NODE_ENV=development
```

## 📊 Monitoring and Analytics

### API Usage Monitoring

The application automatically logs:
- Search queries
- API response times
- Error rates
- User interactions

### Supabase Analytics (if configured)

Monitor in Supabase dashboard:
- **Database** → **Tables** → View search logs
- **Logs** → **API** → Monitor API calls
- **Analytics** → **Events** → Track user behavior

## 🔒 Security Considerations

1. **Never commit `.env.local`** to version control
2. **Use environment variables** for all sensitive data
3. **Implement rate limiting** to prevent abuse
4. **Validate user input** before API calls
5. **Use HTTPS** in production

## 📈 Performance Optimization

### Caching Strategy

The application implements:
- **Client-side caching** (1 hour)
- **Rate limiting** (1000 requests/hour)
- **Fallback data** for offline scenarios
- **Progressive loading** for large datasets

### API Optimization

- **Batch requests** when possible
- **Pagination** for large result sets
- **Field selection** to reduce payload size
- **Compression** for network efficiency

## 🎯 Next Steps

After setup, you can:

1. **Customize the chatbot** responses in `lib/ai-service.ts`
2. **Add more trial categories** in `lib/trials-service.ts`
3. **Implement user authentication** with Supabase Auth
4. **Add trial saving functionality** for users
5. **Create email notifications** for new trials
6. **Build a mobile app** using the same API

## 📞 Support

If you encounter issues:

1. Check the **browser console** for error messages
2. Review the **Network tab** for API call failures
3. Verify your **environment variables** are correct
4. Test with the **provided test scripts**
5. Check the **ClinicalTrials.gov API status**

## 🔗 Useful Links

- [ClinicalTrials.gov API Documentation](https://clinicaltrials.gov/api/gui/ref/api_urls)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [UnityTrials GitHub Repository](your-repo-url)

---

**Happy coding! 🎉**

Your UnityTrials application is now ready to help users find clinical trials with real-time data from ClinicalTrials.gov! 