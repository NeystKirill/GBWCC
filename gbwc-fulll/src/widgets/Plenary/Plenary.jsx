import { useEffect, useRef } from 'react'
import './Plenary.css'

const config = {
  eyebrow: 'Международный форум',
  title: 'Пленарные<br><em>заседания</em>',
  subtitle: 'Три года стратегического диалога на пересечении бизнеса, инвестиций и инноваций.',
  ctaLabel: 'Все мероприятия',
  ctaHref: '/ru/events',
  sessions: [
    {
      year: '2023',
      numeral: 'I',
      descLabel: 'Тема заседания',
      descText: '7 июня 2023 года в Hilton Astana состоялось первое пленарное заседание Глобального совета деловых женщин. В центре дискуссии — новые возможности для бизнеса и инвестиций в условиях меняющейся мировой экономики. В заседании приняли участие Президент ЕБРР Одиль Рено-Бассо, вице-президент Всемирного банка Антонелла Бассани, представители Baker McKenzie, Citi и Председатель Парламентской ассамблеи ОБСЕ.',
      images: [
        '/img/events/p1/plenar1_5_main.jpg',
        '/img/events/p1/plenar1_2.jpg',
        '/img/events/p1/plenar1_3.jpg',
        '/img/events/p1/plenar1_6.jpg',
        '/img/events/p1/plenar1_7.jpg',
      ],
    },
    {
      year: '2024',
      numeral: 'II',
      descLabel: 'Тема заседания',
      descText: '31 октября 2024 года во Дворце Независимости в Астане прошло второе пленарное заседание GBWC в рамках 36-го Пленарного заседания Совета иностранных инвесторов. Центральная тема — «Зелёные и социальные инвестиции. Развитие малого и среднего бизнеса». На площадке собрались ведущие женщины-политики, инвесторы и представители международных организаций из Центральной Азии, Европы, Персидского залива и Юго-Восточной Азии.',
      images: [
        '/img/events/p2/plenar2_3.jpg',
        '/img/events/p2/plenar2_4.jpg',
        '/img/events/p2/plenar2_6.jpg',
        '/img/events/p2/plenar2_7.jpg',
        '/img/events/p2/plenar2_9.jpg',
      ],
    },
    {
      year: '2025',
      numeral: 'III',
      descLabel: 'Тема заседания',
      descText: '24 июня 2025 года в Астане состоялось третье заседание GBWC, собравшее руководителей транснациональных корпораций, международных институтов и правительственных структур. В фокусе — роль женщин в формировании устойчивой глобальной повестки: социальные инвестиции, цифровое развитие и международное сотрудничество. Спикеры из Air Liquide, Baker McKenzie и ЕБРР представили конкретные кейсы.',
      images: [
        '/img/events/p3/plenar3_7.jpg',
        '/img/events/p3/plenar3_3.jpg',
        '/img/events/p3/plenar3_4.jpg',
        '/img/events/p3/plenar3_5.jpg',
        '/img/events/p3/plenar3_9.jpg',
      ],
    },
  ],
}

