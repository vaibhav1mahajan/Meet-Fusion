import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { ReactNode } from "react"
const Homelayout = ({children}:{children: ReactNode}) => {
  return (
    
      <main className="relative">
        <Navbar></Navbar>
        <div className="flex">
        <Sidebar></Sidebar>
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
            <div>

            {children}
            </div>
        </section>
        </div>
      </main>
  )
}

export default Homelayout