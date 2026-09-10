# Archive

## peony-svg-checkpoint.html

The full procedural SVG + Anime.js Peony "bud → bloom" prototype, checkpointed
here before the switch to a pre-rendered-video architecture for the featured
flower (see project history for the reasoning: the realism target set by the
reference videos — dimensional petals, continuous organic deformation,
real lighting/depth — is not reachable with flat vector shapes, no matter
how much the choreography is refined).

This is not dead code being kept out of sentimentality — it's a real,
working alternative if the video approach doesn't pan out, or a reference
for choreography/timing ideas (the continuity fixes, the leaf 3D-pose
technique adapted from a reference repo, the true path-morphing petals)
if a future SVG-based species ever needs them.

To view it standalone: serve the `mirror/` directory (it loads
`../vendor/anime.min.js`) and open `archive/peony-svg-checkpoint.html`
directly — it's a fully self-contained page, not wired into the live
`/mirror/` rotation.

## peony-video-prototype.html + flowers/

A working proof of concept for a pre-rendered-video featured-flower
architecture (video + poster + final-frame image, dynamic per-day
preload, graceful failure, cross-fade handoff) — explored after
`peony-svg-checkpoint.html`, then set aside: the project reconsidered the
photorealism goal itself rather than the SVG-vs-video question, and
returned to SVG/Anime.js with a deliberately simplified animation
philosophy (see the live `mirror/index.html` and its own code comments).

`flowers/peony.mp4` / `peony-poster.jpg` / `peony-final.jpg` are a
synthetic placeholder (see `flowers/README.md`), never a real generated
asset. `flowers/GENERATION-SPEC.md` is a real, reusable AI-video
generation spec (prompt, negative prompt, settings, post-production
pipeline) written for this architecture — kept here in case pre-rendered
video is revisited later, since that spec work doesn't go stale just
because the architecture isn't live right now.

To view standalone: serve `mirror/` and open
`archive/peony-video-prototype.html` directly — it loads
`../vendor/anime.min.js` and `flowers/...` (both resolve correctly from
inside `archive/`).
