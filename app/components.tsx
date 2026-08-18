"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Badge } from "@astryxdesign/core/Badge";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { EmptyState as AstryxEmptyState } from "@astryxdesign/core/EmptyState";
import { Heading } from "@astryxdesign/core/Heading";
import { Link as AstryxLink } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import { TopNav, TopNavHeading, TopNavItem } from "@astryxdesign/core/TopNav";
import { MobileNav } from "@astryxdesign/core/MobileNav";
import { ArrowRight, Check, CircleHelp, Compass, FileText, House, Menu, ShieldCheck, Sparkles, Star, WalletCards } from "lucide-react";
import { contractorById, contractors, money, type Contractor, type Milestone, type Project } from "../lib/demo";
import { useDemo } from "./providers";

const navLinks = [["/", "Discover"], ["/inspiration", "Inspiration"], ["/shortlist", "Shortlist"], ["/projects/TRU-DEMO-2183", "Project"]] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = navLinks.map(([href, label]) => <TopNavItem key={href} href={href} label={label} isSelected={pathname === href} />);
  return <>
    <TopNav className="site-header" label="Trustible primary navigation"
      heading={<TopNavHeading heading="trustible" headingHref="/" logo={<span className="brand-mark"><ShieldCheck size={17} /></span>} />}
      startContent={<div className="desktop-nav">{navItems}</div>}
      endContent={<div className="header-actions"><AstryxLink className="role-link" href="/contractor/dashboard" isStandalone color="accent">For contractors</AstryxLink><Button className="mobile-toggle" label="Open navigation" variant="ghost" size="sm" isIconOnly icon={<Menu size={18} />} onClick={() => setMobileOpen(true)} /><Button label="Get started" variant="primary" size="sm" href="/" /></div>}
    />
    <MobileNav isOpen={mobileOpen} onOpenChange={setMobileOpen} header="Trustible" label="Mobile navigation">{navItems}</MobileNav>
    <main>{children}</main>
    <footer className="site-footer"><div className="shell footer-grid"><div><AstryxLink className="footer-brand" href="/" display="block" weight="bold"><span className="brand-mark"><ShieldCheck size={15} /></span> trustible</AstryxLink><Text color="secondary">Hire with proof, not luck.</Text></div><div><Text weight="bold" display="block">Explore</Text><AstryxLink href="/" display="block" color="secondary">Find a contractor</AstryxLink><AstryxLink href="/inspiration" display="block" color="secondary">Inspiration</AstryxLink><AstryxLink href="/shortlist" display="block" color="secondary">Shortlist</AstryxLink></div><div><Text weight="bold" display="block">For professionals</Text><AstryxLink href="/contractor/onboarding" display="block" color="secondary">Join Trustible</AstryxLink><AstryxLink href="/contractor/dashboard" display="block" color="secondary">Contractor dashboard</AstryxLink></div><div><Text weight="bold" display="block">Prototype note</Text><Text color="secondary">This is a product simulation. Protected payment is not live custody.</Text></div></div></footer>
  </>;
}
export function PageIntro({ eyebrow, title, copy, action }: { eyebrow?: string; title: string; copy?: string; action?: React.ReactNode }) {
  return <div className="page-intro"><div>{eyebrow && <Text className="eyebrow" type="supporting" weight="bold">{eyebrow}</Text>}<Heading level={1} type="display-2">{title}</Heading>{copy && <Text type="body" color="secondary" display="block">{copy}</Text>}</div>{action}</div>;
}

export function StatusBadge({ label, variant = "neutral" }: { label: string; variant?: "neutral" | "info" | "success" | "warning" | "error" | "blue" | "teal" | "green" | "orange" | "purple" }) { return <Badge label={label} variant={variant} />; }

