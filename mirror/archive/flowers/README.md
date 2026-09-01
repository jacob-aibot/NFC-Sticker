# flowers/

Pre-rendered flower-growth video assets for the featured-flower experience.
One species per set of three files: `<slug>.mp4`, `<slug>-poster.jpg`,
`<slug>-final.jpg`. Only ever fetched on that species' own day (see
`initPeonyVideo` in `mirror/index.html`).

## peony.* — PLACEHOLDER, not the final asset

`peony.mp4`/`peony-poster.jpg`/`peony-final.jpg` are a synthetic stand-in
(a soft growing blur, visibly labeled "PLACEHOLDER — NOT FINAL ASSET" baked
into the frame) used only to build and test the video pipeline end-to-end —
preload timing, autoplay policy compliance, poster/final-frame handoff,
graceful failure, layout at real iPhone sizes. It is NOT an attempt at the
real Peony video.

To replace it with the real asset: generate per the spec in the project
notes (AI-video prompt, duration ~4s, 4:5 portrait, dark/near-#211823
background, static locked camera, Peony bud → full bloom), then:

1. Export the final clip as H.264 MP4 → save as `peony.mp4` here.
2. Export its first frame as a JPEG → save as `peony-poster.jpg`.
3. Export its last frame (or a matching high-res still) as a JPEG →
   save as `peony-final.jpg`.

Same three filenames, dropped in place — no code changes needed.
