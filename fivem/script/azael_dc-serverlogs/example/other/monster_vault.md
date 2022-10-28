---
sidebar_label: monster_vault
---
##
# monster_vault

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[monster_vault](https://github.com/MonsterTaerAttO/monster_vault)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Server)

ไปยังโฟลเดอร์ **[server](https://github.com/MonsterTaerAttO/monster_vault/tree/master/server)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/MonsterTaerAttO/monster_vault/blob/master/server/main.lua)**

### หน่วยงาน-ไอเทม-ออกเซฟ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `VaultGetItemPolice`                   | ตำรวจ-ไอเทม-ออกเซฟ
| `VaultGetItemAmbulance`                | หมอ-ไอเทม-ออกเซฟ
| `VaultGetItemMechanic`                 | ช่าง-ไอเทม-ออกเซฟ
| `VaultGetItemCouncil`                  | สภา-ไอเทม-ออกเซฟ

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addInventoryItem(item, count)` บรรทัดที่ **[24](https://github.com/MonsterTaerAttO/monster_vault/blob/master/server/main.lua#L24)**

```lua
pcall(function()
	local eventName = xPlayer.job.name:match('police') and 'VaultGetItemPolice' -- ตำรวจ
		or xPlayer.job.name:match('ambulance') and 'VaultGetItemAmbulance' -- หมอ
		or xPlayer.job.name:match('mechanic') and 'VaultGetItemMechanic' -- ช่าง
		or xPlayer.job.name:match('council') and 'VaultGetItemCouncil' -- สภา
		or 'VaultGetItem' -- ทั่วไป (หากไม่เข้าเงื่อนไข ข้อมูลจะถูกส่งไปยังตู้เซฟทั่วไป)

	exports['azael_dc-serverlogs']:insertData({
		event = eventName,
		content = ('นำ %s จำนวน %s ออกจากตู้นิรภัย (หน่วยงาน: %s)'):format(inventoryItem.label, ESX.Math.GroupDigits(count), xPlayer.job.name),
		source = xPlayer.source,
		color = 1,
		options = {
			important = (count >= 500 and true)
		}
	})
end)
```

### ทั่วไป-ไอเทม-ออกเซฟ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `VaultGetItem`                         | ทั่วไป-ไอเทม-ออกเซฟ

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addInventoryItem(item, count)` บรรทัดที่ **[42](https://github.com/MonsterTaerAttO/monster_vault/blob/master/server/main.lua#L42)**

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'VaultGetItem',
		content = ('นำ %s จำนวน %s ออกจากตู้นิรภัย'):format(inventoryItem.label, ESX.Math.GroupDigits(count)),
		source = xPlayer.source,
		color = 1,
		options = {
			important = (count >= 500 and true)
		}
	})
end)
```

### หน่วยงาน-เงิน-ออกเซฟ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `VaultGetMoneyPolice`                  | ตำรวจ-เงิน-ออกเซฟ
| `VaultGetMoneyAmbulance`               | หมอ-เงิน-ออกเซฟ
| `VaultGetMoneyMechanic`                | ช่าง-เงิน-ออกเซฟ
| `VaultGetMoneyCouncil`                 | สภา-เงิน-ออกเซฟ

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addAccountMoney(item, count)` บรรทัดที่ **[60](https://github.com/MonsterTaerAttO/monster_vault/blob/master/server/main.lua#L60)**

```lua
pcall(function()
	local eventName = xPlayer.job.name:match('police') and 'VaultGetMoneyPolice' -- ตำรวจ
		or xPlayer.job.name:match('ambulance') and 'VaultGetMoneyAmbulance' -- หมอ
		or xPlayer.job.name:match('mechanic') and 'VaultGetMoneyMechanic' -- ช่าง
		or xPlayer.job.name:match('council') and 'VaultGetMoneyCouncil' -- สภา
		or 'VaultGetMoney' -- ทั่วไป (หากไม่เข้าเงื่อนไข ข้อมูลจะถูกส่งไปยังตู้เซฟทั่วไป)

	exports['azael_dc-serverlogs']:insertData({
		event = eventName,
		content = ('นำ %s จำนวน $%s ออกจากตู้นิรภัย (หน่วยงาน: %s)'):format(item, ESX.Math.GroupDigits(count), xPlayer.job.name),
		source = xPlayer.source,
		color = 1,
		options = {
			important = (count >= 100000 and true)
		}
	})
end)
```

### ทั่วไป-เงิน-ออกเซฟ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `VaultGetMoney`                        | ทั่วไป-เงิน-ออกเซฟ

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addAccountMoney(item, count)` บรรทัดที่ **[71](https://github.com/MonsterTaerAttO/monster_vault/blob/master/server/main.lua#L71)**

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'VaultGetMoney',
		content = ('นำ %s จำนวน $%s ออกจากตู้นิรภัย'):format(item, ESX.Math.GroupDigits(count)),
		source = xPlayer.source,
		color = 1,
		options = {
			important = (count >= 100000 and true)
		}
	})
end)
```

### หน่วยงาน-อาวุธ-ออกเซฟ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `VaultGetMoneyPolice`                  | ตำรวจ-อาวุธ-ออกเซฟ
| `VaultGetMoneyAmbulance`               | หมอ-อาวุธ-ออกเซฟ
| `VaultGetMoneyMechanic`                | ช่าง-อาวุธ-ออกเซฟ
| `VaultGetMoneyCouncil`                 | สภา-อาวุธ-ออกเซฟ

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addWeapon(weaponName, ammo)` บรรทัดที่ **[97](https://github.com/MonsterTaerAttO/monster_vault/blob/master/server/main.lua#L97)**

```lua
pcall(function()
	local eventName = xPlayer.job.name:match('police') and 'VaultGetWeaponPolice' -- ตำรวจ
		or xPlayer.job.name:match('ambulance') and 'VaultGetWeaponAmbulance' -- หมอ
		or xPlayer.job.name:match('mechanic') and 'VaultGetWeaponMechanic' -- ช่าง
		or xPlayer.job.name:match('council') and 'VaultGetWeaponCouncil' -- สภา
		or 'VaultGetWeapon' -- ทั่วไป (หากไม่เข้าเงื่อนไข ข้อมูลจะถูกส่งไปยังตู้เซฟทั่วไป)

	exports['azael_dc-serverlogs']:insertData({
		event = eventName,
		content = ('นำ %s และ กระสุน จำนวน %s ออกจากตู้นิรภัย (หน่วยงาน: %s)'):format(ESX.GetWeaponLabel(weaponName), ESX.Math.GroupDigits(ammo or 0), xPlayer.job.name),
		source = xPlayer.source,
		color = 1
	})
end)
```

### ทั่วไป-อาวุธ-ออกเซฟ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `VaultGetWeapon`                       | ทั่วไป-อาวุธ-ออกเซฟ

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addWeapon(weaponName, ammo)` บรรทัดที่ **[116](https://github.com/MonsterTaerAttO/monster_vault/blob/master/server/main.lua#L116)**

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'VaultGetWeapon',
		content = ('นำ %s และ กระสุน จำนวน %s ออกจากตู้นิรภัย'):format(ESX.GetWeaponLabel(weaponName), ESX.Math.GroupDigits(ammo or 0)),
		source = xPlayer.source,
		color = 1
	})
