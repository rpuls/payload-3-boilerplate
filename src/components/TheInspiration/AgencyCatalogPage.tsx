import Link from 'next/link'
import { ArrowDownRight, ArrowRight, Asterisk, MoveUpRight } from 'lucide-react'
import React from 'react'

import type { CatalogPage } from '@/content/prix-page-catalog.generated'
import { prixPageCatalog } from '@/content/prix-page-catalog.generated'
import { getCatalogDescription, getCatalogFAQs, getCatalogSections } from '@/content/adaptCatalogContent'
import { AgencyToolLab } from './AgencyToolLab'
import { Reveal } from './Reveal'

const labels = {
  landing: 'Uzmanlık', blog: 'Perspektif', 'case-study': 'Seçili iş', glossary: 'Sözlük',
  tool: 'Stüdyo aracı', example: 'İlham arşivi', location: 'Yerel ortaklık', home: 'Stüdyo',
} as const

const intros = {
  landing: (title: string) => `${title} konusunda strateji, tasarım ve teknolojiyi tek bir net büyüme sisteminde birleştiriyoruz.`,
  blog: (title: string) => `${title} konusunu jargonun arkasına saklanmadan; marka, deneyim ve ölçülebilir etki açısından ele alan stüdyo notları.`,
  'case-study': (title: string) => `${title} için tasarlanan kurgusal dönüşüm senaryosu: daha güçlü bir fikir, daha tutarlı bir deneyim ve büyümeye hazır bir sistem.`,
  glossary: (title: string) => `${title} nedir, neden önemlidir ve iyi bir dijital deneyimde nasıl kullanılır? Kısa, açık ve uygulanabilir bir açıklama.`,
  tool: (title: string) => `${title} ile ilk değerlendirmenizi birkaç dakika içinde yapın; fırsatları görün ve sonraki adımı netleştirin.`,
  example: (title: string) => `${title} alanında güçlü bir dijital kimliğin nasıl hissedebileceğine dair seçilmiş yönler ve özgün tasarım fikirleri.`,
  location: (title: string) => `${title} pazarını anlayan, İstanbul’dan dünyaya çalışan bağımsız strateji, tasarım ve büyüme stüdyosu.`,
  home: () => '',
} as const

function relatedFor(page: CatalogPage) {
  const peers = prixPageCatalog.filter((item) => item.kind === page.kind)
  const current = peers.findIndex((item) => item.path === page.path)
  return [1, 2, 3].map((offset) => peers[(current + offset) % peers.length]).filter(Boolean)
}

function ExampleCanvas({ index }: { index: number }) {
  return <div className={`ti-example-canvas ti-example-canvas--${(index % 3) + 1}`}><span>0{index + 1}</span><i /><b /></div>
}

export function AgencyCatalogPage({ page }: { page: CatalogPage }) {
  const title = page.title
  const sections = getCatalogSections(page)
  const related = relatedFor(page)
  const isEditorial = page.kind === 'blog' || page.kind === 'glossary'
  const description = getCatalogDescription(page)
  const faqs = getCatalogFAQs(page)
  const schemaType = isEditorial ? 'Article' : page.kind === 'tool' ? 'SoftwareApplication' : 'Service'
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': schemaType, name: title, headline: title, description, provider: { '@type': 'Organization', name: 'The Inspiration' } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'The Inspiration', item: '/' },
        { '@type': 'ListItem', position: 2, name: labels[page.kind], item: page.path.split('/').slice(0, -1).join('/') || '/' },
        { '@type': 'ListItem', position: 3, name: title, item: page.path },
      ] },
      { '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    ],
  }

  return (
    <main className={`ti-catalog ti-catalog--${page.kind}`}>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} type="application/ld+json" />
      <section className="ti-catalog-hero">
        <div className="ti-catalog-grid" aria-hidden="true" />
        <div className="ti-shell ti-catalog-hero__inner">
          <div className="ti-catalog-eyebrow"><Asterisk size={14} /> {labels[page.kind]} <span>— The Inspiration</span></div>
          <h1>{title}<span>.</span></h1>
          <div className="ti-catalog-intro">
            <p>{intros[page.kind](title)}</p>
            <a href="#icerik">Keşfet <ArrowDownRight size={18} /></a>
          </div>
        </div>
        <div className="ti-catalog-ticker"><span>Strategy</span><i /><span>Design</span><i /><span>Technology</span><i /><span>Growth</span></div>
      </section>

      {page.kind === 'tool' && <section className="ti-shell ti-tool-section"><AgencyToolLab title={title} /></section>}

      {page.kind === 'example' && (
        <section className="ti-shell ti-example-showcase" id="icerik">
          {[0, 1, 2].map((index) => <Reveal delay={index * 90} key={index}><ExampleCanvas index={index} /></Reveal>)}
        </section>
      )}

      <section className={`ti-catalog-body ${isEditorial ? 'ti-catalog-body--editorial' : ''}`} id={page.kind === 'example' ? undefined : 'icerik'}>
        <div className="ti-shell ti-catalog-body__grid">
          <aside><span>01—03</span><p>{isEditorial ? 'Okuma süresi: 6 dk' : 'Birlikte düşünme biçimimiz'}</p></aside>
          <div className="ti-catalog-sections">
            {sections.map((section, index) => (
              <Reveal delay={Math.min(index * 25, 150)} key={`${section.heading}-${index}`}>
                <article className={section.level === 3 ? 'ti-catalog-subsection' : undefined}>
                  <span>{section.level === 3 ? 'Alt başlık' : 'Kapsam'}</span>
                  {section.level === 3 ? <h3>{section.heading}</h3> : <h2>{section.heading}</h2>}
                  <p>{section.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {page.kind === 'case-study' && (
        <section className="ti-case-proof">
          <div className="ti-shell"><p>Kurgusal örnek çalışma</p><div><strong>+64%</strong><span>örnek etkileşim</span></div><div><strong>2.8×</strong><span>örnek dönüşüm</span></div><div><strong>—31%</strong><span>örnek edinme maliyeti</span></div></div>
        </section>
      )}

      <section className="ti-faq" id="tool-notes">
        <div className="ti-shell ti-faq__grid">
          <div><p className="ti-section-label">Sık sorulanlar</p><h2>Net cevaplar,<br />iyi başlangıçlar.</h2></div>
          <div>{faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="ti-related">
          <div className="ti-shell"><div className="ti-section-head"><p className="ti-section-label">Sıradaki keşif</p><h2>Aynı alandan seçkiler.</h2></div>
            <div className="ti-related-grid">{related.map((item, index) => (
              <Link href={item.path} key={item.path}><span>0{index + 1}</span><h3>{item.title}</h3><MoveUpRight /></Link>
            ))}</div>
          </div>
        </section>
      )}

      <section className="ti-contact"><div className="ti-shell ti-contact-inner"><p className="ti-section-label">Sıradaki iyi fikir</p><h2>{title} için birlikte güçlü bir yön bulalım.</h2><Link href="/get-a-quote">Projeyi anlatın <ArrowRight /></Link></div></section>
    </main>
  )
}
