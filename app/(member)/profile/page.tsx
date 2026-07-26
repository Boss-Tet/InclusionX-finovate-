import React from "react";
import { MemberProfileTemplate } from "@/components/templates/MemberProfileTemplate/MemberProfileTemplate";

export const metadata = {
  title: "Profile | VSLA Connect",
  description: "User profile and personal settings",
};

export default function ProfilePage() {
  return <MemberProfileTemplate />;
}
