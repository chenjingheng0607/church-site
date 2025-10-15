import Services from "./components/Services";
import OurTheme from "./components/OurTheme";
import PastorMessage from "./components/PastorMessage";
import PrayerBoard from "./components/PrayerBoard";

export default function Home() {
  return (
    <div className="font-sans min-h-full">
      <section className="relative min-h-screen w-full bg-[url('/homepage_1.jpg')] bg-cover bg-center bg-no-repeat flex items-center">
        <div className="absolute inset-0 bg-black/75"></div>
        <div className="relative z-10 text-white ml-8 sm:ml-40 mt-20">
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold mb-4">Welcome Home!</h1>
            <p className="text-3xl mb-2">Your church for the whole family — where every generation belongs.</p>
            <p className="text-sm mb-8">Worship, grow, and belong together in Christ.</p>
            <div className="flex flex-col gap-4">
              <a href="/visit" className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-all text-center w-full">
                Plan Your Visit
              </a>
              <a href="/watch" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white/10 transition-all text-center w-full">
                Get Involved
              </a>
            </div>
          </div>
        </div>
      </section>
      <main>
        <Services />
        {/* New section below */}
        <OurTheme />
        <PastorMessage />
        <PrayerBoard />
      </main>
    </div>
  );
}
