---
sidebar_label: esx_lscustom
---

# esx_lscustom

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx_lscustom](https://github.com/esx-framework/esx_lscustom)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../index.md)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../index.md)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Server & Client)

### ร้าน-แต่งรถ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `LsCustom`                             | ร้าน-แต่งรถ

1. ไปยังโฟลเดอร์ **[server](https://github.com/esx-framework/esx_lscustom/tree/main/server)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/esx-framework/esx_lscustom/blob/main/server/main.lua)**

```lua title="ค้นหา"
TriggerClientEvent('esx_lscustom:installMod', source)
```

```lua title="แก้ไขเป็น"
TriggerClientEvent('esx_lscustom:installMod', source, price)
```

2. ไปยังโฟลเดอร์ **[client](https://github.com/esx-framework/esx_lscustom/tree/main/client)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/esx-framework/esx_lscustom/blob/main/client/main.lua)**

```lua title="ค้นหา"
AddEventHandler('esx_lscustom:installMod', function()
```

```lua title="แก้ไขเป็น"
AddEventHandler('esx_lscustom:installMod', function(price)
```

3. วางรหัสด้านล่างนี้ต่อจาก `TriggerServerEvent('esx_lscustom:refreshOwnedVehicle', myCar)` บรรทัดที่ **[16](https://github.com/esx-framework/esx_lscustom/blob/main/client/main.lua#L16)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'LsCustom',
        content = ('แต่ง ยานพาหนะ %s ทะเบียน %s เสียค่าใช้จ่าย $%s'):format(GetDisplayNameFromVehicleModel(myCar.model), myCar.plate, ESX.Math.GroupDigits(price)),
        color = 2
    })
end)
```
