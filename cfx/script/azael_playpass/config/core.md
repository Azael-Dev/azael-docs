---
sidebar_label: Core
---

# Core

การกำหนดค่าหลักของทรัพยากรนี้

## locale

ภาษาที่ต้องการใช้งาน

```lua title="บรรทัดที่ 15"
locale = 'th'
```

- locale: `string`
    - เส้นทางไฟล์ `./locales/<langcode>.json`

## authMethod

ประเภทการตรวจสอบสิทธิ์การเชื่อมต่อที่ต้องการใช้งาน

```lua title="บรรทัดที่ 17"
authMethod = AUTH_METHOD.EXTERNAL_API
```

- authMethod: `integer`
    - AUTH_METHOD: ข้อมูลการกำหนดค่าเกี่ยวกับประเภทการตรวจสอบสิทธิ์การเชื่อมต่อ (ถูกกำหนดมาจากภายในสคริปต์)
        - DISABLE: ปิดใช้งานการตรวจสอบสิทธิ์การเชื่อมต่อ
        - DATABASE: การตรวจสอบสิทธิ์จากตัวระบุ (identifier) ในฐานข้อมูลของเซิร์ฟเวอร์ที่ตาราง azael_playpass คอลัมน์ identifier
        - EXTERNAL_API: การตรวจสอบสิทธิ์ผ่าน API ภายนอก เช่น Discord API หรือ Custom API โดยใช้ HTTP Request เพื่อร้องขอข้อมูล (กำหนดค่าที่ไฟล์ [`./config/external_api.lua`](./external_api.md))

## maintenanceMode

เปิดใช้งานโหมดปิดปรับปรุงเซิร์ฟเวอร์ โดยผู้เล่นที่ไม่มีสิทธิ์จะไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้

```lua title="บรรทัดที่ 22"
maintenanceMode = false
```

