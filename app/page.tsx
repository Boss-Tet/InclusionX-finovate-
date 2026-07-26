import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { HeroJoinForm } from '@/components/atoms/HeroJoinForm/HeroJoinForm';
import { 
  Search, Phone, ArrowRight, Play, Camera, ChevronRight, 
  Globe, ShieldCheck, TrendingUp, HandCoins, Users, CreditCard
} from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 min-h-screen font-sans">
      <div className="max-w-[1000px] mx-auto p-3 sm:p-4">
        
        {/* HERO */}
        <section className="relative rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1542884748-2b87b36c6b90?q=80&w=1600&auto=format&fit=crop" 
            alt="African women collaborating" 
            className="w-full h-[560px] sm:h-[620px] object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>

          {/* Nav */}
          <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 sm:px-8 py-5 text-white z-10">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <span className="inline-block w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <HandCoins className="w-5 h-5 text-white" />
              </span>
              VSLA Connect
            </div>
            <div className="hidden md:flex items-center gap-7 text-sm font-medium">
              <Link href="#" className="opacity-90 hover:opacity-100 hover:text-emerald-400 transition-colors">Home</Link>
              <Link href="#features" className="opacity-90 hover:opacity-100 hover:text-emerald-400 transition-colors">Features</Link>
              <Link href="#impact" className="opacity-90 hover:opacity-100 hover:text-emerald-400 transition-colors">Impact</Link>
              <Link href="#faq" className="opacity-90 hover:opacity-100 hover:text-emerald-400 transition-colors">FAQ</Link>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="hidden sm:flex items-center gap-1 opacity-90">
                <Globe className="w-4 h-4" /> ENG ▾
              </span>
              <Link href="/login">
                <Button variant="primary" className="rounded-full bg-emerald-600 hover:bg-emerald-500 border-none shadow-lg">
                  Dashboard Login
                </Button>
              </Link>
            </div>
          </nav>

          {/* Hero content */}
          <div className="absolute left-5 sm:left-8 top-[140px] sm:top-[160px] max-w-lg text-white z-10">
            <span className="inline-block text-xs font-semibold bg-emerald-500/20 border border-emerald-500/30 text-emerald-100 rounded-full px-4 py-1.5 backdrop-blur mb-5">
              Empowering Communities
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-5 tracking-tight">
              Digitize Your Savings, <br/><span className="text-emerald-400">Unlock Formal Finance</span>
            </h1>
            <p className="text-base sm:text-lg opacity-90 mb-8 max-w-md font-light leading-relaxed">
              Whether you are pooling resources or building a health score for bank loans, your financial journey starts here.
            </p>
            <HeroJoinForm />
          </div>

          {/* Explore more */}
          <a href="#features" className="absolute bottom-6 right-6 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium rounded-full px-5 py-3 hover:bg-white/20 transition-all z-10">
            Explore Features <ArrowRight className="w-4 h-4" />
          </a>
        </section>

        {/* OUR SERVICE */}
        <section id="features" className="px-2 sm:px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-semibold border border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400 rounded-full px-3 py-1 mb-5">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-5">
              Savings Made Simple, <br/>Communities Made Stronger
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mb-10 leading-relaxed">
              We provide a tamper-evident ledger and USSD accessibility so every contribution and loan is tracked transparently, bridging the gap to formal finance.
            </p>

            <div className="flex gap-4">
              <div className="relative w-1/2 rounded-2xl overflow-hidden shadow-md group">
                <span className="absolute top-2 left-2 text-xs text-white z-10 font-bold bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">/01 Transparency</span>
                <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=500&auto=format&fit=crop" className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Handing money" />
              </div>
              <div className="relative w-1/2 rounded-2xl overflow-hidden shadow-md group">
                <span className="absolute top-2 left-2 text-xs text-white z-10 font-bold bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">/02 Accessible</span>
                <img src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=500&auto=format&fit=crop" className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-700" alt="People meeting" />
              </div>
            </div>
            <div className="relative mt-4 w-full rounded-2xl overflow-hidden shadow-md group">
              <span className="absolute top-2 left-2 text-xs text-white z-10 font-bold bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">/03 Bank Integrated</span>
              <img src="https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?q=80&w=800&auto=format&fit=crop" className="h-32 w-full object-cover group-hover:scale-105 transition-transform duration-700" alt="African smiling" />
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden h-[500px] shadow-xl">
            <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Community working" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-2xl">
              <h3 className="font-bold text-lg mb-2 text-emerald-600 dark:text-emerald-400">Disputes? Not on Our Watch!</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5 leading-relaxed">
                Say goodbye to paper ledger headaches. We record every transaction immutably, generate health scores, and even send SMS receipts instantly.
              </p>
              <div className="flex items-center justify-between">
                <Button variant="ghost" className="p-0 text-zinc-900 dark:text-white hover:bg-transparent hover:text-emerald-600 dark:hover:text-emerald-400" rightIcon={<ArrowRight className="w-4 h-4"/>}>
                  Read the docs
                </Button>
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                  <span className="cursor-pointer hover:text-emerald-500">&lt;</span>
                  <span className="text-emerald-600 dark:text-emerald-400">1/3</span>
                  <span className="cursor-pointer hover:text-emerald-500">&gt;</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OUR IMPACT */}
        <section id="impact" className="px-2 sm:px-4 py-20 bg-emerald-50/50 dark:bg-emerald-950/10 rounded-3xl my-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 px-4">
            <div>
              <span className="inline-block text-xs font-semibold border border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400 rounded-full px-3 py-1 mb-4">
                Real Impact
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                Success Stories You'll <br/>Never Stop Talking About
              </h2>
            </div>
            <div className="max-w-sm">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">
                From micro-loans to starting small businesses, see how digital VSLA groups are transforming communities.
              </p>
              <Link href="/register">
                <Button variant="primary" className="rounded-full bg-emerald-600 shadow-md">
                  Create Your Group <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 px-4">
            {/* Card 1 */}
            <div className="relative rounded-3xl overflow-hidden h-80 group shadow-lg">
              <img src="https://images.unsplash.com/photo-1526958097901-5e6d742d3371?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Agriculture" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              <span className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <TrendingUp className="w-5 h-5" />
              </span>
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="font-bold text-lg mb-2">Agricultural Expansion</h3>
                <p className="text-xs opacity-90 mb-4 leading-relaxed">The Chigwirizano group used their formal health score to secure a bank loan for fertilizer.</p>
                <div className="flex gap-2">
                  <span className="text-[10px] font-semibold bg-white/20 border border-white/30 rounded-full px-2.5 py-1 backdrop-blur-sm">Farming</span>
                  <span className="text-[10px] font-semibold bg-white/20 border border-white/30 rounded-full px-2.5 py-1 backdrop-blur-sm">Credit</span>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="relative rounded-3xl overflow-hidden h-80 group shadow-lg">
              <img src="https://images.unsplash.com/photo-1511871893393-82e9c16b81e3?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Market" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              <span className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="font-bold text-lg mb-2">Market Trader Security</h3>
                <p className="text-xs opacity-90 mb-4 leading-relaxed">No more stolen lockboxes. All funds are digitized via Mobile Money integration safely.</p>
                <div className="flex gap-2">
                  <span className="text-[10px] font-semibold bg-white/20 border border-white/30 rounded-full px-2.5 py-1 backdrop-blur-sm">Security</span>
                  <span className="text-[10px] font-semibold bg-white/20 border border-white/30 rounded-full px-2.5 py-1 backdrop-blur-sm">USSD</span>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="relative rounded-3xl overflow-hidden h-80 group shadow-lg">
              <img src="https://images.unsplash.com/photo-1533022137081-30eb305c0d64?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Small business" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              <span className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Users className="w-5 h-5" />
              </span>
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="font-bold text-lg mb-2">Women's Entrepreneurship</h3>
                <p className="text-xs opacity-90 mb-4 leading-relaxed">Internal loans are voted on via SMS, allowing rapid capital deployment for new stalls.</p>
                <div className="flex gap-2">
                  <span className="text-[10px] font-semibold bg-white/20 border border-white/30 rounded-full px-2.5 py-1 backdrop-blur-sm">Business</span>
                  <span className="text-[10px] font-semibold bg-white/20 border border-white/30 rounded-full px-2.5 py-1 backdrop-blur-sm">Empowerment</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="px-2 sm:px-4 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-block text-xs font-semibold border border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400 rounded-full px-3 py-1 mb-4">
                Platform FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                Everything You Need to <br/>Know, All in One Place
              </h2>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
              We know transitioning from paper to digital comes with questions. Here is how we ensure your group's money is safe and accessible.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { id: '01', q: 'How do members without smartphones use this?', a: "Through our Africa's Talking USSD integration. Dial *384*VSLA# to check balances, request loans, and vote on withdrawals." },
              { id: '02', q: 'What is the Group Health Score?', a: "An AI-calculated metric (0-1000) based on on-time repayments, meeting attendance, and savings consistency to prove creditworthiness to banks." },
              { id: '03', q: 'How is the ledger tamper-evident?', a: "Every transaction (contribution, loan, payout) is cryptographically hashed with the previous entry. Deleting or altering past records breaks the chain." },
              { id: '04', q: 'How do we deposit money?', a: "We integrate with PayChangu. Members can send funds via Mobile Money or card, and it automatically reflects in the group's digital ledger." },
              { id: '05', q: 'Who controls the funds?', a: "The group does. Withdrawals require multi-signature approval (voting) by the Chairperson, Treasurer, and members before payout is authorized." },
              { id: '06', q: 'Is there a fee to use VSLA Connect?', a: "Basic ledger management is free. Premium features like automated bank reporting and advanced AI analytics have a small monthly subscription." },
            ].map((faq) => (
              <div key={faq.id} className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-xs font-mono text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">/{faq.id}</span>
                <h3 className="font-bold text-base mt-4 mb-3 text-zinc-900 dark:text-white">{faq.q}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="px-2 sm:px-4 py-10">
          <div className="relative rounded-3xl overflow-hidden h-[400px] flex items-center justify-center text-center shadow-2xl">
            <img src="https://images.unsplash.com/photo-1542884748-2b87b36c6b90?q=80&w=1600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="African women community" />
            <div className="absolute inset-0 bg-emerald-900/80 backdrop-blur-[2px]"></div>
            <div className="relative text-white max-w-xl px-6">
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">Ready to Elevate <br/>Your Savings Group?</h2>
              <p className="text-base opacity-90 mb-10 font-light">
                Join thousands of Malawians stepping into the formal financial sector while keeping the community spirit alive.
              </p>
              <Link href="/register">
                <Button variant="primary" size="lg" className="rounded-full bg-white text-emerald-900 hover:bg-emerald-50 font-bold px-8 shadow-xl">
                  Get Started for Free <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-zinc-950 text-zinc-300 rounded-3xl p-10 sm:p-14 mt-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row justify-between gap-12">
            <div className="max-w-sm">
              <div className="flex items-center gap-2 font-bold text-2xl text-white mb-6">
                <HandCoins className="w-6 h-6 text-emerald-500" />
                VSLA Connect
              </div>
              <h3 className="text-xl leading-relaxed mb-8 text-zinc-400">
                Empowering communities through transparent, digital financial tools.
              </h3>
              <Input 
                placeholder="Subscribe to newsletter" 
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 rounded-full"
                rightIcon={<ArrowRight className="w-4 h-4 text-emerald-500" />}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
              <div>
                <h4 className="font-bold mb-5 text-white tracking-wide">Platform</h4>
                <ul className="space-y-3 text-zinc-400">
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">Features</li>
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">Health Score AI</li>
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">USSD Integration</li>
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">Pricing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-5 text-white tracking-wide">Resources</h4>
                <ul className="space-y-3 text-zinc-400">
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">Documentation</li>
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">API Reference</li>
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">Bank Partners</li>
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">Support</li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h4 className="font-bold mb-5 text-white tracking-wide">Legal</h4>
                <ul className="space-y-3 text-zinc-400">
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">Terms of Service</li>
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">Privacy Policy</li>
                  <li className="hover:text-emerald-400 cursor-pointer transition-colors">Security</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800/80 mt-14 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500 gap-4">
            <span>© {new Date().getFullYear()} VSLA Connect. Built for FINOVATE 2026.</span>
            <div className="flex gap-2">
              <span className="bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Bank Grade Security
              </span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
