import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { PageIntro } from "../components";
import { inspiration } from "../../lib/demo";

export default function InspirationPage() { return <section className="page"><div className="shell"><PageIntro eyebrow="Inspiration feed" title="Save the feeling before you write the brief." copy="A visual starting point for conversations between homeowners and studios. Auto-pull is deferred; this feed is curated for the prototype." action={<Button label="Find a contractor" variant="primary" href="/" />} /><div className="inspiration-grid">{inspiration.map((item) => <Card key={item.id} className={`inspiration-card bg-${item.color}`} padding={3}><div><Text className="mini-label" type="supporting" weight="bold">{item.tag}</Text><Heading level={3}>{item.title}</Heading></div><Text color="secondary" display="block">{item.copy}</Text><Text weight="bold">{item.studio} ↗</Text></Card>)}</div></div></section>; }
