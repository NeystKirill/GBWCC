import SessionDetail from '../SessionDetail/SessionDetail'

export default function EventDetails({ session, lang, lbl }) {
  return <SessionDetail session={session} lang={lang} labels={lbl} />
}
