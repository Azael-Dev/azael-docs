---
sidebar_label: esx_jb_eden_garage2
---

# esx_jb_eden_garage2

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx_jb_eden_garage2](https://github.com/TanguyOrtegat/esx_jb_eden_garage2)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Client)

ไปยังโฟลเดอร์ **[client](https://github.com/TanguyOrtegat/esx_jb_eden_garage2/tree/master/client)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/TanguyOrtegat/esx_jb_eden_garage2/blob/master/client/main.lua)**

### เก็บรถ-การาจ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `PutVehicleGarage`                     | เก็บรถ-การาจ

1. วางรหัสด้านล่างนี้ต่อจาก `ESX.ShowNotification(_U('trailer_in_garage'))` บรรทัดที่ **[261](https://github.com/TanguyOrtegat/esx_jb_eden_garage2/blob/master/client/main.lua#L261)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'PutVehicleGarage',
        content = ('เก็บ ยานพาหนะ %s ทะเบียน %s เข้า Garage (%s)'):format(GetDisplayNameFromVehicleModel(trailerProps.model), trailerProps.plate, garage_name),
        color = 7
    })
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `ESX.ShowNotification(_U('vehicle_in_garage'))` บรรทัดที่ **[282](https://github.com/TanguyOrtegat/esx_jb_eden_garage2/blob/master/client/main.lua#L282)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'PutVehicleGarage',
        content = ('เก็บ ยานพาหนะ %s ทะเบียน %s เข้า Garage (%s)'):format(GetDisplayNameFromVehicleModel(vehicleProps.model), vehicleProps.plate, garage_name),
        color = 7
    })
end)
```

### เก็บรถ-พาวท์

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `PutVehiclePound`                      | เก็บรถ-พาวท์

1. วางรหัสด้านล่างนี้ต่อจาก `ESX.ShowNotification(_U('trailer_in_pound'))` บรรทัดที่ **[314](https://github.com/TanguyOrtegat/esx_jb_eden_garage2/blob/master/client/main.lua#L314)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'PutVehiclePound',
        content = ('เก็บ ยานพาหนะ %s ทะเบียน %s เข้า Pound'):format(GetDisplayNameFromVehicleModel(trailerProps.model), trailerProps.plate),
        color = 5
    })
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `ESX.ShowNotification(_U('vehicle_in_pound'))` บรรทัดที่ **[329](https://github.com/TanguyOrtegat/esx_jb_eden_garage2/blob/master/client/main.lua#L329)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'PutVehiclePound',
        content = ('เก็บ ยานพาหนะ %s ทะเบียน %s เข้า Pound'):format(GetDisplayNameFromVehicleModel(vehicleProps.model), vehicleProps.plate),
        color = 5
    })
end)
```

### เบิกรถ-การาจ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `GetVehicleGarage`                     | เบิกรถ-การาจ

วางรหัสด้านล่างนี้ต่อจาก `end` บรรทัดที่ **[263](https://github.com/TanguyOrtegat/esx_jb_eden_garage2/blob/master/client/main.lua#L363)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'GetVehicleGarage',
        content = ('เบิก ยานพาหนะ %s ทะเบียน %s ออกจาก Garage'):format(GetDisplayNameFromVehicleModel(vehicleProps.model), vehicleProps.plate),
        color = 2
    })
end)
```

### เบิกรถ-พาวท์

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `GetVehiclePound`                      | เบิกรถ-พาวท์

วางรหัสด้านล่างนี้ต่อจาก `TaskWarpPedIntoVehicle(PlayerPedId(), callback_vehicle, -1)` บรรทัดที่ **[377](https://github.com/TanguyOrtegat/esx_jb_eden_garage2/blob/master/client/main.lua#L377)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'GetVehiclePound',
        content = ('เบิก ยานพาหนะ %s ทะเบียน %s ออกจาก Pound'):format(GetDisplayNameFromVehicleModel(vehicleProps.model), vehicleProps.plate),
        color = 3
    })
end)
```
