import { useEffect, useRef, useState, useCallback } from 'react'
import { useLang } from '../../shared/hooks/useLang'
import './VideoHero.css'

const SLIDE_DURATION=8000, CIRC=2*Math.PI*46

const DEFAULT_SLIDES=[
  { videoId:'HvmRX-bCl5Y', title:'Opening GBWC', tag:'GBWC · Institutional Platform', lines:['Global','Businesswomen','Council —','Институциональная','диалоговая платформа'] },
  { videoId:'yLAvCrhiRwM', title:'I Пленарное заседание', tag:'Astana · 2023', lines:['Инфраструктура','развития','women-led','бизнеса'] },
  { videoId:'c8zthz-qD8Y', title:'II Пленарное заседание', tag:'Astana · 2024', lines:['Интеграция','в глобальные','рынки'] },
]

export default function VideoHero() {
  const { resolveCMS } = useLang()
  const [slides, setSlides] = useState(DEFAULT_SLIDES)
  const [cur,  setCur]  = useState(0)
  const [ts,   setTs]   = useState('idle')
  const [rev,  setRev]  = useState(false)
  const [prog, setProg] = useState(0)
  const [tit,  setTit]  = useState(DEFAULT_SLIDES[0].title)
  const [mp,   setMp]   = useState([0,0])

  const players=useRef([]), afRef=useRef(0), t0=useRef(0), cRef=useRef(0), swRef=useRef(false)

  // Load CMS data
  useEffect(() => {
    fetch('/api/pages/home/hero')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.content?.slides && data.content.slides.length > 0) {
          setSlides(data.content.slides)
          setTit(data.content.slides[0].title)
        }
      })
      .catch(() => {})
  }, [])

  function setQ(p){ try{ const qs=p.getAvailableQualityLevels(); for(const q of['hd2160','hd1440','hd1080','hd720','large']){ if(qs.includes(q)){p.setPlaybackQuality(q);break} } }catch(_){} }

  const startProg=useCallback(()=>{
    t0.current=performance.now(); cancelAnimationFrame(afRef.current)
    const tick=()=>{ const p=Math.min((performance.now()-t0.current)/SLIDE_DURATION,1); setProg(p); if(p>=1){go((cRef.current+1)%slides.length);return}; afRef.current=requestAnimationFrame(tick) }
    afRef.current=requestAnimationFrame(tick)
  },[])

  const go=useCallback((next)=>{
    if(swRef.current||next===cRef.current) return
    swRef.current=true; cancelAnimationFrame(afRef.current)
    const prev=cRef.current; setTs('exit')
    setTimeout(()=>{ setRev(false); setTimeout(()=>{ setRev(true)
      setTimeout(()=>{ cRef.current=next; setCur(next); try{players.current[prev]?.pauseVideo()}catch(_){} ; try{players.current[next]?.seekTo(0); players.current[next]?.playVideo(); setQ(players.current[next])}catch(_){} ; setTimeout(()=>setTit(slides[next].title),200); setTs('enter'); setProg(0) },500)
      setTimeout(()=>{ setRev(false); setTs('idle'); swRef.current=false; startProg() },1200)
    },10) },400)
  },[startProg])

  useEffect(()=>{
    window.onYouTubeIframeAPIReady=()=>{
      slides.forEach((s,i)=>{
        players.current[i]=new window.YT.Player(`yt-${i}`,{
          videoId:s.videoId,
          playerVars:{autoplay:i===0?1:0,mute:1,controls:0,showinfo:0,modestbranding:1,rel:0,loop:1,playlist:s.videoId,playsinline:1,iv_load_policy:3,disablekb:1,fs:0,origin:window.location.origin,vq:'hd2160',hd:1},
          events:{
            onReady:(e)=>{ e.target.mute(); setQ(e.target); if(i===0){e.target.playVideo();startProg()} },
            onStateChange:(e)=>{ if([1,3].includes(e.data)) setQ(e.target) }
          }
        })
      })
    }
    if(!document.querySelector('script[src*="youtube.com/iframe_api"]')){
      const tag=document.createElement('script'); tag.src='https://www.youtube.com/iframe_api'; document.head.appendChild(tag)
    } else if(window.YT?.Player) window.onYouTubeIframeAPIReady()
    return()=>cancelAnimationFrame(afRef.current)
  },[startProg])

  useEffect(()=>{
    const fn=(e)=>setMp([(e.clientX/window.innerWidth-0.5)*2,(e.clientY/window.innerHeight-0.5)*2])
    window.addEventListener('mousemove',fn,{passive:true})
    return()=>window.removeEventListener('mousemove',fn)
  },[])

  const do_=CIRC*(1-prog)

  return (
    <>
      <svg width="0" height="0" style={{position:'absolute'}}>
        <defs><linearGradient id="gg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#b8914a"/><stop offset="100%" stopColor="#e8c96e"/></linearGradient></defs>
      </svg>

      <div className="vh-root">
        {/* WebGL Particle layer */}

        <section className="vh">
          <div className="vh-slides">
            {slides.map((_,i)=>(
              <div key={i} className={`vh-slide${i===cur?' on':''}`}>
                <div className="vh-vid-wrap" style={{transform:`scale(1.07) translate(${mp[0]*-10}px,${mp[1]*-7}px)`}}>
                  <div id={`yt-${i}`} className="vh-yt" />
                </div>
                <div className="vh-overlay"/>
                <div className="vh-grain"/>
              </div>
            ))}
          </div>

          <div className={`vh-mask${rev?' on':''}`}/>

          <div className="vh-content">
            <div className={`vh-text${ts==='exit'?' exit':ts==='enter'?' enter':''}`}>
              <div className="vh-eyebrow">
                <span className="vh-dot"/>
                <span className="vh-etag">{resolveCMS(slides[cur].tag)}</span>
              </div>
              <h1 className="vh-hl">
                {(Array.isArray(slides[cur].lines) ? slides[cur].lines : [slides[cur].lines]).map((l,i)=>(
                  <span key={i} className="vh-line"><span className="vh-li">{resolveCMS(l)}</span></span>
                ))}
              </h1>
              <div className="vh-hl-bar"/>
            </div>

            <div className="vh-scroll-hint">
              <div className="vh-scroll-track"><div className="vh-scroll-dot"/></div>
              <span>Scroll</span>
            </div>

            <button className="vh-next" onClick={()=>go((cur+1)%slides.length)}>
              <svg className="vh-ring" viewBox="0 0 100 100">
                <circle className="vh-ring-bg" cx="50" cy="50" r="46"/>
                <circle className="vh-ring-fg" cx="50" cy="50" r="46" style={{strokeDasharray:CIRC,strokeDashoffset:do_}}/>
              </svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          <div className="vh-bar">
            <div className="vh-bar-left">
              <span className="vh-num">{String(cur+1).padStart(2,'0')}</span>
              <span className="vh-sep">/</span>
              <span className="vh-tot">{String(slides.length).padStart(2,'0')}</span>
              <span className="vh-tit">{resolveCMS(tit)}</span>
            </div>
            <div className="vh-bar-center">
              <button className="vh-watch" onClick={()=>window.open('https://youtube.com/watch?v='+slides[cur].videoId,'_blank')}>
                <span className="vh-play"><svg width="9" height="9" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg></span>
                <span>Посмотреть</span>
              </button>
            </div>
            <div className="vh-pips">
              {slides.map((_,i)=><button key={i} className={`vh-pip${i===cur?' on':''}`} onClick={()=>go(i)}/>)}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
