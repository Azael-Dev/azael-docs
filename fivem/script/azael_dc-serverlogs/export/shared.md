---
sidebar_label: both
---

# Export Functions (Both-Side)

ฟังก์ชันส่งออกเพื่อให้สามารถใช้งานได้จากทรัพยากรอื่นๆทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)** และ **[Client](https://en.wikipedia.org/wiki/Client-side)**

## insertData

ส่งข้อมูลจากทรัพยากรอื่นๆมายัง **[azael_dc-serverlogs](https://fivem.azael.dev/digishop/azael-dc-serverlogs/)**

```lua
exports['azael_dc-serverlogs']:insertData({
    event = 'Name',
    content = 'Messages',
    source = playerId,
    color = 7,
    options = {
        public = false,
        important = false
    }
})
```

### Argument

| Name                    | Type               | Optional           | Default                                      | Description                                                
|-------------------------|--------------------|--------------------|----------------------------------------------|--------------------------------------------------
| `event`                 | `string`           | ❌                 |                                              | ชื่อเหตุการณ์เพื่อแยกประเภทของข้อมูล (หากใช้งาน **[Discord API](../config/server#discord-api)** จะอ้างอิงจากการกำนหดค่า **[Webhooks](../config/server#webhooks)**)
| `content`               | `string`           | ❌                 |                                              | เนื้อหาของข้อความที่ต้องการส่ง
| `source`                | `number`           | ❌                 |                                              | แหล่งที่มาของผู้เล่น **[Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) (`source`)** หรือ **[Server ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id)**
| `color`                 | `number`           | ✔️                 | `nil`                                        | รหัสสีที่กำหนดเอาไว้ที่การตั้งค่า **[Color](../config/server#color)**
| `options`               | `table`            | ✔️                 | `nil`                                        | ตัวเลือกการใช้งาน `public` หรือ `important`
| `options.public`        | `boolean`          | ✔️                 | `nil`                                        | ปิดการเเสดงข้อมูลของผู้เล่นบนแอปพลิเคชัน **[Discord](https://discord.com/)**
| `options.important`     | `boolean`          | ✔️                 | `nil`                                        | ข้อมูลสำคัญ หากใช้งาน **[Discord API](../config/server#discord-api)** จะดำเนินการ **Ping** (`@everyone`) ให้สมาชิกภายในชุมชนทราบ
