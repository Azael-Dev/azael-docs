---
sidebar_label: esx_policejob
---

# esx_policejob

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx_policejob](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_policejob)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Server)

ไปยังโฟลเดอร์ **[server](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_policejob/server)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_policejob/server/main.lua)**

### ตำรวจ-ยึด (ไอเทม, เงิน, อาวุธ)

:::note

ไม่ต้องดำเนินการในส่วนนี้ หากคุณใช้งาน **[nc_inventory](../other/nc_inventory)** หรือ **[esx_inventoryhud](../other/esx_inventoryhud)**

:::

<Tabs>
<TabItem value="item" label="ไอเทม">

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `PoliceTakeItem`                       | ตำรวจ-ยึด-ไอเทม

วางรหัสด้านล่างนี้ต่อจาก `sourceXPlayer.addInventoryItem(itemName, amount)` บรรทัดที่ **[31](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_policejob/server/main.lua#L31)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'PoliceTakeItem',
        content = ('ยึด %s จำนวน %s จาก %s'):format(sourceItem.label, amount, targetXPlayer.name),
        source = sourceXPlayer.source,
        color = 2,
        options = {
            important = (amount >= 500 and true)
        }
    })

    exports['azael_dc-serverlogs']:insertData({
        event = 'PoliceTakeItem',
        content = ('ถูกยึด %s จำนวน %s โดย %s'):format(sourceItem.label, amount, sourceXPlayer.name),
        source = targetXPlayer.source,
        color = 3,
        options = {
            important = (amount >= 500 and true)
        }
    })
end)
```

</TabItem>
<TabItem value="account" label="เงิน">

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `PoliceTakeMoney`                      | ตำรวจ-ยึด-เงิน

วางรหัสด้านล่างนี้ต่อจาก `sourceXPlayer.addAccountMoney(itemName, amount, "Confiscated")` บรรทัดที่ **[47](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_policejob/server/main.lua#L47)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'PoliceTakeMoney',
        content = ('ยึด %s จำนวน $%s จาก %s'):format(itemName, ESX.Math.GroupDigits(amount), targetXPlayer.name),
        source = sourceXPlayer.source,
        color = 2,
        options = {
            important = (amount >= 100000 and true)
        }
    })

    exports['azael_dc-serverlogs']:insertData({
        event = 'PoliceTakeMoney',
        content = ('ถูกยึด %s จำนวน $%s โดย %s'):format(itemName, ESX.Math.GroupDigits(amount), sourceXPlayer.name),
        source = targetXPlayer.source,
        color = 3,
        options = {
            important = (amount >= 100000 and true)
        }
    })
end)
```

</TabItem>
<TabItem value="weapon" label="อาวุธ">

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `PoliceTakeWeapon`                     | ตำรวจ-ยึด-อาวุธ

วางรหัสด้านล่างนี้ต่อจาก `sourceXPlayer.addWeapon(itemName, amount)` บรรทัดที่ **[61](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_policejob/server/main.lua#L61)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'PoliceTakeWeapon',
        content = ('ยึด %s จำนวน 1 จาก %s'):format(ESX.GetWeaponLabel(itemName), targetXPlayer.name),
        source = sourceXPlayer.source,
        color = 2
    })

    exports['azael_dc-serverlogs']:insertData({
        event = 'PoliceTakeWeapon',
        content = ('ถูกยึด %s จำนวน 1 โดย %s'):format(ESX.GetWeaponLabel(itemName), sourceXPlayer.name),
        source = targetXPlayer.source,
        color = 3
    })
end)
```

</TabItem>
</Tabs>

### ตำรวจ-ไอเทม-ออกจากคลัง

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `PoliceGetStockItem`                   | ตำรวจ-ไอเทม-ออกจากคลัง

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addInventoryItem(itemName, count)` บรรทัดที่ **[129](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_policejob/server/main.lua#L129)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'PoliceGetStockItem',
        content = ('นำ %s จำนวน %s ออกจากคลัง'):format(inventoryItem.label, count),
        source = xPlayer.source,
        color = 1,
        options = {
            important = (count >= 500 and true or count < 0 and true)
        }
    })
