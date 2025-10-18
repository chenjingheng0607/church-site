"use client";

import Image from "next/image";
import { useState } from "react";

export default function PastorMessage() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative w-full py-32" style={{ backgroundColor: "#1F2E41" }}>
      <div className="w-[80%] mx-auto">
        <header className="text-left mb-10 pl-4">
          <h2 className="text-4xl font-bold mb-3 text-[#FF7800]">A Word from Our Pastor</h2>
          <p className="text-lg text-white max-w-3xl">
          Welcome to Mega Subang Methodist Church!
          </p>
        </header>

        {/* 1. Use items-stretch to make both columns equal height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch px-4">
          
          {/* 2. Remove aspect-[4/3] to allow the figure to stretch vertically */}
          <figure className="relative w-full overflow-hidden rounded-lg bg-[#F8F4EA] shadow">
            {imageError ? (
              <div className="grid place-items-center text-gray-500 text-sm">
                Pastor image not available
              </div>
            ) : (
              <Image
                src="/pastor.png"
                alt="Pastor portrait"
                fill
                sizes="(max-width: 768px) 75vw, 33vw"
                className="object-cover"
                onError={() => setImageError(true)}
                priority={false}
              />
            )}
          </figure>

          {/* 3. Use flexbox to vertically center the content inside the stretched article */}
          <article className="flex flex-col justify-center p-6 md:p-8">
            <h3 className="text-4xl font-semibold mb-2 text-[#E67E22]">Pastor Elson Chou</h3>
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