import React, { useState } from 'react'
import { useDNA } from '../context/DNAContext'
import { INTERVIEW_DATA } from '../data/interviewData'
import HeroVideo from '../components/HeroVideo'

const FAQ_DATA = {
  'Frontend Developer': [
    { q: 'What is the difference between == and === in JavaScript?', a: '== checks value with type coercion; === checks both value and type strictly. Always prefer === to avoid unexpected behavior.' },
    { q: 'What is the CSS Box Model?', a: 'Every element is a box made of content, padding, border, and margin. box-sizing: border-box includes padding and border in the element\'s total width.' },
    { q: 'What is the difference between let, const, and var?', a: 'var is function-scoped and hoisted. let and const are block-scoped. const cannot be reassigned but its object properties can be mutated.' },
    { q: 'What is a closure in JavaScript?', a: 'A closure is a function that retains access to its outer scope even after the outer function has returned. Useful for data encapsulation.' },
    { q: 'What does useEffect do in React?', a: 'It runs side effects after render. The dependency array controls when it re-runs: empty array = once on mount, no array = every render, with deps = when deps change.' },
    { q: 'What is the Virtual DOM?', a: 'React keeps a lightweight copy of the real DOM. On state change it diffs the virtual vs real DOM and only updates what changed, making updates efficient.' },
    { q: 'What is the difference between display: flex and display: grid?', a: 'Flexbox is one-dimensional (row or column). Grid is two-dimensional (rows and columns simultaneously). Use flex for components, grid for layouts.' },
    { q: 'What are React keys and why do they matter?', a: 'Keys help React identify which items in a list changed. Without stable keys, React may re-render unnecessarily or lose component state.' }
  ],
  'UI/UX Designer': [
    { q: 'What is the difference between UX and UI?', a: 'UX is the overall experience and flow a user has with a product. UI is the visual layer — buttons, colors, typography, and layout.' },
    { q: 'What is a wireframe vs a prototype?', a: 'A wireframe is a low-fidelity structural sketch showing layout. A prototype is an interactive simulation of the final product used for testing.' },
    { q: 'What are the 10 Nielsen Norman usability heuristics?', a: 'Core principles like visibility of system status, user control, error prevention, consistency, and flexibility that guide good interface design.' },
    { q: 'What is a design system?', a: 'A shared library of reusable components, tokens (colors, spacing, typography), and guidelines that ensure consistency across a product.' },
    { q: 'What is the difference between responsive and adaptive design?', a: 'Responsive design fluidly adjusts to any screen size. Adaptive design uses fixed layouts for specific breakpoints.' },
    { q: 'What is user research and when should it happen?', a: 'User research involves interviews, surveys, and usability tests. It should happen before design (discovery) and after (validation).' },
    { q: 'What is contrast ratio and why does it matter?', a: 'Contrast ratio measures legibility between text and background. WCAG requires at least 4.5:1 for normal text to ensure accessibility.' },
    { q: 'What is Fitts\'s Law?', a: 'The time to reach a target depends on its size and distance. Larger, closer buttons are easier to click — critical for touch and mobile UI design.' }
  ],
  'Backend Developer': [
    { q: 'What is REST and what are its core principles?', a: 'REST is an architectural style using HTTP methods (GET, POST, PUT, DELETE) with stateless communication, resource-based URLs, and standard status codes.' },
    { q: 'What is the difference between SQL and NoSQL?', a: 'SQL databases use structured tables with fixed schemas. NoSQL databases (like MongoDB) use flexible document, key-value, or graph structures.' },
    { q: 'What is middleware in Express.js?', a: 'Middleware are functions that run between a request and response. Used for auth, logging, parsing, and error handling via app.use().' },
    { q: 'What is JWT and how does authentication work?', a: 'JSON Web Tokens encode user identity. On login the server issues a signed token; the client sends it in headers on subsequent requests to verify identity.' },
    { q: 'What is the difference between authentication and authorization?', a: 'Authentication verifies who you are. Authorization determines what you are allowed to do.' },
    { q: 'What is an API rate limit and why is it used?', a: 'Rate limiting caps how many requests a client can make in a time window to prevent abuse, protect server resources, and ensure fair usage.' },
    { q: 'What is database indexing?', a: 'An index is a data structure that speeds up query lookups on a column. Without indexes, the database scans every row (full table scan).' },
    { q: 'What is the difference between PUT and PATCH?', a: 'PUT replaces the entire resource. PATCH partially updates only the specified fields.' }
  ],
  'Data Analyst': [
    { q: 'What is the difference between supervised and unsupervised learning?', a: 'Supervised learning trains on labeled data to predict outcomes. Unsupervised learning finds hidden patterns in unlabeled data (clustering, dimensionality reduction).' },
    { q: 'What is overfitting and how do you prevent it?', a: 'Overfitting is when a model memorizes training data and fails on new data. Prevent with regularization, dropout, cross-validation, or more training data.' },
    { q: 'What is the bias-variance tradeoff?', a: 'High bias = underfitting (too simple). High variance = overfitting (too complex). The goal is to balance both for good generalization.' },
    { q: 'What is a confusion matrix?', a: 'A table showing true positives, true negatives, false positives, and false negatives. Used to evaluate classification model performance.' },
    { q: 'What is the difference between a parameter and a hyperparameter?', a: 'Parameters are learned by the model during training (weights). Hyperparameters are set before training (learning rate, number of layers).' },
    { q: 'What is normalization vs standardization?', a: 'Normalization scales values to 0–1 range. Standardization transforms to mean 0, standard deviation 1. Choice depends on the algorithm used.' },
    { q: 'What is a neural network?', a: 'A system of layered nodes (neurons) that learn to map inputs to outputs through repeated exposure to data and backpropagation of errors.' },
    { q: 'What is cross-validation?', a: 'A technique that splits data into multiple folds, training and testing on different subsets, to get a more reliable estimate of model performance.' }
  ],
  'Full Stack Developer': [
    { q: 'What is the difference between == and === in JavaScript?', a: '== checks value with type coercion; === checks both value and type strictly. Always prefer === to avoid unexpected behavior.' },
    { q: 'What does useEffect do in React?', a: 'It runs side effects after render. The dependency array controls when it re-runs: empty array = once on mount, no array = every render, with deps = when deps change.' },
    { q: 'What is REST and what are its core principles?', a: 'REST is an architectural style using HTTP methods (GET, POST, PUT, DELETE) with stateless communication, resource-based URLs, and standard status codes.' },
    { q: 'What is JWT and how does authentication work?', a: 'JSON Web Tokens encode user identity. On login the server issues a signed token; the client sends it in headers on subsequent requests to verify identity.' },
    { q: 'What is the difference between SQL and NoSQL?', a: 'SQL databases use structured tables with fixed schemas. NoSQL databases (like MongoDB) use flexible document, key-value, or graph structures.' },
    { q: 'What is the difference between authentication and authorization?', a: 'Authentication verifies who you are. Authorization determines what you are allowed to do.' },
    { q: 'What are React keys and why do they matter?', a: 'Keys help React identify which items in a list changed. Without stable keys, React may re-render unnecessarily or lose component state.' }
  ],
  'Product Manager': [
    { q: 'What is the difference between a product manager and a project manager?', a: 'A product manager focuses on the "what" and "why" (vision, strategy, user needs). A project manager focuses on the "how" and "when" (execution, timelines, resources).' },
    { q: 'What is an MVP?', a: 'Minimum Viable Product. It is the most pared-down version of a product that can still be released to gather validated learning from users with the least effort.' },
    { q: 'How do you prioritize features?', a: 'Using frameworks like RICE (Reach, Impact, Confidence, Effort), Kano model, or MoSCoW to objectively decide what brings the most value vs effort.' },
    { q: 'What is agile methodology?', a: 'An iterative approach to software development that emphasizes flexibility, continuous improvement, and rapid delivery in small increments (sprints).' },
    { q: 'What is a user persona?', a: 'A semi-fictional character based on user research representing a core user segment, helping the team understand their goals, needs, and behaviors.' },
    { q: 'What are OKRs?', a: 'Objectives and Key Results. A goal-setting framework where Objectives are the qualitative goals and Key Results are the quantitative metrics to track progress.' },
    { q: 'What is A/B testing?', a: 'Comparing two versions of a webpage or feature against each other to determine which one performs better on a specific metric.' }
  ],
  'DevOps Engineer': [
    { q: 'What is CI/CD?', a: 'Continuous Integration / Continuous Deployment. CI automates merging and testing code. CD automates releasing it to staging or production.' },
    { q: 'What is Docker and why use it?', a: 'Docker packages applications and their dependencies into containers, ensuring they run consistently across any environment, eliminating "it works on my machine" issues.' },
    { q: 'What is Kubernetes?', a: 'An open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications.' },
    { q: 'What is Infrastructure as Code (IaC)?', a: 'Managing and provisioning computing infrastructure through machine-readable definition files (like Terraform) rather than physical hardware configuration.' },
    { q: 'What is the difference between a VM and a container?', a: 'VMs emulate an entire machine including the OS. Containers share the host OS kernel, making them much lighter, faster to start, and more resource-efficient.' },
    { q: 'What is a reverse proxy?', a: 'A server that sits in front of web servers and forwards client requests to them. Used for load balancing, caching, security, and SSL termination.' },
    { q: 'What is GitOps?', a: 'Using Git as the single source of truth for declarative infrastructure and applications, where changes are made via pull requests and applied automatically.' }
  ]
}

