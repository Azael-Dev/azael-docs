---
sidebar_label: Server
---

# Hooks (Server-side)

## Hooks

### onPlayerDuplicateIdentifier

ทำงานเมื่อผู้เล่นถูกเตะออกจากเซิร์ฟเวอร์ เนื่องจากมีการเชื่อมต่อด้วยตัวระบุเดียวกัน

```lua title="บรรทัดที่ 14"
function Hooks.onPlayerDuplicateIdentifier(payload)
    return false, true
end
```

#### Parameters

- payload: `table<{ players: table }>`
    - ตารางข้อมูล
        - players: `table<{ incoming: table, existing: table }>`
            - ข้อมูลผู้เล่นทั้งสอง
                - incoming: `table<{ [key]: any }>`
                    - ข้อมูลผู้เล่นที่กำลังเชื่อมต่อ
                        - netId: `integer`
                            - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น
                        - identifier: `string`
                            - ตัวระบุที่ซ้ำกันของผู้เล่น
                        - identifiers: `string[]`
                            - ตัวระบุทั้งหมดของผู้เล่น
                - existing: `table<{ [key]: any }>`
                    - ข้อมูลผู้เล่นที่ออนไลน์อยู่แล้ว
                        - netId: `integer`
                            - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น
                        - identifier: `string`
                            - ตัวระบุที่ซ้ำกันของผู้เล่น
                        - identifiers: `string[]`
                            - ตัวระบุทั้งหมดของผู้เล่น

#### Returns

- kickIncoming: `boolean`
    - ตอบกลับ `true` หากต้องการเตะผู้เล่นที่กำลังเชื่อมต่อ
- kickExisting: `boolean`
    - ตอบกลับ `true` หากต้องการเตะผู้เล่นที่ออนไลน์อยู่แล้ว

:::info

- ค่าเริ่มต้น: `return false, true` — **เตะผู้เล่นที่ออนไลน์อยู่แล้ว** เมื่อตรวจพบตัวระบุซ้ำ
- หากต้องการ **ปฏิเสธผู้เล่นที่กำลังเชื่อมต่อ** แทน: `return true, false`
- หากต้องการ **เตะทั้งสองฝ่าย**: `return true, true`

:::

### onPlayerIpLimitExceeded

ทำงานเมื่อผู้เล่นเชื่อมต่อกับเซิร์ฟเวอร์แต่เกินขีดจำกัดการเชื่อมต่อจากที่อยู่ IP เดียวกัน

```lua title="บรรทัดที่ 23"
function Hooks.onPlayerIpLimitExceeded(payload)
    return true
end
```

#### Parameters

- payload: `table<{ [key]: any }>`
    - ตารางข้อมูล
        - netId: `integer`
            - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น
        - identifier: `string`
            - [ตัวระบุหลัก](../../config/core.md#identifieruniqueness) ของผู้เล่น
        - ipAddress: `string`
            - ที่อยู่ IP ของผู้เล่น (ไม่รวม prefix)
        - numConnections: `integer`
            - จำนวนการเชื่อมต่อปัจจุบันจาก IP นี้
        - maxConnections: `integer`
            - จำนวนการเชื่อมต่อสูงสุดที่อนุญาต
        - players: `table<{ [netId]: string }>`
            - ข้อมูลผู้เล่นที่เชื่อมต่อจาก IP เดียวกัน (Key = netId, Value = identifier)

#### Returns

- rejectConnection: `boolean` | `nil`
    - ตอบกลับ `true` หากต้องการปฏิเสธการเชื่อมต่อ
    - ตอบกลับ `false` หากต้องการอนุญาตการเชื่อมต่อ

### onPlayerIpReputationBlocked

ทำงานเมื่อผู้เล่นเชื่อมต่อกับเซิร์ฟเวอร์แต่ไม่ผ่านการตรวจสอบความน่าเชื่อถือของที่อยู่ IP (IP Reputation)

```lua title="บรรทัดที่ 30"
function Hooks.onPlayerIpReputationBlocked(payload)
    return true
end
```

#### Parameters

- payload: `table<{ [key]: any }>`
    - ตารางข้อมูล
        - netId: `integer`
            - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น
        - identifier: `string`
            - [ตัวระบุหลัก](../../config/core.md#identifieruniqueness) ของผู้เล่น
        - ipAddress: `string`
            - ที่อยู่ IP ของผู้เล่น (ไม่รวม prefix)
        - blockReason: `string?`
            - เหตุผลที่ถูกบล็อก
        - isVPN: `boolean`
            - ตรวจพบว่าเป็น VPN
        - isProxy: `boolean`
            - ตรวจพบว่าเป็น Proxy
        - country: `string?`
            - ประเทศที่ตรวจพบ
        - isoCode: `string?`
            - รหัสประเทศ ISO
        - riskScore: `integer`
            - คะแนนความเสี่ยง
        - confidenceScore: `integer`
            - คะแนนความมั่นใจ

#### Returns

- rejectConnection: `boolean` | `nil`
    - ตอบกลับ `true` หากต้องการปฏิเสธการเชื่อมต่อ
    - ตอบกลับ `false` หากต้องการอนุญาตการเชื่อมต่อ
