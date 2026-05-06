import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

/* â”€â”€ DATA â”€â”€ */
const FACULTY = [
  {
    initials: 'HD', name: 'Harshit Desai', subject: 'Mathematics',
    cred: 'B.E., MBA â€¢ Math & SAT Expert', exp: '15+ years in International curriculum',
    quote: '"Mostly humorous, passionate about numbers and food alike."',
    courses: ['IBDP Math AA/AI', 'A Levels', 'SAT Math'],
    bio: 'Known for making the most challenging topics feel engaging. His patience knows no bounds â€” always willing to explain in different ways until the concept clicks.',
  },
  {
    initials: 'ZS', name: 'Zil Sheth', subject: 'Economics & Business Studies',
    cred: 'Actuarial Studies, IFOA, UK', exp: '6+ years in International curriculum',
    quote: '"Obsessive disorder of reading and napping!"',
    courses: ['IGCSE Economics', 'IBDP Economics', 'A Levels Business'],
    bio: 'In-depth discussions, revision sessions and concept checkers. Guides students closely through Internal Assessments with insights that refine their work.',
  },
  {
    initials: 'PS', name: 'Pradeep Singh', subject: 'Physics',
    cred: 'B.Tech, IIT â€¢ Physics Expert', exp: '9+ years in International curriculum',
    quote: '"Science Experiments and Robotics enthusiast"',
    courses: ['IBDP Physics', 'A Levels', 'IIT JEE / NEET', 'Olympiads'],
    bio: 'Balances concept clarity with past paper practice. Extra sessions before exams â€” encourages every question, never lets a student feel their doubt is too basic.',
  },
  {
    initials: 'YH', name: 'Dr. Yash Hemani', subject: 'Sciences & Math',
    cred: 'PhD Biosciences, Univ. of Birmingham, UK', exp: '15+ years in International curriculum',
    quote: '"Singer, pianist, and culinary enthusiast"',
    courses: ['IGCSE Sciences', 'IGCSE Math', 'IBDP Chemistry', 'IBDP Biology'],
    bio: 'Transforms "I have to study" into "I get to learn." Encourages experiential learning over rote memorisation â€” his students consistently achieve 8 A*s at IGCSE.',
  },
]

const COURSES = [
  { icon: 'âˆ‘', name: 'Mathematics', boards: 'IBDP AA/AI HL&SL â€¢ A Levels â€¢ SAT', desc: 'Pure math, statistics, calculus and SAT prep taught by a B.E., MBA math specialist.' },
  { icon: 'âš›', name: 'Physics', boards: 'IBDP â€¢ A Levels â€¢ IIT JEE â€¢ NEET â€¢ Olympiads', desc: 'Mechanics to quantum â€” with an IIT graduate who makes every session engaging.' },
  { icon: 'ðŸ§¬', name: 'Chemistry & Biology', boards: 'IGCSE â€¢ IBDP HL&SL', desc: 'Taught by a PhD from the University of Birmingham. Experiential learning over memorisation.' },
  { icon: 'ðŸ“ˆ', name: 'Economics', boards: 'IGCSE â€¢ IBDP HL&SL â€¢ A Levels', desc: 'Real-world case studies, board exam strategy, and IA mentoring by an IFOA-qualified actuary.' },
  { icon: 'ðŸ’¼', name: 'Business Studies', boards: 'IGCSE â€¢ IBDP â€¢ A Levels', desc: 'Concept-driven business understanding with structured response training and feedback cycles.' },
  { icon: 'ðŸ“', name: 'SAT Prep', boards: 'Math â€¢ Evidence-Based Reading', desc: 'Targeted SAT preparation with practice tests, score analysis, and section-specific strategies.' },
]

const TESTIMONIALS = [
  { initials: 'SI', name: 'Sushmita Iyer', score: '7/7', info: 'IBDP Math AAHL â€¢ Hill Spring International', text: "Each class with Harshit sir has been an unforgettable experience, brimming with energy and fun. His patience knows no bounds â€” he's always willing to explain in different ways until I grasp it fully." },
  { initials: 'KD', name: 'Krishna Damania', score: '7/7', info: 'IBDP Economics â€¢ Hill Spring International', text: "In Zil Ma'am's Economics lessons, in-depth discussions helped me grasp the subject much more effectively. She guided us closely through Internal Assessments with valuable insights that helped refine our work." },
  { initials: 'SI2', name: 'Soumil Iyer', score: '7/7', info: 'IBDP Physics HL â€¢ Garodia International', text: "Pradeep Sir's lessons sparked my interest in physics and greatly improved my ability to solve IB questions. Every class was engaging â€” never boring â€” and I'm much more confident in physics now." },
  { initials: 'NV', name: 'Nishka Vaghela', score: '8 A*', info: 'IGCSE Grade 10 â€¢ Hiranandani Foundation', text: 'Ever since I started Dr. Yash Hemani Sir\'s classes, my approach to learning changed â€” from "I have to study" to "I get to learn." His passion made every class fly by. I achieved 8 A*s in my IGCSE subjects.' },
]

