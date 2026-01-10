# azael_dc-serverlogs

ส่งบันทึกกิจกรรมของผู้เล่นไปยัง **[Discord API](./config/server.md#discord-api)** โดยใช้ **[Webhook URL](./config/events/discord#discord-events)** ตามขีดจำกัดอัตราการใช้งาน **[Discord API](https://discord.com/developers/docs/resources/webhook#create-webhook)** สำหรับ **[Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)** หรือ **[Custom API](./config/server.md#custom-api)** สำหรับการส่งบันทึกกิจกรรมของผู้เล่นไปยัง **[Server API](https://en.wikipedia.org/wiki/Web_API)** ที่กำหนดเองแบบเรียลไทม์ (**[Real Time](https://en.wikipedia.org/wiki/Real-time)**)

## ความต้องการ

### เซิร์ฟเวอร์

- เวอร์ชัน **[Server](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master)** ขั้นต่ำ **`4664`**
- เปิดใช้งาน **[OneSync](https://docs.fivem.net/docs/scripting-reference/onesync)**

### ทรัพยากร

- ไม่มี (**[Standalone](https://en.wikipedia.org/wiki/Stand-alone)**)
- รองรับ **[screenshot-basic](https://github.com/citizenfx/screenshot-basic)** สำหรับ **[บันทึกภาพหน้าจอตามเหตุการณ์ที่กำหนด](./config/server.md#screenshotwebhooks)**
- รองรับ **[ESX](https://github.com/esx-framework)** และ **[QBCore](https://github.com/qbcore-framework)** สำหรับ **[สาเหตุการตาย](./config/client.md#death)** โดย **อาวุธเสริม**, **ขาดน้ำ**, **ขาดอาหาร** (สามารถเพิ่มหรือแก้ไข **[Framework](https://en.wikipedia.org/wiki/Framework)** ได้ที่โฟลเดอร์ **[public/framework](./public/framework.md)**)

## ติดตั้งและใช้งาน

1. ดาวน์โหลดและแตกไฟล์ลงในโฟลเดอร์ `resources` ของคุณ
2. ชื่อของทรัพยากรจะต้องเป็น `azael_dc-serverlogs` ห้ามแก้ไขโดยเด็ดขาด
3. ไปยังโฟลเดอร์ `config` และดำเนินการเปิดไฟล์ **[auth.config.lua](./config/auth.md)** เพื่อระบุ **[Token](./config/auth.md#token)** ของสินค้า
4. ไปยังไฟล์ `server.cfg` และทำการเพิ่ม `ensure azael_dc-serverlogs` (บรรทัดใดก็ได้)

```diff title="server.cfg"
ensure azael_dc-serverlogs
```

:::caution

- หากเซิร์ฟเวอร์ของคุณมีผู้เล่นออนไลน์อยู่เป็นจำนวนมาก โปรดหลีกเลี่ยงการรีสตาร์ททรัพยากรนี้

:::

## ยกเลิกใช้งาน

1. ไปยังไฟล์ `server.cfg` และค้นหา `ensure azael_dc-serverlogs`
2. ทำการเพิ่ม `#` ไว้ข้างหน้า `ensure azael_dc-serverlogs`

```diff title="server.cfg"
#ensure azael_dc-serverlogs
```
