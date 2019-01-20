/*
 * action types
 */

 export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';


 /*
 * action creators
 */

export function changeLanguage(selectedLanguage) {
    return {
        type: CHANGE_LANGUAGE,
        selectedLanguage
    }
  }