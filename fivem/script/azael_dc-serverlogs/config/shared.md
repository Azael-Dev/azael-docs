# shared.config.lua

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

## Framework

รองรับ **[ESX Framework](https://github.com/esx-framework)** สำหรับ **สาเหตุการตาย** โดย **อาวุธเสริม** และ **ขาดน้ำ** หรือ **ขาดอาหาร**

```lua title="บรรทัดที่ 17"
CONFIG.Framework = {} -- [[ table ]]
```

### Resource.Name

ชื่อทรัพยากรของ **Framework** ที่ใช้งาน

```lua title="บรรทัดที่ 19"
CONFIG.Framework.Resource.Name = 'es_extended' -- [[ string ]]
```

:::info

ค่าเริ่มต้น **[es_extended](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx%5D/es_extended)**

:::

### Events

เหตุการณ์ทั้งหมดของ **Framework** ที่ใช้งาน

```lua title="บรรทัดที่ 32"
CONFIG.Framework.Events = { -- [[ table ]]
    [1] = 'esx_status:getStatus'
}
```

:::info

รองรับ **[esx_status](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_status)** สำหรับ **สาเหตุการตาย** โดย **ขาดน้ำ** หรือ **ขาดอาหาร**

:::

## Wrapper

รองรับรหัสการส่งข้อมูล **[azael_dc-serverlogs](https://fivem.azael.dev/digishop/azael-dc-serverlogs/)** เวอร์ชันที่ล้าสมัยในรูปแบบ **[Trigger Events](https://docs.fivem.net/docs/scripting-manual/working-with-events/triggering-events/)**

```lua title="บรรทัดที่ 24"
CONFIG.Wrapper = {} -- [[ table ]]
```

### Events

รายชื่อเหตุการณ์ทั้งหมดของ **[azael_dc-serverlogs](https://fivem.azael.dev/digishop/azael-dc-serverlogs/)** เวอร์ชันที่ล้าสมัย

```lua title="บรรทัดที่ 25"
CONFIG.Wrapper.Events = { -- [[ table ]]
    'azael_discordlogs:sendToDiscord',
    'azael_dc-serverlogs:sendToDiscord',
    'azael_dc-serverlogs:insertData'
}
```

<details>
    <summary>ตัวอย่างรหัสส่งข้อมูลในเวอร์ชันที่ล้าสมัย</summary>

```lua title="azael_discordlogs:sendToDiscord"
local sendToDiscord = 'เนื้อหาของข้อความที่ต้องการส่ง'
TriggerEvent('azael_discordlogs:sendToDiscord', 'eventName', sendToDiscord, source, '^7')
```

```lua title="azael_dc-serverlogs:sendToDiscord"
local sendToDiscord = 'เนื้อหาของข้อความที่ต้องการส่ง'
TriggerEvent('azael_dc-serverlogs:sendToDiscord', 'eventName', sendToDiscord, source, '^7')
```

```lua title="azael_dc-serverlogs:insertData"
local content = 'เนื้อหาของข้อความที่ต้องการส่ง'
TriggerEvent('azael_dc-serverlogs:insertData', 'eventName', content, source, 7, false)
```

- `Args[1]` ชื่อเหตุการณ์ที่ลงทะเบียนโดย **[azael_dc-serverlogs](https://fivem.azael.dev/digishop/azael-dc-serverlogs/)** เพื่อรับข้อมูลจากทรัพยากรอื่น
- `Args[2]` ชื่อเหตุการณ์เพื่อแยกประเภทของข้อมูล
- `Args[3]` เนื้อหาของข้อความที่ต้องการส่ง
- `Args[4]` แหล่งที่มาของผู้เล่น (**[NetID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#players)**)
- `Args[5]` รหัสสีที่กำหนดภายในไฟล์การตั้งค่า (**1**, **10**)
- `Args[6]` ปิดการเเสดงข้อมูลของผู้เล่นบนแอปพลิเคชัน **[Discord](https://discord.com/)**

</details>

## Debug

แสดง **Debug** เพื่อตรวจสอบสถานะการทำงานต่างๆ

```lua title="บรรทัดที่ 37"
CONFIG.Debug = {} -- [[ table ]]
```

### Enable

เปิดใช้งาน แสดง **Debug** ไปยัง **[Server Console](https://docs.fivem.net/docs/server-manual/server-commands)** หรือ **[Client Console](https://docs.fivem.net/docs/client-manual/console-commands)** <kbd>F8</kbd>

```lua title="บรรทัดที่ 37"
CONFIG.Debug.Enable = false -- [[ boolean ]]
```

:::caution

ไม่แนะนำให้เปิดใช้งาน หากเซิร์ฟเวอร์ของคุณมีผู้เล่นออนไลน์อยู่เป็นจำนวนมาก

:::
