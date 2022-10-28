---
sidebar_label: esx_shops
---

# esx_shops

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx_shops](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_shops)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Server)

ไปยังโฟลเดอร์ **[server](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_shops/server)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_shops/server/main.lua)**

### ซื้อ-ไอเทม

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `ShopBuyItem`                          | ซื้อ-ไอเทม

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.showNotification(TranslateCap('bought', amount, label, ESX.Math.GroupDigits(price)))` บรรทัดที่ **[48](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_shops/server/main.lua#L48)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'ShopBuyItem',
        content = ('ซื้อ %s จำนวน %s เสียค่าใช้จ่าย Cash จำนวน $%s'):format(label, amount, ESX.Math.GroupDigits(price)),
        source = xPlayer.source,
        color = 2
    })
end)
```
