---
sidebar_label: esx_society
---

# esx_society

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx_society](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_society)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](./)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Server)

ไปยังโฟลเดอร์ **[server](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_society/server)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_society/server/main.lua)**

### หน่วยงาน-ถอนเงินกองกลาง

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `SocietyWithdrawMoney`                 | หน่วยงาน-ถอนเงินกองกลาง

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addMoney(amount, "Society Withdraw")` บรรทัดที่ **[60](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_society/server/main.lua#L90)**

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'SocietyWithdrawMoney',
		content = ('ถอนเงิน​กองกลาง %s จำนวน $%s เงินกองกลางคงเหลือ $%s'):format(society.account, ESX.Math.GroupDigits(amount), ESX.Math.GroupDigits(account.money - amount)),
		source = xPlayer.source,
		color = 1,
		options = {
			important = (amount >= 100000 and true)
		}
	})
end)
```

### หน่วยงาน-ฝากเงินกองกลาง

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `SocietyDepositMoney`                  | หน่วยงาน-ฝากเงินกองกลาง

วางรหัสด้านล่างนี้ต่อจาก `account.addMoney(amount)` บรรทัดที่ **[117](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_society/server/main.lua#L117)**

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'SocietyDepositMoney',
		content = ('ฝากเงิน​กองกลาง %s จำนวน $%s มีเงินกองกลางทั้งหมด $%s'):format(society.account, ESX.Math.GroupDigits(amount), ESX.Math.GroupDigits(account.money + amount)),
		source = xPlayer.source,
		color = 2,
		options = {
			important = (amount >= 100000 and true)
		}
	})
end)
```

### หน่วยงาน-ฝากเงินแดง

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `SocietyWashMoney`                     | หน่วยงาน-ฝากเงินแดง

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.showNotification(TranslateCap('you_have', ESX.Math.GroupDigits(amount)))` บรรทัดที่ **[140](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx_addons%5D/esx_society/server/main.lua#L140)**

```lua
pcall(function()
	exports['azael_dc-serverlogs']:insertData({
		event = 'SocietyWashMoney',
		content = ('นำ Dirty Money จำนวน $%s ฝากเข้าหน่วยงาน %s'):format(ESX.Math.GroupDigits(amount), society),
		source = xPlayer.source,
		color = 2,
		options = {
			important = (amount >= 100000 and true)
		}
	})
end)
```
