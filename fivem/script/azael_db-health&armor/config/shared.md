---
sidebar_position: 3
---

# shared.config.lua

## Resource

ทรัพยากร

```lua
CONFIG.Resource = {} -- [[ table ]]
```

### Name

ชื่อทรัพยากร

```lua
CONFIG.Resource.Name = GetCurrentResourceName() -- [[ string ]]
```

:::info

ใช้สำหรับการลงทะเบียน Events ภายในทรัพยากรนี้

:::

## Framework

ทรัพยากรนี้มีความต้องการ **[ESX Framework](https://github.com/esx-framework)**

```lua
CONFIG.Framework = {} -- [[ table ]]
```

### Resource.Name

ชื่อทรัพยากรของ **Framework** ที่ใช้งาน

```lua
CONFIG.Framework.Resource.Name = 'es_extended' -- [[ string ]]
```

:::info

ค่าเริ่มต้น **[es_extended](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx%5D/es_extended)**

:::

### Events

เหตุการณ์ทั้งหมดของ **Framework** ที่ใช้งาน

```lua
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
