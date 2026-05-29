# Gloss Kings Auto Detailing — PRD

## Original Problem Statement
> "Build a 3d landing page for a car detailing service for a company named Gloss Kings auto detailing, i attached their logo ... wow the shit out of me"

User-provided logo (black shield, gold crown, chrome "GLOSS" + gold "KINGS", glossy black BMW-style car).

## User Choices
- Services: Exterior detail / paint correction / ceramic coating + Interior deep clean / steam / leather treatment
- 3D hero: Cinematic 3D-feel scene with parallax, animated reflections, gold shimmer, rotating 3D shield logo
- Form: Simple "Request a Quote" form (name, phone, vehicle, service) saved to backend
- Contact: Phone 346-507-6085, Email Glosskings.autodetailing1012@gmail.com, Instagram @glosskings_autodetailing

## Architecture
- **Backend**: FastAPI (server.py) — POST /api/quote, GET /api/quotes, GET /api/. MongoDB collection `quotes`.
- **Frontend**: React 19 + Tailwind. Lenis smooth scroll. Framer Motion for reveals/parallax. CSS 3D transforms for shield (pivoted from R3F due to React 19 dev-mode `__source` prop issue with intrinsic three elements).
- **Routes**: Single `/` route → `Landing.jsx`.

## Persona
- **Vehicle owners in Houston** seeking premium ceramic coating, paint correction, and interior detailing.

## Implemented (2026-05-29)
- ✅ Hero with parallax background + 3D rotating shield logo + animated gold sweep + particles
- ✅ Top sticky nav (smooth-scroll links, mobile drawer)
- ✅ Services bento grid (6 cards: Ceramic, Paint Correction, Exterior, Interior Deep, Steam & Leather, King's Package)
- ✅ Process section (4 numbered steps)
- ✅ Gallery (bento image grid)
- ✅ Testimonials (3 cards + scrolling marquee)
- ✅ Quote form (POST /api/quote, success state, toast feedback)
- ✅ Footer (contact info, social, hours)
- ✅ Backend quote API with Pydantic validation
- ✅ All data-testids on interactive + critical elements

## Backlog (P1)
- Pricing tiers with hover comparison
- Before/After image slider (Reactcompareimage)
- Email notifications on quote submission (Resend integration)
- Admin dashboard for incoming quotes

## Backlog (P2)
- Calendar/date-picker booking flow
- Google Reviews live widget
- Instagram feed embed
- SEO meta + Open Graph card

## Next Tasks
- Awaiting user feedback / iteration
