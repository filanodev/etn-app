import { createI18n } from 'vue-i18n'

import messages from './locales/messages'

export default createI18n({
  locale: 'en',
  messages,
  parsePlaceholder: true
})
//i18n.locale = 'cn';