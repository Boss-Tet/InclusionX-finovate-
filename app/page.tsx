import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black text-zinc-900 dark:text-zinc-50">
      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-24 sm:px-12">
        <div className="max-w-4xl text-center space-y-8">
          <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 ring-1 ring-inset ring-emerald-500/20 mb-4">
            InclusionX · FINOVATE 2026
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-6 bg-gradient-to-r from-emerald-600 to-teal-400 bg-clip-text text-transparent">
            VSLA Connect
          </h1>
          
          <p className="text-lg sm:text-2xl leading-relaxed text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
            Digitizing Village Savings and Loan Associations across Malawi. 
            A tamper-evident ledger, USSD accessibility, and AI-driven Group Health Scores for formal credit assessment.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 text-lg font-semibold rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Sign In to Dashboard
            </Link>
            <Link
              href="/api-docs"
              className="w-full sm:w-auto px-8 py-4 text-lg font-semibold rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all shadow-sm"
            >
              Explore API Docs
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl text-left">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <h3 className="text-xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">Tamper-Evident Ledger</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              All contributions, loans, and withdrawals are permanently recorded. Say goodbye to lost or disputed paper records.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <h3 className="text-xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">USSD & SMS Ready</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              No smartphone? No problem. Members can check balances, request loans, and vote via feature phones.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <h3 className="text-xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">Bank Integration</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              An algorithmic Health Score proves creditworthiness to National Banks, bridging the gap to formal finance.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-zinc-500 dark:text-zinc-400 text-sm border-t border-zinc-200 dark:border-zinc-800">
        <p>Built with ❤️ by Team InclusionX for Malawi.</p>
        <p className="mt-2">Orama • Yamikani • Jabari • Kilotet • Arthony</p>
      </footer>
    </div>
  );
}
