import { ButtonScrape } from "./ui/ButtonScrape";
import CafeteriaMenu from "./ui/cafeteria-menu";
import RadarWidget from "./ui/RadarWidget";
import WeatherWidget from "./ui/WeatherWidget";

export default function HomePage() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-2 px-4">
        {/* <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Preschool menu
        </h1> */}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 py-8">
          <WeatherWidget />
          <RadarWidget />
          <CafeteriaMenu />

        </div>
        <ButtonScrape />

      </div>
    </main >
  );
}
