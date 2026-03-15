import CategoryListSection from "@/components/categoriesPost/CategoryListSection"
import CategoryPostsSection from "@/components/categoriesPost/CategoryPostsSection"
import ContactForm from "@/components/contact/ContactForm"
import ContactHero from "@/components/contact/ContactHero"


const Contact = () => {
  return (
    <>
      <ContactHero />
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-20">
        <ContactForm />
      </div>
      <div className="custom-bg">
        <CategoryPostsSection />
      </div>
      <div className="custom-bg">
        <CategoryListSection />
      </div>
    </>
  )
}

export default Contact