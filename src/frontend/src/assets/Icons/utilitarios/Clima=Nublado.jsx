export function Nublado({ size, className, ...props }) {
  return (
    <svg {...props} width={size ?? 24} height={size ?? 24} className={className} viewBox="0 0 72 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_541_809)">
        <path d="M21.3455 56C17.0788 56 13.4545 54.4601 10.4727 51.3803C7.49091 48.3005 6 44.5571 6 40.1502C6 36.2441 7.21212 32.8138 9.63636 29.8592C12.0606 26.9045 15.1394 25.1268 18.8727 24.5258C19.8424 19.6682 22.1212 15.6995 25.7091 12.6197C29.297 9.53991 33.4424 8 38.1455 8C43.5758 8 48.1576 10.0407 51.8909 14.1221C55.6242 18.2034 57.4909 23.0986 57.4909 28.8075V30.6103C60.9818 30.5102 63.9394 31.6745 66.3636 34.1033C68.7879 36.5321 70 39.5994 70 43.3052C70 46.7606 68.7879 49.7402 66.3636 52.2441C63.9394 54.748 61.0545 56 57.7091 56H21.3455Z" fill="url(#paint0_linear_541_809)"/>
      </g>
      <defs>
        <filter id="filter0_d_541_809" x="0" y="8" width="72" height="56" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="-2" dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_541_809"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_541_809" result="shape"/>
        </filter>
        <linearGradient id="paint0_linear_541_809" x1="38" y1="8" x2="38" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E3E3E3"/>
          <stop offset="0.9999" stopColor="#A0A0A0"/>
        </linearGradient>
      </defs>
    </svg>
  );
}