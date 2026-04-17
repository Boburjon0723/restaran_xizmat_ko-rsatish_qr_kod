# Restoran Startup Loyihasi - Texnologik Arxitektura

Bu hujjat loyiha uchun kod darajasidagi texnologik arxitekturani belgilaydi:

- Qaysi servislar bo'ladi
- Qaysi texnologiya nima uchun ishlatiladi
- Backend qanday bo'linadi
- Database qanday ishlaydi
- Integratsiya qatlami qanday yoziladi
- Papka strukturasi qanday bo'ladi
- MVP uchun eng to'g'ri stack

---

## 0) Loyiha scope va aniq boundary

Bu loyiha **yangi POS tizim yozish** uchun emas.

Biz qurayotgan mahsulot:
- QR-based ordering platforma
- Restorandagi mavjud POS tizimlariga ulanadigan integration layer
- Mijoz buyurtmasini qabul qilish va POS'ga yuborish oqimi
- Admin panel, realtime monitoring va fallback jarayonlarini boshqarish

Aniq prinsip:
- POS core funksiyalari (kassa, fiskal, ichki POS workflow) restoran tomonda qoladi
- Bizning platforma orchestration va integratsiya qatlamini bajaradi

---

## 1) Tavsiya qilinadigan asosiy stack

### Frontend

#### Customer App
- Next.js
- TypeScript
- Tailwind CSS
- React Query / TanStack Query
- Zustand yoki Redux Toolkit
- PWA support

#### Admin Panel
- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI
- TanStack Table
- Chart library: Recharts yoki ECharts

### Backend
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Redis
- RabbitMQ (Phase 2+ event bus uchun ixtiyoriy)
- Socket.IO
- BullMQ (job queue uchun, Redis bilan)

### Infrastructure
- Docker
- Docker Compose (MVP bosqichi uchun)

Keyingi bosqich:
- Kubernetes
- AWS ECS / EKS
- yoki DigitalOcean Apps

### Observability
- Prometheus
- Grafana
- Loki yoki ELK
- Sentry

---

## 2) Arxitektura usuli

Eng to'g'ri model:

### Boshlanishida: Modular Monolith

Bu degani:
- Hamma backend bitta repo ichida bo'ladi
- Bitta deploy bo'ladi
- Lekin ichida modullar qat'iy ajratiladi

Bu MVP uchun eng yaxshi yo'l.

### Keyinchalik: Microservice'ga ajratiladi

Quyidagi modullar alohida servisga chiqariladi:
- `order-service`
- `integration-service`
- `notification-service`
- `menu-sync-service`

---

## 3) Yuqori darajadagi tizim ko'rinishi

```text
[ Customer PWA ] ----\
                      \
                       --> [ API Gateway / Backend ]
                      /
[ Admin Panel ] -----/

                    Backend ichida:
                    - Auth Module
                    - Restaurant Module
                    - Table Module
                    - Menu Module
                    - Order Module
                    - POS Integration Module
                    - Notification Module
                    - Realtime Module
                    - Billing Module
                    - Analytics Module

Backend -> PostgreSQL
Backend -> Redis
Backend -> RabbitMQ
Backend -> Socket.IO
Backend -> Telegram Bot
Backend -> External POS APIs
```

---

## 4) Backend modullar bo'linishi

### 4.1 Auth Module

**Vazifasi:**
- Admin login
- Restaurant owner login
- Staff roles
- JWT auth
- Refresh token
- RBAC

**Entitylar:**
- `users`
- `roles`
- `permissions`
- `sessions`

### 4.2 Restaurant Module

**Vazifasi:**
- Restoran yaratish
- Restoran sozlamalari
- Branding
- POS type
- Ishlash statusi

**Entitylar:**
- `restaurants`
- `restaurant_settings`
- `restaurant_integrations`

### 4.3 Table Module

**Vazifasi:**
- Stollarni boshqarish
- QR generatsiya
- Table token verification
- Session ochish

**Entitylar:**
- `tables`
- `qr_sessions`
- `qr_tokens`

### 4.4 Menu Module