export function ContractorCard({ contractor, compact = false }: { contractor: Contractor; compact?: boolean }) {
  const { state, dispatch } = useDemo();
  const shortlisted = state.shortlisted.includes(contractor.id);
  return <Card className={`contractor-card ${compact ? "compact" : ""}`} padding={0} elevation="low">
    <div className={`contractor-cover cover-${contractor.id}`}><Text className="cover-label" type="supporting" weight="bold">{contractor.specialty}</Text></div>
    <div className="card-content"><div className="card-title-row"><div className="avatar">{contractor.avatar}</div><div><Heading level={3}>{contractor.name}</Heading><Text type="supporting" color="secondary">{contractor.area} · {contractor.response}</Text></div><Button label={`${shortlisted ? "Remove" : "Add"} ${contractor.name} ${shortlisted ? "from" : "to"} shortlist`} variant="ghost" isIconOnly icon={<Star size={18} fill={shortlisted ? "currentColor" : "none"} />} onClick={() => dispatch({ type: "toggle_shortlist", id: contractor.id })} /></div>
      <Text color="secondary" display="block">{contractor.summary}</Text><div className="stat-row"><Text type="supporting" color="accent"><Star size={14} fill="currentColor" /> {contractor.rating} <small>({contractor.reviews})</small></Text><Text type="supporting" color="accent"><Check size={14} /> {contractor.projects} completed</Text></div><div className="tag-row">{contractor.tags.slice(0, compact ? 2 : 3).map((tag) => <span key={tag} className="tag">{tag}</span>)}</div><div className="card-actions"><Button label="View profile" variant="secondary" href={`/contractors/${contractor.id}`} endContent={<ArrowRight size={14} />} /><Button label="Request quote" variant="primary" href={`/quotes/${contractor.id}`} /></div></div>
  </Card>;
}

export function TrustStrip() { return <section className="trust-strip"><div className="shell trust-grid"><Card variant="transparent" padding={2}><ShieldCheck /><Text weight="bold" display="block">Verified work</Text><Text type="supporting" color="secondary">Reviews tied to completed projects</Text></Card><Card variant="transparent" padding={2}><WalletCards /><Text weight="bold" display="block">Milestone clarity</Text><Text type="supporting" color="secondary">Agree, fund and release by stage</Text></Card><Card variant="transparent" padding={2}><CircleHelp /><Text weight="bold" display="block">Human support</Text><Text type="supporting" color="secondary">A clear path when work goes sideways</Text></Card></div></section>; }

export function Metric({ value, label }: { value: string; label: string }) { return <div className="metric"><Text type="large" weight="bold" display="block">{value}</Text><Text type="supporting" color="secondary" display="block">{label}</Text></div>; }

export function MilestoneRow({ project, milestone, role = "homeowner" }: { project: Project; milestone: Milestone; role?: "homeowner" | "contractor" }) {
  const { dispatch } = useDemo();
  return <div className="milestone-row"><div className={`milestone-dot ${milestone.status}`}><Check size={14} /></div><div className="milestone-main"><div className="milestone-heading"><div><Text weight="bold" display="block">{milestone.label}</Text><Text type="supporting" color="secondary">{money(milestone.amount)}</Text></div><StatusBadge label={milestone.status} variant={milestone.status === "approved" || milestone.status === "refunded" ? "success" : milestone.status === "disputed" ? "error" : milestone.status === "submitted" ? "info" : "neutral"} /></div><Text type="supporting" color="secondary" display="block">{milestone.evidence ?? "No evidence submitted yet."}</Text>{role === "homeowner" && milestone.status === "submitted" && <div className="inline-actions"><Button label="Approve & release" variant="primary" size="sm" onClick={() => dispatch({ type: "approve_milestone", projectId: project.id, milestoneId: milestone.id })} /><Button label="Open dispute" variant="destructive" size="sm" onClick={() => dispatch({ type: "dispute_milestone", projectId: project.id, milestoneId: milestone.id })} /></div>}{role === "contractor" && (milestone.status === "funded" || milestone.status === "pending") && <Button label="Submit evidence" variant="secondary" size="sm" onClick={() => dispatch({ type: "submit_evidence", projectId: project.id, milestoneId: milestone.id })} />}{role === "homeowner" && milestone.status === "disputed" && <Button label="Resolve with refund" variant="destructive" size="sm" onClick={() => dispatch({ type: "resolve_dispute", projectId: project.id, milestoneId: milestone.id })} />}</div></div>;
}

export function EmptyState({ title, copy, href, action }: { title: string; copy: string; href?: string; action?: string }) { return <AstryxEmptyState className="empty-state" icon={<Sparkles size={24} />} title={title} description={copy} actions={href ? <Button label={action ?? "Continue"} variant="primary" href={href} /> : undefined} />; }

export { contractors, contractorById, House, Compass, FileText };



