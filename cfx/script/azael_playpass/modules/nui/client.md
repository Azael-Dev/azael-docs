---
sidebar_label: Client
---

# NUI (Client-side)

## Nui

### show

ฟังก์ชันแสดง UI (User Panel)

```lua title="บรรทัดที่ 33"
function Nui.show()
    if isNuiVisible then return end
    
    if IsPauseMenuActive() then
        SetFrontendActive(false)
    end
    
    SendNUIMessage({ action = 'show', theme = gameName, panel = 'user', locale = getLocale() })
    SetNuiFocus(true, false)
    SetNuiFocusKeepInput(true)
    
    isNuiVisible = true
    activePanel = 'user'
    
    Citizen.CreateThread(disablePauseMenu)
end
```

### showAdmin

ฟังก์ชันแสดง UI (Admin Panel)

```lua title="บรรทัดที่ 51"
function Nui.showAdmin()
    if isNuiVisible then return end
    
    if IsPauseMenuActive() then
        SetFrontendActive(false)
    end
    
    SendNUIMessage({ action = 'show', theme = gameName, panel = 'admin', locale = getLocale() })
    SetNuiFocus(true, true)
    
    isNuiVisible = true
    activePanel = 'admin'
    
    Citizen.CreateThread(disablePauseMenu)
end
```

### close

ฟังก์ชันปิด UI

```lua title="บรรทัดที่ 70"
function Nui.close(_, cb)
    if not isNuiVisible then
        return cb and cb({ success = false, message = 'NUI is not visible' }) or nil
    end
    
    SetNuiFocus(false, false)
    SetNuiFocusKeepInput(false)
    SendNUIMessage({ action = 'close' })
    
    isNuiVisible = false
    activePanel = nil
    
    isClosing = true
    Citizen.SetTimeout(100, function() isClosing = false end)
    
    if cb then
        cb({ success = true, message = 'NUI closed successfully' })
    end
end
```

#### Parameters

- _: `any`
    - ไม่ได้ใช้งาน (สำหรับ NUI Callback)
- cb: `function?`
    - ฟังก์ชัน callback ที่จะเรียกหลังจากปิด UI (สำหรับ NUI Callback)

### isVisible

ตรวจสอบว่า NUI เปิดอยู่หรือไม่

```lua title="บรรทัดที่ 94"
function Nui.isVisible()
    return isNuiVisible
end
```

#### Returns

- isNuiVisible: `boolean`
    - สถานะว่า NUI กำลังแสดงอยู่หรือไม่

### getActivePanel

รับ panel ที่กำลังใช้งานอยู่

```lua title="บรรทัดที่ 100"
function Nui.getActivePanel()
    return activePanel
end
```

#### Returns

- activePanel: `string?`
    - ชื่อ panel ที่เปิดอยู่ (`'user'` | `'admin'` | `nil`)

### updateUser

ฟังก์ชันอัปเดตข้อมูลผู้ใช้

```lua title="บรรทัดที่ 106"
function Nui.updateUser(data)
    SendNUIMessage({ action = 'updateUser', data = data })
end
```

#### Parameters

- data: `table<{ [key]: any }>`
    - ตารางข้อมูลผู้ใช้
        - roleName: `string` | `nil`
            - ชื่อ[บทบาท](../../config/setup.md#roles)ของผู้ใช้
        - airtimeLeft: `integer` | `nil`
            - จำนวน[แอร์ไทม์คงเหลือ](../../config/core.md#airtimeserver)ของผู้ใช้
        - queuePoints: `table<{ [key]: any }>` | `nil`
            - ตารางข้อมูลคิวพ้อยท์
                - permanent: `integer`
                    - จำนวนคิวพ้อยท์แบบถาวร
                - temporary: `integer`
                    - จำนวนคิวพ้อยท์แบบชั่วคราว (มีวันหมดอายุ)
                - temporaryData: `table<{ [index]: table<{ [key]: any }> }>` | `nil`
                    - ตารางข้อมูลคิวพ้อยท์แบบชั่วคราว
                        - points: `integer`
                            - จำนวนคิวพ้อยท์
                        - expiresAt: `string`
                            - วันที่และเวลาหมดอายุของคิวพ้อยท์ ในรูปแบบ [ISO 8601 (UTC)](https://en.wikipedia.org/wiki/ISO_8601) เช่น `"2025-05-23T17:20:00Z"`

### updateQueue

ฟังก์ชันอัปเดตข้อมูล[คิวรอเชื่อมต่อ](../../config/queue.md)

```lua title="บรรทัดที่ 112"
function Nui.updateQueue(data)
    SendNUIMessage({ action = 'updateQueue', data = data })
end
```

#### Parameters

- data: `table<{ [key]: any }>` | `nil`
    - ตารางข้อมูลของ[ระบบคิว](../../config/queue.md)
        - numQueues: `integer`
            - จำนวนผู้เล่นที่รออยู่ในคิว
        - maxQueues: `integer`
            - จำนวนคิวสูงสุดที่รองรับ
        - numSlots: `integer`
            - จำนวนสล็อตเซิร์ฟเวอร์ที่ถูกใช้งาน
        - maxSlots: `integer`
            - จำนวนสล็อตเซิร์ฟเวอร์สูงสุด

### updateAdmin

ฟังก์ชันอัปเดตข้อมูลผู้ดูแลระบบ

```lua title="บรรทัดที่ 118"
function Nui.updateAdmin(data)
    SendNUIMessage({ action = 'updateAdmin', data = data })
end
```

#### Parameters

- data: `table`
    - ตารางข้อมูลของผู้ดูแลระบบ

### sendAdminActionResult

ส่งผลลัพธ์ของการดำเนินการผู้ดูแลระบบ

```lua title="บรรทัดที่ 124"
function Nui.sendAdminActionResult(data)
    SendNUIMessage({ action = 'adminActionResult', data = data })
end
```

#### Parameters

- data: `table`
    - ตารางข้อมูลผลลัพธ์ของการดำเนินการ

### sendAdminNotify

ส่งการแจ้งเตือนไปยังแผงผู้ดูแลระบบ

```lua title="บรรทัดที่ 131"
function Nui.sendAdminNotify(type, message)
    SendNUIMessage({ action = 'adminNotify', data = { type = type, message = message } })
end
```

#### Parameters

- type: `string`
    - ประเภทของการแจ้งเตือน (`'success'` | `'error'` | `'info'`)
- message: `string`
    - ข้อความแจ้งเตือน

### sendPlayerPageResult

ส่งข้อมูลผู้เล่นแบบแบ่งหน้าไปยังแผงผู้ดูแลระบบ

```lua title="บรรทัดที่ 137"
function Nui.sendPlayerPageResult(data)
    SendNUIMessage({ action = 'playerPageResult', data = data })
end
```

#### Parameters

- data: `table`
    - ตารางข้อมูลผู้เล่นแบบแบ่งหน้า
