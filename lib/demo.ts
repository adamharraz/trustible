export type Contractor = {
  id: string;
  name: string;
  studio: string;
  area: string;
  specialty: string;
  budget: string;
  rating: number;
  reviews: number;
  verified: boolean;
  summary: string;
  avatar: string;
  projects: number;
  response: string;
  tags: string[];
};

export type QuoteRequest = {
  id: string;
  contractorId: string;
  brief: string;
  budget: string;
  timeline: string;
  status: "sent" | "quoted" | "accepted";
  createdAt: string;
};

export type Quote = QuoteRequest & {
  amount: number;
  deposit: number;
  validity: string;
};

export type Milestone = {
  id: string;
  label: string;
  amount: number;
  status: "pending" | "funded" | "submitted" | "approved" | "disputed" | "refunded";
  evidence?: string;
};

export type Project = {
  id: string;
  contractorId: string;
  name: string;
  status: "planning" | "active" | "complete";
  total: number;
  milestones: Milestone[];
  reviewUnlocked: boolean;
};

export type DemoState = {
  version: 3;
  savedInspirationIds: string[];
  shortlisted: string[];
  requests: QuoteRequest[];
  quotes: Quote[];
  projects: Project[];
  lastAction: string;
};


export type InspirationItem = {
  id: string;
  contractorId: string;
  title: string;
  studio: string;
  tag: string;
  category: string;
  copy: string;
  image: string;
  alt: string;
  saveCount: number;
  credit: string;
  sourceUrl: string;
};
export const contractors: Contractor[] = [
  { id: "nook", name: "Nook & Grain", studio: "Nook & Grain Studio", area: "Petaling Jaya", specialty: "Warm minimal", budget: "RM80kâ€“RM180k", rating: 4.9, reviews: 38, verified: true, summary: "Calm, durable homes with clear scope and a careful handover.", avatar: "NG", projects: 42, response: "Replies in 2h", tags: ["Space planning", "Joinery", "Residential"] },
  { id: "form", name: "Form & Field", studio: "Form & Field", area: "Bangsar", specialty: "Modern tropical", budget: "RM120kâ€“RM260k", rating: 4.8, reviews: 27, verified: true, summary: "Indoor-outdoor living, realistic budgets, and weekly progress notes.", avatar: "FF", projects: 31, response: "Replies in 4h", tags: ["Renovation", "Lighting", "Tropical"] },
  { id: "atelier", name: "Atelier Kecil", studio: "Atelier Kecil", area: "Mont Kiara", specialty: "Compact living", budget: "RM45kâ€“RM110k", rating: 4.7, reviews: 22, verified: true, summary: "Small-space specialists who make every square metre work harder.", avatar: "AK", projects: 25, response: "Replies in 1d", tags: ["Condos", "Storage", "Budget-aware"] },
  { id: "line", name: "Line House", studio: "Line House Design", area: "Subang Jaya", specialty: "Family homes", budget: "RM90kâ€“RM220k", rating: 4.8, reviews: 19, verified: false, summary: "Family-first planning, transparent variations, and practical materials.", avatar: "LH", projects: 20, response: "Replies in 6h", tags: ["Families", "Kitchens", "Build"] },
  { id: "casa", name: "Casa Sore", studio: "Casa Sore", area: "Ampang", specialty: "Soft contemporary", budget: "RM70kâ€“RM160k", rating: 4.6, reviews: 16, verified: true, summary: "Soft palettes and thoughtful detailing for homes that feel lived in.", avatar: "CS", projects: 18, response: "Replies in 3h", tags: ["Styling", "Bathrooms", "Renovation"] },
  { id: "common", name: "Common Ground", studio: "Common Ground Interiors", area: "Kota Damansara", specialty: "Japandi", budget: "RM60kâ€“RM140k", rating: 4.7, reviews: 14, verified: false, summary: "Measured, honest design for first-time renovators.", avatar: "CG", projects: 15, response: "Replies in 8h", tags: ["Japandi", "First home", "Planning"] },
  { id: "studio9", name: "Studio 9", studio: "Studio 9 Build", area: "Cheras", specialty: "Value engineering", budget: "RM50kâ€“RM125k", rating: 4.5, reviews: 12, verified: true, summary: "A build-led team for homeowners who want fewer surprises.", avatar: "S9", projects: 13, response: "Replies in 5h", tags: ["Build", "Cost control", "Homes"] },
  { id: "moss", name: "Moss & Tile", studio: "Moss & Tile", area: "Kuala Lumpur", specialty: "Biophilic", budget: "RM100kâ€“RM300k", rating: 4.9, reviews: 11, verified: true, summary: "Biophilic homes with a documented process from brief to keys.", avatar: "MT", projects: 12, response: "Replies in 2h", tags: ["Biophilic", "Custom", "Premium"] }
];

