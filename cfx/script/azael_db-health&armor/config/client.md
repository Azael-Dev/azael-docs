# client.config.lua

ไฟล์การกำหนดค่าของทรัพยากรทางฝั่ง **[Client](https://en.wikipedia.org/wiki/Client-side)**

## General

ทั่วไป

```lua title="บรรทัดที่ 11"
CONFIG.General = {} -- [[ table ]]
```

### Check.Time

เวลาในการตรวจสอบ **"พลังชีวิต"** และ **"เกราะ"** ตัวละคร ทุกๆ **X** วินาที

```lua title="บรรทัดที่ 13"
CONFIG.General.Check.Time = 2 -- [[ number ]]
```

:::info

`1` เท่ากับ `1` วินาที

:::

### Health.Recharge.Rate

อัตราการฟื้นฟู **"พลังชีวิต"** หากพลังชีวิตของตัวละครน้อยกว่า **50%**

```lua title="บรรทัดที่ 18"
CONFIG.General.Health.Recharge.Rate = 0.0 -- [[ number ]]
```

:::info

`0.0` เท่ากับ ปิดใช้งาน ดูรายละเอียดเพิ่มเติมได้ที่ FiveM Native: **[SET_PLAYER_HEALTH_RECHARGE_MULTIPLIER](https://docs.fivem.net/natives/?_0x5DB660B38DD98A31)**

:::

### Notify.Enable

เปิดใช้งานการแจ้งเตือนสถานะ **"พลังชีวิต"** และ **"เกราะ"** คงเหลือ ในขณะที่ผู้เล่นเข้าร่วมเซิร์ฟเวอร์

```lua title="บรรทัดที่ 23"
CONFIG.General.Notify.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

## Status

สถานะ **"พลังชีวิต"** และ **"เกราะ"**

```lua title="บรรทัดที่ 27"
CONFIG.Status = {} -- [[ table ]]
```

### Health.Enable

เปิดใช้งานบันทึก **"พลังชีวิต"** ไปยังฐานข้อมูล

```lua title="บรรทัดที่ 29"
CONFIG.Status.Health.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Health.Default

ค่าเริ่มต้นของสถานะ **"พลังชีวิต"** สำหรับการสร้างตัวละครในครั้งเเรก

```lua title="บรรทัดที่ 30"
CONFIG.Status.Health.Default = 200 -- [[ number ]]
```

:::caution

ห้ามกำหนดน้อยกว่า `100`

:::

### Health.Maximum

ค่าสูงสุดของสถานะ **"พลังชีวิต"**

```lua title="บรรทัดที่ 31"
CONFIG.Status.Health.Default = 200 -- [[ number ]]
```

:::caution

ห้ามกำหนดน้อยกว่า `200`

:::

### Armour.Enable

เปิดใช้งานบันทึก **"เกราะ"** ไปยังฐานข้อมูล

```lua title="บรรทัดที่ 35"
CONFIG.Status.Armour.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Armour.Default

ค่าเริ่มต้นของสถานะ **"เกราะ"** สำหรับการสร้างตัวละครในครั้งเเรก

```lua title="บรรทัดที่ 36"
CONFIG.Status.Armour.Default = 0 -- [[ number ]]
```

### Armour.Maximum

ค่าสูงสุดของสถานะ **"เกราะ"**

```lua title="บรรทัดที่ 37"
CONFIG.Status.Armour.Maximum = 100 -- [[ number ]]
```

## Notification (function)

แจ้งเตือนสถานะ **"พลังชีวิต"** และ **"เกราะ"** คงเหลือ ในขณะที่ผู้เล่นเข้าร่วมเซิร์ฟเวอร์

```lua title="บรรทัดที่ 49"
CONFIG.Notification = function(status)
    local pedId = PlayerPedId()
    
    if DoesEntityExist(pedId) then
        local mugshot = RegisterPedheadshot(pedId)

        while not IsPedheadshotReady(mugshot) do
            Citizen.Wait(100)
        end

        local mugshotStr = GetPedheadshotTxdString(mugshot)
        local message

        if status.health and status.armour then
            message = ('Your ~g~Health~s~ %s%s (%s)\nYour ~b~Armour~s~ %s%s (%s)'):format(status.health.percent, '%', status.health.value, status.armour.percent, '%', status.armour.value)
        elseif status.health then
            message = ('Your ~g~Health~s~ %s%s (%s)'):format(status.health.percent, '%', status.health.value)
        elseif status.armour then
            message = ('Your ~b~Armour~s~ %s%s (%s)'):format(status.armour.percent, '%', status.armour.value)
        end

        local playerId = PlayerId()
        local serverId = GetPlayerServerId(playerId)
        local playerName = GetPlayerName(playerId)

        AddTextEntry('playerNotification', message)
        BeginTextCommandThefeedPost('playerNotification')
        EndTextCommandThefeedPostMessagetext(mugshotStr, mugshotStr, false, 8, 'PLAYER INFO', ('%s #%s'):format(playerName, serverId))

        UnregisterPedheadshot(mugshot)
    end
end
```

### Parameter

| Name                         | Type               | Default                                | Description                                                
|------------------------------|--------------------|----------------------------------------|----------------------------------------------------------------------
| `status`                     | `table`            | `{ health, armour }`                   | ตารางข้อมูลสถานะ "พลังชีวิต" และ "เกราะ"
| `status.health`              | `table` / `nil`  | `{ value, percent }`                     | ตารางข้อมูลสถานะ "พลังชีวิต" หรือ ไม่มีค่า ([Health.Enable](#healthenable))
| `status.health.value`        | `number`           | Health Value                           | ค่าสถานะ "พลังชีวิต"
| `status.health.percent`      | `number`           | Health Percentage                      | เปอร์เซ็นต์สถานะ "พลังชีวิต"
| `status.armour`              | `table` / `nil`  | `{ value, percent }`                     | ตารางข้อมูลสถานะ "เกราะ" หรือ ไม่มีค่า ([Armour.Enable](#armourenable))
| `status.armour.value`        | `number`           | Armour Value                           | ค่าสถานะ "เกราะ"
| `status.armour.percent`      | `number`           | Armour Percentage                      | เปอร์เซ็นต์สถานะ "เกราะ"
