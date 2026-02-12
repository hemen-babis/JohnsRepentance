"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface PyramidAnimationProps {
  size?: number
  animated?: boolean
  className?: string
}

export function PyramidAnimation({ size = 80, animated = true, className = "" }: PyramidAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Draw the pyramid
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set line style
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
    ctx.lineWidth = 1

    // Calculate pyramid dimensions
    const pyramidSize = size * 0.8
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const pyramidHeight = pyramidSize * 0.866 // height of equilateral triangle

    // Draw pyramid
    // Base
    ctx.beginPath()
    ctx.moveTo(centerX - pyramidSize / 2, centerY + pyramidHeight / 3)
    ctx.lineTo(centerX + pyramidSize / 2, centerY + pyramidHeight / 3)
    ctx.lineTo(centerX, centerY - (pyramidHeight * 2) / 3)
    ctx.closePath()
    ctx.stroke()

    // Internal lines
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - (pyramidHeight * 2) / 3)
    ctx.lineTo(centerX, centerY + pyramidHeight / 3)
    ctx.stroke()

    // If we want to draw a second pyramid below (stacked)
    if (animated) {
      const lowerPyramidY = centerY + pyramidHeight / 2

      ctx.beginPath()
      ctx.moveTo(centerX - pyramidSize / 2, lowerPyramidY + pyramidHeight / 3)
      ctx.lineTo(centerX + pyramidSize / 2, lowerPyramidY + pyramidHeight / 3)
      ctx.lineTo(centerX, lowerPyramidY - (pyramidHeight * 2) / 3)
      ctx.closePath()
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(centerX, lowerPyramidY - (pyramidHeight * 2) / 3)
      ctx.lineTo(centerX, lowerPyramidY + pyramidHeight / 3)
      ctx.stroke()
    }
  }, [size, animated])

  // Animation variants
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  }

  if (!animated) {
    return <canvas ref={canvasRef} width={size} height={size} className={className} />
  }

  return (
    <div className={`relative w-${size} h-${size} ${className}`}>
      {/* Animated vertical line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-[1px]">
        <motion.div
          className="h-full w-full bg-gradient-to-b from-transparent via-amber-500 to-amber-500"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>

      {/* SVG Pyramid with animation */}
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        initial="hidden"
        animate="visible"
        className="absolute top-0 left-0"
      >
        <motion.path
          d={`M${size / 2} ${size * 0.2} L${size * 0.2} ${size * 0.8} L${size * 0.8} ${size * 0.8} Z`}
          stroke="rgba(255, 255, 255, 0.8)"
          strokeWidth="1"
          fill="none"
          variants={lineVariants}
        />
        <motion.path
          d={`M${size / 2} ${size * 0.2} L${size / 2} ${size * 0.8}`}
          stroke="rgba(255, 255, 255, 0.8)"
          strokeWidth="1"
          fill="none"
          variants={lineVariants}
        />

        {/* Second pyramid (stacked) */}
        <motion.path
          d={`M${size / 2} ${size * 0.4} L${size * 0.2} ${size} L${size * 0.8} ${size} Z`}
          stroke="rgba(255, 255, 255, 0.8)"
          strokeWidth="1"
          fill="none"
          variants={{
            ...lineVariants,
            visible: {
              ...lineVariants.visible,
              transition: {
                delay: 0.5,
                duration: 1.5,
                ease: "easeInOut",
              },
            },
          }}
        />
        <motion.path
          d={`M${size / 2} ${size * 0.4} L${size / 2} ${size}`}
          stroke="rgba(255, 255, 255, 0.8)"
          strokeWidth="1"
          fill="none"
          variants={{
            ...lineVariants,
            visible: {
              ...lineVariants.visible,
              transition: {
                delay: 0.5,
                duration: 1.5,
                ease: "easeInOut",
              },
            },
          }}
        />
      </motion.svg>
    </div>
  )
}
