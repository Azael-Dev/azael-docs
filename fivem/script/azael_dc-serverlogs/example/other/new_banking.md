---
sidebar_label: new_banking
---

# new_banking

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[new_banking](https://github.com/ikovaa/new_banking)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## main.lua (Server)

ไปยังโฟลเดอร์ **[server](https://github.com/ikovaa/new_banking/tree/main/server)** แล้วดำเนินการเปิดไฟล์ **[server.lua](https://github.com/ikovaa/new_banking/blob/main/server/server.lua)**

### ฝากเงิน-ธนาคาร

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `BankDeposit`                          | ฝากเงิน-ธนาคาร

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addAccountMoney('bank', tonumber(amount))` บรรทัดที่ **[22](https://github.com/ikovaa/new_banking/blob/main/server/server.lua#L22)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'BankDeposit',
        content = ('ฝากเงิน จำนวน $%s เงินในกระเป๋าคงเหลือ $%s มีเงินในบัญชีทั้งหมด $%s'):format(ESX.Math.GroupDigits(tonumber(amount)), ESX.Math.GroupDigits(xPlayer.getMoney()), ESX.Math.GroupDigits(xPlayer.getAccount('bank').money)),
        source = xPlayer.source,
        color = 2,
        options = {
            important = (tonumber(amount) >= 100000 and true)
        }
    })
end)
```

### ถอนเงิน-ธนาคาร

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `BankWithdraw`                         | ถอนเงิน-ธนาคาร

วางรหัสด้านล่างนี้ต่อจาก `xPlayer.addMoney(amount)` บรรทัดที่ **[45](https://github.com/ikovaa/new_banking/blob/main/server/server.lua#L45)**

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

### โอนเงิน-ธนาคาร

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `BankTransfer`                         | โอนเงิน-ธนาคาร

วางรหัสด้านล่างนี้ต่อจาก `zPlayer.addAccountMoney('bank', tonumber(amountt))` บรรทัดที่ **[80](https://github.com/ikovaa/new_banking/blob/main/server/server.lua#L80)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'BankTransfer',
        content = ('โอนเงิน จำนวน $%s ไปยัง %s เงินในบัญชีคงเหลือ $%s'):format(ESX.Math.GroupDigits(tonumber(amountt)), zPlayer.name, ESX.Math.GroupDigits(xPlayer.getAccount('bank').money)),
        source = xPlayer.source,
        color = 3,
        options = {
            important = (tonumber(amountt) >= 100000 and true)
        }
    })

    exports['azael_dc-serverlogs']:insertData({
        event = 'BankTransfer',
        content = ('ได้รับเงิน จำนวน $%s จาก %s มีเงินในบัญชีทั้งหมด $%s'):format(ESX.Math.GroupDigits(tonumber(amountt)), xPlayer.name, ESX.Math.GroupDigits(zPlayer.getAccount('bank').money)),
        source = zPlayer.source,
        color = 2,
        options = {
            important = (tonumber(amountt) >= 100000 and true)
        }
    })
end)
```
