import React, { useState, useEffect } from 'react'
import { useDNA } from '../context/DNAContext'
import HeroVideo from '../components/HeroVideo'

const SAMPLE_JOBS = {
  'Frontend Developer': [
    { id: 1, title: 'Junior Frontend Engineer', company: 'TechCorp', location: 'Remote', salary: '$70k - $90k', type: 'Full-time' },
    { id: 2, title: 'React Developer', company: 'Innovate LLC', location: 'New York, NY', salary: '$85k - $110k', type: 'Full-time' },
    { id: 3, title: 'Frontend Web Intern', company: 'StartupX', location: 'Remote', salary: '$25/hr', type: 'Internship' },
    { id: 4, title: 'UI Engineer', company: 'DesignStudio', location: 'San Francisco, CA', salary: '$95k - $120k', type: 'Full-time' },
    { id: 5, title: 'Web Developer', company: 'Local Agency', location: 'Austin, TX', salary: '$65k - $80k', type: 'Full-time' },
    { id: 6, title: 'Frontend Developer (Vue/React)', company: 'GlobalTech', location: 'Remote', salary: '$80k - $100k', type: 'Full-time' },
    { id: 7, title: 'Software Engineer Intern - Frontend', company: 'BigCorp', location: 'Seattle, WA', salary: '$35/hr', type: 'Internship' },
    { id: 8, title: 'Creative Developer', company: 'AdAgency', location: 'Remote', salary: '$75k - $95k', type: 'Full-time' }
  ],
  'Backend Developer': [
    { id: 1, title: 'Backend Software Engineer', company: 'DataSystems', location: 'Remote', salary: '$90k - $120k', type: 'Full-time' },
    { id: 2, title: 'Node.js Developer', company: 'CloudNet', location: 'Austin, TX', salary: '$85k - $110k', type: 'Full-time' },
    { id: 3, title: 'Backend Intern', company: 'TechStartup', location: 'Remote', salary: '$30/hr', type: 'Internship' },
    { id: 4, title: 'Python Backend Engineer', company: 'FinTech Group', location: 'New York, NY', salary: '$100k - $130k', type: 'Full-time' },
    { id: 5, title: 'API Developer', company: 'Services Inc', location: 'Remote', salary: '$80k - $100k', type: 'Full-time' },
    { id: 6, title: 'Junior Java Developer', company: 'Enterprise Solutions', location: 'Chicago, IL', salary: '$75k - $90k', type: 'Full-time' },
    { id: 7, title: 'Backend Systems Intern', company: 'CloudCorp', location: 'Seattle, WA', salary: '$40/hr', type: 'Internship' },
    { id: 8, title: 'Go Developer', company: 'StreamTech', location: 'Remote', salary: '$95k - $125k', type: 'Full-time' }
  ],
  'Full Stack Developer': [
    { id: 1, title: 'Full Stack Engineer', company: 'ProductCo', location: 'Remote', salary: '$100k - $130k', type: 'Full-time' },
    { id: 2, title: 'Junior Full Stack Developer', company: 'WebAgency', location: 'Denver, CO', salary: '$75k - $95k', type: 'Full-time' },
    { id: 3, title: 'Full Stack Intern', company: 'LaunchPad', location: 'Remote', salary: '$28/hr', type: 'Internship' },
    { id: 4, title: 'MERN Stack Developer', company: 'AppWorks', location: 'Los Angeles, CA', salary: '$90k - $115k', type: 'Full-time' },
    { id: 5, title: 'Software Engineer (Full Stack)', company: 'HealthTech', location: 'Remote', salary: '$105k - $140k', type: 'Full-time' },
    { id: 6, title: 'Full Stack Web Developer', company: 'EduPlatform', location: 'Boston, MA', salary: '$80k - $105k', type: 'Full-time' },
    { id: 7, title: 'Engineering Intern', company: 'FinStartup', location: 'New York, NY', salary: '$35/hr', type: 'Internship' },
    { id: 8, title: 'Senior Full Stack Engineer', company: 'ScaleUp', location: 'Remote', salary: '$130k - $160k', type: 'Full-time' }
  ],
  'UI/UX Designer': [
    { id: 1, title: 'Product Designer', company: 'DesignCo', location: 'Remote', salary: '$90k - $120k', type: 'Full-time' },
    { id: 2, title: 'Junior UX Designer', company: 'UserFirst', location: 'Seattle, WA', salary: '$70k - $85k', type: 'Full-time' },
    { id: 3, title: 'UI/UX Design Intern', company: 'CreativeStudio', location: 'Remote', salary: '$25/hr', type: 'Internship' },
    { id: 4, title: 'UI Designer', company: 'AppMakers', location: 'San Francisco, CA', salary: '$85k - $110k', type: 'Full-time' },
    { id: 5, title: 'UX Researcher', company: 'DataDriven', location: 'Remote', salary: '$95k - $125k', type: 'Full-time' },
    { id: 6, title: 'Web Designer', company: 'MarketingPro', location: 'Chicago, IL', salary: '$65k - $85k', type: 'Full-time' },
    { id: 7, title: 'Product Design Intern', company: 'TechGiant', location: 'Austin, TX', salary: '$35/hr', type: 'Internship' },
    { id: 8, title: 'Senior Product Designer', company: 'Innovate LLC', location: 'Remote', salary: '$120k - $150k', type: 'Full-time' }
  ],
  'Data Analyst': [
    { id: 1, title: 'Data Analyst', company: 'MetricsInc', location: 'Remote', salary: '$75k - $95k', type: 'Full-time' },
    { id: 2, title: 'Junior Product Analyst', company: 'AppCorp', location: 'New York, NY', salary: '$65k - $80k', type: 'Full-time' },
    { id: 3, title: 'Data Analytics Intern', company: 'InsightPartners', location: 'Remote', salary: '$22/hr', type: 'Internship' },
    { id: 4, title: 'Business Intelligence Analyst', company: 'FinanceHub', location: 'Chicago, IL', salary: '$80k - $105k', type: 'Full-time' },
    { id: 5, title: 'Marketing Data Analyst', company: 'AdGlobal', location: 'Remote', salary: '$70k - $90k', type: 'Full-time' },
    { id: 6, title: 'Data Science Intern', company: 'TechInnovators', location: 'San Francisco, CA', salary: '$40/hr', type: 'Internship' },
    { id: 7, title: 'Senior Data Analyst', company: 'BigData Co', location: 'Remote', salary: '$100k - $130k', type: 'Full-time' },
    { id: 8, title: 'Operations Analyst', company: 'LogisticsNet', location: 'Atlanta, GA', salary: '$68k - $85k', type: 'Full-time' }
  ],
  'Product Manager': [
    { id: 1, title: 'Associate Product Manager', company: 'StartupInc', location: 'Remote', salary: '$85k - $110k', type: 'Full-time' },
    { id: 2, title: 'Product Manager', company: 'TechGrowth', location: 'San Francisco, CA', salary: '$110k - $140k', type: 'Full-time' },
    { id: 3, title: 'Product Management Intern', company: 'InnovateCo', location: 'Remote', salary: '$30/hr', type: 'Internship' },
    { id: 4, title: 'Technical Product Manager', company: 'CloudSystems', location: 'Seattle, WA', salary: '$120k - $150k', type: 'Full-time' },
    { id: 5, title: 'Junior PM', company: 'AppWorks', location: 'Remote', salary: '$75k - $95k', type: 'Full-time' },
    { id: 6, title: 'Growth Product Manager', company: 'ScaleUp', location: 'New York, NY', salary: '$115k - $145k', type: 'Full-time' },
    { id: 7, title: 'APM Program', company: 'TechGiant', location: 'Mountain View, CA', salary: '$100k - $120k', type: 'Full-time' },
    { id: 8, title: 'Senior Product Manager', company: 'EnterpriseCorp', location: 'Remote', salary: '$140k - $180k', type: 'Full-time' }
  ],
  'DevOps Engineer': [
    { id: 1, title: 'Junior DevOps Engineer', company: 'CloudOps', location: 'Remote', salary: '$85k - $110k', type: 'Full-time' },
    { id: 2, title: 'Site Reliability Engineer', company: 'UptimeInc', location: 'Austin, TX', salary: '$110k - $140k', type: 'Full-time' },
    { id: 3, title: 'DevOps Intern', company: 'TechStart', location: 'Remote', salary: '$35/hr', type: 'Internship' },
    { id: 4, title: 'Cloud Engineer', company: 'AwsomeTech', location: 'Seattle, WA', salary: '$100k - $130k', type: 'Full-time' },
    { id: 5, title: 'Infrastructure Engineer', company: 'ScaleSystems', location: 'Remote', salary: '$115k - $145k', type: 'Full-time' },
    { id: 6, title: 'Release Engineer', company: 'SoftwareCo', location: 'Boston, MA', salary: '$90k - $120k', type: 'Full-time' },
    { id: 7, title: 'SRE Intern', company: 'BigCloud', location: 'San Francisco, CA', salary: '$45/hr', type: 'Internship' },
    { id: 8, title: 'Platform Engineer', company: 'ModernDev', location: 'Remote', salary: '$105k - $135k', type: 'Full-time' }
  ]
}

