# client.config.lua

ไฟล์การกำหนดค่าของทรัพยากรทางฝั่ง **[Client](https://en.wikipedia.org/wiki/Client-side)**

## General

ทั่วไป

```lua title="บรรทัดที่ 11"
CONFIG.General = {} -- [[ table ]]
```

### Snorkel.InWater.Enable

เปิดใช้งาน สามารถใช้งาน **ชุดดำน้ำตื้น** ขณะอยู่ในน้ำ

```lua title="บรรทัดที่ 14"
CONFIG.General.Snorkel.InWater.Enable = false -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Snorkel.Object.Enable

เปิดใช้งาน **Object** (**Prop**) สำหรับ **ชุดดำน้ำตื้น**

```lua title="บรรทัดที่ 18"
CONFIG.General.Snorkel.Object.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Snorkel.Skin.Enable

เปิดใช้งาน **สกิน** สำหรับ **ชุดดำน้ำตื้น**

```lua title="บรรทัดที่ 22"
CONFIG.General.Snorkel.Skin.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Snorkel.RandomColor.Enable

เปิดใช้งาน **สุ่มสี** สำหรับ **ชุดดำน้ำตื้น**

```lua title="บรรทัดที่ 26"
CONFIG.General.Snorkel.RandomColor.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Snorkel.Depth.Max

ความลึกสูงสุดที่สามารถดำน้ำได้ สำหรับ **ชุดดำน้ำตื้น**

```lua title="บรรทัดที่ 30"
CONFIG.General.Snorkel.Depth.Max = 20 -- [[ number ]]
```

### Snorkel.Limit.Time

เวลาสูงสุดที่สามารถดำน้ำได้ สำหรับ **ชุดดำน้ำตื้น**

```lua title="บรรทัดที่ 34"
CONFIG.General.Snorkel.Limit.Time = 30 -- [[ number ]]
```

### Snorkel.Regen.Rate

เพิ่มเวลาในการดำน้ำตามค่าที่ระบุหากขึ้นมาเหนือน้ำต่อ **`1`** วินาที สำหรับ **ชุดดำน้ำตื้น**

```lua title="บรรทัดที่ 38"
CONFIG.General.Snorkel.Regen.Rate = 1 -- [[ number ]]
```

### Scuba.InWater.Enable

เปิดใช้งาน สามารถใช้งาน **ชุดดำน้ำลึก** ขณะอยู่ในน้ำ

```lua title="บรรทัดที่ 44"
CONFIG.General.Scuba.InWater.Enable = false -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Scuba.Object.Enable

เปิดใช้งาน **Object** (**Prop**) สำหรับ **ชุดดำน้ำลึก**

```lua title="บรรทัดที่ 48"
CONFIG.General.Scuba.Object.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Scuba.Skin.Enable

เปิดใช้งาน **สกิน** สำหรับ **ชุดดำน้ำลึก**

```lua title="บรรทัดที่ 52"
CONFIG.General.Scuba.Skin.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Scuba.Skin.Balaclava.Enable

เปิดใช้งาน **สกินหมวกไอ้โม่ง** สำหรับ **ชุดดำน้ำลึก**

```lua title="บรรทัดที่ 54"
CONFIG.General.Scuba.Skin.Balaclava.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Scuba.Skin.Balaclava.Jobs

อาชีพที่อนุญาตให้ใช้งาน **สกินหมวกไอ้โม่ง** สำหรับ **ชุดดำน้ำลึก**

```lua title="บรรทัดที่ 55"
CONFIG.General.Scuba.Skin.Balaclava.Jobs = { -- [[ table ]]
    ['unemployed'] = false, -- ประชาชน
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

### Scuba.RandomColor.Enable

เปิดใช้งาน **สุ่มสี** สำหรับ **ชุดดำน้ำลึก**

```lua title="บรรทัดที่ 65"
CONFIG.General.Scuba.RandomColor.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Scuba.Flashlight.Key

ปุ่มควบคุมที่ใช้ในการ **เปิด**/**ปิด ไฟฉาย** สำหรับ **ชุดดำน้ำลึก**

```lua title="บรรทัดที่ 69"
CONFIG.General.Scuba.Flashlight.Key = 'F' -- [[ string ]]
```

:::info

ดูข้อมูลปุ่มทั้งหมดที่สามารถใช้งานได้ที่ **[Controls](https://docs.fivem.net/docs/game-references/controls/#controls)**

:::

### OxygenTank.InWater.Enable

เปิดใช้งาน สามารถใช้งาน **ถังออกซิเจน** ขณะอยู่ในน้ำ

```lua title="บรรทัดที่ 75"
CONFIG.General.OxygenTank.InWater.Enable = false -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### OxygenTank.Max.Value

จำนวน **ออกซิเจนสูงสุด** สำหรับ **ชุดดำน้ำลึก**

```lua title="บรรทัดที่ 79"
CONFIG.General.OxygenTank.Max.Value = 2100 -- [[ number ]]
```

### OxygenTank.Use.Add

จำนวน **ออกซิเจน** ที่ได้รับเมื่อใช้งานไอเทม สำหรับ **ชุดดำน้ำลึก**

```lua title="บรรทัดที่ 83"
CONFIG.General.OxygenTank.Use.Add = 2100 -- [[ number ]]
```

### OxygenTank.Dive.Remove

จำนวน **ออกซิเจน** ที่ลดลงขณะดำน้ำต่อ **`1`** วินาที สำหรับ **ชุดดำน้ำลึก**

```lua title="บรรทัดที่ 87"
CONFIG.General.OxygenTank.Dive.Remove = 1 -- [[ number ]]
```
