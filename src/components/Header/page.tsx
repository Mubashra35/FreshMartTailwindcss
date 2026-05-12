export default function Header() {
  return (
    <div className="flex flex-col items-center text-center mb-8">
      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#A5D6A7] text-[#2E7D32] mb-2">
        🌿 100% Fresh & Organic
      </span>
      <h2 className="text-2xl font-semibold text-[#1B1B1B]" style={{ fontFamily: "var(--font-heading)" }}>
        Welcome to FreshMart
      </h2>
      <p className="text-sm text-[#7A7A7A] max-w-lg">
        Fresh groceries, delivered to your door — sourced locally, delivered within hours.
      </p>
    </div>
  );
}