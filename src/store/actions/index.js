import locale from '~/common/locale'

export default {
    loadLang({dispatch, commit, state}, lang) {
        // 加载要切换的语言包
        let langPackList = state.langPack;
        if (!langPackList.includes(lang)) {
            return import(/* webpackChunkName: "lang/lang-[request]" */ `~/common/locale/lang/${lang}`).then(msgs => {
                locale.setLocaleMessage(lang, msgs.default);
                locale.locale = lang;
                commit('addLangPack', lang);
                commit('setLang', lang);
                return Promise.resolve(lang);
            }).catch(() => {
                dispatch('loadLang', locale.fallbackLocale).then((lang) => {
                    console.warn(`未找到对应语言包，已加载默认语言：${lang}`);
                    return lang;
                })
            })
        }
        locale.locale = lang;
        commit('setLang', lang);
        return Promise.resolve(lang);
    }
}