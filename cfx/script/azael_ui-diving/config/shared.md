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
        [1] = 'esx:playerDropped',
        [2] = 'esx:onRemoveInventoryItem'
    }
else                                                        -- Client
    CONFIG.Framework.Events = {                             -- Framework Events
        [1] = 'esx:playerLoaded',
        [2] = 'esx:onPlayerLogout',
        [3] = 'esx:setJob',
        [4] = 'skinchanger:getSkin',
        [5] = 'skinchanger:loadSkin',
        [6] = 'skinchanger:loadClothes',
        [7] = 'esx_skin:getPlayerSkin'
    }
end
```
