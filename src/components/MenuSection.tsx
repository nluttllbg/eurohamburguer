import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  BookOpen,
  Check,
  Flame,
  GlassWater,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Utensils,
  UtensilsCrossed,
} from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, formatBRL } from '../data/menu';
import { MOTION } from '../motion/tokens';
import type { CartItem, MenuCategory, MenuItem } from '../types/order';

interface MenuSectionProps {
  cart: CartItem[];
  totalItems: number;
  subtotal: number;
  onQuickAdd: (item: MenuItem) => void;
  onAdjustItemQty: (itemId: string, delta: number) => void;
  onSelectItem: (item: MenuItem) => void;
  onOpenCart: () => void;
}

const CATEGORY_ICONS: Record<MenuCategory, typeof Flame> = {
  'Todos os Itens': UtensilsCrossed,
  'Burgers & Smash': Utensils,
  'Linha Especial & Brasa': Flame,
  'Porções & Acompanhamentos': Sparkles,
  'Bebidas & Geladas': GlassWater,
};

export function MenuSection({
  cart,
  totalItems,
  subtotal,
  onQuickAdd,
  onAdjustItemQty,
  onSelectItem,
  onOpenCart,
}: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('Todos os Itens');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredItems =
    selectedCategory === 'Todos os Itens'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  const getItemQuantityInCart = (itemId: string) =>
    cart.filter((c) => c.item.id === itemId).reduce((sum, c) => sum + c.quantity, 0);

  const handleQuickAdd = (item: MenuItem) => {
    onQuickAdd(item);
    setJustAddedId(item.id);
    window.setTimeout(() => {
      setJustAddedId((curr) => (curr === item.id ? null : curr));
    }, 900);
  };

  return (
    <section
      id="cardapio"
      className="relative py-16 sm:py-20 bg-[#0E0D0C] border-t border-[#1D1A16]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Inline Cart Summary Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={MOTION.viewport}
            transition={{ duration: MOTION.duration.normal, ease: MOTION.ease.smooth }}
            className="space-y-2.5 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#E86318]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>CARDÁPIO DIGITAL EURO</span>
            </div>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold text-[#F5EFE6] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Sabor Incomparável da Grelha
            </h2>
            <p className="text-sm sm:text-[15px] text-[#A89E92] leading-relaxed">
              Escolha seu burger favorito, acompanhamentos e bebidas geladas. Toque em &ldquo;+
              Adicionar&rdquo; para enviar a lista prontinha direto para o nosso WhatsApp.
            </p>
          </motion.div>

          {/* Live Order Bar matching screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={MOTION.viewport}
            transition={{ duration: MOTION.duration.normal, delay: 0.08 }}
            className="flex items-center gap-3 self-start lg:self-end shrink-0"
          >
            <button
              type="button"
              onClick={onOpenCart}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#181613] hover:bg-[#1F1C18] border border-[#2D2721] text-xs font-semibold text-[#F5EFE6] transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-[#E5A93C]" />
              <span className="tabular-nums">
                {totalItems === 1 ? '1 item' : `${totalItems} itens`}
              </span>
              {totalItems > 0 && (
                <>
                  <span className="text-[#6F665D]">·</span>
                  <span className="text-[#E5A93C] font-bold tabular-nums">
                    {formatBRL(subtotal)}
                  </span>
                </>
              )}
            </button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenCart}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E86318] hover:bg-[#F27127] text-[#110F0D] text-xs font-bold whitespace-nowrap shadow-[0_6px_20px_rgba(232,99,24,0.25)] transition-colors"
            >
              <span>Concluir Pedido</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </motion.button>
          </motion.div>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Categorias do cardápio"
          className="flex items-center gap-2.5 overflow-x-auto pb-3 mb-7 no-scrollbar"
        >
          {MENU_CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category];
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(category)}
                className={`relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isSelected
                    ? 'text-[#110F0D]'
                    : 'bg-[#181613] text-[#C9BFB2] hover:text-[#F5EFE6] border border-[#2A2520] hover:border-[#3A322A]'
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="menu-category-active-bg"
                    transition={{ duration: MOTION.duration.normal, ease: MOTION.ease.smooth }}
                    className="absolute inset-0 rounded-xl bg-[#E86318] shadow-[0_4px_16px_rgba(232,99,24,0.28)]"
                  />
                )}
                <Icon className="relative z-10 w-3.5 h-3.5" />
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>

        {/* 4-Column Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const qtyInCart = getItemQuantityInCart(item.id);
              const isJustAdded = justAddedId === item.id;

              return (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: MOTION.duration.normal, ease: MOTION.ease.smooth }}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-[#181613] border border-[#2A2520] hover:border-[#E86318]/45 transition-colors duration-200 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                >
                  {/* 4:3 Image Container */}
                  <div
                    onClick={() => onSelectItem(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectItem(item);
                      }
                    }}
                    aria-label={`Personalizar ${item.name}`}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-[#211D19] cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181613]/75 via-transparent to-black/20" />

                    {item.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#E5A93C] text-[#110F0D] text-[10.5px] font-bold tracking-wide shadow-sm">
                        {item.badge}
                      </span>
                    )}

                    <span className="absolute bottom-2.5 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2.5 py-1 rounded-md bg-[#110F0D]/85 backdrop-blur-sm border border-white/10 text-[10.5px] font-medium text-[#F5EFE6]">
                      Personalizar
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between gap-4">
                    <div className="space-y-1.5">
                      <h3
                        onClick={() => onSelectItem(item)}
                        className="font-display text-[17.5px] font-bold text-[#F5EFE6] leading-snug cursor-pointer group-hover:text-[#E5A93C] transition-colors"
                      >
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#9E9488] leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Price & Action Footer */}
                    <div className="pt-3 border-t border-[#26211C] flex items-end justify-between gap-2">
                      <div>
                        <span className="block text-[10px] text-[#847B71] leading-none mb-1">
                          {item.unitLabel}
                        </span>
                        <span className="text-[17px] font-bold text-[#E5A93C] tabular-nums leading-none">
                          {formatBRL(item.price)}
                        </span>
                      </div>

                      {qtyInCart > 0 ? (
                        <div className="inline-flex items-center gap-1 rounded-lg bg-[#231E19] border border-[#E86318]/40 p-1">
                          <button
                            type="button"
                            onClick={() => onAdjustItemQty(item.id, -1)}
                            aria-label={`Remover uma unidade de ${item.name}`}
                            className="w-7 h-7 rounded-md flex items-center justify-center text-[#F5EFE6] hover:bg-[#332B23] transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="min-w-[20px] text-center text-xs font-bold text-[#F5EFE6] tabular-nums">
                            {qtyInCart}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuickAdd(item)}
                            aria-label={`Adicionar mais uma unidade de ${item.name}`}
                            className="w-7 h-7 rounded-md bg-[#E86318] hover:bg-[#F27127] text-[#110F0D] flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                        </div>
                      ) : (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleQuickAdd(item)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#E86318] hover:bg-[#F27127] text-[#110F0D] text-xs font-bold whitespace-nowrap transition-colors"
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[2.6]" />
                              <span>Adicionado</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5 stroke-[2.6]" />
                              <span>Adicionar</span>
                            </>
                          )}
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
