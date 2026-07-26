"use client";
import { BankerProfileTemplate } from "@/components/templates/BankerProfileTemplate/BankerProfileTemplate";
import { useProfile } from "@/hooks/useProfile";

export default function ProfilePage() {
  const { profile, isLoading } = useProfile();

  if (isLoading || !profile) {
    return <div className="p-8 flex justify-center"><div className="w-8 h-8 border-4 border-[#2F6FED] border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return <BankerProfileTemplate profile={profile} />;
}
