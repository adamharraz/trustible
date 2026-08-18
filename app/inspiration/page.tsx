import Link from "next/link";
import { Heading } from "@astryxdesign/core/Heading";
import { PageIntro } from "../components";
import { inspiration } from "../../lib/demo";
export default function InspirationPage(){ return <section className="page"><div className="shell"><PageIntro eyebrow="Inspiration feed" title="Save the feeling before you write the brief." copy="A visual starting point for conversations between homeowners and studios. Auto-pull is deferred; this feed is curated for the prototype." action={<Link className="button button-primary" href="/">Find a contractor</Link>} /><div className="inspiration-grid">{inspiration.map((item)=><article key={item.id} className={`inspiration-card bg-${item.color}`}><div><span className="mini-label">{item.tag}</span><Heading level={3}>{item.title}</Heading></div><p>{item.copy}</p><strong>{item.studio} ↗</strong></article>)}</div></div></section>; }