function Carousel({ session, carId }) {
  const currentRef = useRef(0)
  const timerRef = useRef(null)
  const carRef = useRef(null)
  const touchXRef = useRef(0)

  useEffect(() => {
    const car = carRef.current
    if (!car) return
    const slides = Array.from(car.querySelectorAll('.pl-slide'))
    const dots = Array.from(car.querySelectorAll('.pl-d'))
    const curEl = car.querySelector('.pl-cnt-cur')

    function goTo(n) {
      const next = ((n % slides.length) + slides.length) % slides.length
      if (next === currentRef.current) return
      slides[currentRef.current].classList.remove('pl-act')
      slides[currentRef.current].classList.add('pl-out')
      const old = slides[currentRef.current]
      setTimeout(() => old.classList.remove('pl-out'), 900)
      currentRef.current = next
      slides[currentRef.current].classList.add('pl-act')
      dots.forEach((d, i) => d.classList.toggle('pl-da', i === currentRef.current))
      if (curEl) curEl.textContent = String(currentRef.current + 1)
    }

    const startAuto = () => {
      clearInterval(timerRef.current)
      timerRef.current = setInterval(() => goTo(currentRef.current + 1), 4000)
    }
    const stopAuto = () => clearInterval(timerRef.current)

    car.querySelectorAll('.pl-arr').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation()
        goTo(currentRef.current + parseInt(btn.dataset.dir))
        startAuto()
      })
    })
    dots.forEach((d, i) => {
      d.addEventListener('click', e => { e.stopPropagation(); goTo(i); startAuto() })
    })
    car.addEventListener('mouseenter', stopAuto)
    car.addEventListener('mouseleave', startAuto)
    car.addEventListener('touchstart', e => { touchXRef.current = e.touches[0].clientX }, { passive: true })
    car.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchXRef.current
      if (Math.abs(dx) > 44) { goTo(currentRef.current + (dx < 0 ? 1 : -1)); startAuto() }
    }, { passive: true })

    startAuto()
    return () => clearInterval(timerRef.current)
  }, [])

  return (
    <div className="pl-car" id={carId} ref={carRef}>
      <div className="pl-track">
        {session.images.map((src, i) => (
          <figure key={i} className={`pl-slide${i === 0 ? ' pl-act' : ''}`}>
            <img src={src} alt={`${session.year} пленарное заседание`} />
          </figure>
        ))}
      </div>
      <div className="pl-ovl" />
      <div className="pl-cnt"><span className="pl-cnt-cur">1</span>&thinsp;/&thinsp;{session.images.length}</div>
      <div className="pl-ctrls">
        <button className="pl-arr" data-dir="-1" aria-label="Назад">&#8592;</button>
        <div className="pl-dots">
          {session.images.map((_, i) => (
            <button key={i} className={`pl-d${i === 0 ? ' pl-da' : ''}`} />
          ))}
        </div>
        <button className="pl-arr" data-dir="1" aria-label="Вперёд">&#8594;</button>
      </div>
    </div>
  )
}

function SessionCard({ session }) {
  return (
    <>
      <div className="pl-card">
        <span className="pl-c-corner pl-c-tl" />
        <span className="pl-c-corner pl-c-br" />
        <div className="pl-c-eye">Plenary Session</div>
        <div className="pl-c-num">{session.numeral}</div>
        <div className="pl-c-sub">Пленарное заседание</div>
        <div className="pl-c-ybg" aria-hidden="true">{session.year}</div>
      </div>
      <div className="pl-desc">
        <span className="pl-desc-lbl">{session.descLabel}</span>
        <p className="pl-desc-txt">{session.descText}</p>
      </div>
    </>
  )
}

export default function Plenary() {
  const ribbonsRef = useRef([])

  useEffect(() => {
    const ribbons = ribbonsRef.current.filter(Boolean)
    if (!window.IntersectionObserver) {
      ribbons.forEach(r => r.classList.add('pl-vis'))
      return
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        const idx = parseInt(e.target.dataset.plr ?? '1') - 1
        setTimeout(() => e.target.classList.add('pl-vis'), idx * 180)
        io.unobserve(e.target)
      })
    }, { threshold: 0.1 })
    ribbons.forEach(r => io.observe(r))
    return () => io.disconnect()
  }, [])

  return (
    <section id="plenary-section">
      <div className="pl-grad" aria-hidden="true" />
      <div className="pl-grid" aria-hidden="true" />
      <header className="pl-hdr">
        <div className="pl-eyebrow">{config.eyebrow}</div>
        <h2 className="pl-ttl" dangerouslySetInnerHTML={{ __html: config.title }} />
        <p className="pl-sub">{config.subtitle}</p>
      </header>
      <div className="pl-wrap">
        <div className="pl-spine" aria-hidden="true" />
        {config.sessions.map((session, idx) => {
          const isEven = idx % 2 === 1
          const carId = `car-${idx + 1}`
          const carousel = <Carousel session={session} carId={carId} />
          const card = <SessionCard session={session} />
          const left = isEven ? card : carousel
          const right = isEven ? carousel : card
          return (
            <div
              key={idx}
              className={`pl-ribbon${isEven ? ' pl-even' : ''}`}
              data-plr={idx + 1}
              ref={el => ribbonsRef.current[idx] = el}
            >
              <span className="pl-hline pl-hline-l" aria-hidden="true" />
              <span className="pl-hline pl-hline-r" aria-hidden="true" />
              <div className="pl-left">{left}</div>
              <div className="pl-mid" aria-hidden="true">
                <div className="pl-dot" />
                <div className="pl-yr">{session.year}</div>
              </div>
              <div className="pl-right">{right}</div>
            </div>
          )
        })}
      </div>
      <div className="pl-cta">
        <a href={config.ctaHref} className="pl-cta-btn">
          <span>{config.ctaLabel}</span>
          <span className="plarr" aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}
