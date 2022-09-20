---
sidebar_position: 4
---

# database.config.lua

## Database

รหัสเริ่มต้นจะใช้งานทรัพยากร **[oxmysql](https://github.com/overextended/oxmysql)** คุณสามารถแก้ไขรหัสให้มีความเข้ากันได้กับทรัพยากรที่คุณใช้งานได้ที่ไฟล์นี้

```lua
CONFIG.Database = {} -- [[ table ]]
```

:::caution

หากคุณไม่ได้ใช้งาน **[oxmysql](https://github.com/overextended/oxmysql)** คุณสามารถ **ปิด** หรือ **แก้ไข** รหัสการใช้งานได้ที่ไฟล์ `fxmanifest.lua`<br/>

**server_scripts**

```lua
server_scripts {
    '@oxmysql/lib/MySQL.lua', -- [[ oxmysql ]]
    'config/auth.config.lua',
    'config/database.config.lua',
    'source/server/auth.server.lua',
    'source/server/main.server.lua'
}
```

**dependencies**

```lua
dependencies {
    '/server:4664',
    '/onesync',
    'oxmysql', -- [[ oxmysql ]]
    'es_extended',
    'skinchanger'
}
```
:::

## FetchPlayerStatus (function)

รับข้อมูลสถานะ **"พลังชีวิต"** และ **"เกราะ"** ในขณะที่ผู้เล่นเข้าร่วมเซิร์ฟเวอร์

```lua
function CONFIG.Database.FetchPlayerStatus(identifier)
    local result = MySQL.single.await('SELECT health, armour FROM users WHERE identifier = ?', { identifier })
    local status = { health = result.health, armour = result.armour }

    return status
end
```

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

```lua
function CONFIG.Database.UpdatePlayerStatus(identifier, status)
    MySQL.update('UPDATE users SET health = ?, armour = ? WHERE identifier = ?', { status.health, status.armour, identifier }, function(affectedRows)
        -- print(affectedRows)
    end)
end
```

### Parameter

| Field                        | Type               | Value              | Description                                                
|------------------------------|--------------------|--------------------|--------------------------------------------------
| identifier                   | string             | -                  | ตัวระบุผู้เล่น
| status                       | table              | -                  | ตารางข้อมูลสถานะ "พลังชีวิต" และ "เกราะ"
| status.health                | number             | -                  | ค่าสถานะ "พลังชีวิต"
| status.armour                | number             | -                  | ค่าสถานะ "เกราะ"
