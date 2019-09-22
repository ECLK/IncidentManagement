/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */

import enTranslationMessages from "./keys/en.json";
import siTranslationMessages from "./keys/si.json";
import taTranslationMessages from "./keys/ta.json";

const DEFAULT_LOCALE = "en";

// prettier-ignore
const appLocales = [
  'en',
  'si',
  'ta'
];

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

const translationMessages = {
  en: formatTranslationMessages("en", enTranslationMessages),
  si: formatTranslationMessages("si", siTranslationMessages),
  ta: formatTranslationMessages("ta", taTranslationMessages)
};

export default {
  appLocales,
  formatTranslationMessages,
  translationMessages,
  DEFAULT_LOCALE
};
