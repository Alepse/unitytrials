// Comprehensive Website Knowledge Base for UnityTrials
// This module answers questions about the website using static content and FAQ logic.

const faqs = [
  // Company Information
  {
    keywords: ['what is unitytrials', 'about unitytrials', 'purpose', 'company', 'mission'],
    answer: 'UnityTrials is a clinical trial matching platform dedicated to connecting individuals with clinical trials, fostering greater participation and diversity to accelerate the development of innovative devices, diagnostics, and treatments. Our Trial Navigators provide personalized support, assisting and coordinating every step of the trial participation process.'
  },
  {
    keywords: ['co founders', 'founders', 'david franklin', 'richard verne', 'leadership'],
    answer: 'UnityTrials was founded by David Franklin (Co-Founder) and Richard Verne (Principal). They lead our mission to make finding and signing up for clinical trials easy, efficient, and inclusive.'
  },
  {
    keywords: ['mission', 'vision', 'goal'],
    answer: 'Our mission is to bridge the gap between medical research and those who need it most. We make finding and signing up for clinical trials easy, efficient, and inclusive. By facilitating these critical connections, UnityTrials.org helps patients find the clinical trials that best align with their unique needs and circumstances.'
  },

  // Website Navigation
  {
    keywords: ['how to use', 'how do i use', 'find trials', 'search trials', 'navigation'],
    answer: 'To use UnityTrials, you can: 1) Click "Find Trials" in the navigation to search for clinical trials, 2) Use the AI chatbot to search for trials by condition, location, or phase, 3) Browse different types of trials on the "Types of Trials" page, 4) Learn about our professional services on the "Professional Services" page.'
  },
  {
    keywords: ['find trials page', 'search page', 'trial search'],
    answer: 'The "Find Trials" page allows you to search for clinical trials using various filters including medical condition, location, phase, age, and gender. You can also use our AI chatbot for natural language search queries.'
  },
  {
    keywords: ['types of trials', 'trial types', 'phases'],
    answer: 'The "Types of Trials" page explains different phases of clinical trials: Phase 1 (safety and dosage), Phase 2 (effectiveness), Phase 3 (large-scale confirmation), and Phase 4 (post-marketing studies).'
  },
  {
    keywords: ['professional services', 'services', 'trial navigators'],
    answer: 'Our Professional Services include Trial Navigators who provide personalized support throughout the trial participation process, helping with eligibility assessment, coordination, and ongoing assistance.'
  },
  {
    keywords: ['about page', 'about us', 'company information'],
    answer: 'The About page contains information about UnityTrials, our mission, co-founders (David Franklin and Richard Verne), and our commitment to connecting patients with clinical trials.'
  },

  // AI Chatbot
  {
    keywords: ['ai chatbot', 'chatbot', 'ai assistant', 'unity ai'],
    answer: 'Unity AI is our intelligent chatbot that can help you find clinical trials, answer questions about the website, provide information about clinical research, and engage in general conversations. It uses advanced AI models to provide accurate and helpful responses.'
  },
  {
    keywords: ['how does the chatbot work', 'chatbot features', 'ai capabilities'],
    answer: 'The chatbot can: 1) Search for clinical trials using natural language, 2) Answer questions about UnityTrials and our services, 3) Provide general AI conversations on any topic, 4) Display detailed trial information, 5) Offer quick actions and suggestions.'
  },

  // Contact and Support
  {
    keywords: ['contact', 'support', 'help', 'customer service'],
    answer: 'You can contact us using the Contact button in the header or footer, or by emailing support@unitytrials.com. Our team is here to help with any questions about clinical trials or our services.'
  },
  {
    keywords: ['email', 'phone', 'contact information'],
    answer: 'For support and inquiries, please email support@unitytrials.com. You can also use the contact form on our website or reach out through our social media channels.'
  },

  // Privacy and Security
  {
    keywords: ['privacy', 'data', 'security', 'personal information'],
    answer: 'UnityTrials values your privacy. We do not share your personal information without your consent. All data is securely stored and protected. See our privacy policy for detailed information about how we handle your data.'
  },
  {
    keywords: ['data protection', 'confidentiality', 'information security'],
    answer: 'We implement industry-standard security measures to protect your personal information. Your data is encrypted and stored securely, and we only collect information necessary to help you find relevant clinical trials.'
  },

  // Trial Information
  {
    keywords: ['who can participate', 'eligibility', 'who can join', 'requirements'],
    answer: 'Eligibility for clinical trials depends on the specific study criteria. Each trial has different requirements based on age, medical condition, location, and other factors. You can check eligibility criteria in each trial listing or ask the chatbot for specific trials.'
  },
  {
    keywords: ['is it free', 'cost', 'pricing', 'fees'],
    answer: 'UnityTrials is free for users searching for clinical trials. We do not charge for our matching services. However, individual clinical trials may have their own costs or compensation structures.'
  },
  {
    keywords: ['recommendations', 'personalized', 'suggestions', 'matching'],
    answer: 'UnityTrials provides personalized trial recommendations based on your search criteria, medical condition, location, and preferences. Our AI system helps match you with the most relevant clinical trials.'
  },

  // Clinical Trial Process
  {
    keywords: ['how to join', 'participate', 'enroll', 'sign up'],
    answer: 'To join a clinical trial: 1) Search for relevant trials using our platform, 2) Review the eligibility criteria, 3) Contact the study coordinator listed in the trial details, 4) Complete the screening process, 5) Provide informed consent if eligible.'
  },
  {
    keywords: ['informed consent', 'consent process', 'trial participation'],
    answer: 'Informed consent is a process where you learn about the clinical trial, including its purpose, procedures, risks, and benefits. You must provide written consent before participating in any clinical trial.'
  },
  {
    keywords: ['trial phases', 'phase 1', 'phase 2', 'phase 3', 'phase 4'],
    answer: 'Clinical trials have different phases: Phase 1 tests safety and dosage in a small group, Phase 2 studies effectiveness in a larger group, Phase 3 confirms effectiveness in large populations, and Phase 4 monitors long-term effects after approval.'
  },

  // Technical Support
  {
    keywords: ['website not working', 'technical issues', 'bug', 'error'],
    answer: 'If you experience technical issues with our website, please try refreshing the page or clearing your browser cache. If problems persist, contact our support team at support@unitytrials.com with details about the issue.'
  },
  {
    keywords: ['mobile app', 'app', 'mobile version'],
    answer: 'UnityTrials is currently a web-based platform optimized for mobile devices. You can access our services through any web browser on your computer, tablet, or smartphone.'
  }
]

