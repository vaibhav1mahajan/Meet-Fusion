"use client";

import Image from "next/image";
import HomeCard from "./HomeCard";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { link } from "fs";
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import ReactDatePicker from "react-datepicker";
import { Input } from "@/components/ui/input"


const MeetingTypeList = () => {
    const {toast} = useToast();
    const [meetingState,setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
    const router = useRouter();
    const {user} = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: '',
    });
    const [callDetails, setCallDetails] = useState<Call>();
    const createMeeting = async () => {
        if(!user || !client) return;
        try {
            if(!values.dateTime){
                toast({
                    title: "Please select a date and time",
                  })
                  return ;
            } 
            const id = crypto.randomUUID();
            const call = client.call('default',id);
            if(!call) throw new Error('Failed to create call');

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant Meeting';
            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            }) 
            setCallDetails(call);
            if(!values.description){
                router.push(`/meeting/${call.id}`);
            }
            toast({
                title: "Meeting Created",
              })
        } catch (error) {
            toast({
                title: "Failed to create meeting",
              })            
        }
    }
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
       <HomeCard
        title="New Meeting"
        description="Start an instant meeting"
        icon="/icons/add-meeting.svg"
        handleClick={() => setMeetingState('isInstantMeeting')}
        className = 'bg-orange-500'
       ></HomeCard>
             <HomeCard
        title="Schedule Meeting"
        description="Plan your meeting"
        icon="/icons/schedule.svg"
        handleClick={() => setMeetingState('isScheduleMeeting')}
        className = 'bg-blue-500'
       ></HomeCard>
             <HomeCard
        title="View Recordings"
        description="Check out your recordings"
        icon="/icons/recordings.svg"
        handleClick={() => {router.push('/recordings')}}
        className = 'bg-purple-500'
       ></HomeCard>
             <HomeCard
        title="Join Meeting"
        description="via invite link or code"
        icon="/icons/join-meeting.svg"
        handleClick={() => setMeetingState('isJoiningMeeting')}
        className = 'bg-yellow-500'
       ></HomeCard>
       {!callDetails ? (
        <MeetingModal 
        isOpen = {meetingState === 'isScheduleMeeting'}
        onClose = {() => setMeetingState(undefined)}
        title = 'Create Meeting'
        handleClick ={createMeeting}
       >
         <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-200">Add a description</label>
            <Textarea className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0" onChange={(e)=>{
                setValues({...values,description:e.target.value})
            }} />
        </div>
        <div className="flex flex-col w-full gap-2.5">
        <label className="text-base text-normal leading-[22px] text-sky-200">Select Date and Time</label>
        <ReactDatePicker
        selected={values.dateTime}
        onChange={(date)=>{setValues({...values,dateTime:date!})}} 
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
        className="w-full rounded-lg bg-dark-2 focus:outline-none py-2 px-2"/>
        </div>
       </MeetingModal>  
       ) : (
        <MeetingModal 
        isOpen = {meetingState === 'isScheduleMeeting'}
        onClose = {() => setMeetingState(undefined)}
        title = 'Meeting Created'
        className = 'text-center'
        buttonText = 'Copy Link'
        handleClick ={()=>{
            navigator.clipboard.writeText(meetingLink)
            toast({title: 'Link copied to clipboard'})
        }}
        image = "/icons/checked.svg"
        buttonIcon="/icons/copy.svg"
       >
       
       </MeetingModal>
       )}
       <MeetingModal 
        isOpen = {meetingState === 'isInstantMeeting'}
        onClose = {() => setMeetingState(undefined)}
        title = 'New Meeting'
        className = 'text-center'
        buttonText = 'Start Meeting'
        handleClick ={createMeeting}
       />
       <MeetingModal 
        isOpen = {meetingState === 'isJoiningMeeting'}
        onClose = {() => setMeetingState(undefined)}
        title = 'Type the link here'
        className = 'text-center'
        buttonText = 'Join Meeting'
        handleClick ={()=>router.push(values.link)}
       >
        <Input placeholder="Meeting Link"
        className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
        onChange={(e)=>{setValues({...values,link:e.target.value})}}
        />
       </MeetingModal>
    </section>
  )
}

export default MeetingTypeList