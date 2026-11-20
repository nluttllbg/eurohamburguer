import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, MessageSquare, ShoppingBag, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { MOTION } from '../motion/tokens';

interface HeaderProps {
  totalItems: number;
  onOpenCart: () => void;
}

const NAV_ITEMS = [
  { id: 'inicio', label: 'Início' },
  { id: 'cardapio', label: 'Cardápio Digital' },
  { id: 'sobre', label: 'Sobre Nós' },
  { id: 'depoimentos', label: 'Depoimentos' },
  { id: 'localizacao', label: 'Localização' },
];

export function Header({ totalItems, onOpenCart }: HeaderProps) {
  const [activeSection, setActiveSection] = useState('inicio');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const offsets = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: item.id, top: Math.abs(rect.top - 140) };
      });

      const nearest = offsets.reduce((prev, curr) => (curr.top < prev.top ? curr : prev));
      if (nearest && nearest.top < 700) {
        setActiveSection(nearest.id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 border-b ${
        scrolled
          ? 'bg-[#110F0D]/95 backdrop-blur-md border-[#2A2520] shadow-[0_8px_32px_rgba(0,0,0,0.45)]'
          : 'bg-[#110F0D]/90 backdrop-blur-sm border-[#231F1B]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4 lg:gap-8">
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('inicio');
          }}
          className="focus-visible:rounded-lg"
          aria-label="Euro Hambúrgueria - Ir para o início"
        >
          <BrandLogo />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`relative py-2 text-[13.5px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive ? 'text-[#F5EFE6]' : 'text-[#B5ABA0] hover:text-[#F5EFE6]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="header-nav-underline"
                    transition={{ duration: MOTION.duration.normal, ease: MOTION.ease.smooth }}
                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] rounded-full bg-[#E86318]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenCart}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E86318] hover:bg-[#F27127] text-[#110F0D] text-[13px] font-bold whitespace-nowrap shrink-0 shadow-[0_4px_18px_rgba(232,99,24,0.28)] transition-colors duration-150"
          >
            <MessageSquare className="w-4 h-4 stroke-[2.2]" />
            <span>Fazer Pedido / WhatsApp</span>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={onOpenCart}
            aria-label={`Abrir sacola de pedido (${totalItems} itens)`}
            className="relative w-10 h-10 rounded-full bg-[#1C1916] hover:bg-[#26211D] border border-[#332C25] flex items-center justify-center text-[#F5EFE6] transition-colors duration-150 shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-[#E5A93C]" />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#E86318] text-[#110F0D] text-[10px] font-bold tabular-nums flex items-center justify-center border border-[#110F0D]"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden w-10 h-10 rounded-lg bg-[#1C1916] border border-[#332C25] flex items-center justify-center text-[#F5EFE6]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: MOTION.duration.fast, ease: MOTION.ease.smooth }}
            className="lg:hidden border-t border-[#2A2520] bg-[#141210] px-4 py-4 space-y-1.5"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#E86318]/15 text-[#E86318] border border-[#E86318]/25'
                      : 'text-[#D6CEC2] hover:bg-[#1E1B18]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenCart();
              }}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#E86318] text-[#110F0D] text-sm font-bold"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Fazer Pedido / WhatsApp</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
