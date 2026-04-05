---
sidebar_label: Server
---

# Queue (Server-side)

## Queue

### updateCustomMessage

```lua title="บรรทัดที่ 23"
function Queue.updateCustomMessage(deferrals, playerData, ordinalLists, numQueues, usedSlots, maxSlots, compactMode, translate)
    -- ตรวจสอบว่า Compact Mode ถูกเปิดใช้งานและผู้เล่นอยู่ในลำดับคิวที่มากกว่า minPosition หรือไม่
    local isCompactMode <const> = compactMode.enable and playerData.position > compactMode.minPosition

    -- หาก Compact Mode ถูกเปิดใช้งานและ ไม่ได้จำกัดเฉพาะตอนเซิร์ฟเวอร์เต็ม หรือเซิร์ฟเวอร์เต็มแล้ว ให้แสดงข้อความแบบย่อ
    if isCompactMode and (not compactMode.onlyWhenFull or usedSlots >= maxSlots) then
        deferrals.update(translate('queue_update_message_compact', playerData.position, numQueues, playerData.waitTime, usedSlots, maxSlots))

        return true
    end

    return false
end
```

#### Parameters

- deferrals: `table<{ [key]: function }>`
    - ฟังก์ชันสำหรับการเลื่อนการเชื่อมต่อ (ดูข้อมูลเพิ่มเติมได้ที่ [Deferring connections](https://docs.fivem.net/docs/scripting-reference/events/list/playerconnecting/#deferring-connections))
        - update: `function`
            - ส่งข้อความไปยังไคลเอนต์ที่เชื่อมต่อ
        - presentCard: `function`
            - ส่งข้อมูล [Adaptive Card](https://adaptivecards.io/) ไปยังไคลเอนต์ที่เชื่อมต่อ
- playerData: `table<{ [key]: any }>`
    - ข้อมูลของผู้เล่นที่ใช้ภายในระบบคิว
        - tempId: `integer`
            - [Temp ID](https://docs.fivem.net/docs/scripting-reference/events/list/playerconnecting/#parameters) ของผู้เล่น 
        - identifier: `string`
            - [ตัวระบุหลัก](../../config/core.md#identifiertype) ของผู้เล่น
        - name: `string`
            - ชือของผู้เล่น
        - points: `integer`
            - จำนวนคิวพ้อยท์ของผู้เล่น
        - position: `integer`
            - ลำดับของผู้เล่นในคิว
        - joinTime: `integer`
            - เวลาที่ผู้เล่นเข้าร่วมคิว ([Unix time](https://en.wikipedia.org/wiki/Unix_time))
        - waitTime: `string`
            - เวลาที่รอคิวในรูปแบบที่อ่านได้
- ordinalLists: `string` | `string[]` | `nil`
    - รายการ[ลำดับของผู้เล่นที่แสดง](../../config/queue.md#queuedisplaylists)
- numQueues: `integer`
    - จำนวนคิวปัจจุบัน
- usedSlots: `integer`
    - จำนวนสล็อตเซิร์ฟเวอร์ที่ใช้งาน
- maxSlots: `integer`
    -  จำนวนสล็อตเซิร์ฟเวอร์สูงสุด
- compactMode: `table<{ [key]: any }>`
    - การตั้งค่าโหมด [Compact Mode](../../config/queue.md#updatequeueinterval)
        - enable: `boolean`
            - เปิดใช้งานข้อความแบบย่อ
        - firstUpdateFull: `boolean`
            - แสดงข้อความแบบเต็มในการอัปเดตครั้งแรก
        - onlyWhenFull: `boolean`
            - แสดงข้อความแบบย่อเฉพาะเมื่อเซิร์ฟเวอร์เต็ม
        - minPosition: `integer`
            - ตำแหน่งขั้นต่ำในคิวที่จะเริ่มแสดงข้อความแบบย่อ
- translate: `function`
    - ฟังก์ชันแปลข้อความ
        - **Arguments**
            - key: `string`
                - คีย์ของข้อความที่ต้องการแปล
            - ...: `any`
                - ตัวแปรเพิ่มเติมสำหรับข้อความ
        - **Returns**
            - translated: `string`
                - ข้อความที่แปลแล้ว

#### Returns

- useCustom: `boolean` | `nil`
    - ต้องกำหนดเป็น `true` หากดำเนินการอัปเดตข้อความคิวแบบกำหนดเอง
