# azael_ui-diving

ชุดดำน้ำตื้น (**[Snorkelling](https://en.wikipedia.org/wiki/Snorkeling)**) และ ชุดดำน้ำลึก (**[Scuba](https://en.wikipedia.org/wiki/Scuba_diving)**) ที่มาพร้อมกับ **[UI](https://en.wikipedia.org/wiki/User_interface)** ที่จะแสดงสถานะในขณะที่ดำน้ำ

## ความต้องการ

### เซิร์ฟเวอร์

- เวอร์ชัน **[Server](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master)** ขั้นต่ำ **`4664`**
- เปิดใช้งาน **[OneSync](https://docs.fivem.net/docs/scripting-reference/onesync)**

### ทรัพยากร

- **[es_extended](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx%5D/es_extended)**
- **[skinchanger](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx%5D/skinchanger)**
- **[esx_skin](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx%5D/esx_skin)**
- **[oxmysql](https://github.com/overextended/oxmysql)** (แก้ไขได้ที่ไฟล์ **[database.config.lua](./config/database)**)

## ติดตั้งและใช้งาน

1. ดาวน์โหลดและแตกไฟล์ลงในโฟลเดอร์ `resources` ของคุณ
2. ชื่อของทรัพยากรจะต้องเป็น `azael_ui-diving` ห้ามแก้ไขโดยเด็ดขาด
3. ไปยังโฟลเดอร์ `config` และดำเนินการเปิดไฟล์ **[auth.config.lua](./config/auth.md)** เพื่อระบุ **[Token](./config/auth#token)** ของสินค้า
4. ไปยังโฟลเดอร์ `[SQL]` และดำเนินการนำเข้าไฟล์ `azael_ui-diving.sql` ไปยังฐานข้อมูลของคุณ

<Tabs>
<TabItem value="limit" label="Limit">

```sql  title="azael_ui-diving.sql"
ALTER TABLE `users` ADD COLUMN `oxygen_tank` int(11) DEFAULT NULL AFTER `status`;

INSERT INTO `items` (`name`, `label`, `limit`, `rare`, `can_remove`) VALUES 
    ('scuba_gear', 'Scuba Gear', 1, 0, 1),
    ('scuba_oxygen_tank', 'Scuba - Oxygen Tank', 10, 0, 1),
    ('snorkelling_gear', 'Snorkelling Gear', 1, 0, 1)
;
```

</TabItem>
<TabItem value="weight" label="Weight">

```sql  title="azael_ui-diving.sql"
ALTER TABLE `users` ADD COLUMN `oxygen_tank` int(11) DEFAULT NULL AFTER `status`;

INSERT INTO `items` (`name`, `label`, `weight`, `rare`, `can_remove`) VALUES 
    ('scuba_gear', 'Scuba Gear', 15, 0, 1),
    ('scuba_oxygen_tank', 'Scuba - Oxygen Tank', 5, 0, 1),
    ('snorkelling_gear', 'Snorkelling Gear', 7, 0, 1)
;
```

</TabItem>
</Tabs>

5. ไปยังไฟล์ `server.cfg` และทำการเพิ่ม `ensure azael_ui-diving` ไว้บริเวณด้านล่าง **[es_extended](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx%5D/es_extended)** (บรรทัดใดก็ได้)

```diff title="server.cfg"
ensure azael_ui-diving
```

:::caution

- หากเซิร์ฟเวอร์ของคุณมีผู้เล่นออนไลน์อยู่เป็นจำนวนมาก โปรดหลีกเลี่ยงการรีสตาร์ททรัพยากรนี้
- การปิดเซิร์ฟเวอร์อย่างไม่ถูกต้อง หรือ รีสตาร์ททรัพยากรนี้ อาจจะทำให้ข้อมูลสถานะ "ถังออกซิเจน" ของผู้เล่น **[Rollback](https://en.wikipedia.org/wiki/Rollback_(data_management))** ได้

:::

## ยกเลิกใช้งาน

1. ไปยังไฟล์ `server.cfg` และค้นหา `ensure azael_ui-diving`
2. ทำการเพิ่ม `#` ไว้ข้างหน้า `ensure azael_ui-diving`

```diff title="server.cfg"
#ensure azael_ui-diving
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
