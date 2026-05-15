import Navbar from "../../components/Navbar/page";
import Footer from "../../components/Footer/page";

export default function Reviews() {
  const sectionTitle = "flex flex-col items-center text-center mb-8 mt-10";
  const sectionTitleH2 = "font-heading text-brand-primary text-[clamp(1.4rem,3vw,2rem)] font-semibold leading-[1.3] mb-2.5";
  const sectionTitleP = "text-text-muted max-w-[520px] text-[0.97rem] leading-[1.7]";

  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-9 max-w-[1200px] w-full mx-auto">
        <div className={sectionTitle}>
          <h2 className={sectionTitleH2}>Customer Reviews</h2>
          <p className={sectionTitleP}>Read what our amazing customers have to say about their FreshMart experience.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 my-9 mx-3">
            {[
              { text: "\"FreshMart has completely changed how I shop for groceries. Everything is always so fresh and the delivery is super fast!\"", name: "Sara K.", date: "May 10, 2025" },
              { text: "\"Amazing quality products at great prices. I love the organic section — the vegetables are always farm-fresh!\"", name: "Ahmed R.", date: "May 12, 2025" },
              { text: "\"Best grocery app I have used. The search filters make it so easy to find exactly what I need by price and category.\"", name: "Maria L.", date: "May 14, 2025" },
              { text: "\"I order my weekly groceries from here. Never had a bad experience. Highly recommended!\"", name: "Usman A.", date: "May 15, 2025" },
              { text: "\"The bakery section is out of this world. The sourdough bread is my absolute favorite.\"", name: "Fatima S.", date: "May 15, 2025" },
              { text: "\"Customer support is incredibly helpful, and the delivery drivers are always polite and on time.\"", name: "Zainab B.", date: "May 16, 2025" }
            ].map(t => (
              <div key={t.name} className="bg-bg-card border border-border-muted rounded-md p-6 w-[300px] shadow-sm flex flex-col gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <p className="text-[0.97rem] text-text-secondary leading-[1.7] italic flex-1 m-0">{t.text}</p>
                <div className="flex items-center gap-3 border-t border-border-muted pt-4 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-brand-third flex items-center justify-center text-brand-primary font-bold text-lg">{t.name.charAt(0)}</div>
                  <div className="flex flex-col">
                    <h4 className="font-body text-[1rem] font-semibold text-text-secondary m-0">{t.name}</h4>
                    <span className="text-[0.75rem] text-text-muted">{t.date} | ⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
