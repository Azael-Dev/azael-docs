---
sidebar_label: nc_inventory
---

# nc_inventory

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[nc_inventory](https://fivem.nc-developer.com/product/61e3d296e287e)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## config.functions.lua

ไปยัง **`config.functions.lua`** แล้วดำเนินการเปิดไฟล์

### ผู้เล่น-ส่ง

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_GiveItem`                          | ส่ง-ไอเทม
| `NC_GiveMoney`                         | ส่ง-เงินเขียว
| `NC_GiveDirtyMoney`                    | ส่ง-เงินแดง
| `NC_GiveWeapon`                        | ส่ง-อาวุธ
| `NC_GiveAccessory`                     | ส่ง-เครื่องประดับ
| `NC_GiveKeyCar`                        | ส่ง-กุญแจรถ
| `NC_GiveKeyHouse`                      | ส่ง-กุญแจบ้าน

วางรหัสด้านล่างนี้ภายใน `Config.ServerGaveItem = function`

```lua
if itemType == 'item' then
	local label = ESX.GetItemLabel(itemName)

	pcall(function()
		exports['azael_dc-serverlogs']:insertData({
			event = 'NC_GiveItem',
			content = ('ส่ง %s จำนวน %s ให้กับ %s'):format(label, itemCount, xTarget.name),
			source = xPlayer.source,
			color = 1,
			options = {
				important = (itemCount >= 500 and true)
			}
		})

		exports['azael_dc-serverlogs']:insertData({
			event = 'NC_GiveItem',
			content = ('ได้รับ %s จำนวน %s จาก %s'):format(label, itemCount, xPlayer.name),
			source = xTarget.source,
			color = 2,
			options = {
				important = (itemCount >= 500 and true)
			}
		})
	end)
elseif itemType == 'account' then
	local label = ESX.GetConfig().Accounts[itemName].label
	local count = ESX.Math.GroupDigits(itemCount)

	pcall(function()
		local eventName = (itemName == 'money' and 'NC_GiveMoney' or 'NC_GiveDirtyMoney')
	
		exports['azael_dc-serverlogs']:insertData({
			event = eventName,
			content = ('ส่ง %s จำนวน $%s ให้กับ %s'):format(label, count, xTarget.name),
			source = xPlayer.source,
			color = 1,
			options = {
				important = (itemCount >= 100000 and true)
			}
		})
	
		exports['azael_dc-serverlogs']:insertData({
			event = eventName,
			content = ('ได้รับ %s จำนวน $%s จาก %s'):format(label, count, xPlayer.name),
			source = xTarget.source,
			color = 2,
			options = {
				important = (itemCount >= 100000 and true)
			}
		})
	end)
elseif itemType == 'weapon' then
	local label = ESX.GetWeaponLabel(itemName)

	pcall(function()
		exports['azael_dc-serverlogs']:insertData({
			event = 'NC_GiveWeapon',
			content = ('ส่ง %s และ กระสุน จำนวน %s ให้กับ %s'):format(label, itemCount, xTarget.name),
			source = xPlayer.source,
			color = 1
		})
	
		exports['azael_dc-serverlogs']:insertData({
			event = 'NC_GiveWeapon',
			content = ('ได้รับ %s และ กระสุน จำนวน %s จาก %s'):format(label, itemCount, xPlayer.name),
			source = xTarget.source,
			color = 2
		})
	end)
elseif itemType == 'accessory' then
	pcall(function()
		exports['azael_dc-serverlogs']:insertData({
			event = 'NC_GiveAccessory',
			content = ('ส่ง %s ให้กับ %s'):format(itemName, xTarget.name),
			source = xPlayer.source,
			color = 1
		})

		exports['azael_dc-serverlogs']:insertData({
			event = 'NC_GiveAccessory',
			content = ('ได้รับ %s จาก %s'):format(itemName, xPlayer.name),
			source = xTarget.source,
			color = 2
		})
	end)
elseif itemType == 'vehicle_key' then
	pcall(function()
		exports['azael_dc-serverlogs']:insertData({
			event = 'NC_GiveKeyCar',
			content = ('ส่ง กุญแจยานพาหนะ ทะเบียน %s ให้กับ %s'):format(itemName, xTarget.name),
			source = xPlayer.source,
			color = 1
		})

		exports['azael_dc-serverlogs']:insertData({
			event = 'NC_GiveKeyCar',
			content = ('ได้รับ กุญแจยานพาหนะ ทะเบียน %s จาก %s'):format(itemName, xPlayer.name),
			source = xTarget.source,
			color = 2
		})
	end)
elseif itemType == 'house_key' then
	pcall(function()
		exports['azael_dc-serverlogs']:insertData({
			event = 'NC_GiveKeyHouse',
			content = ('ส่ง กุญแจบ้าน %s ให้กับ %s'):format(itemName, xTarget.name),
			source = xPlayer.source,
			color = 1
		})

		exports['azael_dc-serverlogs']:insertData({
			event = 'NC_GiveKeyHouse',
			content = ('ได้รับ กุญแจบ้าน %s จาก %s'):format(itemName, xPlayer.name),
			source = xTarget.source,
			color = 2
		})
	end)
end
```

### ผู้เล่น-ทิ้ง

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_RemoveItem`                        | ทิ้ง-ไอเทม
| `NC_RemoveMoney`                       | ทิ้ง-เงินเขียว
| `NC_RemoveDirtyMoney`                  | ทิ้ง-เงินแดง
| `NC_RemoveWeapon`                      | ทิ้ง-อาวุธ
| `NC_RemoveAccessory`                   | ทิ้ง-เครื่องประดับ
| `NC_RemoveKeyCar`                      | ทิ้ง-กุญแจรถ
| `NC_RemoveKeyHouse`                    | ทิ้ง-กุญแจบ้าน

วางรหัสด้านล่างนี้ภายใน `Config.ServerDroppedItem = function`

```lua
if itemType == 'item' then
	pcall(function()
		exports['azael_dc-serverlogs']:insertData({
			event = 'NC_RemoveItem',
			content = ('ทิ้ง %s จำนวน %s'):format(ESX.GetItemLabel(itemName), itemCount),
			source = xPlayer.source,
			color = 1,
			options = {
				important = (itemCount >= 500 and true)
			}
		})
	end)
elseif itemType == 'account' then
	pcall(function()
		exports['azael_dc-serverlogs']:insertData({
			event = (itemName == 'money' and 'NC_RemoveMoney' or 'NC_RemoveDirtyMoney'),
			content = ('ทิ้ง %s จำนวน $%s'):format(ESX.GetConfig().Accounts[itemName].label, ESX.Math.GroupDigits(itemCount)),
			source = xPlayer.source,
			color = 1,
			options = {
				important = (itemCount >= 100000 and true)
			}
		})
	end)
elseif itemType == 'weapon' then
	pcall(function()
		exports['azael_dc-serverlogs']:insertData({
			event = 'NC_RemoveWeapon',
			content = ('ทิ้ง %s และ กระสุน จำนวน %s'):format(ESX.GetWeaponLabel(itemName), itemCount),
			source = xPlayer.source,
			color = 1
		})
	end)
elseif itemType == 'accessory' then
	pcall(function()
		exports['azael_dc-serverlogs']:insertData({
			event = 'NC_RemoveAccessory',
			content = ('ทิ้ง %s'):format(itemName),
			source = xPlayer.source,
			color = 1
		})
	end)
elseif itemType == 'vehicle_key' then
	pcall(function()
		exports['azael_dc-serverlogs']:insertData({
			event = 'NC_RemoveKeyCar',
			content = ('ทิ้ง กุญแจยานพาหนะ ทะเบียน %s'):format(itemName),
			source = xPlayer.source,
			color = 1
		})
	end)
elseif itemType == 'house_key' then
	pcall(function()
		exports['azael_dc-serverlogs']:insertData({
			event = 'NC_RemoveKeyHouse',
			content = ('ทิ้ง กุญแจบ้าน %s'):format(itemName),
			source = xPlayer.source,
			color = 1
		})
	end)
end
```

### ตำรวจ-ยึดเข้าตู้เซฟ

<Tabs>
<TabItem value="nc_vault" label="nc_vault">

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_VaultPutItemPolice`                | ตำรวจ-ไอเทม-เข้าเซฟ
| `NC_VaultPutMoneyPolice`               | ตำรวจ-เงิน-เข้าเซฟ
| `NC_VaultPutWeaponPolice`              | ตำรวจ-อาวุธ-เข้าเซฟ

วางรหัสด้านล่างนี้ภายใน `Config.ServerSearchActionValidation = function`

1. วางรหัสด้านล่างนี้ต่อจาก `xTarget[RemoveFunc](itemName, itemCount)`

```lua
if itemType == 'item' then
	pcall(function()
		exports['azael_dc-serverlogs']:insertData({
			event = 'NC_VaultPutItemPolice',
			content = ('หน่วยงาน %s ฝาก %s จำนวน %s เข้าตู้นิรภัย (ยึดจาก %s)'):format(xPlayer.job.name, ESX.GetItemLabel(itemName), itemCount, xTarget.name),
			source = xPlayer.source,
			color = 2,
			options = {
				important = (itemCount >= 500 and true)
			}
		})
	end)
elseif itemType == 'account' then
	pcall(function()
		exports['azael_dc-serverlogs']:insertData({
			event = 'NC_VaultPutMoneyPolice',
			content = ('หน่วยงาน %s ฝาก %s จำนวน %s เข้าตู้นิรภัย (ยึดจาก %s)'):format(xPlayer.job.name, ESX.GetConfig().Accounts[itemName].label, ESX.Math.GroupDigits(itemCount), xTarget.name),
			source = xPlayer.source,
			color = 2,
			options = {
				important = (itemCount >= 100000 and true)
			}
		})
	end)
end
```

2. วางรหัสด้านล่างนี้ต่อจาก `xTarget[RemoveFunc](itemName)`

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'NC_VaultPutWeaponPolice',
		content = ('หน่วยงาน %s ฝาก %s และ กระสุน จำนวน %s เข้าตู้นิรภัย (ยึดจาก %s)'):format(xPlayer.job.name, ESX.GetWeaponLabel(itemName), itemCount, xTarget.name),
		source = xPlayer.source,
		color = 2
	})
end)
```

</TabItem>
<TabItem value="monster_vault" label="monster_vault">

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `VaultPutItemPolice`                   | ตำรวจ-ไอเทม-เข้าเซฟ
| `VaultPutMoneyPolice`                  | ตำรวจ-เงิน-เข้าเซฟ
| `VaultPutWeaponPolice`                 | ตำรวจ-อาวุธ-เข้าเซฟ

วางรหัสด้านล่างนี้ภายใน `Config.ServerSearchActionValidation = function`

1. วางรหัสด้านล่างนี้ต่อจาก `storage.addMoney(itemCount)`

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'VaultPutMoneyPolice',
		content = ('หน่วยงาน %s ฝาก %s จำนวน %s เข้าตู้นิรภัย (ยึดจาก %s)'):format(xPlayer.job.name, ESX.GetConfig().Accounts[itemName].label, ESX.Math.GroupDigits(itemCount), xTarget.name),
		source = xPlayer.source,
		color = 2,
		options = {
			important = (itemCount >= 100000 and true)
		}
	})
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `storage.addItem(itemName, itemCount)`

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'VaultPutItemPolice',
		content = ('หน่วยงาน %s ฝาก %s จำนวน %s เข้าตู้นิรภัย (ยึดจาก %s)'):format(xPlayer.job.name, ESX.GetItemLabel(itemName), itemCount, xTarget.name),
		source = xPlayer.source,
		color = 2,
		options = {
			important = (itemCount >= 500 and true)
		}
	})
