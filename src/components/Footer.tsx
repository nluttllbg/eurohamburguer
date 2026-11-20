import { Instagram, MapPin, MessageSquare, Phone, Share2, Star } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { WHATSAPP_DISPLAY } from '../data/menu';

interface FooterProps {
  onOpenCart: () => void;
  onOpenInfoModal: (tab: 'privacidade' | 'termos' | 'contato') => void;
}

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Av.+Quatro+de+Outubro+-+Jardim+Nova+Esperanca,+Goiania+-+GO,+74465-529';

export function Footer({ onOpenCart, onOpenInfoModal }: FooterProps) {
  return (
    <footer className="bg-[#0B0A09] border-t border-[#231F1B] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#1E1A16]">
          {/* Col 1: Brand & Rating */}
          <div className="space-y-4">
            <BrandLogo compact />
            <p className="text-xs text-[#9E9488] leading-relaxed">
              Autêntico sabor na brasa, burgers artesanais suculentos e a melhor hospitalidade
              noturna de Goiânia. Liderado com paixão e sabor.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-[#E5A93C] font-semibold">
              <Star className="w-3.5 h-3.5 fill-[#E5A93C] text-[#E5A93C]" />
              <span className="tabular-nums">4.7 de Avaliação (Google Reviews)</span>
            </div>
          </div>

          {/* Col 2: Hours */}
          <div className="space-y-3">
            <h3 className="font-sans text-sm font-bold text-[#F5EFE6]">
              Horários de Funcionamento
            </h3>
            <ul className="space-y-2 text-xs text-[#9E9488] tabular-nums">
              <li>
                <span className="block font-semibold text-[#D6CEC2]">Terça a Quinta-feira:</span>
                <span>18:30 às 23:30</span>
              </li>
              <li>
                <span className="block font-semibold text-[#D6CEC2]">Sexta e Sábado:</span>
                <span>18:30 às 00:30</span>
              </li>
              <li>
                <span className="block font-semibold text-[#D6CEC2]">Domingo:</span>
                <span>18:00 às 23:30</span>
              </li>
              <li className="pt-1 text-[#D96B43] font-medium">
                Segunda-feira: Fechado para descanso da brasa
              </li>
            </ul>
          </div>

          {/* Col 3: Address & Contact */}
          <div className="space-y-3">
            <h3 className="font-sans text-sm font-bold text-[#F5EFE6]">
              Endereço &amp; Contato
            </h3>
            <div className="space-y-2.5 text-xs text-[#9E9488]">
              <p className="font-semibold text-[#D6CEC2]">Euro Hambúrgueria Goiânia</p>
              <p className="leading-relaxed">
                Av. Quatro de Outubro - Jardim Nova Esperança
                <br />
                Goiânia - GO, CEP: 74465-529
              </p>
              <button
                type="button"
                onClick={onOpenCart}
                className="inline-flex items-center gap-2 text-[#E86318] hover:text-[#F27127] font-semibold tabular-nums transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{WHATSAPP_DISPLAY}</span>
              </button>
              <p className="text-[#9E9488]">Retirada no Balcão e Delivery</p>
            </div>
          </div>

          {/* Col 4: Social & Dica da Chef */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-sans text-sm font-bold text-[#F5EFE6] inline-flex items-center gap-2">
                <Share2 className="w-3.5 h-3.5 text-[#E86318]" />
                <span>Redes Sociais</span>
              </h3>
              <p className="text-xs text-[#9E9488] leading-relaxed">
                Acompanhe as novidades da brasa, lançamentos de burgers e promoções exclusivas.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Euro Hambúrgueria"
                className="w-9 h-9 rounded-lg bg-[#181613] hover:bg-[#241D17] border border-[#2D2721] flex items-center justify-center text-[#D6CEC2] hover:text-[#E5A93C] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={onOpenCart}
                aria-label="Pedir pelo WhatsApp"
                className="w-9 h-9 rounded-lg bg-[#181613] hover:bg-[#241D17] border border-[#2D2721] flex items-center justify-center text-[#D6CEC2] hover:text-[#E86318] transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver localização no Google Maps"
                className="w-9 h-9 rounded-lg bg-[#181613] hover:bg-[#241D17] border border-[#2D2721] flex items-center justify-center text-[#D6CEC2] hover:text-[#E5A93C] transition-colors"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>

            <div className="rounded-xl bg-[#161411] border border-[#2B251F] p-3.5 space-y-1">
              <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#E5A93C]">
                DICA DA CHEF
              </span>
              <p className="text-[11.5px] text-[#C9BFB2] leading-relaxed">
                Peça nosso Molho Especial da Casa e o blend com queijo prato artesanal!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11.5px] text-[#7D746A]">
          <p>© 2026 Euro Hambúrgueria - Todos os direitos reservados. Goiânia/GO.</p>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onOpenInfoModal('privacidade')}
              className="hover:text-[#F5EFE6] transition-colors"
            >
              Privacidade
            </button>
            <button
              type="button"
              onClick={() => onOpenInfoModal('termos')}
              className="hover:text-[#F5EFE6] transition-colors"
            >
              Termos de Uso
            </button>
            <button
              type="button"
              onClick={() => onOpenInfoModal('contato')}
              className="hover:text-[#F5EFE6] transition-colors"
            >
              Contato
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