end)
```

### ตำรวจ-ไอเทม-เก็บเข้าคลัง

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `PolicePutStockItem`                   | ตำรวจ-ไอเทม-เก็บเข้าคลัง

วางรหัสด้านล่างนี้ต่อจาก `inventory.addItem(itemName, count)` บรรทัดที่ **[151](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_policejob/server/main.lua#L151)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'PolicePutStockItem',
        content = ('นำ %s จำนวน %s เก็บเข้าคลัง'):format(inventoryItem.label, count),
        source = xPlayer.source,
        color = 2,
        options = {
            important = (count >= 500 and true or count < 0 and true)
        }
    })
end)
```

### ตำรวจ-อาวุธ-เก็บเข้าคลัง

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `PolicePutArmoryWeapon`                | ตำรวจ-อาวุธ-เก็บเข้าคลัง

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.removeWeapon(weaponName)` บรรทัดที่ **[249](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_policejob/server/main.lua#L249)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'PolicePutArmoryWeapon',
        content = ('นำ %s จำนวน 1 เก็บเข้าคลัง'):format(ESX.GetWeaponLabel(weaponName)),
        source = xPlayer.source,
        color = 2
    })
end)
```

### ตำรวจ-อาวุธ-ออกจากคลัง

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `PoliceGetArmoryWeapon`                | ตำรวจ-อาวุธ-ออกจากคลัง

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addWeapon(weaponName, 500)` บรรทัดที่ **[278](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_policejob/server/main.lua#L278)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'PoliceGetArmoryWeapon',
        content = ('นำ %s และ กระสุน จำนวน 500 ออกจากคลัง'):format(ESX.GetWeaponLabel(weaponName)),
        source = xPlayer.source,
        color = 1
    })
end)
```

### ตำรวจ-ซื้ออาวุธ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `PoliceBuyWeapon`                      | ตำรวจ-ซื้ออาวุธ

1. วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addWeapon(weaponName, 100)` บรรทัดที่ **[324](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_policejob/server/main.lua#L324)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'PoliceBuyWeapon',
        content = ('ซื้อ %s และ กระสุน จำนวน 100 ราคา $%s'):format(ESX.GetWeaponLabel(weaponName), ESX.Math.GroupDigits(selectedWeapon.price)),
        source = xPlayer.source,
        color = 2
    })
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addWeaponComponent(weaponName, component.name)` บรรทัดที่ **[340](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_policejob/server/main.lua#L340)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'PoliceBuyWeapon',
        content = ('ซื้อ %s ส่วนประกอบของอาวุธ %s ราคา $%s'):format(component.label, ESX.GetWeaponLabel(weaponName), ESX.Math.GroupDigits(price)),
        source = xPlayer.source,
        color = 5
    })
end)
```

### ตำรวจ-ซื้อรถ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `PoliceBuyVehicle`                     | ตำรวจ-ซื้อรถ

วางรหัสด้านล่างนี้ต่อจาก `function(rowsChanged)` บรรทัดที่ **[367](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_policejob/server/main.lua#L367)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'PoliceBuyVehicle',
        content = ('ซื้อ ยานพาหนะ %s ทะเบียน %s ราคา $%s'):format(vehicleProps.model, vehicleProps.plate, ESX.Math.GroupDigits(price)),
        source = xPlayer.source,
        color = 2
    })
end)
```

## main.lua (Client)

ไปยังโฟลเดอร์ **[client](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_policejob/client)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_policejob/client/main.lua)**

### ตำรวจ-งัดรถ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `PoliceHijack`                         | ตำรวจ-งัดรถ

วางรหัสด้านล่างนี้ต่อจาก `ESX.ShowNotification(TranslateCap('vehicle_unlocked'))` บรรทัดที่ **[350](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_policejob/client/main.lua#L350)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'PoliceHijack',
        content = ('งัด ยานพาหนะ %s ทะเบียน %s'):format(GetDisplayNameFromVehicleModel(GetEntityModel(vehicle)), GetVehicleNumberPlateText(vehicle)),
        color = 3
    })
end)
```

### ตำรวจ-พาวท์รถ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `PoliceImPound`                         | ตำรวจ-พาวท์รถ

วางรหัสด้านล่างนี้ต่อจาก `function ImpoundVehicle(vehicle)` บรรทัดที่ **[1582](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_policejob/client/main.lua#L1582)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'PoliceImPound',
        content = ('ส่ง ยานพาหนะ %s ทะเบียน %s ไปยังพาวท์'):format(GetDisplayNameFromVehicleModel(GetEntityModel(vehicle)), GetVehicleNumberPlateText(vehicle)),
        color = 2
    })
end)
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
