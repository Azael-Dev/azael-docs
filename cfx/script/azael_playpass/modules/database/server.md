---
sidebar_label: Server
---

# Database (Server-side)

## Database

โครงสร้างตาราง `azael_playpass`

:::danger
อย่านำโค้ด SQL ด้านล่างนี้ไป Run โดยตรง เนื่องจากตัวแปร `${PLAYER_ROLE_LIST}`, `${PLAYER_ROLE_DEFAULT}`, `${PLAYER_STATUS_LIST}`, และ `${PLAYER_STATUS_DEFAULT}` ต้องถูกแทนที่ด้วยค่าจริงจากฟังก์ชัน [setupTables](../database/server.md#setuptables) ก่อน
:::

```sql
CREATE TABLE `azael_playpass` (
    `identifier` VARCHAR(60) NOT NULL PRIMARY KEY,
    `bound_id` VARCHAR(60) UNIQUE DEFAULT NULL,
    `queue_points` JSON DEFAULT NULL,
    `airtime_left` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `rejoin_at` TIMESTAMP NULL DEFAULT NULL,
    `last_seen` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `last_hwids` JSON DEFAULT NULL,
    `ban_details` JSON DEFAULT NULL,
    `role` ENUM(${PLAYER_ROLE_LIST}) NOT NULL DEFAULT '${PLAYER_ROLE_DEFAULT}',
    `status` ENUM(${PLAYER_STATUS_LIST}) NOT NULL DEFAULT '${PLAYER_STATUS_DEFAULT}',
    INDEX `idx_bound_id` (`bound_id`)
);
```

#### Table Structure

| Column            | Type                              | Description
|-------------------|-----------------------------------|--------------------------------------------------------------
| `identifier`      | `VARCHAR(60)`, `PRIMARY KEY`      | ตัวระบุผู้เล่น, ต้องไม่ซ้ำ, ใช้เป็นคีย์หลัก, ต้องไม่เป็น NULL
| `bound_id`        | `VARCHAR(60)`, `UNIQUE`, `NULL`   | คัวระบุที่จะผูกไว้กับตัวระบุในคอลัมน์ `identifier`, ต้องไม่ซ้ำ, สามารถเป็น NULL ได้, มี Index (`idx_bound_id`)
| `queue_points`    | `JSON`, `NULL`                    | ข้อมูลคิวพ้อยท์ในรูปแบบ JSON ([ดูรายละเอียดด้านล่าง](./server.md#json-structure)), สามารถเป็น NULL ได้
| `airtime_left`    | `BIGINT UNSIGNED`, `NOT NULL`     | จำนวน Airtime คงเหลือ (วินาที), ต้องไม่เป็น NULL, ค่าเริ่มต้น 0
| `created_at`      | `TIMESTAMP`, `NOT NULL`           | วันที่และเวลาที่สร้าง, อัปเดตอัตโนมัติ, ต้องไม่เป็น NULL
| `rejoin_at`       | `TIMESTAMP`, `NULL`               | วันที่และเวลาที่ผู้เล่นกลับเข้ามาเล่นใหม่หลังถูกระงับโดย [inactivePlayers](../../config/core.md#inactiveplayers), สามารถเป็น NULL ได้
| `last_seen`       | `TIMESTAMP`, `NOT NULL`           | วันที่และเวลาที่พบผู้เล่นครั้งล่าสุด, ต้องไม่เป็น NULL, ค่าเริ่มต้นเป็นเวลาปัจจุบัน
| `last_hwids`      | `JSON`, `NULL`                    | ข้อมูล HWIDs ([Player Tokens](https://docs.fivem.net/natives/?_0x54C06897)) ของผู้เล่น ในรูปแบบ JSON ([ดูรายละเอียดด้านล่าง](./server.md#json-structure)), สามารถเป็น NULL ได้
| `ban_details`     | `JSON`, `NULL`                    | ข้อมูลรายละเอียดการแบนในรูปแบบ JSON ([ดูรายละเอียดด้านล่าง](./server.md#json-structure)), สามารถเป็น NULL ได้
| `role`            | `ENUM`, `NOT NULL`                | บทบาทของผู้เล่น, ใช้ ENUM จาก `${PLAYER_ROLE_LIST}`, ค่าเริ่มต้น `${PLAYER_ROLE_DEFAULT}`
| `status`          | `ENUM`, `NOT NULL`                | สถานะของผู้เล่น, ใช้ ENUM จาก `${PLAYER_STATUS_LIST}`, ค่าเริ่มต้น `${PLAYER_STATUS_DEFAULT}`

##### JSON Structure

<Tabs>
    <TabItem value="queue_points" label="queue_points">
        | Field                 | Type                          | Description
        |-----------------------|-------------------------------|-------------------------------
        | `permanent`           | `number` \| `null`            | จำนวนคิวพ้อยท์แบบถาวร (ไม่มีวันหมดอายุ) จะต้องเป็นจำนวนเต็ม (integer) เท่านั้น เช่น `78`, `888` และไม่ติดลบ
        | `temporary`           | `array<object>` \| `null`     | รายการคิวพ้อยท์แบบชั่วคราว (มีวันหมดอายุ). แต่ละ Element ใน Array เป็น Object ที่มีโครงสร้างตามข้อมูลใน [Temporary Fields](./server.md#temporary-fields)
        ###### Temporary Fields
        | Field                 | Type                          | Description
        |-----------------------|-------------------------------|-------------------------------
        | `value`               | `number`                      | จำนวนคิวพ้อยท์แบบชั่วคราว จะต้องเป็นจำนวนเต็ม (integer) เท่านั้น เช่น `78`, `888` และไม่ติดลบ
        | `expiry_datetime`     | `string`                      | วันและเวลาที่คิวพ้อยท์หมดอายุ ในรูปแบบ `YYYY-MM-DD HH:MM:SS` เช่น `"2025-05-21 14:33:00"`
        ###### Example
        ```json
        {
            "permanent": 777,
            "temporary": [
                { "value": 78, "expiry_datetime": "2025-05-21 14:33:00" },
                { "value": 888, "expiry_datetime": "2025-05-22 10:00:00" }
            ]
        }
        ```
    </TabItem>
    <TabItem value="last_hwids" label="last_hwids">
        | Type                          | Description
        |-------------------------------|-------------------------------
        | `array` \| `null`             | ข้อมูล HWIDs ([Player Tokens](https://docs.fivem.net/natives/?_0x54C06897)) ของผู้เล่น ประเภท Array หรือ ไม่มีค่า
        ###### Example
        ```json
        [
            "2:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
            "3:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "4:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "4:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "4:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "5:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
        ]
        ```
    </TabItem>
    <TabItem value="ban_details" label="ban_details">
        | Field                 | Type                          | Description
        |-----------------------|-------------------------------|-------------------------------
        | `type`                | `string`                      | ประเภทของการถูกแบน ชั่วคราว (`temporary`) หรือ ถาวร (`permanent`)
        | `reason`              | `string`                      | เหตุผลการถูกแบน
        | `banned_by`           | `string`                      | ถูกแบนโดย เช่น `<identifier>`, `Admin (Server Console)`, `Resource: <name>` หรือ `IP Address: <ip:port>`
        | `start_datetime`      | `string`                      | วันที่และเวลาที่เริ่มต้นการแบน ในรูปแบบ `YYYY-MM-DD HH:MM:SS` เช่น `"2025-05-21 14:33:00"`
        | `end_datetime`        | `string` \| `null`            | วันที่และเวลาที่สิ้นสุดการแบน ในรูปแบบ `YYYY-MM-DD HH:MM:SS` เช่น `"2026-05-21 14:33:00"`
        ###### Example
        <Tabs>
            <TabItem value="ban_temporary" label="แบนชั่วคราว">
                ```json
                {
                    "type": "temporary",
                    "reason": "Banned for repeatedly stealing the last slice of pizza.",
                    "banned_by": "Resource: <name>",
                    "start_datetime": "2025-05-21 14:33:00",
                    "end_datetime": "2026-05-21 14:33:00"
                }
                ```
            </TabItem>
            <TabItem value="ban_permanent" label="แบนถาวร">
                ```json
                {
                    "type": "permanent",
                    "reason": "Banned for repeatedly stealing the last slice of pizza.",
                    "banned_by": "Resource: <name>",
                    "start_datetime": "2025-05-21 14:33:00"
                }
                ```
            </TabItem>
        </Tabs>
    </TabItem>
</Tabs>

### setupTables

ตรวจสอบและติดตั้งตาราง `azael_playpass` ไปยังฐานข้อมูลของเซิร์ฟเวอร์

:::tip
- หากใช้งาน `azael_dc-whitelisted` มาก่อนและมีตาราง `azael_dc_whitelisted` บนฐานข้อมูลพร้อมข้อมูลของผู้เล่น ระบบจะคัดลอกข้อมูลมายังตาราง `azael_playpass` เมื่อใช้งานทรัพยากรในครั้งแรก
- ตัวแปร [**PLAYER_STATUS**](../../config/setup.md#status) คือข้อมูลการกำหนดค่าเกี่ยวกับสถานะของผู้เล่น โดยอ้างอิงการกำหนดค่าที่ไฟล์ [`./config/setup.lua`](../../config/setup.md)
- ตัวแปร [**PLAYER_ROLES**](../../config/setup.md#roles) คือข้อมูลการกำหนดค่าเกี่ยวกับบทบาทของผู้เล่น โดยอ้างอิงการกำหนดค่าที่ไฟล์ [`./config/setup.lua`](../../config/setup.md)
:::

```lua title="บรรทัดที่ 87"
function Database.setupTables()
    if not pcall(MySQL.scalar.await, 'SELECT 1 FROM `azael_playpass`') then
        ---@param t table<{ [key]: integer
        ---@return string|nil
        local function tableToEnumString(t)
            local result <const>, names <const> = {}, {}

            for k, v in pairs(t) do
                table.insert(result, { name = k:lower(), value = v })
            end
            
            table.sort(result, function(a, b) return a.value < b.value end)
            
            for _, v in ipairs(result) do
                table.insert(names, v.name)
            end
            
            return next(names) and "'" .. table.concat(names, "', '") .. "'" or nil
        end

        local statusEnum <const>, roleEnum <const> = tableToEnumString(PLAYER_STATUS), tableToEnumString(G_SETUP_CFG.PLAYER.ROLES)

        if not statusEnum or not roleEnum then
            error(('Error: Failed to generate enum string (statusEnum: %s | roleEnum: %s)'):format(type(statusEnum), type(roleEnum)))
        end

        local modifiedCreateTable <const> = createTable
            :gsub('${PLAYER_STATUS_LIST}', statusEnum)
            :gsub('${PLAYER_STATUS_DEFAULT}', statusEnum:match("'(.-)'"))
            :gsub('${PLAYER_ROLE_LIST}', roleEnum)
            :gsub('${PLAYER_ROLE_DEFAULT}', roleEnum:match("'(.-)'"))

        local success, response = pcall(MySQL.query.await, modifiedCreateTable)

        if not success then
            print(('[^1ERROR^7] %s'):format(response))

            return false
        end

        print("[^2INFO^7] Database table '^5azael_playpass^7' created successfully")

        if pcall(MySQL.scalar.await, 'SELECT 1 FROM `azael_dc_whitelisted`') then
            local enums <const> = {}

            for name in string.gmatch(statusEnum, "'(.-)'") do
                table.insert(enums, name)
            end

            local activeEnum <const>, bannedEnum <const> = enums[1], enums[3]
            local modifiedCloneTable <const> = cloneTable
                :gsub('${PLAYER_ROLE_BANNED}', bannedEnum)
                :gsub('${PLAYER_ROLE_ACTIVE}', activeEnum)
            
            success, response = pcall(MySQL.query.await, modifiedCloneTable)
            
            if not success then
                print(('[^1ERROR^7] %s'):format(response))
            elseif response?.affectedRows > 0 then
                print(("[^2INFO^7] Successfully copied ^2%s^7 players from '^5azael_dc_whitelisted^7' to '^5azael_playpass^7' table"):format(response.affectedRows))
            end
        end
    end

    return true
end
```

#### Returns

- success: `boolean`
    - ตอบกลับสถานะการติดตั้งตารางข้อมูลของทรัพยากรนี้

### getRolePlayers

รับข้อมูลตัวระบุและบทบาทเฉพาะของผู้เล่น เพื่อนำมาจัดเก็บเอาไว้ใช้งานในขั้นตอนการตรวจสอบ [โหมดปิดปรับปรุงเซิร์ฟเวอร์](../../config/core.md#maintenancemode), [พยายามเชื่อมต่อบ่อยและเร็วเกินกำหนด](../../config/core.md#connectionattemptlimit), [Ping สูงเกินกำหนด](../../config/core.md#maxpinglimit), [ถูกแบน HWID Tokens](../../config/core.md#banplayerhwids) และ [จำนวนผู้เล่นในระบบคิวเต็ม](../../config/queue.md#svfullqueuelimit)

```lua title="บรรทัดที่ 157"
function Database.getRolePlayers(roles)
    local placeholders <const> = ('?'):rep(#roles):gsub('.', '?, '):sub(1, -3)

    return MySQL.query.await(('SELECT `identifier`, CAST(`role` AS UNSIGNED) AS role_id FROM `azael_playpass` WHERE `status` = ? AND `role` IN (%s)'):format(placeholders), { PLAYER_STATUS.ACTIVE, table.unpack(roles) })
end
```

#### Parameters

- roles: `table<{ [index]: integer }>`
    - รายการ[บทบาท](../../config/setup.md#roles)ของผู้เล่น ที่ต้องการรับข้อมูลตัวระบุมาจัดเก็บเอาไว้

#### Returns

- rolePlayers: `table<{ [index]: table|nil }>` | `nil`
    - ข้อมูลของผู้เล่นทั้งหมดที่เข้าเงื่อนไข

| Field                 | Type                          | Description
|-----------------------|-------------------------------|-------------------------------
| `identifier`          | `string`                      | [ตัวระบุ](../../config/core.md#identifiertype)ของผู้เล่น
| `role_id`             | `integer`                     | [บทบาท](../../config/setup.md#roles)ของผู้เล่น

### getTempQueuePoints

รับข้อมูลคิวพอยท์ของผู้เล่นทั้งหมดที่มีวันหมดอายุ (คิวพอยท์แบบชั่วคราว)

```lua title="บรรทัดที่ 176"
function Database.getTempQueuePoints()
    return MySQL.query.await("SELECT `identifier`, `queue_points` FROM `azael_playpass` WHERE JSON_EXTRACT(`queue_points`, '$.temporary') IS NOT NULL AND JSON_LENGTH(JSON_EXTRACT(`queue_points`, '$.temporary')) > 0")
end
```

#### Returns

- tempQueuePoints: `table<{ [index]: table|nil }>` | `nil`
    - ข้อมูลคิวพอยท์แบบชั่วคราวของผู้เล่นทั้งหมด (คิวพอยท์แบบมีวันหมดอายุ)

| Field                 | Type                          | Description
|-----------------------|-------------------------------|-------------------------------
| `identifier`          | `string`                      | [ตัวระบุ](../../config/core.md#identifiertype)ของผู้เล่น
| `queue_points`        | `table` \| `string<JSON>`     | ข้อมูล[คิวพ้อยท์](./server.md#json-structure)ของผู้เล่น

### getExpiredTempBans

รับข้อมูลผู้เล่นทั้งหมดที่สถานะการแบนชั่วคราวหมดอายุแล้ว

```lua title="บรรทัดที่ 193"
function Database.getExpiredTempBans()
    return MySQL.query.await("SELECT `identifier`, `ban_details` FROM `azael_playpass` WHERE `status` = ? AND JSON_UNQUOTE(JSON_EXTRACT(`ban_details`, '$.type')) = ? AND STR_TO_DATE(JSON_UNQUOTE(JSON_EXTRACT(`ban_details`, '$.end_datetime')), '%Y-%m-%d %H:%i:%s') < NOW()", { PLAYER_STATUS.BANNED, 'temporary' })
end
```

#### Returns

- expiredTempBans: `table<{ [index]: table|nil }>` | `nil`
    - ข้อมูลผู้เล่นทั้งหมดที่สถานะการแบนชั่วคราวหมดอายุแล้ว

| Field                 | Type                          | Description
|-----------------------|-------------------------------|-------------------------------
| `identifier`          | `string`                      | [ตัวระบุ](../../config/core.md#identifiertype)ของผู้เล่น
| `ban_details`         | `table` \| `string<JSON>`     | ข้อมูล[การถูกแบน](./server.md#json-structure)ของผู้เล่น

### getBannedHwids

รับข้อมูล HWIDs ของผู้เล่นทั้งหมดที่มีสถานะถูกแบน

```lua title="บรรทัดที่ 199"
function Database.getBannedHwids()
    return MySQL.query.await('SELECT `identifier`, `last_hwids` FROM `azael_playpass` WHERE `status` = ? AND `last_hwids` IS NOT NULL', { PLAYER_STATUS.BANNED })
end
```

#### Returns

- bannedHwids: `table<{ [index]: table|nil }>` | `nil`
    - ข้อมูล HWIDs ของผู้เล่นทั้งหมดที่มีสถานะถูกแบน

| Field                 | Type                          | Description
|-----------------------|-------------------------------|-------------------------------
| `identifier`          | `string`                      | [ตัวระบุ](../../config/core.md#identifiertype)ของผู้เล่น
| `last_hwids`          | `table` \| `string<JSON>`      | ข้อมูล [Last HWIDs](./server.md#json-structure)ของผู้เล่น

### getInactivePlayers

รับข้อมูลผู้เล่นทั้งหมดที่ไม่ได้เข้าสู่เซิร์ฟเวอร์ตามระยะเวลาที่กำหนด

```lua title="บรรทัดที่ 206"
function Database.getInactivePlayers(limitDays)
    return MySQL.query.await("SELECT `identifier`, CAST(`last_seen` AS CHAR) AS last_seen FROM `azael_playpass` WHERE `status` = ? AND `last_seen` < DATE_SUB(NOW(), INTERVAL ? DAY)", { PLAYER_STATUS.ACTIVE, limitDays })
end
```

#### Parameters

- limitDays: `integer`
    - ค่าของจำนวนวันที่กำหนดใน [inactivePlayers](../../config/core.md#inactiveplayers)

#### Returns

- inactivePlayers: `table<{ [index]: table|nil }>` | `nil`

| Field                 | Type                          | Description
|-----------------------|-------------------------------|-------------------------------
| `identifier`          | `string`                      | [ตัวระบุ](../../config/core.md#identifiertype)ของผู้เล่น
| `last_seen`           | `string`                      | วันที่และเวลาที่พบผู้เล่นครั้งล่าสุด ในรูปแบบ `YYYY-MM-DD HH:MM:SS` เช่น `"2025-05-21 14:33:00"`

### doesIdExist

ตรวจสอบว่าตัวระบุมีอยู่ในฐานข้อมูลหรือไม่

```lua title="บรรทัดที่ 213"
function Database.doesIdExist(identifier)
    return MySQL.scalar.await('SELECT 1 FROM `azael_playpass` WHERE `identifier` = ?', { identifier }) ~= nil
end
```

#### Parameters

- identifier: `string`
    - [ตัวระบุ](../../config/core.md#identifiertype)ของผู้เล่น

#### Returns

- idExist: `boolean`
    - ตอบกลับ `true` หากตัวระบุของผู้เล่นมีอยู่แล้วบนฐานข้อมูล

### hasBoundId

ตรวจสอบว่าตัวระบุที่จะผูกมีอยู่ในฐานข้อมูลหรือไม่

```lua title="บรรทัดที่ 220"
function Database.hasBoundId(bindId)
    return MySQL.scalar.await('SELECT `identifier` FROM `azael_playpass` WHERE `bound_id` = ?', { bindId })
end
```

#### Parameters

- bindId: `string`
    - [ตัวระบุที่จะผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype)ของผู้เล่น

#### Returns

- identifier: `string` | `nil`
    - จะตอบกลับ `identifier` หาก [ตัวระบุที่จะผูก](../../config/core.md#bindidentifier) มีอยู่แล้วบนฐานข้อมูล (ถูกผูกไว้กับบัญชีอื่นแล้ว) หรือ `nil` หากสามารถใช้งานได้

### isIdBanned

ตรวจสอบว่าตัวระบุถูกแบนแล้วหรือไม่

```lua title="บรรทัดที่ 227"
function Database.isIdBanned(identifier)
    return MySQL.scalar.await('SELECT 1 FROM `azael_playpass` WHERE `identifier` = ? AND `status` = ?', { identifier, PLAYER_STATUS.BANNED }) ~= nil
end
```

#### Parameters

- identifier: `string`
    - [ตัวระบุ](../../config/core.md#identifiertype)ของผู้เล่น

#### Returns

- idBanned: `boolean`
    - ตอบกลับ `true` หากถูกแบน

### insertPlayerData

บันทึกข้อมูลของผู้เล่น

```lua title="บรรทัดที่ 236"
function Database.insertPlayerData(identifier, bindId, airtime)
    local success <const>, err <const> = pcall(MySQL.insert.await, 'INSERT INTO `azael_playpass` (`identifier`, `bound_id`, `airtime_left`) VALUES (?, ?, ?)', { identifier, bindId, airtime })
    
    if not success then
        print(("[^1ERROR^7] Failed to insert player data for identifier '^3%s^7' into the database: ^1%s^7"):format(identifier, err))
    end

    return success
end
```

#### Parameters

- identifier: `string`
    - [ตัวระบุ](../../config/core.md#identifiertype)ของผู้เล่น
- bindId: `string` | `nil`
    - [ตัวระบุที่จะผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype)ของผู้เล่น
- airtime: `integer`
    - จำนวนแอร์ไทม์คงเหลือของผู้เล่น ([ระบบจำกัดเวลาในการเล่น](../../config/core.md#airtimeserver))

#### Returns

- success: `boolean`
    - ตอบกลับ `true` เมื่อบันทึกข้อมูลของผู้เล่นสำเร็จ

### deletePlayerData

ลบข้อมูลของผู้เล่น

```lua title="บรรทัดที่ 249"
function Database.deletePlayerData(identifier)
    local success <const>, err <const> = pcall(MySQL.update.await, 'DELETE FROM `azael_playpass` WHERE `identifier` = ?', { identifier })
    
    if not success then
        print(("[^1ERROR^7] Failed to delete player data for identifier '^3%s^7' from the database: ^1%s^7"):format(identifier, err))
    end

    return success
end
```

#### Parameters

- identifier: `string`
    - [ตัวระบุ](../../config/core.md#identifiertype)ของผู้เล่น

#### Returns

- success: `boolean`
    - ตอบกลับ `true` เมื่อลบข้อมูลของผู้เล่นสำเร็จ

### getPlayerData

รับข้อมูลของผู้เล่นเมื่อเชื่อมต่อกับเซิร์ฟเวอร์

```lua title="บรรทัดที่ 292"
function Database.getPlayerData(identifier)
    local row <const> = MySQL.prepare.await('SELECT `bound_id`, `queue_points`, `airtime_left`, CAST(`created_at` AS CHAR) AS created_at, CAST(`rejoin_at` AS CHAR) AS rejoin_at, CAST(`last_seen` AS CHAR) AS last_seen, `ban_details`, `role`, CAST(`role` AS UNSIGNED) AS role_id, `status`, CAST(`status` AS UNSIGNED) AS status_id FROM `azael_playpass` WHERE `identifier` = ? LIMIT 1', { identifier })
    
    if row then
        row.queue_points = row.queue_points and json.decode(row.queue_points) or nil
        row.ban_details = (row.status_id == PLAYER_STATUS.BANNED) and json.decode(row.ban_details) or nil
        row.role = { id = row.role_id, name = row.role }
        row.status = { id = row.status_id, name = row.status }
        
        row.role_id, row.status_id = nil, nil
    end
    
    return row
end
```

#### Parameters

- identifier: `string`
    - [ตัวระบุ](../../config/core.md#identifiertype)ของผู้เล่น

#### Returns {#getplayerdata-returns}

- playerData: `table<{ [key]: any }>` | `nil`
    - ข้อมูลของผู้เล่น (ดูรายละเอียดด้านล่าง)

| Field                 | Type                          | Description
|-----------------------|-------------------------------|-------------------------------
| `bound_id`            | `string` \| `nil`             | [ตัวระบุที่ผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype)ของผู้เล่น
| `queue_points`        | `table` \| `nil`              | ข้อมูล[คิวพ้อยท์](./server.md#json-structure)ของผู้เล่น
| `airtime_left`        | `integer`                     | จำนวนแอร์ไทม์คงเหลือของผู้เล่น ([ระบบจำกัดเวลาในการเล่น](../../config/core.md#airtimeserver))
| `created_at`          | `string`                      | วันที่และเวลาที่สร้าง ในรูปแบบ `YYYY-MM-DD HH:MM:SS` เช่น `"2025-05-21 14:33:00"`
| `rejoin_at`           | `string` \| `nil`             | วันที่และเวลาที่ผู้เล่นกลับเข้ามาเล่นใหม่หลังถูกระงับโดย [inactivePlayers](../../config/core.md#inactiveplayers) ในรูปแบบ `YYYY-MM-DD HH:MM:SS` เช่น `"2025-05-21 14:33:00"`
| `last_seen`           | `string`                      | วันที่และเวลาที่พบผู้เล่นครั้งล่าสุด ในรูปแบบ `YYYY-MM-DD HH:MM:SS` เช่น `"2025-05-21 14:33:00"`
| `ban_details`         | `table` \| `nil`              | ข้อมูล[การถูกแบน](./server.md#json-structure)ของผู้เล่น
| `role`                | `table<{ id: integer, name: string }>` | ข้อมูล[บทบาท](../../config/setup.md#roles)ของผู้เล่น
| `status`              | `table<{ id: integer, name: string }>` | ข้อมูล[สถานะ](../../config/setup.md#status)ของผู้เล่น

### getPlayerBanInfo

รับข้อมูลสถานะหรือรายละเอียดเกี่ยวกับการถูกแบนของผู้เล่น

```lua title="บรรทัดที่ 310"
function Database.getPlayerBanInfo(identifier)
    local row <const> = MySQL.prepare.await('SELECT `ban_details` FROM `azael_playpass` WHERE `identifier` = ? AND `status` = ? LIMIT 1', { identifier, PLAYER_STATUS.BANNED })

    return row and json.decode(row) or nil
end
```
#### Parameters

- identifier: `string`
    - [ตัวระบุ](../../config/core.md#identifiertype)ของผู้เล่น

 #### Returns

- banDetails: `table<{ [key]: any }>` | `nil`
    - ข้อมูล[การถูกแบน](./server.md#json-structure)ของผู้เล่น

### getPlayerLastHwids

บข้อมูล HWIDs ล่าสุดของผู้เล่น

```lua title="บรรทัดที่ 319"
function Database.getPlayerLastHwids(identifier)
    local row <const> = MySQL.prepare.await('SELECT `last_hwids` FROM `azael_playpass` WHERE `identifier` = ? AND `last_hwids` IS NOT NULL LIMIT 1', { identifier })
    
    return row and json.decode(row) or nil
end
```

#### Parameters

- identifier: `string`
    - [ตัวระบุ](../../config/core.md#identifiertype)ของผู้เล่น

#### Returns

- hwids: `table<{ [index]: string }>` | `nil`
    - ข้อมูล [HWIDs](./server.md#json-structure) ล่าสุดของผู้เล่น หรือ ไม่มีค่า

### updatePlayerLastHwids

อัปเดต HWIDs ล่าสุดของผู้เล่น

```lua title="บรรทัดที่ 329"
function Database.updatePlayerLastHwids(identifier, hwids)
    local lastHwids <const> = (type(hwids) == 'table' and next(hwids)) and json.encode(hwids) or nil
    
    MySQL.prepare('UPDATE `azael_playpass` SET `last_hwids` = ? WHERE `identifier` = ?', { lastHwids, identifier })
end
```

#### Parameters

- identifier: `string`
    - [ตัวระบุ](../../config/core.md#identifiertype)ของผู้เล่น
- hwids: `table<{ [index]: string }>` | `nil`
    - ข้อมูล [HWIDs](./server.md#json-structure) ของผู้เล่นที่กำลังใช้งาน หรือ ไม่มีค่า

### updatePlayerLastSeen

อัปเดตวันและเวลาที่ผู้เล่นออนไลน์ล่าสุด

```lua title="บรรทัดที่ 338"
function Database.updatePlayerLastSeen(identifier)
    MySQL.prepare('UPDATE `azael_playpass` SET `last_seen` = CURRENT_TIMESTAMP WHERE `identifier` = ?', { identifier })
end
```

#### Parameters

- identifier: `string`
    - [ตัวระบุ](../../config/core.md#identifiertype)ของผู้เล่น

### updatePlayerBanState

อัปเดตสถานะแบนหรือยกเลิกแบนผู้เล่น

```lua title="บรรทัดที่ 347"
function Database.updatePlayerBanState(identifier, isBanned, banDetails)
    local data <const> = isBanned 
        and { json.encode(banDetails), PLAYER_STATUS.BANNED, identifier } 
        or { nil, PLAYER_STATUS.ACTIVE, identifier }
    
    local success <const>, err <const> = pcall(MySQL.prepare.await, 'UPDATE `azael_playpass` SET `ban_details` = ?, `status` = ? WHERE `identifier` = ?', data)

    if not success then
        print(("[^1ERROR^7] Failed to update player ban state for identifier '^3%s^7' in the database: ^1%s^7"):format(identifier, err))
    end
    
    return success
end
```

#### Parameters

- identifier: `string`
    - [ตัวระบุ](../../config/core.md#identifiertype)ของผู้เล่น
- isBanned: `boolean`
    - เป็นการแบนผู้เล่นใช่หรือไม่
        - `true`: แบนผู้เล่น
        - `false`: ยกเลิกแบนผู้เล่น
- banDetails: `table<{ [key]: any }>` | `nil`
    - ข้อมูล[การถูกแบน](./server.md#json-structure)ของผู้เล่น
        - ⚠️ จะไม่มีค่า (`nil`) หาก `isBanned` เท่ากับ `false` เนื่องจากเป็นการยกเลิกแบนผู้เล่น

#### Returns

- success: `boolean`
    - ตอบกลับ `true` เมือดำเนินการ แบน หรือ ยกเลิกแบน ผู้เล่นสำเร็จ

### updatePlayerQueuePoints

อัปเดตข้อมูลคิวพอยท์ของผู้เล่น

```lua title="บรรทัดที่ 373"
function Database.updatePlayerQueuePoints(identifier, queuePoints)
    local success <const>, err <const> = pcall(MySQL.prepare.await, 'UPDATE `azael_playpass` SET `queue_points` = ? WHERE `identifier` = ?', { ((queuePoints and next(queuePoints)) and json.encode(queuePoints) or nil), identifier })
    
    if not success then
        print(("[^1ERROR^7] Failed to update player queue points for identifier '^3%s^7' in the database: ^1%s^7"):format(identifier, err))
    end
    
    return success
end
```

#### Parameters

- identifier: `string`
    - [ตัวระบุ](../../config/core.md#identifiertype)ของผู้เล่น
- queuePoints: `table<{ [key]: any }>` | `nil`
    - ข้อมูล[คิวพ้อยท์](./server.md#json-structure)ของผู้เล่น หรือ ไม่มีค่า

#### Returns

- success: `boolean`
    - ตอบกลับ `true` เมือดำเนินการสำเร็จ

### updatePlayerStatus

อัปเดตสถานะของผู้เล่น

```lua title="บรรทัดที่ 387"
function Database.updatePlayerStatus(identifier, status)
    local query <const> = status == PLAYER_STATUS.ACTIVE 
        and 'UPDATE `azael_playpass` SET `rejoin_at` = CURRENT_TIMESTAMP, `status` = ? WHERE `identifier` = ?'
        or 'UPDATE `azael_playpass` SET `rejoin_at` = NULL, `status` = ? WHERE `identifier` = ?'

    local success <const>, err <const> = pcall(MySQL.prepare.await, query, { status, identifier })

    if not success then
        print(("[^1ERROR^7] Failed to update player status for identifier '^3%s^7' in the database: ^1%s^7"):format(identifier, err))
    end
    
    return success
end
```

#### Parameters

- identifier: `string`
    - [ตัวระบุ](../../config/core.md#identifiertype)ของผู้เล่น

#### Returns

- success: `boolean`
    - ตอบกลับ `true` เมือดำเนินการสำเร็จ

### updatePlayerRole

```lua title="บรรทัดที่ 404"
function Database.updatePlayerRole(identifier, role)
    local success <const>, err <const> = pcall(MySQL.prepare.await, 'UPDATE `azael_playpass` SET `role` = ? WHERE `identifier` = ?', { role, identifier })
    
    if not success then
        print(("[^1ERROR^7] Failed to update player role for identifier '^3%s^7' in the database: ^1%s^7"):format(identifier, err))
    end
    
    return success
end
```

#### Parameters

- identifier: `string`
    - [ตัวระบุ](../../config/core.md#identifiertype)ของผู้เล่น
- role: `integer`
    -  [บทบาท](../../config/setup.md#roles)ของผู้เล่น

#### Returns

- success: `boolean`
    - ตอบกลับ `true` เมือดำเนินการสำเร็จ

### updatePlayerIdentifier

อัปเดท[ตัวระบุหลัก](../../config/core.md#identifiertype)ของผู้เล่น

```lua title="บรรทัดที่ 418"
function Database.updatePlayerIdentifier(identifier, newIdentifier)
    local success <const>, err <const> = pcall(MySQL.prepare.await, 'UPDATE `azael_playpass` SET `identifier` = ? WHERE `identifier` = ?', { newIdentifier, identifier })
    
    if not success then
        print(("[^1ERROR^7] Failed to update player identifier from '^3%s^7' to '^3%s^7' in the database: ^1%s^7"):format(identifier, newIdentifier, err))
    end
    
    return success
end
```

#### Parameters

- identifier: `string`
    - [ตัวระบุเก่า](../../config/core.md#identifiertype)ของผู้เล่น
- newIdentifier: `string`
    - [ตัวระบุใหม่](../../config/core.md#identifiertype)ของผู้เล่น

#### Returns

- success: `boolean`
    - ตอบกลับ `true` เมือดำเนินการสำเร็จ

### updateBindIdentifier

อัปเดตข้อมูล[ตัวระบุที่จะถูกผูก](../../config/core.md#bindidentifier)กับ[ตัวระบุหลัก](../../config/core.md#identifiertype)ของผู้เล่น

```lua title="บรรทัดที่ 432"
function Database.updateBindIdentifier(identifier, bindId)
    local success <const>, err <const> = pcall(MySQL.prepare.await, 'UPDATE `azael_playpass` SET `bound_id` = ? WHERE `identifier` = ?', { bindId, identifier })

    if not success then
        print(("[^1ERROR^7] Failed to update bind identifier '^3%s^7' in the database: ^1%s^7"):format(identifier, err))
    end
    
    return success
end
```

#### Parameters

- identifier: `string`
    - [ตัวระบุ](../../config/core.md#identifiertype)ของผู้เล่น
- bindId: `string`
    - [ตัวระบุที่จะผูก](../../config/core.md#bindidentifier)ไว้กับ[ตัวระบุหลัก](../../config/core.md#identifiertype)ของผู้เล่น

#### Returns

- success: `boolean`
    - ตอบกลับ `true` เมือดำเนินการสำเร็จ

### setPlayerAirtime

กำหนด[แอร์ไทม์](../../config/core.md#airtimeserver)ของผู้เล่น

```lua title="บรรทัดที่ 446"
function Database.setPlayerAirtime(identifier, airtime)
    local success <const>, err <const> = pcall(MySQL.prepare.await, 'UPDATE `azael_playpass` SET `airtime_left` = ? WHERE `identifier` = ?', { airtime, identifier })
    
    if not success then
        print(("[^1ERROR^7] Failed to set airtime for identifier '^3%s^7' in the database: ^1%s^7"):format(identifier, err))
    end
    
    return success
end
```

#### Parameters

- identifier: `string`
    - [ตัวระบุ](../../config/core.md#identifiertype)ของผู้เล่น
- airtime: `integer`
    - จำนวนแอร์ไทม์ที่กำหนด ([ระบบจำกัดเวลาในการเล่น](../../config/core.md#airtimeserver))

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
