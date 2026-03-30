# Uretim Deploy Plani

Bu proje 7/24 calismasi icin bilgisayardan bagimsiz bir sunucuya alinmalidir.
En temiz kurulum:

1. Next.js sistemi `portal.vektorhub.com` alt domainine deploy et
2. Mobil uygulamayi bu adrese bagla
3. Firebase Admin ve SMTP ortam degiskenlerini canli ortama gir
4. FCM bildirimlerini canli backend uzerinden calistir

## Onerilen Yayin Mimarisi

- Pazarlama sitesi: `https://www.vektorhub.com`
- Musteri ve admin sistemi: `https://portal.vektorhub.com`
- Mobil uygulama varsayilan baglanti adresi: `https://portal.vektorhub.com`

Bu ayirim daha guvenlidir; mevcut yayindaki ana siteyi bozmadan yeni operasyon panelini ayri yayina alirsiniz.

## Vercel Uzerinden Deploy

1. Vercel hesabina girin
2. `vektorhub/vektorhub-web` GitHub reposunu import edin
3. Framework olarak Next.js secin
4. Root dizin repo kok dizini olarak kalsin
5. Asagidaki environment variable degerlerini Production ortaminda ekleyin
6. Deploy edin
7. Domain ayarindan `portal.vektorhub.com` alt alan adini ekleyin

## Gerekli Environment Variables

```env
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

APP_BASE_URL=https://portal.vektorhub.com

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
MAIL_FROM=

ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
ADMIN_MOBILE_SESSION_SECRET=
CUSTOMER_SESSION_SECRET=
OFFICE_CRM_SYNC_TOKEN=

PAYMENT_ACCOUNT_NAME=
PAYMENT_IBAN=
PAYMENT_BANK_NAME=
PAYMENT_BRANCH_NAME=
PAYMENT_NOTE=
```

`OFFICE_CRM_SYNC_TOKEN` dis CRM istemcisinin `Authorization: Bearer <token>` ile
`/api/admin/crm/sync` endpoint'ine baglanmasi icindir.

## Firebase Notu

- `FIREBASE_PRIVATE_KEY` degeri Vercel'e eklenirken tek satir olarak girilmelidir
- `\n` karakterleri korunmalidir
- Android uygulamasi zaten ayni Firebase projesine baglanacak sekilde hazirlandi

## Mobil Uygulama

Flutter uygulamasi artik su mantikla hazir:

- varsayilan canli adres: `https://portal.vektorhub.com`
- gerekli olursa login ekranindan lokal test adresi girilebilir

Canli APK icin ornek:

```bash
flutter build apk --release --dart-define=APP_BASE_URL=https://portal.vektorhub.com
```

## DNS Notu

Domain saglayicinizda su kayit gerekir:

- `portal` alt alan adi
- Vercel'in verdigi hedefe CNAME ya da A kaydi

## Beklenen Sonuc

Bu adimlardan sonra:

- bilgisayar kapali olsa da sistem calisir
- mobil uygulama 7/24 backend'e baglanir
- admin push bildirimleri canli ortamdan akar
- musteri islemleri ve panel yonetimi telefondan kesintisiz ilerler
