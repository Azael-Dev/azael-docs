---
sidebar_label: esx_boat
---

# esx_boat

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx_boat](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_boat)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Client)

ไปยังโฟลเดอร์ **[client](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_boat/client)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_boat/client/main.lua)**

### ซื้อเรือ-จากร้าน

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `BuyBoat`                              | ซื้อเรือ-จากร้าน

วางรหัสด้านล่างนี้ต่อจาก `SetEntityCoords(playerPed, shop.Outside.x, shop.Outside.y, shop.Outside.z)` บรรทัดที่ **[51](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_boat/client/main.lua#L51)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'BuyBoat',
        content = ('ซื้อ ยานพาหนะ %s ทะเบียน %s ราคา $%s'):format(data.current.name, plate, ESX.Math.GroupDigits(data.current.price)),
        color = 2
    })
end)
```

### เบิกเรือ-การาจ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `GetBoatGarage`                        | เบิกเรือ-การาจ

วางรหัสด้านล่างนี้ต่อจาก `ESX.Game.SetVehicleProperties(vehicle, vehicleProps)` บรรทัดที่ **[133](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_boat/client/main.lua#L133)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'GetBoatGarage',
        content = ('เบิก ยานพาหนะ %s ทะเบียน %s ออกจาก Garage'):format(data.current.label, vehicleProps.plate),
        color = 2
    })
end)
```

### เก็บเรือ-การาจ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `PutBoatGarage`                        | เก็บเรือ-การาจ

วางรหัสด้านล่างนี้ต่อจาก `if rowsChanged > 0 then` บรรทัดที่ **[185](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_boat/client/main.lua#L185)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'PutBoatGarage',
        content = ('เก็บ ยานพาหนะ %s ทะเบียน %s เข้า Garage'):format(GetDisplayNameFromVehicleModel(vehicleProps.model), vehicleProps.plate),
        color = 3
    })
end)
```
