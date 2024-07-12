"use client";
 
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { get } from "http";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { useToast } from "./ui/use-toast";


const CallList = ({type}:{type: 'ended' | 'upcoming' | 'recordings'}) => {
    const {callRecordings,isLoading,endedCalls,upcomingCalls} = useGetCalls();
    const router = useRouter();
    const [recordings,setRecordings] = useState<CallRecording[]>([]);

    const {toast} = useToast();

    const getCalls = ()=>{
        switch(type){
            case 'ended':
                return endedCalls;
            case 'upcoming':
                return upcomingCalls;
            case 'recordings':
                return recordings;
            default:
                return [];
        }
    }

    const getNoCallMessages = ()=>{
        switch(type){
            case 'ended':
                return "No previous calls";
            case 'upcoming':
                return "No upcoming calls";
            case 'recordings':
                return "No recordings available";
            default:
                return "";
        }
    }

    useEffect(()=>{
        const fetchRecordings = async ()=>{
            try {
                
                if(callRecordings===undefined|| callRecordings?.length === 0) return;
                const callData = await Promise.all(callRecordings.map((meeting)=> meeting.queryRecordings()));
                const recordings = callData.filter((call)=> call.recordings.length > 0).flatMap((call)=> call.recordings);
                setRecordings(recordings);
            } catch (error) {
                toast({title: "Try again later"})
            }
        }
        if(type === 'recordings'){
            fetchRecordings();
        }
    },[type,callRecordings])
    const calls = getCalls();
    const noCallsMessage = getNoCallMessages();
    if(isLoading) return <Loader/> 
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {calls && calls.length > 0 ? calls.map((meeting : CallRecording | Call)=>{
           return <MeetingCard
            key={(meeting as Call).id}
            icon={type === 'ended' ? '/icons/previous.svg' : type ==='upcoming' ? '/icons/upcoming.svg' : '/icons/recordings.svg'}
            title={(meeting as Call).state?.custom.description.substring(0, 30) || (meeting as CallRecording).filename.substring(0,20) || 'No title'}
            date = {(meeting as Call).state?.startsAt?.toLocaleString() || (meeting as CallRecording).start_time.toLocaleString()}
            isPreviousMeeting = {type === 'ended'}
            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
            buttonText={type === 'recordings' ? 'Play' : 'Start'}
            link={type === 'recordings'? (meeting as CallRecording).url: `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`}
            handleClick={type === 'recordings' ? ()=>router.push(`${(meeting as CallRecording).url}`): ()=>router.push(`/meeting/${(meeting as Call).id}`)}  
            />
        }) : (
            <h1>{noCallsMessage}</h1>
        )}
    </div>
  )
}

export default CallList