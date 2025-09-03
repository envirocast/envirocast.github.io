// components/Team.jsx
const team = [
  { name: 'Ava Chen', role: 'Quantum ML Lead', img: '/team/member1.jpg', github: 'https://github.com/avachen', bio: 'Designs quantum kernels; IBM Quantum enthusiast.' },
  { name: 'Marcus Lee', role: 'Full-Stack Engineer', img: '/team/member2.jpg', github: 'https://github.com/marcuslee', bio: 'Next.js, data APIs, CI/CD on GitHub Pages.' },
  { name: 'Priya Kapoor', role: 'Data Scientist', img: '/team/member3.jpg', github: 'https://github.com/priyak', bio: 'Cleans & fuses AQI, weather, and NASA datasets.' },
  { name: 'Diego Alvarez', role: 'Design & Outreach', img: '/team/member4.jpg', github: 'https://github.com/diegoalv', bio: 'UX, visuals, and @envirocast_tech campaigns.' },
  { name: 'Noah Brooks', role: 'Systems & Infra', img: '/team/member5.jpg', github: 'https://github.com/noahbrooks', bio: 'Pipelines, caching, and model precomputation.' },
]

export default function Team() {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Our Team</h2>
      <p className="text-slate-300 mb-6">We’re an interdisciplinary group accelerating environmental action with quantum-inspired AI.</p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {team.map(m => (
          <article key={m.name} className="card-base">
            <img src={m.img} alt={m.name} className="h-40 w-full object-cover rounded-xl mb-4" />
            <h3 className="text-xl font-semibold">{m.name}</h3>
            <p className="text-brand text-sm">{m.role}</p>
            <p className="text-slate-300 mt-2 text-sm">{m.bio}</p>
            <a className="link text-sm mt-2 inline-block" href={m.github} target="_blank" rel="noreferrer">GitHub</a>
          </article>
        ))}
      </div>
    </div>
  )
}
