---
sidebar_label: Server
---

# Queue (Server-side)

## Queue

### updateCustomMessage

```lua title="บรรทัดที่ 21"
function Queue.updateCustomMessage(deferrals, playerData, ordinalLists, numQueues, usedSlots, maxSlots)
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
- ordinalLists: `string`
    - รายการ[ลำดับของผู้เล่นที่แสดง](../../config/queue.md#queuedisplaylists)
- usedSlots: `integer`
    - จำนวนสล็อตเซิร์ฟเวอร์ที่ใช้งาน
- maxSlots: `integer`
    -  จำนวนสล็อตเซิร์ฟเวอร์สูงสุด

#### Returns

- useCustom: `boolean` | `nil`
    - ต้องกำหนดเป็น `true` หากดำเนินการอัปเดตข้อความคิวแบบกำหนดเอง
