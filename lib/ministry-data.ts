// Structured directory data for the Ministry of Innovation and Technology (MInT).
// Shaped as a JSON-style database so it can be moved to Laravel / Django / ASP.NET / Node.js later.

export interface DepartmentDetail {
  managerName: string
  position: string
  photo: string
  description: string
  building: string
  floor: string
  room: string
  officeNumber: string
  telephone: string
  extension: string
  email: string
  location: string
  status: "Open" | "Closed" | "By Appointment"
}

export interface Department {
  id: string
  name: string
  amharic?: string
  detail: DepartmentDetail
}

export interface Office {
  id: string
  name: string
  amharic: string
  icon: string
  work: string
  manager: {
    name: string
    position: string
    photo: string
    telephone: string
    email: string
  }
  building: string
  floor: string
  room: string
  officeNumber: string
  status: "Open" | "Closed" | "By Appointment"
  departments: Department[]
}

export interface Building {
  id: string
  name: string
  shortName: string
  illustration: string
  description: string
  offices: Office[]
}

// Real manager photos based on leadership directory - only from manager images folder
const MANAGER_PHOTOS: Record<string, string> = {
  "Dr. Belete Molla": "/images/manager images/Dr. Belete Mola.png",
  "Dr. Bayissa Bedada": "/images/manager images/Dr. Bayisa Bedada.png",
  "Mr. Muluken Qere": "/images/manager images/Muluken Kere.png",
  "Dr. Fozia Amin": "/images/manager images/Dr.Foziya Amin.png",
  "Mr. Leul Seyoum": "/images/manager images/Liul Siyum.png",
  "Mr. Yonas Hailu": "/images/manager images/Yonas Hailu.png",
  "Mr. Seyoum Mengesha": "/images/manager images/Siyum Mengesha.png",
  "Mrs. Mihraj Zekiyu": "/images/manager images/Mihiraj Zekiya.png",
  "Mr. Selamyihun Adefris": "/images/manager images/Selamyihun.png",
  "Dr. Habtamu Abera": "/images/manager images/Dr. Habtamu Abera.png",
  "Dr. Teklemariam Tesema": "/images/manager images/Dr. Teklemariyam Tesema.png",
  "Mr. Solomon Aynimar": "/images/manager images/Solomon Aynimar.png",
  "Mr. Azmach Desalegn": "/images/manager images/Azmach Desalegn.png",
  "Mr. Dinber Getahun": "/images/manager images/Denber Getahun.png",
  "Mr. Yidnekachew Teshome": "/images/manager images/Yidnekachew Teshome.png",
  "Mr. Adagne Assefa": "/images/manager images/Adagne Asefa.png",
}

// Placeholder for managers without photos
const PLACEHOLDER_PHOTO = "/placeholder-user.jpg"

// Helper function to get manager photo or placeholder
function getManagerPhoto(name: string): string {
  return MANAGER_PHOTOS[name] || PLACEHOLDER_PHOTO
}

// Building assignment helper
type BuildingAssignment = "Building A" | "Building B" | "Not Specified"

function dept(
  id: string,
  name: string,
  building: BuildingAssignment,
  floor: string,
  room: string,
  officeNumber: string,
  managerName: string,
  position: string,
  ext: string,
  description: string,
  status: DepartmentDetail["status"] = "Open",
): Department {
  return {
    id,
    name,
    detail: {
      managerName,
      position,
      photo: getManagerPhoto(managerName),
      description,
      building,
      floor,
      room,
      officeNumber,
      telephone: "+251 11 552 " + ext.padStart(4, "0"),
      extension: ext,
      email: id.replace(/-/g, ".") + "@mint.gov.et",
      location: `${building}, Floor ${floor}, Room ${room}`,
      status,
    },
  }
}