end)
```

3. วางรหัสด้านล่างนี้ต่อจาก `storage.set('weapons', storeWeapons)`

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'VaultPutWeaponPolice',
		content = ('หน่วยงาน %s ฝาก %s และ กระสุน จำนวน %s เข้าตู้นิรภัย (ยึดจาก %s)'):format(xPlayer.job.name, ESX.GetWeaponLabel(itemName), itemCount, xTarget.name),
		source = xPlayer.source,
		color = 2
	})
end)
```

</TabItem>
</Tabs>

### หน่วยงานยึด-ประชาชนปล้น

<Tabs>
<TabItem value="police" label="ตำรวจ">

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_PoliceTakeItem`                    | ตำรวจ-ยึด-ไอเทม
| `NC_PolicePutItem`                     | ตำรวจ-ยัด-ไอเทม
| `NC_PoliceTakeMoney`                   | ตำรวจ-ยึด-เงิน
| `NC_PolicePutMoney`                    | ตำรวจ-ยัด-เงิน
| `NC_PoliceTakeWeapon`                  | ตำรวจ-ยึด-อาวุธ
| `NC_PolicePutWeapon`                   | ตำรวจ-ยัด-อาวุธ

</TabItem>
<TabItem value="council" label="สภา">

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_CouncilTakeItem`                   | สภา-ยึด-ไอเทม
| `NC_CouncilPutItem`                    | สภา-ยัด-ไอเทม
| `NC_CouncilTakeMoney`                  | สภา-ยึด-เงิน
| `NC_CouncilPutMoney`                   | สภา-ยัด-เงิน
| `NC_CouncilTakeWeapon`                 | สภา-ยึด-อาวุธ
| `NC_CouncilPutWeapon`                  | สภา-ยัด-อาวุธ

