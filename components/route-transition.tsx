"use client"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import { AnimatePresence, MotionConfig, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { AdminLoginSkeleton, AdminPageSkeleton, HomePageSkeleton, ProjectPageSkeleton } from "@/components/page-skeletons"

function RouteSkeleton({ pathname }: { pathname: string }) {
  if (pathname.startsWith("/admin/login")) {
    return <AdminLoginSkeleton />
  }

  if (pathname.startsWith("/admin")) {
    return <AdminPageSkeleton />
  }

  if (pathname.startsWith("/projects/")) {
    return <ProjectPageSkeleton />
  }

  return <HomePageSkeleton />
}

export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const timer = window.setTimeout(() => {
      setIsLoading(false)
    }, 450)

    return () => window.clearTimeout(timer)
  }, [pathname])

  return (
    <MotionConfig reducedMotion="never">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div key={`loading-${pathname}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <RouteSkeleton pathname={pathname} />
          </motion.div>
        ) : (
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
