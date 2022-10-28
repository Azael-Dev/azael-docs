---
sidebar_label: es_extended
---

# es_extended

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[es_extended](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx%5D/es_extended)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## commands.lua (Server)

ไปยังโฟลเดอร์ **[server](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx%5D/es_extended/server)** แล้วดำเนินการเปิดไฟล์ **[commands.lua](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/commands.lua)**

### ใช้คำสั่ง-แอดมิน

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `AdminCommands`                        | ใช้คำสั่ง-แอดมิน

#### [SETJOB](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/commands.lua#L9)

วางรหัสด้านล่างนี้ต่อจาก `args.playerId.setJob(args.job, args.grade)` บรรทัดที่ **[11](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/commands.lua#L11)**

```lua
pcall(function()
    if xPlayer.source == args.playerId.source then
        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminCommands',
            content = ('เปลี่ยนอาชีพให้ตนเองเป็น %s ระดับ %s'):format(args.job, args.grade),
            source = xPlayer.source,
            color = 7
        })
    else
        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminCommands',
            content = ('เปลี่ยนอาชีพให้ %s เป็น %s ระดับ %s'):format(args.playerId.name, args.job, args.grade),
            source = xPlayer.source,
            color = 3
        })

        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminCommands',
            content = ('ถูกเปลี่ยนอาชีพเป็น %s ระดับ %s โดย %s'):format(args.job, args.grade, xPlayer.name),
            source = args.playerId.source,
            color = 2
        })
    end
end)
```

#### [SETACCOUNTMONEY](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/commands.lua#L70)

วางรหัสด้านล่างนี้ต่อจาก `args.playerId.setAccountMoney(args.account, args.amount, "Government Grant")` บรรทัดที่ **[72](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/commands.lua#L72)**

```lua
pcall(function()
    if xPlayer.source == args.playerId.source then
        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminCommands',
            content = ('กำหนด %s ให้ตนเองเป็น $%s'):format(args.account, ESX.Math.GroupDigits(args.amount)),
            source = xPlayer.source,
            color = 2,
            options = {
                important = (args.amount >= 100000 and true)
            }
        })
    else
        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminCommands',
            content = ('กำหนด %s ให้ %s เป็น $%s'):format(args.account, args.playerId.name, ESX.Math.GroupDigits(args.amount)),
            source = xPlayer.source,
            color = 3,
            options = {
                important = (args.amount >= 100000 and true)
            }
        })

        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminCommands',
            content = ('ถูกกำหนด %s เป็น $%s โดย %s'):format(args.account, ESX.Math.GroupDigits(args.amount), xPlayer.name),
            source = args.playerId.source,
            color = 2,
            options = {
                important = (args.amount >= 100000 and true)
            }
        })
    end
end)
```

#### [GIVEACCOUNTMONEY](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/commands.lua#L82)

วางรหัสด้านล่างนี้ต่อจาก `args.playerId.addAccountMoney(args.account, args.amount, "Government Grant")` บรรทัดที่ **[84](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/commands.lua#L84)**

```lua
pcall(function()
    if xPlayer.source == args.playerId.source then
        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminCommands',
            content = ('เพิ่ม %s จำนวน $%s ให้ตนเอง'):format(args.account, ESX.Math.GroupDigits(args.amount)),
            source = xPlayer.source,
            color = 2,
            options = {
                important = (args.amount >= 100000 and true)
            }
        })
    else
        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminCommands',
            content = ('เพิ่ม %s จำนวน $%s ให้ %s'):format(args.account, ESX.Math.GroupDigits(args.amount), args.playerId.name),
            source = xPlayer.source,
            color = 3,
            options = {
                important = (args.amount >= 100000 and true)
            }
        })

        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminCommands',
            content = ('ได้รับ %s จำนวน $%s โดย %s'):format(args.account, ESX.Math.GroupDigits(args.amount), xPlayer.name),
            source = args.playerId.source,
            color = 2,
            options = {
                important = (args.amount >= 100000 and true)
            }
        })
    end
end)
```

#### [GIVEITEM](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/commands.lua#L95)

วางรหัสด้านล่างนี้ต่อจาก `args.playerId.addInventoryItem(args.item, args.count)` บรรทัดที่ **[96](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/commands.lua#L96)**

```lua
pcall(function()
    if xPlayer.source == args.playerId.source then
        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminCommands',
            content = ('เพิ่ม %s จำนวน %s ให้ตนเอง'):format(ESX.GetItemLabel(args.item), args.count),
            source = xPlayer.source,
            color = 2,
            options = {
                important = (args.count >= 500 and true)
            }
        })
    else
        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminCommands',
            content = ('เพิ่ม %s จำนวน %s ให้ %s'):format(ESX.GetItemLabel(args.item), args.count, args.playerId.name),
            source = xPlayer.source,
            color = 3,
            options = {
                important = (args.count >= 500 and true)
            }
        })

        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminCommands',
            content = ('ได้รับ %s จำนวน %s โดย %s'):format(ESX.GetItemLabel(args.item), args.count, xPlayer.name),
            source = args.playerId.source,
            color = 2,
            options = {
                important = (args.count >= 500 and true)
            }
        })
    end
end)
```

#### [GIVEWEAPON](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/commands.lua#L103)

วางรหัสด้านล่างนี้ต่อจาก `args.playerId.addWeapon(args.weapon, args.ammo)` บรรทัดที่ **[107](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/commands.lua#L107)**

```lua
pcall(function()
    if xPlayer.source == args.playerId.source then
        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminCommands',
            content = ('เพิ่ม %s และ กระสุน จำนวน %s ให้ตนเอง'):format(ESX.GetWeaponLabel(args.weapon), args.ammo),
            source = xPlayer.source,
            color = 2
        })
    else
        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminCommands',
            content = ('เพิ่ม %s และ กระสุน จำนวน %s ให้ %s'):format(ESX.GetWeaponLabel(args.weapon), args.ammo, args.playerId.name),
            source = xPlayer.source,
            color = 3
        })

        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminCommands',
            content = ('ได้รับ %s และ กระสุน จำนวน %s โดย %s'):format(ESX.GetWeaponLabel(args.weapon), args.ammo, xPlayer.name),
            source = args.playerId.source,
            color = 2
        })
    end
end)
```

#### [GIVEAMMO](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/commands.lua#L115)

วางรหัสด้านล่างนี้ต่อจาก `args.playerId.addWeaponAmmo(args.weapon, args.ammo)` บรรทัดที่ **[117](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/commands.lua#L117)**

```lua
pcall(function()
    if xPlayer.source == args.playerId.source then
        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminCommands',
            content = ('เพิ่ม กระสุน ของ %s จำนวน %s ให้ตนเอง'):format(ESX.GetWeaponLabel(args.weapon), args.ammo),
            source = xPlayer.source,
            color = 2
        })
    else
        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminCommands',
            content = ('เพิ่ม กระสุน ของ %s จำนวน %s ให้ %s'):format(ESX.GetWeaponLabel(args.weapon), args.ammo, args.playerId.name),
            source = xPlayer.source,
            color = 3
        })

        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminCommands',
            content = ('ได้รับ กระสุน ของ %s จำนวน %s โดย %s'):format(ESX.GetWeaponLabel(args.weapon), args.ammo, xPlayer.name),
            source = args.playerId.source,
            color = 2
        })
    end
end)
```

#### [GIVEWEAPONCOMPONENT](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/commands.lua#L127)

วางรหัสด้านล่างนี้ต่อจาก `args.playerId.addWeaponComponent(args.weaponName, args.componentName)` บรรทัดที่ **[135](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/commands.lua#L135)**

```lua
pcall(function()
    if xPlayer.source == args.playerId.source then
        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminCommands',
            content = ('เพิ่ม %s ส่วนประกอบของ %s ให้ตนเอง'):format(component.label, ESX.GetWeaponLabel(args.weaponName)),
            source = xPlayer.source,
            color = 2
        })
    else
        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminCommands',
            content = ('เพิ่ม %s ส่วนประกอบของ %s ให้ %s'):format(component.label, ESX.GetWeaponLabel(args.weaponName), args.playerId.name),
            source = xPlayer.source,
            color = 3
        })

        exports['azael_dc-serverlogs']:insertData({
            event = 'AdminCommands',
            content = ('ได้รับ %s ส่วนประกอบของ %s โดย %s'):format(component.label, ESX.GetWeaponLabel(args.weaponName), xPlayer.name),
            source = args.playerId.source,
            color = 2
        })
    end
end)
```

## main.lua (Server)

ไปยังโฟลเดอร์ **[server](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx%5D/es_extended/server)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/main.lua)**

:::caution

หากคุณใช้งานทรัพยากร **[nc_inventory](https://fivem.nc-developer.com/product/61e3d296e287e)** ไม่ต้องติดตั้งรหัสสำหรับเหตุการณ์ **ส่ง**, **ทิ้ง** ที่ทรัพยากร **[es_extended](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx%5D/es_extended)** เนื่องจาก **[nc_inventory](https://fivem.nc-developer.com/product/61e3d296e287e)** จะใช้งานรหัสภายในตัวทรัพยากร (ไม่ได้พึ่งพา **[es_extended](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx%5D/es_extended)**)

:::

### ส่ง-ไอเทม

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `GiveItem`                             | ส่ง-ไอเทม

วางรหัสด้านล่างนี้ต่อจาก `targetXPlayer.addInventoryItem(itemName, itemCount)` บรรทัดที่ **[399](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/main.lua#L399)**

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'GiveItem',
		content = ('ส่ง %s จำนวน %s ให้กับ %s'):format(sourceItem.label, itemCount, targetXPlayer.name),
		source = sourceXPlayer.source,
		color = 1,
		options = {
			important = (itemCount >= 500 and true)
		}
	})

	exports['azael_dc-serverlogs']:insertData({
		event = 'GiveItem',
		content = ('ได้รับ %s จำนวน %s จาก %s'):format(sourceItem.label, itemCount, sourceXPlayer.name),
		source = targetXPlayer.source,
		color = 2,
		options = {
			important = (itemCount >= 500 and true)
		}
	})
end)
```

### ส่ง-เงิน

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `GiveMoney`                            | ส่ง-เงินเขียว
| `GiveDirtyMoney`                       | ส่ง-เงินแดง

วางรหัสด้านล่างนี้ต่อจาก `targetXPlayer.addAccountMoney(itemName, itemCount, "Received from " .. sourceXPlayer.name)` บรรทัดที่ **[412](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/main.lua#L412)**

```lua
pcall(function()
	local eventName = (itemName == 'money' and 'GiveMoney' or 'GiveDirtyMoney')

	exports['azael_dc-serverlogs']:insertData({
		event = eventName,
		content = ('ส่ง %s จำนวน $%s ให้กับ %s'):format(Config.Accounts[itemName].label, ESX.Math.GroupDigits(itemCount), targetXPlayer.name),
		source = sourceXPlayer.source,
		color = 1,
		options = {
			important = (itemCount >= 100000 and true)
		}
	})

	exports['azael_dc-serverlogs']:insertData({
		event = eventName,
		content = ('ได้รับ %s จำนวน $%s จาก %s'):format(Config.Accounts[itemName].label, ESX.Math.GroupDigits(itemCount), sourceXPlayer.name),
		source = targetXPlayer.source,
		color = 2,
		options = {
			important = (itemCount >= 100000 and true)
		}
	})
end)
```

### ส่ง-อาวุธ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `GiveWeapon`                           | ส่ง-อาวุธ

วางรหัสด้านล่างนี้ต่อจาก `targetXPlayer.addWeapon(itemName, itemCount)` บรรทัดที่ **[438](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/main.lua#L438)**

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'GiveWeapon',
		content = ('ส่ง %s และ กระสุน จำนวน %s ให้กับ %s'):format(weaponLabel, itemCount, targetXPlayer.name),
		source = sourceXPlayer.source,
		color = 1
	})

	exports['azael_dc-serverlogs']:insertData({
		event = 'GiveWeapon',
		content = ('ได้รับ %s และ กระสุน จำนวน %s จาก %s'):format(weaponLabel, itemCount, sourceXPlayer.name),
		source = targetXPlayer.source,
		color = 2
	})
end)
```

### ส่ง-กระสุน

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `GiveAmmo`                             | ส่ง-กระสุน

วางรหัสด้านล่างนี้ต่อจาก `targetXPlayer.addWeaponAmmo(itemName, itemCount)` บรรทัดที่ **[465](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/main.lua#L465)**

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'GiveAmmo',
		content = ('ส่ง กระสุน ของ %s จำนวน %s ให้กับ %s'):format(weapon.label, itemCount, targetXPlayer.name),
		source = sourceXPlayer.source,
		color = 1
	})

	exports['azael_dc-serverlogs']:insertData({
		event = 'GiveAmmo',
		content = ('ได้รับ กระสุน ของ %s จำนวน %s จาก %s'):format(weapon.label, itemCount, sourceXPlayer.name),
		source = targetXPlayer.source,
		color = 2
	})
end)
```

### ทิ้ง-ไอเทม

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `RemoveItem`                           | ทิ้ง-ไอเทม

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.removeInventoryItem(itemName, itemCount)` บรรทัดที่ **[493](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/main.lua#L493)**

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'RemoveItem',
		content = ('ทิ้ง %s จำนวน %s'):format(xItem.label, itemCount),
		source = xPlayer.source,
		color = 1,
		options = {
			important = (itemCount >= 500 and true)
		}
	})
end)
```

### ทิ้ง-เงิน

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `RemoveMoney`                          | ทิ้ง-เงินเขียว
| `RemoveDirtyMoney`                     | ทิ้ง-เงินแดง

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.removeAccountMoney(itemName, itemCount, "Threw away")` บรรทัดที่ **[508](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/main.lua#L508)**

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = (itemName == 'money' and 'RemoveMoney' or 'RemoveDirtyMoney'),
		content = ('ทิ้ง %s จำนวน $%s'):format(Config.Accounts[itemName].label, ESX.Math.GroupDigits(itemCount)),
		source = xPlayer.source,
		color = 1,
		options = {
			important = (itemCount >= 100000 and true)
		}
	})
