---
sidebar_label: Server
---

# Export Functions (Server-Side)

ฟังก์ชันส่งออกเพื่อให้สามารถใช้งานได้จากทรัพยากรอื่นๆทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)**

## insertData

ส่งข้อมูลจากทรัพยากรอื่นๆมายัง **[azael_dc-serverlogs](../index.md)** แบบ **[Asynchronous](https://en.wikipedia.org/wiki/Asynchrony_(computer_programming))**

<Tabs>
<TabItem value="lua" label="Lua">

```lua
exports['azael_dc-serverlogs']:insertData({
    event = 'ชื่อเหตุการณ์',
    content = 'ข้อความ',
    source = netId,
    image = 'URL รูปภาพ',
    coords = GetEntityCoords(GetPlayerPed(netId)),
    color = 7,
    fields = {
        { name = 'name 1', value = 'value 1', inline = false },
        { name = 'name 2', value = 'value 2', inline = true },
        { name = 'name 3', value = 'value 3', inline = true },
        { name = 'name 4', value = 'value 4', inline = true },
        { name = 'name 5', value = 'value 5', inline = false }
    },
    options = {
        public = false,
        important = false,
        codeblock = true
    }
})
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```js
exports['azael_dc-serverlogs']['insertData']({
    event: 'ชื่อเหตุการณ์',
    content: 'ข้อความ',
    source: netId,
    image: 'URL รูปภาพ',
    coords: GetEntityCoords(GetPlayerPed(netId)),
    color: 7,
    fields: {
        { name: 'name 1', value: 'value 1', inline: false },
        { name: 'name 2', value: 'value 2', inline: true },
        { name: 'name 3', value: 'value 3', inline: true },
        { name: 'name 4', value: 'value 4', inline: true },
        { name: 'name 5', value: 'value 5', inline: false }
    },
    options: {
        public: false,
        important: false,
        codeblock: true
    }
});
```

</TabItem>
</Tabs>

### Argument

| Name                    | Type               | Required           | Default                                      | Description                                                
|-------------------------|--------------------|--------------------|----------------------------------------------|--------------------------------------------------
| `event`                 | `string`           | ✔️                 |                                              | ชื่อเหตุการณ์เพื่อแยกประเภทข้อมูล (หากใช้งาน **[Discord API](../config/server.md#discord-api)** จะอ้างอิงจากการกำหนดค่า **[Webhooks](../config/events/discord#discord-events)**)
| `content`               | `string`           | ✔️                 |                                              | เนื้อหาของข้อความที่ต้องการส่ง
| `source`                | `number`           | ✔️                 |                                              | ID อ้างอิงผู้เล่น หรือที่รู้จักกันในอีกชื่อคือ **[Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id)** (`source`) หรือ ระบุ `0` หากเป็น **[บันทึกของระบบ](https://i.imgur.com/imSbEDD.png)**
| `image`                | `string`            | ❌                 | `nil`                                        | URL รูปภาพแบบกำหนดเอง (หากใช้งานห้ามกำหนด `event` นี้ที่ **[Screenshot.Webhooks](../config/server.md#screenshotwebhooks)** โดยเด็ดขาด)
| `coords`                | `vector3`          | ❌                 | `nil`                                        | พิกัดปัจจุบันของผู้เล่น (อ้างอิงจาก **[GET_ENTITY_COORDS](https://docs.fivem.net/natives/?_0x1647F1CB)**)
| `color`                 | `number`           | ❌                 | `nil`                                        | รหัสสีที่กำหนดเอาไว้ในการตั้งค่า **[Color](../config/server.md#color)**
| `fields`                | `table`            | ❌                 | `nil`                                        | **[Fields](https://discordjs.guide/popular-topics/embeds.html#embed-preview)** ถูกจำกัดไว้ที่ **20** รายการ (รองรับการใช้งาน **[Discord API](../config/server.md#discord-api)** เท่านั้น)
| `options`               | `table`            | ❌                 | `nil`                                        | ตัวเลือกการใช้งาน `public` หรือ `important`
| `options.public`        | `boolean`          | ❌                 | `nil`                                        | ปิดการเเสดงข้อมูลส่วนตัวของผู้เล่นบนแอปพลิเคชัน **[Discord](https://discord.com/)**
| `options.important`     | `boolean`          | ❌                 | `nil`                                        | ข้อมูลสำคัญ (หากใช้งาน **[Discord API](../config/server.md#discord-api)** ระบบจะดำเนินการ **Ping** ไปยังบทบาทที่กำหนดในการตั้งค่า **[Important.Content](../config/server.md#importantcontent)**)
| `options.codeblock`     | `boolean`          | ❌                 | `true`                                       | เปิด / ปิด การใช้งาน **[Code Blocks](https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-)** สำหรับ `content` (รองรับการใช้งาน **[Discord API](../config/server.md#discord-api)** เท่านั้น)

:::tip

วิธีซ่อนข้อผิดพลาด **`No such export insertData in resource azael_dc-serverlogs`** จากรหัสส่งข้อมูลที่เพิ่มไปยังทรัพยากรอื่นๆ หากคุณปิดใช้งาน **[azael_dc-serverlogs](../index.md#ยกเลิกใช้งาน)**

<Tabs>
<TabItem value="lua" label="Lua">

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'ชื่อเหตุการณ์',
        content = 'ข้อความ',
        source = netId
    })
end)
```

- **[Error Handling and Exceptions](https://www.lua.org/pil/8.4.html)**

</TabItem>
<TabItem value="javascript" label="JavaScript">

```js
try {
    exports['azael_dc-serverlogs']['insertData']({
        event: 'ชื่อเหตุการณ์',
        content: 'ข้อความ',
        source: netId
    });
} catch {};
```

- **[Error handling, "try...catch"](https://javascript.info/try-catch)**

</TabItem>
</Tabs>

:::

:::danger

การใช้งาน **[pcall](https://www.lua.org/pil/8.4.html) (Lua)** หรือ **[try...catch](https://javascript.info/try-catch) (JavaScript)** อาจส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../index.md)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณเพิ่มไปยังทรัพยากรนั้น โปรดตรวจสอบตัวแปรของรหัสทุกครั้งและทดสอบรหัสส่งข้อมูลโดยไม่ใช้งาน **[pcall](https://www.lua.org/pil/8.4.html) ([Lua](https://www.lua.org/))** หรือ **[try...catch](https://javascript.info/try-catch) ([JavaScript](https://javascript.info/))**

:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
