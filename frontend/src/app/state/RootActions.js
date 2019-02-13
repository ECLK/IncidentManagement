
import { CHANGE_LANGUAGE } from './RootTypes'

export function changeLanguage(selectedLanguage) {
    return {
        type: CHANGE_LANGUAGE,
        selectedLanguage
    }
}