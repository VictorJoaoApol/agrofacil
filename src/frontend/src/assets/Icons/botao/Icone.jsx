export function Icone({ size, className, ...props }) {
  return (
    <svg {...props} width={size ?? 24} height={size ?? 36} className={className} viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.08108 18L24 31.8L19.4595 36L2.24109e-06 18L19.4595 -3.41775e-06L24 4.2L9.08108 18Z" fill="#F0F0F0"/>
    </svg>
  );
}