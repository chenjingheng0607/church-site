"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

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
  return (
    <section className="w-full py-16" style={{ backgroundColor: '#F8F4EA' }}>
      <div className="w-[80%] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">
            Find the service that's right for you and your family
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative rounded-lg overflow-hidden h-[400px]"
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
      </div>
    </section>
  );
}
