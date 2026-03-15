import Link from "next/link";
import { Facebook, Twitter, Youtube } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[color:var(--bg-page)] border-t border-[color:var(--border-color)]">
      {/* TOP FOOTER */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ABOUT ME */}
          <div>
            {/* LOGO */}
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/blog-logo.png"   // change if needed
                alt="Blogzilla Logo"
                width={200}
                height={60}
                className="h-auto w-[160px]"
                priority
              />
            </Link>

            {/* BRAND TEXT */}
            <p className="text-sm leading-relaxed text-[color:var(--text-subtitle)] mb-5">
              Sharing stories, insights, and inspiration on travel, lifestyle,
              technology, and modern living.
            </p>

            {/* FOLLOW US */}
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--text-title)]">
              Follow us
            </p>

            <div className="flex gap-4 text-[color:var(--text-muted)]">
              <Link href="#" aria-label="Facebook">
                <Facebook className="w-5 h-5 hover:text-[color:var(--primary)] transition" />
              </Link>

              <Link href="#" aria-label="Twitter">
                <Twitter className="w-5 h-5 hover:text-[color:var(--primary)] transition" />
              </Link>

              <Link href="#" aria-label="YouTube">
                <Youtube className="w-5 h-5 hover:text-[color:var(--primary)] transition" />
              </Link>
            </div>
          </div>

          {/* QUICK LINK */}
          <div>
            <h4
              className="
                mb-4 pb-2 text-xs font-semibold uppercase tracking-widest
                text-[color:var(--text-title)]
                border-b border-[color:var(--border-color)]
              "
            >
              Quick Link
            </h4>

            <ul className="space-y-2 text-sm text-[color:var(--text-subtitle)]">
              <li><Link href="/about" className="hover:text-[color:var(--primary)] transition">About me</Link></li>
              <li><Link href="/help" className="hover:text-[color:var(--primary)] transition">Help & Support</Link></li>
              <li><Link href="/publish" className="hover:text-[color:var(--primary)] transition">Licensing Policy</Link></li>
              <li><Link href="#" className="hover:text-[color:var(--primary)] transition">Refund Policy</Link></li>
              {/* <li><Link href="#" className="hover:text-[color:var(--primary)] transition">Hire me</Link></li> */}
              <li><Link href="/contact" className="hover:text-[color:var(--primary)] transition">Contact</Link></li>
            </ul>
          </div>

          {/* TAG CLOUD */}
          <div>
            <h4
              className="
                mb-4 pb-2 text-xs font-semibold uppercase tracking-widest
                text-[color:var(--text-title)]
                border-b border-[color:var(--border-color)]
              "
            >
              Tagcloud
            </h4>

            <div className="flex flex-wrap gap-2">
              {[
                "Beautiful",
                "New York",
                "Droll",
                "Intimate",
                "Loving",
                "Travel",
                "Fighting",
              ].map((tag) => (
                <span
                  key={tag}
                  className="
                    cursor-pointer rounded-full border px-3 py-1 text-xs
                    text-[color:var(--text-subtitle)]
                    border-[color:var(--border-color)]
                    hover:bg-[color:var(--bg-section)]
                    transition
                  "
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4
              className="
                mb-4 pb-2 text-xs font-semibold uppercase tracking-widest
                text-[color:var(--text-title)]
                border-b border-[color:var(--border-color)]
              "
            >
              Newsletter
            </h4>

            <p className="mb-4 text-sm text-[color:var(--text-subtitle)]">
              Subscribe to our newsletter and get our newest updates right on
              your inbox.
            </p>

            <form className="flex items-center mb-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="
                  w-full rounded-l-full border px-4 py-2 text-sm
                  bg-[color:var(--bg-card)]
                  text-[color:var(--text-title)]
                  border-[color:var(--border-color)]
                  focus:outline-none
                "
              />
              <button
                type="submit"
                className="
                  rounded-r-full px-5 py-2 text-sm text-white
                  bg-[color:var(--primary)]
                  hover:opacity-90
                  transition
                "
              >
                Subscribe
              </button>
            </form>

            <label className="flex items-center gap-2 text-xs text-[color:var(--text-muted)]">
              <input type="checkbox" className="rounded" />
              I agree to the terms & conditions
            </label>
          </div>

        </div>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="border-t border-[color:var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between text-xs text-[color:var(--text-muted)]">
          <p>© 2026, BLOGZILLA – </p>
          <p>Design by Amit | All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
