export interface Confession {
    id: number
    userName: string
    description: string
    image?: string
    hashtag: string
    adminHashtag?: string
    adminComment?: string
    link?: string
    feeling: string
    timeConfession: string
    status: "pending" | "approved" | "rejected"
    category?: string
    selected?: boolean
    hasWarning?: boolean
    isBanned?: boolean
    warningMessage?: string
    banReason?: string
  }
  
  export interface ConfessionStats {
    total: number
    pending: number
    approved: number
    rejected: number
    totalUsers: number
    today: number
    yesterday: number
    lastWeekend: number
  }
  