</TabItem>
<TabItem value="citizen" label="ปล้น">

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_CitizenTakeItem`                   | ปล้น-ยึด-ไอเทม
| `NC_CitizenPutItem`                    | ปล้น-ยัด-ไอเทม
| `NC_CitizenTakeMoney`                  | ปล้น-ยึด-เงิน
| `NC_CitizenPutMoney`                   | ปล้น-ยัด-เงิน
| `NC_CitizenTakeWeapon`                 | ปล้น-ยึด-อาวุธ
| `NC_CitizenPutWeapon`                  | ปล้น-ยัด-อาวุธ

</TabItem>
</Tabs>

วางรหัสด้านล่างนี้ภายใน `Config.ServerOnSearchAction = function`

```lua
if xPlayer.job.name == 'police' then -- ตำรวจ
	if dragAction == 'take' then -- ยึด
		if itemType == 'item' then
			local label = ESX.GetItemLabel(itemName)
			
			pcall(function()
				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_PoliceTakeItem',
					content = ('หน่วยงาน %s ยึด %s จำนวน %s จาก %s'):format(xPlayer.job.name, label, itemCount, xTarget.name),
					source = xPlayer.source,
					color = 2,
					options = {
						important = (itemCount >= 500 and true)
					}
				})

				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_PoliceTakeItem',
					content = ('ถูกยึด %s จำนวน %s โดย %s หน่วยงาน %s'):format(label, itemCount, xPlayer.name, xPlayer.job.name),
					source = xTarget.source,
					color = 3,
					options = {
						important = (itemCount >= 500 and true)
					}
				})
			end)
		elseif itemType == 'account' then
			local label = ESX.GetConfig().Accounts[itemName].label
			local count = ESX.Math.GroupDigits(itemCount)

			pcall(function()
				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_PoliceTakeMoney',
					content = ('หน่วยงาน %s ยึด %s จำนวน $%s จาก %s'):format(xPlayer.job.name, label, count, xTarget.name),
					source = xPlayer.source,
					color = 2,
					options = {
						important = (itemCount >= 100000 and true)
					}
				})

				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_PoliceTakeMoney',
					content = ('ถูกยึด %s จำนวน $%s โดย %s หน่วยงาน %s'):format(label, count, xPlayer.name, xPlayer.job.name),
					source = xTarget.source,
					color = 3,
					options = {
						important = (itemCount >= 100000 and true)
					}
				})
			end)
		elseif itemType == 'weapon' then
			local label = ESX.GetWeaponLabel(itemName)

			pcall(function()
				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_PoliceTakeWeapon',
					content = ('หน่วยงาน %s ยึด %s และ กระสุน จำนวน %s จาก %s'):format(xPlayer.job.name, label, itemCount, xTarget.name),
					source = xPlayer.source,
					color = 2
				})

				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_PoliceTakeWeapon',
					content = ('ถูกยึด %s และ กระสุน จำนวน %s โดย %s หน่วยงาน %s'):format(label, itemCount, xPlayer.name, xPlayer.job.name),
					source = xTarget.source,
					color = 3
				})
			end)
		end
	elseif dragAction == 'put' then -- ยัด
		if itemType == 'item' then
			local label = ESX.GetItemLabel(itemName)

			pcall(function()
				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_PolicePutItem',
					content = ('หน่วยงาน %s ยัด %s จำนวน %s ไปยัง %s'):format(xPlayer.job.name, label, itemCount, xTarget.name),
					source = xPlayer.source,
					color = 2,
					options = {
						important = (itemCount >= 500 and true)
					}
				})

				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_PolicePutItem',
					content = ('ถูกยัด %s จำนวน %s โดย %s หน่วยงาน %s'):format(label, itemCount, xPlayer.name, xPlayer.job.name),
					source = xTarget.source,
					color = 3,
					options = {
						important = (itemCount >= 500 and true)
					}
				})
			end)
		elseif itemType == 'account' then
			local label = ESX.GetConfig().Accounts[itemName].label
			local count = ESX.Math.GroupDigits(itemCount)

			pcall(function()
				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_PolicePutMoney',
					content = ('หน่วยงาน %s ยัด %s จำนวน $%s ไปยัง %s'):format(xPlayer.job.name, label, count, xTarget.name),
					source = xPlayer.source,
					color = 2,
					options = {
						important = (itemCount >= 100000 and true)
					}
				})

				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_PolicePutMoney',
					content = ('ถูกยัด %s จำนวน $%s โดย %s หน่วยงาน %s'):format(label, count, xPlayer.name, xPlayer.job.name),
					source = xTarget.source,
					color = 3,
					options = {
						important = (itemCount >= 100000 and true)
					}
				})
			end)
		elseif itemType == 'weapon' then
			local label = ESX.GetWeaponLabel(itemName)

			pcall(function()
				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_PolicePutWeapon',
					content = ('หน่วยงาน %s ยัด %s และ กระสุน จำนวน %s ไปยัง %s'):format(xPlayer.job.name, label, itemCount, xTarget.name),
					source = xPlayer.source,
					color = 2
				})

				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_PolicePutWeapon',
					content = ('ถูกยัด %s และ กระสุน จำนวน %s โดย %s หน่วยงาน %s'):format(label, itemCount, xPlayer.name, xPlayer.job.name),
					source = xTarget.source,
					color = 3
				})
			end)
		end
	end
