import React from "react";
import { MemberWithdrawalsTemplate } from "@/components/templates/MemberWithdrawalsTemplate/MemberWithdrawalsTemplate";

export const metadata = {
  title: "Withdrawals | VSLA Connect",
  description: "Request payouts and vote on group withdrawals",
};

export default function WithdrawalsPage() {
  return <MemberWithdrawalsTemplate />;
}
