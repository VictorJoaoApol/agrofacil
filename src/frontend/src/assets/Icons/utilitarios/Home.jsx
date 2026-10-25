export function Home({ size, className, ...props }) {
  return (
    <svg {...props} width={size ?? 40} height={size ?? 40} className={className} viewBox="-4 -2 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 33H10.5V20.5H21.5V33H29V13.5L16 3.75L3 13.5V33ZM0 36V12L16 0L32 12V36H18.5V23.5H13.5V36H0Z" fill="#F0F0F0"/>
    </svg>
  );
}