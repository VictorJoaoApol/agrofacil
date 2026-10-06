// URL base da API PHP, sem barra no final. Ajuste para onde o seu PHP responde.
export const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost/agrofacil/api').replace(/\/+$/, '')