import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { HeroJoinForm } from '@/components/atoms/HeroJoinForm/HeroJoinForm';
import { 
  ArrowRight, Globe, ShieldCheck, TrendingUp, HandCoins, Users 
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans w-full text-zinc-900 overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative w-full h-[600px] lg:h-[750px]">
        <img 
          src="https://images.unsplash.com/photo-1542884748-2b87b36c6b90?q=80&w=2000&auto=format&fit=crop" 
          alt="African women collaborating" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

        {/* Nav */}
        <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 sm:px-12 lg:px-24 py-8 text-white z-10 w-full">
          <div className="flex items-center gap-3 font-bold text-xl tracking-tight">
            <span className="inline-flex w-10 h-10 bg-emerald-500 rounded-full items-center justify-center shadow-lg">
              <HandCoins className="w-5 h-5 text-white" />
            </span>
            VSLA Connect
          </div>
          <div className="hidden lg:flex items-center gap-10 text-[13px] font-semibold tracking-wide">
            <Link href="#" className="text-white hover:text-emerald-400 transition-colors">Home</Link>
            <Link href="#features" className="text-white/80 hover:text-emerald-400 transition-colors">Features</Link>
            <Link href="#impact" className="text-white/80 hover:text-emerald-400 transition-colors">Impact</Link>
            <Link href="#faq" className="text-white/80 hover:text-emerald-400 transition-colors">FAQ</Link>
          </div>
          <div className="flex items-center gap-6 text-[13px] font-semibold">
            <span className="hidden md:flex items-center gap-1.5 opacity-90">
              <Globe className="w-4 h-4" /> ENG
            </span>
            <Link href="/login">
              <Button variant="primary" className="rounded-full bg-emerald-500 hover:bg-emerald-400 border-none shadow-md px-8 py-2.5 text-zinc-950 font-bold">
                Login
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero content */}
        <div className="absolute left-6 sm:left-12 lg:left-24 top-[180px] sm:top-[220px] max-w-2xl text-white z-10">
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest bg-white/10 border border-white/20 text-emerald-300 rounded-full px-5 py-2 backdrop-blur-md mb-8">
            Empowering Communities
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-[80px] font-bold leading-[1.05] mb-8 tracking-tight">
            Digitize Your <br/>Savings, <br/><span className="text-emerald-400">Unlock Formal <br/>Finance</span>
          </h1>
          <p className="text-base sm:text-lg opacity-80 mb-10 max-w-[400px] font-light leading-relaxed">
            Whether you are pooling resources or building a health score for bank loans, your financial journey starts here.
          </p>
          <a href="#features">
            <Button variant="outline" className="rounded-full bg-black/40 border border-white/20 text-white hover:bg-white/10 backdrop-blur-md px-8 py-4 font-semibold text-sm">
              Explore Features <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </section>

      {/* WHAT WE DO SECTION */}
      <section id="features" className="py-24 sm:py-32 w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column */}
          <div className="flex flex-col">
            <div className="mb-12">
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-600 rounded-full px-4 py-2 mb-8">
                What We Do
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.1] mb-8 text-zinc-900 tracking-tight">
                Savings Made <br/>Simple, <br/>Communities <br/>Made Stronger
              </h2>
              <p className="text-base sm:text-lg text-zinc-500 max-w-[420px] leading-relaxed">
                We provide a tamper-evident ledger and USSD accessibility so every contribution and loan is tracked transparently, bridging the gap to formal finance.
              </p>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-[500px]">
              <div className="relative rounded-2xl overflow-hidden h-[180px] shadow-sm">
                <span className="absolute top-4 left-4 text-[9px] uppercase tracking-widest text-white z-10 font-bold bg-black/60 px-3 py-1.5 rounded backdrop-blur-sm">/01 Transparency</span>
                <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Handing money" />
              </div>
              <div className="relative rounded-2xl overflow-hidden h-[180px] shadow-sm">
                <span className="absolute top-4 left-4 text-[9px] uppercase tracking-widest text-white z-10 font-bold bg-black/60 px-3 py-1.5 rounded backdrop-blur-sm">/02 Accessible</span>
                <img src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="People meeting" />
              </div>
              <div className="relative rounded-2xl overflow-hidden h-[160px] col-span-2 shadow-sm">
                <span className="absolute top-4 left-4 text-[9px] uppercase tracking-widest text-white z-10 font-bold bg-black/60 px-3 py-1.5 rounded backdrop-blur-sm">/03 Bank Integrated</span>
                <img src="https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="African smiling" />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative rounded-[2.5rem] overflow-hidden h-[600px] sm:h-[750px] shadow-xl w-full">
            <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Community working" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* White floating card inside image */}
            <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 bg-white rounded-3xl p-8 sm:p-10 shadow-2xl max-w-[340px]">
              <h3 className="font-bold text-2xl mb-4 text-emerald-600 tracking-tight leading-snug">Disputes? Not on Our Watch!</h3>
              <p className="text-sm text-zinc-500 mb-8 leading-relaxed font-medium">
                Say goodbye to paper ledger headaches. We record every transaction immutably, generate health scores, and even send SMS receipts instantly.
              </p>
              <div className="flex items-center justify-between">
                <Button variant="ghost" className="p-0 text-zinc-300 font-bold hover:bg-transparent hover:text-emerald-500 text-sm tracking-wide" rightIcon={<ArrowRight className="w-4 h-4"/>}>
                  Read the docs
                </Button>
                <div className="flex items-center gap-4 text-xs font-bold">
                  <span className="cursor-pointer text-zinc-300 hover:text-emerald-500 transition-colors">&lt;</span>
                  <span className="text-zinc-900">1/3</span>
                  <span className="cursor-pointer text-zinc-300 hover:text-emerald-500 transition-colors">&gt;</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* REAL IMPACT SECTION */}
      <section id="impact" className="py-24 sm:py-32 bg-[#fafafa] border-y border-zinc-100 w-full">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
          
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
            <div className="max-w-2xl">
              <span className="inline-block text-[11px] font-bold uppercase tracking-widest bg-emerald-100 text-emerald-600 rounded-full px-4 py-2 mb-8">
                Real Impact
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.1] text-zinc-900 tracking-tight">
                Success Stories You'll <br/>Never Stop Talking <br/>About
              </h2>
            </div>
            <div className="max-w-xs lg:pb-4 flex flex-col lg:items-end lg:text-right">
              <p className="text-[15px] text-zinc-500 mb-8 leading-relaxed font-medium">
                From micro-loans to starting small businesses, see how digital VSLA groups are transforming communities.
              </p>
              <Link href="/register">
                <Button variant="primary" className="rounded-[2rem] bg-black text-white hover:bg-zinc-800 shadow-md px-8 py-4 text-sm font-semibold inline-flex items-center justify-center">
                  Create Your Group <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="relative rounded-[2.5rem] overflow-hidden h-[500px] group shadow-sm bg-black">
              <img src="https://images.unsplash.com/photo-1526958097901-5e6d742d3371?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700" alt="Agriculture" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
              
              <span className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80 border border-white/10">
                <TrendingUp className="w-4 h-4" />
              </span>
              
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="font-bold text-2xl mb-4 tracking-tight">Agricultural Expansion</h3>
                <p className="text-[15px] opacity-80 mb-8 leading-relaxed font-light">The Chigwirizano group used their formal health score to secure a bank loan for fertilizer.</p>
                <div className="flex gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest bg-white/10 border border-white/20 rounded-full px-4 py-2 backdrop-blur-sm">Farming</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest bg-white/10 border border-white/20 rounded-full px-4 py-2 backdrop-blur-sm">Credit</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative rounded-[2.5rem] overflow-hidden h-[500px] group shadow-sm bg-black">
              <img src="https://images.unsplash.com/photo-1511871893393-82e9c16b81e3?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700" alt="Market" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
              
              <span className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80 border border-white/10">
                <ShieldCheck className="w-4 h-4" />
              </span>
              
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="font-bold text-2xl mb-4 tracking-tight">Market Trader Security</h3>
                <p className="text-[15px] opacity-80 mb-8 leading-relaxed font-light">No more stolen lockboxes. All funds are digitized via Mobile Money integration safely.</p>
                <div className="flex gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest bg-white/10 border border-white/20 rounded-full px-4 py-2 backdrop-blur-sm">Security</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest bg-white/10 border border-white/20 rounded-full px-4 py-2 backdrop-blur-sm">USSD</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative rounded-[2.5rem] overflow-hidden h-[500px] group shadow-sm bg-black sm:col-span-2 lg:col-span-1">
              <img src="https://images.unsplash.com/photo-1533022137081-30eb305c0d64?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700" alt="Small business" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
              
              <span className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80 border border-white/10">
                <Users className="w-4 h-4" />
              </span>
              
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="font-bold text-2xl mb-4 tracking-tight">Women's Entrepreneurship</h3>
                <p className="text-[15px] opacity-80 mb-8 leading-relaxed font-light">Internal loans are voted on via SMS, allowing rapid capital deployment for new stalls.</p>
                <div className="flex gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest bg-white/10 border border-white/20 rounded-full px-4 py-2 backdrop-blur-sm">Business</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest bg-white/10 border border-white/20 rounded-full px-4 py-2 backdrop-blur-sm">Empower</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 sm:py-32 w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div>
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest bg-zinc-100 text-zinc-500 rounded-full px-4 py-2 mb-8">
              Platform FAQ
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.1] text-zinc-900 tracking-tight">
              Everything You Need to <br/>Know, All in One Place
            </h2>
          </div>
          <p className="text-[15px] text-zinc-500 max-w-sm leading-relaxed font-medium lg:pb-4">
            We know transitioning from paper to digital comes with questions. Here is how we ensure your group's money is safe and accessible.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { id: '01', q: 'How do members without smartphones use this?', a: "Through our Africa's Talking USSD integration. Dial *384*VSLA# to check balances, request loans, and vote on withdrawals." },
            { id: '02', q: 'What is the Group Health Score?', a: "An AI-calculated metric (0-1000) based on on-time repayments, meeting attendance, and savings consistency to prove creditworthiness to banks." },
            { id: '03', q: 'How is the ledger tamper-evident?', a: "Every transaction (contribution, loan, payout) is cryptographically hashed with the previous entry. Deleting or altering past records breaks the chain." },
            { id: '04', q: 'How do we deposit money?', a: "We integrate with PayChangu. Members can send funds via Mobile Money or card, and it automatically reflects in the group's digital ledger." },
            { id: '05', q: 'Who controls the funds?', a: "The group does. Withdrawals require multi-signature approval (voting) by the Chairperson, Treasurer, and members before payout is authorized." },
            { id: '06', q: 'Is there a fee to use VSLA Connect?', a: "Basic ledger management is free. Premium features like automated bank reporting and advanced AI analytics have a small monthly subscription." },
          ].map((faq) => (
            <div key={faq.id} className="bg-white border border-zinc-200 rounded-[2rem] p-8 sm:p-10 hover:shadow-xl transition-all duration-300">
              <span className="text-[11px] font-bold text-zinc-300 mb-6 block tracking-widest">/{faq.id}</span>
              <h3 className="font-bold text-xl mb-4 text-zinc-900 leading-snug tracking-tight">{faq.q}</h3>
              <p className="text-[15px] text-zinc-500 leading-relaxed mb-10 font-medium">{faq.a}</p>
              <div className="flex items-center gap-4 text-xs font-bold text-zinc-900 cursor-pointer group">
                <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
                Learn More
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="pb-24 w-full px-6 sm:px-12 lg:px-24">
        <div className="relative rounded-[3rem] overflow-hidden h-[500px] flex items-center justify-center text-center shadow-xl max-w-[1400px] mx-auto bg-black">
          <img src="https://images.unsplash.com/photo-1542884748-2b87b36c6b90?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-50" alt="African women community" />
          <div className="absolute inset-0 bg-emerald-950/60 mix-blend-multiply"></div>
          <div className="relative text-white max-w-3xl px-8 flex flex-col items-center">
            <h2 className="text-5xl sm:text-6xl lg:text-[72px] font-bold leading-[1.05] mb-8 tracking-tight">Ready to Elevate <br/>Your Savings Group?</h2>
            <p className="text-lg sm:text-xl opacity-90 mb-12 font-light max-w-2xl leading-relaxed">
              Join thousands of Malawians stepping into the formal financial sector while keeping the community spirit alive.
            </p>
            <Link href="/register">
              <Button variant="primary" size="lg" className="rounded-full bg-emerald-500 text-zinc-950 hover:bg-emerald-400 font-bold px-10 py-5 text-base shadow-xl border-none">
                Get Started for Free <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-emerald-950 text-emerald-100 py-20 sm:py-24 w-full border-t border-emerald-900/50">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 mb-20">
            
            {/* Brand Column */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="flex items-center gap-4 font-bold text-3xl text-white mb-8 tracking-tight">
                <span className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                  <HandCoins className="w-6 h-6 text-white" />
                </span>
                VSLA Connect
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-10 text-white max-w-md tracking-tight">
                Ready to digitize your savings? We've got the tools waiting for you.
              </h3>
              <div className="max-w-md">
                <div className="flex bg-emerald-900/40 border border-emerald-800/60 rounded-full p-2 focus-within:border-emerald-500 transition-colors backdrop-blur-sm">
                  <input 
                    type="email" 
                    placeholder="Subscribe to newsletter" 
                    className="flex-1 bg-transparent text-white text-[15px] px-6 py-3 outline-none placeholder:text-emerald-300/50" 
                  />
                  <Button type="button" variant="primary" className="rounded-full bg-emerald-500 text-emerald-950 hover:bg-emerald-400 font-bold px-8 py-3 border-none">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10 text-[15px]">
              <div>
                <h4 className="font-bold mb-8 text-white text-lg tracking-tight">Platform</h4>
                <ul className="space-y-5 text-emerald-200/70 font-medium">
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Health Score AI</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">USSD Integration</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-8 text-white text-lg tracking-tight">Resources</h4>
                <ul className="space-y-5 text-emerald-200/70 font-medium">
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">API Reference</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Bank Partners</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Support Center</a></li>
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h4 className="font-bold mb-8 text-white text-lg tracking-tight">Legal</h4>
                <ul className="space-y-5 text-emerald-200/70 font-medium">
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Security</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-emerald-800/40 pt-10 flex flex-col md:flex-row justify-between items-center text-[15px] text-emerald-400/80 gap-6">
            <span className="font-medium">© {new Date().getFullYear()} VSLA Connect. Built for FINOVATE 2026.</span>
            <div className="flex gap-8 font-medium">
              <a href="#" className="hover:text-white transition-colors">Privacy & Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
