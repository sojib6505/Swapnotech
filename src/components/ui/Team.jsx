import { useEffect, useRef, useState } from "react";
import { team, teamSection } from "../../data/team";

const SOCIAL_LABELS = {
  linkedin: "LinkedIn",
  facebook: "Facebook",
  github: "GitHub",
  twitter: "X",
  instagram: "Instagram",
};

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

function TeamCard({ member, index, visible }) {
  const [broken, setBroken] = useState(false);
  const socials = Object.entries(member.socials || {}).filter(([, url]) => url);

  return (
    <li className="lg:[&:nth-child(3n+2)]:translate-y-12">
      <article
        style={{ transitionDelay: `${index * 90}ms` }}
        className={`group relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/10 transition-all duration-700 ease-out hover:ring-orange-500/60 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Photo */}
        {member.image && !broken ? (
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            draggable="false"
            onError={() => setBroken(true)}
            className="absolute inset-0 h-full w-full scale-105 object-cover grayscale transition duration-700 ease-out group-hover:scale-100 group-hover:grayscale-0"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950">
            <span className="text-6xl font-bold tracking-tight text-zinc-600">
              {initials(member.name)}
            </span>
          </div>
        )}

        {/* Gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
        <div className="absolute inset-0 bg-orange-600/0 mix-blend-soft-light transition-colors duration-500 group-hover:bg-orange-500/30" />

        {/* Index number */}
        <span className="absolute left-4 top-4 font-mono text-xs font-semibold tracking-wider text-white/60">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Info */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="mb-3 h-px w-8 bg-orange-500 transition-all duration-500 group-hover:w-16" />
          <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">
            {member.name}
          </h3>
          <p className="mt-1 font-mono text-[11px] font-medium uppercase tracking-wider text-orange-400">
            {member.role}
          </p>

          {socials.length > 0 && (
            <div className="mt-0 flex max-h-0 flex-wrap gap-2 overflow-hidden opacity-0 transition-all duration-500 group-hover:mt-4 group-hover:max-h-16 group-hover:opacity-100 max-md:mt-4 max-md:max-h-16 max-md:opacity-100">
              {socials.map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on ${SOCIAL_LABELS[key] || key}`}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-orange-600"
                >
                  {SOCIAL_LABELS[key] || key}
                </a>
              ))}
            </div>
          )}
        </div>
      </article>
    </li>
  );
}

export default function Team() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!team.length) return null;

  return (
    <section
      ref={ref}
      aria-labelledby="team-heading"
      className="relative overflow-hidden bg-zinc-950 py-20 sm:py-28"
    >
      {/* Ambient orange glow */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-orange-500/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-orange-600/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-3 block font-mono text-xs font-semibold uppercase tracking-wider text-orange-500">
              {teamSection.eyebrow}
            </span>
            <h2
              id="team-heading"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              {teamSection.heading}{" "}
              <span className="text-orange-500">{teamSection.highlight}</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
            {teamSection.description}
          </p>
        </div>

        {/* Staggered grid: majher column ta ektu niche namano (desktop) */}
        <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 lg:pb-12">
          {team.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} visible={visible} />
          ))}
        </ul>
      </div>
    </section>
  );
}