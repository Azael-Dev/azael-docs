# Hook

## Server

ไฟล์ `server.hook` คือไฟล์ของทรัพยากรทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)**

### onHttpRequest

ฟังก์ชันที่จะถูกเรียกใช้ก่อนที่จะส่งคำขอ HTTP ไปยัง [**Discord API**](../config/server.md#discord-api) หรือ [**Custom API**](../config/server.md#custom-api)

:::tip

สามารถยกเลิกคำขอก่อนที่จะส่งไปยัง [**Discord API**](../config/server.md#discord-api) หรือ [**Custom API**](../config/server.md#custom-api) ได้

:::

```lua title="บรรทัดที่ 38"
HOOK.onHttpRequest = function(payload)
    -- print("HTTP Request payload: ", json.encode(payload, { indent = true }))

    return true
end
```

#### Parameters

- payload: `table<{ [key]: any }>`
    - ตารางข้อมูล
        - url: `string`
            - URL ปลายทางที่ส่ง Log
        - data: `table<{ [index]: table<{ [key]: any } }>`
            - ตารางข้อมูลของ Log โดยมีโครงสร้างดังนี้:
                - event: `string`
                    - ชื่อเหตุการณ์ที่ถูกส่ง
                - content: `string`
                    - เนื้อหาของข้อความที่ถูกส่ง
                - fields: `table<{ name: string, value: string, inline: boolean }>`
                    - ตารางของฟิลด์ที่ถูกส่งใน Embed (ถ้ามี)
                - hardware: `string` | `nil`
                    - ข้อมูล Hardware Tokens ของผู้เล่น (ถ้ามี)
                - image: `string` | `nil`
                    - URL ของภาพที่ถูกส่ง (ถ้ามี)
                - coords: `string` | `nil`
                    - ตำแหน่งพิกัดของผู้เล่น (ถ้ามี)
                - name: `string`
                    - ชื่อผู้เล่น
                - source: `integer`
                    - NetID ของผู้เล่นที่เกี่ยวข้องกับ Log หรือ `0` หากเป็น Log ของระบบ
                - identifiers: `table` | `string`
                    - ตารางของตัวระบุผู้เล่นที่เกี่ยวข้องกับ Log (ถ้ามี)
                        - steam: `string` | `nil`
                        - discord: `string` | `nil`
                        - fivem: `string` | `nil`
                        - license: `string` | `nil`
                        - license2: `string` | `nil`
                        - ip: `string` | `nil`
                - options: `table` | `nil`
                    - ตารางของตัวเลือกเพิ่มเติมที่ถูกส่ง
                        - public: `boolean` | `nil`
                            - ระบุว่าข้อมูลนี้เป็นสาธารณะหรือไม่
                        - important: `boolean` | `nil`
                            - ระบุว่าข้อมูลนี้เป็นข้อมูลสำคัญหรือไม่
                        - codeblock: `boolean` | `nil`
                            - ระบุว่าข้อมูลนี้ควรถูกจัดรูปแบบเป็น code block หรือไม่
                - timestamp: `integer`
                    - เวลาที่ Log ถูกสร้างในรูปแบบ Unix Timestamp

#### Returns

- continue: `boolean`
    - `true` = ดำเนินการต่อ
    - `false` = ยกเลิกการส่งข้อมูล

### onHttpResponse

ฟังก์ชันที่จะถูกเรียกใช้เมื่อได้รับการตอบกลับ HTTP (สามารถใช้เพื่อตรวจสอบการตอบกลับหรือดีบัก)

```lua title="บรรทัดที่ 83"
HOOK.onHttpResponse = function(payload)
    -- print("HTTP Response payload: ", json.encode(payload, { indent = true }))
end
```

#### Parameters

- payload: `table<{ [key]: any }>`
    - ตารางข้อมูล
        - url: `string`
            - URL ปลายทางที่ส่ง Log
        - data: `table<{ [index]: table<{ [key]: any } }>`
            - ตารางข้อมูลของ Log โดยมีโครงสร้างดังนี้:
                - event: `string`
                    - ชื่อเหตุการณ์ที่ถูกส่ง
                - content: `string`
                    - เนื้อหาของข้อความที่ถูกส่ง
                - fields: `table<{ name: string, value: string, inline: boolean }>`
                    - ตารางของฟิลด์ที่ถูกส่งใน Embed (ถ้ามี)
                - hardware: `string` | `nil`
                    - ข้อมูล Hardware Tokens ของผู้เล่น (ถ้ามี)
                - image: `string` | `nil`
                    - URL ของภาพที่ถูกส่ง (ถ้ามี)
                - coords: `string` | `nil`
                    - ตำแหน่งพิกัดของผู้เล่น (ถ้ามี)
                - name: `string`
                    - ชื่อผู้เล่น
                - source: `integer`
                    - NetID ของผู้เล่นที่เกี่ยวข้องกับ Log หรือ `0` หากเป็น Log ของระบบ
                - identifiers: `table` | `string`
                    - ตารางของตัวระบุผู้เล่นที่เกี่ยวข้องกับ Log (ถ้ามี)
                        - steam: `string` | `nil`
                        - discord: `string` | `nil`
                        - fivem: `string` | `nil`
                        - license: `string` | `nil`
                        - license2: `string` | `nil`
                        - ip: `string` | `nil`
                - options: `table` | `nil`
                    - ตารางของตัวเลือกเพิ่มเติมที่ถูกส่ง
                        - public: `boolean` | `nil`
                            - ระบุว่าข้อมูลนี้เป็นสาธารณะหรือไม่
                        - important: `boolean` | `nil`
                            - ระบุว่าข้อมูลนี้เป็นข้อมูลสำคัญหรือไม่
                        - codeblock: `boolean` | `nil`
                            - ระบุว่าข้อมูลนี้ควรถูกจัดรูปแบบเป็น code block หรือไม่
                - timestamp: `integer`
                    - เวลาที่ Log ถูกสร้างในรูปแบบ Unix Timestamp
        - status: `integer`  
            - รหัสสถานะการตอบกลับ (HTTP Status Code) เช่น `200`, `201`, `204`
        - response: `string`  
            - รายละเอียดหรือข้อความการตอบกลับ
        - headers: `table<{ [key]: string }>`  
            - ส่วนหัว (Headers) ที่ได้จากการตอบกลับ
        - err: `string | nil`  
            - ข้อความแสดงข้อผิดพลาด หากการส่งคำขอไม่สำเร็จ (จะเป็น `nil` หากไม่มีข้อผิดพลาด)