// Page-specific information
const pageInfo = {
  'home': {
    title: 'UnityTrials Homepage',
    description: 'The main page featuring our clinical trial matching platform, hero section, and key features.',
    content: 'Welcome to UnityTrials - your gateway to finding relevant clinical trials. Our platform helps connect patients with medical research opportunities.'
  },
  'find-trials': {
    title: 'Find Clinical Trials',
    description: 'Search and filter clinical trials by condition, location, phase, and other criteria.',
    content: 'Use our advanced search tools to find clinical trials that match your medical condition, location, and preferences. Filter by phase, status, age, and more.'
  },
  'types-of-trials': {
    title: 'Types of Clinical Trials',
    description: 'Learn about different phases and types of clinical trials.',
    content: 'Understand the different phases of clinical trials (Phase 1-4) and how they work. Learn about interventional, observational, and other trial types.'
  },
  'professional-services': {
    title: 'Professional Services',
    description: 'Our Trial Navigator services and professional support.',
    content: 'Our Trial Navigators provide personalized support throughout your clinical trial journey, from initial screening to ongoing participation.'
  },
  'about': {
    title: 'About UnityTrials',
    description: 'Learn about our company, mission, and leadership team.',
    content: 'Meet our co-founders David Franklin and Richard Verne, learn about our mission to connect patients with clinical trials, and understand our commitment to medical research advancement.'
  }
}

export function answerWebsiteQuestion(question: string): string | null {
  const q = question.toLowerCase()
  
  // Check FAQs first
  for (const faq of faqs) {
    if (faq.keywords.some(keyword => q.includes(keyword))) {
      return faq.answer
    }
  }

  // Check for page-specific questions
  for (const [page, info] of Object.entries(pageInfo)) {
    if (q.includes(page) || q.includes(info.title.toLowerCase())) {
      return `${info.title}: ${info.content}`
    }
  }

  return null
}

export function getPageInfo(pageName: string) {
  return pageInfo[pageName as keyof typeof pageInfo] || null
}

export function getFAQSuggestions(): string[] {
  return [
    'What is UnityTrials?',
    'How do I find clinical trials?',
    'Who are the co-founders?',
    'What are the different trial phases?',
    'How do I contact support?',
    'Is the service free?',
    'How does the AI chatbot work?'
  ]
}