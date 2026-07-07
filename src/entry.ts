main: {
	const self = document.currentScript instanceof HTMLScriptElement ? document.currentScript : null
	if (!self) break main
	const url = new URL(self.src)

	const readToken = (name: 'cf' | 'ms') => (self.dataset[name] || url.searchParams.get(name))?.trim()
	const loadScript = (name: string, dataName: 'cf' | 'ms', value: string) =>
		(script => {
			script.async = true
			script.src = `${url.origin}/${name}`
			script.setAttribute(`data-${dataName}`, value)
			document.documentElement.appendChild(script)
		})(document.createElement('script'))

	const [cf, ms] = [readToken('cf'), readToken('ms')]

	;(callback => (document.readyState === 'complete' ? callback() : window.addEventListener('load', callback, { once: true })))(
		() =>
			setTimeout(() => {
				if (cf) loadScript('☁️.js', 'cf', cf)
				if (ms) loadScript('🆑.js', 'ms', ms)
			})
	)
}