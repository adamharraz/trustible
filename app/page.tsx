"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Heading } from "@astryxdesign/core/Heading";
import { ContractorCard, TrustStrip, PageIntro } from "./components";
import { contractors } from "../lib/demo";

export default function Home() {
  const [query, setQuery] = useState("");
  const [verified, setVerified] = useState(false);
  const matches = useMemo(() => contractors.filter((c) => (!verified || c.verified) && (!query || `${c.name} ${c.area} ${c.specialty}`.toLowerCase().includes(query.toLowerCase()))), [query, verified]);
  return <>
    <section className="hero"><div className="shell hero-grid"><div><div className="eyebrow">Klang Valley interior design</div><Heading level={1} type="display-1">Hire with proof, not luck.</Heading><p className="hero-copy">Trustible helps you find a contractor with verified work, make the brief clear, and move through payment milestones with fewer surprises.</p><div className="hero-actions"><Link className="button button-primary" href="#directory">Find your match</Link><Link className="button button-secondary" href="/inspiration">Browse inspiration</Link></div><div className="pill-row"><span className="verified-line">● 38 verified studios</span><span className="tag">Prototype · Klang Valley</span></div></div><div className="hero-art"><div className="hero-note"><strong>Trust signal</strong><span>Review linked to a paid project</span></div></div></div></section>
    <TrustStrip />
    <section className="section" id="directory"><div className="shell"><PageIntro eyebrow="Start with the shortlist" title="A calmer way to compare" copy="Every profile is structured around the decisions that matter: fit, proof, budget and what happens after you say yes." action={<Link className="button button-secondary" href="/shortlist">View shortlist →</Link>} /><div className="filters"><input aria-label="Search contractors" placeholder="Search studio, area or specialty" value={query} onChange={(e) => setQuery(e.target.value)} /><select aria-label="Budget"><option>Any budget</option><option>Under RM100k</option><option>RM100k–RM200k</option><option>RM200k+</option></select><button className={`button ${verified ? "button-primary" : "button-secondary"}`} onClick={() => setVerified(!verified)}>✓ Verified only</button></div><div className="contractor-grid">{matches.slice(0, 6).map((contractor) => <ContractorCard key={contractor.id} contractor={contractor} />)}</div>{matches.length === 0 && <p>No studios match that search yet.</p>}</div></section>
    <section className="section" style={{ background: "#fff", borderTop: "1px solid #dce6ea" }}><div className="shell"><div className="section-heading"><div><div className="eyebrow">Designed for confidence</div><Heading level={2}>The trust flywheel</Heading><p>Proof makes the next decision easier, for both sides of the marketplace.</p></div><Link className="button button-secondary" href="/projects/TRU-DEMO-2183">See the project workspace</Link></div><div className="trust-grid"><div className="surface-card"><strong>01 · Verify</strong><p>Identity, business and project evidence create a useful baseline.</p></div><div className="surface-card"><strong>02 · Agree</strong><p>A clear brief and milestone quote make expectations visible.</p></div><div className="surface-card"><strong>03 · Complete</strong><p>Evidence and releases turn a completed project into durable proof.</p></div></div></div></section>
  </>;
}

