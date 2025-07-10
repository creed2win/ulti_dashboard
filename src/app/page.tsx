import LinkBox from "./ui/linkBox";
import { Button } from "./ui/Button";

export default function HomePage() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <LinkBox heading="First steps ->" link="https://www.google.com" text="Getting started with next.js in web application \n new line" />
          <LinkBox heading="Documentation ->" link="https://www.seznam.cz" text="Learn more about Create T3 App, the libraries it uses, and how to deploy it." />
          <Button />
        </div>
      </div>
    </main>
  );
}
