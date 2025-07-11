import LinkBox from "./ui/linkBox";
import { Button } from "./ui/Button";
import Menu from "./ui/Menu";

export default function HomePage() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Preschool menu
        </h1>
        <Button />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">

          <Menu />
        </div>
      </div>
    </main>
  );
}
