---
sidebar_label: Server
---

# Logger (Server-side)

## Logger

### onPlayerConnectionSpam

ทำงานเมื่อผู้เล่น[เชื่อมต่อบ่อยและเร็วเกินกำหนด](../../config/core.md#connectionattemptlimit)

```lua title="บรรทัดที่ 16"
function Logger.onPlayerConnectionSpam(payload)
    local isBlocked <const> = payload.data.isBlocked
    
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'APP_ConnectionSpam',
            content = '### ผู้เล่นพยายามเชื่อมต่อบ่อยและเร็วเกินกำหนด',
            fields = {
                { name = 'IDENTIFIER', value = ('```%s```'):format(payload.player.identifier), inline = false },
                { name = 'ACTIONS', value = ('```%s```'):format(isBlocked and '🚫 ➔ Blocked' or '⏳ ➔ Cooldown'), inline = true },
                { name = 'ATTEMPTS', value = ('```%s```'):format(payload.data.attempts), inline = true },
                { name = 'LAST ATTEMPTS', value = ('```%s```'):format(os.date('%Y-%m-%d %H:%M:%S', payload.data.lastAttempt)), inline = false }
            },
            source = 0,
            color = (isBlocked and 1 or 3),
            options = {
                codeblock = false
            }
        })
    end)
end
```

#### Parameters

- payload: `table<{ player: table, data: table }>`
    - ตารางข้อมูล
        - player: `table<{ [key]: any }>`
            - ข้อมูลของผู้เล่นเมื่อเชื่อมต่อ
                - tempId: `integer`
                    - [Temp ID](https://docs.fivem.net/docs/scripting-reference/events/list/playerconnecting/#parameters) ของผู้เล่น 
                - identifier: `string`
                    - [ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
                - bindId: `string` | `nil`
                    - [ตัวระบุที่ผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
        - data: `table<{ [key]: any }>`
            - ข้อมูลการเชื่อมต่อบ่อยและเร็วเกินกำหนด
                - attempts: `integer`
                    - จำนวนครั้งที่พยายาม
                - lastAttempt: `integer`
                    - พยายามครั้งสุดท้ายเวลา ([Unix time](https://en.wikipedia.org/wiki/Unix_time))
                - isBlocked: `boolean`
                    - ค่าเป็น `true` หากถูกบล็อคแล้ว
                - reason: `string`
                    - เหตุผลที่ปฏิเสธการเชื่อมต่อ

### onPlayerPingExceeded

ทำงานเมื่อ[การตอบสนองของเครือข่ายผู้เล่นช้าเกินกำหนด](../../config/core.md#maxpinglimit)

```lua title="บรรทัดที่ 41"
function Logger.onPlayerPingExceeded(payload)
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'APP_PingExceeded',
            content = '### การตอบสนองของเครือข่ายผู้เล่นช้าเกินกำหนด',
            fields = {
                { name = 'IDENTIFIER', value = ('```%s```'):format(payload.player.identifier), inline = false },
                { name = 'PLAYER PING', value = ('```📶 ➔ %d ms```'):format(payload.player.ping), inline = false }
            },
            source = 0,
            color = 1,
            options = {
                codeblock = false
            }
        })
    end)
end
```

#### Parameters

- payload: `table<{ player: table }>`
    - ตารางข้อมูล
        - player: `table<{ [key]: any }>`
            - ข้อมูลของผู้เล่นเมื่อเชื่อมต่อ
                - tempId: `integer`
                    - [Temp ID](https://docs.fivem.net/docs/scripting-reference/events/list/playerconnecting/#parameters) ของผู้เล่น 
                - identifier: `string`
                    - [ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
                - bindId: `string` | `nil`
                    - [ตัวระบุที่ผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
                - ping: `integer`
                    - ค่า Ping ของผู้เล่น

### onBannedHwidDetected

ทำงานเมื่อผู้เล่นเชื่อมต่อและ[ตรวจพบ HWIDs ของผู้เล่นอื่นที่ถูกแบน](../../config/core.md#banplayerhwids)

```lua title="บรรทัดที่ 85"
function Logger.onBannedHwidDetected(payload)
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'APP_BannedHwidDetected',
            content = '### ตรวจพบการเชื่อมต่อจาก HWID Tokens ที่เกี่ยวข้องกับผู้เล่นที่ถูกแบน',
            fields = {
                { name = 'IDENTIFIER', value = ('```%s```'):format(payload.player.identifier), inline = false },
                { name = 'MATCHED HWIDs', value = ('```%s```'):format(json.encode(payload.data.matchedHwids, { indent = true })), inline = false },
                { name = 'BAN REFERENCE ID', value = ('```%s```'):format(payload.data.banId), inline = false },
                { name = 'BANNED IDENTIFIER', value = ('```%s```'):format(payload.data.identifier), inline = false },
                { name = 'BANNED DETAILS', value = ('```%s```'):format(json.encode(payload.data.banDetails, { indent = true })), inline = false }
            },
            source = 0,
            color = payload.data.banDetails?.type == 'temporary' and 3 or 1,
            options = {
                codeblock = false
            }
        })
    end)
end
```

#### Parameters

- payload: `table<{ player: table, data: table }>`
    - ตารางข้อมูล
        - player: `table<{ [key]: any }>`
            - ข้อมูลของผู้เล่นเมื่อเชื่อมต่อ
                - tempId: `integer`
                    - [Temp ID](https://docs.fivem.net/docs/scripting-reference/events/list/playerconnecting/#parameters) ของผู้เล่น 
                - identifier: `string`
                    - [ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
                - bindId: `string` | `nil`
                    - [ตัวระบุที่ผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
                - hwids: `table<{ [index]: string }>`
                    - ข้อมูล HWIDs ของผู้เล่นที่พบเมื่อเชื่อมต่อ
        - data: `table<{ [key]: any }>`
            - ข้อมูลของผู้เล่นที่ถูกแบน
                - matchedHwids: `table<{ [index]: string }>`
                    - ข้อมูล HWIDs ที่ตรงกัน
                - identifier: `string`
                    - [ตัวระบุ](../../config/core.md#identifiertype)ของผู้เล่นที่ถูกแบน
                - banId: `string`
                    - รหัสอ้างอิงการแบน
                - banDetails: `table<{ [key]: any }>` | `nil`
                    - [ข้อมูลการถูกแบน](../database/server.md#json-structure)

### onBannedIdentifierDetected

ทำงานเมื่อผู้เล่นเชื่อมต่อและตรวจพบ Identifiers ของผู้เล่นที่ถูกแบน

```lua title="บรรทัดที่ 128"
function Logger.onBannedIdentifierDetected(payload)
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'APP_BannedIdDetected',
            content = '### ตรวจพบการเชื่อมต่อจาก Identifier ของผู้เล่นที่ถูกแบน',
            fields = {
                { name = 'IDENTIFIER', value = ('```%s```'):format(payload.player.identifier), inline = false },
                { name = 'BANNED DETAILS', value = ('```%s```'):format(json.encode(payload.data.banDetails, { indent = true })), inline = false }
            },
            source = 0,
            color = payload.data.banDetails?.type == 'temporary' and 3 or 1,
            options = {
                codeblock = false
            }
        })
    end)
end
```

#### Parameters

- payload: `table<{ player: table, data: table }>`
    - ตารางข้อมูล
        - player: `table<{ [key]: any }>`
            - ข้อมูลของผู้เล่นเมื่อเชื่อมต่อ
                - tempId: `integer`
                    - [Temp ID](https://docs.fivem.net/docs/scripting-reference/events/list/playerconnecting/#parameters) ของผู้เล่น 
                - identifier: `string`
                    - [ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
                - bindId: `string` | `nil`
                    - [ตัวระบุที่ผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
        - data: `table<{ [key]: any }>`
            - ข้อมูลการแบน
                - status: `table<{ id: integer, name: string }>`
                    - ข้อมูลสถานะการถูกแบน
                - banDetails: `table<{ [key]: any }>` | `nil`
                    - [ข้อมูลการถูกแบน](../database/server.md#json-structure)

### onPlayerTempPointsExpired

ทำงานเมื่อ[คิวพอยท์แบบชั่วคราว](../database/server.md#temporary-fields)ของผู้เล่นหมดอายุแล้ว

```lua title="บรรทัดที่ 171"
function Logger.onPlayerTempPointsExpired(payload)
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'APP_TempPointsExpired',
            content = ('### คิวพอยท์ของผู้เล่นหมดอายุแล้ว `%d` พอยท์ จาก `%d` คงเหลือ `%d` พอยท์'):format(payload.data.expiredPoints, payload.data.totalPoints, payload.data.currentPoints),
            fields = {
                { name = 'IDENTIFIER', value = ('```%s```'):format(payload.player.identifier), inline = false },
                { name = 'EXPIRED POINTS', value = ('```%s```'):format(json.encode(payload.data.expiredData, { indent = true })), inline = false },
                { name = 'CURRENT POINTS', value = ('```%s```'):format(json.encode(payload.data.currentData, { indent = true })), inline = false }
            },
            source = 0,
            color = 1,
            options = {
                codeblock = false
            }
        })
    end)
end
```

#### Parameters

- payload: `table<{ player: table, data: table }>`
    - ตารางข้อมูล
        - player: `table<{ [key]: any }>`
            - ข้อมูลของผู้เล่น
                - identifier: `string`
                    - [ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
        - data: `table<{ [key]: any }>`
            - ข้อมูลคิวพ้อยท์
                - totalPoints: `integer`
                    - จำนวนคิวพ้อยท์ทั้งหมด 
                - expiredPoints: `integer`
                    - จำนวนคิวพ้อยท์ที่หมดอายุ
                - currentPoints: `integer`
                    - จำนวนคิวพ้อยท์ปัจจุบัน
                - expiredData: `table<{ [index]: table<{ value: integer, expiry_datetime: string }> }>`
                    - [ข้อมูลคิวพ้อยท์แบบชั่วคราว](../database/server.md#temporary-fields)ที่หมดอายุแล้ว
                - currentData: `table<{ permanent: integer, temporary: table<{ [index]: table }> }>`
                    - [ข้อมูลคิวพ้อยท์ปัจจุบัน](../database/server.md#json-structure)

### onPlayerBanned

ทำงานเมื่อผู้เล่นถูกแบนชั่วคราวหรือถาวร

```lua title="บรรทัดที่ 212"
function Logger.onPlayerBanned(payload)
    local banType <const> = payload.data.banDetails.type
    local fields <const> = { { name = 'IDENTIFIER', value = ('```%s```'):format(payload.player.identifier), inline = false } }

    if payload.player.bindId then
        fields[#fields + 1] = { name = 'BOUND ID', value = ('```%s```'):format(payload.player.bindId), inline = false }
    end

    if payload.data.banId then
        fields[#fields + 1] = { name = 'BAN REFERENCE ID', value = ('```%s```'):format(payload.data.banId), inline = false }
    end

    if payload.data.banHwids then
        fields[#fields + 1] = { name = 'BANNED HWIDs', value = ('```%s```'):format(json.encode(payload.data.banHwids, { indent = true })), inline = false }
    end

    fields[#fields + 1] = { name = 'BANNED DETAILS', value = ('```%s```'):format(json.encode(payload.data.banDetails, { indent = true })), inline = false }

    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'APP_PlayerBanned',
            content = ('### ผู้เล่นถูกแบน %s เนื่องจาก "%s"'):format((banType == 'permanent' and 'ถาวร' or 'ชั่วคราว'), payload.data.banDetails.reason),
            fields = fields,
            source = 0,
            color = (banType == 'permanent' and 1 or 3),
            options = {
                codeblock = false
            }
        })
    end)
end
```

#### Parameters

- payload: `table<{ player: table, data: table }>`
    - ตารางข้อมูล
        - player: `table<{ [key]: any }>`
            - ข้อมูลของผู้เล่น
                - tempId: `integer` | `nil`
                    - [Temp ID](https://docs.fivem.net/docs/scripting-reference/events/list/playerconnecting/#parameters) ของผู้เล่น 
                - identifier: `string`
                    - [ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
                - bindId: `string` | `nil`
                    - [ตัวระบุที่ผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
        - data: `table<{ [key]: any }>`
            - ข้อมูลของผู้เล่นที่ถูกแบน
                - banId: `string` | `nil`
                    - รหัสอ้างอิงการแบน
                - banHwids: `table<{ [index]: string }>` | `nil`
                    - ข้อมูล HWIDs ทีถูกแบน
                - banDetails: `table<{ [key]: any }>`
                    - [ข้อมูลการถูกแบน](../database/server.md#json-structure)

### onPlayerUnbanned

ทำงานเมื่อผู้เล่นถูกยกเลิกการแบนแล้ว

```lua title="บรรทัดที่ 266"
function Logger.onPlayerUnbanned(payload)
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'APP_PlayerUnbanned',
            content = '### ผู้เล่นถูกยกเลิกการแบนแล้ว',
            fields = {
                { name = 'IDENTIFIER', value = ('```%s```'):format(payload.player.identifier), inline = false },
                { name = 'BOUND ID', value = ('```%s```'):format(payload.player.bindId), inline = false },
                { name = 'HWIDs', value = ('```%s```'):format(json.encode(payload.data.banHwids, { indent = true })), inline = false },
                { name = 'BAN DETAILS', value = ('```%s```'):format(json.encode(payload.data.banDetails, { indent = true })), inline = false },
                { name = 'UNBAN BY', value = ('```%s```'):format(payload.data.unbanBy), inline = false }
            },
            source = 0,
            color = 2,
            options = {
                codeblock = false
            }
        })
    end)
end
```

#### Parameters

- payload: `table<{ player: table, data: table }>`
    - ตารางข้อมูล
        - player: `table<{ [key]: any }>`
            - ข้อมูลของผู้เล่น
                - tempId: `integer` | `nil`
                    - [Temp ID](https://docs.fivem.net/docs/scripting-reference/events/list/playerconnecting/#parameters) ของผู้เล่น 
                - identifier: `string`
                    - [ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
                - bindId: `string` | `nil`
                    - [ตัวระบุที่ผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
        - data: `table<{ [key]: any }>`
            - ข้อมูลยกเลิกการแบน
                - unbanBy: `string`
                    - ยกเลิกแบนโดย
                - banHwids: `table<{ [index]: string }>` | `nil`
                    - ข้อมูล HWIDs ทียกเลิกแบน
                - banDetails: `table<{ [key]: any }>`
                    - [ข้อมูลการถูกแบน](../database/server.md#json-structure)

### onPlayerInactiveDetected

ทำงานเมื่อ[ผู้เล่นไม่ได้เข้าร่วมเซิร์ฟเวอร์ตามระยะเวลาที่กำหนด](../../config/core.md#inactiveplayers)และถูกระงับการใช้งานแล้ว

```lua title="บรรทัดที่ 290"
function Logger.onPlayerInactiveDetected(payload)
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'APP_InactiveDetected',
            content = ('### ผู้เล่นไม่ได้เชื่อมต่อกับเซิร์ฟเวอร์นานเกิน `%s` วัน และสิทธิ์การเชื่อมต่อของผู้เล่นถูกระงับ'):format(payload.data.limit_days),
            fields = {
                { name = 'IDENTIFIER', value = ('```%s```'):format(payload.player.identifier), inline = false },
                { name = 'LAST SEEN', value = ('```%s```'):format(payload.data.last_seen), inline = false }
            },
            source = 0,
            color = 1,
            options = {
                codeblock = false
            }
        })
    end)
end
```

#### Parameters

- payload: `table<{ player: table, data: table }>`
    - ตารางข้อมูล
        - player: `table<{ [key]: any }>`
            - ข้อมูลของผู้เล่น
                - tempId: `integer` | `nil`
                    - [Temp ID](https://docs.fivem.net/docs/scripting-reference/events/list/playerconnecting/#parameters) ของผู้เล่น 
                - identifier: `string`
                    - [ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
                - bindId: `string` | `nil`
                    - [ตัวระบุที่ผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
        - data: `table<{ [key]: any }>`
            - ข้อมูลการถูกระงับ
                - last_seen: `string`
                    - วันที่และเวลาที่พบผู้เล่นครั้งล่าสุด ในรูปแบบ `YYYY-MM-DD HH:MM:SS` เช่น `"2026-05-21 14:33:00"`
                - limit_days: `integer`
                    - [จำนวนวันที่เซิร์ฟเวอร์กำหนด](../../config/core.md#inactiveplayers)

### onPlayerBoundIdMismatch

ทำงานเมื่อผู้เล่นเชื่อมต่อและใช้งาน[บัญชีที่ผูกไว้](../../config/core.md#bindidentifier)ไม่ตรงกับฐานข้อมูล

```lua title="บรรทัดที่ 311"
function Logger.onPlayerBoundIdMismatch(payload)
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'APP_BoundIdMismatch',
            content = '### ผู้เล่นเชื่อมต่อด้วยตัวระบุบัญชีที่ไม่ตรงกับบัญชีที่ผูกไว้ในฐานข้อมูล',
            fields = {
                { name = 'IDENTIFIER', value = ('```%s```'):format(payload.player.identifier), inline = false },
                { name = 'BOUND ID', value = ('```%s```'):format(payload.data.boundId), inline = false },
                { name = 'CONNECTION ID', value = ('```%s```'):format(payload.player.bindId), inline = false },
            },
            source = 0,
            color = 1,
            options = {
                codeblock = false
            }
        })
    end)
end
```

#### Parameters

- payload: `table<{ player: table, data: table }>`
    - ตารางข้อมูล
        - player: `table<{ [key]: any }>`
            - ข้อมูลของผู้เล่นเมื่อเชื่อมต่อ
                - tempId: `integer`
                    - [Temp ID](https://docs.fivem.net/docs/scripting-reference/events/list/playerconnecting/#parameters) ของผู้เล่น 
                - identifier: `string`
                    - [ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
                - bindId: `string` | `nil`
                    - [ตัวระบุที่ผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
        - data: `table<{ [key]: any }>`
            - ข้อมูลของผู้เล่น
                - boundId: `string`
                    - [ตัวระบุที่ผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype) บนฐานข้อมูล

### onPlayerDataStored

ทำงานเมื่อมีการ[บันทึกข้อมูลผู้เล่นไปยังฐานข้อมูล](../database/server.md#insertplayerdata)ของเซิร์ฟเวอร์

```lua title="บรรทัดที่ 369"
function Logger.onPlayerDataStored(payload)
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'APP_PlayerDataStored',
            content = '### บันทึกข้อมูลผู้เล่นไปยังฐานข้อมูลของเซิร์ฟเวอร์',
            fields = {
                { name = 'IDENTIFIER', value = ('```%s```'):format(payload.player.identifier), inline = false },
                { name = 'BOUND ID', value = ('```%s```'):format(payload.player.bindId), inline = false },
                { name = 'PLAYER DATA', value = ('```%s```'):format(json.encode(payload.data, { indent = true })), inline = false }
            },
            source = 0,
            color = 2,
            options = {
                codeblock = false
            }
        })
    end)
end
```

#### Parameters

- payload: `table<{ player: table, data: table }>`
    - ตารางข้อมูล
        - player: `table<{ [key]: any }>`
            - ข้อมูลของผู้เล่น
                - identifier: `string`
                    - [ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
                - bindId: `string` | `nil`
                    - [ตัวระบุที่ผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
        - data: `table<{ [key]: any }>`
            - [ข้อมูลของผู้เล่น](../database/server.md#getplayerdata-returns) ที่บันทึกไปยังฐานข้อมูล

### onPlayerDataDeleted

ทำงานเมื่อ[ข้อมูลผู้เล่นถูกลบออกจากฐานข้อมูล](../database/server.md#deleteplayerdata)ของเซิร์ฟเวอร์

```lua title="บรรทัดที่ 426"
function Logger.onPlayerDataDeleted(payload)
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'APP_PlayerDataDeleted',
            content = '### ลบข้อมูลผู้เล่นออกจากฐานข้อมูลของเซิร์ฟเวอร์',
            fields = {
                { name = 'IDENTIFIER', value = ('```%s```'):format(payload.player.identifier), inline = false },
                { name = 'PLAYER DATA', value = ('```%s```'):format(json.encode(payload.data, { indent = true })), inline = false }
            },
            source = 0,
            color = 1,
            options = {
                codeblock = false
            }
        })
    end)
end
```

#### Parameters

- payload: `table<{ player: table, data: table }>`
    - ตารางข้อมูล
        - player: `table<{ [key]: any }>`
            - ข้อมูลของผู้เล่น
                - identifier: `string`
                    - [ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
        - data: `table<{ [key]: any }>`
            - [ข้อมูลของผู้เล่น](../database/server.md#getplayerdata-returns) ที่ถูกลบออกจากฐานข้อมูล


### onPlayerIdentifierUpdated

ทำงานเมื่อมีการ[อัปเดทตัวระบุ](../database/server.md#updateplayeridentifier)ของผู้เล่นใหม่

```lua title="บรรทัดที่ 483"
function Logger.onPlayerIdentifierUpdated(payload)
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'APP_IdentifierUpdated',
            content = '### อัปเดตตัวระบุหลักของผู้เล่นใหม่',
            fields = {
                { name = 'OLD IDENTIFIER', value = ('```%s```'):format(payload.player.identifier), inline = false },
                { name = 'NEW IDENTIFIER', value = ('```%s```'):format(payload.player.newIdentifier), inline = false },
                { name = 'PLAYER DATA', value = ('```%s```'):format(json.encode(payload.data, { indent = true })), inline = false }
            },
            source = 0,
            color = 5,
            options = {
                codeblock = false
            }
        })
    end)
end
```

#### Parameters

- payload: `table<{ player: table, data: table }>`
    - ตารางข้อมูล
        - player: `table<{ [key]: any }>`
            - ข้อมูลของผู้เล่น
                - identifier: `string`
                    - [ตัวระบุเก่า](../../config/core.md#identifiertype) ของผู้เล่น
                - newIdentifier: `string`
                    - [ตัวระบุใหม่](../../config/core.md#identifiertype) ของผู้เล่น
        - data: `table<{ [key]: any }>`
            - [ข้อมูลของผู้เล่น](../database/server.md#getplayerdata-returns) บนฐานข้อมูล

### onPlayerBoundIdUpdated

ทำงานเมื่อผู้เล่นเชื่อมต่อและ[อัปเดตตัวระบุการผูกบัญชี](../database/server.md#updatebindidentifier)ใหม่

```lua title="บรรทัดที่ 505"
function Logger.onPlayerBoundIdUpdated(payload)
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'APP_BoundIdUpdated',
            content = '### ผู้เล่นเชื่อมต่อและอัปเดตตัวระบุการผูกบัญชีใหม่',
            fields = {
                { name = 'IDENTIFIER', value = ('```%s```'):format(payload.player.identifier), inline = false },
                { name = 'BOUND ID', value = ('```%s```'):format(payload.data.boundId), inline = false }
            },
            source = 0,
            color = 5,
            options = {
                codeblock = false
            }
        })
    end)
end
```

#### Parameters

- payload: `table<{ player: table, data: table }>`
    - ตารางข้อมูล
        - player: `table<{ [key]: any }>`
            - ข้อมูลของผู้เล่นเมื่อเชื่อมต่อ
                - tempId: `integer`
                    - [Temp ID](https://docs.fivem.net/docs/scripting-reference/events/list/playerconnecting/#parameters) ของผู้เล่น 
                - identifier: `string`
                    - [ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
                - bindId: `string` | `nil`
                    - [ตัวระบุที่ผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
        - data: `table<{ [key]: any }>`
            - ข้อมูลของผู้เล่น
                - boundId: `string`
                    - [ตัวระบุใหม่ที่ผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype)

### onPlayerAwardedLuckySlots

ทำงานเมื่อผู้เล่นได้รับรางวัลจากกิจกรรม [Lucky Slots](../../config/queue.md#luckyslots) ของระบบ [Queue](../../config/queue.md)

```lua title="บรรทัดที่ 547"
function Logger.onPlayerAwardedLuckySlots(payload)
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'APP_AwardedLuckySlots',
            content = ('### ผู้เล่นชนะ Lucky Slots ทั้งหมด `%d` ครั้ง และได้รับรางวัล Queue Points จำนวน `%d` แต้ม'):format(#payload.data.rawData, payload.data.rewardPoints),
            fields = {
                { name = 'IDENTIFIER', value = ('```%s```'):format(payload.player.identifier), inline = false },
                { name = 'PREV POINTS', value = ('```%s```'):format((payload.data.totalPoints - payload.data.rewardPoints)), inline = true },
                { name = 'NEW POINTS', value = ('```%s```'):format(payload.data.rewardPoints), inline = true },
                { name = 'TOTAL POINTS', value = ('```%s```'):format(payload.data.totalPoints), inline = true },
                { name = 'RAW DATA', value = ('```%s```'):format(json.encode(payload.data.rawData, { indent = true })), inline = false },
                { name = 'MERGED DATA', value = ('```%s```'):format(json.encode(payload.data.mergedData, { indent = true })), inline = false }
            },
            source = 0,
            color = 2,
            options = {
                codeblock = false
            }
        })
    end)
end
```

#### Parameters

- payload: `table<{ player: table, data: table }>`
    - ตารางข้อมูล
        - player: `table<{ [key]: any }>`
            - ข้อมูลของผู้เล่นเมื่อเชื่อมต่อ
                - tempId: `integer` | `nil`
                    - [Temp ID](https://docs.fivem.net/docs/scripting-reference/events/list/playerconnecting/#parameters) ของผู้เล่น 
                - identifier: `string`
                    - [ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
        - data: `table<{ [key]: any }>`
            - ข้อมูลรางวัลคิวพ้อยท์ที่ได้รับ
                - rawData: `table<{ [index]: table<{ points: integer, days: integer|nil }> }>`
                    - ข้อมูลดิบคิวพ้อยท์ (ยังไม่ได้รวมข้อมูลคิวพ้อยท์ทีเหมือนกัน)
                        - points: `integer`
                            - จำนวนคิวพ้อยท์ที่ได้รับ
                        - days: `integer` | `nil`
                            - จำนวนวันหมดอายุของคิวพอยท์
                - mergedData: `table<{ [index]: table<{ points: integer, days: integer|nil }> }>`
                    - ข้อมูลคิวพ้อยท์ที่ได้รับ (รวมข้อมูลคิวพ้อยท์ทีเหมือนกันแล้ว)
                        - points: `integer`
                            - จำนวนคิวพ้อยท์ที่ได้รับ
                        - days: `integer` | `nil`
                            - จำนวนวันหมดอายุของคิวพอยท์
                - rewardPoints: `integer`
                    - จำนวนคิวพ้อยท์ที่ได้รับ
                - totalPoints: `integer`
                    - จำนวนคิวพ้อยท์ทั้งหมดที่ผู้เล่นมีอยู่

### onPlayerAirtimeUpdated

ทำงานเมื่อ[แอร์ไทม์ของผู้เล่น](../database/server.md#setplayerairtime)มีการเปลี่ยนแปลง

```lua title="บรรทัดที่ 583"
function Logger.onPlayerAirtimeUpdated(payload)
    local oldAirtime <const> = payload.data.oldAirtime
    local newAirtime <const> = payload.data.newAirtime
    
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'APP_AirtimeUpdated',
            content = ('### แอร์ไทม์ของผู้เล่นมีการเปลี่ยนแปลง `%d` วินาที'):format((newAirtime - oldAirtime)),
            fields = {
                { name = 'IDENTIFIER', value = ('```%s```'):format(payload.player.identifier), inline = false },
                { name = 'PREVIOUS AIRTIME', value = ('```%s```'):format(oldAirtime), inline = true },
                { name = 'CURRENT AIRTIME', value = ('```%s```'):format(newAirtime), inline = true },
                { name = 'REMAINING AIRTIME', value = ('```%s```'):format(payload.data.airtimeLeft), inline = false }
            },
            source = (payload.player.netId or 0),
            color = (newAirtime > oldAirtime and 2 or 1),
            options = {
                codeblock = false
            }
        })
    end)
end
```

#### Parameters

- payload: `table<{ player: table, data: table }>`
    - ตารางข้อมูล
        - player: `table<{ [key]: any }>`
            - ข้อมูลของผู้เล่น
                - netId: `integer`  | `nil`
                    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น
                - identifier: `string`  | `nil`
                    - [ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
                - bindId: `string` | `nil`
                    - [ตัวระบุที่ผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
        - data: `table<{ [key]: any }>`
            - ข้อมูลการเปลี่ยนแปลงของแอร์ไทม์
                - oldAirtime: `integer`
                    - จำนวน[แอร์ไทม์คงเหลือ](../../config/core.md#airtimeserver)ก่อนมีการเปลี่ยนแปลง
                - newAirtime: `integer`
                    - จำนวน[แอร์ไทม์คงเหลือ](../../config/core.md#airtimeserver)หลังมีการเปลี่ยนแปลง
                - airtimeLeft: `string`
                    - แอร์ไทม์คงเหลือ (ตัวอย่าง: `"1 วัน 18 ชั่วโมง 22 นาที 2 วินาที"`)

### onCommandExecuted

ทำงานเมื่อดำเนินการ[ใช้คำสั่งเสร็จสิ้นแล้ว](../commands/server.md#onexecuted)

```lua title="บรรทัดที่ 634"
function Logger.onCommandExecuted(payload)
    local command <const> = payload.data.command
    local success <const> = payload.data.success
    local actionBy <const> = payload.type == 'http' and payload.invoker.address
        or payload.type == 'export' and payload.invoker.resource
        or (payload.type == 'console' and payload.invoker.player.netId > 0) and 'Client Console' 
        or payload.type == 'console' and 'Server Console'
        or 'Unknown'
    
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'APP_ExecuteCommands',
            content = ('### ใช้งานคำสั่ง `%s` %s'):format(command.name, (success and 'สำเร็จ' or 'ล้มเหลว')),
            fields = {
                { name = 'COMMAND KEY', value = ('```%s```'):format(command.key), inline = true },
                { name = 'COMMAND NAME', value = ('```%s```'):format(command.name), inline = true },
                { name = 'RAW COMMAND', value = ('```%s```'):format(command.raw), inline = false },
                { name = 'EXECUTED FROM', value = ('```%s```'):format(actionBy), inline = false },
                { name = 'EXECUTED STATUS', value = ('```%s```'):format((success and '✔️ ➔ Success' or '❌ ➔ Failed')), inline = false },
                { name = 'EXECUTED RESPONSE', value = ('```%s```'):format(json.encode(payload.data.response, { indent = true })), inline = false }
            },
            source = (payload.type == 'console' and payload.invoker.player.netId or 0),
            color = (success and 2 or 1),
            options = {
                codeblock = false
            }
        })
    end)
end
```

#### Parameters

- payload: `table<{ [key]: any }>`
    - ตารางข้อมูลของคำสั่งที่ใช้งาน
        - type: `string`
            - ใช้คำสั่งผ่านช่องทางใด `http`, `export`, `console`
        - invoker: `table<{ [key]: any }>`
            - ข้อมูลของการเรียกใช้คำสั่ง
                - resource: `string` | `nil`
                    - ชื่อทรัพยากรที่เรียกใช้คำสั่งผ่าน [Export Functions](https://docs.fivem.net/docs/scripting-reference/runtimes/javascript/functions/exports/)
                - address: `string` | `nil`
                    - ที่อยู่ IP และหมายเลข Port ที่เรียกใช้คำสั่งผ่าน [HTTP Handler](../../config/command.md#httphandler)
                - player: `table<{ netId: integer, identifier: string|nil }>` | `nil`
                    - ข้อมูลของผู้เล่นที่เรียกใช้คำสั่ง
                        - netId: `integer`
                            - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่นที่ใช้คำสั่ง
                                - ⚠️ หากเป็น `0` เป็นการใช้งานคำสั่งผ่าน Server Console
                        - identifier: `string` | `nil`
                            - [ตัวระบุ](../../config/core.md#identifiertype) ของผู้เล่นที่ใช้คำสั่ง
        - data: `table<{ [key]: any }>`
            - ข้อมูลของคำสั่งที่ใช้งาน
                - command: `table<{ [key]: any }>`
                    - ข้อมูลของคำสั่งที่ใช้งาน (ดูรายละเอียดด้านล่าง)
                - success: `boolean`
                    - สถานะการใช้งานคำสั่ง
                - response: `table<{ [key]: any }>`
                    - ข้อมูลตอบกลับของคำสั่ง (ดูรายละเอียดด้านล่าง)

<Tabs>
    <TabItem value="command" label="command">
        | Field                 | Type                          | Description
        |-----------------------|-------------------------------|-------------------------------
        | `key`                 | `string`                      | คีย์ของคำสั่ง
        | `name`                | `string`                      | ชื่อของคำสั่ง
        | `raw`                 | `string`                      | ข้อมูลของคำสั่งที่ใช้
        | `args`                | `table<{ [index]: string }>`  | ข้อมูลอาร์กิวเมนต์ของคำสั่งที่ใช้
    </TabItem>
    <TabItem value="response" label="response">
:::tip Success
        ข้อมูลตอบกลับเมื่อใช้คำสั่งสำเร็จ สามารถดูรายละเอียดได้ที่ [**respHandler**](../commands/server.md#resphandler)
:::
:::danger Failed
        | Field                 | Type                          | Description
        |-----------------------|-------------------------------|-------------------------------
        | `type`                | `string`                      | ประเภทของข้อผิดพลาด
        | `message`             | `string`                      | ข้อความตอบกลับเมื่อไม่สำเร็จ
:::
    </TabItem>
</Tabs>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
