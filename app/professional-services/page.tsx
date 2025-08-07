import { Users, Target, BarChart3, Shield, CheckCircle, ArrowRight, Building, Globe, Award, Phone, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ImprovedFooter from '../../components/improved-footer'
import ChatbotFixed from '../../components/chatbot-fixed'

export default function ProfessionalServicesPage() {
  const benefits = [
    {
      title: "Performance-Driven",
      description: "Only pay for patients successfully recruited, ensuring risk free recruitment budgets.",
      icon: Target,
      color: "bg-teal-50 border-teal-200"
    },
    {
      title: "Tailored Outreach",
      description: "We leverage extensive networks, targeted digital marketing, and community engagement to find the right participants quickly.",
      icon: Users,
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Scalable Solutions",
      description: "Whether your trial needs dozens or thousands of participants, we scale our recruitment strategy accordingly.",
      icon: BarChart3,
      color: "bg-slate-100 border-slate-200"
    },
    {
      title: "Accelerated Timelines",
      description: "Our proven methods significantly reduce recruitment timelines, enabling your trials to progress faster and more efficiently.",
      icon: ArrowRight,
      color: "bg-teal-50 border-teal-200"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">


      {/* Hero Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
                Need Help Recruiting Patients?
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Please contact us so we can help recruit the right patients for your studies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
                  <Phone className="w-5 h-5 mr-2" />
                  Schedule Consultation
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-teal-500 text-teal-700 hover:bg-teal-50 px-8 py-4 text-lg font-semibold transition-all duration-300 rounded-xl">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Us
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-teal-100 to-blue-100 rounded-3xl p-8 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Professional woman with headset working on patient recruitment"
                  className="w-full h-auto rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-8 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            UnityTrials.org Helps With Patient Recruitment
          </h2>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-16">
            {/* Section 1 */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Accelerate Your Clinical Trials with Guaranteed Performance-Based Recruitment
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                Are recruitment delays impacting your clinical trials? UnityTrials.org delivers precise, reliable patient recruitment solutions designed specifically for clinical trial sponsors. Our approach is performance-based, meaning you only pay for results.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Why Clinical Trial Sponsors Choose UnityTrials.org:
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon
                  return (
                    <Card key={index} className={`${benefit.color} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-slate-700" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                            <p className="text-slate-700 leading-relaxed">{benefit.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Section 3 */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Partner with Confidence:
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                Our team understands the challenges of clinical recruitment intimately. UnityTrials.org provides a transparent, efficient, and performance-based model that aligns our success with yours.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Ready to Accelerate Your Patient Recruitment?
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                Schedule a consultation today to discuss your trial's unique needs and learn how UnityTrials.org can achieve rapid, reliable recruitment backed by results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
                  <Phone className="w-5 h-5 mr-2" />
                  Schedule Consultation
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-teal-500 text-teal-700 hover:bg-teal-50 px-8 py-4 text-lg font-semibold transition-all duration-300 rounded-xl">
                  <Mail className="w-5 h-5 mr-2" />
                  Request Information
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">500+</div>
              <div className="text-slate-600 font-medium">Studies Supported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-slate-600 font-medium">Recruitment Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-800 mb-2">50+</div>
              <div className="text-slate-600 font-medium">Pharmaceutical Partners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-500 mb-2">15</div>
              <div className="text-slate-600 font-medium">Years of Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-teal-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Accelerate Your Patient Recruitment?</h2>
          <p className="text-xl mb-8 opacity-90">
            Schedule a consultation today to discuss your trial's unique needs and learn how UnityTrials.org can achieve rapid, reliable recruitment backed by results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-teal-600 hover:bg-slate-100 px-8 py-4 text-lg rounded-xl">
              <Phone className="w-5 h-5 mr-2" />
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-teal-600 hover:bg-white hover:text-blue-800 px-8 py-4 text-lg rounded-xl">
              <Mail className="w-5 h-5 mr-2" />
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <ImprovedFooter />
      <ChatbotFixed />
    </div>
  )
}
