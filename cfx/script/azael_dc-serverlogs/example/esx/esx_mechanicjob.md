---
sidebar_label: esx_mechanicjob
---

# esx_mechanicjob

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx_mechanicjob](https://github.com/esx-framework/esx_mechanicjob)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Server)

ไปยังโฟลเดอร์ **[server](https://github.com/esx-framework/esx_mechanicjob/tree/main/server)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/esx-framework/esx_mechanicjob/blob/main/server/main.lua)**

### ช่าง-เบิกไอเทม

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `MechanicHarvestItem`                  | ช่าง-เบิกไอเทม

1. วางรหัสด้านล่างนี้ต่อจาก `Harvest(source)` บรรทัดที่ **[21](https://github.com/esx-framework/esx_mechanicjob/blob/main/server/main.lua#L21)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'MechanicHarvestItem',
        content = ('เบิก %s จำนวน 1'):format(ESX.GetItemLabel('gazbottle')),
        source = xPlayer.source,
        color = 2
    })
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `Harvest2(source)` บรรทัดที่ **[53](https://github.com/esx-framework/esx_mechanicjob/blob/main/server/main.lua#L53)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'MechanicHarvestItem',
        content = ('เบิก %s จำนวน 1'):format(ESX.GetItemLabel('fixtool')),
        source = xPlayer.source,
        color = 2
    })
end)
```

3. วางรหัสด้านล่างนี้ต่อจาก `Harvest3(source)` บรรทัดที่ **[84](https://github.com/esx-framework/esx_mechanicjob/blob/main/server/main.lua#L84)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'MechanicHarvestItem',
        content = ('เบิก %s จำนวน 1'):format(ESX.GetItemLabel('carotool')),
        source = xPlayer.source,
        color = 2
    })
end)
```

### ช่าง-คราฟไอเทม

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `MechanicCraftItem`                    | ช่าง-คราฟไอเทม

1. วางรหัสด้านล่างนี้ต่อจาก `Craft(source)` บรรทัดที่ **[117](https://github.com/esx-framework/esx_mechanicjob/blob/main/server/main.lua#L117)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'MechanicCraftItem',
        content = ('นำ %s จำนวน 1 คราฟเป็น %s จำนวน 1'):format(ESX.GetItemLabel('gazbottle'), ESX.GetItemLabel('blowpipe')),
        source = xPlayer.source,
        color = 2
    })
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `Craft2(source)` บรรทัดที่ **[150](https://github.com/esx-framework/esx_mechanicjob/blob/main/server/main.lua#L150)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'MechanicCraftItem',
        content = ('นำ %s จำนวน 1 คราฟเป็น %s จำนวน 1'):format(ESX.GetItemLabel('fixtool'), ESX.GetItemLabel('fixkit')),
        source = xPlayer.source,
        color = 2
    })
end)
```

3. วางรหัสด้านล่างนี้ต่อจาก `Craft3(source)` บรรทัดที่ **[183](https://github.com/esx-framework/esx_mechanicjob/blob/main/server/main.lua#L183)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'MechanicCraftItem',
        content = ('นำ %s จำนวน 1 คราฟเป็น %s จำนวน 1'):format(ESX.GetItemLabel('carotool'), ESX.GetItemLabel('carokit')),
        source = xPlayer.source,
        color = 2
    })
end)
```

### ช่าง-ใช้งานไอเทม

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `MechanicUseItem`                      | ช่าง-ใช้งานไอเทม

1. วางรหัสด้านล่างนี้ต่อจาก `xPlayer.removeInventoryItem('blowpipe', 1)` บรรทัดที่ **[225](https://github.com/esx-framework/esx_mechanicjob/blob/main/server/main.lua#L225)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'MechanicUseItem',
        content = ('ใช้งาน %s จำนวน 1 '):format(ESX.GetItemLabel('blowpipe')),
        source = xPlayer.source,
        color = 1
    })
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `xPlayer.removeInventoryItem('fixkit', 1)` บรรทัดที่ **[235](https://github.com/esx-framework/esx_mechanicjob/blob/main/server/main.lua#L235)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'MechanicUseItem',
        content = ('ใช้งาน %s จำนวน 1 '):format(ESX.GetItemLabel('fixkit')),
        source = xPlayer.source,
        color = 1
    })
end)
```

3. วางรหัสด้านล่างนี้ต่อจาก `xPlayer.removeInventoryItem('carokit', 1)` บรรทัดที่ **[245](https://github.com/esx-framework/esx_mechanicjob/blob/main/server/main.lua#L245)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'MechanicUseItem',
        content = ('ใช้งาน %s จำนวน 1 '):format(ESX.GetItemLabel('carokit')),
        source = xPlayer.source,
        color = 1
    })
end)
```

### ช่าง-ไอเทม-ออกจากคลัง

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `MechanicGetStockItem`                 | ช่าง-ไอเทม-ออกจากคลัง

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.showNotification(TranslateCap('have_withdrawn', count, item.label))` บรรทัดที่ **[265](https://github.com/esx-framework/esx_mechanicjob/blob/main/server/main.lua#L265)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'MechanicGetStockItem',
        content = ('นำ %s จำนวน %s ออกจากคลัง'):format(item.label, count),
        source = xPlayer.source,
        color = 1,
        options = {
            important = (count >= 500 and true or count < 0 and true)
        }
    })
end)
```

