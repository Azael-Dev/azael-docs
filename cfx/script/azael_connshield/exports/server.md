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
        exports.azael_connshield:executeCommand(subCommandKey, args)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_connshield:executeCommand('addBypass', { 'steam:1100001332e7216', 'all' })
        
        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print(json.encode(response, { indent = true }))
        ```
    </TabItem>
</Tabs>

#### Arguments

- subCommandKey: `string`
    - คีย์ของ [คำสั่งย่อย](../config/command.md#subcommands) (ดูคีย์ได้ที่ [Subcommand List](./server.md#subcommand-list))
- args: `table<{ [index]: any }>` | `nil`
    - ข้อมูลที่คำสั่งต้องการ

#### Returns {#executecommand-returns}

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
| `addBypass`               | [เพิ่มสิทธิ์ข้ามกฎการตรวจสอบ](../commands.md#addbypass)
| `removeBypass`            | [ลบสิทธิ์ข้ามกฎการตรวจสอบ](../commands.md#removebypass)

## addBypass

เพิ่มสิทธิ์ข้ามกฎการตรวจสอบให้กับผู้เล่น

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_connshield:addBypass(identifier, bypassOptions)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_connshield:addBypass('steam:1100001332e7216', 'all')
        
        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print('Identifier:', response.identifier)
        print('Bypass Types:', json.encode(response.bypassTypes))
        ```
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - ตัวระบุของผู้เล่น โดยต้องมีคำนำหน้าตรงกับประเภท [identifierUniqueness.provider](../config/core.md#identifieruniqueness) เช่น `steam:1100001332e7216`
- bypassOptions: `string` | `nil`
    - ประเภทการข้ามที่ต้องการเพิ่ม (`all`, `id`, `ip`) ค่าเริ่มต้น: `all`

#### Returns

- success: `boolean`
    - สถานะการดำเนินการ
- response: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับ

<details>
  <summary>รายละเอียดข้อมูลตอบกลับ</summary>
:::tip Success
    | Field                 | Type                          | Description
    |-----------------------|-------------------------------|-------------------------------
    | `identifier`          | `string`                      | ตัวระบุผู้เล่น
    | `bypassTypes`         | `string[]`                    | ประเภทของ bypass ที่ถูกเพิ่ม
:::

:::danger Failed
    | Field                 | Type                          | Description
    |-----------------------|-------------------------------|-------------------------------
    | `type`                | `string`                      | ประเภทของข้อผิดพลาด
    | `message`             | `string`                      | ข้อความของข้อผิดพลาด
:::
</details>

## removeBypass

ลบสิทธิ์ข้ามกฎการตรวจสอบของผู้เล่น

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_connshield:removeBypass(identifier, bypassOptions)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local success, response = exports.azael_connshield:removeBypass('steam:1100001332e7216', 'all')
        
        if not success then
            return print('Error type:', response.type, 'Error message:', response.message)
        end

        print('Identifier:', response.identifier)
        print('Removed Bypass Types:', json.encode(response.bypassTypes))
        ```
    </TabItem>
</Tabs>

#### Arguments

- identifier: `string`
    - ตัวระบุของผู้เล่น โดยต้องมีคำนำหน้าตรงกับประเภท [identifierUniqueness.provider](../config/core.md#identifieruniqueness) เช่น `steam:1100001332e7216`
- bypassOptions: `string` | `nil`
    - ประเภทการข้ามที่ต้องการลบ (`all`, `id`, `ip`) ค่าเริ่มต้น: `all`

#### Returns

- success: `boolean`
    - สถานะการดำเนินการ
- response: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับ

<details>
  <summary>รายละเอียดข้อมูลตอบกลับ</summary>
:::tip Success
    | Field                 | Type                          | Description
    |-----------------------|-------------------------------|-------------------------------
    | `identifier`          | `string`                      | ตัวระบุผู้เล่น
    | `bypassTypes`         | `string[]`                    | ประเภทของ bypass ที่ถูกลบออก
:::

:::danger Failed
    | Field                 | Type                          | Description
    |-----------------------|-------------------------------|-------------------------------
    | `type`                | `string`                      | ประเภทของข้อผิดพลาด
    | `message`             | `string`                      | ข้อความของข้อผิดพลาด
:::
</details>

## checkIp

ตรวจสอบความน่าเชื่อถือของที่อยู่ IP

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_connshield:checkIp(ipAddress)
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local result, err = exports.azael_connshield:checkIp('1.2.3.4')
        
        if err then
            return print('Error:', err)
        end

        print('VPN:', result.isVPN)
        print('Proxy:', result.isProxy)
        print('Country:', result.country, '(' .. result.isoCode .. ')')
        print('Blocked:', result.blocked)
        ```
    </TabItem>
</Tabs>

#### Arguments

- ipAddress: `string`
    - ที่อยู่ IP ที่ต้องการตรวจสอบ (เช่น `ip:1.2.3.4` หรือ `1.2.3.4`)

#### Returns

- result: `table` | `nil`
    - ผลลัพธ์การตรวจสอบ

    | Field                 | Type                          | Description
    |-----------------------|-------------------------------|-------------------------------
    | `isVPN`               | `boolean`                     | ตรวจพบว่าเป็น VPN
    | `isProxy`             | `boolean`                     | ตรวจพบว่าเป็น Proxy
    | `country`             | `string?`                     | ประเทศที่ตรวจพบ
    | `isoCode`             | `string?`                     | รหัสประเทศ ISO
    | `riskScore`           | `integer`                     | คะแนนความเสี่ยง
    | `confidenceScore`     | `integer`                     | คะแนนความมั่นใจ
    | `blocked`             | `boolean`                     | ผลลัพธ์ว่าถูกบล็อกหรือไม่
    | `blockReason`         | `string?`                     | เหตุผลที่ถูกบล็อก

- error: `string` | `nil`
    - ข้อความข้อผิดพลาด (ถ้ามี)

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
