import React from 'react';
import Link from 'next/link';
import { LandingHeader } from '@/components/organisms/LandingHeader/LandingHeader';
import { 
  ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, Smartphone,
  Users, HandCoins, Sprout, Building2, Quote, 
  MapPin, Calendar, Globe, Star, Zap, Lock, PieChart
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans w-full text-zinc-900 overflow-x-hidden">
      
      {/* ======= 1. HERO SECTION ======= */}
      <section className="relative w-full min-h-screen bg-[#0F4C36] overflow-hidden">
        <LandingHeader />

        {/* Background texture dots */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>

        {/* Large decorative circle */}
        <div className="absolute -right-40 -top-40 w-[700px] h-[700px] bg-white/5 rounded-full border border-white/10"></div>
        <div className="absolute -right-20 -top-20 w-[500px] h-[500px] bg-white/5 rounded-full border border-white/10"></div>

        <div className="max-w-[1400px] mx-auto px-5 sm:px-12 lg:px-24 pt-32 sm:pt-40 pb-16 lg:pb-0 flex flex-col lg:flex-row items-center gap-10 lg:gap-12 relative z-10">
          
          {/* Left: Hero Copy */}
          <div className="flex-1 text-white text-center lg:text-left mt-4 lg:mt-0">
            <h1 className="text-[2.5rem] sm:text-5xl lg:text-[72px] font-bold leading-[1.1] mb-5 sm:mb-6 tracking-tight">
              Empowering<br/>
              <span className="text-[#C68D5D]">Community</span><br/>
              Savings Groups
            </h1>

            <p className="text-sm sm:text-lg text-white/70 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
              Digitize your Village Savings &amp; Loan Association. Track every shilling transparently,
              build a credit history, and unlock access to formal finance — all without internet.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10 justify-center lg:justify-start">
              <Link 
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-[#C68D5D] hover:bg-[#b07b4d] text-white font-bold px-8 py-3.5 rounded-2xl sm:rounded-full shadow-xl hover:-translate-y-0.5 transition-all text-sm w-full sm:w-auto"
              >
                Start for Free <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link 
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 font-bold px-8 py-3.5 rounded-2xl sm:rounded-full transition-all text-sm w-full sm:w-auto"
              >
                See How It Works
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-bold text-white text-xs sm:text-sm">4.9/5 Rating</div>
                  <div className="text-white/50 text-[10px] sm:text-xs">From 450+ groups</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-bold text-white text-xs sm:text-sm">Tamper-Proof</div>
                  <div className="text-white/50 text-[10px] sm:text-xs">Immutable ledger</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0">
                  <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-bold text-white text-xs sm:text-sm">USSD Access</div>
                  <div className="text-white/50 text-[10px] sm:text-xs">No internet needed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Hero Image Stack */}
          <div className="flex-1 relative w-full lg:h-[700px] mt-8 lg:mt-0">
            {/* Main hero image */}
            <div className="relative w-full h-[260px] sm:h-[400px] lg:h-[580px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1542884748-2b87b36c6b90?q=80&w=1200&auto=format&fit=crop" 
                alt="African women collaborating in savings group" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Floating stats card - top left */}
            <div className="absolute -left-6 top-16 bg-white rounded-2xl p-5 shadow-2xl min-w-[190px] hidden lg:block">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#E6F0E6] rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#0F4C36]" />
                </div>
                <div className="text-xs text-zinc-500 font-semibold">This Month</div>
              </div>
              <div className="font-bold text-2xl text-zinc-900">+MWK 2.4M</div>
              <div className="text-xs text-emerald-600 font-semibold mt-1">↑ 18% in savings</div>
            </div>

            {/* Floating members card - bottom right */}
            <div className="absolute -bottom-6 -right-6 bg-[#C68D5D] rounded-2xl p-5 shadow-2xl hidden lg:block">
              <div className="flex -space-x-3 mb-3">
                <img src="https://images.unsplash.com/photo-1531123897727-8f129e1bfa82?q=80&w=80&h=80&auto=format&fit=crop&faces=1" className="w-9 h-9 rounded-full border-2 border-white object-cover" alt="Member" />
                <img src="https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=80&h=80&auto=format&fit=crop&faces=1" className="w-9 h-9 rounded-full border-2 border-white object-cover" alt="Member" />
                <img src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=80&h=80&auto=format&fit=crop" className="w-9 h-9 rounded-full border-2 border-white object-cover" alt="Member" />
                <div className="w-9 h-9 rounded-full border-2 border-white bg-[#b07b4d] flex items-center justify-center text-xs font-bold text-white">+</div>
              </div>
              <div className="font-bold text-white text-2xl">2,665+</div>
              <div className="text-white/80 text-xs font-semibold">Active Members</div>
            </div>

            {/* Floating loan card - bottom left */}
            <div className="absolute bottom-16 -left-4 bg-white rounded-xl px-5 py-4 shadow-xl hidden lg:block border-l-4 border-[#0F4C36]">
              <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Latest Loan Approved</div>
              <div className="font-bold text-zinc-900 text-lg">MWK 85,000</div>
              <div className="text-[10px] text-emerald-600 font-semibold">Chigwirizano Group · 2 min ago</div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 lg:h-20">
            <path d="M0 80L1440 80L1440 40C1200 0 960 80 720 40C480 0 240 80 0 40L0 80Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ======= 2. FEATURE HIGHLIGHTS STRIP ======= */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Lock, title: 'Tamper-Proof Records', desc: 'Every transaction permanently immutable' },
              { icon: Smartphone, title: 'USSD Offline Access', desc: 'Works without internet on any phone' },
              { icon: PieChart, title: 'Credit Health Score', desc: 'Auto-generated for bank loan access' },
              { icon: Zap, title: 'Instant SMS Receipts', desc: 'Confirmation sent after every transaction' },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
                <div className="w-12 h-12 bg-[#E6F0E6] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#0F4C36] transition-colors">
                  <f.icon className="w-5 h-5 text-[#0F4C36] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 text-sm mb-1">{f.title}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= 3. ABOUT / WE CARE ======= */}
      <section id="features" className="py-28 sm:py-36 w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left: Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-3xl h-[240px] shadow-lg">
                  <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Group meeting" />
                </div>
                <div className="relative overflow-hidden rounded-2xl h-[140px] shadow-lg">
                  <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Women saving" />
                </div>
              </div>
              <div className="space-y-4 pt-10">
                <div className="relative overflow-hidden rounded-2xl h-[140px] shadow-lg">
                  <img src="https://images.unsplash.com/photo-1526958097901-5e6d742d3371?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Agriculture" />
                </div>
                <div className="relative overflow-hidden rounded-3xl h-[240px] shadow-lg">
                  <img src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Discussion" />
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0F4C36] text-white p-5 rounded-2xl shadow-2xl text-center min-w-[160px] border-4 border-white">
              <div className="text-3xl font-bold">5+</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 mt-1">Years of<br/>Financial Inclusion</div>
            </div>

            {/* Decorative corner dot pattern */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 opacity-20" style={{backgroundImage: 'radial-gradient(circle, #0F4C36 1.5px, transparent 1.5px)', backgroundSize: '8px 8px'}}></div>
          </div>

          {/* Right: Text */}
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 text-[#0F4C36] font-bold text-xs uppercase tracking-widest mb-5">
              <Sprout className="w-4 h-4" />
              <span>About VSLA Connect</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] mb-6 text-zinc-900 tracking-tight">
              We Care About <span className="text-[#0F4C36]">Your Community</span> Savings
            </h2>
            <p className="text-base text-zinc-500 mb-8 leading-relaxed">
              Village Savings and Loan Associations are the economic backbone of millions of African 
              communities — yet they remain trapped in paper ledgers, disputed records, and limited 
              trust. VSLA Connect changes that completely.
            </p>

            <div className="space-y-5 mb-10">
              {[
                { title: 'Tamper-Proof Digital Ledger', desc: 'Every contribution, loan, and repayment is recorded permanently and cannot be altered.' },
                { title: 'Real-time SMS & USSD Access', desc: 'Members get instant receipts and can check balances on any phone, anytime.' },
                { title: 'Bank-Integrated Health Score', desc: 'Your group\'s saving discipline automatically generates a score recognized by partner banks.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 bg-[#E6F0E6] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0F4C36]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 text-sm mb-1">{item.title}</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link 
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-[#0F4C36] hover:bg-[#0c3d2c] text-white font-bold px-10 py-4 rounded-2xl sm:rounded-full shadow-lg hover:-translate-y-0.5 transition-transform w-full sm:w-auto"
              >
                Join Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 border border-zinc-300 text-zinc-700 hover:bg-zinc-50 font-bold px-10 py-4 rounded-2xl sm:rounded-full transition-all w-full sm:w-auto"
              >
                See the Process
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======= 4. WHY CHOOSE US (Green BG) ======= */}
      <section className="py-28 bg-[#0F4C36] relative overflow-hidden">
        {/* Decorative BG elements */}
        <div className="absolute -left-32 -top-32 w-80 h-80 bg-white/5 rounded-full"></div>
        <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-white/5 rounded-full"></div>
        <div className="absolute top-0 right-0 bottom-0 left-1/2 opacity-5" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>

        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            
            {/* Left */}
            <div className="lg:w-[55%]">
              <div className="inline-flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-widest mb-5">
                <ShieldCheck className="w-4 h-4" />
                <span>Why Choose Us</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] mb-6 text-white tracking-tight">
                Recognized for <br/><span className="text-[#C68D5D]">Financial Inclusion</span> <br/>Excellence
              </h2>
              <p className="text-white/60 mb-10 text-base leading-relaxed">
                We're built specifically for the African informal savings landscape. Not a generic banking app,
                but a platform purpose-built for how VSLAs actually operate.
              </p>

              {/* Feature Tabs Style */}
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { icon: Lock, title: 'Dispute-Free Records', desc: 'Immutable logs eliminate "he said, she said" arguments over contributions.' },
                  { icon: Smartphone, title: 'No Smartphone Needed', desc: 'USSD access means any feature phone can check balances and record payments.' },
                  { icon: PieChart, title: 'Credit Pathway', desc: 'Groups with 3+ cycles get credit scores that open doors to formal lending.' },
                  { icon: Users, title: 'Democratic Governance', desc: 'Loan approvals via transparent voting. Every member has a voice.' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/8 border border-white/10 rounded-2xl p-6 hover:bg-white/12 transition-colors backdrop-blur-sm">
                    <div className="w-10 h-10 bg-[#C68D5D]/20 rounded-xl flex items-center justify-center mb-4">
                      <item.icon className="w-5 h-5 text-[#C68D5D]" />
                    </div>
                    <h4 className="font-bold text-white text-sm mb-2">{item.title}</h4>
                    <p className="text-white/60 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div className="lg:w-[45%] relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-[500px]">
                <img 
                  src="https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?q=80&w=1000&auto=format&fit=crop" 
                  className="w-full h-full object-cover" 
                  alt="Community working together" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C36]/60 to-transparent"></div>

                {/* Quote overlay at bottom */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                  <Quote className="w-5 h-5 text-[#C68D5D] mb-2" />
                  <p className="text-white text-sm leading-relaxed italic">
                    "Our group secured a MWK 3.2M agricultural loan after just two VSLA cycles."
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="w-8 h-8 bg-[#C68D5D] rounded-full flex items-center justify-center font-bold text-white text-xs">MK</div>
                    <div>
                      <div className="text-white font-bold text-xs">Mercy K. Banda</div>
                      <div className="text-white/60 text-[10px]">Chairperson, Chigwirizano Group</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stat */}
              <div className="absolute -top-6 -right-6 bg-[#C68D5D] rounded-2xl p-5 text-center shadow-2xl border-4 border-white">
                <div className="text-3xl font-bold text-white">99%</div>
                <div className="text-white/80 text-[10px] font-bold uppercase tracking-wider mt-1">Repayment<br/>Rate</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======= 5. HOW IT WORKS ======= */}
      <section id="how-it-works" className="py-28 sm:py-36 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 text-center">
          <div className="inline-flex items-center gap-2 text-[#0F4C36] font-bold text-xs uppercase tracking-widest mb-5">
            <HandCoins className="w-4 h-4" />
            <span>Working Process</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] mb-6 text-zinc-900 tracking-tight">
            How Does VSLA Connect Work?
          </h2>
          <p className="text-zinc-500 mb-20 max-w-2xl mx-auto text-base leading-relaxed">
            From creating your group to distributing funds at cycle end, every step is handled digitally with full transparency and auditable records.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection line on desktop */}
            <div className="absolute top-[52px] left-[15%] right-[15%] h-0.5 bg-[#0F4C36]/10 hidden lg:block"></div>

            {[
              { step: '01', title: 'Create Your Group', desc: 'Register your VSLA group. Invite members, set contribution cycles, and define loan policies — all in minutes.', icon: Users },
              { step: '02', title: 'Pool Savings', desc: 'Members contribute shares on meeting days. Every transaction is recorded in the tamper-proof digital ledger with automatic SMS receipts.', icon: HandCoins },
              { step: '03', title: 'Issue Micro-Loans', desc: 'Members apply for loans from the social fund. Transparent voting ensures fair and democratic approval.', icon: Building2 },
              { step: '04', title: 'Share Out & Repeat', desc: 'At the end of each cycle, profits are distributed fairly using verified data. Begin the next cycle stronger.', icon: TrendingUp },
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center group">
                <div className="relative z-10 w-28 h-28 rounded-full bg-white border-2 border-[#0F4C36]/10 flex flex-col items-center justify-center mb-6 shadow-md group-hover:bg-[#0F4C36] group-hover:border-[#0F4C36] transition-all duration-300">
                  <item.icon className="w-8 h-8 text-[#0F4C36] group-hover:text-white transition-colors" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#C68D5D] group-hover:text-white/60 mt-1">Step {item.step}</span>
                </div>
                <h4 className="font-bold text-xl text-zinc-900 mb-3 group-hover:text-[#0F4C36] transition-colors">{item.title}</h4>
                <p className="text-sm text-zinc-500 leading-relaxed text-center max-w-[240px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= 6. IMPACT STATS ======= */}
      <section id="impact" className="py-20 bg-[#0F4C36] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '859+', label: 'Active Groups', sub: 'Across Malawi', highlight: false },
              { value: '99%', label: 'Repayment Rate', sub: 'All cycles averaged', highlight: true },
              { value: 'MWK 8M+', label: 'Pooled Savings', sub: 'Total across groups', highlight: false },
              { value: '683+', label: 'Loans Issued', sub: 'With 0 ledger disputes', highlight: false },
            ].map((s, i) => (
              <div key={i} className={`rounded-3xl p-8 text-center ${s.highlight ? 'bg-white shadow-2xl scale-105' : 'bg-white/8 border border-white/10 backdrop-blur-sm'}`}>
                <div className={`text-4xl font-bold mb-2 ${s.highlight ? 'text-[#0F4C36]' : 'text-white'}`}>{s.value}</div>
                <div className={`font-bold text-sm mb-1 ${s.highlight ? 'text-zinc-900' : 'text-[#C68D5D]'}`}>{s.label}</div>
                <div className={`text-xs ${s.highlight ? 'text-zinc-500' : 'text-white/50'}`}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= 7. TESTIMONIALS ======= */}
      <section className="py-28 sm:py-36 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-[#0F4C36] font-bold text-xs uppercase tracking-widest mb-5">
              <Quote className="w-4 h-4" />
              <span>Community Feedback</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] text-zinc-900 mb-4">
              What Our <span className="text-[#0F4C36]">Members</span> Say
            </h2>
            <p className="text-zinc-500 text-base leading-relaxed max-w-xl mx-auto">
              Real stories from real savings groups across Malawi — communities building a better financial future.
            </p>
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                name: 'Douglas T. Phiri',
                role: 'Chairperson',
                group: 'Chigwirizano Group',
                location: 'Lilongwe, Malawi',
                img: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=100&h=100&auto=format&fit=crop&faces=1',
                text: 'Digitizing our ledger completely eliminated contribution disputes. We know exactly who paid, how much, and when — everyone can see it.',
                rating: 5,
                featured: false,
              },
              {
                name: 'Mercy K. Banda',
                role: 'Group Member',
                group: 'Mphatso Women Group',
                location: 'Mzuzu, Malawi',
                img: 'https://images.unsplash.com/photo-1531123897727-8f129e1bfa82?q=80&w=100&h=100&auto=format&fit=crop&faces=1',
                text: 'The health score feature helped our group secure a formal farming loan from NBS Bank for the first time in 12 years of saving together.',
                rating: 5,
                featured: true,
              },
              {
                name: 'Chikondi Moyo',
                role: 'Treasurer',
                group: 'Tiyanjane Savings Circle',
                location: 'Blantyre, Malawi',
                img: 'https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=100&h=100&auto=format&fit=crop&faces=1',
                text: 'Month-end reconciliation now takes 5 minutes instead of hours. The SMS receipts alone have saved us so many headaches.',
                rating: 5,
                featured: false,
              },
            ].map((t, i) => (
              <div
                key={i}
                className={`relative rounded-3xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                  t.featured
                    ? 'bg-[#0F4C36] shadow-2xl text-white'
                    : 'bg-white border border-slate-100 shadow-sm hover:shadow-lg text-zinc-900'
                }`}
              >
                {/* Featured label */}
                {t.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C68D5D] text-white text-[10px] font-bold uppercase tracking-widest px-5 py-1.5 rounded-full shadow-lg">
                    Most Impactful
                  </div>
                )}

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(t.rating)].map((_, si) => (
                    <Star key={si} className={`w-4 h-4 fill-current ${ t.featured ? 'text-[#C68D5D]' : 'text-[#C68D5D]'}`} />
                  ))}
                </div>

                {/* Quote mark */}
                <div className={`text-6xl font-serif leading-none mb-2 ${t.featured ? 'text-white/20' : 'text-[#0F4C36]/10'}`}>&ldquo;</div>

                <p className={`text-sm leading-relaxed flex-1 mb-8 ${t.featured ? 'text-white/80' : 'text-zinc-600'}`}>
                  {t.text}
                </p>

                {/* Divider */}
                <div className={`h-px mb-6 ${t.featured ? 'bg-white/15' : 'bg-slate-100'}`}></div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={t.img}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${ t.featured ? 'bg-[#C68D5D]' : 'bg-[#0F4C36]'}`}>
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className={`font-bold text-sm ${ t.featured ? 'text-white' : 'text-zinc-900'}`}>{t.name}</div>
                    <div className={`text-xs font-medium ${ t.featured ? 'text-white/70' : 'text-[#0F4C36]'}`}>{t.role}</div>
                    <div className={`text-[11px] mt-0.5 ${ t.featured ? 'text-white/50' : 'text-zinc-400'}`}>{t.group} · {t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom stat row */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '4.9/5', label: 'Average Rating', icon: Star },
              { value: '450+', label: 'Groups Reviewed', icon: Users },
              { value: '99%', label: 'Would Recommend', icon: CheckCircle2 },
              { value: '0', label: 'Ledger Disputes', icon: ShieldCheck },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <div className="w-10 h-10 bg-[#E6F0E6] rounded-xl flex items-center justify-center shrink-0">
                  <s.icon className="w-5 h-5 text-[#0F4C36]" />
                </div>
                <div>
                  <div className="font-bold text-lg text-zinc-900">{s.value}</div>
                  <div className="text-xs text-zinc-500">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= 8. CTA BANNER ======= */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Community" />
          <div className="absolute inset-0 bg-[#0F4C36]/90"></div>
        </div>
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="text-white">
            <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-300 mb-4">Ready to Get Started?</div>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight max-w-2xl">
              Digitize Your Savings Cycle <span className="text-[#C68D5D]">Today</span>
            </h2>
            <p className="text-white/60 mt-4 text-base max-w-xl leading-relaxed">
              Join 859+ groups already building formal credit history, eliminating disputes, and growing together with VSLA Connect.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 shrink-0 w-full sm:w-auto">
            <Link 
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-[#C68D5D] hover:bg-[#b07b4d] text-white font-bold px-10 py-4 rounded-2xl sm:rounded-full shadow-xl hover:-translate-y-0.5 transition-transform w-full sm:w-auto"
            >
              Create a Group Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/login"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 font-bold px-10 py-4 rounded-2xl sm:rounded-full transition-all w-full sm:w-auto"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ======= 9. BLOG / NEWS ======= */}
      <section id="news" className="py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 text-[#0F4C36] font-bold text-xs uppercase tracking-widest mb-5">
                <Calendar className="w-4 h-4" />
                <span>Our Blog</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] text-zinc-900 tracking-tight">
                Latest News & <span className="text-[#0F4C36]">Updates</span>
              </h2>
            </div>
            <Link 
              href="#"
              className="inline-flex items-center justify-center gap-2 border border-zinc-300 text-zinc-700 hover:bg-zinc-50 font-bold px-8 py-3.5 rounded-2xl sm:rounded-full transition-all shrink-0 w-full lg:w-auto mt-4 lg:mt-0"
            >
              View All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Empowering Rural Women Through Formal Finance',
                excerpt: 'How VSLA Connect is helping women-led savings groups in rural Malawi unlock access to agricultural lending.',
                img: 'https://images.unsplash.com/photo-1542884748-2b87b36c6b90?q=80&w=600',
                tag: 'Community',
                date: '12 Oct 2026'
              },
              { 
                title: 'How USSD is Bridging the Digital Finance Divide',
                excerpt: 'A deep dive into how our USSD gateway enables financial participation for the 2 billion unbanked without smartphones.',
                img: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=600',
                tag: 'Technology',
                date: '5 Oct 2026'
              },
              { 
                title: 'Why Bank-Integrated Health Scores Matter',
                excerpt: 'Understanding how VSLA discipline translates into credit scores and why partner banks now accept group financial histories.',
                img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600',
                tag: 'Finance',
                date: '28 Sep 2026'
              }
            ].map((post, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <div className="h-[220px] overflow-hidden relative">
                  <img src={post.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={post.title} />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#0F4C36] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                      {post.tag}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold mb-4">
                    <Calendar className="w-3.5 h-3.5 text-[#C68D5D]" />
                    {post.date}
                  </div>
                  <h4 className="font-bold text-xl text-zinc-900 mb-3 leading-tight group-hover:text-[#0F4C36] transition-colors">{post.title}</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed flex-1 mb-6">{post.excerpt}</p>
                  <Link href="#" className="text-sm font-bold text-[#0F4C36] flex items-center gap-2 hover:text-[#C68D5D] transition-colors">
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= 10. FOOTER ======= */}
      <footer className="bg-[#0F4C36] text-white relative overflow-hidden">
        {/* BG texture */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px'}}></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full"></div>

        {/* Newsletter CTA strip */}
        <div className="relative z-10 border-b border-white/10">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 py-6 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">Stay Updated with VSLA Connect</h3>
              <p className="text-white/60 text-xs sm:text-sm mt-1">Get news, tips, and feature updates straight to your inbox.</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 sm:w-56 bg-white/10 border border-white/20 rounded-lg sm:rounded-full px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none focus:border-[#C68D5D] transition-all"
              />
              <button className="bg-[#C68D5D] hover:bg-[#b07b4d] text-white font-bold text-sm rounded-lg sm:rounded-full px-5 py-2.5 transition-colors shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 py-10 sm:py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 font-bold text-lg sm:text-xl mb-4 group">
                <span className="inline-flex w-10 h-10 bg-[#C68D5D] rounded-full items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <HandCoins className="w-5 h-5 text-white" />
                </span>
                <span className="text-white">VSLA Connect</span>
              </Link>
              <p className="text-white/55 text-xs sm:text-sm leading-relaxed mb-5">
                Empowering Village Savings &amp; Loan Associations across Africa with digital transparency, tamper-proof records, and pathways to formal banking.
              </p>
              {/* Social Links */}
              <div className="flex gap-2">
                {[
                  { label: 'FB', href: '#' },
                  { label: 'TW', href: '#' },
                  { label: 'IN', href: '#' },
                  { label: 'YT', href: '#' },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[10px] font-black text-white/60 hover:bg-[#C68D5D] hover:border-[#C68D5D] hover:text-white transition-all"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="font-black text-[10px] sm:text-xs uppercase tracking-widest mb-4 sm:mb-6 text-white/50 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-[#C68D5D] inline-block"></span> Platform
              </h4>
              <ul className="space-y-2.5 sm:space-y-4">
                {[
                  { label: 'About Us', href: '#features' },
                  { label: 'How It Works', href: '#how-it-works' },
                  { label: 'Impact & Stats', href: '#impact' },
                  { label: 'Partner Banks', href: '#' },
                  { label: 'USSD Guide', href: '#' },
                  { label: 'API Documentation', href: '#' },
                ].map((l, i) => (
                  <li key={i}>
                    <Link href={l.href} className="text-white/55 text-sm hover:text-white hover:pl-2 transition-all inline-flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-3 h-px bg-[#C68D5D] transition-all"></span>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="font-black text-[10px] sm:text-xs uppercase tracking-widest mb-4 sm:mb-6 text-white/50 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-[#C68D5D] inline-block"></span> Support
              </h4>
              <ul className="space-y-2.5 sm:space-y-4">
                {[
                  { label: 'Help Center', href: '#' },
                  { label: 'Contact Support', href: '#' },
                  { label: 'Training Videos', href: '#' },
                  { label: 'System Status', href: '#' },
                  { label: 'Privacy Policy', href: '#' },
                  { label: 'Terms of Service', href: '#' },
                ].map((l, i) => (
                  <li key={i}>
                    <Link href={l.href} className="text-white/55 text-sm hover:text-white hover:pl-2 transition-all inline-flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-3 h-px bg-[#C68D5D] transition-all"></span>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Info */}
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest mb-7 text-white/50 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#C68D5D] inline-block"></span> Contact Us
              </h4>
              <ul className="space-y-5">
                <li className="flex gap-4">
                  <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#C68D5D]" />
                  </div>
                  <div className="text-white/55 text-sm leading-relaxed">
                    123 Innovation Hub, Area 12,<br/>Lilongwe, Malawi
                  </div>
                </li>
                <li className="flex gap-4 items-center">
                  <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#C68D5D]" />
                  </div>
                  <span className="text-white/55 text-sm">+265 999 000 000</span>
                </li>
                <li className="flex gap-4 items-center">
                  <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-[#C68D5D]" />
                  </div>
                  <span className="text-white/55 text-sm">info@vslaconnect.mw</span>
                </li>
              </ul>

              {/* Mini Stats */}
              <div className="mt-8 p-5 bg-white/8 rounded-2xl border border-white/10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">859+</div>
                    <div className="text-[10px] text-[#C68D5D] font-bold uppercase tracking-wider mt-0.5">Groups</div>
                  </div>
                  <div className="text-center border-l border-white/10">
                    <div className="text-2xl font-bold text-white">25+</div>
                    <div className="text-[10px] text-[#C68D5D] font-bold uppercase tracking-wider mt-0.5">Partners</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 border-t border-white/10">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-white/40 text-xs">© 2026 VSLA Connect by Finovate Malawi. All rights reserved.</span>
            <div className="flex gap-6 text-xs">
              <Link href="#" className="text-white/40 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-white/40 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="text-white/40 hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

function Phone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12 19.79 19.79 0 0 1 1.04 3.32a2 2 0 0 1 2-1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}
