import React from 'react'
import PageHero from '../layout/PageHero/PageHero'
import VideoHero from '../../widgets/HeroSection/VideoHero'
import HomeAbout from '../../widgets/HomeAbout/HomeAbout'
import HomeQuote from '../../widgets/HomeQuote/HomeQuote'
import HomeStats from '../../widgets/HomeStats/HomeStats'
import HomeDirections from '../../widgets/HomeDirections/HomeDirections'
import HomePlenary from '../../widgets/HomePlenary/HomePlenary'
import HomeKeyPeople from '../../widgets/HomeKeyPeople/HomeKeyPeople'
import HomeInitiatives from '../../widgets/HomeInitiatives/HomeInitiatives'
import HomePartners from '../../widgets/HomePartners/HomePartners'
import HomeCoop from '../../widgets/HomeCoop/HomeCoop'
import AboutMandate from '../../widgets/sections/about/AboutMandate/AboutMandate'
import AboutDirections from '../../widgets/sections/about/AboutDirections/AboutDirections'
import AboutTimeline from '../../widgets/sections/about/AboutTimeline/AboutTimeline'
import AboutPrinciples from '../../widgets/sections/about/AboutPrinciples/AboutPrinciples'
import AboutFounder from '../../widgets/sections/about/AboutFounder/AboutFounder'
import AboutSecretariat from '../../widgets/sections/about/AboutSecretariat/AboutSecretariat'
import AboutMission from '../../widgets/sections/about/AboutMission/AboutMission'
import AboutCTA from '../../widgets/sections/about/AboutCTA/AboutCTA'
import InitiativesContent from '../../pages/Initiatives/InitiativesContent'
import MediaContent from '../../pages/Media/MediaContent'
import ContactsContent from '../../pages/Contacts/ContactsContent'
import PartnersContent from '../../pages/Partners/PartnersContent'
import EventsContent from '../../pages/Events/EventsContent'
import FoundersContent from '../../pages/Founders/FoundersContent'

const Sep = () => (
  <div className="home-section-sep" style={{ display: 'flex', justifyContent: 'center', padding: '40px 0', background: '#ffffff' }}>
    <img src="/img/own/logo.svg" alt="" style={{ height: '32px', opacity: 0.5 }} aria-hidden="true" />
  </div>
)