export default function Interview() {
  const { dna, addXP } = useDNA()
  const questions = INTERVIEW_DATA[dna.dreamRole] || INTERVIEW_DATA['Frontend Developer']
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  
  const faqList = FAQ_DATA[dna.dreamRole] || FAQ_DATA['Frontend Developer']
  const [openFaq, setOpenFaq] = useState(null)

  function handleNext(confident) {
    if (confident) setScore(s => s + 1)
    setFlipped(false)
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(i => i + 1)
      } else {
        setFinished(true)
        addXP(50, 'Interview Practice Complete')
      }
    }, 150)
  }

  function handleRestart() {
    setCurrentIndex(0)
    setScore(0)
    setFinished(false)
    setFlipped(false)
  }

  if (finished) {
    return (
      <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}></div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 48, marginBottom: 16, letterSpacing: '4px', textTransform: 'uppercase' }}>Practice Complete</h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-muted)', marginBottom: 40, letterSpacing: '2px', textTransform: 'uppercase' }}>You marked {score} out of {questions.length} questions as confident.</p>
        <div style={{ display: 'flex', gap: 16 }}>
          <button className="btn-secondary" onClick={handleRestart}>PRACTICE AGAIN</button>
        </div>
      </div>
    )
  }

  const q = questions[currentIndex]

  return (
    <div className="page-enter">
      <div className="hero-photo-band">
        <HeroVideo />
        <div className="section-label">Preparation</div>
        <h1 className="section-title">Interview Arena</h1>
        <div className="section-sub">Role-specific questions</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid var(--hairline-strong)', paddingBottom: 16 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>
          QUESTION {currentIndex + 1} OF {questions.length}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>
          {score} CONFIDENT
        </div>
      </div>
      
      <div className="progress-bar-track" style={{ marginBottom: 'var(--spacing-section)', height: 2 }}>
        <div className="progress-bar-fill" style={{ width: `${((currentIndex) / questions.length) * 100}%`, background: 'var(--primary)' }} />
      </div>

      <div style={{ perspective: 1200, margin: '0 auto', maxWidth: 800 }}>
        <div 
          onClick={() => setFlipped(!flipped)}
          style={{ 
            position: 'relative', 
            width: '100%', 
            minHeight: 400, 
            transformStyle: 'preserve-3d', 
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            cursor: 'pointer'
          }}
        >
         
          <div style={{ 
            position: 'absolute', inset: 0, 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: 60,
            border: '1px solid var(--hairline-strong)', background: 'var(--surface-card)'
          }}>
            <div className="section-label" style={{ marginBottom: 40, color: 'var(--text-muted)' }}>CLICK TO REVEAL ANSWER</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 400, lineHeight: 1.4, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--on-dark)' }}>{q.q}</h2>
          </div>
          
  
          <div style={{ 
            position: 'absolute', inset: 0, 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: 60,
            border: '1px solid var(--primary)', background: 'var(--canvas)'
          }}>
            <div className="section-label" style={{ marginBottom: 40, color: 'var(--primary)' }}>ANSWER</div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 20, color: 'var(--on-dark)', lineHeight: 1.6 }}>{q.a}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 40, opacity: flipped ? 1 : 0, transition: 'opacity 0.3s', pointerEvents: flipped ? 'auto' : 'none', marginBottom: 'var(--spacing-section)' }}>
        <button className="btn-secondary" onClick={() => handleNext(false)} style={{ minWidth: 160, justifyContent: 'center' }}>
          NEED REVIEW
        </button>
        <button className="btn-primary" onClick={() => handleNext(true)} style={{ minWidth: 160, justifyContent: 'center' }}>
          GOT IT
        </button>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', marginBottom: 'var(--spacing-section)' }}>
        <div style={{ 
          fontFamily: 'var(--font-heading)', 
          fontSize: 32, 
          fontWeight: 600, 
          letterSpacing: '6px', 
          color: 'var(--on-dark)', 
          marginBottom: 48,
          textTransform: 'uppercase'
        }}>— FREQUENTLY ASKED</div>
        <div>
          {faqList.map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--hairline-strong)', padding: '32px 0' }}>
              <div 
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer' }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 22, color: 'var(--on-dark)', textTransform: 'uppercase', letterSpacing: '1px', paddingRight: 32, lineHeight: 1.5 }}>
                  {item.q}
                </div>
                <div style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: 24, marginTop: -2 }}>
                  {openFaq === i ? '−' : '+'}
                </div>
              </div>
              <div 
                style={{ 
                  maxHeight: openFaq === i ? 400 : 0, 
                  overflow: 'hidden', 
                  transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 18,
                  lineHeight: 1.8
                }}
              >
                <div style={{ paddingTop: 24, paddingRight: 40 }}>
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
