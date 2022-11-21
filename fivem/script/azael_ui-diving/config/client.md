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

## Animation

แอนิเมชั่น

```lua title="บรรทัดที่ 92"
CONFIG.Animation = {} -- [[ table ]]
```

### PutOn.Dict

พจนานุกรมแอนิเมชั่น สำหรับ **สวมใส่ชุด**

```lua title="บรรทัดที่ 94"
CONFIG.Animation.PutOn.Dict = 'clothingtie' -- [[ string ]]
```

### PutOn.Name

ชื่อแอนิเมชั่น สำหรับ **สวมใส่ชุด**

```lua title="บรรทัดที่ 95"
CONFIG.Animation.PutOn.Name = 'try_tie_negative_a' -- [[ string ]]
```

### PutOn.Duration

ระยะเวลาการเล่นแอนิเมชั่น สำหรับ **สวมใส่ชุด**

```lua title="บรรทัดที่ 96"
CONFIG.Animation.PutOn.Duration = 2000 -- [[ number ]]
```

:::info

ระบุเป็น **มิลลิวินาที** (`1000` เท่ากับ `1` วินาที)

:::

### PutOn.PlayAnim (function)

เล่นแอนิเมชั่น สำหรับ **สวมใส่ชุด**

```lua title="บรรทัดที่ 103"
CONFIG.Animation.PutOn.PlayAnim = function(ped, dict, name, duration)
    TaskPlayAnim(ped, dict, name, 8.0, 1.0, duration, 16, 0.0, false, false, false)
end
```

#### Parameter

| Name                         | Type               | Default                                | Description                                                
|------------------------------|--------------------|----------------------------------------|----------------------------------------------------------------------
| `ped`                        | `number`           | Ped ID                                 | Ped ปัจจุบัน
| `dict`                       | `string`           | Animation Dictionary                   | พจนานุกรมแอนิเมชั่น
| `name`                       | `string`           | Animation Name                         | ชื่อแอนิเมชั่น
| `duration`                   | `number`           | Animation Duration                     | ระยะเวลาการเล่นแอนิเมชั่น

### TackOff.Dict

พจนานุกรมแอนิเมชั่น สำหรับ **ถอดชุดออก**

```lua title="บรรทัดที่ 109"
CONFIG.Animation.TackOff.Dict = 'clothingtie' -- [[ string ]]
```

### TackOff.Name

ชื่อแอนิเมชั่น สำหรับ **ถอดชุดออก**

```lua title="บรรทัดที่ 110"
CONFIG.Animation.TackOff.Name = 'try_tie_negative_a' -- [[ string ]]
```

### TackOff.Duration

ระยะเวลาการเล่นแอนิเมชั่น สำหรับ **ถอดชุดออก**

```lua title="บรรทัดที่ 111"
CONFIG.Animation.TackOff.Duration = 2000 -- [[ number ]]
```

:::info

ระบุเป็น **มิลลิวินาที** (`1000` เท่ากับ `1` วินาที)

:::

### TackOff.PlayAnim (function)

เล่นแอนิเมชั่น สำหรับ **ถอดชุดออก**

```lua title="บรรทัดที่ 118"
CONFIG.Animation.TackOff.PlayAnim = function(ped, dict, name, duration)
    TaskPlayAnim(ped, dict, name, 8.0, 1.0, duration, 16, 0.0, false, false, false)
end
```

#### Parameter

| Name                         | Type               | Default                                | Description                                                
|------------------------------|--------------------|----------------------------------------|----------------------------------------------------------------------
| `ped`                        | `number`           | Ped ID                                 | Ped ปัจจุบัน
| `dict`                       | `string`           | Animation Dictionary                   | พจนานุกรมแอนิเมชั่น
| `name`                       | `string`           | Animation Name                         | ชื่อแอนิเมชั่น
| `duration`                   | `number`           | Animation Duration                     | ระยะเวลาการเล่นแอนิเมชั่น

## Object

**Object** (**Prop**) สำหรับ **ชุดดำน้ำตื้น** และ **ชุดดำน้ำลึก**

```lua title="บรรทัดที่ 124"
CONFIG.Object = {} -- [[ table ]]
```

### Snorkel.Mask.Name

ชื่อ **Object** (**Prop**) ตำแหน่ง **หน้ากาก** สำหรับ **ชุดดำน้ำตื้น**

```lua title="บรรทัดที่ 127"
CONFIG.Object.Snorkel.Mask.Name = 'p_d_scuba_mask_s' -- [[ string ]]
```

