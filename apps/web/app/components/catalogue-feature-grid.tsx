'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import styles from './catalogue-feature-grid.module.css';

const intentExamples = [
  {
    prompt: 'Keyboard-first command menu for a dense admin tool',
    result: '18 interaction patterns understood',
    tags: ['high density', 'keyboard', 'admin'],
  },
  {
    prompt: 'Calm approval flow for a high-trust workspace',
    result: '12 safety-minded patterns understood',
    tags: ['high trust', 'approval', 'teams'],
  },
  {
    prompt: 'Fast filtering for a mobile product catalogue',
    result: '15 responsive patterns understood',
    tags: ['mobile', 'filters', 'responsive'],
  },
] as const;

const rankedOptions = [
  { id: 'command', label: 'Command palette' },
  { id: 'morphing', label: 'Morphing search' },
  { id: 'combobox', label: 'Combobox' },
] as const;

const fitByRank = [
  { label: 'Best fit', score: 96 },
  { label: 'Strong fit', score: 89 },
  { label: 'Good fit', score: 82 },
] as const;

const previewRows = [
  { id: 'marsh', name: 'Marsh', email: 'leo.marsh@beui.dev', role: 'Admin', status: 'Suspended' },
  { id: 'reyes', name: 'Reyes', email: 'jude.reyes@beui.dev', role: 'Editor', status: 'Active' },
  { id: 'quinn', name: 'Quinn', email: 'ren.quinn@beui.dev', role: 'Admin', status: 'Invited' },
  { id: 'sato', name: 'Sato', email: 'eli.sato@beui.dev', role: 'Viewer', status: 'Suspended' },
  { id: 'frost', name: 'Frost', email: 'kai.frost@beui.dev', role: 'Admin', status: 'Active' },
] as const;

const deliveryFiles = [
  { extension: 'TS', modifier: styles.fileTypeTsx, name: 'component.tsx', note: 'Complete source', size: '2.4 KB' },
  { extension: 'CSS', modifier: styles.fileTypeCss, name: 'styles.css', note: 'Every state', size: '1.2 KB' },
  { extension: 'DOC', modifier: styles.fileTypeDoc, name: 'install.md', note: 'Exact steps', size: '0.8 KB' },
] as const;

type PreviewFilter = 'All' | 'Active' | 'Review';
const previewFilters: PreviewFilter[] = ['All', 'Active', 'Review'];

function FeatureCopy({ label, title, copy }: { copy: string; label: string; title: string }) {
  return (
    <div className="feature-copy">
      <span>{label}</span>
      <h3>{title}</h3>
      <p>{copy}</p>
    </div>
  );
}