end)
```

### หน่วยงาน-ไอเทม-เข้าเซฟ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `VaultPutItemPolice`                   | ตำรวจ-ไอเทม-เข้าเซฟ
| `VaultPutItemAmbulance`                | หมอ-ไอเทม-เข้าเซฟ
| `VaultPutItemMechanic`                 | ช่าง-ไอเทม-เข้าเซฟ
| `VaultPutItemCouncil`                  | สภา-ไอเทม-เข้าเซฟ

วางรหัสด้านล่างนี้ต่อจาก `inventory.addItem(item, count)` บรรทัดที่ **[139](https://github.com/MonsterTaerAttO/monster_vault/blob/master/server/main.lua#L139)**

```lua
pcall(function()
	local eventName = xPlayer.job.name:match('police') and 'VaultPutItemPolice' -- ตำรวจ
		or xPlayer.job.name:match('ambulance') and 'VaultPutItemAmbulance' -- หมอ
		or xPlayer.job.name:match('mechanic') and 'VaultPutItemMechanic' -- ช่าง
		or xPlayer.job.name:match('council') and 'VaultPutItemCouncil' -- สภา
		or 'VaultPutItem' -- ทั่วไป (หากไม่เข้าเงื่อนไข ข้อมูลจะถูกส่งไปยังตู้เซฟทั่วไป)

	exports['azael_dc-serverlogs']:insertData({
		event = eventName,
		content = ('ฝาก %s จำนวน %s เข้าตู้นิรภัย (หน่วยงาน: %s)'):format(inventory.getItem(item).label, ESX.Math.GroupDigits(count), xPlayer.job.name),
		source = xPlayer.source,
		color = 2,
		options = {
			important = (count >= 500 and true)
		}
	})
end)
```

### ทั่วไป-ไอเทม-เข้าเซฟ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `VaultPutItem`                         | ทั่วไป-ไอเทม-เข้าเซฟ

วางรหัสด้านล่างนี้ต่อจาก `inventory.addItem(item, count)` บรรทัดที่ **[146](https://github.com/MonsterTaerAttO/monster_vault/blob/master/server/main.lua#L146)**

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'VaultPutItem',
		content = ('ฝาก %s จำนวน %s เข้าตู้นิรภัย'):format(inventory.getItem(item).label, ESX.Math.GroupDigits(count)),
		source = xPlayer.source,
		color = 2,
		options = {
			important = (count >= 500 and true)
		}
	})
end)
```