**Vazifasi:**
- Menu category
- Menu item
- Modifiers
- Availability
- POS sync'dan kelgan itemlarni normalize qilish

**Entitylar:**
- `menu_categories`
- `menu_items`
- `menu_item_modifiers`
- `menu_sync_logs`
- `menu_snapshots`

### 4.5 Order Module

**Vazifasi:**
- Cart yaratish
- Order create
- Order status update
- Order retry
- Order history

**Entitylar:**
- `orders`
- `order_items`
- `order_events`
- `carts`
- `cart_items`

### 4.6 POS Integration Module

Bu eng muhim modul.

**Vazifasi:**
- POS adapterlar
- Menu sync
- Order submit
- Order status query
- Health check

**Submodullar:**
- `adapters/jowi`
- `adapters/rkeeper`
- `adapters/iiko`
- `adapter-factory`
- `mapping-service`
- `retry-service`

### 4.7 Notification Module

**Vazifasi:**
- Telegram fallback
- SMS
- Push notification
- Waiter alert

### 4.8 Realtime Module

**Vazifasi:**
- Order live status
- Call waiter live event
- Admin dashboard realtime cards

**Texnologiya:**
- Socket.IO

### 4.9 Billing Module

**Vazifasi:**
- Tariflar
- Subscription
- Usage tracking
- Invoice
- Commission hisoblash

### 4.10 Analytics Module

**Vazifasi:**
- Eng ko'p sotilgan taom
- Order count
- Average chek
- Peak hours
- Failed orders
- POS success/failure rate

---

## 5) Integration qatlami (yozilish prinsipi)

POS integratsiya qatlamini `adapter pattern` asosida yozish tavsiya qilinadi.

Har bir POS uchun alohida adapter bo'ladi:
- `JowiAdapter`
- `RkeeperAdapter`
- `IikoAdapter`

Umumiy interface:
- `syncMenu()`
- `submitOrder()`
- `getOrderStatus()`
- `healthCheck()`

Afzalliklar:
- Yangi POS qo'shish oson bo'ladi
- Core biznes logika adapterdan mustaqil qoladi
- Testlash va monitoring soddalashadi

---

## 6) Database ishlash modeli

Asosiy ma'lumotlar bazasi:
- PostgreSQL (transactional data)

Cache va tezkor operatsiyalar:
- Redis (session, cache, temporary token, queue backend)

Asinxron event va ishlar:
- RabbitMQ (event bus)
- BullMQ (retryable jobs, delayed jobs, background processing)

Muhim tamoyillar:
- Har bir modul o'z domain entitylari uchun javobgar
- Audit uchun `order_events` va `integration_logs` saqlanadi
- Failed integratsiyalar uchun retry mexanizmi ishlaydi

---

## 7) Tavsiya etiladigan papka strukturasi (MVP)

```text
apps/
  customer-web/
  admin-web/
  api/

packages/
  ui/
  config/
  types/
  utils/
  pos-adapters/

infrastructure/
  docker/
  nginx/
  scripts/
  monitoring/
```

---

## 8) MVP uchun eng to'g'ri stack (yakuniy tavsiya)

MVP bosqichida quyidagi kombinatsiya eng optimal:

- **Frontend:** Next.js + TypeScript + Tailwind
- **Backend:** NestJS + Prisma + PostgreSQL
- **Realtime:** Socket.IO
- **Queue:** BullMQ + Redis
- **Integration:** Adapter pattern (+ RabbitMQ Phase 2+ da)
- **Deploy:** Docker Compose
- **Monitoring:** Sentry + Prometheus + Grafana

Bu stack:
- Tez start beradi
- Production'ga tayyor
- Keyinchalik microservice'ga oson migratsiya qilinadi

---

## 9) Backend uchun Clean Architecture tavsiyasi

Backend ichida modulga yo'naltirilgan clean architecture qatlamlari ishlatiladi.

Tavsiya etilgan tuzilma:

```text
src/
  modules/
    order/
      controllers/
      services/
      repositories/
      dto/
      entities/
      events/
      interfaces/
      use-cases/
```

