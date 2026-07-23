export type Lang = "en" | "am"

export const t = {
  en: {
    // Header
    backToHome: "Back to Home",
    digitalOfficeNav: "Digital Office\nNavigation Portal",
    officialPortal: "Navigation Portal",

    // Footer
    allRightsReserved: "All Rights Reserved.",
    digitalOfficeNavPortal: "Digital Office Navigation Portal",

    // Welcome page
    ministryWayfinding: "Ministry Wayfinding System",
    findAnyOffice: "MInT Leaders",
    anywhereInMint: "Office Locator",
    welcomeDesc:
      "Instantly locate ministry offices, departments, managers, room numbers and buildings across the Ministry of Innovation and Technology.",
    buildings: "Buildings",
    offices: "Offices",
    departments: "Departments",
    explorePortal: "Click to explore MInT Leaders",
    ministryLeadership: "Ministry Leadership",
    clickLeader: "Click a leader to explore their sector",
    allOfficesOpen: "All offices open",
    reportingOfficers: "Reporting Officers",
    openOffice: "Open",
    minister: "Minister",

    // Leader titles on welcome page
    leaderTitles: {
      minister: "Minister of Innovation and Technology",
      researchInnovation: "State Minister, Research & Innovation",
      ictDigital: "State Minister, ICT & Digital Economy",
      advisory: "Advisory State Minister",
      headMinistersOffice: "Head of Minister's Office",
      chiefAdmin: "Chief Administration",
    },
    leaderNames: {
      minister: "H.E. Dr. Belete Molla Getahun",
      researchInnovation: "H.E. Dr. Bayissa Bedada",
      ictDigital: "H.E. Ato Muluken Qere",
      advisory: "H.E. Dr. Fozia Amin",
      headMinistersOffice: "Ato Leul Seyoum",
      chiefAdmin: "Ato Solomon Aynimar",
    },

    // Portal page
    mintNavPortal: "MInT Navigation Portal",
    whereToGo: "Where would you",
    likeToGo: "like to go?",
    portalDesc:
      "Find offices, departments, managers, room numbers and buildings across the Ministry of Innovation and Technology.",
    quickSearch: "Quick Search",
    viewOffices: "View Offices",
    searchPlaceholder: "Search by Department, Office, Manager, Room Number or Office Number...",
    tipSearch: "Search by name, department or room",
    tipBrowse: "Browse offices building by building",
    tipFloor: "Get exact floor and room directions",

    // Building directory
    home: "Home",
    allOffices: "All offices",
    directory: "Directory",
    buildingDirectory: "Building Directory",
    officeCount: (n: number) => `${n} offices`,
    deptCount: (n: number) => `${n} dept${n !== 1 ? "s" : ""}`,
    departments2: "Departments",
    clickToOpen: "Click a card to open",
    noDepartments: "No departments listed",
    noDeptContact: "Contact the office directly for more information.",
    viewDetails: "View Details",
    call: "Call",
    email: "Email",
    // info labels
    building: "Building",
    floor: "Floor",
    room: "Room",
    contactNo: "Contact No.",
    emailLabel: "Email",

    // Department detail
    locationContact: "Location & Contact",
    directions: "Directions",
    headOfOffice: "Head of Office",
    backTo: "Back to",
    officeNumber: "Office No.",
    telephone: "Telephone",
    extension: "Extension",
    location: "Location",

    // Search results
    noResults: "No matching offices, departments or managers found.",
    clearSearch: "Clear search",
    searchAriaLabel: "Search the ministry directory",

    // Status
    open: "Open",
    closed: "Closed",
    byAppointment: "By Appointment",

    // Building descriptions
    buildingADesc: "",
    buildingBDesc: "",
  },

  am: {
    // Header
    backToHome: "ወደ መነሻ ተመለስ",
    digitalOfficeNav: "ዲጂታል ቢሮ\nናቪጌሽን ፖርታል",
    officialPortal: "ዲጂታል ቢሮ አመላካች ሲስተም",

    // Footer
    allRightsReserved: "መብቱ በሕግ የተጠበቀ ነው።",
    digitalOfficeNavPortal: "ዲጂታል ቢሮ ናቪጌሽን ፖርታል",

    // Welcome page
    ministryWayfinding: "የሚኒስቴር መምሪያ ስርዓት",
    findAnyOffice: "ወዴት",
    anywhereInMint: "መሄድ ይፈልጋሉ?",
    welcomeDesc:
      "የኢኖቬሽንና ቴክኖሎጂ ሚኒስቴር ውስጥ ያሉ ቢሮዎችን፣ ክፍሎችን፣ ሥራ አስኪያጆችን፣ የክፍል ቁጥሮችን እና ህንጻዎችን በቅጽበት ይፈልጉ።",
    buildings: "ህንጻዎች",
    offices: "ቢሮዎች",
    departments: "ክፍሎች",
    explorePortal: "የሚኒስቴር ፖርታልን ያስሱ",
    ministryLeadership: "የሚኒስቴር አመራር",
    clickLeader: "ዘርፋቸውን ለማስሰስ መሪ ይምረጡ",
    allOfficesOpen: "ሁሉም ቢሮዎች ክፍት ናቸው",
    reportingOfficers: "ሪፖርት አቅራቢ ሃላፊዎች",
    openOffice: "ክፈት",
    minister: "ሚኒስትር",

    // Leader titles on welcome page
    leaderTitles: {
      minister: "የኢኖቬሽንና ቴክኖሎጂ ሚኒስቴር ",
      researchInnovation: "የምርምርና ኢኖቬሽን ልማት ሚኒስትር ዴኤታ",
      ictDigital: "የአይሲቲና ዲጂታል ኢኮኖሚ ሚኒስትር ዴኤታ",
      advisory: "አማካሪ ሚኒስትር ዴኤታ",
      headMinistersOffice: "የሚኒስትር ጽ/ቤት ኃላፊ",
      chiefAdmin: "ዋና ስራ አስፈጻሚ፣ ስራ አፈጻጸምና አስተዳደር",
    },
    leaderNames: {
      minister: "ዶ/ር በለጠ ሞላ ጌታሁን",
      researchInnovation: "ዶ/ር ባይሳ በዳዳ",
      ictDigital: "አቶ ሙሉቀን ቀሬ",
      advisory: "ዶ/ር ፎዚያ አሚን",
      headMinistersOffice: "አቶ ልዑል ስዩም",
      chiefAdmin: "አቶ ሰለሞን አይኒማር",
    },

    // Portal page
    mintNavPortal: "የሚኒስቴር ናቪጌሽን ፖርታል",
    whereToGo: "ወዴት",
    likeToGo: "መሄድ ይፈልጋሉ?",
    portalDesc:
      "የኢኖቬሽንና ቴክኖሎጂ ሚኒስቴር ሚኒስትር  ውስጥ ያሉ ቢሮዎችን፣ ክፍሎችን፣ ሥራ አስኪያጆችን፣ የክፍል ቁጥሮችን እና ህንጻዎችን ይፈልጉ።",
    quickSearch: "ፈጣን ፍለጋ",
    viewOffices: "ቢሮዎችን ይመልከቱ",
    searchPlaceholder: "በክፍል፣ ቢሮ፣ ሥራ አስኪያጅ፣ የክፍል ቁጥር ወይም የቢሮ ቁጥር ይፈልጉ...",
    tipSearch: "በስም፣ ክፍል ወይም ክፍሉ ይፈልጉ",
    tipBrowse: "ቢሮዎችን ሕንጻ በሕንጻ ያስሱ",
    tipFloor: "ትክክለኛ ፎቅ እና ክፍል መመሪያ ያግኙ",

    // Building directory
    home: "መነሻ",
    allOffices: "ሁሉም ቢሮዎች",
    directory: "ማውጫ",
    buildingDirectory: "የህንጻ ማውጫ",
    officeCount: (n: number) => `${n} ቢሮዎች`,
    deptCount: (n: number) => `${n} ክፍ${n !== 1 ? "ሎች" : "ል"}`,
    departments2: "ክፍሎች",
    clickToOpen: "ለመክፈት ካርዱን ጠቅ ያድርጉ",
    noDepartments: "ምንም ክፍሎች አልተዘረዘሩም",
    noDeptContact: "ለበለጠ መረጃ ቢሮውን ቀጥታ ያነጋግሩ።",
    viewDetails: "ዝርዝሮችን ይመልከቱ",
    call: "ይደውሉ",
    email: "ኢሜይል",
    // info labels
    building: "ህንጻ",
    floor: "ፎቅ",
    room: "ክፍል",
    contactNo: "የስልክ ቁጥር",
    emailLabel: "ኢሜይል",

    // Department detail
    locationContact: "አካባቢና ግንኙነት",
    directions: "አቅጣጫ",
    headOfOffice: "የቢሮ ኃላፊ",
    backTo: "ተመለስ ወደ",
    officeNumber: "የቢሮ ቁጥር",
    telephone: "ስልክ",
    extension: "ኤክስቴንሽን",
    location: "አካባቢ",

    // Search results
    noResults: "የሚዛመዱ ቢሮዎች፣ ክፍሎች ወይም ሥራ አስኪያጆች አልተገኙም።",
    clearSearch: "ፍለጋ ያጽዱ",
    searchAriaLabel: "የሚኒስቴር ማውጫ ይፈልጉ",

    // Status
    open: "ክፍት",
    closed: "ዝግ",
    byAppointment: "በቀጠሮ",

    // Building descriptions
    buildingADesc: "",
    buildingBDesc: "",
  },
} as const

export type Translations = (typeof t)["en"]
