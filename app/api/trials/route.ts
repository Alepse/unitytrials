import { NextRequest, NextResponse } from 'next/server'
import { apiClient } from '@/lib/api-client'

// Only import Supabase if environment variables are available
let supabase: any = null
try {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const { createClient } = require('@supabase/supabase-js')
    supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  }
} catch (error) {
  console.warn('Supabase not configured:', error)
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Extract query parameters
    const condition = searchParams.get('condition')
    const location = searchParams.get('location')
    const phase = searchParams.get('phase')
    const status = searchParams.get('status') || 'Recruiting'
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')
    const country = searchParams.get('country')
    
         // Clean and validate condition parameter
     let cleanCondition = condition
     if (condition) {
       // Handle invalid condition values from chatbot
       const invalidConditions: Record<string, string> = {
         'show all categories': '',
         'diabetes research': 'diabetes',
         'cancer trials': 'cancer',
         'cardiovascular trials': 'cardiovascular',
         'mental health trials': 'mental health',
         'pediatric trials': 'pediatric',
         'rare disease trials': 'rare disease',
         'vaccine trials': 'vaccine',
         'drug trials': 'drug',
         'treatment trials': 'treatment',
         'what else': '',
         'depress': 'depression',
         'anxiety': 'anxiety',
         'heart': 'cardiovascular',
         'lung': 'respiratory',
         'brain': 'neurological',
         'kidney': 'renal',
         'liver': 'hepatic',
         'bone': 'orthopedic',
         'skin': 'dermatological',
         'eye': 'ophthalmological',
         'ear': 'otological',
         'nose': 'rhinological',
         'throat': 'otolaryngological',
         'stomach': 'gastrointestinal',
         'intestine': 'gastrointestinal',
         'blood': 'hematological',
         'immune': 'immunological',
         'hormone': 'endocrinological',
         'thyroid': 'endocrinological',
         'diabetes': 'diabetes',
         'cancer': 'cancer',
         'tumor': 'cancer',
         'leukemia': 'cancer',
         'lymphoma': 'cancer',
         'melanoma': 'cancer',
         'breast': 'breast cancer',
         'prostate': 'prostate cancer',
         'lung cancer': 'lung cancer',
         'colon': 'colorectal cancer',
         'ovarian': 'ovarian cancer',
         'pancreatic': 'pancreatic cancer',
         'liver cancer': 'liver cancer',
         'brain cancer': 'brain cancer',
         'bone cancer': 'bone cancer',
         'skin cancer': 'skin cancer',
         'eye cancer': 'eye cancer',
         'ear cancer': 'ear cancer',
         'nose cancer': 'nose cancer',
         'throat cancer': 'throat cancer',
         'stomach cancer': 'stomach cancer',
         'intestine cancer': 'intestinal cancer',
         'blood cancer': 'blood cancer',
         'immune cancer': 'immune cancer',
         'hormone cancer': 'hormone cancer',
         'thyroid cancer': 'thyroid cancer'
       }
       
       const lowerCondition = condition.toLowerCase()
       if (invalidConditions[lowerCondition]) {
         cleanCondition = invalidConditions[lowerCondition]
       } else {
         // If it's not in our mapping, check if it's a valid medical term
         const validMedicalTerms = [
           'diabetes', 'cancer', 'depression', 'anxiety', 'cardiovascular', 'respiratory',
           'neurological', 'renal', 'hepatic', 'orthopedic', 'dermatological', 'ophthalmological',
           'otological', 'rhinological', 'otolaryngological', 'gastrointestinal', 'hematological',
           'immunological', 'endocrinological', 'breast', 'prostate', 'lung', 'colon', 'ovarian',
           'pancreatic', 'liver', 'brain', 'bone', 'skin', 'eye', 'ear', 'nose', 'throat',
           'stomach', 'intestine', 'blood', 'immune', 'hormone', 'thyroid', 'mental health',
           'pediatric', 'rare disease', 'vaccine', 'drug', 'treatment', 'therapy', 'medication',
           'surgery', 'radiation', 'chemotherapy', 'immunotherapy', 'targeted therapy',
           'gene therapy', 'stem cell', 'transplant', 'vaccination', 'prevention', 'screening',
           'diagnosis', 'monitoring', 'rehabilitation', 'palliative', 'hospice', 'end of life'
         ]
         
         // If the condition is not a valid medical term, use a default search
         if (!validMedicalTerms.some(term => lowerCondition.includes(term))) {
           cleanCondition = '' // Use empty condition to search for all trials
         }
       }
     }
    
    // Validate required parameters - make this more flexible
    if (!cleanCondition && !location && !phase && !country) {
      return NextResponse.json(
        { error: 'At least one search parameter (condition, location, phase, or country) is required' },
        { status: 400 }
      )
    }

    // Prepare search parameters for the API client
    const searchParams_obj: any = {
      status,
      limit,
      offset
    }

    // Add optional parameters only if they exist and are valid
    if (cleanCondition) searchParams_obj.condition = cleanCondition
    if (location) searchParams_obj.location = location
    if (phase) searchParams_obj.phase = phase
    if (country) searchParams_obj.country = country

    console.log('Making API request with params:', searchParams_obj)

    // Make API request to ClinicalTrials.gov
    const data = await apiClient.searchTrials(searchParams_obj)
    
    console.log('API response received:', {
      success: !!data,
      studiesCount: data?.studies?.length || 0,
      totalCount: data?.totalCount || 0
    })
    
    // Log search to Supabase if available
    if (supabase) {
      try {
        await supabase
          .from('trial_searches')
          .insert({
            search_query: JSON.stringify(searchParams_obj),
            results_count: data.studies?.length || 0,
            search_filters: searchParams_obj,
            search_type: country === 'United States' ? 'usa_only' : 'general',
            ip_address: request.headers.get('x-forwarded-for') || 'unknown',
            user_agent: request.headers.get('user-agent')
          })
      } catch (dbError) {
        console.warn('Failed to log search to database:', dbError)
        // Don't fail the request if logging fails
      }
    }

    return NextResponse.json({
      success: true,
      data: data.studies || [],
      total: data.totalCount || 0,
      pageToken: data.pageToken || null
    })

  } catch (error) {
    console.error('API route error:', error)
    
    // Return a more detailed error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorDetails = error instanceof Error ? error.stack : undefined
    
    console.error('Error details:', {
      message: errorMessage,
      stack: errorDetails,
      timestamp: new Date().toISOString()
    })
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch clinical trials',
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nctId } = body

    if (!nctId) {
      return NextResponse.json(
        { error: 'NCT ID is required' },
        { status: 400 }
      )
    }

    // Get detailed trial information
    const trialDetails = await apiClient.getTrialDetails(nctId)

    return NextResponse.json({
      success: true,
      data: trialDetails
    })

  } catch (error) {
    console.error('API route error:', error)
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch trial details',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 