### ช่าง-ไอเทม-เก็บเข้าคลัง

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `MechanicPutStockItem`                 | ช่าง-ไอเทม-เก็บเข้าคลัง

วางรหัสด้านล่างนี้ต่อจาก `inventory.addItem(itemName, count)` บรรทัดที่ **[291](https://github.com/esx-framework/esx_mechanicjob/blob/main/server/main.lua#L291)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'MechanicPutStockItem',
        content = ('นำ %s จำนวน %s เก็บเข้าคลัง'):format(item.label, count),
        source = xPlayer.source,
        color = 2,
        options = {
            important = (count >= 500 and true or count < 0 and true)
        }
    })
end)
```

## main.lua (Client)

ไปยังโฟลเดอร์ **[client](https://github.com/esx-framework/esx_mechanicjob/tree/main/client)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/esx-framework/esx_mechanicjob/blob/main/client/main.lua)**

### ช่าง-เบิกรถ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `MechanicCarSpawner`                   | ช่าง-เบิกรถ

1. วางรหัสด้านล่างนี้ต่อจาก `TaskWarpPedIntoVehicle(playerPed, vehicle,  -1)` บรรทัดที่ **[96](https://github.com/esx-framework/esx_mechanicjob/blob/main/client/main.lua#L96)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'MechanicCarSpawner',
        content = ('เบิก ยานพาหนะ %s ทะเบียน %s'):format(GetDisplayNameFromVehicleModel(vehicleProps.model), GetVehicleNumberPlateText(vehicle)),
        color = 2
    })
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `TaskWarpPedIntoVehicle(playerPed, vehicle, -1)` บรรทัดที่ **[122](https://github.com/esx-framework/esx_mechanicjob/blob/main/client/main.lua#L122)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'MechanicCarSpawner',
        content = ('เบิก ยานพาหนะ %s ทะเบียน %s'):format(GetDisplayNameFromVehicleModel(data.current.value), GetVehicleNumberPlateText(vehicle)),
        color = 2
    })
end)
```

3. วางรหัสด้านล่างนี้ต่อจาก `TaskWarpPedIntoVehicle(playerPed, vehicle, -1)` บรรทัดที่ **[130](https://github.com/esx-framework/esx_mechanicjob/blob/main/client/main.lua#L130)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'MechanicCarSpawner',
        content = ('เบิก ยานพาหนะ %s ทะเบียน %s'):format(GetDisplayNameFromVehicleModel(data.current.value), GetVehicleNumberPlateText(vehicle)),
        color = 2
    })
end)
```

### ช่าง-งัดรถ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `MechanicHijack`                       | ช่าง-งัดรถ

วางรหัสด้านล่างนี้ต่อจาก `isBusy = false` บรรทัดที่ **[284](https://github.com/esx-framework/esx_mechanicjob/blob/main/client/main.lua#L284)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'MechanicHijack',
        content = ('งัด ยานพาหนะ %s ทะเบียน %s'):format(GetDisplayNameFromVehicleModel(GetEntityModel(vehicle)), GetVehicleNumberPlateText(vehicle)),
        color = 3
    })
end)
```

### ช่าง-ซ่อมรถ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `MechanicRepair`                       | ช่าง-ซ่อมรถ

วางรหัสด้านล่างนี้ต่อจาก `isBusy = false` บรรทัดที่ **[312](https://github.com/esx-framework/esx_mechanicjob/blob/main/client/main.lua#L312)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'MechanicRepair',
        content = ('ซ่อม ยานพาหนะ %s ทะเบียน %s'):format(GetDisplayNameFromVehicleModel(GetEntityModel(vehicle)), GetVehicleNumberPlateText(vehicle)),
        color = 2
    })
end)
```

### ช่าง-ล้างรถ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `MechanicClean`                        | ช่าง-ล้างรถ

วางรหัสด้านล่างนี้ต่อจาก `isBusy = false` บรรทัดที่ **[337](https://github.com/esx-framework/esx_mechanicjob/blob/main/client/main.lua#L337)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'MechanicClean',
        content = ('ล้าง ยานพาหนะ %s ทะเบียน %s'):format(GetDisplayNameFromVehicleModel(GetEntityModel(vehicle)), GetVehicleNumberPlateText(vehicle)),
        color = 2
    })
end)
```

### ช่าง-พาวท์รถ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `MechanicImpVeh`                       | ช่าง-พาวท์รถ

1. วางรหัสด้านล่างนี้ต่อจาก `ESX.Game.DeleteVehicle(vehicle)` บรรทัดที่ **[350](https://github.com/esx-framework/esx_mechanicjob/blob/main/client/main.lua#L350)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'MechanicImpVeh',
        content = ('ส่ง ยานพาหนะ %s ทะเบียน %s ไปยังพาวท์'):format(GetDisplayNameFromVehicleModel(GetEntityModel(vehicle)), GetVehicleNumberPlateText(vehicle)),
        color = 2
    })
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `ESX.Game.DeleteVehicle(vehicle)` บรรทัดที่ **[359](https://github.com/esx-framework/esx_mechanicjob/blob/main/client/main.lua#L359)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'MechanicImpVeh',
        content = ('ส่ง ยานพาหนะ %s ทะเบียน %s ไปยังพาวท์'):format(GetDisplayNameFromVehicleModel(GetEntityModel(vehicle)), GetVehicleNumberPlateText(vehicle)),
        color = 2
    })
end)
```
