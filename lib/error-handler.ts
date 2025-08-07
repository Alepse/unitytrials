// Error Handler for Clinical Trials API
// Provides fallback data and user-friendly error messages

export interface ErrorResponse {
  error: string
  userMessage: string
  fallbackData?: any
  retryAfter?: number
}

export class ErrorHandler {
  private static readonly FALLBACK_TRIALS = [
    {
      id: 'fallback-1',
      nctId: 'NCT12345678',
      title: 'Phase III Diabetes Prevention Study',
      officialTitle: 'A Phase III Study for Diabetes Prevention',
      condition: ['Type 2 Diabetes'],
      phase: ['Phase 3'],
      status: 'Recruiting',
      location: ['United States'],
      sponsor: 'National Institute of Diabetes and Digestive and Kidney Diseases',
      description: 'This study evaluates a new medication for preventing Type 2 diabetes in high-risk individuals. The study is currently recruiting participants across multiple locations in the United States.',
      eligibility: 'Adults aged 18-75 with prediabetes or high risk for diabetes',
      ageRange: '18 - 75 years',
      sex: 'All',
      healthyVolunteers: 'No',
      studyType: 'Interventional',
      enrollmentCount: 500,
      startDate: 'Jan 15, 2024',
      completionDate: 'Dec 31, 2026',
      lastUpdated: 'Mar 1, 2024',
      keywords: ['diabetes', 'prevention', 'medication'],
      matchScore: 85,
      isSaved: false
    },
    {
      id: 'fallback-2',
      nctId: 'NCT87654321',
      title: 'Advanced Cancer Immunotherapy Trial',
      officialTitle: 'Immunotherapy for Advanced Solid Tumors',
      condition: ['Lung Cancer', 'Breast Cancer'],
      phase: ['Phase 2'],
      status: 'Recruiting',
      location: ['United States'],
      sponsor: 'Memorial Sloan Kettering Cancer Center',
      description: 'This clinical trial is testing innovative immunotherapy combinations for advanced solid tumors. The study aims to improve treatment outcomes for patients with limited options.',
      eligibility: 'Adults with advanced solid tumors who have failed standard treatments',
      ageRange: '18+ years',
      sex: 'All',
      healthyVolunteers: 'No',
      studyType: 'Interventional',
      enrollmentCount: 200,
      startDate: 'Feb 1, 2024',
      completionDate: 'Jun 30, 2025',
      lastUpdated: 'Feb 15, 2024',
      keywords: ['immunotherapy', 'cancer', 'solid tumors'],
      matchScore: 80,
      isSaved: false
    },
    {
      id: 'fallback-3',
      nctId: 'NCT11223344',
      title: 'Cardiovascular Health Research Study',
      officialTitle: 'Cardiovascular Disease Prevention and Treatment',
      condition: ['Heart Disease', 'Hypertension'],
      phase: ['Phase 3'],
      status: 'Recruiting',
      location: ['United States'],
      sponsor: 'American Heart Association',
      description: 'This study evaluates new approaches for cardiovascular disease prevention and treatment. The research focuses on innovative therapies that may improve heart health outcomes.',
      eligibility: 'Adults with cardiovascular risk factors or established heart disease',
      ageRange: '21 - 80 years',
      sex: 'All',
      healthyVolunteers: 'No',
      studyType: 'Interventional',
      enrollmentCount: 1000,
      startDate: 'Mar 1, 2024',
      completionDate: 'Dec 31, 2027',
      lastUpdated: 'Mar 10, 2024',
      keywords: ['cardiovascular', 'heart disease', 'prevention'],
      matchScore: 75,
      isSaved: false
    }
  ]