// Building A Offices - Main administrative & executive block
const buildingAOffices: Office[] = [
  {
    id: "ministers-office",
    name: "Minister's Office",
    amharic: "የሚኒስትር ጽሕፈት ቤት",
    icon: "crown",
    work: "Provides executive leadership, sets strategic direction and oversees the overall coordination of the Ministry.",
    manager: {
      name: "H.E. Dr. Belete Molla",
      position: "Minister / ሚኒስትር",
      photo: getManagerPhoto("Dr. Belete Molla"),
      telephone: "+251 11 552 1001",
      email: "minister@mint.gov.et",
    },
    building: "Building A",
    floor: "7",
    room: "701",
    officeNumber: "A-701",
    status: "Open",
    departments: [
      dept("head-ministers-office", "Head of Minister's Office", "Building A", "7", "702", "A-702",
        "Mr. Leul Seyoum", "Head of Minister's Office / የሚኒስትር ጽ/ቤት ኃላፊ", "1002",
        "Manages the Minister's office operations, coordinates executive schedules and oversees ministerial communications."),
      dept("senior-advisor", "Senior Advisor to the Minister", "Building A", "7", "703", "A-703",
        "Dr. Solomon Belay", "Senior Advisor to the Minister / የሚኒስትሩ ከፍተኛ አማካሪ", "1003",
        "Provides strategic advice and counsel to the Minister on policy matters and key decisions."),
      dept("advisor-state-minister", "Advisor State Minister Office", "Building A", "8", "801", "A-801",
        "Dr. Fozia Amin", "Advisor State Minister / አማካሪ ሚኒስትር ዴኤታ", "1004",
        "Provides advisory support on strategic initiatives and specialized policy areas."),
      dept("legal-service", "Legal Service Office", "Building A", "1", "101", "A-101",
        "Mr. Ayalneh Lemma", "Executive for Legal Services / የህግ አገልግሎት ስራ አስፈጻሚ", "1005",
        "Provides legal counsel, drafts ministry regulations, ensures statutory compliance and handles litigation matters on behalf of the Ministry."),
      dept("audit-service", "Internal Audit Office", "Building A", "2", "201", "A-201",
        "Mr. Ashagrie Alemu", "Executive for Internal Audit / የኦዲት ስራ አስፈጻሚ", "1006",
        "Conducts internal audits of financial accounts, procurement processes and operational activities to ensure accountability and transparency."),
      dept("institutional-reform", "Institutional Reform Office", "Building A", "2", "202", "A-202",
        "Mr. Seber Andualem", "Executive for Institutional Reform / የተቋማዊ ለውጥ ስራ አስፈጻሚ", "1007",
        "Manages organisational restructuring, institutional capacity building and transition planning to support the Ministry's evolving mandate."),
      dept("ethics-monitoring", "Ethics Monitoring Office", "Building A", "2", "203", "A-203",
        "Mr. Mekonnen Moges", "Executive for Ethics Monitoring / የስነ-ምግባር መከታተያ ስራ አስፈጻሚ", "1008",
        "Promotes ethical conduct, investigates misconduct, implements anti-corruption policies and ensures integrity across all Ministry units."),
      dept("public-relations", "Public Relations & Communication Office", "Not Specified", "N/A", "N/A", "N/A",
        "Mr. Tesfayo Alemnew", "Executive for Public Relations & Communication / የህዝብ ግንኙነትና ኮሙኒኬሽን አገልግሎት ስራ አስፈጻሚ", "1009",
        "Manages media relations, public messaging, social media presence and stakeholder communications for the Ministry."),
      dept("women-social-inclusion", "Women & Youth Social Inclusion Office", "Building A", "4", "401", "A-401",
        "Mrs. Elsabet Gebreselassie", "Executive for Women & Youth Social Inclusion / የሴቶችና ወጣቶች ማህበራዊ አካቶ ትግበራ ስራ አስፈጻሚ", "1010",
        "Advances gender equity, youth empowerment and ensures inclusive participation across Ministry initiatives."),
    ],
  },
  {
    id: "partnership-alliance",
    name: "Innovation & Technology Partnership and Alliance Affairs Office",
    amharic: "የኢኖቬሽንና ቴክኖሎጂ የትብብርና ትስስር ጉዳዮች",
    icon: "handshake",
    work: "Builds strategic partnerships and alliances with local and international technology and innovation stakeholders.",
    manager: {
      name: "Mr. Leul Seyoum",
      position: "Lead Executive for Innovation & Technology Partnership & Linkage / የኢኖቬሽንና ቴክኖሎጂ የትብብርና ትስስር ጉዳዮች መሪ ስራ አስፈጻሚ",
      photo: getManagerPhoto("Mr. Leul Seyoum"),
      telephone: "+251 11 552 2001",
      email: "partnership@mint.gov.et",
    },
    building: "Building A",
    floor: "7",
    room: "704",
    officeNumber: "A-704",
    status: "Open",
    departments: [],
  },
  {
    id: "innovation-research",
    name: "Innovation and Research Sector",
    amharic: "የኢኖቬሽንና ምርምር ዘርፍ",
    icon: "flask",
    work: "Leads national research programs and drives technology transformation and innovation management.",
    manager: {
      name: "H.E. Dr. Bayissa Bedada",
      position: "State Minister for Research & Innovation Development / የምርምርና ኢኖቬሽን ልማት ሚኒስትር ዴኤታ",
      photo: getManagerPhoto("Dr. Bayissa Bedada"),
      telephone: "+251 11 552 3001",
      email: "research@mint.gov.et",
    },
    building: "Building A",
    floor: "6",
    room: "601",
    officeNumber: "A-601",
    status: "Open",
    departments: [
      dept("innovation-development", "Innovation Development Office", "Building A", "6", "602", "A-602",
        "Mr. Selamyihun Adefris", "Lead Executive for Innovation Development / የኢኖቬሽን ልማት መሪ ስራ አስፈጻሚ", "3002",
        "Oversees innovation pipeline management, intellectual property frameworks and the commercialisation of government-funded research outputs."),
      dept("national-research", "National Research & Development Office", "Building A", "5", "501", "A-501",
        "Dr. Habtamu Abera", "Lead Executive for National Research & Development / የሀገራዊ ምርምርና ልማት መሪ ስራ አስፈጻሚ", "3003",
        "Designs and oversees national research agendas, funds applied science projects and coordinates with universities and research institutes."),
      dept("technology-development", "Technology Development & Transfer Office", "Building A", "5", "502", "A-502",
        "Dr. Teklemariam Tesema", "Lead Executive for Technology Development & Transfer / የቴክኖሎጂ ልማትና ሽግግር መሪ ስራ አስፈጻሚ", "3004",
        "Drives adoption of emerging technologies, manages technology transfer programs and transformation roadmaps."),
      dept("operations-management", "Operations Management Office", "Building A", "5", "503", "A-503",
        "Mr. Solomon Aynimar", "Chief Executive for Operations Management / የስራ አመራር ዋና ስራ አስፈጻሚ", "3005",
        "Oversees operational efficiency, project execution and performance monitoring across the sector."),
    ],
  },
  {
    id: "administration",
    name: "Administration Office",
    amharic: "የአስተዳደር ጽሕፈት ቤት",
    icon: "building",
    work: "Manages the Ministry's finance, procurement, human resources, facilities and internal ICT services.",
    manager: {
      name: "Head of Administration",
      position: "Head of Administration",
      photo: PLACEHOLDER_PHOTO,
      telephone: "+251 11 552 5001",
      email: "admin@mint.gov.et",
    },
    building: "Building A",
    floor: "3",
    room: "301",
    officeNumber: "A-301",
    status: "Open",
    departments: [
      dept("strategic-affairs", "Strategic Affairs Office", "Building A", "3", "302", "A-302",
        "Mr. Azmach Desalegn", "Executive for Strategic Affairs / የስትራቴጂክ ጉዳዮች ስራ አስፈጻሚ", "5002",
        "Coordinates the Ministry's strategic planning cycles, monitors implementation of the corporate plan and prepares performance reports."),
      dept("ict-office", "Information Communication Technology Office", "Building A", "3", "303", "A-303",
        "Mr. Dinber Getahun", "Executive for Information Communication Technology / የኢንፎርሜሽን ኮሙኒኬሽን ቴክኖሎጂ ስራ አስፈጻሚ", "5003",
        "Maintains internal ICT systems, provides helpdesk support, manages network security and implements digital workplace tools."),
      dept("basic-services", "Basic Services Office", "Building A", "3", "304", "A-304",
        "Mr. Yidnekachew Teshome", "Executive for Basic Services / የመሠረታዊ አገልግሎት ሥራ አስፈጻሚ", "5004",
        "Manages essential operational services and support functions across the Ministry."),
      dept("human-resource", "Competency & Human Resource Management Office", "Building A", "3", "305", "A-305",
        "Mr. Adagne Assefa", "Executive for Competency & Human Resource Management / የብቃትና ሰው ሀብት አስተዳደር ሥራ አስፈጻሚ", "5005",
        "Oversees staff recruitment, competency development, performance management, payroll administration and employee welfare programmes."),
      dept("finance-procurement", "Procurement & Finance Office", "Building A", "3", "306", "A-306",
        "Mrs. Etalemahu Gezahagn", "Executive for Procurement & Finance / የግዥና ፋይናንስ ስራ አሰፈጻሚ", "5006",
        "Manages budget preparation, financial reporting, procurement tendering and contract administration in accordance with government regulations."),
    ],
  },
  {
    id: "policy-strategy",
    name: "Policy and Strategy Studies Research Executive",
    amharic: "የፖሊሲና ስትራቴጂ ጥናትና ምርምር መሪ ስራ አስፈጻሚ",
    icon: "scroll",
    work: "Conducts policy and strategy studies and research to guide the Ministry's decision making.",
    manager: {
      name: "Dr. Bekuretsion Alemayehu",
      position: "Lead Executive for Policy & Strategy Research / የፖሊሲና ስትራቴጂ ጥናትና ምርምር መሪ ስራ አስፈጻሚ",
      photo: getManagerPhoto("Dr. Bekuretsion Alemayehu"),
      telephone: "+251 11 552 6001",
      email: "policy@mint.gov.et",
    },
    building: "Building A",
    floor: "4",
    room: "402",
    officeNumber: "A-402",
    status: "By Appointment",
    departments: [],
  },
  {
    id: "innovation-fund",
    name: "Innovation Fund Office",
    amharic: "የኢኖቬሽን ፈንድ ጽሕፈት ቤት",
    icon: "coins",
    work: "Administers the national innovation fund and finances high-impact technology and startup initiatives.",
    manager: {
      name: "Mrs. Adanech Tujo",
      position: "Head of Innovation Fund Office / የኢኖቬሽን ፈንድ ጽ/ቤት ኃላፊ",
      photo: getManagerPhoto("Mrs. Adanech Tujo"),
      telephone: "+251 11 552 7001",
      email: "fund@mint.gov.et",
    },
    building: "Building A",
    floor: "2",
    room: "204",
    officeNumber: "A-204",
    status: "Open",
    departments: [],
  },
]

