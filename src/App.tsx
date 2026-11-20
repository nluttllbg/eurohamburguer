/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { QualitySection } from './components/QualitySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { InfoModal, type InfoModalTab } from './components/InfoModal';
import type { BurgerDoneness, CartItem, MenuExtra, MenuItem } from './types/order';

const STORAGE_KEY = 'euro_hamburgueria_cart_v1';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [infoTab, setInfoTab] = useState<InfoModalTab>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  const totalItems = useMemo(
    () => cart.reduce((sum, entry) => sum + entry.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, entry) => {
        const extrasCost = entry.extras.reduce((s, e) => s + e.price, 0);
        return sum + (entry.item.price + extrasCost) * entry.quantity;
      }, 0),
    [cart]
  );

  const handleAddToCart = (
    item: MenuItem,
    quantity = 1,
    doneness?: BurgerDoneness,
    extras: MenuExtra[] = [],
    notes?: string
  ) => {
    const extrasIds = extras
      .map((e) => e.id)
      .sort()
      .join(',');
    const cartKey = `${item.id}::${doneness ?? ''}::${extrasIds}::${notes ?? ''}`;

    setCart((prev) => {
      const existing = prev.find((entry) => entry.cartKey === cartKey);
      if (existing) {
        return prev.map((entry) =>
          entry.cartKey === cartKey
            ? { ...entry, quantity: entry.quantity + quantity }
            : entry
        );
      }
      return [...prev, { cartKey, item, quantity, doneness, extras, notes }];
    });
  };

  const handleQuickAdd = (item: MenuItem) => {
    handleAddToCart(
      item,
      1,
      item.isBurger ? 'Ao Ponto (Suculento)' : undefined,
      [],
      undefined
    );
  };

  const handleAdjustItemQty = (itemId: string, delta: number) => {
    setCart((prev) => {
      let idx = -1;
      for (let i = prev.length - 1; i >= 0; i -= 1) {
        if (prev[i].item.id === itemId) {
          idx = i;
          break;
        }
      }
      if (idx === -1) return prev;
      const target = prev[idx];
      const nextQty = target.quantity + delta;
      if (nextQty <= 0) {
        return prev.filter((_, i) => i !== idx);
      }
      return prev.map((entry, i) => (i === idx ? { ...entry, quantity: nextQty } : entry));
    });
  };

  const handleUpdateCartKeyQty = (cartKey: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((entry) =>
          entry.cartKey === cartKey
            ? { ...entry, quantity: entry.quantity + delta }
            : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  };

  const handleRemoveCartItem = (cartKey: string) => {
    setCart((prev) => prev.filter((entry) => entry.cartKey !== cartKey));
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#0E0D0C] text-[#F5EFE6]">
        <Header totalItems={totalItems} onOpenCart={() => setIsCartOpen(true)} />

        <main className="flex-1">
          <HeroSection
            onOpenCart={() => setIsCartOpen(true)}
            onSelectFeatured={(item) => setSelectedItem(item)}
          />

          <MenuSection
            cart={cart}
            totalItems={totalItems}
            subtotal={subtotal}
            onQuickAdd={handleQuickAdd}
            onAdjustItemQty={handleAdjustItemQty}
            onSelectItem={(item) => setSelectedItem(item)}
            onOpenCart={() => setIsCartOpen(true)}
          />

          <QualitySection />

          <TestimonialsSection />

          <LocationSection onOpenCart={() => setIsCartOpen(true)} />
        </main>

        <Footer
          onOpenCart={() => setIsCartOpen(true)}
          onOpenInfoModal={(tab) => setInfoTab(tab)}
        />

        <ProductModal
          key={selectedItem?.id ?? 'closed'}
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={handleAddToCart}
        />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onUpdateQty={handleUpdateCartKeyQty}
          onRemoveItem={handleRemoveCartItem}
          onClearCart={() => setCart([])}
          onQuickAdd={handleQuickAdd}
        />

        <InfoModal activeTab={infoTab} onClose={() => setInfoTab(null)} />
      </div>
    </MotionConfig>
  );
}
