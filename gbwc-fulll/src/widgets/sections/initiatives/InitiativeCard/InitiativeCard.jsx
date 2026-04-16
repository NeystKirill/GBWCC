import '../initiatives.css'

/* ── SVG visual panels — one per initiative, using brand colors ── */
const VISUALS = {
  gindex: (
    <svg viewBox="0 0 380 480" xmlns="http://www.w3.org/2000/svg" className="init2-svg">
      <rect width="380" height="480" fill="#0d1b3e"/>
      {/* grid lines */}
      {[60,120,180,240,300,360,420].map(y => <line key={y} x1="0" y1={y} x2="380" y2={y} stroke="rgba(184,145,74,.07)" strokeWidth="1"/>)}
      {[76,152,228,304].map(x => <line key={x} x1={x} y1="0" x2={x} y2="480" stroke="rgba(184,145,74,.07)" strokeWidth="1"/>)}
      {/* big index number */}
      <text x="190" y="270" textAnchor="middle" fontFamily="sans-serif" fontSize="200" fontWeight="200"
        fill="rgba(184,145,74,.07)" letterSpacing="-10">G</text>
      {/* ascending bar chart */}
      {[
        {x:52,  h:80,  o:'.4'},
        {x:108, h:130, o:'.5'},
        {x:164, h:180, o:'.65'},
        {x:220, h:240, o:'.8'},
        {x:276, h:300, o:'1'},
      ].map((b,i) => (
        <rect key={i} x={b.x} y={480-b.h-60} width="44" height={b.h}
          fill={`rgba(184,145,74,${b.o})`} rx="2"/>
      ))}
      {/* gold line */}
      <line x1="40" y1="420" x2="340" y2="420" stroke="rgba(184,145,74,.3)" strokeWidth="1"/>
      {/* label */}
      <text x="40" y="456" fontFamily="sans-serif" fontSize="11" fontWeight="700"
        fill="rgba(184,145,74,.6)" letterSpacing="3">G-INDEX</text>
      {/* corner ornament */}
      <rect x="18" y="18" width="32" height="1.5" fill="#b8914a" opacity=".6"/>
      <rect x="18" y="18" width="1.5" height="32" fill="#b8914a" opacity=".6"/>
      <rect x="330" y="460" width="32" height="1.5" fill="#b8914a" opacity=".6"/>
      <rect x="361.5" y="429" width="1.5" height="32" fill="#b8914a" opacity=".6"/>
    </svg>
  ),

  hub: (
    <svg viewBox="0 0 380 480" xmlns="http://www.w3.org/2000/svg" className="init2-svg">
      <rect width="380" height="480" fill="#0d1b3e"/>
      {/* Concentric circles — network/hub metaphor */}
      {[180,140,100,60,30].map((r,i) => (
        <circle key={i} cx="190" cy="220" r={r}
          fill="none" stroke="rgba(184,145,74,.12)" strokeWidth="1"/>
      ))}
      {/* Hub node */}
      <circle cx="190" cy="220" r="12" fill="#b8914a" opacity=".9"/>
      {/* Satellite nodes with connecting lines */}
      {[
        {cx:190, cy:80},  {cx:310, cy:160}, {cx:310, cy:280},
        {cx:190, cy:360}, {cx:70,  cy:280}, {cx:70,  cy:160},
      ].map((n,i) => (
        <g key={i}>
          <line x1="190" y1="220" x2={n.cx} y2={n.cy}
            stroke="rgba(184,145,74,.25)" strokeWidth="1" strokeDasharray="4 4"/>
          <circle cx={n.cx} cy={n.cy} r="7" fill="rgba(184,145,74,.45)"/>
        </g>
      ))}
      {/* Label */}
      <text x="40" y="440" fontFamily="sans-serif" fontSize="11" fontWeight="700"
        fill="rgba(184,145,74,.6)" letterSpacing="3">G-INDEX HUB</text>
      <text x="40" y="458" fontFamily="sans-serif" fontSize="9"
        fill="rgba(255,255,255,.2)" letterSpacing="1">hub.gbwc.org</text>
      <rect x="18" y="18" width="32" height="1.5" fill="#b8914a" opacity=".6"/>
      <rect x="18" y="18" width="1.5" height="32" fill="#b8914a" opacity=".6"/>
      <rect x="330" y="460" width="32" height="1.5" fill="#b8914a" opacity=".6"/>
      <rect x="361.5" y="429" width="1.5" height="32" fill="#b8914a" opacity=".6"/>
    </svg>
  ),

  academy: (
    <svg viewBox="0 0 380 480" xmlns="http://www.w3.org/2000/svg" className="init2-svg">
      <rect width="380" height="480" fill="#0d1b3e"/>
      {/* Mortarboard silhouette — education */}
      <polygon points="190,100 320,165 190,230 60,165" fill="rgba(184,145,74,.12)" stroke="rgba(184,145,74,.3)" strokeWidth="1.5"/>
      <line x1="190" y1="100" x2="190" y2="230" stroke="rgba(184,145,74,.15)" strokeWidth="1"/>
      {/* Tassel */}
      <line x1="320" y1="165" x2="320" y2="230" stroke="rgba(184,145,74,.5)" strokeWidth="2"/>
      <circle cx="320" cy="238" r="5" fill="#b8914a" opacity=".7"/>
      {/* Steps / staircase — progress */}
      {[0,1,2,3].map(i => (
        <rect key={i} x={80+i*52} y={320-i*36} width="48" height={36*(i+1)}
          fill="rgba(184,145,74,.1)" stroke="rgba(184,145,74,.2)" strokeWidth="1" rx="1"/>
      ))}
      {/* Stars */}
      {[[90,290],[170,260],[250,270],[330,250]].map(([cx,cy],i) => (
        <text key={i} x={cx} y={cy} textAnchor="middle"
          fontFamily="sans-serif" fontSize="14" fill="rgba(184,145,74,.5)">★</text>
      ))}
      <text x="40" y="456" fontFamily="sans-serif" fontSize="11" fontWeight="700"
        fill="rgba(184,145,74,.6)" letterSpacing="3">G-INDEX ACADEMY</text>
      <rect x="18" y="18" width="32" height="1.5" fill="#b8914a" opacity=".6"/>
      <rect x="18" y="18" width="1.5" height="32" fill="#b8914a" opacity=".6"/>
      <rect x="330" y="460" width="32" height="1.5" fill="#b8914a" opacity=".6"/>
      <rect x="361.5" y="429" width="1.5" height="32" fill="#b8914a" opacity=".6"/>
    </svg>
  ),

  itaiel: (
    <svg viewBox="0 0 380 480" xmlns="http://www.w3.org/2000/svg" className="init2-svg">
      <rect width="380" height="480" fill="#0d1b3e"/>
      {/* Circuit board pattern */}
      {[[60,120],[120,80],[180,160],[240,100],[300,140],[140,240],[200,200],[260,260],[80,300],[320,280]].map(([x,y],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="5" fill="rgba(184,145,74,.4)"/>
          <circle cx={x} cy={y} r="10" fill="none" stroke="rgba(184,145,74,.15)" strokeWidth="1"/>
        </g>
      ))}
      {/* Connecting lines */}
      {[[60,120,120,80],[120,80,180,160],[180,160,240,100],[240,100,300,140],
        [140,240,200,200],[200,200,260,260],[60,120,80,300],[300,140,320,280]].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="rgba(184,145,74,.2)" strokeWidth="1.5"/>
      ))}
      {/* Big stat */}
      <text x="190" y="390" textAnchor="middle" fontFamily="sans-serif" fontSize="72" fontWeight="200"
        fill="rgba(184,145,74,.8)" letterSpacing="-2">4100+</text>
      <text x="190" y="415" textAnchor="middle" fontFamily="sans-serif" fontSize="10"
        fill="rgba(255,255,255,.3)" letterSpacing="3">УЧАСТНИЦ</text>
      <text x="40" y="456" fontFamily="sans-serif" fontSize="11" fontWeight="700"
        fill="rgba(184,145,74,.6)" letterSpacing="3">IT-AIEL</text>
      <rect x="18" y="18" width="32" height="1.5" fill="#b8914a" opacity=".6"/>
      <rect x="18" y="18" width="1.5" height="32" fill="#b8914a" opacity=".6"/>
      <rect x="330" y="460" width="32" height="1.5" fill="#b8914a" opacity=".6"/>
      <rect x="361.5" y="429" width="1.5" height="32" fill="#b8914a" opacity=".6"/>
    </svg>
  ),

  social: (
    <svg viewBox="0 0 380 480" xmlns="http://www.w3.org/2000/svg" className="init2-svg">
      <rect width="380" height="480" fill="#0d1b3e"/>
      {/* Map of Kazakhstan — simplified */}
      <path d="M80,200 Q100,160 150,155 Q200,150 230,170 Q270,155 300,175 Q330,190 320,220
               Q340,240 320,260 Q300,290 270,280 Q250,310 220,300 Q190,330 160,310
               Q130,320 110,295 Q80,280 75,250 Z"
        fill="rgba(184,145,74,.08)" stroke="rgba(184,145,74,.3)" strokeWidth="1.5"/>
      {/* 3 region dots */}
      {[[150,210,'Акмолинская'],[200,185,'СКО'],[260,240,'Улытауская']].map(([cx,cy,name],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="8" fill="rgba(184,145,74,.5)"/>
          <circle cx={cx} cy={cy} r="16" fill="none" stroke="rgba(184,145,74,.2)" strokeWidth="1">
            <animate attributeName="r" from="8" to="24" dur="3s" repeatCount="indefinite" begin={`${i}s`}/>
            <animate attributeName="opacity" from="0.4" to="0" dur="3s" repeatCount="indefinite" begin={`${i}s`}/>
          </circle>
          <text x={cx} y={cy+30} textAnchor="middle" fontFamily="sans-serif"
            fontSize="8" fill="rgba(255,255,255,.35)">{name}</text>
        </g>
      ))}
      {/* Stat */}
      <text x="190" y="390" textAnchor="middle" fontFamily="sans-serif" fontSize="52" fontWeight="200"
        fill="rgba(184,145,74,.75)" letterSpacing="-1">3 центра</text>
      <text x="190" y="415" textAnchor="middle" fontFamily="sans-serif" fontSize="10"
        fill="rgba(255,255,255,.3)" letterSpacing="2">ПИЛОТНЫХ РЕГИОНА</text>
      <text x="40" y="456" fontFamily="sans-serif" fontSize="11" fontWeight="700"
        fill="rgba(184,145,74,.6)" letterSpacing="3">ПОДДЕРЖКА СЕМЬИ</text>
      <rect x="18" y="18" width="32" height="1.5" fill="#b8914a" opacity=".6"/>
      <rect x="18" y="18" width="1.5" height="32" fill="#b8914a" opacity=".6"/>
      <rect x="330" y="460" width="32" height="1.5" fill="#b8914a" opacity=".6"/>
      <rect x="361.5" y="429" width="1.5" height="32" fill="#b8914a" opacity=".6"/>
    </svg>
  ),

  culture: (
    <svg viewBox="0 0 380 480" xmlns="http://www.w3.org/2000/svg" className="init2-svg">
      <rect width="380" height="480" fill="#0d1b3e"/>
      {/* St Peter's Basilica silhouette */}
      <g opacity=".25" fill="rgba(184,145,74,1)">
        {/* dome */}
        <ellipse cx="190" cy="200" rx="65" ry="20"/>
        <rect x="130" y="200" width="120" height="10"/>
        {/* drum */}
        <rect x="155" y="130" width="70" height="80"/>
        {/* cross */}
        <rect x="187" y="100" width="6" height="40"/>
        <rect x="178" y="115" width="24" height="5"/>
        {/* colonnade */}
        {[-100,-70,-40,-10,10,40,70,100].map(dx => (
          <rect key={dx} x={190+dx-4} y={280} width="8" height="80"/>
        ))}
        <rect x="70" y="275" width="240" height="12"/>
        {/* facade */}
        <rect x="145" y="210" width="90" height="70"/>
        {/* door */}
        <rect x="175" y="250" width="30" height="30"/>
      </g>
      {/* musical notes */}
      {[[80,160,'♪'],[300,140,'♫'],[100,350,'♩'],[290,330,'♬']].map(([x,y,n],i) => (
        <text key={i} x={x} y={y} fontFamily="serif" fontSize="28"
          fill="rgba(184,145,74,.35)">{n}</text>
      ))}
      {/* Vatican / KZ connection */}
      <line x1="80" y1="420" x2="300" y2="420" stroke="rgba(184,145,74,.2)" strokeWidth="1" strokeDasharray="4 3"/>
      <text x="80" y="415" fontFamily="sans-serif" fontSize="9" fill="rgba(255,255,255,.25)">АСТАНА</text>
      <text x="250" y="415" fontFamily="sans-serif" fontSize="9" fill="rgba(255,255,255,.25)">ВАТИКАН</text>
      <circle cx="80" cy="420" r="3" fill="#b8914a" opacity=".6"/>
      <circle cx="300" cy="420" r="3" fill="#b8914a" opacity=".6"/>
      <text x="40" y="460" fontFamily="sans-serif" fontSize="11" fontWeight="700"
        fill="rgba(184,145,74,.6)" letterSpacing="2">КУЛЬТУРНАЯ ДИПЛОМАТИЯ</text>
      <rect x="18" y="18" width="32" height="1.5" fill="#b8914a" opacity=".6"/>
      <rect x="18" y="18" width="1.5" height="32" fill="#b8914a" opacity=".6"/>
      <rect x="330" y="460" width="32" height="1.5" fill="#b8914a" opacity=".6"/>
      <rect x="361.5" y="429" width="1.5" height="32" fill="#b8914a" opacity=".6"/>
    </svg>
  ),
}

