import { DEALS } from '../data/menu'
import DealCard from './DealCard'

export default function DealsSection({ compact = false }) {
  return (
    <section className={`w-full ${compact ? 'pt-6' : 'pt-4'}`}>
      <div className="page-x mb-3 flex h-6 items-center justify-between">
        <h3 className="m-0 overflow-hidden truncate whitespace-nowrap font-display text-lg leading-6 text-night">
          {compact ? 'Hot from the hearth' : 'Deals & offers'}
        </h3>
        <span className="shrink-0 whitespace-nowrap text-[11px] leading-4 text-ember">Limited</span>
      </div>
      <div className="no-scrollbar flex max-w-full gap-2.5 overflow-x-auto overscroll-x-contain scroll-smooth px-[var(--page-x)] snap-x snap-mandatory">
        {DEALS.map((deal, index) => (
          <DealCard key={deal.id} deal={deal} index={index} />
        ))}
      </div>
    </section>
  )
}
