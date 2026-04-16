import { useEffect, useRef, useState } from 'react'
import './GIndex.css'

const subs = [
  {
    cardTitle: 'THE G-INDEX HUB',
    cardBody: 'Единая цифровая инфраструктура для развития women-led enterprises: сертификация, академия, реестр и инвестиционный пайплайн.',
    cardTag: 'Digital Infrastructure',
    eyebrow: 'Платформа',
    title: 'THE G-INDEX HUB',
    ribbon: {
      topText: ['CERTIFICATION', '<span class="accent">REGISTRY</span>', 'ACADEMY', 'ACCESS', 'G-INDEX HUB'],
      middleText: ['VISIBILITY', '<span class="accent">DIGITAL INFRASTRUCTURE</span>', 'CERTIFICATION', 'GROWTH'],
      bottomText: ['TRUST', 'READINESS', '<span class="accent">GROWTH</span>', 'PARTNERSHIPS', 'INVESTMENT PIPELINE'],
    },
    description: 'G-Index Hub — это единая операционная платформа для women-led enterprises, объединяющая сертификацию, обучение, реестр и доступ к рынкам в одном цифровом пространстве.',
    modules: [
      { num: 'Модуль 01', name: 'Certification', desc: 'Независимая верификация готовности предприятия: операционной, финансовой и экспортной.' },
      { num: 'Модуль 02', name: 'Academy', desc: 'Программы обучения и наращивания потенциала для women-led компаний на всех стадиях развития.' },
      { num: 'Модуль 03', name: 'Registry', desc: 'Открытый реестр верифицированных поставщиков — видимость для корпораций и государственных закупщиков.' },
      { num: 'Модуль 04', name: 'Investment Pipeline', desc: 'Прямое подключение к инвесторам, грантовым программам и партнёрским инициативам роста.' },
    ],
    steps: [
      { num: '01', label: 'Apply' },
      { num: '02', label: 'Prepare' },
      { num: '03', label: 'Access' },
    ],
    techPartner: 'iCore',
    metaText: 'hub.gbwc.org &nbsp;·&nbsp; Certification · Academy · Registry · Investment Pipeline',
    ctaLabel: 'Войти в G-Index Hub',
    ctaHref: '/ru/',
  },
  {
    cardTitle: 'БУДУЩИЕ ПРОЕКТЫ',
    cardBody: 'Новые инициативы GBWC: региональные хабы, менторские сети, инвестиционные программы и цифровые продукты для поддержки женского предпринимательства.',
    cardTag: 'Coming Soon',
    eyebrow: 'В разработке',
    title: 'НАШИ БУДУЩИЕ ПРОЕКТЫ',
    ribbon: {
      topText: ['РЕГИОНАЛЬНЫЕ ХАБЫ', '<span class="accent">MENTORSHIP NETWORK</span>', 'IMPACT FUND', 'GLOBAL REGISTRY'],
      middleText: ['ЭКОСИСТЕМА', '<span class="accent">ПАРТНЁРСТВА</span>', 'ЦИФРОВЫЕ ПРОДУКТЫ', 'ИНВЕСТИЦИИ'],
      bottomText: ['GBWC', 'WOMEN-LED', '<span class="accent">БУДУЩИЕ ПРОЕКТЫ</span>', 'НОВЫЕ РЫНКИ', 'РОСТ'],
    },
    description: 'GBWC строит экосистему поддержки женского предпринимательства глобального масштаба. Каждый новый проект усиливает общую инфраструктуру: от региональных хабов и менторских сетей до инвестиционных программ и международного реестра women-led компаний.',
    stats: [
      { num: '30', suffix: '+', label: 'Стран охвата' },
      { num: '5', suffix: 'K+', label: 'Women-led enterprises' },
      { num: '200', suffix: '+', label: 'Партнёров' },
    ],
    modules: [
      { num: 'В разработке', name: 'Региональные хабы', desc: 'Физические и цифровые точки присутствия GBWC в ключевых регионах мира.' },
      { num: 'В разработке', name: 'Mentorship Network', desc: 'Глобальная сеть менторов и наставников для предпринимательниц на всех стадиях роста.' },
      { num: 'В разработке', name: 'Impact Fund', desc: 'Инвестиционный фонд для women-led предприятий с доказанным социальным эффектом.' },
      { num: 'В разработке', name: 'Global Registry', desc: 'Расширенный международный реестр поставщиков с доступом для глобальных корпораций.' },
    ],
    metaText: 'Региональная экспансия · Партнёрские программы · Цифровые продукты · Инвестиции',
  },
]

function buildRibbonCopy(texts) {
  const inner = texts.join(' — ') + ' —'
  return inner + ' ' + inner
}

