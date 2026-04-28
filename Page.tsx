import { Menu } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f2eb] text-black">
      <header className="fixed left-0 top-0 z-50 w-full border-b border-black/10 bg-[#f5f2eb]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="font-serif text-2xl italic tracking-tight">
            Aurea Studio
          </div>

          <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.25em] md:flex">
  {["Work", "Studio", "Services", "Contact"].map((item) => (
    <a
      key={item}
      href={`#${item.toLowerCase()}`}
      className="relative group"
    >
      <span className="transition duration-300 group-hover:text-black/60 group-hover:drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
        {item}
      </span>

      {/* underline effect */}
      <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
    </a>
  ))}
</nav>

          <button className="md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </header>

      <section className="flex min-h-screen items-center justify-center px-6 pt-24">
        <h1 className="text-center text-6xl font-bold tracking-tight md:text-8xl">
          Architecture Studio
        </h1>
      </section>
    </main>
  );
}
