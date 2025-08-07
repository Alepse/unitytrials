import { NextRequest, NextResponse } from 'next/server'
import { apiClient } from '@/lib/api-client'

export async function GET(
  request: NextRequest,
  { params }: { params: { nctId: string } }
) {
  try {
    const { nctId } = params

    if (!nctId) {
      return NextResponse.json(
        { success: false, error: 'NCT ID is required' },
        { status: 400 }
      )
    }

    console.log(`Fetching complete details for trial: ${nctId}`)

    // Get complete trial details using the enhanced API client
    const trialData = await apiClient.getCompleteTrialDetails(nctId)

    if (!trialData) {
      return NextResponse.json(
        { success: false, error: 'Trial not found' },
        { status: 404 }
      )
    }

    // Log to Supabase if available
    try {
      const { createClient } = await import('@/lib/supabase')
      const supabase = createClient()
      
      if (supabase) {
        await supabase.from('trial_searches').insert({
          search_type: 'trial_details',
          search_query: nctId,
          results_count: 1,
          user_agent: request.headers.get('user-agent') || 'unknown'
        })
      }
    } catch (supabaseError) {
      console.log('Supabase logging skipped:', supabaseError)
    }

    return NextResponse.json({
      success: true,
      data: trialData,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error fetching trial details:', error)
    
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