"use client"

import { useState } from "react"
import { PortalHeader } from "@/components/portal-header"
import { PortalFooter } from "@/components/portal-footer"
import { WelcomePage } from "@/components/welcome-page"
import { PortalPage } from "@/components/portal-page"
import { BuildingDirectory } from "@/components/building-directory"
import { DepartmentDetail } from "@/components/department-detail"
import type { SearchHit } from "@/lib/ministry-data"

type View =
  | { page: "welcome" }
  | { page: "portal" }
  | { page: "building"; buildingId: string; focusOfficeId?: string }
  | { page: "department"; buildingId: string; officeId: string; departmentId: string }

export default function Page() {
  const [view, setView] = useState<View>({ page: "welcome" })

  function handleSearchSelect(hit: SearchHit) {
    if (hit.departmentId) {
      setView({
        page: "department",
        buildingId: hit.buildingId,
        officeId: hit.officeId,
        departmentId: hit.departmentId,
      })
      return
    }
    setView({
      page: "building",
      buildingId: hit.buildingId,
      focusOfficeId: hit.officeId,
    })
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <PortalHeader />
      <main className="relative min-h-0 flex-1 overflow-hidden">
        <div
          key={
            view.page +
            ("buildingId" in view ? view.buildingId : "") +
            ("departmentId" in view ? view.departmentId : "")
          }
          className="h-full animate-fade-in"
        >
          {view.page === "welcome" ? (
            <WelcomePage onExplore={() => setView({ page: "portal" })} />
          ) : null}

          {view.page === "portal" ? (
            <PortalPage
              onViewBuilding={(buildingId) => setView({ page: "building", buildingId })}
              onSearchSelect={handleSearchSelect}
            />
          ) : null}

          {view.page === "building" ? (
            <BuildingDirectory
              buildingId={view.buildingId}
              focusOfficeId={view.focusOfficeId}
              onHome={() => setView({ page: "portal" })}
              onViewDepartment={(officeId, departmentId) =>
                setView({ page: "department", buildingId: view.buildingId, officeId, departmentId })
              }
            />
          ) : null}

          {view.page === "department" ? (
            <DepartmentDetail
              buildingId={view.buildingId}
              officeId={view.officeId}
              departmentId={view.departmentId}
              onHome={() => setView({ page: "portal" })}
              onBackToBuilding={() =>
                setView({ page: "building", buildingId: view.buildingId, focusOfficeId: view.officeId })
              }
            />
          ) : null}
        </div>
      </main>
      <PortalFooter />
    </div>
  )
}
