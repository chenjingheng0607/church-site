"use client";

import Image from 'next/image';
import { useCallback, useRef } from 'react';

const services = [
  {
    id: 1,
    title: 'Sunday Worship',
    description: 'Gather as one family in Christ to worship, grow, and serve together.',
    image: '/sunday_worship.jpg',
    link: '/services/worship'
  },
  {
    id: 2,
    title: 'Firelight',
    description: 'Igniting passion and purpose — a community for young adults to shine for Christ.',
    image: '/firelight.jpg',
    link: '/services/kids'
  },
  {
    id: 3,
    title: 'MJYF',
    description: 'A place for youth to grow in faith, friendships, and fun while following Jesus',
    image: '/mjyf.jpg',
    link: '/services/youth'
  },
  {
    id: 4,
    title: 'PCW',
    description: 'Building faith at home by worshiping and learning together as parents and children.',
    image: '/pcw.jpg',
    link: '/services/groups'
  }
];

export default function Services() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const container = scrollerRef.current;
    if (!container) return;
    const firstCard = container.querySelector(':scope > div') as HTMLDivElement | null;
    const styles = typeof window !== 'undefined' ? window.getComputedStyle(container) : (null as any);
    const gapPx = styles ? parseFloat(styles.gap || styles.columnGap || '0') : 0;
    const cardWidth = firstCard?.offsetWidth ?? container.clientWidth;
    const delta = direction * (cardWidth + (isNaN(gapPx) ? 0 : gapPx));
    container.scrollBy({ left: delta, behavior: 'smooth' });
  }, []);

  return (
    <section className="relative w-full py-16" style={{ backgroundColor: '#F8F4EA' }}>
      <div className="w-[80%] mx-auto">
        <div className="text-left mb-12 pl-4">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">
            Find the service that's right for you and your family
          </p>
        </div>

        <div>
          <div
            ref={scrollerRef}
            className="no-scrollbar flex 2xl:grid 2xl:grid-cols-4 gap-6 2xl:gap-6 overflow-x-auto 2xl:overflow-visible snap-x snap-mandatory px-4"
          >
            {services.map((service) => (
              <div
                key={service.id}
                className="relative rounded-lg overflow-hidden h-[400px] flex-shrink-0 snap-center min-w-[85%] sm:min-w-[70%] md:min-w-[60%] lg:min-w-[50%] 2xl:min-w-0"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-end text-white">
                  <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                  <p className="mb-4">{service.description}</p>
                  <a
                    href={service.link}
                    className="inline-block bg-white/50 text-white px-6 py-2 rounded-md hover:bg-white/60 transition-colors"
                  >
                    Know More
                  </a>
                </div>
              </div>
            ))}
          </div>
          {/* controls below the carousel, aligned with its left padding */}
          <div className="2xl:hidden mt-3 flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollByCard(-1)}
              className="h-10 w-10 rounded-full bg-black/60 text-white grid place-items-center hover:bg-black/70 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M15.78 5.22a.75.75 0 0 1 0 1.06L10.06 12l5.72 5.72a.75.75 0 1 1-1.06 1.06l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollByCard(1)}
              className="h-10 w-10 rounded-full bg-black/60 text-white grid place-items-center hover:bg-black/70 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M8.22 18.78a.75.75 0 0 1 0-1.06L13.94 12 8.22 6.28a.75.75 0 0 1 1.06-1.06l6.25 6.25a.75.75 0 0 1 0 1.06l-6.25 6.25a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
