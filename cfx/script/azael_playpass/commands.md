---
sidebar_label: Commands
---

# Commands

รายการคำสั่งทั้งหมดที่สามารถใช้งานได้ใน [**azael_playpass**](./index.md)

## Admin Commands

รายการคำสั่งทั้งหมดของ [**ผู้ดูแลระบบ**](https://en.wikipedia.org/wiki/Wikipedia:Administrators)

### รับข้อมูลผู้ใช้ {#getuser}

คำสั่ง [รับข้อมูลผู้ใช้งาน](./config/command.md#getuser)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> getuser <identifier>
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```bash
        app getuser 443334508020891658
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`getuser`](./config/command.md#getuser)
- identifier: `string`
    - [ตัวระบุหลัก](./config/core.md#identifiertype) ของผู้ใช้

#### Returns

- [ข้อมูลผู้ใช้งาน](./modules/commands/server.md#getuser) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

### เพิ่มข้อมูลผู้ใช้ {#adduser}

คำสั่ง [เพิ่มข้อมูลผู้ใช้งาน](./config/command.md#adduser)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> adduser <identifier> <bindId|nil>
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```bash
        app adduser discord:443334508020891658 steam:11000013d071520
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`adduser`](./config/command.md#adduser)
- identifier: `string`
    - [ตัวระบุหลัก](./config/core.md#identifiertype) ของผู้ใช้
- boundId: `string` | `nil`
    - [ตัวระบุที่จะถูกผูก](./config/core.md#bindidentifier) เอาไว้กับ [ตัวระบุหลัก](./config/core.md#identifiertype) ของผู้ใช้
        - ⚠️ ไม่จำเป็นที่จะต้องระบุในส่วนนี้ เนื่องจากระบบจะอัปเดตไปยังฐานข้อมูลโดยอัตโนมัติเมื่อผู้เล่นเชื่อมต่อกับเซิร์ฟเวอร์

#### Returns

- [ข้อมูลผู้ใช้งาน](./modules/commands/server.md#adduser) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

### ลบข้อมูลผู้ใช้ {#deleteuser}

คำสั่ง [ลบข้อมูลผู้ใช้งาน](./config/command.md#deleteuser)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> deluser <identifier>
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```bash
        app deluser 443334508020891658
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`deluser`](./config/command.md#deleteuser)
- identifier: `string`
    - [ตัวระบุหลัก](./config/core.md#identifiertype) ของผู้ใช้

#### Returns

- [ข้อมูลผู้ใช้งาน](./modules/commands/server.md#deleteuser) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

### รับข้อมูลแบนผู้ใช้ {#getbaninfo}

คำสั่ง [รับข้อมูลการถูกแบน](./config/command.md#getbaninfo)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> baninfo <identifier|banRefId>
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        **Ban Ref ID**
        ```bash
        app baninfo 66555-568s5-26075
        ```
        **Identifier**
        ```bash
        app baninfo 443334508020891658
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`baninfo`](./config/command.md#getbaninfo)
- identifier | banRefId: `string`
    - [ตัวระบุหลัก](./config/core.md#identifiertype) ของผู้ใช้ หรือ รหัสอ้างอิงการถูกแบน

#### Returns

- [ข้อมูลการถูกแบน](./modules/commands/server.md#getbaninfo) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

### แบนผู้ใช้ (ชั่วคราว/ถาวร) {#banuser}

คำสั่ง [แบนผู้ใช้ชั่วคราวหรือถาวร](./config/command.md#banuser)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> banuser <identifier> <numDays|0=permanent> <reason>
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        **Permanent Ban (แบนถาวร)**
        ```bash
        app banuser 443334508020891658 0 Banned for repeatedly stealing the last slice of pizza.
        ```
        **Temporary Ban (แบนชั่วคราว)**
        ```bash
        app banuser 443334508020891658 90 Banned for repeatedly stealing the last slice of pizza.
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`banuser`](./config/command.md#banuser)
- identifier: `string`
    - [ตัวระบุหลัก](./config/core.md#identifiertype) ของผู้ใช้
- numDays: `integer`
    - จำนวนวันที่ต้องการแบนผู้ใช้ หรือระบุ **`0`** เพื่อแบนผู้ใช้ถาวร
- reason: `string`
    - เหตุผลที่แบนผู้ใช้

#### Returns

- [ข้อมูลการถูกแบน](./modules/commands/server.md#banuser) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

### ยกเลิกแบนผู้ใช้ {#unbanuser}

คำสั่ง [ยกเลิกแบนผู้ใช้](./config/command.md#unbanuser)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> unbanuser <identifier>
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```bash
        app unbanuser 443334508020891658
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`unbanuser`](./config/command.md#unbanuser)
- identifier: `string`
    - [ตัวระบุหลัก](./config/core.md#identifiertype) ของผู้ใช้

#### Returns

- [ข้อมูลการถูกแบน](./modules/commands/server.md#unbanuser) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

### กำหนดบทบาทผู้ใช้ {#setuserrole}

คำสั่ง [กำหนดบทบาทของผู้ใช้](./config/command.md#setuserrole)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> setrole <identifier> <roleId>
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```bash
        app setrole 443334508020891658 5
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`setrole`](./config/command.md#setuserrole)
- identifier: `string`
    - [ตัวระบุหลัก](./config/core.md#identifiertype) ของผู้ใช้
- roleId: `integer`
    - [รหัสของบทบาท](./config/setup.md#roles) ที่ต้องการกำหนดให้ผู้ใช้

#### Returns

- [ข้อมูลบทบาทของผู้ใช้](./modules/commands/server.md#setuserrole) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

### ยกเลิกระงับผู้ใช้ (ไม่เล่นนานเกินกำหนด) {#reactivateuser}

คำสั่ง [ยกเลิกสถานะการถูกระงับ](./config/command.md#reactivateuser) โดยสาเหตุไม่เข้าร่วมเซิร์ฟเวอร์นานเกินที่กำหนดใน [inactivePlayers](./config/core.md#inactiveplayers)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> reactivate <identifier>
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```bash
        app reactivate 443334508020891658
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`reactivate`](./config/command.md#reactivateuser)
- identifier: `string`
    - [ตัวระบุหลัก](./config/core.md#identifiertype) ของผู้ใช้

#### Returns

- [ข้อมูลสถานะของผู้ใช้](./modules/commands/server.md#reactivateuser) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

### กำหนดตัวระบุใหม่ให้ผู้ใช้ {#setnewidentifier}

คำสั่ง [กำหนดตัวระบุหลักให้ผู้ใช้ใหม่](./config/command.md#setnewidentifier)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> setnewid <identifier> <newIdentifier>
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```bash
        app setnewid 443334508020891658 845951838691393546
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`setnewid`](./config/command.md#setnewidentifier)
- identifier: `string`
    - [ตัวระบุเก่า](./config/core.md#identifiertype) ของผู้ใช้
- newIdentifier: `string`
    - [ตัวระบุใหม่](./config/core.md#identifiertype) ของผู้ใช้

#### Returns

- [ข้อมูลตัวระบุของผู้ใช้](./modules/commands/server.md#reactivateuser) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

### รีเซ็ตตัวระบุที่ผูกไว้ของผู้ใช้ {#resetbindidentifier}

คำสั่ง [รีเซ็ตตัวระบุที่ถูกผูกไว้ของผู้ใช้](./config/command.md#resetbindidentifier)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> resetbindid <identifier>
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```bash
        app resetbindid 443334508020891658
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`resetbindid`](./config/command.md#resetbindidentifier)
- identifier: `string`
    - [ตัวระบุหลัก](./config/core.md#identifiertype) ของผู้ใช้

#### Returns

- [ข้อมูลตัวระบุของผู้ใช้](./modules/commands/server.md#resetbindidentifier) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

### รีเซ็ต HWIDs ผู้ใช้ {#resethwids}

คำสั่ง [รีเซ็ต HWIDs ของผู้ใช้](./config/command.md#resethwids)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> resethwids <identifier>
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```bash
        app resethwids 443334508020891658
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`resethwids`](./config/command.md#resethwids)
- identifier: `string`
    - [ตัวระบุหลัก](./config/core.md#identifiertype) ของผู้ใช้

#### Returns

- [ข้อมูล HWIDs ของผู้ใช้](./modules/commands/server.md#resethwids) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

### รับข้อมูลคิวพอยท์ผู้ใช้ {#getpoints}

คำสั่ง [รับข้อมูลคิวพอยท์ของผู้ใช้](./config/command.md#getpoints)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> getpoints <identifier>
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```bash
        app getpoints 443334508020891658
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`getpoints`](./config/command.md#getpoints)
- identifier: `string`
    - [ตัวระบุหลัก](./config/core.md#identifiertype) ของผู้ใช้

#### Returns

- [ข้อมูลคิวพอยท์ของผู้ใช้](./modules/commands/server.md#getpoints) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

### เพิ่มคิวพอยท์ผู้ใช้ {#addpoints}

คำสั่ง [เพิ่มคิวพอยท์ให้ผู้ใช้](./config/command.md#addpoints)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> addpoints <identifier> <numPoints> <expirationDays|nil>
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        **Permanent Q-Points (คิวพ้อยท์ถาวร ไม่มีวันหมดอายุ)**
        ```bash
        app addpoints 443334508020891658 1000
        ```
        **Temporary Q-Points (คิวพ้อยท์ชั่วคราว มีวันหมดอายุ)**
        ```bash
        app addpoints 443334508020891658 1000 30
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`addpoints`](./config/command.md#addpoints)
- identifier: `string`
    - [ตัวระบุหลัก](./config/core.md#identifiertype) ของผู้ใช้
- numPoints: `integer`
    - จำนวนคิวพ้อยท์ที่ต้องการเพิ่มให้ผู้ใช้
- expirationDays: `integer` | `nil`
    - จำนวนวันที่คิวพ้อยท์จะหมดอายุ หรือ ไม่ระบุ หากเป็นคิวพ้อยท์แบบถาวร (ไม่มีวันหมดอายุ)

#### Returns

- [ข้อมูลคิวพอยท์ของผู้ใช้](./modules/commands/server.md#addpoints) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

### กำหนดคิวพ้อยท์ถาวรผู้ใช้ {#setpermanentpoints}

คำสั่ง [กำหนดคิวพ้อยท์แบบไม่มีวันหมดอายุให้ผู้ใช้](./config/command.md#setpermanentpoints)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> setpoints <identifier> <numPoints>
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```bash
        app setpoints 443334508020891658 2000
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`setpoints`](./config/command.md#setpermanentpoints)
- identifier: `string`
    - [ตัวระบุหลัก](./config/core.md#identifiertype) ของผู้ใช้
- numPoints: `integer`
    - จำนวนคิวพ้อยท์ที่ต้องการกำหนดให้ผู้ใช้

#### Returns

- [ข้อมูลคิวพอยท์ของผู้ใช้](./modules/commands/server.md#setpermanentpoints) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

### ลบคิวพ้อยท์ชั่วคราวผู้ใช้ {#deletetemporarypoints}

คำสั่ง [ลบคิวพ้อยท์แบบมีวันหมดอายุของผู้ใช้](./config/command.md#deletetemporarypoints)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> delpoints <identifier> <numIndex>
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```bash
        app delpoints 443334508020891658 2
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`delpoints`](./config/command.md#deletetemporarypoints)
- identifier: `string`
    - [ตัวระบุหลัก](./config/core.md#identifiertype) ของผู้ใช้
- numIndex: `integer`
    - หมายเลข Index ของข้อมูลคิวพ้อยท์ชั่วคราวที่ต้องการลบ
        - 💡 แนะนำให้ใช้คำสั่ง [รับข้อมูลคิวพอยท์ผู้ใช้](./commands.md#getpoints) เพื่อรับหมายเลข Index ที่ต้องการลบข้อมูล

#### Returns

- [ข้อมูลคิวพอยท์ของผู้ใช้](./modules/commands/server.md#deletetemporarypoints) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

### ลบคิวพ้อยท์ทั้งหมดของผู้ใช้ {#purgepoints}

คำสั่ง [ลบคิวพ้อยท์ทั้งหมดของผู้ใช้](./config/command.md#purgepoints)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> purgepoints <identifier>
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```bash
        app purgepoints 443334508020891658
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`purgepoints`](./config/command.md#purgepoints)
- identifier: `string`
    - [ตัวระบุหลัก](./config/core.md#identifiertype) ของผู้ใช้

#### Returns

- [ข้อมูลคิวพอยท์ของผู้ใช้](./modules/commands/server.md#purgepoints) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

### รับแอร์ไทม์คงเหลือผู้ใช้ {#getairtime}

คำสั่ง [รับข้อมูลแอร์ไทม์คงเหลือของผู้ใช้](./config/command.md#getairtime)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> getairtime <identifier>
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```bash
        app getairtime 443334508020891658
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`getairtime`](./config/command.md#getairtime)
- identifier: `string`
    - [ตัวระบุหลัก](./config/core.md#identifiertype) ของผู้ใช้

#### Returns

- [ข้อมูลแอร์ไทม์คงเหลือของผู้ใช้](./modules/commands/server.md#getairtime) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

### กำหนดแอร์ไทม์ผู้ใช้ {#setairtime}

คำสั่ง [กำหนดแอร์ไทม์ให้ผู้ใช้](./config/command.md#setairtime)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> setairtime <identifier> <numSeconds>
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```bash
        app setairtime 443334508020891658 18144000
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`setairtime`](./config/command.md#setairtime)
- identifier: `string`
    - [ตัวระบุหลัก](./config/core.md#identifiertype) ของผู้ใช้
- numSeconds: `integer`
    - จำนวนแอร์ไทม์ที่ต้องการกำหนดให้ผู้ใช้ โดยมีหน่วยเป็น **วินาที**
        - `3600` วินาที = 1 ชั่วโมง
        - `86400` วินาที = 1 วัน
        - `604800` วินาที = 7 วัน
        - `18144000` วินาที = 30 วัน

#### Returns

- [ข้อมูลแอร์ไทม์ของผู้ใช้](./modules/commands/server.md#setairtime) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

### เพิ่มแอร์ไทม์ผู้ใช้ {#addairtime}

คำสั่ง [เพิ่มแอร์ไทม์ให้ผู้ใช้](./config/command.md#addairtime)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> addairtime <identifier> <numSeconds>
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```bash
        app addairtime 443334508020891658 604800
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`addairtime`](./config/command.md#addairtime)
- identifier: `string`
    - [ตัวระบุหลัก](./config/core.md#identifiertype) ของผู้ใช้
- numSeconds: `integer`
    - จำนวนแอร์ไทม์ที่ต้องการเพิ่มให้ผู้ใช้ โดยมีหน่วยเป็น **วินาที**
        - `3600` วินาที = 1 ชั่วโมง
        - `86400` วินาที = 1 วัน
        - `604800` วินาที = 7 วัน
        - `18144000` วินาที = 30 วัน

#### Returns

- [ข้อมูลแอร์ไทม์ของผู้ใช้](./modules/commands/server.md#addairtime) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

### ลบแอร์ไทม์ผู้ใช้ {#removeairtime}

คำสั่ง [ลบแอร์ไทม์ของผู้ใช้](./config/command.md#removeairtime)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> removeairtime <identifier> <numSeconds>
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```bash
        app removeairtime 443334508020891658 86400
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`removeairtime`](./config/command.md#removeairtime)
- identifier: `string`
    - [ตัวระบุหลัก](./config/core.md#identifiertype) ของผู้ใช้
- numSeconds: `integer`
    - จำนวนแอร์ไทม์ที่ต้องการเพิ่มให้ผู้ใช้ โดยมีหน่วยเป็น **วินาที**
        - `3600` วินาที = 1 ชั่วโมง
        - `86400` วินาที = 1 วัน
        - `604800` วินาที = 7 วัน
        - `18144000` วินาที = 30 วัน

#### Returns

- [ข้อมูลแอร์ไทม์ของผู้ใช้](./modules/commands/server.md#removeairtime) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

### ล้างแคชข้อมูลผู้เล่น {#clearplayercache}

คำสั่ง [ล้างแคชข้อมูลผู้เล่น](./config/command.md#clearplayercache) (ℹ️ ใช้เมื่อเกิดข้อผิดพลาด และต้องการโหลดข้อมูลผู้เล่นใหม่จากฐานข้อมูล)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> clearcache <identifier>
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```bash
        app clearcache 443334508020891658
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`clearcache`](./config/command.md#clearplayercache)
- identifier: `string`
    - [ตัวระบุหลัก](./config/core.md#identifiertype) ของผู้ใช้

#### Returns

- [ข้อมูลตัวระบุของผู้ใช้](./modules/commands/server.md#clearplayercache) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

## User Commands

รายการคำสั่งทั้งหมดของ [**ผู้ใช้**](https://en.wikipedia.org/wiki/User_(computing))

### รับข้อมูลของฉัน {#getmyinfo}

คำสั่ง [รับข้อมูลส่วนตัวของผู้ใช้](./config/command.md#getmyinfo)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> myinfo
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```bash
        app myinfo
        ```
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`myinfo`](./config/command.md#getmyinfo)

#### Returns

- [ข้อมูลของผู้ใช้](./modules/commands/server.md#getmyinfo) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

:::warning
**คำสั่งนี้สามารถใช้งานได้ทางฝั่งไคลเอนต์เท่านั้น (Client-side only)**
:::

### รับข้อมูลระบบคิว {#getqueueinfo}

คำสั่ง [รับข้อมูลเกี่ยวกับระบบคิว](./config/command.md#getqueueinfo)

<Tabs>
    <TabItem value="command" label="Command">
        ```bash
        <commandName> queueinfo
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```bash
        app queueinfo
        ```
    </TabItem>
</Tabs>

#### Arguments

- commandName: `string`
    - ชื่อของ [คำสั่งหลัก](./config/command.md#commandname) เพื่ออ้างอิงว่าเป็นคำสั่งของทรัพยากรนี้ สำหรับใช้งานผ่าน Server Console หรือ Client Console
- subCommandName: `string`
    - ชื่อของ [คำสั่งย่อย](./config/command.md#subcommands) และค่าเริ่มต้นคือ [`queueinfo`](./config/command.md#getqueueinfo)

#### Returns

- [ข้อมูลเกี่ยวกับระบบคิว](./modules/commands/server.md#getqueueinfo) เมื่อใช้คำสั่งสำเร็จ
- [ข้อความแสดงข้อผิดพลาด](./modules/commands/server.md#onexecuted) เมื่อใช้คำสั่งล้มเหลว

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
