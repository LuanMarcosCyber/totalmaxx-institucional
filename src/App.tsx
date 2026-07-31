import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  Box,
  ChevronRight,
  CircleCheck,
  Globe2,
  Instagram,
  Layers3,
  Menu,
  PackageCheck,
  Ruler,
  Sparkles,
  X,
} from 'lucide-react'
import BlurText from './components/BlurText'
import RotatingText from './components/RotatingText.jsx'
import { CardBody, CardContainer, CardItem } from './components/ui/3d-card'

const products = [
  {
    name: 'Molduras',
    eyebrow: 'Estrutura & acabamento',
    description: 'Perfis que dão presença, proteção e acabamento preciso a cada composição.',
    image: '/generated/molduras.png',
    className: 'product-card--wide',
    position: 'center',
    temporary: true,
  },
  {
    name: 'Paspatur',
    eyebrow: 'Cor & profundidade',
    description: 'Uma seleção de tons e texturas para valorizar a leitura de cada obra.',
    image: '/paspatur (2).png',
    className: '',
    position: 'center',
  },
  {
    name: 'Foams',
    eyebrow: 'Leveza & proteção',
    description: 'Placas leves, rígidas e versáteis para montagens com acabamento profissional.',
    image: '/foam.png',
    className: '',
    position: 'center',
  },
  {
    name: 'Acrílicos',
    eyebrow: 'Transparência & resistência',
    description: 'Proteção cristalina, leve e segura para diferentes necessidades de exposição.',
    image: '/generated/acrilicos.png',
    className: '',
    position: 'center',
    temporary: true,
  },
  {
    name: 'MDF',
    eyebrow: 'Base & estabilidade',
    description: 'Chapas consistentes e bem acabadas para estruturas que exigem precisão.',
    image: '/generated/mdf.png',
    className: '',
    position: 'center',
    temporary: true,
  },
  {
    name: 'Insumos',
    eyebrow: 'Detalhes que completam',
    description: 'Acessórios essenciais para uma rotina de produção organizada e eficiente.',
    image: '/generated/insumos.png',
    className: 'product-card--wide',
    position: 'center',
    temporary: true,
  },
]

const navItems = [
  ['Produtos', '#produtos'],
  ['Empresa', '#empresa'],
  ['Revendedor', '#revendedor'],
  ['Catálogo', '#catalogo'],
  ['Contato', '#contato'],
]

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a href="#inicio" className={`brand ${light ? 'brand--light' : ''}`} aria-label="Total Maxx — início">
      <span className="brand-crop">
        <img src="/logo oficial totalmaxx.png" alt="" />
      </span>
      <span className="brand-word">
        <span>TOTAL <b>MAXX</b></span>
        <small>IMPORT &amp; EXPORT</small>
      </span>
    </a>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`navbar reveal-nav ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <a className="button button--wine desktop-cta" href="#revendedor">
          Área do Revendedor <ArrowUpRight size={15} />
        </a>
        <button
          className="menu-button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <div className={`mobile-menu ${open ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-links">
          {navItems.map(([label, href], index) => (
            <a key={label} href={href} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>{label}<ChevronRight size={19} />
            </a>
          ))}
          <a className="button button--wine" href="#revendedor" onClick={() => setOpen(false)}>
            Área do Revendedor <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <main id="inicio">
      <section className="hero">
        <div className="hero-rule" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker hero-fade">
              <span className="kicker-line" />
              Materiais para moldurarias
            </div>
            <h1>
              <span className="title-mask">
                <BlurText
                  text="Tudo começa"
                  className="hero-blur-line"
                  delay={100}
                  initialDelay={400}
                  animateBy="words"
                  direction="bottom"
                  stepDuration={0.4}
                  startOnMount
                  onAnimationStart={() => console.log("BlurText animation started")}
                />
              </span>
              <span className="title-mask">
                <BlurText
                  text="com a matéria"
                  className="hero-blur-line"
                  delay={100}
                  initialDelay={600}
                  animateBy="words"
                  direction="bottom"
                  stepDuration={0.4}
                  startOnMount
                />
              </span>
              <span className="title-mask">
                <BlurText
                  text="certa."
                  className="hero-blur-line hero-blur-line--accent"
                  initialDelay={900}
                  animateBy="words"
                  direction="bottom"
                  stepDuration={0.4}
                  startOnMount
                  onAnimationComplete={() => console.log("BlurText animation completed")}
                />
              </span>
            </h1>
            <p className="hero-description hero-fade hero-fade--2">
              Materiais selecionados para moldurarias e revendedores que exigem qualidade,
              precisão e consistência em cada projeto.
            </p>
            <div className="hero-actions hero-fade hero-fade--3">
              <a href="#produtos" className="button button--wine">
                Conheça nossos produtos <ArrowDown size={16} />
              </a>
              <a href="#revendedor" className="button button--outline">
                Área do Revendedor <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-label="Composição de materiais para molduraria">
            <div className="visual-index"><span>01</span> Matéria / precisão</div>
            <div className="hero-image-wrap">
              <img src="/generated/hero-composition.png" alt="Moldura de madeira, paspatur, foam e chapas de acrílico organizados em composição" />
            </div>
            <div className="hero-caption">
              <span>Seleção profissional</span>
              <span>Distribuição nacional</span>
            </div>
          </div>
        </div>
        <a className="scroll-cue" href="#diferenciais" aria-label="Rolar para os diferenciais">
          <span>Explore</span><ArrowDown size={14} />
        </a>
      </section>

      <Highlights />
      <Products />
      <Institutional />
    </main>
  )
}

