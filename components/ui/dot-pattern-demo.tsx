import { DotPattern } from '@/components/ui/dot-pattern'
export function DotPatternDemo() {
  return <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"><p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">Dot Pattern</p><DotPattern cy={1} cr={1} cx={1} className="[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"/></div>
}
