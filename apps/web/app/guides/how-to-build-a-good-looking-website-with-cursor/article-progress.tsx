'use client';

import { useEffect, useState } from 'react';

const sections = [
  ['why-cursor-sites-look-generic', 'Why sites look generic'],
  ['define-the-direction', 'Define the direction'],
  ['build-the-system', 'Build the system'],
  ['give-cursor-evidence', 'Give Cursor evidence'],
  ['prompt-in-passes', 'Prompt in passes'],
  ['use-cursor-tools', 'Use Cursor’s tools'],
  ['make-an-existing-site-better', 'Improve an existing site'],
  ['quality-checklist', 'Quality checklist'],
] as const;

export function ArticleProgress() {
  const [activeId, setActiveId] = useState(sections[0][0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector<HTMLElement>('.article-body');
      if (!article) return;

      const articleTop = window.scrollY + article.getBoundingClientRect().top;
      const readableDistance = Math.max(1, article.offsetHeight - window.innerHeight);
      const nextProgress = Math.round(
        Math.min(100, Math.max(0, ((window.scrollY - articleTop) / readableDistance) * 100)),
      );
      setProgress((currentProgress) => currentProgress === nextProgress ? currentProgress : nextProgress);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id as typeof activeId);
      },
      { rootMargin: '-18% 0px -68% 0px' },
    );

    sections.forEach(([id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div className="article-progress-card">
      <div className="article-progress-meta">
        <span>In this guide</span>
        <span>{progress}%</span>
      </div>
      <div className="article-progress-track" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <nav aria-label="Article sections">
        {sections.map(([id, label], index) => (
          <a href={`#${id}`} aria-current={activeId === id ? 'location' : undefined} key={id}>
            <span>0{index + 1}</span>{label}
          </a>
        ))}
      </nav>
    </div>
  );
}
