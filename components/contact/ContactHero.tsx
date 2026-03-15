// 'use client'
import Image from "next/image";
import ContactForm from "./ContactForm";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--bg-section)] ">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-20">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          
          {/* Left Content */}
          <div>
            <span className="inline-block mb-4 rounded-full bg-purple-100 px-4 py-1 text-sm font-semibold text-blue-400">
              Contact Us
            </span>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-[color:var(--title)] md:text-5xl">
              Let’s Connect with <span className="text-blue-400">Blogzilla</span>
            </h1>

            <p className="mb-4 text-lg text-[color:var(--sub-title)]">
              Have a question, feedback, or collaboration idea?  
              We’d love to hear from you.
            </p>

            <p className="max-w-xl text-gray-500">
              Blogzilla is your go-to blog platform for insights, stories, and 
              fresh perspectives. Whether you’re a reader, writer, or brand 
              looking to collaborate, our team is just a message away.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative hidden md:flex justify-center md:justify-end">
            <div className="relative h-[620px] w-full max-w-xl md:h-[400px]">
              <Image
                src="/banners/contact-banner-2.png"
                alt="Contact Blogzilla"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
