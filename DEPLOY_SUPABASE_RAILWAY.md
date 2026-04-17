# Supabase + Railway ishga tushirish

## 1) Supabase'da demo baza tayyorlash

1. Supabase project yarating.
2. `Project Settings -> Database` dan 2 ta ulanish URL oling:
   - Pooled URL (`6543`) -> `DATABASE_URL`
   - Direct URL (`5432`) -> `DIRECT_URL`
3. `apps/api/.env` faylini to'ldiring (`.env.example`ga qarang).

## 2) Demo ma'lumotlarni bazaga yozish

Root papkadan:

- `npm run db:push --workspace apps/api`
- `npm run db:seed --workspace apps/api`

Bu komandalar schema'ni Supabase bazasiga tushiradi va demo ma'lumotlar bilan to'ldiradi.

## 3) Lokal backend + socket + redis

- Docker bilan:
  - `docker compose up --build`
- Yoki local:
  - `npm run dev:api`

Socket namespace:
- `/realtime`

Asosiy endpointlar:
- `POST /api/v1/public/orders`
- `GET /api/v1/public/orders/:id/status`
- `GET /api/v1/admin/orders`
- `PATCH /api/v1/admin/orders/:id/status`

## 4) Railway deploy

1. Railwayda yangi project yarating.
2. GitHub repo ulang.
3. Railway service variablesga qo'ying:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `REDIS_URL`
   - `PORT=4000`
   - `CORS_ORIGIN=https://<customer-domain>,https://<admin-domain>`
4. Deploy qiling (`railway.json` ishlaydi).

## 5) Eslatma

- Biz POS yaratmaymiz; bu backend mavjud POS'ga ulanish va order orchestration uchun.
- Agar Supabase pooling ishlatilsa, Prisma uchun `DIRECT_URL` albatta to'g'ri bo'lishi kerak.
