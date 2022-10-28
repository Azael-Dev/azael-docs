---
sidebar_label: esx_weaponshop
---

# esx_weaponshop

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx_weaponshop](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_weaponshop)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Server)

ไปยังโฟลเดอร์ **[server](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_weaponshop/server)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_weaponshop/server/main.lua)**

### ซื้อ-อาวุธ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `ShopBuyWeapon`                        | ซื้อ-อาวุธ

1. วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addWeapon(weaponName, 42)` บรรทัดที่ **[33](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_weaponshop/server/main.lua#L33)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'ShopBuyWeapon',
        content = ('ซื้อ %s และ กระสุน จำนวน 42 เสียค่าใช้จ่าย Dirty Money จำนวน $%s'):format(ESX.GetWeaponLabel(weaponName), ESX.Math.GroupDigits(price)),
        source = xPlayer.source,
        color = 3
    })
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addWeapon(weaponName, 42)` บรรทัดที่ **[43](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_weaponshop/server/main.lua#L43)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'ShopBuyWeapon',
        content = ('ซื้อ %s และ กระสุน จำนวน 42 เสียค่าใช้จ่าย Cash จำนวน $%s'):format(ESX.GetWeaponLabel(weaponName), ESX.Math.GroupDigits(price)),
        source = xPlayer.source,
        color = 2
    })
end)
```