export default function BlockRenderer({ blocks, lang }) {
  // Support all formats:
  // 1. New Puck: { puckData: { content: [...] } }
  // 2. Old object: { blocks: [...] }
  // 3. Direct array: [...]
  const renderBlocks = blocks?.puckData?.content || blocks?.blocks || (Array.isArray(blocks) ? blocks : [])
  
  if (!renderBlocks || !Array.isArray(renderBlocks)) return null

  // Helper to extract translation from a block field if it is an object
  const getTrans = (field) => {
    if (!field) return ''
    if (typeof field === 'string') return field
    return field[lang] || field.ru || ''
  }

  return (
    <>
      {renderBlocks.map((block, index) => {
        const key = block.id || block._id || `block-${index}`
        if (!block || !block.type) return null

        let props = { ...(block.props || block.data || {}) }
        
        // Recursively check and map Puck single-field text objects back to strings
        Object.keys(props).forEach(key => {
          if (Array.isArray(props[key])) {
            props[key] = props[key].map(item => {
              // If it's an object that Puck created for a string array, it will have a 'text' property.
              // It might also have '_meta' or other internal Puck properties, but NO other content keys.
              if (item && typeof item === 'object' && typeof item.text === 'string') {
                const keys = Object.keys(item).filter(k => k !== '_meta');
                if (keys.length === 1 && keys[0] === 'text') {
                  return item.text || '';
                }
              }
              return item;
            });
          }
        });

        switch (block.type) {
          case 'Hero':
            return <PageHero key={key} {...props} lang={lang} />
          case 'VideoHero':
            return <VideoHero key={key} />
          case 'HomeAbout':
            return (
              <div key={key} className={props.reverseLayout ? 'layout-reversed' : ''}>
                <HomeAbout lang={lang} data={props} reverseLayout={props.reverseLayout} />
              </div>
            )
          case 'TextWithImage':
            return (
              <section key={key} className="py-12 bg-white">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
                  {props.image && (
                    <div className="md:w-1/2">
                      <img src={props.image} alt="" className="w-full h-auto rounded-lg shadow-md" />
                    </div>
                  )}
                  <div className="md:w-1/2">
                    <p className="text-lg text-gray-700 leading-relaxed">{getTrans(props.text)}</p>
                  </div>
                </div>
              </section>
            )
          case 'GenericText':
            return (
              <section key={key} className="container mx-auto px-4 py-8 max-w-4xl">
                {props.html || props.text
                  ? <div className="text-gray-800 text-lg whitespace-pre-wrap leading-relaxed"
                         dangerouslySetInnerHTML={props.html ? { __html: props.html } : undefined}>
                       {!props.html && props.text}
                     </div>
                  : null}
              </section>
            )
          case 'GenericImage':
            return (
              <section key={key} className="container mx-auto px-4 py-8 max-w-5xl">
                {(props.url || props.image) && (
                  <img src={props.url || props.image} alt={props.alt || ''} className="w-full rounded-xl shadow-lg" />
                )}
              </section>
            )
          case 'Quote':
            return (
              <section key={key} className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                  <blockquote className="text-2xl italic font-serif text-gray-800 mb-6">
                    "{getTrans(props.quote || props.text)}"
                  </blockquote>
                  <div className="font-bold text-gray-900">{getTrans(props.author)}</div>
                  <div className="text-gray-500 text-sm">{getTrans(props.role)}</div>
                </div>
              </section>
            )
          case 'HomeStats': return <HomeStats key={key} data={props} lang={lang} />
          case 'HomeQuote': return <HomeQuote key={key} data={props} lang={lang} />
          case 'HomeDirections': return <HomeDirections key={key} data={props} lang={lang} />
          case 'HomePlenary': return <HomePlenary key={key} data={props} lang={lang} />
          case 'HomeKeyPeople': return <HomeKeyPeople key={key} data={props} lang={lang} />
          case 'HomeInitiatives': return <HomeInitiatives key={key} data={props} lang={lang} />
          case 'HomePartners': return <HomePartners key={key} data={props} lang={lang} />
          case 'HomeCoop': return <HomeCoop key={key} data={props} lang={lang} />
          case 'Sep': return <Sep key={key} />
          
          // ABOUT BLOCKS
          case 'AboutHero': return <PageHero key={key} {...props} lang={lang} />
          case 'AboutMandate': return <AboutMandate key={key} {...props} lang={lang} />
          case 'AboutDirections': return <AboutDirections key={key} {...props} lang={lang} />
          case 'AboutTimeline': return <AboutTimeline key={key} {...props} lang={lang} />
          case 'AboutPrinciples': return <AboutPrinciples key={key} {...props} lang={lang} />
          case 'AboutFounder': return <AboutFounder key={key} {...props} lang={lang} />
          case 'AboutSecretariat': return <AboutSecretariat key={key} {...props} lang={lang} />
          case 'AboutMission': return <AboutMission key={key} {...props} lang={lang} />
          case 'AboutCTA': return <AboutCTA key={key} {...props} lang={lang} />
          
          // DYNAMIC PAGE CONTENT BLOCKS
          case 'InitiativesContent': return <InitiativesContent key={key} data={props} lang={lang} />
          case 'MediaContent': return <MediaContent key={key} data={props} lang={lang} />
          case 'ContactsContent': return <ContactsContent key={key} data={props} lang={lang} />
          case 'PartnersContent': return <PartnersContent key={key} data={props} lang={lang} />
          case 'EventsContent': return <EventsContent key={key} data={props} lang={lang} />
          case 'FoundersContent': return <FoundersContent key={key} data={props} lang={lang} />

          default:
            return <div key={key} className="p-4 text-center text-gray-500">Unknown block: {block.type}</div>
        }
      })}
    </>
  )
}