elseif xPlayer.job.name == 'council' then -- สภา
	if dragAction == 'take' then -- ยึด
		if itemType == 'item' then
			local label = ESX.GetItemLabel(itemName)
			
			pcall(function()
				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CouncilTakeItem',
					content = ('หน่วยงาน %s ยึด %s จำนวน %s จาก %s'):format(xPlayer.job.name, label, itemCount, xTarget.name),
					source = xPlayer.source,
					color = 2,
					options = {
						important = (itemCount >= 500 and true)
					}
				})

				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CouncilTakeItem',
					content = ('ถูกยึด %s จำนวน %s โดย %s หน่วยงาน %s'):format(label, itemCount, xPlayer.name, xPlayer.job.name),
					source = xTarget.source,
					color = 3,
					options = {
						important = (itemCount >= 500 and true)
					}
				})
			end)
		elseif itemType == 'account' then
			local label = ESX.GetConfig().Accounts[itemName].label
			local count = ESX.Math.GroupDigits(itemCount)

			pcall(function()
				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CouncilTakeMoney',
					content = ('หน่วยงาน %s ยึด %s จำนวน $%s จาก %s'):format(xPlayer.job.name, label, count, xTarget.name),
					source = xPlayer.source,
					color = 2,
					options = {
						important = (itemCount >= 100000 and true)
					}
				})

				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CouncilTakeMoney',
					content = ('ถูกยึด %s จำนวน $%s โดย %s หน่วยงาน %s'):format(label, count, xPlayer.name, xPlayer.job.name),
					source = xTarget.source,
					color = 3,
					options = {
						important = (itemCount >= 100000 and true)
					}
				})
			end)
		elseif itemType == 'weapon' then
			local label = ESX.GetWeaponLabel(itemName)

			pcall(function()
				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CouncilTakeWeapon',
					content = ('หน่วยงาน %s ยึด %s และ กระสุน จำนวน %s จาก %s'):format(xPlayer.job.name, label, itemCount, xTarget.name),
					source = xPlayer.source,
					color = 2
				})

				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CouncilTakeWeapon',
					content = ('ถูกยึด %s และ กระสุน จำนวน %s โดย %s หน่วยงาน %s'):format(label, itemCount, xPlayer.name, xPlayer.job.name),
					source = xTarget.source,
					color = 3
				})
			end)
		end
	elseif dragAction == 'put' then -- ยัด
		if itemType == 'item' then
			local label = ESX.GetItemLabel(itemName)

			pcall(function()
				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CouncilPutItem',
					content = ('หน่วยงาน %s ยัด %s จำนวน %s ไปยัง %s'):format(xPlayer.job.name, label, itemCount, xTarget.name),
					source = xPlayer.source,
					color = 2,
					options = {
						important = (itemCount >= 500 and true)
					}
				})

				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CouncilPutItem',
					content = ('ถูกยัด %s จำนวน %s โดย %s หน่วยงาน %s'):format(label, itemCount, xPlayer.name, xPlayer.job.name),
					source = xTarget.source,
					color = 3,
					options = {
						important = (itemCount >= 500 and true)
					}
				})
			end)
		elseif itemType == 'account' then
			local label = ESX.GetConfig().Accounts[itemName].label
			local count = ESX.Math.GroupDigits(itemCount)

			pcall(function()
				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CouncilPutMoney',
					content = ('หน่วยงาน %s ยัด %s จำนวน $%s ไปยัง %s'):format(xPlayer.job.name, label, count, xTarget.name),
					source = xPlayer.source,
					color = 2,
					options = {
						important = (itemCount >= 100000 and true)
					}
				})

				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CouncilPutMoney',
					content = ('ถูกยัด %s จำนวน $%s โดย %s หน่วยงาน %s'):format(label, count, xPlayer.name, xPlayer.job.name),
					source = xTarget.source,
					color = 3,
					options = {
						important = (itemCount >= 100000 and true)
					}
				})
			end)
		elseif itemType == 'weapon' then
			local label = ESX.GetWeaponLabel(itemName)

			pcall(function()
				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CouncilPutWeapon',
					content = ('หน่วยงาน %s ยัด %s และ กระสุน จำนวน %s ไปยัง %s'):format(xPlayer.job.name, label, itemCount, xTarget.name),
					source = xPlayer.source,
					color = 2
				})

				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CouncilPutWeapon',
					content = ('ถูกยัด %s และ กระสุน จำนวน %s โดย %s หน่วยงาน %s'):format(label, itemCount, xPlayer.name, xPlayer.job.name),
					source = xTarget.source,
					color = 3
				})
			end)
		end
	end