Qatlamlar ma'nosi:
- **Controller** - HTTP request qabul qiladi va use-case'ga uzatadi
- **Service / Use-case** - biznes logikani bajaradi
- **Repository** - DB bilan ishlaydi
- **DTO** - request/response sxemalar
- **Entity** - domain model
- **Events** - domain eventlar
- **Interfaces** - contract (abstraksiyalar)

---

## 10) POS integratsiya qatlami (yadroviy qism)

Bu loyiha yuragi - POS bilan barqaror integratsiya.

### 10.1 Umumiy interface

```ts
export interface PosAdapter {
  getMenu(restaurantId: string): Promise<NormalizedMenu>;
  sendOrder(payload: SendOrderPayload): Promise<SendOrderResult>;
  getOrderStatus(externalOrderId: string): Promise<OrderStatus>;
  healthCheck(): Promise<boolean>;
}
```

### 10.2 Adapterlar

```ts
export class JowiAdapter implements PosAdapter {}
export class RKeeperAdapter implements PosAdapter {}
export class IikoAdapter implements PosAdapter {}
```

### 10.3 Factory

```ts
@Injectable()
export class PosAdapterFactory {
  constructor(
    private readonly jowiAdapter: JowiAdapter,
    private readonly rkeeperAdapter: RKeeperAdapter,
    private readonly iikoAdapter: IikoAdapter,
  ) {}

  getAdapter(posType: PosType): PosAdapter {
    switch (posType) {
      case 'jowi':
        return this.jowiAdapter;
      case 'rkeeper':
        return this.rkeeperAdapter;
      case 'iiko':
        return this.iikoAdapter;
      default:
        throw new Error('Unsupported POS type');
    }
  }
}
```

### 10.4 Bu pattern foydasi
- Core order logic o'zgarmaydi
- Faqat yangi adapter qo'shiladi
- Test qilish osonlashadi

---

## 11) Order flow (kod darajasida)

1. Client order yuboradi  
   `POST /api/v1/public/orders`
2. Backend order'ni DBga yozadi  
   Boshlang'ich status: `pending`
3. Order event queue'ga yuboriladi  
   MVP: `BullMQ` (`order:submit` job)
4. Worker eventni olib POS'ga yuboradi  
   Natija:
   - `success` -> `sent`
   - `fail` -> `retrying`
   - `total fail` -> `manual_required`
5. Socket orqali frontendga live update ketadi  
   `pending` -> `sent` -> `preparing` -> `completed`
6. (Phase 2+) Muvofiq domain eventlar `RabbitMQ` orqali boshqa servislar bilan ulashiladi

---

## 12) Queue arxitekturasi

Queue bo'lmasa productionda quyidagi risklar chiqadi:
- POS API sekin ishlashi
- Order yo'qolishi ehtimoli
- Retry mexanizmi yo'qligi
- Peak load paytida backend yiqilishi

