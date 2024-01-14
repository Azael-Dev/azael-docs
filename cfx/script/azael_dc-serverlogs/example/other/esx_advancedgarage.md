---
sidebar_label: esx_advancedgarage
---

# esx_advancedgarage

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx_advancedgarage](https://github.com/HumanTree92/VENT_ESX_Scripts/tree/main/esx_advancedgarage)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../index.md)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../index.md)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Client)

ไปยังโฟลเดอร์ **[client](https://github.com/HumanTree92/VENT_ESX_Scripts/tree/main/esx_advancedgarage/client)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/HumanTree92/VENT_ESX_Scripts/blob/main/esx_advancedgarage/client/main.lua)**

### เบิกรถ-การาจ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `GetVehicleGarage`                     | เบิกรถ-การาจ

1. วางรหัสด้านล่างนี้ต่อจาก `ESX.UI.Menu.CloseAll()` บรรทัดที่ **[230](https://github.com/HumanTree92/VENT_ESX_Scripts/blob/main/esx_advancedgarage/client/main.lua#L230)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'GetVehicleGarage',
        content = ('เบิก ยานพาหนะ %s ทะเบียน %s ออกจาก Garage'):format(GetDisplayNameFromVehicleModel(vehVehicle.model), vehPlate),
        color = 2
    })
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `ESX.UI.Menu.CloseAll()` บรรทัดที่ **[238](https://github.com/HumanTree92/VENT_ESX_Scripts/blob/main/esx_advancedgarage/client/main.lua#L238)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'GetVehicleGarage',
        content = ('เบิก ยานพาหนะ %s ทะเบียน %s ออกจาก Garage'):format(GetDisplayNameFromVehicleModel(vehVehicle.model), vehPlate),
        color = 2
    })
end)
```

### เบิกรถ-พาวท์

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `GetVehiclePound`                      | เบิกรถ-พาวท์

วางรหัสด้านล่างนี้ต่อจาก `ESX.UI.Menu.CloseAll()` บรรทัดที่ **[382](https://github.com/HumanTree92/VENT_ESX_Scripts/blob/main/esx_advancedgarage/client/main.lua#L382)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'GetVehiclePound',
        content = ('เบิก ยานพาหนะ %s ทะเบียน %s ออกจาก Pound'):format(GetDisplayNameFromVehicleModel(vehVehicle.model), vehPlate),
        color = 3
    })
end)
```

### เก็บรถ-การาจ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `PutVehicleGarage`                     | เก็บรถ-การาจ

วางรหัสด้านล่างนี้ต่อจาก `ESX.ShowNotification(_U('vehicle_in_garage'))` บรรทัดที่ **[529](https://github.com/HumanTree92/VENT_ESX_Scripts/blob/main/esx_advancedgarage/client/main.lua#L529)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'PutVehicleGarage',
        content = ('เก็บ ยานพาหนะ %s ทะเบียน %s เข้า Garage'):format(GetDisplayNameFromVehicleModel(vehicleProps.model), vehicleProps.plate),
        color = 7
    })
end)
```
