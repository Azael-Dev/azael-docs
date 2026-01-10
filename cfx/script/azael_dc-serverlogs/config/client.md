---
sidebar_label: Client
---

# client.config

ไฟล์การกำหนดค่าของทรัพยากรทางฝั่ง **[Client](https://en.wikipedia.org/wiki/Client-side)**

## Screenshot

การกำหนดค่า [บันทึกภาพหน้าจอ](./server.md#screenshotenable)

```lua title="บรรทัดที่ 11"
CONFIG.Screenshot = {} -- [[ table ]]
```

### Timeout

ระยะเวลารอภาพหน้าจอ (หน่วยเป็น **วินาที**)

```lua title="บรรทัดที่ 12"
CONFIG.Screenshot.Timeout = 30 -- [[ number ]]
```

### RequestScreenshot (function)

ฟังก์ชันสำหรับขอภาพหน้าจอจากผู้เล่น (รหัสเริ่มต้นใช้งานทรัพยากร [screenshot-basic](https://github.com/citizenfx/screenshot-basic))

```lua title="บรรทัดที่ 19"
RequestScreenshot = function(uploadUrls, gameName, eventName, cb)
    ---ทรัพยากร screenshot-basic ยังไม่รองรับ RedM
    if gameName == 'redm' then return cb(nil) end

    ---รับ URL สำหรับอัปโหลดภาพเหตุการณ์
    local uploadUrl = uploadUrls[eventName]

    ---กำหนด URL สำหรับอัปโหลดภาพเหตุการณ์ "สาเหตุการตาย" โดยใช้ตัวเลขหลักสุดท้ายจาก Server ID ของผู้เล่น
    ---วิธีนี้ช่วยกระจายโหลดไปยังหลาย URL เพื่อลดโอกาสเกิด Rate Limit ของ Discord API (Webhooks)
    if eventName == 'Dead' then
        local serverId = GetPlayerServerId(PlayerId())
        local lastDigit = serverId % 10
        
        if lastDigit > 0 then
            local newUrl = uploadUrls[eventName .. ':' .. lastDigit]
            
            if newUrl then
                uploadUrl = newUrl
            end
        end
    end
    
    exports['screenshot-basic']:requestScreenshotUpload(uploadUrl, 'file', function(data)
        local resp = json.decode(data)
        local imgUrl = nil
        
        if resp and (resp.attachments and resp.attachments[1]) then
            imgUrl = resp.attachments[1].proxy_url or resp.attachments[1].url
        end
        
        cb(imgUrl)
    end)
end
```

#### Parameters

- uploadUrls: `table<{ [key]: string }>`
    - ตารางข้อมูล URLs สำหรับการอัปโหลดรูปภาพ (อ้างอิงจาก [Screenshot.Webhooks](./server.md#screenshotwebhooks))
- gameName: `string`
    - ชื่อของเกมหรือแพลตฟอร์มที่กำลังใช้งาน เช่น `fivem` หรือ `redm`
- eventName: `string`
    - ชื่อของเหตุการณ์ที่ขอภาพหน้าจอและอัปโหลดรูปภาพ
- cb: `function`
    - ฟังก์ชัน callback ที่จะถูกเรียกเมื่ออัปโหลดภาพหน้าจอเสร็จสิ้น โดยรับค่า URL ของภาพ (`string`) หรือ `nil` หากอัปโหลดไม่สำเร็จ

## Death

สาเหตุการตาย

```lua title="บรรทัดที่ 54"
CONFIG.Death = {} -- [[ table ]]
```

### Option.Type

ตัวเลือกการส่งข้อมูล **สาเหตุการตาย** ในกรณีผู้เล่นถูกฆ่าโดยผู้เล่นคนอื่นๆ

```lua title="บรรทัดที่ 56"
CONFIG.Death.Option.Type = 0 -- [[ number ]]
```

| Value  |  Description                                                
|--------|--------------------------------------------------
| `0`    | ส่งข้อมูล **สาเหตุการตาย** ของ **ผู้ฆ่า** และ **ผู้ถูกฆ่า**
| `1`    | ส่งข้อมูล **สาเหตุการตาย** เฉพาะ **ผู้ฆ่า**
| `2`    | ส่งข้อมูล **สาเหตุการตาย** เฉพาะ **ผู้ถูกฆ่า**

### Custom.Enable

เปิดใช้งาน กำหนดเหตุการณ์สาเหตุการตายภายในโซนที่กำหนดใน **[Custom.Zones](./client.md#customzones)**

```lua title="บรรทัดที่ 60"
CONFIG.Death.Custom.Enable = false -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Custom.Zones

โซนที่ต้องการกำหนดเอง (**สามารถเพิ่มโซนได้**)

```lua title="บรรทัดที่ 62"
CONFIG.Death.Custom.Zones = { -- [[ table ]]
    --[[ Boxing - Los Santos International Airport ]]
    {
        Event = 'DeathPunch', --[[ string ]]
        Coords = vector3(-1096.59, -3007.87, 13.94), --[[ vector3 ]]
        Radius = 170 --[[ number ]]
    }
}
```

:::info

- `Event` หมายถึง ชื่อเหตุการณ์ (หากใช้งาน **[Discord API](../config/server.md#discord-api)** จะต้องกำหนดชื่อเหตุการณ์นี้ใน **"[CONFIG.Discord.Webhooks](../config/events/discord#discord-events)"**)<br/>
- `Coords` หมายถึง พิกัดของโซนที่กำหนด (`X`, `Y`, `Z`) ในรูปแบบ **[vector3](https://docs.fivem.net/docs/scripting-reference/runtimes/lua/functions/vector3/)**<br/>
- `Radius` หมายถึง รัศมี หรือ ขอบเขต โดยอ้างอิงจากจุดศูนย์กลางของพิกัดที่กำหนดใน `Coords`

:::

### Ignore.Enable

เปิดใช้งาน ละเว้นสาเหตุการตายภายในโซนที่กำหนดใน **[Ignore.Zones](./client.md#ignorezones)**

```lua title="บรรทัดที่ 73"
CONFIG.Death.Ignore.Enable = false -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Ignore.Zones

รายการโซนที่ต้องการละเว้น (**สามารถเพิ่มโซนได้**)

```lua title="บรรทัดที่ 75"
CONFIG.Death.Ignore.Zones = { -- [[ table ]]
    --[[ Boxing - Los Santos International Airport ]]
    {
        Coords = vector3(-1096.59, -3007.87, 13.94), --[[ vector3 ]]
        Radius = 170 --[[ number ]]
    }
}
```

:::info

- `Coords` หมายถึง พิกัดของโซนที่กำหนด (`X`, `Y`, `Z`) ในรูปแบบ **[vector3](https://docs.fivem.net/docs/scripting-reference/runtimes/lua/functions/vector3/)**<br/>
- `Radius` หมายถึง รัศมี หรือ ขอบเขต โดยอ้างอิงจากจุดศูนย์กลางของพิกัดที่กำหนดใน `Coords`

:::

### Reason

เหตุผลสาเหตุการตาย

```lua title="บรรทัดที่ 84"
CONFIG.Death.Reason = { -- [[ table ]]
    Default = 'เสียชีวิต โดย %s',
    Player = 'ถูก %s ฆ่า โดย %s',
    Killer = 'ฆ่า %s โดย %s',
    Vehicle = '%s ทะเบียน %s',
    Unknown = 'เสียชีวิต โดย ไม่ทราบสาเหตุ (Hash: %s)',
    Note = {
        Melee = 'อาวุธระยะประชิด',
        Bullet = 'อาวุธปืน',
        Explosion = 'แรงระเบิด',
        Gas = 'แก๊สพิษ',
        Burn = 'ไฟคลอก',
        Vehicle = 'ยานพาหนะ',
        Addon = 'อาวุธเสริม',
        Hunger = 'ขาดอาหาร',
        Thirst = 'ขาดน้ำ'
    }
}
```
