---
sidebar_label: Server
---

# Export Functions (Server-side)

ส่งออกฟังก์ชันเพื่อให้สามารถเรียกใช้จากทรัพยากรอื่นได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Client%E2%80%93server_model#Server-side)

## executeCommand

เรียกใช้งาน [คำสั่งต่างๆ](../commands.md) ของทรัพยากรนี้

```lua
exports.azael_playpass:executeCommand(subCommandKey, args)
```

#### Arguments

- subCommandKey: `string`
    - คีย์ของ [คำสั่งย่อย](../config/command.md#subcommands) (ดูคีย์ได้ที่ [Subcommand List](./server.md#subcommand-list))
- args: `table<{ [index]: any }>` | `nil`
    - ข้อมูลที่คำสั่งต้องการ

#### Returns

- success: `boolean`
    - สถานะการใช้งานคำสั่ง
- response: `table<{ [key]: any }>`
    - ข้อมูลตอบกลับของคำสั่ง

<details>
  <summary>รายละเอียดข้อมูลตอบกลับของคำสั่ง</summary>
:::tip Success
    ข้อมูลตอบกลับเมื่อใช้คำสั่งสำเร็จ คุณสามารถดูรายละเอียดได้ที่ [**respHandler**](../modules/commands/server.md#resphandler)
:::

:::danger Failed
    ข้อมูลตอบกลับเมื่อใช้คำสั่งล้มเหลว
    | Field                 | Type                          | Description
    |-----------------------|-------------------------------|-------------------------------
    | `type`                | `string`                      | ประเภทของข้อผิดพลาด
    | `message`             | `string`                      | ข้อความของข้อผิดพลาด
:::
</details>

#### Subcommand List

| Key                       | Label
|---------------------------|-------------------------------
| `getUser`                 | [รับข้อมูลผู้ใช้](../commands.md#getuser)
| `addUser`                 | [เพิ่มข้อมูลผู้ใช้](../commands.md#adduser)
| `deleteUser`              | [ลบข้อมูลผู้ใช้](../commands.md#deleteuser)
| `getBanInfo`              | [รับข้อมูลแบนผู้ใช้](../commands.md#getbaninfo)
| `banUser`                 | [แบนผู้ใช้ (ชั่วคราว/ถาวร)](../commands.md#banuser)
| `unbanUser`               | [ยกเลิกแบนผู้ใช้](../commands.md#unbanuser)
| `setUserRole`             | [กำหนดบทบาทผู้ใช้](../commands.md#setuserrole)
| `reactivateUser`          | [ยกเลิกระงับผู้ใช้ (ไม่เล่นนานเกินกำหนด)](../commands.md#reactivateuser)
| `setNewIdentifier`        | [กำหนดตัวระบุใหม่ให้ผู้ใช้](../commands.md#setnewidentifier)
| `resetBindIdentifier`     | [รีเซ็ตตัวระบุที่ผูกไว้ของผู้ใช้](../commands.md#resetbindidentifier)
| `resetHwids`              | [รีเซ็ต HWIDs ผู้ใช้](../commands.md#resethwids)
| `getPoints`               | [รับข้อมูลคิวพอยท์ผู้ใช้](../commands.md#getpoints)
| `addPoints`               | [เพิ่มคิวพอยท์ผู้ใช้](../commands.md#addpoints)
| `setPermanentPoints`      | [กำหนดคิวพ้อยท์ถาวรผู้ใช้](../commands.md#setpermanentpoints)
| `deleteTemporaryPoints`   | [ลบคิวพ้อยท์ชั่วคราวผู้ใช้](../commands.md#deletetemporarypoints)
| `purgePoints`             | [ลบคิวพ้อยท์ทั้งหมดของผู้ใช้](../commands.md#purgepoints)
| `getAirtime`              | [รับแอร์ไทม์คงเหลือผู้ใช้](../commands.md#getairtime)
| `setAirtime`              | [กำหนดแอร์ไทม์ผู้ใช้](../commands.md#getairtime)
| `addAirtime`              | [เพิ่มแอร์ไทม์ผู้ใช้](../commands.md#addairtime)
| `removeAirtime`           | [ลบแอร์ไทม์ผู้ใช้](../commands.md#removeairtime)
| `getQueueInfo`            | [รับข้อมูลระบบคิว](../commands.md#getqueueinfo)

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