// Building B Offices - ICT, Digital Economy & Records block
const buildingBOffices: Office[] = [
  {
    id: "ict-digital-economy",
    name: "ICT and Digital Economy Sector",
    amharic: "የአይሲቲና ዲጂታል ኢኮኖሚ ዘርፍ",
    icon: "network",
    work: "Develops national digital infrastructure, e-government services and the country's digital economy.",
    manager: {
      name: "H.E. Mr. Muluken Qere",
      position: "State Minister for ICT & Digital Economy / የአይሲቲና ዲጂታል ኢኮኖሚ ሚኒስትር ዴኤታ",
      photo: getManagerPhoto("Mr. Muluken Qere"),
      telephone: "+251 11 552 4001",
      email: "ict@mint.gov.et",
    },
    building: "Building B",
    floor: "3",
    room: "301",
    officeNumber: "B-301",
    status: "Open",
    departments: [
      dept("ict-infrastructure", "ICT Infrastructure & Administration Office", "Building B", "1", "101", "B-101",
        "Mr. Yonas Hailu", "Lead Executive for ICT Infrastructure & Administration / የአይሲቲ መሰረተ ልማትና አስተዳደር መሪ ስራ አስፈጻሚ", "4002",
        "Plans and maintains national ICT infrastructure including data centres, broadband networks and government communication backbones."),
      dept("digital-economy", "Digital Economy Development Office", "Building B", "2", "201", "B-201",
        "Mr. Seyoum Mengesha", "Lead Executive for Digital Economy Development / የዲጂታል ኢኮኖሚ ልማት መሪ ስራ አስፈጻሚ", "4003",
        "Develops policy frameworks and programmes to grow Ethiopia's digital economy, including fintech, e-commerce and digital entrepreneurship."),
      dept("e-government", "E-Government Development & Administration Office", "Building B", "2", "202", "B-202",
        "Mrs. Mihraj Zekiyu", "Lead Executive for E-Government Development & Administration / የኤሌክትሮኒክስ መንግስት ልማትና አስተዳደር መሪ ስራ አስፈጻሚ", "4004",
        "Designs and delivers digital government services, manages the national e-services portal and oversees citizen-facing digital platforms."),
      dept("records-archives", "Records & Archives Management Services", "Building B", "1", "102", "B-102",
        "Mrs. Yenenesh Alemayehu", "Head of Records & Archives Management Services / የሪከርድና ማህደር ስራ አመራር አገልግሎት ኃላፊ", "4005",
        "Manages official records, archives and information management systems for the Ministry."),
    ],
  },
]

