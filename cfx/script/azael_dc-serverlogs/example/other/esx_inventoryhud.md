---
sidebar_label: esx_inventoryhud
---

# esx_inventoryhud

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx_inventoryhud](https://github.com/Trsak/esx_inventoryhud)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../index.md)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../index.md)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Server) & player.lua (Client)

1. ไปยังโฟลเดอร์ **[client](https://github.com/Trsak/esx_inventoryhud/tree/master/client)** แล้วดำเนินการเปิดไฟล์ **[player.lua](https://github.com/Trsak/esx_inventoryhud/blob/master/client/player.lua)**

```lua title="ค้นหา"
TriggerServerEvent("esx_inventoryhud:tradePlayerItem", GetPlayerServerId(PlayerId()), targetPlayer, data.item.type, data.item.name, count)
```

```lua title="แก้ไขเป็น"
TriggerServerEvent("esx_inventoryhud:tradePlayerItem", GetPlayerServerId(PlayerId()), targetPlayer, data.item.type, data.item.name, count, 'put')
```

```lua title="ค้นหา"
TriggerServerEvent("esx_inventoryhud:tradePlayerItem", targetPlayer, GetPlayerServerId(PlayerId()), data.item.type, data.item.name, count)
```

```lua title="แก้ไขเป็น"
TriggerServerEvent("esx_inventoryhud:tradePlayerItem", targetPlayer, GetPlayerServerId(PlayerId()), data.item.type, data.item.name, count, 'take')
```

2. ไปยังโฟลเดอร์ **[server](https://github.com/Trsak/esx_inventoryhud/tree/master/server)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/Trsak/esx_inventoryhud/blob/master/server/main.lua)**

```lua title="ค้นหา"
AddEventHandler("esx_inventoryhud:tradePlayerItem", function(from, target, type, itemName, itemCount)
```

```lua title="แก้ไขเป็น"
AddEventHandler("esx_inventoryhud:tradePlayerItem", function(from, target, type, itemName, itemCount, dragAction)
```

### หน่วยงานยึด-ประชาชนปล้น

<Tabs>
<TabItem value="police" label="ตำรวจ">

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `PoliceTakeItem`                    | ตำรวจ-ยึด-ไอเทม
| `PolicePutItem`                     | ตำรวจ-ยัด-ไอเทม
| `PoliceTakeMoney`                   | ตำรวจ-ยึด-เงิน
| `PolicePutMoney`                    | ตำรวจ-ยัด-เงิน
| `PoliceTakeWeapon`                  | ตำรวจ-ยึด-อาวุธ
| `PolicePutWeapon`                   | ตำรวจ-ยัด-อาวุธ

</TabItem>
<TabItem value="council" label="สภา">

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `CouncilTakeItem`                   | สภา-ยึด-ไอเทม
| `CouncilPutItem`                    | สภา-ยัด-ไอเทม
| `CouncilTakeMoney`                  | สภา-ยึด-เงิน
| `CouncilPutMoney`                   | สภา-ยัด-เงิน
| `CouncilTakeWeapon`                 | สภา-ยึด-อาวุธ
| `CouncilPutWeapon`                  | สภา-ยัด-อาวุธ

</TabItem>
<TabItem value="citizen" label="ปล้น">

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `CitizenTakeItem`                   | ปล้น-ยึด-ไอเทม
| `CitizenPutItem`                    | ปล้น-ยัด-ไอเทม
| `CitizenTakeMoney`                  | ปล้น-ยึด-เงิน
| `CitizenPutMoney`                   | ปล้น-ยัด-เงิน
| `CitizenTakeWeapon`                 | ปล้น-ยึด-อาวุธ
| `CitizenPutWeapon`                  | ปล้น-ยัด-อาวุธ

</TabItem>
</Tabs>

1. วางรหัสด้านล่างนี้ต่อจาก `targetXPlayer.addInventoryItem(itemName, itemCount)` บรรทัดที่ **[40](https://github.com/Trsak/esx_inventoryhud/blob/master/server/main.lua#L40)**

```lua
if dragAction == 'take' then -- ยึด-ไอเทม
	pcall(function()
		local eventName = targetXPlayer.job.name == 'police' and 'PoliceTakeItem'	-- ตำรวจ
			or targetXPlayer.job.name == 'council' and 'CouncilTakeItem' -- สภา
			or 'CitizenTakeItem' -- ประชาชน (ปล้น)

		exports['azael_dc-serverlogs']:insertData({
			event = eventName,
			content = ('หน่วยงาน %s ยึด %s จำนวน %s จาก %s'):format(targetXPlayer.job.name, targetItem.label, itemCount, sourceXPlayer.name),
			source = targetXPlayer.source,
			color = 2,
			options = {
				important = (itemCount >= 500 and true)
			}
		})

		exports['azael_dc-serverlogs']:insertData({
			event = eventName,
			content = ('ถูกยึด %s จำนวน %s โดย %s หน่วยงาน %s'):format(targetItem.label, itemCount, targetXPlayer.name, targetXPlayer.job.name),
			source = sourceXPlayer.source,
			color = 3,
			options = {
				important = (itemCount >= 500 and true)
			}
		})
	end)
elseif dragAction == 'put' then -- ยัด-ไอเทม
	pcall(function()
		local eventName = sourceXPlayer.job.name == 'police' and 'PolicePutItem'	-- ตำรวจ
			or sourceXPlayer.job.name == 'council' and 'CouncilPutItem' -- สภา
			or 'CitizenPutItem' -- ประชาชน (ปล้น)

		exports['azael_dc-serverlogs']:insertData({
			event = eventName,
			content = ('หน่วยงาน %s ยัด %s จำนวน %s ไปยัง %s'):format(sourceXPlayer.job.name, sourceItem.label, itemCount, targetXPlayer.name),
			source = sourceXPlayer.source,
			color = 2,
			options = {
				important = (itemCount >= 500 and true)
			}
		})

		exports['azael_dc-serverlogs']:insertData({
			event = eventName,
			content = ('ถูกยัด %s จำนวน %s โดย %s หน่วยงาน %s'):format(sourceItem.label, itemCount, sourceXPlayer.name, sourceXPlayer.job.name),
			source = targetXPlayer.source,
			color = 3,
			options = {
				important = (itemCount >= 500 and true)
			}
		})
	end)
end
```

2. วางรหัสด้านล่างนี้ต่อจาก `targetXPlayer.addMoney(itemCount)` บรรทัดที่ **[46](https://github.com/Trsak/esx_inventoryhud/blob/master/server/main.lua#L46)**

```lua
if dragAction == 'take' then -- ยึด-เงินเขียว
	pcall(function()
		local eventName = targetXPlayer.job.name == 'police' and 'PoliceTakeMoney'	-- ตำรวจ
			or targetXPlayer.job.name == 'council' and 'CouncilTakeMoney' -- สภา
			or 'CitizenTakeMoney' -- ประชาชน (ปล้น)

		exports['azael_dc-serverlogs']:insertData({
			event = eventName,
			content = ('หน่วยงาน %s ยึด %s จำนวน $%s จาก %s'):format(targetXPlayer.job.name, itemName, ESX.Math.GroupDigits(itemCount), sourceXPlayer.name),
			source = targetXPlayer.source,
			color = 2,
			options = {
				important = (itemCount >= 100000 and true)
			}
		})

		exports['azael_dc-serverlogs']:insertData({
			event = eventName,
			content = ('ถูกยึด %s จำนวน $%s โดย %s หน่วยงาน %s'):format(itemName, ESX.Math.GroupDigits(itemCount), targetXPlayer.name, targetXPlayer.job.name),
			source = sourceXPlayer.source,
			color = 3,
			options = {
				important = (itemCount >= 100000 and true)
			}
		})
	end)
elseif dragAction == 'put' then -- ยัด-เงินเขียว
	pcall(function()
		local eventName = sourceXPlayer.job.name == 'police' and 'PolicePutMoney'	-- ตำรวจ
			or sourceXPlayer.job.name == 'council' and 'CouncilPutMoney' -- สภา
			or 'CitizenPutMoney' -- ประชาชน (ปล้น)

		exports['azael_dc-serverlogs']:insertData({
			event = eventName,
			content = ('หน่วยงาน %s ยัด %s จำนวน $%s ไปยัง %s'):format(sourceXPlayer.job.name, itemName, ESX.Math.GroupDigits(itemCount), targetXPlayer.name),
			source = sourceXPlayer.source,
			color = 2,
			options = {
				important = (itemCount >= 100000 and true)
			}
		})

		exports['azael_dc-serverlogs']:insertData({
			event = eventName,
			content = ('ถูกยัด %s จำนวน %s โดย $%s หน่วยงาน %s'):format(itemName, ESX.Math.GroupDigits(itemCount), sourceXPlayer.name, sourceXPlayer.job.name),
			source = targetXPlayer.source,
			color = 3,
			options = {
				important = (itemCount >= 100000 and true)
			}
		})
	end)
end
```

3. วางรหัสด้านล่างนี้ต่อจาก `targetXPlayer.addAccountMoney(itemName, itemCount)` บรรทัดที่ **[51](https://github.com/Trsak/esx_inventoryhud/blob/master/server/main.lua#L51)**

```lua
if dragAction == 'take' then -- ยึด-เงินแดง
	pcall(function()
		local eventName = targetXPlayer.job.name == 'police' and 'PoliceTakeMoney'	-- ตำรวจ
			or targetXPlayer.job.name == 'council' and 'CouncilTakeMoney' -- สภา
			or 'CitizenTakeMoney' -- ประชาชน (ปล้น)

		exports['azael_dc-serverlogs']:insertData({
			event = eventName,
			content = ('หน่วยงาน %s ยึด %s จำนวน $%s จาก %s'):format(targetXPlayer.job.name, itemName, ESX.Math.GroupDigits(itemCount), sourceXPlayer.name),
			source = targetXPlayer.source,
			color = 2,
			options = {
				important = (itemCount >= 100000 and true)
			}
		})

		exports['azael_dc-serverlogs']:insertData({
			event = eventName,
			content = ('ถูกยึด %s จำนวน $%s โดย %s หน่วยงาน %s'):format(itemName, ESX.Math.GroupDigits(itemCount), targetXPlayer.name, targetXPlayer.job.name),
			source = sourceXPlayer.source,
			color = 3,
			options = {
				important = (itemCount >= 100000 and true)
			}
		})
	end)
elseif dragAction == 'put' then -- ยัด-เงินแดง
	pcall(function()
		local eventName = sourceXPlayer.job.name == 'police' and 'PolicePutMoney'	-- ตำรวจ
			or sourceXPlayer.job.name == 'council' and 'CouncilPutMoney' -- สภา
			or 'CitizenPutMoney' -- ประชาชน (ปล้น)

		exports['azael_dc-serverlogs']:insertData({
			event = eventName,
			content = ('หน่วยงาน %s ยัด %s จำนวน $%s ไปยัง %s'):format(sourceXPlayer.job.name, itemName, ESX.Math.GroupDigits(itemCount), targetXPlayer.name),
			source = sourceXPlayer.source,
			color = 2,
			options = {
				important = (itemCount >= 100000 and true)
			}
		})

		exports['azael_dc-serverlogs']:insertData({
			event = eventName,
			content = ('ถูกยัด %s จำนวน %s โดย $%s หน่วยงาน %s'):format(itemName, ESX.Math.GroupDigits(itemCount), sourceXPlayer.name, sourceXPlayer.job.name),
			source = targetXPlayer.source,
			color = 3,
			options = {
				important = (itemCount >= 100000 and true)
			}
		})
	end)
end
```

4. วางรหัสด้านล่างนี้ต่อจาก `targetXPlayer.addWeapon(itemName, itemCount)` บรรทัดที่ **[59](https://github.com/Trsak/esx_inventoryhud/blob/master/server/main.lua#L59)**

```lua
if dragAction == 'take' then -- ยึด-อาวุธ
	pcall(function()
		local eventName = targetXPlayer.job.name == 'police' and 'PoliceTakeWeapon'	-- ตำรวจ
			or targetXPlayer.job.name == 'council' and 'CouncilTakeWeapon' -- สภา
			or 'CitizenTakeWeapon' -- ประชาชน (ปล้น)

		local weaponlabel = ESX.GetWeaponLabel(itemName)

		exports['azael_dc-serverlogs']:insertData({
			event = eventName,
			content = ('หน่วยงาน %s ยึด %s จำนวน $%s จาก %s'):format(targetXPlayer.job.name, weaponlabel, (itemCount or 0), sourceXPlayer.name),
			source = targetXPlayer.source,
			color = 2
		})

		exports['azael_dc-serverlogs']:insertData({
			event = eventName,
			content = ('ถูกยึด %s จำนวน $%s โดย %s หน่วยงาน %s'):format(weaponlabel, (itemCount or 0), targetXPlayer.name, targetXPlayer.job.name),
			source = sourceXPlayer.source,
			color = 3
		})
	end)
elseif dragAction == 'put' then -- ยัด-อาวุธ
	pcall(function()
		local eventName = sourceXPlayer.job.name == 'police' and 'PolicePutWeapon'	-- ตำรวจ
			or sourceXPlayer.job.name == 'council' and 'CouncilPutWeapon' -- สภา
			or 'CitizenPutWeapon' -- ประชาชน (ปล้น)

		local weaponlabel = ESX.GetWeaponLabel(itemName)

		exports['azael_dc-serverlogs']:insertData({
			event = eventName,
			content = ('หน่วยงาน %s ยัด %s จำนวน $%s ไปยัง %s'):format(sourceXPlayer.job.name, weaponlabel, (itemCount or 0), targetXPlayer.name),
			source = sourceXPlayer.source,
			color = 2
		})

		exports['azael_dc-serverlogs']:insertData({
			event = eventName,
			content = ('ถูกยัด %s จำนวน %s โดย $%s หน่วยงาน %s'):format(weaponlabel, (itemCount or 0), sourceXPlayer.name, sourceXPlayer.job.name),
			source = targetXPlayer.source,
			color = 3
		})
	end)
end
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
