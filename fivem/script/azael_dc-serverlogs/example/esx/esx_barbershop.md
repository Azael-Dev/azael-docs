---
sidebar_label: esx_barbershop
---

# esx_barbershop

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx_barbershop](https://github.com/esx-framework/esx_barbershop)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Server)

ไปยังโฟลเดอร์ **[server](https://github.com/esx-framework/esx_barbershop/tree/main/server)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/esx-framework/esx_barbershop/blob/main/server/main.lua)**

### ร้าน-ตัดผม

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `BarberShop`                           | ร้าน-ตัดผม

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.removeMoney(Config.Price, "Haircut")` บรรทัดที่ **[6](https://github.com/esx-framework/esx_barbershop/blob/main/server/main.lua#L6)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'BarberShop',
        content = ('ตัดผม เสียค่าใช้จ่าย Cash จำนวน $%s'):format(ESX.Math.GroupDigits(Config.Price)),
        source = xPlayer.source,
        color = 2
    })
end)
```
