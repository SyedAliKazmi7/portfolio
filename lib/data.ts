export type Project = {
  slug: string;
  title: string;
  tagline: string;
  type: string;
  year: string;
  role: string;
  summary: string;
  problem: string;
  solution: string[];
  decisions: { title: string; text: string }[];
  challenges: { title: string; text: string }[];
  stack: string[];
  live: string;
  github: string;
  cover: string;
  gallery: string[];
};

// ---------- EDIT THIS: your details ----------
export const profile = {
  name: "Ali Kazmi",
  initials: "AK",
  role: "Full-stack Developer",
  location: "Islamabad / Pakistan",
  email: "alikazmishah77@gmail.com",
  whatsapp: "923194552004", 
  github: "https://github.com/SyedAliKazmi7",
  linkedin: "www.linkedin.com/in/ali-kazmi-237827323", 
  resume: "", // after you add public/resume.pdf, write "/resume.pdf"
  available: true,
  intro:
    "I design and build complete web products, from the database and its security rules to the interface people actually touch. Fast on phones, easy for owners to manage.",
  about: [
    "I am a full-stack developer who likes solving real business problems. I build the whole product: the design, the database, the security rules and the admin tools that let an owner run the business without calling a developer.",
    "My recent work includes Karigar, a live home services marketplace with real-time offers, and a website with online ordering for a cafeteria. I care about the details: speed on mobile phones, clear design, and security that is built in from day one.",
  ],
};

export const rotatingWords = ["online stores", "management systems", "marketplaces", "business dashboards"];

export const facts = [
  { label: "Based in", value: "Pakistan" },
  { label: "Focus", value: "Next.js and Supabase" },
  { label: "Open to", value: "Freelance and full-time roles" },
];

export const principles = [
  {
    title: "Secure by default",
    text: "Access rules live in the database, so a mistake in the interface can never expose someone's data.",
  },
  {
    title: "Fast and mobile first",
    text: "Most customers use a phone. I design for small screens and slow connections first.",
  },
  {
    title: "Built for the owner",
    text: "Clear admin panels, so a business owner can update prices, products and orders without a developer.",
  },
];

