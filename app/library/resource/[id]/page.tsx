import { execFileSync } from "child_process"
import { existsSync } from "fs"
import path from "path"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Download, ExternalLink, FileText, Headphones, Languages, Play } from "lucide-react"
import mammoth from "mammoth"

import { libraryResources } from "../../library-data"
import { displayResourceAlias, getResourceHref, relatedResources, seriesForResource, sourceSlug } from "../../library-utils"

type ResourcePageProps = {
  params: Promise<{ id: string }>
}

function getResource(id: string) {
  return libraryResources.find((resource) => resource.id === id)
}

function fileExtension(url: string) {
  const cleanUrl = decodeURIComponent(url).split("?")[0].split("#")[0]
  return cleanUrl.match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase() ?? ""
}

function isPdf(url: string) {
  return fileExtension(url) === "pdf"
}

function isAudio(url: string) {
  return ["aac", "amr", "m4a", "mp3", "wav"].includes(fileExtension(url))
}

function isOfficeLike(url: string) {
  return ["doc", "docx", "ppt", "pptx"].includes(fileExtension(url))
}

function isWordDocument(url: string) {
  return ["doc", "docx"].includes(fileExtension(url))
}

function isYouTube(url: string) {
  return url.includes("youtube.com") || url.includes("youtu.be")
}

function localFilePath(url: string) {
  const cleanUrl = decodeURIComponent(url).split("?")[0].split("#")[0]
  return path.join(process.cwd(), "public", cleanUrl)
}

function htmlBody(html: string) {
  return html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html
}

