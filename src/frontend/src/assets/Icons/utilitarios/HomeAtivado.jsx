export function HomeAtivado({ size, className, ...props }) {
  return (
    <svg {...props} width={size ?? 40} height={size ?? 40} className={className} viewBox="-4 -2 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 36V12L16 0L32 12V36H20V22H12V36H0Z" fill="#4C9713"/>
    </svg>
  );
}