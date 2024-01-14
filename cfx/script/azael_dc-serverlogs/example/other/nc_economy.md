---
sidebar_label: nc_economy
---

# nc_economy

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[nc_economy](https://fivem.nc-developer.com/product/61e3cc7f8b98e)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../index.md)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../index.md)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## config.functions.lua

ไปยัง **`config.functions.lua`** แล้วดำเนินการเปิดไฟล์

### ระบบเศรษฐกิจ-ขายไอเทม

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_SoldEconomyItem`                 	 | ระบบเศรษฐกิจ-ขายไอเทม

วางรหัสด้านล่างนี้ภายใน `Config.ServerSoldEconomyItem = function`

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'NC_SoldEconomyItem',
		content = ('ขาย %s จำนวน %s ได้รับ Cash จำนวน $%s'):format(ESX.GetItemLabel(itemName), itemCount, ESX.Math.GroupDigits(totalPrice)),
		source = xPlayer.source,
		color = 2
	})
end)
```