### Snorkel.Mask.BoneID

**Bone ID** ที่ต้องการแนบ **Object** (**Prop**) ตำแหน่ง **หน้ากาก** ไปยัง **Ped** สำหรับ **ชุดดำน้ำตื้น**

```lua title="บรรทัดที่ 128"
CONFIG.Object.Snorkel.Mask.BoneID = 12844 -- [[ number ]]
```

### Snorkel.Mask.AttachEntity (function)

แนบ **Object** (**Prop**) ตำแหน่ง **หน้ากาก** ไปยัง **Ped** สำหรับ **ชุดดำน้ำตื้น**

```lua title="บรรทัดที่ 134"
CONFIG.Object.Snorkel.Mask.AttachEntity = function(ped, bone, object)
    AttachEntityToEntity(object, ped, bone, 0.0, 0.0, 0.0, 0.0, 90.0, 180.0, true, true, false, true, 1, true)
end
```

#### Parameter

| Name                         | Type               | Default                                | Description                                                
|------------------------------|--------------------|----------------------------------------|----------------------------------------------------------------------
| `ped`                        | `number`           | Ped ID                                 | Ped ปัจจุบัน
| `bone`                       | `number`           | Bone ID                                | ตำแหน่งที่แนบ Object ไปยัง Ped
| `object`                     | `number`           | Object ID                              | Object ที่แนบไปยัง Ped

### Scuba.Mask.Name

ชื่อ **Object** (**Prop**) ตำแหน่ง **หน้ากาก** สำหรับ **ชุดดำน้ำลึก**

```lua title="บรรทัดที่ 142"
CONFIG.Object.Scuba.Mask.Name = 'p_michael_scuba_mask_s' -- [[ string ]]
```

### Scuba.Mask.BoneID

**Bone ID** ที่ต้องการแนบ **Object** (**Prop**) ตำแหน่ง **หน้ากาก** ไปยัง **Ped** สำหรับ **ชุดดำน้ำลึก**

```lua title="บรรทัดที่ 143"
CONFIG.Object.Scuba.Mask.BoneID = 12844 -- [[ number ]]
```

### Scuba.Mask.AttachEntity (function)

แนบ **Object** (**Prop**) ตำแหน่ง **หน้ากาก** ไปยัง **Ped** สำหรับ **ชุดดำน้ำลึก**

```lua title="บรรทัดที่ 149"
CONFIG.Object.Scuba.Mask.AttachEntity = function(ped, bone, object)
    AttachEntityToEntity(object, ped, bone, 0.0, 0.0, 0.0, 0.0, 90.0, 180.0, true, true, false, true, 1, true)
end
```

#### Parameter

| Name                         | Type               | Default                                | Description                                                
|------------------------------|--------------------|----------------------------------------|----------------------------------------------------------------------
| `ped`                        | `number`           | Ped ID                                 | Ped ปัจจุบัน
| `bone`                       | `number`           | Bone ID                                | ตำแหน่งที่แนบ Object ไปยัง Ped
| `object`                     | `number`           | Object ID                              | Object ที่แนบไปยัง Ped

### Scuba.Tank.Name

ชื่อ **Object** (**Prop**) ตำแหน่ง **ถังออกซิเจน** สำหรับ **ชุดดำน้ำลึก**

```lua title="บรรทัดที่ 155"
CONFIG.Object.Scuba.Tank.Name = 'p_michael_scuba_tank_s' -- [[ string ]]
```

### Scuba.Tank.BoneID

**Bone ID** ที่ต้องการแนบ **Object** (**Prop**) ตำแหน่ง **ถังออกซิเจน** ไปยัง **Ped** สำหรับ **ชุดดำน้ำลึก**

```lua title="บรรทัดที่ 156"
CONFIG.Object.Scuba.Tank.BoneID = 24818 -- [[ number ]]
```

### Scuba.Tank.AttachEntity (function)

แนบ **Object** (**Prop**) ตำแหน่ง **ถังออกซิเจน** ไปยัง **Ped** สำหรับ **ชุดดำน้ำลึก**

```lua title="บรรทัดที่ 162"
CONFIG.Object.Scuba.Tank.AttachEntity = function(ped, bone, object)
    AttachEntityToEntity(object, ped, bone, -0.30, -0.22, 0.0, 0.0, 90.0, 180.0, true, true, false, true, 1, true)
end
```

