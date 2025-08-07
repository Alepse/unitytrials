import { Users, Heart, Target, ArrowRight, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function Component() {
  const cards = [
    {
      title: "Broadening Trial Eligibility Criteria",
      description:
        "Despite the Federal Drug Administration (FDA) promoting enrollment practices for clinical trials to better reflect the population most likely to use a drug if approved, challenges to participation remain and certain groups continue to be underrepresented.",
      icon: Users,
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
      badge: "Inclusion",
      badgeColor: "bg-blue-100 text-blue-700",
    },
    {
      title: "Enrolling Underrepresented Populations",
      description:
        "Clinicians and researchers must carefully consider inclusion or exclusion criteria for their clinical trials in order to align with FDA enrollment practices guidance. Unity Trials helps connect people with the appropriate research.",
      icon: Heart,
      color: "bg-emerald-50 border-emerald-200",
      iconColor: "text-emerald-600",
      badge: "Diversity",
      badgeColor: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Clinical Trial Matching",
      description:
        "Advanced algorithms match patients with suitable clinical trials based on medical history and eligibility criteria, ensuring optimal participation opportunities for diverse patient populations.",
      icon: Target,
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600",
      badge: "Matching",
      badgeColor: "bg-purple-100 text-purple-700",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200 mb-6">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Clinical Trial Solutions</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Advancing Healthcare Through
            <span className="text-blue-600"> Inclusive Research</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting diverse patient populations with groundbreaking clinical trials through innovative matching
            technology and inclusive enrollment practices.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {cards.map((card, index) => {
            const IconComponent = card.icon
            return (
              <Card
                key={index}
                className={`${card.color} hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 group cursor-pointer`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl ${card.iconColor} bg-white/80 backdrop-blur-sm shadow-sm group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <Badge className={`${card.badgeColor} border-0 font-medium`}>{card.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 leading-tight">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 leading-relaxed mb-6">{card.description}</CardDescription>
                  <Button
                    variant="ghost"
                    className="group/btn p-0 h-auto font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200 p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Clinical Trial Enrollment?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join healthcare organizations worldwide in creating more inclusive and effective clinical trials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started Today
              </Button>
              <Button size="lg" variant="outline" className="border-blue-200 hover:bg-blue-50 bg-transparent">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
