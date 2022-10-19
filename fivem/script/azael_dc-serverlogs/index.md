# azael_dc-serverlogs

## ความต้องการ

### เซิร์ฟเวอร์

- เวอร์ชัน **[Server](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master)** ขั้นต่ำ **`4664`**
- เปิดใช้งาน **[OneSync](https://docs.fivem.net/docs/scripting-reference/onesync)**

### ทรัพยากร

- ไม่มี (**[Standalone](https://en.wikipedia.org/wiki/Stand-alone)**)
- รองรับ **[es_extended](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx%5D/es_extended)** สำหรับ **สาเหตุการตาย** โดย **อาวุธเสริม** (อ้างอิงจากการตั้งค่า **[config.weapons.lua](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/config.weapons.lua)**)
- รองรับ **[esx_status](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_status)** สำหรับ **สาเหตุการตาย** โดย **ขาดน้ำ** หรือ **ขาดอาหาร**
- รองรับ **[screenshot-basic](https://github.com/citizenfx/screenshot-basic)** สำหรับ **บันทึกภาพหน้าจอตามเหตุการณ์ที่กำหนด**

## ติดตั้งและใช้งาน

1. ดาวน์โหลดและแตกไฟล์ลงในโฟลเดอร์ `resources` ของคุณ
2. ชื่อของทรัพยากรจะต้องเป็น `azael_dc-serverlogs` ห้ามแก้ไขโดยเด็ดขาด
3. ไปยังโฟลเดอร์ `config` และดำเนินการเปิดไฟล์ **[auth.config.lua](./config/auth)** เพื่อระบุ **[Token](./config/auth#token)** ของสินค้า
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
