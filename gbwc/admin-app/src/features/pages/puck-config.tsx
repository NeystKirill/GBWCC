import { Config } from "@puckeditor/core";
import { ABOUT_CONTENT } from "../../../../src/entities/about/about.data";
import { CONTACTS_CONTENT } from "../../../../src/entities/contacts/contacts.data";
import PageHero from "../../../../src/shared/layout/PageHero/PageHero";
import VideoHero from "../../../../src/widgets/HeroSection/VideoHero";
import HomeAbout from "../../../../src/widgets/HomeAbout/HomeAbout";
import HomeQuote from "../../../../src/widgets/HomeQuote/HomeQuote";
import HomeStats from "../../../../src/widgets/HomeStats/HomeStats";
import HomeDirections from "../../../../src/widgets/HomeDirections/HomeDirections";
import HomePlenary from "../../../../src/widgets/HomePlenary/HomePlenary";
import HomeKeyPeople from "../../../../src/widgets/HomeKeyPeople/HomeKeyPeople";
import HomeInitiatives from "../../../../src/widgets/HomeInitiatives/HomeInitiatives";
import HomePartners from "../../../../src/widgets/HomePartners/HomePartners";
import HomeCoop from "../../../../src/widgets/HomeCoop/HomeCoop";
import AboutMandate from "../../../../src/widgets/sections/about/AboutMandate/AboutMandate";
import AboutDirections from "../../../../src/widgets/sections/about/AboutDirections/AboutDirections";
import AboutTimeline from "../../../../src/widgets/sections/about/AboutTimeline/AboutTimeline";
import AboutPrinciples from "../../../../src/widgets/sections/about/AboutPrinciples/AboutPrinciples";
import AboutFounder from "../../../../src/widgets/sections/about/AboutFounder/AboutFounder";
import AboutSecretariat from "../../../../src/widgets/sections/about/AboutSecretariat/AboutSecretariat";
import AboutMission from "../../../../src/widgets/sections/about/AboutMission/AboutMission";
import AboutCTA from "../../../../src/widgets/sections/about/AboutCTA/AboutCTA";
import InitiativesContent from "../../../../src/pages/Initiatives/InitiativesContent";
import MediaContent from "../../../../src/pages/Media/MediaContent";
import ContactsContent from "../../../../src/pages/Contacts/ContactsContent";
import PartnersContent from "../../../../src/pages/Partners/PartnersContent";
import EventsContent from "../../../../src/pages/Events/EventsContent";
import FoundersContent from "../../../../src/pages/Founders/FoundersContent";
import { ImagePicker } from "./ImagePicker";
import { useLang } from "../../../../src/shared/hooks/useLang";

type CMSVal = { ru: string; en: string; kk: string } | string;

