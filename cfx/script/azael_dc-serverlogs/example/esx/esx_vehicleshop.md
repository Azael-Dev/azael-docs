---
sidebar_label: esx_vehicleshop
---

# esx_vehicleshop

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx_vehicleshop](https://github.com/esx-framework/esx_vehicleshop)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../index.md)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../index.md)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Client)

ไปยังโฟลเดอร์ **[client](https://github.com/esx-framework/esx_vehicleshop/tree/main/client)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/esx-framework/esx_vehicleshop/blob/main/client/main.lua)**

### ซื้อรถ-จากร้าน

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `BuyVehicle`                           | ซื้อรถ-จากร้าน

วางรหัสด้านล่างนี้ต่อจาก `SetEntityVisible(playerPed, true)` บรรทัดที่ **[215](https://github.com/esx-framework/esx_vehicleshop/blob/main/client/main.lua#L215)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'BuyVehicle',
        content = ('ซื้อ ยานพาหนะ %s ทะเบียน %s ราคา $%s'):format(vehicleData.name, generatedPlate, ESX.Math.GroupDigits(vehicleData.price)),
        color = 2
    })
end)
```

### ขายรถ-คืนร้าน

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `ResellVehicle`                           | ขายรถ-คืนร้าน

วางรหัสด้านล่างนี้ต่อจาก `ESX.Game.DeleteVehicle(CurrentActionData.vehicle)` บรรทัดที่ **[807](https://github.com/esx-framework/esx_vehicleshop/blob/main/client/main.lua#L807)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'ResellVehicle',
        content = ('ขาย ยานพาหนะ %s ทะเบียน %s ราคา $%s'):format(CurrentActionData.label, CurrentActionData.plate, ESX.Math.GroupDigits(CurrentActionData.price)),
        color = 3
    })
end)
```
