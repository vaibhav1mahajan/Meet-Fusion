"use client";

import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import { Video } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({setIsSetupComplete}:{setIsSetupComplete : (value:boolean)=> void}) => {
    const [isMicCamToogleOn, setIsMicCamToogleOn] = useState(false)
    const call = useCall();

    if(!call){
        throw new Error('Call not found');
    }
    useEffect(() => {
        if(isMicCamToogleOn){
            call?.camera?.disable();
            call?.microphone?.disable();
        } else{
            call?.camera?.enable();
            call?.microphone?.enable();
        }
    }, [isMicCamToogleOn,call?.camera,call?.microphone])
  return (
    <div className='flex h-screen w-full flex-col gap-3 justify-center items-center text-white'>
        <h1 className='text-2xl font-bold'>Setup</h1>
        <div className='w-72 sm:w-96'>

        <VideoPreview />
        </div>
        <div className='flex h-16 items-center justify-center gap-3'>
            <label className='flex items-center justify-center gap-2 font-medium'>
                <input type="checkbox" checked={isMicCamToogleOn} onChange={(e)=>setIsMicCamToogleOn(e.target.checked)} />
                Join with Mic and Camera off
            </label>
            <DeviceSettings />
        </div>
        <Button className='rounded-md bg-green-500 px-4 py-2.5 hover:bg-green-700' onClick={()=> {
            call.join();
            setIsSetupComplete(true);
        }}>
            Join Meeting
        </Button>
    </div> 
  )
}

export default MeetingSetup