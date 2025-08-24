---
sidebar_label: Server
---

# Hooks (Server-side)

## Hooks

### onPlayerConnecting

ทำงานเมื่อผู้เล่นทำการเชื่อมต่อกับเซิร์ฟเวอร์

```lua title="บรรทัดที่ 16"
function Hooks.onPlayerConnecting(payload)
    return true
end
```

#### Parameters

- payload: `table<{ player: table, deferrals: table }>`
    - ตารางข้อมูล
        - player: `table<{ [key]: any }>`
            - ข้อมูลของผู้เล่นเมื่อเชื่อมต่อ
                - tempId: `integer`
                    - [Temp ID](https://docs.fivem.net/docs/scripting-reference/events/list/playerconnecting/#parameters) ของผู้เล่น 
                - identifier: `string`
                    - [ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
                - bindId: `string` | `nil`
                    - [ตัวระบุที่ผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
        - deferrals: `table<{ [key]: function }>`
            - ฟังก์ชันสำหรับการเลื่อนการเชื่อมต่อ (ดูข้อมูลเพิ่มเติมได้ที่ [Deferring connections](https://docs.fivem.net/docs/scripting-reference/events/list/playerconnecting/#deferring-connections))
                - update: `function`
                    - ส่งข้อความไปยังไคลเอนต์ที่เชื่อมต่อ
                - presentCard: `function`
                    - ส่งข้อมูล [Adaptive Card](https://adaptivecards.io/) ไปยังไคลเอนต์ที่เชื่อมต่อ
                - done: `function`
                    - สิ้นสุดกระบวนการ deferral โดยจำเป็นต้องรออย่างน้อยหนึ่ง tick ก่อนที่จะเรียกใช้ done
                    - หากระบุ `failureReason` การเชื่อมต่อจะถูกปฏิเสธ และไคลเอนต์จะเห็นข้อความที่ระบุเหตุผลไว้ หากไม่ระบุ `failureReason` ไคลเอนต์จะได้รับอนุญาตให้เข้าร่วมเซิร์ฟเวอร์
                - handover: `function`
                    - อนุญาตให้กำหนดชุดของ [endpoints](https://docs.fivem.net/docs/scripting-reference/events/list/playerconnecting/#dynamic-handover) สำหรับผู้เล่นในขณะที่กำลังเชื่อมต่อ

#### Returns

- allow: `boolean` | `nil`
    - ตอบกลับ `true` หากอนุญาตให้เชื่อมต่อ
    - ตอบกลับ `false` | `nil` หากต้องการยกเลิกการเชื่อมต่อ

### onPlayerJoining

ทำงานเมื่อผู้เล่นกำลังเข้าร่วมกับเซิร์ฟเวอร์

```lua title="บรรทัดที่ 23"
function Hooks.onPlayerJoining(payload)
    return true
end
```

#### Parameters

- payload: `table<{ player: table }>`
    - ตารางข้อมูล
        - player: `table<{ [key]: any }>`
            - ข้อมูลของผู้เล่นเมื่อกำลังเข้าร่วม
                - tempId: `integer`
                    - [Temp ID](https://docs.fivem.net/docs/scripting-reference/events/list/playerconnecting/#parameters) ของผู้เล่น
                - netId: `integer`
                    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น 
                - identifier: `string` | `nil`
                    - [ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
                - bindId: `string` | `nil`
                    - [ตัวระบุที่ผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น

#### Returns

- allow: `boolean` | `nil`
    - ตอบกลับ `true` หากอนุญาตให้เชื่อมต่อ
    - ตอบกลับ `false` | `nil` หากต้องการยกเลิกการเชื่อมต่อ (เตะออกจากเซิร์ฟเวอร์)

### onPlayerDataLoaded

ทำงานเมื่อผู้เล่นเชื่อมต่อและข้อมูลของผู้เล่นถูกโหลดแล้ว

```lua title="บรรทัดที่ 60"
function Hooks.onPlayerDataLoaded(payload)
    return payload
end
```

#### Parameters

- payload: `table<{ [key]: any }>`
    - [ข้อมูลของผู้เล่น](../database/server.md#getplayerdata-returns)

#### Returns

- payload: `table<{ [key]: any }>`
    - [ข้อมูลของผู้เล่น](../database/server.md#getplayerdata-returns)

### onPlayerConnectionSpam

ทำงานเมื่อผู้เล่น[เชื่อมต่อบ่อยและเร็วเกินกำหนด](../../config/core.md#connectionattemptlimit)

```lua title="บรรทัดที่ 67"
function Hooks.onPlayerConnectionSpam(payload)    
    return false
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

#### Returns

- allow: `boolean` | `nil`
    - ตอบกลับ `true` หากอนุญาตให้เชื่อมต่อ
    - ตอบกลับ `false` | `nil` หากต้องการยกเลิกการเชื่อมต่อ (รอคูลดาวน์ / บล็อกชั่วคราว)

### onPlayerPingExceeded

ทำงานเมื่อผู้เล่นเชื่อมต่อและ[การตอบสนองของเครือข่ายผู้เล่นช้าเกินกำหนด](../../config/core.md#maxpinglimit)

```lua title="บรรทัดที่ 74"
function Hooks.onPlayerPingExceeded(payload)
    return false
end
```

#### Parameters

- payload: `table<{ player: table }>`
    - ตารางข้อมูล
        - player: `table<{ [key]: any }>`
            - ข้อมูลของผู้เล่นเมื่อเชื่อมต่อ
                - tempId: `integer`
                    - [Temp ID](https://docs.fivem.net/docs/scripting-reference/events/list/playerconnecting/#parameters) ของผู้เล่น
                - netId: `integer`
                    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น
                - identifier: `string`
                    - [ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
                - bindId: `string` | `nil`
                    - [ตัวระบุที่ผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
                - ping: `integer`
                    - ค่า Ping ของผู้เล่น

#### Returns

- allow: `boolean` | `nil`
    - ตอบกลับ `true` หากอนุญาตให้เชื่อมต่อ
    - ตอบกลับ `false` | `nil` หากต้องการยกเลิกการเชื่อมต่อ

### onBannedHwidDetected

ทำงานเมื่อผู้เล่นเชื่อมต่อและ[ตรวจพบ HWIDs ของผู้เล่นอื่นที่ถูกแบน](../../config/core.md#banplayerhwids)

```lua title="บรรทัดที่ 104"
function Hooks.onBannedHwidDetected(payload)
    return false
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

#### Returns

- allow: `boolean` | `nil`
    - ตอบกลับ `true` หากอนุญาตให้เชื่อมต่อ
    - ตอบกลับ `false` | `nil` หากต้องการยกเลิกการเชื่อมต่อ

### onBannedIdentifierDetected

ทำงานเมื่อผู้เล่นเชื่อมต่อและตรวจพบ Identifiers ของผู้เล่นที่ถูกแบน

```lua title="บรรทัดที่ 130"
function Hooks.onBannedIdentifierDetected(payload)
    return false
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

#### Returns

- allow: `boolean` | `nil`
    - ตอบกลับ `true` หากอนุญาตให้เชื่อมต่อ
    - ตอบกลับ `false` | `nil` หากต้องการยกเลิกการเชื่อมต่อ

### onPlayerInactiveDetected

ทำงานเมื่อผู้เล่นเชื่อมต่อและสถานะถูกตั้งเป็นระงับการใช้งานเนื่องจาก[ไม่เข้าร่วมเซิร์ฟเวอร์ตามระยะเวลาที่กำหนด](../../config/core.md#inactiveplayers)

```lua title="บรรทัดที่ 137"
function Hooks.onPlayerInactiveDetected(payload)
    return false
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
            - ข้อมูลการถูกระงับ
                - status: `table<{ id: integer, name: string }>`
                    - ข้อมูลสถานะการถูกระงับ
                - last_seen: `string`
                    - วันที่และเวลาที่พบผู้เล่นครั้งล่าสุด ในรูปแบบ `YYYY-MM-DD HH:MM:SS` เช่น `"2026-05-21 14:33:00"`
                - limit_days: `integer`
                    - [จำนวนวันที่เซิร์ฟเวอร์กำหนด](../../config/core.md#inactiveplayers)

#### Returns

- allow: `boolean` | `nil`
    - ตอบกลับ `true` หากอนุญาตให้เชื่อมต่อ
    - ตอบกลับ `false` | `nil` หากต้องการยกเลิกการเชื่อมต่อ

### onPlayerAirtimeRejected

ทำงานเมื่อผู้เล่นเชื่อมต่อและ Airtime ไม่เพียงพอ ([ระบบจำกัดเวลาในการเล่น](../../config/core.md#airtimeserver) โดยผู้เล่นจะต้องเติม Airtime เพื่อเพิ่มเวลาในการเล่น)

```lua title="บรรทัดที่ 144"
function Hooks.onPlayerAirtimeRejected(payload)
    return false
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
            - ข้อมูลแอร์ไทม์ของผู้เล่น
                - airtime_left: `integer`
                    - จำนวนแอร์ไทม์คงเหลือของผู้เล่น

#### Returns

- allow: `boolean` | `nil`
    - ตอบกลับ `true` หากอนุญาตให้เชื่อมต่อ
    - ตอบกลับ `false` | `nil` หากต้องการยกเลิกการเชื่อมต่อ

### onPlayerBoundIdMismatch

ทำงานเมื่อผู้เล่นเชื่อมต่อและใช้งาน[บัญชีที่ผูกไว้](../../config/core.md#bindidentifier)ไม่ตรงกับฐานข้อมูล

```lua title="บรรทัดที่ 151"
function Hooks.onPlayerBoundIdMismatch(payload)
    return false
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

#### Returns

- allow: `boolean` | `nil`
    - ตอบกลับ `true` หากอนุญาตให้เชื่อมต่อ
    - ตอบกลับ `false` | `nil` หากต้องการยกเลิกการเชื่อมต่อ


### onAddPlayerToQueue

ทำงานก่อนเพิ่มข้อมูลผู้เล่นไปยัง[ระบบคิวรอเข้าร่วมเซิร์ฟเวอร์](../../config/queue.md)

```lua title="บรรทัดที่ 158"
function Hooks.onAddPlayerToQueue(payload)
    return payload
end
```

#### Parameters {#onaddplayertoqueue-parameters}

- payload: `table<{ [key]: any }>`
    - ข้อมูลของผู้เล่นที่จะใช้งานภายในระบบคิว
        - tempId: `integer`
            - [Temp ID](https://docs.fivem.net/docs/scripting-reference/events/list/playerconnecting/#parameters) ของผู้เล่น 
        - identifier: `string`
            - [ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
        - name: `string`
            - ชือของผู้เล่น
        - points: `integer`
            - จำนวนคิวพ้อยท์ของผู้เล่น
        - position: `integer`
            - ลำดับของผู้เล่นในคิว
        - joinTime: `integer`
            - เวลาที่ผู้เล่นเข้าร่วมคิว ([Unix time](https://en.wikipedia.org/wiki/Unix_time))
        - lastCheck: `integer`
            - เวลาที่ตรวจสอบว่าผู้เล่นยังอยู่ในคิวครั้งล่าสุด ([Unix time](https://en.wikipedia.org/wiki/Unix_time))

#### Returns

- payload: `table<{ [key]: any }>`
    - [ข้อมูลของผู้เล่นที่จะใช้งานภายในระบบคิว](./server.md#onaddplayertoqueue-parameters)
