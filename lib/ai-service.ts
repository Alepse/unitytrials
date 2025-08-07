// AI Service for Clinical Trial Chatbot
import { ClinicalTrial } from './clinical-trials-api'
import { TransformedTrial } from './trials-service'
import { answerWebsiteQuestion } from './website-knowledge'

export interface AIResponse {
  message: string
  trials?: TransformedTrial[]
  suggestions?: string[]
  quickActions?: QuickAction[]
  intent: 'search' | 'information' | 'help' | 'greeting' | 'website' | 'general' | 'trial_details'
  confidence?: number
  context?: string
}

export interface QuickAction {
  label: string
  action: string
  icon: string
}

// Dual endpoint: Ollama (local) for dev, HuggingFace for prod
async function freeAIGeneralAnswer(question: string): Promise<string> {
  // 1. Try Ollama local endpoint (for development)
  try {
    const ollamaRes = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral', // or 'llama2', 'phi', etc.
        prompt: question,
        stream: false
      })
    })
    if (ollamaRes.ok) {
      const data = await ollamaRes.json()
      if (data.response) return data.response.trim()
    }
  } catch (err) {
    // Ignore if Ollama is not running
  }

  // 2. Fallback: HuggingFace Inference API (for production)
  const HF_API_URL = process.env.NEXT_PUBLIC_HF_API_URL || 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2';
  const HF_API_KEY = process.env.NEXT_PUBLIC_HF_API_KEY || '';
  try {
    const hfRes = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: question })
    })
    if (hfRes.ok) {
      const data = await hfRes.json()
      // HuggingFace returns [{generated_text: ...}] or {generated_text: ...}
      if (Array.isArray(data) && data[0]?.generated_text) return data[0].generated_text.trim()
      if (data.generated_text) return data.generated_text.trim()
      if (typeof data === 'string') return data.trim()
    }
  } catch (err) {
    // Ignore if HuggingFace is not available
  }

  // 3. Fallback static message
  return "I'm an open-source AI assistant. For advanced answers, connect me to a local model or HuggingFace Inference API!"
}

export class AIService {
  private conditionKeywords = {
    'cancer': ['cancer', 'tumor', 'oncology', 'malignant', 'carcinoma', 'leukemia', 'lymphoma'],
    'diabetes': ['diabetes', 'diabetic', 'blood sugar', 'glucose', 'insulin'],
    'heart': ['heart', 'cardiac', 'cardiovascular', 'hypertension', 'blood pressure'],
    'mental health': ['depression', 'anxiety', 'bipolar', 'schizophrenia', 'mental health', 'psychiatric'],
    'autoimmune': ['rheumatoid arthritis', 'lupus', 'multiple sclerosis', 'autoimmune'],
    'respiratory': ['asthma', 'copd', 'lung', 'respiratory', 'breathing'],
    'neurological': ['alzheimer', 'parkinson', 'stroke', 'neurological', 'brain'],
    'pediatric': ['pediatric', 'children', 'kids', 'child', 'infant']
  }

  private phaseKeywords = {
    'phase 1': ['phase 1', 'phase i', 'early phase', 'safety'],
    'phase 2': ['phase 2', 'phase ii', 'efficacy'],
    'phase 3': ['phase 3', 'phase iii', 'large scale', 'confirmatory'],
    'phase 4': ['phase 4', 'phase iv', 'post marketing', 'surveillance']
  }

  private locationKeywords = {
    'new york': ['new york', 'nyc', 'manhattan', 'brooklyn'],
    'california': ['california', 'los angeles', 'san francisco', 'san diego'],
    'texas': ['texas', 'houston', 'dallas', 'austin'],
    'florida': ['florida', 'miami', 'orlando', 'tampa'],
    'illinois': ['illinois', 'chicago'],
    'pennsylvania': ['pennsylvania', 'philadelphia', 'pittsburgh']
  }

  async processMessage(userMessage: string): Promise<AIResponse> {
    const messageLower = userMessage.toLowerCase()
    
    // 1. Check for website-related question
    const websiteAnswer = answerWebsiteQuestion(userMessage)
    if (websiteAnswer) {
      return {
        message: websiteAnswer,
        intent: 'website',
        confidence: 0.9,
        suggestions: [
          'How do I find trials?',
          'What is UnityTrials?',
          'How do I contact support?',
          'Tell me about the co-founders'
        ],
        quickActions: [
          { label: "Find Trials", action: "find clinical trials", icon: "Search" },
          { label: "About Us", action: "tell me about UnityTrials", icon: "Info" },
          { label: "Contact Support", action: "how do I contact support", icon: "Shield" }
        ]
      }
    }

    // 2. Check for trial-specific questions
    if (this.isTrialSpecificQuestion(messageLower)) {
      return this.handleTrialSpecificQuestion(userMessage)
    }

    // 3. Enhanced AI-powered intent detection and search handling
    const intent = await this.detectIntentWithAI(userMessage)
    
    switch (intent) {
      case 'greeting':
        return this.handleGreeting()
      case 'search':
        return await this.handleSearchWithAI(userMessage)
      case 'information':
        return this.handleInformation(messageLower)
      case 'help':
        return this.handleHelp()
      default:
        // 4. Enhanced fallback: Use AI model for general questions with better context
        return await this.handleGeneralQuestion(userMessage)
    }
  }