type Props = {
  Hero: { 
    label: CMSVal; 
    title: CMSVal; 
    titleEmphasis: CMSVal; 
    desc: CMSVal; 
    bgImage: string; 
    stats?: { value: string; label: CMSVal }[] 
  };
  VideoHero: {};
  HomeAbout: { label: CMSVal; title: CMSVal; p1: CMSVal; p2: CMSVal; p3: CMSVal; cta: CMSVal; quote: CMSVal; reverseLayout: boolean };
  HomeQuote: { eyebrow: CMSVal; title: CMSVal; lead: CMSVal; quote: CMSVal; author: CMSVal; role: CMSVal; pillars: { icon: string; label: CMSVal; text: CMSVal }[] };
  HomeStats: { items: { n: string; sx: string; label: CMSVal; desc: CMSVal }[] };
  GenericText: { text: CMSVal };
  GenericImage: { image: string };
  Sep: {};
  HomeDirections: { sectionLabel: CMSVal; sectionTitle: CMSVal; sectionSubtext: CMSVal; items: { title: CMSVal; desc: CMSVal }[] };
  HomePlenary: { sectionLabel: CMSVal; sectionTitle: CMSVal };
  HomeKeyPeople: { sectionLabel: CMSVal; sectionTitle: CMSVal; ctaText: CMSVal; btnText: CMSVal;
    people: { name: CMSVal; role: CMSVal; org: CMSVal; photo: string; type: string }[]
  };
  HomeInitiatives: { sectionLabel: CMSVal; sectionTitle: CMSVal; allBtn: CMSVal; supportTitle: CMSVal };
  HomePartners: { sectionLabel: CMSVal; sectionTitle: CMSVal; sectionSubtext: CMSVal; intlLbl: CMSVal; corpLbl: CMSVal; natlLbl: CMSVal };
  HomeCoop: { label: CMSVal; title: CMSVal; text: CMSVal; btn1: CMSVal; btn2: CMSVal; tags: { text: CMSVal }[] };
  AboutMandate: { eyebrow: CMSVal; title: CMSVal; paragraphs: { text: CMSVal }[]; cards: { label: CMSVal; num: string; sub: CMSVal; text: CMSVal }[] };
  AboutDirections: { eyebrow: CMSVal; title: CMSVal; items: { n: string; title: CMSVal; desc: CMSVal }[] };
  AboutTimeline: { eyebrow: CMSVal; title: CMSVal; items: { year: string; title: CMSVal; desc: CMSVal }[] };
  AboutPrinciples: { eyebrow: CMSVal; title: CMSVal; items: { n: string; title: CMSVal; desc: CMSVal }[] };
  AboutFounder: { eyebrow: CMSVal; name: CMSVal; role: CMSVal; photo: string; bio: { text: CMSVal }[]; points: { text: CMSVal }[]; contactEmail: string; contactPhone: string };
  AboutSecretariat: { eyebrow: CMSVal; title: CMSVal; members: { name: CMSVal; role: CMSVal; photo: string }[] };
  AboutMission: { eyebrow: CMSVal; mission: CMSVal; vision: CMSVal; values: { title: CMSVal; text: CMSVal }[] };
  AboutCTA: { title: CMSVal; text: CMSVal; btn: CMSVal; email: string };
  InitiativesContent: {};
  MediaContent: {};
  ContactsContent: { 
    infoTitle: CMSVal; infoDesc: CMSVal; addressLabel: CMSVal; addressVal: CMSVal; phoneLabel: CMSVal; emailLabel: CMSVal; socialLabel: CMSVal;
    persons: { name: CMSVal; phone: string; email: string }[];
    formTitle: CMSVal; success: CMSVal; error: CMSVal; sending: CMSVal; send: CMSVal;
    fields: {
      name: CMSVal; namePh: CMSVal; company: CMSVal; companyPh: CMSVal; email: CMSVal; emailPh: CMSVal; subject: CMSVal; subjectPh: CMSVal; message: CMSVal; messagePh: CMSVal;
    };
  };
  PartnersContent: {};
  EventsContent: {};
  FoundersContent: {};
};

const langFields = {
  ru: { type: "text" as const },
  en: { type: "text" as const },
  kk: { type: "text" as const }
};

const langTextarea = {
  ru: { type: "textarea" as const },
  en: { type: "textarea" as const },
  kk: { type: "textarea" as const }
};

