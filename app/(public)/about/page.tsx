import ContactForm from "@/components/contact/ContactForm";
import { BadgeCheck} from "lucide-react";

export default function About() {
  return (
    <main className="w-full">

      {/* HERO / BANNER */}
      <section className="relative overflow-hidden bg-[color:var(--bg-card)]">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">

          <span className="inline-block mb-4 text-sm font-semibold text-[color:var(--primary)] bg-purple-100 px-4 py-1 rounded-full">
            About Blogzilla
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
            A Platform for
            <span className="text-[color:var(--primary)]"> Ideas, Stories & Insights</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-[color:var(--text-subtitle)] leading-relaxed">
            Blogzilla is a modern blogging platform where knowledge meets
            creativity. We publish original articles and carefully selected
            third-party blogs to bring readers diverse perspectives,
            practical insights, and trending topics — all in one place.
          </p>

        </div>

        {/* soft background glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-purple-200/40 blur-3xl rounded-full" />
      </section>


      {/* ABOUT CONTENT */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Text */}
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-[color:var(--primary)]">
              Who We Are
            </h2>

            <p className="text-[color:var(--text-subtitle)] leading-relaxed mb-4">
              Blogzilla is built for readers, writers, and brands who value
              meaningful content. Our platform features both in-house articles
              and high-quality third-party contributions across multiple
              categories including technology, business, lifestyle, and trends.
            </p>

            <p className="text-[color:var(--text-subtitle)] leading-relaxed">
              Our goal is simple — make useful, engaging, and trustworthy blog
              content easily accessible while giving contributors a strong
              platform to share their voice.
            </p>
          </div>

          {/* Card */}
          <div className="bg-[color:var(--bg-card)] rounded-2xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-xl font-semibold mb-4 text-[color:var(--text-title)]">
              What You’ll Find on Blogzilla
            </h3>

            <ul className="space-y-3 text-[color:var(--text-subtitle)] text-sm">
              <li className="flex items-center gap-2"><span><BadgeCheck size={16} /></span> Original in-house blog articles</li>
              <li className="flex items-center gap-2"><span><BadgeCheck size={16} /></span> Curated third-party guest posts</li>
              <li className="flex items-center gap-2"><span><BadgeCheck size={16} /></span> Multi-category trending topics</li>
              <li className="flex items-center gap-2"><span><BadgeCheck size={16} /></span> Expert opinions & practical guides</li>
              <li className="flex items-center gap-2"><span><BadgeCheck size={16} /></span> Collaboration & publishing opportunities</li>
              
            </ul>
          </div>

        </div>
      </section>


      {/* CONTACT SECTION */}
      <section className="bg-[color:var(--bg-section)] py-5">
        <ContactForm />
      </section>

    </main>
  );
}
