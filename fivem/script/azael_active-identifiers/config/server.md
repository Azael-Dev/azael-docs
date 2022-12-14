# server.config.lua

ไฟล์การกำหนดค่าของทรัพยากรทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)**

## General

ทั่วไป

```lua title="บรรทัดที่ 11"
CONFIG.General = {} -- [[ table ]]
```

### Use.Identifier

ตัวระบุที่ใช้ในการตรวจสอบ

```lua title="บรรทัดที่ 13"
CONFIG.General.Use.Identifier = 'steam' -- [[ string ]]
```

:::info

**ตัวเลือก:** `steam`, `license`, `live`, `discord`, `fivem`, `license2`, `ip`

:::

### Kick.Player.Enable

เปิดใช้งาน **เตะผู้เล่นที่ออนไลน์อยู่ในเซิร์ฟเวอร์** หากมีบุคคลอื่นใช้ตัวระบุเดียวกันพยายามเชื่อมต่อ

```lua title="บรรทัดที่ 18"
CONFIG.General.Kick.Player.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Kick.Reason.Player

เหตุผลการเตะผู้เล่น (**ผู้เล่นที่ออนไลน์อยู่ในเซิร์ฟเวอร์**)

```lua title="บรรทัดที่ 22"
CONFIG.General.Kick.Reason.Player = 'บุคคลอื่นกำลังใช้งานตัวระบุ %s พยายามเชื่อมต่อกับเซิร์ฟเวอร์' -- [[ string ]]
```

### Kick.Reason.Target

เหตุผลการเตะผู้เล่น (**ผู้เล่นที่พยายามเชื่อมต่อกับเซิร์ฟเวอร์**)

```lua title="บรรทัดที่ 23"
CONFIG.General.Kick.Reason.Target = 'บุคคลอื่นกำลังใช้งานตัวระบุ %s เชื่อมต่อกับเซิร์ฟเวอร์อยู่ในขณะนี้' -- [[ string ]]
```

### Kick.Reason.Identifier

เหตุผลการเตะผู้เล่น (**ไม่พบตัวระบุผู้เล่น**)

```lua title="บรรทัดที่ 24"
CONFIG.General.Kick.Reason.Identifier = 'ไม่พบตัวระบุ %s โปรดลองเชื่อมต่อกับเซิร์ฟเวอร์ใหม่อีกครั้ง' -- [[ string ]]
```

## Logger (function)

บันทึกข้อมูลผู้เล่นที่ใช้งานตัวระบุเดียวกัน

```lua title="บรรทัดที่ 36"
CONFIG.Logger = function(player, target)
    local eventName = 'ActiveIdentifiers'   -- ชื่อเหตุการณ์ สำหรับทรัพยากร azael_dc-serverlogs

    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = eventName,
            content = target.reason,
            source = target.id,
            color = 3,
            options = {
                important = true
            }
        })
    end)

    if CONFIG.General.Kick.Player.Enable then
        pcall(function()
            exports['azael_dc-serverlogs']:insertData({
                event = eventName,
                content = player.reason,
                source = player.id,
                color = 1,
                options = {
                    important = true
                }
            })
        end)
    end
end
```

### Parameter

| Name                         | Type               | Default            | Description                                                
|------------------------------|--------------------|--------------------|-------------------------------
| `player`                     | `table`            | `{ id, reason }`   | ตารางข้อมูล ผู้เล่นที่ออนไลน์อยู่ในเซิร์ฟเวอร์
| `player.id`                  | `number`           | Player ID          | ไอดี ผู้เล่นที่ออนไลน์อยู่ในเซิร์ฟเวอร์
| `player.reason`              | `string`           | Kick Reason        | เหตุผลการเตะ ผู้เล่นที่ออนไลน์อยู่ในเซิร์ฟเวอร์
| `target`                     | `table`            | `{ id, reason }`   | ตารางข้อมูล ผู้เล่นที่พยายามเชื่อมต่อกับเซิร์ฟเวอร์
| `target.id`                  | `number`           | Target ID          | ไอดี ผู้เล่นที่พยายามเชื่อมต่อกับเซิร์ฟเวอร์
| `target.reason `             | `string`           | Kick Reason        | เหตุผลการเตะ ผู้เล่นที่พยายามเชื่อมต่อกับเซิร์ฟเวอร์
