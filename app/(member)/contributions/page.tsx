import React from "react";
import { MemberContributionsTemplate } from "@/components/templates/MemberContributionsTemplate/MemberContributionsTemplate";

export const metadata = {
  title: "Contributions | VSLA Connect",
  description: "View and manage VSLA group contributions",
};

export default function ContributionsPage() {
  return <MemberContributionsTemplate />;
}
