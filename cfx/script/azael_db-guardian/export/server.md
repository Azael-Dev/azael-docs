---
sidebar_label: Server
---

# Export Functions (Server-Side)

ฟังก์ชันส่งออกเพื่อให้สามารถใช้งานได้จากทรัพยากรอื่นๆทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)**

## onConnectionReady

ตรวจสอบการเชื่อมต่อกับเซิร์ฟเวอร์พร้อมแล้ว และจะตอบกลับเมื่อทรัพยากรนี้ดำเนินการ **สำรองข้อมูลเซิร์ฟ** และ **ตรวจสอบข้อมูลผู้เล่น** เสร็จสิ้น

```lua
exports['azael_db-guardian']:onConnectionReady(cb)
```

### Argument

| Name                    | Type               | Required           | Default                                      | Description                                                
|-------------------------|--------------------|--------------------|----------------------------------------------|--------------------------------------------------
| `cb`                    | `function`         | ✔️                 | `nil`                                        | Callback Function

### Example
```lua
exports['azael_db-guardian']:onConnectionReady(function()
    print('The player is now allowed to connect to the server.')
end)
```

## executeCommand

เรียกใช้งาน [**คำสั่งเริ่มต้น**](../command#default-commands) ของทรัพยากร **[azael_db-guardian](../)**

```lua
exports['azael_db-guardian']:executeCommand(command, identifier, days)
```

### Argument

| Name                    | Type               | Required           | Default                                      | Description                                                
|-------------------------|--------------------|--------------------|----------------------------------------------|--------------------------------------------------
| `command`               | `string`           | ✔️                 | `nil`                                        | ชื่อคำสั่ง (ดูรายการคำสั่งที่สามารถใช้งานได้ที่ [**คำสั่งเริ่มต้น**](../command#default-commands))
| `identifier`            | `string`           | ➖                 | `nil`                                        | ตัวระบุผู้เล่น **จำเป็นที่จะต้องระบุ** สำหรับคำสั่งดังต่อไปนี้ <br />• [**ลบข้อมูลเฉพาะผู้เล่น**](../command#ลบข้อมูลเฉพาะผู้เล่น) <br />• [**ยกเลิกสถานะถูกลบข้อมูลผู้เล่น**](../command#ยกเลิกสถานะถูกลบข้อมูลผู้เล่น) <br />• [**ตรวจสอบข้อมูลผู้เล่น**](../command#ตรวจสอบข้อมูลผู้เล่น) <br />• [**เพิ่มจำนวนวันให้ผู้เล่น (ในกรณีเเจ้งลาหยุดต่างๆ)**](../command#เพิ่มจำนวนวันให้ผู้เล่น-ในกรณีเเจ้งลาหยุดต่างๆ)
| `days`                  | `number`           | ➖                 | `nil`                                        | จำนวนวันลา **จำเป็นที่จะต้องระบุ** สำหรับคำสั่งดังต่อไปนี้ <br />• [**เพิ่มจำนวนวันให้ผู้เล่น (ในกรณีเเจ้งลาหยุดต่างๆ)**](../command#เพิ่มจำนวนวันให้ผู้เล่น-ในกรณีเเจ้งลาหยุดต่างๆ)

:::note

- [**ESX**](https://github.com/esx-framework) อ้างอิง **ตัวระบุผู้เล่น** จากตาราง **`users`** คอลัมน์ **`identifier`**<br />
- [**QBCore**](https://github.com/qbcore-framework) อ้างอิง **ตัวระบุผู้เล่น** จากตาราง **`players`** คอลัมน์ **`license`**<br />
- [**VORPCore**](https://github.com/VORPCORE) อ้างอิง **ตัวระบุผู้เล่น** จากตาราง **`users`** คอลัมน์ **`identifier`**

:::

### Return

| Name                         | Type               | Description                                                
|------------------------------|--------------------|--------------------------------------------------
| `success`                    | `boolean`          | สถานะการใช้งานคำสั่ง สำเร็จ หรือ ล้มเหลว
| `response`                   | `string`           | ข้อความตอบกลับ แจ้งรายละเอียด หากใช้งานคำสั่ง สำเร็จ หรือ ข้อผิดพลาด หากใช้งานคำสั่ง ล้มเหลว

### Examples

#### ตัวอย่าง: [สำรองฐานข้อมูลเซิร์ฟเวอร์](../command#สำรองฐานข้อมูลเซิร์ฟเวอร์)

```lua
local success, response = exports['azael_db-guardian']:executeCommand('dbbackup')

print(success, response)  -- true | false, response message
```

#### ตัวอย่าง: [ตรวจสอบและลบข้อมูลผู้เล่น](../command#ตรวจสอบและลบข้อมูลผู้เล่น)

```lua
local success, response = exports['azael_db-guardian']:executeCommand('dbdelidle')

print(success, response)  -- true | false, response message
```

#### ตัวอย่าง: [ลบข้อมูลเฉพาะผู้เล่น](../command#ลบข้อมูลเฉพาะผู้เล่น)

```lua
local success, response = exports['azael_db-guardian']:executeCommand('dbdeluser', 'steam:xxxxxxxxxxxxxxx')

print(success, response)  -- true | false, response message
```

#### ตัวอย่าง: [ยกเลิกสถานะถูกลบข้อมูลผู้เล่น](../command#ยกเลิกสถานะถูกลบข้อมูลผู้เล่น)

```lua
local success, response = exports['azael_db-guardian']:executeCommand('dbundeluser', 'steam:xxxxxxxxxxxxxxx')

print(success, response)  -- true | false, response message
```

#### ตัวอย่าง: [ตรวจสอบข้อมูลผู้เล่น](../command#ตรวจสอบข้อมูลผู้เล่น)

```lua
local success, response = exports['azael_db-guardian']:executeCommand('dbuserinfo', 'steam:xxxxxxxxxxxxxxx')

print(success, response)  -- true | false, response message
```

#### ตัวอย่าง: [เพิ่มจำนวนวันให้ผู้เล่น (ในกรณีเเจ้งลาหยุดต่างๆ)](../command#เพิ่มจำนวนวันให้ผู้เล่น-ในกรณีเเจ้งลาหยุดต่างๆ)

```lua
local success, response = exports['azael_db-guardian']:executeCommand('dbaddleave', 'steam:xxxxxxxxxxxxxxx', 30)

print(success, response)  -- true | false, response message
```
