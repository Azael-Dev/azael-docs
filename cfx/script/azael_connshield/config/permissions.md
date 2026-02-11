---
sidebar_label: Permissions
---

# Permissions

การกำหนดค่าสิทธิ์ ACE สำหรับทรัพยากรนี้ (ไฟล์ `./config/permissions.cfg`)

## การติดตั้ง

เพิ่มไฟล์ `permissions.cfg` ลงในไฟล์ `server.cfg` ของเซิร์ฟเวอร์

```bash title="server.cfg"
exec resources/<PATH_TO_RESOURCE>/azael_connshield/config/permissions.cfg
ensure azael_connshield
```

## สิทธิ์ทรัพยากร

ให้สิทธิ์ในการจัดการ ACE สำหรับทรัพยากร **azael_connshield**

```properties
add_ace resource.azael_connshield command.add_ace allow
add_ace resource.azael_connshield command.remove_ace allow
```

:::warning

สิทธิ์เหล่านี้จำเป็นสำหรับการทำงานของระบบ [Bypass Rules](./core.md#bypassrules) และ [Commands](../commands.md) โปรดอย่าลบออก

:::

## กำหนดกลุ่มให้ผู้เล่น

กำหนดกลุ่ม ACE ให้ผู้เล่นเพื่อข้ามการตรวจสอบตามกฎที่กำหนดไว้

```properties
# ตัวอย่างการกำหนดกลุ่มให้ผู้เล่น
add_principal identifier.steam:1100001332e7216 group.superadmin
add_principal identifier.steam:1100001332e7216 group.admin
add_principal identifier.steam:1100001332e7216 group.moderator
add_principal identifier.steam:1100001332e7216 group.bypass_all
add_principal identifier.steam:1100001332e7216 group.bypass_id
add_principal identifier.steam:1100001332e7216 group.bypass_ip
```

| Group | Description |
|---|---|
| `group.superadmin` | ผู้ดูแลระบบขั้นสูง |
| `group.admin` | ผู้ดูแลระบบ |
| `group.moderator` | ผู้ดูแล |
| `group.bypass_all` | ข้ามการตรวจสอบทั้งหมด |
| `group.bypass_id` | ข้ามการตรวจสอบตัวระบุที่ซ้ำกัน (Identifier Uniqueness) |
| `group.bypass_ip` | ข้ามการจำกัดการเชื่อมต่อจากที่อยู่ IP (IP Protection) |

:::tip

หากต้องการ **Bypass แบบชั่วคราว** ให้ใช้ [คำสั่งของทรัพยากรนี้](../commands.md) แทนการกำหนดกลุ่มใน `permissions.cfg`

:::
