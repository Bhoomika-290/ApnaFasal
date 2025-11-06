import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

const getByPath = (obj: any, path: string) => {
  if (!obj) return undefined;
  const parts = path.split(".");
  let cur: any = obj;
  for (const p of parts) {
    if (cur && Object.prototype.hasOwnProperty.call(cur, p)) {
      cur = cur[p];
    } else {
      return undefined;
    }
  }
  return cur;
};

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key: string): string => {
    // 1) If key is a dot-path, resolve directly from nested translations
    const byPath = key.includes(".") ? getByPath(translations[language], key) : undefined;
    if (typeof byPath === "string") return byPath;

    // 2) Direct top-level lookup (if translations[language][key] is a string)
    const direct = translations[language] && translations[language][key];
    if (typeof direct === "string") return direct;

    // 3) Search first-level sections for the key (e.g., nav.dashboard when key === 'dashboard')
    const sections = translations[language] || {};
    for (const sectionKey of Object.keys(sections)) {
      const sec = (sections as any)[sectionKey];
      if (sec && typeof sec === "object" && Object.prototype.hasOwnProperty.call(sec, key)) {
        const v = sec[key];
        if (typeof v === "string") return v;
      }
    }

    // 4) Fallback to English
    const enByPath = key.includes(".") ? getByPath(translations.en, key) : undefined;
    if (typeof enByPath === "string") return enByPath;
    const enDirect = translations.en && (translations.en as any)[key];
    if (typeof enDirect === "string") return enDirect;

    // 5) Not found -> return key
    return key;
  };

  return { t, language };
};