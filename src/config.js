export const WHATSAPP_NUMBER = '5491178270751';
export const TABAR_URL = 'https://tabar-coral.vercel.app/';

export const whatsappLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
