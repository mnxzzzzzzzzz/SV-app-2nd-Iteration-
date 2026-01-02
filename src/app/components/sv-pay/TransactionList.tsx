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
            className="flex items-center justify-between bg-white/5 border border-white/5 backdrop-blur-md rounded-2xl p-5"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isCredit ? "bg-green-500/10" : "bg-red-500/10"
                }`}
              >
                <Icon
                  size={22}
                  className={isCredit ? "text-green-400" : "text-red-400"}
                />
              </div>
              <div>
                <p className="text-white font-medium">{transaction.merchant}</p>
                <p className="text-[#A0A4B8] text-sm">{formatDate(transaction.date)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${isCredit ? "text-green-400" : "text-white"}`}>
                {isCredit ? "+" : "-"}£{transaction.amount}
              </p>
              <p className="text-[#A0A4B8] text-xs capitalize">{transaction.category}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
