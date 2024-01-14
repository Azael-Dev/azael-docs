---
sidebar_label: esx_ambulancejob
---

# esx_ambulancejob

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx_ambulancejob](https://github.com/esx-framework/esx_ambulancejob)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../index.md)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../index.md)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Server)

ไปยังโฟลเดอร์ **[server](https://github.com/esx-framework/esx_ambulancejob/tree/main/server)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/esx-framework/esx_ambulancejob/blob/main/server/main.lua)**

### หมอ-ชุบชีวิต

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `DocRevive`                            | หมอ-ชุบชีวิต

1. วางรหัสด้านล่างนี้ต่อจาก `isDeadState(xTarget.source, false)` บรรทัดที่ **[31](https://github.com/esx-framework/esx_ambulancejob/blob/main/server/main.lua#L31)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'DocRevive',
        content = ('ชุบชีวิต %s ได้รับ Cash จำนวน $%s'):format(xTarget.name, ESX.Math.GroupDigits(Config.ReviveReward)),
        source = xPlayer.source,
        color = 9
    })
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `isDeadState(xTarget.source, false)` บรรทัดที่ **[35](https://github.com/esx-framework/esx_ambulancejob/blob/main/server/main.lua#L35)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'DocRevive',
        content = ('ชุบชีวิต %s'):format(xTarget.name),
        source = xPlayer.source,
        color = 9
    })
end)
```

3. วางรหัสด้านล่างนี้ต่อจาก `deadPlayers[playerId] = nil` บรรทัดที่ **[44](https://github.com/esx-framework/esx_ambulancejob/blob/main/server/main.lua#L44)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'DocRevive',
        content = ('ถูกชุบชีวิต โดย %s'):format(xPlayer.name),
        source = xTarget.source,
        color = 2
    })
end)
```

4. วางรหัสด้านล่างนี้ต่อจาก `deadPlayers[eventData.id] = nil` บรรทัดที่ **[67](https://github.com/esx-framework/esx_ambulancejob/blob/main/server/main.lua#L67)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'DocRevive',
        content = 'ถูกชุบชีวิต โดย txAdmin',
        source = eventData.id,
        color = 2
    })
end)
```

### หมอ-รักษา

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `DocHeal`                              | หมอ-รักษา

วางรหัสด้านล่างนี้ต่อจาก `TriggerClientEvent('esx_ambulancejob:heal', target, type)` บรรทัดที่ **[137](https://github.com/esx-framework/esx_ambulancejob/blob/main/server/main.lua#L137)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'DocHeal',
        content = ('ทำการรักษา %s โดย %s'):format(GetPlayerName(target), type),
        source = xPlayer.source,
        color = 9
    })

    exports['azael_dc-serverlogs']:insertData({
        event = 'DocHeal',
        content = ('ได้รับการรักษา จาก %s โดย %s'):format(xPlayer.name, type),
        source = target,
        color = 2
    })
end)
```

### เสียชีวิต-ลบสิ่งของ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `DocRPDeathReMoney`                    | เสียชีวิต-ลบเงิน
| `DocRPDeathReItem`                     | เสียชีวิต-ลบไอเทม
| `DocRPDeathReWeapon`                   | เสียชีวิต-ลบอาวุธ