### หน่วยงาน-เงิน-เข้าเซฟ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `VaultPutMoneyPolice`                  | ตำรวจ-เงิน-เข้าเซฟ
| `VaultPutMoneyAmbulance`               | หมอ-เงิน-เข้าเซฟ
| `VaultPutMoneyMechanic`                | ช่าง-เงิน-เข้าเซฟ
| `VaultPutMoneyCouncil`                 | สภา-เงิน-เข้าเซฟ

วางรหัสด้านล่างนี้ต่อจาก `account.addMoney(count)` บรรทัดที่ **[146](https://github.com/MonsterTaerAttO/monster_vault/blob/master/server/main.lua#L164)**

```lua
pcall(function()
	local eventName = xPlayer.job.name:match('police') and 'VaultPutMoneyPolice' -- ตำรวจ
		or xPlayer.job.name:match('ambulance') and 'VaultPutMoneyAmbulance' -- หมอ
		or xPlayer.job.name:match('mechanic') and 'VaultPutMoneyMechanic' -- ช่าง
		or xPlayer.job.name:match('council') and 'VaultPutMoneyCouncil' -- สภา
		or 'VaultPutMoney' -- ทั่วไป (หากไม่เข้าเงื่อนไข ข้อมูลจะถูกส่งไปยังตู้เซฟทั่วไป)

	exports['azael_dc-serverlogs']:insertData({
		event = eventName,
		content = ('ฝาก %s จำนวน $%s เข้าตู้นิรภัย (หน่วยงาน: %s)'):format(item, ESX.Math.GroupDigits(count), xPlayer.job.name),
		source = xPlayer.source,
		color = 2,
		options = {
			important = (count >= 100000 and true)
		}
	})
end)
```

### ทั่วไป-เงิน-เข้าเซฟ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `VaultPutMoney`                         | ทั่วไป-เงิน-เข้าเซฟ

วางรหัสด้านล่างนี้ต่อจาก `account.addMoney(count)` บรรทัดที่ **[168](https://github.com/MonsterTaerAttO/monster_vault/blob/master/server/main.lua#L168)**

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'VaultPutMoney',
		content = ('ฝาก %s จำนวน $%s เข้าตู้นิรภัย'):format(item, ESX.Math.GroupDigits(count)),
		source = xPlayer.source,
		color = 2,
		options = {
			important = (count >= 100000 and true)
		}
	})
end)
```

### หน่วยงาน-อาวุธ-เข้าเซฟ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `VaultPutWeaponPolice`                 | ตำรวจ-อาวุธ-เข้าเซฟ
| `VaultPutWeaponAmbulance`              | หมอ-อาวุธ-เข้าเซฟ
| `VaultPutWeaponMechanic`               | ช่าง-อาวุธ-เข้าเซฟ
| `VaultPutWeaponCouncil`                | สภา-อาวุธ-เข้าเซฟ

วางรหัสด้านล่างนี้ต่อจาก `store.set('weapons', storeWeapons)` บรรทัดที่ **[190](https://github.com/MonsterTaerAttO/monster_vault/blob/master/server/main.lua#L190)**

```lua
pcall(function()
	local eventName = xPlayer.job.name:match('police') and 'VaultPutWeaponPolice' -- ตำรวจ
		or xPlayer.job.name:match('ambulance') and 'VaultPutWeaponAmbulance' -- หมอ
		or xPlayer.job.name:match('mechanic') and 'VaultPutWeaponMechanic' -- ช่าง
		or xPlayer.job.name:match('council') and 'VaultPutWeaponCouncil' -- สภา
		or 'VaultPutWeapon' -- ทั่วไป (หากไม่เข้าเงื่อนไข ข้อมูลจะถูกส่งไปยังตู้เซฟทั่วไป)

	exports['azael_dc-serverlogs']:insertData({
		event = eventName,
		content = ('ฝาก %s และ กระสุน จำนวน %s เข้าตู้นิรภัย (หน่วยงาน: %s)'):format(ESX.GetWeaponLabel(item), ESX.Math.GroupDigits(count or 0), xPlayer.job.name),
		source = xPlayer.source,
		color = 2
	})
end)
```

### ทั่วไป-อาวุธ-เข้าเซฟ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `VaultPutWeapon`                       | ทั่วไป-อาวุธ-เข้าเซฟ

วางรหัสด้านล่างนี้ต่อจาก `store.set('weapons', storeWeapons)` บรรทัดที่ **[203](https://github.com/MonsterTaerAttO/monster_vault/blob/master/server/main.lua#L203)**

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'VaultPutWeapon',
		content = ('ฝาก %s และ กระสุน จำนวน %s ออกจากตู้นิรภัย'):format(ESX.GetWeaponLabel(item), ESX.Math.GroupDigits(count or 0)),
		source = xPlayer.source,
		color = 2
	})
end)
```
