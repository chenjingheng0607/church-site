export default function OurTheme() {
  return (
    <section className="relative w-full py-16 bg-cover bg-center" style={{ backgroundImage: "url('/theme.jpg')" }}>
      <div className="absolute inset-0 bg-black/75"></div>
      <div className="relative z-10 w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <video controls className="w-full rounded-lg aspect-video object-cover bg-black">
            <source src="/about-teaser.mp4" type="video/mp4" />
          </video>
          <p className="text-xl mt-3 text-white">This is our home</p>
          <p className="text-sm text-white">Pastor Elson continues our series through Gospel of Luke</p>
        </div>
        <div className="pl-0 lg:pl-4 self-center">
          <h2 className="text-4xl font-bold text-white/90 mb-4">Mega Subang 2025 Theme</h2>
          <p className="text-lg text-white/90 mb-6">This is our home - We believe church is not only a place you go, but a family you belong to. This is our home, and you are part of it.</p>
          <a href="/about" className="inline-block bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-black/90 transition-colors">Know us more</a>
        </div>
      </div>
    </section>
  );
}