Tavsiya:
- **MVP (tanlangan):** BullMQ + Redis (critical workflow: order submit, retry, delay)
- **Phase 2:** RabbitMQ event bus (integration/notification/analytics servislararo eventlar)
- **Enterprise scale:** Kafka (yuqori throughput stream processing kerak bo'lsa)

Aniq qoida:
- Birinchi navbatda order pipeline uchun bitta primary queue ishlatiladi (`BullMQ`)
- RabbitMQ faqat servislar soni ko'payganda event backbone sifatida qo'shiladi

---

## 13) Database arxitekturasi

### PostgreSQL
Asosiy transactional ma'lumotlar:
- `restaurants`
- `tables`
- `orders`
- `order_items`
- `menu_items`
- `users`
- `integrations`

### Redis
- Cache
- Session
- WebSocket room state
- Queue data
- Rate limiting
- Temporary QR token

---

## 14) Tavsiya etilgan schema

### `restaurants`
- `id`
- `name`
- `slug`
- `pos_type`
- `status`
- `timezone`
- `created_at`
- `updated_at`

### `restaurant_integrations`
- `id`
- `restaurant_id`
- `provider`
- `api_url`
- `api_key_encrypted`
- `api_secret_encrypted`
- `is_active`
- `last_health_check_at`
- `last_sync_at`

### `tables`
- `id`
- `restaurant_id`
- `number`
- `zone`
- `qr_code_url`
- `is_active`

### `menu_categories`
- `id`
- `restaurant_id`
- `external_id`
- `name`
- `sort_order`
- `is_active`

### `menu_items`
- `id`
- `restaurant_id`
- `category_id`
- `external_id`
- `name`
- `description`
- `price`
- `image_url`
- `is_available`
- `metadata_json`

### `orders`
- `id`
- `restaurant_id`
- `table_id`
- `session_id`
- `status`
- `source`
- `total_amount`
- `external_order_id`
- `failure_reason`
- `created_at`
- `updated_at`

### `order_items`
- `id`
- `order_id`
- `menu_item_id`
- `external_item_id`
- `name`
- `price`
- `quantity`
- `modifiers_json`

### `order_events`
- `id`
- `order_id`
- `type`
- `payload_json`
- `created_at`

### `qr_sessions`
- `id`
- `restaurant_id`
- `table_id`
- `token`
- `expires_at`
- `device_fingerprint`
- `geo_hash`
- `status`

### Majburiy constraint va indexlar
- `restaurants.slug` -> `UNIQUE`
- `tables (restaurant_id, number)` -> `UNIQUE`
- `menu_items (restaurant_id, external_id)` -> `UNIQUE`
- `orders.idempotency_key` -> `UNIQUE` (duplicate order'ni oldini olish)
- `orders (restaurant_id, created_at)` -> `INDEX` (admin ro'yxat tezligi)
- `orders (status, created_at)` -> `INDEX` (kitchen queue/filter)
- `order_events (order_id, created_at)` -> `INDEX`
- Barcha FK ustunlariga index qo'yiladi (`restaurant_id`, `order_id`, `table_id`, ...)

### Multi-tenant izolatsiya qoidasi
- Har bir so'rov `restaurant_id` scope bilan ishlaydi
- Repository qatlamida cross-tenant query taqiqlanadi
- Kattalashganda PostgreSQL RLS yoqilishi tavsiya etiladi

---

## 15) API structure

Versioning siyosati:
- Barcha endpointlar `v1` prefiks bilan ochiladi
- Public va Admin segmentlari alohida saqlanadi

### Customer App API
- `GET    /api/v1/public/restaurants/:slug/table/:token`
- `GET    /api/v1/public/menu`
- `POST   /api/v1/public/cart`
- `POST   /api/v1/public/orders`
- `GET    /api/v1/public/orders/:id/status`
- `POST   /api/v1/public/call-waiter`

### Admin API
- `POST   /api/v1/admin/auth/login`
- `GET    /api/v1/admin/orders`
- `PATCH  /api/v1/admin/orders/:id/status`
- `GET    /api/v1/admin/tables`
- `POST   /api/v1/admin/tables`
- `GET    /api/v1/admin/menu/sync`
- `POST   /api/v1/admin/menu/sync`
- `GET    /api/v1/admin/integrations`
- `PATCH  /api/v1/admin/integrations/:id`
- `GET    /api/v1/admin/analytics`

---

## 16) Real-time arxitektura

Socket roomlar:
- `restaurant:{restaurantId}`
- `table:{tableId}`
- `order:{orderId}`

Eventlar:
- `order.created`
- `order.sent`
- `order.preparing`
- `order.completed`
- `waiter.called`
- `pos.connection.lost`
- `menu.synced`

---

## 17) Telegram bot joylashuvi

Telegram bot'ni alohida microservice qilish ideal, lekin MVPda backend ichida ham ishlaydi.

Trigger holatlar:
- POS down
- Order retry fail
- Waiter called
- Table assistance needed

Misol alert:

```text
[ALERT]
Restoran: Oqtepa Lavash Chilonzor
Stol: 5
Holat: POS bilan aloqa yo'q
Action: buyurtmani qo'lda qabul qiling
```

---

## 18) Yakuniy papka strukturasi (Monorepo)

```text
apps/
  customer-web/
  admin-web/
  api/

packages/
  ui/
  types/
  utils/
  config/
  pos-adapters/

infrastructure/
  docker/
  nginx/
  scripts/
```

`apps/api/src` ichida:

```text
src/
  main.ts
  app.module.ts

  common/
    decorators/
    filters/
    guards/
    interceptors/
    pipes/
    utils/

  config/
    env/
    database/
    redis/
    queue/

  modules/
    auth/
    users/
    restaurants/
    tables/
    menu/
    orders/
    integrations/
    notifications/
    realtime/
    analytics/
    billing/
```

---

## 19) Frontend arxitekturasi

### Customer app sahifalari
- `/`
- `/r/[restaurantSlug]/t/[token]`
- `/menu`
- `/cart`
- `/checkout`
- `/order/[id]`
- `/help`

### Componentlar

```text
components/
  menu/
  cart/
  order/
  table/
  waiter/
  common/
```

### Frontend state
- Cart state
- Restaurant session
- Current order status
- WebSocket state

### Frontend data fetching
- TanStack Query

Bu bilan:
- Cache
- Refetch
- Optimistic update
- Loading state
- Retry

---

## 20) Security arxitekturasi

### Mijoz tomonda
- QR token signed bo'lishi kerak
- Token expiration
- Table binding
- Optional geofence
- Rate limiting
- Captcha faqat shubhali holatda
- QR token bir martalik ishlatiladigan yoki qisqa TTL bilan rotate qilinadigan bo'ladi

### Admin tomonda
- JWT
- Refresh token
- Hashed password
- RBAC
- Audit log
- Refresh token rotation + revoke (logout/all sessions)
- Login urinishlarida throttle va lockout policy
- Socket ulanishlarida ham JWT tekshiruvi
- Barcha admin amallarida `restaurant_id` scope enforcement

### Sensitive data
- POS credentials encrypted holda saqlanadi
- Secretlar `.env` ichida boshqariladi
- Zarur holatda KMS ishlatiladi
- Webhook/integration callback'larda signature verification majburiy

---

## 21) Deployment arxitekturasi

### MVP
- 1 ta VPS yoki 1 ta cloud project
- Docker Compose
- Nginx reverse proxy
- PostgreSQL
- Redis
- API
- `customer-web`
- `admin-web`

### Kattalashganda
- API alohida servis
- Worker alohida servis
- WebSocket alohida servis
- Redis managed
- PostgreSQL managed
- CDN
- Object storage (S3)

---

## 22) Tavsiya etilgan development plan

### Phase 1 - MVP
- Customer PWA
- Admin panel basic
- Orders
- Tables
- QR
- Fake POS
- Telegram alert
- Redis cache

### Phase 2
- Jowi adapter
- Realtime order status
- Menu sync
- Retry queue

### Phase 3
- Multi-tenant billing
- Analytics
- Waiter panel
- Payment integration

### Phase 4
- iiko / rkeeper
- Offline fallback
- Advanced reporting
- CRM

---

## 23) Eng to'g'ri stack bo'yicha yakuniy tavsiya

Agar aynan ishlaydigan stack tanlansa:

### Frontend
- Next.js
- TypeScript
- Tailwind
- Zustand
- TanStack Query

### Backend
- NestJS
- Prisma
- PostgreSQL
- Redis
- BullMQ
- Socket.IO

### Infra
- Docker
- Nginx
- Sentry
- Grafana

Bu stack bilan:
- Tez build qilinadi
- Maintain qilish oson
- Team scale qila oladi
- Future microservice uchun tayyor bo'ladi

---

## 24) Qisqa xulosa

Bu loyihaning ideal kod arxitekturasi:

### Boshlanishida
- Modular Monolith
- NestJS + PostgreSQL + Redis + BullMQ
- Next.js PWA + Admin Dashboard
- Adapter-based POS integration

### Keyinchalik
- `integration-service` va `order-worker` alohida servisga chiqadi
- Billing va analytics kengayadi
- Mahsulot SaaS multi-tenant productga aylanadi

---

## 25) Keyingi qadamlar (ixtiyoriy)

Agar xohlasangiz, keyingi bosqichda quyidagilardan birini tayyorlayman:

1. To'liq papka strukturasi
2. Database ERD
3. NestJS uchun starter code architecture