function SearchByIntentCard() {
  const reduceMotion = useReducedMotion();
  const [exampleIndex, setExampleIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(intentExamples[0].prompt.length);
  const example = intentExamples[exampleIndex];

  useEffect(() => {
    if (reduceMotion) return;

    if (characterCount < example.prompt.length) {
      const typingTimer = window.setTimeout(() => setCharacterCount((count) => count + 1), 28);
      return () => window.clearTimeout(typingTimer);
    }

    const nextExampleTimer = window.setTimeout(() => {
      setExampleIndex((index) => (index + 1) % intentExamples.length);
      setCharacterCount(0);
    }, 2100);
    return () => window.clearTimeout(nextExampleTimer);
  }, [characterCount, example.prompt.length, reduceMotion]);

  const displayedCharacterCount = reduceMotion ? example.prompt.length : characterCount;

  const showNextExample = () => {
    const nextIndex = (exampleIndex + 1) % intentExamples.length;
    setExampleIndex(nextIndex);
    setCharacterCount(intentExamples[nextIndex].prompt.length);
  };

  return (
    <article className="feature-card">
      <FeatureCopy
        copy="DesignMCP reads product context, interaction needs and constraints."
        label="Search by intent"
        title="Ask for the outcome, not a component name."
      />
      <div className={styles.searchDemo}>
        <button aria-label="Show another intent search" className={styles.searchField} onClick={showNextExample} type="button">
          <span aria-hidden="true" className={styles.searchIcon}>⌕</span>
          <span className={styles.searchText}>{example.prompt.slice(0, displayedCharacterCount)}<i aria-hidden="true" /></span>
          <kbd aria-hidden="true">↵</kbd>
          <span aria-hidden="true" className={styles.searchSweep} data-ready={displayedCharacterCount === example.prompt.length} />
        </button>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className={styles.searchMeta}
            exit={{ opacity: 0, y: 5 }}
            initial={{ opacity: 0, y: -5 }}
            key={exampleIndex}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
          >
            <div aria-label="Detected constraints">
              {example.tags.map((tag, index) => (
                <motion.span
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  key={tag}
                  transition={{ delay: reduceMotion ? 0 : index * 0.07 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            <small><b aria-hidden="true">✦</b>{example.result}</small>
          </motion.div>
        </AnimatePresence>
      </div>
    </article>
  );
}

function RankedOptionsCard() {
  const reduceMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState(rankedOptions[0].id);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (reduceMotion || isInteracting) return;
    const cycleTimer = window.setInterval(() => {
      setSelectedId((currentId) => {
        const currentIndex = rankedOptions.findIndex((option) => option.id === currentId);
        return rankedOptions[(currentIndex + 1) % rankedOptions.length].id;
      });
    }, 2400);
    return () => window.clearInterval(cycleTimer);
  }, [isInteracting, reduceMotion]);

  const orderedOptions = useMemo(() => [
    ...rankedOptions.filter((option) => option.id === selectedId),
    ...rankedOptions.filter((option) => option.id !== selectedId),
  ], [selectedId]);

  return (
    <article className="feature-card">
      <FeatureCopy
        copy="Useful fit notes replace endless catalogue browsing."
        label="Choose confidently"
        title="See the strongest options, already ranked."
      />
      <div
        aria-label="Ranked component options"
        className={styles.rankDemo}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsInteracting(false);
        }}
        onFocus={() => setIsInteracting(true)}
        onPointerEnter={() => setIsInteracting(true)}
        onPointerLeave={() => setIsInteracting(false)}
      >
        {orderedOptions.map((option, index) => {
          const selected = option.id === selectedId;
          const fit = fitByRank[index];
          return (
            <motion.button
              aria-pressed={selected}
              className={styles.rankRow}
              data-selected={selected}
              key={option.id}
              layout
              onClick={() => setSelectedId(option.id)}
              transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
              type="button"
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{fit.label}</strong>
              <p>{option.label}</p>
              <i>{fit.score}%</i>
            </motion.button>
          );
        })}
        <p className={styles.rankHint}><span aria-hidden="true">↕</span> Pick an option to compare its fit</p>
      </div>
    </article>
  );
}

function PreviewCard() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<PreviewFilter>('All');
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (reduceMotion || isInteracting) return;
    const cycleTimer = window.setInterval(() => {
      setFilter((currentFilter) => previewFilters[(previewFilters.indexOf(currentFilter) + 1) % previewFilters.length]);
    }, 2600);
    return () => window.clearInterval(cycleTimer);
  }, [isInteracting, reduceMotion]);

  const visibleRows = previewRows.filter((row) => {
    if (filter === 'Active') return row.status === 'Active';
    if (filter === 'Review') return row.status !== 'Active';
    return true;
  });

  return (
    <article className="feature-card feature-card--preview">
      <FeatureCopy
        copy="See the interaction, states and finish—not a vague thumbnail."
        label="Preview the real thing"
        title="Inspect a working component before choosing."
      />
      <div
        className={styles.previewDemo}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsInteracting(false);
        }}
        onFocus={() => setIsInteracting(true)}
        onPointerEnter={() => setIsInteracting(true)}
        onPointerLeave={() => setIsInteracting(false)}
      >
        <div className={styles.previewToolbar}>
          <div aria-label="Filter table preview" role="group">
            {previewFilters.map((filterName) => (
              <button
                aria-pressed={filter === filterName}
                key={filterName}
                onClick={() => setFilter(filterName)}
                type="button"
              >
                {filterName}
              </button>
            ))}
          </div>
          <span><i aria-hidden="true" /> Live preview</span>
        </div>
        <div aria-label={`Team members filtered by ${filter}`} className={styles.previewTable} role="table">
          <div className={styles.previewHeader} role="row">
            <span role="columnheader">Name</span><span role="columnheader">Email</span><span role="columnheader">Role</span><span role="columnheader">Status</span>
          </div>
          <AnimatePresence initial={false} mode="popLayout">
            {visibleRows.map((row) => (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className={styles.previewRow}
                exit={{ opacity: 0, y: -8 }}
                initial={{ opacity: 0, y: 8 }}
                key={row.id}
                layout
                role="row"
                transition={{ duration: reduceMotion ? 0 : 0.24 }}
              >
                <strong role="cell">{row.name}</strong>
                <span role="cell">{row.email}</span>
                <span role="cell">{row.role}</span>
                <span data-status={row.status.toLowerCase()} role="cell">{row.status}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </article>
  );
}

function DeliveryCard() {
  const reduceMotion = useReducedMotion();
  const [completedFiles, setCompletedFiles] = useState(reduceMotion ? deliveryFiles.length : 0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    if (completedFiles < deliveryFiles.length) {
      const fileTimer = window.setTimeout(() => setCompletedFiles((count) => count + 1), 620);
      return () => window.clearTimeout(fileTimer);
    }

    const replayTimer = window.setTimeout(() => setCompletedFiles(0), 2300);
    return () => window.clearTimeout(replayTimer);
  }, [completedFiles, reduceMotion, run]);

  const displayedCompletedFiles = reduceMotion ? deliveryFiles.length : completedFiles;

  const replayDelivery = () => {
    setCompletedFiles(0);
    setRun((value) => value + 1);
  };

  return (
    <article className="feature-card">
      <FeatureCopy
        copy="Source, dependencies, assets and exact setup arrive together."
        label="Own the result"
        title="Complete implementation, ready to adapt."
      />
      <div className={styles.deliveryDemo}>
        <div className={styles.deliveryStatus}>
          <span><i aria-hidden="true" data-complete={displayedCompletedFiles === deliveryFiles.length} />{displayedCompletedFiles === deliveryFiles.length ? 'Ready to install' : 'Packing complete source'}</span>
          <button onClick={replayDelivery} type="button">Replay <span aria-hidden="true">↻</span></button>
        </div>
        {deliveryFiles.map((file, index) => {
          const status = index < displayedCompletedFiles ? 'ready' : index === displayedCompletedFiles ? 'writing' : 'queued';
          return (
            <motion.div
              animate={{ opacity: status === 'queued' ? 0.56 : 1, scale: status === 'writing' ? 1.012 : 1 }}
              className={styles.deliveryRow}
              data-status={status}
              key={file.name}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
            >
              <span className={`${styles.fileType} ${file.modifier}`}>{file.extension}</span>
              <p><b>{file.name}</b><small>{status === 'writing' ? 'Writing file…' : file.note}</small></p>
              <i>{status === 'ready' ? '✓' : file.size}</i>
              <motion.span
                animate={{ scaleX: status === 'queued' ? 0 : 1 }}
                aria-hidden="true"
                className={styles.deliveryProgress}
                transition={{ duration: reduceMotion ? 0 : 0.48 }}
              />
            </motion.div>
          );
        })}
      </div>
    </article>
  );
}

export function CatalogueFeatureGrid() {
  return (
    <div className="feature-grid">
      <SearchByIntentCard />
      <RankedOptionsCard />
      <PreviewCard />
      <DeliveryCard />
    </div>
  );
}
