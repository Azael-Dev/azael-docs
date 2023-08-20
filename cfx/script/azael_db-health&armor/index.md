# azael_db-health&armor

บันทึก พลังชีวิต และ เกราะ ของผู้เล่นเข้าสู่ระบบฐานข้อมูลของเซิร์ฟเวอร์

## ความต้องการ

### เซิร์ฟเวอร์

- เวอร์ชัน **[Server](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master)** ขั้นต่ำ **`4664`**
- เปิดใช้งาน **[OneSync](https://docs.fivem.net/docs/scripting-reference/onesync)**

### ทรัพยากร

- **[oxmysql](https://github.com/overextended/oxmysql)**
- **[es_extended](https://github.com/esx-framework/esx_core/tree/main/%5Bcore%5D/es_extended)** สำหรับเซิร์ฟเวอร์ที่ใช้ **[ESX Framework](https://github.com/esx-framework)**
- **[skinchanger](https://github.com/esx-framework/esx_core/tree/main/%5Bcore%5D/skinchanger)** สำหรับเซิร์ฟเวอร์ที่ใช้ **[ESX Framework](https://github.com/esx-framework)**
- **[qb-core](https://github.com/qbcore-framework/qb-core)** สำหรับเซิร์ฟเวอร์ที่ใช้ **[QBCore Framework](https://github.com/qbcore-framework)**
- **[qb-clothing](https://github.com/qbcore-framework/qb-clothing)** สำหรับเซิร์ฟเวอร์ที่ใช้ **[QBCore Framework](https://github.com/qbcore-framework)**

:::tip

- หากคุณไม่ได้ใช้งาน **[oxmysql](https://github.com/overextended/oxmysql)** คุณสามารถดูรายละเอียดได้ที่ **[public/database](./public/database)**
- หากคุณไม่ได้ใช้งาน **[ESX Framework](https://github.com/esx-framework)** หรือ **[QBCore Framework](https://github.com/qbcore-framework)** คุณสามารถดูรายละเอียดได้ที่ **[public/framework](./public/framework)**

<details>
    <summary>หากใช้งาน illenium-appearance แทน skinchanger หรือ qb-clothing ให้ดำเนินการแก้ไขตามขั้นตอนนี้</summary>
<Tabs>
<TabItem value="esx" label="ESX">

1. ไปที่ `azael_db-health&armor/config/shared.config.lua`
2. ค้นหาการกำหนดค่า **[CONFIG.Frameworks](./config/shared#frameworks)**
3. แก้ไข `skinchanger` เป็น `illenium-appearance`
4. ไปที่ `illenium-appearance/game/util.lua`
5. ค้นหา `local function setPlayerAppearance`
6. วางรหัสด้านล่างนี้ต่อจาก `setPedAppearance`

```lua
TriggerEvent('skinchanger:modelLoaded')
```

</TabItem>
<TabItem value="qb" label="QBCore">

1. ไปที่ `azael_db-health&armor/config/shared.config.lua`
2. ค้นหาการกำหนดค่า **[CONFIG.Frameworks](./config/shared#frameworks)**
3. แก้ไข `qb-clothing` เป็น `illenium-appearance`
4. ไปที่ `illenium-appearance/game/util.lua`
5. ค้นหา `local function setPlayerAppearance`
6. วางรหัสด้านล่างนี้ต่อจาก `setPedAppearance`

```lua
TriggerEvent('qb-clothing:client:loadPlayerClothing')
```

</TabItem>
</Tabs>

</details>

<details>
    <summary>หากใช้งาน ox_appearance แทน skinchanger หรือ qb-clothing ให้ดำเนินการแก้ไขตามขั้นตอนนี้</summary>
<Tabs>
<TabItem value="esx" label="ESX">

1. ไปที่ `azael_db-health&armor/config/shared.config.lua`
2. ค้นหาการกำหนดค่า **[CONFIG.Frameworks](./config/shared#frameworks)**
3. แก้ไข `skinchanger` เป็น `ox_appearance`
4. ไปที่ `ox_appearance/client/esx.lua`
5. ค้นหา `exp:setPlayerModel` วางรหัสด้านล่างนี้ต่อ

```lua
TriggerEvent('skinchanger:modelLoaded')
```

6. ค้นหา `exp:setPlayerAppearance` วางรหัสด้านล่างนี้ต่อ

```lua
TriggerEvent('skinchanger:modelLoaded')
```

7. ไปที่ `ox_appearance/client/outfits.lua`
8. ค้นหา `exports['fivem-appearance']:setPlayerAppearance` วางรหัสด้านล่างนี้ต่อ

```lua
TriggerEvent('skinchanger:modelLoaded')
```

</TabItem>
<TabItem value="qb" label="QBCore">

1. ไปที่ `azael_db-health&armor/config/shared.config.lua`
2. ค้นหาการกำหนดค่า **[CONFIG.Frameworks](./config/shared#frameworks)**
3. แก้ไข `qb-clothing` เป็น `ox_appearance`
4. ไปที่ `ox_appearance/client/esx.lua`
5. ค้นหา `exp:setPlayerModel` วางรหัสด้านล่างนี้ต่อ

```lua
TriggerEvent('qb-clothing:client:loadPlayerClothing')
```

6. ค้นหา `exp:setPlayerAppearance` วางรหัสด้านล่างนี้ต่อ

```lua
TriggerEvent('qb-clothing:client:loadPlayerClothing')
```

7. ไปที่ `ox_appearance/client/outfits.lua`
8. ค้นหา `exports['fivem-appearance']:setPlayerAppearance` วางรหัสด้านล่างนี้ต่อ

```lua
TriggerEvent('qb-clothing:client:loadPlayerClothing')
```

</TabItem>
</Tabs>

</details>

:::

## ติดตั้งและใช้งาน

1. ดาวน์โหลดและแตกไฟล์ลงในโฟลเดอร์ `resources` ของคุณ
2. ชื่อของทรัพยากรจะต้องเป็น `azael_db-health&armor` ห้ามแก้ไขโดยเด็ดขาด
3. ไปยังโฟลเดอร์ `config` และดำเนินการเปิดไฟล์ **[auth.config.lua](./config/auth.md)** เพื่อระบุ **[Token](./config/auth#token)** ของสินค้า
4. ไปยังไฟล์ `server.cfg` และทำการเพิ่ม `ensure azael_db-health&armor`

```diff title="server.cfg"
ensure azael_db-health&armor
```

:::tip

- ระบบจะดำเนินการตรวจสอบและติดตั้งฐานข้อมูล (**SQL**) ของทรัพยากรโดยอัตโนมัติ (คุณสามารถดูรายละเอียดได้ที่ **[public/database](./public/database#initdatabase-function)**)

:::

:::caution

- หากเซิร์ฟเวอร์ของคุณมีผู้เล่นออนไลน์อยู่เป็นจำนวนมาก โปรดหลีกเลี่ยงการรีสตาร์ททรัพยากรนี้
- การปิดเซิร์ฟเวอร์อย่างไม่ถูกต้อง อาจจะทำให้ข้อมูลสถานะ "พลังชีวิต" และ "เกราะ" ของผู้เล่น **[Rollback](https://en.wikipedia.org/wiki/Rollback_(data_management))** ได้

:::

## ยกเลิกใช้งาน

1. ไปยังไฟล์ `server.cfg` และค้นหา `ensure azael_db-health&armor`
2. ทำการเพิ่ม `#` ไว้ข้างหน้า `ensure azael_db-health&armor`

```diff title="server.cfg"
#ensure azael_db-health&armor
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
