---
sidebar_label: Server
---

# server.config

ไฟล์การกำหนดค่าของทรัพยากรทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)**

## General

ทั่วไป

```lua title="บรรทัดที่ 11"
CONFIG.General = {} -- [[ table ]]
```

### Option.Type

ประเภทตัวเลือกที่ต้องการใช้งาน **`DISCORD`** หรือ **`CUSTOM`**

```lua title="บรรทัดที่ 13"
CONFIG.General.Option.Type = 'DISCORD' -- [[ string ]]
```

:::info

- `DISCORD` เท่ากับ ส่งคำขอไปยัง **[Discord API](https://discord.com/developers/docs/resources/webhook#create-webhook)** โดยใช้ **[Webhook URL](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)** (อ้างอิงจากกำหนดค่า **[Webhooks](./events/discord#discord-events)**)<br/>
- `CUSTOM` เท่ากับ ส่งคำขอไปยัง **[Server API](https://en.wikipedia.org/wiki/Web_API)** ที่กำหนดเอง (อ้างอิงจากกำหนดค่า **[API.BaseURL](./server.md#apibaseurl)**)

:::

### Crashes.Enable

เปิดใช้งาน บันทึกข้อมูลไปยังโฟลเดอร์ **`azael_dc-serverlogs/data/crashes`** หากพบข้อผิดพลาดต่างๆ (**ป้องกันข้อมูลสูญหาย**)

```lua title="บรรทัดที่ 17"
CONFIG.General.Crashes.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Hardware.Enable

เปิดใช้งาน แสดง **Hardware Tokens** ของผู้เล่นที่เหตุการณ์ **Login (เข้าสู่เซิร์ฟเวอร์)**

```lua title="บรรทัดที่ 21"
CONFIG.General.Crashes.Hardware = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Screenshot.Enable

เปิดใช้งาน บันทึกภาพหน้าจอตามเหตุการณ์ที่กำหนดใน **[Screenshot.Webhooks](./server.md#screenshotwebhooks)**

```lua title="บรรทัดที่ 25"
CONFIG.General.Screenshot.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

:::caution

จำเป็นที่จะต้องติดตั้งและใช้งานทรัพยากร **[screenshot-basic](https://github.com/citizenfx/screenshot-basic)** หากเปิดใช้งาน

:::

### Screenshot.Webhooks

เหตุการณ์ที่กำหนดให้บันทึกภาพหน้าจอ และ อัพโหลดไปยัง **[Discord](https://discord.com/developers/docs/resources/webhook#create-webhook)** เพื่อฝากภาพ

```lua title="บรรทัดที่ 27"
CONFIG.General.Screenshot.Webhooks = { -- [[ table ]]
    ['Dead'] = 'webhook_url',           -- ฝากภาพ-สาเหตุการตาย
    ['Dead:1'] = 'webhook_url',         -- ฝากภาพ-สาเหตุการตาย-1
    ['Dead:2'] = 'webhook_url',         -- ฝากภาพ-สาเหตุการตาย-2
    ['Dead:3'] = 'webhook_url',         -- ฝากภาพ-สาเหตุการตาย-3
    ['Dead:4'] = 'webhook_url',         -- ฝากภาพ-สาเหตุการตาย-4
    ['Dead:5'] = 'webhook_url',         -- ฝากภาพ-สาเหตุการตาย-5
    ['Dead:6'] = 'webhook_url',         -- ฝากภาพ-สาเหตุการตาย-6
    ['Dead:7'] = 'webhook_urlB',        -- ฝากภาพ-สาเหตุการตาย-7
    ['Dead:8'] = 'webhook_url',         -- ฝากภาพ-สาเหตุการตาย-8
    ['Dead:9'] = 'webhook_url',         -- ฝากภาพ-สาเหตุการตาย-9
}
```

:::caution

- เหตุการณ์ **Login** (**เข้าสู่เซิร์ฟเวอร์**) และ **Logout** (**ออกจากเซิร์ฟเวอร์**) ไม่สามารถใช้งานได้

:::

### Chat.Enable

เปิดใช้งาน ตรวจสอบข้อความที่ผู้เล่นดำเนินการ (**[chatMessage](https://docs.fivem.net/docs/resources/chat/events/chatMessage/)**)

```lua title="บรรทัดที่ 42"
CONFIG.General.Chat.Enable = false -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Chat.Remove.Enable

เปิดใช้งาน ลบข้อความ หากพบคําที่ไม่อนุญาต

```lua title="บรรทัดที่ 45"
CONFIG.General.Chat.Remove.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Chat.Kick.Enable

เปิดใช้งาน เตะผู้เล่นออกจากเซิร์ฟเวอร์ หากพบคําที่ไม่อนุญาต

```lua title="บรรทัดที่ 49"
CONFIG.General.Chat.Kick.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Chat.Kick.Reason

เหตุผลในการเตะผู้เล่นออกจากเซิร์ฟเวอร์ หากพบคําที่ไม่อนุญาต

```lua title="บรรทัดที่ 50"
CONFIG.General.Chat.Kick.Reason = 'ตรวจพบคำที่ไม่ได้รับอนุญาต (%s)' -- [[ string ]]
```

### Chat.Kick.Word

รายการคำที่ไม่ได้รับอนุญาตให้ใช้งาน

```lua title="บรรทัดที่ 53"
CONFIG.General.Chat.Word = { -- [[ table ]]
    'discord.gg',
    'discord.com/invite',
    'discordapp.com/invite',
    'lynxcollective.ltd',
    'eulencheats.com'
}
```

### Color

รหัสสี (รูปแบบ **[Hexadecimal](https://en.wikipedia.org/wiki/Web_colors)**)

```lua title="บรรทัดที่ 62"
CONFIG.General.Color = { -- [[ table ]]
    [1] = '#FF4444',                                    -- แดงอ่อน
    [2] = '#99CC00',                                    -- เขียวเข้ม
    [3] = '#FFBB33',                                    -- ส้มอ่อน
    [4] = '#0099CC',                                    -- ฟ้าเข้ม
    [5] = '#33B5E5',                                    -- ฟ้าอ่อน
    [6] = '#AA66CC',                                    -- ม่วงกลาง
    [7] = '#99AAB5',                                    -- น้ำเงินอมเทา
    [8] = '#CC0000',                                    -- แดงเข้ม
    [9] = '#CC0068',                                    -- ชมพูเข้ม
    [10] = '#FFFFFF'                                    -- ขาว
}
```

### EventHandler.Enable

เปิดใช้งาน **เพิ่มตัวจัดการเหตุการณ์** ให้รองรับรหัสการส่งข้อมูล **[azael_dc-serverlogs](../index.md)** เวอร์ชันที่ล้าสมัยในรูปแบบ **[TriggerEvent](https://docs.fivem.net/docs/scripting-manual/working-with-events/triggering-events/)** ทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)**

```lua title="บรรทัดที่ 76"
CONFIG.General.EventHandler.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

:::caution

- หากคุณใช้งาน **`TriggerServerEvent`** ทางฝั่ง **[Client](https://en.wikipedia.org/wiki/Client-side)** คุณจะได้รับข้อผิดพลาด **`event was not safe for net`** ที่ **[Server Console](https://docs.fivem.net/docs/server-manual/server-commands)**
- มีความจำเป็นที่จะต้องใช้งาน **[รหัสส่งข้อมูลในรูปแบบใหม่](../export/client.md)** ทางฝั่ง **[Client](https://en.wikipedia.org/wiki/Client-side)**

:::

### EventHandler.Events

รายชื่อเหตุการณ์ทั้งหมดของ **[azael_dc-serverlogs](../index.md)** ในเวอร์ชันที่ล้าสมัย

```lua title="บรรทัดที่ 78"
CONFIG.General.EventHandler.Events = { -- [[ table ]]
    'azael_discordlogs:sendToDiscord',
    'azael_dc-serverlogs:sendToDiscord',
    'azael_dc-serverlogs:insertData'
}
```

<details>
    <summary>ตัวอย่างรหัสส่งข้อมูลในเวอร์ชันที่ล้าสมัย</summary>

```lua title="azael_discordlogs:sendToDiscord"
local sendToDiscord = 'เนื้อหาของข้อความที่ต้องการส่ง'
TriggerEvent('azael_discordlogs:sendToDiscord', 'eventName', sendToDiscord, source, '^7')
```

```lua title="azael_dc-serverlogs:sendToDiscord"
local sendToDiscord = 'เนื้อหาของข้อความที่ต้องการส่ง'
TriggerEvent('azael_dc-serverlogs:sendToDiscord', 'eventName', sendToDiscord, source, '^7')
```

```lua title="azael_dc-serverlogs:insertData"
local content = 'เนื้อหาของข้อความที่ต้องการส่ง'
TriggerEvent('azael_dc-serverlogs:insertData', 'eventName', content, source, 7, false)
```

- `Args[1]` ชื่อเหตุการณ์ที่ลงทะเบียนโดย **[azael_dc-serverlogs](../index.md)** เพื่อรับข้อมูลจากทรัพยากรอื่น
- `Args[2]` ชื่อเหตุการณ์เพื่อแยกประเภทของข้อมูล
- `Args[3]` เนื้อหาของข้อความที่ต้องการส่ง
- `Args[4]` แหล่งที่มาของผู้เล่น (**[NetID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#players)**)
- `Args[5]` รหัสสีที่กำหนดภายในไฟล์การตั้งค่า (**0**, **9**)
- `Args[6]` ปิดการเเสดงข้อมูลของผู้เล่นบนแอปพลิเคชัน **[Discord](https://discord.com/)**

</details>

## Custom API

ส่งคำขอไปยัง **[Server API](https://en.wikipedia.org/wiki/Web_API)** ที่กำหนดเองแบบเรียลไทม์

```lua title="บรรทัดที่ 86"
CONFIG.Custom = {} -- [[ table ]]
```

### API.BaseURL

**[Base URL](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)** ของ **[Server API](https://en.wikipedia.org/wiki/Web_API)** สำหรับ รับข้อมูลจากฟอร์มคำขอ (**[HTTP Requests](https://en.wikipedia.org/wiki/POST_(HTTP))**)

```lua title="บรรทัดที่ 88"
CONFIG.Custom.API.BaseURL = 'http://localhost/api/azael_logs/' -- [[ string ]]
```

:::info

ส่งคำขอโดยใช้ **[POST](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)** และ **API** จะต้องตอบกลับสถานะ `200`, `201` หรือ `204` หากดำเนินการสำเร็จ

:::

### API.Authorization.Method

**Method** สำหรับ **[Authorization](https://en.wikipedia.org/wiki/HTTP_authentication)** ที่ใช้งาน (จะถูกกำหนดภายใน **[HTTP Headers](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields)** ของคำขอ)

```lua title="บรรทัดที่ 91"
CONFIG.Custom.API.Authorization.Method = 'Log' -- [[ string ]]
```

:::note HTTP Headers

```lua
{
    ['Content-Type'] = 'application/json; charset=utf-8',
    ['Authorization'] = ('%s %s'):format(CONFIG.Custom.API.Authorization.Method, CONFIG.Custom.API.Authorization.Token)
}
```

:::

### API.Authorization.Token

**Token** สำหรับ **[Authorization](https://en.wikipedia.org/wiki/HTTP_authentication)** ที่ใช้งาน (จะถูกกำหนดภายใน **[HTTP Headers](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields)** ของคำขอ)

```lua title="บรรทัดที่ 92"
CONFIG.Custom.API.Authorization.Token = 'security_token' -- [[ string ]]
```

:::note HTTP Headers

```lua
{
    ['Content-Type'] = 'application/json; charset=utf-8',
    ['Authorization'] = ('%s %s'):format(CONFIG.Custom.API.Authorization.Method, CONFIG.Custom.API.Authorization.Token)
}
```

:::

## Discord API

ส่งคำขอไปยัง **[Discord API](https://discord.com/developers/docs/resources/webhook#create-webhook)** โดยใช้ **[Webhook URL](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)** ตามขีดจำกัดอัตราการใช้งาน **[Discord API](https://discord.com/developers/docs/resources/webhook#create-webhook)** สำหรับ **[Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)**

```lua title="บรรทัดที่ 97"
CONFIG.Discord = {} -- [[ table ]]
```

### Rate.Limit

กำหนดการส่งคำขอไปยัง **[Discord API](https://discord.com/developers/docs/resources/webhook#create-webhook)** ภายใน **1** นาที ต่อ **1** ช่อง

```lua title="บรรทัดที่ 99"
CONFIG.Discord.Rate.Limit = 30 -- [[ number ]]
```

:::danger

**[Discord API](https://discord.com/developers/docs/resources/webhook#create-webhook)** สำหรับ **[Webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)** ขีดจำกัดอัตราการใช้งานในปัจจุบันอยู่ที่ **30** คำขอ ต่อ **1** นาที ต่อ **1** ช่อง หากเกินขีดจำกัดอัตราการใช้งาน อาจส่งผลให้ **[Discord API](https://discord.com/developers/docs/resources/webhook#create-webhook)** ปิดกั้นการใช้งาน **[ต่อเส้นทาง](https://discord.com/developers/docs/topics/rate-limits#rate-limits)** หรือ **[ทั่วโลก](https://discord.com/developers/docs/topics/rate-limits#global-rate-limit)** และ รหัสสถานะการตอบกลับ HTTP **[429 (You are being rate limited)](https://discord.com/developers/docs/topics/opcodes-and-status-codes#http-http-response-codes)** 

:::

### Avatar.URL

ที่อยู่รูปภาพอวทาร์ สำหรับ **[Webhooks](https://discord.com/developers/docs/resources/webhook#create-webhook-json-params)**

```lua title="บรรทัดที่ 103"
CONFIG.Discord.Avatar.URL = 'https://i.imgur.com/GxQpZzJ.png' -- [[ string ]]
```

### Important.Content

ข้อความที่ดำเนินการ Ping ไปยังบทบาทที่กำหนด หากรหัสส่งข้อมูลมีการกำหนดค่า `options = { important = true }`

```lua title="บรรทัดที่ 107"
CONFIG.Discord.Important.Content = '__**⚠️ IMPORTANT ― || @everyone || Please Read!! ⚠️**__' -- [[ string ]]
```

:::info

ค่าเริ่มต้นจะ Ping ไปยัง `@everyone` คุณสามารถ Ping ไปเฉพาะบทบาทได้โดยการแก้ไข `@everyone` เป็น `<@&RoleID>`

:::

### Command.Save

คำสั่ง บันทึกข้อมูลทั้งหมด ไปยังโฟลเดอร์ **`azael_dc-serverlogs/data/logs`** ในรูปแบบไฟล์ **[JSON](https://www.wikidata.org/wiki/Q2063)**

```lua title="บรรทัดที่ 111"
CONFIG.Discord.Command.Save = 'logsave' -- [[ string ]]
```

:::info

ในกรณียังมีคิวส่งคำขออยู่ และผู้ดูแลต้องการ ปิดเซิร์ฟเวอร์ หรือ รีสตาร์ทเซิร์ฟเวอร์ ระบบจะบันทึกข้อมูลทั้งหมดไปยังโฟลเดอร์ **`azael_dc-serverlogs/data/logs`**

:::

:::caution

คำสั่งนี้ไม่สามารถดำเนินการบนฝั่ง **[Client](https://en.wikipedia.org/wiki/Client-side)** ได้

:::

### Command.Queue

ตรวจสอบคิวที่ยังรอดำเนินการส่งคำขอไปยัง **[Discord API](https://discord.com/developers/docs/resources/webhook#create-webhook)** สำหรับ **[Webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)**

```lua title="บรรทัดที่ 112"
CONFIG.Discord.Command.Queue = 'logqueue' -- [[ string ]]
```

:::caution

คำสั่งนี้ไม่สามารถดำเนินการบนฝั่ง **[Client](https://en.wikipedia.org/wiki/Client-side)** ได้

:::

### txAdmin.Enable

เปิดใช้งาน บันทึกข้อมูลทั้งหมดไปยังโฟลเดอร์ **`azael_dc-serverlogs/data/logs`** ในรูปแบบไฟล์ **[JSON](https://www.wikidata.org/wiki/Q2063)** สำหรับเหตุการณ์ **กำลังปิดเซิร์ฟเวอร์** โดย **[txAdmin](https://txadm.in/)** (**ป้องกันข้อมูลสูญหาย**)

```lua title="บรรทัดที่ 116"
CONFIG.Discord.txAdmin.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

:::caution

รองรับ **[txAdmin](https://txadm.in/)** เวอร์ชัน **[4.15](https://github.com/tabarra/txAdmin/blob/master/docs/events.md#txadmineventsservershuttingdown-v415)** ขึ้นไป

:::

### txAdmin.Shutting.Event

ชื่อเหตุการณ์ กำลังปิดเซิร์ฟเวอร์ โดย ผู้ดูแลระบบ หรือ ตามกำหนดการรีสตาร์ท

```lua title="บรรทัดที่ 119"
CONFIG.Discord.txAdmin.Shutting.Event = 'txAdmin:events:serverShuttingDown' -- [[ string ]]
```

:::info

ค่าเริ่มต้นอยู่ที่ `5000` มิลลิวินาที ก่อนที่ **[txAdmin](https://txadm.in/)** จะฆ่ากระบวนการของเซิร์ฟเวอร์

:::

:::caution

รองรับ **[txAdmin](https://txadm.in/)** เวอร์ชัน **[4.15](https://github.com/tabarra/txAdmin/blob/master/docs/events.md#txadmineventsservershuttingdown-v415)** ขึ้นไป

:::

### Filter.Enable

เปิดใช้งาน ตรวจจับตัวระบุที่กำหนด และดำเนินการย้ายไปยังเหตุการณ์ใหม่

```lua title="บรรทัดที่ 124"
CONFIG.Discord.Filter.Enable = false -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Filter.Identifiers

รายการตัวระบุทั้งหมดที่ต้องการตรวจจับ และดำเนินการย้ายไปยังเหตุการณ์ใหม่ (รองรับตัวระบุ `steam`, `discord`, `license`, `license2`, `ip`)

```lua title="บรรทัดที่ 126"
CONFIG.Discord.Filter.Identifiers = { -- [[ table ]]
    ['steam:xxxxxxxxxxxxxxx'] = 'Player_A'
}
```

:::info

```lua
['identifier'] = 'new_event'
```

- `identifier` หมายถึง ตัวระบุของผู้เล่นที่ต้องการตรวจจับ และดำเนินการย้ายไปยังเหตุการณ์ใหม่<br/>
- `new_event` หมายถึง ชื่อเหตุการณ์ใหม่ โดยอ้างอิงจาก ชื่อเหตุการณ์ ที่กำหนดใน **[CONFIG.Discord.Webhooks](./events/discord#discord-events)**

:::
