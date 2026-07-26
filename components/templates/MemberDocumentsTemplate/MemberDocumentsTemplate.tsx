"use client";
import React, { useState } from "react";
import { MemberSidebar } from "@/components/organisms/MemberSidebar/MemberSidebar";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Button } from "@/components/atoms/Button/Button";

type DocCategory = "all" | "minutes" | "ledger" | "loan" | "reports";

const docs = [
  { name: "May 2025 Meeting Minutes",   date: "26 May 2025",  type: "minutes", size: "245 KB" },
  { name: "Q1 2025 Financial Ledger",   date: "31 Mar 2025",  type: "ledger",  size: "1.2 MB" },
  { name: "Loan Agreement — LN-001",    date: "10 Feb 2025",  type: "loan",    size: "89 KB" },
  { name: "April 2025 Meeting Minutes", date: "28 Apr 2025",  type: "minutes", size: "213 KB" },
  { name: "Annual Report 2024",         date: "15 Jan 2025",  type: "reports", size: "3.4 MB" },
  { name: "Q2 2025 Financial Ledger",   date: "30 Jun 2025",  type: "ledger",  size: "1.1 MB" },
  { name: "Loan Agreement — LN-002",    date: "5 May 2025",   type: "loan",    size: "91 KB" },
];

const typeColor: Record<string, "green" | "blue" | "purple" | "orange"> = {
  minutes: "green",
  ledger:  "blue",
  loan:    "orange",
  reports: "purple",
};

export const MemberDocumentsTemplate: React.FC = () => {
  const [category, setCategory] = useState<DocCategory>("all");
  const categories: { key: DocCategory; label: string }[] = [
    { key: "all",     label: "All" },
    { key: "minutes", label: "Minutes" },
    { key: "ledger",  label: "Ledger" },
    { key: "loan",    label: "Loan Docs" },
    { key: "reports", label: "Reports" },
  ];
  const filtered = category === "all" ? docs : docs.filter(d => d.type === category);

  return (
    <div className="min-h-screen bg-[#F1F4F2] font-sans antialiased flex flex-col md:flex-row">
      <div className="hidden md:block"><MemberSidebar activePath="/documents" /></div>
      <div className="flex-1 min-w-0 flex flex-col pb-12">

        <header className="bg-white/90 backdrop-blur-md sticky top-0 z-20 border-b border-[#E9EDEA] px-7 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-[19px] font-extrabold text-[#1B2321]">Documents</h1>
            <p className="text-[12.5px] text-[#5B6B65] mt-0.5">Group records, minutes & financial documents</p>
          </div>
          <Button theme="green" leftIcon={<Icon name="arrow-down-circle" className="w-4 h-4" />}>Upload Document</Button>
        </header>

        <main className="p-4 md:p-7 flex flex-col gap-5">

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                className={`px-4 py-1.5 rounded-full text-[12.5px] font-bold border transition-all ${category === c.key ? "bg-[#2D7A52] text-white border-[#2D7A52]" : "bg-white text-[#5B6B65] border-[#E9EDEA] hover:border-[#2D7A52]/40"}`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Document list */}
          <div className="bg-white rounded-[18px] shadow-[0_2px_10px_rgba(18,58,41,0.04)] border border-[#E9EDEA] overflow-hidden">
            {filtered.map((doc, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-[#F1F4F2] last:border-0 hover:bg-[#F7F9F8] transition-colors group">
                <div className="w-10 h-10 rounded-[12px] bg-[#E3F3EA] text-[#2D7A52] flex items-center justify-center shrink-0">
                  <Icon name="doc" className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13.5px] font-bold text-[#1B2321] truncate">{doc.name}</div>
                  <div className="text-[11.5px] text-[#94A29C] mt-0.5">{doc.date} · {doc.size}</div>
                </div>
                <Badge variant={typeColor[doc.type]} size="sm">{doc.type}</Badge>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-[#2D7A52] hover:text-[#1B5E3F] ml-1 p-1">
                  <Icon name="arrow-down-circle" className="w-4.5 h-4.5" />
                </button>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="px-5 py-12 text-center text-[#94A29C] text-[13px] font-medium">No documents found in this category.</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
