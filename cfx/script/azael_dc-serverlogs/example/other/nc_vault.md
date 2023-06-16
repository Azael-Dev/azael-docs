---
sidebar_label: nc_vault
---

# nc_vault

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[nc_vault](https://fivem.nc-developer.com/product/629a5542a1bab)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## config.functions.lua

ไปยัง **`config.functions.lua`** แล้วดำเนินการเปิดไฟล์

### เงิน-เข้าตู้เซฟ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_VaultPutMoney`                     | ทั่วไป-เงิน-เข้าเซฟ
| `NC_VaultPutMoneyPolice`               | ตำรวจ-เงิน-เข้าเซฟ
| `NC_VaultPutMoneyAmbulance`            | หมอ-เงิน-เข้าเซฟ
| `NC_VaultPutMoneyMechanic`             | ช่าง-เงิน-เข้าเซฟ
| `NC_VaultPutMoneyCouncil`              | สภา-เงิน-เข้าเซฟ
| `NC_VaultPutMoneyGang`                 | แก๊ง-เงิน-เข้าเซฟ

วางรหัสด้านล่างนี้ภายใน `Config.ServerPlayerPutAccount = function`

```lua
pcall(function()
	local eventName = vaultGroup:match('POLICE') and 'NC_VaultPutMoneyPolice' -- ตำรวจ
		or vaultGroup:match('AMBULANCE') and 'NC_VaultPutMoneyAmbulance' -- หมอ
		or vaultGroup:match('MECHANIC') and 'NC_VaultPutMoneyMechanic' -- ช่าง
		or vaultGroup:match('COUNCIL') and 'NC_VaultPutMoneyCouncil' -- สภา
		or vaultGroup:match('GANG') and 'NC_VaultPutMoneyGang' -- แก๊ง
		or 'NC_VaultPutMoney' -- ทั่วไป

	exports['azael_dc-serverlogs']:insertData({
		event = eventName,
		content = ('ฝาก %s จำนวน $%s เข้าตู้นิรภัย (ID: %s | GROUP: %s | OWNER: %s)'):format(accountName, ESX.Math.GroupDigits(accountAmount), vaultId, vaultGroup, (isOwner and 'YES' or 'NO')),
		source = xPlayer.source,
		color = 2,
		options = {
			important = (accountAmount >= 100000 and true)
		}
	})
end)
```

### เงิน-ออกตู้เซฟ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_VaultGetMoney`                     | ทั่วไป-เงิน-ออกเซฟ
| `NC_VaultGetMoneyPolice`               | ตำรวจ-เงิน-ออกเซฟ
| `NC_VaultGetMoneyAmbulance`            | หมอ-เงิน-ออกเซฟ
| `NC_VaultGetMoneyMechanic`             | ช่าง-เงิน-ออกเซฟ
| `NC_VaultGetMoneyCouncil`              | สภา-เงิน-ออกเซฟ
| `NC_VaultGetMoneyGang`                 | แก๊ง-เงิน-ออกเซฟ

วางรหัสด้านล่างนี้ภายใน `Config.ServerPlayerTookAccount = function`

```lua
pcall(function()
	local eventName = vaultGroup:match('POLICE') and 'NC_VaultGetMoneyPolice' -- ตำรวจ
		or vaultGroup:match('AMBULANCE') and 'NC_VaultGetMoneyAmbulance' -- หมอ
		or vaultGroup:match('MECHANIC') and 'NC_VaultGetMoneyMechanic' -- ช่าง
		or vaultGroup:match('COUNCIL') and 'NC_VaultGetMoneyCouncil' -- สภา
		or vaultGroup:match('GANG') and 'NC_VaultGetMoneyGang' -- แก๊ง
		or 'NC_VaultGetMoney' -- ทั่วไป

	exports['azael_dc-serverlogs']:insertData({
		event = eventName,
		content = ('นำ %s จำนวน $%s ออกจากตู้นิรภัย (ID: %s | GROUP: %s | OWNER: %s)'):format(accountName, ESX.Math.GroupDigits(accountAmount), vaultId, vaultGroup, (isOwner and 'YES' or 'NO')),
		source = xPlayer.source,
		color = 1,
		options = {
			important = (accountAmount >= 100000 and true)
		}
	})
end)
```

### ไอเทม-เข้าตู้เซฟ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_VaultPutItem`                      | ทั่วไป-ไอเทม-เข้าเซฟ
| `NC_VaultPutItemPolice`                | ตำรวจ-ไอเทม-เข้าเซฟ
| `NC_VaultPutItemAmbulance`             | หมอ-ไอเทม-เข้าเซฟ
| `NC_VaultPutItemMechanic`              | ช่าง-ไอเทม-เข้าเซฟ
| `NC_VaultPutItemCouncil`               | สภา-ไอเทม-เข้าเซฟ
| `NC_VaultPutItemGang`                  | แก๊ง-ไอเทม-เข้าเซฟ

วางรหัสด้านล่างนี้ภายใน `Config.ServerPlayerPutItem = function`

```lua
pcall(function()
	local eventName = vaultGroup:match('POLICE') and 'NC_VaultPutItemPolice' -- ตำรวจ
		or vaultGroup:match('AMBULANCE') and 'NC_VaultPutItemAmbulance' -- หมอ
		or vaultGroup:match('MECHANIC') and 'NC_VaultPutItemMechanic' -- ช่าง
		or vaultGroup:match('COUNCIL') and 'NC_VaultPutItemCouncil' -- สภา
		or vaultGroup:match('GANG') and 'NC_VaultPutItemGang' -- แก๊ง
		or 'NC_VaultPutItem' -- ทั่วไป

	exports['azael_dc-serverlogs']:insertData({
		event = eventName,
		content = ('ฝาก %s จำนวน %s เข้าตู้นิรภัย (ID: %s | GROUP: %s | OWNER: %s)'):format(ESX.GetItemLabel(itemName), itemCount, vaultId, vaultGroup, (isOwner and 'YES' or 'NO')),
		source = xPlayer.source,
		color = 2,
		options = {
			important = (itemCount >= 500 and true)
		}
	})
end)
```

### ไอเทม-ออกตู้เซฟ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_VaultGetItem`                      | ทั่วไป-ไอเทม-ออกเซฟ
| `NC_VaultGetItemPolice`                | ตำรวจ-ไอเทม-ออกเซฟ
| `NC_VaultGetItemAmbulance`             | หมอ-ไอเทม-ออกเซฟ
| `NC_VaultGetItemMechanic`              | ช่าง-ไอเทม-ออกเซฟ
| `NC_VaultGetItemCouncil`               | สภา-ไอเทม-ออกเซฟ
| `NC_VaultGetItemGang`                  | แก๊ง-ไอเทม-ออกเซฟ

วางรหัสด้านล่างนี้ภายใน `Config.ServerPlayerTookItem = function`

```lua
pcall(function()
	local eventName = vaultGroup:match('POLICE') and 'NC_VaultGetItemPolice' -- ตำรวจ
		or vaultGroup:match('AMBULANCE') and 'NC_VaultGetItemAmbulance' -- หมอ
		or vaultGroup:match('MECHANIC') and 'NC_VaultGetItemMechanic' -- ช่าง
		or vaultGroup:match('COUNCIL') and 'NC_VaultGetItemCouncil' -- สภา
		or vaultGroup:match('GANG') and 'NC_VaultGetItemGang' -- แก๊ง
		or 'NC_VaultGetItem' -- ทั่วไป

	exports['azael_dc-serverlogs']:insertData({
		event = eventName,
		content = ('นำ %s จำนวน %s ออกจากตู้นิรภัย (ID: %s | GROUP: %s | OWNER: %s)'):format(ESX.GetItemLabel(itemName), itemCount, vaultId, vaultGroup, (isOwner and 'YES' or 'NO')),
		source = xPlayer.source,
		color = 1,
		options = {
			important = (itemCount >= 500 and true)
		}
	})
end)
```

### อาวุธ-เข้าตู้เซฟ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_VaultPutWeapon`                    | ทั่วไป-อาวุธ-เข้าเซฟ
| `NC_VaultPutWeaponPolice`              | ตำรวจ-อาวุธ-เข้าเซฟ
| `NC_VaultPutWeaponAmbulance`           | หมอ-อาวุธ-เข้าเซฟ
| `NC_VaultPutWeaponMechanic`            | ช่าง-อาวุธ-เข้าเซฟ
| `NC_VaultPutWeaponCouncil`             | สภา-อาวุธ-เข้าเซฟ
| `NC_VaultPutWeaponGang`                | แก๊ง-อาวุธ-เข้าเซฟ

วางรหัสด้านล่างนี้ภายใน `Config.ServerPlayerPutWeapon = function`

```lua
pcall(function()
	local eventName = vaultGroup:match('POLICE') and 'NC_VaultPutWeaponPolice' -- ตำรวจ
		or vaultGroup:match('AMBULANCE') and 'NC_VaultPutWeaponAmbulance' -- หมอ
		or vaultGroup:match('MECHANIC') and 'NC_VaultPutWeaponMechanic' -- ช่าง
		or vaultGroup:match('COUNCIL') and 'NC_VaultPutWeaponCouncil' -- สภา
		or vaultGroup:match('GANG') and 'NC_VaultPutWeaponGang' -- แก๊ง
		or 'NC_VaultPutWeapon' -- ทั่วไป

	exports['azael_dc-serverlogs']:insertData({
		event = eventName,
		content = ('ฝาก %s และ กระสุน จำนวน %s เข้าตู้นิรภัย (ID: %s | GROUP: %s | OWNER: %s)'):format(ESX.GetWeaponLabel(weaponName), (weaponAmmo or 0), vaultId, vaultGroup, (isOwner and 'YES' or 'NO')),
		source = xPlayer.source,
		color = 2
	})
end)
```

### อาวุธ-ออกตู้เซฟ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_VaultGetWeapon`                    | ทั่วไป-อาวุธ-ออกเซฟ
| `NC_VaultGetWeaponPolice`              | ตำรวจ-อาวุธ-ออกเซฟ
| `NC_VaultGetWeaponAmbulance`           | หมอ-อาวุธ-ออกเซฟ
| `NC_VaultGetWeaponMechanic`            | ช่าง-อาวุธ-ออกเซฟ
| `NC_VaultGetWeaponCouncil`             | สภา-อาวุธ-ออกเซฟ
| `NC_VaultGetWeaponGang`                | แก๊ง-อาวุธ-ออกเซฟ

วางรหัสด้านล่างนี้ภายใน `Config.ServerPlayerTookWeapon = function`

```lua
pcall(function()
	local eventName = vaultGroup:match('POLICE') and 'NC_VaultGetWeaponPolice' -- ตำรวจ
		or vaultGroup:match('AMBULANCE') and 'NC_VaultGetWeaponAmbulance' -- หมอ
		or vaultGroup:match('MECHANIC') and 'NC_VaultGetWeaponMechanic' -- ช่าง
		or vaultGroup:match('COUNCIL') and 'NC_VaultGetWeaponCouncil' -- สภา
		or vaultGroup:match('GANG') and 'NC_VaultGetWeaponGang' -- แก๊ง
		or 'NC_VaultGetWeapon' -- ทั่วไป

	exports['azael_dc-serverlogs']:insertData({
		event = eventName,
		content = ('นำ %s และ กระสุน จำนวน %s ออกจากตู้นิรภัย (ID: %s | GROUP: %s | OWNER: %s)'):format(ESX.GetWeaponLabel(weaponName), (weaponAmmo or 0), vaultId, vaultGroup, (isOwner and 'YES' or 'NO')),
		source = xPlayer.source,
		color = 1
	})
end)
```

### สร้าง-ตู้เซฟ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_VaultCreated`                      | สร้าง-ตู้เซฟ

วางรหัสด้านล่างนี้ภายใน `Config.ServerCreatedVault = function`

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'NC_VaultCreated',
		content = ('สร้างตู้นิรภัย ID: %s GROUP: %s TYPE: %s'):format(vaultId, vaultGroup, vaultType),
		source = xPlayer.source,
		color = 2
	})
end)
```

### ลบ-ตู้เซฟ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_VaultRemoved`                      | ลบ-ตู้เซฟ

วางรหัสด้านล่างนี้ภายใน `Config.ServerRemovedVault = function`

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'NC_VaultRemoved',
		content = ('ลบตู้นิรภัย ID: %s GROUP: %s TYPE: %s'):format(vaultId, vaultGroup, vaultType),
		source = xPlayer.source,
		color = 1
	})
end)
```
