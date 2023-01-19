---
sidebar_label: esx_accessories
---

# esx_accessories

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx_accessories](https://github.com/esx-framework/esx_accessories)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Server)

ไปยังโฟลเดอร์ **[server](https://github.com/esx-framework/esx_accessories/tree/main/server)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/esx-framework/esx_accessories/blob/main/server/main.lua)**

### ร้าน-เครื่องประดับ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `AccessoriesShop`                      | ร้าน-เครื่องประดับ

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.removeMoney(Config.Price, "Accessory Purchase")` บรรทัดที่ **[5](https://github.com/esx-framework/esx_accessories/blob/main/server/main.lua#L5)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'AccessoriesShop',
        content = ('ซื้อ เครื่องประดับ เสียค่าใช้จ่าย Cash จำนวน $%s'):format(ESX.Math.GroupDigits(Config.Price)),
        source = xPlayer.source,
        color = 2
    })
end)
```
