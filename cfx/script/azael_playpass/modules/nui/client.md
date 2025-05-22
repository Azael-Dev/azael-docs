---
sidebar_label: Client
---

# NUI (Client-side)

## Nui

### show

ฟังก์ชันแสดง UI

```lua title="บรรทัดที่ 15"
function Nui.show()
    if isNuiActive then return end
    
    if IsPauseMenuActive() then
        SetFrontendActive(false)
    end
    
    SendNUIMessage({ action = 'show' })
    SetNuiFocus(true, false)
    SetNuiFocusKeepInput(true)
    
    isNuiActive = true
    Citizen.CreateThread(disablePauseMenu)
end
```

### close

ฟังก์ชันปิด UI

```lua title="บรรทัดที่ 31"
function Nui.close()
    if not isNuiActive then return end
    
    SetNuiFocus(false, false)
    SetNuiFocusKeepInput(false)
    SendNUIMessage({ action = 'close' })
    
    Citizen.SetTimeout(100, function()
        isNuiActive = false
    end)
end
```

### updateUser

ฟังก์ชันอัปเดตข้อมูลผู้ใช้

```lua title="บรรทัดที่ 66"
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
                        - points: `points`
                            - จำนวนคิวพ้อยท์
                        - expiresAt: `string`
                            - วันที่และเวลาหมดอายุของคิวพ้อยท์ ในรูปแบบ [ISO 8601 (UTC)](https://en.wikipedia.org/wiki/ISO_8601) เช่น `"2025-05-23T17:20:00Z"`

### updateQueue

ฟังก์ชันอัปเดตข้อมูล[คิวรอเชื่อมค่อ](../../config/queue.md)

```lua title="บรรทัดที่ 72"
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
