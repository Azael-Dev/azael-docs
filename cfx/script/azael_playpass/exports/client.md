---
sidebar_label: Client
---

# Export Functions (Client-side)

ส่งออกฟังก์ชันเพื่อให้สามารถเรียกใช้จากทรัพยากรอื่นได้ทางฝั่ง [**Client**](https://en.wikipedia.org/wiki/Client%E2%80%93server_model#Client_side)

## showUI

เปิด UI แสดงข้อมูลผู้ใช้และคิวรอเข้าร่วมเซิร์ฟเวอร์

```lua
exports.azael_playpass:showUI()
```

## closeUI

ปิด UI แสดงข้อมูลผู้ใช้และคิวรอเข้าร่วมเซิร์ฟเวอร์

```lua
exports.azael_playpass:closeUI()
```

## hasInactiveRecord

ผู้ใช้เคยถูกระงับจากสาเหตุไม่เข้าร่วมเซิร์ฟเวอร์นานเกินที่กำหนดใน [inactivePlayers](../config/core.md#inactiveplayers) หรือไม่?

<Tabs>
    <TabItem value="usage" label="Usage">
        ```lua
        exports.azael_playpass:hasInactiveRecord()
        ```
    </TabItem>
    <TabItem value="example" label="Example">
        ```lua
        local wasInactive, rejoinData = exports.azael_playpass:hasInactiveRecord()

        if wasInactive then
            print(json.encode(rejoinData, { indent = true }))
        end
        ```
:::tip
    คุณสามารถระบุตัวระบุได้ทั้งแบบที่มีหรือไม่มีคำนำหน้า เช่น `discord:443334508020891658` หรือ `443334508020891658`
:::
    </TabItem>
</Tabs>

#### Returns

- wasInactive: `boolean`
    - สถานะเคยถูกระงับ
- rejoinData: `table<{ timestamp: integer, secondsAgo: integer }>` | `nil`
    - ข้อมูลการเข้าร่วมเซิร์ฟเวอร์หลังถูกยกเลิกสถานะจาก [reactivateUser](./server.md#reactivateuser) หรือใช้คำสั่ง [ยกเลิกระงับผู้ใช้ (ไม่เล่นนานเกินกำหนด)](../commands.md#reactivateuser)
        - timestamp: `integer`
            - เวลาที่เข้าร่วมกับเซิร์ฟเวอร์หรือถูกยกเลิกสถานะครั้งล่าสุด ([Unix time](https://en.wikipedia.org/wiki/Unix_time))
        - secondsAgo: `integer`
            - เข้าร่วมกับเซิร์ฟเวอร์หรือถูกยกเลิกสถานะมาแล้วกี่วินาที

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
