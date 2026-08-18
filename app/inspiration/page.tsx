"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@astryxdesign/core/Badge";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { Link as AstryxLink } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import { Bookmark, BookmarkCheck, ChevronDown, ChevronUp, ExternalLink, MapPin, Quote, Sparkles } from "lucide-react";
import { contractorById, inspiration, type InspirationItem } from "../../lib/demo";
import { useDemo } from "../providers";
import { EmptyState, PageIntro } from "../components";

const categories = ["For you", ...Array.from(new Set(inspiration.map((item) => item.category)))];

function formatSaves(value: number) {
  return value > 999 ? `${(value / 1000).toFixed(1)}k` : value.toString();
}

export default function InspirationPage() {
  const { state, dispatch } = useDemo();
  const [activeCategory, setActiveCategory] = useState("For you");
  const [activeIndex, setActiveIndex] = useState(0);
  const feedRef = useRef<HTMLDivElement | null>(null);
  const postRefs = useRef<Array<HTMLElement | null>>([]);
  const visibleItems = useMemo(() => {
    if (activeCategory === "Saved") return inspiration.filter((item) => state.savedInspirationIds.includes(item.id));
    if (activeCategory === "For you") return inspiration;
    return inspiration.filter((item) => item.category === activeCategory);
  }, [activeCategory, state.savedInspirationIds]);

  const filterCategories = ["For you", "Saved", ...categories.slice(1)];

  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    const root = feedRef.current;
    if (!root || !visibleItems.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = Number((visible.target as HTMLElement).dataset.index);
      if (!Number.isNaN(index)) setActiveIndex(index);
    }, { root, threshold: [0.55, 0.75] });
    postRefs.current.slice(0, visibleItems.length).forEach((post) => post && observer.observe(post));
    return () => observer.disconnect();
  }, [visibleItems.length, activeCategory]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.key === "ArrowDown" || event.key === "ArrowUp")) return;
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) return;
      event.preventDefault();
      const nextIndex = event.key === "ArrowDown" ? Math.min(activeIndex + 1, visibleItems.length - 1) : Math.max(activeIndex - 1, 0);
      postRefs.current[nextIndex]?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, visibleItems.length]);

  const savedCount = state.savedInspirationIds.length;

  return <section className="page inspiration-page">
    <div className="shell">
      <PageIntro eyebrow="Inspiration feed" title="Save the feeling, then find the people who can build it." copy="A living stream of real project references from Trustible studios. Scroll, save what fits, and turn a visual cue into a brief." action={<Button label="Find a contractor" variant="primary" href="/" endContent={<Quote size={15} />} />} />
      <div className="inspiration-layout">
        <aside className="inspiration-side inspiration-side-left" aria-label="Inspiration filters">
          <Card className="inspiration-side-card" padding={1} elevation="low">
            <div className="inspiration-side-heading"><Text type="supporting" weight="bold" color="secondary">Browse</Text><Badge label={`${inspiration.length} posts`} variant="neutral" /></div>
            <div className="inspiration-category-list">
              {filterCategories.map((category) => <Button key={category} label={`${category}${category === "Saved" ? ` (${savedCount})` : ""}`} variant={activeCategory === category ? "primary" : "ghost"} size="sm" onClick={() => setActiveCategory(category)} />)}
            </div>
          </Card>
          <Card className="inspiration-side-card inspiration-side-note" padding={1} elevation="low">
            <Sparkles size={17} /><Text weight="bold" display="block">A useful rabbit hole</Text><Text type="supporting" color="secondary">Save references that describe how you want a home to feel. We will carry them into your next brief.</Text>
          </Card>
        </aside>

        <div className="inspiration-feed-scroll" ref={feedRef} aria-label="Inspiration feed">
          <div className="inspiration-feed-head"><Text type="supporting" weight="bold" color="secondary">{activeCategory} · {visibleItems.length ? activeIndex + 1 : 0}/{visibleItems.length}</Text><Text type="supporting" color="secondary">Use ↑ ↓ to move</Text></div>
          {!visibleItems.length ? <Card className="inspiration-empty-card" padding={2} elevation="low"><EmptyState title="Nothing saved here yet" copy="Tap the bookmark on a post to build a private collection of references." action="Back to For you" /></Card> : <>
            {visibleItems.map((item, index) => <InspirationPost key={item.id} item={item} index={index} saved={state.savedInspirationIds.includes(item.id)} postRef={(element) => { postRefs.current[index] = element; }} onToggleSave={() => dispatch({ type: "toggle_inspiration_save", id: item.id })} />)}
            <Card className="inspiration-end-card" padding={2} elevation="low"><Badge label="End of this set" variant="teal" /><Heading level={3}>Ready to make one of these yours?</Heading><Text color="secondary">Start with a studio profile, or send a structured quote request when the direction feels clear.</Text><div className="inspiration-end-actions"><Button label="Explore studios" variant="primary" href="/" /><Button label="View shortlist" variant="secondary" href="/shortlist" /></div></Card>
          </>}
        </div>

        <aside className="inspiration-side inspiration-side-right" aria-label="Inspiration actions">
          <Card className="inspiration-side-card inspiration-save-summary" padding={1} elevation="low"><Text type="supporting" weight="bold" color="secondary">Your collection</Text><Heading level={2}>{savedCount}</Heading><Text type="supporting" color="secondary">saved reference{savedCount === 1 ? "" : "s"}</Text><Button label="Show saved" variant="secondary" size="sm" onClick={() => setActiveCategory("Saved")} /></Card>
          <Card className="inspiration-side-card inspiration-side-note" padding={1} elevation="low"><Text weight="bold" display="block">Keep the context</Text><Text type="supporting" color="secondary">Each post links back to the studio, location and original photo credit.</Text></Card>
        </aside>
      </div>
    </div>
  </section>;
}

