---
sidebar_label: nc_booth
---

# nc_booth

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[nc_booth](https://fivem.nc-developer.com/product/61f9514e3a55f)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](./)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## config.functions.lua

ไปยัง **`config.functions.lua`** แล้วดำเนินการเปิดไฟล์

### ตั้งร้านขายสินค้า

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_BoothStart`                        | ตั้งร้านขายสินค้า

วางรหัสด้านล่างนี้ภายใน `Config.ServerStartBooth = function`

```lua
pcall(function()
	local content = ('ตั้งร้าน %s ขาย'):format(boothType)

	for k, v in ipairs(items) do
		content = ('%s %s จำนวน %s ราคา $%s,'):format(content, ESX.GetItemLabel(k), v.count, ESX.Math.GroupDigits(v.price))
	end

	for k, v in ipairs(weapons) do
		content = ('%s %s และ กระสุน จำนวน %s ราคา $%s,'):format(content, ESX.GetWeaponLabel(k), v.ammo, ESX.Math.GroupDigits(v.price))
	end

	exports['azael_dc-serverlogs']:insertData({
		event = 'NC_BoothStart',
		content = content,
		source = xPlayer.source,
		color = 2
	})
end)
```

### ซื้อขายสินค้า

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_BoothIBuyItem`                     | ซื้อขายสินค้า

วางรหัสด้านล่างนี้ภายใน `Config.ServerBuyItem = function`

```lua
pcall(function()
	local content = 'ซื้อ ' .. (itemType == 'item' and ESX.GetItemLabel(itemName) or ESX.GetWeaponLabel(itemName)) .. '' .. (itemType == 'weapon' and ' และ กระสุน' or '') .. ' จำนวน ' .. (itemCount or 0) .. '' .. (boothType == 'service' and ' จาก ' .. xOwner.name or '') .. ' เสียค่าใช้จ่าย ' .. accountBuyType .. ' จำนวน $' .. ESX.Math.GroupDigits(buyPrice) .. ' (Type: ' .. boothType .. ')'

	exports['azael_dc-serverlogs']:insertData({
		event = 'NC_BoothIBuyItem',
		content = content,
		source = xPlayer.source,
		color = 3
	})

	if boothType == 'service' then
		local content = 'ขาย ' .. (itemType == 'item' and ESX.GetItemLabel(itemName) or ESX.GetWeaponLabel(itemName)) .. '' .. (itemType == 'weapon' and ' และ กระสุน' or '') .. ' จำนวน ' .. (itemCount or 0) .. ' ให้กับ ' .. xBuyer.name .. ' ได้รับ ' .. accountSellType .. ' จำนวน $' .. ESX.Math.GroupDigits(buyPrice) .. ' หักค่าธรรมเนียม ' .. commission .. '% คงเหลือ $' .. ESX.Math.GroupDigits(netPrice) .. ' (Type: ' .. boothType .. ')'
		
		exports['azael_dc-serverlogs']:insertData({
			event = 'NC_BoothIBuyItem',
			content = content,
			source = xOwner.source,
			color = 2
		})
	end
end)
```

###  เบิกสินค้าออกจากคลัง

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_BoothGetStorage`                   | เบิกสินค้าออกจากคลัง

วางรหัสด้านล่างนี้ภายใน `Config.ServerGetStorageItems = function`

```lua
pcall(function()
	local content = 'เบิก'

	for k, v in ipairs(items) do
		content = ('%s %s จำนวน %s,'):format(content, ESX.GetItemLabel(k), v)
	end

	for k, v in ipairs(weapons) do
		content = ('%s %s และ กระสุน จำนวน %s,'):format(content, ESX.GetWeaponLabel(k), v)
	end

	exports['azael_dc-serverlogs']:insertData({
		event = 'NC_BoothGetStorage',
		content = ('%s ออกจากคลัง'):format(content),
		source = xPlayer.source,
		color = 1
	})
end)
```
