import { AnimatePresence, motion } from 'motion/react';
import { Clock, MapPin, Phone, ShieldCheck, X } from 'lucide-react';
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '../data/menu';
import { MOTION } from '../motion/tokens';

export type InfoModalTab = 'privacidade' | 'termos' | 'contato' | null;

interface InfoModalProps {
  activeTab: InfoModalTab;
  onClose: () => void;
}

export function InfoModal({ activeTab, onClose }: InfoModalProps) {
  return (
    <AnimatePresence>
      {activeTab && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: MOTION.duration.normal, ease: MOTION.ease.smooth }}
          className="relative z-10 w-full max-w-md rounded-2xl bg-[#161411] border border-[#2F2922] p-6 shadow-2xl space-y-4"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E5A93C]" />
              <h3 className="font-display text-xl font-bold text-[#F5EFE6]">
                {activeTab === 'privacidade' && 'Política de Privacidade'}
                {activeTab === 'termos' && 'Termos de Uso'}
                {activeTab === 'contato' && 'Fale com a Euro Hambúrgueria'}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar janela"
              className="w-8 h-8 rounded-lg bg-[#1F1C18] hover:bg-[#2A2520] text-[#D6CEC2] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {activeTab === 'privacidade' && (
            <div className="space-y-3 text-xs text-[#B5ABA0] leading-relaxed">
              <p>
                A Euro Hambúrgueria respeita a sua privacidade. Os dados informados no montador de
                pedidos (nome, endereço de entrega e forma de pagamento) ficam salvos apenas no seu
                navegador para agilizar o envio direto via WhatsApp.
              </p>
              <p>
                Não compartilhamos seus dados com terceiros nem realizamos cobranças automáticas
                pelo site.
              </p>
            </div>
          )}

          {activeTab === 'termos' && (
            <div className="space-y-3 text-xs text-[#B5ABA0] leading-relaxed">
              <p>
                Os valores apresentados no Cardápio Digital são referentes ao atendimento no balcão
                e delivery na região noroeste de Goiânia (Jardim Nova Esperança e bairros
                vizinhos).
              </p>
              <p>
                O tempo médio de entrega é de 35 a 50 minutos, podendo variar em horários de pico
                nas noites de sexta-feira e sábado.
              </p>
            </div>
          )}

          {activeTab === 'contato' && (
            <div className="space-y-3 text-xs text-[#B5ABA0]">
              <div className="p-3 rounded-xl bg-[#1B1815] border border-[#2A2520] flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E86318] shrink-0 mt-0.5" />
                <span>Av. Quatro de Outubro - Jardim Nova Esperança, Goiânia - GO, 74465-529</span>
              </div>
              <div className="p-3 rounded-xl bg-[#1B1815] border border-[#2A2520] flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                <span>Terça a Domingo a partir das 18:30 (Fechado às segundas-feiras)</span>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#E86318] hover:bg-[#F27127] text-[#110F0D] font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Chamar no WhatsApp {WHATSAPP_DISPLAY}</span>
              </a>
            </div>
          )}
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
