import {VueI18n, ElementLocale, ElementEN, ElementZH_CN} from '~/vendor'
import en from './lang/en'
import zhCN from './lang/zhCN'

const messages = {
    'en': {
        en,
        ...ElementEN
    },
    'zhCN': {
        zhCN,
        ...ElementZH_CN
    }
};
const local = new VueI18n({
    locale: 'zhCN', // 当前语言环境
    fallbackLocale: 'zhCN',// 默认语言环境。如果locale中无匹配项则采用该项值
    messages
});
ElementLocale.i18n((key, value) => local.t(key, value));
export default local;