---
sidebar_label: Server
---

# Logger (Server-side)

รายการ Event Name ทั้งหมดที่ใช้ส่งข้อมูลไปยัง [**azael_dc-serverlogs**](../../../azael_dc-serverlogs/index.md)

| Event Name | Description |
|---|---|
| `CNS_DuplicateIdKick` | ผู้เล่นถูกเตะเนื่องจากตัวระบุซ้ำ |
| `CNS_IpLimitExceeded` | ปฏิเสธการเชื่อมต่อเนื่องจากเกินขีดจำกัด IP |
| `CNS_IpReputationBlocked` | ปฏิเสธการเชื่อมต่อเนื่องจาก IP ไม่ผ่านการตรวจสอบ |
| `CNS_BypassRules` | ผู้เล่นข้ามกฎการเชื่อมต่อ |
| `CNS_CommandExecuted` | คำสั่งถูกดำเนินการ |

## Logger

### onPlayerDuplicateIdentifier

ทำงานเมื่อผู้เล่นถูกเตะออกจากเซิร์ฟเวอร์ เนื่องจากมีการเชื่อมต่อด้วยตัวระบุเดียวกัน

```lua title="บรรทัดที่ 16"
function Logger.onPlayerDuplicateIdentifier(payload)
    local incoming <const> = payload.players.incoming
    local existing <const> = payload.players.existing
    local kickedPlayer <const> = payload.kickType == 'incoming' and incoming or existing
    local conflictPlayer <const> = payload.kickType == 'incoming' and existing or incoming
    local kickColor <const> = payload.kickType == 'incoming' and 3 or 1
    local kickReasonTitle <const> = payload.kickType == 'incoming'
        and '### ปฏิเสธการเชื่อมต่อเนื่องจากมีผู้เล่นอื่นเชื่อมต่อด้วยตัวระบุเดียวกันอยู่แล้ว'
        or '### ผู้เล่นถูกเตะเนื่องจากมีผู้เล่นรายอื่นเชื่อมต่อด้วยตัวระบุเดียวกัน'

    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'CNS_DuplicateIdKick',
            content = kickReasonTitle,
            fields = {
                { name = 'DUPLICATE IDENTIFIER', value = ('```%s```'):format(kickedPlayer.identifier), inline = false },
                { name = 'CONFLICT PLAYER ID', value = ('```%s```'):format(conflictPlayer.netId), inline = false },
                { name = 'CONFLICT IDENTIFIERS', value = '```' .. table.concat(conflictPlayer.identifiers, '``` ```') .. '```', inline = false },
            },
            source = kickedPlayer.netId,
            color = kickColor,
            options = {
                codeblock = false
            }
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

```lua title="บรรทัดที่ 47"
function Logger.onPlayerIpLimitExceeded(payload)
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'CNS_IpLimitExceeded',
            content = '### ปฏิเสธการเชื่อมต่อเนื่องจากมีผู้เล่นออนไลน์เกินขีดจำกัดจากที่อยู่ IP เดียวกัน',
            fields = {
                { name = 'IP ADDRESS', value = ('```%s```'):format(payload.ipAddress), inline = false },
                { name = 'CONNECTIONS', value = ('```%s/%s```'):format(payload.numConnections, payload.maxConnections), inline = false },
                { name = 'PLAYERS', value = ('```%s```'):format(json.encode(payload.players, { indent = true })), inline = false }
            },
            source = payload.netId,
            color = 1,
            options = {
                codeblock = false
            }
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

