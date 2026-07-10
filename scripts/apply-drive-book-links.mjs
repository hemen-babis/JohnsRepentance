import { readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const csvFile = process.argv[2]
const dataFile = path.join(root, "app", "library", "local-book-data.ts")

if (!csvFile) {
  console.error("Usage: node scripts/apply-drive-book-links.mjs path/to/drive-books.csv")
  process.exit(1)
}

function parseCsv(text) {
  const rows = []
  let row = []
  let value = ""
  let quoted = false

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]
    const next = text[i + 1]

    if (quoted && char === '"' && next === '"') {
      value += '"'
      i += 1
    } else if (char === '"') {
      quoted = !quoted
    } else if (!quoted && char === ",") {
      row.push(value)
      value = ""
    } else if (!quoted && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") i += 1
      row.push(value)
      if (row.some((cell) => cell.trim())) rows.push(row)
      row = []
      value = ""
    } else {
      value += char
    }
  }

  row.push(value)
  if (row.some((cell) => cell.trim())) rows.push(row)
  return rows
}

function driveViewUrl(fileId) {
  return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`
}

const rows = parseCsv(readFileSync(path.resolve(csvFile), "utf8"))
const header = rows.shift()?.map((name) => name.trim().toLowerCase()) ?? []
const nameIndex = header.indexOf("name")
const idIndex = header.indexOf("id")

if (nameIndex === -1 || idIndex === -1) {
  console.error('CSV must include "name" and "id" columns.')
  process.exit(1)
}

const driveIdsByName = new Map()
for (const row of rows) {
  const name = row[nameIndex]?.trim()
  const id = row[idIndex]?.trim()
  if (name && id) driveIdsByName.set(name, id)
}

let matched = 0
let missing = 0
let text = readFileSync(dataFile, "utf8")

text = text.replace(/"url": "\/books\/([^"]+)"/g, (match, encodedName) => {
  const fileName = decodeURIComponent(encodedName)
  const fileId = driveIdsByName.get(fileName)
  if (!fileId) {
    missing += 1
    return match
  }

  matched += 1
  return `"url": "${driveViewUrl(fileId)}"`
})

writeFileSync(dataFile, text)
console.log(`Updated ${matched} book URLs in ${path.relative(root, dataFile)}.`)
console.log(`No Drive match found for ${missing} local book URLs.`)
