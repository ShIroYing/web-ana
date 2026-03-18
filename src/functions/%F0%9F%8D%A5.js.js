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
    const cwaReq = new Request(
      'https://static.cloudflareinsights.com/beacon.min.js',
    )
    let cwaRes =
      (await cache.match(cwaReq)) ??
      (res => (ctx.waitUntil(cache.put(cwaReq, res.clone())), res))(
        await fetch(cwaReq),
      )
    const cwaCode = await cwaRes.text()

    const beaconData = JSON.stringify({
      token: cwa,
      send: { to: `${url.origin}/🍥` },
    })
    const beaconFunc = function (dat) {
      document.currentScript?.setAttribute('data-cf-beacon', dat)
    }
    anaScript += `\n;(${beaconFunc.toString().replace(/\s+/g, '')})('${beaconData}')`
    anaScript += `\n${cwaCode}`
  }

  if (msc) {
    const mscReq = new Request(`https://www.clarity.ms/tag/${msc}`)
    let mscRes =
      (await cache.match(mscReq)) ??
      (res => (ctx.waitUntil(cache.put(mscReq, res.clone())), res))(
        await fetch(mscReq),
      )
    const mscCode = await mscRes.text()

    const mscFunc = function () {
      window.clarity ||
        (window.clarity = function () {
          ;(window.clarity.q || (window.clarity.q = [])).push(arguments)
        })
    }
    anaScript += `\n;(${mscFunc.toString().replace(/\s+/g, '')})()`
    anaScript += `\n${mscCode}`
  }

  return new Response(anaScript, {
    headers: {
      'Content-Type': 'application/javascript; charset=UTF-8',
      'Cache-Control': 'public, max-age=13142',
    },
  })
}