// Export buildings array
export const buildings: Building[] = [
  {
    id: "building-a",
    name: "Building A",
    shortName: "A",
    illustration: "/images/building-a.png",
    description: "Main administrative & executive offices",
    offices: buildingAOffices,
  },
  {
    id: "building-b",
    name: "Building B",
    shortName: "B",
    illustration: "/images/building-b.png",
    description: "ICT, Digital Economy & Records",
    offices: buildingBOffices,
  },
]

// Helper: get building by ID
export function getBuilding(id: string): Building | undefined {
  return buildings.find((b) => b.id === id)
}

// Helper: get office by ID within a building
export function getOffice(buildingId: string, officeId: string): Office | undefined {
  const building = getBuilding(buildingId)
  return building?.offices.find((o) => o.id === officeId)
}

// Helper: get department by ID within an office
export function getDepartment(
  buildingId: string,
  officeId: string,
  departmentId: string,
): { building: Building; office: Office; department: Department } | undefined {
  const building = getBuilding(buildingId)
  if (!building) return undefined
  
  const office = building.offices.find((o) => o.id === officeId)
  if (!office) return undefined
  
  const department = office.departments.find((d) => d.id === departmentId)
  if (!department) return undefined
  
  return { building, office, department }
}

// Search functionality
export interface SearchHit {
  type: "office" | "department"
  buildingId: string
  officeId: string
  departmentId?: string
  label: string
  sublabel: string
  managerName: string
  officeNumber: string
}

