import { Search, Users, Target, CheckCircle, Mail, Phone, Shield, Award, FileText, Linkedin, Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import ImprovedFooter from '../../components/improved-footer'
import ChatbotFixed from '../../components/chatbot-fixed'

export default function AboutPage() {
  const teamMembers = [
    {
      name: "David Franklin",
      role: "Co-Founder",
      image: "/Franklin.svg",
      bio: "David is an accomplished entrepreneur and healthcare innovator dedicated to empowering patients through personalized solutions. He combines his extensive background in healthcare and digital marketing to create this platform, which connects patients with clinical trial navigators.",
      fullBio: "David's career spans decades of impactful contributions to healthcare and business. He co-founded a daycare center in Houston, Texas, for children with medical needs, demonstrating a commitment to providing compassionate care for vulnerable populations. Additionally, as the founder of Houston Health Ventures, David supports numerous healthcare startups, driving innovation, and improving patient outcomes. David's diverse expertise in digital marketing, product development, lead generation, and healthcare makes him uniquely suited to address the challenges patients face in navigating the complex landscape of clinical trials.",
      contact: "david@unitytrials.org"
    },
    {
      name: "Richard Verne",
      role: "Principal",
      image: "/Richard.svg",
      bio: "Richard is a communications specialist with a unique blend of strategic and tactical expertise in branding, promotion, and engagement for the life sciences and healthcare sectors.",
      fullBio: "Past pharmaceutical clients range from Amgen, Bayer, and Cisco to J&J, Kaiser Permanente, and Lilly. Health system experience extends to The Detroit Medical Center, Spectrum Health System, Ingalls Memorial Hospital, SwedishAmerican Health System, The MetroHealth System, and William Beaumont Hospitals as well as related companies like McKesson, Press Ganey, and the American Medical Association.",
      contact: "richard@unitytrials.org"
    }
  ]

  const values = [
    {
      icon: Shield,
      title: "Patient-First Approach",
      description: "Every decision we make prioritizes patient safety, comfort, and empowerment in their healthcare journey."
    },
    {
      icon: Users,
      title: "Diversity & Inclusion",
      description: "We're committed to ensuring clinical trials reflect the diversity of the populations they aim to serve."
    },
    {
      icon: Target,
      title: "Precision Matching",
      description: "Our advanced algorithms ensure patients find the most suitable trials for their specific conditions and circumstances."
    },
    {
      icon: Award,
      title: "Excellence in Care",
      description: "We maintain the highest standards in patient support, data security, and regulatory compliance."
    }
  ]

  const stats = [
    { number: "15,000+", label: "Patients Helped", color: "text-teal-600" },
    { number: "500+", label: "Partner Institutions", color: "text-blue-600" },
    { number: "98%", label: "Patient Satisfaction", color: "text-slate-800" },
    { number: "24/7", label: "Support Available", color: "text-teal-500" }
  ]

  return (
    <div className="min-h-screen bg-slate-50">


      {/* Modern Hero Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <Badge className="bg-teal-100 text-teal-700 border-teal-200 mb-4 rounded-lg">
              🏥 About UnityTrials
            </Badge>
            <h1 className="text-6xl font-bold text-slate-900 mb-6">
              We Make Finding &
              <br />
              Signing Up for Clinical
              <br />
              <span className="text-teal-600">Trials Easy, Efficient & Inclusive</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Unity Trials is dedicated to connecting individuals with clinical trials, fostering greater participation 
              and diversity to accelerate the development of innovative devices, diagnostics, and treatments. 
              Our Trial Navigators provide personalized support, assisting and coordinating every step of the trial participation process.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-lg text-center rounded-2xl">
                <CardContent className="p-6">
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold text-slate-900">Our Mission</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                Unity Trials is dedicated to connecting individuals with clinical trials, fostering greater participation 
                and diversity to accelerate the development of innovative devices, diagnostics, and treatments. 
                Our Trial Navigators provide personalized support, assisting and coordinating every step of the trial participation process.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                We make finding and signing up for clinical trials easy, efficient, and inclusive. By facilitating these critical 
                connections, UnityTrials.org helps patients find the clinical trials that best align with their unique needs 
                and circumstances, bridging the gap between medical research and those who need it most.
              </p>
              <div className="flex gap-4">
                <Button className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl">
                  <Search className="w-4 h-4 mr-2" />
                  Find Trials
                </Button>
                <Button variant="outline" className="border-2 border-teal-200 text-teal-700 hover:bg-teal-50 px-6 py-3 rounded-xl">
                  <Users className="w-4 h-4 mr-2" />
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-3xl p-8 shadow-xl">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Easy, Efficient & Inclusive</h3>
                  <p className="text-slate-600">
                    Our platform makes clinical trial participation accessible to everyone, 
                    regardless of background or location.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-teal-600">15K+</div>
                      <div className="text-sm text-slate-600">Patients Helped</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">500+</div>
                      <div className="text-sm text-slate-600">Partner Sites</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-700">98%</div>
                      <div className="text-sm text-slate-600">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">Our Core Values</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              These principles guide everything we do, from patient interactions to technology development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-2xl">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-teal-600" />
                    </div>
                    <CardTitle className="text-xl text-slate-900">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-center leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">Meet Our Leadership Team</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experienced healthcare professionals and technology leaders united by a shared vision 
              of making clinical trials more accessible and inclusive.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-white border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <img 
                      src={member.image || "/placeholder.svg"} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-teal-200 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-1">{member.name}</h3>
                      <p className="text-teal-600 font-semibold mb-4">{member.role}</p>
                      <p className="text-slate-700 leading-relaxed mb-4">{member.bio}</p>
                      <p className="text-slate-600 leading-relaxed text-sm mb-4">{member.fullBio}</p>
                      <div className="flex items-center gap-3">
                        <Button size="sm" variant="outline" className="border-teal-200 text-teal-600 hover:bg-teal-50 rounded-xl">
                          <Mail className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                        <Button size="sm" variant="outline" className="border-teal-200 text-teal-600 hover:bg-teal-50 rounded-xl">
                          <Linkedin className="w-4 h-4 mr-2" />
                          LinkedIn
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trial Navigator Section */}
      <section className="py-24 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">Our Trial Navigators</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our dedicated Trial Navigators provide personalized support throughout your clinical trial journey, 
              ensuring you have the guidance and assistance you need every step of the way.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Personalized Matching</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our navigators work with you to understand your specific needs and match you with the most 
                  suitable clinical trials based on your condition, location, and preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Ongoing Support</h3>
                <p className="text-slate-600 leading-relaxed">
                  From initial consultation through trial completion, our navigators provide continuous support, 
                  answering questions and coordinating with research teams on your behalf.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-slate-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Advocacy & Coordination</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our team advocates for your interests and coordinates all aspects of trial participation, 
                  making the process as smooth and stress-free as possible.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-teal-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of patients who have found hope and healing through clinical trials. 
            Let our Trial Navigators help you find the research opportunity that could change your life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-teal-600 hover:bg-slate-100 px-8 py-4 text-lg rounded-xl">
              Find Clinical Trials
            </Button>
            <Button size="lg" variant="outline" className="border-white text-teal-600 hover:bg-white hover:text-blue-800 px-8 py-4 text-lg rounded-xl">
              Talk to a Trial Navigator
            </Button>
          </div>
        </div>
      </section>

      <ImprovedFooter />
      <ChatbotFixed />
    </div>
  )
}
