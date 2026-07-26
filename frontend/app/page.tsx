"use client"

import { useEffect, useState } from "react"
import { PortalHeader } from "@/components/portal-header"
import { PortalFooter } from "@/components/portal-footer"
import { WelcomePage } from "@/components/welcome-page"
import { PortalPage } from "@/components/portal-page"
import { BuildingDirectory } from "@/components/building-directory"
import { DepartmentDetail } from "@/components/department-detail"
import type { PortalLanguage } from "@/components/portal-header"
import type { SearchHit } from "@/lib/ministry-data"

type View =
  | { page: "welcome" }
  | { page: "portal" }
  | { page: "building"; buildingId: string; focusOfficeId?: string }
  | { page: "department"; buildingId: string; officeId: string; departmentId: string }

export default function Page() {
  const [view, setView] = useState<View>({ page: "welcome" })
  const [language, setLanguage] = useState<PortalLanguage>("en")

  // Update <html lang> attribute for accessibility / screen readers
  useEffect(() => {
    document.documentElement.lang = language === "am" ? "am" : "en"
  }, [language])

  const isDeep = view.page === "building" || view.page === "department"

  function handleSearchSelect(hit: SearchHit) {
    if (hit.departmentId) {
      setView({ page: "department", buildingId: hit.buildingId, officeId: hit.officeId, departmentId: hit.departmentId })
      return
    }
    setView({ page: "building", buildingId: hit.buildingId, focusOfficeId: hit.officeId })
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <PortalHeader
        showBackButton={isDeep}
        onBackToHome={() => setView({ page: "welcome" })}
        language={language}
        onLanguageChange={setLanguage}
      />
      <main className="relative min-h-0 flex-1 overflow-hidden">
        <div
          key={
            view.page +
            ("buildingId" in view ? view.buildingId : "") +
            ("departmentId" in view ? view.departmentId : "")
          }
          className="h-full animate-fade-in"
        >
          {view.page === "welcome" && (
            <WelcomePage
              language={language}
              onExplore={() => setView({ page: "portal" })}
              onNavigateOffice={(buildingId, officeId) =>
                setView({ page: "building", buildingId, focusOfficeId: officeId })
              }
            />
          )}

          {view.page === "portal" && (
            <PortalPage
              language={language}
              onViewBuilding={(buildingId) => setView({ page: "building", buildingId })}
              onSearchSelect={handleSearchSelect}
              onGoHome={() => setView({ page: "welcome" })}
            />
          )}

          {view.page === "building" && (
            <BuildingDirectory
              language={language}
              buildingId={view.buildingId}
              focusOfficeId={view.focusOfficeId}
              onHome={() => setView({ page: "welcome" })}
              onViewDepartment={(officeId, departmentId) =>
                setView({ page: "department", buildingId: view.buildingId, officeId, departmentId })
              }
            />
          )}

          {view.page === "department" && (
            <DepartmentDetail
              language={language}
              buildingId={view.buildingId}
              officeId={view.officeId}
              departmentId={view.departmentId}
              onHome={() => setView({ page: "welcome" })}
              onBackToBuilding={() =>
                setView({ page: "building", buildingId: view.buildingId, focusOfficeId: view.officeId })
              }
            />
          )}
        </div>
      </main>
      <PortalFooter language={language} />
    </div>
  )
}
