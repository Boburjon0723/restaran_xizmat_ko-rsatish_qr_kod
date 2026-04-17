import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.orderEvent.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.qrSession.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.menuCategory.deleteMany();
  await prisma.table.deleteMany();
  await prisma.restaurantIntegration.deleteMany();
  await prisma.restaurant.deleteMany();

  const restaurant = await prisma.restaurant.upsert({
    where: { slug: "oqtepa-chilonzor" },
    update: {},
    create: {
      name: "Oqtepa Lavash Chilonzor",
      slug: "oqtepa-chilonzor",
      posType: "iiko",
      timezone: "Asia/Tashkent"
    }
  });

  const integrations = [
    {
      provider: "IIKO" as const,
      apiUrl: "https://demo.iiko.local/api",
      apiKeyEncrypted: "enc_demo_iiko_key",
      apiSecretEncrypted: "enc_demo_iiko_secret"
    },
    {
      provider: "JOWI" as const,
      apiUrl: "https://demo.jowi.local/api",
      apiKeyEncrypted: "enc_demo_jowi_key",
      apiSecretEncrypted: "enc_demo_jowi_secret"
    }
  ];

  for (const integration of integrations) {
    await prisma.restaurantIntegration.create({
      data: {
        restaurantId: restaurant.id,
        ...integration,
        isActive: integration.provider === "IIKO",
        lastHealthCheckAt: new Date(),
        lastSyncAt: new Date()
      }
    });
  }

  const tableNumbers = ["1", "2", "3", "4", "5", "12", "15"];
  const createdTables: Array<{ id: string; number: string }> = [];
  for (const number of tableNumbers) {
    const table = await prisma.table.create({
      data: {
        restaurantId: restaurant.id,
        number,
        zone: Number(number) > 10 ? "terrace" : "hall",
        qrCodeUrl: `https://demo.qr.local/${restaurant.slug}/t/${number}`
      }
    });
    createdTables.push({ id: table.id, number: table.number });
  }

  const categoryMain = await prisma.menuCategory.create({
    data: {
      restaurantId: restaurant.id,
      externalId: "cat_main",
      name: "Asosiy taomlar",
      sortOrder: 1
    }
  });

  const categoryDrink = await prisma.menuCategory.create({
    data: {
      restaurantId: restaurant.id,
      externalId: "cat_drink",
      name: "Ichimliklar",
      sortOrder: 2
    }
  });

  const menuItems = [
    { categoryId: categoryMain.id, externalId: "m1", name: "Lavash", price: 32000 },
    { categoryId: categoryMain.id, externalId: "m2", name: "Donar", price: 36000 },
    { categoryId: categoryMain.id, externalId: "m3", name: "Burger", price: 41000 },
    { categoryId: categoryDrink.id, externalId: "d1", name: "Cola 1L", price: 14000 },
    { categoryId: categoryDrink.id, externalId: "d2", name: "Ayran", price: 9000 }
  ];

  const createdMenuItems: Array<{ id: string; name: string; price: number }> = [];
  for (const item of menuItems) {
    const menuItem = await prisma.menuItem.create({
      data: {
        restaurantId: restaurant.id,
        categoryId: item.categoryId,
        externalId: item.externalId,
        name: item.name,
        price: item.price,
        isAvailable: true
      }
    });
    createdMenuItems.push({ id: menuItem.id, name: menuItem.name, price: menuItem.price });
  }

  const orderDemoSet = [
    { tableNumber: "4", status: "PREPARING" as const, items: ["Lavash", "Cola 1L"] },
    { tableNumber: "12", status: "PENDING" as const, items: ["Donar"] },
    { tableNumber: "1", status: "COMPLETED" as const, items: ["Burger", "Ayran"] },
    { tableNumber: "15", status: "RETRYING" as const, items: ["Lavash"] },
    { tableNumber: "5", status: "MANUAL_REQUIRED" as const, items: ["Donar", "Cola 1L"] }
  ];

  for (const demo of orderDemoSet) {
    const table = createdTables.find((x) => x.number === demo.tableNumber);
    if (!table) continue;

    const selectedItems = demo.items
      .map((name) => createdMenuItems.find((x) => x.name === name))
      .filter((item): item is { id: string; name: string; price: number } => Boolean(item));

    const totalAmount = selectedItems.reduce((sum, item) => sum + item.price, 0);

    const order = await prisma.order.create({
      data: {
        restaurantId: restaurant.id,
        tableId: table.id,
        status: demo.status,
        source: "qr",
        totalAmount,
        externalOrderId: `ext-${Math.random().toString(36).slice(2, 8)}`,
        failureReason: demo.status === "MANUAL_REQUIRED" ? "POS connection timeout" : null
      }
    });

    for (const item of selectedItems) {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          menuItemId: item.id,
          externalItemId: `ext-item-${item.id.slice(-6)}`,
          name: item.name,
          price: item.price,
          quantity: 1
        }
      });
    }

    await prisma.orderEvent.create({
      data: {
        orderId: order.id,
        type: "order.created",
        payloadJson: JSON.stringify({ source: "seed", status: demo.status })
      }
    });
  }

  for (const table of createdTables.slice(0, 4)) {
    await prisma.qrSession.create({
      data: {
        restaurantId: restaurant.id,
        tableId: table.id,
        token: `demo-token-${table.number}`,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 8),
        deviceFingerprint: "demo-device",
        geoHash: "tnz-demo",
        status: "active"
      }
    });
  }

  console.log("Demo data tayyor bo'ldi.");
  console.log(`Restaurant: ${restaurant.name}`);
  console.log(`Tables: ${createdTables.length}, Menu items: ${createdMenuItems.length}, Orders: ${orderDemoSet.length}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
