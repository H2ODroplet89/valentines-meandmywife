import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

/* ── helpers ─────────────────────────────────── */
const rand = (a, b) => Math.random() * (b - a) + a;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (a) => [...a].sort(() => Math.random() - 0.5);

/* ══════════════════════════════════════════════
   APP
   ══════════════════════════════════════════════ */
export default function App() {
  const [phase, setPhase] = useState("ask"); // ask | accepted
  const [tab, setTab] = useState("home");

  return (
    <main className="page">
      <FloatingHearts />

      {phase === "ask" && <AskPhase onAccept={() => setPhase("accepted")} />}

      {phase === "accepted" && (
        <>
          <nav className="tab-bar">
            {[
              ["home", "Home"],
              ["reasons", "Why I Love You"],
              ["quiz", "Love Quiz"],
              ["memory", "Memory Game"],
              ["scratch", "Scratch Card"],
              ["letter", "Love Letter"],
            ].map(([id, label]) => (
              <button
                key={id}
                className={`tab-btn ${tab === id ? "active" : ""}`}
                onClick={() => setTab(id)}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="tab-content">
            {tab === "home" && <HomeTab />}
            {tab === "reasons" && <ReasonsTab />}
            {tab === "quiz" && <QuizTab />}
            {tab === "memory" && <MemoryTab />}
            {tab === "scratch" && <ScratchTab />}
            {tab === "letter" && <LetterTab />}
          </div>
        </>
      )}

      <footer className="footer-note">Made with love by your hubbyy</footer>
    </main>
  );
}

/* ══════════════════════════════════════════════
   FLOATING HEARTS (background)
   ══════════════════════════════════════════════ */
function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${rand(0, 100)}%`,
        delay: `${rand(0, 10)}s`,
        dur: `${rand(9, 17)}s`,
        size: `${rand(14, 24)}px`,
        sway: `${rand(-28, 28)}px`,
      })),
    [],
  );
  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="heart"
          style={{
            left: h.left,
            animationDelay: h.delay,
            animationDuration: h.dur,
            fontSize: h.size,
            "--sway": h.sway,
          }}
        >
          🤍
        </span>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════
   ASK PHASE (question + runaway No)
   ══════════════════════════════════════════════ */
function AskPhase({ onAccept }) {
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPos, setNoPos] = useState(null);
  const [confetti, setConfetti] = useState([]);
  const [accepted, setAccepted] = useState(false);
  const noRef = useRef(null);
  const arenaRef = useRef(null);

  const noTexts = [
    "No",
    "Are you sure?",
    "Really really?",
    "Wifeyy please?",
    "I'll be sad",
    "Pretty please",
    "With a cherry on top?",
    "You're breaking my heart",
    "Last chance...",
    "OK fine, but the button disagrees",
  ];

  const yesScale = 1 + Math.min(noAttempts, 12) * 0.15;
  const noLabel = noTexts[Math.min(noAttempts, noTexts.length - 1)];

  const moveNo = useCallback(() => {
    if (!arenaRef.current || !noRef.current) return;
    const a = arenaRef.current.getBoundingClientRect();
    const b = noRef.current.getBoundingClientRect();
    setNoPos({
      x: rand(8, Math.max(8, a.width - b.width - 8)),
      y: rand(8, Math.max(8, a.height - b.height - 8)),
    });
    setNoAttempts((p) => p + 1);
    if (navigator.vibrate) navigator.vibrate(15);
  }, []);

  const handleYes = () => {
    if (accepted) return;
    setAccepted(true);
    // confetti
    setConfetti(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: rand(-50, 50),
        y: rand(-85, -15),
        rot: rand(-200, 200),
        s: rand(0.6, 1.4),
        d: rand(0, 0.35),
      })),
    );
    if (navigator.vibrate) navigator.vibrate([50, 30, 80]);
    setTimeout(onAccept, 2200);
  };

  /* countdown to Feb 14 */
  const [countdown, setCountdown] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const vday = new Date(now.getFullYear(), 1, 14); // Feb 14
      if (now > vday) vday.setFullYear(vday.getFullYear() + 1);
      const diff = vday - now;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      if (d === 0 && h === 0 && m === 0)
        setCountdown(`${s}s — it's almost here!`);
      else if (d === 0) setCountdown(`${h}h ${m}m ${s}s`);
      else setCountdown(`${d}d ${h}h ${m}m ${s}s`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {confetti.length > 0 && (
        <div className="confetti-layer" aria-hidden="true">
          {confetti.map((c) => (
            <span
              key={c.id}
              className="confetti-piece"
              style={{
                "--cx": `${c.x}vw`,
                "--cy": `${c.y}vh`,
                "--cr": `${c.rot}deg`,
                "--cs": c.s,
                animationDelay: `${c.d}s`,
              }}
            >
              🤍
            </span>
          ))}
        </div>
      )}

      <section className={`card ${accepted ? "card--accepted" : ""}`}>
        <div className="big-heart" aria-hidden="true">
          🤍
        </div>
        <p className="eyebrow">For my beautiful wife</p>

        {!accepted ? (
          <>
            <h1>Wifey, will you be my Valentine?</h1>
            <p className="subtitle">
              I made this little page just for you. You + me = forever love.
            </p>

            <p className="countdown">Valentine&apos;s Day in {countdown}</p>

            <div className="button-arena" ref={arenaRef}>
              <button
                className="yes-btn pulse"
                style={{ transform: `translateY(-50%) scale(${yesScale})` }}
                onClick={handleYes}
              >
                Yes!
              </button>
              <button
                ref={noRef}
                className={`no-btn ${noPos ? "free" : ""}`}
                style={
                  noPos
                    ? { transform: `translate(${noPos.x}px, ${noPos.y}px)` }
                    : undefined
                }
                onMouseEnter={moveNo}
                onTouchStart={(e) => {
                  e.preventDefault();
                  moveNo();
                }}
                onClick={moveNo}
              >
                {noLabel}
              </button>
            </div>

            {noAttempts > 0 && (
              <p className="hint">
                {noAttempts < 4
                  ? "The No button keeps running away"
                  : noAttempts < 7
                    ? "See? Even the button knows the answer"
                    : "Just press Yes already, Wifeyyy!"}
              </p>
            )}
          </>
        ) : (
          <>
            <h1 className="bounce-in">Yay! Best Valentine ever!</h1>
            <p className="subtitle">Loading your surprises...</p>
          </>
        )}
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════
   HOME TAB
   ══════════════════════════════════════════════ */
function HomeTab() {
  const [countdown, setCountdown] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const vday = new Date(now.getFullYear(), 1, 14);
      if (now > vday) vday.setFullYear(vday.getFullYear() + 1);
      const diff = vday - now;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown(d > 0 ? `${d}d ${h}h ${m}m ${s}s` : `${h}h ${m}m ${s}s`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="card fade-in">
      <div className="big-heart">🤍</div>
      <h2>Happy Valentine's Day, Wifey!</h2>
      <p className="subtitle">You just made my whole year magical</p>
      <p className="countdown">Valentine&apos;s Day in {countdown}</p>
      <p className="home-hint">
        Explore the tabs above — I made each one for you
      </p>
    </section>
  );
}

/* ══════════════════════════════════════════════
   REASONS I LOVE YOU  (flip cards)
   ══════════════════════════════════════════════ */
const REASONS = [
  "Your laugh makes everything better",
  "You always know how to cheer me up",
  "The way your smile lights up a room",
  "You believe in me even when I don't",
  "Your kisses feels like home",
  "You make the ordinary feel magical",
  "Your love keeps me going every day",
  "The way you look at me melts my heart",
  "You're my best friend and my favourite person",
  "Every moment with you is my favourite memory",
  "You make me want to be a better person",
  "I fall in love with you more every single day",
];

function ReasonsTab() {
  const [flipped, setFlipped] = useState(new Set());
  const toggle = (i) =>
    setFlipped((prev) => {
      const s = new Set(prev);
      s.has(i) ? s.delete(i) : s.add(i);
      return s;
    });

  return (
    <section className="card fade-in">
      <h2>Reasons I Love You</h2>
      <p className="subtitle">Tap each card to reveal</p>
      <div className="reasons-grid">
        {REASONS.map((r, i) => (
          <div
            key={i}
            className={`reason-card ${flipped.has(i) ? "flipped" : ""}`}
            onClick={() => toggle(i)}
          >
            <div className="reason-front">{i + 1}</div>
            <div className="reason-back">{r}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   LOVE QUIZ
   ══════════════════════════════════════════════ */
const QUIZ = [
  {
    q: "What did I first notice about you?",
    opts: ["Your smile", "Your eyes", "Your laugh", "Everything"],
    ans: 3,
  },
  {
    q: "What's our song?",
    opts: [
      "Love — Wave To Earth.",
      "Love Mine All Mine — Mitski",
      "Angel Baby — Troye Sivan",
      "All of the above ",
    ],
    ans: 3,
  },
  {
    q: "Where would I take you on a dream date?",
    opts: ["Malaysia", "The Mall", "The Beach", "Anywhere with you"],
    ans: 3,
  },
  {
    q: "How much do I love you?",
    opts: [
      "A lot",
      "More than myself",
      "To the moon and back",
      "Words can't measure it",
    ],
    ans: 3,
  },
  {
    q: "What's the best thing about us?",
    opts: [
      "We laugh together",
      "We support each other",
      "We love each other unconditionally",
      "All of the above",
    ],
    ans: 3,
  },
];

function QuizTab() {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);

  const choose = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === QUIZ[idx].ans) setScore((s) => s + 1);
    setTimeout(() => {
      if (idx + 1 < QUIZ.length) {
        setIdx((p) => p + 1);
        setSelected(null);
      } else {
        setDone(true);
      }
    }, 1000);
  };

  if (done) {
    return (
      <section className="card fade-in">
        <h2>Quiz Complete!</h2>
        <p className="quiz-score">
          {score}/{QUIZ.length} correct
        </p>
        <p className="subtitle">
          {score === QUIZ.length
            ? "You know us perfectly — no surprise there"
            : "Every answer is right when it's about us"}
        </p>
        <button
          className="action-btn"
          onClick={() => {
            setIdx(0);
            setScore(0);
            setSelected(null);
            setDone(false);
          }}
        >
          Play Again
        </button>
      </section>
    );
  }

  const q = QUIZ[idx];
  return (
    <section className="card fade-in">
      <h2>Love Quiz</h2>
      <p className="quiz-progress">
        Question {idx + 1} of {QUIZ.length}
      </p>
      <p className="quiz-question">{q.q}</p>
      <div className="quiz-opts">
        {q.opts.map((o, i) => (
          <button
            key={i}
            className={`quiz-opt ${
              selected !== null
                ? i === q.ans
                  ? "correct"
                  : i === selected
                    ? "wrong"
                    : ""
                : ""
            }`}
            onClick={() => choose(i)}
          >
            {o}
          </button>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   MEMORY MATCH GAME
   ══════════════════════════════════════════════ */
const MEMORY_ICONS = ["🤍", "🕊", "🌙", "☁️", "🦢", "🫧"];

function MemoryTab() {
  const [cards, setCards] = useState(() => buildDeck());
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const lockRef = useRef(false);

  function buildDeck() {
    return shuffle(
      [...MEMORY_ICONS, ...MEMORY_ICONS].map((icon, i) => ({ id: i, icon })),
    );
  }

  const flip = (i) => {
    if (lockRef.current || flipped.includes(i) || matched.has(cards[i].icon))
      return;
    const next = [...flipped, i];
    setFlipped(next);
    if (next.length === 2) {
      lockRef.current = true;
      setMoves((m) => m + 1);
      if (cards[next[0]].icon === cards[next[1]].icon) {
        setMatched((prev) => new Set([...prev, cards[next[0]].icon]));
        setFlipped([]);
        lockRef.current = false;
      } else {
        setTimeout(() => {
          setFlipped([]);
          lockRef.current = false;
        }, 700);
      }
    }
  };

  const won = matched.size === MEMORY_ICONS.length;

  const reset = () => {
    setCards(buildDeck());
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    lockRef.current = false;
  };

  return (
    <section className="card fade-in">
      <h2>Memory Match</h2>
      <p className="subtitle">Find all the matching pairs</p>
      <p className="memory-moves">Moves: {moves}</p>

      <div className="memory-grid">
        {cards.map((c, i) => {
          const show = flipped.includes(i) || matched.has(c.icon);
          return (
            <div
              key={c.id}
              className={`mem-card ${show ? "mem-show" : ""}`}
              onClick={() => flip(i)}
            >
              <div className="mem-front">?</div>
              <div className="mem-back">{c.icon}</div>
            </div>
          );
        })}
      </div>

      {won && (
        <div className="memory-win fade-in">
          <p>You matched them all in {moves} moves!</p>
          <button className="action-btn" onClick={reset}>
            Play Again
          </button>
        </div>
      )}
    </section>
  );
}

/* ══════════════════════════════════════════════
   SCRATCH CARD
   ══════════════════════════════════════════════ */
function ScratchTab() {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const isDrawing = useRef(false);

  const secretMessage =
    "You are the most beautiful person\nin the world — inside and out.\nI'm the man alive to be able to have you as my wife.\n\nForever and always, I love you.";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    // draw "scratch" overlay
    ctx.fillStyle = "#e8b4c8";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#d4a0b5";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Scratch here", w / 2, h / 2 - 8);
    ctx.font = "12px sans-serif";
    ctx.fillText("Use your finger or mouse", w / 2, h / 2 + 12);

    ctx.globalCompositeOperation = "destination-out";

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const draw = (e) => {
      if (!isDrawing.current) return;
      const { x, y } = getPos(e);
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
      checkRevealed(ctx, w, h, dpr);
    };

    const start = (e) => {
      isDrawing.current = true;
      draw(e);
    };
    const stop = () => {
      isDrawing.current = false;
    };

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stop);
    canvas.addEventListener("mouseleave", stop);
    canvas.addEventListener("touchstart", start, { passive: true });
    canvas.addEventListener("touchmove", draw, { passive: true });
    canvas.addEventListener("touchend", stop);

    return () => {
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stop);
      canvas.removeEventListener("mouseleave", stop);
      canvas.removeEventListener("touchstart", start);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stop);
    };
  }, []);

  const checkRevealed = (ctx, w, h, dpr) => {
    const data = ctx.getImageData(0, 0, w * dpr, h * dpr).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] === 0) clear++;
    }
    if (clear / (data.length / 4) > 0.45) setRevealed(true);
  };

  return (
    <section className="card fade-in">
      <h2>Scratch Card</h2>
      <p className="subtitle">Scratch to reveal a secret message</p>
      <div className="scratch-wrapper">
        <div className="scratch-message">{secretMessage}</div>
        {!revealed && <canvas ref={canvasRef} className="scratch-canvas" />}
      </div>
      {revealed && <p className="scratch-done">You found my secret message!</p>}
    </section>
  );
}

/* ══════════════════════════════════════════════
   LOVE LETTER (typewriter)
   ══════════════════════════════════════════════ */
function LetterTab() {
  const [typedText, setTypedText] = useState("");
  const [started, setStarted] = useState(false);

  const text =
    "Dear Wifey,\n\nEvery day with you feels like Valentine's Day.\nYou're the reason I smile, I work hard, and the reason I continue striving for the best, and the reason I keep going.\n\nI love you more than words on a screen can say —\nbut I'll never stop trying for us.\n\nYou are my home, my heart, and my everything.\nNo words can describe how lucky I am to have you as my partner in life.\n\nForever yours.\nLuke Vasquez";

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTypedText(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [started]);

  return (
    <section className="card fade-in">
      <h2>A Letter For You</h2>
      {!started ? (
        <button className="action-btn" onClick={() => setStarted(true)}>
          Open my letter
        </button>
      ) : (
        <div className="love-letter">
          <pre className="letter-text">
            {typedText}
            <span className="cursor">|</span>
          </pre>
        </div>
      )}
    </section>
  );
}
