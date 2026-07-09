import { createHash } from "node:crypto"
import { existsSync, mkdirSync, readFileSync } from "node:fs"
import path from "node:path"
import { spawn } from "node:child_process"

const root = process.cwd()
const booksDir = path.join(root, "public", "books")
const thumbnailsDir = path.join(root, "public", "library-thumbnails")
const pdftoppm =
  process.env.PDFTOPPM ||
  "/Users/DellUser/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/pdftoppm"

const limitArg = process.argv.find((arg) => arg.startsWith("--limit="))
const limit = limitArg ? Number(limitArg.split("=")[1]) : Infinity
const concurrencyArg = process.argv.find((arg) => arg.startsWith("--concurrency="))
const concurrency = Math.max(1, Math.min(8, concurrencyArg ? Number(concurrencyArg.split("=")[1]) : 4))

mkdirSync(thumbnailsDir, { recursive: true })

const dataText = readFileSync(path.join(root, "app", "library", "local-book-data.ts"), "utf8")
const json = dataText.match(/= (\[[\s\S]*\])\n$/)?.[1]
if (!json) throw new Error("Could not read localBookResources from app/library/local-book-data.ts")

const resources = JSON.parse(json)
const jobs = resources
  .filter((resource) => resource.type === "PDF" && resource.url?.startsWith("/books/"))
  .map((resource) => {
    const file = decodeURIComponent(resource.url.replace(/^\/books\//, ""))
    const input = path.join(booksDir, file)
    const id = createHash("sha1").update(file).digest("hex").slice(0, 16)
    const outputPrefix = path.join(thumbnailsDir, id)
    const output = `${outputPrefix}.jpg`
    return { title: resource.title, input, outputPrefix, output }
  })
  .filter((job) => !existsSync(job.output))
  .slice(0, limit)

let completed = 0
let failed = 0
let active = 0
let index = 0

console.log(`Rendering ${jobs.length} PDF thumbnails with concurrency ${concurrency}.`)

function runJob(job) {
  return new Promise((resolve) => {
    const child = spawn(pdftoppm, [
      "-jpeg",
      "-f",
      "1",
      "-l",
      "1",
      "-singlefile",
      "-scale-to-x",
      "360",
      "-scale-to-y",
      "-1",
      job.input,
      job.outputPrefix,
    ])

    let stderr = ""
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString()
    })
    child.on("close", (code) => {
      if (code === 0 && existsSync(job.output)) {
        completed += 1
      } else {
        failed += 1
        console.warn(`Failed: ${path.basename(job.input)}${stderr ? `\n${stderr.trim()}` : ""}`)
      }
      if ((completed + failed) % 50 === 0 || completed + failed === jobs.length) {
        console.log(`Progress: ${completed + failed}/${jobs.length} (${failed} failed)`)
      }
      resolve()
    })
  })
}

await new Promise((resolve) => {
  function pump() {
    while (index < jobs.length && active < concurrency) {
      const job = jobs[index++]
      active += 1
      runJob(job).finally(() => {
        active -= 1
        pump()
      })
    }
    if (index >= jobs.length && active === 0) resolve()
  }

  pump()
})

console.log(`Done. Rendered ${completed}; failed ${failed}; skipped existing thumbnails automatically.`)
