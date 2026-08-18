"use client";

import { Button } from "@astryxdesign/core/Button";
import { PageIntro, ContractorCard, EmptyState } from "../components";
import { contractorById } from "../../lib/demo";
import { useDemo } from "../providers";

export default function ShortlistPage() { const { state } = useDemo(); const items = state.shortlisted.map(contractorById); return <section className="page"><div className="shell"><PageIntro eyebrow="Your shortlist" title="Compare without losing the thread." copy="Keep a small set of studios in view, then move one into a structured brief." action={<Button label="Add a contractor" variant="primary" href="/" />} />{items.length ? <div className="contractor-grid">{items.map((c) => <ContractorCard key={c.id} contractor={c} />)}</div> : <EmptyState title="Your shortlist is empty" copy="Save a studio from Discover and it will appear here." href="/" action="Explore studios" />}</div></section>; }