#### Parameter

| Name                         | Type               | Default                                | Description                                                
|------------------------------|--------------------|----------------------------------------|----------------------------------------------------------------------
| `ped`                        | `number`           | Ped ID                                 | Ped ปัจจุบัน
| `bone`                       | `number`           | Bone ID                                | ตำแหน่งที่แนบ Object ไปยัง Ped
| `object`                     | `number`           | Object ID                              | Object ที่แนบไปยัง Ped

### Scuba.Flashlight.Name

ชื่อ **Object** (**Prop**) ตำแหน่ง **ไฟฉาย** สำหรับ **ชุดดำน้ำลึก**

```lua title="บรรทัดที่ 168"
CONFIG.Object.Scuba.Flashlight.Name = 'w_me_flashlight' -- [[ string ]]
```

### Scuba.Flashlight.BoneID

**Bone ID** ที่ต้องการแนบ **Object** (**Prop**) ตำแหน่ง **ไฟฉาย** ไปยัง **Ped** สำหรับ **ชุดดำน้ำลึก**

```lua title="บรรทัดที่ 169"
CONFIG.Object.Scuba.Flashlight.BoneID = 34911 -- [[ number ]]
```

### Scuba.Flashlight.AttachEntity (function)

แนบ **Object** (**Prop**) ตำแหน่ง **ไฟฉาย** ไปยัง **Ped** สำหรับ **ชุดดำน้ำลึก**

```lua title="บรรทัดที่ 175"
CONFIG.Object.Scuba.Flashlight.AttachEntity = function(ped, bone, object)
    AttachEntityToEntity(object, ped, bone, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, true, true, false, true, 1, true)
end
```

#### Parameter

| Name                         | Type               | Default                                | Description                                                
|------------------------------|--------------------|----------------------------------------|----------------------------------------------------------------------
| `ped`                        | `number`           | Ped ID                                 | Ped ปัจจุบัน
| `bone`                       | `number`           | Bone ID                                | ตำแหน่งที่แนบ Object ไปยัง Ped
| `object`                     | `number`           | Object ID                              | Object ที่แนบไปยัง Ped

## RandomColor

สี **ชุดดำน้ำตื้น** และ **ชุดดำน้ำลึก** แบบ **สุ่ม** สำหรับ **ประชาชนทั่วไป**

```lua title="บรรทัดที่ 182"
CONFIG.RandomColor = {} -- [[ table ]]
```

### Snorkel.Male.Color.Min

รหัสสี **ต่ำสุด** สำหรับ **ชุดดำน้ำตื้น** (**ผู้ชาย**)

```lua title="บรรทัดที่ 186"
CONFIG.RandomColor.Snorkel.Male.Color.Min = 0 -- [[ number ]]
```

### Snorkel.Male.Color.Max

รหัสสี **สูงสุด** สำหรับ **ชุดดำน้ำตื้น** (**ผู้ชาย**)

```lua title="บรรทัดที่ 187"
CONFIG.RandomColor.Snorkel.Male.Color.Max = 6 -- [[ number ]]
```

### Snorkel.Male.Color.Position

ตำแหน่งที่ต้องการ **สุ่มสี** สำหรับ **ชุดดำน้ำตื้น** (**ผู้ชาย**)

```lua title="บรรทัดที่ 188"
CONFIG.RandomColor.Snorkel.Male.Color.Position = { -- [[ table ]]
    'pants_2' -- [[ string ]]
}
```

### Snorkel.Female.Color.Min

รหัสสี **ต่ำสุด** สำหรับ **ชุดดำน้ำตื้น** (**ผู้หญิง**)

```lua title="บรรทัดที่ 196"
CONFIG.RandomColor.Snorkel.Female.Color.Min = 0 -- [[ number ]]
```

### Snorkel.Female.Color.Max

รหัสสี **สูงสุด** สำหรับ **ชุดดำน้ำตื้น** (**ผู้หญิง**)

```lua title="บรรทัดที่ 197"
CONFIG.RandomColor.Snorkel.Female.Color.Max = 15 -- [[ number ]]
```

### Snorkel.Female.Color.Position

ตำแหน่งที่ต้องการ **สุ่มสี** สำหรับ **ชุดดำน้ำตื้น** (**ผู้หญิง**)

```lua title="บรรทัดที่ 198"
CONFIG.RandomColor.Snorkel.Female.Color.Position = { -- [[ table ]]
    'tshirt_2', -- [[ string ]]
    'torso_2',
    'decals_2',
    'pants_2'
}
```

