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
