import React from "react";
import { Icon } from "@/components/atoms/Icon/Icon";

export interface NextMeetingCardProps {
  date: string;
  onAgendaClick?: () => void;
}

export const NextMeetingCard: React.FC<NextMeetingCardProps> = ({
  date = "Sunday, 1 June 2025 · 2:00 PM",
  onAgendaClick,
}) => {
  return (
    <div className="bg-gradient-to-br from-[#1B5E3F] to-[#123A29] text-white rounded-[16px] p-5 flex flex-col justify-center gap-2.5">
      <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#BFE1CC]">
        <Icon name="calendar" className="w-3.5 h-3.5" />
        <span>Next Meeting</span>
      </div>
      <div className="text-[15px] font-extrabold">{date}</div>
      <button
        onClick={onAgendaClick}
        className="self-start bg-white text-[#1B5E3F] border-none rounded-[8px] px-3.5 py-1.5 text-[12px] font-bold transition-opacity hover:opacity-90 mt-1"
      >
        View Agenda
      </button>
    </div>
  );
};
