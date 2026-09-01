# Flower video generation spec

The reusable visual specification for the featured-flower video assets,
established now (Peony proof of concept) so the eventual ~30 species read
as one coherent collection rather than 30 unrelated clips.

## Recommended tool/workflow

An AI text/image-to-video generator, not a 3D pipeline — this matches how
`ref1` (the reference video that set the realism bar) was itself made, and
it's the fastest way to test whether this whole direction is worth the
eventual 30-species investment before committing to anything heavier.

Any current-generation diffusion video model capable of ~5-10s generations
with strong prompt adherence for organic transformation works: **Kling AI**
is a reasonable default (this exact "blooming flower timelapse" genre is
one of its well-covered use cases, and duration/aspect controls are
straightforward); Runway Gen-4 or Luma Ray2 are comparable alternatives.
Expect to generate several candidates per species and pick the best — AI
video is not one-shot-reliable, budget for iteration.

## Peony — exact generation prompt

> A single peony flower blooming in a smooth, continuous timelapse.
> Extreme close-up, pure black background. The scene starts with a tight,
> closed pink peony bud on a slightly curved stem with two leaves. The bud
> slowly swells, its outer sepals peel back and open, then densely layered
> soft pink and blush petals unfurl and curl outward in one continuous,
> organic motion — no jump cuts, no disconnected in-between states. Petals
> catch soft directional light from the upper left, casting gentle shadows
> between petal layers for real volumetric depth. The flower settles into
> a full, lush, naturally-asymmetric bloom and holds still. Camera is
> locked static, no pan or zoom. Cinematic, photorealistic botanical
> macro photography, shallow depth of field, dark and moody, romantic
> mood. No text, no watermark, no hands, no other flowers in frame.

## Settings

| | |
|---|---|
| Duration | Generate 4–5s; trim to a clean ~3.5–4.5s final clip |
| Aspect ratio | 4:5 portrait (matches the page's video container) |
| Resolution | Generator's max available; downscale in post to ~780×975 for delivery |
| Frame rate | 24–30fps (60fps buys nothing here) |
| Camera | **Static/locked** — explicitly prompt against movement. `ref2` used a push-in reveal, which looked great once, but a moving camera is one more variable that's hard to hold consistent across 30 independently-generated species; our page composition doesn't need it either |
| Background | Prompt "pure black" — don't expect the generator to hit the page's exact `#211823` ink color; that's a post-production color-grade pass, not a generation setting |
| Lighting | Soft directional key light, upper-left; warm-leaning grade (sits closer to the page's `--accent` amber than to `ref1`'s hyper-saturated blue/magenta look, which reads more dramatic than romantic — steer away from that for Peony specifically) |
| Start state | Closed bud, on-stem, leaves visible |
| End state | Full bloom, static hold for at least the last ~0.5s — gives a clean frame to export as the final still |

## Post-production pipeline (same for every species)

1. Crop/pad to 4:5.
2. Color-grade the background toward `#211823` (the page's `--ink`).
3. Trim to a clean start and end (cut any generation warm-up/cool-down
   frames that don't belong in the "grows in" moment).
4. Export:
   - `H.264 MP4`, `-crf 20` to `-23`, `-movflags +faststart` — dark/soft-gradient
     content compresses worse than typical footage, so check for banding
     at the target CRF rather than trusting a bitrate guess.
   - First frame → `<slug>-poster.jpg`
   - Last frame (or a matching high-res still) → `<slug>-final.jpg`
5. Drop all three into `mirror/flowers/` using the naming convention
   `<slug>.mp4` / `<slug>-poster.jpg` / `<slug>-final.jpg` — the page reads
   these paths directly (see `flowerVideoAssets()` in `mirror/index.html`),
   so no code changes are needed to swap in a real asset.

## For the real Peony asset specifically

Replace, at these exact paths (currently a labeled synthetic placeholder —
see `mirror/flowers/README.md`):

- `mirror/flowers/peony.mp4`
- `mirror/flowers/peony-poster.jpg`
- `mirror/flowers/peony-final.jpg`

## Scaling to the other ~29 species later

- Keep everything above identical across species — aspect ratio,
  resolution, duration range, locked camera, black-background convention,
  post-production steps. That consistency is what will make the eventual
  collection read as one thing rather than 30 unrelated clips.
- Per species, only the prompt's *content* changes: bud shape/color,
  petal color/count/form, bloom size, and (if genuinely necessary — e.g.
  an orchid's bilateral structure opens differently than a peony's radial
  one) a short note on how that species' opening motion differs. Keep the
  prompt *structure* the same: start state → bud swells → opens → petals
  unfold with lighting/depth → settles → static hold.
- Update this file as species are added, so it stays the one place that
  defines "what a Morning Mirror flower video looks like."
