import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Clock, Flame, Minus, Plus, X } from 'lucide-react';
import { BURGER_EXTRAS, formatBRL } from '../data/menu';
import { MOTION } from '../motion/tokens';
import type { BurgerDoneness, MenuExtra, MenuItem } from '../types/order';

interface ProductModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    quantity: number,
    doneness?: BurgerDoneness,
    extras?: MenuExtra[],
    notes?: string
  ) => void;
}

const DONENESS_OPTIONS: BurgerDoneness[] = [
  'Ao Ponto (Suculento)',
  'Ao Ponto para Bem',
  'Bem Passado',
];

export function ProductModal({ item, onClose, onAddToCart }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [doneness, setDoneness] = useState<BurgerDoneness>('Ao Ponto (Suculento)');
  const [selectedExtras, setSelectedExtras] = useState<MenuExtra[]>([]);
  const [notes, setNotes] = useState('');

  const toggleExtra = (extra: MenuExtra) => {
    setSelectedExtras((prev) =>
      prev.some((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const totalUnitPrice = (item?.price ?? 0) + extrasTotal;
  const finalPrice = totalUnitPrice * quantity;

  const handleConfirm = () => {
    if (!item) return;
    onAddToCart(
      item,
      quantity,
      item.isBurger ? doneness : undefined,
      selectedExtras,
      notes.trim() || undefined
    );
    onClose();
  };

  return (
    <AnimatePresence>
      {item && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: MOTION.duration.normal, ease: MOTION.ease.smooth }}
          className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[#161411] border border-[#2F2922] shadow-[0_24px_70px_rgba(0,0,0,0.75)]"
        >
          {/* Image Header */}
          <div className="relative aspect-[16/10] w-full bg-[#201C18]">
            <img
              src={item.image}
              alt={item.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161411] via-[#161411]/30 to-black/30" />

            {item.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#E5A93C] text-[#110F0D] text-[11px] font-bold">
                {item.badge}
              </span>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar detalhes do produto"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#110F0D]/80 hover:bg-[#110F0D] border border-white/15 text-[#F5EFE6] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E86318]">
                  {item.category}
                </span>
                {item.prepTime && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#9E9488] tabular-nums">
                    <Clock className="w-3 h-3 text-[#E5A93C]" />
                    <span>{item.prepTime}</span>
                  </span>
                )}
              </div>

              <h3
                id="product-modal-title"
                className="font-display text-2xl font-bold text-[#F5EFE6]"
              >
                {item.name}
              </h3>

              <p className="text-xs sm:text-[13px] text-[#B5ABA0] leading-relaxed">
                {item.fullDescription}
              </p>
            </div>

            {/* Burger Doneness */}
            {item.isBurger && (
              <div className="space-y-2.5 pt-2 border-t border-[#26211C]">
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#F5EFE6]">
                  <Flame className="w-3.5 h-3.5 text-[#E86318]" />
                  <span>Ponto da Carne na Brasa</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {DONENESS_OPTIONS.map((opt) => {
                    const active = doneness === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setDoneness(opt)}
                        className={`px-3 py-2 rounded-xl text-[11.5px] font-semibold border transition-colors text-center ${
                          active
                            ? 'bg-[#E86318]/15 border-[#E86318] text-[#F5EFE6]'
                            : 'bg-[#1D1A17] border-[#2C2620] text-[#A89E92] hover:text-[#F5EFE6]'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Optional Add-ons for Burgers */}
            {item.isBurger && (
              <div className="space-y-2.5 pt-2 border-t border-[#26211C]">
                <span className="block text-xs font-bold text-[#F5EFE6]">
                  Adicionais Artesanais (Opcional)
                </span>
                <div className="space-y-2">
                  {BURGER_EXTRAS.map((extra) => {
                    const checked = selectedExtras.some((e) => e.id === extra.id);
                    return (
                      <button
                        key={extra.id}
                        type="button"
                        onClick={() => toggleExtra(extra)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border flex items-center justify-between gap-3 text-left transition-colors ${
                          checked
                            ? 'bg-[#241B14] border-[#E86318]/60'
                            : 'bg-[#1B1815] border-[#29241E] hover:border-[#3A3229]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-4 h-4 rounded flex items-center justify-center border ${
                              checked
                                ? 'bg-[#E86318] border-[#E86318] text-[#110F0D]'
                                : 'border-[#4D443B]'
                            }`}
                          >
                            {checked && <Check className="w-3 h-3 stroke-[3]" />}
                          </span>
                          <span className="text-xs font-medium text-[#E8DFD1]">
                            {extra.name}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-[#E5A93C] tabular-nums shrink-0">
                          + {formatBRL(extra.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="space-y-2 pt-2 border-t border-[#26211C]">
              <label htmlFor="item-notes" className="block text-xs font-bold text-[#F5EFE6]">
                Observações (ex: tirar cebola, maionese à parte)
              </label>
              <textarea
                id="item-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Alguma preferência no preparo?"
                className="w-full rounded-xl bg-[#1C1916] border border-[#2E2822] focus:border-[#E86318] px-3.5 py-2.5 text-xs text-[#F5EFE6] placeholder:text-[#786F66] outline-none resize-none"
              />
            </div>

            {/* Footer Qty + Confirm */}
            <div className="pt-3 border-t border-[#26211C] flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-1.5 rounded-xl bg-[#1E1B17] border border-[#322B24] p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Diminuir quantidade"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#F5EFE6] hover:bg-[#2B251F] transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="min-w-[24px] text-center text-sm font-bold text-[#F5EFE6] tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Aumentar quantidade"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#F5EFE6] hover:bg-[#2B251F] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleConfirm}
                className="flex-1 py-3 px-5 rounded-xl bg-[#E86318] hover:bg-[#F27127] text-[#110F0D] text-xs sm:text-sm font-bold flex items-center justify-between gap-2 shadow-[0_6px_22px_rgba(232,99,24,0.3)] transition-colors"
              >
                <span>Adicionar ao Pedido</span>
                <span className="tabular-nums">{formatBRL(finalPrice)}</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
