---
sidebar_label: Server
---

# Export Functions (Server-side)

ส่งออกฟังก์ชันเพื่อให้สามารถเรียกใช้จากทรัพยากรอื่นได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Client%E2%80%93server_model#Server-side)

## executeCommand

เรียกใช้งาน [คำสั่งต่างๆ](../commands.md) ของทรัพยากรนี้

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:executeCommand(subCommandKey, args)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_playpass:executeCommand('getUser', { '443334508020891658' })
        
        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- subCommandKey: `string`
    - คีย์ของ [คำสั่งย่อย](../config/command.md#subcommands) (ดูคีย์ได้ที่ [Subcommand List](./server.md#subcommand-list))
- args: `table<{ [index]: any }>` | `nil`
    - ข้อมูลที่คำสั่งต้องการ

#### Returns {#execommand-returns}

- success: `boolean`
    - สถานะการใช้งานคำสั่ง
- response: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง

<details>
  <summary>รายละเอียดข้อมูลตอบกลับของคำสั่ง</summary>
:::tip Success
    ข้อมูลตอบกลับเมื่อใช้คำสั่งสำเร็จ คุณสามารถดูรายละเอียดได้ที่ [**respHandler**](../modules/commands/server.md#resphandler)
:::

:::danger Failed
    ข้อมูลตอบกลับเมื่อใช้คำสั่งล้มเหลว
    | Field                 | Type                          | Description
    |-----------------------|-------------------------------|-------------------------------
    | `type`                | `string`                      | ประเภทของข้อผิดพลาด
    | `message`             | `string`                      | ข้อความของข้อผิดพลาด
:::
</details>

#### Subcommand List

| Key                       | Label
|---------------------------|-------------------------------
| `getUser`                 | [รับข้อมูลผู้ใช้](../commands.md#getuser)
| `addUser`                 | [เพิ่มข้อมูลผู้ใช้](../commands.md#adduser)
| `deleteUser`              | [ลบข้อมูลผู้ใช้](../commands.md#deleteuser)
| `getBanInfo`              | [รับข้อมูลแบนผู้ใช้](../commands.md#getbaninfo)
| `banUser`                 | [แบนผู้ใช้ (ชั่วคราว/ถาวร)](../commands.md#banuser)
| `unbanUser`               | [ยกเลิกแบนผู้ใช้](../commands.md#unbanuser)
| `setUserRole`             | [กำหนดบทบาทผู้ใช้](../commands.md#setuserrole)
| `deactivateUser`          | [ปิดใช้งานบัญชีผู้ใช้](../commands.md#deactivateuser)
| `reactivateUser`          | [เปิดใช้งานบัญชีผู้ใช้ (ไม่เล่นนานเกินกำหนด)](../commands.md#reactivateuser)
| `setNewIdentifier`        | [กำหนดตัวระบุใหม่ให้ผู้ใช้](../commands.md#setnewidentifier)
| `resetBindIdentifier`     | [รีเซ็ตตัวระบุที่ผูกไว้ของผู้ใช้](../commands.md#resetbindidentifier)
| `resetHwids`              | [รีเซ็ต HWIDs ผู้ใช้](../commands.md#resethwids)
| `getPoints`               | [รับข้อมูลคิวพอยท์ผู้ใช้](../commands.md#getpoints)
| `addPoints`               | [เพิ่มคิวพอยท์ผู้ใช้](../commands.md#addpoints)
| `setPermanentPoints`      | [กำหนดคิวพ้อยท์ถาวรผู้ใช้](../commands.md#setpermanentpoints)
| `deleteTemporaryPoints`   | [ลบคิวพ้อยท์ชั่วคราวผู้ใช้](../commands.md#deletetemporarypoints)
| `purgePoints`             | [ลบคิวพ้อยท์ทั้งหมดของผู้ใช้](../commands.md#purgepoints)
| `getAirtime`              | [รับแอร์ไทม์คงเหลือผู้ใช้](../commands.md#getairtime)
| `setAirtime`              | [กำหนดแอร์ไทม์ผู้ใช้](../commands.md#getairtime)
| `addAirtime`              | [เพิ่มแอร์ไทม์ผู้ใช้](../commands.md#addairtime)
| `removeAirtime`           | [ลบแอร์ไทม์ผู้ใช้](../commands.md#removeairtime)
| `clearPlayerCache`        | [ล้างแคชข้อมูลผู้เล่น](../commands.md#clearplayercache)
| `purgeQueue`              | [ล้างคิวทั้งหมด](../commands.md#purgequeue)
| `addQueueBypass`          | [เพิ่มสิทธิ์การข้ามคิว](../commands.md#addqueuebypass)
| `getQueueInfo`            | [รับข้อมูลระบบคิว](../commands.md#getqueueinfo)

## getUser

รับข้อมูลผู้ใช้งาน

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:getUser(identifier)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_playpass:getUser('443334508020891658')

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลผู้ใช้งาน](../modules/commands/server.md#getuser) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## addUser

เพิ่มข้อมูลผู้ใช้

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:addUser(identifier, boundId|nil)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_playpass:addUser('discord:443334508020891658', 'steam:11000013d071520')

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้
- boundId: `string` | `nil`
    - [ตัวระบุที่จะถูกผูก](../config/core.md#bindidentifier) เอาไว้กับ [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้
        - ⚠️ ไม่จำเป็นที่จะต้องระบุในส่วนนี้ เนื่องจากระบบจะอัปเดตไปยังฐานข้อมูลโดยอัตโนมัติเมื่อผู้เล่นเชื่อมต่อกับเซิร์ฟเวอร์

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลผู้ใช้งาน](../modules/commands/server.md#adduser) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## deleteUser

ลบข้อมูลผู้ใช้

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:deleteUser(identifier)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_playpass:deleteUser('443334508020891658')

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลผู้ใช้งาน](../modules/commands/server.md#deleteuser) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## getBanInfo

รับข้อมูลแบนผู้ใช้

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:getBanInfo(identifier|banRefId)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        **Ban Ref ID**
        ```lua
        local success, response = exports.azael_playpass:getBanInfo('66555-568s5-26075')

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
        **Identifier**
        ```lua
        local success, response = exports.azael_playpass:getBanInfo('443334508020891658')

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier | banRefId: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้ หรือ รหัสอ้างอิงการถูกแบน

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลการถูกแบน](../modules/commands/server.md#getbaninfo) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## banUser

แบนผู้ใช้ ชั่วคราว หรือ ถาวร

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:banUser(identifier, numDays|0=permanent, reason)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        **Permanent Ban (แบนถาวร)**
        ```lua
        local success, response = exports.azael_playpass:banUser('443334508020891658', 0, 'Banned for repeatedly stealing the last slice of pizza.')

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
        **Temporary Ban (แบนชั่วคราว)**
        ```lua
        local success, response = exports.azael_playpass:banUser('443334508020891658', 90, 'Banned for repeatedly stealing the last slice of pizza.')

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้
- numDays: `integer`
    - จำนวนวันที่ต้องการแบนผู้ใช้ หรือระบุ **`0`** เพื่อแบนผู้ใช้ถาวร
- reason: `string`
    - เหตุผลที่แบนผู้ใช้

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลการถูกแบน](../modules/commands/server.md#banuser) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## unbanUser

ยกเลิกแบนผู้ใช้

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:unbanUser(identifier)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_playpass:unbanUser('443334508020891658')

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลการถูกแบน](../modules/commands/server.md#unbanuser) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## setUserRole

กำหนดบทบาทผู้ใช้

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:setUserRole(identifier, roleId)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_playpass:setUserRole('443334508020891658', 5)

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้
- roleId: `integer`
    - [รหัสของบทบาท](../config/setup.md#roles) ที่ต้องการกำหนดให้ผู้ใช้

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลบทบาทผู้ใช้](../modules/commands/server.md#setuserrole) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## deactivateUser

ปิดใช้งานบัญชีผู้ใช้ ในกรณีกำลังตรวจสอบหรือดำเนินการเกี่ยวกับบัญชีของผู้ใช้อยู่ เพื่อไม่ให้ผู้ใช้สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:deactivateUser(identifier)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_playpass:deactivateUser('443334508020891658')

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลสถานะผู้ใช้](../modules/commands/server.md#reactivateuser) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## reactivateUser

เปิดใช้งานบัญชีผู้ใช้อีกครั้ง หรือ ยกเลิกสถานะการถูกระงับของผู้ใช้ จากสาเหตุไม่เข้าร่วมเซิร์ฟเวอร์นานเกินที่กำหนดใน [inactivePlayers](../config/core.md#inactiveplayers)

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:reactivateUser(identifier)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_playpass:reactivateUser('443334508020891658')

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลสถานะผู้ใช้](../modules/commands/server.md#reactivateuser) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## setNewIdentifier

กำหนดตัวระบุใหม่ให้ผู้ใช้

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:setNewIdentifier(identifier, newIdentifier)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_playpass:setNewIdentifier('443334508020891658', '845951838691393546')

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุเก่า](../config/core.md#identifiertype) ของผู้ใช้
- newIdentifier: `string`
    - [ตัวระบุใหม่](../config/core.md#identifiertype) ของผู้ใช้

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลตัวระบุผู้ใช้](../modules/commands/server.md#setnewidentifier) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## resetBindIdentifier

รีเซ็ตตัวระบุที่ผูกไว้ของผู้ใช้

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:resetBindIdentifier(identifier)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_playpass:resetBindIdentifier('443334508020891658')

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลตัวระบุผู้ใช้](../modules/commands/server.md#resetbindidentifier) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## resetHwids

รีเซ็ต HWIDs ของผู้ใช้

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:resetHwids(identifier)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_playpass:resetHwids('443334508020891658')

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูล HWIDs ผู้ใช้](../modules/commands/server.md#resethwids) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## getPoints

รับข้อมูลคิวพอยท์ผู้ใช้

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:getPoints(identifier)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_playpass:getPoints('443334508020891658')

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลคิวพอยท์ผู้ใช้](../modules/commands/server.md#getpoints) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## addPoints

เพิ่มคิวพอยท์ผู้ใช้

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:addPoints(identifier, numPoints, expirationDays|nil)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        **Permanent Q-Points (คิวพ้อยท์ถาวร ไม่มีวันหมดอายุ)**
        ```lua
        local success, response = exports.azael_playpass:addPoints('443334508020891658', 1000)

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
        **Temporary Q-Points (คิวพ้อยท์ชั่วคราว มีวันหมดอายุ)**
        ```lua
        local success, response = exports.azael_playpass:addPoints('443334508020891658', 1000, 30)

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้
- numPoints: `integer`
    - จำนวนคิวพ้อยท์ที่ต้องการเพิ่มให้ผู้ใช้
- expirationDays: `integer` | `nil`
    - จำนวนวันที่คิวพ้อยท์จะหมดอายุ หรือ ไม่ระบุหากเป็นคิวพ้อยท์แบบถาวร (ไม่มีวันหมดอายุ)

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลคิวพอยท์ผู้ใช้](../modules/commands/server.md#addpoints) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## setPermanentPoints

กำหนดคิวพ้อยท์ถาวรผู้ใช้

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:setPermanentPoints(identifier, numPoints)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_playpass:setPermanentPoints('443334508020891658', 2000)

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้
- numPoints: `integer`
    - จำนวนคิวพ้อยท์ที่ต้องการกำหนดให้ผู้ใช้

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลคิวพอยท์ผู้ใช้](../modules/commands/server.md#setpermanentpoints) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## deleteTemporaryPoints

ลบคิวพ้อยท์ชั่วคราวของผู้ใช้ (คิวพ้อยท์แบบมีวันหมดอายุ)

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:deleteTemporaryPoints(identifier, numIndex)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_playpass:deleteTemporaryPoints('443334508020891658', 2)

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้
- numIndex: `integer`
    - หมายเลข Index ของข้อมูลคิวพ้อยท์ชั่วคราวที่ต้องการลบ
        - 💡 แนะนำให้ใช้ [รับข้อมูลคิวพอยท์ผู้ใช้](./server.md#getpoints) เพื่อรับหมายเลข Index ที่ต้องการลบข้อมูล

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลคิวพอยท์ผู้ใช้](../modules/commands/server.md#deletetemporarypoints) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## purgePoints

ลบคิวพ้อยท์ทั้งหมดของผู้ใช้

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:purgePoints(identifier)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_playpass:purgePoints('443334508020891658')

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลคิวพอยท์ผู้ใช้](../modules/commands/server.md#purgepoints) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## getAirtime

รับแอร์ไทม์คงเหลือผู้ใช้

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:getAirtime(identifier)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_playpass:getAirtime('443334508020891658')

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลแอร์ไทม์ผู้ใช้](../modules/commands/server.md#getairtime) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## setAirtime

กำหนดแอร์ไทม์ผู้ใช้

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:setAirtime(identifier, numSeconds)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_playpass:setAirtime('443334508020891658', 18144000)

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้
- numSeconds: `integer`
    - จำนวนแอร์ไทม์ที่ต้องการกำหนดให้ผู้ใช้ โดยมีหน่วยเป็น **วินาที**
        - `3600` วินาที = 1 ชั่วโมง
        - `86400` วินาที = 1 วัน
        - `604800` วินาที = 7 วัน
        - `18144000` วินาที = 30 วัน

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลแอร์ไทม์ผู้ใช้](../modules/commands/server.md#setairtime) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## addAirtime

เพิ่มแอร์ไทม์ผู้ใช้

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:addAirtime(identifier, numSeconds)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_playpass:addAirtime('443334508020891658', 604800)

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้
- numSeconds: `integer`
    - จำนวนแอร์ไทม์ที่ต้องการเพิ่มให้ผู้ใช้ โดยมีหน่วยเป็น **วินาที**
        - `3600` วินาที = 1 ชั่วโมง
        - `86400` วินาที = 1 วัน
        - `604800` วินาที = 7 วัน
        - `18144000` วินาที = 30 วัน

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลแอร์ไทม์ผู้ใช้](../modules/commands/server.md#addairtime) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## removeAirtime

ลบแอร์ไทม์ผู้ใช้

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:removeAirtime(identifier, numSeconds)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_playpass:removeAirtime('443334508020891658', 86400)

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้
- numSeconds: `integer`
    - จำนวนแอร์ไทม์ที่ต้องการเพิ่มให้ผู้ใช้ โดยมีหน่วยเป็น **วินาที**
        - `3600` วินาที = 1 ชั่วโมง
        - `86400` วินาที = 1 วัน
        - `604800` วินาที = 7 วัน
        - `18144000` วินาที = 30 วัน

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลแอร์ไทม์ผู้ใช้](../modules/commands/server.md#removeairtime) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## clearPlayerCache

ล้างแคชข้อมูลผู้เล่น

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:clearPlayerCache(identifier)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_playpass:clearPlayerCache('443334508020891658')

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลตัวระบุของผู้ใช้](../modules/commands/server.md#clearplayercache) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## purgeQueue

ล้างคิวทั้งหมดที่กำลังรอเข้าร่วมกับเซิร์ฟเวอร์อยู่

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:purgeQueue()
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_playpass:purgeQueue()

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
    </TabItem>
</Tabs>

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลผู้เล่นที่ถูกลบออกจากคิว](../modules/commands/server.md#purgequeue) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## addQueueBypass

เพิ่มสิทธิ์การข้ามคิวเพื่อให้ผู้เล่นสามารถเข้าเซิร์ฟเวอร์ได้ทันที

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:addQueueBypass(identifier, timeoutMinutes|nil)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_playpass:addQueueBypass('443334508020891658')

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้
- timeoutMinutes: `integer` | `nil`
    - ระยะเวลาสูงสุดที่ผู้เล่นต้องเข้าร่วมเซิร์ฟเวอร์ก่อนที่ระบบจะถือว่าหมดเวลา (หน่วยเป็นนาที)
        - กำหนดค่าได้ตั้งแต่ **1** ถึง **30** นาที (หากไม่กำหนด ค่าเริ่มต้นจะหมดเวลาใน **2** นาที)

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลการหมดเวลา](../modules/commands/server.md#addqueuebypass) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

:::tip

หากเซิร์ฟเวอร์ไม่มี Slot ว่าง (เต็ม) ผู้เล่นจะเข้าร่วมคิวและอยู่ลำดับแรกของคิวโดยไม่สนใจ Points ใช้ในกรณีผู้เล่นหลุดออกจากเซิร์ฟแต่มี Story อยู่ และต้องการเข้าร่วมเซิร์ฟเวอร์ใหม่อีกครั้งแบบเร่งด่วน

:::

## getQueueInfo

รับข้อมูลระบบคิวรอเข้าร่วมเซิร์ฟเวอร์

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:getQueueInfo()
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_playpass:getQueueInfo()

        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Returns

- success: `boolean`
    - สถานะการเรียกใช้
- response: `table<{ [key]: any }>`
    - [ข้อมูลเกี่ยวกับระบบคิว](../modules/commands/server.md#getqueueinfo) หากการเรียกใช้สำเร็จ
    - [ข้อมูลข้อผิดพลาด](./server.md#execommand-returns) หากการเรียกใช้ล้มเหลว

## hasInactiveRecord

ผู้ใช้เคยถูกระงับจากสาเหตุไม่เข้าร่วมเซิร์ฟเวอร์นานเกินที่กำหนดใน [inactivePlayers](../config/core.md#inactiveplayers) หรือไม่?

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:hasInactiveRecord(identifier)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local wasInactive, rejoinData = exports.azael_playpass:hasInactiveRecord('443334508020891658')

        if wasInactive then
            print(json.encode(rejoinData, { indent = true }))
        end
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้

#### Returns

- wasInactive: `boolean`
    - สถานะเคยถูกระงับ
- rejoinData: `table<{ timestamp: integer, secondsAgo: integer }>` | `nil`
    - ข้อมูลการเข้าร่วมเซิร์ฟเวอร์หลังถูกยกเลิกสถานะจาก [reactivateUser](./server.md#reactivateuser) หรือใช้คำสั่ง [ยกเลิกระงับผู้ใช้ (ไม่เล่นนานเกินกำหนด)](../commands.md#reactivateuser)
        - timestamp: `integer`
            - เวลาที่เข้าร่วมกับเซิร์ฟเวอร์หรือถูกยกเลิกสถานะครั้งล่าสุด ([Unix time](https://en.wikipedia.org/wiki/Unix_time))
        - secondsAgo: `integer`
            - เข้าร่วมกับเซิร์ฟเวอร์หรือถูกยกเลิกสถานะมาแล้วกี่วินาที


## signalDeferredDone

เรียกใช้เพื่อแจ้งให้ทรัพยากร [`azael_playpass`](../index.md) ทราบว่าการเลื่อนเวลาจากทรัพยากรที่กำหนดใน [awaitedResources](../config/core.md#awaitedresources) ดำเนินการเสร็จแล้ว และให้ดำเนินการขั้นถัดไปต่อได้

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:signalDeferredDone(tempPlayerId)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        AddEventHandler('playerConnecting', function OnPlayerConnecting(name, setKickReason, deferrals)
            local tempPlayerId = source
            
            ...
            
            deferrals.done()
            
            exports.azael_playpass:signalDeferredDone(tempPlayerId)
        end)
        ```
    </TabItem>
</Tabs>

#### Arguments
    - tempPlayerId: `integer`
        - [Temp ID](https://docs.fivem.net/docs/scripting-reference/events/list/playerconnecting/#parameters) ของผู้เล่น  (ไอดีแบบชั่วคราวเมื่อกำลังเชื่อมต่อ)

:::warning

หากไม่มีการเรียกใช้ฟังก์ชันนี้ ก่อน หรือ หลัง การเรียกใช้ [deferrals.done](https://docs.fivem.net/docs/scripting-reference/events/list/playerconnecting/#donefailurereason-string-void) จะรอจนกว่าจะครบเวลา timeout ที่กำหนดไว้ใน [awaitedResources](../config/core.md#awaitedresources) ระบบจึงจะดำเนินการขั้นถัดไปต่อ

:::

## getCachedUserProfile

ดึงข้อมูลโปรไฟล์ผู้ใช้ที่ถูกแคชไว้ในระบบ

:::warning

จำเป็นที่จะต้องเปิดใช้งาน [userProfileCard](../config/core.md#userprofilecard) จึงจะสามารถใช้งานฟังก์ชันส่งออกนี้ได้

:::

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:getCachedUserProfile(identifier)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local userData = exports.azael_playpass:getCachedUserProfile('steam:110000112345678')

        if not userData then
            print('[^1ERROR^7] User profile not found or not cached.')
            return
        end

        print(json.encode(userData, { indent = true }))
        ```
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - [ตัวระบุหลัก](../config/core.md#identifiertype) ของผู้ใช้ (ต้องมีคำนำหน้า เช่น `steam:110000112345678` หรือ `discord:443334508020891658`)

#### Returns

- userData: `table?`
    - ข้อมูลโปรไฟล์ผู้ใช้ที่ถูกแคชไว้ หรือ `nil` หากไม่พบ Provider ที่กำหนดหรือข้อมูลยังไม่ถูกแคช

    **Steam**
    | Key | Type | Description |
    | --- | --- | --- |
    | `id` | `string` | Steam ID ของผู้ใช้ |
    | `hexId` | `string` | Steam Hex ID ของผู้ใช้ |
    | `name` | `string` | ชื่อผู้ใช้ |
    | `avatarUrl` | `string` | URL รูปโปรไฟล์ผู้ใช้ |

    **Discord**
    | Key | Type | Description |
    | --- | --- | --- |
    | `id` | `string` | Discord ID ของผู้ใช้ |
    | `username` | `string` | Discord Username ของผู้ใช้ |
    | `name` | `string` | ชื่อผู้ใช้ |
    | `avatarUrl` | `string` | URL รูปโปรไฟล์ผู้ใช้ |

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
