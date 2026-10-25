export function Menu({ size, className, ...props }) {
  return (
    <svg {...props} width={size ?? 24} height={size ?? 24} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 24V21H24V24H0ZM0 13.5V10.5H24V13.5H0ZM0 3V0H24V3H0Z" fill="#150C00"/>
    </svg>
  );
}