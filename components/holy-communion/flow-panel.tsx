"use client"

import { format } from "date-fns"
import { CheckCircle2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { CommunionCalendarStore } from "@/components/holy-communion/communion-state-engine"
import {
  getDetailedGuidance,
  getStateLabel,
  toDateKey,
} from "@/components/holy-communion/communion-state-engine"

type ChecklistKey = "confession" | "fasting" | "peace" | "prayer"

type FlowPanelProps = {
  date: Date
  store: CommunionCalendarStore
  onClose: () => void
  onChecklistChange: (key: ChecklistKey, value: boolean) => void
  onNoteChange: (value: string) => void
  onMarkCompleted: () => void
  onMarkCommunion: () => void
  onTogglePause: () => void
}

const checklistItems: Array<{ key: ChecklistKey; label: string; detail: string }> = [
  { key: "confession", label: "Confession (Nessaha)", detail: "You have received absolution from your spiritual father" },
  { key: "fasting", label: "Fasting", detail: "Abstained from meat, dairy, and food since midnight before Communion" },
  { key: "peace", label: "Peace with others", detail: "No outstanding grudge or unreconciled conflict" },
  { key: "prayer", label: "Prayer preparation", detail: "Recited the appointed prayers and examined your conscience" },
]

const titleSerif = "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif"

export function FlowPanel({
  date,
  store,
  onClose,
  onChecklistChange,
  onNoteChange,
  onMarkCompleted,
  onMarkCommunion,
  onTogglePause,
}: FlowPanelProps) {
  const dateKey = toDateKey(date)
  const entry = store.entries[dateKey]
  const checklist = entry?.checklist
  const note = entry?.note ?? ""
  const completed = entry?.completed ?? false
  const stateLabel = getStateLabel(date, store)
  const guidance = getDetailedGuidance(date, store)

  const checkedCount = [checklist?.confession, checklist?.fasting, checklist?.peace, checklist?.prayer].filter(Boolean).length

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/40 backdrop-blur-[2px]">
      <div className="h-full w-full max-w-lg overflow-y-auto border-l border-[#d8c395] bg-[linear-gradient(180deg,#fffcf5,#fff8ec)] shadow-[0_0_80px_-20px_rgba(120,53,15,0.35)] dark:border-amber-500/20 dark:bg-[#14090520]">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-[#e8d5a8] bg-[#fffcf5]/95 px-6 py-5 backdrop-blur-sm dark:border-amber-500/15 dark:bg-stone-950/95">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#8b6a2b] dark:text-amber-400">
                {stateLabel}
              </p>
              <h3 className="mt-1.5 text-2xl font-black text-[#3d2206] dark:text-[#f3e4cd]" style={{ fontFamily: titleSerif }}>
                {format(date, "MMMM d, yyyy")}
              </h3>
              <p className="mt-1 text-sm font-medium text-stone-500 dark:text-stone-400">{guidance.headline}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-1 rounded-full p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-300"
              aria-label="Close panel"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="space-y-6 px-6 py-6">
          {/* Guidance banner */}
          <div className="rounded-[1.25rem] border border-[#ead8b6] bg-[#fffbf0] px-5 py-4 dark:border-amber-500/15 dark:bg-stone-900/50">
            <p className="text-sm font-semibold text-[#7c2d12] dark:text-amber-300">{guidance.subline}</p>
          </div>

          {/* Today's steps */}
          {guidance.steps.length > 0 ? (
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.26em] text-[#8b6a2b] dark:text-amber-500">
                For this day
              </p>
              <div className="space-y-2.5">
                {guidance.steps.map((step, index) => (
                  <div
                    key={step.title}
                    className="flex gap-3 rounded-[1.15rem] border border-[#ead8b6] bg-white/80 px-4 py-3.5 dark:border-amber-500/15 dark:bg-stone-900/40"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7c2d12,#b45309)] text-[11px] font-black text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-[#3d2206] dark:text-[#f3e4cd]">{step.title}</p>
                      <p className="mt-1 text-xs leading-5 text-stone-600 dark:text-stone-400">{step.description}</p>
                      {step.scriptureRef ? (
                        <p className="mt-1.5 text-[11px] font-semibold text-[#8b6a2b] dark:text-amber-400">{step.scriptureRef}</p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Preparation checklist */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#8b6a2b] dark:text-amber-500">
                Preparation checklist
              </p>
              <span className="text-[11px] font-semibold text-[#7c2d12] dark:text-amber-400">
                {checkedCount} / {checklistItems.length}
              </span>
            </div>
            <div className="space-y-2">
              {checklistItems.map((item) => {
                const isChecked = checklist?.[item.key] ?? false
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => onChecklistChange(item.key, !isChecked)}
                    className={`flex w-full items-start gap-3 rounded-[1.15rem] border px-4 py-3.5 text-left transition ${
                      isChecked
                        ? "border-emerald-300 bg-emerald-50/80 dark:border-emerald-800/40 dark:bg-emerald-950/20"
                        : "border-[#ead8b6] bg-white/80 hover:bg-[#fffbf0] dark:border-amber-500/15 dark:bg-stone-900/40 dark:hover:bg-stone-900/60"
                    }`}
                  >
                    <CheckCircle2
                      className={`mt-0.5 h-5 w-5 shrink-0 ${isChecked ? "text-emerald-600 dark:text-emerald-400" : "text-stone-300 dark:text-stone-600"}`}
                    />
                    <div>
                      <p className={`text-sm font-semibold ${isChecked ? "text-emerald-800 dark:text-emerald-300" : "text-[#3d2206] dark:text-stone-200"}`}>
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-xs leading-5 text-stone-500 dark:text-stone-500">{item.detail}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.26em] text-[#8b6a2b] dark:text-amber-500" htmlFor="communion-note">
              Private note
            </label>
            <textarea
              id="communion-note"
              value={note}
              onChange={(event) => onNoteChange(event.target.value)}
              rows={4}
              placeholder="A quiet reflection for this day. Only you will see this."
              className="w-full rounded-[1.15rem] border border-[#e8d5a8] bg-white/90 px-4 py-3 text-sm leading-6 text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#b45309] dark:border-amber-500/20 dark:bg-stone-900/60 dark:text-stone-100 dark:placeholder:text-stone-600"
            />
          </div>

          {/* Actions */}
          <div className="space-y-3 pb-6">
            <Button
              type="button"
              onClick={handleMarkCommunion}
              className="w-full rounded-full bg-gradient-to-r from-[#0f766e] to-[#059669] text-white shadow-[0_14px_30px_-18px_rgba(15,118,110,0.5)] hover:brightness-105"
            >
              {completed ? "✓ Communion recorded" : "Plan / confirm Communion for this day"}
            </Button>
            <Button
              type="button"
              onClick={onMarkCompleted}
              className="w-full rounded-full bg-gradient-to-r from-[#c86224] to-[#e2a13c] text-white shadow-[0_14px_30px_-18px_rgba(200,98,36,0.45)] hover:brightness-105"
            >
              {completed ? "✓ Day completed" : "Mark day as completed"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={onTogglePause}
              className="w-full rounded-full text-stone-600 hover:bg-stone-100/80 dark:text-stone-400 dark:hover:bg-stone-900"
            >
              {store.pauseDates.includes(dateKey) ? "Remove pause mark" : "Mark as pause day"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  function handleMarkCommunion() {
    onMarkCommunion()
  }
}
