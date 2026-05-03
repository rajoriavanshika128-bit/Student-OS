import React, { useState, useEffect } from 'react'
import { useDNA } from '../context/DNAContext'
import HeroVideo from '../components/HeroVideo'

const jobs = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    company: 'Stripe',
    location: 'San Francisco, CA',
    salary: '$140K – $180K',
    type: 'Full-time',
    description: 'We are looking for an experienced Frontend Engineer to join our core payments team. You will be responsible for building seamless, high-performance payment interfaces used by millions. The ideal candidate has deep expertise in React, TypeScript, and web accessibility standards. You will collaborate closely with product and design teams to deliver world-class user experiences.',
    url: '#',
    postedDate: '2 days ago'
  },
  {
    id: 2,
    title: 'Remote React Developer',
    company: 'Vercel',
    location: 'Remote',
    salary: '$120K – $150K',
    type: 'Remote',
    description: 'Join our edge network team to build the future of frontend deployment. You will be working directly on our dashboard and CLI tools using React and Next.js. We need someone who thrives in a fast-paced environment and cares deeply about developer experience. A strong understanding of modern JavaScript tooling is essential.',
    url: '#',
    postedDate: '1 week ago'
  },
  {
    id: 3,
    title: 'Software Engineering Intern',
    company: 'Google',
    location: 'Mountain View, CA',
    salary: '$090K (pro-rated)',
    type: 'Internship',
    description: 'As a Software Engineering Intern, you will work on real-world projects that impact billions of users. You will be paired with a mentor and embedded into a core engineering team for the summer. We are looking for students with strong computer science fundamentals and a passion for problem-solving. Experience with modern web technologies is a plus.',
    url: '#',
    postedDate: '3 days ago'
  },
  {
    id: 4,
    title: 'Backend Systems Engineer',
    company: 'Netflix',
    location: 'Los Gatos, CA',
    salary: '$180K – $240K',
    type: 'Full-time',
    description: 'Help us scale our content delivery network to handle global streaming traffic. You will write highly concurrent, low-latency microservices in Node.js and Java. The role requires deep knowledge of distributed systems and network protocols. You will be at the forefront of performance optimization.',
    url: '#',
    postedDate: 'Just now'
  },
  {
    id: 5,
    title: 'Frontend Developer Intern',
    company: 'Spotify',
    location: 'New York, NY',
    salary: '$080K (pro-rated)',
    type: 'Internship',
    description: 'Join the Web Player team to improve the browser listening experience. You will work on feature development, bug fixes, and performance tuning using React. We value curiosity, collaboration, and a love for music. This is a 12-week program designed to accelerate your growth as an engineer.',
    url: '#',
    postedDate: '5 days ago'
  },
  {
    id: 6,
    title: 'Full Stack Engineer',
    company: 'Airbnb',
    location: 'Seattle, WA',
    salary: '$130K – $170K',
    type: 'Full-time',
    description: 'We are seeking a Full Stack Engineer to build trust and safety tools for our host community. You will work across the stack, from React on the frontend to Ruby on Rails on the backend. You will be tasked with building scalable systems to prevent fraud and ensure a safe platform. Strong cross-functional communication is vital.',
    url: '#',
    postedDate: '2 weeks ago'
  },
  {
    id: 7,
    title: 'Remote UI/UX Designer',
    company: 'Linear',
    location: 'Remote',
    salary: '$110K – $140K',
    type: 'Remote',
    description: 'Help shape the future of issue tracking and project management. We are looking for a designer who codes or an engineer with a meticulous eye for design. You will work on everything from high-level product strategy to pixel-perfect CSS implementation. Passion for craft and speed is what defines our culture.',
    url: '#',
    postedDate: '4 days ago'
  },
  {
    id: 8,
    title: 'Data Analyst',
    company: 'DoorDash',
    location: 'Chicago, IL',
    salary: '$095K – $120K',
    type: 'Full-time',
    description: 'Dive deep into our logistics data to optimize delivery routes and times. You will build dashboards, run A/B tests, and present actionable insights to stakeholders. Proficiency in SQL and Python is required, along with strong business acumen. Your work will directly impact our operational efficiency and customer satisfaction.',
    url: '#',
    postedDate: '1 day ago'
  },
  {
    id: 9,
    title: 'Junior Web Developer',
    company: 'Local Agency',
    location: 'Austin, TX',
    salary: '$060K – $080K',
    type: 'Full-time',
    description: 'We are a fast-growing agency looking for a Junior Web Developer to join our team. You will build marketing websites and e-commerce platforms for local businesses. This is a great opportunity to learn best practices and touch a wide variety of projects. Familiarity with HTML, CSS, and basic JavaScript is expected.',
    url: '#',
    postedDate: '6 days ago'
  },
  {
    id: 10,
    title: 'Remote Backend Engineer',
    company: 'GitHub',
    location: 'Remote',
    salary: '$140K – $175K',
    type: 'Remote',
    description: 'Join the team responsible for scaling GitHub Actions. You will build and maintain the distributed infrastructure that runs millions of workflows daily. Experience with Go, container orchestration, and cloud architecture is highly valued. We are looking for engineers who are passionate about developer productivity.',
    url: '#',
    postedDate: '12 hours ago'
  },
  {
    id: 11,
    title: 'Support Engineer',
    company: 'Tech Startup',
    location: 'Remote',
    salary: '$045K – $055K',
    type: 'Remote',
    description: 'You will be the first line of defense for our technical products. You will help customers debug issues, write documentation, and escalate bugs to the engineering team. This is an excellent entry-level role for someone looking to break into tech.',
    url: '#',
    postedDate: '3 hours ago'
  }
]

