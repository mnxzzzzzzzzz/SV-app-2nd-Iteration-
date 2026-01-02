import { motion, useMotionValue, useTransform } from "framer-motion"

interface VirtualCardProps {
  user?: { displayName?: string }
  balance?: string
}

export function VirtualCard({ user, balance = "247.50" }: VirtualCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [15, -15])
  const rotateY = useTransform(x, [-100, 100], [-15, 15])

  const handleMouse = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div className="perspective-[1000px]">
      <motion.div
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative w-full aspect-[1.6/1] rounded-2xl overflow-hidden border border-sv-glass-border cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sv-navy via-sv-navy/80 to-sv-violet" />
        
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
          style={{
            translateX: useTransform(x, [-100, 100], [-50, 50]),
            translateY: useTransform(y, [-100, 100], [-50, 50]),
          }}
        />
        
        <div 
          className="relative h-full p-6 flex flex-col justify-between"
          style={{ transform: "translateZ(50px)" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sv-cyan via-sv-azure to-sv-violet flex items-center justify-center">
              <span className="text-white font-bold text-lg">SV</span>
            </div>
            <span className="text-sv-text-main/80 font-semibold tracking-wide">StudentVerse</span>
          </div>

          <div>
            <p className="text-sv-text-muted text-sm tracking-[0.2em] mb-2">•••• •••• •••• 4242</p>
            <p className="text-sv-text-muted text-sm">{user?.displayName || "Guest"}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-7 bg-gradient-to-r from-[#EB001B] to-[#F79E1B] rounded opacity-80" />
            <div className="w-8 h-5 border-2 border-sv-glass-border rounded" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
