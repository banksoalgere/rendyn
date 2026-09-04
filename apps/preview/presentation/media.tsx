'use client';

import { useState, type KeyboardEvent } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Maximize2, Play, Pause } from 'lucide-react';
import { Stories, StoriesContent, Story, StoryImage, StoryOverlay, StoryAuthor, StoryAuthorName, StoryAuthorImage, StoryVideo } from '../vendor-root/components/kibo-ui/stories';
import { CarouselNext, CarouselPrevious } from '../vendor-root/components/ui/carousel';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../vendor-root/components/ui/dialog';
import { Deck, DeckCards, DeckItem, DeckEmpty } from '../vendor-root/components/kibo-ui/deck';
import { Comparison, ComparisonItem, ComparisonHandle } from '../vendor-root/components/kibo-ui/comparison';
import { ImageZoom } from '../vendor-root/components/kibo-ui/image-zoom';
import landscape from './assets/landscape.jpg';
import architecture from './assets/architecture.jpg';
import studio from './assets/studio.jpg';

// Next returns image metadata; Vite returns the bundled asset URL.
const imageUrl = (image: string | { src: string }) => typeof image === 'string' ? image : image.src;
const scenes = [
  { title: 'A slower kind of Sunday', category: 'Outside', image: imageUrl(landscape), alt: 'Open landscape in warm evening light', author: 'Alex Morgan' },
  { title: 'A different perspective', category: 'Architecture', image: imageUrl(architecture), alt: 'Sculptural architectural details', author: 'Sam Rivera' },
  { title: 'Room for a new idea', category: 'Spaces', image: imageUrl(studio), alt: 'A bright shared studio and workspace', author: 'Jamie Chen' },
];

// Short, silent photo-motion clips keep the video example self-contained.
const sampleVideos = [
  new URL('./assets/landscape.webm', import.meta.url).href,
  new URL('./assets/architecture.webm', import.meta.url).href,
  new URL('./assets/studio.webm', import.meta.url).href,
];

function VideoStory({ scene, index }: { scene: typeof scenes[number]; index: number }) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  function toggle(element: HTMLDivElement) {
    const video = element.querySelector('video');
    if (!video) return;
    setFailed(false);
    if (video.paused) void video.play().catch(() => setFailed(true));
    else video.pause();
  }
  return <Story className="demo-story" aria-label={`${playing ? 'Pause' : 'Play'} video by ${scene.author}`} aria-pressed={playing}
    onClick={(event) => toggle(event.currentTarget)}
    onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggle(event.currentTarget); } }}>
    <StoryVideo src={sampleVideos[index]} poster={scene.image} tabIndex={-1}
      onMouseOver={() => {}} onMouseOut={() => {}} onFocus={() => {}} onBlur={() => {}}
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} />
    <StoryOverlay className="demo-story-shade" />
    <span className="demo-story-play" aria-hidden="true">{playing ? <Pause size={18} /> : <Play size={18} />}</span>
    <StoryAuthor><StoryAuthorImage name={scene.author} fallback={scene.author.split(' ').map((part) => part[0]).join('')} /><StoryAuthorName>{scene.author}</StoryAuthorName></StoryAuthor>
    {failed && <span className="demo-video-error" role="status">Video unavailable. Select to retry.</span>}
  </Story>;
}

export function StoriesVideoPreview() { return <StoriesExample video />; }
export function StoriesPreview() { return <StoriesExample />; }

function StoriesExample({ video = false }: { video?: boolean }) {
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected === null ? null : scenes[selected];
  return <div className="demo-stories">
    <Stories>
      <StoriesContent>
        {scenes.map((scene, index) => video ? <VideoStory key={scene.title} scene={scene} index={index} /> :
          <Story key={scene.title} className="demo-story" onClick={() => setSelected(index)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelected(index); } }} aria-label={`Open story: ${scene.title}`}>
            <StoryImage src={scene.image} alt={scene.alt} draggable={false} />
            <StoryOverlay className="demo-story-shade" />
            <span className="demo-story-expand" aria-hidden="true"><Maximize2 size={14} /></span>
            <StoryAuthor><StoryAuthorImage name={scene.author} fallback={scene.author.split(' ').map((part) => part[0]).join('')} /><StoryAuthorName>{scene.author}</StoryAuthorName></StoryAuthor>
          </Story>)}
      </StoriesContent>
      <div className="demo-stories-footer"><p className="demo-hint">{video ? 'Select a story to play or pause.' : 'A few moments worth sharing.'}</p><div className="demo-carousel-controls"><CarouselPrevious /><CarouselNext /></div></div>
    </Stories>
    <Dialog open={active !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
      <DialogContent className="demo-story-dialog">
        {active && <><img src={active.image} alt={active.alt} /><div><DialogTitle>{active.title}</DialogTitle><DialogDescription>{active.category} · {active.author}</DialogDescription></div></>}
      </DialogContent>
    </Dialog>
  </div>;
}

