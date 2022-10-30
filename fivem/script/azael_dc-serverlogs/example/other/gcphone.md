---
sidebar_label: gcphone
---

# gcphone

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[gcphone](https://github.com/N3MTV/gcphone)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## bank.lua (Server)

ไปยังโฟลเดอร์ **[server](https://github.com/N3MTV/gcphone/tree/master/resources/gcphone/server)** แล้วดำเนินการเปิดไฟล์ **bank.lua**

### โอนเงิน-มือถือ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `BankTransferPhone`                    | โอนเงิน-มือถือ

วางรหัสด้านล่างนี้ต่อจาก `e.addAccountMoney("bank", tonumber(b))`

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'BankTransferPhone',
        content = ('โอนเงิน จำนวน $%s ไปยัง %s เงินในบัญชีคงเหลือ $%s'):format(ESX.Math.GroupDigits(tonumber(b)), e.name, ESX.Math.GroupDigits(d.getAccount('bank').money)),
        source = d.source,
        color = 3,
        options = {
            important = (tonumber(b) >= 100000 and true)
        }
    })

    exports['azael_dc-serverlogs']:insertData({
        event = 'BankTransferPhone',
        content = ('ได้รับเงิน จำนวน $%s จาก %s มีเงินในบัญชีทั้งหมด $%s'):format(ESX.Math.GroupDigits(tonumber(b)), d.name, ESX.Math.GroupDigits(e.getAccount('bank').money)),
        source = e.source,
        color = 2,
        options = {
            important = (tonumber(b) >= 100000 and true)
        }
    })
end)
```

## twitter.lua (Server)

ไปยังโฟลเดอร์ **[server](https://github.com/N3MTV/gcphone/tree/master/resources/gcphone/server)** แล้วดำเนินการเปิดไฟล์ **[twitter.lua](https://github.com/N3MTV/gcphone/blob/master/resources/gcphone/server/twitter.lua)**

### โพสต์-ทวิตเตอร์

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `TwitterPosts`                         | โพสต์-ทวิตเตอร์

วางรหัสด้านล่างนี้ต่อจาก `TriggerEvent('gcPhone:twitter_newTweets', tweet)` บรรทัดที่ **[89](https://github.com/N3MTV/gcphone/blob/master/resources/gcphone/server/twitter.lua#L89)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'TwitterPosts',
        content = ('ข้อความ: %s\nรูปภาพ: %s'):format((message or a), (image or b)),
        source = (sourcePlayer or c),
        color = 5
    })
end)
```
