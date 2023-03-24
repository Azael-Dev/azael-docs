---
sidebar_label: lls-mechanic
---

# lls-mechanic

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[lls-mechanic](https://lualua.tebex.io/package/4392113)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## core.lua (Client)

ไปยังโฟลเดอร์ **client** แล้วดำเนินการเปิดไฟล์ **core.lua**

### ร้าน-แต่งรถ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `LsCustom`                             | ร้าน-แต่งรถ

1. วางรหัสด้านล่างนี้ต่อจาก `TriggerServerEvent('lls-mechanic:removeMoney', tempPrice, isWhitelistJob, customConfigPosIndex, vehiclePorperties)` บรรทัดที่ **`404` (ไม่แน่นอน)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'LsCustom',
        content = ('แต่งรถ %s ทะเบียน %s เสียค่าใช้จ่าย จำนวน $%s [%s]'):format(GetDisplayNameFromVehicleModel(GetEntityModel(customVehicle)), GetVehicleNumberPlateText(customVehicle), ESX.Math.GroupDigits(tempPrice), menuOption.label .. (menu.title ~= '' and ' (' .. menu.title .. ')' or '')),
        color = 2
    })
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `TriggerServerEvent('lls-mechanic:removeMoney', tempPrice, isWhitelistJob, customConfigPosIndex, vehiclePorperties)` บรรทัดที่ **`435` (ไม่แน่นอน)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'LsCustom',
        content = ('แต่งรถ %s ทะเบียน %s เสียค่าใช้จ่าย จำนวน $%s [%s]'):format(GetDisplayNameFromVehicleModel(GetEntityModel(customVehicle)), GetVehicleNumberPlateText(customVehicle), ESX.Math.GroupDigits(tempPrice), tempModType .. (data.colorTitle and ' (' .. data.colorTitle .. ')' or '')),
        color = 2
    })
end)
```
