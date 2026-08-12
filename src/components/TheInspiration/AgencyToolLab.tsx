'use client'

import { ArrowRight, RotateCcw, Sparkles } from 'lucide-react'
import React, { useMemo, useState } from 'react'

export function AgencyToolLab({ title }: { title: string }) {
  const [value, setValue] = useState('')
  const score = useMemo(() => {
    if (!value.trim()) return null
    return Math.min(96, 48 + new Set(value.toLocaleLowerCase('tr-TR').split(/\s+/)).size * 3)
  }, [value])

  return (
    <div className="ti-tool-lab">
      <div className="ti-tool-lab__head">
        <div><span>TI / LAB</span><h2>{title}</h2></div>
        <Sparkles aria-hidden="true" />
      </div>
      <label htmlFor="tool-input">Analiz etmek istediğiniz metni veya adresi girin</label>
      <textarea
        id="tool-input"
        onChange={(event) => setValue(event.target.value)}
        placeholder="Örnek: Marka anlatınızı, sayfa başlığınızı veya URL’nizi buraya ekleyin…"
        value={value}
      />
      <div className="ti-tool-lab__actions">
        <button onClick={() => setValue('')} type="button"><RotateCcw size={16} /> Temizle</button>
        <span>{value.length} karakter</span>
      </div>
      {score !== null && (
        <div className="ti-tool-result" aria-live="polite">
          <span>Ön değerlendirme</span>
          <strong>{score}<small>/100</small></strong>
          <p>Mesajın temel yapısı güçlü. Net bir değer önerisi ve daha belirgin bir sonraki adım ekleyerek anlatıyı keskinleştirebilirsiniz.</p>
          <a href="#tool-notes">Önerileri incele <ArrowRight size={15} /></a>
        </div>
      )}
      <p className="ti-tool-disclaimer">Bu araç bir tasarım prototipidir; sonuçlar otomatik ön değerlendirmedir.</p>
    </div>
  )
}
