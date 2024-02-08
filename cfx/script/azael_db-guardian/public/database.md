# Database

รหัสเริ่มต้นรองรับ **[oxmysql](https://github.com/overextended/oxmysql)** คุณสามารถแก้ไขรหัสให้มีความเข้ากันได้กับทรัพยากรที่คุณใช้งานได้ที่ไฟล์ **`server.database.lua`**

:::caution

หากคุณไม่ได้ใช้งาน **[oxmysql](https://github.com/overextended/oxmysql)** อย่าลืม **แก้ไข** รหัสที่ไฟล์ **[fxmanifest.lua](https://docs.fivem.net/docs/scripting-reference/resource-manifest/resource-manifest/)**

<Tabs>
<TabItem value="server_scripts" label="server_scripts">

```lua
server_scripts {
    '@oxmysql/lib/MySQL.lua', -- oxmysql
    'config/server.config.lua',
    'config/auth.config.lua',
    'public/database/server.database.lua',
    'source/server/framework.server.lua',
    'source/server/auth.server.lua',
    'source/server/main.server.lua',
    'source/server/main.server.js',
    'source/server/fileupload.server.js'
}
```

</TabItem>
<TabItem value="dependencies" label="dependencies">

```lua
dependencies {
    'oxmysql' -- oxmysql
}
```

</TabItem>
</Tabs>

:::

## OnReady (function)

ตรวจสอบการเชื่อมต่อกับ MySQL เสร็จสมบูรณ์และพร้อมใช้งาน (ทำงานเมื่อฐานข้อมูลพร้อมใช้งาน)

```lua title="บรรทัดที่ 16"
DATABASE.OnReady = MySQL.ready
```


## InitDatabase (function)

ดำเนินการตรวจสอบและติดตั้งฐานข้อมูลเมื่อ **[oxmysql](https://github.com/overextended/oxmysql)** พร้อมใช้งาน

```lua title="บรรทัดที่ 19"
function DATABASE.InitDatabase()
    if not pcall(MySQL.scalar.await, 'SELECT 1 FROM `azael_db_guardian`') then
        MySQL.query.await([[CREATE TABLE `azael_db_guardian` (
            `identifier` VARCHAR(60) NOT NULL,
            `lastseen` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `deleted` TINYINT(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '0 = no, 1 = yes',
            PRIMARY KEY (`identifier`)
        )]])

        local success, response = pcall(MySQL.query.await, FRAMEWORK.Database.COPY_DEFAULT)

        if not success then
            success, response = pcall(MySQL.query.await, FRAMEWORK.Database.COPY_IDENTIFIER)
        end

        if (success and response?.affectedRows > 0) then
            print(('[^2INFO^7] Copying data of ^5%s^7 players to the "^5azael_db_guardian^7" table is completed'):format(response.affectedRows))
        end
    end
end
```

## GetDBConnection (function)

รับการกำหนดค่าการเชื่อมต่อกับฐานข้อมูลจากไฟล์ [**server.cfg**](https://docs.fivem.net/docs/server-manual/setting-up-a-server-vanilla/#servercfg) (ค่าเริ่มต้นรับข้อมูลจาก [**`mysql_connection_string`**](https://overextended.dev/oxmysql#configure-your-server))

```lua title="บรรทัดที่ 45"
function DATABASE.GetDBConnection()
    local connStr = GetConvar(CONFIG.Database.GetConVarName, '')
    local dbUser, dbPass, dbHost, dbPort, dbName

    if connStr:match('user=') then
        local connData = {}

        for k, v in connStr:gmatch('([^;]+)=([^;]+)') do
            connData[k] = v
        end

        dbUser, dbPass, dbHost, dbPort, dbName = connData.user, connData.password, connData.host, connData.port, connData.database
    elseif connStr:match('mysql://') then
        dbUser, dbPass, dbHost, dbPort, dbName = connStr:match('mysql://([^:]+):?([^.]*)@([^:/]+):?([^/]*).*/([^?]+)')

        if (dbPass and dbPass == '') then dbPass = nil end
        if (dbPort and dbPort == '') then dbPort = nil end
    end
    
    return dbUser, dbPass, dbHost, dbPort, dbName
end
```

### Return

| Name                         | Type               | Description                                                
|------------------------------|--------------------|--------------------------------------------------
| `dbUser`                     | `string` / `nil`   | ชื่อผู้ใช้ ฐานข้อมูล
| `dbPass`                     | `string` / `nil`   | รหัสผ่าน ฐานข้อมูล
| `dbHost`                     | `string` / `nil`   | โฮสต์ ฐานข้อมูล
| `dbPort`                     | `string` / `nil`   | พอร์ต ฐานข้อมูล
| `dbName`                     | `string` / `nil`   | ชื่อ ฐานข้อมูล

## GetDBConnection (function)

รับคำสั่งที่ใช้ในการสำรองฐานข้อมูล

```lua title="บรรทัดที่ 69"
function DATABASE.GetDumpCommand()
    local dataDir = MySQL.query.await("SHOW VARIABLES LIKE 'datadir'")
    
    if (dataDir and dataDir[1]) then
        local filePath = dataDir[1].Value:gsub('\\data\\', '\\bin\\mysqldump.exe')
        local fileExists = io.open(filePath, 'r')
        
        if fileExists then
            fileExists:close()
            
            return filePath
        end
    end
end
```

### Return

| Name                         | Type               | Description                                                
|------------------------------|--------------------|--------------------------------------------------
| `filePath`                   | `string` / `nil`   | เส้นทาง โปรแกรม หรือ คำสั่ง ที่ใช้ในการสำรองฐานข้อมูล

## FormatServerBackupCommand (function)

จัดรูปแบบคำสั่งสำรองฐานข้อมูลเซิร์ฟเวอร์

```lua title="บรรทัดที่ 93"
function DATABASE.FormatServerBackupCommand(dbUser, dbPass, dbHost, dbPort, dbName, cmdName, backupPath)
    return ('"%s" -u %s %s --single-transaction --quick --lock-tables=false %s > "%s"'):format(cmdName, dbUser, (dbPass and ('-p%s'):format(dbPass) or ''), dbName, backupPath)
end
```

### Parameter

| Name                         | Type               | Description                                                
|------------------------------|--------------------|----------------------------------------------------------------------
| `dbUser`                     | `string`           | ชื่อผู้ใช้ ฐานข้อมูล
| `dbPass`                     | `string` / `nil`   | รหัสผ่าน ฐานข้อมูล
| `dbHost`                     | `string` / `nil`   | โฮสต์ ฐานข้อมูล
| `dbPort`                     | `string` / `nil`   | พอร์ต ฐานข้อมูล
| `dbName`                     | `string`           | ชื่อ ฐานข้อมูล
| `cmdName`                    | `string`           | เส้นทาง โปรแกรม หรือ คำสั่ง ที่ใช้ในการสำรองฐานข้อมูล
| `backupPath`                 | `string`           | เส้นทางไฟล์ สำรองฐานข้อมูลเซิร์ฟเวอร์

### Return

| Name                         | Type               | Description                                                
|------------------------------|--------------------|--------------------------------------------------
| `command`                    | `string`           | คำสั่ง เพื่อดำเนินการ สำรองฐานข้อมูลเซิร์ฟเวอร์

## FormatPlayerBackupCommand (function)

จัดรูปแบบคำสั่งสำรองฐานข้อมูลผู้เล่น เมื่อถูกลบข้อมูล

```lua title="บรรทัดที่ 109"
function DATABASE.FormatPlayerBackupCommand(dbUser, dbPass, dbHost, dbPort, dbName, cmdName, backupPath, tableName, columnName, identifier)
    local password = (dbPass and ('-p%s'):format(dbPass) or '')
    local where = FRAMEWORK.Database.WHERE_IDENTIFIER:format(columnName, identifier)
    
    return ('"%s" -u %s %s --no-create-db --no-create-info --skip-triggers --insert-ignore --single-transaction --quick --lock-tables=false %s %s --where="%s" >> "%s"'):format(cmdName, dbUser, password, dbName, tableName, where, backupPath)
end
```

### Parameter

| Name                         | Type               | Description                                                
|------------------------------|--------------------|----------------------------------------------------------------------
| `dbUser`                     | `string`           | ชื่อผู้ใช้ ฐานข้อมูล
| `dbPass`                     | `string` / `nil`   | รหัสผ่าน ฐานข้อมูล
| `dbHost`                     | `string` / `nil`   | โฮสต์ ฐานข้อมูล
| `dbPort`                     | `string` / `nil`   | พอร์ต ฐานข้อมูล
| `dbName`                     | `string`           | ชื่อ ฐานข้อมูล
| `cmdName`                    | `string`           | เส้นทาง โปรแกรม หรือ คำสั่ง ที่ใช้ในการสำรองฐานข้อมูล
| `backupPath`                 | `string`           | เส้นทางไฟล์ สำรองฐานข้อมูลผู้เล่น เมื่อถูกลบข้อมูล
| `tableName`                  | `string`           | ชื่อ ตาราง ฐานข้อมูล
| `columnName`                 | `string`           | ชื่อ คอลัมน์ ฐานข้อมูล
| `identifier`                 | `string`           | ตัวระบุ ผู้เล่น

### Return

| Name                         | Type               | Description                                                
|------------------------------|--------------------|--------------------------------------------------
| `command`                    | `string`           | คำสั่ง เพื่อดำเนินการ สำรองฐานข้อมูลผู้เล่น เมื่อถูกลบข้อมูล

## GetSchemaTable (function)

รับชื่อ ตาราง, คอลัมน์ บนฐานข้อมูล

```lua title="บรรทัดที่ 119"
function DATABASE.GetSchemaTable(dbName)
    return MySQL.query.await(("SELECT table_name, column_name FROM information_schema.columns WHERE table_schema = '%s'"):format(dbName))
end
```

### Parameter

| Name                         | Type               | Description                                                
|------------------------------|--------------------|----------------------------------------------------------------------
| `dbName`                     | `string`           | ชื่อ ฐานข้อมูล

### Return

| Name                         | Type               | Description                                                
|------------------------------|--------------------|--------------------------------------------------
| `data`                       | `table`            | ตารางข้อมูล Schema บนฐานข้อมูล
| `data[index]`                | `table`            | ตารางข้อมูล ชื่อตาราง และ ชื่อคอลัมน์
| `data[index].table_name`     | `string`           | ชื่อ ตาราง
| `data[index].column_name`    | `string`           | ชื่อ คอลัมน์

## GetForeignkeyTable (function)

รับชื่อ ตาราง ทีมีความสัมพันธ์กับตารางอื่นๆ ([**Foreign Keys**](https://en.wikipedia.org/wiki/Foreign_key))

```lua title="บรรทัดที่ 126"
function DATABASE.GetForeignkeyTable(dbName)
    return MySQL.query.await(("SELECT table_name, referenced_table_name FROM information_schema.key_column_usage WHERE table_schema = '%s' AND referenced_table_name IS NOT NULL"):format(dbName))
end
```

### Parameter

| Name                         | Type               | Description                                                
|------------------------------|--------------------|----------------------------------------------------------------------
| `dbName`                     | `string`           | ชื่อ ฐานข้อมูล

### Return

| Name                                      | Type               | Description                                                
|-------------------------------------------|--------------------|--------------------------------------------------
| `data`                                    | `table`            | ตารางข้อมูล Schema บนฐานข้อมูล
| `data[index]`                             | `table`            | ตารางข้อมูล ชื่อตาราง ทีมีความสัมพันธ์กับตารางอื่นๆ
| `data[index].table_name`                  | `string`           | ชื่อ ตาราง
| `data[index].referenced_table_name`       | `string`           | ชื่อ ตาราง อ้างอิง

## GetIdlePlayers (function)

รับข้อมูลผู้เล่นที่ไม่ได้ใช้งาน

```lua title="บรรทัดที่ 136"
function DATABASE.GetIdlePlayers(delStatus, dayLimit, delLimit, ignoreIds)
    local query = 'SELECT `identifier`, UNIX_TIMESTAMP(`lastseen`) AS `lastseen` FROM `azael_db_guardian` WHERE `deleted` = ? AND `lastseen` < DATE_SUB(NOW(), INTERVAL ? DAY)'

    if (ignoreIds and ignoreIds[1]) then
        local idsStr = ("'%s'"):format(table.concat(ignoreIds, "','"))

        query = ('%s AND `identifier` NOT IN (%s)'):format(query, idsStr)
    end

    query = ('%s ORDER BY `lastseen` ASC LIMIT %d'):format(query, delLimit)
    
    return MySQL.query.await(query, { delStatus, dayLimit })
end
```

### Parameter

| Name                         | Type               | Description                                                
|------------------------------|--------------------|----------------------------------------------------------------------
| `delStatus`                  | `boolean`          | สถานะ ลบข้อมูลผู้เล่น
| `dayLimit`                   | `number`           | จำนวน วันที่ไม่เชื่อมต่อกับเซิร์ฟเวอร์ (ตามการกำหนดค่า [**UserIdle.LimitDays**](../config/server.md#useridlelimitdays))
| `delLimit`                   | `number`           | จำนวน จำกัดการลบข้อมูลของผู้เล่นสูงสุด (ตามการกำหนดค่า [**AutoDelete.Limit**](../config/server.md#autodeletelimit))
| `ignoreIds`                  | `table` / `nil`    | ตารางข้อมูล ตัวระบุผู้เล่นที่ละเว้น (ตามการกำหนดค่า [**IgnoreDelete.Identifiers**](../config/server.md#ignoredeleteidentifiers))
| `ignoreIds[index]`           | `string`           | ตัวระบุผู้เล่นที่ละเว้น

### Return

| Name                         | Type               | Description                                                
|------------------------------|--------------------|--------------------------------------------------
| `data`                       | `table`            | ตารางข้อมูล ผู้เล่นทั้งหมด ที่เข้าเงื่อนไขถูกลบข้อมูล
| `data[index]`                | `table`            | ตารางข้อมูล ผู้เล่น ที่เข้าเงื่อนไขถูกลบข้อมูล
| `data[index].identifier`     | `string`           | ตัวระบุผู้เล่น
| `data[index].lastseen`       | `number`           | วันที่ผู้เล่นเชื่อมต่อครั้งล่าสุด

## CountIdlePlayers (function)

นับจำนวนผู้เล่นที่ไม่ได้ใช้งาน (ไม่เชื่อมต่อกับเซิร์ฟเวอร์มากกว่าวันที่กำหนด)

```lua title="บรรทัดที่ 155"
function DATABASE.CountIdlePlayers(delStatus, dayLimit, ignoreIds)
    local query = 'SELECT COUNT(`identifier`) AS `count` FROM `azael_db_guardian` WHERE `deleted` = ? AND `lastseen` < DATE_SUB(NOW(), INTERVAL ? DAY)'

    if (ignoreIds and ignoreIds[1]) then
        local idsStr = ("'%s'"):format(table.concat(ignoreIds, "','"))

        query = ('%s AND `identifier` NOT IN (%s)'):format(query, idsStr)
    end

    local rows = MySQL.query.await(query, { delStatus, dayLimit })

    return rows[1].count
end
```

### Parameter

| Name                         | Type               | Description                                                
|------------------------------|--------------------|----------------------------------------------------------------------
| `delStatus`                  | `boolean`          | สถานะ ลบข้อมูลผู้เล่น
| `dayLimit`                   | `number`           | จำนวน วันที่ไม่เชื่อมต่อกับเซิร์ฟเวอร์ (ตามการกำหนดค่า [**UserIdle.LimitDays**](../config/server.md#useridlelimitdays))
| `ignoreIds`                  | `table` / `nil`    | ตารางข้อมูล ตัวระบุผู้เล่นที่ละเว้น (ตามการกำหนดค่า [**IgnoreDelete.Identifiers**](../config/server.md#ignoredeleteidentifiers))
| `ignoreIds[index]`           | `string`           | ตัวระบุผู้เล่นที่ละเว้น

### Return

| Name                         | Type               | Description                                                
|------------------------------|--------------------|--------------------------------------------------
| `count`                      | `number`           | จำนวน ผู้เล่นที่ไม่เชื่อมต่อกับเซิร์ฟเวอร์มากกว่าวันที่กำหนด (ตามการกำหนดค่า [**UserIdle.LimitDays**](../config/server.md#useridlelimitdays))

## GetPlayerData (function)

รับข้อมูล วันที่เชื่อมต่อ และ สถานะการถูกลบ ของผู้เล่น

```lua title="บรรทัดที่ 172"
function DATABASE.GetPlayerData(identifier)
    local row = MySQL.prepare.await('SELECT UNIX_TIMESTAMP(`lastseen`) AS `lastseen`, `deleted` FROM `azael_db_guardian` WHERE `identifier` = ? LIMIT 1', { identifier })

    if (row and tonumber(row.deleted)) then
        row.deleted = row.deleted ~= 0
    end

    return row
end
```

### Parameter

| Name                         | Type               | Description                                                
|------------------------------|--------------------|----------------------------------------------------------------------
| `identifier`                 | `string`           | ตัวระบุผู้เล่น

### Return

| Name                         | Type               | Description                                                
|------------------------------|--------------------|--------------------------------------------------
| `data`                       | `table`            | ตารางข้อมูล ผู้เล่น
| `data.lastseen`              | `number`           | วันที่ผู้เล่นเชื่อมต่อครั้งล่าสุด
| `data.deleted`               | `boolean`          | สถานะ ถูกลบข้อมูล

## GetForeignCharIds (function)

รับรายการตัวระบุที่ถูกสร้างโดย Framework เพื่อใช้ในการ ลบข้อมูล และ สำรองข้อมูล ของผู้เล่น

```lua title="บรรทัดที่ 185"
function DATABASE.GetForeignCharIds(identifier)
    local idsStr

    if FRAMEWORK.Database.FOREIGN_IDENTIFIERS then
        local rows = MySQL.query.await(FRAMEWORK.Database.FOREIGN_IDENTIFIERS, { identifier })
        
        if (rows and rows[1]) then
            idsStr = {}
            
            for i = 1, #rows, 1 do
                idsStr[i] = rows[i]['id']
            end

            idsStr = ("%s"):format(table.concat(idsStr, "','"))
        end
    end

    return idsStr
end
```

:::info

รหัสภายในฟังก์ชันนี้จะอ้างอิงจากฐานข้อมูลของ **[QBCore Framework](https://github.com/qbcore-framework)** เนื่องจาก **Framework** นี้จะอ้างอิงตัวระบุจากคอลัมน์ **`citizenid`**

:::

### Parameter

| Name                         | Type               | Description                                                
|------------------------------|--------------------|----------------------------------------------------------------------
| `identifier`                 | `string`           | ตัวระบุผู้เล่น

### Return

| Name                          | Type               | Description                                                
|-------------------------------|--------------------|--------------------------------------------------
| `frameworkIds`                | `string` / `nil`   | รายการตัวระบุ Framework ของผู้เล่นทั้งหมด (ตัวอย่าง: `"'ID_1', 'ID_2', 'ID_3'"`)

## DoesRowExist (function)

ตรวจสอบว่ามีข้อมูลอยู่หรือไม่

```lua title="บรรทัดที่ 210"
function DATABASE.DoesRowExist(identifier, tableName, columnName)
    local where = FRAMEWORK.Database.WHERE_IDENTIFIER:format(columnName, identifier)
    local row = MySQL.scalar.await(('SELECT 1 FROM `%s` WHERE %s'):format(tableName, where))
    
    return row ~= nil
end
```

### Parameter

| Name                         | Type               | Description                                                
|------------------------------|--------------------|----------------------------------------------------------------------
| `identifier`                 | `string`           | ตัวระบุผู้เล่น
| `tableName`                  | `string` / `nil`   | ชื่อตาราง
| `columnName`                 | `string` / `nil`   | ชื่อคอลัมน์

### Return

| Name                          | Type               | Description                                                
|-------------------------------|--------------------|--------------------------------------------------
| `exists`                      | `boolean`          | สถานะ ข้อมูลมีอยู่จริง

## InsertPlayerConnection (function)

บันทึกข้อมูลการเชื่อมต่อผู้เล่น

```lua title="บรรทัดที่ 220"
function DATABASE.InsertPlayerConnection(identifier)
    MySQL.insert('INSERT INTO `azael_db_guardian` (`identifier`) VALUES (?)', { identifier })
end
```

### Parameter

| Name                         | Type               | Description                                                
|------------------------------|--------------------|----------------------------------------------------------------------
| `identifier`                 | `string`           | ตัวระบุผู้เล่น

## UpdatePlayerConnection (function)

บันทึกข้อมูลการเชื่อมต่อผู้เล่น

```lua title="บรรทัดที่ 227"
function DATABASE.UpdatePlayerConnection(identifier)
    MySQL.prepare('UPDATE `azael_db_guardian` SET lastseen = CURRENT_TIMESTAMP WHERE `identifier` = ?', { identifier })
end
```

### Parameter

| Name                         | Type               | Description                                                
|------------------------------|--------------------|----------------------------------------------------------------------
| `identifier`                 | `string`           | ตัวระบุผู้เล่น

## UpdatePlayerLeaveDays (function)

อัพเดทวันที่เชื่อมต่อให้ผู้เล่น ในกรณีแจ้งลาต่างๆ

```lua title="บรรทัดที่ 235"
function DATABASE.UpdatePlayerLeaveDays(identifier, days)
    local success, err = pcall(MySQL.update.await, 'UPDATE `azael_db_guardian` SET lastseen = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL ? DAY) WHERE `identifier` = ?', { days, identifier })

    if pcall(MySQL.scalar.await, 'SELECT 1 FROM `azael_dc_whitelisted` WHERE `identifier` = ?', { identifier }) then
        local unixTime = (days * 86400) + os.time()
        
        MySQL.update('UPDATE `azael_dc_whitelisted` SET connect = ? WHERE `identifier` = ?', { unixTime, identifier })
    end

    return success, err
end
```

:::info

- อ้างอิงจากวันที่ดำเนินการและเพิ่มจำนวนวันให้ตามที่กำหนด
- หากใช้งาน [**azael_dc-whitelisted**](https://cfx.azael.dev/digishop/dc-whitelisted/) จะดำเนินการอัพเดทวันลาไปยังตาราง **`azael_dc_whitelisted`** คอลัมน์ **`connect`** โดยอัตโนมัติ

:::

### Parameter

| Name                         | Type               | Description                                                
|------------------------------|--------------------|----------------------------------------------------------------------
| `identifier`                 | `string`           | ตัวระบุผู้เล่น
| `days`                       | `number`           | จำนวนวันลา

### Return

| Name                          | Type               | Description                                                
|-------------------------------|--------------------|--------------------------------------------------
| `success`                     | `boolean`          | สถานะ ดำเนินการสำเร็จ
| `err`                         | `string` / `nil`   | ข้อผิดพลาด หากดำเนินการล้มเหลว

## UpdateDeletionStatus (function)

อัพเดตสถานะการลบข้อมูลผู้เล่น

```lua title="บรรทัดที่ 252"
function DATABASE.UpdateDeletionStatus(identifier, delStatus)
    local success, err = pcall(MySQL.update.await, (delStatus 
        and 'UPDATE `azael_db_guardian` SET deleted = ? WHERE `identifier` = ?'
        or 'UPDATE `azael_db_guardian` SET lastseen = CURRENT_TIMESTAMP, deleted = ? WHERE `identifier` = ?'
    ), { delStatus, identifier })
    
    return success, err
end
```

### Parameter

| Name                         | Type               | Description                                                
|------------------------------|--------------------|----------------------------------------------------------------------
| `identifier`                 | `string`           | ตัวระบุผู้เล่น
| `delStatus`                  | `boolean`          | สถานะ ลบข้อมูลผู้เล่น

### Return

| Name                          | Type               | Description                                                
|-------------------------------|--------------------|--------------------------------------------------
| `success`                     | `boolean`          | สถานะ ดำเนินการสำเร็จ
| `err`                         | `string` / `nil`   | ข้อผิดพลาด หากดำเนินการล้มเหลว

## DeletePlayerData (function)

ลบข้อมูลผู้เล่นออกจากฐานข้อมูล

```lua title="บรรทัดที่ 266"
function DATABASE.DeletePlayerData(identifier, tableName, columnName)
    local where = FRAMEWORK.Database.WHERE_IDENTIFIER:format(columnName, identifier)
    local success, rows = pcall(MySQL.update.await, ('DELETE FROM `%s` WHERE %s'):format(tableName, where))
    
    if not success then
        print(('[^1ERROR^7] %s'):format(rows))
        
        return false, 0
    end
    
    return rows ~= 0, rows
end
```

### Parameter

| Name                         | Type               | Description                                                
|------------------------------|--------------------|----------------------------------------------------------------------
| `identifier`                 | `string`           | ตัวระบุผู้เล่น
| `tableName`                  | `string`           | ชื่อตาราง
| `columnName`                 | `string`           | ชื่อคอลัมน์

### Return

| Name                          | Type               | Description                                                
|-------------------------------|--------------------|--------------------------------------------------
| `success`                     | `boolean`          | สถานะ ดำเนินการสำเร็จ
| `rows`                        | `number`           | จำนวนแถว ที่ดำเนินการลบข้อมูลในตาราง

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