  private detectIntent(message: string): 'search' | 'information' | 'help' | 'greeting' {
    if (this.isGreeting(message)) return 'greeting'
    if (this.isSearchQuery(message)) return 'search'
    if (this.isInformationRequest(message)) return 'information'
    if (this.isHelpRequest(message)) return 'help'
    return 'search'
  }

  private isTrialSpecificQuestion(message: string): boolean {
    const trialKeywords = [
      'nct', 'trial details', 'study details', 'eligibility', 'intervention',
      'outcome', 'sponsor', 'location', 'phase', 'status', 'enrollment'
    ]
    return trialKeywords.some(keyword => message.includes(keyword))
  }

  private async handleTrialSpecificQuestion(userMessage: string): Promise<AIResponse> {
    return {
      message: "I can help you find detailed information about specific clinical trials. Please provide the NCT ID or describe the trial you're looking for, and I'll search for comprehensive details including eligibility criteria, interventions, outcomes, and study design.",
      intent: 'trial_details',
      confidence: 0.8,
      suggestions: [
        'Search for cancer trials',
        'Find diabetes studies',
        'Show me Phase III trials',
        'What are the eligibility requirements?'
      ],
      quickActions: [
        { label: "Cancer Trials", action: "find cancer trials", icon: "Heart" },
        { label: "Diabetes Studies", action: "find diabetes trials", icon: "Target" },
        { label: "Phase III Trials", action: "find phase 3 trials", icon: "Search" }
      ]
    }
  }

  private async handleGeneralQuestion(userMessage: string): Promise<AIResponse> {
    try {
      const aiResponse = await freeAIGeneralAnswer(userMessage)
      
      return {
        message: aiResponse,
        intent: 'general',
        confidence: 0.7,
        suggestions: [
          'What is UnityTrials?',
          'How do I find clinical trials?',
          'Tell me about the co-founders',
          'What are the different trial phases?'
        ],
        quickActions: [
          { label: "About UnityTrials", action: "what is UnityTrials", icon: "Info" },
          { label: "Find Trials", action: "find clinical trials", icon: "Search" },
          { label: "Trial Phases", action: "what are trial phases", icon: "Target" },
          { label: "Contact Support", action: "how do I contact support", icon: "Shield" }
        ]
      }
    } catch (error) {
      return {
        message: "I'm here to help you with clinical trials and general questions! I can search for trials, answer questions about UnityTrials, and engage in conversations. What would you like to know?",
        intent: 'general',
        confidence: 0.5,
        suggestions: [
          'What is UnityTrials?',
          'Find cancer trials',
          'How do I use this chatbot?',
          'Tell me about clinical trials'
        ]
      }
    }
  }

  private isGreeting(message: string): boolean {
    const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening']
    return greetings.some(greeting => message.includes(greeting))
  }

  private isSearchQuery(message: string): boolean {
    const searchTerms = ['find', 'search', 'look for', 'trials for', 'studies for', 'research for']
    return searchTerms.some(term => message.includes(term)) || 
           Object.values(this.conditionKeywords).flat().some(keyword => message.includes(keyword))
  }

  private isInformationRequest(message: string): boolean {
    const infoTerms = ['what is', 'how does', 'explain', 'tell me about', 'information about']
    return infoTerms.some(term => message.includes(term))
  }

  private isHelpRequest(message: string): boolean {
    const helpTerms = ['help', 'assist', 'support', 'guide', 'how to']
    return helpTerms.some(term => message.includes(term))
  }

  private handleGreeting(): AIResponse {
    return {
      message: "Hello! I'm Unity AI, your clinical trial finder. I can help you discover studies that match your medical condition, location, and preferences. What type of clinical trial are you looking for?",
      intent: 'greeting',
      quickActions: [
        { label: "Find Cancer Trials", action: "cancer trials", icon: "Heart" },
        { label: "Diabetes Studies", action: "diabetes research", icon: "Target" },
        { label: "Heart Disease", action: "cardiovascular trials", icon: "Heart" },
        { label: "Browse All Categories", action: "show all categories", icon: "Search" }
      ]
    }
  }

