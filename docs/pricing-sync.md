## Public pricing sync

Web sitesi fiyat listesini Firestore uzerinden `site_public_content/pricing` dokumanindan okur.

Beklenen alanlar:

```json
{
  "eyebrow": "Guncel Fiyat Listesi",
  "title": "Hizmet paketleri ve baslangic fiyatlari",
  "description": "Bu tablo vektorhub_hq tarafindan guncellenir.",
  "updatedAtLabel": "09 Nisan 2026 21:00",
  "items": [
    {
      "id": "web-start",
      "badge": "Web",
      "title": "Baslangic Paket",
      "price": "12.500 TL",
      "summary": "Kurumsal tanitim sitesi kurulumu.",
      "highlights": ["Tek sayfa degil, tam kurumsal kurgu", "Mobil uyumlu yapi"],
      "ctaHref": "/iletisim",
      "ctaLabel": "Teklif Al"
    }
  ]
}
```

Alternatif olarak `vektorhub_hq`, `POST /api/admin/pricing/sync` endpoint'ine Bearer `PRICING_SYNC_TOKEN` ile ayni payload'i gonderebilir.