else -- ประชาชน (ปล้น)
	if dragAction == 'take' then -- ยึด
		if itemType == 'item' then
			local label = ESX.GetItemLabel(itemName)
			
			pcall(function()
				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CitizenTakeItem',
					content = ('หน่วยงาน %s ยึด %s จำนวน %s จาก %s'):format(xPlayer.job.name, label, itemCount, xTarget.name),
					source = xPlayer.source,
					color = 2,
					options = {
						important = (itemCount >= 500 and true)
					}
				})

				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CitizenTakeItem',
					content = ('ถูกยึด %s จำนวน %s โดย %s หน่วยงาน %s'):format(label, itemCount, xPlayer.name, xPlayer.job.name),
					source = xTarget.source,
					color = 3,
					options = {
						important = (itemCount >= 500 and true)
					}
				})
			end)
		elseif itemType == 'account' then
			local label = ESX.GetConfig().Accounts[itemName].label
			local count = ESX.Math.GroupDigits(itemCount)

			pcall(function()
				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CitizenTakeMoney',
					content = ('หน่วยงาน %s ยึด %s จำนวน $%s จาก %s'):format(xPlayer.job.name, label, count, xTarget.name),
					source = xPlayer.source,
					color = 2,
					options = {
						important = (itemCount >= 100000 and true)
					}
				})

				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CitizenTakeMoney',
					content = ('ถูกยึด %s จำนวน $%s โดย %s หน่วยงาน %s'):format(label, count, xPlayer.name, xPlayer.job.name),
					source = xTarget.source,
					color = 3,
					options = {
						important = (itemCount >= 100000 and true)
					}
				})
			end)
		elseif itemType == 'weapon' then
			local label = ESX.GetWeaponLabel(itemName)

			pcall(function()
				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CitizenTakeWeapon',
					content = ('หน่วยงาน %s ยึด %s และ กระสุน จำนวน %s จาก %s'):format(xPlayer.job.name, label, itemCount, xTarget.name),
					source = xPlayer.source,
					color = 2
				})

				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CitizenTakeWeapon',
					content = ('ถูกยึด %s และ กระสุน จำนวน %s โดย %s หน่วยงาน %s'):format(label, itemCount, xPlayer.name, xPlayer.job.name),
					source = xTarget.source,
					color = 3
				})
			end)
		end
	elseif dragAction == 'put' then -- ยัด
		if itemType == 'item' then
			local label = ESX.GetItemLabel(itemName)

			pcall(function()
				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CitizenPutItem',
					content = ('หน่วยงาน %s ยัด %s จำนวน %s ไปยัง %s'):format(xPlayer.job.name, label, itemCount, xTarget.name),
					source = xPlayer.source,
					color = 2,
					options = {
						important = (itemCount >= 500 and true)
					}
				})

				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CitizenPutItem',
					content = ('ถูกยัด %s จำนวน %s โดย %s หน่วยงาน %s'):format(label, itemCount, xPlayer.name, xPlayer.job.name),
					source = xTarget.source,
					color = 3,
					options = {
						important = (itemCount >= 500 and true)
					}
				})
			end)
		elseif itemType == 'account' then
			local label = ESX.GetConfig().Accounts[itemName].label
			local count = ESX.Math.GroupDigits(itemCount)

			pcall(function()
				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CitizenPutMoney',
					content = ('หน่วยงาน %s ยัด %s จำนวน $%s ไปยัง %s'):format(xPlayer.job.name, label, count, xTarget.name),
					source = xPlayer.source,
					color = 2,
					options = {
						important = (itemCount >= 100000 and true)
					}
				})

				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CitizenPutMoney',
					content = ('ถูกยัด %s จำนวน $%s โดย %s หน่วยงาน %s'):format(label, count, xPlayer.name, xPlayer.job.name),
					source = xTarget.source,
					color = 3,
					options = {
						important = (itemCount >= 100000 and true)
					}
				})
			end)
		elseif itemType == 'weapon' then
			local label = ESX.GetWeaponLabel(itemName)

			pcall(function()
				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CitizenPutWeapon',
					content = ('หน่วยงาน %s ยัด %s และ กระสุน จำนวน %s ไปยัง %s'):format(xPlayer.job.name, label, itemCount, xTarget.name),
					source = xPlayer.source,
					color = 2
				})

				exports['azael_dc-serverlogs']:insertData({
					event = 'NC_CitizenPutWeapon',
					content = ('ถูกยัด %s และ กระสุน จำนวน %s โดย %s หน่วยงาน %s'):format(label, itemCount, xPlayer.name, xPlayer.job.name),
					source = xTarget.source,
					color = 3
				})
			end)
		end
	end
end
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
