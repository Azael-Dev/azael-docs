---
sidebar_label: nc_vehiclestorage
---

# nc_vehiclestorage

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[nc_vehiclestorage](https://fivem.nc-developer.com/product/63a42f41222c4)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## config.functions.server.lua

ไปยัง **`config.functions.server.lua`** แล้วดำเนินการเปิดไฟล์

### เงิน-เข้าท้ายรถ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_VehiclePutMoney`                   | เงิน-เข้าท้ายรถ

วางรหัสด้านล่างนี้ภายใน `Config.ServerPlayerPutAccount = function`

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'NC_VehiclePutMoney',
		content = ('ฝาก %s จำนวน $%s เข้าท้ายรถทะเบียน %s (TYPE: %s | MODEL: %s | CLASS: %s | OWNER: %s)'):format(accountName, ESX.Math.GroupDigits(accountAmount), plate, storageType, model, class, (isOwner and 'YES' or 'NO')),
		source = xPlayer.source,
		color = 2,
		options = {
			important = (accountAmount >= 100000 and true)
		}
	})
end)
```

### เงิน-ออกท้ายรถ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_VehicleGetMoney`                   | เงิน-ออกท้ายรถ

วางรหัสด้านล่างนี้ภายใน `Config.ServerPlayerTookAccount = function`

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'NC_VehicleGetMoney',
		content = ('นำ %s จำนวน $%s ออกท้ายรถทะเบียน %s (TYPE: %s | MODEL: %s | CLASS: %s | OWNER: %s)'):format(accountName, ESX.Math.GroupDigits(accountAmount), plate, storageType, model, class, (isOwner and 'YES' or 'NO')),
		source = xPlayer.source,
		color = 1,
		options = {
			important = (accountAmount >= 100000 and true)
		}
	})
end)
```

### ไอเทม-เข้าท้ายรถ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_VehiclePutItem`                    | ไอเทม-เข้าท้ายรถ

วางรหัสด้านล่างนี้ภายใน `Config.ServerPlayerPutItem = function`

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'NC_VehiclePutItem',
		content = ('ฝาก %s จำนวน %s เข้าท้ายรถทะเบียน %s (TYPE: %s | MODEL: %s | CLASS: %s | OWNER: %s)'):format(ESX.GetItemLabel(itemName), itemCount, plate, storageType, model, class, (isOwner and 'YES' or 'NO')),
		source = xPlayer.source,
		color = 2,
		options = {
			important = (itemCount >= 500 and true)
		}
	})
end)
```

### ไอเทม-ออกท้ายรถ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_VehicleGetItem`                    | ไอเทม-ออกท้ายรถ

วางรหัสด้านล่างนี้ภายใน `Config.ServerPlayerTookItem = function`

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'NC_VehicleGetItem',
		content = ('นำ %s จำนวน %s ออกท้ายรถทะเบียน %s (TYPE: %s | MODEL: %s | CLASS: %s | OWNER: %s)'):format(ESX.GetItemLabel(itemName), itemCount, plate, storageType, model, class, (isOwner and 'YES' or 'NO')),
		source = xPlayer.source,
		color = 1,
		options = {
			important = (itemCount >= 500 and true)
		}
	})
end)
```

### อาวุธ-เข้าท้ายรถ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_VehiclePutWeapon`                  | อาวุธ-เข้าท้ายรถ

วางรหัสด้านล่างนี้ภายใน `Config.ServerPlayerPutWeapon = function`

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'NC_VehiclePutWeapon',
		content = ('ฝาก %s และ กระสุน จำนวน %s เข้าท้ายรถทะเบียน %s (TYPE: %s | MODEL: %s | CLASS: %s | OWNER: %s)'):format(ESX.GetWeaponLabel(weaponName), (weaponAmmo or 0), plate, storageType, model, class, (isOwner and 'YES' or 'NO')),
		source = xPlayer.source,
		color = 2
	})
end)
```

### อาวุธ-ออกท้ายรถ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_VehicleGetWeapon`                  | อาวุธ-ออกท้ายรถ

วางรหัสด้านล่างนี้ภายใน `Config.ServerPlayerTookWeapon = function`

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'NC_VehicleGetWeapon',
		content = ('นำ %s และ กระสุน จำนวน %s ออกท้ายรถทะเบียน %s (TYPE: %s | MODEL: %s | CLASS: %s | OWNER: %s)'):format(ESX.GetWeaponLabel(weaponName), (weaponAmmo or 0), plate, storageType, model, class, (isOwner and 'YES' or 'NO')),
		source = xPlayer.source,
		color = 1
	})
end)
```
