import { motion } from 'motion/react';
import { ChefHat, Flame, Store, Truck } from 'lucide-react';
import { QUALITY_PILLARS } from '../data/menu';
import { MOTION, cardReveal, staggerContainer } from '../motion/tokens';
import type { QualityPillar } from '../types/order';

function PillarIcon({ pillar }: { pillar: QualityPillar }) {
  const iconColor =
    pillar.accent === 'ember'
      ? 'text-[#E86318]'
      : pillar.accent === 'gold'
      ? 'text-[#E5A93C]'
      : 'text-[#D6CEC2]';

  switch (pillar.icon) {
    case 'flame':
      return <Flame className={`w-5 h-5 ${iconColor}`} />;
    case 'bread':
      return <ChefHat className={`w-5 h-5 ${iconColor}`} />;
    case 'store':
      return <Store className={`w-5 h-5 ${iconColor}`} />;
    case 'truck':
      return <Truck className={`w-5 h-5 ${iconColor}`} />;
  }
}

export function QualitySection() {
  return (
    <section
      id="sobre"
      className="py-16 sm:py-22 bg-[#141210] border-t border-b border-[#231F1B]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={MOTION.viewport}
          transition={{ duration: MOTION.duration.normal, ease: MOTION.ease.smooth }}
          className="text-center max-w-2xl mx-auto space-y-3 mb-12"
        >
          <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#E5A93C]">
            O PADRÃO DE QUALIDADE EURO
          </span>
          <h2
            className="font-display text-3xl sm:text-4xl font-bold text-[#F5EFE6] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Por Que a Nossa Brasa Conquista Goiânia?
          </h2>
          <p className="text-sm sm:text-[15px] text-[#A89E92] leading-relaxed">
            Não é apenas comida rápida: é o compromisso diário com ingredientes frescos de pequenos
            produtores e a técnica da grelha de alta temperatura.
          </p>
        </motion.div>

        {/* 4-Column Pillar Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={MOTION.viewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {QUALITY_PILLARS.map((pillar) => (
            <motion.div
              key={pillar.id}
              variants={cardReveal}
              whileHover={{ y: -3 }}
              transition={{ duration: MOTION.duration.fast, ease: MOTION.ease.smooth }}
              className="rounded-2xl bg-[#191714] border border-[#2A2520] hover:border-[#E86318]/40 p-6 flex flex-col gap-4 transition-colors duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#241C15] border border-[#3B2A1E] flex items-center justify-center shrink-0">
                <PillarIcon pillar={pillar} />
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-[17.5px] font-bold text-[#F5EFE6] leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#9E9488] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
