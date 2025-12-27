export interface Message {
  id: string
  type: "user" | "ai" | "options"
  content: string
  timestamp: Date
  planOptions?: PlanOption[]
}

export interface PlanOption {
  id: string
  title: string
  description: string
  tags: {
    time?: string
    budget?: string
    dietary?: string[]
  }
  highlights: string[]
}

export type ChatState = "idle" | "loading" | "error"
