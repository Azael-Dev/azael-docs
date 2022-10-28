---
sidebar_label: nc_stealjobs
---

# nc_stealjobs

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[nc_stealjobs](https://fivem.nc-developer.com/product/620aa4b23e6df)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## config.notifications.lua

ไปยัง **`config.notifications.lua`** แล้วดำเนินการเปิดไฟล์

### งาน-ขโมยรวม

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_StealJobs`                         | งาน-ขโมยรวม

วางรหัสด้านล่างนี้ภายใน `Config.ServerNotificationGetRewards = function`

```lua
pcall(function()
	local content = 'ได้รับ'

	for k, v in ipairs(itemList) do
		content = ('%s %s จำนวน %s,'):format(content, v.label, v.quantity)
	end

	exports['azael_dc-serverlogs']:insertData({
		event = 'NC_StealJobs',
		content = content,
		source = xPlayer.source,
		color = 2
	})
end)
```
