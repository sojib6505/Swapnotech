import { clients, clientsSection } from "../../data/clients";

// function ClientItem({ client }) {
//   const content = client.logo ? (
//     <img
//       src={client.logo}
//       alt={client.name}
//       loading="lazy"
//       draggable="false"
//       className="max-h-10 w-auto object-contain  transition duration-300"
//     />
//   ) : (
//     <span className="whitespace-nowrap text-xl font-semibold tracking-tight text-neutral-400 transition-colors duration-300 group-hover:text-neutral-900 dark:text-neutral-600 dark:group-hover:text-white">
//       {client.name}
//     </span>
//   );

//   // Fixed width, tai loop ta perfectly seamless hoy
//   const cls = "group flex h-20 w-56 shrink-0 items-center justify-center px-5";

//   return client.url ? (
//     <a
//       href={client.url}
//       target="_blank"
//       rel="noopener noreferrer"
//       aria-label={client.name}
//       className={cls}
//     >
//       {content}
//     </a>
//   ) : (
//     <div className={cls} aria-label={client.name}>
//       {content}
//     </div>
//   );
// }

function ClientItem({ client }) {
  const content = client.logo ? (
    <img
      src={client.logo}
      alt={client.name}
      loading="lazy"
      draggable="false"
      className="max-h-16 w-auto max-w-full object-contain transition duration-300"
    />
  ) : (
    <span className="whitespace-nowrap text-xl font-semibold tracking-tight text-neutral-400 transition-colors duration-300 group-hover:text-neutral-900 dark:text-neutral-600 dark:group-hover:text-white">
      {client.name}
    </span>
  );

  // Fixed width, tai loop ta perfectly seamless hoy
  const cls = "group flex h-24 w-44 shrink-0 items-center justify-center px-3";

  return client.url ? (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={client.name}
      className={cls}
    >
      {content}
    </a>
  ) : (
    <div className={cls} aria-label={client.name}>
      {content}
    </div>
  );
}

export default function ClientLogos() {
  if (!clients.length) return null;

  // Client kom hole screen bhore rakhar jonno duplicate kore nei
  const base = clients.length < 8 ? [...clients, ...clients] : clients;
  const track = [...base, ...base]; // 2 ta copy = seamless loop

  return (
    <section
      aria-labelledby="clients-heading"
      className="overflow-hidden bg-white py-20 dark:bg-neutral-950 sm:py-28"
    >
      <style>{`
        @keyframes clients-marquee {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .clients-track {
          animation: clients-marquee 35s linear infinite;
        }
        .clients-marquee:hover .clients-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .clients-track { animation: none; }
        }
      `}</style>

      <div className="mx-auto max-w-xl px-6 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
          {clientsSection.eyebrow}
        </p>
        <h2
          id="clients-heading"
          className="mt-4 text-2xl font-semibold tracking-tight text-neutral-600 dark:text-white sm:text-3xl uppercase"
        >
          {clientsSection.heading}
        </h2>
      </div>

      {/* Duto pashe fade-out edge */}
      <div
        className="clients-marquee mt-14 overflow-hidden border-y border-neutral-200 dark:border-neutral-800"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <ul className="clients-track flex w-max items-center py-4">
          {track.map((client, i) => (
            <li key={`${client.id}-${i}`} aria-hidden={i >= base.length}>
              <ClientItem client={client} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}