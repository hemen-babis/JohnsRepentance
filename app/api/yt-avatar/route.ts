import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("u")
  if (!url) return new NextResponse(null, { status: 400 })

  try {
    // Fetch the YouTube channel page server-side (no CORS issues here)
    const pageRes = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      next: { revalidate: 86400 }, // cache the YouTube page fetch for 24 h
    })

    if (!pageRes.ok) return new NextResponse(null, { status: 502 })

    const html = await pageRes.text()

    // og:image on YouTube channel pages is always the channel avatar
    const m = html.match(/<meta property="og:image" content="([^"]+)"/)
    if (!m?.[1]) return new NextResponse(null, { status: 404 })

    // Proxy the image bytes so the browser has no cross-origin issues
    const imgRes = await fetch(m[1], { next: { revalidate: 86400 } })
    if (!imgRes.ok) return new NextResponse(null, { status: 502 })

    const buf = await imgRes.arrayBuffer()
    const ct = imgRes.headers.get("content-type") ?? "image/jpeg"

    return new NextResponse(buf, {
      headers: {
        "Content-Type": ct,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    })
  } catch {
    return new NextResponse(null, { status: 500 })
  }
}
