# shared.config.lua

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

## Framework

ทรัพยากรนี้มีความต้องการ **[ESX Framework](https://github.com/esx-framework)**

```lua title="บรรทัดที่ 17"
CONFIG.Framework = {} -- [[ table ]]
```

### Resource.Name

ชื่อทรัพยากรของ **Framework** ที่ใช้งาน

```lua title="บรรทัดที่ 19"
CONFIG.Framework.Resource.Name = 'es_extended' -- [[ string ]]
```

:::info

ค่าเริ่มต้น **[es_extended](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx%5D/es_extended)**

:::

### Events

เหตุการณ์ทั้งหมดของ **Framework** ที่ใช้งาน

```lua title="บรรทัดที่ 23"
if IsDuplicityVersion() then                                -- Server
    CONFIG.Framework.Events = {                             -- Framework Events
        [1] = 'esx:playerLoaded',
        [2] = 'esx:playerDropped'
    }
else                                                        -- Client
    CONFIG.Framework.Events = {                             -- Framework Events
        [1] = 'esx:playerLoaded',
        [2] = 'esx:onPlayerLogout',
        [3] = 'skinchanger:modelLoaded'
    }
end
```

## Debug

แสดง **Debug** เพื่อตรวจสอบสถานะการทำงานต่างๆ

```lua title="บรรทัดที่ 36"
CONFIG.Debug = {} -- [[ table ]]
```

### Enable

เปิดใช้งาน แสดง **Debug** ไปยัง **[Server Console](https://docs.fivem.net/docs/server-manual/server-commands)** หรือ **[Client Console](https://docs.fivem.net/docs/client-manual/console-commands)** <kbd>F8</kbd>

```lua title="บรรทัดที่ 37"
CONFIG.Debug.Enable = false -- [[ boolean ]]
```

:::caution

ไม่แนะนำให้เปิดใช้งาน หากเซิร์ฟเวอร์ของคุณมีผู้เล่นออนไลน์อยู่เป็นจำนวนมาก

:::