/* Fallback generic visual */
function GenericVisual({ num, tag }) {
  return (
    <svg viewBox="0 0 380 480" xmlns="http://www.w3.org/2000/svg" className="init2-svg">
      <rect width="380" height="480" fill="#0d1b3e"/>
      <text x="190" y="280" textAnchor="middle" fontFamily="sans-serif" fontSize="180" fontWeight="200"
        fill="rgba(184,145,74,.07)" letterSpacing="-8">{num}</text>
      <text x="40" y="456" fontFamily="sans-serif" fontSize="11" fontWeight="700"
        fill="rgba(184,145,74,.6)" letterSpacing="3">{tag}</text>
      <rect x="18" y="18" width="32" height="1.5" fill="#b8914a" opacity=".6"/>
      <rect x="18" y="18" width="1.5" height="32" fill="#b8914a" opacity=".6"/>
      <rect x="330" y="460" width="32" height="1.5" fill="#b8914a" opacity=".6"/>
      <rect x="361.5" y="429" width="1.5" height="32" fill="#b8914a" opacity=".6"/>
    </svg>
  )
}

export default function InitiativeCard({ item, idx, tasksLabel }) {
  const rev = idx % 2 === 1
  const visual = VISUALS[item.id] || <GenericVisual num={item.num} tag={item.tag} />

  return (
    <div id={`initiative-${item.id}`} className={`init2-block${rev ? ' init2-block--reversed' : ''}`}>

      {/* ── Visual panel — SVG illustration ── */}
      <div className="init2-visual-side">
        {visual}
      </div>

      {/* ── Text side ── */}
      <div className="init2-text-side">
        <div className="init2-text-eyebrow">
          <span className="init2-text-dot" />
          {item.tag}
        </div>
        <div className="init2-text-num">{item.num}</div>
        <h2 className="init2-text-title">{item.title}</h2>
        <div className="init2-ornament"><span className="init2-ornament-gem" /></div>
        <p className="init2-text-desc">{item.desc}</p>
        {item.details && <p className="init2-text-details">{item.details}</p>}

        <div className="init2-tasks">
          <div className="init2-tasks-label">{tasksLabel}</div>
          <ul className="init2-tasks-list">
            {item.tasks.map((task, i) => (
              <li key={i} className="init2-task-item">
                <span className="init2-task-dot" />{task}
              </li>
            ))}
          </ul>
        </div>

        {item.stats && (
          <div className="init2-stats-row">
            {item.stats.map((s, i) => (
              <div key={i} className="init2-stat">
                <span className="init2-stat-val">{s.val}</span>
                <span className="init2-stat-key">{s.key}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
