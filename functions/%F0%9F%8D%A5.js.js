export const onRequest = async ctx => {
	const { request } = ctx

	if (request.method !== 'GET') return new Response(null, { status: 405 })

	const url = new URL(request.url)

	const cwa = url.searchParams.get('cf')
	const msc = url.searchParams.get('ms')

	if (!cwa && !msc) return new Response(null, { status: 204 })

	const cache = caches.default
	let anaScript = ''

	if (cwa) {
		const cwaReq = new Request('https://static.cloudflareinsights.com/beacon.min.js')
		let cwaRes =
			(await cache.match(cwaReq)) ?? (res => (ctx.waitUntil(cache.put(cwaReq, res.clone())), res))(await fetch(cwaReq))
		const cwaCode = await cwaRes.text()

		const cwaData = JSON.stringify({
			token: cwa,
			send: { to: `${url.origin}/🍥` }
		})
		const cwaFunc = function (dat) {
			document.currentScript?.setAttribute('data-cf-beacon', dat)
		}
		anaScript += `\n;(${cwaFunc.toString().replace(/\s+/g, '')})('${cwaData}')`
		anaScript += `\n${cwaCode}`
	}

	if (msc) {
		const mscReq = new Request(`https://www.clarity.ms/tag/${msc}`)
		let mscRes =
			(await cache.match(mscReq)) ?? (res => (ctx.waitUntil(cache.put(mscReq, res.clone())), res))(await fetch(mscReq))
		const mscCode = await mscRes.text()

		const mscFunc = async function (origin) {
			const ok = /(?:^|;\s*)_ja7_ana(?:=|;|$)/.test(document.cookie)
			;(
				window.clarity ||
				(window.clarity = function () {
					;(window.clarity.q || (window.clarity.q = [])).push(arguments)
				})
			)('consent', ok)

			try {
				if (ok || document.getElementById('ja7-iframe')) return

				const style = (function (style) {
					style.rel = 'stylesheet'
					style.href = `${origin}/iframe.css`
					return document.head.appendChild(style)
				})(document.createElement('link'))
				const iframe = await (async function (iframe) {
					iframe.id = 'ja7-iframe'
					iframe.srcdoc = await (await fetch(`${origin}/iframe.html`)).text()
					return iframe
				})(document.createElement('iframe'))
				window._ja7_iframe_remove = function () {
					iframe.parentNode?.removeChild(iframe)
					style.parentNode?.removeChild(style)
					delete window._ja7_iframe_remove
				}

				document.body?.appendChild(iframe) ??
					window.addEventListener('DOMContentLoaded', () => document.body.appendChild(iframe), { once: true })
			} catch {}
		}
		anaScript += `\n;(${mscFunc.toString().replace(/(?<![A-Za-z])\s+|\s+(?![A-Za-z])|(?<=[A-Za-z]) {2,}(?=[A-Za-z])/g, '')})('${url.origin}')`
		anaScript += `\n${mscCode}`
	}

	return new Response(anaScript, {
		headers: {
			'Content-Type': 'application/javascript; charset=UTF-8',
			'Cache-Control': 'public, max-age=520'
		}
	})
}