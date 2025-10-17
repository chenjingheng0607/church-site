"use client";

import Image from "next/image";
import { useState } from "react";

export default function PastorMessage() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative w-full py-32" style={{ backgroundColor: "#1F2E41" }}>
      <div className="w-[80%] mx-auto">
        <header className="text-left mb-10 pl-4">
          <h2 className="text-4xl font-bold mb-3 text-white">A Word from Our Pastor</h2>
          <p className="text-lg text-white max-w-3xl">
          Welcome to Mega Subang Methodist Church!
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start px-4">
          <figure className="w-full overflow-hidden rounded-lg bg-[#F8F4EA] shadow">
            {imageError ? (
              <div className="aspect-[4/3] grid place-items-center text-gray-500 text-sm">
                Pastor image not available
              </div>
            ) : (
              <Image
                src="/pastor.png"
                alt="Pastor portrait"
                width={960}
                height={720}
                sizes="(max-width: 768px) 75vw, 33vw"
                className="w-3/4 md:w-2/3 lg:w-1/2 h-auto object-cover mx-auto"
                onError={() => setImageError(true)}
                priority={false}
              />
            )}
          </figure>

          <article className="p-6 md:p-8 self-center">
            <h3 className="text-4xl font-semibold mb-2">Pastor Elson Chou</h3>
            <p className="text-white mb-6">
            Rev. Elson Chou has been faithfully serving in ministry for over 18 years. With a heart for families and discipleship, he believes in raising up strong generations of believers who love God and serve their communities. He is passionate about preaching the Word of God with clarity and compassion.
            </p>
            <div className="border-t border-gray-200 pt-6">
              <p className="text-white italic leading-relaxed">
                “Dear Church Family, remember that no matter what challenges you face, God is always with you. Lean on His promises and you will find peace beyond understanding. Keep walking in faith — He will never fail you.”
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}


