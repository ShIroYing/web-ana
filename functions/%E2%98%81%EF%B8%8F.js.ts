export const onRequest: PagesFunction = async ({ request, waitUntil }) => {
	if (request.method !== 'GET') return new Response(null, { status: 405 })

	const cwaReq = new Request('https://static.cloudflareinsights.com/beacon.min.js')
	const cache = caches.default
	const cwaRes = (await cache.match(cwaReq)) ?? (res => (waitUntil(cache.put(cwaReq, res.clone())), res))(await fetch(cwaReq))

	const cwaCode = await cwaRes.text()
	const cwaFunc = function (self: any) {
		return (
			self?.dataset.cf &&
			(self.setAttribute(
				'data-cf-beacon',
				JSON.stringify({
					token: self.dataset.cf,
					send: { to: new URL(self.src).origin + '/🍥' }
				})
			),
			true)
		)
	}
	return new Response(
		`;(${cwaFunc.toString().replace(/(?<![A-Za-z])\s+|\s+(?![A-Za-z])|(?<=[A-Za-z]) {2,}(?=[A-Za-z])/g, '')})(document.currentScript)&&(function(){${cwaCode}})()`,
		{
			headers: {
				'Content-Type': 'application/javascript; charset=UTF-8',
				'Cache-Control': cwaRes.headers.get('Cache-Control') ?? ''
			}
		}
	)
}