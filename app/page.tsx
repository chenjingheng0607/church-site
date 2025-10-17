import Welcome from "./components/Welcome";
import Services from "./components/Services";
import OurTheme from "./components/OurTheme";
import PastorMessage from "./components/PastorMessage";
import PrayerBoard from "./components/PrayerBoard";
import Calendar from "./components/Calendar";

export default function Home() {
  return (
    <div className="font-sans min-h-full">
      <main>
        <Welcome />
        <Services />
        <OurTheme />
        <PastorMessage />
        <PrayerBoard />
        <Calendar />
      </main>
    </div>
  );
}