function postProcessHtml(html: string): string {
  let processed = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<meta[^>]*>/gi, "")
    .replace(/<link[^>]*>/gi, "")
    .replace(/\sclass="[^"]*"/gi, "")
    .replace(/\sstyle="[^"]*"/gi, "")
    .replace(/<font[^>]*>/gi, "")
    .replace(/<\/font>/gi, "")
    .replace(/<span[^>]*>/gi, "<span>")
    .replace(/<\/span>\s*<span>/gi, " ")
    .replace(/<span>\s*<\/span>/gi, "")
    .replace(/<b>/gi, "<strong>")
    .replace(/<\/b>/gi, "</strong>")
    .replace(/<i>/gi, "<em>")
    .replace(/<\/i>/gi, "</em>")
    // Paragraphs whose entire content is bold become section headings.
    .replace(/<p>\s*<strong>([^<]{1,220})<\/strong>\s*<\/p>/gi, "<h3>$1</h3>")
    // Preserve simple line-break rhythm from converted .doc files without keeping huge blank gaps.
    .replace(/(<br\s*\/?>\s*){3,}/gi, "</p><p>")
    // Strip empty paragraphs.
    .replace(/<p>(\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/[ \t]{2,}/g, " ")

  processed = processed.replace(/<p>([\s\S]*?)<\/p>/gi, (match, content: string) => {
    const plain = content.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
    if (!plain) return ""
    const isLikelyHeading =
      plain.length <= 90 &&
      !/[.!?።፡]$/.test(plain) &&
      (/^[A-Z0-9\s,'’:-]+$/.test(plain) || /[\u1200-\u137f]/.test(plain)) &&
      plain.split(/\s+/).length <= 10

    if (isLikelyHeading) return `<h3>${content}</h3>`
    return match
  })

  return processed.trim()
}

async function renderWordDocument(url: string) {
  const ext = fileExtension(url)
  const filePath = localFilePath(url)

  if (!existsSync(filePath)) {
    return {
      html: "",
      error: "The document file could not be found on the server.",
    }
  }

  try {
    if (ext === "docx") {
      const result = await mammoth.convertToHtml({ path: filePath }, {
        styleMap: [
          "p[style-name='Heading 1'] => h1:fresh",
          "p[style-name='Heading 2'] => h2:fresh",
          "p[style-name='Heading 3'] => h3:fresh",
          "p[style-name='Title'] => h1:fresh",
          "p[style-name='Subtitle'] => p.subtitle:fresh",
        ],
      })
      const processed = postProcessHtml(result.value)
      return {
        html: processed,
        error: processed.trim() ? "" : "This document did not contain readable article text.",
      }
    }

    if (ext === "doc") {
      const html = execFileSync("textutil", ["-convert", "html", "-stdout", filePath], {
        encoding: "utf8",
        maxBuffer: 20 * 1024 * 1024,
      })
      const body = htmlBody(html)
      return {
        html: postProcessHtml(body),
        error: body.trim() ? "" : "This document did not contain readable article text.",
      }
    }
  } catch {
    return {
      html: "",
      error: "This Word document could not be rendered as an article.",
    }
  }

  return {
    html: "",
    error: "This file type cannot be rendered as an article yet.",
  }
}

export async function generateMetadata({ params }: ResourcePageProps) {
  const { id } = await params
  const resource = getResource(id)
  if (!resource) return { title: "Library Resource" }

  return {
    title: `${resource.title} | Library`,
    description: resource.description,
  }
}

export default async function LibraryResourcePage({ params }: ResourcePageProps) {
  const { id } = await params
  const resource = getResource(id)

  if (!resource) notFound()

  const ext = fileExtension(resource.url)
  const readerUrl = isPdf(resource.url) ? `${resource.url}#toolbar=1&navpanes=0&view=FitH` : resource.url
  const wordArticle = isWordDocument(resource.url) ? await renderWordDocument(resource.url) : null
  const related = relatedResources(resource, libraryResources, 8)
  const series = seriesForResource(resource)
  const showOriginalButton = resource.url !== "#" && !isWordDocument(resource.url)

  return (
    <main className="light-mode-adaptive-page min-h-screen parchment-page-bg px-4 py-6 text-stone-900 dark:bg-none dark:bg-gradient-to-b dark:from-[#120d09] dark:via-[#1e1208] dark:to-[#140d09] dark:text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/library"
            className="jr-badge inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/82 px-4 py-2 text-[11px] font-black text-stone-800 shadow-sm transition hover:border-orange-300 hover:text-orange-800 dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Library
          </Link>

          {showOriginalButton && (
            <a
              href={resource.url}
              target={resource.url.startsWith("/") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="jr-badge inline-flex items-center gap-2 rounded-full border border-amber-300 bg-white/82 px-4 py-2 text-[11px] font-black text-orange-700 shadow-sm transition hover:border-orange-400 hover:bg-amber-50 dark:border-stone-700 dark:bg-stone-900/80 dark:text-orange-300"
            >
              {resource.url.startsWith("/") ? <Download className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
              {resource.url.startsWith("/") ? "Original file" : "Open original"}
            </a>
          )}
        </div>

        <section className="mb-5 rounded-xl border border-amber-200/70 bg-white/86 p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900/82 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="max-w-4xl">
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="jr-badge rounded-full bg-orange-100 px-3 py-1 text-[10px] font-black text-orange-800 dark:bg-orange-950/60 dark:text-orange-300">
                  {resource.type}
                </span>
                <span className="jr-badge inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-[10px] font-black text-stone-800 dark:bg-amber-500/20 dark:text-amber-100">
                  <Languages className="h-3.5 w-3.5" />
                  {resource.language}
                </span>
                <span className="jr-badge rounded-full bg-stone-100 px-3 py-1 text-[10px] font-black text-stone-700 dark:bg-stone-800 dark:text-stone-200">
                  {resource.church}
                </span>
              </div>
              <h1 className="jr-display text-4xl font-black text-stone-950 dark:text-white md:text-6xl">
                {resource.title}
              </h1>
              {displayResourceAlias(resource) && (
                <p className="mt-2 text-sm italic text-stone-500 dark:text-stone-400">{displayResourceAlias(resource)}</p>
              )}
              <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600 dark:text-stone-300 md:text-base">
                {resource.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {series && (
                  <Link
                    href={`/library/series/${series.id}`}
                    className="jr-badge inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-[10px] font-black text-orange-800 transition hover:border-orange-300 hover:bg-orange-100 dark:border-orange-900/60 dark:bg-orange-950/50 dark:text-orange-300"
                  >
                    Series: {series.title}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
                {resource.topics.slice(0, 5).map((topic) => (
                  <Link
                    key={topic}
                    href={`/library?q=${encodeURIComponent(topic)}`}
                    className="jr-badge rounded-full border border-stone-200 bg-white/70 px-3 py-1.5 text-[10px] font-black text-stone-600 transition hover:border-orange-300 hover:text-orange-800 dark:border-stone-800 dark:bg-stone-950/40 dark:text-stone-400"
                  >
                    {topic}
                  </Link>
                ))}
              </div>
            </div>

            <div className="min-w-[190px] rounded-xl border border-amber-100 bg-amber-50/70 p-4 dark:border-stone-800 dark:bg-stone-950/40">
              <p className="jr-kicker text-[10px] font-black text-stone-500 dark:text-stone-500">Source</p>
              <Link
                href={`/library/authors/${sourceSlug(resource)}`}
                className="mt-1 inline-flex items-center gap-1 text-sm font-black text-stone-900 underline decoration-orange-300/60 underline-offset-4 transition hover:text-orange-800 dark:text-white dark:hover:text-orange-300"
              >
                {resource.source}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <p className="jr-kicker mt-4 text-[10px] font-black text-stone-500 dark:text-stone-500">Format</p>
              <p className="jr-badge mt-1 text-sm font-black text-orange-700 dark:text-orange-300">{ext || resource.type}</p>
              <p className="jr-kicker mt-4 text-[10px] font-black text-stone-500 dark:text-stone-500">Path</p>
              <p className="mt-1 text-xs font-bold text-stone-700 dark:text-stone-300">{resource.purpose}</p>
            </div>
          </div>
        </section>

        {resource.type === "Video" && isYouTube(resource.url) && (
          <section className="mb-5 rounded-3xl border border-amber-200/70 bg-white/86 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/82">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300">
                  <Play className="ml-0.5 h-7 w-7 fill-current" />
                </div>
                <div>
                  <h2 className="jr-heading text-2xl font-black text-stone-950 dark:text-white">Sermon Channel</h2>
                  <p className="mt-1 max-w-2xl text-sm leading-7 text-stone-600 dark:text-stone-300">
                    This video resource is kept as a teaching or sermon channel. Hymn-only channels and audio resources are hidden from the library for now.
                  </p>
                </div>
              </div>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="jr-badge inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-orange-600 px-5 py-3 text-[11px] font-black text-white shadow transition hover:bg-orange-500"
              >
                Open channel
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </section>
        )}

        {isPdf(resource.url) && (
          <section className="overflow-hidden rounded-xl border border-amber-200/70 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-950">
            <iframe src={readerUrl} title={resource.title} className="h-[78vh] w-full bg-white" />
          </section>
        )}

        {isAudio(resource.url) && (
          <section className="rounded-xl border border-amber-200/70 bg-white/86 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/82">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300">
              <Headphones className="h-8 w-8" />
            </div>
            <audio src={resource.url} controls className="w-full" />
          </section>
        )}

        {isWordDocument(resource.url) && (
          <section className="overflow-hidden rounded-3xl border border-amber-200/70 bg-white/90 shadow-xl shadow-stone-900/5 dark:border-stone-800 dark:bg-stone-900/86">
            {wordArticle?.html ? (
              <div className="px-4 py-7 md:px-8 md:py-10">
                <div className="mx-auto mb-8 max-w-3xl border-b border-amber-200/70 pb-5 dark:border-stone-800">
                  <p className="jr-kicker text-[10px] font-black text-orange-700 dark:text-orange-300">Article view</p>
                  <h2 className="jr-heading mt-2 text-2xl font-black text-stone-950 dark:text-white md:text-3xl">
                    {resource.title}
                  </h2>
                  <p className="mt-2 text-sm font-medium leading-7 text-stone-600 dark:text-stone-300">
                    Formatted from the original Word document for reading on this site.
                  </p>
                </div>
                <article
                  className="jr-word-article prose prose-stone mx-auto max-w-3xl dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: wordArticle.html }}
                />
              </div>
            ) : (
              <div className="flex flex-col items-start gap-4 p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300">
                  <FileText className="h-8 w-8" />
                </div>
                <p className="max-w-2xl text-sm leading-7 text-stone-600 dark:text-stone-300">
                  {wordArticle?.error ?? "This Word document could not be rendered as an article."}
                </p>
              </div>
            )}
          </section>
        )}

        {isOfficeLike(resource.url) && !isWordDocument(resource.url) && (
          <section className="rounded-xl border border-amber-200/70 bg-white/86 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/82">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300">
              <FileText className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-black text-stone-950 dark:text-white">Document Details</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-stone-600 dark:text-stone-300">
              This file is listed in the library, but this format cannot be rendered as an article yet.
            </p>
          </section>
        )}

        {!isPdf(resource.url) && !isWordDocument(resource.url) && !isAudio(resource.url) && !isOfficeLike(resource.url) && resource.type !== "Video" && (
          <section className="rounded-3xl border border-amber-200/70 bg-white/86 p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900/82">
            <h2 className="jr-heading text-2xl font-black text-stone-950 dark:text-white">Resource Details</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-stone-600 dark:text-stone-300">
              This resource is cataloged on the site so people can discover it by topic, source, language, and tradition before opening the original page.
            </p>
            {resource.url !== "#" && (
              <a
                href={resource.url}
                target={resource.url.startsWith("/") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className="jr-badge mt-5 inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-3 text-[11px] font-black text-white shadow transition hover:bg-orange-500"
              >
                Open original
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-8">
            <div className="mb-4 flex items-end gap-4">
              <div>
                <p className="jr-kicker text-[10px] font-black text-orange-600 dark:text-orange-500">Keep reading</p>
                <h2 className="jr-heading mt-1 text-3xl font-black text-stone-950 dark:text-white">Related Resources</h2>
              </div>
              <div className="mb-1.5 h-px flex-1 bg-gradient-to-r from-amber-300/70 via-orange-200/40 to-transparent dark:from-orange-800/40 dark:to-transparent" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={getResourceHref(item)}
                  className="group rounded-2xl border border-amber-200/70 bg-white/84 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:bg-amber-50 dark:border-stone-800 dark:bg-stone-900/82 dark:hover:border-orange-800/70"
                >
                  <p className="jr-badge text-[9px] font-black text-orange-700 dark:text-orange-300">{item.type}</p>
                  <h3 className="jr-card-title mt-1 line-clamp-2 text-base font-black leading-tight text-stone-950 group-hover:text-orange-800 dark:text-white dark:group-hover:text-orange-300">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-1 text-xs font-semibold text-stone-500">{item.source}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
