# database.config.lua

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
    '@oxmysql/lib/MySQL.lua', -- [[ oxmysql ]]
    'config/auth.config.lua',
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
    'oxmysql', -- [[ oxmysql ]]
    'es_extended',
    'skinchanger'
}
```

</TabItem>
</Tabs>

:::

## FetchPlayerStatus (function)

รับข้อมูลสถานะ **"พลังชีวิต"** และ **"เกราะ"** ในขณะที่ผู้เล่นเข้าร่วมเซิร์ฟเวอร์

<Tabs>
<TabItem value="oxmysql" label="oxmysql">

```lua title="บรรทัดที่ 18"
function CONFIG.Database.FetchPlayerStatus(identifier)
    local result = MySQL.single.await('SELECT health, armour FROM users WHERE identifier = ?', { identifier })
    local status = { health = result.health, armour = result.armour }

    return status
end
```

</TabItem>
<TabItem value="mysql-async" label="mysql-async">

```lua title="บรรทัดที่ 18"
function CONFIG.Database.FetchPlayerStatus(identifier)
    local result = MySQL.Sync.fetchAll('SELECT health, armour FROM users WHERE identifier = @identifier LIMIT 1', { ['@identifier'] = identifier })
    local status = { health = result[1].health, armour = result[1].armour }

    return status
end
```

</TabItem>
</Tabs>

### Parameter

| Field                        | Type               | Value              | Description                                                
|------------------------------|--------------------|--------------------|--------------------------------------------------
| identifier                   | string             | -                  | ตัวระบุผู้เล่น

### Return

| Field                        | Type               | Value              | Description                                                
|------------------------------|--------------------|--------------------|--------------------------------------------------
| status                       | table              | -                  | ตารางข้อมูลสถานะ "พลังชีวิต" และ "เกราะ"
| status.health                | number             | number หรือ nil     | ค่าสถานะ "พลังชีวิต" หรือ ไม่มีค่า
| status.armour                | number             | number หรือ nil     | ค่าสถานะ "เกราะ" หรือ ไม่มีค่า

:::info

สถานะ **"พลังชีวิต"** หรือ **"เกราะ"** หากไม่มีค่า (`nil`) รหัสจะอ้างอิงจากการกำหนดค่าเริ่มต้น **[Health.Default](./client#healthdefault)** สำหรับ **พลังชีวิต** หรือ **[Armour.Default](./client#armourdefault)** สำหรับ **เกราะ**

:::

## UpdatePlayerStatus (function)

อัพเดทข้อมูลสถานะ **"พลังชีวิต"** และ **"เกราะ"** ในขณะที่ผู้เล่นออกจากเซิร์ฟเวอร์

<Tabs>
<TabItem value="oxmysql" label="oxmysql">

```lua title="บรรทัดที่ 31"
function CONFIG.Database.UpdatePlayerStatus(identifier, status)
    MySQL.update('UPDATE users SET health = ?, armour = ? WHERE identifier = ?', { status.health, status.armour, identifier }, function(affectedRows)
        -- print(affectedRows)
    end)
end
```

</TabItem>
<TabItem value="mysql-async" label="mysql-async">

```lua title="บรรทัดที่ 31"
function CONFIG.Database.UpdatePlayerStatus(identifier, status)
    MySQL.Async.execute('UPDATE users SET health = @health, armour = @armour WHERE identifier = @identifier', { ['@health'] = status.health, ['@armour'] = status.armour, ['@identifier'] = identifier }, function(affectedRows)
        -- print(affectedRows)
    end)
end
```

</TabItem>
</Tabs>

### Parameter

| Field                        | Type               | Value              | Description                                                
|------------------------------|--------------------|--------------------|--------------------------------------------------
| identifier                   | string             | -                  | ตัวระบุผู้เล่น
| status                       | table              | -                  | ตารางข้อมูลสถานะ "พลังชีวิต" และ "เกราะ"
| status.health                | number             | -                  | ค่าสถานะ "พลังชีวิต"
| status.armour                | number             | -                  | ค่าสถานะ "เกราะ"

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
