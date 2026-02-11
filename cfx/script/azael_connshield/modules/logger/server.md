---
sidebar_label: Server
---

# Logger (Server-side)

## Logger

### onPlayerDuplicateIdentifier

ทำงานเมื่อผู้เล่นถูกเตะออกจากเซิร์ฟเวอร์ เนื่องจากมีการเชื่อมต่อด้วยตัวระบุเดียวกัน

```lua title="บรรทัดที่ 14"
function Logger.onPlayerDuplicateIdentifier(payload)
    local incoming <const> = payload.players.incoming
    local existing <const> = payload.players.existing
    local kickedPlayer <const> = payload.kickType == 'incoming' and incoming or existing
    local conflictPlayer <const> = payload.kickType == 'incoming' and existing or incoming

    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'CNS_DuplicateIdKick',
            content = '...',
            ...
        })
    end)
end
```

#### Parameters

- payload: `table<{ players: table, kickType: string }>`
    - ตารางข้อมูล
        - players: `table<{ incoming: table, existing: table }>`
            - ข้อมูลผู้เล่นทั้งสอง
                - incoming: `table<{ [key]: any }>`
                    - ข้อมูลผู้เล่นที่กำลังเชื่อมต่อ
                        - netId: `integer` — [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น
                        - identifier: `string` — ตัวระบุที่ซ้ำกัน
                        - identifiers: `string[]` — ตัวระบุทั้งหมด
                - existing: `table<{ [key]: any }>`
                    - ข้อมูลผู้เล่นที่ออนไลน์อยู่แล้ว
                        - netId: `integer` — [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น
                        - identifier: `string` — ตัวระบุที่ซ้ำกัน
                        - identifiers: `string[]` — ตัวระบุทั้งหมด
        - kickType: `string`
            - ประเภทการเตะ (`incoming` = ผู้เล่นที่กำลังเชื่อมต่อ, `existing` = ผู้เล่นที่ออนไลน์อยู่แล้ว)

:::tip

ฟังก์ชันนี้ส่งข้อมูลไปยัง [**azael_dc-serverlogs**](../../../azael_dc-serverlogs/index.md) โดยใช้ Event Name: `CNS_DuplicateIdKick`

:::

### onPlayerIpLimitExceeded

ทำงานเมื่อผู้เล่นเชื่อมต่อกับเซิร์ฟเวอร์แต่เกินขีดจำกัดการเชื่อมต่อจากที่อยู่ IP เดียวกัน

```lua title="บรรทัดที่ 44"
function Logger.onPlayerIpLimitExceeded(payload)
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'CNS_IpLimitExceeded',
            content = '### ปฏิเสธการเชื่อมต่อเนื่องจากมีผู้เล่นออนไลน์เกินขีดจำกัดจากที่อยู่ IP เดียวกัน',
            ...
        })
    end)
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
            - ข้อมูลผู้เล่นที่เชื่อมต่อจาก IP เดียวกัน

:::tip

ฟังก์ชันนี้ส่งข้อมูลไปยัง [**azael_dc-serverlogs**](../../../azael_dc-serverlogs/index.md) โดยใช้ Event Name: `CNS_IpLimitExceeded`

:::

### onPlayerIpReputationBlocked

ทำงานเมื่อผู้เล่นเชื่อมต่อกับเซิร์ฟเวอร์แต่ไม่ผ่านการตรวจสอบความน่าเชื่อถือของที่อยู่ IP

```lua title="บรรทัดที่ 64"
function Logger.onPlayerIpReputationBlocked(payload)
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'CNS_IpReputationBlocked',
            content = '### ปฏิเสธการเชื่อมต่อเนื่องจาก IP ไม่ผ่านการตรวจสอบ',
            ...
        })
    end)
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

:::tip

ฟังก์ชันนี้ส่งข้อมูลไปยัง [**azael_dc-serverlogs**](../../../azael_dc-serverlogs/index.md) โดยใช้ Event Name: `CNS_IpReputationBlocked`

