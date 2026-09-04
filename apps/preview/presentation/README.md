# Authored preview compositions

These examples compose the pinned catalogue primitives without modifying their
redistributed implementation or provenance. Both preview hosts use this map
before the generated upstream demo map. Imports may regenerate vendor-root;
these files remain owned by Rendyn.

Media demos use locally bundled sample photographs, reused from the URLs in
`vendor-root/components/previews/blocks/infinite-masonry.preview.tsx`:

- landscape.jpg: https://images.unsplash.com/photo-1500530855697-b586d89ba3ee
- architecture.jpg: https://images.unsplash.com/photo-1511818966892-d7d671e672a2
- studio.jpg: https://images.unsplash.com/photo-1497366754035-f200968a6e72

Photos are demo assets, not part of the components' MIT source distribution.
Stories demonstrates the library's image-story composition; selecting a story
opens an accessible image dialog. Subscribe changes local demo state only.

The Stories video variant uses four-second, silent WebM loops made from these
same photographs (a subtle pan/zoom), encoded with VP9 at 360 x 500, 24 fps.
They exercise the real StoryVideo component without external sample hosts or
proprietary video codecs. They are demonstration assets, not editorial footage.

`examples.ts` exposes the pinned registry's named examples to the web detail
page. The iframe route selects from that component's list; unknown variant
parameters fall back to its first example.
