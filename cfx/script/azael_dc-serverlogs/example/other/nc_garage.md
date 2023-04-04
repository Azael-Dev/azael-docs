---
sidebar_label: nc_garage
---

# nc_garage

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[nc_garage](https://fivem.nc-developer.com/product/640e2c2918dc1)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## config.functions.client.lua

ไปยัง **`config.functions.client.lua`** แล้วดำเนินการเปิดไฟล์

### เบิกรถ-การาจ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_GetVehicleGarage`                  | เบิกรถ-การาจ

วางรหัสด้านล่างนี้ภายใน `Config.ClientSpawnedVehicle = function`

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'NC_GetVehicleGarage',
		content = ('เบิก ยานพาหนะ %s ทะเบียน %s ออกจาก %s (ZONE: %s)'):format(GetDisplayNameFromVehicleModel(properties.model), plate, zoneType, zoneName),
		coords = type(zoneCoords) == 'vector3' and zoneCoords,
		color = 7
	})
end)
```

### เบิกรถ-พาวท์

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_GetVehiclePound`                   | เบิกรถ-พาวท์

วางรหัสด้านล่างนี้ภายใน `Config.ClientPoundedVehicle = function`

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'NC_GetVehiclePound',
		content = ('เบิก ยานพาหนะ %s ทะเบียน %s ออกจาก %s (ZONE: %s)'):format(GetDisplayNameFromVehicleModel(properties.model), plate, zoneType, zoneName),
		coords = type(zoneCoords) == 'vector3' and zoneCoords,
		color = 3
	})
end)
```

### เก็บรถ-การาจ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_PutVehicleGarage`                  | เก็บรถ-การาจ

วางรหัสด้านล่างนี้ภายใน `Config.ClientStoredVehicle = function`

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'NC_PutVehicleGarage',
		content = ('เก็บ ยานพาหนะ %s ทะเบียน %s เข้า %s (ZONE: %s | TARGET: %s)'):format(GetDisplayNameFromVehicleModel(properties.model), plate, zoneType, zoneName, target),
		coords = type(zoneCoords) == 'vector3' and zoneCoords,
		color = 7
	})
end)
```

### ย้ายรถ-การาจ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_MoveVehicleGarage`                 | ย้ายรถ-การาจ

วางรหัสด้านล่างนี้ภายใน `Config.ClientStoredVehicle = function`

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'NC_MoveVehicleGarage',
		content = ('ย้าย ยานพาหนะ %s ทะเบียน %s เข้า %s (ZONE: %s | TARGET: %s)'):format(GetDisplayNameFromVehicleModel(properties.model), plate, zoneType, zoneName, target),
		coords = type(zoneCoords) == 'vector3' and zoneCoords,
		color = 2
	})
end)
```
