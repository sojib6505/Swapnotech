import React, { useEffect, useRef, useState } from 'react';
import { X, Sparkles } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Setup: ekhane shob customize korte parben                          */
/* ------------------------------------------------------------------ */

// 👉 FloatingContact er number ta-i ekhane din (country code soho, + chhara)
const PHONE_NUMBER = '8801700000000';

const TYPING_MS = 1000; // "typing..." dots koto khon dekhabe
const HOLD_MS = 3500; // message ta koto khon thakbe (2s chaile 2000 din)
const GAP_MS = 600; // duita message er majhe biroti

// Prottek "wave" = akta group message. delay = ager wave sesh howar koto por ashbe.
// text = bubble e ja dekhabe, wa = click korle WhatsApp e ja pre-fill hobe.
const WAVES = [
  {
    delay: 2500, // website e dhukar 2.5s por
    messages: [
      { text: 'Hey creative people 👋', wa: "Hi! I just landed on your website and I'd love to chat." },
      { text: 'Need a website, brand or ads that actually convert?', wa: "Hi! I'm looking for help with a website / branding / ads project." },
    ],
  },
  {
    delay: 60000, // 1 minute por
    messages: [
      { text: 'Still exploring? 🚀', wa: "Hi! I've been exploring your services and have a few questions." },
      { text: "Tell us your goal — we'll map the plan for free.", wa: "Hi! Here's my goal: " },
    ],
  },
  {
    delay: 60000,
    messages: [
      { text: 'Psst… we usually reply on WhatsApp in minutes ⚡', wa: 'Hi! I have a quick question about your services.' },
    ],
  },
  {
    delay: 90000,
    messages: [
      { text: 'Got an idea but no team? We build it end to end ✨', wa: 'Hi! I have an idea and need a team to build it.' },
    ],
  },
];

const STORAGE_KEY = 'chat-nudge-dismissed';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function safeStorage(action, value) {
  try {
    if (action === 'get') return window.sessionStorage.getItem(STORAGE_KEY);
    if (action === 'set') window.sessionStorage.setItem(STORAGE_KEY, value);
  } catch (e) {
    /* storage block thakle ignore */
  }
  return null;
}

export default function ChatNudge({ phone = PHONE_NUMBER, brandName = 'Swapno Tech' }) {
  const [msg, setMsg] = useState(null); // { id, text, wa }
  const [phase, setPhase] = useState('idle'); // idle | typing | shown | leaving
  const hoveredRef = useRef(false);
  const dismissedRef = useRef(false);

  useEffect(() => {
    if (safeStorage('get') === '1') return undefined;
    let cancelled = false;
    const stop = () => cancelled || dismissedRef.current;

    (async () => {
      let counter = 0;
      for (const wave of WAVES) {
        await sleep(wave.delay);
        // tab background e thakle wait kori, jate miss na hoy
        while (!stop() && typeof document !== 'undefined' && document.hidden) await sleep(1000);
        if (stop()) return;

        for (const m of wave.messages) {
          if (stop()) return;
          counter += 1;
          setMsg({ id: counter, text: m.text, wa: m.wa });
          setPhase('typing');
          await sleep(TYPING_MS);
          if (stop()) return;

          setPhase('shown');
          await sleep(HOLD_MS);
          // mouse bubble er upor thakle chole jabe na
          while (!stop() && hoveredRef.current) await sleep(200);
          if (stop()) return;

          setPhase('leaving');
          await sleep(350);
          setMsg(null);
          setPhase('idle');
          await sleep(GAP_MS);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const dismiss = () => {
    dismissedRef.current = true;
    safeStorage('set', '1');
    setPhase('leaving');
    setTimeout(() => {
      setMsg(null);
      setPhase('idle');
    }, 350);
  };

  if (!msg || phase === 'idle') return null;

  const href = `https://wa.me/${phone}?text=${encodeURIComponent(msg.wa)}`;
  const isTyping = phase === 'typing';

  return (
    <>
      <style>{`
        @keyframes nudge-in {
          0%   { opacity: 0; transform: translateY(16px) scale(.6); }
          60%  { opacity: 1; transform: translateY(-4px) scale(1.04); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes nudge-out {
          to { opacity: 0; transform: translateY(8px) scale(.92); }
        }
        @keyframes nudge-dot {
          0%, 60%, 100% { transform: translateY(0); opacity: .4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes nudge-text {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nudge-progress {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
        .nudge-card-in  { animation: nudge-in .55s cubic-bezier(.2,.8,.3,1) both; transform-origin: bottom right; }
        .nudge-card-out { animation: nudge-out .35s ease-in forwards; transform-origin: bottom right; }
        .nudge-dot { animation: nudge-dot 1s ease-in-out infinite; }
        .nudge-text { animation: nudge-text .35s ease-out both; }
        .nudge-progress { transform-origin: left; animation: nudge-progress linear forwards; }
        .nudge-wrap:hover .nudge-progress { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .nudge-card-in, .nudge-card-out, .nudge-dot, .nudge-text { animation: none; }
        }
      `}</style>

      <div
        role="status"
        aria-live="polite"
        className="nudge-wrap fixed z-50 right-4 bottom-[5.75rem] md:right-6 md:bottom-[6.75rem]"
        style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
        onMouseEnter={() => {
          hoveredRef.current = true;
        }}
        onMouseLeave={() => {
          hoveredRef.current = false;
        }}
      >
        {/* key={msg.id} => prottek notun message e entry animation notun kore cholbe */}
        <div
          key={msg.id}
          className={`relative ${phase === 'leaving' ? 'nudge-card-out' : 'nudge-card-in'}`}
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={dismiss}
            className="group relative block w-max max-w-[min(280px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/10 bg-[#17171B] pl-3 pr-4 pt-3 pb-3 shadow-[0_18px_40px_-12px_rgba(234,88,12,0.45),0_8px_20px_rgba(0,0,0,0.5)] transition-colors hover:border-orange-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            {/* soft orange glow upore-bame */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 -left-10 h-28 w-28 rounded-full bg-orange-500/20 blur-2xl"
            />

            <span className="relative flex items-start gap-3">
              {/* Avatar */}
              <span className="relative mt-0.5 shrink-0">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-700 text-white shadow-inner">
                  <Sparkles className="h-4 w-4" strokeWidth={2} />
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#17171B] bg-emerald-400" />
              </span>

              <span className="min-w-0">
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-400">
                  {brandName}
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-500">{isTyping ? 'typing…' : 'just now'}</span>
                </span>

                {isTyping ? (
                  <span className="mt-1.5 flex h-5 items-center gap-1" aria-label="typing">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="nudge-dot h-1.5 w-1.5 rounded-full bg-orange-400"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </span>
                ) : (
                  <span className="nudge-text mt-0.5 block text-sm font-medium leading-snug text-white">
                    {msg.text}
                  </span>
                )}
              </span>
            </span>

            {/* Time bar: message koto khon thakbe seta dekhay */}
            {!isTyping && (
              <span
                aria-hidden="true"
                className="nudge-progress absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-orange-500 to-amber-400"
                style={{ animationDuration: `${HOLD_MS}ms` }}
              />
            )}
          </a>

          {/* Close button */}
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss message"
            className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#222227] text-zinc-400 shadow-md transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            <X className="h-3 w-3" />
          </button>

          {/* Chat bubble tail (WhatsApp button er dike) */}
          <span
            aria-hidden="true"
            className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-white/10 bg-[#17171B]"
          />
        </div>
      </div>
    </>
  );
}