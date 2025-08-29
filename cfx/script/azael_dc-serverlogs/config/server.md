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

- `DISCORD` เท่ากับ ส่งคำขอไปยัง **[Discord API](https://discord.com/developers/docs/resources/webhook#create-webhook)** โดยใช้ **[Webhook URL](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)** (อ้างอิงจากกำหนดค่า **[Webhooks](./server.md#webhooks)**)<br/>
- `CUSTOM` เท่ากับ ส่งคำขอไปยัง **[Server API](https://en.wikipedia.org/wiki/Web_API)** ที่กำหนดเอง (อ้างอิงจากกำหนดค่า **[API.BaseURL](./server.md#apibaseurl)**)

:::

### Crashes.Enable

เปิดใช้งาน บันทึกข้อมูลไปยังโฟลเดอร์ **`azael_data/azael_dc-serverlogs/crashes`** หากพบข้อผิดพลาดต่างๆ (**ป้องกันข้อมูลสูญหาย**)

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

### Events

กำหนด Events ที่ต้องการส่งข้อมูลไปยัง **[Server API](https://en.wikipedia.org/wiki/Web_API)** ที่กำหนดเอง

:::tip

หากไม่กำหนดหรือปิดรหัส `CONFIG.Custom.Events` (เช่น คอมเมนต์หรือไม่ใส่ตารางนี้ในไฟล์) ระบบจะถือว่าส่งทุกข้อมูลของทุกเหตุการณ์ไปยัง **Server API** โดยไม่มีการกรองใด ๆ ทั้งสิ้น

:::

```lua title="บรรทัดที่ 132"
CONFIG.Custom.Events = { -- [[ table ]]
    ['Login'] = true,                                       -- เข้าสู่เซิร์ฟเวอร์
    ['Logout'] = true,                                      -- ออกจากเซิร์ฟเวอร์
    ['Chat'] = true,                                        -- ข้อความแชท
    ['Dead'] = true,                                        -- สาเหตุการตาย
    --[[ azael_playpass ]]
    ['APP_ConnectionSpam'] = true,                          -- เชื่อมต่อบ่อยและเร็ว
    ['APP_PingExceeded'] = true,                            -- ปิงสูงเกินกำหนด
    ['APP_BannedHwidDetected'] = true,                      -- แบนเชื่อมต่อ-hwids
    ['APP_BannedIdDetected'] = true,                        -- แบนเชื่อมต่อ-ids
    ['APP_InactiveDetected'] = true,                        -- ไม่เข้าเซิร์ฟเกินกำหนด
    ['APP_BoundIdMismatch'] = true,                         -- บัญชีที่ผูกไม่ตรงกัน
    ['APP_PlayerDataStored'] = true,                        -- บันทึกข้อมูลผู้เล่น
    ['APP_PlayerDataDeleted'] = true,                       -- ลบข้อมูลผู้เล่น
    ['APP_IdentifierUpdated'] = true,                       -- เปลี่ยนตัวระบุผู้เล่น
    ['APP_BoundIdUpdated'] = true,                          -- อัปเดตการผูกบัญชี
    ['APP_PlayerBanned'] = true,                            -- ผู้เล่นถูกแบน
    ['APP_PlayerUnbanned'] = true,                          -- ยกเลิกแบนผู้เล่น
    ['APP_AirtimeUpdated'] = true,                          -- อัปเดตแอร์ไทม์
    ['APP_TempPointsExpired'] = true,                       -- คิวพอยท์หมดอายุ
    ['APP_AwardedLuckySlots'] = true,                       -- รางวัลลัคกี้สล็อต
    ['APP_ExecuteCommands'] = true,                         -- ประวัติใช้คำสั่ง
    --[[ azael_active-identifiers ]]
    ['ActiveIdentifiers'] = true,                           -- id-เดียวกัน
    ['IPRateLimits'] = true,                                -- ip-ถูกจำกัด
    --[[ azael_db-guardian ]]
    ['DB_ExecuteCommand'] = true,                           -- db-ประวัติใช้คำสั่ง
    ['DB_ServerBackups'] = true,                            -- db-สำรองข้อมูลเซิร์ฟ
    ['DB_DeletePlayerData'] = true,                         -- db-ลบข้อมูลผู้เล่น
}
```

:::info

```lua
['event'] = <boolean>
```

- `event` คือ ชื่อเหตุการณ์ที่ต้องการให้ระบบตรวจสอบและส่งข้อมูลไปยัง **Server API** ที่คุณกำหนดเอง (เช่น `Login`, `Logout`, `Chat`, `Dead` หรือเหตุการณ์อื่น ๆ ที่เพิ่มในตารางนี้)
- `<boolean>` คือ ค่าที่ใช้กำหนดว่าจะให้ส่งข้อมูลของเหตุการณ์นั้นไปยัง **Server API** หรือไม่
    - หากกำหนดเป็น `true` ระบบจะส่งข้อมูลของเหตุการณ์นี้ไปยัง **Server API** ตามที่ตั้งค่าไว้ใน `API.BaseURL`
    - หากกำหนดเป็น `false` หรือไม่กำหนด ระบบจะไม่ส่งข้อมูลของเหตุการณ์นี้ไปยัง **Server API**

:::


:::caution

- ไม่ต้องกำหนดค่าในส่วนนี้ หากคุณไม่ได้ใช้งานตัวเลือก **`CUSTOM`** ในการตั้งค่า **[Option.Type](./server.md#optiontype)**
- เหตุการณ์ **`Login`**, **`Logout`**, **`Chat`**, **`Dead`** คือค่าเริ่มต้นของทรัพยากร (เหตุการณ์มาจากรหัสภายในทรัพยากรนี้)

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

คำสั่ง บันทึกข้อมูลทั้งหมด ไปยังโฟลเดอร์ **`azael_data/azael_dc-serverlogs/logs`** ในรูปแบบไฟล์ **[JSON](https://www.wikidata.org/wiki/Q2063)**

```lua title="บรรทัดที่ 111"
CONFIG.Discord.Command.Save = 'logsave' -- [[ string ]]
```

:::info

ในกรณียังมีคิวส่งคำขออยู่ และผู้ดูแลต้องการ ปิดเซิร์ฟเวอร์ หรือ รีสตาร์ทเซิร์ฟเวอร์ ระบบจะบันทึกข้อมูลทั้งหมดไปยังโฟลเดอร์ **`azael_data/azael_dc-serverlogs/logs`**

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

เปิดใช้งาน บันทึกข้อมูลทั้งหมดไปยังโฟลเดอร์ **`azael_data/azael_dc-serverlogs/logs`** ในรูปแบบไฟล์ **[JSON](https://www.wikidata.org/wiki/Q2063)** สำหรับเหตุการณ์ **กำลังปิดเซิร์ฟเวอร์** โดย **[txAdmin](https://txadm.in/)** (**ป้องกันข้อมูลสูญหาย**)

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
- `new_event` หมายถึง ชื่อเหตุการณ์ใหม่ โดยอ้างอิงจาก ชื่อเหตุการณ์ ที่กำหนดใน **[CONFIG.Discord.Webhooks](./server.md#webhooks)**

:::

### Webhooks

กำหนด **[Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)** สำหรับ เหตุการณ์ ทั้งหมด

```lua title="บรรทัดที่ 163"
CONFIG.Discord.Webhooks = { -- [[ table ]]
    ['Login'] = 'webhook_url',                              -- เข้าสู่เซิร์ฟเวอร์
    ['Logout'] = 'webhook_url',                             -- ออกจากเซิร์ฟเวอร์
    ['Chat'] = 'webhook_url',                               -- ข้อความแชท
    ['Dead'] = 'webhook_url',                               -- สาเหตุการตาย
    --[[ azael_playpass ]]
    ['APP_ConnectionSpam'] = 'webhook_url',                 -- เชื่อมต่อบ่อยและเร็ว
    ['APP_PingExceeded'] = 'webhook_url',                   -- ปิงสูงเกินกำหนด
    ['APP_BannedHwidDetected'] = 'webhook_url',             -- แบนเชื่อมต่อ-hwids
    ['APP_BannedIdDetected'] = 'webhook_url',               -- แบนเชื่อมต่อ-ids
    ['APP_InactiveDetected'] = 'webhook_url',               -- ไม่เข้าเซิร์ฟเกินกำหนด
    ['APP_BoundIdMismatch'] = 'webhook_url',                -- บัญชีที่ผูกไม่ตรงกัน
    ['APP_PlayerDataStored'] = 'webhook_url',               -- บันทึกข้อมูลผู้เล่น
    ['APP_PlayerDataDeleted'] = 'webhook_url',              -- ลบข้อมูลผู้เล่น
    ['APP_IdentifierUpdated'] = 'webhook_url',              -- เปลี่ยนตัวระบุผู้เล่น
    ['APP_BoundIdUpdated'] = 'webhook_url',                 -- อัปเดตการผูกบัญชี
    ['APP_PlayerBanned'] = 'webhook_url',                   -- ผู้เล่นถูกแบน
    ['APP_PlayerUnbanned'] = 'webhook_url',                 -- ยกเลิกแบนผู้เล่น
    ['APP_AirtimeUpdated'] = 'webhook_url',                 -- อัปเดตแอร์ไทม์
    ['APP_TempPointsExpired'] = 'webhook_url',              -- คิวพอยท์หมดอายุ
    ['APP_AwardedLuckySlots'] = 'webhook_url',              -- รางวัลลัคกี้สล็อต
    ['APP_ExecuteCommands'] = 'webhook_url',                -- ประวัติใช้คำสั่ง
    --[[ azael_active-identifiers ]]
    ['ActiveIdentifiers'] = 'webhook_url',                  -- id-เดียวกัน
    ['IPRateLimits'] = 'webhook_url',                       -- ip-ถูกจำกัด
    --[[ azael_db-guardian ]]
    ['DB_ExecuteCommand'] = 'webhook_url',                  -- db-ประวัติใช้คำสั่ง
    ['DB_ServerBackups'] = 'webhook_url',                   -- db-สำรองข้อมูลเซิร์ฟ
    ['DB_DeletePlayerData'] = 'webhook_url',                -- db-ลบข้อมูลผู้เล่น
}
```

:::info

```lua
['event'] = 'webhook_url'
```

- `event` หมายถึง ชื่อเหตุการณ์ ที่กำหนดในรหัสส่งข้อมูลที่เพิ่มไปยังทรัพยากรอื่น<br/>
- `webhook_url` หมายถึง **[URL](https://en.wikipedia.org/wiki/URL)** สำหรับ **[Webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)** ที่คุณสร้างบนแอปพลิเคชัน **[Discord](https://discord.com/)** ภายในชุมชนของคุณ

:::


:::caution

- ไม่ต้องกำหนดค่าในส่วนนี้ หากคุณไม่ได้ใช้งานตัวเลือก **`DISCORD`** ในการตั้งค่า **[Option.Type](./server.md#optiontype)**
- เหตุการณ์ **`Login`**, **`Logout`**, **`Chat`**, **`Dead`** คือค่าเริ่มต้นของทรัพยากร (เหตุการณ์มาจากรหัสภายในทรัพยากรนี้)

:::

:::danger

- เเนะนำให้กำหนดค่า **1** เหตุการณ์ ต่อ **1** ช่อง ต่อ **1 [Webhook URL](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)** เพื่อป้องกันสถานะ **[429 (You are being rate limited)](https://discord.com/developers/docs/topics/opcodes-and-status-codes#http-http-response-codes)** เนื่องจากระบบคิวในการส่งออกคำขอไปยัง **[Discord API](https://discord.com/developers/docs/resources/webhook#create-webhook)** จะอ้างอิงจากชื่อเหตุการณ์ (**`event`**)

:::
