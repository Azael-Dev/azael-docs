---
sidebar_label: Server
---

# server.config

ไฟล์การกำหนดค่าของทรัพยากรทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)**

## General

ทั่วไป

```lua title="บรรทัดที่ 11"
CONFIG.General = {} -- [[ table ]]
```

### Item.Snorkel.Name

ชื่อไอเทม **ชุดดำน้ำตื้น** บนฐานข้อมูล

```lua title="บรรทัดที่ 14"
CONFIG.General.Item.Snorkel.Name = 'snorkelling_gear' -- [[ string ]]
```

### Item.Snorkel.Jobs

อาชีพที่อนุญาตให้ใช้งาน **ชุดดำน้ำตื้น**

```lua title="บรรทัดที่ 16"
CONFIG.General.Item.Snorkel.Jobs = { -- [[ table ]]
    ['unemployed'] = true, -- ประชาชน
    ['ambulance'] = true, -- หมอ
    ['police'] = true, -- ตำรวจ
    ['mechanic'] = true -- ช่าง
}
```

:::info

```lua
[key] = boolean
```

- `key` หมายถึง ชื่ออาชีพ ที่ต้องการกำหนด โดยอ้างอิงจากฐานข้อมูลตาราง `jobs` คอลัมน์ `name`<br/>
- `boolean` หมายถึง ข้อมูลที่มีค่าเพียง 2 ค่า คือ `true` เท่ากับ เปิดใช้งาน หรือ `false` เท่ากับ ปิดใช้งาน

:::

### Item.Scuba.Name

ชื่อไอเทม **ชุดดำน้ำลึก** บนฐานข้อมูล

```lua title="บรรทัดที่ 25"
CONFIG.General.Item.Scuba.Name = 'scuba_gear' -- [[ string ]]
```

### Item.Scuba.Jobs

อาชีพที่อนุญาตให้ใช้งาน **ชุดดำน้ำลึก**

```lua title="บรรทัดที่ 27"
CONFIG.General.Item.Scuba.Jobs = { -- [[ table ]]
    ['unemployed'] = true, -- ประชาชน
    ['ambulance'] = true, -- หมอ
    ['police'] = true, -- ตำรวจ
    ['mechanic'] = true -- ช่าง
}
```

:::info

```lua
[key] = boolean
```

- `key` หมายถึง ชื่ออาชีพ ที่ต้องการกำหนด โดยอ้างอิงจากฐานข้อมูลตาราง `jobs` คอลัมน์ `name`<br/>
- `boolean` หมายถึง ข้อมูลที่มีค่าเพียง 2 ค่า คือ `true` เท่ากับ เปิดใช้งาน หรือ `false` เท่ากับ ปิดใช้งาน

:::

### Item.OxygenTank.Name

ชื่อไอเทม **ถังออกซิเจน** (**ชุดดำน้ำลึก**) บนฐานข้อมูล

```lua title="บรรทัดที่ 36"
CONFIG.General.Item.OxygenTank.Name = 'scuba_oxygen_tank' -- [[ string ]]
```

### Item.OxygenTank.Jobs

อาชีพที่อนุญาตให้ใช้งาน **ถังออกซิเจน**

```lua title="บรรทัดที่ 38"
CONFIG.General.Item.OxygenTank.Jobs = { -- [[ table ]]
    ['unemployed'] = true, -- ประชาชน
    ['ambulance'] = true, -- หมอ
    ['police'] = true, -- ตำรวจ
    ['mechanic'] = true -- ช่าง
}
```

:::info

```lua
[key] = boolean
```

- `key` หมายถึง ชื่ออาชีพ ที่ต้องการกำหนด โดยอ้างอิงจากฐานข้อมูลตาราง `jobs` คอลัมน์ `name`<br/>
- `boolean` หมายถึง ข้อมูลที่มีค่าเพียง 2 ค่า คือ `true` เท่ากับ เปิดใช้งาน หรือ `false` เท่ากับ ปิดใช้งาน

:::

## Notification

แจ้งเตือนสถานะต่างๆ

```lua title="บรรทัดที่ 48"
CONFIG.Notification = {} -- [[ table ]]
```

### NotAllowedToUse (function)

แจ้งเตือนข้อผิดพลาด **ไม่อนุญาตให้ใช้**

```lua title="บรรทัดที่ 51"
CONFIG.Notification.NotAllowedToUse = function(netId)
    TriggerClientEvent('esx:showNotification', netId, 'คุณไม่ได้รับอนุญาตให้ใช้งาน')
end
```

#### Parameter

| Name                    | Type               | Default            | Description                                                
|-------------------------|--------------------|--------------------|---------------------------------------------------------------------------------------------------------------------------------
| `netId`                 | `number`           | Player ID          | ID อ้างอิงผู้เล่น หรือที่รู้จักกันในอีกชื่อคือ **[Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id)** (`source`)
