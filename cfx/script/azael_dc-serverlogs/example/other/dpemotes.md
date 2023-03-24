---
sidebar_label: dpemotes
---

# dpemotes

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[dpemotes](https://github.com/andristum/dpemotes)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## Server.lua (Server)

ไปยังโฟลเดอร์ **[Server](https://github.com/andristum/dpemotes/tree/master/Server)** แล้วดำเนินการเปิดไฟล์ **[Server.lua](https://github.com/andristum/dpemotes/blob/master/Server/Server.lua)**

### ส่งคำขอ-emote

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `SharedEmotes`                         | ส่งคำขอ-emote

วางรหัสด้านล่างนี้ต่อจาก `TriggerClientEvent("ClientEmoteRequestReceive", target, emotename, etype)` บรรทัดที่ **[8](https://github.com/andristum/dpemotes/blob/master/Server/Server.lua#L8)**

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'SharedEmotes',
        content = ('ส่งคำขอ %s (Type: %s) ไปยัง %s'):format(emotename, (etype or 'NULL'), GetPlayerName(target)),
        source = source,
        color = 3
    })

    exports['azael_dc-serverlogs']:insertData({
        event = 'SharedEmotes',
        content = ('ได้รับคำขอ %s (Type: %s) จาก %s'):format(emotename, (etype or 'NULL'), GetPlayerName(source)),
        source = target,
        color = 7
    })
end)
```
