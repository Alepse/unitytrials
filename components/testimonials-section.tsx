import { Star, Quote, ArrowLeft, ArrowRight, Leaf } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Maria Rodriguez",
      age: 45,
      condition: "Type 2 Diabetes",
      quote: "Unity Trials connected me with a groundbreaking diabetes study that changed my life. The process was seamless and the support team was incredible.",
      rating: 5,
      trialType: "Phase III Diabetes Study"
    },
    {
      name: "James Washington",
      age: 62,
      condition: "Heart Disease",
      quote: "I was hesitant about clinical trials, but Unity Trials made everything clear and comfortable. Now I'm part of research that could help millions.",
      rating: 5,
      trialType: "Cardiovascular Research"
    },
    {
      name: "Sarah Chen",
      age: 38,
      condition: "Cancer Survivor",
      quote: "The matching process was incredibly thorough. They found a trial that was perfect for my specific situation and provided support every step of the way.",
      rating: 5,
      trialType: "Oncology Prevention Study"
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-teal-50 via-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <Badge className="bg-teal-100 text-teal-700 border-teal-200 mb-4 rounded-lg">
            ⭐ Patient Success Stories
          </Badge>
          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            Real Stories from Real People
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Hear from patients who found hope, healing, and breakthrough treatments through clinical trials. 
            Their journeys inspire us to continue connecting people with life-changing research.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  {/* Icon Avatar with Initials and Leaf */}
                  <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-xl font-bold text-teal-700 relative">
                    {/* Leaf Icon in top-left */}
                    <div className="absolute top-1 left-1">
                      <Leaf className="w-3 h-3 text-green-500" />
                    </div>
                    {/* Initials */}
                    <span className="text-teal-700 font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{testimonial.name}</h3>
                    <p className="text-sm text-slate-600">Age {testimonial.age} • {testimonial.condition}</p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-teal-400 text-teal-400" />
                      ))}
                    </div>
                  </div>
                </div>

                <Quote className="w-8 h-8 text-teal-300 mb-4" />
                <blockquote className="text-slate-700 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </blockquote>

                <Badge className="bg-teal-100 text-teal-700 text-xs rounded-lg">
                  {testimonial.trialType}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modern Statistics */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200 shadow-lg">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-teal-600 mb-2">98%</div>
              <div className="text-sm text-slate-600">Patient Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">15,000+</div>
              <div className="text-sm text-slate-600">Successful Matches</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-800 mb-2">85%</div>
              <div className="text-sm text-slate-600">Trial Completion Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-500 mb-2">24/7</div>
              <div className="text-sm text-slate-600">Patient Support</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Start Your Journey?</h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Join thousands of patients who have found hope through clinical trials. Your story could be next.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-xl">
            Find Your Trial Match
          </Button>
        </div>
      </div>
    </section>
  )
}
