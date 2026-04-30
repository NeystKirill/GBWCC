import { useEffect, useRef } from 'react'

const VERT = `
precision highp float;
attribute vec3 aPos; attribute float aScale; attribute float aSpeed; attribute vec3 aColor;
uniform float uTime; uniform vec2 uMouse; uniform float uAspect;
varying vec3 vColor; varying float vAlpha;
void main(){
  vec3 p=aPos;
  float t=uTime*aSpeed;
  p.x+=sin(t+aPos.y*2.1)*0.15+uMouse.x*0.06;
  p.y+=cos(t*0.9+aPos.x*1.7)*0.10+uMouse.y*0.04;
  p.z+=sin(t*0.7+aPos.x+aPos.y)*0.07;
  gl_Position=vec4(p.x/uAspect,p.y,p.z,1.0);
  float depth=0.8+p.z*0.3;
  gl_PointSize=clamp(aScale*200.0*depth,0.5,12.0);
  float ex=min(min(p.x*uAspect+1.2,1.2-p.x*uAspect),min(p.y+1.2,1.2-p.y));
  vAlpha=smoothstep(0.0,0.25,ex)*(0.2+aScale*0.8);
  vColor=aColor;
}`

const FRAG = `
precision highp float;
varying vec3 vColor; varying float vAlpha;
void main(){
  vec2 c=gl_PointCoord-0.5; float d=length(c);
  if(d>0.5) discard;
  float core=1.0-smoothstep(0.0,0.15,d);
  float glow=1.0-smoothstep(0.0,0.5,d);
  float a=(core*0.95+glow*0.35)*vAlpha;
  gl_FragColor=vec4(vColor+core*0.3,a);
}`

function buildGL(canvas) {
  const gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false, powerPreference: 'low-power' })
  if (!gl) return null

  function mkShader(t, s) { const sh = gl.createShader(t); gl.shaderSource(sh, s); gl.compileShader(sh); return sh }
  const prog = gl.createProgram()
  gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null

  return { gl, prog }
}

export default function ParticleField({ count = 80, style, className }) {
  const ref   = useRef(null)
  const mouse = useRef([0, 0])

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    let raf = 0
    let glCtx = null

    // Build geometry once
    const gold1 = [0.72, 0.57, 0.29], gold2 = [0.91, 0.79, 0.43], blue = [0.3, 0.45, 0.85]
    const pos = [], scl = [], spd = [], col = []
    for (let i = 0; i < count; i++) {
      pos.push((Math.random() - 0.5) * 2.4, (Math.random() - 0.5) * 2.4, (Math.random() - 0.5) * 0.6)
      scl.push(0.25 + Math.random() * 0.75)
      spd.push(0.25 + Math.random() * 0.75)
      const c = Math.random() < 0.7 ? gold1 : Math.random() < 0.6 ? gold2 : blue
      col.push(c[0], c[1], c[2])
    }

    function init() {
      const built = buildGL(canvas)
      if (!built) return
      const { gl, prog } = built

      function mkBuf(data) {
        const b = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, b)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW)
        return b
      }

      const pBuf = mkBuf(pos), sBuf = mkBuf(scl), spBuf = mkBuf(spd), cBuf = mkBuf(col)

      function attr(buf, loc, sz) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.enableVertexAttribArray(loc)
        gl.vertexAttribPointer(loc, sz, gl.FLOAT, false, 0, 0)
      }

      const aPos   = gl.getAttribLocation(prog, 'aPos')
      const aScale = gl.getAttribLocation(prog, 'aScale')
      const aSpeed = gl.getAttribLocation(prog, 'aSpeed')
      const aColor = gl.getAttribLocation(prog, 'aColor')
      const uTime  = gl.getUniformLocation(prog, 'uTime')
      const uMouse = gl.getUniformLocation(prog, 'uMouse')
      const uAsp   = gl.getUniformLocation(prog, 'uAspect')

      glCtx = { gl, prog, pBuf, sBuf, spBuf, cBuf, aPos, aScale, aSpeed, aColor, uTime, uMouse, uAsp }
      resize()
      draw()
    }

    let w = 1, h = 1
    function resize() {
      w = canvas.offsetWidth || 1
      h = canvas.offsetHeight || 1
      canvas.width  = w * devicePixelRatio
      canvas.height = h * devicePixelRatio
      if (glCtx) glCtx.gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const t0 = performance.now()
    function draw() {
      if (!glCtx) return
      raf = requestAnimationFrame(draw)
      const { gl, prog, pBuf, sBuf, spBuf, cBuf, aPos, aScale, aSpeed, aColor, uTime, uMouse, uAsp } = glCtx
      try {
        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.enable(gl.BLEND)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
        gl.useProgram(prog)
        gl.uniform1f(uTime, (performance.now() - t0) / 1000)
        gl.uniform2f(uMouse, mouse.current[0], mouse.current[1])
        gl.uniform1f(uAsp, w / Math.max(h, 1))
        function attr(buf, loc, sz) { gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, sz, gl.FLOAT, false, 0, 0) }
        attr(pBuf, aPos, 3); attr(sBuf, aScale, 1); attr(spBuf, aSpeed, 1); attr(cBuf, aColor, 3)
        gl.drawArrays(gl.POINTS, 0, count)
      } catch (e) {
        cancelAnimationFrame(raf)
      }
    }

    const onLost = (e) => { e.preventDefault(); cancelAnimationFrame(raf); glCtx = null }
    const onRestored = () => init()
    canvas.addEventListener('webglcontextlost', onLost)
    canvas.addEventListener('webglcontextrestored', onRestored)

    init()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onM = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.current[0] = (e.clientX - r.left) / r.width  * 2 - 1
      mouse.current[1] = -((e.clientY - r.top)  / r.height * 2 - 1)
    }
    window.addEventListener('mousemove', onM, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('mousemove', onM)
      canvas.removeEventListener('webglcontextlost', onLost)
      canvas.removeEventListener('webglcontextrestored', onRestored)
      if (glCtx) glCtx.gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [count])

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
