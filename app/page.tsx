import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { LandingHeader } from '@/components/organisms/LandingHeader/LandingHeader';
import { 
  ArrowRight, CheckCircle2, ShieldCheck, 
  Users, HandCoins, Sprout, Building, MessageSquare, Quote, 
  MapPin, Calendar, Clock, Globe
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans w-full text-zinc-900 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[700px] lg:h-[850px] bg-slate-50 flex items-center">
        
        {/* Dynamic Header Component */}
        <LandingHeader />

        {/* Hero Background Shapes & Images */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Big Green Circle Backdrop */}
          <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[120%] bg-[#0F4C36] rounded-r-full shadow-2xl z-0 hidden lg:block"></div>
          {/* Mobile Green BG */}
          <div className="absolute inset-0 bg-[#0F4C36] z-0 lg:hidden h-[60%]"></div>
          
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[45%] z-0 h-[40%] lg:h-full mt-[60vh] lg:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1542884748-2b87b36c6b90?q=80&w=2000&auto=format&fit=crop" 
              alt="African women collaborating" 
              className="w-full h-full object-cover object-center lg:rounded-l-[3rem] shadow-2xl" 
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center lg:justify-start lg:-ml-8">
              <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform text-[#0F4C36]">
                <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 flex pt-24 lg:pt-0">
          <div className="max-w-2xl text-white">
            <span className="inline-block text-[12px] font-bold uppercase tracking-widest text-[#E6F0E6] mb-4">
              Secure & Transparent
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-bold leading-[1.05] mb-8 tracking-tight">
              Community <br/><span className="text-[#C68D5D]">Savings &</span> <br/>Loans
            </h1>
            
            <div className="flex gap-4 mb-12">
              <Link href="/register">
                <Button variant="primary" className="rounded-full bg-[#C68D5D] hover:bg-[#b07b4d] border-none text-white px-8 py-3.5 font-bold shadow-lg">
                  Explore More
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" className="rounded-full border-white/30 text-white hover:bg-white/10 px-8 py-3.5 font-bold">
                  How It Works
                </Button>
              </Link>
            </div>

            {/* Floating Info Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-2xl max-w-xs text-zinc-900 mt-8 lg:mt-24">
              <div className="flex -space-x-3">
                <img src="https://images.unsplash.com/photo-1531123897727-8f129e1bfa82?q=80&w=100&h=100&auto=format&fit=crop" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="User" />
                <img src="https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=100&h=100&auto=format&fit=crop" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="User" />
                <img src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=100&h=100&auto=format&fit=crop" className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="User" />
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">+</div>
              </div>
              <div>
                <h4 className="font-bold text-lg leading-none">2,665+</h4>
                <p className="text-xs text-zinc-500 font-medium">Active Members</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WE CARE ABOUT COMMUNITY SAVINGS (Features) */}
      <section id="features" className="py-24 sm:py-32 w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Images (Grid style from gardening template) */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop" className="rounded-2xl rounded-tl-[3rem] w-full h-[250px] object-cover shadow-lg" alt="Meeting" />
              <img src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=600&auto=format&fit=crop" className="rounded-2xl rounded-br-[3rem] w-full h-[250px] object-cover mt-12 shadow-lg" alt="Discussion" />
            </div>
            {/* Experience Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 min-w-[200px]">
              <div className="w-12 h-12 bg-[#E6F0E6] rounded-full flex items-center justify-center text-[#0F4C36]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-xl text-[#0F4C36]">Trusted</h4>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">by thousands</p>
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="flex flex-col">
            <span className="text-[#0F4C36] font-bold flex items-center gap-2 text-sm uppercase tracking-widest mb-4">
              <Sprout className="w-4 h-4" /> About VLSA Connect
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] mb-6 text-[#0F4C36] tracking-tight">
              We Care About Your <br/>Community Savings
            </h2>
            <p className="text-[15px] text-zinc-600 mb-8 leading-relaxed">
              We provide a tamper-evident ledger and USSD accessibility so every contribution and loan is tracked transparently, bridging the gap to formal finance without the headaches of paper record-keeping.
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-zinc-800 font-semibold">
                <CheckCircle2 className="w-5 h-5 text-[#C68D5D]" /> Tamper-Proof Digital Ledger
              </li>
              <li className="flex items-center gap-3 text-zinc-800 font-semibold">
                <CheckCircle2 className="w-5 h-5 text-[#C68D5D]" /> Real-time SMS & USSD Access
              </li>
              <li className="flex items-center gap-3 text-zinc-800 font-semibold">
                <CheckCircle2 className="w-5 h-5 text-[#C68D5D]" /> Bank Integrated Health Scores
              </li>
            </ul>

            <div>
              <Link href="/register">
                <Button variant="primary" className="rounded-full bg-[#0F4C36] hover:bg-[#0c3d2c] text-white px-8 py-3.5 font-bold shadow-md">
                  Read More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AWARDS WINNING (Checklist Section) */}
      <section className="py-24 bg-[#0F4C36] relative overflow-hidden">
        {/* Background decorative leaf/pattern could go here */}
        <div className="absolute left-0 bottom-0 opacity-10">
          <svg width="400" height="400" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 flex flex-col lg:flex-row items-center gap-16 relative z-10">
          
          {/* Left Text */}
          <div className="lg:w-1/2">
            <span className="text-[#C68D5D] font-bold flex items-center gap-2 text-sm uppercase tracking-widest mb-4">
              <Sprout className="w-4 h-4" /> Why Choose Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] mb-8 text-white tracking-tight">
              Recognized for <br/>Financial Inclusion
            </h2>
            
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-2xl relative">
              <div className="flex gap-8 mb-6 border-b border-zinc-100 pb-4">
                <button className="text-[#0F4C36] font-bold border-b-2 border-[#0F4C36] pb-2">Our Mission</button>
                <button className="text-zinc-400 font-bold hover:text-zinc-600 pb-2">Vision</button>
              </div>
              <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
                We empower informal savings groups by providing enterprise-grade security and transparency. Forget lost lockboxes and disputed contributions.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-zinc-800 text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#0F4C36]" /> Secured by blockchain principles
                </li>
                <li className="flex items-center gap-3 text-zinc-800 text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#0F4C36]" /> Transparent dispute resolution
                </li>
                <li className="flex items-center gap-3 text-zinc-800 text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#0F4C36]" /> Verified member identities
                </li>
                <li className="flex items-center gap-3 text-zinc-800 text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#0F4C36]" /> Accessible offline via USSD
                </li>
              </ul>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 w-full">
            <img 
              src="https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?q=80&w=1000&auto=format&fit=crop" 
              className="w-full h-[500px] object-cover rounded-3xl shadow-2xl border-4 border-white/10" 
              alt="Community working" 
            />
          </div>
          
        </div>
      </section>

      {/* 4. HOW DOES WE WORK IN VSLA (Steps) */}
      <section id="how-it-works" className="py-24 sm:py-32 w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 text-center">
        <span className="text-[#0F4C36] font-bold flex items-center justify-center gap-2 text-sm uppercase tracking-widest mb-4">
          <HandCoins className="w-4 h-4" /> Working Process
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] mb-20 text-[#0F4C36] tracking-tight">
          How Do We Work In VSLA
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: 'Step 01', title: 'Create Group', desc: 'Register your community savings group on the platform.', icon: Users },
            { step: 'Step 02', title: 'Pool Savings', desc: 'Members contribute shares safely tracked in the digital ledger.', icon: HandCoins },
            { step: 'Step 03', title: 'Request Loans', desc: 'Request and approve micro-loans transparently through voting.', icon: Building },
            { step: 'Step 04', title: 'Share Out', desc: 'Distribute funds fairly at cycle end using verified data.', icon: ShieldCheck },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center group">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C68D5D] bg-[#C68D5D]/10 px-3 py-1 rounded-full mb-6">
                {item.step}
              </span>
              <div className="w-24 h-24 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:bg-[#0F4C36] group-hover:text-white transition-colors duration-300 shadow-sm">
                <item.icon className="w-10 h-10 text-[#0F4C36] group-hover:text-white transition-colors" />
              </div>
              <h4 className="font-bold text-lg text-zinc-900 mb-3">{item.title}</h4>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-[250px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. IMAGE BANNER */}
      <section className="w-full relative h-[400px]">
        <img 
          src="https://images.unsplash.com/photo-1526958097901-5e6d742d3371?q=80&w=2000&auto=format&fit=crop" 
          className="w-full h-full object-cover" 
          alt="Banner" 
        />
        <div className="absolute inset-0 bg-[#0F4C36]/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="text-center text-white p-6 max-w-2xl bg-black/40 backdrop-blur-sm rounded-3xl border border-white/10">
             <h2 className="text-3xl font-bold mb-4">Digitize Your Cycle Today</h2>
             <p className="text-white/80 mb-6 text-sm">Join hundreds of groups already building formal credit history through disciplined savings.</p>
             <Link href="/register">
               <Button variant="primary" className="rounded-full bg-white text-[#0F4C36] hover:bg-slate-100 font-bold px-8">
                 Get Started
               </Button>
             </Link>
           </div>
        </div>
      </section>

      {/* 6. STATS BANNER */}
      <section className="bg-[#0F4C36] border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white/5 rounded-2xl p-8 text-center backdrop-blur-sm border border-white/10">
              <h3 className="text-4xl font-bold text-white mb-2">859+</h3>
              <p className="text-[#C68D5D] text-sm font-bold uppercase tracking-widest">Active Groups</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-2xl transform md:-translate-y-4">
              <h3 className="text-4xl font-bold text-[#0F4C36] mb-2">99%</h3>
              <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Repayment Rate</p>
            </div>
            <div className="bg-[#C68D5D] rounded-2xl p-8 text-center shadow-xl">
              <h3 className="text-4xl font-bold text-white mb-2">683+</h3>
              <p className="text-[#0F4C36] text-sm font-bold uppercase tracking-widest">Loans Issued</p>
            </div>
            <div className="bg-[#E6F0E6] rounded-2xl p-8 text-center shadow-xl transform md:translate-y-4">
              <h3 className="text-4xl font-bold text-[#0F4C36] mb-2">$8M+</h3>
              <p className="text-[#0F4C36]/70 text-sm font-bold uppercase tracking-widest">Pool Savings</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GLOBAL CLIENTS FEEDBACK */}
      <section className="py-24 sm:py-32 bg-slate-50 w-full text-center">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
          <span className="text-[#0F4C36] font-bold flex items-center justify-center gap-2 text-sm uppercase tracking-widest mb-4">
            <MessageSquare className="w-4 h-4" /> Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] mb-16 text-[#0F4C36] tracking-tight">
            Global Community Feedback
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Douglas T. Phiri", role: "Chairperson", text: "Digitizing our ledger eliminated disputes. We know exactly who paid what and when." },
              { name: "Mercy K. Banda", role: "Member", text: "The health score feature helped our group secure a farming loan from a formal bank for the first time." },
              { name: "Chikondi Moyo", role: "Treasurer", text: "Reconciling at the end of the meeting now takes minutes instead of hours. The SMS receipts are brilliant." }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm text-left border border-slate-100">
                <Quote className="w-8 h-8 text-[#C68D5D] mb-6 opacity-50" />
                <p className="text-zinc-600 mb-8 leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                  <div>
                    <h5 className="font-bold text-zinc-900">{t.name}</h5>
                    <p className="text-xs text-zinc-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. LATEST NEWS & BLOG */}
      <section id="news" className="py-24 bg-white w-full">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 text-center">
          <span className="text-[#0F4C36] font-bold flex items-center justify-center gap-2 text-sm uppercase tracking-widest mb-4">
            <Calendar className="w-4 h-4" /> Our Blog
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] mb-16 text-[#0F4C36] tracking-tight">
            Read Latest News & Updates
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { title: "Empowering Rural Women Through Formal Finance", img: "https://images.unsplash.com/photo-1542884748-2b87b36c6b90?q=80&w=600" },
              { title: "How USSD is Bridging the Digital Divide", img: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=600" },
              { title: "Why Bank Integrated Health Scores Matter", img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600" }
            ].map((post, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 group">
                <div className="h-[200px] overflow-hidden">
                  <img src={post.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Blog" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-xs text-zinc-500 font-bold uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#C68D5D]" /> 12 Oct 2026</span>
                  </div>
                  <h4 className="font-bold text-xl text-[#0F4C36] mb-4 line-clamp-2 hover:text-[#C68D5D] transition-colors cursor-pointer">{post.title}</h4>
                  <Link href="#" className="text-sm font-bold text-[#0F4C36] flex items-center gap-2 hover:text-[#C68D5D] transition-colors">
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0c3d2c] text-white pt-20 pb-10 border-t-4 border-[#C68D5D]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 font-bold text-xl tracking-tight mb-6">
                <span className="inline-flex w-10 h-10 bg-[#C68D5D] rounded-full items-center justify-center">
                  <HandCoins className="w-5 h-5 text-white" />
                </span>
                VSLA Connect
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Digitizing informal savings groups to provide security, transparency, and pathways to formal credit.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C68D5D] transition-colors"><Globe className="w-4 h-4"/></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Explore</h4>
              <ul className="space-y-3 text-white/60 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Our Services</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Latest News</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Contact</h4>
              <ul className="space-y-4 text-white/60 text-sm">
                <li className="flex gap-3">
                  <MapPin className="w-5 h-5 text-[#C68D5D] shrink-0" />
                  <span>123 Innovation Hub, Lilongwe, Malawi</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="w-5 h-5 text-[#C68D5D] shrink-0" />
                  <span>+265 999 000 000</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="bg-white/10 rounded-2xl p-6 text-center border border-white/10">
                <h3 className="text-3xl font-bold text-white mb-2">25+</h3>
                <p className="text-[#C68D5D] text-xs font-bold uppercase tracking-widest">Partnerships</p>
              </div>
            </div>
          </div>
          
          <div className="text-center text-white/40 text-xs border-t border-white/10 pt-8">
            © 2026 VSLA Connect by Finovate Malawi. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}

// Quick inline icon component to avoid needing extra imports if they don't exist
function Phone(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  )
}
