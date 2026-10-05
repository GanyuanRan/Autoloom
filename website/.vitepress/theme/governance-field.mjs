/**
 * Draw the site's animated weave or convergence field without external assets.
 * @param {HTMLCanvasElement} canvas Background drawing surface.
 * @param {'weave' | 'converge'} variant Pattern for the product or method page.
 * @returns {{resize: () => void, setRunning: (running: boolean) => void, setPointer: (x: number, y: number) => void, dispose: () => void}} Playback and lifecycle controls.
 */
export function createGovernanceField(canvas, variant) {
  const context = canvas.getContext('2d', { alpha: true })
  if (!context) return { resize() {}, setRunning() {}, setPointer() {}, dispose() {} }
  let width = 1, height = 1, ratio = 1, frame = 0, running = false
  let time = 0, last = 0, mobile = false
  let pointerX = 0, pointerY = 0, targetX = 0, targetY = 0
  const convergence = variant === 'converge'

  function project(x, y, z) {
    const perspective = 5 / (5 + z)
    const scale = mobile ? width * 0.35 : width * 0.17
    return {
      x: width * (mobile ? 0.55 : 0.68) + (x * scale + pointerX) * perspective,
      y: height * 0.58 + (y * height * 0.31 + pointerY) * perspective,
      depth: perspective,
    }
  }

  function strandPosition(u, strand, bundle, clock) {
    const x = (u - 0.5) * 9.5
    const order = Math.max(0, Math.min(1, (u - 0.49) * 3.6))
    const easing = order * order * (3 - 2 * order)
    const phase = clock * 0.28 + u * 7.6 + bundle * Math.PI
    const offset = (strand - 0.5) * (convergence ? 1.35 : 0.74)
    const radius = convergence ? 1.18 - easing * 0.85 : 1.04
    const wave = Math.sin(u * Math.PI * 2.2 + clock * 0.2 + bundle * 2.3)
    let y = Math.sin(phase) * radius + offset * Math.cos(phase * 0.56) + wave * 0.15
    let z = Math.cos(phase) * 0.92 + offset * Math.sin(phase * 0.56)
    if (convergence) {
      y = y * (1 - easing) + (offset * 0.24 + (bundle - 1) * 0.31) * easing
      z = z * (1 - easing) + (bundle - 1) * 0.25 * easing
    }
    y += 0.32 * Math.sin(x * 0.58 - 0.65) + 0.08 * Math.sin(clock * 0.16)
    return project(x, y, z)
  }

  function glow(x, y, radius, color, strength) {
    const gradient = context.createRadialGradient(x, y, 0, x, y, radius)
    gradient.addColorStop(0, `rgba(${color},${strength})`)
    gradient.addColorStop(0.42, `rgba(${color},${strength * 0.28})`)
    gradient.addColorStop(1, `rgba(${color},0)`)
    context.fillStyle = gradient
    context.fillRect(x - radius, y - radius, radius * 2, radius * 2)
  }

  function drawGate(x, clock, index) {
    const pulse = 0.6 + Math.sin(clock * 0.8 - index) * 0.15
    context.beginPath()
    for (let step = 0; step <= 96; step++) {
      const angle = step / 96 * Math.PI * 2
      const p = project(x, Math.sin(angle) * 1.26, Math.cos(angle) * 1.1)
      if (step === 0) context.moveTo(p.x, p.y)
      else context.lineTo(p.x, p.y)
    }
    context.strokeStyle = `rgba(123,175,255,${pulse * 0.24})`
    context.lineWidth = 0.7
    context.stroke()
    const p = project(x, Math.sin(clock * 0.18 + index) * 1.26, Math.cos(clock * 0.18 + index) * 1.1)
    glow(p.x, p.y, 22, '115,155,255', 0.4)
    context.fillStyle = '#c1dbff'
    context.beginPath()
    context.arc(p.x, p.y, 1.8, 0, Math.PI * 2)
    context.fill()
  }

  function draw(clock) {
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    context.clearRect(0, 0, width, height)
    pointerX += (targetX - pointerX) * 0.06
    pointerY += (targetY - pointerY) * 0.06
    glow(width * 0.72, height * 0.24, width * 0.34, '26,114,235', 0.15)
    glow(width * 0.82, height * 0.82, width * 0.28, '116,45,227', 0.18)
    const bundles = convergence ? 3 : 2
    const count = mobile ? 20 : 38
    const samples = mobile ? 70 : 110
    const curves = []
    for (let bundle = 0; bundle < bundles; bundle++) {
      for (let line = 0; line < count; line++) {
        const strand = line / (count - 1)
        const points = []
        let depth = 0
        for (let sample = 0; sample <= samples; sample++) {
          const p = strandPosition(sample / samples, strand, bundle, clock)
          points.push(p)
          depth += p.depth
        }
        curves.push({ points, bundle, strand, depth: depth / points.length })
      }
    }
    curves.sort((a, b) => a.depth - b.depth)
    context.globalCompositeOperation = 'lighter'
    for (const curve of curves) {
      const gradient = context.createLinearGradient(0, 0, width, height * 0.45)
      const opacity = Math.min(0.82, 0.3 + (curve.depth - 0.8) * 1.1)
      gradient.addColorStop(0, 'rgba(34,113,255,0)')
      gradient.addColorStop(0.28, `rgba(35,184,255,${opacity * 0.65})`)
      gradient.addColorStop(0.59, curve.bundle === 0 ? `rgba(80,199,255,${opacity})` : `rgba(124,109,255,${opacity})`)
      gradient.addColorStop(0.88, `rgba(165,92,255,${opacity * 0.85})`)
      gradient.addColorStop(1, 'rgba(107,67,255,0)')
      context.strokeStyle = gradient
      context.lineWidth = curve.depth > 1 ? 0.95 : 0.65
      context.beginPath()
      context.moveTo(curve.points[0].x, curve.points[0].y)
      for (let index = 1; index < curve.points.length - 1; index++) {
        const p = curve.points[index]
        const next = curve.points[index + 1]
        context.quadraticCurveTo(p.x, p.y, (p.x + next.x) / 2, (p.y + next.y) / 2)
      }
      const end = curve.points.at(-1)
      context.lineTo(end.x, end.y)
      context.stroke()
      if (Math.round(curve.strand * (count - 1)) % 7 === 0) {
        const progress = (clock * 0.045 + curve.strand * 0.73 + curve.bundle * 0.25) % 1
        const p = strandPosition(progress, curve.strand, curve.bundle, clock)
        glow(p.x, p.y, mobile ? 14 : 23, curve.bundle === 0 ? '70,207,255' : '159,113,255', 0.32)
        context.fillStyle = 'rgba(201,232,255,0.85)'
        context.beginPath()
        context.arc(p.x, p.y, 1.25, 0, Math.PI * 2)
        context.fill()
      }
    }
    if (convergence) [-1.2, 0.3, 1.8].forEach((x, index) => drawGate(x, clock, index))
    context.globalCompositeOperation = 'source-over'
  }

  function animate(stamp) {
    if (!running) return
    frame = requestAnimationFrame(animate)
    const interval = mobile ? 1000 / 24 : 1000 / 40
    if (stamp - last < interval) return
    time += Math.min((stamp - last) / 1000, 0.1)
    last = stamp
    draw(time)
  }

  function setRunning(next) {
    if (running === next) return
    running = next
    cancelAnimationFrame(frame)
    if (running) {
      last = performance.now()
      frame = requestAnimationFrame(animate)
    }
  }

  function resize() {
    const bounds = canvas.getBoundingClientRect()
    width = bounds.width
    height = bounds.height
    mobile = width < 820
    ratio = Math.min(devicePixelRatio, mobile ? 1.25 : 1.5)
    canvas.width = Math.round(width * ratio)
    canvas.height = Math.round(height * ratio)
    draw(time)
  }

  resize()
  return {
    resize,
    setRunning,
    setPointer(x, y) { if (!mobile) { targetX = x * 14; targetY = y * 10 } },
    dispose() { running = false; cancelAnimationFrame(frame) },
  }
}
