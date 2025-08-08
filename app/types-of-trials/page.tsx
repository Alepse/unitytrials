import { FileText, Users, Target, Clock, CheckCircle, ArrowRight, Beaker, Heart, Brain, Search, Shield } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImprovedFooter from '../../components/improved-footer'
import ChatbotFixed from '../../components/chatbot-fixed'

export default function TypesOfTrialsPage() {
  const trialPhases = [
    {
      phase: "Phase I",
      title: "Safety & Dosage",
      participants: "20-100 people",
      duration: "Several months",
      description: "An initial study in a small group of people to evaluate the safety of a new drug or treatment, determine a safe dosage range, and identify side effects.",
      icon: Beaker,
      color: "bg-teal-50 border-teal-200 text-teal-700"
    },
    {
      phase: "Phase II",
      title: "Effectiveness",
      participants: "100-300 people",
      duration: "Several months to 2 years",
      description: "The drug or treatment is given to a larger group of people to see if it is effective and to further evaluate its safety.",
      icon: Target,
      color: "bg-blue-50 border-blue-200 text-blue-700"
    },
    {
      phase: "Phase III",
      title: "Comparison",
      participants: "300-3,000 people",
      duration: "1-3 years",
      description: "The drug or treatment is given to large groups of people to confirm its effectiveness, monitor side effects, compare it to commonly used treatments, and collect information that will allow the drug or treatment to be used safely.",
      icon: Users,
      color: "bg-slate-100 border-slate-200 text-slate-700"
    },
    {
      phase: "Phase IV",
      title: "Post-Market",
      participants: "Thousands of people",
      duration: "Ongoing",
      description: "Studies conducted after a drug or treatment has been approved and is on the market to gather additional information about its risks, benefits, and optimal use.",
      icon: Clock,
      color: "bg-purple-50 border-purple-200 text-purple-700"
    }
  ]

  const trialTypes = [
    {
      title: "Interventional",
      description: "Studies that test new treatments, drugs, or procedures to see if they work better than current treatments.",
      icon: Beaker,
      color: "bg-teal-50 border-teal-200"
    },
    {
      title: "Observational",
      description: "Studies that observe people in their normal environment to understand how diseases develop and progress.",
      icon: Search,
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Prevention",
      description: "Studies that test ways to prevent diseases from occurring or recurring in people who have never had the disease.",
      icon: Shield,
      color: "bg-green-50 border-green-200"
    },
    {
      title: "Diagnostic",
      description: "Studies that test new ways to detect and diagnose diseases or conditions.",
      icon: Target,
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: "Supportive Care",
      description: "Studies that test ways to improve comfort and quality of life for people with chronic illnesses.",
      icon: Heart,
      color: "bg-pink-50 border-pink-200"
    },
    {
      title: "Screening",
      description: "Studies that test ways to detect certain diseases or health conditions in people who don't have symptoms.",
      icon: Search,
      color: "bg-orange-50 border-orange-200"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 to-blue-200">
      {/* Modern Hero Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="bg-teal-100 text-teal-700 border-teal-200 px-3 py-1 text-sm font-medium mb-4">
              Understanding Clinical Trials
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Types of Clinical Trials
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Learn about the different phases and types of clinical trials to better understand how medical research works and what to expect when participating.
            </p>
          </div>

          {/* Trial Phases */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Trial Phases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trialPhases.map((phase, index) => (
                <Card key={index} className={`${phase.color} border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <phase.icon className="w-8 h-8" />
                      </div>
                      <Badge className="mb-3 bg-white/80 text-slate-700 border-0">
                        {phase.phase}
                      </Badge>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{phase.title}</h3>
                      <div className="space-y-2 text-sm text-slate-600 mb-4">
                        <p><strong>Participants:</strong> {phase.participants}</p>
                        <p><strong>Duration:</strong> {phase.duration}</p>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{phase.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Trial Types */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Types of Clinical Trials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trialTypes.map((type, index) => (
                <Card key={index} className={`${type.color} border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <type.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{type.title}</h3>
                      <p className="text-slate-700 leading-relaxed">{type.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-teal-500 to-blue-600 text-white border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Ready to Find Your Clinical Trial?</h3>
                <p className="text-teal-100 mb-6">
                  Now that you understand the different types of clinical trials, let's find the right one for you.
                </p>
                <Button className="bg-white text-teal-600 hover:bg-slate-100 px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Search className="w-5 h-5 mr-2" />
                  Start Your Search
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <ImprovedFooter />
      <ChatbotFixed />
    </div>
  )
}
