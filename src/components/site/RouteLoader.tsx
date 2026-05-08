import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";

export function RouteLoader() {
  const status = useRouterState({ select: (s) => s.status });
  const isLoading = status === "pending";
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="route-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[55] pointer-events-none"
        >
          {/* top shimmer bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] overflow-hidden">
            <motion.div
              className="h-full w-1/3 gradient-gold shadow-gold"
              initial={{ x: "-100%" }}
              animate={{ x: "300%" }}
              transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity }}
            />
          </div>
          {/* skeleton overlay */}
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm">
            <div className="container mx-auto px-6 pt-28 md:pt-36 space-y-6 animate-pulse">
              <div className="h-8 w-2/3 max-w-xl rounded-xl bg-muted/80" />
              <div className="h-4 w-1/2 max-w-md rounded-lg bg-muted/70" />
              <div className="grid md:grid-cols-3 gap-4 pt-6">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-40 rounded-2xl bg-muted/60 shadow-soft" />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}