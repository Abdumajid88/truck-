import { useEffect, useMemo, useRef, useState } from 'react'

import './App.css'

const services = [
  {
    title: 'Mahalliy tashish',
    text: 'Shahar ichida tezkor yetkazib berish, soatlik monitoring va xavfsiz yuklarni joylashtirish.',
    icon: '🛻',
  },
  {
    title: 'Xalqaro tashish',
    text: 'Chegara bo‘ylab yuk tashish, bojxona hujjatlari va tranzit loyihalarini yengillik bilan boshqarish.',
    icon: '🌐',
  },
  {
    title: 'Og‘ir yuk tashish',
    text: 'Yirik qurilmalar, mashinalar va maxsus uskunalar uchun maxsus transport hamda marshrut rejalashtirish.',
    icon: '⚙️',
  },
  {
    title: 'Konteyner tashish',
    text: 'Portlar, omborxonalar va logistika markazlari o‘rtasida tezkor konteyner yetkazib berish.',
    icon: '📦',
  },
]

const wheel = (cx, cy, r = 6) => (
  <g key={`wheel-${cx}-${cy}`}>
    <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth="2.5" />
    <circle cx={cx} cy={cy} r={r * 0.45} fill="currentColor" opacity="0.35" />
  </g>
)

const fleet = [
  {
    name: 'Tent',
    capacity: '3.5 t',
    volume: '20 m³',
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="4" y="22" width="30" height="16" rx="2" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="2" />
        <path d="M8 22 L18 14 L28 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M10 26h18M10 30h18M10 34h18" stroke="currentColor" strokeWidth="1" opacity="0.45" />
        <path d="M34 28 L34 38 L48 38 L54 32 L54 24 L44 24 Z" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M48 26 L52 30 L48 32 Z" fill="currentColor" opacity="0.35" />
        <path d="M4 38h50" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        {wheel(16, 42)}
        {wheel(46, 42)}
      </svg>
    ),
  },
  {
    name: 'Refrijerator',
    capacity: '2.8 t',
    volume: '14 m³',
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="4" y="20" width="30" height="18" rx="2" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="2" />
        <rect x="8" y="24" width="8" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 28h4M10 31h4" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <path d="M34 26 L34 38 L50 38 L56 32 L56 22 L42 22 Z" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M50 24 L54 28 L50 30 Z" fill="currentColor" opacity="0.35" />
        <circle cx="20" cy="14" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 11v6M17 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 38h52" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        {wheel(16, 42)}
        {wheel(48, 42)}
      </svg>
    ),
  },
  {
    name: 'Platforma',
    capacity: '5 t',
    volume: '28 m³',
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="4" y="28" width="38" height="4" rx="1" fill="currentColor" opacity="0.25" />
        <path d="M8 32h34M12 24v8M24 22v10M36 24v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M42 26 L42 38 L54 38 L58 34 L58 24 L48 24 Z" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M52 26 L56 30 L52 32 Z" fill="currentColor" opacity="0.35" />
        <path d="M4 38h54" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        {wheel(18, 42)}
        {wheel(50, 42)}
      </svg>
    ),
  },
  {
    name: 'Konteynervoz',
    capacity: '8 t',
    volume: '35 m³',
    icon: (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="2" y="18" width="36" height="20" rx="2" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="2" />
        <path d="M6 22h28M6 26h28M6 30h28M6 34h28" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <rect x="38" y="22" width="18" height="16" rx="2" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />
        <path d="M52 24 L56 28 L52 30 Z" fill="currentColor" opacity="0.35" />
        <path d="M2 38h54" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        {wheel(14, 42)}
        {wheel(30, 42)}
        {wheel(50, 42)}
      </svg>
    ),
  },
]

const truckWheel = (cx, cy, r = 13) => (
  <g key={`truck-wheel-${cx}`}>
    <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth="3" />
    <circle cx={cx} cy={cy} r={r * 0.38} fill="currentColor" opacity="0.3" />
    <circle cx={cx} cy={cy} r={2.5} fill="currentColor" />
  </g>
)

