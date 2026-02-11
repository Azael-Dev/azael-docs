---
sidebar_label: Command
---

# Command

การกำหนดค่าเกี่ยวกับคำสั่งใช้งานภายในทรัพยากรนี้

## commandName

ชื่อคำสั่งหลักสำหรับใช้งานใน Server Console หรือ Client Console เพื่ออ้างอิงคำสั่งของทรัพยากรนี้

```lua title="บรรทัดที่ 20"
commandName = 'cshield'
```

- commandName: `string`
    - ตัวอย่างการใช้คำสั่ง: `<commandName> <subCommandName> <args...>`

## subCommands

รายการคำสั่งย่อยทั้งหมดของทรัพยากรนี้

### addBypass

คำสั่งย่อย: เพิ่มสิทธิ์ข้ามกฎการตรวจสอบ

```lua title="บรรทัดที่ 23"
addBypass = {
    name = 'addbypass',
    serverOnly = false,
    allowedGroups = {
        GROUPS.SUPERADMIN,
        GROUPS.ADMIN,
        GROUPS.MODERATOR
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
- serverOnly: `boolean`
    - ใช้คำสั่งฝั่งเซิร์ฟเวอร์เท่านั้น (`true` = เปิดใช้งาน, `false` = ปิดใช้งาน)
- allowedGroups: `table<{ [index]: string }>`
    - กลุ่มผู้ใช้ที่อนุญาตให้ใช้คำสั่งฝั่งไคลเอนต์ (ACE Permission Groups)

### removeBypass

คำสั่งย่อย: ลบสิทธิ์ข้ามกฎการตรวจสอบ

```lua title="บรรทัดที่ 32"
removeBypass = {
    name = 'removebypass',
    serverOnly = false,
    allowedGroups = {
        GROUPS.SUPERADMIN,
        GROUPS.ADMIN,
        GROUPS.MODERATOR
    }
}
```

- name: `string`
    - ชื่อคำสั่งย่อย
- serverOnly: `boolean`
    - ใช้คำสั่งฝั่งเซิร์ฟเวอร์เท่านั้น (`true` = เปิดใช้งาน, `false` = ปิดใช้งาน)
- allowedGroups: `table<{ [index]: string }>`
    - กลุ่มผู้ใช้ที่อนุญาตให้ใช้คำสั่งฝั่งไคลเอนต์ (ACE Permission Groups)
