## WhatsApp Template Plan

Business-initiated WhatsApp messages require approved templates.

Configured event -> env mapping:

- `Basvuru alindi` -> `TWILIO_WHATSAPP_TEMPLATE_SID_BASVURU_ALINDI`
- `Durum guncellendi` -> `TWILIO_WHATSAPP_TEMPLATE_SID_DURUM_GUNCELLENDI`
- `Yeni admin mesaji` -> `TWILIO_WHATSAPP_TEMPLATE_SID_YENI_MESAJ`
- `Teklif hazir` -> `TWILIO_WHATSAPP_TEMPLATE_SID_TEKLIF_HAZIR`
- `Odeme kaydi acildi` -> `TWILIO_WHATSAPP_TEMPLATE_SID_ODEME_KAYDI`
- `Odeme sonucu` -> `TWILIO_WHATSAPP_TEMPLATE_SID_ODEME_SONUCU`

Suggested variables:

### Basvuru alindi
- `{{1}}` customer first name
- `{{2}}` reference number
- `{{3}}` service area

### Durum guncellendi
- `{{1}}` customer first name
- `{{2}}` reference number
- `{{3}}` new status
- `{{4}}` customer-visible note

### Yeni admin mesaji
- `{{1}}` customer first name
- `{{2}}` reference number
- `{{3}}` short message preview

### Teklif hazir
- `{{1}}` customer first name
- `{{2}}` reference number
- `{{3}}` quote title
- `{{4}}` total amount

### Odeme kaydi acildi
- `{{1}}` customer first name
- `{{2}}` reference number
- `{{3}}` payment title
- `{{4}}` amount
- `{{5}}` due date or `-`

### Odeme sonucu
- `{{1}}` customer first name
- `{{2}}` reference number
- `{{3}}` payment title
- `{{4}}` status label
- `{{5}}` admin note or `-`
