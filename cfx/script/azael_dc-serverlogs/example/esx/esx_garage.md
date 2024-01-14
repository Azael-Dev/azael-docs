---
sidebar_label: esx_garage
---

# esx_garage

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx_garage](https://github.com/esx-framework/esx_garage)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../index.md)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../index.md)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Client)

ไปยังโฟลเดอร์ **[client](https://github.com/esx-framework/esx_garage/tree/main/client)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/esx-framework/esx_garage/blob/main/client/main.lua)**

### เบิกรถ-การาจ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `GetVehicleGarage`                     | เบิกรถ-การาจ

วางรหัสด้านล่างนี้ต่อจาก `ESX.ShowNotification(TranslateCap('veh_released'))` บรรทัดที่ **[38](https://github.com/esx-framework/esx_garage/blob/main/client/main.lua#L38)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'GetVehicleGarage',
        content = ('เบิก ยานพาหนะ %s ทะเบียน %s ออกจาก Garage'):format(GetDisplayNameFromVehicleModel(data.vehicleProps.model), data.vehicleProps.plate),
        color = 2
    })
end)
```

### เบิกรถ-พาวท์

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `GetVehiclePound`                      | เบิกรถ-พาวท์

วางรหัสด้านล่างนี้ต่อจาก `TriggerEvent('esx_garage:closemenu')` บรรทัดที่ **[53](https://github.com/esx-framework/esx_garage/blob/main/client/main.lua#L53)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'GetVehiclePound',
        content = ('เบิก ยานพาหนะ %s ทะเบียน %s ออกจาก Pound และ เสียค่าใช้จ่าย Cash จำนวน $%s'):format(GetDisplayNameFromVehicleModel(data.vehicleProps.model), data.vehicleProps.plate, ESX.Math.GroupDigits(data.exitVehicleCost)),
        color = 3
    })
end)
```

### เก็บรถ-การาจ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `PutVehicleGarage`                     | เก็บรถ-การาจ

วางรหัสด้านล่างนี้ต่อจาก `TriggerServerEvent('esx_garage:updateOwnedVehicle', true, currentMarker, nil, {vehicleProps = vehicleProps})` บรรทัดที่ **[351](https://github.com/esx-framework/esx_garage/blob/main/client/main.lua#L351)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'PutVehicleGarage',
        content = ('เก็บ ยานพาหนะ %s ทะเบียน %s เข้า Garage'):format(GetDisplayNameFromVehicleModel(vehicleProps.model), vehicleProps.plate),
        color = 7
    })
end)
```
