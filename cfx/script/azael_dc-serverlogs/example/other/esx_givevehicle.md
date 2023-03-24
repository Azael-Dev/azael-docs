---
sidebar_label: esx_givevehicle
---

# esx_givevehicle

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx_givevehicle](https://github.com/minobear/esx_givevehicle)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Server)

ไปยังโฟลเดอร์ **[server](https://github.com/minobear/esx_givevehicle/tree/master/server)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/minobear/esx_givevehicle/blob/master/server/main.lua)**

### แอดมิน-เสกรถ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `AdminGiveVehicle`                     | แอดมิน-เสกรถ

1. วางรหัสด้านล่างนี้ต่อจาก `TriggerClientEvent('esx_giveownedcar:spawnVehiclePlate', _source, _args[1], _args[2], plate, playerName, 'player', vehicleType)` บรรทัดที่ **[37](https://github.com/minobear/esx_givevehicle/blob/master/server/main.lua#L37)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'AdminGiveVehicle',
        content = ('เพิ่ม %s รุ่น %s ทะเบียน %s ให้กับ %s'):format(vehicleType, _args[2], plate, playerName),
        source = _source,
        color = 3
    })

    exports['azael_dc-serverlogs']:insertData({
        event = 'AdminGiveVehicle',
        content = ('ได้รับ %s รุ่น %s ทะเบียน %s จาก %s'):format(vehicleType, _args[2], plate, GetPlayerName(_source)),
        source = tonumber(_args[1]),
        color = 2
    })
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `TriggerClientEvent('esx_giveownedcar:spawnVehicle', _source, _args[1], _args[2], playerName, 'player', vehicleType)` บรรทัดที่ **[40](https://github.com/minobear/esx_givevehicle/blob/master/server/main.lua#L40)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'AdminGiveVehicle',
        content = ('เพิ่ม %s รุ่น %s ให้กับ %s'):format(vehicleType, _args[2], playerName),
        source = _source,
        color = 3
    })

    exports['azael_dc-serverlogs']:insertData({
        event = 'AdminGiveVehicle',
        content = ('ได้รับ %s รุ่น %s จาก %s'):format(vehicleType, _args[2], GetPlayerName(_source)),
        source = tonumber(_args[1]),
        color = 2
    })
end)
```

3. วางรหัสด้านล่างนี้ต่อจาก `TriggerClientEvent('esx_giveownedcar:spawnVehiclePlate', sourceID, _args[1], _args[2], plate, playerName, 'console', vehicleType)` บรรทัดที่ **[77](https://github.com/minobear/esx_givevehicle/blob/master/server/main.lua#L77)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'AdminGiveVehicle',
        content = ('ได้รับ %s รุ่น %s ทะเบียน %s จาก Admin (ใช้คำสั่งผ่าน Server Console)'):format(vehicleType, _args[2], plate),
        source = tonumber(_args[1]),
        color = 2
    })
end)
```

4. วางรหัสด้านล่างนี้ต่อจาก `TriggerClientEvent('esx_giveownedcar:spawnVehicle', sourceID, _args[1], _args[2], playerName, 'console', vehicleType)` บรรทัดที่ **[80](https://github.com/minobear/esx_givevehicle/blob/master/server/main.lua#L80)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'AdminGiveVehicle',
        content = ('ได้รับ %s รุ่น %s จาก Admin (ใช้คำสั่งผ่าน Server Console)'):format(vehicleType, _args[2]),
        source = tonumber(_args[1]),
        color = 2
    })
end)
```

### แอดมิน-ลบรถ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `AdminDeleteVehicle`                   | แอดมิน-ลบรถ

วางรหัสด้านล่างนี้ต่อจาก `TriggerClientEvent('esx:showNotification', source, _U('del_car', plate))` บรรทัดที่ **[102](https://github.com/minobear/esx_givevehicle/blob/master/server/main.lua#L102)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'AdminDeleteVehicle',
        content = ('ลบ ยานพาหนะ ทะเบียน %s'):format(plate),
        source = source,
        color = 1
    })
end)
```
