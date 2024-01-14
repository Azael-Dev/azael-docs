---
sidebar_label: Shared
---

# shared.config

ไฟล์การกำหนดค่าของทรัพยากรทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)** และ **[Client](https://en.wikipedia.org/wiki/Client-side)**

## Resource

ทรัพยากร

```lua title="บรรทัดที่ 13"
CONFIG.Resource = {} -- [[ table ]]
```

### Name

ชื่อทรัพยากร

```lua title="บรรทัดที่ 14"
CONFIG.Resource.Name = GetCurrentResourceName() -- [[ string ]]
```

:::info

ใช้สำหรับการลงทะเบียน Events ภายในทรัพยากรนี้

:::

## Frameworks

การกำหนดค่า **[Framework](https://en.wikipedia.org/wiki/Framework)** เพื่อเรียกใช้งานรหัสภายใน **[public/framework](../public/framework.md)/dir** เมื่อทรัพยากรเริ่มต้น

```lua title="บรรทัดที่ 17"
CONFIG.Frameworks = { -- [[ table ]]
    --[[ ESX Framework ]]
    {
        Resource = 'es_extended', -- [[ string ]]
        Directory = 'esx', -- [[ string ]]
        Dependencies = { -- [[ table ]]
            'esx_status' -- [[ string ]]
        }
    },

    --[[ QBCore Framework ]]
    {
        Resource = 'qb-core', -- [[ string ]]
        Directory = 'qb' -- [[ string ]]
    }
}
```

:::info

- สามารถเพิ่ม **[Framework](https://en.wikipedia.org/wiki/Framework)** ได้ (คุณสามารถดูรายละเอียดได้ที่ **[public/framework](../public/framework.md)**)
- `Resource` คือ ชื่อทรัพยากร ของ **[Framework](https://en.wikipedia.org/wiki/Framework)**
- `Directory` คือ ชื่อไดเรกทอรี ของ **[Framework](https://en.wikipedia.org/wiki/Framework)** ภายใน **[public/framework](../public/framework.md)/dir**
- `Dependencies` คือ การพึ่งพาทรัพยากร (**ความต้องการ**)

:::

:::tip

ระบบจะทำการตรวจสอบ **[Framework](https://en.wikipedia.org/wiki/Framework)** ที่คุณใช้งานโดยอัตโนมัติ

:::

## Debug

แสดง **Debug** เพื่อตรวจสอบสถานะการทำงานต่างๆ

```lua title="บรรทัดที่ 32"
CONFIG.Debug = {} -- [[ table ]]
```

### Enable

เปิดใช้งาน แสดง **Debug** ไปยัง **[Server Console](https://docs.fivem.net/docs/server-manual/server-commands)** หรือ **[Client Console](https://docs.fivem.net/docs/client-manual/console-commands)** <kbd>F8</kbd>

```lua title="บรรทัดที่ 33"
CONFIG.Debug.Enable = false -- [[ boolean ]]
```

:::caution

ไม่แนะนำให้เปิดใช้งาน หากเซิร์ฟเวอร์ของคุณมีผู้เล่นออนไลน์อยู่เป็นจำนวนมาก

:::
