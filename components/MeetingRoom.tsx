import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantListing,
  CallParticipantListingItem,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import { getServerActionDispatcher } from "next/dist/client/components/app-router";
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
    const searchParams = useSearchParams();
    const isPresonalRoom = !!searchParams.get("personal")
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState<boolean>(false);
  const router = useRouter();
  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="right" />;
      default:
        return <SpeakerLayout participantsBarPosition="left" />;
    }
  };
  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full items-center max-w-[1000px]">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 w-full flex items-center justify-center gap-5 flex-wrap">
        <CallControls onLeave={() => router.push('/')}></CallControls>
        <DropdownMenu>
            <div className="flex items-center">

          <DropdownMenuTrigger className="cursor-pointer rounded-2xl px-4 py-2 bg-[#19232d] hover:bg-[#4c535b]">
            <LayoutList size={20} className="text-white"/>
          </DropdownMenuTrigger>
            </div>
          <DropdownMenuContent className="border border-dark-1 bg-dark-1 text-white">
            {["Grid", "Speaker Left", "Speaker Right"].map((item,index) => (
                <div key={index}>
                <DropdownMenuItem className="cursor-pointer" onClick={()=>{
                    setLayout(item.toLowerCase() as CallLayoutType)
                }}>{item}</DropdownMenuItem>
            <DropdownMenuSeparator className="border border-dark-1" />
                </div>
            ))}

          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={()=> (setShowParticipants((prev)=>!prev))}>
            <div className="cursor-pointer rounded-2xl px-4 py-2 bg-[#19232d] hover:bg-[#4c535b]">
                <Users size={20} className="text-white"/>
            </div>
        </button>
        {!isPresonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
