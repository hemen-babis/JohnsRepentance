import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const reference = searchParams.get("reference")?.trim()
  const translation = searchParams.get("translation")?.trim() || "web"

  if (!reference) {
    return NextResponse.json({ error: "Missing reference" }, { status: 400 })
  }

  const allowed = new Set(["web", "kjv"])
  const safeTranslation = allowed.has(translation.toLowerCase()) ? translation.toLowerCase() : "web"

  try {
    const url = `https://bible-api.com/${encodeURIComponent(reference)}?translation=${safeTranslation}`
    const res = await fetch(url, { next: { revalidate: 3600 } })

    if (!res.ok) {
      return NextResponse.json({ error: "Unable to load scripture text" }, { status: 502 })
    }

    const data = await res.json()
    return NextResponse.json({
      reference: data.reference,
      translation: data.translation_name ?? safeTranslation.toUpperCase(),
      text: data.text ?? "",
      verses: data.verses ?? [],
    })
  } catch {
    return NextResponse.json({ error: "Scripture service unavailable" }, { status: 502 })
  }
}

