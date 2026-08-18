"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@astryxdesign/core/Badge";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { ArrowRight, Check, CircleHelp, Compass, FileText, House, ShieldCheck, Sparkles, Star, WalletCards } from "lucide-react";
import { contractorById, contractors, money, type Contractor, type Milestone, type Project } from "../lib/demo";
import { useDemo } from "./providers";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const links = [["/", "Discover"], ["/inspiration", "Inspiration"], ["/shortlist", "Shortlist"], ["/projects/TRU-DEMO-2183", "Project"]];
  return <>
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand"><span className="brand-mark"><ShieldCheck size={18} /></span><span>trustible</span></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">{links.map(([href, label]) => <Link key={href} href={href} className={pathname === href ? "active" : ""}>{label}</Link>)}</nav>
        <div className="header-actions"><Link href="/contractor/dashboard" className="role-link">For contractors</Link><Button label="Get started" variant="primary" size="sm" href="/" /></div>
      </div>
    </header>
    <main>{children}</main>
    <footer className="site-footer"><div className="shell footer-grid"><div><div className="brand footer-brand"><span className="brand-mark"><ShieldCheck size={17} /></span><span>trustible</span></div><p>Hire with proof, not luck.</p></div><div><strong>Explore</strong><Link href="/">Find a contractor</Link><Link href="/inspiration">Inspiration</Link><Link href="/shortlist">Shortlist</Link></div><div><strong>For professionals</strong><Link href="/contractor/onboarding">Join Trustible</Link><Link href="/contractor/dashboard">Contractor dashboard</Link></div><div><strong>Prototype note</strong><p>This is a product simulation. Protected payment is not live custody.</p></div></div></footer>
  </>;
}

export function PageIntro({ eyebrow, title, copy, action }: { eyebrow?: string; title: string; copy?: string; action?: React.ReactNode }) {
  return <div className="page-intro"><div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<Heading level={1} type="display-2">{title}</Heading>{copy && <Text type="body" color="secondary">{copy}</Text>}</div>{action}</div>;
}

export function StatusBadge({ label, variant = "neutral" }: { label: string; variant?: "neutral" | "info" | "success" | "warning" | "error" | "blue" | "teal" | "green" | "orange" | "purple" }) { return <Badge label={label} variant={variant} />; }

export function ContractorCard({ contractor, compact = false }: { contractor: Contractor; compact?: boolean }) {
  const { state, dispatch } = useDemo();
  const shortlisted = state.shortlisted.includes(contractor.id);
  return <Card className={`contractor-card ${compact ? "compact" : ""}`} padding={0}>
    <div className={`contractor-cover cover-${contractor.id}`}><span className="cover-label">{contractor.specialty}</span></div>
    <div className="card-content"><div className="card-title-row"><div className="avatar">{contractor.avatar}</div><div><Heading level={3}>{contractor.name}</Heading><Text type="supporting" color="secondary">{contractor.area} · {contractor.response}</Text></div><button className={`save-button ${shortlisted ? "saved" : ""}`} onClick={() => dispatch({ type: "toggle_shortlist", id: contractor.id })} aria-label={`${shortlisted ? "Remove" : "Add"} ${contractor.name} ${shortlisted ? "from" : "to"} shortlist`}>{shortlisted ? "★" : "☆"}</button></div>
      <p>{contractor.summary}</p><div className="stat-row"><span><Star size={15} fill="currentColor" /> {contractor.rating} <small>({contractor.reviews})</small></span><span><Check size={15} /> {contractor.projects} completed</span></div><div className="tag-row">{contractor.tags.slice(0, compact ? 2 : 3).map((tag) => <span key={tag} className="tag">{tag}</span>)}</div><div className="card-actions"><Link className="button button-secondary" href={`/contractors/${contractor.id}`}>View profile <ArrowRight size={15} /></Link><Link className="button button-primary" href={`/quotes/${contractor.id}`}>Request quote</Link></div></div>
  </Card>;
}

export function TrustStrip() { return <section className="trust-strip"><div className="shell trust-grid"><div><ShieldCheck /><strong>Verified work</strong><span>Reviews tied to completed projects</span></div><div><WalletCards /><strong>Milestone clarity</strong><span>Agree, fund and release by stage</span></div><div><CircleHelp /><strong>Human support</strong><span>A clear path when work goes sideways</span></div></div></section>; }

export function Metric({ value, label }: { value: string; label: string }) { return <div className="metric"><strong>{value}</strong><span>{label}</span></div>; }

export function MilestoneRow({ project, milestone, role = "homeowner" }: { project: Project; milestone: Milestone; role?: "homeowner" | "contractor" }) {
  const { dispatch } = useDemo();
  const next = milestone.status === "funded" || milestone.status === "pending" ? "fund" : milestone.status;
  return <div className="milestone-row"><div className={`milestone-dot ${milestone.status}`}><Check size={14} /></div><div className="milestone-main"><div className="milestone-heading"><div><strong>{milestone.label}</strong><span>{money(milestone.amount)}</span></div><StatusBadge label={milestone.status} variant={milestone.status === "approved" || milestone.status === "refunded" ? "success" : milestone.status === "disputed" ? "error" : milestone.status === "submitted" ? "info" : "neutral"} /></div><p>{milestone.evidence ?? "No evidence submitted yet."}</p>{role === "homeowner" && milestone.status === "submitted" && <div className="inline-actions"><Button label="Approve & release" variant="primary" size="sm" onClick={() => dispatch({ type: "approve_milestone", projectId: project.id, milestoneId: milestone.id })} /><Button label="Open dispute" variant="destructive" size="sm" onClick={() => dispatch({ type: "dispute_milestone", projectId: project.id, milestoneId: milestone.id })} /></div>}{role === "contractor" && (milestone.status === "funded" || milestone.status === "pending") && <Button label="Submit evidence" variant="secondary" size="sm" onClick={() => dispatch({ type: "submit_evidence", projectId: project.id, milestoneId: milestone.id })} />}{role === "homeowner" && milestone.status === "disputed" && <Button label="Resolve with refund" variant="destructive" size="sm" onClick={() => dispatch({ type: "resolve_dispute", projectId: project.id, milestoneId: milestone.id })} />}</div></div>;
}

export function EmptyState({ title, copy, href, action }: { title: string; copy: string; href?: string; action?: string }) { return <Card className="empty-state"><Sparkles size={22} /><Heading level={3}>{title}</Heading><Text color="secondary">{copy}</Text>{href && <Link className="button button-primary" href={href}>{action ?? "Continue"}</Link>}</Card>; }

export { contractors, contractorById, House, Compass, FileText };