### Scuba.Male.Color.Min

รหัสสี **ต่ำสุด** สำหรับ **ชุดดำน้ำลึก** (**ผู้ชาย**)

```lua title="บรรทัดที่ 211"
CONFIG.RandomColor.Scuba.Male.Color.Min = 0 -- [[ number ]]
```

### Scuba.Male.Color.Max

รหัสสี **สูงสุด** สำหรับ **ชุดดำน้ำลึก** (**ผู้ชาย**)

```lua title="บรรทัดที่ 212"
CONFIG.RandomColor.Scuba.Male.Color.Max = 25 -- [[ number ]]
```

### Scuba.Male.Color.Position

ตำแหน่งที่ต้องการ **สุ่มสี** สำหรับ **ชุดดำน้ำลึก** (**ผู้ชาย**)

```lua title="บรรทัดที่ 213"
CONFIG.RandomColor.Scuba.Male.Color.Position = { -- [[ table ]]
    'tshirt_2', -- [[ string ]]
    'torso_2',
    'pants_2',
    'shoes_2'
}
```

### Scuba.Female.Color.Min

รหัสสี **ต่ำสุด** สำหรับ **ชุดดำน้ำลึก** (**ผู้หญิง**)

```lua title="บรรทัดที่ 224"
CONFIG.RandomColor.Scuba.Female.Color.Min = 0 -- [[ number ]]
```

### Scuba.Female.Color.Max

รหัสสี **สูงสุด** สำหรับ **ชุดดำน้ำลึก** (**ผู้หญิง**)

```lua title="บรรทัดที่ 225"
CONFIG.RandomColor.Scuba.Female.Color.Max = 25 -- [[ number ]]
```

### Scuba.Female.Color.Position

ตำแหน่งที่ต้องการ **สุ่มสี** สำหรับ **ชุดดำน้ำลึก** (**ผู้หญิง**)

```lua title="บรรทัดที่ 226"
CONFIG.RandomColor.Scuba.Female.Color.Position = { -- [[ table ]]
    'tshirt_2', -- [[ string ]]
    'torso_2',
    'pants_2',
    'shoes_2'
}
```

## AgencyColor

สี **ชุดดำน้ำลึก** สำหรับ **หน่วยงาน**

```lua title="บรรทัดที่ 237"
CONFIG.AgencyColor = {} -- [[ table ]]
```

<details>
    <summary>คำอธิบายเพิ่มเติมเกี่ยวกับการกำหนดค่า</summary>

```lua
['Job'] = { -- [[ table ]]
    Male = { -- [[ table ]]
        Color = 1, -- [[ number ]]
        Position = { -- [[ table ]]
            'tshirt_2', -- [[ string ]]
            'torso_2',
            'pants_2',
            'shoes_2'
        }
    },

    Female = { -- [[ table ]]
        Color = 1, -- [[ number ]]
        Position = { -- [[ table ]]
            'tshirt_2', -- [[ string ]]
            'torso_2',
            'pants_2',
            'shoes_2'
        }
    }
}
```

- `Job` หมายถึง ชื่ออาชีพสำหรับ **หน่วยงาน** โดยอ้างอิงจากฐานข้อมูลตาราง `jobs` คอลัมน์ `name`
- `Male`, `Female` หมายถึง การกำหนดค่าสำหรับตัวละคร **ผู้ชาย** และ **ผู้หญิง**
- `Color` หมายถึง **รหัสสี** ที่ต้องการกำหนด
- `Position` หมายถึง **ตำแหน่ง** ที่ต้องการเปลี่ยนสี

</details>

:::tip

- สามารถ **เพิ่ม** หรือ **แก้ไข** ได้
- สี **ชุดดำน้ำลึก** แบบ **สุ่ม** สำหรับ **ประชาชน** จะไม่สามารถใช้งานสีชุดของ **หน่วยงาน** ได้

:::

### Ambulance (default)

ค่าเริ่มต้นสี **ชุดดำน้ำลึก** สำหรับหน่วยงาน **หมอ**

```lua title="บรรทัดที่ 225"
['ambulance'] = {                                       -- หมอ
    Male = {                                            -- ผู้ชาย
        Color = 1,                                      -- รหัสสี
        Position = {                                    -- ตำแหน่งที่ต้องการเปลี่ยนสี
            'tshirt_2',
            'torso_2',
            'pants_2',
            'shoes_2'
        }
    },

    Female = {                                          -- ผู้หญิง
        Color = 1,                                      -- รหัสสี
        Position = {                                    -- ตำแหน่งที่ต้องการเปลี่ยนสี
            'tshirt_2',
            'torso_2',
            'pants_2',
            'shoes_2'
        }
    }
}
```