- maintenanceMode: `boolean`
    - กำหนดสิทธิ์ให้บทบาทที่อนุญาตได้ที่การกำหนค่า [permissions](./core.md#permissions) สำหรับ [skipRules](./core.md#skiprules) ประเภท `maintenance_mode`

## userProfileCard

เปิดใช้งานการแสดงโปรไฟล์ข้อมูลบัญชีของผู้เล่นเมื่อเชื่อมต่อ

```lua title="บรรทัดที่ 25"
userProfileCard = true
```

- userProfileCard: `boolean`
    - กำหนดค่าเพิ่มเติมที่ไฟล์ [`./config/profile.lua`](./profile.md) และปรับเเต่ง [Adaptive Cards](https://adaptivecards.io/) ได้ที่ `./modules/profile/templates`

## connectionQueue

เปิดใช้งานระบบคิวการเชื่อมต่อ

```lua title="บรรทัดที่ 28"
connectionQueue = true
```

- connectionQueue: `boolean`
    - กำหนดค่าเพิ่มเติมที่ไฟล์ [`./config/queue.lua`](./queue.md)

## identifierType

ตัวระบุของผู้เล่นที่ต้องการใช้งาน

```lua title="บรรทัดที่ 31"
identifierType = 'discord'
```

- identifierType: `string`
    - ประเภทตัวระบุที่รองรับ [steam](https://steampowered.com/), [discord](https://discord.com/), [license](https://www.rockstargames.com/), [license2](https://www.rockstargames.com/), [fivem](https://forum.cfx.re/)

:::warning

จำเป็นจะต้องกำหนดตัวระบุ [**discord**](https://discord.com/) หากคุณใช้งานการตรวจสอบสิทธิ์อนุญาตให้เข้าร่วมกับเซิร์ฟเวอร์โดย Discord API 

:::

## bindIdentifier

ผูกตัวระบุที่ต้องการเข้ากับตัวระบุที่กำหนดใน [`identifierType`](./core.md#identifiertype) เพื่อป้องกันการใช้บัญชีซ้ำหรือแจกจ่ายสิทธิ์ในการเชื่อมต่อกับเซิร์ฟเวอร์

```lua title="บรรทัดที่ 34"
bindIdentifier = {
    enable = true,
    type = 'steam'
}
```

- enable: `boolean`
    - เปิดใช้งานการผูกตัวระบุ (แนะนำให้เปิดใช้งานเพื่อป้องกันการแจกจ่ายสิทธิ์เชื่อมต่อกับเซิร์ฟเวอร์)
- type: `string`
    - ประเภทของตัวระบุที่ใช้ในการผูกบัญชี
        - ประเภทตัวระบุที่รองรับ [steam](https://steampowered.com/), [discord](https://discord.com/), [license](https://www.rockstargames.com/), [license2](https://www.rockstargames.com/), [fivem](https://forum.cfx.re/)

:::danger

โปรดหลีกเลี่ยงการใช้งานประเภทตัวระบุเดียวกันกับที่กำหนดใน [`identifierType`](./core.md#identifiertype) เพราะอาจเกิดข้อผิดพลาดได้

:::

## maxPingLimit

กำหนดค่า [Ping](https://en.wikipedia.org/wiki/Ping_(networking_utility)) สูงสุดที่อนุญาตให้ผู้เล่นเชื่อมต่อกับเซิร์ฟเวอร์

```lua title="บรรทัดที่ 39"
maxPingLimit = 500
```

- maxPingLimit: `integer`

## connectionAttemptLimit

ป้องกันการเชื่อมต่อบ่อยและเร็วเกินกำหนด

```lua title="บรรทัดที่ 41"
connectionAttemptLimit = {
    enable = true,
    maxAttempts = 3,
    cooldownTime = 10,
    blockDuration = 300
}
```

- enable: `boolean`
    - เปิดใช้งานป้องกันการเชื่อมต่อบ่อยและเร็วเกินกำหนด
- maxAttempts: `integer`
    - จำนวนครั้งที่ผู้เล่นพยายามเชื่อมต่อสูงสุดที่อนุญาตก่อนที่จะถูกบล็อกชั่วคราว
- cooldownTime: `integer`
    - ระยะเวลาคูลดาวน์ที่ต้องรอก่อนที่จะสามารถเชื่อมต่อใหม่ได้ (หน่วยเป็น **วินาที**)
- blockDuration: `integer`
    - ระยะเวลาที่ผู้เล่นจะถูกบล็อกหลังจากพยายามเชื่อมต่อเกินจำนวนที่อนุญาต (หน่วยเป็น **วินาที**)

## banPlayerHwids

การแบน HWIDs ของผู้เล่น ([Player Tokens](https://docs.fivem.net/natives/?_0x54C06897))

```lua title="บรรทัดที่ 48"
banPlayerHwids = {
    enable = true,
    strict = true,
    matches = 2
}
```

- enable: `boolean`
    - เปิดใช้งานระบบแบน HWIDs ผู้เล่น ([Player Tokens](https://docs.fivem.net/natives/?_0x54C06897))
- strict: `boolean`
    - เปิดใช้งานการจับคู่ HWID แบบเข้มงวด เมื่อตรวจพบ HWID ที่ถูกแบนตั้งเเต่ 2 Tokens ขึ้นไป และ Tokens ที่ตรวจพบจะต้องมาจากผู้เล่นเดียวกัน
- matches: `integer`
    - จำนวนการจับคู่ HWID ที่ต้องตรงกับ HWID ที่ถูกแบน หากจับคู่ครบตามจำนวนจะถือว่าผู้เล่นถูกแบน
        - ผู้เล่นส่วนใหญ่จะมี [HWID Tokens](https://docs.fivem.net/natives/?_0x54C06897) ประมาณ 3 ถึง 6 รายการ

:::warning

[HWID Tokens](https://docs.fivem.net/natives/?_0x54C06897) อาจไม่ถูกต้อง 100% ซึ่งอาจทำให้ Tokens จากผู้เล่นสองคนตรงกันโดยไม่เกี่ยวข้องกัน จึงแนะนำให้กำหนด matches เป็น 2 หรือ 3 เพื่อป้องกันการแบนผิดพลาด

:::

## autoBanAssociated

โหมดการแบนผู้เล่นที่เกี่ยวข้องกับผู้เล่นที่ถูกแบน จะทำการแบนอัตโนมัติเมื่อพบข้อมูลที่ตรงกับผู้เล่นที่ถูกแบนในฐานข้อมูลของเซิร์ฟเวอร์

```lua title="บรรทัดที่ 55"
autoBanAssociated = {
    boundId = true,
    hwids = true
}
```

- boundId: `boolean`
    - เปิดใช้งานการตรวจสอบ [Bound Id](./core.md#bindidentifier) สำหรับการแบนผู้เล่นอัตโนมัติเมื่อพบข้อมูลที่ตรงกับผู้เล่นที่ถูกแบน
        - ⚠️ ไม่ทำงานหากปิดใช้งาน [`bindIdentifier`](./core.md#bindidentifier)
- hwids: `boolean`
    - เปิดใช้งานการตรวจสอบ [HWID Tokens](./core.md#banplayerhwids) สำหรับการแบนผู้เล่นอัตโนมัติเมื่อพบข้อมูลที่ตรงกับผู้เล่นที่ถูกแบน
        - ⚠️ ไม่ทำงานหากปิดใช้งาน [`banPlayerHwids`](./core.md#banplayerhwids)

## inactivePlayers

กำหนดค่าการตรวจสอบผู้เล่นที่ไม่ได้เข้าร่วมเซิร์ฟเวอร์ตามระยะเวลาที่กำหนด ผู้เล่นจะถูกระงับการใช้งานเมื่อครบระยะเวลาที่กำหนด

```lua title="บรรทัดที่ 60"
inactivePlayers = {
    enable = true,
    limitDays = 14
}
```

- enable: `boolean`
    - เปิดใช้งานการตรวจสอบผู้เล่นที่ไม่ได้เข้าร่วมเซิร์ฟเวอร์นานเกินวันที่กำหนด
- limitDays: `integer`
    - จำนวนวันที่ผู้เล่นไม่ได้เข้าร่วมเซิร์ฟเวอร์ก่อนที่จะถูกระงับ (หน่วยเป็น **วัน**)

## airTimeServer

ระบบจำกัดเวลาในการเล่น โดยผู้เล่นจะต้องเติม Airtime เพื่อเพิ่มเวลาในการเล่น

```lua title="บรรทัดที่ 65"
airTimeServer = {
    enable = false, 
    addTime = 86400 * 7,
    kickTimeout = true 
}
```

- enable: `boolean`
    - เปิดใช้งานระบบแอร์ไทม์เซิฟเวอร์
- addTime: `integer`
    -  จำนวนเวลาที่จะเพิ่มให้กับผู้เล่นเมื่อเชื่อมต่อกับเซิร์ฟเวอร์ครั้งแรก (หน่วยเป็น **วินาที** และค่าเริ่มต้นคือ **7 วัน**)
- kickTimeout: `boolean`
    - เปิดใช้งานเตะผู้เล่นออกจากเซิร์ฟเวอร์หากหมดเวลาเล่น


## newPlayerLabel

ป้ายกำกับผู้เล่นใหม่ โดยจะแสดงข้อความบนส่วนหัวของผู้เล่น

```lua title="บรรทัดที่ 71"
newPlayerLabel = { 
    enable = true,
    durationDays = 7
}
```

- enable: `boolean`
    - เปิดใช้งานป้ายกำกับผู้เล่นใหม่
- durationDays: `integer`
    - ระยะเวลาที่ผู้เล่นจะถูกนับเป็นผู้เล่นใหม่นับตั้งแต่เข้าร่วมเซิร์ฟเวอร์ครั้งแรก (หน่วยเป็น **วัน**)

:::tip

คุณสามารถแก้ไขรหัสได้ที่ไฟล์ `./modules/player/client.lua` ฟังก์ชัน `Player.initNewbieLabel`

:::

## communityLink

ลิงก์ของชุมชนจะถูกแสดงให้ผู้เล่นทราบเมื่อไม่มีสิทธิ์เข้าร่วมเซิร์ฟเวอร์หรือเกิดปัญหาอื่นๆ

```lua title="บรรทัดที่ 76"
communityLink = {
    enable = true,
    mainUrl = 'https://example.com',
    registerUrl = 'https://example.com/register',
    supportUrl = 'https://example.com/support'
}
```

- enable: `boolean`
    - เปิดใช้งานแสดงลิงก์ของชุมชน
- mainUrl: `string`
    - [URL](https://en.wikipedia.org/wiki/URL) หลักของเว็บไซต์หรือชุมชน
- registerUrl: `string`
    - [URL](https://en.wikipedia.org/wiki/URL) สำหรับลงทะเบียนหากผู้เล่นไม่มีสิทธิ์เข้าร่วมเซิร์ฟเวอร์
- supportUrl: `string`
    - [URL](https://en.wikipedia.org/wiki/URL) สำหรับติดต่อฝ่ายสนับสนุนหากพบปัญหาในการเชื่อมต่อกับเซิร์ฟเวอร์

## resourceBlocks

บล็อกทรัพยากรที่ส่งผลต่อการทำงาน เช่น การควบคุมระบบคิว หรือ การตรวจสอบสิทธิ์การเชื่อมต่อกับเซิร์ฟเวอร์

```lua title="บรรทัดที่ 83"
resourceBlocks = {
    'azael_dc-whitelisted',
    'hardcap'
}
```

- `string`: ชื่อทรัพยากรที่ต้องการบล็อก
    - [azael_dc-whitelisted](https://github.com/Azael-Dev/azael-fivem-docs/tree/master/content/docs/azael_dc-whitelisted) ทรัพยากรนี้ในเวอร์ชันเก่า (**ล้าสมัย**)
    - [hardcap](https://github.com/citizenfx/cfx-server-data/tree/master/resources/%5Bsystem%5D/hardcap) ทรัพยากรเกี่ยวกับระบบคิวเชื่อมต่อกับเซิร์ฟเวอร์

## permissions

กำหนดสิทธิ์ในการเข้าถึงและการข้ามข้อจำกัดต่างๆ

```lua title="บรรทัดที่ 88"
permissions = {
    skipRules = { ... }
}
```

- skipRules: `table`
    - กำหนดสิทธิ์ที่อนุญาตให้ผู้เล่นข้ามการตรวจสอบและข้อจำกัดตามบทบาท

### skipRules

กำหนดสิทธิ์ที่อนุญาตให้ผู้เล่นข้ามการตรวจสอบและข้อจำกัดตามบทบาท

```lua title="บรรทัดที่ 89"
skipRules = {
    ['full_queue_limit'] = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    },
    ['conn_attempt_limit'] = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    },
    ['max_ping_limit'] = {
        PLAYER_ROLES.VIP,
        PLAYER_ROLES.STAFF,
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    },
    ['ban_hwids'] = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    },
    ['ban_identifiers'] = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    },
    ['inactive_players'] = {
        PLAYER_ROLES.VIP,
        PLAYER_ROLES.STAFF,
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    },
    ['airtime_server'] = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    },
    ['bind_identifier'] = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    },
    ['maintenance_mode'] = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```

- `string`: `table<{ [integer], [integer] }>`
    - รายการสิทธิ์ที่อนุญาตให้ผู้เล่นข้ามการตรวจสอบและข้อจำกัดตามบทบาท
        - `full_queue_limit`: สามารถเข้าร่วมคิวได้หากจำนวนผู้เล่นในคิวเต็ม
        - `conn_attempt_limit`: สามารถเชื่อมต่อได้หากพยายามเชื่อมต่อบ่อยหรือเร็วเกินกำหนด
        - `max_ping_limit`: สามารถเชื่อมต่อได้หากค่า Ping สูงเกินกำหนด
        - `ban_hwids`: สามารถเชื่อมต่อได้หากถูกแบน HWID Tokens
        - `ban_identifiers`: สามารถเชื่อมต่อได้หากถูกแบน Identifiers
        - `inactive_players`: สามารถเชื่อมต่อได้หากไม่ได้เชื่อมต่อมานานเกินกำหนด
        - `airtime_server`: สามารถเชื่อมต่อได้หากไม่มีเวลาในการเล่น (ระบบ Airtime จำกัดเวลาในการเล่น)
        - `bind_identifier`: สามารถเชื่อมต่อได้หากใช้ตัวระบุที่ไม่ตรงกับตัวระบุที่ผูกไว้ในฐานข้อมูล
        - `maintenance_mode`: สามารถเชื่อมต่อได้หากเซิร์ฟเวอร์อยู่ในโหมดปิดปรับปรุงเซิร์ฟเวอร์ (โหมดบำรุงรักษา)

:::tip

ตัวแปร [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดนอ้างอิงการกำหนดค่าที่ไฟล์ [`./config/setup.lua`](./setup.md)

:::
