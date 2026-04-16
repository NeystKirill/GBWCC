import { useEffect } from 'react'
import PageLayout    from '../../shared/ui/PageLayout'
import { useLang }   from '../../shared/hooks/useLang'
import { LEADERS }   from '../../entities/founders/founders.data'
import PageHero      from '../../shared/layout/PageHero/PageHero'
import FoundersList  from '../../widgets/sections/founders/FoundersList/FoundersList'
import '../../widgets/sections/founders/founders.css'

const HERO = {
  ru: {
    label: 'GBWC',
    title: 'Руководство',
    desc:  'Совет возглавляют специалисты с обширным опытом в международных финансах, государственном управлении и развитии бизнеса.',
    stats: [
      { value: LEADERS.length, label: 'Членов совета' },
      { value: '3',            label: 'Пленарных заседания' },
      { value: '13+',          label: 'Стран-участников' },
    ],
  },
  en: {
    label: 'GBWC',
    title: 'Leadership',
    desc:  'The Council is led by professionals with extensive experience in international finance, public administration and business development.',
    stats: [
      { value: LEADERS.length, label: 'Council members' },
      { value: '3',            label: 'Plenary sessions' },
      { value: '13+',          label: 'Participating countries' },
    ],
  },
  kk: {
    label: 'GBWC',
    title: 'Басшылық',
    desc:  'Кеңесті халықаралық қаржы, мемлекеттік басқару саласындағы тәжірибелі мамандар басқарады.',
    stats: [
      { value: LEADERS.length, label: 'Кеңес мүшелері' },
      { value: '3',            label: 'Пленарлық отырыс' },
      { value: '13+',          label: 'Қатысушы ел' },
    ],
  },
}

export default function Founders() {
  const { t, lang } = useLang()
  const h = HERO[lang] || HERO.ru
  useEffect(() => { document.title = t.pages.founders }, [t])
  return (
    <PageLayout>
      <PageHero label={h.label} title={h.title} desc={h.desc} stats={h.stats} />
      <FoundersList leaders={LEADERS} lang={lang} />
    </PageLayout>
  )
}
