# UnityTrials Setup Instructions

## 🚀 Project Overview

UnityTrials is a modern clinical trial matching platform with AI-powered chatbot integration, real-time ClinicalTrials.gov API integration, and comprehensive mobile-responsive design.

## ✨ Features Implemented

### ✅ Mobile Navigation & UI/UX
- **Fixed mobile navigation** with proper hamburger menu
- **Mobile-responsive design** with proper breakpoints
- **Cursor pointers** added to all interactive elements
- **Improved mobile layout** for all sections

### ✅ AI-Powered Chatbot
- **ClinicalTrials.gov API integration** for real trial data
- **Intelligent message processing** with intent detection
- **Quick action buttons** for common queries
- **Real-time trial search** and display
- **Mobile-optimized chatbot** interface

### ✅ Database Integration (Supabase)
- **Complete database schema** for user management
- **Trial search history** tracking
- **Chatbot conversation** logging
- **User preferences** and recommendations
- **Analytics and usage** tracking

## 🛠️ Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: ClinicalTrials.gov API (if needed)
CLINICAL_TRIALS_API_KEY=your_api_key
```

### 2. Install Dependencies

```bash
npm install @supabase/supabase-js
npm install lucide-react
npm install @radix-ui/react-scroll-area
npm install @radix-ui/react-select
npm install @radix-ui/react-tabs
npm install @radix-ui/react-separator
npm install @radix-ui/react-progress
npm install @radix-ui/react-badge
```

### 3. Supabase Database Setup

1. **Create a new Supabase project** at [supabase.com](https://supabase.com)

2. **Run the database schema** from `lib/supabase-schema.sql`:
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and paste the entire schema file
   - Execute the SQL

3. **Configure Row Level Security (RLS)**:
   - The schema includes all necessary RLS policies
   - Users can only access their own data
   - Analytics events are properly secured

### 4. ClinicalTrials.gov API Integration

The application uses the official ClinicalTrials.gov API v2:

- **Base URL**: `https://clinicaltrials.gov/api/v2/studies`
- **Documentation**: [ClinicalTrials.gov API](https://clinicaltrials.gov/api/gui/ref/api_urls)
- **No API key required** for basic usage
- **Rate limiting**: 1000 requests per hour

### 5. Project Structure

```
unity/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage with mobile navigation
│   ├── about/page.tsx            # About page
│   ├── find-trials/page.tsx      # Trial search page
│   ├── types-of-trials/page.tsx  # Trial types page
│   └── layout.tsx                # Root layout with hydration fix
├── components/                   # React components
│   ├── chatbot.tsx              # AI-powered chatbot
│   ├── improved-footer.tsx      # Footer component
│   ├── testimonials-section.tsx # Testimonials
│   └── ui/                      # Shadcn/ui components
├── lib/                         # Utility libraries
│   ├── clinical-trials-api.ts   # ClinicalTrials.gov API client
│   ├── ai-service.ts            # AI chatbot service
│   ├── supabase.ts              # Supabase client
│   └── supabase-schema.sql      # Database schema
└── public/                      # Static assets
```

## 🎯 Key Improvements Made

### Mobile Navigation
- **Hamburger menu** with smooth animations
- **Mobile-first design** with proper touch targets
- **Responsive breakpoints** for all screen sizes
- **Proper z-index** management for overlays

### Chatbot Features
- **Real API integration** with ClinicalTrials.gov
- **Intent detection** for user messages
- **Quick action buttons** for common queries
- **Trial result display** with direct links
- **Mobile-optimized** chat interface

### Database Features
- **User authentication** with Supabase Auth
- **Trial search history** tracking
- **Conversation logging** for chatbot
- **User preferences** storage
- **Analytics events** tracking

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Fix linting issues
npm run lint -- --fix
```

## 📱 Mobile Responsiveness

The application is fully responsive with:

- **Mobile-first approach** (320px+)
- **Tablet optimization** (768px+)
- **Desktop enhancement** (1024px+)
- **Large screen support** (1440px+)

### Mobile Navigation Features
- **Touch-friendly buttons** (44px minimum)
- **Proper spacing** for thumb navigation
- **Smooth animations** and transitions
- **Accessible design** with proper contrast

## 🤖 Chatbot Capabilities

### AI Features
- **Natural language processing** for user queries
- **Condition detection** (cancer, diabetes, heart disease, etc.)
- **Location-based search** (cities, states)
- **Phase filtering** (Phase I, II, III, IV)
- **Intent classification** (search, information, help)

### Trial Search
- **Real-time API calls** to ClinicalTrials.gov
- **Condition-based filtering**
- **Location-based results**
- **Phase-specific searches**
- **Status filtering** (Recruiting, Active, etc.)

## 🗄️ Database Schema

The Supabase database includes:

### Core Tables
- `users` - User profiles and authentication
- `user_preferences` - Trial matching preferences
- `trial_searches` - Search history tracking
- `saved_trials` - User's saved/favorited trials
- `chatbot_conversations` - Chat history and analytics
- `trial_applications` - Application tracking
- `analytics_events` - Usage analytics
- `trial_recommendations` - AI-generated recommendations

### Security Features
- **Row Level Security (RLS)** enabled on all tables
- **User-specific data access** policies
- **Secure authentication** with Supabase Auth
- **API rate limiting** and protection

## 🚀 Deployment

### Vercel Deployment
1. **Connect your GitHub repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on push to main branch

### Environment Variables for Production
```bash
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_key
```

## 📊 Analytics & Monitoring

The application includes comprehensive analytics:

- **Page view tracking**
- **Trial search analytics**
- **Chatbot interaction metrics**
- **User engagement tracking**
- **Performance monitoring**

## 🔒 Security Considerations

- **HTTPS enforcement** for all API calls
- **Input sanitization** for user queries
- **Rate limiting** on API endpoints
- **Secure database access** with RLS
- **Environment variable protection**

## 🎨 UI/UX Improvements

### Design System
- **Consistent color palette** (teal/blue theme)
- **Modern typography** with proper hierarchy
- **Smooth animations** and transitions
- **Accessible design** with proper contrast ratios

### Mobile Experience
- **Touch-optimized** interface elements
- **Fast loading** with optimized images
- **Offline capability** for basic functionality
- **Progressive enhancement** approach

## 📞 Support & Maintenance

### Regular Updates
- **ClinicalTrials.gov API** monitoring
- **Security patches** and updates
- **Performance optimization** reviews
- **User feedback** integration

### Monitoring
- **Error tracking** with proper logging
- **Performance monitoring** for API calls
- **User analytics** for feature optimization
- **Database performance** monitoring

---

## 🎉 Ready to Launch!

Your UnityTrials application is now ready with:

✅ **Mobile-responsive design** with proper navigation  
✅ **AI-powered chatbot** with real trial data  
✅ **Supabase database** integration  
✅ **ClinicalTrials.gov API** integration  
✅ **Modern UI/UX** with cursor pointers  
✅ **Comprehensive analytics** and tracking  

Start your development server and begin connecting patients with life-changing clinical trials! 🚀 