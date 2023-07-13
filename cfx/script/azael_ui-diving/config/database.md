# database.config.lua

ไฟล์การกำหนดค่าของทรัพยากรทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)**

## Database

รหัสเริ่มต้นจะใช้งานทรัพยากร **[oxmysql](https://github.com/overextended/oxmysql)** คุณสามารถแก้ไขรหัสให้มีความเข้ากันได้กับทรัพยากรที่คุณใช้งานได้ที่ไฟล์นี้

```lua title="บรรทัดที่ 11"
CONFIG.Database = {} -- [[ table ]]
```

:::caution

หากคุณไม่ได้ใช้งาน **[oxmysql](https://github.com/overextended/oxmysql)** คุณสามารถ **ปิด** หรือ **แก้ไข** รหัสการใช้งานได้ที่ไฟล์ **[fxmanifest.lua](https://docs.fivem.net/docs/scripting-reference/resource-manifest/resource-manifest/)**<br/>

<Tabs>
<TabItem value="server_scripts" label="server_scripts">

```lua
server_scripts {
    '@oxmysql/lib/MySQL.lua', -- หากใช้งาน mysql-async ให้แก้ไข oxmysql เป็น mysql-async
    'config/auth.config.lua',
    'config/server.config.lua',
    'config/database.config.lua',
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
    'oxmysql', -- หากใช้งาน mysql-async ให้แก้ไข oxmysql เป็น mysql-async
    'es_extended',
    'skinchanger',
    'esx_skin'
}
```

</TabItem>
</Tabs>

:::

## FetchPlayerOxygenTank (function)

รับข้อมูลสถานะ **"ถังออกซิเจน"** เมื่อ **[Client](https://en.wikipedia.org/wiki/Client-side)** เริ่มต้น 

<Tabs>
<TabItem value="oxmysql" label="oxmysql">

```lua title="บรรทัดที่ 16"
function CONFIG.Database.FetchPlayerOxygenTank(identifier)
    return MySQL.prepare.await('SELECT oxygen_tank FROM users WHERE identifier = ? LIMIT 1', { identifier })
end
```

</TabItem>
<TabItem value="mysql-async" label="mysql-async">

```lua title="บรรทัดที่ 16"
function CONFIG.Database.FetchPlayerOxygenTank(identifier)
    local result = MySQL.Sync.fetchAll('SELECT oxygen_tank FROM users WHERE identifier = @identifier LIMIT 1', { ['@identifier'] = identifier })

    return result[1].oxygen_tank
end
```

</TabItem>
</Tabs>

### Parameter

| Name                         | Type               | Default            | Description                                                
|------------------------------|--------------------|--------------------|----------------------------------------------------------------------
| `identifier`                 | `string`           | Player Identifier  | ตัวระบุผู้เล่น (อ้างอิงจากตาราง `users` คอลัมน์ `identifier` บนฐานข้อมูล)

### Return

| Name                         | Type               | Default                                | Description                                                
|------------------------------|--------------------|----------------------------------------|--------------------------------------------------
| `oxygen_tank`                | `number` หรือ `nil` | `nil`                                  | ค่าสถานะ "ถังออกซิเจน" หรือ ไม่มีค่า สำหรับการเชื่อมต่อครั้งแรก


## UpdatePlayerOxygenTank (function)

อัพเดทข้อมูลสถานะ **"ถังออกซิเจน"** ในขณะที่ผู้เล่นออกจากเซิร์ฟเวอร์ หรือ เลิกใช้งานชุดดำน้ำ

<Tabs>
<TabItem value="oxmysql" label="oxmysql">

```lua title="บรรทัดที่ 24"
function CONFIG.Database.UpdatePlayerOxygenTank(identifier, oxygen)
    MySQL.prepare('UPDATE users SET oxygen_tank = ? WHERE identifier = ?', { oxygen, identifier }, function(affectedRows)
        -- print(affectedRows)
    end)
end
```

</TabItem>
<TabItem value="mysql-async" label="mysql-async">

```lua title="บรรทัดที่ 24"
function CONFIG.Database.UpdatePlayerOxygenTank(identifier, oxygen)
    MySQL.Async.execute('UPDATE users SET oxygen_tank = @oxygen_tank WHERE identifier = @identifier', { ['@oxygen_tank'] = oxygen, ['@identifier'] = identifier }, function(affectedRows)
        -- print(affectedRows)
    end)
end
```

</TabItem>
</Tabs>

### Parameter

| Name                         | Type               | Default                                      | Description                                                
|------------------------------|--------------------|----------------------------------------------|--------------------------------------------------
| `identifier`                 | `string`           | Player Identifier                            | ตัวระบุผู้เล่น (อ้างอิงจากตาราง `users` คอลัมน์ `identifier` บนฐานข้อมูล)
| `oxygen`                     | `number`           | Oxygen Value                                 | ค่าสถานะ "ถังออกซิเจน"

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
