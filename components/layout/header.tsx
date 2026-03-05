interface HeaderProps {
  title: string
  subtitle?: string
  children?: React.ReactNode
}

export function Header({ title, subtitle, children }: HeaderProps) {
  return (
    <div className="mb-8 flex items-end justify-between">
      <div>
        {subtitle && (
          <p className="text-sm font-bold uppercase tracking-widest text-text-muted">
            {subtitle}
          </p>
        )}
        <h1 className="text-4xl font-extrabold uppercase text-white">
          {title}
        </h1>
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  )
}
