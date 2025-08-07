// Comprehensive API Client for ClinicalTrials.gov
// Handles caching, rate limiting, and error management

export interface APIConfig {
  baseUrl: string
  rateLimit: number
  cacheDuration: number
}

export interface CacheEntry {
  data: any
  timestamp: number
  expiresAt: number
}

export class APIClient {
  private baseUrl: string
  private rateLimit: number
  private cacheDuration: number
  private cache: Map<string, CacheEntry> = new Map()
  private requestCount: number = 0
  private lastResetTime: number = Date.now()

  constructor(config: APIConfig) {
    this.baseUrl = config.baseUrl
    this.rateLimit = config.rateLimit
    this.cacheDuration = config.cacheDuration
  }

  private getCacheKey(endpoint: string, params: Record<string, any>): string {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&')
    return `${endpoint}?${sortedParams}`
  }

  private isCacheValid(cacheKey: string): boolean {
    const entry = this.cache.get(cacheKey)
    if (!entry) return false
    return Date.now() < entry.expiresAt
  }

  private getCachedData(cacheKey: string): any | null {
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)?.data || null
    }
    this.cache.delete(cacheKey)
    return null
  }

  private setCachedData(cacheKey: string, data: any): void {
    const now = Date.now()
    this.cache.set(cacheKey, {
      data,
      timestamp: now,
      expiresAt: now + this.cacheDuration
    })
  }

  private checkRateLimit(): boolean {
    const now = Date.now()
    const hourInMs = 60 * 60 * 1000

    // Reset counter if an hour has passed
    if (now - this.lastResetTime > hourInMs) {
      this.requestCount = 0
      this.lastResetTime = now
    }

    if (this.requestCount >= this.rateLimit) {
      return false
    }

    this.requestCount++
    return true
  }

  private async makeRequest(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    const cacheKey = this.getCacheKey(endpoint, params)
    
    // Check cache first
    const cachedData = this.getCachedData(cacheKey)
    if (cachedData) {
      console.log('Returning cached data for:', cacheKey)
      return cachedData
    }

    // Check rate limit
    if (!this.checkRateLimit()) {
      throw new Error('Rate limit exceeded. Please try again later.')
    }

    // Build URL - Fix the URL construction
    let url: string
    if (endpoint.startsWith('/')) {
      url = `${this.baseUrl}${endpoint}`
    } else {
      // Don't add extra slash if baseUrl already ends with one
      const separator = this.baseUrl.endsWith('/') ? '' : '/'
      url = `${this.baseUrl}${separator}${endpoint}`
    }
    
    // Add query parameters
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString())
      }
    })
    
    if (searchParams.toString()) {
      url += `?${searchParams.toString()}`
    }

    try {
      console.log('Making API request to:', url)
      console.log('Base URL:', this.baseUrl)
      console.log('Endpoint:', endpoint)
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'UnityTrials/1.0 (Clinical Trial Matching Platform)'
        },
        // Add timeout
        signal: AbortSignal.timeout(10000) // 10 second timeout
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      
      // Cache the successful response
      this.setCachedData(cacheKey, data)
      
      return data
    } catch (error) {
      console.error('API request failed:', error)
      
      // Return cached data if available, even if expired
      const expiredEntry = this.cache.get(cacheKey)
      if (expiredEntry) {
        console.log('Returning expired cached data as fallback')
        return expiredEntry.data
      }
      
      throw error
    }
  }

  async searchTrials(params: {
    condition?: string
    location?: string
    phase?: string
    status?: string
    age?: string
    sex?: string
    limit?: number
    offset?: number
    studyType?: string
    sponsor?: string
    intervention?: string
    outcome?: string
    dateRange?: string
    country?: string
  }): Promise<any> {
    // Essential fields from ClinicalTrials.gov API (using correct field names)
    const essentialFields = [
      'NCTId', 'BriefTitle', 'Condition', 'OverallStatus', 
      'LocationCountry', 'LocationState', 'LeadSponsorName'
    ].join(',')

    const apiParams: Record<string, any> = {
      'pageSize': params.limit || 10,
      'pageToken': params.offset || 0,
      'fields': essentialFields
    }

    // Build search query for ClinicalTrials.gov API v2 using simple terms
    let searchTerms: string[] = []
    
    if (params.condition) {
      searchTerms.push(params.condition)
    }
    if (params.status) {
      searchTerms.push(params.status)
    }
    if (params.country) {
      // For USA searches, just use "United States" to get trials from all US states
      if (params.country.toLowerCase().includes('united states') || params.country.toLowerCase().includes('usa')) {
        searchTerms.push('United States')
      } else {
        searchTerms.push(params.country)
      }
    }
    if (params.location) {
      searchTerms.push(params.location)
    }
    if (params.phase) {
      searchTerms.push(params.phase)
    }

    // If no search terms are provided, use a default search for all trials
    if (searchTerms.length === 0) {
      searchTerms.push('clinical trial')
    }

    // Combine all search terms for better search results
    if (searchTerms.length > 0) {
      apiParams['query.term'] = searchTerms.join(' ')
    }

    console.log('API Client - Making request with params:', apiParams)
    console.log('API Client - query.term value:', apiParams['query.term'])

    try {
      const result = await this.makeRequest('studies', apiParams)
      console.log('API Client - Request successful, studies found:', result?.studies?.length || 0)
      return result
    } catch (error) {
      console.error('API Client - Request failed:', error)
      throw error
    }
  }

  async getTrialDetails(nctId: string): Promise<any> {
    return this.makeRequest(`studies/${nctId}`)
  }

  async searchByCondition(condition: string, limit: number = 5): Promise<any> {
    return this.searchTrials({
      condition,
      status: 'Recruiting',
      limit
    })
  }

  async searchByLocation(location: string, limit: number = 5): Promise<any> {
    return this.searchTrials({
      location,
      status: 'Recruiting',
      limit
    })
  }

  async searchByPhase(phase: string, limit: number = 5): Promise<any> {
    return this.searchTrials({
      phase,
      status: 'Recruiting',
      limit
    })
  }

  // Advanced search methods
  async advancedSearch(params: {
    condition?: string
    location?: string
    phase?: string
    status?: string
    age?: string
    sex?: string
    studyType?: string
    sponsor?: string
    intervention?: string
    outcome?: string
    dateRange?: string
    country?: string
    limit?: number
    offset?: number
  }): Promise<any> {
    return this.searchTrials(params)
  }

  async searchByIntervention(intervention: string, limit: number = 5): Promise<any> {
    return this.searchTrials({
      intervention,
      status: 'Recruiting',
      limit
    })
  }

  async searchBySponsor(sponsor: string, limit: number = 5): Promise<any> {
    return this.searchTrials({
      sponsor,
      status: 'Recruiting',
      limit
    })
  }

  async searchByOutcome(outcome: string, limit: number = 5): Promise<any> {
    return this.searchTrials({
      outcome,
      status: 'Recruiting',
      limit
    })
  }

  async searchByDateRange(startDate: string, endDate: string, limit: number = 5): Promise<any> {
    return this.searchTrials({
      dateRange: `${startDate}:${endDate}`,
      status: 'Recruiting',
      limit
    })
  }

  // USA-only search methods
  async searchTrialsUSA(params: {
    condition?: string
    location?: string
    phase?: string
    status?: string
    age?: string
    sex?: string
    limit?: number
    offset?: number
    studyType?: string
    sponsor?: string
    intervention?: string
    outcome?: string
    dateRange?: string
  }): Promise<any> {
    return this.searchTrials({
      ...params,
      country: 'United States'
    })
  }

  async searchByConditionUSA(condition: string, limit: number = 5): Promise<any> {
    return this.searchTrials({
      condition,
      status: 'Recruiting',
      country: 'United States',
      limit
    })
  }

  async searchByLocationUSA(location: string, limit: number = 5): Promise<any> {
    return this.searchTrials({
      location,
      status: 'Recruiting',
      country: 'United States',
      limit
    })
  }

  // Get complete trial details with all available information
  async getCompleteTrialDetails(nctId: string): Promise<any> {
    const detailedFields = [
      'NCTId', 'BriefTitle', 'OfficialTitle', 'Acronym', 'Condition', 'ConditionMeshTerm',
      'Phase', 'OverallStatus', 'StudyType', 'EnrollmentCount', 'EnrollmentCountActual',
      'LocationCountry', 'LocationState', 'LocationCity', 'LocationFacility',
      'LeadSponsorName', 'LeadSponsorClass', 'CollaboratorName', 'CollaboratorClass',
      'BriefSummary', 'DetailedDescription', 'EligibilityCriteria', 'MinimumAge',
      'MaximumAge', 'Sex', 'HealthyVolunteers', 'StudyPopulation', 'SamplingMethod',
      'StartDate', 'CompletionDate', 'PrimaryCompletionDate', 'LastUpdatePostDate',
      'FirstPostedDate', 'ResultsFirstPostedDate', 'LastVerifiedDate',
      'Keyword', 'MeshTerm', 'InterventionName', 'InterventionType', 'InterventionDescription',
      'PrimaryOutcomeMeasure', 'PrimaryOutcomeDescription', 'PrimaryOutcomeTimeFrame',
      'SecondaryOutcomeMeasure', 'SecondaryOutcomeDescription', 'SecondaryOutcomeTimeFrame',
      'OtherOutcomeMeasure', 'OtherOutcomeDescription', 'OtherOutcomeTimeFrame',
      'StudyArms', 'StudyDesignInfo', 'StudyDesignAllocation', 'StudyDesignInterventionModel',
      'StudyDesignPrimaryPurpose', 'StudyDesignMasking', 'StudyDesignMaskingDescription',
      'StudyDesignObservationalModel', 'StudyDesignTimePerspective', 'StudyDesignBioSpecRetention',
      'StudyDesignBioSpecDescription', 'StudyDesignSamplingMethod', 'StudyDesignPopulation',
      'StudyDesignStudyPopulation', 'StudyDesignSamplingMethodDescription'
    ].join(',')

    return this.makeRequest(`studies/${nctId}`, { fields: detailedFields })
  }

  // Utility methods
  clearCache(): void {
    this.cache.clear()
  }

  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    }
  }

  getRateLimitStatus(): { current: number; limit: number; resetTime: number } {
    return {
      current: this.requestCount,
      limit: this.rateLimit,
      resetTime: this.lastResetTime + (60 * 60 * 1000)
    }
  }
}

  // Create singleton instance
  export const apiClient = new APIClient({
    baseUrl: 'https://clinicaltrials.gov/api/v2',
    rateLimit: parseInt(process.env.CLINICAL_TRIALS_API_RATE_LIMIT || '1000'),
    cacheDuration: parseInt(process.env.CLINICAL_TRIALS_API_CACHE_DURATION || '3600000')
  })
  
  // Clear cache on startup to ensure fresh data
  apiClient.clearCache() 