function Pulse({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-xl bg-gradient-to-r from-black/5 via-black/10 to-black/5 ${className}`} />
}

export function HomePageSkeleton() {
  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <Pulse className="h-10 w-56" />
              <Pulse className="h-16 w-full max-w-xl" />
              <Pulse className="h-28 w-full max-w-2xl" />
              <div className="flex flex-wrap gap-3">
                <Pulse className="h-9 w-28" />
                <Pulse className="h-9 w-32" />
                <Pulse className="h-9 w-28" />
              </div>
            </div>
            <Pulse className="h-[420px] w-full rounded-[32px]" />
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            <Pulse className="h-36" />
            <Pulse className="h-36" />
            <Pulse className="h-36" />
            <Pulse className="h-36" />
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <Pulse className="h-80" />
            <Pulse className="h-80" />
            <Pulse className="h-80" />
          </div>
        </div>
      </div>
    </main>
  )
}

export function AdminPageSkeleton() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <Pulse className="h-24 w-full border-2 border-black/10" />
        <Pulse className="h-80 w-full border-2 border-black/10" />
        <Pulse className="h-96 w-full border-2 border-black/10" />
      </div>
    </main>
  )
}

export function AdminLoginSkeleton() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
      <Pulse className="h-64 w-full max-w-md border-2 border-black/10" />
    </main>
  )
}

export function ProjectPageSkeleton() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="h-[420px] w-full animate-pulse bg-gradient-to-r from-black/10 via-black/15 to-black/10" />
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="space-y-6">
          <Pulse className="h-12 w-full max-w-3xl" />
          <Pulse className="h-24 w-full max-w-4xl" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            <Pulse className="h-24" />
            <Pulse className="h-24" />
            <Pulse className="h-24" />
            <Pulse className="h-24" />
            <Pulse className="h-24" />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Pulse className="h-80" />
            <Pulse className="h-80" />
          </div>
        </div>
      </div>
    </main>
  )
}
