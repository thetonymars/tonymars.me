import { Hero } from "./Hero"
import { Router } from "./Router"
import { ProofStrip } from "./ProofStrip"
import { About } from "./About"
import { BlogPreview } from "./BlogPreview"
import { CTASection } from "./CTASection"
import type { HomeSection } from "@/lib/site-config"

export const sectionComponents: Record<HomeSection, React.ComponentType> = {
  hero: Hero,
  router: Router,
  proof: ProofStrip,
  about: About,
  "blog-preview": BlogPreview,
  cta: CTASection,
}
