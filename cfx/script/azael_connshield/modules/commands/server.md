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
        ข้อมูลตอบกลับเมื่อใช้คำสั่งสำเร็จ คุณสามารถดูรายละเอียดได้ที่ [**respHandler**](./server.md#resphandler)
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

```lua title="บรรทัดที่ 15"
function Commands.sendClientMessage(client, success, message)
    TriggerClientEvent('chat:addMessage', client, {
        args = { message }
    })
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

### addBypass

ทำงานเมื่อใช้คำสั่ง "[เพิ่มสิทธิ์ข้ามกฎการตรวจสอบ](../../config/command.md#addbypass)" สำเร็จ

```lua title="บรรทัดที่ 46"
function respHandler.addBypass(client, resp)
    local bypassTypes <const> = {}

    for _, bypassType in ipairs(resp.bypassTypes) do
        bypassTypes[#bypassTypes + 1] = ('^2%s^7'):format(bypassType)
    end

    local message <const> = ("[^2INFO^7] Successfully added bypass for identifier '^5%s^7'\n[^2INFO^7] Bypass Types: %s")
        :format(resp.identifier, table.concat(bypassTypes, ', '))

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
            - ตัวระบุของผู้เล่น
        - bypassTypes: `string[]`
            - ประเภทของ bypass ที่ถูกเพิ่ม

### removeBypass

ทำงานเมื่อใช้คำสั่ง "[ลบสิทธิ์ข้ามกฎการตรวจสอบ](../../config/command.md#removebypass)" สำเร็จ

```lua title="บรรทัดที่ 63"
function respHandler.removeBypass(client, resp)
    local bypassTypes <const> = {}

    for _, bypassType in ipairs(resp.bypassTypes) do
        bypassTypes[#bypassTypes + 1] = ('^1%s^7'):format(bypassType)
    end

    local message <const> = ("[^2INFO^7] Successfully removed bypass for identifier '^5%s^7'\n[^2INFO^7] Removed Bypass Types: %s")
        :format(resp.identifier, table.concat(bypassTypes, ', '))

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
            - ตัวระบุของผู้เล่น
        - bypassTypes: `string[]`
            - ประเภทของ bypass ที่ถูกลบออก
