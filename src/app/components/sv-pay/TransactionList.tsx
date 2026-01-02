import { Coffee, ShoppingBag, Bus, Wifi, Train, CreditCard, LucideIcon } from "lucide-react"

export interface Transaction {
  id: number
  merchant: string
  amount: string
  type: "credit" | "debit"
  category: string
  date: Date
}

interface TransactionListProps {
  transactions: Transaction[]
}

const categoryIcons: Record<string, LucideIcon> = {
  food: Coffee,
  shopping: ShoppingBag,
  transport: Bus,
  utility: Wifi,
  transit: Train,
  default: CreditCard,
}

export function TransactionList({ transactions }: TransactionListProps) {
  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours}h ago`
    if (hours < 48) return "Yesterday"
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" })
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => {
        const Icon = categoryIcons[transaction.category] || categoryIcons.default
        const isCredit = transaction.type === "credit"
        
        return (
          <div
            key={transaction.id}
            className="flex items-center justify-between bg-sv-glass-bg border border-sv-glass-border backdrop-blur-md rounded-xl p-5"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isCredit ? "bg-success/10" : "bg-destructive/10"
                }`}
              >
                <Icon
                  size={22}
                  className={isCredit ? "text-success" : "text-destructive"}
                />
              </div>
              <div>
                <p className="font-body text-sv-text-main font-medium">{transaction.merchant}</p>
                <p className="font-body text-sv-text-muted text-sm">{formatDate(transaction.date)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-heading font-semibold ${isCredit ? "text-success" : "text-sv-text-main"}`}>
                {isCredit ? "+" : "-"}£{transaction.amount}
              </p>
              <p className="text-label text-sv-text-muted">{transaction.category}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
