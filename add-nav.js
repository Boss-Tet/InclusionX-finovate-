const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'components', 'templates');
const templates = [
  'MemberLoansTemplate/MemberLoansTemplate.tsx',
  'MemberContributionsTemplate/MemberContributionsTemplate.tsx',
  'MemberMyGroupTemplate/MemberMyGroupTemplate.tsx',
  'MemberSavingsGoalTemplate/MemberSavingsGoalTemplate.tsx',
  'MemberMessagesTemplate/MemberMessagesTemplate.tsx',
  'MemberDocumentsTemplate/MemberDocumentsTemplate.tsx'
];

const bottomNav = `
      {/* ===== MOBILE BOTTOM NAV ===== */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#EBEFED] h-[82px] flex items-start justify-around pt-2.5 z-30 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors active:scale-90 text-[#94A29C]">
          <Icon name="grid" className="w-[21px] h-[21px]" /> Home
        </Link>
        <Link href="/savings-goal" className="flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors active:scale-90 text-[#94A29C]">
          <Icon name="layers" className="w-[21px] h-[21px]" /> Savings
        </Link>
        <Link href="/contributions" className="-mt-[30px] w-[54px] h-[54px] rounded-full bg-gradient-to-tr from-[#123A29] to-[#2D7A52] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(45,122,82,0.45)] border-4 border-white active:scale-90 transition-transform">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
        </Link>
        <Link href="/loans" className="flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors active:scale-90 text-[#94A29C]">
          <Icon name="wallet" className="w-[21px] h-[21px]" /> Loans
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors active:scale-90 text-[#94A29C]">
          <Icon name="user" className="w-[21px] h-[21px]" /> Profile
        </Link>
      </nav>
`;

templates.forEach(t => {
  const filePath = path.join(templatesDir, t);
  if (!fs.existsSync(filePath)) {
    console.log('Skipping', filePath);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('import Link from "next/link"')) {
    content = content.replace('import React', 'import Link from "next/link";\nimport React');
  }

  if (content.includes('MOBILE BOTTOM NAV')) {
    console.log('Already has nav', filePath);
    return;
  }

  // Find the last </div>
  const lastDivIndex = content.lastIndexOf('</div>');
  if (lastDivIndex !== -1) {
    content = content.slice(0, lastDivIndex) + bottomNav + content.slice(lastDivIndex);
    fs.writeFileSync(filePath, content);
    console.log('Updated', filePath);
  }
});