  private async handleSearchWithAI(message: string): Promise<AIResponse> {
    // Enhanced AI-powered search handling
    const comprehension = await this.comprehendSearchQuery(message)
    
    let searchQuery = ''
    if (comprehension.condition) searchQuery += comprehension.condition
    if (comprehension.phase) searchQuery += ` ${comprehension.phase}`
    if (comprehension.location) searchQuery += ` in ${comprehension.location}`
    
    // If no valid search terms found, provide helpful response
    if (!comprehension.condition && !comprehension.phase && !comprehension.location) {
      return {
        message: "I understand you're looking for clinical trials, but I need more specific information. Could you please tell me what medical condition you're interested in? For example: 'diabetes', 'cancer', 'depression', 'heart disease', etc.",
        intent: 'search',
        confidence: 0.6,
        suggestions: [
          'Find diabetes trials',
          'Search for cancer studies',
          'Mental health trials',
          'Cardiovascular studies'
        ],
        quickActions: [
          { label: "Diabetes", action: "find diabetes trials", icon: "Target" },
          { label: "Cancer", action: "find cancer trials", icon: "Heart" },
          { label: "Mental Health", action: "find mental health trials", icon: "Brain" },
          { label: "Heart Disease", action: "find cardiovascular trials", icon: "Heart" }
        ]
      }
    }
    
    return {
      message: `I'll search for clinical trials${searchQuery ? ` related to ${searchQuery}` : ''} in the United States. Let me find the most relevant studies for you.`,
      intent: 'search',
      confidence: 0.9,
      suggestions: [
        'Show me Phase III trials only',
        'Find trials near me',
        'What are the requirements?',
        'How do I apply?'
      ],
      quickActions: [
        { label: "Cancer Trials", action: "find cancer trials", icon: "Heart" },
        { label: "Diabetes Studies", action: "find diabetes trials", icon: "Target" },
        { label: "Phase III Trials", action: "find phase 3 trials", icon: "Search" },
        { label: "Mental Health", action: "find mental health trials", icon: "Brain" }
      ]
    }
  }

  private handleSearch(message: string): AIResponse {
    const detectedCondition = this.detectCondition(message)
    const detectedPhase = this.detectPhase(message)
    const detectedLocation = this.detectLocation(message)

    let searchQuery = ''
    if (detectedCondition) searchQuery += detectedCondition
    if (detectedPhase) searchQuery += ` ${detectedPhase}`
    if (detectedLocation) searchQuery += ` in ${detectedLocation}`

    return {
      message: `I'll search for clinical trials${searchQuery ? ` related to ${searchQuery}` : ''} in the United States. Let me find the most relevant studies for you.`,
      intent: 'search',
      suggestions: [
        'Show me Phase III trials only',
        'Find trials near me',
        'What are the requirements?',
        'How do I apply?'
      ]
    }
  }

  private handleInformation(message: string): AIResponse {
    if (message.includes('clinical trial') || message.includes('research study')) {
      return {
        message: "Clinical trials are research studies that test new medical treatments, drugs, or devices to determine their safety and effectiveness. They're essential for advancing medical knowledge and developing new therapies. Would you like to learn about a specific type of trial or find studies in your area?",
        intent: 'information',
        quickActions: [
          { label: "Learn About Phases", action: "explain trial phases", icon: "Target" },
          { label: "Safety Information", action: "trial safety", icon: "Shield" },
          { label: "Find Trials", action: "search trials", icon: "Search" }
        ]
      }
    }

    return {
      message: "I'd be happy to provide information about clinical trials and research studies. What specific aspect would you like to learn more about?",
      intent: 'information',
      suggestions: [
        'What are clinical trials?',
        'How do trial phases work?',
        'Are trials safe?',
        'How do I participate?'
      ]
    }
  }

  private handleHelp(): AIResponse {
    return {
      message: "I'm here to help you find clinical trials in the United States! You can ask me to search for trials by condition (like 'cancer' or 'diabetes'), location, or phase. I can also explain how clinical trials work and help you understand the process.",
      intent: 'help',
      quickActions: [
        { label: "Search by Condition", action: "search by condition", icon: "Search" },
        { label: "Find by Location", action: "search by location", icon: "MapPin" },
        { label: "Learn About Trials", action: "explain trials", icon: "Info" },
        { label: "Get Started", action: "start search", icon: "Play" }
      ]
    }
  }

