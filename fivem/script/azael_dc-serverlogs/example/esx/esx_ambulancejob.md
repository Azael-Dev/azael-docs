---
sidebar_label: esx_ambulancejob
---

# esx_ambulancejob

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx_ambulancejob](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_ambulancejob)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](./)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Server)

ไปยังโฟลเดอร์ **[server](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_ambulancejob/server)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_ambulancejob/server/main.lua)**

### หมอ-ชุบชีวิต

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `DocRevive`                            | หมอ-ชุบชีวิต

1. วางรหัสด้านล่างนี้ต่อจาก `xTarget.triggerEvent('esx_ambulancejob:revive')` บรรทัดที่ **[23](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_ambulancejob/server/main.lua#L23)**

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

2. วางรหัสด้านล่างนี้ต่อจาก `xTarget.triggerEvent('esx_ambulancejob:revive')` บรรทัดที่ **[26](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_ambulancejob/server/main.lua#L26)**

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

3. วางรหัสด้านล่างนี้ต่อจาก `end` บรรทัดที่ **[27](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_ambulancejob/server/main.lua#L27)**

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

4. วางรหัสด้านล่างนี้ต่อจาก `TriggerClientEvent('esx_ambulancejob:revive', eventData.id)` บรรทัดที่ **[50](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_ambulancejob/server/main.lua#L50)**

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

วางรหัสด้านล่างนี้ต่อจาก `TriggerClientEvent('esx_ambulancejob:heal', target, type)` บรรทัดที่ **[122](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_ambulancejob/server/main.lua#L122)**

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

1. วางรหัสด้านล่างนี้ต่อจาก `if Config.RemoveCashAfterRPDeath then` บรรทัดที่ **[143](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_ambulancejob/server/main.lua#L143)**

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

2. วางรหัสด้านล่างนี้ต่อจาก `if Config.RemoveItemsAfterRPDeath then` บรรทัดที่ **[153](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_ambulancejob/server/main.lua#L153)**

```lua
local content = 'เสียชีวิต ถูกลบ'
```

3. วางรหัสด้านล่างนี้ต่อจาก `xPlayer.setInventoryItem(xPlayer.inventory[i].name, 0)` บรรทัดที่ **[156](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_ambulancejob/server/main.lua#L156)**

```lua
content = ('%s %s x%s,'):format(content, ESX.GetItemLabel(xPlayer.inventory[i].name), xPlayer.inventory[i].count)
```

4. วางรหัสด้านล่างนี้ต่อจาก `end` บรรทัดที่ **[158](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_ambulancejob/server/main.lua#L158)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'DocRPDeathReItem',
        content = content,
        source = xPlayer.source,
        color = 3
    })
end)
```

5. วางรหัสด้านล่างนี้ต่อจาก `if Config.RemoveWeaponsAfterRPDeath then` บรรทัดที่ **[164](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_ambulancejob/server/main.lua#L164)**

```lua
local content = 'เสียชีวิต ถูกลบ'
```

6. วางรหัสด้านล่างนี้ต่อจาก `xPlayer.removeWeapon(xPlayer.loadout[i].name)` บรรทัดที่ **[166](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_ambulancejob/server/main.lua#L166)**

```lua
content = ('%s %s,'):format(content, ESX.GetWeaponLabel(xPlayer.loadout[i].name))
```

7. วางรหัสด้านล่างนี้ต่อจาก `end` บรรทัดที่ **[167](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_ambulancejob/server/main.lua#L167)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'DocRPDeathReWeapon',
        content = content,
        source = xPlayer.source,
        color = 3
    })
end)
```

### หมอ-ซื้อรถ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `DocBuyVehicle`                        | หมอ-ซื้อรถ

วางรหัสด้านล่างนี้ต่อจาก `function(rowsChanged)` บรรทัดที่ **[224](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_ambulancejob/server/main.lua#L224)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'DocBuyVehicle',
        content = ('ซื้อ ยานพาหนะ % ทะเบียน %s ราคา $%s'):format(vehicleProps.model, vehicleProps.plate, ESX.Math.GroupDigits(price)),
        source = xPlayer.source,
        color = 2
    })
end)
```

### หมอ-ใช้งานไอเทม

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `DocRemoveItem`                        | หมอ-ใช้งานไอเทม

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.removeInventoryItem(item, 1)` บรรทัดที่ **[268](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_ambulancejob/server/main.lua#L268)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'DocRemoveItem',
        content = ('ใช้งาน % จำนวน 1'):format(ESX.GetItemLabel(item)),
        source = xPlayer.source,
        color = 1
    })
end)
```

### หมอ-เบิกไอเทม

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `DocGiveItem`                          | หมอ-เบิกไอเทม

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addInventoryItem(itemName, amount)` บรรทัดที่ **[290](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_ambulancejob/server/main.lua#L290)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'DocGiveItem',
        content = ('เบิก % จำนวน %s'):format(ESX.GetItemLabel(itemName), amount),
        source = xPlayer.source,
        color = 2
    })
end)
```

### ใช้คำสั่ง-ชุบชีวิต

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `DocReviveCommands`                    | ใช้คำสั่ง-ชุบชีวิต

1. วางรหัสด้านล่างนี้ต่อจาก `args.playerId.triggerEvent('esx_ambulancejob:revive')` บรรทัดที่ **[297](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_ambulancejob/server/main.lua#L297)**

```lua
pcall(function()
    if xPlayer.source == args.playerId.source then
        exports['azael_dc-serverlogs']:insertData({
            event = 'DocRevive',
            content = 'ใช้งานคำสั่ง /revive ตนเอง',
            source = xPlayer.source,
            color = 2
        })
    else
        exports['azael_dc-serverlogs']:insertData({
            event = 'DocRevive',
            content = ('ใช้งานคำสั่ง /revive ไปยัง %s'):format(args.playerId.name),
            source = xPlayer.source,
            color = 3
        })

        exports['azael_dc-serverlogs']:insertData({
            event = 'DocRevive',
            content = ('ถูก /revive โดย %s'):format(xPlayer.name),
            source = args.playerId.source,
            color = 2
        })
    end
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `TriggerClientEvent('esx_ambulancejob:revive', -1)` บรรทัดที่ **[303](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_ambulancejob/server/main.lua#L303)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'DocRevive',
        content = 'ใช้งานคำสั่ง /reviveall ไปยังผู้เล่นทั้งหมด',
        source = xPlayer.source,
        color = 9
    })
end)
```
