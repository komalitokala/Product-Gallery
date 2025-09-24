"use client"

import { Button } from "@/components/ui/button"
import { Settings, Store } from "lucide-react"

interface HeaderProps {
  onAdminToggle: () => void
  showAdmin: boolean
}

export function Header({ onAdminToggle, showAdmin }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Store className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">ProductHub</h1>
              <p className="text-sm text-muted-foreground">Discover amazing products</p>
            </div>
          </div>

          <Button
            variant={showAdmin ? "default" : "outline"}
            onClick={onAdminToggle}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            {showAdmin ? "View Gallery" : "Admin Panel"}
          </Button>
        </div>
      </div>
    </header>
  )
}
