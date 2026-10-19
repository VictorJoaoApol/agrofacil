export function Fechar({ size, className, ...props }) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" className={className} height={size ?? 24} viewBox="0 -960 960 960" width={size ?? 24} fill="#1f1f1f">
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
    </svg>
  );
}