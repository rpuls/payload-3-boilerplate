import type { CatalogPage, CatalogPageKind } from './prix-page-catalog.generated'

const fallbackHeadings: Record<CatalogPageKind, string[]> = {
  home: [],
  landing: ['İhtiyacı doğru tanımlamak', 'Stratejik yaklaşım', 'Tasarım ve uygulama', 'Ölçüm ve sürekli gelişim'],
  blog: ['Kavramın çerçevesi', 'Neden şimdi önemli?', 'Uygulama adımları', 'Sık yapılan hatalar'],
  'case-study': ['Bağlam', 'Meydan okuma', 'Yaklaşım', 'Çözüm sistemi', 'Öğrenimler'],
  glossary: ['Kısa tanım', 'Nasıl çalışır?', 'Nerede kullanılır?', 'İyi uygulama ilkeleri'],
  tool: ['Araç ne yapar?', 'Nasıl kullanılır?', 'Sonuçları nasıl okumalı?', 'Sonraki adım'],
  example: ['Görsel yön', 'Bilgi mimarisi', 'İçerik ritmi', 'Etkileşim yaklaşımı'],
  location: ['Pazarı anlamak', 'Yerel arama görünürlüğü', 'İçerik ve deneyim', 'Ölçülebilir büyüme'],
}

const normalize = (value: string) => value.toLocaleLowerCase('tr-TR')

function deterministicChoice<T>(seed: string, values: T[]): T {
  const hash = [...seed].reduce((sum, character) => ((sum * 31) + character.charCodeAt(0)) >>> 0, 7)
  return values[hash % values.length]
}

