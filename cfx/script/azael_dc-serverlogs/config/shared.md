---
sidebar_label: Shared
---

# shared.config

ไฟล์การกำหนดค่าของทรัพยากรทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)** และ **[Client](https://en.wikipedia.org/wiki/Client-side)**

## Resource

ทรัพยากร

```lua title="บรรทัดที่ 13"
CONFIG.Resource = {} -- [[ table ]]
```

### Name

ชื่อทรัพยากร

```lua title="บรรทัดที่ 14"
CONFIG.Resource.Name = GetCurrentResourceName() -- [[ string ]]
```

:::info

ใช้สำหรับการลงทะเบียน Events ภายในทรัพยากรนี้

:::

## Frameworks

การกำหนดค่า **[Framework](https://en.wikipedia.org/wiki/Framework)** เพื่อเรียกใช้งานรหัสภายใน **[public/framework](../public/framework.md)/dir** เมื่อทรัพยากรเริ่มต้น

```lua title="บรรทัดที่ 17"
CONFIG.Frameworks = { -- [[ table ]]
    --[[ ESX Framework ]]
    {
        Resource = 'es_extended', -- [[ string ]]
        Directory = 'esx', -- [[ string ]]
        Dependencies = { -- [[ table ]]
            'esx_status' -- [[ string ]]
        }
    },

    --[[ QBCore Framework ]]
    {
        Resource = 'qb-core', -- [[ string ]]
        Directory = 'qb' -- [[ string ]]
    }
}
```

:::info

- สามารถเพิ่ม **[Framework](https://en.wikipedia.org/wiki/Framework)** ได้ (คุณสามารถดูรายละเอียดได้ที่ **[public/framework](../public/framework.md)**)
- `Resource` คือ ชื่อทรัพยากร ของ **[Framework](https://en.wikipedia.org/wiki/Framework)**
- `Directory` คือ ชื่อไดเรกทอรี ของ **[Framework](https://en.wikipedia.org/wiki/Framework)** ภายใน **[public/framework](../public/framework.md)/dir**
- `Dependencies` คือ การพึ่งพาทรัพยากร (**ความต้องการ**)

:::

:::tip

ระบบจะทำการตรวจสอบ **[Framework](https://en.wikipedia.org/wiki/Framework)** ที่คุณใช้งานโดยอัตโนมัติ

:::

## Debug

แสดง **Debug** เพื่อตรวจสอบสถานะการทำงานต่างๆ

```lua title="บรรทัดที่ 32"
CONFIG.Debug = {} -- [[ table ]]
```

### Enable

เปิดใช้งาน แสดง **Debug** ไปยัง **[Server Console](https://docs.fivem.net/docs/server-manual/server-commands)** หรือ **[Client Console](https://docs.fivem.net/docs/client-manual/console-commands)** <kbd>F8</kbd>

```lua title="บรรทัดที่ 33"
CONFIG.Debug.Enable = false -- [[ boolean ]]
```

:::caution

ไม่แนะนำให้เปิดใช้งาน หากเซิร์ฟเวอร์ของคุณมีผู้เล่นออนไลน์อยู่เป็นจำนวนมาก

:::

## Bridge

แปลง **ฟังก์ชันส่งออก** จากทรัพยากรอื่นๆมาเป็น [**azael_dc-serverlogs**](../index.md)

```lua title="บรรทัดที่ 36"
CONFIG.Bridge = {} -- [[ table ]]
```

### Exports

แปลง **ฟังก์ชันส่งออก** จากทรัพยากรที่กำหนด (**สามารถเพิ่มข้อมูลได้**)

```lua title="บรรทัดที่ 37"
CONFIG.Bridge.Exports = { -- [[ table ]]
    { -- [[ table ]]
        Enable = true, -- [[ boolean ]]
        Resource = 'resource_name', --[[ string ]]
        Server = { -- [[ table ]]
            Name = 'export_name', --[[ string ]]
            Callback = function(...) --[[ function ]]
                ---See: https://docs.azael.dev/cfx/script/azael_dc-serverlogs/export/server#insertdata
                insertData(...) --[[ function ]]
            end
        },
        Client = { -- [[ table ]]
            Name = 'export_name', --[[ string ]]
            Callback = function(...) --[[ function ]]
                ---See: https://docs.azael.dev/cfx/script/azael_dc-serverlogs/export/client#insertdata
                insertData(...) --[[ function ]]
            end
        }
    }
}
```

:::info

- **Enable** เปิดใช้งานการแปลงฟังก์ชันส่งออกมาเป็น [azael_dc-serverlogs](../index.md) (`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน)
- **Resource** ชื่อทรัพยากร
- **Server** ฟังก์ชันส่งออกฝั่ง Server
    - **Name** ชื่อฟังก์ชันส่งออกฝั่ง Server
    - **Callback** ฟังก์ชัน Callback ฝั่ง Server
- **Client** ฟังก์ชันส่งออกฝั่ง Client
    - **Name** ชื่อฟังก์ชันส่งออกฝั่ง Client
    - **Callback** ฟังก์ชัน Callback ฝั่ง Client

<details>
    <summary>การกำหนดค่าเริ่มต้น **NC Discord Logs**</summary>

```lua title="nc_discordlogs"
{
    Enable = true,
    Resource = 'nc_discordlogs',

    Server = {
        Name = 'Discord',
        Callback = function(data)
            local playerId = type(data.xPlayer) == 'table' and data.xPlayer.source or tonumber(data.xPlayer)
            local targetId = type(data.xTarget) == 'table' and data.xTarget.source or tonumber(data.xTarget)

            if playerId then
                insertData({
                    event = data.webhook,
                    content = ('### %s\n%s'):format(data.message or data.title, ( data.description or '')),
                    fields = data.fields,
                    image = data.imageURL,
                    source = playerId,
                    options = {
                        public = data.public,
                        codeblock = false
                    }
                })
            end
            
            if targetId then
                insertData({
                    event = data.webhook,
                    content = ('### %s\n%s'):format(data.message or data.title, ( data.description or '')),
                    fields = data.fields,
                    image = data.imageURL,
                    source = targetId,
                    options = {
                        public = data.public,
                        codeblock = false
                    }
                })
            end
        end
    },
    
    Client = {
        Name = 'Discord',
        Callback = function(data)
            insertData({
                event = data.webhook,
                content = ('### %s\n%s'):format(data.message or data.title, ( data.description or '')),
                fields = data.fields,
                image = data.imageURL,
                source = (data.xPlayer and GetPlayerServerId(NetworkGetPlayerIndexFromPed(data.xPlayer)) or nil),
                options = {
                    public = data.public,
                    codeblock = false
                }
            })
            
            if data.xTarget then
                insertData({
                    event = data.webhook,
                    content = ('### %s\n%s'):format(data.message or data.title, ( data.description or '')),
                    fields = data.fields,
                    image = data.imageURL,
                    source = GetPlayerServerId(NetworkGetPlayerIndexFromPed(data.xTarget)),
                    options = {
                        public = data.public,
                        codeblock = false
                    }
                })
            end
        end
    }
}
```

</details>

:::
