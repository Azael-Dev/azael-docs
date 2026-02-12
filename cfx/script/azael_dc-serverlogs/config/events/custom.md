---
sidebar_label: Custom
---

# custom.config

ไฟล์การกำหนดค่าของทรัพยากรทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)**

## Custom Events

กำหนด Events ที่ต้องการส่งข้อมูลไปยัง **[Server API](https://en.wikipedia.org/wiki/Web_API)** ที่กำหนดเอง ([**Custom API**](../../config/server.md#custom-api))

```lua title="บรรทัดที่ 11"
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
    --[[ azael_connshield ]]
    ['CNS_DuplicateIdKick'] = true,                         -- เชื่อมต่อ-ตัวระบุซ้ำ
    ['CNS_IpLimitExceeded'] = true,                         -- เกินขีดจำกัด-ip
    ['CNS_IpReputationBlocked'] = true,                     -- บล็อกที่อยู่-ip
    ['CNS_BypassRules'] = true,                             -- เชื่อมต่อ-ข้ามกฎ
    ['CNS_CommandExecuted'] = true,                         -- ประวัติใช้คำสั่ง
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

- ไม่ต้องกำหนดค่าในส่วนนี้ หากคุณไม่ได้ใช้งานตัวเลือก **`CUSTOM`** ในการตั้งค่า **[Option.Type](../../config/server.md#optiontype)**
- เหตุการณ์ **`Login`**, **`Logout`**, **`Chat`**, **`Dead`** คือค่าเริ่มต้นของทรัพยากร (เหตุการณ์มาจากรหัสภายในทรัพยากรนี้)

:::

:::tip

หากไม่กำหนดหรือปิดรหัส `CONFIG.Custom.Events` (เช่น คอมเมนต์หรือไม่ใส่ตารางนี้ในไฟล์) ระบบจะถือว่าส่งทุกข้อมูลของทุกเหตุการณ์ไปยัง **Server API** โดยไม่มีการกรองใด ๆ ทั้งสิ้น

:::