export const inspiration: InspirationItem[] = [
  { id: "in-01", contractorId: "nook", title: "A cooler way to come home", studio: "Nook & Grain", tag: "Petaling Jaya", category: "Warm minimal", copy: "Oak, linen and a single green wall turn a busy terrace into a reset button.", image: "/inspiration/warm-terrace.webp", alt: "Warm minimalist living room with oak furniture and soft linen textures", saveCount: 128, credit: "Unsplash", sourceUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0" },
  { id: "in-02", contractorId: "atelier", title: "The five-metre kitchen", studio: "Atelier Kecil", tag: "Mont Kiara", category: "Compact living", copy: "A compact condo kitchen planned around movement, not just cabinets.", image: "/inspiration/compact-kitchen.webp", alt: "Compact contemporary kitchen with light wood cabinetry", saveCount: 96, credit: "Unsplash", sourceUrl: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea" },
  { id: "in-03", contractorId: "form", title: "Tropical, without the theme", studio: "Form & Field", tag: "Bangsar", category: "Modern tropical", copy: "Deep shade, cross-ventilation and honest materials do the heavy lifting.", image: "/inspiration/tropical-home.webp", alt: "Light-filled modern interior with tropical plants and natural materials", saveCount: 154, credit: "Unsplash", sourceUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d" },
  { id: "in-04", contractorId: "line", title: "A family room that flexes", studio: "Line House", tag: "Subang Jaya", category: "Family homes", copy: "Storage walls, soft edges and a floor plan that changes with the family.", image: "/inspiration/family-room.webp", alt: "Calm family living room with layered furniture and storage", saveCount: 87, credit: "Unsplash", sourceUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace" },
  { id: "in-05", contractorId: "casa", title: "The quiet arrival", studio: "Casa Sore", tag: "Ampang", category: "Soft contemporary", copy: "A small entry sequence that makes the rest of the home feel intentional.", image: "/inspiration/quiet-entry.webp", alt: "Minimal entryway with warm neutral surfaces and natural light", saveCount: 72, credit: "Unsplash", sourceUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3" },
  { id: "in-06", contractorId: "moss", title: "Green in the gaps", studio: "Moss & Tile", tag: "Kuala Lumpur", category: "Biophilic", copy: "Planting, light and texture bring a low-maintenance garden into the plan.", image: "/inspiration/green-gaps.webp", alt: "Biophilic interior with plants and layered green textures", saveCount: 119, credit: "Unsplash", sourceUrl: "https://images.unsplash.com/photo-1618220179428-22790b461013" }
];

export const seedState: DemoState = {
  version: 3,
  savedInspirationIds: ["in-01"],
  shortlisted: ["nook", "atelier"],
  requests: [{ id: "req-demo", contractorId: "nook", brief: "A warm, practical refresh for a 1,200 sq ft terrace home.", budget: "RM80kâ€“RM120k", timeline: "Start in 6â€“8 weeks", status: "quoted", createdAt: "Today" }],
  quotes: [{ id: "req-demo", contractorId: "nook", brief: "A warm, practical refresh for a 1,200 sq ft terrace home.", budget: "RM80kâ€“RM120k", timeline: "Start in 6â€“8 weeks", status: "quoted", createdAt: "Today", amount: 98000, deposit: 19600, validity: "Valid for 14 days" }],
  projects: [{ id: "TRU-DEMO-2183", contractorId: "nook", name: "Petaling Jaya terrace refresh", status: "active", total: 98000, reviewUnlocked: false, milestones: [
    { id: "brief", label: "Brief & concept", amount: 9800, status: "approved", evidence: "Concept pack v2 Â· 8 files" },
    { id: "build", label: "Build & install", amount: 68600, status: "submitted", evidence: "Progress update Â· 12 files" },
    { id: "handover", label: "Handover", amount: 19600, status: "pending" }
  ] }],
  lastAction: "Demo data loaded"
};

export function contractorById(id: string) { return contractors.find((item) => item.id === id) ?? contractors[0]; }
export function projectById(state: DemoState, id: string) { return state.projects.find((item) => item.id === id) ?? state.projects[0]; }
export function money(value: number) { return new Intl.NumberFormat("en-MY", { style: "currency", currency: "MYR", maximumFractionDigits: 0 }).format(value); }

export type Action =
  | { type: "hydrate"; state: DemoState }
  | { type: "toggle_shortlist"; id: string }
  | { type: "toggle_inspiration_save"; id: string }
  | { type: "create_request"; contractorId: string; brief: string; budget: string; timeline: string }
  | { type: "accept_quote"; quoteId: string }
  | { type: "fund_project"; projectId: string }
  | { type: "submit_evidence"; projectId: string; milestoneId: string }
  | { type: "approve_milestone"; projectId: string; milestoneId: string }
  | { type: "dispute_milestone"; projectId: string; milestoneId: string }
  | { type: "resolve_dispute"; projectId: string; milestoneId: string }
  | { type: "complete_project"; projectId: string }
  | { type: "reset" };

export function demoReducer(state: DemoState, action: Action): DemoState {
  if (action.type === "hydrate") return { ...action.state, lastAction: "Migrated MVP demo data" };
  if (action.type === "reset") return { ...seedState, lastAction: "Demo reset" };
  if (action.type === "toggle_shortlist") {
    const has = state.shortlisted.includes(action.id);
    return { ...state, shortlisted: has ? state.shortlisted.filter((id) => id !== action.id) : [...state.shortlisted, action.id], lastAction: has ? "Removed from shortlist" : "Added to shortlist" };
  }
  if (action.type === "toggle_inspiration_save") {
    const has = state.savedInspirationIds.includes(action.id);
    return { ...state, savedInspirationIds: has ? state.savedInspirationIds.filter((id) => id !== action.id) : [...state.savedInspirationIds, action.id], lastAction: has ? "Removed inspiration save" : "Saved inspiration" };
  }
  if (action.type === "create_request") {
    const id = `req-${Date.now()}`;
    const request: QuoteRequest = { id, contractorId: action.contractorId, brief: action.brief, budget: action.budget, timeline: action.timeline, status: "sent", createdAt: "Just now" };
    return { ...state, requests: [request, ...state.requests], lastAction: "Quote request sent" };
  }
  if (action.type === "accept_quote") {
    const quote = state.quotes.find((item) => item.id === action.quoteId);
    if (!quote) return state;
    const project: Project = { id: `TRU-${Math.floor(Math.random() * 9000 + 1000)}`, contractorId: quote.contractorId, name: `${contractorById(quote.contractorId).area} home project`, status: "planning", total: quote.amount, reviewUnlocked: false, milestones: [
      { id: "brief", label: "Brief & concept", amount: quote.amount * 0.1, status: "pending" },
      { id: "build", label: "Build & install", amount: quote.amount * 0.7, status: "pending" },
      { id: "handover", label: "Handover", amount: quote.amount * 0.2, status: "pending" }
    ] };
    return { ...state, projects: [project, ...state.projects], quotes: state.quotes.map((item) => item.id === action.quoteId ? { ...item, status: "accepted" } : item), lastAction: "Quote accepted; project workspace created" };
  }
  const project = state.projects.find((item) => item.id === ("projectId" in action ? action.projectId : ""));
  if (!project) return state;
  if (action.type === "fund_project") return { ...state, projects: state.projects.map((item) => item.id === project.id ? { ...item, status: "active", milestones: item.milestones.map((m, index) => index === 0 ? { ...m, status: "funded" } : m) } : item), lastAction: "Protected payment simulated" };
  if (action.type === "submit_evidence") return { ...state, projects: state.projects.map((item) => item.id === project.id ? { ...item, milestones: item.milestones.map((m) => m.id === action.milestoneId ? { ...m, status: "submitted", evidence: "Progress update Â· 6 files" } : m) } : item), lastAction: "Evidence submitted for review" };
  if (action.type === "approve_milestone") return { ...state, projects: state.projects.map((item) => item.id === project.id ? { ...item, milestones: item.milestones.map((m) => m.id === action.milestoneId ? { ...m, status: "approved" } : m) } : item), lastAction: "Milestone approved; release simulated" };
  if (action.type === "dispute_milestone") return { ...state, projects: state.projects.map((item) => item.id === project.id ? { ...item, milestones: item.milestones.map((m) => m.id === action.milestoneId ? { ...m, status: "disputed" } : m) } : item), lastAction: "Dispute opened; funds held" };
  if (action.type === "resolve_dispute") return { ...state, projects: state.projects.map((item) => item.id === project.id ? { ...item, milestones: item.milestones.map((m) => m.id === action.milestoneId ? { ...m, status: "refunded" } : m) } : item), lastAction: "Dispute resolved; refund simulated" };
  if (action.type === "complete_project") return { ...state, projects: state.projects.map((item) => item.id === project.id ? { ...item, status: "complete", reviewUnlocked: true } : item), lastAction: "Project complete; review unlocked" };
  return state;
}

