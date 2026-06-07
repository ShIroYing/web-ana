export const onRequest = async ctx => {
	const { request } = ctx

	if (request.method !== 'POST' && request.method !== 'OPTIONS') return new Response(null, { status: 405 })

	if (request.method === 'OPTIONS')
		return new Response(null, {
			headers: {
				'Access-Control-Allow-Origin': request.headers.get('Origin') || '*',
				'Access-Control-Allow-Methods': 'POST, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Allow-Credentials': 'true',
				'Access-Control-Max-Age': '13142'
			}
		})

	const { search } = new URL(request.url)
	const req = new Request(request)
	req.headers.delete('Cookie')
	let { headers, body, status } = await fetch(`https://cloudflareinsights.com/cdn-cgi/rum${search}`, req)
	headers = new Headers(headers)
	headers.set('Access-Control-Allow-Origin', request.headers.get('Origin') || '*')
	headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
	headers.set('Access-Control-Allow-Headers', 'Content-Type')
	headers.set('Access-Control-Allow-Credentials', 'true')
	return new Response(body, { status, headers })
}