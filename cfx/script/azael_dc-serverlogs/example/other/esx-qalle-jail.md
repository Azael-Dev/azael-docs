---
sidebar_label: esx-qalle-jail
---

# esx-qalle-jail

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx-qalle-jail](https://github.com/qalle-git/esx-qalle-jail)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../index.md)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../index.md)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## server.lua (Server)

ไปยังโฟลเดอร์ **[server](https://github.com/qalle-git/esx-qalle-jail/tree/master/server)** แล้วดำเนินการเปิดไฟล์ **[server.lua](https://github.com/qalle-git/esx-qalle-jail/blob/master/server/server.lua)**

### เข้า-เรือนจำ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `JailPlayer`                           | เข้า-เรือนจำ

1. วางรหัสด้านล่างนี้ต่อจาก `JailPlayer(jailPlayer, jailTime)` บรรทัดที่ **[18](https://github.com/qalle-git/esx-qalle-jail/blob/master/server/server.lua#L18)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'JailPlayer',
        content = ('ส่ง %s ไปยัง เรือนจำ เป็นเวลา %s นาที ในข้อหา %s'):format(GetPlayerName(tonumber(jailPlayer)), jailTime, (jailReason or 'ไม่ระบุ')),
        source = xPlayer.source,
        color = 5
    })

    exports['azael_dc-serverlogs']:insertData({
        event = 'JailPlayer',
        content = ('ถูก %s ส่งตัวไปยัง เรือนจำ เป็นเวลา %s นาที ในข้อหา %s'):format(xPlayer.name, jailTime, (jailReason or 'ไม่ระบุ')),
        source = tonumber(jailPlayer),
        color = 1
    })
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `JailPlayer(targetSrc, jailTime)` บรรทัดที่ **[63](https://github.com/qalle-git/esx-qalle-jail/blob/master/server/server.lua#L63)**

```lua
local xTarget = ESX.GetPlayerFromId(targetSrc)

pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'JailPlayer',
        content = ('ส่ง %s ไปยัง เรือนจำ เป็นเวลา %s นาที ในข้อหา %s'):format(xTarget.name, jailTime, jailReason),
        source = xPlayer.source,
        color = 5
    })

    exports['azael_dc-serverlogs']:insertData({
        event = 'JailPlayer',
        content = ('ถูก %s ส่งตัวไปยัง เรือนจำ เป็นเวลา %s นาที ในข้อหา %s'):format(xPlayer.name, jailTime, jailReason),
        source = xTarget.source,
        color = 1
    })
end)
```

### ออก-เรือนจำ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `UnjailPlayer`                         | ออก-เรือนจำ

1. วางรหัสด้านล่างนี้ต่อจาก `UnJail(jailPlayer)` บรรทัดที่ **[47](https://github.com/qalle-git/esx-qalle-jail/blob/master/server/server.lua#L47)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'UnjailPlayer',
        content = ('ปล่อยตัว %s ออกจากเรือนจำ'):format(GetPlayerName(tonumber(jailPlayer))),
        source = xPlayer.source,
        color = 5
    })

    exports['azael_dc-serverlogs']:insertData({
        event = 'UnjailPlayer',
        content = ('ถูก %s ปล่อยตัวออกจากเรือนจำ'):format(xPlayer.name),
        source = tonumber(jailPlayer),
        color = 2
    })
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `UnJail(xPlayer.source)` บรรทัดที่ **[81](https://github.com/qalle-git/esx-qalle-jail/blob/master/server/server.lua#L81)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'UnjailPlayer',
        content = 'ถูกปล่อยตัวจาก เรือนจำ',
        source = xPlayer.source,
        color = 2
    })
end)
```

3. วางรหัสด้านล่างนี้ต่อจาก `EditJailTime(src, newJailTime)` บรรทัดที่ **[99](https://github.com/qalle-git/esx-qalle-jail/blob/master/server/server.lua#L99)**

```lua
if newJailTime == 0 then
	pcall(function()
		exports['azael_dc-serverlogs']:insertData({
			event = 'UnjailPlayer',
			content = 'ถูกปล่อยตัวจาก เรือนจำ',
			source = src,
			color = 2
		})
	end)
end
```

### งาน-เรือนจำ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `PrisonWorkReward`                     | งาน-เรือนจำ

1. วางรหัสด้านล่างนี้ต่อจาก `local xPlayer = ESX.GetPlayerFromId(src)` บรรทัดที่ **[106](https://github.com/qalle-git/esx-qalle-jail/blob/master/server/server.lua#L106)**

```lua
local reward = math.random(13, 21)
```

2. ดำเนินการแก้ไข `xPlayer.addMoney(math.random(13, 21))` เป็นรหัสด้านล่างนี้

```lua
xPlayer.addMoney(reward)
```

3. วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addMoney(reward)` บรรทัดที่ **[108](https://github.com/qalle-git/esx-qalle-jail/blob/master/server/server.lua#L108)**

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'PrisonWorkReward',
		content = ('ได้รับ Cash จำนวน $%s'):format(reward),
		source = netId,
		color = 2
	})
end)
```
