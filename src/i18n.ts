import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'zh',
		interpolation: { escapeValue: false },
		resources: {
			'zh-Hans': {
				translation: {
					title: 'Cookie 使用许可',
					desc: '本页面使用 Microsoft Clarity 分析使用数据，因此需要使用 Cookie 改善使用体验，详见 ',
					terms: 'Clarity 使用条款',
					rejectWarn: '拒绝可能会导致使用体验下降',
					netError: '当前网络环境异常',
					accept: '允许',
					reject: '拒绝',
				},
			},
			zh: {
				translation: {
					title: 'Cookie 使用許可',
					desc: '本頁面使用 Microsoft Clarity 分析使用數據，因此需要使用 Cookie 改善使用體驗，詳見 ',
					terms: 'Clarity 使用條款',
					rejectWarn: '拒絕可能會導致使用體驗下降',
					netError: '當前網路環境異常',
					accept: '允許',
					reject: '拒絕',
				},
			},
			en: {
				translation: {
					title: 'Cookie Consent',
					desc: 'This site uses Microsoft Clarity to analyze usage data. We use cookies to improve your experience. See ',
					terms: 'Clarity Terms of Use',
					rejectWarn: 'Rejecting may downgrade your experience',
					netError: 'Network anomaly detected',
					accept: 'Accept',
					reject: 'Reject',
				},
			},
		},
	})

export default i18n