function InspirationPost({ item, index, saved, postRef, onToggleSave }: { item: InspirationItem; index: number; saved: boolean; postRef: (element: HTMLElement | null) => void; onToggleSave: () => void }) {
  const contractor = contractorById(item.contractorId);
  const totalSaves = item.saveCount + (saved ? 1 : 0);
  return <article className="inspiration-post" data-index={index} ref={postRef}>
    <Card className="inspiration-post-card" padding={0} elevation="low">
      <div className="inspiration-media"><img src={item.image} alt={item.alt} loading={index < 2 ? "eager" : "lazy"} decoding="async" /></div>
      <div className="inspiration-post-body">
        <div className="inspiration-post-meta"><Badge label={item.category} variant="blue" /><Text type="supporting" color="secondary"><MapPin size={13} /> {item.tag}</Text></div>
        <Heading level={2}>{item.title}</Heading>
        <Text color="secondary" display="block">{item.copy}</Text>
        <div className="inspiration-post-footer">
          <div className="inspiration-studio-line"><div className="avatar">{contractor.avatar}</div><div><Text weight="bold" display="block">{contractor.studio}</Text><Text type="supporting" color="secondary">{contractor.verified ? "Verified studio" : "Trustible studio"} · {contractor.response}</Text></div></div>
          <div className="inspiration-feed-actions"><div className="inspiration-save-action"><Button label={saved ? `Remove ${item.title} from saved` : `Save ${item.title}`} variant={saved ? "primary" : "ghost"} size="sm" isIconOnly icon={saved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />} onClick={onToggleSave} /><Text type="supporting" color="secondary">{formatSaves(totalSaves)} saves</Text></div><Button label="View studio" variant="secondary" size="sm" href={`/contractors/${contractor.id}`} endContent={<ExternalLink size={13} />} /><Button label="Request quote" variant="primary" size="sm" href={`/quotes/${contractor.id}`} /></div>
        </div>
        <AstryxLink className="inspiration-credit" href={item.sourceUrl} target="_blank" rel="noreferrer" color="secondary">Photo reference · {item.credit}</AstryxLink>
      </div>
    </Card>
  </article>;
}