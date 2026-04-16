# GBWC — Feature Architecture

## Structure

```
src
│
├ app/                        ← Global app shell
│   ├ App.jsx                 ← Root orchestrator (no business logic)
│   └ providers/
│       ├ RouterProvider.jsx  ← BrowserRouter wrapper
│       └ MotionProvider.jsx  ← Global scroll-based fade-up
│
├ pages/                      ← Page orchestrators ONLY
│   ├ Home/                   ← Imports from widgets/, zero logic
│   ├ About/
│   ├ Events/
│   ├ Founders/
│   ├ Initiatives/
│   ├ Partners/
│   ├ Media/
│   └ Contacts/
│
├ widgets/                    ← Large reusable UI blocks
│   ├ Header/
│   ├ Footer/
│   ├ HeroSection/            ← VideoHero
│   ├ HomeAbout/
│   ├ HomeStats/
│   ├ HomeDirections/
│   ├ HomePlenary/
│   ├ HomeGallery/
│   ├ HomeInitiatives/
│   ├ HomePartners/
│   ├ HomeCoop/
│   ├ HomeQuote/
│   ├ GIndex/
│   ├ Plenary/
│   └ index.js                ← Barrel export
│
├ features/                   ← Domain logic modules
│   ├ events/
│   ├ media/
│   ├ partners/
│   ├ initiatives/
│   └ founders/
│
├ entities/                   ← Data model definitions
│   ├ event/
│   ├ partner/
│   ├ founder/
│   └ media/
│
├ shared/                     ← Cross-cutting shared layer
│   ├ hooks/                  ← useInView, useParallax, useLang, useApi …
│   │   └ index.js
│   ├ animations/             ← MotionSection, TiltCard, CountUp …
│   │   └ index.js
│   ├ webgl/                  ← ShaderBackground, AuroraBg, ParticleField
│   │   └ index.js
│   ├ ui/                     ← Preloader, Transition, PageLayout, ApiStates
│   │   └ index.js
│   ├ constants/              ← homeData, shared constants
│   ├ utils/
│   └ styles/
│
├ services/
│   └ api.js                  ← Hardened API client (auth, CRUD, upload)
│
├ i18n/
│   └ translations.js         ← ru / en / kk
│
└ main.jsx                    ← Entry point
```

## Dependency Rule

```
Page → Widgets → Features → Entities → Shared
```

Each layer can only import from layers BELOW it. Never upward.

## Import examples

```js
// In a Page:
import HomeAbout from '../../widgets/HomeAbout/HomeAbout'

// In a Widget:
import { MotionSection } from '../../shared/animations'
import { useLang }       from '../../shared/hooks'

// In a Feature:
import { sessions }      from '../../services/api'
import { EVENT_STATUS }  from '../../entities/event/event.types'
```
