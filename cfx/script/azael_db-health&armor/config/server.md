# server.config.lua

ไฟล์การกำหนดค่าของทรัพยากรทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)**

## General

ทั่วไป

```lua title="บรรทัดที่ 11"
CONFIG.General = {} -- [[ table ]]
```

### Save.Time

เวลาในการบันทึกข้อมูล **"พลังชีวิต"** และ **"เกราะ"** ไปยังฐานข้อมูลทุกๆ **X** นาที (ป้องกันข้อมูล **[Rollback](https://en.wikipedia.org/wiki/Rollback_(data_management))**)

```lua title="บรรทัดที่ 13"
CONFIG.General.Save.Time = 15 -- [[ number ]]
```

:::info

`1` เท่ากับ `1` นาที

:::
