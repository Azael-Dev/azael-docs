---
sidebar_label: esx_clotheshop
---

# esx_clotheshop

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx_clotheshop](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_clotheshop)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Server)

ไปยังโฟลเดอร์ **[server](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_clotheshop/server)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_clotheshop/server/main.lua)**

### ร้าน-เสื้อผ้า

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `ClotheShop`                           | ร้าน-เสื้อผ้า

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.removeMoney(Config.Price, "Outfit Purchase")` บรรทัดที่ **[26](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_clotheshop/server/main.lua#L26)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'ClotheShop',
        content = ('ซื้อ เสื้อผ้า เสียค่าใช้จ่าย Cash จำนวน $%s'):format(ESX.Math.GroupDigits(Config.Price)),
        source = xPlayer.source,
        color = 2
    })
end)
```