end)
```

### ทิ้ง-อาวุธ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `RemoveWeapon`                         | ทิ้ง-อาวุธ

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.removeWeapon(itemName)` บรรทัดที่ **[521](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/main.lua#L521)**

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'RemoveWeapon',
		content = ('ทิ้ง %s และ กระสุน จำนวน %s'):format(weapon.label, weapon.ammo),
		source = xPlayer.source,
		color = 1
	})
end)
```

### ใช้งาน-ไอเทม

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `UseItem`                              | ใช้งาน-ไอเทม

วางรหัสด้านล่างนี้ต่อจาก `ESX.UseItem(source, itemName)` บรรทัดที่ **[544](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/main.lua#L544)**

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'UseItem',
		content = ('ใช้งาน %s จำนวน 1'):format(ESX.GetItemLabel(itemName)),
		source = xPlayer.source,
		color = 3
	})
end)
```

### เก็บ-ไอเทม

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `PickupItem`                           | เก็บ-ไอเทม

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addInventoryItem(pickup.name, pickup.count)` บรรทัดที่ **[557](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/main.lua#L557)**

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'PickupItem',
		content = ('เก็บ %s จำนวน %s'):format(ESX.GetItemLabel(pickup.name), pickup.count),
		source = xPlayer.source,
		color = 2,
		options = {
			important = (pickup.count >= 500 and true)
		}
	})
end)
```

### เก็บ-เงิน

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `PickupMoney`                          | เก็บ-เงินเขียว
| `PickupDirtyMoney`                     | เก็บ-เงินแดง

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addAccountMoney(pickup.name, pickup.count, "Picked up")` บรรทัดที่ **[564](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/main.lua#L564)**

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = (pickup.name == 'money' and 'PickupMoney' or 'PickupDirtyMoney'),
		content = ('เก็บ %s จำนวน $%s'):format(Config.Accounts[pickup.name].label, ESX.Math.GroupDigits(pickup.count)),
		source = xPlayer.source,
		color = 2,
		options = {
			important = (pickup.count >= 100000 and true)
		}
	})
end)
```

### เก็บ-อาวุธ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `PickupWeapon`                         | เก็บ-อาวุธ

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.setWeaponTint(pickup.name, pickup.tintIndex)` บรรทัดที่ **[571](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/server/main.lua#L571)**

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'PickupWeapon',
		content = ('เก็บ %s และ กระสุน จำนวน %s'):format(ESX.GetWeaponLabel(pickup.name), pickup.count),
		source = xPlayer.source,
		color = 2
	})
end)
```
