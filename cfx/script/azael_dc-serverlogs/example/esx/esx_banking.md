---
sidebar_label: esx_banking
---

# esx_banking

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[esx_banking](https://github.com/esx-framework/esx_banking)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Server)

ไปยังโฟลเดอร์ **[server](https://github.com/esx-framework/esx_banking/tree/main/server)** แล้วดำเนินการเปิดไฟล์ **[main.lua](https://github.com/esx-framework/esx_banking/blob/main/server/main.lua)**

### ถอนเงิน-ธนาคาร

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `BankWithdraw`                         | ถอนเงิน-ธนาคาร

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.removeAccountMoney('bank', amount)` บรรทัดที่ **[195](https://github.com/esx-framework/esx_banking/blob/main/server/main.lua#L195)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'BankWithdraw',
        content = ('ถอนเงิน จำนวน $%s เงินในบัญชีคงเหลือ $%s มีเงินในกระเป๋าทั้งหมด $%s'):format(ESX.Math.GroupDigits(amount), ESX.Math.GroupDigits(xPlayer.getAccount('bank').money), ESX.Math.GroupDigits(xPlayer.getMoney())),
        source = xPlayer.source,
        color = 3,
        options = {
            important = (amount >= 100000 and true)
        }
    })
end)
```

### ฝากเงิน-ธนาคาร

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `BankDeposit`                          | ฝากเงิน-ธนาคาร

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addAccountMoney('bank', amount)` บรรทัดที่ **[199](https://github.com/esx-framework/esx_banking/blob/main/server/main.lua#L199)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'BankDeposit',
        content = ('ฝากเงิน จำนวน $%s เงินในกระเป๋าคงเหลือ $%s มีเงินในบัญชีทั้งหมด $%s'):format(ESX.Math.GroupDigits(amount), ESX.Math.GroupDigits(xPlayer.getMoney()), ESX.Math.GroupDigits(xPlayer.getAccount('bank').money)),
        source = xPlayer.source,
        color = 2,
        options = {
            important = (amount >= 100000 and true)
        }
    })
end)
```

### โอนเงิน-ธนาคาร

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `BankTransfer`                         | โอนเงิน-ธนาคาร

วางรหัสด้านล่างนี้ต่อจาก `xTarget.addAccountMoney('bank', amount)` บรรทัดที่ **[208](https://github.com/esx-framework/esx_banking/blob/main/server/main.lua#L208)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'BankTransfer',
        content = ('โอนเงิน จำนวน $%s ไปยัง %s เงินในบัญชีคงเหลือ $%s'):format(ESX.Math.GroupDigits(amount), xTarget.name, ESX.Math.GroupDigits(xPlayer.getAccount('bank').money)),
        source = xPlayer.source,
        color = 3,
        options = {
            important = (amount >= 100000 and true)
        }
    })

    exports['azael_dc-serverlogs']:insertData({
        event = 'BankTransfer',
        content = ('ได้รับเงิน จำนวน $%s จาก %s มีเงินในบัญชีทั้งหมด $%s'):format(ESX.Math.GroupDigits(amount), xPlayer.name, ESX.Math.GroupDigits(xTarget.getAccount('bank').money)),
        source = xTarget.source,
        color = 2,
        options = {
            important = (amount >= 100000 and true)
        }
    })
end)
```
