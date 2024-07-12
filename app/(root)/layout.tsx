import StreamVideoProvider from "@/providers/StreamClientProvider"
import { StreamVideo } from "@stream-io/video-react-sdk"
import { ReactNode } from "react"
const Rootlayout = ({children}:{children: ReactNode}) => {
  return (
    
      <main>
        <StreamVideoProvider>


        {children}
        </StreamVideoProvider>
        </main>
  )
}

export default Rootlayout