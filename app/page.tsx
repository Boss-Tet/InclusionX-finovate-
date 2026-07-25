import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { 
  ArrowRight, Globe, ShieldCheck, TrendingUp, HandCoins, Users 
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans w-full">
      
      {/* HERO SECTION - Full width */}
      <section className="relative w-full overflow-hidden h-[600px] lg:h-[700px]">
        <img 
          src="https://images.unsplash.com/photo-1542884748-2b87b36c6b90?q=80&w=2000&auto=format&fit=crop" 
          alt="African women collaborating" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>

        {/* Nav */}
        <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 sm:px-12 lg:px-24 py-6 text-white z-10 w-full">
          <div className="flex items-center gap-3 font-bold text-xl tracking-tight">
            <span className="inline-flex w-10 h-10 bg-emerald-500 rounded-full items-center justify-center shadow-lg">
              <HandCoins className="w-5 h-5 text-white" />
            </span>
            VSLA Connect
          </div>
          <div className="hidden lg:flex items-center gap-10 text-sm font-medium">
            <Link href="#" className="opacity-90 hover:opacity-100 hover:text-emerald-400 transition-colors">Home</Link>
            <Link href="#features" className="opacity-90 hover:opacity-100 hover:text-emerald-400 transition-colors">Features</Link>
            <Link href="#impact" className="opacity-90 hover:opacity-100 hover:text-emerald-400 transition-colors">Impact</Link>
            <Link href="#faq" className="opacity-90 hover:opacity-100 hover:text-emerald-400 transition-colors">FAQ</Link>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <span className="hidden md:flex items-center gap-1.5 opacity-90">
              <Globe className="w-4 h-4" /> ENG
            </span>
            <Link href="/login">
              <Button variant="primary" className="rounded-full bg-emerald-600 hover:bg-emerald-500 border-none shadow-md px-8 py-2.5">
                Login
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero content */}
        <div className="absolute left-6 sm:left-12 lg:left-24 top-[140px] sm:top-[200px] max-w-2xl text-white z-10">
          <span className="inline-block text-xs font-semibold bg-emerald-500/20 border border-emerald-500/30 text-emerald-100 rounded-full px-5 py-2 backdrop-blur-md mb-6">
            Empowering Communities
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
            Digitize Your Savings, <br/><span className="text-emerald-400">Unlock Formal Finance</span>
          </h1>
          <p className="text-base sm:text-lg opacity-90 mb-10 max-w-lg font-light leading-relaxed">
            Whether you are pooling resources or building a health score for bank loans, your financial journey starts here.
          </p>
          <div className="flex bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2 max-w-md">
            <input 
              type="text" 
              placeholder="Enter Group Invite Code..." 
              className="flex-1 bg-transparent text-white text-base px-5 py-3 outline-none placeholder:text-white/70" 
            />
            <Button type="button" variant="primary" className="rounded-full bg-white text-emerald-900 hover:bg-emerald-50 font-bold px-8 py-3">
              Join Group
            </Button>
          </div>
        </div>

        {/* Explore more */}
        <a href="#features" className="hidden sm:flex absolute bottom-10 right-12 lg:right-24 items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium rounded-full px-8 py-4 hover:bg-white/20 transition-all z-10">
          Explore Features <ArrowRight className="w-4 h-4" />
        </a>
      </section>

      {/* OUR SERVICE */}
      <section id="features" className="py-24 sm:py-32 grid lg:grid-cols-2 gap-16 items-center w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
        <div>
          <span className="inline-block text-sm font-bold uppercase tracking-wider border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-full px-5 py-2 mb-6">
            What We Do
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-zinc-900">
            Savings Made Simple, <br/>Communities Made Stronger
          </h2>
          <p className="text-lg text-zinc-600 max-w-lg mb-12 leading-relaxed">
            We provide a tamper-evident ledger and USSD accessibility so every contribution and loan is tracked transparently, bridging the gap to formal finance.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full">
            <div className="relative w-full sm:w-1/2 rounded-2xl overflow-hidden shadow-sm group">
              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-wider text-white z-10 font-bold bg-black/60 px-3 py-1.5 rounded backdrop-blur-md">/01 Transparency</span>
              <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=500&auto=format&fit=crop" className="h-48 sm:h-56 w-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Handing money" />
            </div>
            <div className="relative w-full sm:w-1/2 rounded-2xl overflow-hidden shadow-sm group">
              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-wider text-white z-10 font-bold bg-black/60 px-3 py-1.5 rounded backdrop-blur-md">/02 Accessible</span>
              <img src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=500&auto=format&fit=crop" className="h-48 sm:h-56 w-full object-cover group-hover:scale-105 transition-transform duration-700" alt="People meeting" />
            </div>
          </div>
          <div className="relative mt-6 w-full rounded-2xl overflow-hidden shadow-sm group">
            <span className="absolute top-4 left-4 text-[10px] uppercase tracking-wider text-white z-10 font-bold bg-black/60 px-3 py-1.5 rounded backdrop-blur-md">/03 Bank Integrated</span>
            <img src="https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?q=80&w=800&auto=format&fit=crop" className="h-40 sm:h-48 w-full object-cover group-hover:scale-105 transition-transform duration-700" alt="African smiling" />
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden h-[500px] sm:h-[700px] shadow-xl">
          <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Community working" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 bg-white rounded-2xl p-8 sm:p-10 shadow-2xl">
            <h3 className="font-bold text-2xl mb-4 text-emerald-600">Disputes? Not on Our Watch!</h3>
            <p className="text-base text-zinc-600 mb-8 leading-relaxed">
              Say goodbye to paper ledger headaches. We record every transaction immutably, generate health scores, and even send SMS receipts instantly.
            </p>
            <div className="flex items-center justify-between">
              <Button variant="ghost" className="p-0 text-zinc-900 font-bold hover:bg-transparent hover:text-emerald-600 text-base" rightIcon={<ArrowRight className="w-5 h-5"/>}>
                Read the docs
              </Button>
              <div className="flex items-center gap-4 text-base text-zinc-400 font-medium">
                <span className="cursor-pointer hover:text-emerald-500 transition-colors">&lt;</span>
                <span className="text-zinc-900 font-bold">1/3</span>
                <span className="cursor-pointer hover:text-emerald-500 transition-colors">&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR IMPACT */}
      <section id="impact" className="py-24 bg-zinc-50 border-y border-zinc-100 w-full">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <span className="inline-block text-sm font-bold uppercase tracking-wider border border-emerald-200 bg-emerald-100 text-emerald-800 rounded-full px-5 py-2 mb-6">
                Real Impact
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-zinc-900">
                Success Stories You'll <br/>Never Stop Talking About
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
                From micro-loans to starting small businesses, see how digital VSLA groups are transforming communities.
              </p>
              <Link href="/register">
                <Button variant="primary" className="rounded-full bg-black text-white hover:bg-zinc-800 shadow-md px-8 py-3.5 text-base">
                  Create Your Group <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="relative rounded-3xl overflow-hidden h-[420px] group shadow-sm bg-white">
              <img src="https://images.unsplash.com/photo-1526958097901-5e6d742d3371?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Agriculture" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <span className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                <TrendingUp className="w-6 h-6" />
              </span>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="font-bold text-2xl mb-3">Agricultural Expansion</h3>
                <p className="text-base opacity-90 mb-6 leading-relaxed text-zinc-200">The Chigwirizano group used their formal health score to secure a bank loan for fertilizer.</p>
                <div className="flex gap-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 border border-white/30 rounded-full px-4 py-2 backdrop-blur-sm">Farming</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 border border-white/30 rounded-full px-4 py-2 backdrop-blur-sm">Credit</span>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="relative rounded-3xl overflow-hidden h-[420px] group shadow-sm bg-white">
              <img src="https://images.unsplash.com/photo-1511871893393-82e9c16b81e3?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Market" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <span className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                <ShieldCheck className="w-6 h-6" />
              </span>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="font-bold text-2xl mb-3">Market Trader Security</h3>
                <p className="text-base opacity-90 mb-6 leading-relaxed text-zinc-200">No more stolen lockboxes. All funds are digitized via Mobile Money integration safely.</p>
                <div className="flex gap-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 border border-white/30 rounded-full px-4 py-2 backdrop-blur-sm">Security</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 border border-white/30 rounded-full px-4 py-2 backdrop-blur-sm">USSD</span>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="relative rounded-3xl overflow-hidden h-[420px] group shadow-sm bg-white sm:col-span-2 lg:col-span-1">
              <img src="https://images.unsplash.com/photo-1533022137081-30eb305c0d64?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Small business" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <span className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                <Users className="w-6 h-6" />
              </span>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="font-bold text-2xl mb-3">Women's Entrepreneurship</h3>
                <p className="text-base opacity-90 mb-6 leading-relaxed text-zinc-200">Internal loans are voted on via SMS, allowing rapid capital deployment for new stalls.</p>
                <div className="flex gap-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 border border-white/30 rounded-full px-4 py-2 backdrop-blur-sm">Business</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 border border-white/30 rounded-full px-4 py-2 backdrop-blur-sm">Empower</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div>
            <span className="inline-block text-sm font-bold uppercase tracking-wider border border-zinc-200 bg-zinc-50 text-zinc-700 rounded-full px-5 py-2 mb-6">
              Platform FAQ
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-zinc-900">
              Everything You Need to <br/>Know, All in One Place
            </h2>
          </div>
          <p className="text-lg text-zinc-600 max-w-md leading-relaxed">
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
            <div key={faq.id} className="bg-zinc-50 border border-zinc-100 rounded-3xl p-8 sm:p-10 hover:shadow-md transition-shadow">
              <span className="text-xs font-bold text-zinc-400 mb-5 block">/{faq.id}</span>
              <h3 className="font-bold text-xl mb-4 text-zinc-900 leading-snug">{faq.q}</h3>
              <p className="text-base text-zinc-500 leading-relaxed mb-8">{faq.a}</p>
              <div className="flex items-center gap-3 text-sm font-bold text-zinc-900 cursor-pointer group">
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform">
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
        <div className="relative rounded-3xl overflow-hidden h-[450px] flex items-center justify-center text-center shadow-lg max-w-[1400px] mx-auto">
          <img src="https://images.unsplash.com/photo-1542884748-2b87b36c6b90?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="African women community" />
          <div className="absolute inset-0 bg-emerald-900/85 backdrop-blur-[2px]"></div>
          <div className="relative text-white max-w-3xl px-8 flex flex-col items-center">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8">Ready to Elevate <br/>Your Savings Group?</h2>
            <p className="text-lg sm:text-xl opacity-90 mb-12 font-light max-w-2xl leading-relaxed">
              Join thousands of Malawians stepping into the formal financial sector while keeping the community spirit alive.
            </p>
            <Link href="/register">
              <Button variant="primary" size="lg" className="rounded-full bg-white text-emerald-950 hover:bg-emerald-50 font-bold px-10 py-5 text-lg shadow-xl">
                Get Started for Free <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER - Deep Emerald, Full Width */}
      <footer className="bg-emerald-950 text-emerald-100 py-16 sm:py-20 w-full">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 mb-20">
            
            {/* Brand Column */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="flex items-center gap-4 font-bold text-3xl text-white mb-8">
                <span className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-md shadow-emerald-500/20">
                  <HandCoins className="w-6 h-6 text-white" />
                </span>
                VSLA Connect
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-10 text-white max-w-md">
                Ready to digitize your savings? We've got the tools waiting for you.
              </h3>
              <div className="max-w-md">
                <div className="flex bg-emerald-900/50 border border-emerald-800 rounded-full p-2 focus-within:border-emerald-500 transition-colors">
                  <input 
                    type="email" 
                    placeholder="Subscribe to newsletter" 
                    className="flex-1 bg-transparent text-white text-base px-6 py-3 outline-none placeholder:text-emerald-400" 
                  />
                  <Button type="button" variant="primary" className="rounded-full bg-emerald-500 text-emerald-950 hover:bg-emerald-400 font-bold px-8 py-3">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10 text-base">
              <div>
                <h4 className="font-bold mb-8 text-white text-lg">Platform</h4>
                <ul className="space-y-5 text-emerald-200/80 font-medium">
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Health Score AI</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">USSD Integration</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-8 text-white text-lg">Resources</h4>
                <ul className="space-y-5 text-emerald-200/80 font-medium">
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">API Reference</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Bank Partners</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Support Center</a></li>
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h4 className="font-bold mb-8 text-white text-lg">Legal</h4>
                <ul className="space-y-5 text-emerald-200/80 font-medium">
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Security</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-emerald-800/60 pt-10 flex flex-col md:flex-row justify-between items-center text-base text-emerald-400 gap-6">
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
