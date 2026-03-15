import FeaturedSmallCard from "./FeaturedSmallCard";

export default function FeaturedGrid() {

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <FeaturedSmallCard
        image="/blogImg/blog-3.jpg"
        category="Fashion"
        title="Put Yourself in Your Customers Shoes"
        meta="17 July · 8 mins read · 12k views"
      />

      <FeaturedSmallCard
        image="/blogImg/blog-4.jpg"
        category="Travel"
        title="Life and Death in the Empire of the Tiger"
        meta="7 August · 15 mins read · 500 views"
      />

      <FeaturedSmallCard
        image="/blogImg/blog-5.jpg"
        category="Lifestyle"
        title="When Two Wheels Are Better Than Four"
        meta="15 June · 9 mins read · 1.2k views"
      />
    </div>
  );
}
