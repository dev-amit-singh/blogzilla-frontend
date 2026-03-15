import LatestPostItem from "../blogCard/LatestPostItem";
import CommentItem from "../comments/CommentItem";
import InstagramGrid from "../instagramItem/InstagramGrid";

export default function LatestPostsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-transparent">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* LEFT: LATEST POSTS */}
        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-[color:var(--text-subtitle)] mb-6">
            LATEST POSTS
          </h2>

          <div className="space-y-8">
            <LatestPostItem
              image="/blogimg/blog-7.jpg"
              category="Food"
              title="Helpful Tips for Working from Home as a Freelancer"
              date="7 August"
              readTime="11 mins read"
              views="3K views"
            />
            <LatestPostItem
              image="/blogimg/blog-8.jpg"
              category="Cooking"
              title="10 Easy Ways to Be Environmentally Conscious At Home"
              date="27 Sep"
              readTime="10 mins read"
              views="22K views"
            />
            <LatestPostItem
              image="/blogimg/blog-9.jpg"
              category="Cooking"
              title="My Favorite Comfies to Lounge in At Home"
              date="7 August"
              readTime="9 mins read"
              views="12K views"
            />
            <LatestPostItem
              image="/blogimg/blog-10.jpg"
              category="Travel"
              title="How to Give Your Space a Parisian-Inspired Makeover"
              date="27 August"
              readTime="12 mins read"
              views="23K views"
            />
          </div>

          {/* PAGINATION */}
          <div className="flex items-center gap-3 mt-10">
            {["←", "02", "03", "04", "→"].map((p, i) => (
              <button
                key={i}
                className="
                  w-9 h-9 rounded-full text-sm
                  border border-[color:var(--border-color)]
                  text-[color:var(--text-subtitle)]
                  hover:bg-[color:var(--bg-section)]
                  transition
                "
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-10">
          
          {/* LAST COMMENTS */}
          <div>
            <h3 className="text-sm font-semibold text-[color:var(--text-muted)] mb-4">
              LAST COMMENTS
            </h3>

            <div className="space-y-4">
              <CommentItem
                avatar="/avatar.jpg"
                name="David"
                date="16 Jan 2026"
                comment="A writer is someone for whom writing is more difficult than..."
              />
              <CommentItem
                avatar="/avatar.jpg"
                name="Kokawa"
                date="12 Feb 2026"
                comment="Striking pewter studded epaulettes silver zips"
              />
              <CommentItem
                avatar="/avatar.jpg"
                name="Tsukasi"
                date="18 May 2026"
                comment="Workwear bow detailing a slingback buckle strap"
              />
            </div>
          </div>

          {/* INSTAGRAM */}
          <div>
            <h3 className="text-sm font-semibold text-[color:var(--text-muted)] mb-4">
              INSTAGRAM
            </h3>
            <InstagramGrid />
          </div>

        </div>
      </div>
    </section>
  );
}
