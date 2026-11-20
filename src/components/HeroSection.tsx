import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  CreditCard,
  Flame,
  MessageSquare,
  ShoppingBag,
  Star,
  Truck,
  Users,
  Utensils,
} from 'lucide-react';
import { HERO_IMAGE, MENU_ITEMS, formatBRL } from '../data/menu';
import { MOTION } from '../motion/tokens';
import type { MenuItem } from '../types/order';

interface HeroSectionProps {
  onOpenCart: () => void;
  onSelectFeatured: (item: MenuItem) => void;
}

export function HeroSection({ onOpenCart, onSelectFeatured }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 36]);

  const featuredBurger = MENU_ITEMS[0];

  const scrollToMenu = () => {
    const el = document.getElementById('cardapio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0E0D0C] pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24"
    >
      {/* Warm radial ember glow matching the design system backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] w-[640px] h-[640px] rounded-full bg-[radial-gradient(circle,rgba(232,99,24,0.13)_0%,rgba(229,169,60,0.05)_42%,transparent_72%)] blur-2xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-6 space-y-7">
            {/* Trust Badges Row matching screenshot */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: MOTION.duration.normal, ease: MOTION.ease.smooth }}
              className="flex flex-wrap items-center gap-2.5"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1B1713] border border-[#32291F] text-xs font-medium text-[#E8DFD1]">
                <Star className="w-3.5 h-3.5 text-[#E5A93C] fill-[#E5A93C]" />
                <span className="font-bold text-[#F5EFE6] tabular-nums">4.7</span>
                <span className="text-[#E5A93C]">(88+ no Google)</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1B1713] border border-[#32291F] text-xs font-medium text-[#D6CEC2]">
                <Flame className="w-3.5 h-3.5 text-[#E86318]" />
                <span>Feito na Brasa</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1B1713] border border-[#32291F] text-xs font-medium text-[#D6CEC2]">
                <Users className="w-3.5 h-3.5 text-[#B5ABA0]" />
                <span>Liderado por Mulheres</span>
              </div>
            </motion.div>

            {/* Editorial Display Headline */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: MOTION.duration.slow,
                delay: 0.06,
                ease: MOTION.ease.ember,
              }}
              className="space-y-5"
            >
              <h1
                className="font-display font-bold text-[#F5EFE6] tracking-[-0.02em] leading-[1.08]"
                style={{
                  fontSize: 'clamp(2.25rem, 4.3vw, 3.65rem)',
                  textWrap: 'balance',
                }}
              >
                O Verdadeiro Hambúrguer Artesanal no{' '}
                <span className="text-[#E86318]">Jardim Nova Esperança</span>
              </h1>

              <p className="text-[15.5px] sm:text-base text-[#B5ABA0] leading-relaxed max-w-xl">
                Blends nobres 100% bovinos selados com crosta caramelizada, pães brioche fofos
                tostados na manteiga da terra, queijos fundidos e maioneses artesanais secretas.
                Sabor autêntico goiano direto da brasa para sua mesa.
              </p>
            </motion.div>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: MOTION.duration.normal,
                delay: 0.14,
                ease: MOTION.ease.smooth,
              }}
              className="flex flex-wrap items-center gap-3.5"
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenCart}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#E86318] hover:bg-[#F27127] text-[#110F0D] text-sm font-bold whitespace-nowrap shadow-[0_8px_28px_rgba(232,99,24,0.3)] transition-colors duration-150"
              >
                <MessageSquare className="w-4 h-4 stroke-[2.3]" />
                <span>Pedir no WhatsApp Agora</span>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToMenu}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#1A1714] hover:bg-[#231F1B] border border-[#322B24] text-[#F5EFE6] text-sm font-semibold whitespace-nowrap transition-colors duration-150"
              >
                <Utensils className="w-4 h-4 text-[#E5A93C]" />
                <span>Explorar Cardápio</span>
              </motion.button>
            </motion.div>

            {/* Bottom 3 Service Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: MOTION.duration.normal,
                delay: 0.22,
                ease: MOTION.ease.smooth,
              }}
              className="pt-5 border-t border-[#231F1B] grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#211812] border border-[#3A2719] flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-[#E86318]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#F5EFE6] leading-tight">Entrega Rápida</p>
                  <p className="text-[11px] text-[#8E8479] tabular-nums mt-0.5">35 a 50 min</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#211812] border border-[#3A2719] flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-4 h-4 text-[#E5A93C]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#F5EFE6] leading-tight">
                    Retirada Quentinha
                  </p>
                  <p className="text-[11px] text-[#8E8479] mt-0.5">Balcão sem filas</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#211812] border border-[#3A2719] flex items-center justify-center shrink-0">
                  <CreditCard className="w-4 h-4 text-[#E86318]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#F5EFE6] leading-tight">Pix &amp; Cartões</p>
                  <p className="text-[11px] text-[#8E8479] mt-0.5">Facilidade total</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Featured Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: MOTION.duration.cinematic,
              delay: 0.1,
              ease: MOTION.ease.ember,
            }}
            className="lg:col-span-6 relative pb-5 sm:pl-4 lg:pl-8"
          >
            <div
              onClick={() => onSelectFeatured(featuredBurger)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectFeatured(featuredBurger);
                }
              }}
              aria-label="Ver detalhes do Euro Burger Especial"
              className="group relative rounded-2xl overflow-hidden bg-[#181512] border border-[#332A22] shadow-[0_24px_60px_rgba(0,0,0,0.65)] cursor-pointer aspect-[4/4.6] max-h-[540px] w-full mx-auto"
            >
              <motion.div style={{ y: imageY }} className="absolute inset-0">
                <img
                  src={HERO_IMAGE}
                  alt="Euro Burger Especial — 180g na brasa com queijo gouda fundido e bacon caramelizado"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </motion.div>

              {/* Measured bottom scrim for >= 4.5:1 contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#110F0D] via-[#110F0D]/45 to-transparent" />

              {/* Bottom Showcase Metadata */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 flex items-end justify-between gap-4">
                <div className="space-y-1">
                  <span className="block text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#E5A93C]">
                    BURGER DA CASA
                  </span>
                  <h2 className="font-display text-2xl sm:text-[26px] font-bold text-[#F5EFE6] leading-tight">
                    {featuredBurger.name}
                  </h2>
                  <p className="text-xs sm:text-[13px] text-[#C9BFB2]">
                    180g na brasa com queijo gouda fundido
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="block text-[11px] text-[#A89E92]">A partir de</span>
                  <span className="text-xl sm:text-2xl font-bold text-[#E5A93C] tabular-nums">
                    {formatBRL(featuredBurger.price)}
                  </span>
                </div>
              </div>
            </div>

            {/* Signature Overlapping Bottom-Left Capsule matching Design System */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: MOTION.duration.normal, delay: 0.35 }}
              className="absolute bottom-0 left-2 sm:left-0 lg:left-4 z-10 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#191613] border border-[#342B22] shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
            >
              <Flame className="w-3.5 h-3.5 text-[#E5A93C] fill-[#E5A93C]" />
              <span className="text-xs font-semibold text-[#F5EFE6] whitespace-nowrap">
                Chapa Quente &amp; Brasa Ativa
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
