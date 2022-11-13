---
sidebar_label: esx_lscustom
---

# esx_lscustom

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx_lscustom](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_lscustom)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Server & Client)

### ร้าน-แต่งรถ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `LsCustom`                             | ร้าน-แต่งรถ

1. ไปยังโฟลเดอร์ **[server](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_lscustom/server)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_lscustom/server/main.lua)**

```lua title="ค้นหา"
TriggerClientEvent('esx_lscustom:installMod', source)
```

```lua title="แก้ไขเป็น"
TriggerClientEvent('esx_lscustom:installMod', source, price)
```

2. ไปยังโฟลเดอร์ **[client](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_lscustom/client)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_lscustom/client/main.lua)**

```lua title="ค้นหา"
AddEventHandler('esx_lscustom:installMod', function()
```

```lua title="แก้ไขเป็น"
AddEventHandler('esx_lscustom:installMod', function(price)
```

3. วางรหัสด้านล่างนี้ต่อจาก `TriggerServerEvent('esx_lscustom:refreshOwnedVehicle', myCar)` บรรทัดที่ **[17](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_lscustom/client/main.lua#L17)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'LsCustom',
        content = ('แต่ง ยานพาหนะ %s ทะเบียน %s เสียค่าใช้จ่าย $%s'):format(GetDisplayNameFromVehicleModel(myCar.model), myCar.plate, ESX.Math.GroupDigits(price)),
        color = 2
    })
end)
```
