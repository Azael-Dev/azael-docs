---
sidebar_label: esx_giveallplayers
---

# esx_giveallplayers

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx_giveallplayers](https://github.com/minobear/esx_giveallplayers/tree/master/esx_giveallplayers)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## server.lua (Server)

ไปยังโฟลเดอร์ **[server](https://github.com/minobear/esx_giveallplayers/tree/master/esx_giveallplayers/server)** แล้วดำเนินการเปิดไฟล์ **[server.lua](https://github.com/minobear/esx_giveallplayers/blob/master/esx_giveallplayers/server/server.lua)**

### ระบบ-แจกไอเทม

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `TimeGiveItemAll`                      | ระบบ-แจกไอเทม

1. วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addInventoryItem(Config.Items[ranItem].name, Config.Items[ranItem].count)` บรรทัดที่ **[23](https://github.com/minobear/esx_giveallplayers/blob/master/esx_giveallplayers/server/server.lua#L23)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'TimeGiveItemAll ',
        content = ('ได้รับ %s จำนวน %s'):format(ESX.GetItemLabel(Config.Items[ranItem].name), Config.Items[ranItem].count),
        source = xPlayer.source,
        color = 2
    })
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addInventoryItem(Config.Items[i].name, Config.Items[i].count)` บรรทัดที่ **[27](https://github.com/minobear/esx_giveallplayers/blob/master/esx_giveallplayers/server/server.lua#L27)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'TimeGiveItemAll ',
        content = ('ได้รับ %s จำนวน %s'):format(ESX.GetItemLabel(Config.Items[i].name), Config.Items[i].count),
        source = xPlayer.source,
        color = 2
    })
end)
```

### ระบบ-แจกเงิน

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `TimeGiveMoneyAll`                     | ระบบ-แจกเงิน

1. วางรหัสด้านล่างนี้ต่อจาก `end` บรรทัดที่ **[50](https://github.com/minobear/esx_giveallplayers/blob/master/esx_giveallplayers/server/server.lua#L50)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'TimeGiveMoneyAll ',
        content = ('ได้รับ %s จำนวน $%s'):format(Config.Money[ranMoney].account, ESX.Math.GroupDigits(Config.Money[ranMoney].amount)),
        source = xPlayer.source,
        color = 2
    })
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `end` บรรทัดที่ **[62](https://github.com/minobear/esx_giveallplayers/blob/master/esx_giveallplayers/server/server.lua#L62)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'TimeGiveMoneyAll ',
        content = ('ได้รับ %s จำนวน $%s'):format(Config.Money[i].account, ESX.Math.GroupDigits(Config.Money[i].amount)),
        source = xPlayer.source,
        color = 2
    })
end)
```

### ระบบ-แจกอาวุธ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `TimeGiveWeaponAll`                    | ระบบ-แจกอาวุธ

1. วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addWeapon(Config.Weapon[ranWeapon].weaponName, Config.Weapon[ranWeapon].amount)` บรรทัดที่ **[75](https://github.com/minobear/esx_giveallplayers/blob/master/esx_giveallplayers/server/server.lua#L75)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'TimeGiveWeaponAll ',
        content = ('ได้รับ %s และ กระสุน จำนวน %s'):format(ESX.GetWeaponLabel(Config.Weapon[ranWeapon].weaponName), Config.Weapon[ranWeapon].amount),
        source = xPlayer.source,
        color = 2
    })
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addWeapon(Config.Weapon[i].weaponName, Config.Weapon[i].amount)` บรรทัดที่ **[79](https://github.com/minobear/esx_giveallplayers/blob/master/esx_giveallplayers/server/server.lua#L79)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'TimeGiveWeaponAll ',
        content = ('ได้รับ %s และ กระสุน จำนวน %s'):format(ESX.GetWeaponLabel(Config.Weapon[i].weaponName), Config.Weapon[i].amount),
        source = xPlayer.source,
        color = 2
    })
end)
```

### แอดมิน-แจกไอเทม

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `AdminGiveItemAll`                     | แอดมิน-แจกไอเทม

1. วางรหัสด้านล่างนี้ต่อจาก `local count   = (args[2] == nil and 1 or tonumber(args[2]))` บรรทัดที่ **[93](https://github.com/minobear/esx_giveallplayers/blob/master/esx_giveallplayers/server/server.lua#L93)**

```lua
pcall(function()
    if ESX.GetItemLabel(item) then
        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminGiveItemAll ',
            content = ('ใช้คำสั่งแจก %s จำนวน %s ให้กับผู้เล่นทั้งหมดที่ออนไลน์'):format(ESX.GetItemLabel(item), count),
            source = _source,
            color = 3
        })
    end
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addInventoryItem(item, count)` บรรทัดที่ **[99](https://github.com/minobear/esx_giveallplayers/blob/master/esx_giveallplayers/server/server.lua#L99)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'AdminGiveItemAll ',
        content = ('ได้รับ %s จำนวน %s'):format(ESX.GetItemLabel(item), count),
        source = xPlayer.source,
        color = 2
    })
end)
```

3. วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addInventoryItem(item, count)` บรรทัดที่ **[123](https://github.com/minobear/esx_giveallplayers/blob/master/esx_giveallplayers/server/server.lua#L123)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'AdminGiveItemAll ',
        content = ('ได้รับ %s จำนวน %s (Admin ใช้คำสั่งผ่าน Server Console)'):format(ESX.GetItemLabel(item), count),
        source = xPlayer.source,
        color = 2
    })
end)
```

### แอดมิน-แจกอาวุธ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `AdminGiveWeaponAll`                   | แอดมิน-แจกอาวุธ

1. วางรหัสด้านล่างนี้ต่อจาก `local amount = (args[2] == nil and 1 or tonumber(args[2]))` บรรทัดที่ **[140](https://github.com/minobear/esx_giveallplayers/blob/master/esx_giveallplayers/server/server.lua#L140)**

```lua
pcall(function()
    if ESX.GetWeaponLabel(weaponName) then
        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminGiveWeaponAll ',
            content = ('ใช้คำสั่งแจก %s และ กระสุน จำนวน %s ให้กับผู้เล่นทั้งหมดที่ออนไลน์'):format(ESX.GetWeaponLabel(weaponName), amount),
            source = _source,
            color = 3
        })
    end
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addWeapon(weaponName, amount)` บรรทัดที่ **[146](https://github.com/minobear/esx_giveallplayers/blob/master/esx_giveallplayers/server/server.lua#L146)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'AdminGiveWeaponAll ',
        content = ('ได้รับ %s และ กระสุน จำนวน %s'):format(ESX.GetWeaponLabel(weaponName), amount),
        source = xPlayer.source,
        color = 2
    })
end)
```

3. วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addWeapon(weaponName, amount)` บรรทัดที่ **[170](https://github.com/minobear/esx_giveallplayers/blob/master/esx_giveallplayers/server/server.lua#L170)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'AdminGiveWeaponAll ',
        content = ('ได้รับ %s และ กระสุน จำนวน %s (Admin ใช้คำสั่งผ่าน Server Console)'):format(ESX.GetWeaponLabel(weaponName), amount),
        source = xPlayer.source,
        color = 2
    })
end)
```

### แอดมิน-แจกเงิน

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `AdminGiveMoneyAll`                   | แอดมิน-แจกเงิน

1. วางรหัสด้านล่างนี้ต่อจาก `local amount  = tonumber(args[2])` บรรทัดที่ **[187](https://github.com/minobear/esx_giveallplayers/blob/master/esx_giveallplayers/server/server.lua#L187)**

```lua
pcall(function()
    if amount and account == "money" or account == 'bank' or account == 'black_money' then
        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminGiveMoneyAll ',
            content = ('ใช้คำสั่งแจก %s จำนวน $%s ให้กับผู้เล่นทั้งหมดที่ออนไลน์'):format(account, ESX.Math.GroupDigits(amount)),
            source = _source,
            color = 3
        })
    end
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `end` บรรทัดที่ **[204](https://github.com/minobear/esx_giveallplayers/blob/master/esx_giveallplayers/server/server.lua#L204)**

```lua
pcall(function()
    if account == "money" or account == 'bank' or account == 'black_money' then
        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminGiveMoneyAll ',
            content = ('ได้รับ %s จำนวน $%s'):format(account, ESX.Math.GroupDigits(amount)),
            source = xPlayer.source,
            color = 2
        })
    end
end)
```

3. วางรหัสด้านล่างนี้ต่อจาก `end` บรรทัดที่ **[241](https://github.com/minobear/esx_giveallplayers/blob/master/esx_giveallplayers/server/server.lua#L241)**

```lua
pcall(function()
    if account == "money" or account == 'bank' or account == 'black_money' then
        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminGiveMoneyAll ',
            content = ('ได้รับ %s จำนวน $%s (Admin ใช้คำสั่งผ่าน Server Console)'):format(account, ESX.Math.GroupDigits(amount)),
            source = xPlayer.source,
            color = 2
        })
    end
end)
```
