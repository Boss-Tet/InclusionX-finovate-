import React from "react";
import { MemberDashboardTemplate } from "@/components/templates/MemberDashboardTemplate/MemberDashboardTemplate";

export const metadata = {
  title: "Member Dashboard | VSLA Connect",
  description: "Group member dashboard for savings, contributions, and loans",
};

export default function MemberDashboardPage() {
  return <MemberDashboardTemplate />;
}
