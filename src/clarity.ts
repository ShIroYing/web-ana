import Clarity from '@microsoft/clarity'

const id = document.currentScript?.dataset.ms?.trim()
try {
	if (id) {
		Clarity.init(id)
		Clarity.consentV2({ ad_Storage: 'denied', analytics_Storage: 'denied' })
	}
} catch {}