import { cn } from "@/lib/utils";
import Image from "next/image"

  

interface HomeCardProps {
    title: string;
    description: string;
    icon: string;
    handleClick: () => void;
    className: string;
}

const HomeCard = ({title , description , icon , handleClick , className}: HomeCardProps) => {
  return (
    <div className={cn("bg-orange-500 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-lg cursor-pointer",className)} onClick={handleClick}>
    <div className="flex justify-center items-center glassmorphism size-12 rounded-md">
        <Image src={icon} width={25} height={25} alt='Add Meeting' />
    </div>
    <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-lg">{title}</h1>
        <p className="font-normal">{description}</p>
    </div>
</div>
  )
}

export default HomeCard