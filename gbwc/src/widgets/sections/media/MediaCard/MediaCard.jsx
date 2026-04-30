import { useState, useEffect } from 'react'
import '../media.css'

const SOURCE_META = {
  'The Astana Times': { bg: ['#0a1628','#12224a'], accent: '#c9a96e', abbr: 'AT',  lang: 'EN' },
  'Silkway TV':       { bg: ['#0f1830','#1a2d50'], accent: '#b8914a', abbr: 'SW',  lang: 'KZ' },
  '24KZ':             { bg: ['#0d1b3e','#162850'], accent: '#d4a85a', abbr: '24',  lang: 'KZ' },
  '365info':          { bg: ['#0a1525','#0f2040'], accent: '#c9a96e', abbr: '365', lang: 'KZ' },
  'Inform.kz':        { bg: ['#0d1b3e','#14244e'], accent: '#b8914a', abbr: 'INF', lang: 'KZ' },
  'BaigeNews':        { bg: ['#111e3a','#1a2d52'], accent: '#c9a96e', abbr: 'BN',  lang: 'KZ' },
  'Jas.kz':           { bg: ['#0e1d3c','#162d55'], accent: '#b8914a', abbr: 'JAS', lang: 'KK' },
  'Jarialke.kz':      { bg: ['#0c1a38','#142848'], accent: '#c9a96e', abbr: 'JAR', lang: 'KK' },
}

function CoverPattern({ idx, accent }) {
  const a = accent
  switch (idx % 6) {
    case 0: return (<>
      <circle cx="300" cy="80" r="90" fill="none" stroke={`${a}18`} strokeWidth="1"/>
      <circle cx="300" cy="80" r="55" fill="none" stroke={`${a}12`} strokeWidth="1"/>
      <circle cx="300" cy="80" r="22" fill={`${a}20`}/>
    </>)
    case 1: return (<>
      {[0,1,2,3].map(i => <rect key={i} x={40+i*54} y={180-i*38-30} width="44" height={i*38+30} fill={a} opacity={0.08+i*0.04} rx="2"/>)}
      <line x1="30" y1="185" x2="310" y2="185" stroke={`${a}20`} strokeWidth="1"/>
    </>)
    case 2: return (<>
      {[[60,50],[140,30],[220,70],[300,40],[380,60]].map(([x,y],i,arr) =>
        i<arr.length-1 ? <line key={i} x1={x} y1={y} x2={arr[i+1][0]} y2={arr[i+1][1]} stroke={`${a}35`} strokeWidth="1.5"/> : null
      )}
      {[[60,50],[140,30],[220,70],[300,40]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="5" fill={a} opacity=".45"/>)}
    </>)
    case 3: return (<>
      <polygon points="200,20 360,110 360,200 40,200 40,110" fill="none" stroke={`${a}12`} strokeWidth="1"/>
      <circle cx="200" cy="110" r="18" fill={`${a}20`}/>
    </>)
    case 4: return (
      <text x="200" y="125" textAnchor="middle" fontFamily="sans-serif" fontSize="88" fontWeight="200" fill={`${a}08`} letterSpacing="-4">GBWC</text>
    )
    default: return (<>
      {[0,1,2].map(i => <circle key={i} cx={120+i*80} cy="100" r={20+i*18} fill="none" stroke={`${a}${18-i*4}`} strokeWidth="1"/>)}
    </>)
  }
}

function SvgPlaceholder({ source, idx, m }) {
  const [bg0, bg1] = m.bg
  const svgId = `mg${idx}`
  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"
      className="med-card-cover-svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={svgId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={bg0}/><stop offset="100%" stopColor={bg1}/>
        </linearGradient>
        <linearGradient id={`${svgId}g`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="40%" stopColor={m.accent}/><stop offset="60%" stopColor={m.accent}/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill={`url(#${svgId})`}/>
      <CoverPattern idx={idx} accent={m.accent}/>
      <rect x="0" y="0" width="400" height="2" fill={`url(#${svgId}g)`} opacity=".8"/>
      <rect x="14" y="14" width="20" height="1.5" fill={m.accent} opacity=".5"/>
      <rect x="14" y="14" width="1.5" height="20" fill={m.accent} opacity=".5"/>
      <rect x="366" y="184" width="20" height="1.5" fill={m.accent} opacity=".5"/>
      <rect x="385.5" y="164" width="1.5" height="20" fill={m.accent} opacity=".5"/>
      <text x="16" y="178" fontFamily="sans-serif" fontSize="13" fontWeight="800"
        fill={m.accent} opacity=".9" letterSpacing="1">{source.toUpperCase()}</text>
      <rect x="355" y="12" width="32" height="16" rx="2" fill={m.accent} opacity=".2"/>
      <text x="371" y="23.5" textAnchor="middle" fontFamily="sans-serif"
        fontSize="9" fontWeight="700" fill={m.accent} letterSpacing="1">{m.lang}</text>
    </svg>
  )
}

/* Fetch OG image via allorigins CORS proxy */
function useOgImage(url, knownImage) {
  const [imgSrc, setImgSrc] = useState(knownImage || null)
  const [loading, setLoading] = useState(!knownImage)

  useEffect(() => {
    if (knownImage || imgSrc || !url || url === '#') { setLoading(false); return }
    
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
    
    fetch(proxy, { signal: controller.signal })
      .then(r => {
        if (!r.ok) throw new Error('Proxy error');
        return r.json();
      })
      .then(data => {
        const html = data.contents || ''
        const m = html.match(/og:image[^>]+content="([^"]+)"/i)
          || html.match(/content="([^"]+)"[^>]+og:image/i)
          || html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i)
        if (m?.[1]) setImgSrc(m[1])
      })
      .catch(() => {
        // Silently fail, SvgPlaceholder will be shown
      })
      .finally(() => {
        clearTimeout(timer);
        setLoading(false);
      });

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [url, knownImage])

  return { imgSrc, loading }
}

export default function MediaCard({ article, lang, readLabel, idx = 0 }) {
  const sourceName = article.source || 'GBWC'
  const m = SOURCE_META[sourceName] || SOURCE_META['Inform.kz']
  const { imgSrc, loading } = useOgImage(article.url, article.image || null)

  const displayTitle = typeof article.title === 'object' 
    ? (article.title[lang] || article.title.ru || '') 
    : (article.title || '')

  const displayDate = typeof article.date === 'object' 
    ? (article.date[lang] || article.date.ru || '') 
    : (article.date || '')

  return (
    <a href={article.url} target="_blank" rel="noreferrer" className="med-card">

      {/* ── Cover ── */}
      <div className="med-card-cover">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={sourceName}
            className="med-card-cover-img"
            onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='block' }}
          />
        ) : null}

        {/* SVG fallback — shown when no image or loading */}
        <div className="med-card-cover-svg-wrap" style={{ display: imgSrc ? 'none' : 'block' }}>
          <SvgPlaceholder source={sourceName} idx={idx} m={m}/>
        </div>

        {/* Source label overlay (always visible) */}
        <div className="med-card-cover-bar">
          <span className="med-card-cover-source" style={{ color: m.accent }}>
            {sourceName}
          </span>
          <span className="med-card-cover-date">
            {displayDate}
          </span>
        </div>
      </div>

      {/* ── Text body ── */}
      <div className="med-card-body">
        <h3 className="med-card-title">
          {displayTitle}
        </h3>
        <span className="med-card-read" style={{ color: m.accent }}>
          {readLabel} →
        </span>
      </div>
    </a>
  )
}
