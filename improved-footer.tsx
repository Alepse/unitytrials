import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, Heart, Shield, Users, FileText, HelpCircle, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function Component() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold">UnityTrials.org</h3>
                <p className="text-blue-200 text-sm">Clinical Trial Signup Made Easy</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed max-w-md">
              Connecting patients with life-changing clinical trials through innovative matching technology and 
              inclusive enrollment practices. Making healthcare research accessible to everyone.
            </p>

            {/* Newsletter Signup */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-blue-400" />
                <h4 className="text-lg font-semibold">Stay Updated</h4>
              </div>
              <p className="text-gray-300 mb-4 text-sm">
                Get the latest clinical trial opportunities and healthcare research news.
              </p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter your email address" 
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:border-blue-400"
                />
                <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white mb-4">For Patients</h4>
            <nav className="space-y-3">
              <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
                <Users className="w-4 h-4 group-hover:text-blue-400" />
                Find a Clinical Trial
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
                <HelpCircle className="w-4 h-4 group-hover:text-blue-400" />
                How It Works
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
                <Shield className="w-4 h-4 group-hover:text-blue-400" />
                Patient Safety
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
                <Calendar className="w-4 h-4 group-hover:text-blue-400" />
                Upcoming Trials
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
                <Heart className="w-4 h-4 group-hover:text-blue-400" />
                Patient Stories
              </a>
            </nav>

            <Separator className="bg-white/20" />

            <h4 className="text-lg font-semibold text-white mb-4">For Researchers</h4>
            <nav className="space-y-3">
              <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
                <Users className="w-4 h-4 group-hover:text-blue-400" />
                Professional Services
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
                <FileText className="w-4 h-4 group-hover:text-blue-400" />
                Research Resources
              </a>
            </nav>
          </div>

          {/* Contact & Support */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white mb-4">Contact & Support</h4>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-medium text-white">1-800-UNITY-TRIAL</p>
                  <p className="text-sm">Mon-Fri, 8AM-6PM EST</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-medium text-white">support@unitytrials.org</p>
                  <p className="text-sm">24/7 email support</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-medium text-white">Nationwide Coverage</p>
                  <p className="text-sm">Serving all 50 states</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h5 className="font-semibold text-white mb-2">Need Help?</h5>
              <p className="text-sm text-gray-300 mb-3">
                Our patient advocates are here to guide you through the clinical trial process.
              </p>
              <Button variant="outline" size="sm" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
                Talk to Us
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright & Legal */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
              <p>© 2025 Unity Trials LLC. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
                <a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a>
                <a href="#" className="hover:text-white transition-colors">Accessibility</a>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Follow us:</span>
              <div className="flex gap-3">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors group"
                >
                  <Facebook className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors group"
                >
                  <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors group"
                >
                  <Twitter className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>Patient-First Approach</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Diversity & Inclusion Focused</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>FDA Guidelines Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
