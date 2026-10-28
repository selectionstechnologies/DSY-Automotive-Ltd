import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, SendHorizontal, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { greeting, quickReplies, getReply } from '../../data/chatbot';
import { business } from '../../data/site';
import WhatsAppIcon from '../ui/WhatsAppIcon';

const STORAGE_KEY = 'dsy-chat-v1';
const initialMessages = [{ from: 'bot', ...greeting }];

const actionIcon = { whatsapp: WhatsAppIcon, tel: Phone, map: MapPin };

function BotMessage({ msg, onNavigate }) {
  return (
    <div className="max-w-[85%] space-y-2">
      <p className="whitespace-pre-line rounded-card rounded-tl-sm bg-surface-2 px-4 py-3 text-[15px] text-ink">{msg.text}</p>
      {(msg.links?.length || msg.actions?.length) && (
        <div className="flex flex-wrap gap-2">
          {msg.links?.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={onNavigate}
              className="inline-flex min-h-[40px] items-center gap-1 rounded-ui border border-ink/20 px-3 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-surface-2"
            >
              {l.label}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          ))}
          {msg.actions?.map((a) => {
            const Icon = actionIcon[a.kind] ?? ArrowUpRight;
            const external = a.kind !== 'tel';
            return (
              <a
                key={a.href}
                href={a.href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-ui bg-brand px-3 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-strong"
              >
                <Icon className="h-4 w-4" />
                {a.label}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const toggleRef = useRef(null);
  const timer = useRef();

  // Restore this tab's conversation (optional convenience; works without storage too)
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
      if (Array.isArray(saved) && saved.length) setMessages(saved);
    } catch { /* storage unavailable */ }
    return () => clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40)));
    } catch { /* storage unavailable */ }
  }, [messages]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const send = (raw) => {
    const text = raw.trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { from: 'user', text }]);
    setInput('');
    setTyping(true);
    timer.current = setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', ...getReply(text) }]);
      setTyping(false);
    }, 400 + Math.min(text.length * 10, 500));
  };

  const reset = () => {
    clearTimeout(timer.current);
    setTyping(false);
    setMessages(initialMessages);
  };

  // On phones the panel covers the page, so close it when a link is followed
  const onNavigate = () => window.innerWidth < 640 && setOpen(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            id="chat-panel"
            role="dialog"
            aria-label={`${business.name} assistant`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-2 z-[60] flex flex-col overflow-hidden rounded-card border border-line bg-surface shadow-hover sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(680px,calc(100dvh-3rem))] sm:w-[400px]"
          >
            <div className="on-dark flex items-center gap-3 bg-charcoal px-4 py-3 text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-ui bg-brand font-heading text-sm font-extrabold text-brand-ink">DSY</span>
              <div className="flex-1 leading-tight">
                <p className="font-heading font-bold">Garage assistant</p>
                <p className="text-xs text-white/75">Automated replies. For anything else, call us.</p>
              </div>
              <button type="button" onClick={reset} className="min-h-[40px] rounded-ui px-2 text-xs text-white/80 transition-colors hover:bg-white/10 hover:text-white">
                Restart
              </button>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="flex h-10 w-10 items-center justify-center rounded-ui transition-colors hover:bg-white/10">
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div ref={listRef} role="log" aria-live="polite" className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-5">
              {messages.map((m, i) =>
                m.from === 'bot' ? (
                  <BotMessage key={i} msg={m} onNavigate={onNavigate} />
                ) : (
                  <p key={i} className="ml-auto max-w-[85%] whitespace-pre-line rounded-card rounded-tr-sm bg-charcoal px-4 py-3 text-[15px] text-white">
                    {m.text}
                  </p>
                )
              )}
              {typing && (
                <div className="flex w-16 items-center justify-center gap-1 rounded-card rounded-tl-sm bg-surface-2 py-4" aria-label="Assistant is typing">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="h-1.5 w-1.5 rounded-full bg-muted"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  disabled={typing}
                  className="min-h-[36px] rounded-full border border-line-strong px-3 text-[13px] text-ink transition-colors hover:border-ink hover:bg-surface-2 disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-line px-3 py-3"
            >
              <label htmlFor="chat-input" className="sr-only">Type your question</label>
              <input
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={300}
                autoComplete="off"
                placeholder="Ask about hours, MOTs, booking..."
                className="input flex-1 !py-2.5 text-[15px]"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Send message"
                className="flex h-12 w-12 items-center justify-center rounded-ui bg-brand text-brand-ink transition-colors hover:bg-brand-strong disabled:opacity-40"
              >
                <SendHorizontal className="h-5 w-5" aria-hidden="true" />
              </button>
            </form>
            <p className="bg-surface-2 px-4 py-2 text-center text-xs text-muted">If anyone is in danger on the road, call 999.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? 'Close garage assistant' : 'Open garage assistant'}
        className={`fixed bottom-[5rem] right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-charcoal text-white shadow-hover transition hover:-translate-y-0.5 lg:right-7 ${business.whatsapp ? 'lg:bottom-[6.5rem]' : 'lg:bottom-7'}`}
      >
        {open ? <X className="h-6 w-6" aria-hidden="true" /> : <MessageCircle className="h-6 w-6" aria-hidden="true" />}
      </button>
    </>
  );
}