export function DeckPreview() {
  const [index, setIndex] = useState(0);
  const done = index >= scenes.length;
  return <div className="demo-deck-wrap">
    <span className="demo-eyebrow">Your inspiration pile</span>
    <Deck className="demo-deck"><DeckCards currentIndex={index} onCurrentIndexChange={setIndex}>
      {scenes.map((scene) => <DeckItem key={scene.title} className="demo-deck-card"><img src={scene.image} alt={scene.alt} draggable={false} /><div><small>{scene.category}</small><h2>{scene.title}</h2></div></DeckItem>)}
    </DeckCards><DeckEmpty><p>You’ve seen them all.</p></DeckEmpty></Deck>
    <div className="demo-deck-controls"><button className="demo-button-secondary" disabled={index === 0} onClick={() => setIndex(Math.max(0, index - 1))} aria-label="Previous card"><ArrowLeft size={17} /></button><span aria-live="polite">{done ? 'All caught up' : `${index + 1} / ${scenes.length}`}</span><button className="demo-button-secondary" onClick={() => setIndex(done ? 0 : index + 1)} aria-label={done ? 'Restart cards' : 'Next card'}>{done ? <RotateCcw size={17} /> : <ArrowRight size={17} />}</button></div>
    <p className="demo-hint">Drag a card, or use the arrows.</p>
  </div>;
}

export function ComparisonPreview() {
  // The pinned primitive handles pointer/touch input. Supply the missing
  // keyboard presentation through its public style and event props.
  const [keyboardPosition, setKeyboardPosition] = useState<number | null>(null);
  function moveWithKeyboard(event: KeyboardEvent<HTMLDivElement>) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const current = Number(event.currentTarget.getAttribute('aria-valuenow') ?? 50);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 100
      : current + (event.key === 'ArrowRight' ? 5 : -5);
    setKeyboardPosition(Math.min(100, Math.max(0, Number.isFinite(next) ? next : 50)));
  }
  return <div className="demo-comparison-wrap"><Comparison
    className="demo-comparison" mode="hover"
    onKeyDown={moveWithKeyboard}
    onPointerMove={() => setKeyboardPosition(null)}
    onPointerDown={() => setKeyboardPosition(null)}
    {...(keyboardPosition === null ? {} : { 'aria-valuenow': keyboardPosition })}
  >
    <ComparisonItem position="right" {...(keyboardPosition === null ? {} : { style: { clipPath: `inset(0 ${100 - keyboardPosition}% 0 0)` } })}><img src={scenes[0].image} alt="Landscape in black and white" style={{ filter: 'grayscale(1)' }} /><span className="demo-image-label">Before</span></ComparisonItem>
    <ComparisonItem position="left" {...(keyboardPosition === null ? {} : { style: { clipPath: `inset(0 0 0 ${keyboardPosition}%)` } })}><img src={scenes[0].image} alt="Landscape in full colour" /><span className="demo-image-label demo-image-label-right">After</span></ComparisonItem>
    <ComparisonHandle {...(keyboardPosition === null ? {} : { style: { left: `${keyboardPosition}%` } })} />
  </Comparison><p className="demo-hint">Move across the image, swipe, or use the arrow keys.</p></div>;
}

export function ImageZoomPreview() {
  return <figure className="demo-zoom"><ImageZoom><img src={scenes[1].image} alt={scenes[1].alt} width={720} height={480} /></ImageZoom><figcaption>Look a little closer. Click the image to zoom.</figcaption></figure>;
}
