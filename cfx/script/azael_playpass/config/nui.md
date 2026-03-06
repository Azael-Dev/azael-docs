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
