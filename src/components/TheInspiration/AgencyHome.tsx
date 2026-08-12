import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ArrowDownRight, ArrowRight, Asterisk, MoveUpRight } from 'lucide-react'

import { InspirationScene } from './InspirationScene'
import { Reveal } from './Reveal'

const services = [
  {
    title: 'Marka ve yön',
    description: 'Konumlandırma, yaratıcı strateji ve markanın her temas noktasında konuşacağı ortak bir dil.',
    tags: ['Strateji', 'Kimlik', 'İçerik sistemi'],
  },
  {
    title: 'Dijital deneyimler',
    description: 'Hızlı, erişilebilir ve bir markanın karakterini gerçekten taşıyan web siteleri ve ürünler.',
    tags: ['Web tasarım', 'Development', 'E-ticaret'],
  },
  {
    title: 'Büyüme sistemleri',
    description: 'SEO, performans pazarlaması ve ölçümlemeyi aynı büyüme döngüsünde bir araya getiriyoruz.',
    tags: ['SEO & GEO', 'Paid media', 'Analytics'],
  },
]

const process = [
  ['Dinle', 'Markayı, hedefi ve gerilimi anlamadan ekrana tek bir çizgi koymuyoruz.'],
  ['Yön ver', 'Araştırmayı keskin bir yaratıcı fikre ve uygulanabilir yol haritasına dönüştürüyoruz.'],
  ['Üret', 'Tasarım, teknoloji ve içeriği aynı masa etrafında birlikte geliştiriyoruz.'],
  ['Büyüt', 'Yayından sonra ölçüyor, öğreniyor ve sistemi daha iyi sonuçlar için geliştiriyoruz.'],
]

