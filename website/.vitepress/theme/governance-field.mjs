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
  const clamp = value => Math.max(0, Math.min(1, value))

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
    const order = clamp((u - 0.46) * 3.2)
    const easing = order * order * (3 - 2 * order)
    const phase = clock * 0.14 + u * 7.2 + bundle * (convergence ? Math.PI * 2 / 3 : Math.PI)
    const twist = u * 5.6 - clock * 0.09 + bundle * 1.4
    const offset = (strand - 0.5) * (convergence ? 0.9 : bundle === 0 ? 1.28 : 0.84)
    const radius = convergence ? 1.02 - easing * 0.68 : 0.94
    const wave = Math.sin(u * Math.PI * 2.2 + clock * 0.12 + bundle * 2.3)
    let y = Math.sin(phase) * radius + offset * Math.cos(twist) + wave * 0.13
    let z = Math.cos(phase) * 0.86 + offset * Math.sin(twist)
    if (convergence) {
      y = y * (1 - easing) + (offset * 0.24 + (bundle - 1) * 0.31) * easing
      z = z * (1 - easing) + (bundle - 1) * 0.25 * easing
    }
    y += 0.32 * Math.sin(x * 0.58 - 0.65) + 0.08 * Math.sin(clock * 0.16)
    return project(x, y, z)
  }

  function path(points, join = false) {
    if (join) context.lineTo(points[0].x, points[0].y)
    else context.moveTo(points[0].x, points[0].y)
    for (let index = 1; index < points.length - 1; index++) {
      const p = points[index], next = points[index + 1]
      context.quadraticCurveTo(p.x, p.y, (p.x + next.x) / 2, (p.y + next.y) / 2)
    }
    const end = points.at(-1)
    context.lineTo(end.x, end.y)
  }

  function sheen(u, bundle, clock) {
    const flow = (clock * 0.04 + bundle * 0.36 + 0.62) % 1
    const distance = Math.min(Math.abs(u - flow), 1 - Math.abs(u - flow))
    const reflection = Math.pow(Math.max(0, Math.cos(u * 5.6 - clock * 0.09 + bundle * 1.4 - 0.8)), 12)
    return Math.exp(-Math.pow(distance / 0.052, 2)) * 0.62 + reflection * 0.3
  }

  function drawSurface(bundle, clock, samples, faces) {
    const bands = mobile ? 4 : 8
    const sections = Array.from({ length: bands + 1 }, (_, band) =>
      Array.from({ length: samples + 1 }, (_, sample) => strandPosition(sample / samples, band / bands, bundle, clock)))
    for (let band = 1; band <= bands; band++) {
      const across = (band - 0.5) / bands
      const polish = 0.42 + 0.58 * Math.pow(Math.sin(across * Math.PI + 0.35), 2)
      const edges = [sections[band - 1], sections[band]]
      const depth = edges.flat().reduce((sum, p) => sum + p.depth, 0) / ((samples + 1) * 2)
      faces.push({ edges, bundle, polish, depth })
    }
    return [sections[0], sections.at(-1)]
  }

  function drawFaces(faces, clock) {
    faces.sort((a, b) => a.depth - b.depth)
    for (const face of faces) {
      const first = face.edges[0][0], last = face.edges[0].at(-1)
      const gradient = context.createLinearGradient(first.x, 0, last.x, 0)
      for (let step = 0; step <= 24; step++) {
        const u = step / 24
        const violet = clamp((u - 0.35) * 1.7 + face.bundle * 0.12)
        const light = sheen(u, face.bundle, clock) * face.polish
        const alpha = (0.13 + light * 0.48) * clamp((face.depth - 0.62) * 2.2) * Math.sin(u * Math.PI)
        gradient.addColorStop(u, `rgba(${Math.round(37 + violet * 88 + light * 100)},${Math.round(138 - violet * 62 + light * 92)},255,${alpha})`)
      }
      context.fillStyle = gradient
      context.beginPath()
      path(face.edges[0])
      path(face.edges[1].toReversed(), true)
      context.closePath()
      context.fill()
    }
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
    const pulse = Math.pow(Math.max(0, Math.cos(clock * 0.75 - index * 0.8)), 8)
    context.beginPath()
    for (let step = 0; step <= 96; step++) {
      const angle = step / 96 * Math.PI * 2
      const p = project(x, Math.sin(angle) * 1.26, Math.cos(angle) * 1.1)
      if (step === 0) context.moveTo(p.x, p.y)
      else context.lineTo(p.x, p.y)
    }
    context.strokeStyle = `rgba(123,175,255,${0.12 + pulse * 0.2})`
    context.lineWidth = 0.65
    context.stroke()
    const p = project(x, Math.sin(clock * 0.18 + index) * 1.26, Math.cos(clock * 0.18 + index) * 1.1)
    glow(p.x, p.y, 28 + pulse * 18, '115,155,255', 0.25 + pulse * 0.45)
    context.fillStyle = '#e3f1ff'
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
    const count = mobile ? 10 : 18
    const samples = mobile ? 80 : 120
    const curves = []
    const faces = []
    const rims = []
    for (let bundle = 0; bundle < bundles; bundle++) {
      rims.push(...drawSurface(bundle, clock, samples, faces))
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
    drawFaces(faces, clock)
    curves.sort((a, b) => a.depth - b.depth)
    context.globalCompositeOperation = 'lighter'
    for (const curve of curves) {
      const gradient = context.createLinearGradient(0, 0, width, height * 0.45)
      const opacity = Math.min(0.42, 0.1 + (curve.depth - 0.8) * 0.7)
      gradient.addColorStop(0, 'rgba(34,113,255,0)')
      gradient.addColorStop(0.28, `rgba(35,184,255,${opacity * 0.65})`)
      gradient.addColorStop(0.59, curve.bundle === 0 ? `rgba(80,199,255,${opacity})` : `rgba(124,109,255,${opacity})`)
      gradient.addColorStop(0.88, `rgba(165,92,255,${opacity * 0.85})`)
      gradient.addColorStop(1, 'rgba(107,67,255,0)')
      context.strokeStyle = gradient
      context.lineWidth = curve.depth > 1 ? 0.65 : 0.45
      context.beginPath()
      path(curve.points)
      context.stroke()
      if (Math.round(curve.strand * (count - 1)) % 11 === 0) {
        const progress = (clock * 0.052 + curve.strand * 0.73 + curve.bundle * 0.25) % 1
        const p = strandPosition(progress, curve.strand, curve.bundle, clock)
        glow(p.x, p.y, mobile ? 17 : 28, curve.bundle === 0 ? '70,207,255' : '159,113,255', 0.25)
        context.fillStyle = 'rgba(201,232,255,0.85)'
        context.beginPath()
        context.arc(p.x, p.y, 1.25, 0, Math.PI * 2)
        context.fill()
      }
    }
    for (const rim of rims) {
      const gradient = context.createLinearGradient(0, height, width, 0)
      gradient.addColorStop(0, 'rgba(72,191,255,0)')
      gradient.addColorStop(0.34, 'rgba(84,197,255,0.38)')
      gradient.addColorStop(0.58, 'rgba(189,228,255,0.65)')
      gradient.addColorStop(0.84, 'rgba(164,122,255,0.38)')
      gradient.addColorStop(1, 'rgba(127,85,255,0)')
      context.strokeStyle = gradient
      context.lineWidth = mobile ? 0.65 : 1
      context.beginPath()
      path(rim)
      context.stroke()
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
