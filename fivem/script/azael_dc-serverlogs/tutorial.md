---
sidebar_label: บทช่วยสอน
---

# บทช่วยสอน

บทช่วยสอนที่เกี่ยวข้องกับทรัพยากร **[azael_dc-serverlogs](./)**

### ติดตั้งรหัสส่งข้อมูล

ติดตั้งรหัสส่งข้อมูลไปยังทรัพยากรอื่นๆทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)** และ **[Client](https://en.wikipedia.org/wiki/Client-side)**

:::caution

โปรดอ่านรายละเอียด **[Export Functions (Both-Side)](./export/shared)** เพื่อให้มีความเข้าใจเกี่ยวกับรหัสที่ใช้ในการส่งข้อมูล

:::

### ติดตั้งฝั่ง Server

ตัวอย่างการติดตั้งรหัสส่งข้อมูลไปยังทรัพยากรอื่นๆทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)**

```lua title="new_banking/server.lua"
RegisterServerEvent('bank:deposit')
AddEventHandler('bank:deposit', function(amount)
	local _source = source
	local xPlayer = ESX.GetPlayerFromId(_source)

    amount = tonumber(amount)

	if amount == nil or amount <= 0 or amount > xPlayer.getMoney() then
		TriggerClientEvent('bank:result', _source, "error", "Montant invalide.")
	else
		xPlayer.removeMoney(amount)
		xPlayer.addAccountMoney('bank', amount)

		TriggerClientEvent('bank:result', _source, "success", "Dépot effectué.")

        --[[ START: azael_dc-serverlogs ]]
        pcall(function()
           exports['azael_dc-serverlogs']:insertData({
                event = 'BankDeposit',
                content = ('ฝากเงินเข้าธนาคาร จำนวน $%s เงินในกระเป๋าคงเหลือ $%s มีเงินในธนาคารทั้งหมด $%s'):format(ESX.Math.GroupDigits(amount), ESX.Math.GroupDigits(xPlayer.getMoney()), ESX.Math.GroupDigits(xPlayer.getAccount('bank').money)),
                source = xPlayer.source,
                color = 2,
                options = {
                    important = (amount >= 100000 and true)
                }
            })
        end)
        --[[ END: azael_dc-serverlogs ]]
	end
end)
```

:::tip

หากผู้เล่นฝากเงินเข้าธนาคารตั้งเเต่ **100,000** ขึ้นไป **`important`** จะเท่ากับ **`true`** หากน้อยกว่า จะเท่ากับ **`nil`** 

```lua
options = {
    important = (amount >= 100000 and true)
}
```

- หากใช้งาน **[Discord API](./config/server#discord-api)** ระบบจะดำเนินการ **Ping** ไปยัง `@everyone`

:::

### ติดตั้งฝั่ง Client

ตัวอย่างการติดตั้งรหัสส่งข้อมูลไปยังทรัพยากรอื่นๆทางฝั่ง **[Client](https://en.wikipedia.org/wiki/Client-side)**

```lua title="esx_policejob/client/main.lua"
function ImpoundVehicle(vehicle)
    local vehicleName = GetLabelText(GetDisplayNameFromVehicleModel(GetEntityModel(vehicle)))

    --[[ START: azael_dc-serverlogs ]]
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'PoliceImPound',
            content = ('ส่ง ยานพาหนะ %s ทะเบียน %s ไปยังพาวท์'):format(vehicleName, GetVehicleNumberPlateText(vehicle)),
            source = GetPlayerServerId(PlayerId()),
            color = 5
        })
    end)
    --[[ END: azael_dc-serverlogs ]]

	ESX.Game.DeleteVehicle(vehicle)
	ESX.ShowNotification(TranslateCap('impound_successful'))
	currentTask.busy = false
end
```