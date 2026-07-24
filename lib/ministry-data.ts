// Structured directory data for the Ministry of Innovation and Technology (MInT).
// Shaped as a JSON-style database so it can be moved to Laravel / Django / ASP.NET / Node.js later.

export interface DepartmentDetail {
  managerName: string
  managerNameAmharic?: string
  position: string
  positionAmharic: string
  photo: string
  description: string
  descriptionAmharic: string
  building: string
  floor: string
  room: string
  officeNumber: string
  telephone: string
  extension: string
  email: string
  location: string
  locationAmharic: string
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
  workAmharic: string
  manager: {
    name: string
    nameAmharic?: string
    position: string
    positionAmharic: string
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

// Placeholder for managers without photos
const PLACEHOLDER_PHOTO = "/placeholder-user.jpg"

// Real manager photos based on leadership directory - only from manager images folder
const MANAGER_PHOTOS: Record<string, string> = {
  // 1. Minister
  "Dr. Belete Molla": "/images/manager%20images/dr%20belete%20molla.png",
  "ዶ/ር በለጠ ሞላ ጌታሁን": "/images/manager%20images/dr%20belete%20molla.png",
  
  // 2. State Minister - Research & Innovation
  "Dr. Bayissa Bedada": "/images/manager%20images/dr%20Bayisa%20Bedada.png",
  "ዶ/ር ባይሳ በዳዳ": "/images/manager%20images/dr%20Bayisa%20Bedada.png",
  
  // 3. State Minister - ICT & Digital Economy
  "Mr. Muluken Qere": "/images/manager%20images/ato%20Muluken%20Kere.png",
  "አቶ ሙሉቀን ቀሬ": "/images/manager%20images/ato%20Muluken%20Kere.png",
  
  // 4. Advisory State Minister
  "Dr. Fozia Amin": "/images/manager%20images/Dr%20Foziya%20Amin.png",
  "ዶ/ር ፎዚያ አሚን": "/images/manager%20images/Dr%20Foziya%20Amin.png",
  
  // 5. Head of Minister's Office
  "Mr. Leul Seyoum": "/images/manager%20images/Ato%20liul%20siyum.png",
  "አቶ ልዑል ስዩም": "/images/manager%20images/Ato%20liul%20siyum.png",
  
  // 6. CEO of Operations
  "Mr. Solomon Aynimar": "/images/manager%20images/Ato%20Solomon%20Ayinimar.png",
  "አቶ ሰለሞን አይኒማር": "/images/manager%20images/Ato%20Solomon%20Ayinimar.png",
  
  // 7. ICT Infrastructure Lead Executive
  "Mr. Yonas Hailu": "/images/manager%20images/Ato%20Yonas%20Hayilu.png",
  "አቶ ዮናስ ኃይሉ": "/images/manager%20images/Ato%20Yonas%20Hayilu.png",
  
  // 8. Digital Economy Lead Executive
  "Mr. Seyoum Mengesha": "/images/manager%20images/Siyum%20Mengasha.png",
  "አቶ ስዩም መንገሻ": "/images/manager%20images/Siyum%20Mengasha.png",
  
  // 9. E-Government Lead Executive
  "Mrs. Mihraj Zekiyu": "/images/manager%20images/Wro%20Mihiraj%20Zakiyi.png",
  "ወ/ሮ ሚህራጅ ዘኪዩ": "/images/manager%20images/Wro%20Mihiraj%20Zakiyi.png",
  
  // 10. Innovation Development Lead Executive
  "Mr. Selamyihun Adefris": "/images/manager%20images/Ato%20Selamyihun%20Adefris.jpg",
  "አቶ ሰላምይሁን አደፍርስ": "/images/manager%20images/Ato%20Selamyihun%20Adefris.jpg",
  
  // 11. National Research Lead Executive
  "Dr. Habtamu Abera": "/images/manager%20images/Ato%20%20habatmu%20Bera.png",
  "ዶ/ር ሃብታሙ አበራ": "/images/manager%20images/Ato%20%20habatmu%20Bera.png",
  
  // 12. Technology Development Lead Executive
  "Dr. Teklemariam Tesema": "/images/manager%20images/dr%20teklemariam%20%20tesema.png",
  "ዶ/ር ተክለማርያም ተሰማ": "/images/manager%20images/dr%20teklemariam%20%20tesema.png",
  
  // 13. Strategic Affairs Executive
  "Mr. Azmach Desalegn": "/images/manager%20images/Azmach%20Tekalign.png",
  "አቶ አዝማች ደሳለኝ": "/images/manager%20images/Azmach%20Tekalign.png",
  
  // 14. ICT Executive
  "Mr. Dinber Getahun": "/images/manager%20images/dinber%20getahun.png",
  "አቶ ድንበር ጌታሁን": "/images/manager%20images/dinber%20getahun.png",
  
  // 15. Basic Services Executive
  "Mr. Yidnekachew Teshome": "/images/manager%20images/yidnikachew%20%20teshome.png",
  "አቶ ይደነቃቸው ተሾመ": "/images/manager%20images/yidnikachew%20%20teshome.png",
  
  // 16. Human Resource Executive
  "Mr. Adagne Assefa": "/images/manager%20images/Adagn%20asefa.png",
  "አቶ አዳኘ አሰፋ": "/images/manager%20images/Adagn%20asefa.png",
  
  // 17. Finance & Procurement Executive
  "Mrs. Etalemahu Gezahagn": "/images/manager%20images/etalamew%20gezakagn.jpg",
  "ወ/ሮ እታለማሁ ገዛኸኝ": "/images/manager%20images/etalamew%20gezakagn.jpg",
  
  // 18. Ethics Monitoring Executive
  "Mr. Mekonnen Moges": "/images/manager%20images/mokonin%20moges.png",
  "አቶ መኮንን ሞገስ": "/images/manager%20images/mokonin%20moges.png",
  
  // 19. Institutional Change Executive
  "Mr. Sibar Andualem": "/images/manager%20images/sibar%20andualem.png",
  "አቶ ስበር አንዱአለም": "/images/manager%20images/sibar%20andualem.png",
  
  // 20. Audit Executive
  "Mr. Ashagrie Alemu": "/images/manager%20images/Ashagre%20alemu.png",
  "አቶ አሻግሬ አለሙ": "/images/manager%20images/Ashagre%20alemu.png",
  
  // 21. Innovation Fund Head
  "Mrs. Adanech Tujo": "/images/manager%20images/Adanech%20tujo.png",
  "ወ/ሮ አዳነች ቱጆ": "/images/manager%20images/Adanech%20tujo.png",
  
  // 22. Women & Youth Executive
  "Mrs. Elsabet Gebreselasie": "/images/manager%20images/elsabet%20gebrasilase.png",
  "ወ/ሮ ኤልሳቤጥ ገብረስላሴ": "/images/manager%20images/elsabet%20gebrasilase.png",
  
  // 23. Public Relations Executive
  "Mr. Tesfaye Alemnew": "/images/manager%20images/tesfaye%20alemnew.png",
  "አቶ ተስፋዬ አለምነው": "/images/manager%20images/tesfaye%20alemnew.png",
  
  // 24. Policy & Strategy Research Lead
  "Dr. Bekuratsion Alemayehu": "/images/manager%20images/dr%20Bekuratsion%20.jpg",
  "ዶ/ር በኩረጽዮን አለማየሁ": "/images/manager%20images/dr%20Bekuratsion%20.jpg",
  
  // 25. Senior Advisor to Minister (Not shown in structure yet - may need to add)
  "Dr. Solomon Belay": PLACEHOLDER_PHOTO,
  "ዶ/ር ሰለሞን በላይ": PLACEHOLDER_PHOTO,
  
  // 26. Legal Service Executive
  "Mr. Ayalneh Lema": "/images/manager%20images/ayalneh%20lemma.png",
  "አቶ ኢያልነህ ለማ": "/images/manager%20images/ayalneh%20lemma.png",
}


// Helper function to get manager photo or placeholder
function getManagerPhoto(name: string): string {
  return MANAGER_PHOTOS[name] || PLACEHOLDER_PHOTO
}

// Building assignment helper
type BuildingAssignment = "Building A" | "Building B" | "Not Specified"

function dept(
  id: string,
  name: string,
  amharic: string,
  building: BuildingAssignment,
  floor: string,
  room: string,
  officeNumber: string,
  managerName: string,
  managerNameAmharic: string,
  position: string,
  positionAmharic: string,
  ext: string,
  description: string,
  descriptionAmharic: string,
  status: DepartmentDetail["status"] = "Open",
): Department {
  const buildingAm = building === "Building A" ? "ህንጻ ሀ" : building === "Building B" ? "ህንጻ ለ" : building
  return {
    id,
    name,
    amharic,
    detail: {
      managerName,
      managerNameAmharic,
      position,
      positionAmharic,
      photo: getManagerPhoto(managerName),
      description,
      descriptionAmharic,
      building,
      floor,
      room,
      officeNumber,
      telephone: "+251 11 552 " + ext.padStart(4, "0"),
      extension: ext,
      email: id.replace(/-/g, ".") + "@mint.gov.et",
      location: `${building}, Floor ${floor}, Room ${room}`,
      locationAmharic: `${buildingAm}፣ ፎቅ ${floor}፣ ክፍል ${room}`,
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
    workAmharic: "የሥራ አስፈጻሚ አመራር ይሰጣል፣ ስትራቴጂካዊ አቅጣጫ ያስቀምጣል እና የሚኒስቴሩን አጠቃላይ ቅንጅት ይቆጣጠራል።",
    manager: {
      name: "H.E. Dr. Belete Molla",
      nameAmharic: "ክቡር ዶ/ር በለጠ ሞላ ጌታሁን",
      position: "Minister",
      positionAmharic: "ሚኒስቴር",
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
      dept("head-ministers-office", "Head of Minister's Office", "የሚኒስትር ጽ/ቤት ኃላፊ", "Building A", "7", "702", "A-702",
        "Mr. Leul Seyoum", "አቶ ልዑል ስዩም", "Head of Minister's Office", "የሚኒስትር ጽ/ቤት ኃላፊ", "1002",
        "Manages the Minister's office operations, coordinates executive schedules and oversees ministerial communications.",
        "የሚኒስትሩን ጽሕፈት ቤት ስራዎች ያስተዳድራል፣ የሥራ አስፈጻሚ መርሃ ግብሮችን ያቀናጃል እና የሚኒስቴሩ ኮሙዩኒኬሽን ይቆጣጠራል።"),
    ],
  },
  {
    id: "advisory-state-minister",
    name: "Advisory State Minister Sector",
    amharic: "አማካሪ ሚኒስቴር ዴኤታ ",
    icon: "scroll",
    work: "Provides advisory support on policy, communications, legal, audit, ethics, institutional change and social inclusion across the Ministry.",
    workAmharic: "በሚኒስቴሩ ውስጥ በፖሊሲ፣ ኮሙዩኒኬሽን፣ ሕግ፣ ኦዲት፣ ሥነ-ምግባር፣ ተቋማዊ ለውጥ እና ማህበራዊ አካታችነት ላይ አማካሪ ድጋፍ ይሰጣል።",
    manager: {
      name: "H.E. Dr. Fozia Amin",
      nameAmharic: "ክብርት ዶ/ር ፎዚያ አሚን",
      position: "Advisory State Minister",
      positionAmharic: "አማካሪ ሚኒስቴር ዴኤታ",
      photo: getManagerPhoto("Dr. Fozia Amin"),
      telephone: "+251 11 552 8001",
      email: "advisory@mint.gov.et",
    },
    building: "Building A",
    floor: "8",
    room: "801",
    officeNumber: "A-801",
    status: "Open",
    departments: [
      dept("ethics-monitoring", "Ethics Monitoring Office", "የስነ-ምግባር ክትትል ቢሮ", "Building A", "8", "802", "A-802",
        "Mr. Mekonnen Moges", "አቶ መኮንን ሞገስ", "Ethics Monitoring Executive", "የስነ-ምግባር ክትትል ስራ አስፈጻሚ", "8002",
        "Promotes ethical conduct, investigates misconduct, implements anti-corruption policies and ensures integrity across all Ministry units.",
        "የሥነ-ምግባር ተግባርን ያበረታታል፣ ሕገ-ወጥ ድርጊቶችን ይመረምራል፣ የፀረ-ሙስና ፖሊሲዎችን ያስፈጽማል እና በሁሉም የሚኒስቴሩ ክፍሎች ታማኝነትን ያረጋግጣል።"),
      dept("institutional-change", "Institutional Change Office", "የተቋማዊ ለውጥ ቢሮ", "Building A", "8", "803", "A-803",
        "Mr. Sibar Andualem", "አቶ ስበር አንዱአለም", "Institutional Change Executive", "የተቋማዊ ለውጥ ስራ አስፈጻሚ", "8003",
        "Manages organisational restructuring, institutional capacity building and transition planning to support the Ministry's evolving mandate.",
        "የሚኒስቴሩን ተለዋዋጭ ተልዕኮ ለመደገፍ ድርጅታዊ መዋቅር ለውጥ፣ የተቋም አቅም ግንባታ እና የሽግግር እቅድ ያስተዳድራል።"),
      dept("policy-strategic-research", "Policy & Strategy Research Office", "የፖሊሲና ስትራቴጂ ምርምር ቢሮ", "Building A", "8", "804", "A-804",
        "Dr. Bekuratsion Alemayehu", "ዶ/ር በኩረጽዮን አለማየሁ", "Policy and Strategy Research Lead Executive", "የፖሊሲና ስትራቴጂ ምርምር መሪ ስራ አስፈጻሚ", "8004",
        "Leads policy and strategy studies and research to guide the Ministry's decision making.",
        "የሚኒስቴሩን ውሳኔ አሰጣጥ ለመምራት የፖሊሲና ስትራቴጂ ጥናቶችን እና ምርምሮችን ይመራል።"),
      dept("public-relations", "Public Relations & Communication Office", "የሕዝብ ግንኙነትና ኮሙኒኬሽን ቢሮ", "Building A", "8", "805", "A-805",
        "Mr. Tesfaye Alemnew", "አቶ ተስፋዬ አለምነው", "Public Relations and Communication Service Executive", "የሕዝብ ግንኙነትና ኮሙኒኬሽን አገልግሎት ስራ አስፈጻሚ", "8005",
        "Manages media relations, public messaging, social media presence and stakeholder communications for the Ministry.",
        "ለሚኒስቴሩ የሚዲያ ግንኙነቶችን፣ የሕዝብ መልዕክቶችን፣ የማህበራዊ ሚዲያ ተሳትፎን እና የባለድርሻ ኮሙዩኒኬሽን ያስተዳድራል።"),
      dept("audit-service", "Audit Office", "የኦዲት ቢሮ", "Building A", "8", "806", "A-806",
        "Mr. Ashagrie Alemu", "አቶ አሻግሬ አለሙ", "Audit Executive", "የኦዲት ስራ አስፈጻሚ", "8006",
        "Conducts internal audits of financial accounts, procurement processes and operational activities to ensure accountability and transparency.",
        "ተጠያቂነትና ግልጽነትን ለማረጋገጥ የፋይናንስ ሒሳቦችን፣ የግዢ ሂደቶችን እና የስራ አፈጻጸም ተግባራትን ውስጣዊ ኦዲት ያካሂዳል።"),
      dept("women-youth-social", "Women and Youth Social Inclusion Office", "የሴቶችና ወጣቶች ማህበራዊ አካታችነት ቢሮ", "Building A", "8", "807", "A-807",
        "Mrs. Elsabet Gebreselasie", "ወ/ሮ ኤልሳቤጥ ገብረስላሴ", "Women and Youth Social Inclusion Implementation Executive", "የሴቶችና ወጣቶች ማህበራዊ አካታችነት ስራ አስፈጻሚ", "8007",
        "Advances gender equity, youth empowerment and ensures inclusive participation across Ministry initiatives.",
        "የፆታ እኩልነትን ያሳድጋል፣ ወጣቶችን ያብቃቃል እና በሚኒስቴሩ ተነሳሽነቶች ሁሉ ሁሉን አቀፍ ተሳትፎ ያረጋግጣል።"),
      dept("innovation-fund", "Innovation Fund Office", "የኢኖቬሽን ፈንድ ጽሕፈት ቤት", "Building A", "8", "808", "A-808",
        "Mrs. Adanech Tujo", "ወ/ሮ አዳነች ቱጆ", "Head of Innovation Fund Office", "የኢኖቬሽን ፈንድ ጽ/ቤት ኃላፊ", "8008",
        "Administers the national innovation fund and finances high-impact technology and startup initiatives.",
        "ብሔራዊ የኢኖቬሽን ፈንድ ያስተዳድራል እና ከፍተኛ ተፅዕኖ ያላቸው የቴክኖሎጂ እና ስታርታፕ ተነሳሽነቶችን ይሸልማል።"),
      dept("legal-service", "Legal Service Office", "የህግ አገልግሎት ቢሮ", "Building A", "8", "809", "A-809",
        "Mr. Ayalneh Lema", "አቶ ኢያልነህ ለማ", "Legal Service Executive", "የህግ አገልግሎት ስራ አስፈጻሚ", "8009",
        "Provides legal counsel, drafts ministry regulations, ensures statutory compliance and handles litigation matters on behalf of the Ministry.",
        "የሕግ ምክር ይሰጣል፣ የሚኒስቴሩ ደንቦችን ያዘጋጃል፣ የሕግ ተከታዮችን ያረጋግጣል እና በሚኒስቴሩ ስም የሕግ ጉዳዮችን ያስተናግዳል።"),
    ],
  },
  {
    id: "partnership-alliance",
    name: "Innovation & Technology Partnership and Alliance Affairs Office",
    amharic: "የኢኖቬሽንና ቴክኖሎጂ የትብብርና ትስስር ጉዳዮች",
    icon: "handshake",
    work: "Builds strategic partnerships and alliances with local and international technology and innovation stakeholders.",
    workAmharic: "ከአካባቢያዊ እና ዓለም አቀፍ የቴክኖሎጂ እና ኢኖቬሽን ባለድርሻዎች ጋር ስትራቴጂካዊ አጋርነቶችን እና ትስስሮችን ይገነባል።",
    manager: {
      name: "Mr. Leul Seyoum",
      nameAmharic: "አቶ ልዑል ስዩም",
      position: "Lead Executive for Innovation & Technology Partnership & Linkage",
      positionAmharic: "የኢኖቬሽንና ቴክኖሎጂ የትብብርና ትስስር ጉዳዮች መሪ ስራ አስፈጻሚ",
      photo: getManagerPhoto("Mr. Leul Seyoum"),
      telephone: "+251 11 552 2001",
      email: "partnership@mint.gov.et",
    },
    building: "Building A",
    floor: "7",
    room: "704",
    officeNumber: "A-704",
    status: "Open",
    departments: [
      dept("pa-ethics-monitoring", "Ethics Monitoring Office", "የስነ-ምግባር ክትትል ቢሮ", "Building A", "7", "705", "A-705",
        "Mr. Mekonnen Moges", "አቶ መኮንን ሞገስ", "Ethics Monitoring Executive", "የስነ-ምግባር ክትትል ስራ አስፈጻሚ", "2002",
        "Promotes ethical conduct, investigates misconduct, implements anti-corruption policies and ensures integrity across all Ministry units.",
        "የሥነ-ምግባር ተግባርን ያበረታታል፣ ሕገ-ወጥ ድርጊቶችን ይመረምራል፣ የፀረ-ሙስና ፖሊሲዎችን ያስፈጽማል እና በሁሉም የሚኒስቴሩ ክፍሎች ታማኝነትን ያረጋግጣል።"),
      dept("pa-institutional-change", "Institutional Change Office", "የተቋማዊ ለውጥ ቢሮ", "Building A", "7", "706", "A-706",
        "Mr. Sibar Andualem", "አቶ ስበር አንዱአለም", "Institutional Change Executive", "የተቋማዊ ለውጥ ስራ አስፈጻሚ", "2003",
        "Manages organisational restructuring, institutional capacity building and transition planning to support the Ministry's evolving mandate.",
        "የሚኒስቴሩን ተለዋዋጭ ተልዕኮ ለመደገፍ ድርጅታዊ መዋቅር ለውጥ፣ የተቋም አቅም ግንባታ እና የሽግግር እቅድ ያስተዳድራል።"),
      dept("pa-policy-strategic-research", "Policy & Strategy Research Office", "የፖሊሲና ስትራቴጂ ምርምር ቢሮ", "Building A", "7", "707", "A-707",
        "Dr. Bekuratsion Alemayehu", "ዶ/ር በኩረጽዮን አለማየሁ", "Policy and Strategy Research Lead Executive", "የፖሊሲና ስትራቴጂ ምርምር መሪ ስራ አስፈጻሚ", "2004",
        "Leads policy and strategy studies and research to guide the Ministry's decision making.",
        "የሚኒስቴሩን ውሳኔ አሰጣጥ ለመምራት የፖሊሲና ስትራቴጂ ጥናቶችን እና ምርምሮችን ይመራል።"),
      dept("pa-public-relations", "Public Relations & Communication Office", "የሕዝብ ግንኙነትና ኮሙኒኬሽን ቢሮ", "Building A", "7", "708", "A-708",
        "Mr. Tesfaye Alemnew", "አቶ ተስፋዬ አለምነው", "Public Relations and Communication Service Executive", "የሕዝብ ግንኙነትና ኮሙኒኬሽን አገልግሎት ስራ አስፈጻሚ", "2005",
        "Manages media relations, public messaging, social media presence and stakeholder communications for the Ministry.",
        "ለሚኒስቴሩ የሚዲያ ግንኙነቶችን፣ የሕዝብ መልዕክቶችን፣ የማህበራዊ ሚዲያ ተሳትፎን እና የባለድርሻ ኮሙዩኒኬሽን ያስተዳድራል።"),
      dept("pa-audit-service", "Audit Office", "የኦዲት ቢሮ", "Building A", "7", "709", "A-709",
        "Mr. Ashagrie Alemu", "አቶ አሻግሬ አለሙ", "Audit Executive", "የኦዲት ስራ አስፈጻሚ", "2006",
        "Conducts internal audits of financial accounts, procurement processes and operational activities to ensure accountability and transparency.",
        "ተጠያቂነትና ግልጽነትን ለማረጋገጥ የፋይናንስ ሒሳቦችን፣ የግዢ ሂደቶችን እና የስራ አፈጻጸም ተግባራትን ውስጣዊ ኦዲት ያካሂዳል።"),
      dept("pa-women-youth-social", "Women and Youth Social Inclusion Office", "የሴቶችና ወጣቶች ማህበራዊ አካታችነት ቢሮ", "Building A", "7", "710", "A-710",
        "Mrs. Elsabet Gebreselasie", "ወ/ሮ ኤልሳቤጥ ገብረስላሴ", "Women and Youth Social Inclusion Implementation Executive", "የሴቶችና ወጣቶች ማህበራዊ አካታችነት ስራ አስፈጻሚ", "2007",
        "Advances gender equity, youth empowerment and ensures inclusive participation across Ministry initiatives.",
        "የፆታ እኩልነትን ያሳድጋል፣ ወጣቶችን ያብቃቃል እና በሚኒስቴሩ ተነሳሽነቶች ሁሉ ሁሉን አቀፍ ተሳትፎ ያረጋግጣል።"),
      dept("pa-innovation-fund", "Innovation Fund Office", "የኢኖቬሽን ፈንድ ጽሕፈት ቤት", "Building A", "7", "711", "A-711",
        "Mrs. Adanech Tujo", "ወ/ሮ አዳነች ቱጆ", "Head of Innovation Fund Office", "የኢኖቬሽን ፈንድ ጽ/ቤት ኃላፊ", "2008",
        "Administers the national innovation fund and finances high-impact technology and startup initiatives.",
        "ብሔራዊ የኢኖቬሽን ፈንድ ያስተዳድራል እና ከፍተኛ ተፅዕኖ ያላቸው የቴክኖሎጂ እና ስታርታፕ ተነሳሽነቶችን ይሸልማል።"),
      dept("pa-legal-service", "Legal Service Office", "የህግ አገልግሎት ቢሮ", "Building A", "7", "712", "A-712",
        "Mr. Ayalneh Lema", "አቶ ኢያልነህ ለማ", "Legal Service Executive", "የህግ አገልግሎት ስራ አስፈጻሚ", "2009",
        "Provides legal counsel, drafts ministry regulations, ensures statutory compliance and handles litigation matters on behalf of the Ministry.",
        "የሕግ ምክር ይሰጣል፣ የሚኒስቴሩ ደንቦችን ያዘጋጃል፣ የሕግ ተከታዮችን ያረጋግጣል እና በሚኒስቴሩ ስም የሕግ ጉዳዮችን ያስተናግዳል።"),
    ],
  },
  {
    id: "innovation-research",
    name: "State Minister for Research and Innovation ",
    amharic: "የምርምርና ኢኖቬሽን ልማት ሚኒስትር ዴኤታ",
    icon: "flask",
    work: "Leads national research programs and drives technology transformation and innovation management.",
    workAmharic: "ብሔራዊ የምርምር ፕሮግራሞችን ይመራል እና የቴክኖሎጂ ሽግግር እና ኢኖቬሽን አስተዳደርን ያሳድጋል።",
    manager: {
      name: "H.E. Dr. Bayissa Bedada",
      nameAmharic: "ክቡር ዶ/ር ባይሳ በዳዳ",
      position: "State Minister for Research & Innovation Development",
      positionAmharic: "የምርምርና ኢኖቬሽን ልማት ሚኒስቴር ዴኤታ",
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
      dept("innovation-development", "Innovation Development Office", "የኢኖቬሽን ልማት ቢሮ", "Building A", "6", "602", "A-602",
        "Mr. Selamyihun Adefris", "አቶ ሰላምይሁን አደፍርስ", "CEO of Innovation Development", "የኢኖቬሽን ልማት ዋና ስራ አስፈጻሚ", "3002",
        "Oversees innovation pipeline management, intellectual property frameworks and the commercialisation of government-funded research outputs.",
        "የኢኖቬሽን ፓይፕላይን አስተዳደርን፣ የአዕምሮ ሀብት ማዕቀፎችን እና የመንግሥት ፈንድ ምርምር ውጤቶችን ወደ ንግድ ለውጦ ማቅረብን ይቆጣጠራል።"),
      dept("national-research", "National Research & Development Office", "የብሔራዊ ምርምርና ልማት ቢሮ", "Building A", "5", "501", "A-501",
        "Dr. Habtamu Abera", "ዶ/ር ሃብታሙ አበራ", "CEO of National Research & Development", "የብሔራዊ ምርምር እና ልማት ዋና ስራ አስፈጻሚ", "3003",
        "Designs and oversees national research agendas, funds applied science projects and coordinates with universities and research institutes.",
        "ብሔራዊ የምርምር አጀንዳዎችን ያዘጋጃል እና ይቆጣጠራል፣ ተግባራዊ ሳይንስ ፕሮጄክቶችን ይሸልማል እና ከዩኒቨርሲቲዎች እና የምርምር ተቋማት ጋር ያስተባብራል።"),
      dept("technology-development", "Technology Development & Transfer Office", "የቴክኖሎጂ ልማትና ሽግግር ቢሮ", "Building A", "5", "502", "A-502",
        "Dr. Teklemariam Tesema", "ዶ/ር ተክለማርያም ተሰማ", "CEO of Technology Development & Transfer", "የቴክኖሎጂ ልማት እና ሽግግር ዋና ስራ አስፈጻሚ", "3004",
        "Drives adoption of emerging technologies, manages technology transfer programs and transformation roadmaps.",
        "የሚወጡ ቴክኖሎጂዎችን መቀበልን ያሳድጋል፣ የቴክኖሎጂ ሽግግር ፕሮግራሞችን እና የሽግግር ካርታዎችን ያስተዳድራል።"),
    ],
  },
  {
    id: "administration",
    name: "Chief Administration",
    amharic: " የስራ አመራር ዋና ስራ አስፈጻሚ ",
    icon: "building",
    work: "Manages the Ministry's finance, procurement, human resources, facilities and internal ICT services.",
    workAmharic: "የሚኒስቴሩን ፋይናንስ፣ ግዢ፣ ሰው ሀብት፣ ተቋማት እና ውስጣዊ አይሲቲ አገልግሎቶች ያስተዳድራል።",
    manager: {
      name: "Mr. Solomon Aynimar",
      nameAmharic: "አቶ ሰለሞን አይኒማር",
      position: "Chief Administration",
      positionAmharic: "የስራ አመራር ዋና ስራ አስፈጻሚ",
      photo: getManagerPhoto("Mr. Solomon Aynimar"),
      telephone: "+251 11 552 5001",
      email: "admin@mint.gov.et",
    },
    building: "Building A",
    floor: "3",
    room: "301",
    officeNumber: "A-301",
    status: "Open",
    departments: [
      dept("finance-procurement", "Procurement & Finance Office", "የግዢና ፋይናንስ ቢሮ", "Building A", "3", "306", "A-306",
        "Mrs. Etalemahu Gezahagn", "ወ/ሮ እታለማሁ ገዛኸኝ", "Procurement & Finance Executive", "የግዢና ፋይናንስ ስራ አስፈጻሚ", "5006",
        "Manages budget preparation, financial reporting, procurement tendering and contract administration in accordance with government regulations.",
        "በመንግሥት ደንቦች መሠረት የበጀት ዝግጅትን፣ የፋይናንሺያል ሪፖርትን፣ የግዢ ጨረታን እና የውል አስተዳደርን ያስተዳድራል።"),
      dept("ict-office", "Information Communication Technology Office", "የኢንፎርሜሽን ኮሙኒኬሽን ቴክኖሎጂ ቢሮ", "Building A", "3", "303", "A-303",
        "Mr. Dinber Getahun", "አቶ ድንበር ጌታሁን", "Information Communication Technology Executive", "የኢንፎርሜሽን ኮሙኒኬሽን ቴክኖሎጂ ስራ አስፈጻሚ", "5003",
        "Maintains internal ICT systems, provides helpdesk support, manages network security and implements digital workplace tools.",
        "ውስጣዊ አይሲቲ ስርዓቶችን ይጠብቃል፣ የሄልፕዴስክ ድጋፍ ይሰጣል፣ የኔትወርክ ደህንነትን ያስተዳድራል እና ዲጂታል የስራ ቦታ መሳሪያዎችን ያስፈጽማል።"),
      dept("strategic-affairs", "Strategic Affairs Office", "የስትራቴጂክ ጉዳዮች ቢሮ", "Building A", "3", "302", "A-302",
        "Mr. Azmach Desalegn", "አቶ አዝማች ደሳለኝ", "Executive of Strategic Affairs", "የስትራቴጂክ ጉዳዮች ስራ አስፈጻሚ", "5002",
        "Coordinates the Ministry's strategic planning cycles, monitors implementation of the corporate plan and prepares performance reports.",
        "የሚኒስቴሩን ስትራቴጂካዊ የዕቅድ ዑደቶች ያስተባብራል፣ የድርጅቱ ዕቅድ አፈጻጸምን ይከታተላል እና የአፈጻጸም ሪፖርቶችን ያዘጋጃል።"),
      dept("basic-services", "Basic Infrastructure & General Services Office", "የመሠረተ ልማትና አጠቃላይ አገልግሎት ቢሮ", "Building A", "3", "304", "A-304",
        "Mr. Yidnekachew Teshome", "አቶ ይደነቃቸው ተሾመ", "Basic Infrastructure & General Services Executive", "የመሰረታዊ አገልግሎት ስራ አስፈጻሚ", "5004",
        "Manages essential infrastructure, facilities and general support services across the Ministry.",
        "አስፈላጊ መሠረተ ልማቶችን፣ ተቋማትን እና አጠቃላይ የድጋፍ አገልግሎቶችን በሚኒስቴሩ ውስጥ ያስተዳድራል።"),
      dept("human-resource", "Competency & Human Resource Management Office", "የብቃትና ሰው ሀብት አስተዳደር ቢሮ", "Building A", "3", "305", "A-305",
        "Mr. Adagne Assefa", "አቶ አዳኘ አሰፋ", "Competency & Human Resource Management Executive", "የብቃትና ሰው ሀብት አስተዳደር ስራ አስፈጻሚ", "5005",
        "Oversees staff recruitment, competency development, performance management, payroll administration and employee welfare programmes.",
        "የሠራተኛ ቅጥርን፣ የብቃት ልማትን፣ የአፈጻጸም አስተዳደርን፣ የደመወዝ አስተዳደርን እና የሠራተኛ ድህነት ፕሮግራሞችን ይቆጣጠራል።"),
    ],
  },
  {
    id: "innovation-fund",
    name: "Innovation Fund Office",
    amharic: "የኢኖቬሽን ፈንድ ጽሕፈት ቤት",
    icon: "coins",
    work: "Administers the national innovation fund and finances high-impact technology and startup initiatives.",
    workAmharic: "ብሔራዊ የኢኖቬሽን ፈንድ ያስተዳድራል እና ከፍተኛ ተፅዕኖ ያላቸው የቴክኖሎጂ እና ስታርታፕ ተነሳሽነቶችን ይሸልማል።",
    manager: {
      name: "Mrs. Adanech Tujo",
      nameAmharic: "ወ/ሮ አዳነች ቱጆ",
      position: "Head of Innovation Fund Office",
      positionAmharic: "የኢኖቬሽን ፈንድ ጽ/ቤት ኃላፊ",
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
    amharic: "የአይሲቲና ዲጂታል ኢኮኖሚ ",
    icon: "network",
    work: "Develops national digital infrastructure, e-government services and the country's digital economy.",
    workAmharic: "ብሔራዊ ዲጂታል መሠረተ ልማት፣ የኤሌክትሮኒክ መንግሥት አገልግሎቶች እና የሃገሪቱን ዲጂታል ኢኮኖሚ ያሳድጋል።",
    manager: {
      name: "H.E. Mr. Muluken Qere",
      nameAmharic: "ክቡር አቶ ሙሉቀን ቀሬ",
      position: "State Minister for ICT & Digital Economy",
      positionAmharic: "የአይሲቲና ዲጂታል ኢኮኖሚ ሚኒስቴር ዴኤታ",
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
      dept("ict-infrastructure", "ICT Infrastructure & Administration Office", "የአይሲቲ መሰረተ ልማትና አስተዳደር ቢሮ", "Building B", "1", "101", "B-101",
        "Mr. Yonas Hailu", "አቶ ዮናስ ኃይሉ", "Lead Executive for ICT Infrastructure & Administration", "የአይሲቲ መሰረተ ልማትና አስተዳደር መሪ ስራ አስፈጻሚ", "4002",
        "Plans and maintains national ICT infrastructure including data centres, broadband networks and government communication backbones.",
        "የዳታ ማዕከሎችን፣ ብሮድባንድ ኔትወርኮችን እና የመንግሥት ኮሙዩኒኬሽን አርከርዎችን ጨምሮ ብሔራዊ አይሲቲ መሠረተ ልማት ያቅዳል እና ይጠብቃል።"),
      dept("digital-economy", "Digital Economy Development Office", "የዲጂታል ኢኮኖሚ ልማት ቢሮ", "Building B", "2", "201", "B-201",
        "Mr. Seyoum Mengesha", "አቶ ስዩም መንገሻ", "Lead Executive for Digital Economy Development", "የዲጂታል ኢኮኖሚ ልማት መሪ ስራ አስፈጻሚ", "4003",
        "Develops policy frameworks and programmes to grow Ethiopia's digital economy, including fintech, e-commerce and digital entrepreneurship.",
        "ፊንቴክ፣ ኢ-ኮሜርስ እና ዲጂታል ሥራ ፈጠራን ጨምሮ የኢትዮጵያን ዲጂታል ኢኮኖሚ ለማሳደግ የፖሊሲ ማዕቀፎችን እና ፕሮግራሞችን ያዘጋጃል።"),
      dept("e-government", "E-Government Development & Administration Office", "የኤሌክትሮኒክ መንግሥት ልማትና አስተዳደር ቢሮ", "Building B", "2", "202", "B-202",
        "Mrs. Mihraj Zekiyu", "ወ/ሮ ሚህራጅ ዘኪዩ", "Lead Executive for E-Government Development & Administration", "የኤሌክትሮኒክስ መንግስት ልማትና አስተዳደር መሪ ስራ አስፈጻሚ", "4004",
        "Designs and delivers digital government services, manages the national e-services portal and oversees citizen-facing digital platforms.",
        "ዲጂታል የመንግሥት አገልግሎቶችን ያዘጋጃል እና ያቀርባል፣ ብሔራዊ የኢ-አገልግሎቶች ፖርታልን ያስተዳድራል እና ዜጎችን ፊት ለፊት የሚያስተናግዱ ዲጂታል መድረኮችን ይቆጣጠራል።"),
    ],
  },
  {
    id: "records-archives-sector",
    name: "Records & Archives Management Services",
    amharic: "የሪከርድና ማህደር ስራ አመራር አገልግሎት",
    icon: "network",
    work: "Manages official records, archives and information management systems for the Ministry.",
    workAmharic: "ለሚኒስቴሩ ይፋዊ መዝገቦችን፣ ማህደሮችን እና የመረጃ አስተዳደር ስርዓቶችን ያስተዳድራል።",
    manager: {
      name: "Mrs. Yenenesh Alemayehu",
      nameAmharic: "ወ/ሮ የነነሽ አለማየሁ",
      position: "Head of Records & Archives Management Services",
      positionAmharic: "የሪከርድና ማህደር ስራ አመራር አገልግሎት ኃላፊ",
      photo: "/images/manager%20images/yenenesh%20alemayehu.jpg",
      telephone: "+251 11 552 4005",
      email: "records@mint.gov.et",
    },
    building: "Building B",
    floor: "1",
    room: "102",
    officeNumber: "B-102",
    status: "Open",
    departments: [],
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
  
  // Handle special case for office-detail (when office has no departments)
  if (departmentId === "office-detail") {
    // Create a virtual department from office data
    const virtualDepartment: Department = {
      id: "office-detail",
      name: office.name,
      amharic: office.amharic,
      detail: {
        managerName: office.manager.name,
        managerNameAmharic: office.manager.nameAmharic,
        position: office.manager.position,
        positionAmharic: office.manager.positionAmharic,
        photo: office.manager.photo,
        description: office.work,
        descriptionAmharic: office.workAmharic,
        building: office.building,
        floor: office.floor,
        room: office.room,
        officeNumber: office.officeNumber,
        telephone: office.manager.telephone,
        extension: "",
        email: office.manager.email,
        location: `${office.building}, Floor ${office.floor}, Room ${office.room}`,
        locationAmharic: `${office.building}፣ ፎቅ ${office.floor}፣ ክፍል ${office.room}`,
        status: office.status,
      }
    }
    return { building, office, department: virtualDepartment }
  }
  
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