export default function GIndex() {
  const [cardData, setCardData] = useState({ title: subs[0].cardTitle, body: subs[0].cardBody, tag: subs[0].cardTag })
  const [fading, setFading] = useState(false)
  const subRefs = useRef([])
  const currentCardRef = useRef(-1)

  function updateCard(idx) {
    if (idx === currentCardRef.current) return
    currentCardRef.current = idx
    const sub = subs[idx]
    if (!sub) return
    setFading(true)
    setTimeout(() => {
      setCardData({ title: sub.cardTitle, body: sub.cardBody, tag: sub.cardTag })
      setFading(false)
    }, 350)
  }

  useEffect(() => {
    const els = subRefs.current.filter(Boolean)
    if (!window.IntersectionObserver) {
      els.forEach(s => s.classList.add('gix-vis'))
      updateCard(0)
      return
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('gix-vis')
          updateCard(els.indexOf(e.target))
        }
      })
    }, { threshold: 0.4, rootMargin: '0px 0px -10% 0px' })
    els.forEach(s => io.observe(s))
    updateCard(0)
    return () => io.disconnect()
  }, [])

  return (
    <section className="gindex-editorial-block" id="gindex-hub">
      <div className="gix-sticky-wrap">
        <div className="gix-left-col">
          <div className="gix-logo-wrap">
            <img className="gix-logo-img" src="/img/own/gindex-logo.png" alt="G-Index Hub" />
          </div>
          <div className="gix-sticky-card" id="gix-card">
            <div className="gix-card-label">GBWC · G-INDEX</div>
            <div className={`gix-card-title${fading ? ' fading' : ''}`}>{cardData.title}</div>
            <div className={`gix-card-body${fading ? ' fading' : ''}`}>{cardData.body}</div>
            <div className="gix-card-tag">
              <div className="gix-card-tag-dot" />
              <div className={`gix-card-tag-text${fading ? ' fading' : ''}`}>{cardData.tag}</div>
            </div>
          </div>
        </div>

        <div className="gix-sub-blocks">
          {subs.map((sub, idx) => (
            <div
              key={idx}
              className="gix-sub"
              ref={el => subRefs.current[idx] = el}
            >
              <div className="gix-sub-eyebrow">{sub.eyebrow}</div>
              <h2 className="gix-sub-title">{sub.title}</h2>

              <div className="gindex-ribbon-cluster">
                <div className="gindex-ribbon gindex-ribbon--top">
                  <div className="gindex-ribbon-track">
                    {[0, 1].map(i => (
                      <span key={i} className="gindex-ribbon-copy" dangerouslySetInnerHTML={{ __html: sub.ribbon.topText.join(' &mdash; ') + ' &mdash;' }} />
                    ))}
                  </div>
                </div>
                <div className="gindex-ribbon gindex-ribbon--middle">
                  <div className="gindex-ribbon-track">
                    {[0, 1].map(i => (
                      <span key={i} className="gindex-ribbon-copy" dangerouslySetInnerHTML={{ __html: sub.ribbon.middleText.join(' &mdash; ') + ' &mdash;' }} />
                    ))}
                  </div>
                </div>
                <div className="gindex-ribbon gindex-ribbon--bottom">
                  <div className="gindex-ribbon-track">
                    {[0, 1].map(i => (
                      <span key={i} className="gindex-ribbon-copy" dangerouslySetInnerHTML={{ __html: sub.ribbon.bottomText.join(' &mdash; ') + ' &mdash;' }} />
                    ))}
                  </div>
                </div>
              </div>

              <p className="gindex-description">{sub.description}</p>

              {sub.stats && (
                <div className="gix-stat-row">
                  {sub.stats.map((s, i) => (
                    <div key={i} className="gix-stat-item">
                      <div className="gix-stat-num">{s.num}<span>{s.suffix}</span></div>
                      <div className="gix-stat-lbl">{s.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="gix-modules-grid">
                {sub.modules.map((m, i) => (
                  <div key={i} className="gix-module-card">
                    <div className="gix-module-num">{m.num}</div>
                    <div className="gix-module-name">{m.name}</div>
                    <div className="gix-module-desc">{m.desc}</div>
                  </div>
                ))}
              </div>

              {sub.steps && (
                <div className="gix-steps">
                  {sub.steps.map((s, i) => (
                    <div key={i} className="gix-step">
                      <div className="gix-step-circle">{s.num}</div>
                      <div className="gix-step-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {sub.techPartner && (
                <div className="gix-tech-partner">
                  <div className="gix-tech-partner-label">Технологический партнёр</div>
                  <div className="gix-tech-dot" />
                  <div className="gix-tech-partner-name">{sub.techPartner}</div>
                </div>
              )}

              {sub.metaText && (
                <>
                  <div className="gindex-divider" style={{ marginTop: '28px' }} />
                  <p className="gindex-small-meta" dangerouslySetInnerHTML={{ __html: sub.metaText }} />
                </>
              )}

              {sub.ctaLabel && sub.ctaHref && (
                <a href={sub.ctaHref} className="gix-cta-link">
                  {sub.ctaLabel} <span className="gix-cta-arrow">→</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
