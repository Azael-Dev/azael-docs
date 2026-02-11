---
sidebar_label: Commands
---

# Commands

รายการคำสั่งทั้งหมดที่สามารถใช้งานได้ใน [**azael_connshield**](./index.md)

## Admin Commands

รายการคำสั่งทั้งหมดของ [**ผู้ดูแลระบบ**](https://en.wikipedia.org/wiki/Wikipedia:Administrators)

### เพิ่มสิทธิ์ข้ามกฎการตรวจสอบ {#addbypass}

คำสั่ง [เพิ่มสิทธิ์ข้ามกฎการตรวจสอบ](./config/command.md#addbypass)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> addbypass <identifier> <options>
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```bash
        cshield addbypass steam:1100001332e7216 all
        ```
:::tip
    ตัวเลือก `options` ที่รองรับ: `all` (ข้ามทั้งหมด), `id` (ข้ามตัวระบุซ้ำ), `ip` (ข้ามการป้องกัน IP)
    หากไม่ระบุ `options` ค่าเริ่มต้นจะเป็น `all`
:::
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`addbypass`](./config/command.md#addbypass)
- identifier: `string`
    - ตัวระบุของผู้เล่น โดยต้องมีคำนำหน้าตรงกับประเภท [identifierUniqueness.provider](./config/core.md#identifieruniqueness) เช่น `steam:1100001332e7216`
- options: `string` | `nil`
    - ประเภทการข้ามที่ต้องการเพิ่ม
        - `all` — ข้ามการตรวจสอบทั้งหมด (Identifier Uniqueness + IP Protections)
        - `id` — ข้ามการตรวจสอบ Identifier Uniqueness เท่านั้น
        - `ip` — ข้ามการตรวจสอบ IP Protections เท่านั้น

#### Returns

- [ข้อมูลสิทธิ์ที่ถูกเพิ่ม](./modules/commands/server.md#addbypass) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

### ลบสิทธิ์ข้ามกฎการตรวจสอบ {#removebypass}

คำสั่ง [ลบสิทธิ์ข้ามกฎการตรวจสอบ](./config/command.md#removebypass)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> removebypass <identifier>
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```bash
        cshield removebypass steam:1100001332e7216
        ```
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`removebypass`](./config/command.md#removebypass)
- identifier: `string`
    - ตัวระบุของผู้เล่น โดยต้องมีคำนำหน้าตรงกับประเภท [identifierUniqueness.provider](./config/core.md#identifieruniqueness) เช่น `steam:1100001332e7216`

#### Returns

- [ข้อมูลสิทธิ์ที่ถูกลบ](./modules/commands/server.md#removebypass) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว
