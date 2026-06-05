# Nixtio Reference Extraction

Reference reviewed in Microsoft Edge via Computer Use on 2026-05-16. Playwright and native `screencapture` were blocked by macOS sandbox process/display permissions, so visual evidence came from live Edge screenshots returned by Computer Use plus downloaded Framer HTML/CSS in `qa/reference/nixtio.html`.

## Layout Map

- Rounded full-viewport hero frame with a dark media surface, white border, oversized brand wordmark, sparse nav, and a small rounded CTA.
- Header starts integrated into the hero and becomes a floating white pill over later dark/white sections.
- The page alternates dark and white full-screen bands with large quiet gaps before content resolves.
- Featured work uses oversized horizontal visual panels, clipped by the viewport while scrolling.
- Services use numbered accordion rows with a large centered section title, thin dividers, right-side expand controls, and compact pill tags.
- Footer/contact is a strong final CTA moment rather than a dense sitemap.

## Animation Map

- Smooth scroll feel with delayed section reveals.
- Hero media and wordmark appear masked and layered.
- Section transitions include blank-space pauses, then content easing into view.
- Row hover states expand detail and change contrast without loud color.
- Buttons use pill geometry with scale/contrast feedback.
- Floating contact element persists near the lower-right edge.

## Typography Rules

- Inter is the dominant UI face; Fragment Mono appears in supporting technical/meta text.
- Hero type is extremely large, heavy, and tightly composed.
- Nav and CTA labels are small, clean, and low-density.
- Section titles are large but simple.
- Rows rely on number/title contrast more than paragraphs.

## Spacing Rules

- Use very large vertical whitespace.
- Keep content inside a narrow outer frame with rounded corners.
- Preserve lots of negative space around feature/work visuals.
- Avoid dense marketing cards.

## Interaction Rules

- Desktop nav is always compact and centered, with CTA offset right.
- Mobile should collapse to a compact menu.
- Service rows and work tiles should respond to hover/focus.
- Cursor/pointer details can be subtle and motion-aware.

## JD Solutions Adaptation

- Keep almost no copy: `JD Solutions`, `Software development`, `Web`, `Apps`, `Systems`, `Automation`, `Build`, `Contact`, `Perth / Remote`.
- Use original abstract textures and product-tile surfaces instead of Nixtio assets.
- Replace Nixtio case studies with abstract placeholder work labels only: `Product`, `Platform`, `Internal Tool`, `Automation`.
- Use a placeholder contact href in code only until the real JD Solutions email/domain is configured.
