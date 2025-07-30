import { Button } from "~/components/ui/button";
import { ButtonScrape } from "./ui/ButtonScrape";
import CafeteriaMenu from "./ui/cafeteria-menu";
import Dashboard from "./ui/dashboard";
import RadarWidget from "./ui/RadarWidget";
import WeatherWidget from "./ui/WeatherWidget";

export default function HomePage() {

  return (
    <main className="min-h-screene items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {/* <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Preschool menu
        </h1> */}

      <Dashboard>
        <WeatherWidget id="Predpoved" />
        <RadarWidget id="Radar" />
        <CafeteriaMenu id="Jidelnicek" />
      </Dashboard>
    </main >
  );
}
