import { useEffect, useRef } from 'react'

export function MotionSection({ children,className='',animation='fadeUp',delay=0,duration=0.9,threshold=0.08,once=true,stagger=false,staggerDelay=0.1,style,as:Tag='div' }) {
  const ref = useRef(null)
  useEffect(()=>{
    const el=ref.current; if(!el) return
    const targets=stagger?Array.from(el.children):[el]
    targets.forEach((t,i)=>{
      t.style.transition='none'; t.style.opacity='0'
      if(animation==='fadeUp')    t.style.transform='translateY(48px)'
      if(animation==='fadeDown')  t.style.transform='translateY(-30px)'
      if(animation==='slideLeft') t.style.transform='translateX(60px)'
      if(animation==='slideRight')t.style.transform='translateX(-60px)'
      if(animation==='scale')     t.style.transform='scale(0.88)'
      if(animation==='clip')      { t.style.clipPath='inset(0 100% 0 0)'; t.style.opacity='1' }
    })
    const io=new IntersectionObserver(([e])=>{
      if(e.isIntersecting){
        targets.forEach((t,i)=>{ const d=delay+(stagger?i*staggerDelay:0)
          t.style.transition=`opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${d}s,transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${d}s,clip-path ${duration}s cubic-bezier(0.22,1,0.36,1) ${d}s`
          t.style.opacity='1'; t.style.transform='translate(0,0) scale(1)'
          if(animation==='clip') t.style.clipPath='inset(0 0% 0 0)'
        })
        if(once) io.disconnect()
      }
    },{threshold})
    io.observe(el)
    return ()=>io.disconnect()
  },[animation,delay,duration,threshold,once,stagger,staggerDelay])
  return <Tag ref={ref} className={className} style={style}>{children}</Tag>
}

export function MotionWords({ children,as:Tag='p',className='',delay=0,stagger=0.055,duration=0.8,threshold=0.1,style }) {
  const ref = useRef(null)
  useEffect(()=>{
    const el=ref.current; if(!el) return
    const text=el.textContent; el.innerHTML=''; el.setAttribute('aria-label',text)
    text.split(' ').forEach((w,i)=>{
      const span=document.createElement('span')
      span.textContent=w+' '; span.style.cssText=`display:inline-block;opacity:0;transform:translateY(16px);transition:opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay+i*stagger}s,transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay+i*stagger}s`
      el.appendChild(span)
    })
    const io=new IntersectionObserver(([e])=>{ if(e.isIntersecting){ el.querySelectorAll('span').forEach(s=>{ s.style.opacity='1'; s.style.transform='none' }); io.disconnect() } },{threshold})
    io.observe(el)
    return ()=>io.disconnect()
  },[children,delay,stagger,duration,threshold])
  return <Tag ref={ref} className={className} style={style}>{children}</Tag>
}

export function MotionText({ children,as:Tag='span',className='',delay=0,stagger=0.022,duration=0.65,threshold=0.1,style }) {
  const ref = useRef(null)
  useEffect(()=>{
    const el=ref.current; if(!el) return
    const text=el.textContent; el.innerHTML=''; el.setAttribute('aria-label',text)
    text.split('').forEach((ch,i)=>{
      const span=document.createElement('span')
      span.textContent=ch===' '?'\u00A0':ch
      span.style.cssText=`display:inline-block;opacity:0;transform:translateY(14px) rotate(4deg);transition:opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay+i*stagger}s,transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay+i*stagger}s`
      el.appendChild(span)
    })
    const io=new IntersectionObserver(([e])=>{ if(e.isIntersecting){ el.querySelectorAll('span').forEach(s=>{ s.style.opacity='1'; s.style.transform='none' }); io.disconnect() } },{threshold})
    io.observe(el)
    return ()=>io.disconnect()
  },[children,delay,stagger,duration,threshold])
  return <Tag ref={ref} className={className} style={style}>{children}</Tag>
}

export function TiltCard({ children,className='',style,intensity=10 }) {
  const ref = useRef(null)
  useEffect(()=>{
    const el=ref.current; if(!el) return
    el.style.transformStyle='preserve-3d'; el.style.transition='transform 0.1s ease'
    const onMove=(e)=>{ const r=el.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width-0.5; const y=(e.clientY-r.top)/r.height-0.5; el.style.transform=`perspective(900px) rotateY(${x*intensity}deg) rotateX(${-y*intensity}deg) scale3d(1.02,1.02,1.02)` }
    const onLeave=()=>{ el.style.transition='transform 0.65s cubic-bezier(0.22,1,0.36,1)'; el.style.transform='perspective(900px) rotateY(0) rotateX(0) scale3d(1,1,1)' }
    el.addEventListener('mousemove',onMove); el.addEventListener('mouseleave',onLeave)
    return ()=>{ el.removeEventListener('mousemove',onMove); el.removeEventListener('mouseleave',onLeave) }
  },[intensity])
  return <div ref={ref} className={className} style={style}>{children}</div>
}

export function CountUp({ to, suffix='', duration=2000, delay=0, decimals=0 }) {
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(()=>{
    const el=ref.current; if(!el) return
    el.textContent='0'+(suffix||'')
    const io=new IntersectionObserver(([e])=>{
      if(e.isIntersecting && !started.current){
        started.current=true
        const startTime=performance.now()+delay
        const step=(now)=>{
          const elapsed=Math.max(0,now-startTime)
          const p=Math.min(elapsed/duration,1)
          const ease=1-(1-p)**4
          const val=(ease*to).toFixed(decimals)
          el.textContent=val+(suffix||'')
          if(p<1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        io.disconnect()
      }
    },{threshold:0.3})
    io.observe(el)
    return ()=>io.disconnect()
  },[to,suffix,duration,delay,decimals])
  return <span ref={ref}>0{suffix}</span>
}
