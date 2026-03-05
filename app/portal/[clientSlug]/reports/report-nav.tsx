'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { REPORT_NAMES } from '@/lib/constants'
import type { ReportSlug } from '@/lib/clients.config'

export function PortalReportNav({
  sections,
  activeSection,
  clientSlug,
}: {
  sections: ReportSlug[]
  activeSection: string
  clientSlug: string
}) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {sections.map((slug) => (
        <Link
          key={slug}
          href={`/portal/${clientSlug}/reports?section=${slug}`}
          className={cn(
            'rounded-[100px] px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors',
            activeSection === slug
              ? 'bg-white text-black'
              : 'text-text-muted hover:bg-bg-subtle hover:text-white'
          )}
        >
          {REPORT_NAMES[slug] ?? slug}
        </Link>
      ))}
    </div>
  )
}
