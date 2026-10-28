import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const TYPE_MS = 55;
const DELETE_MS = 28;
const HOLD_MS = 1800;
const START_MS = 1200;

// Types each phrase, holds, deletes, then moves to the next, looping.
// Prerender and reduced motion show the first phrase in full, so there is no layout shift and nothing moves.
// Screen readers get every phrase once as plain text, not the changing letters
export default function Typewriter({ phrases, prefix, className = '', wordClass = 'font-semibold text-brand', caretClass = 'bg-brand' }) {
  const still = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(phrases[0]);
  const [phase, setPhase] = useState('hold-first');

  useEffect(() => {
    if (still || phrases.length < 2) return undefined;
    const current = phrases[index];
    let t;
    if (phase === 'hold-first') t = setTimeout(() => setPhase('deleting'), START_MS + HOLD_MS);
    else if (phase === 'typing') {
      if (text.length < current.length) t = setTimeout(() => setText(current.slice(0, text.length + 1)), TYPE_MS);
      else t = setTimeout(() => setPhase('deleting'), HOLD_MS);
    } else if (phase === 'deleting') {
      if (text.length > 0) t = setTimeout(() => setText(text.slice(0, -1)), DELETE_MS);
      else {
        setIndex((i) => (i + 1) % phrases.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(t);
  }, [still, phrases, index, text, phase]);

  return (
    <p className={className}>
      <span className="sr-only">{prefix} {phrases.join(', ')}</span>
      <span aria-hidden="true">
        {prefix && <>{prefix} </>}
        <span className={wordClass}>{text}</span>
        <span className={`ml-0.5 inline-block h-[1.05em] w-[3px] translate-y-[0.15em] animate-caret rounded-full ${caretClass}`} />
      </span>
    </p>
  );
}
