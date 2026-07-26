import React from "react";
import { MemberLoansTemplate } from "@/components/templates/MemberLoansTemplate/MemberLoansTemplate";

export const metadata = {
  title: "Loans | VSLA Connect",
  description: "Request and track VSLA group loans and repayments",
};

export default function LoansPage() {
  return <MemberLoansTemplate />;
}