const PLANS = [
  {
    name: 'Trial', price: 'Free', per: '/ 1 session', featured: false,
    desc: 'See the Raj Vidya difference before you commit.',
    features: ['1 free demo class', 'Any subject, any topic', 'Meet your faculty', 'No obligation'],
    amount: 0,
  },
  {
    name: 'Monthly', price: 'â‚¹8,000', per: '/ month', featured: true,
    desc: 'Consistent weekly sessions with a dedicated mentor.',
    features: ['8 sessions per month', '1 subject of your choice', 'Study material included', 'WhatsApp doubt clearing', 'Extra pre-exam sessions'],
    amount: 800000,
  },
  {
    name: 'Intensive', price: 'â‚¹22,000', per: '/ 3 months', featured: false,
    desc: 'Full exam prep package for boards and university entry.',
    features: ['24+ sessions', 'Up to 2 subjects', 'Past paper practice', 'Pre-exam intensive sessions', 'Progress reports to parents', 'Priority scheduling'],
    amount: 2200000,
  },
]

/* â”€â”€ AURORA MOUSE EFFECT â”€â”€ */
function AuroraMouseEffect() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, animId

    let blobX = -300, blobY = -300
    let targetX = -300, targetY = -300
    let blobScale = 1, targetScale = 1

    const trail = []
    const MAX_TRAIL = 28

    const orbs = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 120 + Math.random() * 160,
      hue: [170, 165, 180, 175, 168, 172][i],
      speed: 0.0003 + Math.random() * 0.0004,
      offset: Math.random() * Math.PI * 2,
    }))

    let stars = null

    function resize() {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
      stars = null
    }
    resize()
    window.addEventListener('resize', resize)

    const hero = document.getElementById('home') || canvas.parentElement

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect()
      targetX = e.clientX - rect.left
      targetY = e.clientY - rect.top
      targetScale = 1.25
    }
    function onMouseLeave() { targetX = W / 2; targetY = H / 2; targetScale = 0.85 }
    function onMouseDown() { targetScale = 0.65 }
    function onMouseUp()   { targetScale = 1.25 }

    hero.addEventListener('mousemove', onMouseMove)
    hero.addEventListener('mouseleave', onMouseLeave)
    hero.addEventListener('mousedown', onMouseDown)
    hero.addEventListener('mouseup', onMouseUp)

    targetX = W / 2; targetY = H / 2
    blobX = W / 2;   blobY = H / 2

    let t = 0
    function draw() {
      animId = requestAnimationFrame(draw)
      t += 0.01
      ctx.clearRect(0, 0, W, H)

      // 1. Ambient floating orbs
      orbs.forEach(orb => {
        const ox = orb.x * W + Math.sin(t * orb.speed * 300 + orb.offset) * 60
        const oy = orb.y * H + Math.cos(t * orb.speed * 200 + orb.offset) * 40
        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r)
        g.addColorStop(0, `hsla(${orb.hue},80%,62%,0.07)`)
        g.addColorStop(1, 'transparent')
        ctx.beginPath(); ctx.arc(ox, oy, orb.r, 0, Math.PI * 2)
        ctx.fillStyle = g; ctx.fill()
      })

      // 2. Smooth lerp
      blobX += (targetX - blobX) * 0.07
      blobY += (targetY - blobY) * 0.07
      blobScale += (targetScale - blobScale) * 0.08

      trail.push({ x: blobX, y: blobY })
      if (trail.length > MAX_TRAIL) trail.shift()

      // 3. Aurora trail
      trail.forEach((p, i) => {
        const progress = i / trail.length
        const r = 90 * progress * blobScale
        const hue = 170 + Math.sin(t * 2 + i * 0.3) * 14
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r)
        g.addColorStop(0, `hsla(${hue},90%,65%,${progress * 0.18})`)
        g.addColorStop(1, 'transparent')
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = g; ctx.fill()
      })

      // 4. Main glowing blob
      const mainR = 140 * blobScale
      const h1 = 172 + Math.sin(t * 1.3) * 10
      const h2 = 182 + Math.cos(t * 0.9) * 12
      const mg = ctx.createRadialGradient(blobX, blobY, 0, blobX, blobY, mainR)
      mg.addColorStop(0, `hsla(${h1},80%,62%,0.45)`)
      mg.addColorStop(0.4, `hsla(${h2},75%,55%,0.22)`)
      mg.addColorStop(1, 'transparent')
      ctx.beginPath(); ctx.arc(blobX, blobY, mainR, 0, Math.PI * 2)
      ctx.fillStyle = mg; ctx.fill()

      // 5. Bright core
      const cg = ctx.createRadialGradient(blobX, blobY, 0, blobX, blobY, 12 * blobScale)
      cg.addColorStop(0, 'rgba(62,205,184,0.9)')
      cg.addColorStop(1, 'transparent')
      ctx.beginPath(); ctx.arc(blobX, blobY, 12 * blobScale, 0, Math.PI * 2)
      ctx.fillStyle = cg; ctx.fill()

      // 6. Starfield
      if (!stars) {
        stars = Array.from({ length: 70 }, () => ({
          x: Math.random() * W, y: Math.random() * H,
          r: 0.5 + Math.random() * 1.2,
          a: 0.1 + Math.random() * 0.4,
          flicker: Math.random() * Math.PI * 2,
          speed: 0.8 + Math.random() * 1.5,
        }))
      }
      stars.forEach(s => {
        const alpha = s.a * (0.6 + 0.4 * Math.sin(t * s.speed + s.flicker))
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(62,205,184,${alpha})`; ctx.fill()
      })
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      hero.removeEventListener('mousemove', onMouseMove)
      hero.removeEventListener('mouseleave', onMouseLeave)
      hero.removeEventListener('mousedown', onMouseDown)
      hero.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-canvas" style={{ cursor: 'none' }} />
}


/* â”€â”€ SCROLL REVEAL HOOK â”€â”€ */
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}


/* â”€â”€ PAYMENT MODAL â”€â”€ */
function PaymentModal({ plan, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '' })

  if (!plan) return null

  function handlePay() {
    if (!form.name || !form.phone || !form.subject) {
      alert('Please fill in all required fields.')
      return
    }
    if (plan.amount === 0) {
      onClose()
      alert(`Your free demo request has been submitted!\nWe'll call you at ${form.phone} within 24 hours.\n\nThank you, ${form.name}!`)
      return
    }
    try {
      const rzp = new window.Razorpay({
        key: 'YOUR_RAZORPAY_KEY_ID', // â† Replace with your Razorpay key
        amount: plan.amount,
        currency: 'INR',
        name: 'Raj Vidya Higher Studies',
        description: `${plan.name} Plan â€” ${form.subject}`,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        notes: { subject: form.subject, plan: plan.name },
        theme: { color: '#2563EB' },
        handler(response) {
          onClose()
          alert(`ðŸŽ‰ Payment successful!\nPayment ID: ${response.razorpay_payment_id}\n\nWelcome to Raj Vidya, ${form.name}!`)
        },
      })
      rzp.open()
    } catch {
      alert('To activate payments, replace YOUR_RAZORPAY_KEY_ID in the code.\n\nFor now, call us at +91 98672 34400 to enroll.')
    }
  }

  return (
    <div className={`modal-overlay open`} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">Complete Enrollment</div>
        <div className="modal-sub">Fill in your details to proceed.</div>
        <div className="modal-plan-badge">{plan.name} â€” {plan.price}</div>
        <div className="modal-form">
          {[
            { key: 'name', placeholder: 'Full Name *', type: 'text' },
            { key: 'email', placeholder: 'Email Address', type: 'email' },
            { key: 'phone', placeholder: 'Phone Number *', type: 'tel' },
          ].map(f => (
            <input key={f.key} className="modal-input" type={f.type} placeholder={f.placeholder}
              value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} />
          ))}
          <select className="modal-input" value={form.subject}
            onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}>
            <option value="" disabled>Select Subject *</option>
            {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Business Studies', 'Sciences & Math Package'].map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="modal-actions">
          <button className="modal-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="modal-pay-btn" onClick={handlePay}>Pay Securely â†’</button>
        </div>
        <div className="razorpay-note">Secured by <span>Razorpay</span> Â· UPI, Cards, Net Banking</div>
      </div>
    </div>
  )
}

