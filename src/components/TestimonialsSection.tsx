import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/menu';
import { MOTION, cardReveal, staggerContainer } from '../motion/tokens';

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-16 sm:py-22 bg-[#0E0D0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={MOTION.viewport}
            transition={{ duration: MOTION.duration.normal, ease: MOTION.ease.smooth }}
            className="space-y-2"
          >
            <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#E86318]">
              AVALIAÇÕES REAIS DOS CLIENTES
            </span>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold text-[#F5EFE6] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              4.7 Estrelas que Falam por Si
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={MOTION.viewport}
            transition={{ duration: MOTION.duration.normal, delay: 0.08 }}
            className="flex items-center gap-3 self-start md:self-end"
          >
            <span className="text-2xl font-bold text-[#E5A93C] tabular-nums leading-none">
              4.7
            </span>
            <div className="flex items-center gap-0.5" aria-label="4.7 de 5 estrelas">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className={`w-4 h-4 ${
                    idx < 4
                      ? 'text-[#E5A93C] fill-[#E5A93C]'
                      : 'text-[#E5A93C] fill-[#E5A93C]/70'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-[#9E9488]">Mais de 88 avaliações no Google Maps</span>
          </motion.div>
        </div>

        {/* 3-Column Reviews Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={MOTION.viewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {TESTIMONIALS.map((item) => (
            <motion.blockquote
              key={item.id}
              variants={cardReveal}
              whileHover={{ y: -3 }}
              transition={{ duration: MOTION.duration.fast, ease: MOTION.ease.smooth }}
              className="rounded-2xl bg-[#181613] border border-[#2A2520] hover:border-[#E5A93C]/35 p-6 flex flex-col justify-between gap-6 transition-colors duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1" aria-label={`${item.rating} estrelas`}>
                  {Array.from({ length: item.rating }).map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 text-[#E5A93C] fill-[#E5A93C]" />
                  ))}
                </div>

                <p className="font-display italic text-[14.5px] text-[#DED6CA] leading-relaxed">
                  {item.quote}
                </p>
              </div>

              <footer className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-[#2A1F17] border border-[#442D1E] flex items-center justify-center text-xs font-bold text-[#E86318] shrink-0">
                  {item.initials}
                </div>
                <div>
                  <cite className="not-italic block text-sm font-bold text-[#F5EFE6]">
                    {item.name}
                  </cite>
                  <span className="block text-[11.5px] text-[#8E8479]">{item.role}</span>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