const trucks = [
  {
    title: 'Isuzu N-Series',
    price: 86000000,
    mileage: '420 000 km',
    image: (
      <svg viewBox="0 0 180 110" aria-hidden="true">
        <ellipse cx="90" cy="98" rx="72" ry="4" fill="currentColor" opacity="0.12" />
        <rect x="12" y="38" width="78" height="36" rx="4" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 38 L28 28 L72 28 L84 38" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M22 44h58M22 52h58M22 60h58" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <path d="M90 42 L90 74 L118 74 L138 58 L138 36 L108 36 Z" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M118 40 L134 52 L118 56 Z" fill="currentColor" opacity="0.35" />
        <rect x="132" y="52" width="6" height="14" rx="1" fill="currentColor" opacity="0.45" />
        <path d="M10 74h158" stroke="currentColor" strokeWidth="2" opacity="0.4" />
        {truckWheel(44, 82)}
        {truckWheel(118, 82)}
      </svg>
    ),
    perks: ['GPS kuzatuv', 'Konditsioner', 'Sug‘urta'],
  },
  {
    title: 'Volvo FH',
    price: 124000000,
    mileage: '310 000 km',
    image: (
      <svg viewBox="0 0 180 110" aria-hidden="true">
        <ellipse cx="90" cy="98" rx="76" ry="4" fill="currentColor" opacity="0.12" />
        <rect x="8" y="36" width="88" height="38" rx="3" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2.5" />
        <path d="M12 40h80M12 48h80M12 56h80M12 64h80" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path d="M96 38 L96 74 L128 74 L156 56 L156 30 L118 30 Z" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M128 34 L152 50 L128 54 Z" fill="currentColor" opacity="0.35" />
        <path d="M148 48v18M152 48v18M156 48v18" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <path d="M100 22 L108 30 L118 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 74h164" stroke="currentColor" strokeWidth="2" opacity="0.4" />
        {truckWheel(38, 82)}
        {truckWheel(72, 82)}
        {truckWheel(132, 82)}
      </svg>
    ),
    perks: ['Yengil yuk', '24/7 monitoring', 'Bojxona hujjat'],
  },
  {
    title: 'Scania S-series',
    price: 142000000,
    mileage: '260 000 km',
    image: (
      <svg viewBox="0 0 180 110" aria-hidden="true">
        <ellipse cx="90" cy="98" rx="74" ry="4" fill="currentColor" opacity="0.12" />
        <rect x="10" y="34" width="86" height="40" rx="3" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2.5" />
        <rect x="14" y="38" width="78" height="14" rx="2" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1.5" />
        <path d="M96 36 Q96 28 118 28 L148 28 Q160 28 160 40 L160 74 L128 74 L96 58 Z" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M132 32 L156 46 L132 50 Z" fill="currentColor" opacity="0.35" />
        <path d="M152 50v16M156 50v16" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <circle cx="22" cy="44" r="3" fill="currentColor" opacity="0.4" />
        <circle cx="34" cy="44" r="3" fill="currentColor" opacity="0.4" />
        <path d="M8 74h160" stroke="currentColor" strokeWidth="2" opacity="0.4" />
        {truckWheel(40, 82)}
        {truckWheel(74, 82)}
        {truckWheel(136, 82)}
      </svg>
    ),
    perks: ['Refrijerator', 'Dvigatel garantiya', 'Sug‘urta'],
  },
  {
    title: 'MAN TGX',
    price: 132000000,
    mileage: '290 000 km',
    image: (
      <svg viewBox="0 0 180 110" aria-hidden="true">
        <ellipse cx="90" cy="98" rx="75" ry="4" fill="currentColor" opacity="0.12" />
        <rect x="10" y="36" width="90" height="38" rx="3" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2.5" />
        <path d="M14 42h82M14 50h82M14 58h82" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <path d="M100 38 L100 74 L132 74 L158 58 L158 32 L122 32 Z" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M132 36 L154 50 L132 54 Z" fill="currentColor" opacity="0.35" />
        <rect x="150" y="48" width="8" height="16" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M152 52h4M152 56h4M152 60h4" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <path d="M104 24 L112 32 L124 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 74h162" stroke="currentColor" strokeWidth="2" opacity="0.4" />
        {truckWheel(42, 82)}
        {truckWheel(76, 82)}
        {truckWheel(134, 82)}
      </svg>
    ),
    perks: ['Konditsioner', 'GPS', 'Yuk xavfsizligi'],
  },
]

