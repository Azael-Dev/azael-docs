---
sidebar_label: both
---

# Export Functions (Both-Side)

ฟังก์ชันส่งออกเพื่อให้สามารถใช้งานได้จากทรัพยากรอื่นๆทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)** และ **[Client](https://en.wikipedia.org/wiki/Client-side)**

## insertData

ส่งข้อมูลจากทรัพยากรอื่นๆมายัง **[azael_dc-serverlogs](../)**

<Tabs>
<TabItem value="lua" label="Lua">

```lua
exports['azael_dc-serverlogs']:insertData({
    event = 'ชื่อเหตุการณ์',
    content = 'ข้อความ',
    source = playerId,
    color = 7,
    options = {
        public = false,
        important = false
    }
})
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```js
exports['azael_dc-serverlogs']['insertData']({
    event: 'ชื่อเหตุการณ์',
    content: 'ข้อความ',
    source: playerId,
    color: 7,
    options: {
        public: false,
        important: false
    }
});
```

</TabItem>
</Tabs>

### Argument

| Name                    | Type               | Optional           | Default                                      | Description                                                
|-------------------------|--------------------|--------------------|----------------------------------------------|--------------------------------------------------
| `event`                 | `string`           | ❌                 |                                              | ชื่อเหตุการณ์เพื่อแยกประเภทข้อมูล (หากใช้งาน **[Discord API](../config/server#discord-api)** จะอ้างอิงจากการกำหนดค่า **[Webhooks](../config/server#webhooks)**)
| `content`               | `string`           | ❌                 |                                              | เนื้อหาของข้อความที่ต้องการส่ง
| `source`                | `number`           | ❌                 |                                              | ID อ้างอิงผู้เล่น หรือที่รู้จักกันในอีกชื่อคือ **[Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id)** หรือ  **[Server ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id)**
| `color`                 | `number`           | ✔️                 | `nil`                                        | รหัสสีที่กำหนดเอาไว้ที่การตั้งค่า **[Color](../config/server#color)**
| `options`               | `table`            | ✔️                 | `nil`                                        | ตัวเลือกการใช้งาน `public` หรือ `important`
| `options.public`        | `boolean`          | ✔️                 | `nil`                                        | ปิดการเเสดงข้อมูลส่วนตัวของผู้เล่นบนแอปพลิเคชัน **[Discord](https://discord.com/)**
| `options.important`     | `boolean`          | ✔️                 | `nil`                                        | ข้อมูลสำคัญ (หากใช้งาน **[Discord API](../config/server#discord-api)** ระบบจะดำเนินการ **Ping** ไปยัง `@everyone`)

:::tip

วิธีซ่อนข้อผิดพลาด **`No such export insertData in resource azael_dc-serverlogs`** จากรหัสส่งข้อมูลที่เพิ่มไปยังทรัพยากรอื่นๆ หากคุณปิดใช้งาน **[azael_dc-serverlogs](../#ยกเลิกใช้งาน)**

<Tabs>
<TabItem value="lua" label="Lua">

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'ชื่อเหตุการณ์',
        content = 'ข้อความ',
        source = playerId
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
        source: playerId
    });
} catch {};
```

- **[Error handling, "try...catch"](https://javascript.info/try-catch)**

</TabItem>
</Tabs>

:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
