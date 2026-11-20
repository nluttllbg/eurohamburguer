interface BrandLogoProps {
  compact?: boolean;
}

export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <div className="flex items-center gap-3 shrink-0 select-none">
      {/* Custom circular ember burger emblem */}
      <div className="relative w-10 h-10 rounded-full bg-[#1C1713] border border-[#E5A93C]/40 flex items-center justify-center shadow-[0_0_20px_rgba(232,99,24,0.18)] shrink-0">
        <svg
          viewBox="0 0 40 40"
          className="w-7 h-7"
          fill="none"
          aria-hidden="true"
        >
          {/* Flame crown */}
          <path
            d="M20 5.5C21.5 8.5 24 9.8 24 12.6C24 14.5 22.3 16 20 16C17.7 16 16 14.5 16 12.6C16 10.6 17.8 8.8 20 5.5Z"
            fill="#E86318"
          />
          <path
            d="M20 9.5C20.9 11 21.8 11.8 21.8 13.1C21.8 14.1 21 14.8 20 14.8C19 14.8 18.2 14.1 18.2 13.1C18.2 11.9 19.1 11 20 9.5Z"
            fill="#E5A93C"
          />
          {/* Top brioche bun */}
          <path
            d="M10.5 21.5C10.5 17.8 14.7 15.8 20 15.8C25.3 15.8 29.5 17.8 29.5 21.5H10.5Z"
            fill="#E5A93C"
          />
          {/* Sesame highlights */}
          <circle cx="16.5" cy="18.6" r="0.8" fill="#181410" />
          <circle cx="20.5" cy="17.8" r="0.8" fill="#181410" />
          <circle cx="24" cy="19.1" r="0.8" fill="#181410" />
          {/* Melted cheese + brasa patty */}
          <path
            d="M9.5 24C9.5 23.17 10.17 22.5 11 22.5H29C29.83 22.5 30.5 23.17 30.5 24C30.5 24.83 29.83 25.5 29 25.5H11C10.17 25.5 9.5 24.83 9.5 24Z"
            fill="#F5EFE6"
          />
          <path
            d="M12 25.5L14.5 27.6L17 25.5H22.5L25 27.6L27.5 25.5"
            stroke="#E86318"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Bottom bun */}
          <path
            d="M11 28H29C29 30.2 27 31.8 24.5 31.8H15.5C13 31.8 11 30.2 11 28Z"
            fill="#D4952E"
          />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span
          className={`font-display font-bold tracking-tight text-[#F5EFE6] whitespace-nowrap ${
            compact ? 'text-base' : 'text-[17px]'
          }`}
        >
          Euro Hambúrgueria
        </span>
        <span className="mt-1 text-[9.5px] font-semibold uppercase tracking-[0.22em] text-[#E5A93C] whitespace-nowrap">
          GOURMET &amp; BRASA
        </span>
      </div>
    </div>
  );
}