/* â”€â”€ MAIN PAGE â”€â”€ */
export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePlan, setActivePlan] = useState(null)
  const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '', subject: '', board: '', msg: '' })

  useReveal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Load Razorpay script
  useEffect(() => {
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    document.body.appendChild(s)
  }, [])

  function scrollTo(id) {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleContact(e) {
    e.preventDefault()
    alert(`Thank you, ${contactForm.name}!\nWe'll call you at ${contactForm.phone} within 24 hours.\n\nRaj Vidya Higher Studies`)
    setContactForm({ name: '', phone: '', email: '', subject: '', board: '', msg: '' })
  }

  return (
    <>
      <Head>
        <title>Raj Vidya Higher Studies â€“ International Curriculum Experts</title>
        <meta name="description" content="Expert mentoring in IBDP, IGCSE, A Levels & SAT. Mumbai's top international curriculum specialists." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>

      {/* â”€â”€ NAV â”€â”€ */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="page-width" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <a href="#" className="nav-logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false) }}>
            <Image src="/logo.png" alt="Raj Vidya Higher Studies" width={140} height={38} style={{ objectFit: 'contain', borderRadius: 6 }} />
          </a>
          <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
            {['about', 'faculty', 'courses', 'pricing', 'contact'].map(id => (
              <li key={id}>
                <a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id) }}>
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="nav-cta reveal reveal-delay-1" onClick={() => scrollTo('pricing')}>Book Demo</button>
            <button className="nav-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(o => !o)}>
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* â”€â”€ HERO â”€â”€ */}
      <section className="hero" id="home">
        <AuroraMouseEffect />
        <div className="hero-inner page-width">
          <div className="hero-content">
            <div className="hero-badge">ðŸŽ“ International Curriculum Experts</div>
            <h1 className="hero-title">
              A good teacher changes <em>everything.</em>
            </h1>
            <p className="hero-sub">
              Expert mentoring in IBDP, IGCSE, A Levels &amp; SAT. Simplifying the world&apos;s toughest curricula â€” one student at a time.
            </p>
          <div className="hero-actions">
            <button className="btn-primary reveal reveal-delay-1" onClick={() => scrollTo('pricing')}>Enroll Now</button>
            <button className="btn-secondary reveal reveal-delay-2" onClick={() => scrollTo('faculty')}>Meet Our Faculty â†’</button>
          </div>
          </div>
          <div className="hero-stats">
            {[['15+', 'Years Experience'], ['4', 'Expert Faculty'], ['7/7', 'IB Results']].map(([num, label], i) => (
              <div key={label} className={`stat-box reveal reveal-delay-${i + 1}`}>
                <div className="stat-num">{num}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ ABOUT â”€â”€ */}
      <section id="about" className="about-section">
        <div className="page-width">
          <div className="reveal">
            <p className="section-label">Who We Are</p>
            <h2 className="section-title">Where international students find their edge.</h2>
            <p className="section-sub">Located in the heart of Mumbai, Raj Vidya Higher Studies is home to a handpicked team of subject specialists â€” each with deep experience in the international curriculum.</p>
          </div>
          <div className="about-grid">
            <div className="about-visual reveal reveal-delay-1">
              {[
                { icon: 'ðŸ“', title: 'Math & Sciences', text: 'IBDP, IGCSE, A Levels, IIT JEE, NEET, SAT coverage' },
                { icon: 'ðŸ“Š', title: 'Economics & Business', text: 'Case-based learning with board exam-focused practice' },
                { icon: 'ðŸ†', title: 'Consistent 7/7 Results', text: 'Students consistently achieve top scores across subjects' },
              ].map((c, i) => (
                <div key={i} className="about-card-3d">
                  <div className="about-card-icon">{c.icon}</div>
                  <div className="about-card-title">{c.title}</div>
                  <div className="about-card-text">{c.text}</div>
                </div>
              ))}
            </div>
            <div className="reveal reveal-delay-2">
              <p className="section-label">Our Approach</p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: '#fff', marginBottom: 14 }}>
                Concept clarity before exam strategy.
              </h3>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.68)', lineHeight: 1.75, marginBottom: 8 }}>
                We believe that deep understanding beats rote learning every time. Our faculty don&apos;t just teach â€” they mentor, adapt, and inspire.
              </p>
              <ul className="about-list">
                {[
                  'Small batch sizes for personalised attention',
                  'Extra sessions before examinations',
                  'Mumbai centres in Powai & Grant Road',
                ].map(item => <li key={item}>{item}</li>)}
              </ul>
              <div style={{ marginTop: 28 }}>
                <a href="tel:+919867234400" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#2563EB', fontWeight: 500, textDecoration: 'none' }}>
                  ðŸ“ž +91 98672 34400
                </a>
              </div>
              <div className="motto-box">
                <div className="motto-label">Our Motto</div>
                <div className="motto-text">A good course can change you a lot. A good teacher changes <em>everything.</em></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ FACULTY â”€â”€ */}
      <section id="faculty" className="faculty-section">
        <div className="page-width">
          <div className="reveal">
            <p className="section-label">Our Faculty</p>
            <h2 className="section-title">The minds behind every breakthrough moment.</h2>
            <p className="section-sub">Hover on each card to see full details. Every member brings real-world credentials and genuine passion.</p>
          </div>
          <div className="faculty-grid">
            {FACULTY.map((f, i) => (
              <div key={f.name} className={`faculty-card reveal reveal-delay-${i + 1}`}>
                <div className="faculty-card-inner">
                  <div className="faculty-front">
                    <div className="faculty-avatar">{f.initials}</div>
                    <div className="faculty-name">{f.name}</div>
                    <div className="faculty-subject">{f.subject}</div>
                    <div className="faculty-cred">{f.cred}</div>
                    <div className="faculty-exp">{f.exp}</div>
                    <div className="faculty-flip-hint">Hover to learn more â†»</div>
                  </div>
                  <div className="faculty-back">
                    <div className="faculty-back-name">{f.name}</div>
                    <div className="faculty-back-tag">{f.quote}</div>
                    <div className="faculty-courses-title">Teaches</div>
                    <div className="faculty-courses">
                      {f.courses.map(c => <span key={c} className="course-pill">{c}</span>)}
                    </div>
                    <div className="faculty-back-quote">{f.bio}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ COURSES â”€â”€ */}
      <section id="courses" className="courses-section">
        <div className="page-width">
          <div className="reveal">
            <p className="section-label">What We Teach</p>
            <h2 className="section-title">Every subject. Every board. Simplified.</h2>
            <p className="section-sub">From foundation level to advanced higher studies â€” our curriculum coverage is comprehensive.</p>
          </div>
          <div className="courses-grid">
            {COURSES.map((c, i) => (
              <div key={c.name} className={`course-card reveal reveal-delay-${(i % 4) + 1}`}>
                <div className="course-icon">{c.icon}</div>
                <div className="course-name">{c.name}</div>
                <div className="course-boards">{c.boards}</div>
                <div className="course-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ PRICING â”€â”€ */}
      <section id="pricing" className="pricing-section">
        <div className="page-width">
          <div className="reveal">
            <p className="section-label">Enrollment</p>
            <h2 className="section-title">Simple, transparent pricing.</h2>
            <p className="section-sub">Choose a plan that works for your child&apos;s needs.</p>
          </div>
          <div className="pricing-grid">
            {PLANS.map((plan, i) => (
              <div key={plan.name} className={`pricing-card reveal reveal-delay-${i + 1}${plan.featured ? ' featured' : ''}`}>
                {plan.featured && <div className="featured-badge">Most Popular</div>}
                <div className="plan-name">{plan.name}</div>
                <div className="plan-price">{plan.price} <span>{plan.per}</span></div>
                <div className="plan-desc">{plan.desc}</div>
                <ul className="plan-features">
                  {plan.features.map(f => <li key={f}>{f}</li>)}
                </ul>
                <button
                  className={`pay-btn ${plan.featured ? 'pay-btn-primary' : 'pay-btn-outline'}`}
                  onClick={() => setActivePlan(plan)}>
                  {plan.amount === 0 ? 'Book Free Demo' : 'Enroll Now'}
                </button>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: 'rgba(212,237,233,0.45)', marginTop: 24, textAlign: 'center' }}>
            ðŸ“ Powai & Grant Road, Mumbai &nbsp;|&nbsp; ðŸ“ž{' '}
            <a href="tel:+919867234400" style={{ color: '#2563EB' }}>+91 98672 34400</a>
          </p>
        </div>
      </section>

      {/* â”€â”€ TESTIMONIALS â”€â”€ */}
      <section id="testimonials" className="testimonials-section">
        <div className="page-width">
          <div className="reveal">
            <p className="section-label">Student Stories</p>
            <h2 className="section-title">What our students say.</h2>
          </div>
          <div className="testimonials-scroll">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`testimonial-card reveal reveal-delay-${(i % 4) + 1}`}>
                <div className="testi-quote">&ldquo;</div>
                <div className="testi-text">{t.text}</div>
                <div className="testi-meta">
                  <div className="testi-avatar">{t.initials.replace('2', '')}</div>
                  <div>
                    <div className="testi-name">{t.name} <span className="score-pill">{t.score}</span></div>
                    <div className="testi-info">{t.info}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ CONTACT â”€â”€ */}
      <section id="contact" className="contact-section">
        <div className="page-width">
          <div className="reveal">
            <p className="section-label">Get In Touch</p>
            <h2 className="section-title">Let&apos;s start your learning journey.</h2>
            <p className="section-sub">Reach us directly or fill out the form â€” we&apos;ll get back to you within 24 hours.</p>
          </div>
          <div className="contact-grid">
            <div className="reveal reveal-delay-1">
              {[
                { icon: 'ðŸ“ž', label: 'Call / WhatsApp', value: <a href="tel:+919867234400">+91 98672 34400</a> },
                { icon: 'ðŸ“', label: 'Centre 1 â€” Powai', value: '161, Powai Plaza, Central Avenue, Hiranandani Gardens, Powai, Mumbai â€“ 400076' },
                { icon: 'ðŸ“', label: 'Centre 2 â€” Grant Road', value: '107, Auto Commerce House, Grant Road (East), Mumbai â€“ 400007' },
              ].map((c, i) => (
                <div key={i} className="contact-item">
                  <div className="contact-icon">{c.icon}</div>
                  <div>
                    <div className="contact-label">{c.label}</div>
                    <div className="contact-value">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <form className="contact-form reveal reveal-delay-2" onSubmit={handleContact}>
              <div className="form-row">
                <input className="form-input" type="text" placeholder="Your Name" required
                  value={contactForm.name} onChange={e => setContactForm(p => ({ ...p, name: e.target.value }))} />
                <input className="form-input" type="tel" placeholder="Phone Number" required
                  value={contactForm.phone} onChange={e => setContactForm(p => ({ ...p, phone: e.target.value }))} />
              </div>
              <input className="form-input" type="email" placeholder="Email Address"
                value={contactForm.email} onChange={e => setContactForm(p => ({ ...p, email: e.target.value }))} />
              <select className="form-select form-input"
                value={contactForm.subject} onChange={e => setContactForm(p => ({ ...p, subject: e.target.value }))}>
                <option value="" disabled>Select Subject of Interest</option>
                {['Mathematics (IBDP / A Levels / SAT)', 'Physics (IBDP / A Levels / IIT JEE / NEET)',
                  'Chemistry (IGCSE / IBDP)', 'Biology (IGCSE / IBDP)',
                  'Economics (IGCSE / IBDP / A Levels)', 'Business Studies (IGCSE / IBDP / A Levels)',
                  'Sciences & Math Package', 'Other / Not Sure Yet'].map(s => <option key={s}>{s}</option>)}
              </select>
              <select className="form-select form-input"
                value={contactForm.board} onChange={e => setContactForm(p => ({ ...p, board: e.target.value }))}>
                <option value="" disabled>Curriculum / Board</option>
                {['IBDP', 'IGCSE', 'A Levels', 'IIT JEE', 'NEET', 'SAT', 'Olympiad'].map(b => <option key={b}>{b}</option>)}
              </select>
              <textarea className="form-textarea form-input" placeholder="Any additional information..."
                value={contactForm.msg} onChange={e => setContactForm(p => ({ ...p, msg: e.target.value }))} />
              <button type="submit" className="form-submit">Send Message ðŸ“¨</button>
            </form>
          </div>
        </div>
      </section>

      {/* â”€â”€ FOOTER â”€â”€ */}
      <footer>
        <span className="footer-copy">Â© 2025 Raj Vidya Higher Studies. Mumbai, India.</span>
        <span className="footer-tagline">A good teacher changes everything.</span>
      </footer>

      {/* â”€â”€ PAYMENT MODAL â”€â”€ */}
      <PaymentModal plan={activePlan} onClose={() => setActivePlan(null)} />
    </>
  )
}

