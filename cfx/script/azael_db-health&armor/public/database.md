# Database

รหัสเริ่มต้นรองรับ **[oxmysql](https://github.com/overextended/oxmysql)** คุณสามารถแก้ไขรหัสให้มีความเข้ากันได้กับทรัพยากรที่คุณใช้งานได้ที่ไฟล์ **`server.database.lua`**

:::caution

หากคุณไม่ได้ใช้งาน **[oxmysql](https://github.com/overextended/oxmysql)** อย่าลืม **แก้ไข** รหัสที่ไฟล์ **[fxmanifest.lua](https://docs.fivem.net/docs/scripting-reference/resource-manifest/resource-manifest/)**

<Tabs>
<TabItem value="server_scripts" label="server_scripts">

```lua
server_scripts {
    '@oxmysql/lib/MySQL.lua', -- oxmysql
    'config/auth.config.lua',
    'config/server.config.lua',
    'public/database/server.database.lua',
    'source/server/auth.server.lua',
    'source/server/main.server.lua'
}
```

</TabItem>
<TabItem value="dependencies" label="dependencies">

```lua
dependencies {
    '/server:4664',
    '/onesync',
    'oxmysql' -- oxmysql
}
```

</TabItem>
</Tabs>

:::

## InitDatabase (function)

ดำเนินการตรวจสอบและติดตั้งฐานข้อมูลเมื่อ **[oxmysql](https://github.com/overextended/oxmysql)** พร้อมใช้งาน

```lua title="บรรทัดที่ 16"
local function InitDatabase()
    if not pcall(MySQL.scalar.await, QUERY.SELECT_HEALTH_COLUMN) then
        MySQL.query(QUERY.ADD_HEALTH_COLUMN)
    end
    
    if not pcall(MySQL.scalar.await, QUERY.SELECT_ARMOUR_COLUMN) then
        MySQL.query(QUERY.ADD_ARMOUR_COLUMN)
    end
end

MySQL.ready(InitDatabase)
```

## FetchPlayerStatus (function)

รับข้อมูลสถานะ **"พลังชีวิต"** และ **"เกราะ"** ในขณะที่ผู้เล่นเข้าร่วมเซิร์ฟเวอร์

```lua title="บรรทัดที่ 31"
function DATABASE.FetchPlayerStatus(identifier)
    return MySQL.prepare.await(QUERY.SELECT_PLAYER_STATUS, { identifier })
end
```

### Parameter

| Name                         | Type               | Default            | Description                                                
|------------------------------|--------------------|--------------------|----------------------------------------------------------------------
| `identifier`                 | `string`           | Player Identifier  | ตัวระบุของผู้เล่น

### Return

| Name                         | Type               | Default                                | Description                                                
|------------------------------|--------------------|----------------------------------------|--------------------------------------------------
| `status`                     | `table`            | `{ health, armour }`                   | ตารางข้อมูลสถานะ "พลังชีวิต" และ "เกราะ"
| `status.health`              | `number` / `nil`   | `nil`                                  | ค่าสถานะ "พลังชีวิต" หรือ ไม่มีค่า สำหรับการเชื่อมต่อครั้งแรก
| `status.armour`              | `number` / `nil`   | `nil`                                  | ค่าสถานะ "เกราะ" หรือ ไม่มีค่า สำหรับการเชื่อมต่อครั้งแรก

:::note

สถานะ **"พลังชีวิต"** หรือ **"เกราะ"** หากไม่มีค่า (`nil`) รหัสจะอ้างอิงจากการกำหนดค่าเริ่มต้น **[Health.Default](../config/client#healthdefault)** สำหรับ **พลังชีวิต** หรือ **[Armour.Default](../config/client#armourdefault)** สำหรับ **เกราะ**

:::

## UpdatePlayerStatus (function)

อัพเดทข้อมูลสถานะ **"พลังชีวิต"** และ **"เกราะ"** ในขณะที่ผู้เล่นออกจากเซิร์ฟเวอร์

```lua title="บรรทัดที่ 39"
function DATABASE.UpdatePlayerStatus(identifier, status)
    MySQL.prepare(QUERY.UPDATE_PLAYER_STATUS, { status.health, status.armour, identifier }, function(affectedRows)
        -- print(affectedRows)
    end)
end
```

### Parameter

| Name                         | Type               | Default                                      | Description                                                
|------------------------------|--------------------|----------------------------------------------|--------------------------------------------------
| `identifier`                 | `string`           | Player Identifier                            | ตัวระบุของผู้เล่น
| `status`                     | `table`            | `{ health, armour }`                         | ตารางข้อมูลสถานะ "พลังชีวิต" และ "เกราะ"
| `status.health`              | `number`           | Health Value                                 | ค่าสถานะ "พลังชีวิต"
| `status.armour`              | `number`           | Armour Value                                 | ค่าสถานะ "เกราะ"

## UpdateAllPlayerStatus (function)

อัพเดทข้อมูลสถานะ "พลังชีวิต" และ "เกราะ" ตามเวลาที่กำหนดใน **[Save.Time](../config/server#savetime)** เพื่อป้องกันข้อมูล **[Rollback](https://en.wikipedia.org/wiki/Rollback_(data_management))**

```lua title="บรรทัดที่ 48"
function DATABASE.UpdateAllPlayerStatus(data)
    MySQL.prepare(QUERY.UPDATE_PLAYER_STATUS, data, function(results)
        -- print(results)
    end)
end
```

### Parameter

| Name                         | Type               | Default                                      | Description                                                
|------------------------------|--------------------|----------------------------------------------|-----------------------------------------------------------
| `data`                       | `table`            | `{ { [1], [2], [3] } }`                      | ตารางข้อมูลสถานะ "พลังชีวิต" และ "เกราะ" ของผู้เล่นทั้งหมดที่ออนไลน์
| `data[key][1]`               | `number`           | Health Value                                 | ค่าสถานะ "พลังชีวิต"
| `data[key][2]`               | `number`           | Armour Value                                 | ค่าสถานะ "เกราะ"
| `data[key][3]`               | `string`           | Player Identifier                            | ตัวระบุของผู้เล่น

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
