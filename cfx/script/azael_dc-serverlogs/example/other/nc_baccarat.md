---
sidebar_label: nc_baccarat
---

# nc_baccarat

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[nc_baccarat](https://fivem.nc-developer.com/product/652c6b8e95cb3)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## config.functions.server.lua

ไปยัง **`config.functions.server.lua`** แล้วดำเนินการเปิดไฟล์

### บาคาร่า-วางเดิมพัน

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_BaccaratPlacedBet`                 | บาคาร่า-วางเดิมพัน

วางรหัสด้านล่างนี้ภายใน `Config.ServerPlacedBet = function`

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'NC_BaccaratPlacedBet',
        content = ('วางเดิมพันที่โต๊ะ %s แทงทางฝั่ง %s จำนวน %s'):format(tableKey, betKey, ESX.Math.GroupDigits(betCount)),
        fields = {
            { name = '**BET RESULT**', value = ('```%s```'):format(json.encode(betResult, { indent = true })), inline = false }
        },
        source = xPlayer.source,
        color = 2
    })
end)
```

### บาคาร่า-ยกเลิกเดิมพัน

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_BaccaratClearedBet`                | บาคาร่า-ยกเลิกเดิมพัน

วางรหัสด้านล่างนี้ภายใน `Config.ServerClearedBet = function`

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'NC_BaccaratClearedBet',
        content = ('ยกเลิกเดิมพันที่โต๊ะ %s แทงทางฝั่ง %s จำนวน %s'):format(tableKey, betKey, ESX.Math.GroupDigits(betCount)),
        fields = {
            { name = '**BET RESULT**', value = ('```%s```'):format(json.encode(betResult, { indent = true })), inline = false }
        },
        source = xPlayer.source,
        color = 1
    })
end)
```

### บาคาร่า-รายงานผล

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_BaccaratGameResult`                | บาคาร่า-รายงานผล

วางรหัสด้านล่างนี้ภายใน `Config.ServerGameResult = function` ต่อจาก `transaction[#transaction + 1]`

```lua
Citizen.CreateThreadNow(function()
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'NC_BaccaratGameResult',
            content = ('รายงานผลที่โต๊ะ %s ของผู้เล่นตัวระบุ %s'):format(tableKey, identifier),
            fields = {
                { name = '**IDENTIFIER**', value = ('```%s```'):format(identifier), inline = false },
                { name = '**WINNER**', value = ('```%s```'):format((win and '✔️ ➔ YES' or '❌ ➔ NO')), inline = false },
                { name = '**BET KEY**', value = ('```%s```'):format(betKey), inline = true },
                { name = '**TOTAL BET**', value = ('```%s```'):format(total), inline = true },
                { name = '**BET PROFIT**', value = ('```%s```'):format(profit), inline = true },
                { name = '**ACCOUNTS**', value = ('```%s```'):format(json.encode(list.account, { indent = true })), inline = false },
                { name = '**ITEMS**', value = ('```%s```'):format(json.encode(list.item, { indent = true })), inline = false },
            },
            source = 0,
            color = (win and 2 or 1)
        })
    end)
end)
```

:::caution

- รองรับ [**azael_dc-serverlogs**](../../) เวอร์ชัน **`1.7.4`** ขึ้นไป

:::
