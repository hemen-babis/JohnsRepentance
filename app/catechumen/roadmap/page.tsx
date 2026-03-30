import { CatechumenRoadmap } from "@/components/catechumen/catechumen-roadmap"

export default function CatechumenRoadmapPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 bg-[url('/images/parchment-bg.png?v=20260321')] bg-cover bg-center bg-no-repeat dark:bg-[linear-gradient(180deg,#110b08_0%,#1a110c_24%,#22140d_58%,#130c08_100%)]" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.045] dark:opacity-[0.03]" />
        <div className="absolute left-1/2 top-0 h-[30rem] w-[65rem] -translate-x-1/2 rounded-full bg-amber-200/30 blur-3xl" />
      </div>
      <div className="relative z-10">
        <CatechumenRoadmap />
      </div>
    </div>
  )
}
