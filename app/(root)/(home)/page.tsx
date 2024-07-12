import MeetingTypeList from "@/components/MeetingTypeList";


const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true });
  const date = (new Intl.DateTimeFormat('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(now));
  
  return (
   <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-lg bg-hero bg-cover">
        <div className="flex flex-col h-full justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded-lg text-center text-base py-2 font-normal">Upcoming meeting</h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">
              {time}
            </h1>
            <p className="text-lg font-medium text-sky-300 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
   </section>
  )
}

export default Home