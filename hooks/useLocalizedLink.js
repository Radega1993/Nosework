import { useRouter } from 'next/router';
import { addLanguagePrefix, getLanguageFromPath, DEFAULT_LANGUAGE } from '@/utils/i18n';

/**
 * Hook to generate localized links with language prefix
 * 
 * Automatically detects current language from router and adds prefix to paths.
 * Use this hook when you need to generate links that preserve the current language.
 * 
 * @example
 * ```jsx
 * const { localizedHref } = useLocalizedLink();
 * <Link href={localizedHref('/eventos')}>Eventos</Link>
 * ```
 * 
 * @returns {Object} Object with localizedHref function
 */
export function useLocalizedLink() {
  const router = useRouter();
  
  /**
   * Generates a localized href for a given path
   * @param {string} path - Path without language prefix (e.g., '/eventos', '/about')
   * @returns {string} Path with current language prefix (e.g., '/es/eventos', '/ca/about')
   */
  const localizedHref = (path) => {
    // Get current language from router pathname or asPath
    const currentLang = getLanguageFromPath(router.pathname) || 
                       getLanguageFromPath(router.asPath) || 
                       DEFAULT_LANGUAGE;
    
    // Add language prefix to path
    return addLanguagePrefix(path, currentLang);
  };
  
  return { localizedHref };
}
