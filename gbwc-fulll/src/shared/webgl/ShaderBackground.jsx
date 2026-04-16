import { useEffect, useRef } from 'react'

const VERT = `attribute vec2 p; void main(){ gl_Position=vec4(p,0.,1.); }`
const FRAG = `
precision mediump float;
uniform vec2 uRes; uniform float uTime; uniform vec3 uC1,uC2,uC3; uniform float uInt;

vec3 permute(vec3 x){return mod(((x*34.)+1.)*x,289.);}
float snoise(vec2 v){
  const vec4 C=vec4(0.211324865,0.366025403,-0.577350269,0.024390243);
  vec2 i=floor(v+dot(v,C.yy)); vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1,0):vec2(0,1);
  vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
  i=mod(i,289.); vec3 p=permute(permute(i.y+vec3(0,i1.y,1))+i.x+vec3(0,i1.x,1));
  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
  m=m*m; m=m*m;
  vec3 x2=2.*fract(p*C.www)-1.; vec3 h=abs(x2)-0.5; vec3 ox=floor(x2+0.5); vec3 a0=x2-ox;
  m*=1.79284291-0.85373472*(a0*a0+h*h);
  vec3 g; g.x=a0.x*x0.x+h.x*x0.y; g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.*dot(m,g);
}

void main(){
  vec2 uv=gl_FragCoord.xy/uRes;
  float t=uTime*0.055;
  float n = snoise(uv*2.0+t)*0.50 + snoise(uv*4.1-t*1.3)*0.25
          + snoise(uv*8.3+t*0.7)*0.125 + snoise(uv*16.6-t*0.4)*0.0625;
  n=n*0.5+0.5;
  float g1=exp(-length(uv-vec2(0.85,0.15))*4.0)*0.22*uInt;
  float g2=exp(-length(uv-vec2(0.12,0.92))*3.5)*0.15*uInt;
  vec2 vig=uv*2.-1.;
  float vign=1.-dot(vig,vig)*0.32;
  vec3 col=mix(uC1,uC2,n*0.55);
  col+=uC3*g1*0.7; col+=uC2*g2*0.3;
  col*=vign;
  gl_FragColor=vec4(col,1.);
}
`

function buildGL(canvas, color1, color2, color3, intensity) {
  const gl = canvas.getContext('webgl', { alpha: true, powerPreference: 'low-power' })
  if (!gl) return null

  function mk(t, s) { const sh = gl.createShader(t); gl.shaderSource(sh, s); gl.compileShader(sh); return sh }
  const prog = gl.createProgram()
  gl.attachShader(prog, mk(gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, mk(gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null
  gl.useProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW)
  const ap = gl.getAttribLocation(prog, 'p')
  gl.enableVertexAttribArray(ap)
  gl.vertexAttribPointer(ap, 2, gl.FLOAT, false, 0, 0)

  const uRes  = gl.getUniformLocation(prog, 'uRes')
  const uTime = gl.getUniformLocation(prog, 'uTime')
  const uC1   = gl.getUniformLocation(prog, 'uC1')
  const uC2   = gl.getUniformLocation(prog, 'uC2')
  const uC3   = gl.getUniformLocation(prog, 'uC3')
  const uInt  = gl.getUniformLocation(prog, 'uInt')

  gl.uniform3fv(uC1, color1)
  gl.uniform3fv(uC2, color2)
  gl.uniform3fv(uC3, color3)
  gl.uniform1f(uInt, intensity)

  return { gl, uRes, uTime }
}

export default function ShaderBackground({
  style, className,
  intensity = 1.0,
  color1 = [0.024, 0.063, 0.122],
  color2 = [0.051, 0.106, 0.243],
  color3 = [0.72,  0.57,  0.29],
}) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    let raf = 0
    let ctx = null
    let w = 0, h = 0
    const t0 = performance.now()

    function resize() {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      const pr = Math.min(devicePixelRatio, 1.5)
      canvas.width  = Math.max(1, Math.round(w * pr))
      canvas.height = Math.max(1, Math.round(h * pr))
      if (ctx) {
        ctx.gl.viewport(0, 0, canvas.width, canvas.height)
        ctx.gl.uniform2f(ctx.uRes, canvas.width, canvas.height)
      }
    }

    function init() {
      ctx = buildGL(canvas, color1, color2, color3, intensity)
      if (!ctx) return
      resize()
      draw()
    }

    function draw() {
      if (!ctx) return
      raf = requestAnimationFrame(draw)
      try {
        ctx.gl.uniform1f(ctx.uTime, (performance.now() - t0) / 1000)
        ctx.gl.drawArrays(ctx.gl.TRIANGLE_STRIP, 0, 4)
      } catch (e) {
        cancelAnimationFrame(raf)
      }
    }

    // Handle context loss gracefully
    const onLost = (e) => {
      e.preventDefault()
      cancelAnimationFrame(raf)
      ctx = null
    }
    const onRestored = () => {
      init()
    }

    canvas.addEventListener('webglcontextlost', onLost)
    canvas.addEventListener('webglcontextrestored', onRestored)

    init()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('webglcontextlost', onLost)
      canvas.removeEventListener('webglcontextrestored', onRestored)
      if (ctx) ctx.gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}
