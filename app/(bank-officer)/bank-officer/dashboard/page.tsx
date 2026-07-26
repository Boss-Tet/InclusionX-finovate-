import React from "react";
import { BankerDashboardTemplate } from "@/components/templates/BankerDashboardTemplate/BankerDashboardTemplate";

export const metadata = {
  title: "Bank Officer Dashboard | VSLA Connect",
  description: "Bank officer dashboard for managing VSLA group portfolios, deposits, and credit approvals",
};

export default function BankerDashboardPage() {
  return <BankerDashboardTemplate />;
}
