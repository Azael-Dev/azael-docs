# server.config.lua

ไฟล์การกำหนดค่าของทรัพยากรทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)**

## General

ทั่วไป

```lua title="บรรทัดที่ 11"
CONFIG.General = {} -- [[ table ]]
```

### Rules.Active.Identifier

ตัวระบุที่ใช้ในการตรวจสอบเพื่อป้องกันผู้เล่นใช้งาน **`1`** ตัวระบุต่อเดสก์ท็อปหลายเครื่องเพื่อปั้มไอเทม

```lua title="บรรทัดที่ 14"
CONFIG.General.Rules.Active.Identifier = 'steam' -- [[ string ]]
```

:::info

**ตัวเลือก:** `steam`, `license`, `live`, `discord`, `fivem`, `license2`

:::

### Rules.IPAddress.Limit

จำกัดการเชื่อมต่อกับเซิร์ฟเวอร์พร้อมกันโดยการตรวจสอบที่อยู่ IP ผู้เล่น (**[Public IP](https://en.wikipedia.org/wiki/IP_address#Public_address)**)

```lua title="บรรทัดที่ 18"
CONFIG.General.Rules.IPAddress.Limit = 2 -- [[ number ]]
```

:::info

ระบุ `0` หากต้องการ ปิดใช้งาน

:::

### Rules.IPAddress.Customs

จำกัด IP แบบกำหนดเอง เพื่อเพิ่มจำนวนการเชื่อมต่อให้กับผู้เล่นที่ใช้บริการร้าน **Internet Cafe** โดยส่วนใหญ่จะเป็น IP แบบคงที่ (**[Static IP](https://en.wikipedia.org/wiki/IP_address#Static_IP)**)

```lua title="บรรทัดที่ 20"
CONFIG.General.Rules.IPAddress.Customs = { -- [[ table ]]
    {
        IP = '127.0.0.1', -- [[ string ]]
        Limit = 20 -- [[ number ]]
    }
}
```

:::info

- `IP` หมายถึง ที่อยู่ IP ([Public IP](https://en.wikipedia.org/wiki/IP_address#Public_address))<br/>
- `Limit` หมายถึง จำนวนที่ต้องการจำกัด

:::

:::tip

คุณสามารถเพิ่มข้อมูลได้ในรูปแบบ Table ตามตัวอย่างด้านล่าง

```lua
CONFIG.General.Rules.IPAddress.Customs = { -- [[ table ]]
    {
        IP = '127.0.0.1',                       -- ที่อยู่ IP (Public IP)
        Limit = 20                              -- จำนวนที่ต้องการจำกัด
    },
    {
        IP = '127.0.0.2',                       -- ที่อยู่ IP (Public IP)
        Limit = 30                              -- จำนวนที่ต้องการจำกัด
    }
}
```

:::

### Kick.Player.Enable

เปิดใช้งาน **เตะผู้เล่นที่ออนไลน์อยู่ในเซิร์ฟเวอร์** หากมีบุคคลอื่นใช้ตัวระบุเดียวกันพยายามเชื่อมต่อ

```lua title="บรรทัดที่ 31"
CONFIG.General.Kick.Player.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Kick.Reason.Player

เหตุผลการเตะผู้เล่น (**ผู้เล่นที่ออนไลน์อยู่ในเซิร์ฟเวอร์**)

```lua title="บรรทัดที่ 35"
CONFIG.General.Kick.Reason.Player = 'บุคคลอื่นกำลังใช้งานตัวระบุ %s พยายามเชื่อมต่อกับเซิร์ฟเวอร์' -- [[ string ]]
```

### Kick.Reason.Target

เหตุผลการเตะผู้เล่น (**ผู้เล่นที่พยายามเชื่อมต่อกับเซิร์ฟเวอร์**)

```lua title="บรรทัดที่ 36"
CONFIG.General.Kick.Reason.Target = 'บุคคลอื่นกำลังใช้งานตัวระบุ %s เชื่อมต่อกับเซิร์ฟเวอร์อยู่ในขณะนี้' -- [[ string ]]
```

### Kick.Reason.Identifier

เหตุผลการเตะผู้เล่น (**ไม่พบตัวระบุผู้เล่น**)

```lua title="บรรทัดที่ 37"
CONFIG.General.Kick.Reason.Identifier = 'ไม่พบตัวระบุ %s โปรดลองเชื่อมต่อกับเซิร์ฟเวอร์ใหม่อีกครั้ง' -- [[ string ]]
```

### Kick.Reason.IPLimit

เหตุผลที่ปฏิเสธการเชื่อมต่อ (**ที่อยู่ IP เชื่อมต่อกับเซิร์ฟเวอร์พร้อมกันครบตามอัตราที่จำกัดแล้ว**)

```lua title="บรรทัดที่ 38"
CONFIG.General.Kick.Reason.IPLimit = 'ที่อยู่ IP %s เชื่อมต่อกับเซิร์ฟเวอร์ครบตามอัตราที่จำกัดแล้ว (%s Client / 1 IP) หากคุณกำลังใช้บริการร้าน Internet Cafe โปรดติดต่อผู้ดูแลเซิร์ฟเวอร์' -- [[ string ]]
```

## Logger (function)

บันทึกข้อมูลผู้เล่นที่ใช้งานตัวระบุเดียวกัน

```lua title="บรรทัดที่ 50"
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
