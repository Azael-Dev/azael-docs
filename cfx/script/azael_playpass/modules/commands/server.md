---
sidebar_label: Server
---

# Commands (Server-side)

## Commands

### onExecuted

ทำงานเมื่อดำเนินการใช้คำสั่งเสร็จสิ้นแล้ว

```lua title="บรรทัดที่ 22"
function Commands.onExecuted(source, command, success, response)
    local client <const> = (source > 0 and source or nil)
    
    if success then
        return respHandler[command.key](client, response)
    elseif client then
        return Commands.sendClientMessage(client, false, ("Failed to execute command '^3%s^7': ^1%s^7."):format(command.raw, response.message))
    end
    
    print(("[^1ERROR^7] Failed to execute command '^3%s^7': ^1%s^7."):format(command.raw, response.message))
end
```

#### Parameters

- source: `integer`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่นที่ใช้คำสั่ง หรือ `0` หากใช้คำสั่งที่ Server Console
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
        ข้อมูลตอบกลับเมื่อใช้คำสั่งสำเร็จ คุณสามารถดูรายละเอียดได้ที่ [**respHandler**](../commands/server.md#resphandler)
:::
:::danger Failed
        ข้อมูลตอบกลับเมื่อใช้คำสั่งล้มเหลว
        | Field                 | Type                          | Description
        |-----------------------|-------------------------------|-------------------------------
        | `type`                | `string`                      | ประเภทของข้อผิดพลาด
        | `message`             | `string`                      | ข้อความของข้อผิดพลาด
:::
    </TabItem>
</Tabs>

### sendClientMessage

ส่งข้อความไปยังฝั่งไคลเอนต์เมื่อใช้คำสั่งเสร็จสิ้นแล้ว

```lua title="บรรทัดที่ 38"
function Commands.sendClientMessage(client, success, message)
    if success then
        return TriggerClientEvent('chat:addMessage', client, { multiline = true, color = { 0, 255, 0 }, args = { '»', message } })
    end

    TriggerClientEvent('chat:addMessage', client, { multiline = true, color = { 255, 0, 0 }, args = { '»', message } })
end
```

#### Parameters

- client: `integer`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่นที่ใช้คำสั่ง
- success: `boolean`
    - สถานะการใช้งานคำสั่ง
- message: `string`
    - ข้อความตอบกลับจากการใช้คำสั่งที่จะส่งไปยังฝั่ง Client

## respHandler

จัดการข้อมูลการตอบกลับเมื่อใช้คำสั่งสำเร็จ โดยจะถูกเรียกใช้งานจากฟังก์ชัน [onExecuted](./server.md#onexecuted)

### getUser

ทำงานเมื่อใช้คำสั่ง "[รับข้อมูลผู้ใช้งาน](../../config/command.md#getuser)" สำเร็จ

```lua title="บรรทัดที่ 83"
function respHandler.getUser(client, resp)
    local message <const> = ("[^2INFO^7] Successfully retrieved data for identifier '^5%s^7': %s"):format(resp.identifier, json.encode(resp.data, { indent = true }))
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุของผู้เล่น](../../config/core.md#identifiertype)
        - data: `table<{ [key]: any }>`
            - [ข้อมูลของผู้เล่น](../database/server.md#getplayerdata-returns)

### addUser

ทำงานเมื่อใช้คำสั่ง "[เพิ่มข้อมูลผู้ใช้งาน](../../config/command.md#adduser)" สำเร็จ

```lua title="บรรทัดที่ 130"
function respHandler.addUser(client, resp)
    local message <const> = resp.data.bound_id 
        and ("[^2INFO^7] Successfully added identifier '^5%s^7' and bound ID '^5%s^7' to the database"):format(resp.identifier, resp.data.bound_id)
        or ("[^2INFO^7] Successfully added identifier '^5%s^7' to the database"):format(resp.identifier)
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุของผู้เล่น](../../config/core.md#identifiertype)
        - data: `table<{ [key]: any }>`
            - [ข้อมูลของผู้เล่น](../database/server.md#getplayerdata-returns)

### deleteUser

ทำงานเมื่อใช้คำสั่ง "[ลบข้อมูลผู้ใช้งาน](../../config/command.md#deleteuser)" สำเร็จ

```lua title="บรรทัดที่ 179"
function respHandler.deleteUser(client, resp)
    local message <const> = ("[^2INFO^7] Successfully deleted data for identifier '^5%s^7' from the database"):format(resp.identifier)
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุของผู้เล่น](../../config/core.md#identifiertype)
        - data: `table<{ [key]: any }>`
            - [ข้อมูลของผู้เล่น](../database/server.md#getplayerdata-returns)

### getBanInfo

ทำงานเมื่อใช้คำสั่ง "[รับข้อมูลการถูกแบน](../../config/command.md#getbaninfo)" สำเร็จ

```lua title="บรรทัดที่ 206"
function respHandler.getBanInfo(client, resp)
    local message <const> = ("[^2INFO^7] Identifier: ^5%s^7\n[^2INFO^7] Bound ID: %s\n[^2INFO^7] Associated ID: %s\n[^2INFO^7] Ban Type: %s\n[^2INFO^7] Ban Reason: %s\n[^2INFO^7] Ban Start: %s\n[^2INFO^7] Ban End: %s")
        :format(resp.identifier, 
            (resp.boundId and '^5' .. resp.boundId .. '^7' or 'None'),
            (resp.banDetails.associated_id and '^3' .. resp.banDetails.associated_id .. '^7' or 'None'),
            (resp.banDetails.type == 'temporary' and '^3Temporary^7' or '^1Permanent^7'),
            '^6' .. resp.banDetails.reason .. '^7',
            '^3' .. resp.banDetails.start_datetime .. '^7',
            (resp.banDetails.end_datetime and '^2' .. resp.banDetails.end_datetime .. '^7' or 'None')
        )
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุของผู้เล่น](../../config/core.md#identifiertype)
        - boundId: `string` | `nil`
            - [ตัวระบุที่ผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype)
        - banHwids: `table<{ [index]: string }>` | `nil`
            - ข้อมูล [HWIDs](../database/server.md#json-structure) ที่ถูกแบน
        - banDetails: `table<{ [key]: any }>`
            - ข้อมูล[การถูกแบน](../database/server.md#json-structure)ของผู้เล่น

### banUser

ทำงานเมื่อใช้คำสั่ง "[แบนผู้ใช้ถาวรหรือชั่วคราว](../../config/command.md#banuser)" สำเร็จ

```lua title="บรรทัดที่ 242"
function respHandler.banUser(client, resp)
    local message <const> = resp.banDays 
        and ("[^2INFO^7] Successfully banned identifier '^5%s^7' for ^3%d^7 days"):format(resp.identifier, resp.banDays) 
        or ("[^2INFO^7] Successfully permanently banned identifier '^5%s^7'"):format(resp.identifier)
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุของผู้เล่น](../../config/core.md#identifiertype)
        - boundId: `string` | `nil`
            - [ตัวระบุที่ผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype)
        - banDays: `integer` | `nil`
            - จำนวนวันที่ถูกแบนชั่วคราว หรือ `nil` หากเป็นการแบนถาวร
        - banHwids: `table<{ [index]: string }>` | `nil`
            - ข้อมูล [HWIDs](../database/server.md#json-structure) ที่ถูกแบน
        - banDetails: `table<{ [key]: any }>`
            - ข้อมูล[การถูกแบน](../database/server.md#json-structure)ของผู้เล่น

### unbanUser

ทำงานเมื่อใช้คำสั่ง "[ยกเลิกแบนผู้ใช้](../../config/command.md#unbanuser)" สำเร็จ

```lua title="บรรทัดที่ 272"
function respHandler.unbanUser(client, resp)
    local message <const> = ("[^2INFO^7] Successfully unbanned identifier '^5%s^7' by '^3%s^7'"):format(resp.identifier, (resp.unbanBy or 'Unknown'))
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุของผู้เล่น](../../config/core.md#identifiertype)
        - boundId: `string` | `nil`
            - [ตัวระบุที่ผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype)
        - unbanBy: `string` | `nil`
            - ยกเลิกการแบนโดย
        - banHwids: `table<{ [index]: string }>` | `nil`
            - ข้อมูล [HWIDs](../database/server.md#json-structure) ที่ถูกแบน
        - banDetails: `table<{ [key]: any }>`
            - ข้อมูล[การถูกแบน](../database/server.md#json-structure)ของผู้เล่น

### setUserRole

ทำงานเมื่อใช้คำสั่ง "[กำหนดบทบาทของผู้ใช้](../../config/command.md#setuserrole)" สำเร็จ

```lua title="บรรทัดที่ 295"
function respHandler.setUserRole(client, resp)
    local message <const> = ("[^2INFO^7] Successfully assigned role '^2%s^7' (ID: ^2%d^7) to identifier '^5%s^7'."):format(resp.newRole.name, resp.newRole.id, resp.identifier)
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุของผู้เล่น](../../config/core.md#identifiertype)
        - oldRole: `table<{ id: integer, name: string }`
            - ข้อมูล[บทบาท](../../config/setup.md#roles)เก่า
        - newRole: `table<{ id: integer, name: string }`
            - ข้อมูล[บทบาท](../../config/setup.md#roles)ใหม่

### deactivateUser

ทำงานเมื่อใช้คำสั่ง "[ปิดใช้งานบัญชีผู้ใช้](../../config/command.md#reactivateuser)" สำเร็จ

```lua title="บรรทัดที่ 318"
function respHandler.deactivateUser(client, resp)
    local message <const> = ("[^2INFO^7] Successfully deactivated identifier '^5%s^7' in the database"):format(resp.identifier)
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุของผู้เล่น](../../config/core.md#identifiertype)
        - oldStatus: `table<{ id: integer, name: string }`
            - ข้อมูล[สถานะ](../../config/setup.md#status)เก่า
        - newStatus: `table<{ id: integer, name: string }`
            - ข้อมูล[สถานะ](../../config/setup.md#status)ใหม่

### reactivateUser

ทำงานเมื่อใช้คำสั่ง "[เปิดใช้งานบัญชีผู้ใช้อีกครั้ง](../../config/command.md#reactivateuser)" สำเร็จ (เป็นการยกเลิกสถานะ [inactivePlayers](../../config/core.md#inactiveplayers))

```lua title="บรรทัดที่ 341"
function respHandler.reactivateUser(client, resp)
    local message <const> = ("[^2INFO^7] Successfully reactivated identifier '^5%s^7' in the database"):format(resp.identifier)
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุของผู้เล่น](../../config/core.md#identifiertype)
        - oldStatus: `table<{ id: integer, name: string }`
            - ข้อมูล[สถานะ](../../config/setup.md#status)เก่า
        - newStatus: `table<{ id: integer, name: string }`
            - ข้อมูล[สถานะ](../../config/setup.md#status)ใหม่

### setNewIdentifier

ทำงานเมื่อใช้คำสั่ง "[กำหนดตัวระบุให้ผู้ใช้ใหม่](../../config/command.md#setnewidentifier)" สำเร็จ

```lua title="บรรทัดที่ 357"
function respHandler.setNewIdentifier(client, resp)
    local message <const> = ("[^2INFO^7] Successfully updated identifier from '^3%s^7' to '^2%s^7' in the database"):format(resp.identifier, resp.newIdentifier)
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุเก่า](../../config/core.md#identifiertype)ของผู้เล่น
        - newIdentifier: `string`
            - [ตัวระบุใหม่](../../config/core.md#identifiertype)ของผู้เล่น

### resetBindIdentifier

ทำงานเมื่อใช้คำสั่ง "[รีเซ็ตตัวระบุที่ถูกผูกไว้ของผู้ใช้](../../config/command.md#resetbindidentifier)" สำเร็จ

```lua title="บรรทัดที่ 373"
function respHandler.resetBindIdentifier(client, resp)
    local message <const> = ("[^2INFO^7] Successfully reset bound ID for identifier '^5%s^7' in the database"):format(resp.identifier)
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุของผู้เล่น](../../config/core.md#identifiertype)
        - lastBoundId: `string`
            - [ตัวระบุที่ผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype)ก่อนที่จะถูกรีเซ็ต

### resetHwids

ทำงานเมื่อใช้คำสั่ง ["รีเซ็ต HWIDs ของผู้ใช้](../../config/command.md#resethwids)" สำเร็จ

```lua title="บรรทัดที่ 391"
function respHandler.resetHwids(client, resp)
    local message <const> = ("[^2INFO^7] Successfully reset HWIDs for identifier '^5%s^7' in the database"):format(resp.identifier)
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุของผู้เล่น](../../config/core.md#identifiertype)
        - lastHwids: `table<{ [index]: string }>` | `nil`
            - ข้อมูล [HWIDs](../database/server.md#json-structure) ล่าสุดของผู้เล่นก่อนที่จะถูกรีเซ็ต

### getPoints

ทำงานเมื่อใช้คำสั่ง "[รับพอยท์ของผู้ใช้](../../config/command.md#getpoints)" สำเร็จ

```lua title="บรรทัดที่ 418"
function respHandler.getPoints(client, resp)
    local indexedData <const> = {}
    
    if resp.data?.temporary then
        for i, v in ipairs(resp.data.temporary) do
            indexedData[#indexedData + 1] = ("[^2INFO^7] Index: ^3%d^7 | Value: ^5%d^7 | Expiry: ^1%s^7"):format(i, v.value, v.expiry_datetime)
        end
    end
    
    local message <const> = ("[^2INFO^7] Points for identifier '^5%s^7'\n[^2INFO^7] Total Points: ^2%d^7\n[^2INFO^7] Permanent Points: ^5%d^7\n[^2INFO^7] Temporary Points: ^5%d^7\n%s")
        :format(resp.identifier, resp.totalPoints, resp.permPoints, resp.tempPoints, (next(indexedData) and table.concat(indexedData, '\n') or ''))
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุของผู้เล่น](../../config/core.md#identifiertype)
        - totalPoints: `integer`
            - จำนวนคิวพ้อยท์ทั้งหมด
        - permPoints: `integer`
            - จำนวนคิวพ้อยท์ถาวร
        - tempPoints: `integer`
            - จำนวนคิวพ้อยท์ชั่วคราว (แบบมีวันหมดอายุ)
        - data: `table<{ [key]: any }>` | `nil`
            - ข้อมูล[คิวพ้อยท์](../database/server.md#json-structure)ของผู้เล่น

### addPoints

ทำงานเมื่อใช้คำสั่ง "[เพิ่มพอยท์ให้ผู้ใช้](../../config/command.md#addpoints)" สำเร็จ

```lua title="บรรทัดที่ 455"
function respHandler.addPoints(client, resp)
    local message <const> = resp.expirationDays 
        and ("[^2INFO^7] Successfully added ^2%d^7 points with an expiration of ^3%d^7 days for identifier '^5%s^7' (Prev Points: ^3%d^7, New Points: ^2%d^7)")
            :format(resp.addPoints, resp.expirationDays, resp.identifier, resp.prevPoints, resp.newPoints)
        or ("[^2INFO^7] Successfully added ^2%d^7 points without expiration for identifier '^5%s^7' (Prev Points: ^3%d^7, New Points: ^2%d^7)")
            :format(resp.addPoints, resp.identifier, resp.prevPoints, resp.newPoints)
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุของผู้เล่น](../../config/core.md#identifiertype)
        - addPoints: `integer`
            - จำนวนคิวพ้อยท์ที่ถูกเพิ่ม
        - expirationDays: `integer` | `nil`
            - จำนวนวันหมดอายุของคิวพ้อยท์แบบชั่วคราว หรือ `nil` หากเป็นคิวพ้อยท์แบบถาวร (ไม่มีวันหมดอายุ)
        - prevPoints: `integer`
            - จำนวนคิวพ้อยท์ก่อนที่จะเพิ่ม
        - newPoints: `integer`
            - จำนวนคิวพ้อยท์หลังจากถูกเพิ่ม
        - data: `table<{ [key]: any }>` | `nil`
            - ข้อมูล[คิวพ้อยท์](../database/server.md#json-structure)ของผู้เล่น

### setPermanentPoints

ทำงานเมื่อใช้คำสั่ง "[กำหนดพ้อยท์แบบไม่มีวันหมดอายุให้ผู้ใช้](../../config/command.md#setpermanentpoints)" สำเร็จ

```lua title="บรรทัดที่ 487"
function respHandler.setPermanentPoints(client, resp)
    local message <const> = ("[^2INFO^7] Permanent points successfully set: ^2%d^7 for identifier '^5%s^7'\n[^2INFO^7] Prev Permanent Points: ^3%d^7\n[^2INFO^7] New Permanent Points: ^2%d^7\n[^2INFO^7] Current Temporary Points: ^5%d^7\n[^2INFO^7] Total Points: ^2%d^7")
        :format(resp.setPermPoints, resp.identifier, resp.prevPermPoints, resp.setPermPoints, resp.tempPoints, resp.totalPoints)
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุของผู้เล่น](../../config/core.md#identifiertype)
        - setPermPoints: `integer`
            - จำนวนคิวพ้อยท์ถาวรที่ถูกกำหนดใหม่ (ไม่มีวันหมดอายุ)
        - prevPermPoints: `integer`
            - จำนวนคิวพ้อยท์ถาวรก่อนถูกกำหนดใหม่ (จำนวนเก่า)
        - tempPoints: `integer`
            - จำนวนคิวพ้อยท์ชั่วคราว (แบบมีวันหมดอายุ)
        - totalPoints: `integer`
            - จำนวนคิวพ้อยท์ทั้งหมด (หลังถูกกำหนดใหม่)
        - data: `table<{ [key]: any }>` | `nil`
            - ข้อมูล[คิวพ้อยท์](../database/server.md#json-structure)ของผู้เล่น

### deleteTemporaryPoints

ทำงานเมื่อใช้คำสั่ง "[ลบพ้อยท์แบบมีวันหมดอายุของผู้ใช้](../../config/command.md#deletetemporarypoints)" สำเร็จ

```lua title="บรรทัดที่ 519"
function respHandler.deleteTemporaryPoints(client, resp)
    local message <const> = ("[^2INFO^7] Successfully deleted ^1%d^7 temporary points from index ^3%d^7 for identifier '^5%s^7'\n[^2INFO^7] Prev Temporary Points: ^3%d^7\n[^2INFO^7] Remaining Temporary Points: ^2%d^7\n[^2INFO^7] Current Permanent Points: ^5%d^7\n[^2INFO^7] Current Total Points: ^2%d^7")
        :format(resp.removedData.value, resp.removedIndex, resp.identifier, (resp.tempPoints + resp.removedData.value), resp.tempPoints, resp.permPoints, resp.totalPoints)
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุของผู้เล่น](../../config/core.md#identifiertype)
        - removedIndex: `integer`
            - หมายเลข index ของตารางที่ถูกลบข้อมูลคิวพ้อยท์ชั่วคราวออก (แบบมีวันหมดอายุ)
        - removedData: `table<{ value: integer, expiry_datetime: string }>`
            - ข้อมูลคิวพ้อยท์ชั่วคราวออกที่ถูกลบออก
         - tempPoints: `integer`
            - จำนวนคิวพ้อยท์ชั่วคราวคงเหลือ
        - totalPoints: `integer`
            - จำนวนคิวพ้อยท์คงเหลือทั้งหมด
        - data: `table<{ [key]: any }>` | `nil`
            - ข้อมูล[คิวพ้อยท์](../database/server.md#json-structure)ของผู้เล่น หลังจากถูกลบ

### purgePoints

ทำงานเมื่อใช้คำสั่ง "[ลบพ้อยท์ทั้งหมดของผู้ใช้](../../config/command.md#purgepoints)" สำเร็จ

```lua title="บรรทัดที่ 544"
function respHandler.purgePoints(client, resp)
    local message <const> = ("[^2INFO^7] Successfully purged points for identifier '^5%s^7'\n[^2INFO^7] Total Points Removed: ^1%d^7\n[^2INFO^7] Permanent Points Removed: ^1%d^7\n[^2INFO^7] Temporary Points Removed: ^1%d^7\n[^2INFO^7] Data Before Purge: %s")
        :format(resp.identifier, resp.totalPoints, resp.permPoints, resp.tempPoints, json.encode(resp.data, { indent = true }))
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุของผู้เล่น](../../config/core.md#identifiertype)
        - data: `table<{ [key]: any }>`
            - ข้อมูล[คิวพ้อยท์](../database/server.md#json-structure)ของผู้เล่น ก่อนถูกลบข้อมูล

### getAirtime

ทำงานเมื่อใช้คำสั่ง "[รับเวลาออนไลน์ที่เหลือของผู้ใช้](../../config/command.md#getairtime)" สำเร็จ

```lua title="บรรทัดที่ 561"
function respHandler.getAirtime(client, resp)
    local message <const> = ("[^2INFO^7] Successfully retrieved remaining airtime for identifier '^5%s^7'\n[^2INFO^7] Remaining Airtime: ^2%d^7 seconds"):format(resp.identifier, resp.numAirtime)
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุของผู้เล่น](../../config/core.md#identifiertype)
        - numAirtime: `integer`
            - จำนวน[แอร์ไทม์คงเหลือ](../../config/core.md#airtimeserver)ของผู้เล่น

### setAirtime

ทำงานเมื่อใช้คำสั่ง "[กำหนดเวลาออนไลน์ให้ผู้ใช้](../../config/command.md#setairtime)" สำเร็จ

```lua title="บรรทัดที่ 578"
function respHandler.setAirtime(client, resp)
    local message <const> = ("[^2INFO^7] Successfully set ^3%d^7 seconds of airtime for identifier '^5%s^7'\n[^2INFO^7] Previous Airtime: ^3%d^7 seconds\n[^2INFO^7] Current Airtime: ^2%d^7 seconds")
        :format(resp.newAirtime, resp.identifier, resp.oldAirtime, resp.newAirtime)
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุของผู้เล่น](../../config/core.md#identifiertype)
        - oldAirtime: `integer`
            - จำนวน[แอร์ไทม์คงเหลือ](../../config/core.md#airtimeserver)ก่อนที่จะถูกกำหนดใหม่
        - newAirtime: `integer`
            - จำนวน[แอร์ไทม์คงเหลือ](../../config/core.md#airtimeserver)หลังจากถูกกำหนดใหม่

### addAirtime

ทำงานเมื่อใช้คำสั่ง "[เพิ่มเวลาออนไลน์ให้ผู้ใช้](../../config/command.md#addairtime)" สำเร็จ

```lua title="บรรทัดที่ 597"
function respHandler.addAirtime(client, resp)
    local message <const> = ("[^2INFO^7] Successfully added ^2%d^7 seconds of airtime for identifier '^5%s^7'\n[^2INFO^7] Previous Airtime: ^3%d^7 seconds\n[^2INFO^7] Current Airtime: ^2%d^7 seconds")
        :format(resp.addAirtime, resp.identifier, resp.oldAirtime, resp.newAirtime)
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุของผู้เล่น](../../config/core.md#identifiertype)
        - addAirtime: `integer`
            - จำนวน[แอร์ไทม์](../../config/core.md#airtimeserver)ที่จะเพิ่ม
        - oldAirtime: `integer`
            - จำนวน[แอร์ไทม์คงเหลือ](../../config/core.md#airtimeserver)ก่อนที่จะถูกเพิ่ม
        - newAirtime: `integer`
            - จำนวน[แอร์ไทม์คงเหลือ](../../config/core.md#airtimeserver)หลังจากถูกเพิ่ม

### removeAirtime

ทำงานเมื่อใช้คำสั่ง "[ลดเวลาออนไลน์ของผู้ใช้](../../config/command.md#removeairtime)" สำเร็จ

```lua title="บรรทัดที่ 616"
function respHandler.removeAirtime(client, resp)
    local message <const> = ("[^2INFO^7] Successfully removed ^1%d^7 seconds of airtime for identifier '^5%s^7'\n[^2INFO^7] Previous Airtime: ^3%d^7 seconds\n[^2INFO^7] Current Airtime: ^2%d^7 seconds")
        :format(resp.removeAirtime, resp.identifier, resp.oldAirtime, resp.newAirtime)
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุของผู้เล่น](../../config/core.md#identifiertype)
        - removeAirtime: `integer`
            - จำนวน[แอร์ไทม์](../../config/core.md#airtimeserver)ที่จะลบ
        - oldAirtime: `integer`
            - จำนวน[แอร์ไทม์คงเหลือ](../../config/core.md#airtimeserver)ก่อนที่จะลบ
        - newAirtime: `integer`
            - จำนวน[แอร์ไทม์คงเหลือ](../../config/core.md#airtimeserver)หลังจากถูกลบ

### clearPlayerCache

ทำงานเมื่อใช้คำสั่ง "[ล้างแคชข้อมูลผู้เล่น](../../config/command.md#clearplayercache)" สำเร็จ

```lua title="บรรทัดที่ 630"
function respHandler.clearPlayerCache(client, resp)
    local message <const> = ("[^2INFO^7] Successfully cleared player cache for identifier '^5%s^7'"):format(resp.identifier)
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุของผู้เล่น](../../config/core.md#identifiertype)

### purgeQueue

ทำงานเมื่อใช้คำสั่ง "[ล้างคิวผู้เล่นทั้งหมดที่รอเข้าเซิร์ฟเวอร์](../../config/command.md#purgequeue)" สำเร็จ

```lua title="บรรทัดที่ 643"
function respHandler.purgeQueue(client, resp)
    local message <const> = ("[^2INFO^7] Successfully purged the queue (Removed ^3%d^7 players)"):format(resp.numPurged)
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - numPurged: `integer`
            - จำนวนผู้เล่นที่ถูกลบออกจากคิวการเข้าร่วมเซิร์ฟเวอร์

### addQueueBypass

ทำงานเมื่อใช้คำสั่ง "[เพิ่มสิทธิ์การข้ามคิวให้กับผู้เล่น](../../config/command.md#addqueuebypass)" สำเร็จ

```lua title="บรรทัดที่ 656"
function respHandler.addQueueBypass(client, resp)
    local message <const> = ("[^2INFO^7] Successfully added queue bypass for identifier '^5%s^7' (Timeout: ^3%d^7 minutes)")
        :format(resp.identifier, resp.timeoutMinutes)
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุของผู้เล่น](../../config/core.md#identifiertype)
        - timeoutMinutes: `integer`
            - ระยะเวลาสูงสุดที่ผู้เล่นต้องเข้าร่วมเซิร์ฟเวอร์ก่อนที่ระบบจะถือว่าหมดเวลา (หน่วยเป็น **นาที**)

### getMyInfo

ทำงานเมื่อใช้คำสั่ง "[รับข้อมูลส่วนตัวของผู้เล่น](../../config/command.md#getmyinfo)" สำเร็จ

```lua title="บรรทัดที่ 699"
function respHandler.getMyInfo(client, resp)
    local message <const> = ("[^2INFO^7] User Role: ^2%s^7\n[^2INFO^7] Airtime Left: ^3%s^7\n[^2INFO^7] Total Points: ^2%d^7\n[^2INFO^7] Permanent Points: ^5%d^7\n[^2INFO^7] Temporary Points: ^3%d^7")
        :format(resp.role.name:gsub('^%l', string.upper), resp.airtimeLeft, resp.queuePoints.total, resp.queuePoints.permanent, resp.queuePoints.temporary)
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง
        - identifier: `string`
            - [ตัวระบุของผู้เล่น](../../config/core.md#identifiertype)
        - [ข้อมูลของผู้เล่น](../database/server.md#getplayerdata-returns)

### getQueueInfo

ทำงานเมื่อใช้คำสั่ง "[รับข้อมูลเกี่ยวกับระบบคิว](../../config/command.md#getqueueinfo)" สำเร็จ

```lua title="บรรทัดที่ 722"
function respHandler.getQueueInfo(client, resp)
    local message <const> = ('[^2INFO^7] Queue Status: %s\n[^2INFO^7] Max Queue Size: ^3%d^7\n[^2INFO^7] Players in Queue: ^3%d^7\n[^2INFO^7] Players Downloading: ^3%d^7\n[^2INFO^7] Players Reconnectable (Crashed): ^3%d^7\n[^2INFO^7] Players Online: ^3%d^7\n[^2INFO^7] Total Used Slots: ^5%d^7/^5%d^7')
        :format((resp.isQueueFull and '^1Full^7' or '^2Not Full^7'), resp.maxQueueSize, resp.numQueues, resp.numDownloads, resp.numCrashes, resp.numPlayers, resp.numUsedSlots, resp.maxServerSlots)
    
    if client then
        return Commands.sendClientMessage(client, true, message)
    end
    
    print(message)
end
```

#### Parameters

- client: `integer` | `nil`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น หรือ `nil` หากใช้คำสั่งที่ Server Console
- resp: `table<{ [key]: any }>`
    - isQueueFull: `boolean`
        - ตอบกลับ `true` หากคิวเต็ม
    - maxServerSlots: `integer`
        - จำนวนสล็อตเซิร์ฟเวอร์สูงสุด
    - maxQueueSize: `integer`
        - จำนวนคิวสูงสุดที่รองรับ
    - numQueues: `integer`
        - จำนวนผู้เล่นที่รออยู่ในคิว
    - numDownloads: `integer`
        - จำนวนผู้เล่นที่กำลัง[ดาวน์โหลดทรัพยากร](../../config/queue.md#resourcedownload)ของเซิร์ฟเวอร์ (ก่อนเข้าหน้า Loading Screen)
    - numCrashes: `integer`
        - จำนวนผู้เล่นที่เกิดการขัดข้องและ[มีสิทธิ์เข้าร่วมใหม่โดยไม่ต้องรอคิว](../../config/queue.md#rejoinoncrashes)
    - numPlayers: `integer`
        - จำนวนผู้เล่นออนไลน์อยู่ในเซิร์ฟเวอร์
    - numUsedSlots: `integer`
        - จำนวนสล็อตเซิร์ฟเวอร์ที่ถูกใช้งาน (`numPlayers` + `numDownloads` + `numCrashes`)


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
