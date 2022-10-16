# server.config.lua

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

- `DISCORD` เท่ากับ ส่งคำขอไปยัง **[Discord API](https://discord.com/developers/docs/resources/webhook#create-webhook)** โดยใช้ **[Webhook URL](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)** (อ้างอิงจากกำหนดค่า **[Webhooks](./server#webhooks)**)<br/>
- `CUSTOM` เท่ากับ ส่งคำขอไปยัง **[Server API](https://en.wikipedia.org/wiki/Web_API)** ที่กำหนดเอง (อ้างอิงจากกำหนดค่า **[API.BaseURL](./server#apibaseurl)**)

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

เปิดใช้งาน แสดง **Hardware Tokens** ของผู้เล่นที่เหตุการณ์ **Login**

```lua title="บรรทัดที่ 21"
CONFIG.General.Crashes.Hardware = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Screenshot.Enable

เปิดใช้งาน บันทึกภาพหน้าจอ ของผู้เล่นตามเหตุการณ์ที่กำหนด

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
    ['Dead'] = 'webhook_url'           -- ฝากภาพ-สาเหตุการตาย
}
```

:::caution

เหตุการณ์ **Login** (**เข้าสู่เซิร์ฟเวอร์**) และ **Logout** (**ออกจากเซิร์ฟเวอร์**) ไม่สามารถใช้งานได้

:::

### Chat.Enable

เปิดใช้งาน ตรวจสอบข้อความที่ผู้เล่นดำเนินการ (**[chatMessage](https://docs.fivem.net/docs/resources/chat/events/chatMessage/)**)

```lua title="บรรทัดที่ 33"
CONFIG.General.Chat.Enable = false -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Chat.Remove.Enable

เปิดใช้งาน ลบข้อความ หากพบคําที่ไม่อนุญาต

```lua title="บรรทัดที่ 36"
CONFIG.General.Chat.Remove.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Chat.Kick.Enable

เปิดใช้งาน เตะผู้เล่นออกจากเซิร์ฟเวอร์ หากพบคําที่ไม่อนุญาต

```lua title="บรรทัดที่ 40"
CONFIG.General.Chat.Kick.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Chat.Kick.Reason

เหตุผลในการเตะผู้เล่นออกจากเซิร์ฟเวอร์ หากพบคําที่ไม่อนุญาต

```lua title="บรรทัดที่ 41"
CONFIG.General.Chat.Kick.Reason = 'ตรวจพบคำที่ไม่ได้รับอนุญาต (%s)' -- [[ string ]]
```

### Chat.Kick.Word

คำที่ไม่ได้รับอนุญาตให้ใช้งาน

```lua title="บรรทัดที่ 44"
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

```lua title="บรรทัดที่ 53"
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

## Custom (API)

ส่งคำขอไปยัง **[Server API](https://en.wikipedia.org/wiki/Web_API)** ที่กำหนดเองแบบเรียลไทม์

```lua title="บรรทัดที่ 67"
CONFIG.Custom = {} -- [[ table ]]
```

### API.BaseURL

**[Base URL](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)** ของ **[Server API](https://en.wikipedia.org/wiki/Web_API)** สำหรับ รับข้อมูลจากฟอร์มคำขอ (**[HTTP Requests](en.wikipedia.org/wiki/POST_(HTTP))**)

```lua title="บรรทัดที่ 69"
CONFIG.Custom.API.BaseURL = 'http://localhost/api/azael_logs/' -- [[ string ]]
```

:::info

ส่งคำขอโดยใช้ **[POST](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)** และ **API** จะต้องตอบกลับสถานะ `200`, `201` หรือ `204` หากดำเนินการสำเร็จ

:::

### API.Authorization.Method

**Method** สำหรับ **[Authorization](https://en.wikipedia.org/wiki/HTTP_authentication)** ที่ใช้งาน (จะถูกกำหนดภายใน **[HTTP Headers](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields)** ของคำขอ)

```lua title="บรรทัดที่ 72"
CONFIG.Custom.API.Authorization.Method = 'Log' -- [[ string ]]
```

:::note Example (Authorization Header)

```lua
local authorization = ('%s %s'):format(CONFIG.Custom.API.Authorization.Method, CONFIG.Custom.API.Authorization.Token)
```

:::

### API.Authorization.Token

**Token** สำหรับ **[Authorization](https://en.wikipedia.org/wiki/HTTP_authentication)** ที่ใช้งาน (จะถูกกำหนดภายใน **[HTTP Headers](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields)** ของคำขอ)

```lua title="บรรทัดที่ 73"
CONFIG.Custom.API.Authorization.Token = 'security_token' -- [[ string ]]
```

:::note Example (Authorization Header)

```lua
local authorization = ('%s %s'):format(CONFIG.Custom.API.Authorization.Method, CONFIG.Custom.API.Authorization.Token)
```

:::

## Discord (API)

ส่งคำขอไปยัง **[Discord API](https://discord.com/developers/docs/resources/webhook#create-webhook)** โดยใช้ **[Webhook URL](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)** ตามขีดจำกัดอัตราการใช้งาน **[Discord API](https://discord.com/developers/docs/resources/webhook#create-webhook)** สำหรับ **[Webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)**

```lua title="บรรทัดที่ 78"
CONFIG.Discord = {} -- [[ table ]]
```

### Rate.Limit

กำหนดการส่งคำขอไปยัง **[Discord API](https://discord.com/developers/docs/resources/webhook#create-webhook)** ภายใน **1** นาที ต่อ **1** ช่อง

```lua title="บรรทัดที่ 80"
CONFIG.Discord.Rate.Limit = 30 -- [[ number ]]
```

:::danger

**[Discord API](https://discord.com/developers/docs/resources/webhook#create-webhook)** สำหรับ **[Webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)** ขีดจำกัดอัตราการใช้งานในปัจจุบันอยู่ที่ **30** คำขอ ต่อ **1** นาที ต่อ **1** ช่อง หากเกินขีดจำกัดอัตราการใช้งาน อาจส่งผลให้ **[Discord API](https://discord.com/developers/docs/resources/webhook#create-webhook)** ปิดกั้นการใช้งาน **[ต่อเส้นทาง](https://discord.com/developers/docs/topics/rate-limits#rate-limits)** หรือ **[ทั่วโลก](https://discord.com/developers/docs/topics/rate-limits#global-rate-limit)** และ รหัสสถานะการตอบกลับ HTTP **[429 (You are being rate limited)](https://discord.com/developers/docs/topics/opcodes-and-status-codes#http-http-response-codes)** 

:::

### Avatar.URL

ที่อยู่รูปภาพอวทาร์ สำหรับ **[Webhooks](https://discord.com/developers/docs/resources/webhook#create-webhook-json-params)**

```lua title="บรรทัดที่ 84"
CONFIG.Discord.Avatar.URL = 'https://i.imgur.com/GxQpZzJ.png' -- [[ string ]]
```

### Command.Save

คำสั่ง บันทึกข้อมูลทั้งหมด ไปยังโฟลเดอร์ **`azael_data/azael_dc-serverlogs/logs`** ในรูปแบบไฟล์ **[JSON](https://www.wikidata.org/wiki/Q2063)**

```lua title="บรรทัดที่ 88"
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

```lua title="บรรทัดที่ 89"
CONFIG.Discord.Command.Queue = 'logsave' -- [[ string ]]
```

:::caution

คำสั่งนี้ไม่สามารถดำเนินการบนฝั่ง **[Client](https://en.wikipedia.org/wiki/Client-side)** ได้

:::

### txAdmin.Enable

เปิดใช้งาน บันทึกข้อมูลทั้งหมดไปยังโฟลเดอร์ **`azael_data/azael_dc-serverlogs/logs`** ในรูปแบบไฟล์ **[JSON](https://www.wikidata.org/wiki/Q2063)** สำหรับเหตุการณ์ **กำลังปิดเซิร์ฟเวอร์** โดย **[txAdmin](https://txadm.in/)** (**ป้องกันข้อมูลสูญหาย**)

```lua title="บรรทัดที่ 93"
CONFIG.Discord.txAdmin.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### txAdmin.Shutting.Event

ชื่อเหตุการณ์ กำลังปิดเซิร์ฟเวอร์ โดย ผู้ดูแลระบบ หรือ ตามกำหนดการรีสตาร์ท

```lua title="บรรทัดที่ 96"
CONFIG.Discord.Shutting.Event = 'txAdmin:events:serverShuttingDown' -- [[ string ]]
```

:::info

ค่าเริ่มต้นอยู่ที่ `5000` มิลลิวินาที ก่อนที่ **[txAdmin](https://txadm.in/)** จะฆ่ากระบวนการของเซิร์ฟเวอร์

:::

:::caution

รองรับ **[txAdmin](https://txadm.in/)** เวอร์ชัน **[4.15](https://github.com/tabarra/txAdmin/blob/master/docs/events.md#txadmineventsservershuttingdown-v415)** ขึ้นไป

:::

### Webhooks

กำหนด **[Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)** สำหรับ เหตุการณ์ ทั้งหมด

```lua title="บรรทัดที่ 101"
CONFIG.Discord.Webhooks = { -- [[ table ]]
    ['Login'] = 'webhook_url',                              -- เข้าสู่เซิร์ฟเวอร์
    ['Logout'] = 'webhook_url',                             -- ออกจากเซิร์ฟเวอร์
    ['Chat'] = 'webhook_url',                               -- ข้อความแชท
    ['Dead'] = 'webhook_url'                                -- สาเหตุการตาย
}
```

:::info 

```lua
CONFIG.Discord.Webhooks = {
    ['event'] = 'webhook_url'
}
```

- `event` หมายถึง ชื่อเหตุการณ์ ที่กำหนดในรหัสส่งข้อมูลที่เพิ่มไปยังทรัพยากรอื่น<br/>
- `webhook_url` หมายถึง **[URL](https://en.wikipedia.org/wiki/URL)** สำหรับ **[Webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)** ที่คุณสร้างภายในชุมชนบนแอปพลิเคชัน **[Discord](https://discord.com/)** ของคุณ
:::


:::caution

ไม่ต้องกำหนดค่าในส่วนนี้ หากคุณไม่ได้ใช้งานตัวเลือก **`DISCORD`** ในการตั้งค่า **[Option.Type](./server#optiontype)**

:::
