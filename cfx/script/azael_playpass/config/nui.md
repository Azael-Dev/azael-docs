---
sidebar_label: NUI
---

# NUI

การกำหนดค่าเกี่ยวกับอินเทอร์เฟซผู้ใช้

## userPanel

การตั้งค่าของแผงข้อมูลบัญชีผู้ใช้ (ข้อมูลของผู้เล่น)

```lua title="บรรทัดที่ 16"
userPanel = {
    enable = true,
    showOnSpawn = false,
    openKey = 'HOME',
    keyDescription = 'Open PlayPass User Panel',
}
```

- enable: `boolean`
    - เปิดใช้งานเมนูข้อมูลบัญชี
- showOnSpawn: `boolean`
    - เปิดใช้งานแสดงเมนูข้อมูลบัญชี เมื่อผู้เล่นเข้าสู่เกมและตัวละครเกิดแล้ว
- openKey: `string`
    - ปุ่มที่ใช้เปิดเมนูข้อมูลบัญชี (ดูรายการคีย์ได้ที่ [Keyboard](https://docs.fivem.net/docs/game-references/input-mapper-parameter-ids/keyboard/))
- keyDescription: `string`
    - คำอธิบายที่แสดงในเมนูการตั้งค่าคีย์

## adminPanel

การตั้งค่าของแผงข้อมูลผู้ดูแลระบบ (ข้อมูลของผู้ดูแลระบบ)

```lua title="บรรทัดที่ 23"
adminPanel = {
    enable = true,
    openKey = 'INSERT',
    keyDescription = 'Open PlayPass Admin Panel',
    pageLimit = 8,
    permissions = { ... }
}
```

- enable: `boolean`
    - เปิดใช้งานเมนูข้อมูลผู้ดูแลระบบ
- openKey: `string`
    - ปุ่มที่ใช้เปิดเมนูข้อมูลผู้ดูแลระบบ (ดูรายการคีย์ได้ที่ [Keyboard](https://docs.fivem.net/docs/game-references/input-mapper-parameter-ids/keyboard/))
- keyDescription: `string`
    - คำอธิบายที่แสดงในเมนูการตั้งค่าคีย์
- pageLimit: `integer`
    - จำนวนข้อมูลผู้เล่นต่อหน้าสำหรับแผงผู้ดูแลระบบ
- permissions: `table`
    - การกำหนดสิทธิ์เข้าถึงเมนูผู้ดูแลระบบตามลำดับบทบาท

### permissions

การกำหนดสิทธิ์เข้าถึงเมนูผู้ดูแลระบบตามลำดับบทบาท โดยบทบาทที่ต่ำกว่าจะไม่สามารถจัดการข้อมูลของบทบาทที่สูงกว่าหรือเท่ากันได้

```lua title="บรรทัดที่ 28"
permissions = {
    [PLAYER_ROLES.DEVELOPER] = {
        view = true,
        manage = {
            ban = true,
            role = true,
            points = true,
            airtime = true,
            account = true
        }
    },
    [PLAYER_ROLES.ADMIN] = {
        view = true,
        manage = {
            ban = true,
            role = true,
            points = true,
            airtime = true,
            account = true
        }
    },
    [PLAYER_ROLES.MODERATOR] = {
        view = true,
        manage = {
            ban = true,
            role = false,
            points = true,
            airtime = true,
            account = false
        }
    },
    [PLAYER_ROLES.STAFF] = {
        view = true,
        manage = {
            ban = false,
            role = false,
            points = false,
            airtime = false,
            account = false
        }
    }
}
```

- `[PLAYER_ROLES.<ROLE>]`: `table`
    - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)
        - view: `boolean`
            - อนุญาตให้ดูข้อมูลผู้เล่น
        - manage: `table`
            - อนุญาตให้จัดการข้อมูลผู้เล่นตามฟีเจอร์
                - ban: `boolean`
                    - อนุญาตให้แบน/ปลดแบนผู้เล่น
                - role: `boolean`
                    - อนุญาตให้กำหนดบทบาทผู้เล่น
                - points: `boolean`
                    - อนุญาตให้จัดการคิวพอยท์
                - airtime: `boolean`
                    - อนุญาตให้จัดการแอร์ไทม์
                - account: `boolean`
                    - อนุญาตให้สร้าง/ลบบัญชี, เปิด/ปิดสถานะ, รีเซ็ต HWIDs/BindId

## virtualKeyCodes

ตารางแปลงชื่อปุ่มเป็นรหัสคีย์สำหรับการใช้งานใน [RedM](https://www.redm.gg/) (อ้างอิงจาก [Virtual-Key Codes](https://learn.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes))

:::info

ใช้สำหรับ [RedM](https://www.redm.gg/) เท่านั้น เนื่องจาก [RedM](https://www.redm.gg/) ไม่รองรับ [RegisterKeyMapping](https://docs.fivem.net/natives/?_0xD7664FD1) คีย์ที่กำหนดใน [`userPanel.openKey`](./nui.md#userpanel) และ [`adminPanel.openKey`](./nui.md#adminpanel) จะถูกแปลงจากชื่อเป็นรหัสคีย์ผ่านตารางนี้

:::

```lua title="บรรทัดที่ 72"
virtualKeyCodes = {
    -- Letters
    A = 0x41,                                                                   -- ปุ่ม A
    B = 0x42,                                                                   -- ปุ่ม B
    C = 0x43,                                                                   -- ปุ่ม C
    D = 0x44,                                                                   -- ปุ่ม D
    E = 0x45,                                                                   -- ปุ่ม E
    F = 0x46,                                                                   -- ปุ่ม F
    G = 0x47,                                                                   -- ปุ่ม G
    H = 0x48,                                                                   -- ปุ่ม H
    I = 0x49,                                                                   -- ปุ่ม I
    J = 0x4A,                                                                   -- ปุ่ม J
    K = 0x4B,                                                                   -- ปุ่ม K
    L = 0x4C,                                                                   -- ปุ่ม L
    M = 0x4D,                                                                   -- ปุ่ม M
    N = 0x4E,                                                                   -- ปุ่ม N
    O = 0x4F,                                                                   -- ปุ่ม O
    P = 0x50,                                                                   -- ปุ่ม P
    Q = 0x51,                                                                   -- ปุ่ม Q
    R = 0x52,                                                                   -- ปุ่ม R
    S = 0x53,                                                                   -- ปุ่ม S
    T = 0x54,                                                                   -- ปุ่ม T
    U = 0x55,                                                                   -- ปุ่ม U
    V = 0x56,                                                                   -- ปุ่ม V
    W = 0x57,                                                                   -- ปุ่ม W
    X = 0x58,                                                                   -- ปุ่ม X
    Y = 0x59,                                                                   -- ปุ่ม Y
    Z = 0x5A,                                                                   -- ปุ่ม Z
    -- Numbers
    ['0'] = 0x30,                                                               -- ปุ่ม 0
    ['1'] = 0x31,                                                               -- ปุ่ม 1
    ['2'] = 0x32,                                                               -- ปุ่ม 2
    ['3'] = 0x33,                                                               -- ปุ่ม 3
    ['4'] = 0x34,                                                               -- ปุ่ม 4
    ['5'] = 0x35,                                                               -- ปุ่ม 5
    ['6'] = 0x36,                                                               -- ปุ่ม 6
    ['7'] = 0x37,                                                               -- ปุ่ม 7
    ['8'] = 0x38,                                                               -- ปุ่ม 8
    ['9'] = 0x39,                                                               -- ปุ่ม 9
    -- Function Keys
    F1  = 0x70,                                                                 -- ปุ่ม F1
    F2  = 0x71,                                                                 -- ปุ่ม F2
    F3  = 0x72,                                                                 -- ปุ่ม F3
    F4  = 0x73,                                                                 -- ปุ่ม F4
    F5  = 0x74,                                                                 -- ปุ่ม F5
    F6  = 0x75,                                                                 -- ปุ่ม F6
    F7  = 0x76,                                                                 -- ปุ่ม F7
    F8  = 0x77,                                                                 -- ปุ่ม F8
    F9  = 0x78,                                                                 -- ปุ่ม F9
    F10 = 0x79,                                                                 -- ปุ่ม F10
    F11 = 0x7A,                                                                 -- ปุ่ม F11
    F12 = 0x7B,                                                                 -- ปุ่ม F12
    -- Special Keys
    BACK     = 0x08,                                                            -- ปุ่ม Backspace
    TAB      = 0x09,                                                            -- ปุ่ม Tab
    RETURN   = 0x0D,                                                            -- ปุ่ม Enter
    ESCAPE   = 0x1B,                                                            -- ปุ่ม Escape
    SPACE    = 0x20,                                                            -- ปุ่ม Space
    HOME     = 0x24,                                                            -- ปุ่ม Home
    END      = 0x23,                                                            -- ปุ่ม End
    PRIOR    = 0x21,                                                            -- ปุ่ม Page Up
    NEXT     = 0x22,                                                            -- ปุ่ม Page Down
    INSERT   = 0x2D,                                                            -- ปุ่ม Insert
    DELETE   = 0x2E,                                                            -- ปุ่ม Delete
    -- Arrow Keys
    LEFT  = 0x25,                                                               -- ปุ่ม ←
    UP    = 0x26,                                                               -- ปุ่ม ↑
    RIGHT = 0x27,                                                               -- ปุ่ม →
    DOWN  = 0x28,                                                               -- ปุ่ม ↓
    -- Modifier Keys
    LSHIFT   = 0xA0,                                                            -- ปุ่ม Left Shift
    RSHIFT   = 0xA1,                                                            -- ปุ่ม Right Shift
    LCONTROL = 0xA2,                                                            -- ปุ่ม Left Ctrl
    RCONTROL = 0xA3,                                                            -- ปุ่ม Right Ctrl
    LMENU    = 0xA4,                                                            -- ปุ่ม Left Alt
    RMENU    = 0xA5,                                                            -- ปุ่ม Right Alt
}
```
