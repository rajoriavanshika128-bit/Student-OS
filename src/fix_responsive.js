const fs = require('fs');
const path = require('path');


function replaceInFile(filePath, searchRegex, replacement) {
  const fullPath = path.join(__dirname, filePath);
  let content = fs.readFileSync(fullPath, 'utf8');
  content = content.replace(searchRegex, replacement);
  fs.writeFileSync(fullPath, content);
}

replaceInFile('components/Sidebar.jsx', 
  /<button[\s\S]*?className=\{`nav-toggle-btn \$\{isOpen \? 'active' : ''\}`\}[\s\S]*?onClick=\{toggle\}[\s\S]*?>[\s\S]*?<div className="nav-toggle-line" \/>[\s\S]*?<div className="nav-toggle-line" \/>[\s\S]*?<\/button>/,
  `<button className="mobile-hamburger" onClick={toggle}>
        <div className="hamburger-line" />
        <div className="hamburger-line" />
        <div className="hamburger-line" />
      </button>`
);

replaceInFile('components/Sidebar.jsx',
  /<aside className=\{`bugatti-sidebar \$\{isOpen \? 'open' : ''\}`\}>/,
  `<aside className={\`bugatti-sidebar \${isOpen ? 'open' : ''}\`}>
        <button className="mobile-close" onClick={toggle}>
          <div className="hamburger-line" style={{ transform: 'translateY(5px) rotate(45deg)' }} />
          <div className="hamburger-line" style={{ transform: 'translateY(-4px) rotate(-45deg)' }} />
        </button>`
);


replaceInFile('pages/Dashboard.jsx', 
  /<div style=\{\{ display: 'flex', alignItems: 'center', gap: 'var\(--s-10\)' \}\}>/,
  `<div className="dashboard-dna-container" style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-10)' }}>`
);

replaceInFile('pages/Dashboard.jsx',
  /<div style=\{\{ display: 'flex', gap: 24, alignItems: 'center' \}\}>/g,
  `<div className="dashboard-mission-row" style={{ display: 'flex', gap: 24, alignItems: 'center' }}>`
);

replaceInFile('pages/Dashboard.jsx',
  /<div style=\{\{ display: 'flex', justifyContent: 'space-between', marginTop: 8 \}\}>/g,
  `<div className="dashboard-mission-xp" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>`
);

replaceInFile('pages/SkillGap.jsx',
  /<span style=\{\{ fontSize: 100, fontWeight: 300, lineHeight: 1, letterSpacing: '-2px', color: 'var\(--on-dark\)', fontFamily: 'var\(--font-heading\)' \}\}>/,
  `<span className="skill-gap-pct" style={{ fontSize: 100, fontWeight: 300, lineHeight: 1, letterSpacing: '-2px', color: 'var(--on-dark)', fontFamily: 'var(--font-heading)' }}>`
);


replaceInFile('pages/Roadmap.jsx',
  /<div style=\{\{ width: '50%', padding: '0 40px', display: 'flex', justifyContent: m.align === 'left' \? 'flex-end' : 'flex-start' \}\}>/g,
  `<div className="roadmap-timeline-item" style={{ width: '50%', padding: '0 40px', display: 'flex', justifyContent: m.align === 'left' ? 'flex-end' : 'flex-start' }}>`
);


replaceInFile('pages/Missions.jsx',
  /<div className="card-elevated page-enter"/g,
  `<div className="card-elevated page-enter mission-card"`
);
replaceInFile('pages/Missions.jsx',
  /<div style=\{\{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flex: 1 \}\}>/g,
  `<div className="mission-card-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flex: 1 }}>`
);


replaceInFile('pages/Jobs.jsx',
  /<div style=\{\{ display: 'flex', gap: 16 \}\}>/g,
  `<div className="jobs-filter-tabs" style={{ display: 'flex', gap: 16 }}>`
);
replaceInFile('pages/Jobs.jsx',
  /<div style=\{\{ display: 'flex', gap: 16, alignItems: 'center' \}\}>/g,
  `<div className="jobs-sort-dropdowns" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>`
);
replaceInFile('pages/Jobs.jsx',
  /<div className="card page-enter" style=\{\{ position: 'relative', overflow: 'hidden' \}\}>/g,
  `<div className="card page-enter job-card" style={{ position: 'relative', overflow: 'hidden' }}>`
);
replaceInFile('pages/Jobs.jsx',
  /<div style=\{\{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 \}\}>/g,
  `<div className="job-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>`
);
replaceInFile('pages/Jobs.jsx',
  /<div className="card page-enter" style=\{\{ width: 800, maxHeight: '90vh', overflowY: 'auto'/g,
  `<div className="card page-enter job-modal" style={{ width: 800, maxHeight: '90vh', overflowY: 'auto'`
);


replaceInFile('pages/GitHubStats.jsx',
  /<div className="card-elevated" style=\{\{ display: 'flex', alignItems: 'center', gap: 40, marginBottom: 'var\(--spacing-section\)' \}\}>/g,
  `<div className="card-elevated github-user-card" style={{ display: 'flex', alignItems: 'center', gap: 40, marginBottom: 'var(--spacing-section)' }}>`
);


replaceInFile('pages/Interview.jsx',
  /<div style=\{\{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 40/g,
  `<div className="interview-buttons" style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 40`
);


replaceInFile('pages/Resume.jsx',
  /style=\{\{ minHeight: 400, marginBottom: 24/g,
  `style={{ minHeight: 400, height: 400, marginBottom: 24`
);
replaceInFile('pages/Resume.jsx',
  /className="input-field"/g,
  `className="input-field resume-textarea"`
);


replaceInFile('pages/FocusTimer.jsx',
  /<div style=\{\{ position: 'relative', width: 200, height: 200/g,
  `<div className="focus-svg-container" style={{ position: 'relative', width: 200, height: 200`
);
replaceInFile('pages/FocusTimer.jsx',
  /className=\{isActive \? 'heartbeat' : ''\} style=\{\{ position: 'absolute', fontFamily: 'var\(--font-heading\)', fontSize: 48/g,
  `className={\`focus-time-digits \${isActive ? 'heartbeat' : ''}\`} style={{ position: 'absolute', fontFamily: 'var(--font-heading)', fontSize: 48`
);
replaceInFile('pages/FocusTimer.jsx',
  /<div style=\{\{ display: 'flex', gap: 24 \}\}>/g,
  `<div className="focus-buttons" style={{ display: 'flex', gap: 24 }}>`
);
replaceInFile('pages/FocusTimer.jsx',
  /<div style=\{\{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 180/g,
  `<div className="session-history-chart" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 180`
);


replaceInFile('pages/Profile.jsx',
  /<div style=\{\{ display: 'flex', gap: 4, flexWrap: 'wrap' \}\}>/g,
  `<div className="heatmap-container" style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>`
);
replaceInFile('pages/Profile.jsx',
  /style=\{\{ width: 14, height: 14, background:/g,
  `className="heatmap-square" style={{ width: 14, height: 14, background:`
);

console.log("CSS targeting classes injected successfully.");
