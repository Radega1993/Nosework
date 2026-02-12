import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  getLanguageFromPath,
  addLanguagePrefix,
  removeLanguagePrefix,
  SUPPORTED_LANGUAGES,
  LANGUAGE_NAMES,
  LOCALE_COOKIE_NAME,
  DEFAULT_LANGUAGE,
} from '@/utils/i18n';

/**
 * LanguageSwitcher component - Allows users to switch between available languages
 * 
 * Features:
 * - Detects current language from URL
 * - Displays available languages (ES, CA)
 * - Preserves current path and query parameters when switching
 * - Sets cookie and localStorage for persistence
 * - Accessible with ARIA labels and keyboard navigation
 * 
 * @example
 * ```jsx
 * <LanguageSwitcher />
 * ```
 */
export default function LanguageSwitcher() {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState(DEFAULT_LANGUAGE);
  const [isClient, setIsClient] = useState(false);

  // Detect current language from router pathname
  useEffect(() => {
    setIsClient(true);
    const lang = getLanguageFromPath(router.pathname) || getLanguageFromPath(router.asPath) || DEFAULT_LANGUAGE;
    setCurrentLang(lang);
  }, [router.pathname, router.asPath]);

  // Set localStorage on mount (client-side only)
  useEffect(() => {
    if (isClient && currentLang) {
      try {
        localStorage.setItem(LOCALE_COOKIE_NAME, currentLang);
      } catch (e) {
        // localStorage may not be available in some environments
        console.warn('Failed to set localStorage:', e);
      }
    }
  }, [currentLang, isClient]);

  const handleLanguageChange = (newLang) => {
    if (newLang === currentLang) {
      return; // Already on this language
    }

    // Get current path without language prefix
    const currentPath = removeLanguagePrefix(router.asPath.split('?')[0]);
    
    // Preserve query parameters
    const queryString = router.asPath.includes('?') 
      ? router.asPath.substring(router.asPath.indexOf('?')) 
      : '';
    
    // Build new path with new language prefix
    const newPath = addLanguagePrefix(currentPath, newLang) + queryString;

    // Set cookie via API call (for server-side access)
    if (typeof window !== 'undefined') {
      // Set cookie
      const maxAge = 365 * 24 * 60 * 60; // 1 year
      document.cookie = `${LOCALE_COOKIE_NAME}=${newLang}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
      
      // Set localStorage
      try {
        localStorage.setItem(LOCALE_COOKIE_NAME, newLang);
      } catch (e) {
        console.warn('Failed to set localStorage:', e);
      }
    }

    // Navigate to new path
    router.push(newPath);
  };

  if (!isClient) {
    // Don't render until client-side to avoid hydration mismatch
    return null;
  }

  return (
    <div className="language-switcher" role="group" aria-label="Seleccionar idioma">
      <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isActive = lang === currentLang;
          return (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`
                px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-500
                ${
                  isActive
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
              aria-label={`Cambiar a ${LANGUAGE_NAMES[lang]}`}
              aria-pressed={isActive}
              role="radio"
            >
              {lang.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
