---
sidebar_label: Server
---

# server.config

ไฟล์การกำหนดค่าของทรัพยากรทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)**

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
    },

    --[[ QBCore Framework ]]
    {
        Resource = 'qb-core', -- [[ string ]]
        Directory = 'qb' -- [[ string ]]
    },

    --[[ VORPCore Framework ]]
    {
        Resource = 'vorp_core', -- [[ string ]]
        Directory = 'vorp' -- [[ string ]]
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

```lua title="บรรทัดที่ 34"
CONFIG.Debug = {} -- [[ table ]]
```

### Enable

เปิดใช้งาน แสดง **Debug** ไปยัง **[Server Console](https://docs.fivem.net/docs/server-manual/server-commands)**

```lua title="บรรทัดที่ 35"
CONFIG.Debug.Enable = false -- [[ boolean ]]
```

:::caution

ไม่แนะนำให้เปิดใช้งาน หากเซิร์ฟเวอร์ของคุณมีผู้เล่นออนไลน์อยู่เป็นจำนวนมาก

:::

## General

ทั่วไป

```lua title="บรรทัดที่ 38"
CONFIG.General = {} -- [[ table ]]
```

### UserIdle.LimitDays

หากผู้เล่นไม่เชื่อมต่อกับเซิร์ฟเวอร์เป็นเวลา **`X`** วัน จะเข้าเงื่อนไขการลบข้อมูลของผู้เล่น ออกจากฐานข้อมูลของเซิร์ฟเวอร์

```lua title="บรรทัดที่ 40"
CONFIG.General.UserIdle.LimitDays = 90 -- [[ number ]]
```

:::info

`1` เท่ากับ `1` วัน

:::

### AutoDelete.Enable

เปิดใช้งาน ตรวจสอบ และ ลบข้อมูล ผู้เล่นที่ไม่เชื่อมต่อกับเซิร์ฟเวอร์ตามการกำหนดค่า [**UserIdle.LimitDays**](./server.md#useridlelimitdays) โดยอัตโนมัติ เมื่อมีการเริ่มต้นทรัพยากรนี้ภายในช่วงเวลาที่กำหนดใน [**AutoDelete.TimeBetween**](./server.md#autodeletetimebetween)

```lua title="บรรทัดที่ 43"
CONFIG.General.AutoDelete.Enable = true -- [[ boolean ]]
```

:::info

- `true` เท่ากับ เปิดใช้งาน
- `false` เท่ากับ ปิดใช้งาน

:::

### AutoDelete.Limit

จำกัดการลบข้อมูลของผู้เล่นสูงสุด

```lua title="บรรทัดที่ 44"
CONFIG.General.AutoDelete.Limit = 1000 -- [[ number ]]
```

:::info

`1000` เท่ากับ `1000` ผู้เล่นที่ไม่เชื่อมต่อ

:::

### AutoDelete.TimeBetween

ตรวจสอบ และ ลบข้อมูล โดยอัตโนมัติ เมื่อมีการเริ่มต้นทรัพยากรนี้ภายในช่วงเวลาที่กำหนด (รูปแบบเวลา `HH:mm`)

```lua title="บรรทัดที่ 46"
CONFIG.General.AutoDelete.TimeBetween = { -- [[ table ]]
    {
        StartTime  = '05:00', -- [[ string ]]
        EndTime = '08:00'
    }
}
```

:::info

คุณสามารถเพิ่มข้อมูลได้ดังตัวอย่างด้านล่างนี้

```lua
{
    StartTime  = '05:00',
    EndTime = '08:00'
},
{
    StartTime  = '23:00',
    EndTime = '03:00'
}
```

:::

### IgnoreDelete.Enable

เปิดใช้งาน ละเว้นการ ลบข้อมูล จากตัวระบุที่กำหนด

```lua title="บรรทัดที่ 55"
CONFIG.General.IgnoreDelete.Enable = false -- [[ boolean ]]
```

:::info

- `true` เท่ากับ เปิดใช้งาน
- `false` เท่ากับ ปิดใช้งาน

:::

### IgnoreDelete.Identifiers

เปิดใช้งาน ละเว้นการ ลบข้อมูล จากตัวระบุที่กำหนด

```lua title="บรรทัดที่ 57"
CONFIG.General.IgnoreDelete.Identifiers = { -- [[ table ]]
    'steam:xxxxxxxxxxxxxxa', -- [[ string ]]
    'steam:xxxxxxxxxxxxxxb' -- [[ string ]]
}
```

:::info

- [**ESX Framework**](https://github.com/esx-framework) อ้างอิง ตัวระบุ บนฐานข้อมูลจากตาราง `users` คอลัมน์ `identifier`
- [**QBCore Framework**](https://github.com/qbcore-framework) อ้างอิง ตัวระบุ บนฐานข้อมูลจากตาราง `players` คอลัมน์ `license`
- [**VORPCore Framework**](https://github.com/VORPCORE) อ้างอิง ตัวระบุ บนฐานข้อมูลจากตาราง `users` คอลัมน์ `identifier`

:::

### LastSeen.MustBeOnline.Minutes

หากผู้เล่นเชื่อมต่อกับเซิร์ฟเวอร์แล้ว จะต้องออนไลน์เป็นเวลา **`X`** นาที จึงจะอัพเดทข้อมูลการเชื่อมต่อครั้งล่าสุดของผู้เล่น

```lua title="บรรทัดที่ 66"
CONFIG.General.LastSeen.MustBeOnline.Minutes = 5 -- [[ number ]]
```

:::info

`1` เท่ากับ `1` นาที

:::

### LastSeen.PlayerDropped.Enable

เปิดใช้งาน อัพเดทวันที่เชื่อมต่อกับเซิร์ฟเวอร์อีกครั้ง เมื่อผู้เล่นตัดการเชื่อมต่อกับเซิร์ฟเวอร์

```lua title="บรรทัดที่ 70"
CONFIG.General.LastSeen.PlayerDropped.Enable = true -- [[ boolean ]]
```

:::info

- `true` เท่ากับ เปิดใช้งาน
- `false` เท่ากับ ปิดใช้งาน

:::

### Backup.ServerData.ResourceStart.Enable

เปิดใช้งาน สำรองข้อมูลของเซิร์ฟเวอร์ เมื่อทรัพยากรนี้เรื่มต้น (เส้นทางไฟล์: **`azael_data/azael_db-guardian/server-backups`**)

```lua title="บรรทัดที่ 77"
CONFIG.General.Backup.ServerData.ResourceStart.Enable = true -- [[ boolean ]]
```

:::info

- `true` เท่ากับ เปิดใช้งาน
- `false` เท่ากับ ปิดใช้งาน

:::

### Backup.ServerData.ResourceStart.HourDist

ระยะเวลาที่จะไม่สำรองข้อมูลอีกครั้งภายใน **`X`** ชั่วโมง หากมีการสำรองข้อมูลของเซิร์ฟเวอร์ไปแล้ว เมื่อทรัพยากรนี้เรื่มต้น

```lua title="บรรทัดที่ 78"
CONFIG.General.Backup.ServerData.ResourceStart.HourDist = 8 -- [[ number ]]
```

:::info

`1` เท่ากับ `1` ชั่วโมง

:::

:::tip

ระบบอ้างอิงวันเวลาจากไฟล์ **`backup-started.json`** คุณสามารถลบไฟล์ทิ้งได้หากต้องการให้สำรองข้อมูลใหม่อีกครั้งเมื่อทรัพยากรนี้เริ่มต้น

:::

### Backup.ServerData.Schedule.Enable

เปิดใช้งาน สำรองข้อมูลของเซิร์ฟเวอร์ ตามเวลาที่กำหนดใน [Backup.ServerData.Schedule.Times](./server.md#backupserverdatascheduletimes) ในขณะที่เซิร์ฟเวอร์ออนไลน์อยู่

```lua title="บรรทัดที่ 82"
CONFIG.General.Backup.ServerData.Schedule.Enable = true -- [[ boolean ]]
```

:::info

- `true` เท่ากับ เปิดใช้งาน
- `false` เท่ากับ ปิดใช้งาน

:::

### Backup.ServerData.Schedule.Times

กำหนดเวลาที่ต้องการ สำรองข้อมูลของเซิร์ฟเวอร์ ในขณะที่เซิร์ฟเวอร์ออนไลน์อยู่ (รูปแบบเวลา `HH:mm`)

```lua title="บรรทัดที่ 84"
CONFIG.General.Backup.ServerData.Schedule.Times = { -- [[ table ]]
    '00:00', -- [[ string ]]
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
}
```

:::info

รูปแบบเวลา **`00:00`** ถึง **`23:59`** และการกำหนดค่าเริ่มต้นจะดำเนินการ **สำรองข้อมูลของเซิร์ฟเวอร์** ทุก **1** ชั่วโมง

:::

### Backup.ServerData.DeleteOldFiles.Enable

เปิดใช้งาน ลบไฟล์ สำรองข้อมูลของเซิร์ฟเวอร์ หากไฟล์เก่ากว่า **`X`** วัน ตามการกำหนดค่า [**Backup.ServerData.DeleteOldFiles.Days**](./server.md#backupserverdatadeleteoldfilesdays)

```lua title="บรรทัดที่ 113"
CONFIG.General.Backup.ServerData.DeleteOldFiles.Enable = true -- [[ boolean ]]
```

:::info

- `true` เท่ากับ เปิดใช้งาน
- `false` เท่ากับ ปิดใช้งาน

:::

### Backup.ServerData.DeleteOldFiles.Days

จำนวนวันที่ต้องการจัดเก็บไฟล์ สำรองข้อมูลของเซิร์ฟเวอร์ หากไฟล์เก่ากว่า **`X`** วัน ระบบจำดำเนินการลบไฟล์ทิ้ง (ต้องเปิดใช้งาน [**Backup.ServerData.DeleteOldFiles.Enable**](./server.md#backupserverdatadeleteoldfilesenable))

```lua title="บรรทัดที่ 114"
CONFIG.General.Backup.ServerData.DeleteOldFiles.Days = 30 -- [[ number ]]
```

:::info

`1` เท่ากับ `1` วัน

:::

### Backup.PlayerData.Enable

เปิดใช้งาน สำรองข้อมูลของผู้เล่น เมื่อถูกลบข้อมูล (เส้นทางไฟล์: **`azael_data/azael_db-guardian/player-backups`**)

```lua title="บรรทัดที่ 119"
CONFIG.General.Backup.PlayerData.Enable = true -- [[ boolean ]]
```

:::info

- `true` เท่ากับ เปิดใช้งาน
- `false` เท่ากับ ปิดใช้งาน

:::

### Backup.File.Extension

นามสกุลไฟล์ สำหรับ การสำรองข้อมูล

```lua title="บรรทัดที่ 123"
CONFIG.General.Backup.File.Extension = 'sql' -- [[ string ]]
```

### Backup.File.GZIPCompression.Enable

เปิดใช้งาน บีบอัดไฟล์ ในรูปแบบ [**GZIP**](https://en.wikipedia.org/wiki/Gzip) หลังจากสร้างไฟล์ สำรองข้อมูล (นามสกุลไฟล์ **`.gz`**)

```lua title="บรรทัดที่ 126"
CONFIG.General.Backup.File.Extension.GZIPCompression.Enable = true -- [[ boolean ]]
```

:::info

- `true` เท่ากับ เปิดใช้งาน
- `false` เท่ากับ ปิดใช้งาน

:::

### Command.DatabaseBackup

คำสั่ง สำรองฐานข้อมูลของเซิร์ฟเวอร์

```lua title="บรรทัดที่ 132"
CONFIG.General.Command.DatabaseBackup = 'dbbackup' -- [[ string ]]
```

:::caution

สามารถใช้งานคำสั่งนี้ได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Server-side) เท่านั้น ไม่สามารถใช้งานทางฝั่ง [**Client**](https://en.wikipedia.org/wiki/Client-side) ได้

:::

### Command.DeleteUserIdle

คำสั่ง ตรวจสอบ และ ลบข้อมูลผู้เล่น ที่ไม่เชื่อมต่อกับเซิร์ฟเวอร์มากกว่าวันที่กำหนด ตามการกำหนดค่า [**UserIdle.LimitDays**](./server.md#useridlelimitdays)

```lua title="บรรทัดที่ 133"
CONFIG.General.Command.DeleteUserIdle = 'dbdelidle' -- [[ string ]]
```

:::caution

สามารถใช้งานคำสั่งนี้ได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Server-side) เท่านั้น ไม่สามารถใช้งานทางฝั่ง [**Client**](https://en.wikipedia.org/wiki/Client-side) ได้

:::

### Command.CancelDelUserIdle

คำสั่ง ยกเลิกลบข้อมูลผู้เล่นที่ไม่เชื่อมต่อ หากระบบกำลังดำเนินการลบข้อมูลอยู่

```lua title="บรรทัดที่ 134"
CONFIG.General.Command.CancelDelUserIdle = 'dbdelcancel' -- [[ string ]]
```

:::caution

สามารถใช้งานคำสั่งนี้ได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Server-side) เท่านั้น ไม่สามารถใช้งานทางฝั่ง [**Client**](https://en.wikipedia.org/wiki/Client-side) ได้

:::

### Command.CountUserIdle

คำสั่ง แสดงจำนวนผู้เล่นทั้งหมด ที่ไม่เชื่อมต่อกับเซิร์ฟเวอร์มากกว่าวันที่กำหนด ตามการกำหนดค่า [**UserIdle.LimitDays**](./server.md#useridlelimitdays)

```lua title="บรรทัดที่ 135"
CONFIG.General.Command.CountUserIdle = 'dbcountidle' -- [[ string ]]
```

:::caution

สามารถใช้งานคำสั่งนี้ได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Server-side) เท่านั้น ไม่สามารถใช้งานทางฝั่ง [**Client**](https://en.wikipedia.org/wiki/Client-side) ได้

:::

### Command.DeleteUserData

คำสั่ง ลบข้อมูลผู้เล่น ที่ระบุ โดยไม่ตรวจสอบวันที่เชื่อมต่อครั้งล่าสุดของผู้เล่น

```lua title="บรรทัดที่ 136"
CONFIG.General.Command.DeleteUserData = 'dbdeluser' -- [[ string ]]
```

:::caution

สามารถใช้งานคำสั่งนี้ได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Server-side) เท่านั้น ไม่สามารถใช้งานทางฝั่ง [**Client**](https://en.wikipedia.org/wiki/Client-side) ได้

:::

### Command.UndeleteUser

คำสั่ง ยกเลิกสถานะถูกลบข้อมูล ให้ผู้เล่น

```lua title="บรรทัดที่ 137"
CONFIG.General.Command.UndeleteUser = 'dbundeluser' -- [[ string ]]
```

:::info

สามารถใช้งานคำสั่งนี้ได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Server-side) และ [**Client**](https://en.wikipedia.org/wiki/Client-side) ได้ (ฝั่ง [**Client**](https://en.wikipedia.org/wiki/Client-side) จะต้องมีสิทธิ์ [**ACE**](https://forum.cfx.re/t/basic-aces-principals-overview-guide/90917?u=azael.dev) อนุญาตใช้งานคำสั่ง)

:::

### Command.GetUserInfo

คำสั่ง แสดงข้อมูลผู้เล่น จากตาราง **`azael_db_guardian`** บนฐานข้อมูล

```lua title="บรรทัดที่ 138"
CONFIG.General.Command.GetUserInfo = 'dbuserinfo' -- [[ string ]]
```

:::info

สามารถใช้งานคำสั่งนี้ได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Server-side) และ [**Client**](https://en.wikipedia.org/wiki/Client-side) ได้ (ฝั่ง [**Client**](https://en.wikipedia.org/wiki/Client-side) จะต้องมีสิทธิ์ [**ACE**](https://forum.cfx.re/t/basic-aces-principals-overview-guide/90917?u=azael.dev) อนุญาตใช้งานคำสั่ง)

:::

### Command.AddLeaveDays

คำสั่ง เพิ่มจำนวนวัน ให้ผู้เล่น ในกรณีผู้เล่นเเจ้งลาหยุด

```lua title="บรรทัดที่ 139"
CONFIG.General.Command.AddLeaveDays = 'dbaddleave' -- [[ string ]]
```

:::info

สามารถใช้งานคำสั่งนี้ได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Server-side) และ [**Client**](https://en.wikipedia.org/wiki/Client-side) ได้ (ฝั่ง [**Client**](https://en.wikipedia.org/wiki/Client-side) จะต้องมีสิทธิ์ [**ACE**](https://forum.cfx.re/t/basic-aces-principals-overview-guide/90917?u=azael.dev) อนุญาตใช้งานคำสั่ง)

:::

## Database

ฐานข้อมูล

```lua title="บรรทัดที่ 144"
CONFIG.Database = {} -- [[ table ]]
```

### GetConVarName

ชื่อ ตัวแปรการกำหนดค่าการเชื่อมต่อกับฐานข้อมูล ที่ไฟล์ [**`server.cfg`**](https://docs.fivem.net/docs/server-manual/setting-up-a-server-vanilla/#servercfg)

```lua title="บรรทัดที่ 145"
CONFIG.Database.GetConVarName = 'mysql_connection_string' -- [[ string ]]
```

:::tip

ระบบจะรับข้อมูลกการกำหนดค่าการเชื่อมต่อกับฐานข้อมูลที่ฟังก์ชัน [**DATABASE.GetDBConnection**](../public/database.md#getdbconnection-function) โดยอัตโนมัติ

:::

### Frameworks

กำหนด ตาราง และ คอลัมน์ จากฐานข้อมูลของ Framework ที่ใช้งาน ตามการกำหนดค่าใน [**Frameworks**](./server.md#frameworks)

```lua title="บรรทัดที่ 147"
CONFIG.Database.Frameworks = { -- [[ table ]]
    ['framework_dir'] = { -- [[ table ]]
        FilterColumns = { -- [[ table ]]
            'column_name' -- [[ string ]]
        },

        IgnoreColumns = { -- [[ table ]]
            ['table_name'] = 'column_name' -- [[ string ]]
        },

        IgnoreTables = { -- [[ table ]]
            'table_name' -- [[ string ]]
        },

        CustomForeignTables = { -- [[ table ]]
            { -- [[ table ]]
                table_name = 'table_name', -- [[ string ]]
                column_name = 'column_name', -- [[ string ]]
                referenced_table_name = 'table_name', -- [[ string ]]
                referenced_column_name = 'column_name', -- [[ string ]]
            }
        }
    }
}
```

:::info

- **`framework_dir`** คือ ชื่อ **Directory** ของ **Framework** ที่กำหนดค่าใน [**Frameworks**](./server.md#frameworks)
- **`FilterColumns`** คือ ชื่อ คอลัมน์ ตัวระบุของผู้เล่น ใช้ในการอ้างอิงเพื่อดำเนินการ ลบข้อมูล และ สำรองข้อมูล ของผู้เล่น
- **`IgnoreColumns`** คือ ชื่อ คอลัมน์ ที่ต้องการละเว้นการตรวจสอบจากชื่อ ตาราง ที่กำหนด ในกรณีภายใน ตาราง มีชื่อ คอลัมน์ ที่ตรงกับการกำหนดค่าใน **FilterColumns** และไม่ใช่ คอลัมน์ สำหรับจัดเก็บ ตัวระบุของผู้เล่น (**key** เท่ากับ ชื่อตาราง และ **value** เท่ากับ ชื่อคอลัมน์)
- **`IgnoreTables`** คือ ชื่อ ตาราง ที่ต้องการละเว้น และ ไม่ลบข้อมูล ของผู้เล่น
- **`CustomForeignTables`** คือ ตาราง ทีมีความสัมพันธ์กับ ตารางอื่น และไม่มีการจัดเก็บข้อมูล ตัวระบุของผู้เล่น ภายในตาราง เพื่อใช้ในการ ลบข้อมูล และ สำรองข้อมูล ของผู้เล่นให้ครบถ้วน (สามารถเพิ่มข้อมูลตารางได้)
    - **`table_name`** คือ ชื่อ ตารางลูก ทีมีความสัมพันธ์กับ ตารางแม่ ที่ถูกอ้างอิง (จะต้องไม่มีการจัดเก็บข้อมูล ตัวระบุของผู้เล่น ภายในตาราง)
    - **`column_name`** คือ ชื่อ คอลัมน์ (คีย์นอก) ทีมีความสัมพันธ์กับ คอลัมน์ (คีย์หลัก) ใน ตารางแม่ ที่ถูกอ้างอิง
    - **`referenced_table_name`** คือ ชื่อ ตารางแม่ ที่ถูกอ้างอิง (จะต้องมีคอลัมน์จัดเก็บข้อมูล ตัวระบุของผู้เล่น ภายในตาราง)
    - **`referenced_column_name`** คือ ชื่อ คอลัมน์ (คีย์หลัก) ทีมีความสัมพันธ์กับ คอลัมน์ (คีย์นอก) ใน ตารางลูก

<details>
    <summary>การกำหนดค่าเริ่มต้น **ESX Framework**</summary>

```lua
['esx'] = {
    FilterColumns = {
        'identifier',
        'owner',
        'owner_id',
        'owner_iden',
        'realUser'
    },

    IgnoreColumns = {
        -- ['table_name'] = 'column_name'
    },

    IgnoreTables = {
        'azael_db_guardian',
        'bans'
    },
    
    CustomForeignTables = {
        {
            table_name = 'xzero_trunk',
            column_name = 'plate',
            referenced_table_name = 'owned_vehicles',
            referenced_column_name = 'plate'
        },

        {
            table_name = 'nc_vehicle_inside_storage',
            column_name = 'plate',
            referenced_table_name = 'owned_vehicles',
            referenced_column_name = 'plate'
        },

        {
            table_name = 'nc_vehicle_trunk_storage',
            column_name = 'plate',
            referenced_table_name = 'owned_vehicles',
            referenced_column_name = 'plate'
        }
    }
}
```
</details>

<details>
    <summary>การกำหนดค่าเริ่มต้น **QBCore Framework**</summary>

```lua
['qb'] = {
    FilterColumns = {
        'citizenid',
        'identifier',
        'owner',
        'owner_id',
        'owner_iden',
        'realUser'
    },

    IgnoreColumns = {
        ['player_houses'] = 'identifier'
    },

    IgnoreTables = {
        'azael_db_guardian',
        'bans'
    },
    
    CustomForeignTables = {
        {
            table_name = 'table_name',
            column_name = 'column_name',
            referenced_table_name = 'table_name',
            referenced_column_name = 'column_name'
        }
    }
}
```
</details>

<details>
    <summary>การกำหนดค่าเริ่มต้น **VORPCore Framework**</summary>

```lua
['vorp'] = {
    FilterColumns = {
        'identifier',
        'sender_id',
        'owner'
    },

    IgnoreColumns = {
        -- ['table_name'] = 'column_name'
    },
    
    IgnoreTables = {
        'azael_db_guardian',
        'users',
        'banneds'
    },
    
    CustomForeignTables = {
        {
            table_name = 'character_inventories',
            column_name = 'character_id',
            referenced_table_name = 'characters',
            referenced_column_name = 'charidentifier'
        },
        
        {
            table_name = 'items_crafted',
            column_name = 'character_id',
            referenced_table_name = 'characters',
            referenced_column_name = 'charidentifier'
        }
    }
}
```
</details>

:::

:::tip

สามารถเพิ่ม **Framework** ตามการกำหนดค่าใน [**Frameworks**](./server.md#frameworks) ได้

:::

:::danger

ไม่เเนะนำให้ ลบข้อมูล ในตาราง **`azael_db_guardian`** เนื่องจากระบบจะจัดเก็บสถานะการถูกลบข้อมูลของผู้เล่นเอาไว้

:::

## FileUpload

อัปโหลดไฟล์ไปยัง [**Google Drive API (GCP)**](https://console.cloud.google.com/apis/library/drive.googleapis.com), [**Discord API (Webhook)**](https://discord.com/developers/docs/resources/webhook) หรือ [**Custom API**](https://en.wikipedia.org/wiki/API) (แก้ไขรหัสได้ที่ไฟล์ **`public/fileupload/custom.fileupload.js`**)

```lua title="บรรทัดที่ 255"
CONFIG.FileUpload = {} -- [[ table ]]
```

### Option.Type

ประเภทตัวเลือกที่ต้องการใช้งานการอัปโหลดไฟล์

```lua title="บรรทัดที่ 257"
CONFIG.FileUpload.Option.Type = 0 -- [[ number ]]
```

| Value  | Recommend          | Description                                                
|--------|--------------------|--------------------------------------------------
| `0`    | ➖                 | ปิดใช้งานการอัปโหลดไฟล์
| `1`    | ✔️                 | อัปโหลดไฟล์ไปยัง [**Google Drive API (GCP)**](https://console.cloud.google.com/apis/library/drive.googleapis.com)
| `2`    | ❌                 | อัปโหลดไฟล์ไปยัง [**Discord API (Webhook)**](https://discord.com/developers/docs/resources/webhook)
| `3`    | ➖                 | อัปโหลดไฟล์ไปยัง [**Custom API**](https://en.wikipedia.org/wiki/API) (แก้ไขรหัสได้ที่ไฟล์ **`public/fileupload/custom.fileupload.js`**)

### GoogleDriveAPI.DeleteOldFiles.Enable

เปิดใช้งาน ลบไฟล์ สำรองข้อมูลของเซิร์ฟเวอร์ หากไฟล์เก่ากว่า **`X`** วัน ตามการกำหนดค่า [**GoogleDriveAPI.DeleteOldFiles.Days**](./server.md#googledriveapideleteoldfilesdays)

```lua title="บรรทัดที่ 262"
CONFIG.FileUpload.GoogleDriveAPI.DeleteOldFiles.Enable = true -- [[ boolean ]]
```

:::info

- `true` เท่ากับ เปิดใช้งาน
- `false` เท่ากับ ปิดใช้งาน

:::

### GoogleDriveAPI.DeleteOldFiles.Days

จำนวนวันที่ต้องการจัดเก็บไฟล์ สำรองข้อมูลของเซิร์ฟเวอร์ หากไฟล์เก่ากว่า **`X`** วัน ระบบจำดำเนินการลบไฟล์ทิ้ง (ต้องเปิดใช้งาน [**GoogleDriveAPI.DeleteOldFiles.Enable**](./server.md#googledriveapideleteoldfilesenable))

```lua title="บรรทัดที่ 263"
CONFIG.FileUpload.GoogleDriveAPI.DeleteOldFiles.Days = 60 -- [[ number ]]
```

:::info

`1` เท่ากับ `1` วัน

:::

### GoogleDriveAPI.ServiceAccountKey

ข้อมูลรับรองเพื่อยืนยันสิทธิ์ในการเข้าถึง [**Google Drive API**](https://developers.google.com/drive/api/guides/about-sdk) โดยใช้งาน [**Service Accounts**](https://cloud.google.com/iam/docs/service-account-overview)

```lua title="บรรทัดที่ 266"
CONFIG.FileUpload.GoogleDriveAPI.ServiceAccountKey = { --[[ table ]]
    client_email = 'service_account_email', --[[ string ]]
    private_key = 'service_account_private_key' --[[ string ]]
}
```

:::tip

โปรดดู [**บทช่วยสอนและคำแนะนำที่เกี่ยวกับ Google Cloud Platform (GCP)**](../tutorial.md#google-cloud-platform-gcp)

:::

### GoogleDriveAPI.SharedUsers

แชร์โฟลเดอร์ สำรองข้อมูลของเซิร์ฟเวอร์ และ สำรองข้อมูลของผู้เล่น ไปยังบัญชี [**Gmail**](https://myaccount.google.com/) ของผู้ใช้ที่ระบุ เพื่อให้สามารถเข้าถึงได้บน [**Google Drive (Shared)**](https://drive.google.com/drive/shared-with-me)

```lua title="บรรทัดที่ 271"
CONFIG.FileUpload.GoogleDriveAPI.SharedUsers = { --[[ table ]]
    'example@gmail.com' --[[ string ]]
}
```

:::tip

สามารถระบุได้มากกว่า 1 บัญชี

:::

### GoogleDriveAPI.Command.ServerBackups

รายการ คำสั่ง เกี่ยวกับไฟล์ สำรองข้อมูลของเซิร์ฟเวอร์

```lua title="บรรทัดที่ 276"
CONFIG.FileUpload.GoogleDriveAPI.Command.ServerBackups = { --[[ table ]]
    FileList = 'gdserverlist', --[[ string ]]
    FileDelete = 'gdserverdel', --[[ string ]]
    FilePurge = 'gdserverpurge' --[[ string ]]
}
```

| Variable Name      | Description                                                
|--------------------|--------------------------------------------------------------------------------------------
| `FileList`         | คำสั่ง รับรายชื่อไฟล์ สำรองข้อมูลของเซิร์ฟเวอร์
| `FileDelete`       | คำสั่ง ลบไฟล์ สำรองข้อมูลของเซิร์ฟเวอร์ โดยอ้างอิงจาก ชื่อไฟล์
| `FilePurge`        | คำสั่ง ลบไฟล์ สำรองข้อมูลของเซิร์ฟเวอร์ ทั้งหมด (**โปรดระมัดระวังในการใช้งานคำสั่งนี้**)

:::caution

สามารถใช้งานคำสั่งนี้ได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Server-side) เท่านั้น ไม่สามารถใช้งานทางฝั่ง [**Client**](https://en.wikipedia.org/wiki/Client-side) ได้

:::

### GoogleDriveAPI.Command.PlayerBackups

รายการ คำสั่ง เกี่ยวกับไฟล์ สำรองข้อมูลของเซิร์ฟเวอร์

```lua title="บรรทัดที่ 282"
CONFIG.FileUpload.GoogleDriveAPI.Command.PlayerBackups = { --[[ table ]]
    FileList = 'gdplayerlist', --[[ string ]]
    FileDelete = 'gdplayerdel', --[[ string ]]
    FilePurge = 'gdplayerpurge' --[[ string ]]
}
```

| Variable           | Description                                                
|--------------------|--------------------------------------------------------------------------------------------
| `FileList`         | คำสั่ง รับรายชื่อไฟล์ สำรองข้อมูลของผู้เล่น ที่ถูกลบข้อมูล
| `FileDelete`       | คำสั่ง ลบไฟล์ สำรองข้อมูลของผู้เล่น ที่ถูกลบข้อมูล โดยอ้างอิงจาก ชื่อไฟล์
| `FilePurge`        | คำสั่ง ลบไฟล์ สำรองข้อมูลของผู้เล่น ที่ถูกลบข้อมูล ทั้งหมด (**โปรดระมัดระวังในการใช้งานคำสั่งนี้**)

:::caution

สามารถใช้งานคำสั่งนี้ได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Server-side) เท่านั้น ไม่สามารถใช้งานทางฝั่ง [**Client**](https://en.wikipedia.org/wiki/Client-side) ได้

:::

### DiscordAPI.MaxFileSize

ขนาดไฟล์สูงสุดที่อนุญาตให้อัปโหลดไฟล์ได้ โดยหน่วยเป็น MB

```lua title="บรรทัดที่ 291"
CONFIG.FileUpload.DiscordAPI.MaxFileSize = 25 --[[ number ]]
```

:::info

`1` เท่ากับ `1` MB

:::

:::caution

ขีดจำกัดขนาดการอัปโหลดไฟล์สำหรับ [**Discord API (Uploading Files)**](https://discord.com/developers/docs/reference#uploading-files) จะขึ้นอยู่กับ [**ระดับการ Boost**](https://support.discord.com/hc/en-us/articles/360028038352-Server-Boosting-FAQ-) ของ [**Guild (Server)**](https://discord.com/developers/docs/resources/guild)

| Level Perks        | Server Boosts      | File Size Limits                                                
|--------------------|--------------------|--------------------------------------------------------------------------------------------
| 0                  | 0                  | 25 MB
| 1                  | 2                  | 25 MB
| 2                  | 7                  | 50 MB
| 3                  | 14                 | 100 MB

:::

### DiscordAPI.ServerData.WebhookURL

อัปโหลดไฟล์ สำรองข้อมูลของเซิร์ฟเวอร์ ไปยัง [**Webhook URL**](https://discord.com/developers/docs/resources/webhook) ที่ระบุ

```lua title="บรรทัดที่ 298"
CONFIG.FileUpload.DiscordAPI.ServerData.WebhookURL = 'webhook_url' --[[ string ]]
```

### DiscordAPI.PlayerData.WebhookURL

อัปโหลดไฟล์ สำรองข้อมูลของผู้เล่น เมื่อถูกลบข้อมูล ไปยัง [**Webhook URL**](https://discord.com/developers/docs/resources/webhook) ที่ระบุ

```lua title="บรรทัดที่ 302"
CONFIG.FileUpload.DiscordAPI.PlayerData.WebhookURL = 'webhook_url' --[[ string ]]
```

## Language

ภาษา

```lua title="บรรทัดที่ 307"
CONFIG.Language = { --[[ table ]]
    CONN_DATABASE_UNAVAILABLE = 'ฐานข้อมูลเซิร์ฟเวอร์ไม่พร้อมใช้งาน โปรดรายงานข้อความนี้ไปยังผู้ดูแลระบบเซิร์ฟเวอร์นี้\nผู้ดูแลระบบเซิร์ฟเวอร์: โปรดตรวจสอบสถานะของทรัพยากรที่คุณกำลังใช้สื่อสารกับฐานข้อมูลของเซิร์ฟเวอร์ ว่าสามารถเชื่อมต่อกับฐานข้อมูลได้สำเร็จหรือไม่',
    CONN_MISSING_IDENTIFIER = 'ไม่พบตัวระบุของคุณ โปรดดำเนินการตรวจสอบและลองเชื่อมค่อใหม่อีกครั้ง',
    CONN_WAIT_SERVER_BACKUP = 'ขณะนี้อยู่ระหว่างการสำรองฐานข้อมูลของเซิร์ฟเวอร์ โปรดลองใหม่อีกครั้งในภายหลัง',
    CONN_WAIT_DELETE_PLAYER = 'ขณะนี้อยู่ระหว่างการตรวจสอบฐานข้อมูลของผู้เล่น โปรดลองใหม่อีกครั้งในภายหลัง\nสถานะระบบ: กำลังตรวจสอบรายการที่ %s จาก %s รายการ คาดว่าจะแล้วเสร็จโดยประมาณ %s',
    CONN_PLAYER_DELETED = 'ข้อมูลของคุณถูกลบออกจากฐานข้อมูลของเซิร์ฟเวอร์ เนื่องจากคุณไม่ได้เชื่อมต่อกับเซิร์ฟเวอร์ติดต่อกันเป็นเวลานานเกิน %s วัน\nเชื่อมต่อครั้งล่าสุด: %s'
}
```

## CustomLog

บันทึกที่กำหนดเอง

```lua title="บรรทัดที่ 315"
CONFIG.CustomLog = {} --[[ table ]]
```

### Enable.ExecuteCommand

เปิดใช้งาน ฟังก์ชัน บันทึกการใช้งาน คำสั่ง หรือ ฟังก์ชันส่งออก ([**ExecuteCommand (function)**](./server.md#executecommand-function))

```lua title="บรรทัดที่ 317"
CONFIG.CustomLog.Enable.ExecuteCommand = true -- [[ boolean ]]
```

:::info

- `true` เท่ากับ เปิดใช้งาน
- `false` เท่ากับ ปิดใช้งาน

:::

### Enable.ServerBackup

เปิดใช้งาน ฟังก์ชัน บันทึกสำรองฐานข้อมูลเซิร์ฟเวอร์ ([**ServerBackup (function)**](./server.md#serverbackup-function))

```lua title="บรรทัดที่ 318"
CONFIG.CustomLog.Enable.ServerBackup = true -- [[ boolean ]]
```

:::info

- `true` เท่ากับ เปิดใช้งาน
- `false` เท่ากับ ปิดใช้งาน

:::

### Enable.DeletePlayerData

เปิดใช้งาน ฟังก์ชัน บันทึกลบข้อมูลผู้เล่นออกจากฐานข้อมูลของเซิร์ฟเวอร์ ([**DeletePlayerData (function)**](./server.md#deleteplayerdata-function))

```lua title="บรรทัดที่ 319"
CONFIG.CustomLog.Enable.DeletePlayerData = true -- [[ boolean ]]
```

:::info

- `true` เท่ากับ เปิดใช้งาน
- `false` เท่ากับ ปิดใช้งาน

:::

### ExecuteCommand (function)

ฟังก์ชัน บันทึกการใช้งาน คำสั่ง หรือ ฟังก์ชันส่งออก

```lua title="บรรทัดที่ 329"
CONFIG.CustomLog.ExecuteCommand = function(command, success, response, source)
    local fields = {
        { name = '**COMMAND**', value = ('```%s```'):format(command), inline = false },
        { name = '**RESPONSE**', value = ('```%s```'):format(response), inline = false },
        { name = '**STATUS**', value = (success and '- `✔️` ➔ Success' or '- `❌` ➔ Failed'), inline = false }
    }

    if source < 1 then
        fields[3].inline = true
        fields[4] = { name = '**ACTION BY**', value = (source == 0 and '- `⌨️` ➔ Server Console' or '- `🌐` ➔ Export Function'), inline = true }
    end

    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'DB_ExecuteCommand',
            content = '**ประวัติการใช้งาน คำสั่ง หรือ ฟังก์ชันส่งออก**',
            fields = fields,
            source = (source > 0 and source or 0),
            color = (success and 2 or 1),
            options = { codeblock = false }
        })
    end)
end
```

#### Parameter

| Name                    | Type               | Description                                                
|-------------------------|--------------------|---------------------------------------------------------------------------------------------------------------------------------
| `command`               | `string`           | ชื่อคำสั่งที่ดำเนินการ
| `success`               | `boolean`          | สถานะการใช้งานคำสั่ง สำเร็จ หรือ ล้มเหลว
| `response`              | `string`           | ข้อความตอบกลับหลังจากดำเนินการใช้งานคำสั่ง
| `source`                | `number`           | แหล่งที่มาของการใช้งานคำสั่ง (`-1` = Export Function, `0` = [Server Console](https://docs.fivem.net/docs/server-manual/server-commands), `1+` = [Client Console](https://docs.fivem.net/docs/client-manual/console-commands) ([Player ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#players)))

:::caution

- หากใช้งาน [**azael_dc-serverlogs**](../../azael_dc-serverlogs/index.md) จะรองรับตั้งแต่เวอร์ชัน **`1.7.4`** ขึ้นไป

:::

### ServerBackup (function)

ฟังก์ชัน บันทึกการสำรองฐานข้อมูลเซิร์ฟเวอร์

```lua title="บรรทัดที่ 361"
CONFIG.CustomLog.ServerBackup = function(dbName, fileName, fileSize, filePath, fileUpload)
    local fields = {
        { name = '**DATABASE NAME**', value = ('```%s```'):format(dbName), inline = false },
        { name = '**FILE NAME**', value = ('```%s```'):format(fileName), inline = false },
        { name = '**FILE SIZE**', value = ('```%s```'):format(fileSize), inline = false },
        { name = '**FILE PATH**', value = ('```%s```'):format(filePath), inline = false }
    }

    if fileUpload then
        fields[#fields + 1] = { name = '**FILE UPLOAD**', value = (fileUpload.success and ('- `✔️` ➔ [%s](%s)'):format(fileName, fileUpload.url) or ('- `❌` ➔ %s'):format(fileUpload.error)), inline = false }
    end

    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'DB_ServerBackups',
            content = '**สำรองฐานข้อมูลของเซิร์ฟเวอร์**',
            fields = fields,
            source = 0,
            color = 2,
            options = {
                important = true,
                codeblock = false
            }
        })
    end)
end
```

#### Parameter

| Name                    | Type               | Description                                                
|-------------------------|--------------------|---------------------------------------------------------------------------------------------------------------------------------
| `dbName`                | `string`           | ชื่อ ฐานข้อมูลเซิร์ฟเวอร์
| `fileName`              | `string`           | ชื่อไฟล์ สำรองข้อมูลเซิร์ฟเวอร์
| `fileSize`              | `string`           | ขนาดไฟล์ สำรองข้อมูลเซิร์ฟเวอร์
| `filePath`              | `string`           | เส้นทางไฟล์ สำรองข้อมูลเซิร์ฟเวอร์
| `fileUpload`            | `table` / `nil`    | ตารางข้อมูล สถานะอัปโหลดไฟล์ สำรองข้อมูลเซิร์ฟเวอร์
| `fileUpload.success`    | `boolean`          | สถานะอัปโหลดไฟล์ สำรองข้อมูลเซิร์ฟเวอร์ สำเร็จ หรือ ล้มเหลว
| `fileUpload.url`        | `string` / `nil`   | ไฟล์ URL สำรองข้อมูลเซิร์ฟเวอร์ หากอัปโหลดไฟล์ สำเร็จ
| `fileUpload.error`      | `string` / `nil`   | ข้อผิดพลาด หากอัปโหลดไฟล์ ล้มเหลว

:::caution

- หากใช้งาน [**azael_dc-serverlogs**](../../azael_dc-serverlogs/index.md) จะรองรับตั้งแต่เวอร์ชัน **`1.7.4`** ขึ้นไป

:::

### DeletePlayerData (function)

ฟังก์ชัน บันทึกลบข้อมูลผู้เล่นออกจากฐานข้อมูลของเซิร์ฟเวอร์

```lua title="บรรทัดที่ 392"
CONFIG.CustomLog.DeletePlayerData = function(data)
    local fields, chunks = {}, {}
    local tableCount = #data.tables
    local index = 0

    fields[1] = { name = '**IDENTIFIER**', value = ('```%s```'):format(data.identifier), inline = false }
    fields[2] = { name = '**LAST SEEN**', value = (type(data.lastseen) == 'number' and ('- <t:%s:F> (<t:%s:R>)'):format(data.lastseen, data.lastseen) or ('- ใช้คำสั่ง `%s` ลบข้อมูลโดยไม่ตรวจสอบวันที่เชื่อมต่อ'):format(CONFIG.General.Command.DeleteUserData)), inline = false }
    
    for i = 1, tableCount, 1 do
        local tableData = data.tables[i]
        index += 1

        chunks[index] = ('- `%s` | `%s` | `%s` | `%s`'):format(tableData.name, (tableData.rows or 0), (tableData.delete and '✔️' or '❌'), (tableData.backup and '✔️' or '❌'))
        
        if (index % 15) == 0 or i == tableCount then    -- ดำเนินการแยก field ต่อ 15 รายการ เนื่องจาก value ถูกจำกัดเอาไว้ที่ 1,024 ตัวอักษร ต่อ 1 field 
            fields[#fields + 1] = { name = '**TABLE | ROWS | DELETE | BACKUP**', value = table.concat(chunks, '\n'), inline = false }

            index = 0
            chunks = {}
        end
    end

    if data.file then
        index = #fields

        fields[index + 1] = { name = '**FILE NAME**', value = ('```%s```'):format(data.file.name), inline = false }
        fields[index + 2] = { name = '**FILE SIZE**', value = ('```%s```'):format(data.file.size), inline = false }
        fields[index + 3] = { name = '**FILE PATH**', value = ('```%s```'):format(data.file.path), inline = false }

        if data.file.upload then
            fields[index + 4] = { name = '**FILE UPLOAD**', value = (data.file.upload.success and ('- `✔️` ➔ [%s](%s)'):format(data.file.name, data.file.upload.url) or ('- `❌` ➔ %s'):format(data.file.upload.error)), inline = false }
        end
    end

    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'DB_DeletePlayerData',
            content = '**ลบข้อมูลผู้เล่นออกจากฐานข้อมูลของเซิร์ฟเวอร์**',
            fields = fields,
            source = 0,
            color = 1,
            options = {
                important = true,
                codeblock = false
            }
        })
    end)
end
```

#### Parameter

| Name                                             | Type                                   | Description                                                
|--------------------------------------------------|----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------
| `data`                                           | `table`                                | ตารางข้อมูล ผู้เล่นที่ถูกลบออกจากฐานข้อมูลของเซิร์ฟเวอร์
| `data.identifier`                                | `string`                               | ตัวระบุผู้เล่น
| `data.lastseen`                                  | `number` / `number`                    | วันที่ผู้เล่นเชื่อมต่อครั้งล่าสุด
| `data.file`                                      | `table` / `nil`                        | ตารางข้อมูลไฟล์ สำรองข้อมูลผู้เล่น
| `data.file.name`                                 | `string`                               | ชื่อไฟล์ สำรองข้อมูลผู้เล่น
| `data.file.size`                                 | `string`                               | ขนาดไฟล์ สำรองข้อมูลผู้เล่น
| `data.file.path`                                 | `string`                               | เส้นทางไฟล์ สำรองข้อมูลผู้เล่น
| `data.file.upload`                               | `table` / `nil`                        | ตารางข้อมูล สถานะอัปโหลดไฟล์ สำรองข้อมูลผู้เล่น
| `data.file.upload.success`                       | `boolean`                              | สถานะอัปโหลดไฟล์ สำรองข้อมูลผู้เล่น สำเร็จ หรือ ล้มเหลว
| `data.file.upload.url`                           | `string` / `nil`                       | ไฟล์ URL สำรองข้อมูลผู้เล่น หากอัปโหลดไฟล์ สำเร็จ
| `data.file.upload.error`                         | `string` / `nil`                       | ข้อผิดพลาด หากอัปโหลดไฟล์ ล้มเหลว
| `data.tables`                                    | `table`                                | ตารางข้อมูล ที่ระบบดำเนินการบนฐานข้อมูล
| `data.tables[index]`                             | `table`                                | ตารางข้อมูล ที่ระบบดำเนินการในตาราง
| `data.tables[index].name`                        | `string`                               | ชื่อตาราง ที่ระบบดำเนินการ ลบข้อมูลผู้เล่น
| `data.tables[index].rows`                        | `number`                               | จำนวนแถว ที่ระบบดำเนินการ ลบข้อมูลผู้เล่น
| `data.tables[index].delete`                      | `boolean`                              | สถานะ ลบข้อมูลผู้เล่น สำเร็จ หรือ ล้มเหลว
| `data.tables[index].backup`                      | `boolean`                              | สถานะ สำรองข้อมูลผู้เล่น สำเร็จ หรือ ล้มเหลว


:::caution

- หากใช้งาน [**azael_dc-serverlogs**](../../azael_dc-serverlogs/index.md) จะรองรับตั้งแต่เวอร์ชัน **`1.7.4`** ขึ้นไป

:::