export const puckConfig = (lang: string = 'ru', pageKey?: string): Config<Props> => ({
  components: {
    Hero: {
      fields: {
        label: { type: "object", objectFields: langFields },
        title: { type: "object", objectFields: langFields },
        titleEmphasis: { type: "object", objectFields: langFields },
        desc: { type: "object", objectFields: langTextarea },
        stats: { type: "array", arrayFields: { 
          value: { type: "text" }, 
          label: { type: "object", objectFields: langFields } 
        } },
        bgImage: { type: "custom", render: (props: any) => <ImagePicker {...props} /> },
      },
      render: (props) => {
        const { resolveWithFallback } = useLang();
        
        let fb = { label: 'GBWC', title: '', titleEmphasis: '', desc: '' };
        if (pageKey === 'about') {
          const c = ABOUT_CONTENT[lang] || ABOUT_CONTENT.ru;
          fb = { label: c.heroEye, title: c.heroTitle, titleEmphasis: '', desc: c.heroDesc };
        } else if (pageKey === 'contacts') {
          const c = CONTACTS_CONTENT[lang] || CONTACTS_CONTENT.ru;
          fb = { label: c.eyebrow, title: c.titlePlain, titleEmphasis: c.titleItalic, desc: c.subtitle };
        } else if (pageKey === 'initiatives') {
          fb.title = lang === 'ru' ? 'Инициативы' : (lang === 'kk' ? 'Бастамалар' : 'Initiatives');
        }

        return (
          <PageHero 
            {...props} 
            label={resolveWithFallback(props.label, fb.label)}
            title={resolveWithFallback(props.title, fb.title)}
            titleEmphasis={resolveWithFallback(props.titleEmphasis, fb.titleEmphasis)}
            desc={resolveWithFallback(props.desc, fb.desc)}
            stats={props.stats?.map(s => ({
              ...s,
              label: resolveWithFallback(s.label, '')
            }))}
          />
        );
      }
    },
    VideoHero: { render: () => <VideoHero /> },
    HomeAbout: {
      fields: {
        label: { type: "object", objectFields: langFields },
        title: { type: "object", objectFields: langFields },
        p1: { type: "object", objectFields: langTextarea }, 
        p2: { type: "object", objectFields: langTextarea }, 
        p3: { type: "object", objectFields: langTextarea },
        cta: { type: "object", objectFields: langFields },
        quote: { type: "object", objectFields: langTextarea },
        reverseLayout: { type: "radio", options: [{ label: "Yes", value: true }, { label: "No", value: false }] }
      },
      render: (props) => <HomeAbout lang={lang} data={props} reverseLayout={props.reverseLayout} />
    },
    HomeQuote: {
      fields: { 
        eyebrow: { type: "object", objectFields: langFields }, 
        title: { type: "object", objectFields: langFields }, 
        lead: { type: "object", objectFields: langTextarea }, 
        quote: { type: "object", objectFields: langTextarea }, 
        author: { type: "object", objectFields: langFields }, 
        role: { type: "object", objectFields: langFields },
        pillars: { type: "array", arrayFields: { 
          icon: { type: "text" }, 
          label: { type: "object", objectFields: langFields }, 
          text: { type: "object", objectFields: langTextarea } 
        } }
      },
      render: (props) => <HomeQuote data={props} />
    },
    HomeStats: {
      fields: { items: { type: "array", arrayFields: { 
        n: { type: "text" }, 
        sx: { type: "text" }, 
        label: { type: "object", objectFields: langFields }, 
        desc: { type: "object", objectFields: langTextarea } 
      } } },
      render: (props) => <HomeStats lang={lang} data={props} />
    },
    GenericText: {
      fields: { text: { type: "object", objectFields: langTextarea } },
      render: ({ text }) => {
        const { resolveCMS } = useLang();
        return (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4 max-w-4xl text-gray-800 text-lg whitespace-pre-wrap leading-relaxed">
              {resolveCMS(text)}
            </div>
          </section>
        );
      }
    },
    GenericImage: {
      fields: { image: { type: "custom", render: (props: any) => <ImagePicker {...props} /> } },
      render: ({ image }) => (
        <section className="py-12 bg-white flex justify-center"><div className="container mx-auto px-4 max-w-5xl">{image && <img src={image} alt="" className="w-full h-auto rounded-xl shadow-lg" />}</div></section>
      )
    },
    Sep: { render: () => <div className="py-8"><div className="container mx-auto h-px bg-gray-100" /></div> },
    
    HomeDirections: {
      fields: {
        sectionLabel: { type: "object", objectFields: langFields }, 
        sectionTitle: { type: "object", objectFields: langFields }, 
        sectionSubtext: { type: "object", objectFields: langTextarea },
        items: { type: "array", arrayFields: { 
          title: { type: "object", objectFields: langFields }, 
          desc: { type: "object", objectFields: langTextarea } 
        } }
      },
      render: (props) => <HomeDirections data={props} />
    },
    // Strictly Dynamic
    HomePlenary: {
      fields: { 
        sectionLabel: { type: "object", objectFields: langFields },
        sectionTitle: { type: "object", objectFields: langFields }
      },
      render: (props) => <HomePlenary data={props} />
    },
    // Independent (Manual + Fallback)
    HomeKeyPeople: {
      fields: { 
        sectionLabel: { type: "object", objectFields: langFields },
        sectionTitle: { type: "object", objectFields: langFields },
        ctaText: { type: "object", objectFields: langTextarea },
        btnText: { type: "object", objectFields: langFields },
        people: {
          type: "array",
          arrayFields: {
            name: { type: "object", objectFields: { ru: { type: "text" }, en: { type: "text" }, kk: { type: "text" } } },
            role: { type: "object", objectFields: { ru: { type: "text" }, en: { type: "text" }, kk: { type: "text" } } },
            org: { type: "object", objectFields: { ru: { type: "text" }, en: { type: "text" }, kk: { type: "text" } } },
            photo: { type: "custom", render: (props: any) => <ImagePicker {...props} /> },
            type: { type: "select", options: [ { label: "International", value: "intl" }, { label: "Corporate", value: "corp" }, { label: "Government", value: "govt" } ] }
          }
        }
      },
      render: (props) => <HomeKeyPeople data={props} />
    },
    // Strictly Dynamic
    HomeInitiatives: {
      fields: { 
        sectionLabel: { type: "object", objectFields: langFields },
        sectionTitle: { type: "object", objectFields: langFields },
        allBtn: { type: "object", objectFields: langFields },
        supportTitle: { type: "object", objectFields: langTextarea }
      },
      render: (props) => <HomeInitiatives data={props} />
    },
    HomePartners: {
      fields: { 
        sectionLabel: { type: "object", objectFields: langFields },
        sectionTitle: { type: "object", objectFields: langFields },
        sectionSubtext: { type: "object", objectFields: langTextarea },
        intlLbl: { type: "object", objectFields: langFields },
        corpLbl: { type: "object", objectFields: langFields },
        natlLbl: { type: "object", objectFields: langFields }
      },
      render: (props) => <HomePartners data={props} />
    },
    HomeCoop: {
      fields: { 
        label: { type: "object", objectFields: langFields },
        title: { type: "object", objectFields: langFields },
        text: { type: "object", objectFields: langTextarea },
        btn1: { type: "object", objectFields: langFields },
        btn2: { type: "object", objectFields: langFields },
        tags: { type: "array", arrayFields: { text: { type: "object", objectFields: langFields } } }
      },
      render: (props) => <HomeCoop data={props} />
    },
    AboutMandate: {
      fields: {
        eyebrow: { type: "object", objectFields: langFields },
        title: { type: "object", objectFields: langFields },
        paragraphs: { type: "array", arrayFields: { text: { type: "object", objectFields: langTextarea } } },
        cards: { type: "array", arrayFields: {
          label: { type: "object", objectFields: langFields },
          num: { type: "text" },
          sub: { type: "object", objectFields: langFields },
          text: { type: "object", objectFields: langTextarea }
        }}
      },
      render: (props) => <AboutMandate {...props} lang={lang} />
    },
    AboutDirections: {
      fields: {
        eyebrow: { type: "object", objectFields: langFields },
        title: { type: "object", objectFields: langFields },
        items: { type: "array", arrayFields: {
          n: { type: "text" },
          title: { type: "object", objectFields: langFields },
          desc: { type: "object", objectFields: langTextarea }
        }}
      },
      render: (props) => <AboutDirections {...props} lang={lang} />
    },
    AboutTimeline: {
      fields: { 
        eyebrow: { type: "object", objectFields: langFields }, 
        title: { type: "object", objectFields: langFields }, 
        items: { type: "array", arrayFields: { 
          year: { type: "text" }, 
          title: { type: "object", objectFields: langFields }, 
          desc: { type: "object", objectFields: langTextarea } 
        } } 
      },
      render: (props) => <AboutTimeline {...props} lang={lang} />
    },
    AboutPrinciples: {
      fields: { 
        eyebrow: { type: "object", objectFields: langFields }, 
        title: { type: "object", objectFields: langFields }, 
        items: { type: "array", arrayFields: { 
          n: { type: "text" },
          title: { type: "object", objectFields: langFields }, 
          desc: { type: "object", objectFields: langTextarea } 
        } } 
      },
      render: (props) => <AboutPrinciples {...props} lang={lang} />
    },
    AboutFounder: {
      fields: { 
        eyebrow: { type: "object", objectFields: langFields }, 
        name: { type: "object", objectFields: langFields }, 
        role: { type: "object", objectFields: langFields },
        photo: { type: "custom", render: (props: any) => <ImagePicker {...props} /> },
        bio: { type: "array", arrayFields: { text: { type: "object", objectFields: langTextarea } } },
        points: { type: "array", arrayFields: { text: { type: "object", objectFields: langFields } } },
        contactEmail: { type: "text" },
        contactPhone: { type: "text" }
      },
      render: (props) => <AboutFounder {...props} lang={lang} />
    },
    AboutSecretariat: {
      fields: { 
        eyebrow: { type: "object", objectFields: langFields }, 
        title: { type: "object", objectFields: langFields },
        members: { type: "array", arrayFields: { 
          name: { type: "object", objectFields: langFields }, 
          role: { type: "object", objectFields: langFields }, 
          photo: { type: "custom", render: (props: any) => <ImagePicker {...props} /> } 
        } }
      },
      render: (props) => <AboutSecretariat {...props} lang={lang} />
    },
    AboutMission: {
      fields: { 
        eyebrow: { type: "object", objectFields: langFields }, 
        mission: { type: "object", objectFields: langTextarea }, 
        vision: { type: "object", objectFields: langTextarea },
        values: { type: "array", arrayFields: { 
          title: { type: "object", objectFields: langFields }, 
          text: { type: "object", objectFields: langTextarea } 
        } }
      },
      render: (props) => <AboutMission {...props} lang={lang} />
    },
    AboutCTA: {
      fields: { 
        title: { type: "object", objectFields: langFields }, 
        text: { type: "object", objectFields: langTextarea }, 
        btn: { type: "object", objectFields: langFields }, 
        email: { type: "text" } 
      },
      render: (props) => <AboutCTA {...props} lang={lang} />
    },
    ContactsContent: { 
      fields: {
        infoTitle: { type: "object", objectFields: langFields },
        infoDesc: { type: "object", objectFields: langTextarea },
        addressLabel: { type: "object", objectFields: langFields },
        addressVal: { type: "object", objectFields: langFields },
        phoneLabel: { type: "object", objectFields: langFields },
        emailLabel: { type: "object", objectFields: langFields },
        socialLabel: { type: "object", objectFields: langFields },
        persons: { type: "array", arrayFields: {
          name: { type: "object", objectFields: langFields },
          phone: { type: "text" },
          email: { type: "text" }
        }},
        formTitle: { type: "object", objectFields: langFields },
        success: { type: "object", objectFields: langFields },
        error: { type: "object", objectFields: langFields },
        sending: { type: "object", objectFields: langFields },
        send: { type: "object", objectFields: langFields },
        fields: {
          type: "object",
          objectFields: {
            name: { type: "object", objectFields: langFields },
            namePh: { type: "object", objectFields: langFields },
            company: { type: "object", objectFields: langFields },
            companyPh: { type: "object", objectFields: langFields },
            email: { type: "object", objectFields: langFields },
            emailPh: { type: "object", objectFields: langFields },
            subject: { type: "object", objectFields: langFields },
            subjectPh: { type: "object", objectFields: langFields },
            message: { type: "object", objectFields: langFields },
            messagePh: { type: "object", objectFields: langFields },
          }
        }
      },
      render: (props) => <ContactsContent {...props} data={props} /> 
    },
    InitiativesContent: { render: (props) => <InitiativesContent {...props} data={props} /> },
    MediaContent: { render: (props) => <MediaContent {...props} data={props} /> },
    PartnersContent: { render: (props) => <PartnersContent {...props} data={props} /> },
    EventsContent: { render: (props) => <EventsContent {...props} /> },
    FoundersContent: { 
      fields: {
        title: { type: "object", objectFields: langFields },
        description: { type: "object", objectFields: langTextarea }
      },
      render: (props) => <FoundersContent {...props} data={props} /> 
    }
  }
});