  private handleGeneralQuery(message: string): AIResponse {
    return {
      message: "I'd love to help you find the perfect clinical trial! What medical condition or research area are you interested in exploring?",
      intent: 'search',
      quickActions: [
        { label: "Cancer Research", action: "cancer trials", icon: "Heart" },
        { label: "Diabetes Studies", action: "diabetes research", icon: "Target" },
        { label: "Heart Health", action: "cardiovascular trials", icon: "Heart" },
        { label: "Browse All", action: "show all categories", icon: "Search" }
      ]
    }
  }

  private async detectIntentWithAI(message: string): Promise<'search' | 'information' | 'help' | 'greeting' | 'general'> {
    // Enhanced AI-powered intent detection
    const prompt = `Analyze this message and classify the intent. Choose from: search, information, help, greeting, general.
    
    Message: "${message}"
    
    Rules:
    - "search": User wants to find clinical trials or medical studies
    - "information": User asks about medical conditions, trial phases, or general medical info
    - "help": User needs assistance or asks "how to" questions
    - "greeting": Hello, hi, hey, etc.
    - "general": Everything else
    
    Respond with only the intent type:`
    
    try {
      const aiResponse = await freeAIGeneralAnswer(prompt)
      const intent = aiResponse.toLowerCase().trim()
      if (['search', 'information', 'help', 'greeting', 'general'].includes(intent)) {
        return intent as any
      }
    } catch (error) {
      console.log('AI intent detection failed, using fallback')
    }
    
    // Fallback to rule-based detection
    return this.detectIntent(message)
  }

  private async comprehendSearchQuery(message: string): Promise<{condition: string | null, phase: string | null, location: string | null}> {
    // Enhanced AI-powered search query comprehension
    const prompt = `Extract medical search terms from this message. Return only valid medical conditions, trial phases, or locations.
    
    Message: "${message}"
    
    Rules:
    - Extract only valid medical terms that can be used to search clinical trials
    - Convert informal terms to medical terms (e.g., "depress" → "depression", "heart" → "cardiovascular")
    - Ignore non-medical words like "what", "else", "please", "help", etc.
    - If no valid medical terms found, return null for all fields
    
    Return format: condition,phase,location
    
    Examples:
    - "I have diabetes" → "diabetes,null,null"
    - "cancer phase 2" → "cancer,phase 2,null"
    - "depress in new york" → "depression,null,new york"
    - "what else" → "null,null,null"`
    
    try {
      const aiResponse = await freeAIGeneralAnswer(prompt)
      const parts = aiResponse.split(',').map(p => p.trim().toLowerCase())
      
      return {
        condition: parts[0] !== 'null' ? parts[0] : null,
        phase: parts[1] !== 'null' ? parts[1] : null,
        location: parts[2] !== 'null' ? parts[2] : null
      }
    } catch (error) {
      console.log('AI search comprehension failed, using fallback')
      return {
        condition: this.detectCondition(message),
        phase: this.detectPhase(message),
        location: this.detectLocation(message)
      }
    }
  }

  private detectCondition(message: string): string | null {
    for (const [condition, keywords] of Object.entries(this.conditionKeywords)) {
      if (keywords.some(keyword => message.includes(keyword))) {
        return condition
      }
    }
    return null
  }

  private detectPhase(message: string): string | null {
    for (const [phase, keywords] of Object.entries(this.phaseKeywords)) {
      if (keywords.some(keyword => message.includes(keyword))) {
        return phase
      }
    }
    return null
  }

  private detectLocation(message: string): string | null {
    for (const [location, keywords] of Object.entries(this.locationKeywords)) {
      if (keywords.some(keyword => message.includes(keyword))) {
        return location
      }
    }
    return null
  }

  generateSuggestions(context: string): string[] {
    const suggestions = {
      'cancer': [
        'Show me Phase III cancer trials',
        'Find immunotherapy studies',
        'What are the eligibility requirements?',
        'Are there trials near me?'
      ],
      'diabetes': [
        'Show me prevention studies',
        'Find Type 2 diabetes trials',
        'What are the latest treatments?',
        'How do I qualify?'
      ],
      'heart': [
        'Show me cardiovascular trials',
        'Find heart disease studies',
        'What are the new treatments?',
        'Are there prevention studies?'
      ],
      'general': [
        'Find trials by condition',
        'Search by location',
        'Show me Phase III trials',
        'What are the requirements?'
      ]
    }

    const condition = this.detectCondition(context)
    return suggestions[condition as keyof typeof suggestions] || suggestions.general
  }
}

// Export singleton instance
export const aiService = new AIService() 