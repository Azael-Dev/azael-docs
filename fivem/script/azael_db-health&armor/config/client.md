---
sidebar_position: 2
---

# client.config.lua

## General

ทั่วไป

```lua
CONFIG.General = {} -- [[ table ]]
```

### Check.Time

เวลาในการตรวจสอบ **"พลังชีวิต"** และ **"เกราะ"** ตัวละคร ทุกๆ **X** วินาที

```lua
CONFIG.General.Check.Time = 2 -- [[ number ]]
```

:::info

`1` เท่ากับ `1` วินาที

:::

### Health.Recharge.Rate

อัตราการฟื้นฟู **"พลังชีวิต"** หากพลังชีวิตของตัวละครน้อยกว่า **50%**

```lua
CONFIG.General.Health.Recharge.Rate = 0.0 -- [[ integer ]]
```

:::info

`0.0` เท่ากับ ปิดใช้งาน ดูรายละเอียดเพิ่มเติมได้ที่ FiveM Native: **[SET_PLAYER_HEALTH_RECHARGE_MULTIPLIER](https://docs.fivem.net/natives/?_0x5DB660B38DD98A31)**

:::

### Notify.Enable

เปิดใช้งานการแจ้งเตือนสถานะ **"พลังชีวิต"** และ **"เกราะ"** คงเหลือ ในขณะที่ผู้เล่นเข้าร่วมเซิร์ฟเวอร์

```lua
CONFIG.General.Notify.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Debug.Enable

เปิดใช้งานแสดง Debug ไปยัง Client Console (F8)

```lua
CONFIG.General.Debug.Enable = false -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

## Status

สถานะ **[esx_status](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_status)**

```lua
CONFIG.Status = {} -- [[ table ]]
```

### Health.Enable

เปิดใช้งานบันทึก **"พลังชีวิต"** ไปยังฐานข้อมูล **[esx_status](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_status)**

```lua
CONFIG.Status.Health.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Health.Name

ชื่อของสถานะ **"พลังชีวิต"**

```lua
CONFIG.Status.Health.Name = 'health' -- [[ string ]]
```

### Health.Color

สีของสถานะ **"พลังชีวิต"**

```lua
CONFIG.Status.Health.Color = '#F4003E' -- [[ string ]]
```

:::info

รหัสสีเลขฐานสิบหก (**[Hex Color](https://htmlcolorcodes.com/)**)

:::

### Health.Default

ค่าเริ่มต้นของสถานะ **"พลังชีวิต"** สำหรับการสร้างตัวละครในครั้งเเรก

```lua
CONFIG.Status.Health.Default = 200 -- [[ number ]]
```

:::caution

ห้ามกำหนดน้อยกว่า `100`

:::

### Health.Maximum

ค่าสูงสุดของสถานะ **"พลังชีวิต"**

```lua
CONFIG.Status.Health.Default = 200 -- [[ number ]]
```

:::caution

ห้ามกำหนดน้อยกว่า `200`

:::

### Armour.Enable

เปิดใช้งานบันทึก **"เกราะ"** ไปยังฐานข้อมูล **[esx_status](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_status)**

```lua
CONFIG.Status.Armour.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Armour.Name

ชื่อของสถานะ **"เกราะ"**

```lua
CONFIG.Status.Armour.Name = 'armor' -- [[ string ]]
```

### Armour.Color

สีของสถานะ **"เกราะ"**

```lua
CONFIG.Status.Armour.Color = '#00CC99' -- [[ string ]]
```

:::info

รหัสสีเลขฐานสิบหก (**[Hex Color](https://htmlcolorcodes.com/)**)

:::

### Armour.Default

ค่าเริ่มต้นของสถานะ **"เกราะ"** สำหรับการสร้างตัวละครในครั้งเเรก

```lua
CONFIG.Status.Armour.Default = 0 -- [[ number ]]
```

### Armour.Maximum

ค่าสูงสุดของสถานะ **"เกราะ"**

```lua
CONFIG.Status.Armour.Maximum = 100 -- [[ number ]]
```

## Notification (function)

แจ้งเตือนสถานะ "พลังชีวิต" และ "เกราะ" คงเหลือ ในขณะที่ผู้เล่นเข้าร่วมเซิร์ฟเวอร์

```lua
CONFIG.Notification = function(status)
    local playerId = PlayerId()
    local serverId = GetPlayerServerId(playerId)
    local playerName = GetPlayerName(playerId)
    local mugshot, mugshotStr = ESX.Game.GetPedMugshot(PlayerPedId())
    local message
    
    if status.health and status.armour then
        message = ('Your ~g~Health~s~ %s%s (%s)\nYour ~b~Armor~s~ %s%s (%s)'):format(status.health.percent, '%', status.health.value, status.armour.percent, '%', status.armour.value)
    elseif status.health then
        message = ('Your ~g~Health~s~ %s%s (%s)'):format(status.health.percent, '%', status.health.value)
    elseif status.armour then
        message = ('Your ~b~Armor~s~ %s%s (%s)'):format(status.armour.percent, '%', status.armour.value)
    end

    ESX.ShowAdvancedNotification('PLAYER INFO', ('%s #%s'):format(playerName, serverId), message, mugshotStr, 8)
    
    UnregisterPedheadshot(mugshot)
end
```

### Parameters

| Name                         | Type               | Value              | Explanation                                                
|------------------------------|--------------------|--------------------|--------------------------------------------------
| status                       | table              | -                  | ตารางข้อมูลสถานะ "พลังชีวิต" และ "เกราะ"
| status.health                | table              | table หรือ nil      | ตารางข้อมูลสถานะ "พลังชีวิต"
| status.health.value          | number             | -                  | ค่าสถานะ "พลังชีวิต"|
| status.health.percent        | integer            | -                  | เปอร์เซ็นต์สถานะ "พลังชีวิต"
| status.armour                | table              | table หรือ nil      | ตารางข้อมูลสถานะ "เกราะ"
| status.armour.value          | number             | -                  | ค่าสถานะ "เกราะ"
| status.armour.percent        | integer            | -                  | เปอร์เซ็นต์สถานะ "เกราะ"