  static handleAPIError(error: any, context: string = 'general'): ErrorResponse {
    console.error(`API Error in ${context}:`, error)

    // Network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        error: 'NETWORK_ERROR',
        userMessage: 'Unable to connect to the clinical trials database. Please check your internet connection and try again.',
        fallbackData: this.getFallbackData(context),
        retryAfter: 30
      }
    }

    // Rate limiting
    if (error.message?.includes('Rate limit exceeded')) {
      return {
        error: 'RATE_LIMIT',
        userMessage: 'We\'ve reached our search limit. Please wait a moment and try again, or contact us for assistance.',
        fallbackData: this.getFallbackData(context),
        retryAfter: 60
      }
    }

    // Timeout errors
    if (error.name === 'AbortError' || error.message?.includes('timeout')) {
      return {
        error: 'TIMEOUT',
        userMessage: 'The request took too long to complete. Please try again with a more specific search term.',
        fallbackData: this.getFallbackData(context),
        retryAfter: 10
      }
    }

    // HTTP errors
    if (error.message?.includes('HTTP')) {
      const statusMatch = error.message.match(/HTTP (\d+)/)
      const status = statusMatch ? parseInt(statusMatch[1]) : 500

      switch (status) {
        case 400:
          return {
            error: 'BAD_REQUEST',
            userMessage: 'Your search request couldn\'t be processed. Please try different keywords or contact support.',
            fallbackData: this.getFallbackData(context)
          }
        case 404:
          return {
            error: 'NOT_FOUND',
            userMessage: 'No clinical trials found for your search. Try broadening your search terms or check spelling.',
            fallbackData: this.getFallbackData(context)
          }
        case 429:
          return {
            error: 'RATE_LIMIT',
            userMessage: 'Too many requests. Please wait a moment before searching again.',
            fallbackData: this.getFallbackData(context),
            retryAfter: 60
          }
        case 500:
        case 502:
        case 503:
        case 504:
          return {
            error: 'SERVER_ERROR',
            userMessage: 'The clinical trials database is temporarily unavailable. Please try again in a few minutes.',
            fallbackData: this.getFallbackData(context),
            retryAfter: 120
          }
        default:
          return {
            error: 'UNKNOWN_ERROR',
            userMessage: 'An unexpected error occurred. Please try again or contact support if the problem persists.',
            fallbackData: this.getFallbackData(context)
          }
      }
    }

    // Generic error
    return {
      error: 'UNKNOWN_ERROR',
      userMessage: 'Something went wrong while searching for clinical trials. Please try again.',
      fallbackData: this.getFallbackData(context)
    }
  }

  private static getFallbackData(context: string): any {
    // Return relevant fallback data based on context
    if (context.includes('cancer') || context.includes('oncology')) {
      return [this.FALLBACK_TRIALS[1]] // Cancer trial
    }
    if (context.includes('diabetes')) {
      return [this.FALLBACK_TRIALS[0]] // Diabetes trial
    }
    if (context.includes('heart') || context.includes('cardiovascular')) {
      return [this.FALLBACK_TRIALS[2]] // Heart disease trial
    }
    
    // Return all fallback trials for general searches
    return this.FALLBACK_TRIALS
  }

  static getRetryMessage(retryAfter: number): string {
    if (retryAfter < 60) {
      return `Please try again in ${retryAfter} seconds.`
    }
    if (retryAfter < 3600) {
      const minutes = Math.ceil(retryAfter / 60)
      return `Please try again in ${minutes} minute${minutes > 1 ? 's' : ''}.`
    }
    const hours = Math.ceil(retryAfter / 3600)
    return `Please try again in ${hours} hour${hours > 1 ? 's' : ''}.`
  }

  static isRetryableError(error: ErrorResponse): boolean {
    return ['NETWORK_ERROR', 'TIMEOUT', 'RATE_LIMIT', 'SERVER_ERROR'].includes(error.error)
  }

  static getErrorIcon(error: ErrorResponse): string {
    switch (error.error) {
      case 'NETWORK_ERROR':
        return 'Wifi'
      case 'RATE_LIMIT':
        return 'Clock'
      case 'TIMEOUT':
        return 'Hourglass'
      case 'SERVER_ERROR':
        return 'Server'
      default:
        return 'AlertCircle'
    }
  }

  static getErrorColor(error: ErrorResponse): string {
    switch (error.error) {
      case 'NETWORK_ERROR':
        return 'text-orange-600 bg-orange-50'
      case 'RATE_LIMIT':
        return 'text-yellow-600 bg-yellow-50'
      case 'TIMEOUT':
        return 'text-blue-600 bg-blue-50'
      case 'SERVER_ERROR':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-slate-600 bg-slate-50'
    }
  }
}

// Utility function for handling async operations with error handling
export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  context: string = 'general',
  fallback?: T
): Promise<{ data: T | null; error: ErrorResponse | null }> {
  try {
    const data = await operation()
    return { data, error: null }
  } catch (error) {
    const errorResponse = ErrorHandler.handleAPIError(error, context)
    return { data: fallback || null, error: errorResponse }
  }
} 