export function AgencyHome() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'The Inspiration',
    description: 'Marka, dijital deneyim ve büyüme sistemleri tasarlayan bağımsız yaratıcı stüdyo.',
    areaServed: 'Worldwide',
    knowsAbout: ['Brand strategy', 'Web design', 'SEO', 'Digital marketing', 'Three.js'],
  }

  return (
    <main className="ti-site">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        type="application/ld+json"
      />

      <section className="ti-hero" aria-labelledby="ti-hero-title">
        <div className="ti-hero-grid" aria-hidden="true" />
        <div className="ti-shell ti-hero-inner">
          <div className="ti-hero-copy">
            <p className="ti-kicker"><Asterisk size={15} /> Independent creative studio — İstanbul / Worldwide</p>
            <h1 id="ti-hero-title">
              Fikirlere şekil.<br />
              Markalara <span>hareket.</span>
            </h1>
            <div className="ti-hero-bottom">
              <p>
                Strateji, tasarım ve teknolojiyi tek bir güçlü sistemde buluşturuyor;
                markaları yalnızca görünür değil, hatırlanır hâle getiriyoruz.
              </p>
              <Link className="ti-round-link" href="/get-a-quote" aria-label="Birlikte çalışalım">
                Birlikte<br />çalışalım <ArrowDownRight size={20} />
              </Link>
            </div>
          </div>
          <div className="ti-hero-visual">
            <div className="ti-orbit-label ti-orbit-label-top">Strategy / Design / Technology</div>
            <InspirationScene />
            <div className="ti-orbit-label ti-orbit-label-bottom">Built to be remembered</div>
          </div>
        </div>
        <div className="ti-marquee" aria-label="Hizmet alanları">
          <div>
            <span>Strategy</span><Asterisk /><span>Brand systems</span><Asterisk />
            <span>Digital products</span><Asterisk /><span>Growth</span><Asterisk />
            <span>Strategy</span><Asterisk /><span>Brand systems</span><Asterisk />
            <span>Digital products</span><Asterisk /><span>Growth</span><Asterisk />
          </div>
        </div>
      </section>

      <section className="ti-manifesto ti-section">
        <div className="ti-shell">
          <Reveal>
            <p className="ti-section-label">Bakış açımız</p>
            <p className="ti-statement">
              Güzel görünmek yetmez. Bir marka <em>hissedilmeli,</em> anlaşılmalı ve doğru anda harekete geçirmeli.
            </p>
          </Reveal>
          <Reveal className="ti-manifesto-foot" delay={120}>
            <p>Gürültüyü azaltıyor, markanın özündeki güçlü fikri büyütüyoruz.</p>
            <Link href="/about">Stüdyoyu tanıyın <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="ti-services ti-section" id="services">
        <div className="ti-shell">
          <div className="ti-section-head">
            <p className="ti-section-label">Yetenekler</p>
            <p>Birbiriyle konuşan disiplinler, tek bir net sonuç.</p>
          </div>
          <div className="ti-service-list">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 80}>
                <article className="ti-service-row">
                  <span className="ti-service-index">0{index + 1}</span>
                  <h2>{service.title}</h2>
                  <div className="ti-service-meta">
                    <p>{service.description}</p>
                    <ul>{service.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                  </div>
                  <MoveUpRight className="ti-service-arrow" aria-hidden="true" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ti-work ti-section" id="work">
        <div className="ti-shell">
          <div className="ti-section-head ti-section-head-light">
            <p className="ti-section-label">Seçili işler</p>
            <h2>İyi fikir, gerçek dünyada karşılık bulduğunda değerlidir.</h2>
          </div>
          <Reveal>
            <article className="ti-featured-work">
              <div className="ti-work-image">
                <Image
                  alt="Kurgusal Atelier Noma projesi için kahverengi ve taş tonlarında soyut mimari kompozisyon"
                  fill
                  priority={false}
                  sizes="(max-width: 768px) 100vw, 72vw"
                  src="/images/the-inspiration/case-study-atelier.png"
                />
              </div>
              <div className="ti-work-caption">
                <div><span>Atelier Noma</span><span>Architecture / Digital flagship</span></div>
                <span>2026 — Concept project</span>
              </div>
            </article>
          </Reveal>
          <div className="ti-work-pair">
            <Reveal delay={100}>
              <article className="ti-mini-work ti-mini-work-cocoa">
                <div className="ti-mini-art"><span>NO. 07</span><i /></div>
                <div><strong>Onda Objects</strong><span>Art direction / Commerce</span></div>
              </article>
            </Reveal>
            <Reveal delay={180}>
              <article className="ti-mini-work ti-mini-work-ivory">
                <div className="ti-mini-art"><span>ÉLAN</span><i /><b /></div>
                <div><strong>Élan Skin</strong><span>Brand system / Growth</span></div>
              </article>
            </Reveal>
          </div>
          <p className="ti-demo-note">Gösterilen marka ve sonuçlar tasarım sunumu için oluşturulmuş kurgusal örneklerdir.</p>
        </div>
      </section>

      <section className="ti-proof ti-section">
        <div className="ti-shell ti-proof-grid">
          <div>
            <p className="ti-section-label">Örnek etki</p>
            <h2>Estetik kararları iş hedeflerinden ayırmıyoruz.</h2>
          </div>
          <div className="ti-proof-list">
            <Reveal><div><strong>+184%</strong><span>Lorem ipsum organik görünürlük</span></div></Reveal>
            <Reveal delay={80}><div><strong>3.7×</strong><span>Lorem ipsum yatırım getirisi</span></div></Reveal>
            <Reveal delay={160}><div><strong>−42%</strong><span>Lorem ipsum edinme maliyeti</span></div></Reveal>
          </div>
        </div>
      </section>

      <section className="ti-process ti-section" id="process">
        <div className="ti-shell">
          <div className="ti-section-head">
            <p className="ti-section-label">Çalışma biçimi</p>
            <h2>Netlikten başlayıp hareketle biten, dört parçalı bir ritim.</h2>
          </div>
          <ol className="ti-process-list">
            {process.map(([title, body], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ti-contact">
        <div className="ti-shell ti-contact-inner">
          <p className="ti-section-label">Sıradaki iyi fikir</p>
          <h2>Markanızın neye dönüşebileceğini birlikte görelim.</h2>
          <Link href="/get-a-quote">Projeyi anlatın <ArrowDownRight /></Link>
        </div>
      </section>
    </main>
  )
}
