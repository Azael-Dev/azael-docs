---
sidebar_position: 4
---

# azael_db-health&armor

## ความต้องการ

### เซิร์ฟเวอร์

- เวอร์ชัน **[Server](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master)** ขั้นต่ำ **`4664`**
- เปิดใช้งาน **[OneSync](https://docs.fivem.net/docs/scripting-reference/onesync)**

### ทรัพยากร

- **[oxmysql](https://github.com/overextended/oxmysql)**
- **[es_extended](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx%5D/es_extended)**
- **[skinchanger](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx%5D/skinchanger)**

## ติดตั้งและใช้งาน

1. ดาวน์โหลดและแตกไฟล์ลงในโฟลเดอร์ `resources` ของคุณ
2. ชื่อของทรัพยากรจะต้องเป็น `azael_db-health&armor` ห้ามแก้ไขโดยเด็ดขาด
3. ไปยังโฟลเดอร์ `[SQL]` และดำเนินการนำเข้าไฟล์ `azael_db-health&armor.sql` ไปยังฐานข้อมูลของคุณ

```sql  title="azael_db-health&armor.sql"
ALTER TABLE `users` ADD COLUMN `health` int(11) DEFAULT NULL AFTER `status`;
ALTER TABLE `users` ADD COLUMN `armour` int(11) DEFAULT NULL AFTER `health`;
```

4. ไปยังไฟล์ `server.cfg` และทำการเพิ่ม `ensure azael_db-health&armor` ไว้บริเวณด้านล่าง **[es_extended](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx%5D/es_extended)** (บรรทัดใดก็ได้)

```diff  title="server.cfg"
ensure azael_db-health&armor
```

:::caution

- หากเซิร์ฟเวอร์ของคุณมีผู้เล่นออนไลน์อยู่เป็นจำนวนมาก โปรดหลีกเลี่ยงการรีสตาร์ททรัพยากรนี้
- การปิดเซิร์ฟเวอร์อย่างไม่ถูกต้อง อาจจะทำให้ข้อมูลสถานะ "พลังชีวิต" และ "เกราะ" ของผู้เล่น **[Rollback](https://en.wikipedia.org/wiki/Rollback_(data_management))** ได้

:::

## ยกเลิกใช้งาน

1. ไปยังไฟล์ `server.cfg` และค้นหา `ensure azael_db-health&armor`
2. ทำการเพิ่ม `#` ไว้ข้างหน้า `ensure azael_db-health&armor`

```diff  title="server.cfg"
#ensure azael_db-health&armor
```
