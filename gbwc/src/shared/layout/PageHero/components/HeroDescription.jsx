export default function HeroDescription({ sub, children }) {
  return (
    <div className="page-hero__right">
      {sub && <p className="page-hero__sub">{sub}</p>}
      {children && <p className="page-hero__desc">{children}</p>}
    </div>
  )
}
