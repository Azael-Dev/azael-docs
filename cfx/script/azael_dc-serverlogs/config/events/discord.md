---
sidebar_label: Discord
---

# discord.config

ไฟล์การกำหนดค่าของทรัพยากรทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)**

## Discord Events

กำหนด Events ที่ต้องการส่งข้อมูลไปยัง [**Webhooks**](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) ([**Discord API**](../../config/server.md#discord-api))

```lua title="บรรทัดที่ 11"
CONFIG.Discord.Events = { -- [[ table ]]
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

- ไม่ต้องกำหนดค่าในส่วนนี้ หากคุณไม่ได้ใช้งานตัวเลือก **`DISCORD`** ในการตั้งค่า **[Option.Type](../../config/server.md#optiontype)**
- เหตุการณ์ **`Login`**, **`Logout`**, **`Chat`**, **`Dead`** คือค่าเริ่มต้นของทรัพยากร (เหตุการณ์มาจากรหัสภายในทรัพยากรนี้)

:::

:::danger

- เเนะนำให้กำหนดค่า **1** เหตุการณ์ ต่อ **1** ช่อง ต่อ **1 [Webhook URL](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)** เพื่อป้องกันสถานะ **[429 (You are being rate limited)](https://discord.com/developers/docs/topics/opcodes-and-status-codes#http-http-response-codes)** เนื่องจากระบบคิวในการส่งออกคำขอไปยัง **[Discord API](https://discord.com/developers/docs/resources/webhook#create-webhook)** จะอ้างอิงจากชื่อเหตุการณ์ (**`event`**)

:::