export default function Jobs() {
  const { dna } = useDNA()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
   
    setLoading(true)
    setTimeout(() => {
      const allJobs = SAMPLE_JOBS[dna.dreamRole] || SAMPLE_JOBS['Frontend Developer']
      setJobs(allJobs)
      setLoading(false)
    }, 1200)
  }, [dna.dreamRole])

  const filteredJobs = jobs.filter(j => {
    if (filter === 'All') return true
    if (filter === 'Remote') return j.location.includes('Remote')
    return j.type === filter
  })

  return (
    <div className="page-enter">
      <div className="hero-photo-band">
        <HeroVideo />
        <div className="section-label">Market Pulse</div>
        <h1 className="section-title">Job Market</h1>
        <div className="section-sub">Live opportunities for {dna.dreamRole}</div>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 40, borderBottom: '1px solid var(--hairline-strong)', paddingBottom: 16 }}>
        {['All', 'Remote', 'Full-time', 'Internship'].map(f => (
          <button
            key={f}
            className={`filter-tab ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
            style={{ borderRadius: 0, border: filter === f ? '1px solid var(--primary)' : '1px solid transparent', background: filter === f ? 'transparent' : 'transparent', color: filter === f ? 'var(--primary)' : 'var(--text-muted)' }}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {!loading && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'transparent', padding: '12px 24px', border: '1px solid var(--warning)', marginBottom: 40, borderRadius: 0 }}>
          <span style={{ color: 'var(--warning)', fontSize: 16 }}>⚡</span>
          <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '2px', color: 'var(--warning)', textTransform: 'uppercase' }}>SHOWING SAMPLE DATA (API KEY NOT CONFIGURED)</span>
        </div>
      )}

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {[1,2,3,4,5].map(i => <div key={i} className="skeleton" style={{ height: 160, borderRadius: 0 }} />)}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 'var(--spacing-section)' }}>
          {filteredJobs.map(job => (
            <div key={job.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '40px 32px', borderRadius: 0, borderLeft: '1px solid var(--hairline-strong)' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, letterSpacing: '2px', color: 'var(--on-dark)', textTransform: 'uppercase', marginBottom: 8 }}>{job.title}</h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 24 }}>{job.company}</div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <span className="badge" style={{ border: '1px solid var(--hairline-strong)', color: 'var(--text)', background: 'transparent' }}>{job.location.toUpperCase()}</span>
                  <span className="badge" style={{ border: '1px solid var(--success)', color: 'var(--success)', background: 'transparent' }}>{job.salary}</span>
                  <span className="badge" style={{ border: '1px solid var(--primary)', color: 'var(--primary)', background: 'transparent' }}>{job.type.toUpperCase()}</span>
                </div>
              </div>
              <button className="btn-secondary">VIEW ROLE</button>
            </div>
          ))}
          {filteredJobs.length === 0 && <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '2px', textTransform: 'uppercase' }}>NO JOBS FOUND MATCHING THE FILTER.</div>}
        </div>
      )}
    </div>
  )
}
