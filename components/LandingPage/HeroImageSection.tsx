import Image from "next/image";
import HeroName from "../ui/HeroName";

function HeroImageSection() {
  return (
    <div className="relative mb-8 h-fit w-full md:px-4 animate-fade-in-up flex">

      {/* Profile Image */}
    
        <div className="relative p-[2px] border border-dashed dark:border-white/30 border-black/20 rounded-[16px] w-fit">
          <div className="relative md:size-32 size-28 rounded-[12px] overflow-hidden bg-blue-300  transition-all duration-300 group-hover:scale-105">

            <Image
              className="
    object-cover h-full w-full relative z-10
    scale-[1.2] translate-y-2.5 translate-x-1
hover:scale-110 
    transition-all duration-300 ease-in-out
  "
              src={"/taqui-removebg-preview.png"}
              loading="lazy"
              fill
              placeholder="blur"
              blurDataURL={
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAPUlEQVR4nGNgYGBgSPd1yJxaGZ8LYoPBz51Tt/z/cGgpjM/TmBFzd35jAURAXFxcxdnZcYe7u/t0BgYGZgBY6BFDJ12G1gAAAABJRU5ErkJggg=="
              }
              alt="Taqui Imam"
            />

          </div>
       
      </div>
            <HeroName />
    </div>
  );
}

export default HeroImageSection;