```lua title="บรรทัดที่ 69"
function Logger.onPlayerIpReputationBlocked(payload)
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'CNS_IpReputationBlocked',
            content = '### ปฏิเสธการเชื่อมต่อเนื่องจาก IP ไม่ผ่านการตรวจสอบ',
            fields = {
                { name = 'IP ADDRESS', value = ('```%s```'):format(payload.ipAddress), inline = false },
                { name = 'VPN', value = ('```%s```'):format(payload.isVPN and '✔️ Yes' or '❌ No'), inline = true },
                { name = 'PROXY', value = ('```%s```'):format(payload.isProxy and '✔️ Yes' or '❌ No'), inline = true },
                { name = 'COUNTRY', value = ('```%s (%s)```'):format(payload.country or 'Unknown', payload.isoCode or 'Unknown'), inline = false },
                { name = 'RISK', value = payload.riskScore and ('```%d%%```'):format(payload.riskScore) or '```N/A```', inline = true },
                { name = 'CONFIDENCE', value = payload.confidenceScore and ('```%d%%```'):format(payload.confidenceScore) or '```N/A```', inline = true },
                { name = 'BLOCK REASON', value = ('```%s```'):format(payload.blockReason or 'Unknown'), inline = false }
            },
            source = payload.netId,
            color = 1,
            options = {
                codeblock = false
            }
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
        - riskScore: `integer?`
            - คะแนนความเสี่ยง (เฉพาะ [proxycheck.io](../../config/core.md#proxycheck))
        - confidenceScore: `integer?`
            - คะแนนความมั่นใจ (เฉพาะ [proxycheck.io](../../config/core.md#proxycheck))

:::tip

ฟังก์ชันนี้ส่งข้อมูลไปยัง [**azael_dc-serverlogs**](../../../azael_dc-serverlogs/index.md) โดยใช้ Event Name: `CNS_IpReputationBlocked`

:::

### onPlayerBypassedRules

ทำงานเมื่อผู้เล่นมีสิทธิ์ข้ามกฎการเชื่อมต่อบางอย่าง

```lua title="บรรทัดที่ 95"
function Logger.onPlayerBypassedRules(payload)
    local fields <const> = {}

    for i, v in ipairs(payload.bypassedRules) do
        local rule <const> = v.rule:gsub('^bypass.', ''):upper()
        local identifier <const> = (v.identifier or v.ipAddress) or 'N/A'

        fields[i] = {
            name = ('BYPASSED RULE: `%s`'):format(rule),
            value = ('```%s```'):format(identifier),
            inline = false
        }
    end

    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'CNS_BypassRules',
            content = ('### ผู้เล่นข้ามกฎการเชื่อมต่อ `%d` รายการ'):format(#payload.bypassedRules),
            fields = fields,
            source = payload.netId,
            color = 9,
            options = {
                codeblock = false
            }
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

```lua title="บรรทัดที่ 126"
function Logger.onCommandExecuted(payload)
    local invokerType <const> = payload.type
    local invoker <const> = payload.invoker
    local data <const> = payload.data
    local command <const> = data.command
    local success <const> = data.success
    local response <const> = data.response

    local invokerInfo <const> = (invokerType == 'console')
        and (invoker.player.netId > 0 and ('Player ID: %d'):format(invoker.player.netId) or 'Server Console')
        or invoker.resource

    local resultColor <const> = success and 2 or 1
    local resultText <const> = success and '✔️ Success' or '❌ Failed'

    local fields <const> = {
        { name = 'COMMAND', value = ('```%s```'):format(command.raw), inline = false },
        { name = 'RESULT', value = ('```%s```'):format(resultText), inline = true },
        { name = 'INVOKER TYPE', value = ('```%s```'):format(invokerType:upper()), inline = true },
        { name = 'INVOKER', value = ('```%s```'):format(invokerInfo), inline = false }
    }

    if not success and response.message then
        fields[#fields + 1] = {
            name = 'ERROR',
            value = ('```%s```'):format(response.message),
            inline = false
        }
    elseif success and response.identifier then
        fields[#fields + 1] = {
            name = 'IDENTIFIER',
            value = ('```%s```'):format(response.identifier),
            inline = false
        }

        if response.bypassTypes then
            fields[#fields + 1] = {
                name = 'BYPASS TYPES',
                value = '```' .. table.concat(response.bypassTypes, '``` ```') .. '```',
                inline = false
            }
        end
    end

    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'CNS_CommandExecuted',
            content = ('### คำสั่ง `%s` ถูกดำเนินการ'):format(command.name),
            fields = fields,
            source = (invokerType == 'console' and invoker.player.netId > 0) and invoker.player.netId or 0,
            color = resultColor,
            options = {
                codeblock = false
            }
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
