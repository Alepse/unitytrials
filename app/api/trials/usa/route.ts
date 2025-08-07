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
    
    // Validate required parameters
    if (!condition && !location && !phase) {
      return NextResponse.json(
        { error: 'At least one search parameter (condition, location, or phase) is required' },
        { status: 400 }
      )
    }

    // Make API request to ClinicalTrials.gov with USA-only filter
    const searchParams_obj: Record<string, any> = {
      condition: condition || undefined,
      location: location || undefined,
      phase: phase || undefined,
      status,
      limit,
      offset,
      country: 'United States' // Always filter for USA only
    }

    // Remove undefined values to avoid API issues
    Object.keys(searchParams_obj).forEach(key => {
      if (searchParams_obj[key] === undefined) {
        delete searchParams_obj[key]
      }
    })

    const data = await apiClient.searchTrials(searchParams_obj)
    
    // Log search to Supabase if available
    if (supabase) {
      try {
        await supabase
          .from('trial_searches')
          .insert({
            search_query: JSON.stringify(searchParams_obj),
            results_count: data.studies?.length || 0,
            search_filters: searchParams_obj,
            search_type: 'usa_only',
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
      pageToken: data.pageToken || null,
      country: 'United States'
    })

  } catch (error) {
    console.error('USA API route error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch USA clinical trials',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 