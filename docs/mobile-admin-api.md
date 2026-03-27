# Mobile Admin API

Bu paket, Flutter ile sadece size ozel bir Android yonetim uygulamasi baglamak icin hazirlandi.

## 1. Mobil giris

`POST /api/mobile/admin/session`

Ornek body:

```json
{
  "password": "ADMIN_PASSWORD",
  "deviceName": "Ishak Pixel"
}
```

Ornek cevap:

```json
{
  "ok": true,
  "token": "...",
  "tokenType": "Bearer",
  "expiresIn": 2592000,
  "expiresAt": "2026-04-26T21:00:00.000Z",
  "admin": {
    "id": "admin",
    "deviceName": "Ishak Pixel"
  }
}
```

Sonraki butun isteklerde header:

```text
Authorization: Bearer <token>
```

## 2. Cihaz kaydi

`POST /api/mobile/admin/devices`

```json
{
  "deviceId": "android-id-or-uuid",
  "deviceName": "Ishak Pixel",
  "platform": "android",
  "appVersion": "1.0.0",
  "fcmToken": "firebase-cloud-messaging-token"
}
```

`DELETE /api/mobile/admin/devices`

```json
{
  "deviceId": "android-id-or-uuid"
}
```

## 3. Test bildirimi

`POST /api/mobile/admin/notify/test`

```json
{
  "title": "Test",
  "body": "Telefonuma geldi mi?"
}
```

## 4. Flutter'dan kullanilacak mevcut admin endpointleri

Mobil bearer token ile artik su endpointler de calisir:

- `GET /api/admin/cockpit`
- `GET /api/admin/applications`
- `GET|PATCH|DELETE /api/admin/applications/:id`
- `GET|POST /api/admin/applications/:id/messages`
- `GET|PATCH /api/admin/applications/:id/requests`
- `GET|POST|PATCH /api/admin/applications/:id/payments`
- `GET|POST|PATCH /api/admin/applications/:id/quotes`
- `GET|POST|DELETE /api/admin/applications/:id/documents`
- `GET|PATCH /api/admin/customers/onboarding`
- `POST /api/admin/customers/invite`

## 5. Push eventleri

Admin cihaza push gonderilen temel olaylar:

- Musteri yeni mesaj gonderirse
- Musteri yeni aksiyon talebi acarsa
- Musteri odeme bildirimi gonderirse
- Basvuru dogrulanip gercek kayda donusurse

`data` alaninda tipik olarak su alanlar gelir:

- `type`
- `applicationId`
- `paymentId`
- `requestId`
- `referenceNo`
- `screen`

## 6. Flutter tarafi icin hizli notlar

- Auth icin `dio` veya `http` interceptor ile bearer token ekleyin.
- Push icin `firebase_messaging` kullanin.
- Bildirime tiklaninca `screen` ve ilgili id alanlarina gore sayfa acin.
- Android bildirim kanali adini `vektorhub_admin` olarak olusturun.
