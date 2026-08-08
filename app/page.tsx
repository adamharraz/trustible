"use client";

import {
  AlertTriangle,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  FileText,
  Heart,
  Home,
  ImageIcon,
  LayoutDashboard,
  ListFilter,
  MessageSquareQuote,
  Receipt,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  WalletCards,
  X
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Contractor = {
  id: string;
  name: string;
  area: string;
  specialties: string[];
  category: string;
  budget: "RM10k-RM40k" | "RM40k-RM90k" | "RM90k+";
  rating: number;
  reviews: number;
  completed: number;
  response: string;
  verified: boolean;
  image: string;
  logoTone: "forest" | "teal" | "gold" | "brick" | "sky" | "ink" | "mint" | "cream";
  summary: string;
};

type PortfolioPost = {
  id: string;
  contractorId: string;
  image: string;
  title: string;
  caption: string;
  source: "Instagram sample" | "Facebook sample";
  saves: number;
};

type Review = {
  id: string;
  contractorId: string;
  client: string;
  project: string;
  rating: number;
  text: string;
  verifiedProject: boolean;
};

type MilestoneStatus = "funded" | "in_progress" | "approval" | "released" | "disputed" | "refunded" | "completed";

type Milestone = {
  id: string;
  title: string;
  amount: number;
  status: MilestoneStatus;
};

type Project = {
  id: string;
  contractorId: string;
  title: string;
  total: number;
  protectedBalance: number;
  status: "pending_payment" | "funds_protected" | "active" | "dispute_review" | "completed";
  milestones: Milestone[];
};

type Transaction = {
  id: string;
  title: string;
  amount: number;
  status: "pending" | "protected" | "released" | "refunded";
  date: string;
};

type View = "directory" | "feed" | "shortlist" | "project" | "dashboard";

const contractors: Contractor[] = [
  {
    id: "c1",
    name: "Ruang Reka Studio",
    area: "Petaling Jaya",
    specialties: ["Condo ID", "Built-in cabinets", "Scandinavian"],
    category: "Condo ID",
    budget: "RM40k-RM90k",
    rating: 4.9,
    reviews: 42,
    completed: 118,
    response: "2 hours",
    verified: true,
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
    logoTone: "forest",
    summary: "Warm modern interiors for Klang Valley condos, with itemised quotations and tidy milestone reporting."
  },
  {
    id: "c2",
    name: "BinaNest Interiors",
    area: "Shah Alam",
    specialties: ["Landed homes", "Kitchen remodel", "Project management"],
    category: "Landed Home",
    budget: "RM90k+",
    rating: 4.8,
    reviews: 36,
    completed: 86,
    response: "Same day",
    verified: true,
    image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=900&q=80",
    logoTone: "teal",
    summary: "Full-service design and build team for landed renovations with clear handover documentation."
  },
  {
    id: "c3",
    name: "Kita Kabinet",
    area: "Cheras",
    specialties: ["Cabinetry", "Wardrobes", "Compact spaces"],
    category: "Cabinetry",
    budget: "RM10k-RM40k",
    rating: 4.7,
    reviews: 29,
    completed: 73,
    response: "4 hours",
    verified: true,
    image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=900&q=80",
    logoTone: "gold",
    summary: "Specialists in practical storage upgrades for apartments, kitchens, and rental units."
  },
  {
    id: "c4",
    name: "Merdeka Makeovers",
    area: "Kuala Lumpur",
    specialties: ["Budget refresh", "Rental units", "Fast handover"],
    category: "Refresh",
    budget: "RM10k-RM40k",
    rating: 4.6,
    reviews: 24,
    completed: 64,
    response: "1 day",
    verified: true,
    image: "https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=900&q=80",
    logoTone: "brick",
    summary: "Lean renovation packages for owners who need visible improvements without a long build cycle."
  },
  {
    id: "c5",
    name: "Taman Craft Design",
    area: "Subang Jaya",
    specialties: ["Family homes", "Kids rooms", "Japandi"],
    category: "Family Home",
    budget: "RM40k-RM90k",
    rating: 4.8,
    reviews: 31,
    completed: 79,
    response: "3 hours",
    verified: true,
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",
    logoTone: "sky",
    summary: "Soft, durable interiors for growing families, with strong review history for communication."
  },
  {
    id: "c6",
    name: "Urban Tukang Co.",
    area: "Ampang",
    specialties: ["Bathrooms", "Wet works", "Tiles"],
    category: "Bathroom",
    budget: "RM10k-RM40k",
    rating: 4.5,
    reviews: 18,
    completed: 51,
    response: "Same day",
    verified: false,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
    logoTone: "ink",
    summary: "Wet works and bathroom upgrades, currently completing Trustible sample verification."
  },
  {
    id: "c7",
    name: "Linea Living KL",
    area: "Mont Kiara",
    specialties: ["Premium condo", "Lighting", "Luxury finishes"],
    category: "Premium Condo",
    budget: "RM90k+",
    rating: 4.9,
    reviews: 27,
    completed: 62,
    response: "2 hours",
    verified: true,
    image: "https://images.unsplash.com/photo-1600585153490-76fb20a32601?auto=format&fit=crop&w=900&q=80",
    logoTone: "mint",
    summary: "Premium detailing and concierge-style project updates for high-rise homeowners."
  },
  {
    id: "c8",
    name: "Setia Spaceworks",
    area: "Setia Alam",
    specialties: ["Open kitchens", "Dry kitchen", "Minimalist"],
    category: "Kitchen",
    budget: "RM40k-RM90k",
    rating: 4.7,
    reviews: 22,
    completed: 58,
    response: "5 hours",
    verified: true,
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80",
    logoTone: "cream",
    summary: "Kitchen-first renovator with strong before-and-after documentation and clean milestone reports."
  }
];

const portfolioPosts: PortfolioPost[] = [
  "1600210492486-724fe5c67fb0|c1|Condo calm|Warm timber palette with hidden storage|Instagram sample",
  "1600607687920-4e2a09cf159d|c1|PJ living room|Soft lighting and built-in display wall|Facebook sample",
  "1600489000022-c2086d79f9d4|c2|Family kitchen|Large island with practical daily storage|Instagram sample",
  "1556912172-45b7abe8b7e1|c3|Compact kitchen|Small apartment layout, higher usable cabinet volume|Instagram sample",
  "1617104678098-de229db51175|c4|Rental refresh|Fast makeover for tenant-ready handover|Facebook sample",
  "1600566753086-00f18fb6b3ea|c5|Japandi dining|Durable family dining zone with warm wall texture|Instagram sample",
  "1600566753190-17f0baa2a6c3|c6|Tile work|Bathroom wet area upgrade with cleaner drainage|Facebook sample",
  "1600585153490-76fb20a32601|c7|Premium lounge|Mont Kiara condo lighting and custom feature wall|Instagram sample",
  "1600607688969-a5bfcd646154|c8|Dry kitchen|Minimal white cabinets with better prep flow|Instagram sample",
  "1600566752355-35792bedcfea|c2|Landing detail|Landed home transition area with storage bench|Facebook sample",
  "1600607687644-c7171b42498b|c7|Bedroom suite|Hotel-style bedroom with layered lighting|Instagram sample",
  "1600566752229-250ed79470d4|c5|Kids storage|Calm room planning with easy-clean finishes|Facebook sample",
  "1556911220-bff31c812dba|c3|Wardrobe wall|Floor-to-ceiling wardrobe with study nook|Instagram sample",
  "1600566752979-7f1d0d76cce5|c8|Kitchen line|Long dry kitchen run with concealed appliances|Facebook sample",
  "1600585154340-be6161a56a0c|c4|Quick living room|Paint, lighting, and furniture layout refresh|Instagram sample",
  "1600607687939-ce8a6c25118c|c1|Entry cabinet|Shoe storage and drop zone for condo entry|Facebook sample",
  "1600566753151-384129cf4e3e|c6|Bathroom vanity|Compact vanity with moisture-resistant cabinet|Instagram sample",
  "1600573472550-8090b5e0745e|c2|Open plan|Family lounge connected to kitchen island|Facebook sample",
  "1600210491892-03d54c0aaf87|c7|Feature wall|Stone, timber, and warm light for premium condo|Instagram sample",
  "1600566752355-35792bedcfea|c5|Family foyer|Bench storage and everyday bag drop zone|Instagram sample"
].map((row, index) => {
  const [photo, contractorId, title, caption, source] = row.split("|") as [string, string, string, string, PortfolioPost["source"]];
  return {
    id: `p${index + 1}`,
    contractorId,
    title,
    caption,
    source,
    saves: 21 + index * 7,
    image: `https://images.unsplash.com/photo-${photo}?auto=format&fit=crop&w=800&q=80`
  };
});

const reviews: Review[] = [
  {
    id: "r1",
    contractorId: "c1",
    client: "Nadia, TTDI",
    project: "Condo renovation booked and paid through Trustible demo",
    rating: 5,
    text: "The milestone updates made it easier to approve work without guessing what had been completed.",
    verifiedProject: true
  },
  {
    id: "r2",
    contractorId: "c1",
    client: "Hafiz, Bangsar South",
    project: "Kitchen and storage upgrade",
    rating: 5,
    text: "Quote was itemised and the release request matched the actual site progress.",
    verifiedProject: true
  },
  {
    id: "r3",
    contractorId: "c2",
    client: "Amira, Shah Alam",
    project: "Landed kitchen extension",
    rating: 5,
    text: "Clear schedule and proper documentation for every handover point.",
    verifiedProject: true
  },
  {
    id: "r4",
    contractorId: "c7",
    client: "Jason, Mont Kiara",
    project: "Premium condo styling",
    rating: 5,
    text: "The dashboard gave us enough visibility to feel comfortable with a large renovation budget.",
    verifiedProject: true
  }
];

const initialProject: Project = {
  id: "TRU-DEMO-2183",
  contractorId: "c1",
  title: "Condo ID package, Petaling Jaya",
  total: 68200,
  protectedBalance: 28400,
  status: "active",
  milestones: [
    { id: "m1", title: "Design confirmation and site measurement", amount: 8200, status: "released" },
    { id: "m2", title: "Cabinet fabrication deposit", amount: 20200, status: "approval" },
    { id: "m3", title: "Installation and wet works", amount: 23800, status: "in_progress" },
    { id: "m4", title: "Final handover and defects", amount: 16000, status: "funded" }
  ]
};

const initialTransactions: Transaction[] = [
  { id: "t1", title: "Protected payment funded", amount: 68200, status: "protected", date: "8 Aug 2026" },
  { id: "t2", title: "Milestone 1 released to contractor", amount: 8200, status: "released", date: "8 Aug 2026" }
];

function formatRM(amount: number) {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    maximumFractionDigits: 0
  }).format(amount);
}

