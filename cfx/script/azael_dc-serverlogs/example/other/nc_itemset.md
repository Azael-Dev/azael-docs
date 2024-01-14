---
sidebar_label: nc_itemset
---

# nc_itemset

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[nc_itemset](https://fivem.nc-developer.com/product/644a003f1ed8f)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../index.md)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../index.md)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## config.functions.server.lua

ไปยัง **`config.functions.server.lua`** แล้วดำเนินการเปิดไฟล์

### ไอเทมเซ็ต

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_ItemsetPackage`                    | แพ็คเกจ-ได้รับสิ่งของ
| `NC_ItemsetGachapon`                   | กาชาปอง-ได้รับสิ่งของ
| `NC_ItemsetSelection`                  | กล่องเลือก-ได้รับสิ่งของ

วางรหัสด้านล่างนี้ภายใน `Config.ServerReceivedItems = function`

```lua
local content = ''

for k, v in ipairs(itemList) do
	if v.type == 'account' then
		content = ('%s\n%s. %s จำนวน $%s'):format(content, k, (ESX.GetConfig().Accounts[v.name].label or ESX.GetConfig().Accounts[v.name]), ESX.Math.GroupDigits(v.count))
	elseif v.type == 'item' then
		content = ('%s\n%s. %s จำนวน %s'):format(content, k, ESX.GetItemLabel(v.name), v.count)
	elseif v.type == 'weapon' then
		content = ('%s\n%s. %s และ กระสุน จำนวน %s'):format(content, k, ESX.GetWeaponLabel(v.name), v.count)
	elseif v.type == 'vehicle' then
		content = ('%s\n%s. ยานพาหนะ %s ทะเบียน %s'):format(content, k, v.name, v.plate)
	end
end

if content ~= '' then
	local itemSet = Config.ItemSets[triggeredItem]
	local eventName = itemSet.type == 'package' and 'NC_ItemsetPackage'
		or itemSet.type == 'gachapon' and 'NC_ItemsetGachapon'
		or itemSet.type == 'selection' and 'NC_ItemsetSelection'

	pcall(function()
		exports['azael_dc-serverlogs']:insertData({
			event = eventName,
			content = ('ได้รับสิ่งของจาก Itemset: %s จำนวน %s รายการ\n%s'):format(triggeredItem, #itemList, content),
			source = xPlayer.source,
			color = 2
		})
	end)
end
```
