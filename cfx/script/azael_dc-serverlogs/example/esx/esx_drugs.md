---
sidebar_label: esx_drugs
---

# esx_drugs

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx_drugs](https://github.com/esx-framework/esx_drugs)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../index.md)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../index.md)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Server)

ไปยังโฟลเดอร์ **[server](https://github.com/esx-framework/esx_drugs/tree/main/server)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/esx-framework/esx_drugs/blob/main/server/main.lua)**

### ขาย-กัญชา

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `SellCannabis`                         | ขาย-กัญชา

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.removeInventoryItem(xItem.name, amount)` บรรทัดที่ **[29](https://github.com/esx-framework/esx_drugs/blob/main/server/main.lua#L29)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'SellCannabis',
        content = ('ขาย %s จำนวน %s ได้รับ %s จำนวน $%s'):format(xItem.label, amount, (Config.GiveBlack and 'Dirty Money' or 'Cash'), ESX.Math.GroupDigits(price)),
        source = xPlayer.source,
        color = 2,
        options = {
            important = (amount >= 500 and true)
        }
    })
end)
```

### ซื้อ-ใบอนุญาต

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `BuyLicenseCannabis`                   | ซื้อ-ใบอนุญาต

วางรหัสด้านล่างนี้ต่อจาก `TriggerEvent('esx_license:addLicense', source, licenseName, function()` บรรทัดที่ **[41](https://github.com/esx-framework/esx_drugs/blob/main/server/main.lua#L41)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'BuyLicenseCannabis',
        content = ('ซื้อ %s เสียค่าใช้จ่าย Cash จำนวน $%s'):format(license.label, ESX.Math.GroupDigits(license.price)),
        source = xPlayer.source,
        color = 5
    })
end)
```

### งาน-กัญชา

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `JobCannabis`                          | งาน-กัญชา

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addInventoryItem('cannabis', cime)` บรรทัดที่ **[59](https://github.com/esx-framework/esx_drugs/blob/main/server/main.lua#L59)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'JobCannabis',
        content = ('ได้รับ %s จำนวน %s'):format(ESX.GetItemLabel('cannabis'), cime),
        source = xPlayer.source,
        color = 2
    })
end)
```

### แปรรูป-กัญชา

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `ProcessCannabis`                      | แปรรูป-กัญชา

1. วางรหัสด้านล่างนี้ต่อจาก `xPlayer.showNotification(TranslateCap('weed_processed'))` บรรทัดที่ **[97](https://github.com/esx-framework/esx_drugs/blob/main/server/main.lua#L97)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'ProcessCannabis',
        content = ('นำ %s จำนวน 3 แปรรูปเป็น %s จำนวน 1'):format(ESX.GetItemLabel('cannabis'), ESX.GetItemLabel('marijuana')),
        source = xPlayer.source,
        color = 2
    })
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `print(('esx_drugs: %s attempted to exploit weed processing!'):format(GetPlayerIdentifiers(source)[1]))` บรรทัดที่ **[121](https://github.com/esx-framework/esx_drugs/blob/main/server/main.lua#L121)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'ProcessCannabis',
        content = 'พยายามใช้ประโยชน์จากการแปรรูป!!!',
        source = xPlayer.source,
        color = 3,
        options = {
            important = true
        }
    })
end)
```