function Highlights() {
  const items = [
    { icon: Layers3, title: 'Amplo portfólio', text: 'Soluções para cada etapa' },
    { icon: CircleCheck, title: 'Qualidade selecionada', text: 'Materiais de confiança' },
    { icon: Globe2, title: 'Atendimento nacional', text: 'Presença em todo o Brasil' },
    { icon: PackageCheck, title: 'Foco no revendedor', text: 'Parceria que movimenta negócios' },
  ]
  return (
    <section className="highlights" id="diferenciais" aria-label="Diferenciais Total Maxx">
      <div className="container highlights-grid">
        {items.map(({ icon: Icon, title, text }, index) => (
          <div className="highlight reveal" key={title}>
            <span className="highlight-number">0{index + 1}</span>
            <Icon aria-hidden="true" />
            <div><strong>{title}</strong><span>{text}</span></div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProductCard({ product, index }: { product: typeof products[number], index: number }) {
  return (
    <CardContainer className={`product-card reveal ${product.className}`}>
      <CardBody as="article">
      <CardItem translateZ={82} className="product-image">
        <img src={product.image} alt={`${product.name} — ${product.eyebrow}`} style={{ objectPosition: product.position }} loading="lazy" />
        <span className="product-count">0{index + 1}</span>
      </CardItem>
      <div className="product-info">
        <CardItem translateZ={42} className="product-title-layer">
          <span>{product.eyebrow}</span>
          <h3>{product.name}</h3>
        </CardItem>
        <CardItem as="p" translateZ={30}>{product.description}</CardItem>
        <CardItem as="a" translateZ={24} href="#contato" aria-label={`Conhecer ${product.name}`}>
          <span>Conhecer</span><ArrowUpRight size={18} />
        </CardItem>
      </div>
      </CardBody>
    </CardContainer>
  )
}

function Products() {
  return (
    <section className="products-section" id="produtos">
      <div className="container">
        <header className="section-heading reveal">
          <div>
            <span className="section-label"><i /> Nosso portfólio</span>
            <h2>
              <BlurText
                text="Materiais para cada etapa da molduraria."
                delay={95}
                animateBy="words"
                direction="bottom"
                stepDuration={0.32}
                threshold={0.2}
                rootMargin="0px 0px -8% 0px"
              />
            </h2>
          </div>
          <p>
            Do suporte ao acabamento, reunimos uma seleção profissional para transformar
            boas ideias em trabalhos consistentes.
          </p>
        </header>
        <div className="product-grid">
          {products.map((product, index) => <ProductCard key={product.name} product={product} index={index} />)}
        </div>
        <div className="catalog-row reveal" id="catalogo">
          <span>Uma seleção pensada para profissionais exigentes.</span>
          <a href="#contato">Solicitar catálogo <ArrowUpRight size={17} /></a>
        </div>
      </div>
    </section>
  )
}

function Institutional() {
  return (
    <section className="institutional" id="empresa">
      <div className="institutional-texture" aria-hidden="true" />
      <div className="container institutional-inner">
        <div className="institutional-mark reveal"><Sparkles size={21} /><span>Total Maxx</span></div>
        <div className="institutional-copy reveal">
          <span className="section-label section-label--light"><i /> Parceria de verdade</span>
          <h2>Mais que materiais.<br />Uma base para o seu negócio.</h2>
          <p className="system-rotating-line">
            <span className="system-rotating-intro">Não é só um sistema, é</span>
            <RotatingText
              texts={['CONTROLE', 'ORGANIZAÇÃO', 'AGILIDADE', 'PRATICIDADE']}
              mainClassName="system-rotating-word"
              staggerFrom="last"
              splitBy="characters"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-120%', opacity: 0 }}
              staggerDuration={0.025}
              splitLevelClassName="system-rotating-split"
              elementLevelClassName="system-rotating-character"
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              rotationInterval={2700}
            />
          </p>
        </div>
        <div className="institutional-side reveal" id="revendedor">
          <p>
            Entendemos o ritmo de quem produz, vende e entrega qualidade todos os dias.
            Por isso, unimos variedade, organização e atendimento próximo.
          </p>
          <a href="#contato" className="button button--light">
            Acesse o Sistema <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="institutional-footer">
          <span><Ruler size={16} /> Precisão em cada escolha</span>
          <span><Box size={16} /> Soluções que chegam mais longe</span>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer" id="contato">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand light />
            <p>Materiais, insumos e soluções para moldurarias e revendedores em todo o Brasil.</p>
          </div>
          <div className="footer-cta">
            <span>Vamos conversar?</span>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
              Fale com nossa equipe <ArrowUpRight />
            </a>
          </div>
        </div>
        <div className="footer-grid">
          <div>
            <h3>Produtos</h3>
            {products.map(product => <a key={product.name} href="#produtos">{product.name}</a>)}
          </div>
          <div>
            <h3>Empresa</h3>
            <a href="#empresa">Sobre a Total Maxx</a>
            <a href="#catalogo">Catálogo</a>
            <a href="#revendedor">Área do Revendedor</a>
            <a href="#contato">Contato</a>
          </div>
          <div>
            <h3>Conecte-se</h3>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer"><Instagram size={15} /> Instagram</a>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer"><ArrowUpRight size={15} /> WhatsApp</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Total Maxx Import &amp; Export. Todos os direitos reservados.</span>
          <a href="#inicio">Voltar ao topo <ArrowUpRight size={14} /></a>
        </div>
      </div>
    </footer>
  )
}

function RevealObserver() {
  useEffect(() => {
    const items = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.12 },
    )
    items.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [])
  return null
}

export default function App() {
  return (
    <>
      <RevealObserver />
      <Navbar />
      <Hero />
      <Footer />
    </>
  )
}