export function searchDirectory(query: string): SearchHit[] {
  if (!query.trim()) return []
  
  const q = query.toLowerCase()
  const results: SearchHit[] = []

  for (const building of buildings) {
    for (const office of building.offices) {
      // Search offices
      const officeMatch =
        office.name.toLowerCase().includes(q) ||
        office.manager.name.toLowerCase().includes(q) ||
        office.officeNumber.toLowerCase().includes(q) ||
        office.amharic.toLowerCase().includes(q)

      if (officeMatch) {
        results.push({
          type: "office",
          buildingId: building.id,
          officeId: office.id,
          label: office.name,
          sublabel: `${office.manager.name} · ${office.officeNumber}`,
          managerName: office.manager.name,
          officeNumber: office.officeNumber,
        })
      }

      // Search departments
      for (const dept of office.departments) {
        const deptMatch =
          dept.name.toLowerCase().includes(q) ||
          dept.detail.managerName.toLowerCase().includes(q) ||
          dept.detail.officeNumber.toLowerCase().includes(q) ||
          dept.detail.room.toLowerCase().includes(q)

        if (deptMatch) {
          results.push({
            type: "department",
            buildingId: building.id,
            officeId: office.id,
            departmentId: dept.id,
            label: dept.name,
            sublabel: `${dept.detail.managerName} · ${dept.detail.officeNumber}`,
            managerName: dept.detail.managerName,
            officeNumber: dept.detail.officeNumber,
          })
        }
      }
    }
  }

  return results.slice(0, 20) // Limit to 20 results
}
