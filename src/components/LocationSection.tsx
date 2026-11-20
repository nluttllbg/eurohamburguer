import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Clock,
  CreditCard,
  ExternalLink,
  Flame,
  LocateFixed,
  MapPin,
  MessageSquare,
  Minus,
  Plus,
} from 'lucide-react';
import { MOTION } from '../motion/tokens';

interface LocationSectionProps {
  onOpenCart: () => void;
}

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Av.+Quatro+de+Outubro+-+Jardim+Nova+Esperanca,+Goiania+-+GO,+74465-529';

export function LocationSection({ onOpenCart }: LocationSectionProps) {
  const [zoom, setZoom] = useState(1);
  const [pinSelected, setPinSelected] = useState(true);

  const handleZoom = (delta: number) => {
    setZoom((prev) => Math.min(1.35, Math.max(0.9, Number((prev + delta).toFixed(2)))));
  };

  return (
    <section
      id="localizacao"
      className="py-16 sm:py-22 bg-[#141210] border-t border-[#231F1B]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Info Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={MOTION.viewport}
            transition={{ duration: MOTION.duration.normal, ease: MOTION.ease.smooth }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="space-y-3">
              <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#E86318]">
                VENHA NOS VISITAR
              </span>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold text-[#F5EFE6] tracking-tight leading-tight"
                style={{ textWrap: 'balance' }}
              >
                O Ponto do Sabor no Jardim Nova Esperança
              </h2>
              <p className="text-sm sm:text-[15px] text-[#A89E92] leading-relaxed">
                Estamos prontos para te receber com mesas acolhedoras ou preparar sua encomenda
                para retirada no balcão e entrega rápida em toda a região noroeste de Goiânia.
              </p>
            </div>

            {/* Structured Info List */}
            <div className="space-y-4 pt-1">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#221A14] border border-[#38291E] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#E86318]" />
                </div>
                <div>
                  <h3 className="font-sans text-sm font-bold text-[#F5EFE6]">Endereço</h3>
                  <p className="text-xs sm:text-[13px] text-[#A89E92] leading-relaxed mt-0.5">
                    Av. Quatro de Outubro - Jardim Nova Esperança, Goiânia - GO, 74465-529
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#221A14] border border-[#38291E] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-[#E5A93C]" />
                </div>
                <div>
                  <h3 className="font-sans text-sm font-bold text-[#F5EFE6]">
                    Horários de Funcionamento
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#A89E92] leading-relaxed mt-0.5">
                    Terça a Domingo das 18h30 às 23h30 (Sexta e Sábado até 00h30)
                  </p>
                  <p className="text-[11.5px] font-medium text-[#D96B43] mt-0.5">
                    Segunda-feira: Fechado para descanso da brasa
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#221A14] border border-[#38291E] flex items-center justify-center shrink-0 mt-0.5">
                  <CreditCard className="w-4 h-4 text-[#E86318]" />
                </div>
                <div>
                  <h3 className="font-sans text-sm font-bold text-[#F5EFE6]">
                    Formas de Pagamento
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#A89E92] leading-relaxed mt-0.5">
                    Pix com chave rápida, Cartões de Débito, Crédito e Dinheiro em espécie
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1D1A17] hover:bg-[#26221E] border border-[#332C25] text-xs font-semibold text-[#F5EFE6] whitespace-nowrap transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#E5A93C]" />
                <span>Abrir no Google Maps</span>
              </motion.a>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenCart}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E86318] hover:bg-[#F27127] text-[#110F0D] text-xs font-bold whitespace-nowrap shadow-[0_6px_22px_rgba(232,99,24,0.28)] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 stroke-[2.3]" />
                <span>Chamar no WhatsApp</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Interactive Map Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={MOTION.viewport}
            transition={{ duration: MOTION.duration.slow, ease: MOTION.ease.smooth }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-2xl overflow-hidden bg-[#1D2430] border border-[#2F2923] shadow-[0_24px_60px_rgba(0,0,0,0.55)] aspect-[16/10] min-h-[340px]">
              {/* Interactive Vector Map of Região Noroeste · Goiânia */}
              <div
                className="w-full h-full transition-transform duration-300 ease-out origin-center"
                style={{ transform: `scale(${zoom})` }}
              >
                <svg
                  viewBox="0 0 800 500"
                  className="w-full h-full object-cover select-none"
                  role="img"
                  aria-label="Mapa da localização da Euro Hambúrgueria no Jardim Nova Esperança, Goiânia"
                >
                  {/* Base terrain */}
                  <rect width="800" height="500" fill="#E8ECEF" />

                  {/* Green parks & reserves */}
                  <path
                    d="M0,120 L180,95 L230,220 L110,275 L0,250 Z"
                    fill="#CBE5C8"
                  />
                  <path
                    d="M520,0 L710,0 L680,145 L510,115 Z"
                    fill="#D4EBD1"
                  />
                  <path
                    d="M600,280 L800,240 L800,430 L640,420 Z"
                    fill="#D4EBD1"
                  />

                  {/* Meia Ponte River / Water channel */}
                  <path
                    d="M510,0 C490,90 560,150 535,230 C515,295 570,380 620,500"
                    fill="none"
                    stroke="#A6CEEC"
                    strokeWidth="16"
                    strokeLinecap="round"
                  />
                  <ellipse cx="145" cy="215" rx="34" ry="18" fill="#A6CEEC" />

                  {/* Urban neighborhood grid lines */}
                  <g stroke="#FFFFFF" strokeWidth="4" opacity="0.85">
                    <line x1="0" y1="85" x2="800" y2="115" />
                    <line x1="0" y1="190" x2="800" y2="215" />
                    <line x1="0" y1="305" x2="800" y2="290" />
                    <line x1="0" y1="395" x2="800" y2="415" />
                    <line x1="120" y1="0" x2="95" y2="500" />
                    <line x1="255" y1="0" x2="235" y2="500" />
                    <line x1="395" y1="0" x2="415" y2="500" />
                    <line x1="655" y1="0" x2="680" y2="500" />
                  </g>

                  {/* Major Highways (GO-070 & Av. Perimetral Norte) */}
                  <path
                    d="M0,335 Q250,275 495,210 T800,155"
                    fill="none"
                    stroke="#F8D57E"
                    strokeWidth="9"
                  />
                  <path
                    d="M0,335 Q250,275 495,210 T800,155"
                    fill="none"
                    stroke="#E5A93C"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                  />
                  <path
                    d="M170,0 Q295,180 410,335 T645,500"
                    fill="none"
                    stroke="#F5D073"
                    strokeWidth="8"
                  />

                  {/* Av. Quatro de Outubro & Av. Cândido Portinari */}
                  <path
                    d="M245,285 L435,248"
                    stroke="#E86318"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M325,215 L350,340"
                    stroke="#FFFFFF"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />

                  {/* Highway Badges */}
                  <g transform="translate(155, 290)">
                    <rect width="46" height="18" rx="4" fill="#FFFFFF" stroke="#9AA5B1" />
                    <text
                      x="23"
                      y="12.5"
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="700"
                      fill="#334155"
                    >
                      GO-070
                    </text>
                  </g>
                  <g transform="translate(555, 195)">
                    <rect width="46" height="18" rx="4" fill="#FFFFFF" stroke="#9AA5B1" />
                    <text
                      x="23"
                      y="12.5"
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="700"
                      fill="#334155"
                    >
                      GO-080
                    </text>
                  </g>

                  {/* Landmarks Labels */}
                  <g fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="600" fill="#475569">
                    <text x="155" y="192" fontSize="10" textAnchor="middle">
                      Complexo Engenho Velho
                    </text>
                    <text x="545" y="218" fontSize="10.5" fill="#1D4ED8" textAnchor="middle">
                      Passeio das Águas Shopping
                    </text>
                    <text x="275" y="346" fontSize="10" fill="#1D4ED8" textAnchor="middle">
                      Portal Shopping
                    </text>
                    <text x="415" y="425" fontSize="10" fill="#1D4ED8" textAnchor="middle">
                      Shopping Cerrado
                    </text>
                    <text x="655" y="88" fontSize="10" fill="#334155" textAnchor="middle">
                      Campus Samambaia · UFG
                    </text>
                    <text x="330" y="310" fontSize="11" fontWeight="700" fill="#1E293B" textAnchor="middle">
                      Jardim Nova Esperança
                    </text>
                  </g>

                  {/* District highlight radius */}
                  <circle
                    cx="335"
                    cy="268"
                    r="52"
                    fill="rgba(232, 99, 24, 0.12)"
                    stroke="#E86318"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                </svg>
              </div>

              {/* Interactive Store Pin Overlay */}
              <div className="absolute left-[41.8%] top-[53.5%] -translate-x-1/2 -translate-y-full z-10 flex flex-col items-center">
                {pinSelected && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="mb-2 px-3.5 py-2 rounded-xl bg-[#141210]/95 backdrop-blur-md border border-[#E86318]/45 shadow-xl text-left whitespace-nowrap"
                  >
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-[#E86318]" />
                      <span className="text-xs font-bold text-[#F5EFE6]">
                        Euro Hambúrgueria
                      </span>
                    </div>
                    <span className="block text-[10px] text-[#B5ABA0] mt-0.5">
                      Av. Quatro de Outubro · Delivery 35–50 min
                    </span>
                  </motion.div>
                )}

                <button
                  type="button"
                  onClick={() => setPinSelected((p) => !p)}
                  aria-label="Alternar detalhes do marcador Euro Hambúrgueria"
                  className="relative group focus:outline-none"
                >
                  <span className="w-10 h-10 rounded-full bg-[#E86318] border-2 border-[#F5EFE6] shadow-[0_6px_20px_rgba(232,99,24,0.65)] flex items-center justify-center transition-transform group-hover:scale-110">
                    <MapPin className="w-5 h-5 text-[#110F0D] stroke-[2.4]" />
                  </span>
                </button>
              </div>

              {/* Top-Right Interactive Map Controls */}
              <div className="absolute top-3.5 right-3.5 z-10 flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => handleZoom(0.15)}
                  aria-label="Aproximar mapa"
                  className="w-8 h-8 rounded-lg bg-[#141210]/90 hover:bg-[#1E1A16] border border-white/15 text-[#F5EFE6] flex items-center justify-center shadow-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleZoom(-0.15)}
                  aria-label="Afastar mapa"
                  className="w-8 h-8 rounded-lg bg-[#141210]/90 hover:bg-[#1E1A16] border border-white/15 text-[#F5EFE6] flex items-center justify-center shadow-md transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setZoom(1);
                    setPinSelected(true);
                  }}
                  aria-label="Centralizar no Jardim Nova Esperança"
                  className="w-8 h-8 rounded-lg bg-[#141210]/90 hover:bg-[#1E1A16] border border-white/15 text-[#E5A93C] flex items-center justify-center shadow-md transition-colors"
                >
                  <LocateFixed className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Dark Overlay Bar matching Design System */}
              <div className="absolute inset-x-3 bottom-3 z-10 px-4 py-3 rounded-xl bg-[#141210]/92 backdrop-blur-md border border-[#2D2720] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#241A13] border border-[#3C2B1E] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#E86318]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#F5EFE6] leading-tight">
                      Jardim Nova Esperança
                    </p>
                    <p className="text-[11px] text-[#9E9488] mt-0.5">
                      Região Noroeste · Goiânia
                    </p>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-lg bg-[#251D13] border border-[#E5A93C]/35 text-[11px] font-bold text-[#E5A93C] whitespace-nowrap">
                  Aberto Hoje às 18:30
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