### Police (default)

ค่าเริ่มต้นสี **ชุดดำน้ำลึก** สำหรับหน่วยงาน **ตำรวจ**

```lua title="บรรทัดที่ 260"
['police'] = {                                          -- ตำรวจ
    Male = {                                            -- ผู้ชาย
        Color = 2,                                      -- รหัสสี
        Position = {                                    -- ตำแหน่งที่ต้องการเปลี่ยนสี
            'tshirt_2',
            'torso_2',
            'pants_2',
            'shoes_2'
        }
    },

    Female = {                                          -- ผู้หญิง
        Color = 2,                                      -- รหัสสี
        Position = {                                    -- ตำแหน่งที่ต้องการเปลี่ยนสี
            'tshirt_2',
            'torso_2',
            'pants_2',
            'shoes_2'
        }
    }
}
```

### Mechanic (default)

ค่าเริ่มต้นสี **ชุดดำน้ำลึก** สำหรับหน่วยงาน **ช่าง**

```lua title="บรรทัดที่ 282"
['mechanic'] = {                                        -- ช่าง
    Male = {                                            -- ผู้ชาย
        Color = 3,                                      -- รหัสสี
        Position = {                                    -- ตำแหน่งที่ต้องการเปลี่ยนสี
            'tshirt_2',
            'torso_2',
            'pants_2',
            'shoes_2'
        }
    },

    Female = {                                          -- ผู้หญิง
        Color = 3,                                      -- รหัสสี
        Position = {                                    -- ตำแหน่งที่ต้องการเปลี่ยนสี
            'tshirt_2',
            'torso_2',
            'pants_2',
            'shoes_2'
        }
    }
}
```

## Skin

สกิน **ชุดดำน้ำตื้น** และ **ชุดดำน้ำลึก**

```lua title="บรรทัดที่ 305"
CONFIG.Skin = {} -- [[ table ]]
```

### Snorkel.Male

สกิน **ชุดดำน้ำตื้น** สำหรับ **ผู้ชาย**

```lua title="บรรทัดที่ 305"
CONFIG.Skin.Snorkel.Male = { -- [[ table ]]
    ['tshirt_1'] = 15,
    ['tshirt_2'] = 0,
    ['ears_1'] = -1,
    ['ears_2'] = 0,
    ['torso_1'] = 15,
    ['torso_2'] = 0,
    ['decals_1'] = 0,
    ['decals_2'] = 0,
    ['mask_1'] = 0,
    ['mask_2'] = 0,
    ['arms'] = 15,
    ['arms_2'] = 0,
    ['pants_1'] = 54,
    ['pants_2'] = 0,
    ['shoes_1'] = 67,
    ['shoes_2'] = 0,
    ['helmet_1'] = 8,
    ['helmet_2'] = 0,
    ['bags_1'] = 43,
    ['bags_2'] = 0,
    ['glasses_1'] = -1,
    ['glasses_2'] = 0,
    ['chain_1'] = 0,
    ['chain_2'] = 0,
    ['bproof_1'] = 0,
    ['bproof_2'] = 0
}
```

:::info

```lua
[key] = number
```

- `key` หมายถึง ตำแหน่งสกิน
- `number` หมายถึง รหัสสกิน

:::

### Snorkel.Female

สกิน **ชุดดำน้ำตื้น** สำหรับ **ผู้หญิง**

```lua title="บรรทัดที่ 336"
CONFIG.Skin.Snorkel.Female = { -- [[ table ]]
    ['tshirt_1'] = 15,
    ['tshirt_2'] = 0,
    ['ears_1'] = -1,
    ['ears_2'] = 0,
    ['torso_1'] = 15,
    ['torso_2'] = 0,
    ['decals_1'] = 0,
    ['decals_2'] = 0,
    ['mask_1'] = 0,
    ['mask_2'] = 0,
    ['arms'] = 15,
    ['arms_2'] = 0,
    ['pants_1'] = 15,
    ['pants_2'] = 0,
    ['shoes_1'] = 70,
    ['shoes_2'] = 0,
    ['helmet_1'] = -1,
    ['helmet_2']	= 0,
    ['bags_1'] = 43,
    ['bags_2'] = 0,
    ['glasses_1'] = -1,
    ['glasses_2'] = 0,
    ['chain_1'] = 0,
    ['chain_2'] = 0,
    ['bproof_1'] = 0,
    ['bproof_2'] = 0
}
```

