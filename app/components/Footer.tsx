import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t border-black/[.06] dark:border-white/[.08] bg-white">
      <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-center text-gray-600">
        <nav className="flex flex-wrap items-center justify-center gap-6 mb-4">
          <Link href="#about" className="hover:text-gray-900">About Us</Link>
          <Link href="#services" className="hover:text-gray-900">Service</Link>
          <Link href="#sermons" className="hover:text-gray-900">Sermon</Link>
          <Link href="#ministries" className="hover:text-gray-900">Ministries</Link>
          <Link href="#resources" className="hover:text-gray-900">Resources</Link>
          <Link href="#give" className="hover:text-gray-900">Give</Link>
        </nav>
        <p className="text-xs text-gray-500">© {year} Church. All rights reserved.</p>
      </div>
    </footer>
  );
}
