---
sidebar_label: Command
---

# Command

การกำหนดค่าเกี่ยวกับคำสั่งใช้งานภายในทรัพยากรนี้


## httpHandler

การกำหนดค่าการจัดการ [HTTP Request](https://en.wikipedia.org/wiki/HTTP) เพื่ออนุญาตให้เรียกใช้คำสั่งได้จากภายนอก

```lua title="บรรทัดที่ 14"
httpHandler = {
    enable = false,
    authorization = 'Bearer <your_bearer_token>',
    allowedIPs = {
        -- '127.0.0.1'
    }
}
```

- enable: `boolean`
    - เปิดใช้งาน [HTTP Handler](https://docs.fivem.net/natives/?_0xF5C6330C) เพื่ออนุญาตให้เรียกใช้คำสั่งจากภายนอก
- authorization: `string`
    - การกำหนดค่าการตรวจสอบสิทธิ์ของ [HTTP Request](https://en.wikipedia.org/wiki/HTTP)
- allowedIPs: `table<{ [index]: string }>` | `table<{}>`
    - การกำหนด [Public IP](https://en.wikipedia.org/wiki/IP_address#Public_address) ที่อนุญาตให้เข้าถึง
        - ⚠️ หากไม่มีการกำหนด IP ระบบจะอ้างอิงสิทธิ์การเข้าถึงจาก `authorization` เท่านั้น

## commandName

ชื่อคำสั่งหลักสำหรับใช้งานใน Server Console หรือ Client Console เพื่ออ้างอิงคำสั่งของทรัพยากรนี้

```lua title="บรรทัดที่ 27"
commandName = 'app'
```

- commandName: `string`
    - ตัวอย่างการใช้คำสั่ง `<commandName> <subCommandName> <args...>`

## subCommands

รายการคำสั่งย่อย

```lua title="บรรทัดที่ 29"
subCommands  = { ... }
```

### getUser

คำสั่งรับข้อมูลผู้ใช้

```lua title="บรรทัดที่ 30"
getUser = {
    name = 'getuser',
    serverOnly = false,
    allowedRoles = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
        - ตัวอย่างการใช้คำสั่ง `<commandName> getuser <identifier>`
- serverOnly: `boolean`
    - ใช้งานคำสั่งได้ทางฝั่งเซิร์ฟเวอร์เท่านั้น
- allowedRoles: `table<{ [index]: integer }>` | `table<{}>`
    - บทบาทที่อนุญาตให้ใช้คำสั่งทางฝั่งไคลเอนต์
        - ⚠️ ไม่สามารถใช้งานคำสั่งทางฝั่งไคลเอนต์ได้ หากกำหนด `serverOnly` เป็น `true`
        - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)

### addUser

คำสั่งเพิ่มข้อมูลผู้ใช้

```lua title="บรรทัดที่ 39"
addUser = {
    name = 'adduser',
    serverOnly = false,
    allowedRoles = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
        - ตัวอย่างการใช้คำสั่ง `<commandName> adduser <identifier> <bindId|nil>`
- serverOnly: `boolean`
    - ใช้งานคำสั่งได้ทางฝั่งเซิร์ฟเวอร์เท่านั้น
- allowedRoles: `table<{ [index]: integer }>` | `table<{}>`
    - บทบาทที่อนุญาตให้ใช้คำสั่งทางฝั่งไคลเอนต์
        - ⚠️ ไม่สามารถใช้งานคำสั่งทางฝั่งไคลเอนต์ได้ หากกำหนด `serverOnly` เป็น `true`
        - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)

### deleteUser

คำสั่งลบข้อมูลผู้ใช้

```lua title="บรรทัดที่ 48"
deleteUser = {
    name = 'deluser',
    serverOnly = false,
    allowedRoles = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
        - ตัวอย่างการใช้คำสั่ง `<commandName> deluser <identifier>`
- serverOnly: `boolean`
    - ใช้งานคำสั่งได้ทางฝั่งเซิร์ฟเวอร์เท่านั้น
- allowedRoles: `table<{ [index]: integer }>` | `table<{}>`
    - บทบาทที่อนุญาตให้ใช้คำสั่งทางฝั่งไคลเอนต์
        - ⚠️ ไม่สามารถใช้งานคำสั่งทางฝั่งไคลเอนต์ได้ หากกำหนด `serverOnly` เป็น `true`
        - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)

### getBanInfo

คำสั่งรับข้อมูลการถูกแบน

```lua title="บรรทัดที่ 57"
getBanInfo = {
    name = 'baninfo',
    serverOnly = false,
    allowedRoles = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
        - ตัวอย่างการใช้คำสั่ง `<commandName> baninfo <identifier|banRefId>`
- serverOnly: `boolean`
    - ใช้งานคำสั่งได้ทางฝั่งเซิร์ฟเวอร์เท่านั้น
- allowedRoles: `table<{ [index]: integer }>` | `table<{}>`
    - บทบาทที่อนุญาตให้ใช้คำสั่งทางฝั่งไคลเอนต์
        - ⚠️ ไม่สามารถใช้งานคำสั่งทางฝั่งไคลเอนต์ได้ หากกำหนด `serverOnly` เป็น `true`
        - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)

### banUser

คำสั่งแบนผู้ใช้ถาวรหรือชั่วคราว

```lua title="บรรทัดที่ 66"
banUser = {
    name = 'banuser',
    serverOnly = false,
    allowedRoles = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
        - ตัวอย่างการใช้คำสั่ง `<commandName> banuser <identifier> <numDays|0=permanent> <reason>`
- serverOnly: `boolean`
    - ใช้งานคำสั่งได้ทางฝั่งเซิร์ฟเวอร์เท่านั้น
- allowedRoles: `table<{ [index]: integer }>` | `table<{}>`
    - บทบาทที่อนุญาตให้ใช้คำสั่งทางฝั่งไคลเอนต์
        - ⚠️ ไม่สามารถใช้งานคำสั่งทางฝั่งไคลเอนต์ได้ หากกำหนด `serverOnly` เป็น `true`
        - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)

### unbanUser

คำสั่งยกเลิกแบนผู้ใช้

```lua title="บรรทัดที่ 75"
unbanUser = {
    name = 'banuser',
    serverOnly = false,
    allowedRoles = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
        - ตัวอย่างการใช้คำสั่ง `<commandName> unbanuser <identifier>`
- serverOnly: `boolean`
    - ใช้งานคำสั่งได้ทางฝั่งเซิร์ฟเวอร์เท่านั้น
- allowedRoles: `table<{ [index]: integer }>` | `table<{}>`
    - บทบาทที่อนุญาตให้ใช้คำสั่งทางฝั่งไคลเอนต์
        - ⚠️ ไม่สามารถใช้งานคำสั่งทางฝั่งไคลเอนต์ได้ หากกำหนด `serverOnly` เป็น `true`
        - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)

### setUserRole

คำสั่งกำหนดบทบาทของผู้ใช้

```lua title="บรรทัดที่ 84"
setUserRole = {
    name = 'setrole',
    serverOnly = false,
    allowedRoles = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
        - ตัวอย่างการใช้คำสั่ง `<commandName> setrole <identifier> <roleId>`
- serverOnly: `boolean`
    - ใช้งานคำสั่งได้ทางฝั่งเซิร์ฟเวอร์เท่านั้น
- allowedRoles: `table<{ [index]: integer }>` | `table<{}>`
    - บทบาทที่อนุญาตให้ใช้คำสั่งทางฝั่งไคลเอนต์
        - ⚠️ ไม่สามารถใช้งานคำสั่งทางฝั่งไคลเอนต์ได้ หากกำหนด `serverOnly` เป็น `true`
        - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)

### reactivateUser

คำสั่งยกเลิกสถานะการถูกระงับเมื่อผู้เล่นถูกระงับจาก [inactivePlayers](./core.md#inactiveplayers)

```lua title="บรรทัดที่ 93"
reactivateUser = {
    name = 'reactivate',
    serverOnly = false,
    allowedRoles = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
        - ตัวอย่างการใช้คำสั่ง `<commandName> reactivate <identifier>`
- serverOnly: `boolean`
    - ใช้งานคำสั่งได้ทางฝั่งเซิร์ฟเวอร์เท่านั้น
- allowedRoles: `table<{ [index]: integer }>` | `table<{}>`
    - บทบาทที่อนุญาตให้ใช้คำสั่งทางฝั่งไคลเอนต์
        - ⚠️ ไม่สามารถใช้งานคำสั่งทางฝั่งไคลเอนต์ได้ หากกำหนด `serverOnly` เป็น `true`
        - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)

### setNewIdentifier

คำสั่งกำหนดตัวระบุให้ผู้ใช้ใหม่

```lua title="บรรทัดที่ 102"
setNewIdentifier = {
    name = 'setnewid',
    serverOnly = false,
    allowedRoles = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
        - ตัวอย่างการใช้คำสั่ง `<commandName> setnewid <identifier> <newIdentifier>`
- serverOnly: `boolean`
    - ใช้งานคำสั่งได้ทางฝั่งเซิร์ฟเวอร์เท่านั้น
- allowedRoles: `table<{ [index]: integer }>` | `table<{}>`
    - บทบาทที่อนุญาตให้ใช้คำสั่งทางฝั่งไคลเอนต์
        - ⚠️ ไม่สามารถใช้งานคำสั่งทางฝั่งไคลเอนต์ได้ หากกำหนด `serverOnly` เป็น `true`
        - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)

### resetBindIdentifier

คำสั่งรีเซ็ต[ตัวระบุที่ถูกผูกไว้](./core.md#bindidentifier)ของผู้ใช้

```lua title="บรรทัดที่ 111"
resetBindIdentifier = {
    name = 'resetbindid',
    serverOnly = false,
    allowedRoles = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
        - ตัวอย่างการใช้คำสั่ง `<commandName> resetbindid <identifier>`
- serverOnly: `boolean`
    - ใช้งานคำสั่งได้ทางฝั่งเซิร์ฟเวอร์เท่านั้น
- allowedRoles: `table<{ [index]: integer }>` | `table<{}>`
    - บทบาทที่อนุญาตให้ใช้คำสั่งทางฝั่งไคลเอนต์
        - ⚠️ ไม่สามารถใช้งานคำสั่งทางฝั่งไคลเอนต์ได้ หากกำหนด `serverOnly` เป็น `true`
        - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)

### resetHwids

คำสั่งรีเซ็ต [HWIDs](https://docs.fivem.net/natives/?_0x54C06897) ของผู้ใช้

```lua title="บรรทัดที่ 120"
resetHwids = {
    name = 'resethwids',
    serverOnly = false,
    allowedRoles = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
        - ตัวอย่างการใช้คำสั่ง `<commandName> resethwids <identifier>`
- serverOnly: `boolean`
    - ใช้งานคำสั่งได้ทางฝั่งเซิร์ฟเวอร์เท่านั้น
- allowedRoles: `table<{ [index]: integer }>` | `table<{}>`
    - บทบาทที่อนุญาตให้ใช้คำสั่งทางฝั่งไคลเอนต์
        - ⚠️ ไม่สามารถใช้งานคำสั่งทางฝั่งไคลเอนต์ได้ หากกำหนด `serverOnly` เป็น `true`
        - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)

### getPoints

คำสั่งรับข้อมูลคิวพอยท์ของผู้ใช้

```lua title="บรรทัดที่ 129"
getPoints = {
    name = 'getpoints',
    serverOnly = false,
    allowedRoles = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
        - ตัวอย่างการใช้คำสั่ง `<commandName> getpoints <identifier>`
- serverOnly: `boolean`
    - ใช้งานคำสั่งได้ทางฝั่งเซิร์ฟเวอร์เท่านั้น
- allowedRoles: `table<{ [index]: integer }>` | `table<{}>`
    - บทบาทที่อนุญาตให้ใช้คำสั่งทางฝั่งไคลเอนต์
        - ⚠️ ไม่สามารถใช้งานคำสั่งทางฝั่งไคลเอนต์ได้ หากกำหนด `serverOnly` เป็น `true`
        - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)

### addPoints

คำสั่งเพิ่มคิวพอยท์ให้ผู้ใช้

```lua title="บรรทัดที่ 138"
addPoints = {
    name = 'addpoints',
    serverOnly = false,
    allowedRoles = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
        - ตัวอย่างการใช้คำสั่ง `<commandName> addpoints <identifier> <numPoints> <expirationDays|nil>`
- serverOnly: `boolean`
    - ใช้งานคำสั่งได้ทางฝั่งเซิร์ฟเวอร์เท่านั้น
- allowedRoles: `table<{ [index]: integer }>` | `table<{}>`
    - บทบาทที่อนุญาตให้ใช้คำสั่งทางฝั่งไคลเอนต์
        - ⚠️ ไม่สามารถใช้งานคำสั่งทางฝั่งไคลเอนต์ได้ หากกำหนด `serverOnly` เป็น `true`
        - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)

### setPermanentPoints

คำสั่งกำหนดคิวพ้อยท์แบบไม่มีวันหมดอายุให้ผู้ใช้

```lua title="บรรทัดที่ 147"
setPermanentPoints = {
    name = 'setpoints',
    serverOnly = false,
    allowedRoles = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
        - ตัวอย่างการใช้คำสั่ง `<commandName> setpoints <identifier> <numPoints>`
- serverOnly: `boolean`
    - ใช้งานคำสั่งได้ทางฝั่งเซิร์ฟเวอร์เท่านั้น
- allowedRoles: `table<{ [index]: integer }>` | `table<{}>`
    - บทบาทที่อนุญาตให้ใช้คำสั่งทางฝั่งไคลเอนต์
        - ⚠️ ไม่สามารถใช้งานคำสั่งทางฝั่งไคลเอนต์ได้ หากกำหนด `serverOnly` เป็น `true`
        - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)

### deleteTemporaryPoints

คำสั่งลบคิวพ้อยท์แบบมีวันหมดอายุของผู้ใช้

```lua title="บรรทัดที่ 156"
deleteTemporaryPoints = {
    name = 'delpoints',
    serverOnly = false,
    allowedRoles = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
        - ตัวอย่างการใช้คำสั่ง `<commandName> delpoints <identifier> <numIndex>`
- serverOnly: `boolean`
    - ใช้งานคำสั่งได้ทางฝั่งเซิร์ฟเวอร์เท่านั้น
- allowedRoles: `table<{ [index]: integer }>` | `table<{}>`
    - บทบาทที่อนุญาตให้ใช้คำสั่งทางฝั่งไคลเอนต์
        - ⚠️ ไม่สามารถใช้งานคำสั่งทางฝั่งไคลเอนต์ได้ หากกำหนด `serverOnly` เป็น `true`
        - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)

### purgePoints

คำสั่งลบคิวพ้อยท์ทั้งหมดของผู้ใช้

```lua title="บรรทัดที่ 165"
purgePoints = {
    name = 'purgepoints',
    serverOnly = false,
    allowedRoles = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
        - ตัวอย่างการใช้คำสั่ง `<commandName> purgepoints <identifier>`
- serverOnly: `boolean`
    - ใช้งานคำสั่งได้ทางฝั่งเซิร์ฟเวอร์เท่านั้น
- allowedRoles: `table<{ [index]: integer }>` | `table<{}>`
    - บทบาทที่อนุญาตให้ใช้คำสั่งทางฝั่งไคลเอนต์
        - ⚠️ ไม่สามารถใช้งานคำสั่งทางฝั่งไคลเอนต์ได้ หากกำหนด `serverOnly` เป็น `true`
        - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)

### getAirtime

คำสั่งรับแอร์ไทม์คงเหลือของผู้ใช้

```lua title="บรรทัดที่ 174"
getAirtime = {
    name = 'getairtime',
    serverOnly = false,
    allowedRoles = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
        - ตัวอย่างการใช้คำสั่ง `<commandName> getairtime <identifier>`
- serverOnly: `boolean`
    - ใช้งานคำสั่งได้ทางฝั่งเซิร์ฟเวอร์เท่านั้น
- allowedRoles: `table<{ [index]: integer }>` | `table<{}>`
    - บทบาทที่อนุญาตให้ใช้คำสั่งทางฝั่งไคลเอนต์
        - ⚠️ ไม่สามารถใช้งานคำสั่งทางฝั่งไคลเอนต์ได้ หากกำหนด `serverOnly` เป็น `true`
        - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)

### setAirtime

คำสั่งกำหนดแอร์ไทม์ให้ผู้ใช้

```lua title="บรรทัดที่ 183"
setAirtime = {
    name = 'setairtime',
    serverOnly = false,
    allowedRoles = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
        - ตัวอย่างการใช้คำสั่ง `<commandName> setairtime <identifier> <numSeconds>`
- serverOnly: `boolean`
    - ใช้งานคำสั่งได้ทางฝั่งเซิร์ฟเวอร์เท่านั้น
- allowedRoles: `table<{ [index]: integer }>` | `table<{}>`
    - บทบาทที่อนุญาตให้ใช้คำสั่งทางฝั่งไคลเอนต์
        - ⚠️ ไม่สามารถใช้งานคำสั่งทางฝั่งไคลเอนต์ได้ หากกำหนด `serverOnly` เป็น `true`
        - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)

### addAirtime

คำสั่งเพิ่มแอร์ไทม์ให้ผู้ใช้

```lua title="บรรทัดที่ 192"
addAirtime = {
    name = 'addairtime',
    serverOnly = false,
    allowedRoles = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
        - ตัวอย่างการใช้คำสั่ง `<commandName> addairtime <identifier> <numSeconds>`
- serverOnly: `boolean`
    - ใช้งานคำสั่งได้ทางฝั่งเซิร์ฟเวอร์เท่านั้น
- allowedRoles: `table<{ [index]: integer }>` | `table<{}>`
    - บทบาทที่อนุญาตให้ใช้คำสั่งทางฝั่งไคลเอนต์
        - ⚠️ ไม่สามารถใช้งานคำสั่งทางฝั่งไคลเอนต์ได้ หากกำหนด `serverOnly` เป็น `true`
        - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)

### removeAirtime

คำสั่งลบ/ลดแอร์ไทม์ของผู้ใช้

```lua title="บรรทัดที่ 201"
removeAirtime = {
    name = 'removeairtime',
    serverOnly = false,
    allowedRoles = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
        - ตัวอย่างการใช้คำสั่ง `<commandName> removeairtime <identifier> <numSeconds>`
- serverOnly: `boolean`
    - ใช้งานคำสั่งได้ทางฝั่งเซิร์ฟเวอร์เท่านั้น
- allowedRoles: `table<{ [index]: integer }>` | `table<{}>`
    - บทบาทที่อนุญาตให้ใช้คำสั่งทางฝั่งไคลเอนต์
        - ⚠️ ไม่สามารถใช้งานคำสั่งทางฝั่งไคลเอนต์ได้ หากกำหนด `serverOnly` เป็น `true`
        - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)

### clearPlayerCache

คำสั่งสำหรับล้างแคชข้อมูลผู้เล่น (ℹ️ ใช้เมื่อเกิดข้อผิดพลาด และต้องการโหลดข้อมูลผู้เล่นใหม่จากฐานข้อมูล)

```lua title="บรรทัดที่ 210"
clearPlayerCache = {
    name = 'clearcache',
    serverOnly = false,
    allowedRoles = {
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```
- name: `string`
    - ชื่อคำสั่งย่อย
        - ตัวอย่างการใช้คำสั่ง `<commandName> clearcache <identifier>`
- serverOnly: `boolean`
    - ใช้งานคำสั่งได้ทางฝั่งเซิร์ฟเวอร์เท่านั้น
- allowedRoles: `table<{ [index]: integer }>` | `table<{}>`
    - บทบาทที่อนุญาตให้ใช้คำสั่งทางฝั่งไคลเอนต์
        - ⚠️ ไม่สามารถใช้งานคำสั่งทางฝั่งไคลเอนต์ได้ หากกำหนด `serverOnly` เป็น `true`
        - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)

### getMyInfo

คำสั่งรับข้อมูลส่วนตัวของผู้เล่นภายในเกม (ℹ️ คำสั่งนี้สามารถใช้งานได้เพียงฝั่งไคลเอนต์เท่านั้น)

```lua title="บรรทัดที่ 219"
getMyInfo = {
    name = 'myinfo',
    allowedRoles = {
        PLAYER_ROLES.PLAYER,
        PLAYER_ROLES.VIP,
        PLAYER_ROLES.STAFF,
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
        - ตัวอย่างการใช้คำสั่ง `<commandName> myinfo`
- allowedRoles: `table<{ [index]: integer }>` | `table<{}>`
    - บทบาทที่อนุญาตให้ใช้คำสั่งทางฝั่งไคลเอนต์
        - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)

### getQueueInfo

คำสั่งรับข้อมูลเกี่ยวกับระบบคิว

```lua title="บรรทัดที่ 230"
getQueueInfo = {
    name = 'queueinfo',
    serverOnly = false,
    allowedRoles = {
        PLAYER_ROLES.PLAYER,
        PLAYER_ROLES.VIP,
        PLAYER_ROLES.STAFF,
        PLAYER_ROLES.MODERATOR,
        PLAYER_ROLES.ADMIN,
        PLAYER_ROLES.DEVELOPER
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
        - ตัวอย่างการใช้คำสั่ง `<commandName> queueinfo`
- serverOnly: `boolean`
    - ใช้งานคำสั่งได้ทางฝั่งเซิร์ฟเวอร์เท่านั้น
- allowedRoles: `table<{ [index]: integer }>` | `table<{}>`
    - บทบาทที่อนุญาตให้ใช้คำสั่งทางฝั่งไคลเอนต์
        - ⚠️ ไม่สามารถใช้งานคำสั่งทางฝั่งไคลเอนต์ได้ หากกำหนด `serverOnly` เป็น `true`
        - [**PLAYER_ROLES**](./setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าจากไฟล์ [`./config/setup.lua`](./setup.md)
