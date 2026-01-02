"use client"

import { Clock, DollarSign, Utensils, ChevronRight } from "lucide-react"
import type { PlanOption } from "./types"
import { Button } from "../ui/button"

interface PlanOptionsCardProps {
  plan: PlanOption
  onStartPlan: (planId: string) => void
}

export function PlanOptionsCard({ plan, onStartPlan }: PlanOptionsCardProps) {
  return (
    <div className="bg-sv-glass-bg border border-sv-glass-border rounded-xl p-4 backdrop-blur-md">
      {/* Title & Description */}
      <h3 className="font-heading text-sv-text-main font-semibold mb-1">{plan.title}</h3>
      <p className="font-body text-sv-text-muted text-sm mb-4">{plan.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {plan.tags.time && (
          <div className="flex items-center gap-1.5 bg-sv-navy border border-sv-glass-border rounded-full px-3 py-1.5">
            <Clock className="w-3.5 h-3.5 text-sv-azure" aria-hidden="true" />
            <span className="text-xs text-sv-text-main">{plan.tags.time}</span>
          </div>
        )}
        {plan.tags.budget && (
          <div className="flex items-center gap-1.5 bg-sv-navy border border-sv-glass-border rounded-full px-3 py-1.5">
            <DollarSign className="w-3.5 h-3.5 text-success" aria-hidden="true" />
            <span className="text-xs text-sv-text-main">{plan.tags.budget}</span>
          </div>
        )}
        {plan.tags.dietary && plan.tags.dietary.length > 0 && (
          <div className="flex items-center gap-1.5 bg-sv-navy border border-sv-glass-border rounded-full px-3 py-1.5">
            <Utensils className="w-3.5 h-3.5 text-sv-text-muted" aria-hidden="true" />
            <span className="text-xs text-sv-text-main">{plan.tags.dietary.join(", ")}</span>
          </div>
        )}
      </div>

      {/* Highlights */}
      <ul className="space-y-2 mb-4">
        {plan.highlights.map((highlight, index) => (
          <li key={index} className="flex items-start gap-2">
            <ChevronRight className="w-4 h-4 text-sv-azure flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sv-text-muted text-sm">{highlight}</span>
          </li>
        ))}
      </ul>

      {/* Start Plan Button */}
      <Button
        onClick={() => onStartPlan(plan.id)}
        className="w-full bg-sv-azure hover:bg-sv-azure/90 text-white rounded-full h-11 font-medium"
      >
        Start Plan
      </Button>
    </div>
  )
}
