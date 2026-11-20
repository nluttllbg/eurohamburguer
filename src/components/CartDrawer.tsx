import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Check,
  Copy,
  MessageSquare,
  Minus,
  Plus,
  ShoppingBag,
  Store,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import { DELIVERY_FEE, MENU_ITEMS, WHATSAPP_NUMBER, formatBRL } from '../data/menu';
import { MOTION } from '../motion/tokens';
import type { CartItem, FulfillmentType, MenuItem, PaymentMethod } from '../types/order';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (cartKey: string, delta: number) => void;
  onRemoveItem: (cartKey: string) => void;
  onClearCart: () => void;
  onQuickAdd: (item: MenuItem) => void;
}

const PAYMENT_OPTIONS: PaymentMethod[] = [
  'Pix',
  'Cartão de Crédito',
  'Cartão de Débito',
  'Dinheiro',
];

export function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onQuickAdd,
}: CartDrawerProps) {
  const [fulfillment, setFulfillment] = useState<FulfillmentType>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState<PaymentMethod>('Pix');
  const [orderNotes, setOrderNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, entry) => {
        const extrasCost = entry.extras.reduce((s, e) => s + e.price, 0);
        return sum + (entry.item.price + extrasCost) * entry.quantity;
      }, 0),
    [cart]
  );

  const deliveryCost = cart.length > 0 && fulfillment === 'delivery' ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryCost;

  const whatsappMessage = useMemo(() => {
    if (cart.length === 0) {
      return 'Olá, Euro Hambúrgueria! Gostaria de fazer um pedido pelo cardápio digital.';
    }

    const lines: string[] = [
      '*NOVO PEDIDO — EURO HAMBÚRGUERIA*',
      '--------------------------------',
    ];

    cart.forEach((entry, index) => {
      const extrasCost = entry.extras.reduce((s, e) => s + e.price, 0);
      const lineTotal = (entry.item.price + extrasCost) * entry.quantity;
      lines.push(`${index + 1}. *${entry.quantity}x ${entry.item.name}* — ${formatBRL(lineTotal)}`);
      if (entry.doneness) {
        lines.push(`   • Ponto: ${entry.doneness}`);
      }
      if (entry.extras.length > 0) {
        lines.push(`   • Adicionais: ${entry.extras.map((e) => e.name).join(', ')}`);
      }
      if (entry.notes) {
        lines.push(`   • Obs: ${entry.notes}`);
      }
    });

    lines.push('--------------------------------');
    lines.push(
      `Modalidade: ${
        fulfillment === 'delivery' ? 'Entrega Delivery' : 'Retirada no Balcão'
      }`
    );
    if (customerName.trim()) {
      lines.push(`Cliente: ${customerName.trim()}`);
    }
    if (fulfillment === 'delivery' && address.trim()) {
      lines.push(`Endereço: ${address.trim()}`);
    }
    lines.push(`Pagamento: ${payment}`);
    if (orderNotes.trim()) {
      lines.push(`Observações: ${orderNotes.trim()}`);
    }
    lines.push(`Subtotal: ${formatBRL(subtotal)}`);
    if (deliveryCost > 0) {
      lines.push(`Taxa de entrega: ${formatBRL(deliveryCost)}`);
    }
    lines.push(`*Total: ${formatBRL(total)}*`);

    return lines.join('\n');
  }, [cart, fulfillment, customerName, address, payment, orderNotes, subtotal, deliveryCost, total]);

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const validateBeforeSend = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (cart.length === 0) {
      return;
    }
    if (!customerName.trim()) {
      e.preventDefault();
      setFormError('Por favor, informe seu nome para identificarmos o pedido.');
      return;
    }
    if (fulfillment === 'delivery' && !address.trim()) {
      e.preventDefault();
      setFormError('Informe a rua, número e setor para a entrega em Goiânia.');
      return;
    }
    setFormError(null);
    setOrderConfirmed(true);
  };

  const handleCopySummary = async () => {
    if (cart.length > 0 && !customerName.trim()) {
      setFormError('Informe seu nome antes de copiar o resumo do pedido.');
      return;
    }
    setFormError(null);
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Sacola de pedido WhatsApp"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Slide-over Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: MOTION.duration.normal, ease: MOTION.ease.smooth }}
            className="relative z-10 w-full max-w-md bg-[#141210] border-l border-[#2B251F] h-full flex flex-col shadow-[-24px_0_60px_rgba(0,0,0,0.7)]"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#25201B] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#241B13] border border-[#3B2A1C] flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-[#E86318]" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-[#F5EFE6] leading-tight">
                    Seu Pedido na Brasa
                  </h2>
                  <p className="text-[11px] text-[#9E9488]">
                    Envio rápido e direto pelo WhatsApp
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar sacola"
                className="w-9 h-9 rounded-lg bg-[#1D1A17] hover:bg-[#28231E] border border-[#2F2922] text-[#D6CEC2] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {cart.length === 0 ? (
                <div className="py-10 text-center space-y-5">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-[#1B1814] border border-[#2E2720] flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-[#E5A93C]" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="font-display text-xl font-bold text-[#F5EFE6]">
                      Sua sacola está vazia
                    </p>
                    <p className="text-xs text-[#9E9488] max-w-xs mx-auto leading-relaxed">
                      Adicione os nossos burgers artesanais, batatas rústicas ou mini pastéis de
                      costela para montar seu pedido.
                    </p>
                  </div>

                  {/* Quick Suggestions */}
                  <div className="pt-2 text-left space-y-2">
                    <span className="block text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#E5A93C]">
                      Sugestões Mais Pedidas
                    </span>
                    {MENU_ITEMS.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl bg-[#1A1714] border border-[#2A241E] flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-11 h-11 rounded-lg object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-[#F5EFE6] truncate">
                              {item.name}
                            </p>
                            <p className="text-xs font-bold text-[#E5A93C] tabular-nums">
                              {formatBRL(item.price)}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onQuickAdd(item)}
                          className="px-3 py-1.5 rounded-lg bg-[#E86318] hover:bg-[#F27127] text-[#110F0D] text-[11px] font-bold shrink-0"
                        >
                          + Adicionar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {/* Itemized List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#A89E92]">
                        Itens Selecionados
                      </span>
                      <button
                        type="button"
                        onClick={onClearCart}
                        className="text-[11px] text-[#9E9488] hover:text-[#D96B43] transition-colors"
                      >
                        Limpar sacola
                      </button>
                    </div>

                    {cart.map((entry) => {
                      const extrasCost = entry.extras.reduce((s, e) => s + e.price, 0);
                      const unitTotal = entry.item.price + extrasCost;

                      return (
                        <div
                          key={entry.cartKey}
                          className="p-3.5 rounded-xl bg-[#191714] border border-[#2A2520] flex gap-3"
                        >
                          <img
                            src={entry.item.image}
                            alt={entry.item.name}
                            className="w-16 h-16 rounded-lg object-cover shrink-0 bg-[#221E1A]"
                          />
                          <div className="flex-1 min-w-0 space-y-1.5">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-display text-sm font-bold text-[#F5EFE6] leading-snug">
                                {entry.item.name}
                              </h3>
                              <button
                                type="button"
                                onClick={() => onRemoveItem(entry.cartKey)}
                                aria-label={`Remover ${entry.item.name}`}
                                className="text-[#7D746A] hover:text-[#D96B43] transition-colors shrink-0"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {(entry.doneness || entry.extras.length > 0 || entry.notes) && (
                              <div className="text-[11px] text-[#9E9488] space-y-0.5">
                                {entry.doneness && <p>Ponto: {entry.doneness}</p>}
                                {entry.extras.length > 0 && (
                                  <p>+ {entry.extras.map((e) => e.name).join(', ')}</p>
                                )}
                                {entry.notes && <p className="italic">Obs: {entry.notes}</p>}
                              </div>
                            )}

                            <div className="pt-1 flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-[#E5A93C] tabular-nums">
                                {formatBRL(unitTotal * entry.quantity)}
                              </span>

                              <div className="inline-flex items-center gap-1 rounded-lg bg-[#231E19] border border-[#322B24] p-0.5">
                                <button
                                  type="button"
                                  onClick={() => onUpdateQty(entry.cartKey, -1)}
                                  aria-label="Diminuir"
                                  className="w-6 h-6 rounded flex items-center justify-center text-[#F5EFE6] hover:bg-[#312922]"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="min-w-[18px] text-center text-xs font-bold text-[#F5EFE6] tabular-nums">
                                  {entry.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => onUpdateQty(entry.cartKey, 1)}
                                  aria-label="Aumentar"
                                  className="w-6 h-6 rounded flex items-center justify-center text-[#F5EFE6] hover:bg-[#312922]"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Fulfillment Toggle */}
                  <div className="space-y-2.5 pt-2 border-t border-[#25201B]">
                    <span className="block text-xs font-bold text-[#F5EFE6]">
                      Como deseja receber?
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setFulfillment('delivery')}
                        className={`p-3 rounded-xl border text-left transition-colors ${
                          fulfillment === 'delivery'
                            ? 'bg-[#241B14] border-[#E86318] text-[#F5EFE6]'
                            : 'bg-[#191714] border-[#2A2520] text-[#9E9488]'
                        }`}
                      >
                        <div className="flex items-center gap-2 text-xs font-bold">
                          <Truck className="w-3.5 h-3.5 text-[#E86318]" />
                          <span>Delivery</span>
                        </div>
                        <span className="block text-[10.5px] mt-1 tabular-nums">
                          Taxa fixa {formatBRL(DELIVERY_FEE)}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFulfillment('pickup')}
                        className={`p-3 rounded-xl border text-left transition-colors ${
                          fulfillment === 'pickup'
                            ? 'bg-[#241B14] border-[#E86318] text-[#F5EFE6]'
                            : 'bg-[#191714] border-[#2A2520] text-[#9E9488]'
                        }`}
                      >
                        <div className="flex items-center gap-2 text-xs font-bold">
                          <Store className="w-3.5 h-3.5 text-[#E5A93C]" />
                          <span>Retirar no Balcão</span>
                        </div>
                        <span className="block text-[10.5px] mt-1">Sem taxa · 20–30 min</span>
                      </button>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="space-y-3 pt-2 border-t border-[#25201B]">
                    <div>
                      <label
                        htmlFor="customer-name"
                        className="block text-xs font-semibold text-[#D6CEC2] mb-1.5"
                      >
                        Seu Nome *
                      </label>
                      <input
                        id="customer-name"
                        type="text"
                        value={customerName}
                        onChange={(e) => {
                          setCustomerName(e.target.value);
                          setFormError(null);
                        }}
                        placeholder="Ex: João Pedro"
                        className="w-full rounded-xl bg-[#1A1815] border border-[#2E2822] focus:border-[#E86318] px-3.5 py-2.5 text-xs text-[#F5EFE6] placeholder:text-[#786F66] outline-none"
                      />
                    </div>

                    {fulfillment === 'delivery' && (
                      <div>
                        <label
                          htmlFor="customer-address"
                          className="block text-xs font-semibold text-[#D6CEC2] mb-1.5"
                        >
                          Endereço em Goiânia *
                        </label>
                        <input
                          id="customer-address"
                          type="text"
                          value={address}
                          onChange={(e) => {
                            setAddress(e.target.value);
                            setFormError(null);
                          }}
                          placeholder="Rua, quadra, lote e ponto de referência"
                          className="w-full rounded-xl bg-[#1A1815] border border-[#2E2822] focus:border-[#E86318] px-3.5 py-2.5 text-xs text-[#F5EFE6] placeholder:text-[#786F66] outline-none"
                        />
                      </div>
                    )}

                    <div>
                      <span className="block text-xs font-semibold text-[#D6CEC2] mb-1.5">
                        Forma de Pagamento
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {PAYMENT_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setPayment(opt)}
                            className={`px-3 py-2 rounded-xl border text-[11.5px] font-semibold transition-colors ${
                              payment === opt
                                ? 'bg-[#E86318]/15 border-[#E86318] text-[#F5EFE6]'
                                : 'bg-[#191714] border-[#2A2520] text-[#9E9488] hover:text-[#F5EFE6]'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="order-notes"
                        className="block text-xs font-semibold text-[#D6CEC2] mb-1.5"
                      >
                        Observações gerais (troco, campainha, etc.)
                      </label>
                      <input
                        id="order-notes"
                        type="text"
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="Ex: Troco para R$ 100 / Interfone 12"
                        className="w-full rounded-xl bg-[#1A1815] border border-[#2E2822] focus:border-[#E86318] px-3.5 py-2.5 text-xs text-[#F5EFE6] placeholder:text-[#786F66] outline-none"
                      />
                    </div>

                    {formError && (
                      <p className="text-xs font-medium text-[#D96B43] bg-[#D96B43]/10 border border-[#D96B43]/30 rounded-lg px-3 py-2">
                        {formError}
                      </p>
                    )}

                    {orderConfirmed && (
                      <div className="text-xs text-[#E5A93C] bg-[#E5A93C]/10 border border-[#E5A93C]/30 rounded-lg px-3 py-2.5">
                        Pedido pronto! Caso o WhatsApp não abra automaticamente, use o botão
                        &ldquo;Copiar Resumo&rdquo; abaixo.
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Footer Totals & WhatsApp Dispatch */}
            <div className="px-6 py-4 border-t border-[#25201B] bg-[#110F0D] space-y-3">
              {cart.length > 0 && (
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-[#9E9488]">
                    <span>Subtotal</span>
                    <span className="tabular-nums">{formatBRL(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#9E9488]">
                    <span>
                      {fulfillment === 'delivery' ? 'Taxa de entrega' : 'Retirada no balcão'}
                    </span>
                    <span className="tabular-nums">
                      {deliveryCost > 0 ? formatBRL(deliveryCost) : 'Grátis'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#F5EFE6] pt-1.5 border-t border-[#221E1A]">
                    <span>Total do Pedido</span>
                    <span className="text-[#E5A93C] tabular-nums">{formatBRL(total)}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2.5">
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="px-3.5 py-3 rounded-xl bg-[#1D1A17] hover:bg-[#27221E] border border-[#322B24] text-xs font-semibold text-[#F5EFE6] inline-flex items-center gap-1.5 shrink-0 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#E5A93C]" />
                        <span>Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#E5A93C]" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                )}

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={validateBeforeSend}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#E86318] hover:bg-[#F27127] text-[#110F0D] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-[0_6px_22px_rgba(232,99,24,0.3)] transition-colors"
                >
                  <MessageSquare className="w-4 h-4 stroke-[2.3]" />
                  <span>
                    {cart.length > 0 ? 'Enviar Pedido no WhatsApp' : 'Conversar no WhatsApp'}
                  </span>
                </a>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
