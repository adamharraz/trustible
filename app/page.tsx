"use client";

import { useMemo, useState } from "react";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { Selector } from "@astryxdesign/core/Selector";
import { Text } from "@astryxdesign/core/Text";
import { TextInput } from "@astryxdesign/core/TextInput";
import { ContractorCard, EmptyState, PageIntro, TrustStrip } from "./components";
import { contractors } from "../lib/demo";

export default function Home() {
  const [query, setQuery] = useState("");
  const [budget, setBudget] = useState("Any budget");
  const [verified, setVerified] = useState(false);
  const matches = useMemo(() => contractors.filter((c) => (!verified || c.verified) && (!query || `${c.name} ${c.area} ${c.specialty}`.toLowerCase().includes(query.toLowerCase()))), [query, verified]);
  return <>
    <section className="hero"><div className="shell hero-grid"><div><Text className="eyebrow" type="supporting" weight="bold">Klang Valley interior design</Text><Heading level={1} type="display-1">Hire with proof, not luck.</Heading><Text className="hero-copy" type="large" color="secondary" display="block">Trustible helps you find a contractor with verified work, make the brief clear, and move through payment milestones with fewer surprises.</Text><div className="hero-actions"><Button label="Find your match" variant="primary" href="#directory" /><Button label="Browse inspiration" variant="secondary" href="/inspiration" /></div><div className="pill-row"><Text type="supporting" color="accent">● 38 verified studios</Text><span className="tag">Prototype · Klang Valley</span></div></div><Card className="hero-art" padding={0} elevation="high"><div className="hero-note"><Text weight="bold" display="block">Trust signal</Text><Text type="supporting" color="secondary">Review linked to a paid project</Text></div></Card></div></section>
    <TrustStrip />
    <section className="section" id="directory"><div className="shell"><PageIntro eyebrow="Start with the shortlist" title="A calmer way to compare" copy="Every profile is structured around the decisions that matter: fit, proof, budget and what happens after you say yes." action={<Button label="View shortlist" variant="secondary" href="/shortlist" />} /><Card className="filters" padding={2}><TextInput label="Search contractors" isLabelHidden value={query} onChange={setQuery} placeholder="Search studio, area or specialty" width="100%" /><Selector label="Budget" options={["Any budget", "Under RM100k", "RM100k–RM200k", "RM200k+"]} value={budget} onChange={setBudget} /><Button label={verified ? "Verified studios only" : "Verified only"} variant={verified ? "primary" : "secondary"} onClick={() => setVerified(!verified)} /></Card><div className="contractor-grid">{matches.slice(0, 6).map((contractor) => <ContractorCard key={contractor.id} contractor={contractor} />)}</div>{matches.length === 0 && <EmptyState title="No studios match that search" copy="Try a broader area, specialty, or budget." href="#directory" action="Reset search" />}</div></section>
    <section className="section section-surface"><div className="shell"><div className="section-heading"><div><Text className="eyebrow" type="supporting" weight="bold">Designed for confidence</Text><Heading level={2}>The trust flywheel</Heading><Text color="secondary" display="block">Proof makes the next decision easier, for both sides of the marketplace.</Text></div><Button label="See the project workspace" variant="secondary" href="/projects/TRU-DEMO-2183" /></div><div className="trust-grid"><Card><Text weight="bold">01 · Verify</Text><Text color="secondary" display="block">Identity, business and project evidence create a useful baseline.</Text></Card><Card><Text weight="bold">02 · Agree</Text><Text color="secondary" display="block">A clear brief and milestone quote make expectations visible.</Text></Card><Card><Text weight="bold">03 · Complete</Text><Text color="secondary" display="block">Evidence and releases turn a completed project into durable proof.</Text></Card></div></div></section>
  </>;
}
