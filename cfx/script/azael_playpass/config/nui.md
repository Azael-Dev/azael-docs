---
sidebar_label: NUI
---

# NUI

การกำหนดค่าเกี่ยวกับอินเทอร์เฟซผู้ใช้

## showUIOnSpawn

แสดง UI ข้อมูลบัญชีเมื่อผู้เล่นเข้าสู่เกมและตัวละครเกิดแล้ว

```lua title="บรรทัดที่ 12"
showUIOnSpawn = false
```

- showUIOnSpawn: `boolean`
    - เปิดใช้งานแสดง UI ข้อมูลบัญชีเมื่อผู้เล่นเข้าสู่เกมและตัวละครเกิดแล้ว

## defaultKeyBindings

ค่าเริ่มต้นของการผูกคีย์ทั้งหมด ([Key Bindings](https://cookbook.fivem.net/2020/01/06/using-the-new-console-key-bindings/))

```lua title="บรรทัดที่ 14"
defaultKeyBindings = {
    showUI = { ... }
}
```

- showUI: `table`
    - คีย์เริ่มต้นสำหรับการแสดง UI ข้อมูลบัญชีของผู้เล่น

### showUI

คีย์เริ่มต้นสำหรับการแสดง UI ข้อมูลบัญชีของผู้เล่น

```lua title="บรรทัดที่ 15"
showUI = {
    enable = true,
    description = 'PlayPass Information',
    key = 'HOME'
}
```

- enable: `boolean`
    - เปิดการใช้งาน แสดง UI ข้อมูลบัญชีของผู้เล่น เมื่อดำเนินการที่คีย์ที่กำหนด
- description: `string`
    - คำอธิบายที่แสดงในเมนูการตั้งค่าคีย์
- key: `string`
    - กำหนดคีย์เริ่มต้นที่ต้องการใช้ (ดูรายการคีย์ได้ที่ [Keyboard](https://docs.fivem.net/docs/game-references/input-mapper-parameter-ids/keyboard/))
