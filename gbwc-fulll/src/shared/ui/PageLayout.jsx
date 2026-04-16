import AuroraBg from '../webgl/AuroraBg'

export default function PageLayout({ children }) {
  return (
    <>
      <AuroraBg />
      <main className="page-main">
        <div className="page-main-inner">
          {children}
        </div>
      </main>
    </>
  )
}