:::info

```lua
[key] = number
```

- `key` หมายถึง ตำแหน่งสกิน
- `number` หมายถึง รหัสสกิน

:::

### Scuba.Male

สกิน **ชุดดำน้ำลึก** สำหรับ **ผู้ชาย**

```lua title="บรรทัดที่ 366"
CONFIG.Skin.Scuba.Male = { -- [[ table ]]
    ['tshirt_1'] = 15,
    ['tshirt_2'] = 0,
    ['ears_1'] = -1,
    ['ears_2'] = 0,
    ['torso_1'] = 243,
    ['torso_2'] = 0,
    ['decals_1'] = 0,
    ['decals_2']= 0,
    ['mask_1'] = 0,
    ['mask_2'] = 0,
    ['arms'] = 31,
    ['arms_2'] = 0,
    ['pants_1'] = 94,
    ['pants_2'] = 0,
    ['shoes_1'] = 67,
    ['shoes_2'] = 0,
    ['helmet_1'] = -1,
    ['helmet_2'] = 0,
    ['bags_1'] = -1,
    ['bags_2'] = 0,
    ['glasses_1'] = -1,
    ['glasses_2'] = 0,
    ['chain_1'] = 0,
    ['chain_2'] = 0,
    ['bproof_1'] = 0,
    ['bproof_2'] = 0
}
```

:::info

```lua
[key] = number
```

- `key` หมายถึง ตำแหน่งสกิน
- `number` หมายถึง รหัสสกิน

:::

### Scuba.Female

สกิน **ชุดดำน้ำลึก** สำหรับ **ผู้หญิง**

```lua title="บรรทัดที่ 396"
CONFIG.Skin.Scuba.Female = { -- [[ table ]]
    ['tshirt_1'] = 15,
    ['tshirt_2'] = 0,
    ['ears_1'] = -1,
    ['ears_2'] = 0,
    ['torso_1'] = 251,
    ['torso_2'] = 0,
    ['decals_1'] = 0,
    ['decals_2'] = 0,
    ['mask_1'] = 0,
    ['mask_2'] = 0,
    ['arms'] = 36,
    ['arms_2'] = 0,
    ['pants_1'] = 97,
    ['pants_2'] = 0,
    ['shoes_1'] = 70,
    ['shoes_2'] = 0,
    ['helmet_1']= -1,
    ['helmet_2'] = 0,
    ['bags_1'] = -1,
    ['bags_2']	= 0,
    ['glasses_1'] = -1,
    ['glasses_2'] = 0,
    ['chain_1'] = 0,
    ['chain_2'] = 0,
    ['bproof_1'] = 0,
    ['bproof_2'] = 0
}
```

:::info

```lua
[key] = number
```

- `key` หมายถึง ตำแหน่งสกิน
- `number` หมายถึง รหัสสกิน

:::

## Notification

แจ้งเตือนสถานะต่างๆ

```lua title="บรรทัดที่ 427"
CONFIG.Notification = {} -- [[ table ]]
```

### Clothes (function)

แจ้งเตือนข้อผิดพลาด **เสื้อผ้า**

```lua title="บรรทัดที่ 429"
CONFIG.Notification.Clothes = function()
    ESX.ShowNotification('ไม่สามารถใช้งานบริเวณผิวน้ำได้', 'error', 3000)
end
```

### OxygenTank (function)

แจ้งเตือนข้อผิดพลาด **ถังออกซิเจน**

```lua title="บรรทัดที่ 434"
CONFIG.Notification.OxygenTank = function()
    ESX.ShowNotification('โปรดสวมชุดดำน้ำลึกก่อนใช้งาน', 'error', 3000)
end
```

### Flashlight (function)

แจ้งเตือนข้อมูลการใช้งาน **ไฟฉาย** สำหรับ **ชุดดำน้ำลึก**

```lua title="บรรทัดที่ 439"
CONFIG.Notification.Flashlight = function()
    ESX.ShowNotification(('กด ~b~%s~s~ เพื่อ เปิด/ปิด ไฟฉาย'):format(CONFIG.General.Scuba.Flashlight.Key), 'info', 3000)
end
```