// Only list what you have really used
export const skills = [
  { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML and CSS", "JavaScript"] },
  {
    group: "Backend and data",
    items: ["Supabase", "PostgreSQL", "Row Level Security", "Authentication", "Realtime", "File storage", "SQL functions and triggers"],
  },
  { group: "Tools", items: ["Git and GitHub", "Vercel", "Leaflet and OpenStreetMap", "VS Code"] },
];

export const services = [
  {
    title: "Business websites",
    text: "A fast, modern website that makes your business look as good as it is.",
    points: ["Custom design with smooth animation", "Works perfectly on phones", "Basic SEO and fast loading"],
    icon: "M4 5h16v11H4zM8 20h8M12 16v4",
  },
  {
    title: "Online stores",
    text: "Sell your products online with a catalog, cart and order management.",
    points: ["Products, categories and search", "Orders, delivery and WhatsApp ordering", "Admin panel you can run yourself"],
    icon: "M3 4h2l2.4 10.2a1 1 0 001 .8h8.6a1 1 0 001-.8L20 8H6M10 20a1 1 0 100-2 1 1 0 000 2zM17 20a1 1 0 100-2 1 1 0 000 2z",
  },
  {
    title: "Management systems",
    text: "Replace paper registers with stock, sales, purchases and customer accounts.",
    points: ["Inventory with low-stock alerts", "Sales, purchases and ledgers", "Reports and staff permissions"],
    icon: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6",
  },
  {
    title: "Web apps and dashboards",
    text: "Custom tools with logins, live updates and clear dashboards.",
    points: ["Roles and secure access", "Real-time notifications", "Charts and reports"],
    icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
  },
];

export const process = [
  { title: "Discuss", text: "We talk about your business, customers and goals. You get a clear written scope and price." },
  { title: "Design", text: "You see the design before anything is built, and you choose the changes." },
  { title: "Build", text: "I build in small steps and share a private link, so you can follow the progress." },
  { title: "Launch and support", text: "I launch, train you and your staff, and fix issues in the first 30 days." },
];

// ---------- EDIT THIS: your projects ----------
export const projects: Project[] = [
  {
    slug: "karigar",
    title: "Karigar",
    tagline: "A home services marketplace with live offers, in the style of inDrive.",
    type: "Portfolio project",
    year: "2026",
    role: "Design, full-stack development, database security and deployment",
    summary:
      "Customers post a job and receive offers from verified plumbers, electricians, maids and more. Professionals send their own prices, an admin team dispatches work, and everyone gets live notifications.",
    problem:
      "Many skilled workers in Pakistan have limited literacy and smartphone use, so a normal marketplace app would never be used by the people who actually do the work.",
    solution: [
      "A modern web app for customers: post a request with a map pin and photos, compare offers, accept or decline.",
      "Professionals can use a simple dashboard to send offers, or stay on WhatsApp while an admin team dispatches work and records their prices.",
      "Live notifications for customers, professionals and staff when offers, jobs and statuses change.",
      "Ratings, reviews and complaints, plus an admin area for dispatch, professionals and complaints.",
    ],
    decisions: [
      {
        title: "Professionals can stay on WhatsApp",
        text: "A hybrid model: professionals with a login send offers themselves, and the admin can still record offers for those who work only by phone.",
      },
      {
        title: "Privacy before acceptance",
        text: "A professional sees only a job summary at first. Address, phone number, map pin and photos are released only after the customer accepts their offer, enforced in the database.",
      },
      {
        title: "Security lives in the database",
        text: "Row Level Security on every table, column-level permissions, private photo storage with signed links, and rate limits written as database triggers.",
      },
      {
        title: "Photos are compressed in the browser",
        text: "Up to three photos per request are resized before upload, which keeps storage small and uploads fast on slow connections.",
      },
    ],
    challenges: [
      {
        title: "A security review found a real flaw",
        text: "Default database permissions would have let a logged-in user change their own role. I removed all default access, granted only the columns the app needs, and added a trigger that blocks role changes.",
      },
      {
        title: "The map crashed when navigating between pages",
        text: "Leaflet could not be re-attached after Next.js kept an old page in memory. I made the map create a fresh instance each time it appears.",
      },
      {
        title: "Realtime for three kinds of users",
        text: "Customers, professionals and staff each see different live data. I used database triggers to create notifications and filtered live subscriptions per user.",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Realtime", "Leaflet", "Vercel"],
    live: "https://karigar-inky.vercel.app",
    github: "https://github.com/SyedAliKazmi7/karigar",
    cover: "/projects/karigar-1.png",
    gallery: [
      "/projects/karigar-2.png",
      "/projects/karigar-3.png",
      "/projects/karigar-4.png",
      "/projects/karigar-5.png",
      "/projects/karigar-6.png",
    ],
  },
  {
    slug: "the-refreshment-hub",
    title: "The Refreshment Hub",
    tagline: "A cafeteria website with online ordering, table reservations and an admin panel.",
    type: "Client project",
    year: "2026",
    role: "Design and development",
    summary:
      "A website for a cafeteria in Bahria Greens, Rawalpindi. The full menu is online, customers can order or book a table, and the owner manages everything from an admin panel.",
    problem:
      "The cafe had a printed menu and wanted a professional online presence where customers could see the menu, place orders and reserve tables.",
    solution: [
      "The whole printed menu, 10 categories and 60+ items, turned into a searchable online menu with photos.",
      "Cart and checkout with delivery or pickup, and a table reservation form.",
      "An admin panel to manage orders, reservations, prices and sold-out items.",
      "Branding taken from the cafe's logo: black and gold, with a hero slider.",
    ],
    decisions: [
      {
        title: "The owner controls prices and availability",
        text: "Prices and sold-out switches are editable in the admin panel, so the owner never needs a developer for daily changes.",
      },
      {
        title: "One photo per item, by file name",
        text: "Each menu item shows a photo if a file with its name exists, in jpg, png or webp. Missing photos simply do not show, so the owner can add them gradually.",
      },
      {
        title: "Customers can only place orders",
        text: "Database rules let visitors create orders and reservations, but only the logged-in owner can read or change them.",
      },
    ],
    challenges: [
      {
        title: "Turning a printed menu into clean data",
        text: "The source menu had repeated items and unclear prices. I checked each one with the owner before entering it.",
      },
    ],
    stack: ["HTML", "CSS", "JavaScript", "Supabase", "PostgreSQL"],
    live: "", // add the live link when it is online
    github: "",
    cover: "/projects/refreshment-1.png",
    gallery: ["/projects/refreshment-2.png", "/projects/refreshment-3.png"],
  },
];