:::

### onPlayerBypassedRules

ทำงานเมื่อผู้เล่นมีสิทธิ์ข้ามกฎการเชื่อมต่อบางอย่าง

```lua title="บรรทัดที่ 96"
function Logger.onPlayerBypassedRules(payload)
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'CNS_BypassRules',
            content = '### ผู้เล่นข้ามกฎการเชื่อมต่อ',
            ...
        })
    end)
end
```

#### Parameters

- payload: `table<{ [key]: any }>`
    - ตารางข้อมูล
        - netId: `integer`
            - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น
        - identifier: `string`
            - [ตัวระบุหลัก](../../config/core.md#identifieruniqueness) ของผู้เล่น
        - bypassedRules: `table<{ [index]: table }>`
            - รายการกฎที่ผู้เล่นข้ามได้
                - rule: `string`
                    - ชื่อกฎที่ข้าม
                - identifier: `string?`
                    - ตัวระบุ (สำหรับกฎ IDENTIFIER_UNIQUENESS)
                - ipAddress: `string?`
                    - ที่อยู่ IP (สำหรับกฎ IP_PROTECTIONS)

:::tip

ฟังก์ชันนี้ส่งข้อมูลไปยัง [**azael_dc-serverlogs**](../../../azael_dc-serverlogs/index.md) โดยใช้ Event Name: `CNS_BypassRules`

:::

### onCommandExecuted

ทำงานเมื่อมีการดำเนินการใช้คำสั่ง

```lua title="บรรทัดที่ 120"
function Logger.onCommandExecuted(payload)
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'CNS_CommandExecuted',
            content = '### คำสั่งถูกดำเนินการ',
            ...
        })
    end)
end
```

#### Parameters

- payload: `table<{ [key]: any }>`
    - ตารางข้อมูล
        - type: `string`
            - ประเภทการเรียกใช้คำสั่ง (`console` = คำสั่งจาก Console, `export` = คำสั่งจาก Export)
        - invoker: `table<{ [key]: any }>`
            - ข้อมูลผู้เรียกใช้คำสั่ง
                - player: `table?`
                    - ข้อมูลผู้เล่น (สำหรับ `console` type)
                        - netId: `integer` — [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `0` หากเป็น Server Console
                - resource: `string?`
                    - ชื่อทรัพยากร (สำหรับ `export` type)
        - data: `table<{ [key]: any }>`
            - ข้อมูลคำสั่งที่ดำเนินการ
                - command: `table`
                    - key: `string` — คีย์ของคำสั่ง
                    - name: `string` — ชื่อคำสั่ง
                    - raw: `string` — สตริงคำสั่งดิบ
                    - args: `any[]` — อาร์กิวเมนต์ของคำสั่ง
                - success: `boolean`
                    - ผลลัพธ์การดำเนินการ
                - response: `table`
                    - ข้อมูลตอบกลับของคำสั่ง

:::tip

ฟังก์ชันนี้ส่งข้อมูลไปยัง [**azael_dc-serverlogs**](../../../azael_dc-serverlogs/index.md) โดยใช้ Event Name: `CNS_CommandExecuted`

:::

## Event Names

รายการ Event Name ทั้งหมดที่ใช้ส่งข้อมูลไปยัง [**azael_dc-serverlogs**](../../../azael_dc-serverlogs/index.md)

| Event Name | Description |
|---|---|
| `CNS_DuplicateIdKick` | ผู้เล่นถูกเตะเนื่องจากตัวระบุซ้ำ |
| `CNS_IpLimitExceeded` | ปฏิเสธการเชื่อมต่อเนื่องจากเกินขีดจำกัด IP |
| `CNS_IpReputationBlocked` | ปฏิเสธการเชื่อมต่อเนื่องจาก IP ไม่ผ่านการตรวจสอบ |
| `CNS_BypassRules` | ผู้เล่นข้ามกฎการเชื่อมต่อ |
| `CNS_CommandExecuted` | คำสั่งถูกดำเนินการ |