export default function Jobs() {
  const { dna } = useDNA()
  const [filter, setFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Relevance')
  const [salaryRange, setSalaryRange] = useState('Any')
  const [selectedJob, setSelectedJob] = useState(null)

  const displayedJobs = jobs
    .filter(job => {
      if (filter === 'All') return true
      if (filter === 'Remote') return job.type === 'Remote'
      if (filter === 'Full-time') return job.type === 'Full-time'
      if (filter === 'Internship') return job.type === 'Internship'
      return true
    })
    .filter(job => {
      if (salaryRange === 'Any') return true
      const num = parseInt(job.salary.replace(/\D/g, '').slice(0, 3))
      if (salaryRange === 'Under 50') return num < 50
      if (salaryRange === '50to100') return num >= 50 && num <= 100
      if (salaryRange === 'Above100') return num > 100
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'Salary') {
        const aNum = parseInt(a.salary.replace(/\D/g, '').slice(0, 3)) || 0
        const bNum = parseInt(b.salary.replace(/\D/g, '').slice(0, 3)) || 0
        return bNum - aNum
      }
      return 0
    })

  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'Escape') setSelectedJob(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="page-enter">
      <style>{`
        .job-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 40px 32px;
          border: 1px solid var(--hairline-strong);
          border-left: 1px solid var(--hairline-strong);
          border-radius: 0;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s var(--ease);
          margin-bottom: 24px;
        }
        .job-card:hover {
          border-color: var(--primary);
        }
        .job-info {
          display: flex;
          flex-direction: column;
        }
        .job-title {
          font-family: var(--font-heading);
          font-size: 24px;
          letter-spacing: 2px;
          color: var(--on-dark);
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .job-company {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 2px;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        .job-tags {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }
        .job-tag {
          padding: 2px 8px;
          border: 1px solid var(--hairline-strong);
          color: var(--text);
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .job-posted {
          font-size: 12px;
          color: var(--text-muted-soft);
        }
        .view-role-btn {
          background: transparent;
          color: var(--on-dark);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 16px 32px;
          border: 1px solid var(--hairline-strong);
          cursor: pointer;
          transition: all 0.3s var(--ease);
        }
        .view-role-btn:hover {
          border-color: var(--primary);
          transform: translateY(-2px);
        }
        .modal-backdrop {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-box {
          background: var(--surface-card);
          border: 1px solid var(--primary);
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 40px;
          position: relative;
        }
        .modal-close-btn {
          position: absolute;
          top: 20px; right: 20px;
          background: transparent; border: none;
          color: var(--text); font-size: 20px; cursor: pointer;
        }
        .modal-top { margin-bottom: 32px; }
        .modal-type-badge {
          display: inline-block; padding: 4px 8px; border: 1px solid var(--primary);
          color: var(--primary); font-family: var(--font-mono); font-size: 10px;
          text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px;
        }
        .modal-job-title {
          font-family: var(--font-heading); font-size: 32px; color: var(--on-dark);
          text-transform: uppercase; margin-bottom: 8px;
        }
        .modal-job-company {
          font-family: var(--font-mono); font-size: 14px; color: var(--text-muted);
          text-transform: uppercase; letter-spacing: 2px;
        }
        .modal-meta-row {
          display: flex; gap: 32px; margin-bottom: 32px; padding-bottom: 32px;
          border-bottom: 1px solid var(--hairline-strong);
        }
        .modal-meta-item { display: flex; flex-direction: column; gap: 8px; }
        .modal-meta-label { font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px; }
        .modal-meta-value { color: var(--on-dark); font-size: 14px; }
        .modal-section { margin-bottom: 32px; }
        .modal-section-label { font-family: var(--font-mono); font-size: 12px; color: var(--primary); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; }
        .modal-desc { font-family: var(--font-body); font-size: 16px; color: var(--text); line-height: 1.6; }
        .modal-skill-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .modal-skill-chip { padding: 4px 12px; border: 1px solid var(--success); color: var(--success); font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 2px; }
        .modal-apply-btn {
          display: block; width: 100%; text-align: center; background: var(--primary); color: #000;
          padding: 16px; font-family: var(--font-mono); font-size: 12px; text-transform: uppercase;
          letter-spacing: 3px; text-decoration: none; border: 1px solid var(--primary);
          margin-top: 40px; cursor: pointer;
          transition: all 0.3s var(--ease);
        }
        .modal-apply-btn:hover { background: transparent; color: var(--primary); }
        .modal-apply-disabled { background: transparent; color: var(--text-muted); border-color: var(--hairline-strong); cursor: not-allowed; }
        .modal-apply-disabled:hover { background: transparent; color: var(--text-muted); }
        .results-count { font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px; }
        .sort-select {
          background: transparent; color: var(--text); border: 1px solid var(--hairline-strong);
          padding: 8px 16px; font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 2px; outline: none; margin-left: 16px; cursor: pointer;
        }
        .empty-state { padding: 60px; text-align: center; border: 1px solid var(--hairline-strong); }
        .clear-btn { background: transparent; color: var(--primary); border: 1px solid var(--primary); padding: 12px 24px; font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 2px; cursor: pointer; margin-top: 24px; transition: all 0.3s var(--ease); }
        .clear-btn:hover { background: var(--primary); color: #000; }
        .tab-btn {
          padding: 12px 24px; border-radius: 0; font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 2px; text-transform: uppercase; font-weight: 400; color: var(--text-muted);
          border: 1px solid transparent; border-bottom: 1px solid var(--hairline); background: transparent;
          transition: all 0.2s ease; cursor: pointer;
        }
        .tab-active {
          color: var(--on-dark); border-bottom: 1px solid var(--primary); background: transparent;
        }
        .controls-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; border-bottom: 1px solid var(--hairline-strong); padding-bottom: 16px; }
        .filter-tabs { display: flex; gap: 0; }
      `}</style>

      <div className="hero-photo-band">
        <HeroVideo />
        <div className="section-label">Market Pulse</div>
        <h1 className="section-title">Job Market</h1>
        <div className="section-sub">Live opportunities for {dna.dreamRole}</div>
      </div>

      <div className="controls-row">
        <div className="filter-tabs">
          {['All', 'Remote', 'Full-time', 'Internship'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={filter === f ? 'tab-btn tab-active' : 'tab-btn'}
            >
              {f}
            </button>
          ))}
        </div>
        <div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="Relevance">Sort: Relevance</option>
            <option value="Salary">Sort: Salary High to Low</option>
          </select>

          <select
            value={salaryRange}
            onChange={e => setSalaryRange(e.target.value)}
            className="sort-select"
          >
            <option value="Any">Any Salary</option>
            <option value="Under 50">Under $50K</option>
            <option value="50to100">$50K – $100K</option>
            <option value="Above100">$100K+</option>
          </select>
        </div>
      </div>

      <p className="results-count">
        {displayedJobs.length} role{displayedJobs.length !== 1 ? 's' : ''} found
        {filter !== 'All' && ` · ${filter}`}
      </p>

      {displayedJobs.length === 0 && (
        <div className="empty-state">
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'var(--text)' }}>No roles match your current filters.</p>
          <button
            className="clear-btn"
            onClick={() => {
              setFilter('All')
              setSalaryRange('Any')
              setSortBy('Relevance')
            }}
          >
            Clear all filters
          </button>
        </div>
      )}

      <div key={`${filter}-${sortBy}-${salaryRange}`}>
        {displayedJobs.map((job, i) => (
          <div
            key={job.id}
            className="job-card stagger-item"
            style={{ animationDelay: `${i * 60}ms` }}
            onClick={() => setSelectedJob(job)}
          >
            <div className="job-info">
              <h3 className="job-title">{job.title}</h3>
              <p className="job-company">{job.company}</p>
              <div className="job-tags">
                <span className="job-tag">{job.location}</span>
                <span className="job-tag">{job.salary}</span>
                <span className="job-tag">{job.type}</span>
              </div>
              <p className="job-posted">{job.postedDate}</p>
            </div>
            <button
              className="view-role-btn"
              onClick={e => {
                e.stopPropagation()
                setSelectedJob(job)
              }}
            >
              View Role →
            </button>
          </div>
        ))}
      </div>

      {selectedJob !== null && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="modal-box"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setSelectedJob(null)}
            >
              ✕
            </button>

            <div className="modal-top">
              <span className="modal-type-badge">{selectedJob.type}</span>
              <h2 className="modal-job-title">{selectedJob.title}</h2>
              <p className="modal-job-company">{selectedJob.company}</p>
            </div>

            <div className="modal-meta-row">
              <div className="modal-meta-item">
                <span className="modal-meta-label">Location</span>
                <span className="modal-meta-value">{selectedJob.location}</span>
              </div>
              <div className="modal-meta-item">
                <span className="modal-meta-label">Salary</span>
                <span className="modal-meta-value">{selectedJob.salary}</span>
              </div>
              <div className="modal-meta-item">
                <span className="modal-meta-label">Posted</span>
                <span className="modal-meta-value">{selectedJob.postedDate}</span>
              </div>
            </div>

            <div className="modal-section">
              <p className="modal-section-label">About this role</p>
              <p className="modal-desc">{selectedJob.description}</p>
            </div>

            <div className="modal-section">
              <p className="modal-section-label">Your matching skills</p>
              <div className="modal-skill-row">
                {(dna.skills || []).map(skill => (
                  <span key={skill} className="modal-skill-chip">{skill}</span>
                ))}
              </div>
            </div>

            <a
              href={selectedJob.url !== '#' ? selectedJob.url : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={selectedJob.url !== '#' ? 'modal-apply-btn' : 'modal-apply-btn modal-apply-disabled'}
              onClick={selectedJob.url === '#' ? e => e.preventDefault() : undefined}
            >
              {selectedJob.url !== '#' ? 'Apply for this Role →' : 'Sample Role — No Link'}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
