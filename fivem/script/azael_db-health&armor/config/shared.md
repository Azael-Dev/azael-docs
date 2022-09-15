---
sidebar_position: 3
---

# shared.config.lua

## Framework

ทรัพยากรนี้มีความต้องการ **[ESX Framework](https://github.com/esx-framework)**

```lua
CONFIG.Framework = {}
```

### Resource.Name

ชื่อทรัพยากรของ **Framework** ที่ใช้งาน

```lua
CONFIG.Framework.Resource.Name = 'es_extended'
```

:::info

ค่าเริ่มต้น **[es_extended](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx%5D/es_extended)**

:::

### Events

เหตุการณ์ทั้งหมดของ **Framework** ที่ใช้งาน

```lua
if IsDuplicityVersion() then                                -- Server
    CONFIG.Framework.Events = {                             -- Events
        [1] = 'esx:playerLoaded'
    }
else                                                        -- Client
    CONFIG.Framework.Events = {                             -- Events
        [1] = 'esx:playerLoaded',
        [2] = 'esx:onPlayerLogout',
        [3] = 'skinchanger:modelLoaded',
        [4] = 'esx_status:loaded',
        [5] = 'esx_status:registerStatus',
        [6] = 'esx_status:getStatus',
        [7] = 'esx_status:set'
    }
end
```
