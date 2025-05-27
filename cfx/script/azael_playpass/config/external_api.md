---
sidebar_label: External API
---

# External API

การกำหนดค่าเกี่ยวกับการตรวจสอบสิทธิ์ของผู้เล่นจาก API ภายนอก

## activeAPI

ประเภทตัวเลือกการตรวจสอบสิทธิ์จาก API ภายนอกที่ต้องการใช้งาน

```lua title="บรรทัดที่ 14"
activeAPI = ACTIVE_API.DISCORD
```

- activeAPI: `integer`
    - ACTIVE_API: ข้อมูลการกำหนดค่าเกี่ยวกับประเภทตัวเลือกการตรวจสอบสิทธิ์จาก API ภายนอก (ถูกกำหนดมาจากภายในสคริปต์)
        - DISCORD: อ้างอิงสิทธิ์การเชื่อมต่อจากบทบาท (ยศ) ที่กำหนด
            - ⚠️ หากใช้งานจะต้องกำหนดค่า [`identifierType`](./core.md#identifiertype) เป็น `discord` ที่ไฟล์ [`./config/core.lua`](./core.md)
        - CUSTOM: อ้างอิงสิทธิ์การเชื่อมต่อจาก API ที่กำหนดเอง

## discord

การกำหนดค่า [Discord API](https://discord.com/developers/docs/reference)

### baseUrl

กำหนด [Base URL](https://discord.com/developers/docs/reference#api-reference-base-url) สำหรับการเชื่อมต่อกับ [Discord API](https://discord.com/developers/docs/reference)

```lua title="บรรทัดที่ 19"
baseUrl = 'https://discord.com/api'
```

- baseUrl: `string`

### version

กำหนดเวอร์ชัน [Discord API](https://discord.com/developers/docs/reference#api-versioning) ที่ต้องการใช้งาน

```lua title="บรรทัดที่ 20"
version = 10
```

- version: `integer`

### botToken

[Bot Token](https://discord.com/developers/docs/discord-social-sdk/development-guides/using-with-discord-apis#authentication-types) ใช้สำหรับยืนยันตัวตนของบอท เพื่อให้สามารถเข้าถึง [Discord API](https://discord.com/developers/docs/reference) ได้

```lua title="บรรทัดที่ 21"
botToken = GetConvar('discord_botToken', '')
```

- botToken: `string`

> #### บทช่วยสอนและคำแนะนำ
>- [**สร้างแอปพลิเคชันและบอท**](../tutorials.md#สร้างแอปพลิเคชันและบอท)
>- [**เพิ่มบอทไปยังเซิร์ฟเวอร์**](../tutorials.md#เพิ่มบอทไปยังเซิร์ฟเวอร์)
>- [**รับโทเค็นของบอท**](../tutorials.md#รับโทเค็นของบอท)

:::tip

การกำหนดค่าเริ่มต้นจะรับ Bot Token มาจาก `discord_botToken` ที่กำหนดไว้ภายในไฟล์ [`server.cfg`](https://docs.fivem.net/docs/server-manual/setting-up-a-server-vanilla/#servercfg)

```diff title="server.cfg"
set discord_botToken "your_bot_token"
```

:::

### guildId

Guild ID ที่ต้องการเข้าถึงข้อมูลสมาชิก

```lua title="บรรทัดที่ 22"
guildId = GetConvar('discord_guildId', '')
```

- guildId: `string`

> #### บทช่วยสอนและคำแนะนำ
>- [**รับ ID ของเซิร์ฟเวอร์ (Guild ID)**](../tutorials.md#รับ-id-ของเซิร์ฟเวอร์-guild-id)

:::tip

การกำหนดค่าเริ่มต้นจะรับ Guild ID มาจาก `discord_guildId` ที่กำหนดไว้ภายในไฟล์ [`server.cfg`](https://docs.fivem.net/docs/server-manual/setting-up-a-server-vanilla/#servercfg)

```diff title="server.cfg"
set discord_guildId "your_guild_id"
```

:::

### allowedRoleIds

รายการ [Role ID](https://discord.com/developers/docs/topics/permissions#role-object) ที่ได้รับอนุญาตให้เข้าร่วมเซิร์ฟเวอร์ (รหัสของบทบาท/ยศ)

```lua title="บรรทัดที่ 23"
allowedRoleIds = {
    'XXXXXXXXXXXXXXXXXX',
    'XXXXXXXXXXXXXXXXXX'
}
```

- `string`: รหัสของบทบาท/ยศที่ได้รับอนุญาตให้เข้าร่วมเซิร์ฟเวอร์

> #### บทช่วยสอนและคำแนะนำ
>- [**รับ ID ของบทบาท (Role ID)**](../tutorials.md#รับ-id-ของบทบาท-role-id)

### guildBanCheck

เปิดใช้งานตรวจสอบสถานะการถูกแบนจาก Guild บน Discord เมื่อผู้เล่นเชื่อมต่อ

```lua title="บรรทัดที่ 27"
guildBanCheck = true
```

- guildBanCheck: `boolean`

:::warning

Bot จะต้องมีสิทธิ์ [`BAN_MEMBERS`](https://discord.com/developers/docs/resources/guild#get-guild-ban) เพื่อเข้าถึงข้อมูลการแบนสมาชิกภายใน Guild บน Discord

:::

### requestLimits

กำหนดค่าการจำกัดจำนวนคำขอสำหรับ [Discord API](https://discord.com/developers/docs/reference)

```lua title="บรรทัดที่ 29"
requestLimits = {
    enable = true,
    rate = 5,
    per = 1
}
```

- enable: `boolean`
    - เปิดใช้งานการจำกัดจำนวนคำขอ
- rate: `integer`
    - จำนวนคำขอสูงสุดที่อนุญาตภายในระยะเวลาที่กำหนด
- per: `integer`
    - ระยะเวลาที่ต้องรอก่อนที่จะรีเซ็ตจำนวนคำขอใหม่ (หน่วยเป็น **วินาที**)

:::danger

จำเป็นที่จะต้องเปิดใช้งานเพื่อป้องกันรหัสสถานะ [HTTP 429 Too Many Requests](https://discord.com/developers/docs/topics/rate-limits)

:::

### useDbAuthOnFail

ใช้การตรวจสอบสิทธิ์จากฐานข้อมูลแทน หากเกิดข้อผิดพลาดในการตรวจสอบสิทธิ์จาก [Discord API](https://discord.com/developers/docs/reference)

```lua title="บรรทัดที่ 29"
useDbAuthOnFail = {
    enable = true,
    disallowStatusCodes = {
        [400] = true,
        [401] = true,
        [403] = true,
        [405] = true
    }
}
```

- enable: `boolean`
    - เปิดใช้งานการตรวจสอบสิทธิ์จากฐานข้อมูลแทนเมื่อเกิดข้อผิดพลาด
- disallowStatusCodes: `table<{ [integer]: boolean }>`
    - รายการรหัสสถานะ HTTP ที่ยกเว้นการตรวจสอบสิทธิ์จากฐานข้อมูล หากเกิดข้อผิดพลาดในการตรวจสอบสิทธิ์จาก [Discord API](https://discord.com/developers/docs/reference)
        - 400 (BAD REQUEST): คำขอมีรูปแบบไม่ถูกต้อง หรือเซิร์ฟเวอร์ไม่สามารถเข้าใจคำขอได้
        - 401 (UNAUTHORIZED): ไม่มีส่วนหัว Authorization หรือส่วนหัวที่ให้มาไม่ถูกต้อง
        - 403 (FORBIDDEN): โทเค็น Authorization ที่ส่งมาไม่มีสิทธิ์เข้าถึงทรัพยากรที่ร้องขอ
        - 405 (METHOD NOT ALLOWED): วิธีการร้องขอ (HTTP Method) ที่ใช้ไม่ถูกต้องสำหรับตำแหน่งที่ระบุ

:::info

อ้างอิงสิทธิ์การเชื่อมต่อกับเซิร์ฟเวอร์จากตัวระบุในฐานข้อมูลที่ตาราง `azael_playpass` คอลัมน์ `identifier` หากเกิดข้อผิดพลาดในการตรวจสอบสิทธิ์จาก [Discord API](https://discord.com/developers/docs/reference)

:::

## custom

การกำหนดค่า Custom API

:::tip

วิธีการร้องขอ HTTP เริ่มต้นคือ `GET` คุณสามารถแก้ไขรหัสได้ที่ [`./modules/external-api/server.lua`](../modules/external-api/server.md)

:::

### baseUrl

กำหนด Base URL สำหรับการเชื่อมต่อกับ Custom API โดยใช้ Identifier อ้างอิงสิทธิ์การเชื่อมต่อกับเซิร์ฟเวอร์

```lua title="บรรทัดที่ 46"
baseUrl = 'https://example.com/api/players'
```

- baseUrl: `string`

:::info

ตัวระบุอ้างอิงจากการกำหนดค่า [`identifierType`](./core.md#identifiertype) ที่ไฟล์ [./config/core.lua](./core.md)

:::

### authorization

การกำหนดค่าการตรวจสอบสิทธิ์สำหรับการเข้าถึง Custom API

```lua title="บรรทัดที่ 47"
authorization = 'Bearer <your_bearer_token>'
```

- authorization: `string`

### requestLimits

กำหนดค่าการจำกัดจำนวนคำขอสำหรับ Custom API

```lua title="บรรทัดที่ 48"
requestLimits = {
    enable = true,
    rate = 5,
    per = 1
}
```

- enable: `boolean`
    - เปิดใช้งานการจำกัดจำนวนคำขอ
- rate: `integer`
    - จำนวนคำขอสูงสุดที่อนุญาตภายในระยะเวลาที่กำหนด
- per: `integer`
    - ระยะเวลาที่ต้องรอก่อนที่จะรีเซ็ตจำนวนคำขอใหม่ (หน่วยเป็น **วินาที**)

### useDbAuthOnFail

ใช้การตรวจสอบสิทธิ์จากฐานข้อมูลแทน หากเกิดข้อผิดพลาดในการตรวจสอบสิทธิ์จาก Custom API 

```lua title="บรรทัดที่ 53"
useDbAuthOnFail = {
    enable = true,
    disallowStatusCodes = {
        [400] = true,
        [401] = true,
        [403] = true,
        [405] = true
    }
}
```

- enable: `boolean`
    - เปิดใช้งานการตรวจสอบสิทธิ์จากฐานข้อมูลแทนเมื่อเกิดข้อผิดพลาด
- disallowStatusCodes: `table<{ [integer]: boolean }>`
    - รายการรหัสสถานะ HTTP ที่ยกเว้นการตรวจสอบสิทธิ์จากฐานข้อมูล หากเกิดข้อผิดพลาดในการตรวจสอบสิทธิ์จาก Custom API
        - 400 (BAD REQUEST): คำขอมีรูปแบบไม่ถูกต้อง หรือเซิร์ฟเวอร์ไม่สามารถเข้าใจคำขอได้
        - 401 (UNAUTHORIZED): ไม่มีส่วนหัว Authorization หรือส่วนหัวที่ให้มาไม่ถูกต้อง
        - 403 (FORBIDDEN): โทเค็น Authorization ที่ส่งมาไม่มีสิทธิ์เข้าถึงทรัพยากรที่ร้องขอ
        - 405 (METHOD NOT ALLOWED): วิธีการร้องขอ (HTTP Method) ที่ใช้ไม่ถูกต้องสำหรับตำแหน่งที่ระบุ

:::info

อ้างอิงสิทธิ์การเชื่อมต่อกับเซิร์ฟเวอร์จากตัวระบุในฐานข้อมูลที่ตาราง `azael_playpass` คอลัมน์ `identifier` หากเกิดข้อผิดพลาดในการตรวจสอบสิทธิ์จาก Custom API

:::
