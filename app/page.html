"use client"

import { useState } from "react"
import { Leaf, Map, Layers, BarChart3, Menu, X, MessageCircle } from "lucide-react"
import DashboardPage from "@/components/pages/dashboard-page"
import CarbonCalculatorPage from "@/components/pages/carbon-calculator-page"
import LandVerificationPage from "@/components/pages/land-verification-page"
import MaterialDatabasePage from "@/components/pages/material-database-page"
import EcoRatePage from "@/components/pages/eco-rate-page"
import ChatPage from "@/components/pages/chat-page"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<"dashboard" | "carbon" | "land" | "materials" | "score" | "chat">(
    "dashboard",
  )
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { id: "dashboard", label: "Dashboard", icon: Menu },
    { id: "carbon", label: "Kalkulator Karbon", icon: Leaf },
    { id: "land", label: "Verifikasi Lahan", icon: Map },
    { id: "materials", label: "Material Ramah Lingkungan", icon: Layers },
    { id: "score", label: "Eco-Rate Score", icon: BarChart3 },
    { id: "chat", label: "Eco Assistant", icon: MessageCircle },
  ]

  const renderPage = () => {
    switch (currentPage) {
      case "carbon":
        return <CarbonCalculatorPage />
      case "land":
        return <LandVerificationPage />
      case "materials":
        return <MaterialDatabasePage />
      case "score":
        return <EcoRatePage />
      case "chat":
        return <ChatPage />
      default:
        return <DashboardPage onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-sidebar text-sidebar-foreground transform transition-transform duration-300 z-50 md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-sidebar-primary-foreground" />
              </div>
              <h1 className="text-lg font-bold">Eco-build</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id as any)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/20"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border text-sm text-sidebar-foreground/70">
            <p>Mendukung SDGs 11 & 13</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border flex items-center justify-between p-4 md:p-6">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2 hover:bg-muted rounded-lg">
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <h2 className="text-xl font-bold text-foreground">Eco-build Check</h2>
          <div className="w-10 h-10" />
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">{renderPage()}</div>
      </main>
    </div>
  )
}