const topicCopy = {
  definition: [
    (heading: string, title: string) => `${heading}, ${title} konusunun sınırlarını ve doğru karar noktalarını belirleyen temel çerçevedir. Kavramı sadeleştirmek, ekiplerin aynı hedef etrafında daha hızlı hareket etmesini sağlar.`,
    (heading: string, title: string) => `${title} bağlamında ${heading.toLocaleLowerCase('tr-TR')}, yalnızca teknik bir terim değil; kullanıcı beklentisi ile iş hedefi arasında kurulan bağlantıdır. Başlangıçta bu bağlantıyı netleştirmek, sonradan oluşacak gereksiz işi azaltır.`,
  ],
  seo: [
    (heading: string, title: string) => `${heading} çalışmasını ${title} stratejisinin ayrı bir katmanı olarak değil, içerik ve ürün deneyiminin parçası olarak ele alırız. Arama niyeti, teknik sağlık ve bilgi mimarisi birlikte çalıştığında görünürlük kalıcı değere dönüşür.`,
    (heading: string) => `${heading} için önce mevcut talebi ve sayfanın cevaplaması gereken gerçek soruyu belirleriz. Başlıklar, iç bağlantılar, yapılandırılmış veri ve performans sinyalleri bu tek niyeti güçlendirecek biçimde düzenlenir.`,
    (heading: string) => `${heading}, tek seferlik bir optimizasyon değil; ölçüm, öğrenme ve iyileştirme döngüsüdür. Kararları sıralama vaadine göre değil, nitelikli ziyaretçinin doğru bilgiye ne kadar rahat ulaştığına göre önceliklendiririz.`,
  ],
  design: [
    (heading: string, title: string) => `${heading}, ${title} deneyiminin karakterini görünür kılar. Tipografi, boşluk, hareket ve etkileşim kararlarını markanın tavrından türetir; estetik ile kullanılabilirliği aynı sistem içinde çözeriz.`,
    (heading: string) => `${heading} aşamasında hazır kalıplardan başlamayız. İçeriğin ritmine göre modüler bir arayüz kurar, her ekranın hem tek başına güçlü hem de bütünün doğal parçası olmasını sağlarız.`,
  ],
  performance: [
    (heading: string) => `${heading} için algılanan hız ile teknik metriği birlikte iyileştiririz. Görsellerin ağırlığı, kritik kaynaklar, etkileşim gecikmesi ve düzen kaymaları gerçek cihaz koşullarında test edilir.`,
    (heading: string) => `${heading}, kullanıcı daha ilk saniyede karar verdiği için deneyimin temelidir. Hafif bileşenler, doğru önbellekleme ve ölçülü hareket kullanarak görsel zenginliği performanstan ödün vermeden koruruz.`,
  ],
  content: [
    (heading: string, title: string) => `${heading}, ${title} için yalnızca trafik üretmek yerine güven inşa etmelidir. Her içerik belirli bir kullanıcı sorusuna cevap verir, sonraki mantıklı adıma bağlanır ve zaman içinde güncellenebilecek şekilde yapılandırılır.`,
    (heading: string) => `${heading} planında konu kümeleri, arama niyeti ve markanın söyleyebileceği özgün şeyler kesişir. Editoryal takvim bu kesişimden çıkar; dolgu metin yerine karar vermeyi kolaylaştıran içerik üretilir.`,
  ],
  technology: [
    (heading: string) => `${heading} seçiminde bugünün ihtiyacı kadar yarının değişimini de hesaba katarız. Yönetilebilir içerik modeli, açık entegrasyon noktaları ve sürdürülebilir kod yapısı ekiplerin sisteme bağımlı kalmadan ilerlemesini sağlar.`,
    (heading: string, title: string) => `${heading}, ${title} sisteminin görünmeyen ama büyümeyi taşıyan katmanıdır. Güvenlik, bakım kolaylığı ve ölçeklenebilirlik baştan tanımlanır; karmaşıklık kullanıcıya yansıtılmaz.`,
  ],
  commercial: [
    (heading: string) => `${heading} için tek bir sabit rakamdan önce kapsamı oluşturan değişkenleri açıklarız. Sayfa sayısı, içerik derinliği, entegrasyonlar ve araştırma ihtiyacı netleştiğinde fazlara ayrılmış, şeffaf bir yatırım planı çıkar.`,
    (heading: string) => `${heading}, en ucuz teslimi değil doğru kapsamı seçme problemidir. Öncelikleri iş etkisine göre sıralar, ilk sürümde gerekenlerle sonraki büyüme fazlarını birbirinden ayırırız.`,
  ],
  evidence: [
    (heading: string) => `${heading} bölümünde yalnızca iyi görünen sayıları değil, değişimin nedenini okuruz. Trafik, etkileşim ve dönüşüm sinyalleri birlikte değerlendirilir; sonuçların hangi müdahaleyle ilişkili olduğu açıkça gösterilir.`,
    (heading: string) => `${heading}, stratejinin gerçek kullanıcı davranışındaki karşılığını görünür kılar. Ölçüm planı yayından önce kurulur ve bulgular bir sonraki tasarım kararını besleyen kısa öğrenme döngülerine dönüşür.`,
  ],
  process: [
    (heading: string, title: string) => `${heading} aşamasında ${title} için varsayımları küçük, test edilebilir kararlara böleriz. Sorumlular, teslimler ve onay noktaları baştan görünür olduğu için süreç hızlanırken yaratıcı kalite korunur.`,
    (heading: string) => `${heading}, araştırma ile üretim arasında net bir geçiş noktasıdır. Önce kanıtı toplar, sonra en yüksek etkiyi yaratacak hamleyi prototipler ve doğrulanan yönü sisteme uygularız.`,
  ],
  general: [
    (heading: string, title: string) => `${heading}, ${title} kapsamında markanın vaadini somut bir kullanıcı deneyimine dönüştürür. Kararları içerik, iş hedefi ve teknik gerçeklik arasında denge kurarak alırız.`,
    (heading: string) => `${heading} için gereksiz katmanları azaltır, kullanıcının ihtiyacı olan bilgiyi doğru sırada sunarız. Böylece deneyim hem daha anlaşılır hem de markaya daha özgü hâle gelir.`,
    (heading: string, title: string) => `${title} çalışmasında ${heading.toLocaleLowerCase('tr-TR')} bağımsız bir teslim değil, bütün sistemin devamlılığını sağlayan bir parçadır. Tasarım kararları ölçülebilir hedeflere ve gerçek kullanım senaryolarına bağlanır.`,
  ],
} as const