function statusLabel(status: MilestoneStatus | Project["status"] | Transaction["status"]) {
  return status.replaceAll("_", " ");
}

export default function HomePage() {
  const [view, setView] = useState<View>("directory");
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("All");
  const [budget, setBudget] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [shortlist, setShortlist] = useState<string[]>(["c1", "c2"]);
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);
  const [quoteContractor, setQuoteContractor] = useState<Contractor | null>(null);
  const [project, setProject] = useState<Project>(initialProject);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [reviewUnlocked, setReviewUnlocked] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("trustible-demo");
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as {
        shortlist?: string[];
        project?: Project;
        transactions?: Transaction[];
        reviewUnlocked?: boolean;
      };
      if (parsed.shortlist) setShortlist(parsed.shortlist);
      if (parsed.project) setProject(parsed.project);
      if (parsed.transactions) setTransactions(parsed.transactions);
      if (typeof parsed.reviewUnlocked === "boolean") setReviewUnlocked(parsed.reviewUnlocked);
    } catch {
      window.localStorage.removeItem("trustible-demo");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "trustible-demo",
      JSON.stringify({ shortlist, project, transactions, reviewUnlocked })
    );
  }, [shortlist, project, transactions, reviewUnlocked]);

  const filteredContractors = useMemo(() => {
    return contractors.filter((contractor) => {
      const matchesText = `${contractor.name} ${contractor.area} ${contractor.specialties.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesArea = area === "All" || contractor.area === area;
      const matchesBudget = budget === "All" || contractor.budget === budget;
      const matchesVerified = !verifiedOnly || contractor.verified;
      return matchesText && matchesArea && matchesBudget && matchesVerified;
    });
  }, [area, budget, query, verifiedOnly]);

  const shortlistedContractors = contractors.filter((contractor) => shortlist.includes(contractor.id));
  const activeContractor = contractors.find((contractor) => contractor.id === project.contractorId) ?? contractors[0];

  function toggleShortlist(id: string) {
    setShortlist((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  function createDemoProject(contractor: Contractor) {
    const newProject: Project = {
      id: `TRU-DEMO-${Math.floor(3000 + Math.random() * 6000)}`,
      contractorId: contractor.id,
      title: `${contractor.category} with ${contractor.name}`,
      total: contractor.budget === "RM90k+" ? 124000 : contractor.budget === "RM40k-RM90k" ? 68400 : 28600,
      protectedBalance: 0,
      status: "pending_payment",
      milestones: [
        { id: "m1", title: "Site visit, measurements and final scope", amount: 8200, status: "funded" },
        { id: "m2", title: "Materials and fabrication deposit", amount: contractor.budget === "RM90k+" ? 52000 : 20200, status: "funded" },
        { id: "m3", title: "Installation progress claim", amount: contractor.budget === "RM90k+" ? 43800 : 23800, status: "funded" },
        { id: "m4", title: "Final handover and defects close-out", amount: contractor.budget === "RM90k+" ? 20000 : 16200, status: "funded" }
      ]
    };
    newProject.total = newProject.milestones.reduce((sum, milestone) => sum + milestone.amount, 0);
    setProject(newProject);
    setTransactions([
      {
        id: "t-pending",
        title: "Awaiting simulated Trustible checkout",
        amount: newProject.total,
        status: "pending",
        date: "Today"
      }
    ]);
    setQuoteContractor(null);
    setView("project");
  }

  function simulateCheckout() {
    setProject((current) => ({
      ...current,
      status: "funds_protected",
      protectedBalance: current.total,
      milestones: current.milestones.map((milestone, index) => ({
        ...milestone,
        status: index === 0 ? "approval" : "funded"
      }))
    }));
    setTransactions([
      {
        id: `t${Date.now()}`,
        title: "Demo funds moved into Trustible Protected Payment",
        amount: project.total,
        status: "protected",
        date: "Today"
      }
    ]);
  }

  function updateMilestone(id: string, status: MilestoneStatus) {
    const target = project.milestones.find((milestone) => milestone.id === id);
    if (!target) return;

    setProject((current) => {
      const milestones = current.milestones.map((milestone) =>
        milestone.id === id ? { ...milestone, status } : milestone
      );
      const releasedAmount = status === "released" || status === "completed" ? target.amount : 0;
      const hasDispute = milestones.some((milestone) => milestone.status === "disputed");
      const isComplete = milestones.every((milestone) => milestone.status === "released" || milestone.status === "completed");
      return {
        ...current,
        status: hasDispute ? "dispute_review" : isComplete ? "completed" : "active",
        protectedBalance: Math.max(0, current.protectedBalance - releasedAmount),
        milestones
      };
    });

    const transactionStatus = status === "refunded" ? "refunded" : status === "released" ? "released" : "protected";
    setTransactions((current) => [
      {
        id: `t${Date.now()}`,
        title:
          status === "disputed"
            ? `Release paused for ${target.title}`
            : status === "refunded"
              ? `Demo refund recorded for ${target.title}`
              : `Milestone update: ${target.title}`,
        amount: target.amount,
        status: transactionStatus,
        date: "Today"
      },
      ...current
    ]);
  }

  function completeProject() {
    setProject((current) => ({
      ...current,
      status: "completed",
      protectedBalance: 0,
      milestones: current.milestones.map((milestone) => ({ ...milestone, status: "completed" }))
    }));
    setReviewUnlocked(true);
    setTransactions((current) => [
      {
        id: `t${Date.now()}`,
        title: "Final demo receipt issued and verified review unlocked",
        amount: project.protectedBalance,
        status: "released",
        date: "Today"
      },
      ...current
    ]);
  }

  return (
    <div className="app-shell">
      <Header current={view} onNavigate={setView} />
      <main className="main">
        <section className="market-header" aria-label="Trustible overview">
          <div className="intro-panel">
            <div>
              <p className="eyebrow">Hire with Proof, Not Luck</p>
              <h1>Find verified Klang Valley renovation contractors and pay by protected milestones.</h1>
              <p className="lead">
                This prototype opens straight into the marketplace, then lets homeowners try the complete Trustible journey with demo contractors, sample social portfolios, and simulated in-platform payments.
              </p>
            </div>
            <div>
              <div className="hero-actions">
                <button className="secondary" onClick={() => setView("directory")}>
                  <Search size={18} /> Browse contractors
                </button>
                <button className="ghost" onClick={() => setView("project")}>
                  <ShieldCheck size={18} /> View protected payment demo
                </button>
              </div>
              <div className="proof-strip">
                <div className="proof-item">
                  <strong>8</strong>
                  <span>sample Klang Valley contractors</span>
                </div>
                <div className="proof-item">
                  <strong>20</strong>
                  <span>social-style portfolio posts</span>
                </div>
                <div className="proof-item">
                  <strong>RM68k</strong>
                  <span>simulated protected project</span>
                </div>
              </div>
            </div>
          </div>
          <div className="feature-image" aria-label="Modern renovated Malaysian home interior">
            <div className="image-note">
              <span className="badge demo">
                <AlertTriangle size={14} /> Demo only
              </span>
              <p className="small">All payments, reviews, receipts and verification marks in this MVP are sample data.</p>
            </div>
          </div>
        </section>

        {view === "directory" && (
          <section className="content-grid">
            <aside className="panel filters" aria-label="Contractor filters">
              <p className="eyebrow">Directory</p>
              <h2>Filter contractors</h2>
              <div className="field">
                <label htmlFor="search">Search</label>
                <input id="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Kitchen, PJ, condo..." />
              </div>
              <div className="field">
                <label htmlFor="area">Location</label>
                <select id="area" value={area} onChange={(event) => setArea(event.target.value)}>
                  <option>All</option>
                  {[...new Set(contractors.map((contractor) => contractor.area))].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="budget">Budget</label>
                <select id="budget" value={budget} onChange={(event) => setBudget(event.target.value)}>
                  <option>All</option>
                  <option>RM10k-RM40k</option>
                  <option>RM40k-RM90k</option>
                  <option>RM90k+</option>
                </select>
              </div>
              <div className="button-row">
                <button className={`chip ${verifiedOnly ? "active" : ""}`} onClick={() => setVerifiedOnly((value) => !value)}>
                  <BadgeCheck size={15} /> Verified sample
                </button>
              </div>
            </aside>
            <div>
              <div className="section-head">
                <div>
                  <p className="eyebrow">Trusted discovery</p>
                  <h2>{filteredContractors.length} contractors match your renovation</h2>
                  <p>Cards are built for quick scanning: proof, price range, response time, and project history first.</p>
                </div>
                <button className="ghost" onClick={() => setView("feed")}>
                  <ImageIcon size={18} /> Inspiration feed
                </button>
              </div>
              <div className="contractor-grid">
                {filteredContractors.map((contractor) => (
                  <ContractorCard
                    key={contractor.id}
                    contractor={contractor}
                    saved={shortlist.includes(contractor.id)}
                    onSave={() => toggleShortlist(contractor.id)}
                    onOpen={() => setSelectedContractor(contractor)}
                    onQuote={() => setQuoteContractor(contractor)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {view === "feed" && (
          <section>
            <div className="section-head">
              <div>
                <p className="eyebrow">Social portfolio feed</p>
                <h2>Scroll renovation ideas, then inspect the contractor behind the work</h2>
                <p>Auto-pulled social media is simulated here with curated sample posts.</p>
              </div>
              <button className="ghost" onClick={() => setView("directory")}>
                <ListFilter size={18} /> Directory
              </button>
            </div>
            <div className="feed-grid">
              {portfolioPosts.map((post) => {
                const contractor = contractors.find((item) => item.id === post.contractorId) ?? contractors[0];
                return (
                  <article className="card feed-card" key={post.id}>
                    <img src={post.image} alt={post.title} />
                    <div className="card-body">
                      <div>
                        <span className="badge demo">{post.source}</span>
                        <h3>{post.title}</h3>
                        <p className="muted small">{post.caption}</p>
                      </div>
                      <div className="contractor-title">
                        <div>
                          <strong>{contractor.name}</strong>
                          <p className="muted small">{contractor.area}</p>
                        </div>
                        <button className="icon-button" title="Open contractor" onClick={() => setSelectedContractor(contractor)}>
                          <Building2 size={18} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {view === "shortlist" && (
          <section className="panel">
            <div className="section-head">
              <div>
                <p className="eyebrow">Saved shortlist</p>
                <h2>Compare before requesting quotes</h2>
                <p>Homeowners can compare trust signals before sending project details.</p>
              </div>
              <button className="primary" onClick={() => shortlistedContractors[0] && setQuoteContractor(shortlistedContractors[0])}>
                <MessageSquareQuote size={18} /> Request quote
              </button>
            </div>
            {shortlistedContractors.length === 0 ? (
              <div className="empty-state">Save contractors from the directory to compare them here.</div>
            ) : (
              <div className="compare-list">
                {shortlistedContractors.map((contractor) => (
                  <div className="compare-row" key={contractor.id}>
                    <div>
                      <h3>{contractor.name}</h3>
                      <p className="muted small">
                        {contractor.area} · {contractor.budget} · {contractor.completed} completed sample projects · responds in {contractor.response}
                      </p>
                      <div className="tag-row">
                        {contractor.specialties.map((tag) => (
                          <span className="status-pill" key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="button-row">
                      <button className="ghost" onClick={() => setSelectedContractor(contractor)}>Profile</button>
                      <button className="secondary" onClick={() => setQuoteContractor(contractor)}>Quote</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {view === "project" && (
          <section className="workspace-band">
            <div className="section-head">
              <div>
                <p className="eyebrow">Protected payment workspace</p>
                <h2>{project.title}</h2>
                <p>{activeContractor.name} · {project.id}</p>
              </div>
              <span className={`status-pill ${project.status === "completed" ? "completed" : project.status === "dispute_review" ? "disputed" : "protected"}`}>
                <ShieldCheck size={14} /> {statusLabel(project.status)}
              </span>
            </div>
            <div className="demo-warning">
              <AlertTriangle size={20} />
              <div>
                <strong>Demo transaction only. No real payment is processed.</strong>
                <p className="small">This screen simulates how Trustible-held milestone funds could look before regulated payment infrastructure exists.</p>
              </div>
            </div>
            <div className="workspace-grid" style={{ marginTop: 16 }}>
              <div>
                <div className="money-box">
                  <span>Trustible Protected Payment balance</span>
                  <strong style={{ fontSize: "2rem" }}>{formatRM(project.protectedBalance)}</strong>
                  <p className="small">Project total: {formatRM(project.total)}</p>
                  {project.status === "pending_payment" && (
                    <button className="secondary" onClick={simulateCheckout}>
                      <CreditCard size={18} /> Simulate checkout into Trustible
                    </button>
                  )}
                </div>
                <h2 style={{ marginTop: 18 }}>Milestones</h2>
                <div className="timeline">
                  {project.milestones.map((milestone) => (
                    <div className="milestone" key={milestone.id}>
                      <div className="contractor-title">
                        <div>
                          <h3>{milestone.title}</h3>
                          <p className="muted small">{formatRM(milestone.amount)}</p>
                        </div>
                        <span className={`status-pill ${milestone.status}`}>{statusLabel(milestone.status)}</span>
                      </div>
                      <div className="button-row">
                        <button className="success" onClick={() => updateMilestone(milestone.id, "released")}>
                          <CheckCircle2 size={17} /> Approve release
                        </button>
                        <button className="danger" onClick={() => updateMilestone(milestone.id, "disputed")}>
                          <AlertTriangle size={17} /> Raise dispute
                        </button>
                        <button className="ghost" onClick={() => updateMilestone(milestone.id, "refunded")}>
                          <WalletCards size={17} /> Demo refund
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="button-row" style={{ marginTop: 14 }}>
                  <button className="primary" onClick={completeProject}>
                    <Star size={18} /> Complete and unlock verified review
                  </button>
                </div>
              </div>
              <aside>
                <h2>Receipts and history</h2>
                <div className="transaction-list">
                  {transactions.map((transaction) => (
                    <div className="transaction" key={transaction.id}>
                      <div className="contractor-title">
                        <div>
                          <h3>{transaction.title}</h3>
                          <p className="muted small">{transaction.date} · Sample receipt</p>
                        </div>
                        <strong>{formatRM(transaction.amount)}</strong>
                      </div>
                      <span className={`status-pill ${transaction.status}`}>
                        <Receipt size={14} /> {transaction.status}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="panel" style={{ marginTop: 14 }}>
                  <h3>Verified review gate</h3>
                  <p className="muted small">
                    {reviewUnlocked
                      ? "Review unlocked because this sample project is complete and paid through the Trustible demo."
                      : "Reviews remain locked until the simulated platform project is completed."}
                  </p>
                  {reviewUnlocked && (
                    <div className="field">
                      <label htmlFor="review">Leave verified review</label>
                      <textarea id="review" defaultValue="The milestone payment flow made the project feel safer and clearer." />
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </section>
        )}

        {view === "dashboard" && (
          <section className="dashboard-band">
            <div className="section-head">
              <div>
                <p className="eyebrow">Contractor demo</p>
                <h2>Dashboard for leads, milestones and payment release status</h2>
                <p>Designed to show why contractors would join: qualified leads, visible credibility, and clearer payment progress.</p>
              </div>
              <span className="badge">
                <BriefcaseBusiness size={14} /> Contractor view
              </span>
            </div>
            <div className="dashboard-grid">
              <div>
                <h2>New quote requests</h2>
                <div className="request-list">
                  {["Condo kitchen in Petaling Jaya, RM55k target", "Bathroom refresh in Ampang, RM22k target", "Family home storage in Subang Jaya, RM72k target"].map((request) => (
                    <div className="request-card" key={request}>
                      <h3>{request}</h3>
                      <p className="muted small">Homeowner viewed verified reviews and saved 2 contractors before requesting quote.</p>
                      <div className="button-row">
                        <button className="secondary">Prepare quote</button>
                        <button className="ghost">Message lead</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="money-box">
                  <span>Pending release from active milestones</span>
                  <strong style={{ fontSize: "2rem" }}>{formatRM(20200)}</strong>
                  <p className="small">Homeowner approval requested for cabinet fabrication deposit.</p>
                </div>
                <div className="panel" style={{ marginTop: 14 }}>
                  <h3>Credibility preview</h3>
                  <p className="muted small">Verified sample reviews, 118 completed projects, 4.9 rating, 2 hour response time.</p>
                  <div className="tag-row">
                    <span className="status-pill completed">Verified reviews</span>
                    <span className="status-pill protected">Portfolio linked</span>
                    <span className="status-pill approval">Milestone-ready</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <MobileNav current={view} onNavigate={setView} />

      {selectedContractor && (
        <ProfileModal
          contractor={selectedContractor}
          saved={shortlist.includes(selectedContractor.id)}
          onClose={() => setSelectedContractor(null)}
          onSave={() => toggleShortlist(selectedContractor.id)}
          onQuote={() => {
            setQuoteContractor(selectedContractor);
            setSelectedContractor(null);
          }}
        />
      )}

      {quoteContractor && (
        <QuoteModal contractor={quoteContractor} onClose={() => setQuoteContractor(null)} onAccept={() => createDemoProject(quoteContractor)} />
      )}
    </div>
  );
}

function Header({ current, onNavigate }: { current: View; onNavigate: (view: View) => void }) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-mark">T</span>
        <span>Trustible</span>
      </div>
      <nav className="topnav" aria-label="Primary navigation">
        <NavButton view="directory" current={current} onNavigate={onNavigate} icon={<Home size={17} />} label="Directory" />
        <NavButton view="feed" current={current} onNavigate={onNavigate} icon={<Sparkles size={17} />} label="Inspiration" />
        <NavButton view="shortlist" current={current} onNavigate={onNavigate} icon={<ClipboardCheck size={17} />} label="Shortlist" />
        <NavButton view="project" current={current} onNavigate={onNavigate} icon={<ShieldCheck size={17} />} label="Projects" />
        <NavButton view="dashboard" current={current} onNavigate={onNavigate} icon={<LayoutDashboard size={17} />} label="Contractor Demo" />
      </nav>
    </header>
  );
}

function MobileNav({ current, onNavigate }: { current: View; onNavigate: (view: View) => void }) {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      <NavButton view="directory" current={current} onNavigate={onNavigate} icon={<Search size={18} />} label="Discover" />
      <NavButton view="feed" current={current} onNavigate={onNavigate} icon={<ImageIcon size={18} />} label="Feed" />
      <NavButton view="shortlist" current={current} onNavigate={onNavigate} icon={<ClipboardCheck size={18} />} label="Compare" />
      <NavButton view="project" current={current} onNavigate={onNavigate} icon={<ShieldCheck size={18} />} label="Project" />
      <NavButton view="dashboard" current={current} onNavigate={onNavigate} icon={<LayoutDashboard size={18} />} label="Pro" />
    </nav>
  );
}

function NavButton({
  view,
  current,
  onNavigate,
  icon,
  label
}: {
  view: View;
  current: View;
  onNavigate: (view: View) => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button className={`nav-button ${current === view ? "active" : ""}`} onClick={() => onNavigate(view)}>
      {icon}
      {label}
    </button>
  );
}

function ContractorCard({
  contractor,
  saved,
  onSave,
  onOpen,
  onQuote
}: {
  contractor: Contractor;
  saved: boolean;
  onSave: () => void;
  onOpen: () => void;
  onQuote: () => void;
}) {
  return (
    <article className="card contractor-card">
      <div className={`card-logo logo-${contractor.logoTone}`} aria-label={`${contractor.name} sample logo`}>
        <ContractorLogo contractor={contractor} />
        <span className={contractor.verified ? "badge" : "badge demo"}>
          <BadgeCheck size={14} /> {contractor.verified ? "Verified sample" : "Verification pending"}
        </span>
      </div>
      <div className="card-body">
        <div className="contractor-title">
          <div>
            <h3>{contractor.name}</h3>
            <p className="muted small">{contractor.area} · {contractor.category}</p>
          </div>
          <button className={`icon-button ${saved ? "saved" : ""}`} title="Save contractor" onClick={onSave}>
            <Heart size={18} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
        <p className="muted small">{contractor.summary}</p>
        <div className="meta-row">
          <span className="rating">
            <Star size={15} fill="currentColor" /> {contractor.rating}
          </span>
          <span className="status-pill">{contractor.reviews} reviews</span>
          <span className="status-pill">{contractor.budget}</span>
        </div>
        <div className="button-row">
          <button className="ghost" onClick={onOpen}>
            <FileText size={17} /> Profile
          </button>
          <button className="primary" onClick={onQuote}>
            <MessageSquareQuote size={17} /> Quote
          </button>
        </div>
      </div>
    </article>
  );
}

function ContractorLogo({ contractor }: { contractor: Contractor }) {
  const initials = contractor.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="contractor-logo-mark">
      <div className="logo-symbol" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <strong>{initials}</strong>
      <small>{contractor.name}</small>
    </div>
  );
}

function ProfileModal({
  contractor,
  saved,
  onClose,
  onSave,
  onQuote
}: {
  contractor: Contractor;
  saved: boolean;
  onClose: () => void;
  onSave: () => void;
  onQuote: () => void;
}) {
  const posts = portfolioPosts.filter((post) => post.contractorId === contractor.id).slice(0, 6);
  const contractorReviews = reviews.filter((review) => review.contractorId === contractor.id);
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-head">
          <div>
            <p className="eyebrow">Contractor profile</p>
            <h2>{contractor.name}</h2>
            <p className="muted">{contractor.summary}</p>
          </div>
          <button className="icon-button" onClick={onClose} title="Close profile">
            <X size={20} />
          </button>
        </div>
        <div className="profile-layout">
          <div>
            <div className="gallery">
              {posts.map((post) => (
                <img key={post.id} src={post.image} alt={post.title} />
              ))}
            </div>
            <h2 style={{ marginTop: 18 }}>Verified reviews</h2>
            <div className="review-list">
              {(contractorReviews.length ? contractorReviews : reviews.slice(0, 2)).map((review) => (
                <div className="review" key={review.id}>
                  <div className="contractor-title">
                    <h3>{review.client}</h3>
                    <span className="rating"><Star size={15} fill="currentColor" /> {review.rating}</span>
                  </div>
                  <p className="muted small">{review.text}</p>
                  <span className="badge">
                    <ShieldCheck size={14} /> Verified Trustible sample project
                  </span>
                </div>
              ))}
            </div>
          </div>
          <aside className="panel">
            <h3>Trust signals</h3>
            <div className="tag-row">
              <span className="status-pill">{contractor.completed} completed</span>
              <span className="status-pill">{contractor.response} response</span>
              <span className="status-pill">{contractor.budget}</span>
            </div>
            <h3 style={{ marginTop: 16 }}>Specialties</h3>
            <div className="tag-row">
              {contractor.specialties.map((tag) => (
                <span className="chip" key={tag}>{tag}</span>
              ))}
            </div>
            <div className="button-row" style={{ marginTop: 18 }}>
              <button className={`ghost ${saved ? "saved" : ""}`} onClick={onSave}>
                <Heart size={17} /> {saved ? "Saved" : "Save"}
              </button>
              <button className="primary" onClick={onQuote}>
                <MessageSquareQuote size={17} /> Request quote
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function QuoteModal({
  contractor,
  onClose,
  onAccept
}: {
  contractor: Contractor;
  onClose: () => void;
  onAccept: () => void;
}) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-head">
          <div>
            <p className="eyebrow">Quote request</p>
            <h2>Request and accept a sample quote from {contractor.name}</h2>
            <p className="muted">This creates a simulated project with Trustible milestone payment states.</p>
          </div>
          <button className="icon-button" onClick={onClose} title="Close quote form">
            <X size={20} />
          </button>
        </div>
        <div className="demo-warning">
          <AlertTriangle size={20} />
          <div>
            <strong>Demo transaction only. No real payment is processed.</strong>
            <p className="small">Accepting this quote only changes local prototype state.</p>
          </div>
        </div>
        <div className="profile-layout" style={{ marginTop: 16 }}>
          <div>
            <div className="field">
              <label htmlFor="scope">Project scope</label>
              <textarea id="scope" defaultValue="Condo interior design, kitchen cabinets, lighting, storage and final defect check." />
            </div>
            <div className="field">
              <label htmlFor="budgetRequest">Target budget</label>
              <select id="budgetRequest" defaultValue={contractor.budget}>
                <option>RM10k-RM40k</option>
                <option>RM40k-RM90k</option>
                <option>RM90k+</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="timeline">Preferred timeline</label>
              <input id="timeline" defaultValue="Start within 30 days" />
            </div>
          </div>
          <aside className="panel">
            <h3>Sample quote summary</h3>
            <p className="muted small">Milestones: scope confirmation, fabrication deposit, installation, final handover.</p>
            <div className="tag-row">
              <span className="status-pill protected">Protected payment</span>
              <span className="status-pill approval">Approval required</span>
              <span className="status-pill completed">Review unlock</span>
            </div>
            <button className="primary" style={{ width: "100%", marginTop: 16 }} onClick={onAccept}>
              <ShieldCheck size={18} /> Accept quote and create project
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
