import { configure, defineRule } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import AllRules from '@vee-validate/rules';
import fr from '@vee-validate/i18n/dist/locale/fr.json';

export default defineNuxtPlugin(async () => {
  Object.keys(AllRules).forEach(rule => {
    defineRule(rule, AllRules[rule]);
  });
  configure({
    generateMessage: localize({
      fr,
    }),
  });

  setLocale('fr');
})