const vehicleRates = {
  tent: { base: 140000, perKm: 1400, weight: 70000 },
  refrigerator: { base: 190000, perKm: 1800, weight: 90000 },
  platform: { base: 160000, perKm: 1500, weight: 80000 },
  container: { base: 220000, perKm: 2100, weight: 100000 },
}

function Reveal({ children, className = '', delay = 0, as: Component = 'div' }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      setIsVisible(true)
      return undefined
    }

    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.16 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Component
      ref={ref}
      className={`reveal ${isVisible ? 'in-view' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Component>
  )
}

const initialContact = {
  name: '',
  phone: '',
  route: '',
  model: '',
  message: '',
}

const initialTruckForm = {
  model: '',
  year: '',
  price: '',
  mileage: '',
  status: 'Yangi',
  phone: '',
  description: '',
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [distance, setDistance] = useState(320)
  const [weight, setWeight] = useState(4.5)
  const [vehicle, setVehicle] = useState('tent')
  const [contact, setContact] = useState(initialContact)
  const [contactStatus, setContactStatus] = useState('')
  const [registerOpen, setRegisterOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('owner')
  const [registerForm, setRegisterForm] = useState({
    role: 'owner',
    name: '',
    phone: '',
    password: '',
    company: '',
    vehicles: '',
  })
  const [registerStatus, setRegisterStatus] = useState('')
  const [truckForm, setTruckForm] = useState(initialTruckForm)
  const [truckStatus, setTruckStatus] = useState('')
  const [truckPreview, setTruckPreview] = useState('')
  const [truckImageName, setTruckImageName] = useState('')
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mediaQuery.matches)
    const onChange = (event) => setReduceMotion(event.matches)
    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  const estimate = useMemo(() => {
    const rate = vehicleRates[vehicle]
    const total = rate.base + distance * rate.perKm + weight * rate.weight
    return {
      total,
      perKm: rate.perKm,
      base: rate.base,
    }
  }, [distance, vehicle, weight])

  const formatPrice = (value) => `${new Intl.NumberFormat('uz-UZ', { maximumFractionDigits: 0 }).format(value)} so'm`

  const handleContactSubmit = (event) => {
    event.preventDefault()
    const name = contact.name.trim() || 'hurmatli mijoz'
    setContactStatus(`Rahmat, ${name}! Bizning managerlarimiz tez orada siz bilan bog'lanadi.`)
    setContact(initialContact)
  }

  const handleRegisterSubmit = (event) => {
    event.preventDefault()
    const name = registerForm.name.trim() || 'yangi ishtirokchi'
    setRegisterStatus(`Rahmat, ${name}! Profilingiz yaratildi. Tez orada siz bilan bog'lanamiz.`)
    setRegisterForm({
      role: activeTab,
      name: '',
      phone: '',
      password: '',
      company: '',
      vehicles: '',
    })
  }

  const handleTruckSubmit = (event) => {
    event.preventDefault()
    const model = truckForm.model.trim() || 'mashina'
    setTruckStatus(`“${model}” ro‘yxatga qo‘shildi. Tez orada moderator tomonidan tekshiriladi.`)
    setTruckForm(initialTruckForm)
    setTruckPreview('')
    setTruckImageName('')
  }

  const handleOrder = (model) => {
    setContact((prev) => ({ ...prev, model }))
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setContactStatus('')
  }

  const handleImageSelect = (file) => {
    if (!file) return
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      setTruckStatus('Faqat JPG, PNG yoki WebP formatdagi rasm yuklang.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setTruckPreview(reader.result)
      setTruckImageName(file.name)
      setTruckStatus('')
    }
    reader.readAsDataURL(file)
  }

  const onDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    handleImageSelect(file)
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#hero">
          <span className="brand-mark">YUKYO'L</span>
          <span className="brand-sub">Yuk logistika &amp; truck marketplace</span>
        </a>
        <button className={`burger ${menuOpen ? 'open' : ''}`} type="button" onClick={() => setMenuOpen((prev) => !prev)} aria-expanded={menuOpen}>
          <span />
          <span />
          <span />
        </button>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#services" onClick={() => setMenuOpen(false)}>Xizmatlar</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>Narxlar</a>
          <a href="#fleet" onClick={() => setMenuOpen(false)}>Parkimiz</a>
          <a href="#marketplace" onClick={() => setMenuOpen(false)}>Mashinalar</a>
          <a href="#truck-listing" onClick={() => setMenuOpen(false)}>Truck qo‘shish</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Bog‘lanish</a>
          <button className="btn btn-ghost btn-nav" type="button" onClick={() => { setRegisterOpen(true); setMenuOpen(false) }}>
            Ro‘yxatdan o‘tish
          </button>
          <a className="btn btn-amber" href="tel:+998712005555">Qo‘ng‘iroq qilish</a>
        </nav>
      </header>

      <main>
        <Reveal as="section" className="hero-section" id="hero">
          <div className="hero-copy">
            <div className="hero-fade" style={{ '--hero-delay': '0ms' }}>
              <p className="eyebrow">24/7 tezkor logistika</p>
            </div>
            <div className="hero-fade" style={{ '--hero-delay': '120ms' }}>
              <h1>Yuklaringizni mag‘lur yo‘lga jo‘natamiz.</h1>
            </div>
            <div className="hero-fade" style={{ '--hero-delay': '240ms' }}>
              <p className="hero-text">
                YUKYO‘L — O‘zbekiston bo‘ylab mahalliy, xalqaro va maxsus yuk tashish xizmatlarini ishonchli tezlikda taqdim etuvchi kompaniya.
              </p>
            </div>
            <div className="hero-actions">
              <div className="hero-fade" style={{ '--hero-delay': '360ms' }}>
                <a className="btn btn-amber" href="#pricing">Narxni hisoblash</a>
              </div>
              <div className="hero-fade" style={{ '--hero-delay': '440ms' }}>
                <a className="btn btn-ghost" href="#services">Xizmatlar</a>
              </div>
            </div>
            <div className="stats-grid">
              <div className="hero-fade" style={{ '--hero-delay': '520ms' }}>
                <strong>12+</strong>
                <span>yillik tajriba</span>
              </div>
              <div className="hero-fade" style={{ '--hero-delay': '600ms' }}>
                <strong>96</strong>
                <span>tashuvchi mashina</span>
              </div>
              <div className="hero-fade" style={{ '--hero-delay': '680ms' }}>
                <strong>98%</strong>
                <span>yetkazib berish aniqligi</span>
              </div>
            </div>
          </div>

          <div className="route-card hero-fade" style={{ '--hero-delay': '760ms' }} aria-label="Marshrut paneli">
            <div className="route-labels">
              <span>Toshkent</span>
              <span>Buxoro</span>
              <span>Samarkand</span>
            </div>
            <div className="route-graphic">
              <svg viewBox="0 0 420 140" className="route-map" role="img" aria-label="Yuk mashinasi marshruti">
                <defs>
                  <path id="hero-route" d="M20 80 C70 30, 120 30, 180 80 S300 130, 400 60" />
                </defs>
                <path
                  d="M20 80 C70 30, 120 30, 180 80 S300 130, 400 60"
                  stroke="rgba(255,182,39,0.45)"
                  strokeWidth="3"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="20" cy="80" r="4" fill="#ffb627" opacity="0.5" />
                <circle cx="60" cy="68" r="6" fill="#ffb627" />
                <circle cx="236" cy="92" r="6" fill="#ffb627" />
                <circle cx="360" cy="60" r="6" fill="#ffb627" />
                <circle cx="400" cy="60" r="4" fill="#ffb627" opacity="0.5" />
                <g className="hero-truck" stroke="#ffb627" fill="#ffb627" transform={reduceMotion ? 'translate(60 68)' : undefined}>
                  {!reduceMotion ? (
                    <animateMotion dur="6s" repeatCount="indefinite" rotate="auto" calcMode="linear">
                      <mpath href="#hero-route" />
                    </animateMotion>
                  ) : null}
                  <g transform="translate(-22 -16)">
                    <rect x="0" y="8" width="22" height="11" rx="2" fill="#ffb627" fillOpacity="0.15" stroke="#ffb627" strokeWidth="1.5" />
                    <path d="M1 8 L7 3 L19 3 L22 8" fill="none" stroke="#ffb627" strokeWidth="1.2" strokeLinejoin="round" />
                    <path d="M22 10 L22 19 L32 19 L38 14 L38 6 L28 6 Z" fill="#ffb627" fillOpacity="0.12" stroke="#ffb627" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M32 8 L36 11 L32 12 Z" fill="#ffb627" fillOpacity="0.45" stroke="none" />
                    <circle cx="9" cy="21" r="4" fill="none" stroke="#ffb627" strokeWidth="1.5" />
                    <circle cx="9" cy="21" r="1.5" fill="#ffb627" stroke="none" />
                    <circle cx="32" cy="21" r="4" fill="none" stroke="#ffb627" strokeWidth="1.5" />
                    <circle cx="32" cy="21" r="1.5" fill="#ffb627" stroke="none" />
                  </g>
                </g>
              </svg>
            </div>
            <div className="route-foot">
              <span>Harakat tezligi: 72 km/soat</span>
              <span>Real vaqt monitoring</span>
            </div>
          </div>
        </Reveal>

        <div className="road-divider" aria-hidden="true" />

        <Reveal as="section" className="section-block" id="services">
          <div className="section-heading">
            <p className="eyebrow">Xizmatlar</p>
            <h2>Har bir yuk uchun aniq yechim</h2>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <Reveal as="article" className="info-card" key={service.title} delay={index * 80}>
                <div className="card-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <div className="road-divider" aria-hidden="true" />

        <Reveal as="section" className="section-block pricing-block" id="pricing">
          <div className="section-heading">
            <p className="eyebrow">Narxlar / kalkulyator</p>
            <h2>Masofaga qarab tezkor taxminiy narx</h2>
          </div>
          <div className="calculator-panel">
            <Reveal as="form" className="calculator-form" onSubmit={(event) => event.preventDefault()} delay={80}>
              <label>
                <span>Masofa, km</span>
                <input type="range" min="30" max="1200" step="10" value={distance} onChange={(event) => setDistance(Number(event.target.value))} />
                <strong>{distance} km</strong>
              </label>
              <label>
                <span>Yuk og‘irligi, tonna</span>
                <input type="number" min="1" max="25" step="0.5" value={weight} onChange={(event) => setWeight(Number(event.target.value))} />
              </label>
              <label>
                <span>Mashina turi</span>
                <select value={vehicle} onChange={(event) => setVehicle(event.target.value)}>
                  <option value="tent">Tent</option>
                  <option value="refrigerator">Refrijerator</option>
                  <option value="platform">Platforma</option>
                  <option value="container">Konteynervoz</option>
                </select>
              </label>
            </Reveal>
            <Reveal as="div" className="estimate-card" delay={140}>
              <p className="estimate-label">Taxminiy narx</p>
              <h3>{formatPrice(estimate.total)}</h3>
              <ul>
                <li>Asosiy to‘lov: {formatPrice(estimate.base)}</li>
                <li>Masofa narxi: {formatPrice(distance * estimate.perKm)}</li>
                <li>Og‘irlik qo‘shimi: {formatPrice(weight * vehicleRates[vehicle].weight)}</li>
              </ul>
            </Reveal>
          </div>
        </Reveal>

        <div className="road-divider" aria-hidden="true" />

        <Reveal as="section" className="section-block" id="fleet">
          <div className="section-heading">
            <p className="eyebrow">Parkimiz</p>
            <h2>Turli vazifaga mos transport</h2>
          </div>
          <div className="fleet-grid">
            {fleet.map((vehicle, index) => (
              <Reveal as="article" className="fleet-card" key={vehicle.name} delay={index * 80}>
                <div className="fleet-icon">{vehicle.icon}</div>
                <h3>{vehicle.name}</h3>
                <p>Sig‘im: {vehicle.capacity}</p>
                <p>Hajm: {vehicle.volume}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <div className="road-divider" aria-hidden="true" />

        <Reveal as="section" className="section-block" id="marketplace">
          <div className="section-heading">
            <p className="eyebrow">Mashinalar</p>
            <h2>Tanlangan truck marketplace takliflari</h2>
          </div>
          <div className="market-grid">
            {trucks.map((truck, index) => (
              <Reveal as="article" className="market-card" key={truck.title} delay={index * 80}>
                <div className="vehicle-visual">{truck.image}</div>
                <div className="market-body">
                  <div className="market-title-row">
                    <h3>{truck.title}</h3>
                    <span className="price-badge">{formatPrice(truck.price)}</span>
                  </div>
                  <p className="mileage">{truck.mileage}</p>
                  <div className="pill-list">
                    {truck.perks.map((perk) => (
                      <span className="pill" key={perk}>{perk}</span>
                    ))}
                  </div>
                  <button className="btn btn-amber btn-full" type="button" onClick={() => handleOrder(truck.title)}>
                    Buyurtma berish
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <div className="road-divider" aria-hidden="true" />

        <Reveal as="section" className="section-block listing-section" id="truck-listing">
          <div className="section-heading">
            <p className="eyebrow">Truck qo‘shish</p>
            <h2>Egalar uchun tezkor joylashtirish</h2>
          </div>
          <div className="listing-layout">
            <Reveal as="form" className="listing-form" onSubmit={handleTruckSubmit} delay={80}>
              <div className="field-row">
                <label>
                  <span>Model</span>
                  <input value={truckForm.model} onChange={(event) => setTruckForm({ ...truckForm, model: event.target.value })} placeholder="Masalan: Volvo FH" required />
                </label>
                <label>
                  <span>Yil</span>
                  <input type="number" value={truckForm.year} onChange={(event) => setTruckForm({ ...truckForm, year: event.target.value })} placeholder="2019" required />
                </label>
              </div>
              <div className="field-row">
                <label>
                  <span>Narx, so‘m</span>
                  <input type="number" value={truckForm.price} onChange={(event) => setTruckForm({ ...truckForm, price: event.target.value })} placeholder="85000000" required />
                </label>
                <label>
                  <span>Probeg, km</span>
                  <input type="number" value={truckForm.mileage} onChange={(event) => setTruckForm({ ...truckForm, mileage: event.target.value })} placeholder="320000" required />
                </label>
              </div>
              <div className="field-row">
                <label>
                  <span>Mashina holati</span>
                  <select value={truckForm.status} onChange={(event) => setTruckForm({ ...truckForm, status: event.target.value })}>
                    <option value="Yangi">Yangi</option>
                    <option value="A'lo">A‘lo</option>
                    <option value="Yaxshi">Yaxshi</option>
                    <option value="O‘rtacha">O‘rtacha</option>
                    <option value="Ta‘mirtalab">Ta‘mirtalab</option>
                  </select>
                </label>
                <label>
                  <span>Telefon</span>
                  <input value={truckForm.phone} onChange={(event) => setTruckForm({ ...truckForm, phone: event.target.value })} placeholder="+998 99 123 45 67" required />
                </label>
              </div>
              <label>
                <span>Tavsif</span>
                <textarea rows="4" value={truckForm.description} onChange={(event) => setTruckForm({ ...truckForm, description: event.target.value })} placeholder="Mashina haqida qisqacha ma‘lumot" />
              </label>
              <label>
                <span>Rasm yuklash</span>
                <div className="dropzone" onDragOver={(event) => event.preventDefault()} onDrop={onDrop} onClick={() => document.getElementById('truck-image')?.click()}>
                  <input id="truck-image" type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={(event) => handleImageSelect(event.target.files?.[0])} />
                  {truckPreview ? <img src={truckPreview} alt="Oldindan ko‘rinish" /> : <p>Rasmni sudrab olib tashlang yoki bosing</p>}
                  {truckImageName ? <strong>{truckImageName}</strong> : null}
                </div>
              </label>
              <button className="btn btn-amber" type="submit">Joylashtirish</button>
              {truckStatus ? <p className="form-status">{truckStatus}</p> : null}
            </Reveal>

            <Reveal as="aside" className="info-card docs-card" delay={120}>
              <h3>Qo‘shishdan oldin kerak bo‘ladigan hujjatlar</h3>
              <ul>
                <li>Pasport nusxasi</li>
                <li>Texnik hujjat</li>
                <li>Sug‘urta polisi</li>
                <li>Ruxsatnoma va mulk hujjati</li>
              </ul>
            </Reveal>
          </div>
        </Reveal>

        <div className="road-divider" aria-hidden="true" />

        <Reveal as="section" className="section-block contact-block" id="contact">
          <div className="section-heading">
            <p className="eyebrow">Bog‘lanish</p>
            <h2>Bugun buyurtma bering</h2>
          </div>
          <div className="contact-grid">
            <Reveal as="div" className="contact-card" delay={60}>
              <h3>Kontaktlar</h3>
              <ul>
                <li>Telefon: +998 71 200 55 55</li>
                <li>Email: info@yukyol.uz</li>
                <li>Manzil: Toshkent, 1-bosqich, 8-kvartal</li>
                <li>Ish vaqti: Dushanba - Shanba, 08:00 - 20:00</li>
              </ul>
            </Reveal>
            <Reveal as="form" className="contact-form" onSubmit={handleContactSubmit} delay={120}>
              <div className="field-row">
                <label>
                  <span>Ismingiz</span>
                  <input value={contact.name} onChange={(event) => setContact({ ...contact, name: event.target.value })} placeholder="Ismingiz" required />
                </label>
                <label>
                  <span>Telefon</span>
                  <input value={contact.phone} onChange={(event) => setContact({ ...contact, phone: event.target.value })} placeholder="+998 99 123 45 67" required />
                </label>
              </div>
              <div className="field-row">
                <label>
                  <span>Yo‘nalish</span>
                  <input value={contact.route} onChange={(event) => setContact({ ...contact, route: event.target.value })} placeholder="Toshkent → Buxoro" required />
                </label>
                <label>
                  <span>Mashina modeli</span>
                  <input value={contact.model} onChange={(event) => setContact({ ...contact, model: event.target.value })} placeholder="Isuzu N-Series" />
                </label>
              </div>
              <label>
                <span>Xabar</span>
                <textarea value={contact.message} onChange={(event) => setContact({ ...contact, message: event.target.value })} rows="4" placeholder="Yuk haqida qisqacha ma‘lumot" />
              </label>
              <button className="btn btn-amber" type="submit">Yuborish</button>
              {contactStatus ? <p className="form-status">{contactStatus}</p> : null}
            </Reveal>
          </div>
        </Reveal>
      </main>

      {registerOpen ? (
        <div className="modal-backdrop" role="presentation" onClick={() => setRegisterOpen(false)}>
          <div className="modal-card" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <div className="modal-head">
              <div>
                <p className="eyebrow">Ro‘yxatdan o‘tish</p>
                <h3>Platformaga kirish</h3>
              </div>
              <button className="icon-btn" type="button" onClick={() => setRegisterOpen(false)} aria-label="Yopish">×</button>
            </div>

            <div className="tabs">
              <button className={`tab ${activeTab === 'owner' ? 'active' : ''}`} type="button" onClick={() => { setActiveTab('owner'); setRegisterForm({ ...registerForm, role: 'owner' }) }}>
                Truck egasi
              </button>
              <button className={`tab ${activeTab === 'buyer' ? 'active' : ''}`} type="button" onClick={() => { setActiveTab('buyer'); setRegisterForm({ ...registerForm, role: 'buyer' }) }}>
                Buyurtma beruvchi
              </button>
            </div>

            <form className="register-form" onSubmit={handleRegisterSubmit}>
              {activeTab === 'owner' ? (
                <label>
                  <span>Nechta mashina</span>
                  <input value={registerForm.vehicles} onChange={(event) => setRegisterForm({ ...registerForm, vehicles: event.target.value })} placeholder="3 ta mashina" />
                </label>
              ) : (
                <label>
                  <span>Kompaniya nomi</span>
                  <input value={registerForm.company} onChange={(event) => setRegisterForm({ ...registerForm, company: event.target.value })} placeholder="YUKYO‘L Logistics" />
                </label>
              )}
              <label>
                <span>Ism</span>
                <input value={registerForm.name} onChange={(event) => setRegisterForm({ ...registerForm, name: event.target.value })} placeholder="Ism-familya" required />
              </label>
              <label>
                <span>Telefon</span>
                <input value={registerForm.phone} onChange={(event) => setRegisterForm({ ...registerForm, phone: event.target.value })} placeholder="+998 99 123 45 67" required />
              </label>
              <label>
                <span>Parol</span>
                <input type="password" value={registerForm.password} onChange={(event) => setRegisterForm({ ...registerForm, password: event.target.value })} placeholder="Parol" required />
              </label>
              <button className="btn btn-amber" type="submit">Yaratish</button>
              {registerStatus ? <p className="form-status">{registerStatus}</p> : null}
            </form>
          </div>
        </div>
      ) : null}

      <footer className="footer">
        <p>© 2026 YUKYO‘L. Barcha huquqlar himoyalangan.</p>
      </footer>
    </div>
  )
}

export default App