function copyGroup(heading: string) {
  const value = normalize(heading)
  if (/nedir|tanım|ne demek|hakkında/.test(value)) return topicCopy.definition
  if (/seo|arama|keyword|anahtar kelime|canonical|schema|serp|backlink|sitemap|robots|hreflang/.test(value)) return topicCopy.seo
  if (/tasarım|arayüz|ui|ux|görsel|tipografi|portföy|marka|logo/.test(value)) return topicCopy.design
  if (/hız|mobil|performans|core web|lcp|inp|cls|yükleme/.test(value)) return topicCopy.performance
  if (/içerik|blog|editoryal|açıklama|metin/.test(value)) return topicCopy.content
  if (/yazılım|altyapı|backend|entegrasyon|cms|api|güvenlik|teknik/.test(value)) return topicCopy.technology
  if (/fiyat|paket|maliyet|bütçe|ücret|teklif/.test(value)) return topicCopy.commercial
  if (/sonuç|başarı|artış|dönüşüm|trafik|konum|ölçüm|analiz/.test(value)) return topicCopy.evidence
  if (/nasıl|adım|süreç|yol haritası|kurulum|uygulama|yapılandırma|çözüm|yaklaşım/.test(value)) return topicCopy.process
  return topicCopy.general
}

export function getCatalogSections(page: CatalogPage) {
  const sourceSections = page.sections.length
    ? page.sections
    : fallbackHeadings[page.kind].map((heading) => ({ heading, level: 2 }))

  return sourceSections.map((section) => {
    const copies = copyGroup(section.heading)
    const copy = deterministicChoice(`${page.path}:${section.heading}`, copies as unknown as Array<(heading: string, title: string) => string>)
    return { ...section, body: copy(section.heading, page.title) }
  })
}

export function getCatalogDescription(page: CatalogPage) {
  const kindLabel: Record<CatalogPageKind, string> = {
    home: 'yaratıcı stüdyo', landing: 'strateji ve uygulama rehberi', blog: 'stüdyo perspektifi',
    'case-study': 'örnek dönüşüm senaryosu', glossary: 'açık ve uygulanabilir tanım',
    tool: 'ücretsiz ön değerlendirme aracı', example: 'seçilmiş dijital deneyim yönleri',
    location: 'yerel içgörü ve global uygulama yaklaşımı',
  }
  return `${page.title}: The Inspiration tarafından hazırlanan ${kindLabel[page.kind]}. Konuyu strateji, tasarım, teknoloji ve ölçülebilir etki açısından keşfedin.`
}

export function getCatalogFAQs(page: CatalogPage) {
  const sourceQuestions = getCatalogSections(page)
    .filter((section) => section.heading.includes('?'))
    .slice(0, 3)
    .map((section) => ({ question: section.heading, answer: section.body }))

  const fallbacks = [
    {
      question: `${page.title} çalışmasına nasıl başlıyorsunuz?`,
      answer: `Önce ${page.title} için hedefi, hedef kitleyi ve mevcut veriyi netleştiriyoruz. Ardından kapsamı, teslimleri ve karar noktalarını görünür kılan kısa bir yol haritası hazırlıyoruz.`,
    },
    {
      question: 'Süreç ve yatırım nasıl belirlenir?',
      answer: 'Süre; araştırma derinliği, içerik miktarı, teknik entegrasyonlar ve üretilecek deneyimlerin kapsamına göre belirlenir. İlk görüşmeden sonra fazlara ayrılmış şeffaf bir plan sunarız.',
    },
    {
      question: 'Yayın sonrasında destek veriyor musunuz?',
      answer: 'Evet. Ölçümleme, içerik, SEO ve ürün geliştirme ihtiyaçlarına göre devam eden bir optimizasyon ve büyüme ritmi kurabiliriz.',
    },
  ]

  return [...sourceQuestions, ...fallbacks].slice(0, 3)
}
