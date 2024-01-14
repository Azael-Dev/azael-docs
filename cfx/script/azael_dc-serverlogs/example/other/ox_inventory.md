---
sidebar_label: ox_inventory
---

# ox_inventory

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[ox_inventory](https://github.com/overextended/ox_inventory)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../index.md)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../index.md)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## fxmanifest.lua

เปิดไฟล์ `fxmanifest.lua` ภายใน `ox_inventory` และดำเนินการเพิ่ม `'azael_dc-serverlogs.lua'` ภายใน `server_scripts`

```lua title="ตัวอย่าง"
server_scripts {
	'@oxmysql/lib/MySQL.lua',
	'init.lua',
	'azael_dc-serverlogs.lua' -- รหัสที่ดำเนินการเพิ่ม
}
```

## azael_dc-serverlogs.lua

ดำเนินการสร้างไฟล์ชื่อ `azael_dc-serverlogs.lua` ที่อยู่เดียวกันกับไฟล์ `fxmanifest.lua` ภายใน `ox_inventory` และคัดลอกรหัสด้านล่างนี้ไปวางไว้ภายไฟล์ `azael_dc-serverlogs.lua`

```lua title="azael_dc-serverlogs.lua"
--===== FiveM Script: ===================================================================
--= DC - Server Logs (Webhook)
--===== Developed By: ===================================================================
--= Azael Dev <contact@azael.dev>
--===== Website: ========================================================================
--= https://www.azael.dev/
--===== Docs: ===========================================================================
--= https://docs2.azael.dev/cfx/script/azael_dc-serverlogs/example/other/ox_inventory
--=======================================================================================

---departments
local jobs = {
    police = 'police',
    ambulance = 'ambulance',
    mechanic = 'mechanic',
    council = 'council'
}

---azael_dc-serverlogs
---@async
---@param actionType string
---@param itemData table
---@param itemCount number
---@param fromInventory table
---@param toInventory table|nil
function azael_serverlogs(actionType, itemData, itemCount, fromInventory, toInventory)
    Citizen.CreateThread(function()
        local itemType = itemData.name:match('money') and 'account'
            or itemData.name:match('WEAPON') and 'weapon'
            or itemData.name:match('ammo') and 'ammo'
            or itemData.name:match('key') and 'keys'
            or 'item'

        local important = itemType == 'item' and (itemCount >= 1000 and true or false)
            or itemType == 'account' and (itemCount >= 100000 and true or false)
            or false
            
        local fields = (type(itemData.metadata) == 'table' and next(itemData.metadata)) and { { name = '**META DATA**', value = ('```%s```'):format(json.encode(itemData.metadata)), inline = false } } or nil
            
        if actionType:match('admin_command') and fromInventory.id then
            local event = 'OX_AdminCommands'
            local text, color = actionType:match('additem') and 'เพิ่ม', 2
                or actionType:match('removeitem') and 'ลบ', 1
                or actionType:match('setitem') and 'กำหนด', 3

            if fromInventory.id == toInventory.id then
                pcall(function()
                    exports['azael_dc-serverlogs']:insertData({
                        event = event,
                        content = ('%s %s จำนวน %s ตนเอง'):format(text, itemData.label, itemCount),
                        fields = fields,
                        source = fromInventory.id,
                        color = color,
                        options = {
                            important = important
                        }
                    })
                end)
            else
                pcall(function()
                    exports['azael_dc-serverlogs']:insertData({
                        event = event,
                        content = ('%s %s จำนวน %s ไปยัง %s'):format(text, itemData.label, itemCount, toInventory.label),
                        fields = fields,
                        source = fromInventory.id,
                        color = 7,
                        options = {
                            important = important
                        }
                    })
            
                    exports['azael_dc-serverlogs']:insertData({
                        event = event,
                        content = ('ถูก%s %s จำนวน %s โดย %s'):format(text, itemData.label, itemCount, fromInventory.label),
                        fields = fields,
                        source = toInventory.id,
                        color = color,
                        options = {
                            important = important
                        }
                    })
                end)
            end
        elseif actionType == 'player_crafting' then
            pcall(function()
                exports['azael_dc-serverlogs']:insertData({
                    event = 'OX_Crafting',
                    content = ('คราฟ %s จำนวน %s สำเร็จ'):format(itemData.label, itemCount),
                    fields = fields,
                    source = fromInventory.id,
                    color = 2,
                    options = {
                        important = important
                    }
                })
            end)
        elseif actionType == 'player_buyitemshop' then
            pcall(function()
                exports['azael_dc-serverlogs']:insertData({
                    event = 'OX_BuyItemShop',
                    content = ('ซื้อ %s จำนวน %s ที่ %s เสียค่าใช้จ่าย %s จำนวน %s'):format(itemData.label, itemCount, itemData.shop, itemData.currency, itemData.price),
                    fields = fields,
                    source = fromInventory.id,
                    color = 2,
                    options = {
                        important = important
                    }
                })
            end)
        elseif actionType == 'player_give' then
            local event = itemType == 'account' and (itemData.name == 'money' and 'OX_GiveMoney' or 'OX_GiveDirtyMoney')
                or itemType == 'weapon' and 'OX_GiveWeapon'
                or itemType == 'ammo' and 'OX_GiveAmmo'
                or itemType == 'keys' and 'OX_GiveKeys'
                or 'OX_GiveItem'
                
            pcall(function()
                exports['azael_dc-serverlogs']:insertData({
                    event = event,
                    content = ('ส่ง %s จำนวน %s ให้กับ %s'):format(itemData.label, itemCount, toInventory.label),
                    fields = fields,
                    source = fromInventory.id,
                    color = 1,
                    options = {
                        important = important
                    }
                })
        
                exports['azael_dc-serverlogs']:insertData({
                    event = event,
                    content = ('ได้รับ %s จำนวน %s จาก %s'):format(itemData.label, itemCount, fromInventory.label),
                    fields = fields,
                    source = toInventory.id,
                    color = 2,
                    options = {
                        important = important
                    }
                })
            end)
        elseif actionType == 'player_drop' then
            local event = itemType == 'account' and (itemData.name == 'money' and 'OX_RemoveMoney' or 'OX_RemoveDirtyMoney')
                or itemType == 'weapon' and 'OX_RemoveWeapon'
                or itemType == 'ammo' and 'OX_RemoveAmmo'
                or itemType == 'keys' and 'OX_RemoveKeys'
                or 'OX_RemoveItem'

            pcall(function()
                exports['azael_dc-serverlogs']:insertData({
                    event = event,
                    content = ('ทิ้ง %s จำนวน %s'):format(itemData.label, itemCount),
                    fields = fields,
                    source = fromInventory.id,
                    color = 1,
                    options = {
                        important = important
                    }
                })
            end)
        elseif actionType == 'player_pickup' then
            local event = itemType == 'account' and (itemData.name == 'money' and 'OX_PickupMoney' or 'OX_PickupDirtyMoney')
                or itemType == 'weapon' and 'OX_PickupWeapon'
                or itemType == 'ammo' and 'OX_PickupAmmo'
                or itemType == 'keys' and 'OX_PickupKeys'
                or 'OX_PickupItem'

            pcall(function()
                exports['azael_dc-serverlogs']:insertData({
                    event = event,
                    content = ('เก็บ %s จำนวน %s'):format(itemData.label, itemCount),
                    fields = fields,
                    source = fromInventory.id,
                    color = 2,
                    options = {
                        important = important
                    }
                })
            end)
        elseif actionType == 'search_put' then
            local event = itemType == 'account' and (itemData.name == 'money' and 'OX_%sPutMoney' or 'OX_%sPutDirtyMoney')
                or itemType == 'weapon' and 'OX_%sPutWeapon'
                or itemType == 'ammo' and 'OX_%sPutAmmo'
                or itemType == 'keys' and 'OX_%sPutKeys'
                or 'OX_%sPutItem'

            local player = server.GetPlayerFromId(fromInventory.id)
            local job = player.job.name:match(jobs.police) and 'Police'
                or player.job.name:match(jobs.council) and 'Council'
                or 'Citizen'
                
            event = event:format(job)
            
            pcall(function()
                exports['azael_dc-serverlogs']:insertData({
                    event = event,
                    content = ('หน่วยงาน %s ยัด %s จำนวน %s ไปยัง %s'):format(player.job.name, itemData.label, itemCount, toInventory.label),
                    fields = fields,
                    source = fromInventory.id,
                    color = 2,
                    options = {
                        important = important
                    }
                })

                exports['azael_dc-serverlogs']:insertData({
                    event = event,
                    content = ('ถูกยัด %s จำนวน %s โดย %s หน่วยงาน %s'):format(itemData.label, itemCount, fromInventory.label, player.job.name),
                    fields = fields,
                    source = toInventory.id,
                    color = 3,
                    options = {
                        important = important
                    }
                })
            end)
        elseif actionType == 'search_get' then
            local event = itemType == 'account' and (itemData.name == 'money' and 'OX_%sTakeMoney' or 'OX_%sTakeDirtyMoney')
                or itemType == 'weapon' and 'OX_%sTakeWeapon'
                or itemType == 'ammo' and 'OX_%sTakeAmmo'
                or itemType == 'keys' and 'OX_%sTakeKeys'
                or 'OX_%sTakeItem'

            local player = server.GetPlayerFromId(toInventory.id)
            local job = player.job.name:match(jobs.police) and 'Police'
                or player.job.name:match(jobs.council) and 'Council'
                or 'Citizen'
                
            event = event:format(job)
            
            pcall(function()
                exports['azael_dc-serverlogs']:insertData({
                    event = event,
                    content = ('หน่วยงาน %s ยึด %s จำนวน %s จาก %s'):format(player.job.name, itemData.label, itemCount, fromInventory.label),
                    fields = fields,
                    source = toInventory.id,
                    color = 2,
                    options = {
                        important = important
                    }
                })

                exports['azael_dc-serverlogs']:insertData({
                    event = event,
                    content = ('ถูกยึด %s จำนวน %s โดย %s หน่วยงาน %s'):format(itemData.label, itemCount, toInventory.label, player.job.name),
                    fields = fields,
                    source = fromInventory.id,
                    color = 3,
                    options = {
                        important = important
                    }
                })
            end)
        elseif actionType == 'vehicle_put' then
            local event = itemType == 'account' and (itemData.name == 'money' and 'OX_VehiclePutMoney' or 'OX_VehiclePutDirtyMoney')
                or itemType == 'weapon' and 'OX_VehiclePutWeapon'
                or itemType == 'ammo' and 'OX_VehiclePutAmmo'
                or itemType == 'keys' and 'OX_VehiclePutKeys'
                or 'OX_VehiclePutItem'

            pcall(function()
                exports['azael_dc-serverlogs']:insertData({
                    event = event,
                    content = ('นำ %s จำนวน %s เข้า %s ทะเบียน %s'):format(itemData.label, itemCount, toInventory.type, toInventory.label),
                    fields = fields,
                    source = fromInventory.id,
                    color = 2,
                    options = {
                        important = important
                    }
                })
            end)
        elseif actionType == 'vehicle_get' then
            local event = itemType == 'account' and (itemData.name == 'money' and 'OX_VehicleGetMoney' or 'OX_VehicleGetDirtyMoney')
                or itemType == 'weapon' and 'OX_VehicleGetWeapon'
                or itemType == 'ammo' and 'OX_VehicleGetAmmo'
                or itemType == 'keys' and 'OX_VehicleGetKeys'
                or 'OX_VehicleGetItem'

            pcall(function()
                exports['azael_dc-serverlogs']:insertData({
                    event = event,
                    content = ('นำ %s จำนวน %s ออก %s ทะเบียน %s'):format(itemData.label, itemCount, fromInventory.type, fromInventory.label),
                    fields = fields,
                    source = toInventory.id,
                    color = 1,
                    options = {
                        important = important
                    }
                })
            end)
        elseif actionType == 'safebox_put' then
            local event = itemType == 'account' and (itemData.name == 'money' and 'OX_%sVaultPutMoney' or 'OX_%sVaultPutDirtyMoney')
                or itemType == 'weapon' and 'OX_%sVaultPutWeapon'
                or itemType == 'ammo' and 'OX_%sVaultPutAmmo'
                or itemType == 'keys' and 'OX_%sVaultPutKeys'
                or 'OX_%sVaultPutItem'

            local job = 'Citizen'
            
            if type(toInventory.groups) == 'table' then
                job = toInventory.groups[jobs.police] and 'Police'
                    or toInventory.groups[jobs.ambulance] and 'Ambulance'
                    or toInventory.groups[jobs.mechanic] and 'Mechanic'
                    or toInventory.groups[jobs.council] and 'Council'
                    or 'Citizen'
            end
            
            if type(fields) ~= 'table' then fields = {} end
            table.insert(fields, { name = '**SAFEBOX DATA**', value = ('```ID: %s\nNAME: %s\nOWNER: %s\nGROUPS: %s```'):format(toInventory.id, toInventory.dbId, toInventory.owner, json.encode(toInventory.groups)), inline = false })
            
            pcall(function()
                exports['azael_dc-serverlogs']:insertData({
                    event = event:format(job),
                    content = ('นำ %s จำนวน %s เข้าตู้นิรภัย %s'):format(itemData.label, itemCount, toInventory.label),
                    fields = fields,
                    source = fromInventory.id,
                    color = 2,
                    options = {
                        important = important
                    }
                })
            end)
        elseif actionType == 'safebox_get' then
            local event = itemType == 'account' and (itemData.name == 'money' and 'OX_%sVaultGetMoney' or 'OX_%sVaultGetDirtyMoney')
                or itemType == 'weapon' and 'OX_%sVaultGetWeapon'
                or itemType == 'ammo' and 'OX_%sVaultGetAmmo'
                or itemType == 'keys' and 'OX_%sVaultGetKeys'
                or 'OX_%sVaultGetItem'

            local job = 'Citizen'
            
            if type(fromInventory.groups) == 'table' then
                job = fromInventory.groups[jobs.police] and 'Police'
                    or fromInventory.groups[jobs.ambulance] and 'Ambulance'
                    or fromInventory.groups[jobs.mechanic] and 'Mechanic'
                    or fromInventory.groups[jobs.council] and 'Council'
                    or 'Citizen'
            end
            
            if type(fields) ~= 'table' then fields = {} end
            table.insert(fields, { name = '**SAFEBOX DATA**', value = ('```ID: %s\nNAME: %s\nOWNER: %s\nGROUPS: %s```'):format(fromInventory.id, fromInventory.dbId, fromInventory.owner, json.encode(fromInventory.groups)), inline = false })
            
            pcall(function()
                exports['azael_dc-serverlogs']:insertData({
                    event = event:format(job),
                    content = ('นำ %s จำนวน %s ออกตู้นิรภัย %s'):format(itemData.label, itemCount, fromInventory.label),
                    fields = fields,
                    source = toInventory.id,
                    color = 1,
                    options = {
                        important = important
                    }
                })
            end)
        elseif actionType == 'policeevidence_put' then
            local event = itemType == 'account' and (itemData.name == 'money' and 'OX_PoliceEvidencePutMoney' or 'OX_PoliceEvidencePutDirtyMoney')
                or itemType == 'weapon' and 'OX_PoliceEvidencePutWeapon'
                or itemType == 'ammo' and 'OX_PoliceEvidencePutAmmo'
                or itemType == 'keys' and 'OX_PoliceEvidencePutKeys'
                or 'OX_PoliceEvidencePutItem'

            pcall(function()
                exports['azael_dc-serverlogs']:insertData({
                    event = event,
                    content = ('นำ %s จำนวน %s เข้า %s'):format(itemData.label, itemCount, toInventory.label),
                    fields = fields,
                    source = fromInventory.id,
                    color = 2,
                    options = {
                        important = important
                    }
                })
            end)
        elseif actionType == 'policeevidence_get' then
            local event = itemType == 'account' and (itemData.name == 'money' and 'OX_PoliceEvidenceGetMoney' or 'OX_PoliceEvidenceGetDirtyMoney')
                or itemType == 'weapon' and 'OX_PoliceEvidenceGetWeapon'
                or itemType == 'ammo' and 'OX_PoliceEvidenceGetAmmo'
                or itemType == 'keys' and 'OX_PoliceEvidenceGetKeys'
                or 'OX_PoliceEvidenceGetItem'

            pcall(function()
                exports['azael_dc-serverlogs']:insertData({
                    event = event,
                    content = ('นำ %s จำนวน %s ออก %s'):format(itemData.label, itemCount, fromInventory.label),
                    fields = fields,
                    source = toInventory.id,
                    color = 1,
                    options = {
                        important = important
                    }
                })
            end)
        end
    end)
end
```

## server.lua

ดำเนินการเปิดไฟล์ **[server.lua](https://github.com/overextended/ox_inventory/blob/main/server.lua)**

### ใช้คำสั่ง-แอดมิน

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `OX_AdminCommands`                     | ใช้คำสั่ง-แอดมิน

#### 1. [ADDITEM](https://github.com/overextended/ox_inventory/blob/main/server.lua#L428)

วางรหัสด้านล่างนี้ต่อจาก `source = Inventory(source) or { label = 'console', owner = 'console' }` บรรทัดที่ **[449](https://github.com/overextended/ox_inventory/blob/main/server.lua#L449)**

```lua
azael_serverlogs('admin_command_additem', item, count, source, inventory)
```

#### 2. [REMOVEITEM](https://github.com/overextended/ox_inventory/blob/main/server.lua#L457)

วางรหัสด้านล่างนี้ต่อจาก `source = Inventory(source) or {label = 'console', owner = 'console'}` บรรทัดที่ **[477](https://github.com/overextended/ox_inventory/blob/main/server.lua#L477)**

```lua
azael_serverlogs('admin_command_removeitem', item, args.count, source, inventory)
```

#### 3. [SETITEM](https://github.com/overextended/ox_inventory/blob/main/server.lua#L485)

วางรหัสด้านล่างนี้ต่อจาก `source = Inventory(source) or {label = 'console', owner = 'console'}` บรรทัดที่ **[505](https://github.com/overextended/ox_inventory/blob/main/server.lua#L505)**

```lua
azael_serverlogs('admin_command_setitem', item, args.count, source, inventory)
```

## crafting/server.lua

ไปยังโฟลเดอร์ **[modules/crafting](https://github.com/overextended/ox_inventory/tree/main/modules/crafting)** แล้วดำเนินการเปิดไฟล์ **[server.lua](https://github.com/overextended/ox_inventory/blob/main/modules/crafting/server.lua)**

### โต๊ะคราฟ-อุปกรณ์

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `OX_Crafting`                          | โต๊ะคราฟ-อุปกรณ์

วางรหัสด้านล่างนี้ต่อจาก `Inventory.AddItem(left, craftedItem, recipe.count or 1, recipe.metadata or {}, craftedItem.stack and toSlot or nil)` บรรทัดที่ **[223](https://github.com/overextended/ox_inventory/blob/main/modules/crafting/server.lua#L223)**

```lua
azael_serverlogs('player_crafting', { name = craftedItem.name, label = craftedItem.label, metadata = recipe.metadata }, (recipe.count or 1), left)
```

## shops/server.lua

ไปยังโฟลเดอร์ **[modules/shops](https://github.com/overextended/ox_inventory/tree/main/modules/shops)** แล้วดำเนินการเปิดไฟล์ **[server.lua](https://github.com/overextended/ox_inventory/blob/main/modules/shops/server.lua)**

### ร้านค้า-ซื้อสินค้า

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `OX_BuyItemShop`                       | ร้านค้า-ซื้อสินค้า

วางรหัสด้านล่างนี้ต่อจาก `if server.syncInventory then server.syncInventory(playerInv) end` บรรทัดที่ **[278](https://github.com/overextended/ox_inventory/blob/main/modules/shops/server.lua#L278)**

```lua
azael_serverlogs('player_buyitemshop', { name = fromItem.name, label = fromItem.label, metadata = metadata, shop = shop.label, currency = currency, price = price }, count, playerInv)
```

## inventory/server.lua

ไปยังโฟลเดอร์ **[modules/inventory](https://github.com/overextended/ox_inventory/tree/main/modules/inventory)** แล้วดำเนินการเปิดไฟล์ **[server.lua](https://github.com/overextended/ox_inventory/blob/main/modules/inventory/server.lua)**

#### 1. [DROP ITEMS](https://github.com/overextended/ox_inventory/blob/main/modules/inventory/server.lua#L1503)

วางรหัสด้านล่างนี้ต่อจาก `if server.syncInventory then server.syncInventory(playerInventory) end` บรรทัดที่ **[1557](https://github.com/overextended/ox_inventory/blob/main/modules/inventory/server.lua#L1557)**

```lua
azael_serverlogs('player_drop', toData, data.count, playerInventory)
```

#### 2. [STACK ITEMS](https://github.com/overextended/ox_inventory/blob/main/modules/inventory/server.lua#L1714)

วางรหัสด้านล่างนี้ ไว้ด้านบน `if server.loglevel > 0 then` บรรทัดที่ **[1746](https://github.com/overextended/ox_inventory/blob/main/modules/inventory/server.lua#L1746)**

```lua
if data.fromType == 'player' or data.toType == 'player' then
	if data.toType == 'drop' then
		azael_serverlogs('player_drop', fromData, data.count, fromInventory)
	elseif data.fromType == 'drop' then
		azael_serverlogs('player_pickup', fromData, data.count, toInventory)
	elseif data.toType == 'otherplayer' then
		azael_serverlogs('search_put', fromData, data.count, fromInventory, toInventory)
	elseif data.fromType == 'otherplayer' then
		azael_serverlogs('search_get', fromData, data.count, fromInventory, toInventory)
	elseif data.toType == 'glovebox' or data.toType == 'trunk' then
		azael_serverlogs('vehicle_put', fromData, data.count, fromInventory, toInventory)
	elseif data.fromType == 'glovebox' or data.fromType == 'trunk' then
		azael_serverlogs('vehicle_get', fromData, data.count, fromInventory, toInventory)
	elseif data.toType == 'stash' then
		azael_serverlogs('safebox_put', fromData, data.count, fromInventory, toInventory)
	elseif data.fromType == 'stash' then
		azael_serverlogs('safebox_get', fromData, data.count, fromInventory, toInventory)
	elseif data.toType == 'policeevidence' then
		azael_serverlogs('policeevidence_put', fromData, data.count, fromInventory, toInventory)
	elseif data.fromType == 'policeevidence' then
		azael_serverlogs('policeevidence_get', fromData, data.count, fromInventory, toInventory)
	end
end
```

#### 3. [MOVE ITEM TO AN EMPTY SLOT](https://github.com/overextended/ox_inventory/blob/main/modules/inventory/server.lua#L1758)

วางรหัสด้านล่างนี้ ไว้ด้านบน `if server.loglevel > 0 then` บรรทัดที่ **[1796](https://github.com/overextended/ox_inventory/blob/main/modules/inventory/server.lua#L1796)**

```lua
if data.fromType == 'player' or data.toType == 'player' then
	if data.toType == 'drop' then
		azael_serverlogs('player_drop', fromData, data.count, fromInventory)
	elseif data.fromType == 'drop' then
		azael_serverlogs('player_pickup', fromData, data.count, toInventory)
	elseif data.toType == 'otherplayer' then
		azael_serverlogs('search_put', fromData, data.count, fromInventory, toInventory)
	elseif data.fromType == 'otherplayer' then
		azael_serverlogs('search_get', fromData, data.count, fromInventory, toInventory)
	elseif data.toType == 'glovebox' or data.toType == 'trunk' then
		azael_serverlogs('vehicle_put', fromData, data.count, fromInventory, toInventory)
	elseif data.fromType == 'glovebox' or data.fromType == 'trunk' then
		azael_serverlogs('vehicle_get', fromData, data.count, fromInventory, toInventory)
	elseif data.toType == 'stash' then
		azael_serverlogs('safebox_put', fromData, data.count, fromInventory, toInventory)
	elseif data.fromType == 'stash' then
		azael_serverlogs('safebox_get', fromData, data.count, fromInventory, toInventory)
	elseif data.toType == 'policeevidence' then
		azael_serverlogs('policeevidence_put', fromData, data.count, fromInventory, toInventory)
	elseif data.fromType == 'policeevidence' then
		azael_serverlogs('policeevidence_get', fromData, data.count, fromInventory, toInventory)
	end
end
```

#### 4. [GIVE ITEMS](https://github.com/overextended/ox_inventory/blob/main/modules/inventory/server.lua#L2323)

วางรหัสด้านล่างนี้ต่อจาก `if Inventory.RemoveItem(fromInventory, item, count, data.metadata, slot) then` บรรทัดที่ **[2368](https://github.com/overextended/ox_inventory/blob/main/modules/inventory/server.lua#L2368)**

```lua
azael_serverlogs('player_give', data, count, fromInventory, toInventory)
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### ส่ง / ทิ้ง / เก็บ

<Tabs>
<TabItem value="give" label="ส่ง">

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `OX_GiveItem`                          | ส่ง-ไอเทม
| `OX_GiveMoney`                         | ส่ง-เงินเขียว
| `OX_GiveDirtyMoney`                    | ส่ง-เงินแดง
| `OX_GiveWeapon`                        | ส่ง-อาวุธ
| `OX_GiveAmmo`                          | ส่ง-กระสุน
| `OX_GiveKeys`                          | ส่ง-กุญแจ

</TabItem>
<TabItem value="drop" label="ทิ้ง">

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `OX_RemoveItem`                        | ทิ้ง-ไอเทม
| `OX_RemoveMoney`                       | ทิ้ง-เงินเขียว
| `OX_RemoveDirtyMoney`                  | ทิ้ง-เงินแดง
| `OX_RemoveWeapon`                      | ทิ้ง-อาวุธ
| `OX_RemoveAmmo`                        | ทิ้ง-กระสุน
| `OX_RemoveKeys`                        | ทิ้ง-กุญแจ

</TabItem>
<TabItem value="pickup" label="เก็บ">

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `OX_PickupItem`                        | เก็บ-ไอเทม
| `OX_PickupMoney`                       | เก็บ-เงินเขียว
| `OX_PickupDirtyMoney`                  | เก็บ-เงินแดง
| `OX_PickupWeapon`                      | เก็บ-อาวุธ
| `OX_PickupAmmo`                        | เก็บ-กระสุน
| `OX_PickupKeys`                        | เก็บ-กุญแจ

</TabItem>
</Tabs>

:::caution

เหตุการณ์เหล่านี้ อ้างอิงจากการติดตั้งรหัสส่งข้อมูลตามขั้นตอนใน **[inventory/server.lua](#inventoryserverlua)**

:::

### ค้นตัว / ปล้น

<Tabs>
<TabItem value="police-search" label="ตำรวจ">

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `OX_PoliceTakeItem`                    | ตำรวจ-ยึด-ไอเทม
| `OX_PolicePutItem`                     | ตำรวจ-ยัด-ไอเทม
| `OX_PoliceTakeMoney`                   | ตำรวจ-ยึด-เงินเขียว
| `OX_PolicePutMoney`                    | ตำรวจ-ยัด-เงินเขียว
| `OX_PoliceTakeDirtyMoney`              | ตำรวจ-ยึด-เงินแดง
| `OX_PolicePutDirtyMoney`               | ตำรวจ-ยัด-เงินแดง
| `OX_PoliceTakeWeapon`                  | ตำรวจ-ยึด-อาวุธ
| `OX_PolicePutWeapon`                   | ตำรวจ-ยัด-อาวุธ
| `OX_PoliceTakeAmmo`                    | ตำรวจ-ยึด-กระสุน
| `OX_PolicePutAmmo`                     | ตำรวจ-ยัด-กระสุน
| `OX_PoliceTakeKeys`                    | ตำรวจ-ยึด-กุญแจ
| `OX_PolicePutKeys`                     | ตำรวจ-ยัด-กุญแจ

</TabItem>
<TabItem value="council-search" label="สภา">

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `OX_CouncilTakeItem`                   | สภา-ยึด-ไอเทม
| `OX_CouncilPutItem`                    | สภา-ยัด-ไอเทม
| `OX_CouncilTakeMoney`                  | สภา-ยึด-เงินเขียว
| `OX_CouncilPutMoney`                   | สภา-ยัด-เงินเขียว
| `OX_CouncilTakeDirtyMoney`             | สภา-ยึด-เงินแดง
| `OX_CouncilPutDirtyMoney`              | สภา-ยัด-เงินแดง
| `OX_CouncilTakeWeapon`                 | สภา-ยึด-อาวุธ
| `OX_CouncilPutWeapon`                  | สภา-ยัด-อาวุธ
| `OX_CouncilTakeAmmo`                   | สภา-ยึด-กระสุน
| `OX_CouncilPutAmmo`                    | สภา-ยัด-กระสุน
| `OX_CouncilTakeKeys`                   | สภา-ยึด-กุญแจ
| `OX_CouncilPutKeys`                    | สภา-ยัด-กุญแจ

</TabItem>
<TabItem value="citizen-search" label="ปล้น">

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `OX_CitizenTakeItem`                   | ปล้น-ยึด-ไอเทม
| `OX_CitizenPutItem`                    | ปล้น-ยัด-ไอเทม
| `OX_CitizenTakeMoney`                  | ปล้น-ยึด-เงินเขียว
| `OX_CitizenPutMoney`                   | ปล้น-ยัด-เงินเขียว
| `OX_CitizenTakeDirtyMoney`             | ปล้น-ยึด-เงินแดง
| `OX_CitizenPutDirtyMoney`              | ปล้น-ยัด-เงินแดง
| `OX_CitizenTakeWeapon`                 | ปล้น-ยึด-อาวุธ
| `OX_CitizenPutWeapon`                  | ปล้น-ยัด-อาวุธ
| `OX_CitizenTakeAmmo`                   | ปล้น-ยึด-กระสุน
| `OX_CitizenPutAmmo`                    | ปล้น-ยัด-กระสุน
| `OX_CitizenTakeKeys`                   | ปล้น-ยึด-กุญแจ
| `OX_CitizenPutKeys`                    | ปล้น-ยัด-กุญแจ

</TabItem>
</Tabs>

:::caution

เหตุการณ์เหล่านี้ อ้างอิงจากการติดตั้งรหัสส่งข้อมูลตามขั้นตอนใน **[inventory/server.lua](#inventoryserverlua)**

:::

### กล่องเก็บของ & ท้ายรถ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `OX_VehiclePutItem`                    | ไอเทม-เข้ารถ
| `OX_VehicleGetItem`                    | ไอเทม-ออกรถ
| `OX_VehiclePutMoney`                   | เงินเขียว-เข้ารถ
| `OX_VehicleGetMoney`                   | เงินเขียว-ออกรถ
| `OX_VehiclePutDirtyMoney`              | เงินแดง-เข้ารถ
| `OX_VehicleGetDirtyMoney`              | เงินแดง-ออกรถ
| `OX_VehiclePutWeapon`                  | อาวุธ-เข้ารถ
| `OX_VehicleGetWeapon`                  | อาวุธ-ออกรถ
| `OX_VehiclePutAmmo`                    | กระสุน-เข้ารถ
| `OX_VehicleGetAmmo`                    | กระสุน-ออกรถ
| `OX_VehiclePutKeys`                    | กุญแจ-เข้ารถ
| `OX_VehicleGetKeys`                    | กุญแจ-ออกรถ

:::caution

เหตุการณ์เหล่านี้ อ้างอิงจากการติดตั้งรหัสส่งข้อมูลตามขั้นตอนใน **[inventory/server.lua](#inventoryserverlua)**

:::

### ตู้นิรภัย / ตู้เก็บของ

<Tabs>
<TabItem value="citizen-safebox" label="ทั่วไป">

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `OX_CitizenVaultPutItem`               | ทั่วไป-ไอเทม-เข้าเซฟ
| `OX_CitizenVaultGetItem`               | ทั่วไป-ไอเทม-ออกเซฟ
| `OX_CitizenVaultPutMoney`              | ทั่วไป-เงินเขียว-เข้าเซฟ
| `OX_CitizenVaultGetMoney`              | ทั่วไป-เงินเขียว-ออกเซฟ
| `OX_CitizenVaultPutDirtyMoney`         | ทั่วไป-เงินแดง-เข้าเซฟ
| `OX_CitizenVaultGetDirtyMoney`         | ทั่วไป-เงินแดง-ออกเซฟ
| `OX_CitizenVaultPutWeapon`             | ทั่วไป-อาวุธ-เข้าเซฟ
| `OX_CitizenVaultGetWeapon`             | ทั่วไป-อาวุธ-ออกเซฟ
| `OX_CitizenVaultPutAmmo`               | ทั่วไป-กระสุน-เข้าเซฟ
| `OX_CitizenVaultGetAmmo`               | ทั่วไป-กระสุน-ออกเซฟ
| `OX_CitizenVaultPutKeys`               | ทั่วไป-กุญแจ-เข้าเซฟ
| `OX_CitizenVaultGetKeys`               | ทั่วไป-กุญแจ-ออกเซฟ

</TabItem>
<TabItem value="police-safebox" label="ตำรวจ">

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `OX_PoliceVaultPutItem`                | ตำรวจ-ไอเทม-เข้าเซฟ
| `OX_PoliceVaultGetItem`                | ตำรวจ-ไอเทม-ออกเซฟ
| `OX_PoliceVaultPutMoney`               | ตำรวจ-เงินเขียว-เข้าเซฟ
| `OX_PoliceVaultGetMoney`               | ตำรวจ-เงินเขียว-ออกเซฟ
| `OX_PoliceVaultPutDirtyMoney`          | ตำรวจ-เงินแดง-เข้าเซฟ
| `OX_PoliceVaultGetDirtyMoney`          | ตำรวจ-เงินแดง-ออกเซฟ
| `OX_PoliceVaultPutWeapon`              | ตำรวจ-อาวุธ-เข้าเซฟ
| `OX_PoliceVaultGetWeapon`              | ตำรวจ-อาวุธ-ออกเซฟ
| `OX_PoliceVaultPutAmmo`                | ตำรวจ-กระสุน-เข้าเซฟ
| `OX_PoliceVaultGetAmmo`                | ตำรวจ-กระสุน-ออกเซฟ
| `OX_PoliceVaultPutKeys`                | ตำรวจ-กุญแจ-เข้าเซฟ
| `OX_PoliceVaultGetKeys`                | ตำรวจ-กุญแจ-ออกเซฟ

</TabItem>
<TabItem value="ambulance-safebox" label="หมอ">

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `OX_AmbulanceVaultPutItem`             | หมอ-ไอเทม-เข้าเซฟ
| `OX_AmbulanceVaultGetItem`             | หมอ-ไอเทม-ออกเซฟ
| `OX_AmbulanceVaultPutMoney`            | หมอ-เงินเขียว-เข้าเซฟ
| `OX_AmbulanceVaultGetMoney`            | หมอ-เงินเขียว-ออกเซฟ
| `OX_AmbulanceVaultPutDirtyMoney`       | หมอ-เงินแดง-เข้าเซฟ
| `OX_AmbulanceVaultGetDirtyMoney`       | หมอ-เงินแดง-ออกเซฟ
| `OX_AmbulanceVaultPutWeapon`           | หมอ-อาวุธ-เข้าเซฟ
| `OX_AmbulanceVaultGetWeapon`           | หมอ-อาวุธ-ออกเซฟ
| `OX_AmbulanceVaultPutAmmo`             | หมอ-กระสุน-เข้าเซฟ
| `OX_AmbulanceVaultGetAmmo`             | หมอ-กระสุน-ออกเซฟ
| `OX_AmbulanceVaultPutKeys`             | หมอ-กุญแจ-เข้าเซฟ
| `OX_AmbulanceVaultGetKeys`             | หมอ-กุญแจ-ออกเซฟ

</TabItem>
<TabItem value="mechanic-safebox" label="ช่าง">

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `OX_MechanicVaultPutItem`              | ช่าง-ไอเทม-เข้าเซฟ
| `OX_MechanicVaultGetItem`              | ช่าง-ไอเทม-ออกเซฟ
| `OX_MechanicVaultPutMoney`             | ช่าง-เงินเขียว-เข้าเซฟ
| `OX_MechanicVaultGetMoney`             | ช่าง-เงินเขียว-ออกเซฟ
| `OX_MechanicVaultPutDirtyMoney`        | ช่าง-เงินแดง-เข้าเซฟ
| `OX_MechanicVaultGetDirtyMoney`        | ช่าง-เงินแดง-ออกเซฟ
| `OX_MechanicVaultPutWeapon`            | ช่าง-อาวุธ-เข้าเซฟ
| `OX_MechanicVaultGetWeapon`            | ช่าง-อาวุธ-ออกเซฟ
| `OX_MechanicVaultPutAmmo`              | ช่าง-กระสุน-เข้าเซฟ
| `OX_MechanicVaultGetAmmo`              | ช่าง-กระสุน-ออกเซฟ
| `OX_MechanicVaultPutKeys`              | ช่าง-กุญแจ-เข้าเซฟ
| `OX_MechanicVaultGetKeys`              | ช่าง-กุญแจ-ออกเซฟ

</TabItem>
<TabItem value="council-safebox" label="สภา">

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `OX_CouncilVaultPutItem`               | สภา-ไอเทม-เข้าเซฟ
| `OX_CouncilVaultGetItem`               | สภา-ไอเทม-ออกเซฟ
| `OX_CouncilVaultPutMoney`              | สภา-เงินเขียว-เข้าเซฟ
| `OX_CouncilVaultGetMoney`              | สภา-เงินเขียว-ออกเซฟ
| `OX_CouncilVaultPutDirtyMoney`         | สภา-เงินแดง-เข้าเซฟ
| `OX_CouncilVaultGetDirtyMoney`         | สภา-เงินแดง-ออกเซฟ
| `OX_CouncilVaultPutWeapon`             | สภา-อาวุธ-เข้าเซฟ
| `OX_CouncilVaultGetWeapon`             | สภา-อาวุธ-ออกเซฟ
| `OX_CouncilVaultPutAmmo`               | สภา-กระสุน-เข้าเซฟ
| `OX_CouncilVaultGetAmmo`               | สภา-กระสุน-ออกเซฟ
| `OX_CouncilVaultPutKeys`               | สภา-กุญแจ-เข้าเซฟ
| `OX_CouncilVaultGetKeys`               | สภา-กุญแจ-ออกเซฟ

</TabItem>
</Tabs>

:::caution

เหตุการณ์เหล่านี้ อ้างอิงจากการติดตั้งรหัสส่งข้อมูลตามขั้นตอนใน **[inventory/server.lua](#inventoryserverlua)**

:::

### ตู้เก็บหลักฐานตำรวจ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `OX_PoliceEvidencePutItem`             | ไอเทม-เข้าตู้หลักฐานตำรวจ
| `OX_PoliceEvidenceGetItem`             | ไอเทม-ออกตู้หลักฐานตำรวจ
| `OX_PoliceEvidencePutMoney`            | เงินเขียว-เข้าตู้หลักฐานตำรวจ
| `OX_PoliceEvidenceGetMoney`            | เงินเขียว-ออกตู้หลักฐานตำรวจ
| `OX_PoliceEvidencePutDirtyMoney`       | เงินแดง-เข้าตู้หลักฐานตำรวจ
| `OX_PoliceEvidenceGetDirtyMoney`       | เงินแดง-ออกตู้หลักฐานตำรวจ
| `OX_PoliceEvidencePutWeapon`           | อาวุธ-เข้าตู้หลักฐานตำรวจ
| `OX_PoliceEvidenceGetWeapon`           | อาวุธ-ออกตู้หลักฐานตำรวจ
| `OX_PoliceEvidencePutAmmo`             | กระสุน-เข้าตู้หลักฐานตำรวจ
| `OX_PoliceEvidenceGetAmmo`             | กระสุน-ออกตู้หลักฐานตำรวจ
| `OX_PoliceEvidencePutKeys`             | กุญแจ-เข้าตู้หลักฐานตำรวจ
| `OX_PoliceEvidenceGetKeys`             | กุญแจ-ออกตู้หลักฐานตำรวจ

:::caution

เหตุการณ์เหล่านี้ อ้างอิงจากการติดตั้งรหัสส่งข้อมูลตามขั้นตอนใน **[inventory/server.lua](#inventoryserverlua)**

:::