1. วางรหัสด้านล่างนี้ต่อจาก `if Config.RemoveCashAfterRPDeath then` บรรทัดที่ **[158](https://github.com/esx-framework/esx_ambulancejob/blob/main/server/main.lua#L158)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'DocRPDeathReMoney',
        content = ('เสียชีวิต ถูกลบ Cash จำนวน $%s เเละ Dirty Money จำนวน $%s'):format(ESX.Math.GroupDigits(xPlayer.getMoney()), ESX.Math.GroupDigits(xPlayer.getAccount('black_money').money)),
        source = xPlayer.source,
        color = 3
    })
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `if Config.RemoveItemsAfterRPDeath then` บรรทัดที่ **[168](https://github.com/esx-framework/esx_ambulancejob/blob/main/server/main.lua#L168)**

```lua
local content = ''
```

3. วางรหัสด้านล่างนี้ต่อจาก `xPlayer.setInventoryItem(xPlayer.inventory[i].name, 0)` บรรทัดที่ **[171](https://github.com/esx-framework/esx_ambulancejob/blob/main/server/main.lua#L171)**

```lua
content = ('%s %s x%s,'):format(content, ESX.GetItemLabel(xPlayer.inventory[i].name), xPlayer.inventory[i].count)
```

4. วางรหัสด้านล่างนี้ต่อจาก `end` บรรทัดที่ **[173](https://github.com/esx-framework/esx_ambulancejob/blob/main/server/main.lua#L173)**

```lua
if content ~= '' then
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'DocRPDeathReItem',
            content = ('เสียชีวิต ถูกลบ %s'):format(content),
            source = xPlayer.source,
            color = 3
        })
    end)
end
```

5. วางรหัสด้านล่างนี้ต่อจาก `if Config.RemoveWeaponsAfterRPDeath then` บรรทัดที่ **[179](https://github.com/esx-framework/esx_ambulancejob/blob/main/server/main.lua#L179)**

```lua
local content = ''
```

6. วางรหัสด้านล่างนี้ต่อจาก `xPlayer.removeWeapon(xPlayer.loadout[i].name)` บรรทัดที่ **[181](https://github.com/esx-framework/esx_ambulancejob/blob/main/server/main.lua#L181)**

```lua
content = ('%s %s,'):format(content, ESX.GetWeaponLabel(xPlayer.loadout[i].name))
```

7. วางรหัสด้านล่างนี้ต่อจาก `end` บรรทัดที่ **[182](https://github.com/esx-framework/esx_ambulancejob/blob/main/server/main.lua#L182)**

```lua
if content ~= '' then
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'DocRPDeathReWeapon',
            content = ('เสียชีวิต ถูกลบ %s'):format(content),
            source = xPlayer.source,
            color = 3
        })
    end)
end
```

### หมอ-ซื้อรถ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `DocBuyVehicle`                        | หมอ-ซื้อรถ

วางรหัสด้านล่างนี้ต่อจาก `function(rowsChanged)` บรรทัดที่ **[240](https://github.com/esx-framework/esx_ambulancejob/blob/main/server/main.lua#L240)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'DocBuyVehicle',
        content = ('ซื้อ ยานพาหนะ %s ทะเบียน %s ราคา $%s'):format(vehicleProps.model, vehicleProps.plate, ESX.Math.GroupDigits(price)),
        source = xPlayer.source,
        color = 2
    })
end)
```

### หมอ-ใช้งานไอเทม

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `DocRemoveItem`                        | หมอ-ใช้งานไอเทม

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.removeInventoryItem(item, 1)` บรรทัดที่ **[286](https://github.com/esx-framework/esx_ambulancejob/blob/main/server/main.lua#L286)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'DocRemoveItem',
        content = ('ใช้งาน %s จำนวน 1'):format(ESX.GetItemLabel(item)),
        source = xPlayer.source,
        color = 1
    })
end)
```

### หมอ-เบิกไอเทม

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `DocGiveItem`                          | หมอ-เบิกไอเทม

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addInventoryItem(itemName, amount)` บรรทัดที่ **[308](https://github.com/esx-framework/esx_ambulancejob/blob/main/server/main.lua#L308)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'DocGiveItem',
        content = ('เบิก %s จำนวน %s'):format(ESX.GetItemLabel(itemName), amount),
        source = xPlayer.source,
        color = 2
    })
end)
```

### ใช้คำสั่ง-ชุบชีวิต

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `ReviveCommands`                    | ใช้คำสั่ง-ชุบชีวิต

1. วางรหัสด้านล่างนี้ต่อจาก `args.playerId.triggerEvent('esx_ambulancejob:revive')` บรรทัดที่ **[315](https://github.com/esx-framework/esx_ambulancejob/blob/main/server/main.lua#L315)**

```lua
pcall(function()
    if xPlayer.source == args.playerId.source then
        exports['azael_dc-serverlogs']:insertData({
            event = 'ReviveCommands',
            content = 'ใช้งานคำสั่ง /revive ตนเอง',
            source = xPlayer.source,
            color = 2
        })
    else
        exports['azael_dc-serverlogs']:insertData({
            event = 'ReviveCommands',
            content = ('ใช้งานคำสั่ง /revive ไปยัง %s'):format(args.playerId.name),
            source = xPlayer.source,
            color = 3
        })

        exports['azael_dc-serverlogs']:insertData({
            event = 'ReviveCommands',
            content = ('ถูก /revive โดย %s'):format(xPlayer.name),
            source = args.playerId.source,
            color = 2
        })
    end
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `TriggerClientEvent('esx_ambulancejob:revive', -1)` บรรทัดที่ **[321](https://github.com/esx-framework/esx_ambulancejob/blob/main/server/main.lua#L321)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'ReviveCommands',
        content = 'ใช้งานคำสั่ง /reviveall ไปยังผู้เล่นทั้งหมด',
        source = xPlayer.source,
        color = 9
    })
end)
```
