---
sidebar_label: esx_billing
---

# esx_billing

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx_billing](https://github.com/esx-framework/esx_billing)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../index.md)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../index.md)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Server)

ไปยังโฟลเดอร์ **[server](https://github.com/esx-framework/esx_billing/tree/main/server)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/esx-framework/esx_billing/blob/main/server/main.lua)**

### ส่ง-บิล

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `SendBill`                             | ส่ง-บิล

1. วางรหัสด้านล่างนี้ต่อจาก `function(rowsChanged)` บรรทัดที่ **[17](https://github.com/esx-framework/esx_billing/blob/main/server/main.lua#L17)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'SendBill',
        content = ('เรียกเก็บเงิน %s จำนวน $%s ไปยัง %s'):format(label, ESX.Math.GroupDigits(amount), xTarget.name),
        source = xPlayer.source,
        color = 5
    })

	exports['azael_dc-serverlogs']:insertData({
        event = 'SendBill',
        content = ('ค้างชำระ %s จำนวน $%s ออกบิลโดย %s หน่วยงาน %s'):format(label, ESX.Math.GroupDigits(amount), xPlayer.name, sharedAccountName),
        source = xTarget.source,
        color = 3
    })
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `function(rowsChanged)` บรรทัดที่ **[26](https://github.com/esx-framework/esx_billing/blob/main/server/main.lua#L26)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'SendBill',
        content = ('เรียกเก็บเงิน %s จำนวน $%s ไปยัง %s'):format(label, ESX.Math.GroupDigits(amount), xTarget.name),
        source = xPlayer.source,
        color = 2
    })

	exports['azael_dc-serverlogs']:insertData({
        event = 'SendBill',
        content = ('ค้างชำระ %s จำนวน $%s ออกบิลโดย %s'):format(label, ESX.Math.GroupDigits(amount), xPlayer.name),
        source = xTarget.source,
        color = 3
    })
end)
```

### จ่าย-บิล

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `PayBill`                              | จ่าย-บิล

1. วางรหัสด้านล่างนี้ต่อจาก `xTarget.addMoney(amount, "Paid bill")` บรรทัดที่ **[71](https://github.com/esx-framework/esx_billing/blob/main/server/main.lua#L71)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'PayBill',
        content = ('ชำระเงิน %s จำนวน $%s ให้กับ %s'):format((result.label or result[1].label), ESX.Math.GroupDigits(amount), xTarget.name),
        source = xPlayer.source,
        color = 2
    })

	exports['azael_dc-serverlogs']:insertData({
        event = 'PayBill',
        content = ('ได้รับเงิน %s จำนวน $%s จาก %s'):format((result.label or result[1].label), ESX.Math.GroupDigits(amount), xPlayer.name),
        source = xTarget.source,
        color = 7
    })
end)
```

2. วางรหัสด้านล่างนี้ต่อจาก `xTarget.addAccountMoney('bank', amount, "Paid bill")` บรรทัดที่ **[84](https://github.com/esx-framework/esx_billing/blob/main/server/main.lua#L84)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'PayBill',
        content = ('ชำระเงิน %s จำนวน $%s ให้กับ %s โดย Bank Money'):format((result.label or result[1].label), ESX.Math.GroupDigits(amount), xTarget.name),
        source = xPlayer.source,
        color = 2
    })

	exports['azael_dc-serverlogs']:insertData({
        event = 'PayBill',
        content = ('ได้รับเงิน %s จำนวน $%s จาก %s โดย Bank Money'):format((result.label or result[1].label), ESX.Math.GroupDigits(amount), xPlayer.name),
        source = xTarget.source,
        color = 7
    })
end)
```

3. วางรหัสด้านล่างนี้ต่อจาก `account.addMoney(amount)` บรรทัดที่ **[108](https://github.com/esx-framework/esx_billing/blob/main/server/main.lua#L108)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'PayBill',
        content = ('ชำระเงิน %s จำนวน $%s ให้กับ %s หน่วยงาน %s'):format((result.label or result[1].label), ESX.Math.GroupDigits(amount), xTarget.name, (result.target or result[1].target)),
        source = xPlayer.source,
        color = 2
    })

	exports['azael_dc-serverlogs']:insertData({
        event = 'PayBill',
        content = ('ได้รับเงิน %s จำนวน $%s จาก %s'):format((result.label or result[1].label), ESX.Math.GroupDigits(amount), xPlayer.name),
        source = xTarget.source,
        color = 5
    })
end)
```

4. วางรหัสด้านล่างนี้ต่อจาก `account.addMoney(amount)` บรรทัดที่ **[123](https://github.com/esx-framework/esx_billing/blob/main/server/main.lua#L123)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'PayBill',
        content = ('ชำระเงิน %s จำนวน $%s ให้กับ %s หน่วยงาน %s โดย Bank Money'):format((result.label or result[1].label), ESX.Math.GroupDigits(amount), xTarget.name, (result.target or result[1].target)),
        source = xPlayer.source,
        color = 2
    })

	exports['azael_dc-serverlogs']:insertData({
        event = 'PayBill',
        content = ('ได้รับเงิน %s จำนวน $%s จาก %s'):format((result.label or result[1].label), ESX.Math.GroupDigits(amount), xPlayer.name),
        source = xTarget.source,
        color = 5
    })
end)
```
