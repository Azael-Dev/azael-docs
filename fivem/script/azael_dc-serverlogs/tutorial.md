---
sidebar_label: บทช่วยสอน
---

# บทช่วยสอน

บทช่วยสอนที่เกี่ยวข้องกับทรัพยากร **[azael_dc-serverlogs](./)**

## ติดตั้งรหัสส่งข้อมูล

ติดตั้งรหัสส่งข้อมูลไปยังทรัพยากรอื่นๆทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)** และ **[Client](https://en.wikipedia.org/wiki/Client-side)**

:::caution

โปรดอ่านรายละเอียดจากตัวเลือกด้านล่างนี้ เพื่อให้มีความเข้าใจเกี่ยวกับรหัสที่ใช้ในการส่งข้อมูลทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)** และ **[Client](https://en.wikipedia.org/wiki/Client-side)**

- **[ฟังก์ชันที่ใช้สำหรับการส่งข้อมูลทางฝั่ง Server](./export/server)**
- **[ฟังก์ชันที่ใช้สำหรับการส่งข้อมูลทางฝั่ง Client](./export/client)**

:::

:::tip

รองรับรหัสการส่งข้อมูล **[azael_dc-serverlogs](./)** เวอร์ชันที่ล้าสมัยในรูปแบบ **[Trigger Events](https://docs.fivem.net/docs/scripting-manual/working-with-events/triggering-events/)** คุณสามารถดูรายละเอียดเพิ่มเติมได้ที่ **[Wrapper.Events](./config/shared#events-1)**

:::

### ติดตั้งฝั่ง Server

ตัวอย่างการติดตั้งรหัสส่งข้อมูลไปยังทรัพยากรอื่นๆทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)**

```lua title="new_banking/server.lua"
RegisterServerEvent('bank:deposit')
AddEventHandler('bank:deposit', function(amount)
	local _source = source
	local xPlayer = ESX.GetPlayerFromId(_source)

    amount = tonumber(amount)

	if amount == nil or amount <= 0 or amount > xPlayer.getMoney() then
		TriggerClientEvent('bank:result', _source, "error", "Montant invalide.")
	else
		xPlayer.removeMoney(amount)
		xPlayer.addAccountMoney('bank', amount)

		TriggerClientEvent('bank:result', _source, "success", "Dépot effectué.")

        --[[ START: azael_dc-serverlogs ]]
        pcall(function()
           exports['azael_dc-serverlogs']:insertData({
                event = 'BankDeposit',
                content = ('ฝากเงินเข้าธนาคาร จำนวน $%s เงินในกระเป๋าคงเหลือ $%s มีเงินในธนาคารทั้งหมด $%s'):format(ESX.Math.GroupDigits(amount), ESX.Math.GroupDigits(xPlayer.getMoney()), ESX.Math.GroupDigits(xPlayer.getAccount('bank').money)),
                source = xPlayer.source,
                color = 2,
                options = {
                    important = (amount >= 100000 and true)
                }
            })
        end)
        --[[ END: azael_dc-serverlogs ]]
	end
end)
```

:::tip

หากผู้เล่นฝากเงินเข้าธนาคารตั้งเเต่ **100,000** ขึ้นไป **`important`** จะเท่ากับ **`true`** หากน้อยกว่า จะเท่ากับ **`nil`** 

```lua
options = {
    important = (amount >= 100000 and true)
}
```

- หากใช้งาน **[Discord API](./config/server#discord-api)** ระบบจะดำเนินการ **Ping** ไปยัง `@everyone`

:::

### ติดตั้งฝั่ง Client

ตัวอย่างการติดตั้งรหัสส่งข้อมูลไปยังทรัพยากรอื่นๆทางฝั่ง **[Client](https://en.wikipedia.org/wiki/Client-side)**

```lua title="esx_policejob/client/main.lua"
function ImpoundVehicle(vehicle)
    local vehicleName = GetLabelText(GetDisplayNameFromVehicleModel(GetEntityModel(vehicle)))

    --[[ START: azael_dc-serverlogs ]]
    pcall(function()
        exports['azael_dc-serverlogs']:insertData({
            event = 'PoliceImPound',
            content = ('ส่ง ยานพาหนะ %s ทะเบียน %s ไปยังพาวท์'):format(vehicleName, GetVehicleNumberPlateText(vehicle)),
            color = 5
        })
    end)
    --[[ END: azael_dc-serverlogs ]]

	ESX.Game.DeleteVehicle(vehicle)
	ESX.ShowNotification(TranslateCap('impound_successful'))
	currentTask.busy = false
end
```

:::note

ไม่ต้องกำหนด **`source`** เพื่อรับ **ID** ของผู้เล่นปัจจุบันทางฝั่ง **[Client](https://en.wikipedia.org/wiki/Client-side)** ยกเว้นในกรณีที่ต้องการรับ **ID** ของผู้เล่นที่มีปฏิสัมพันธ์กับผู้เล่นปัจจุบัน

```lua title="esx_policejob/client/main.lua"
function OpenBodySearchMenu(player)
    --[[ START: azael_dc-serverlogs ]]
    pcall(function()
        -- Current Player (ผู้เล่นปัจจุบัน)
        exports['azael_dc-serverlogs']:insertData({
            event = 'PoliceBodySearch',
            content = ('กำลังค้นตัว %s '):format(GetPlayerName(player)),
            color = 5
        })

        -- Target Player (ผู้เล่นเป้าหมาย)
        exports['azael_dc-serverlogs']:insertData({
            event = 'PoliceBodySearch',
            content = ('กำลังถูก %s ค้นตัว'):format(GetPlayerServerId(PlayerId())),
            source = GetPlayerServerId(player),
            color = 3
        })
    end)
    --[[ END: azael_dc-serverlogs ]]

    ...
```

:::

## ใช้งาน Custom API

**[Custom API](./config/server#custom-api)** คือ การส่งคำขอไปยัง **[Server API](https://en.wikipedia.org/wiki/Web_API)** ที่กำหนดเองแบบเรียลไทม์ (อ้างอิงจากกำหนดค่า **[API.BaseURL](./config/server#apibaseurl)**)

:::tip

คุณสามารถเปิดใช้งานได้ที่การกำหนดค่า **[Option.Type](./config/server#optiontype)** โดยระบุเป็น **`CUSTOM`**

:::

### ติดตั้ง MongoDB บน Windows

<details>
    <summary>MongoDB คืออะไร?</summary>

**[MongoDB](https://www.mongodb.com/)** เป็น Open Source Document Databases ประเภทหนึ่ง โดยเป็น **[Database](https://en.wikipedia.org/wiki/Database)** แบบ **[NoSQL Database](https://en.wikipedia.org/wiki/NoSQL)** จะไม่มีการใช้คำสั่ง **[SQL](https://en.wikipedia.org/wiki/SQL)** ไม่เน้นในการสร้างความสัมพันธ์ของข้อมูล แต่จะเป็นรูปแบบโครงสร้างที่เจ้าของ **[NoSQL](https://en.wikipedia.org/wiki/NoSQL)** สร้างขึ้นมาเองและจัดเก็บข้อมูลเป็นแบบ **[JSON (JavaScript Object Notation)](https://https://en.wikipedia.org/wiki/JSON)** ซึ่งจะเก็บค่าเป็น Key และ Value โดยจุดเด่นอยู่ที่ความเร็วในการทำงานเป็นหลัก คิวรี่ข้อมูลได้เร็วขึ้น การทำงานในส่วนของ **[Database](https://en.wikipedia.org/wiki/Database)** จะลดลง แต่จะไปเน้นการทำงานในส่วนของโปรแกรมที่พัฒนาขึ้นมาแทน โดย **[Database](https://en.wikipedia.org/wiki/Database)** ประเภทนี้ จะเหมาะกับข้อมูลขนาดใหญ่ที่ไม่ซับซ้อน การทำงานที่ไม่หนักมาก สามารถทำงานกับระบบที่เป็นการทำงานแบบเรียลไทม์ได้ดี

**รูปแบบการจัดเก็บ**

- Collections การเก็บข้อมูล document ใน MongoDB จะถูกเก็บไว้ใน Collections เปรียบเทียบได้กับ Table ใน Relational Database ทั่วๆไป แต่ต่างกันที่ Collections ไม่จำเป็นที่จะต้องมี Schema เหมือนกันก็สามารถบันทึกข้อมูลได้
- Schemaless คือ การไม่ต้องกำหนดโครงสร้างใดๆให้มันเหมือน SQL ปกติทั่วไป เช่น Collection User มีเก็บแค่ name ต่อมาเราสามารถเพิ่มการเก็บ position เข้ามาได้เลย

**ข้อดีของ MongoDB**

- MongoDB เป็น database แบบ Document-Oriented โดยลักษณะการเก็บข้อมูลจะใช้รูปแบบ format เป็น Json Style โดย Row แต่ละ Row ไม่จำเป็นต้องมีโครงสร้างข้อมูลเหมือนกัน
- MongoDB ใช้ระบบการจัดการ memory แบบเดียวกับ cached memory ใน linux ซึ่งจะปล่อยให้ OS เป็นคนจัดการ Memory
- ใช้ภาษา javascript เป็นคำสั่งในการจัดการข้อมูล
- MongoDB เป็น Full Index กล่าวคือรองรับข้อมูลมหาศาลมากๆ สามารถค้นหาจากส่วนไหนของข้อมูลเลยก็ได้
- MongoDB รองรับการ เพิ่ม หรือ หด field แบบรวดเร็ว ไม่ต้องใช้คำสั่ง Alter Table
- read-write ข้อมูลรวดเร็ว
- write ข้อมูล แบบ asynchronous (คล้าย INSERT DELAYED ของ MyISAM ใน MySQL) คือไม่ต้องรอ Insert เสร็จจริงก็ทำงานต่อได้
- MongoDB มี Capped Collection ซึ่งจะทยอยลบข้อมูลเก่าที่เก็บไว้นานเกินไปแล้วเอาข้อมูลใหม่มาใส่แทนได้ จะ clear ข้อมูลที่เก็บมานานเกินไปไว้ให้อัตโนมัติ ข้อมูลไม่โตกว่าที่เรากำหนด
- ค้นหาข้อมูลได้รวดเร็ว
- สามารถใช้เครื่อง server ที่ไม่ต้องคุณภาพสูงมากแต่แบ่งกันทำงานหลายๆเครื่อง ซึ่งประหยัดงบได้มากกว่าใช้เครื่องคุณภาพสูงเพียงเครื่องเดียว
- สามารถเขียนเป็นชุดคำสั่งได้ คล้ายๆกับการเขียน PL/SQL

**ข้อเสียของ MongoDB**

- ถ้า project เก่ามีการ JOIN กันซับซ้อนก็จะเปลี่ยนมาใช้ MongoDB ได้ยาก
- กินพื้นที่การเก็บข้อมูลมากกว่า MySQL พอสมควร เพราะไม่มี Schema ดังนั้น Schema จริงๆจะอยู่ในทุก row ของฐานข้อมูล ทำให้ข้อมูลใหญ่กว่า MySQL
- หากใช้งานจน disk เต็ม จะ clear พื้นที่ disk ให้ใช้งานต่อยาก เพราะการสั่ง delete row ไม่ทำให้ฐานข้อมูลเล็กลง ต้องสั่ง compact เองซึ่งต้องมีที่ว่างที่ disk อีกลูกมากพอๆ กับพื้นที่ข้อมูลที่ใช้อยู่ปัจจุบันเป็น buffer ในการลดขนาด
- หากต้องการใช้งานเป็นฐานข้อมูลหลักแทน MySQL ควรมีเครื่องอย่างน้อย 3 เครื่องที่เป็น physical แยกกันทำ replication กัน เพื่อเพิ่ม durability ของข้อมูล เนื่องจากข้อมูลส่วนใหญ่ของ MongoDB จะเก็บใน Memory เป็นระยะเวลาหนึ่ง หากเครื่องดับไปเครื่อง ข้อมูลที่ยังค้างใน Memory แต่ยังไม่ write ลง disk จะสูญหายทันที

**Source:** [What is MongoDB?](https://sysadmin.psu.ac.th/2017/01/11/what-is-mongodb/)

</details>

<iframe width="100%" height="444" src="https://www.youtube.com/embed/f8-0etb-nas" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

### HTTP Authentication

**[Authorization](https://en.wikipedia.org/wiki/HTTP_authentication)** จะถูกกำหนดภายในส่วนหัวของคำขอ **[HTTP](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields)** ตามกำหนดค่า **[Authorization.Method](./config/server#apiauthorizationmethod)** และ **[Authorization.Token](./config/server#apiauthorizationtoken)**

```http
Authorization: <method> <token>
```

### HTTP Request Method

ส่งคำขอโดยใช้ **[POST](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)** และ **API** จะต้องตอบกลับสถานะ `200`, `201` หรือ `204` หากดำเนินการสำเร็จ

### HTTP Request Body

ข้อมูลจะถูกส่งออกในรูปแบบ **[JSON](https://en.wikipedia.org/wiki/JSON)** ดังตัวอย่างด้านล่างนี้

<Tabs>
<TabItem value="json" label="JSON">

```json
{
    "event": "Login",
    "content": "เข้าสู่เซิร์ฟเวอร์",
    "source": 2,
    "color": "#99CC00",
    "options": {
        "public": false,
        "important": false
    },
    "image": "https://media.discordapp.net/attachments/1026803132476424212/1031161977390764032/screenshot.jpg",
    "timestamp": "2022-10-10T11:01:41Z",
    "player": {
        "name": "Azael Dev",
        "identifiers": {
        "ip": "ip:127.0.0.1",
        "steam": "steam:1100001332XXXXX",
        "discord": "discord:4433345080208XXXXX",
        "license": "license:c89b466e4624e53d972f5dd188fa53c3468XXXXX",
        "license2": "license2:e4a63ed2103cd6cf65c9fef0b0c4e756228XXXXX"
        },
        "steam": {
            "id": 76561198818900000,
            "avatar": "https://avatars.akamai.steamstatic.com/93178f63ab1be3720d78340a72ca518798ca6707_full.jpg",
            "url": "https://steamcommunity.com/id/azaeldev/"
        }
    },
    "hardware": [
        "2:0a0eafdfde5bf292149f7355404882b8c23f36cef7759f8498c31604e5dXXXXX",
        "3:4ff393324bebbddccf98ec42d4365a2cf7774bb531a281343f5d8732a9dXXXXX",
        "4:73346ca0d3b6a8e14f88b3a90366c05462093fcf4868040acbee39d1fbeXXXXX",
        "4:ceaa5cb56b66ddd644260afe9e6c81db6e4a50e1144a6f1f9c0a8121e7bXXXXX",
        "4:3317ccdace5ca6b48340a415e3c8966cb1c965a7436f7c84d2fd8959393XXXXX"
    ]
}
```

</TabItem>
</Tabs>

#### JSON Fields

| Name                                         | Type               | Stable             | Default                                      | Description                                                
|----------------------------------------------|--------------------|--------------------|----------------------------------------------|--------------------------------------------------
| `event`                                      | `string`           | ✔️                 |                                              | ชื่อเหตุการณ์เพื่อแยกประเภทข้อมูล
| `content`                                    | `string`           | ✔️                 |                                              | เนื้อหาของข้อความที่ต้องการส่ง
| `source`                                     | `number`           | ✔️                 |                                              | ID อ้างอิงผู้เล่น หรือที่รู้จักกันในอีกชื่อคือ **[Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id)** หรือ  **[Server ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id)**
| `color`                                      | `string`           | ❌                 | `null`                                       | รหัสสีในรูปแบบ **[Hexadecimal](https://en.wikipedia.org/wiki/Web_colors)**
| `options`                                    | `object`           | ❌                 | `null`                                       | ตัวเลือกการใช้งาน `public` หรือ `important`
| `options.public`                             | `boolean`          | ❌                 | `null`                                       | ปิดการเเสดงข้อมูลส่วนตัวของผู้เล่น
| `options.important`                          | `boolean`          | ❌                 | `null`                                       | ข้อมูลสำคัญ
| `image`                                      | `string`           | ❌                 | `null`                                       | รูปภาพหน้าจอตามเหตุการณ์ที่กำหนด **[Screenshot.Webhooks](./config/server#screenshotwebhooks)**
| `timestamp`                                  | `string`           | ✔️                 | ISO8601 timestamp                            | วันและเวลาที่ผู้เล่นดำเนินการ ในรูปแบบ [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) (มาตรฐานสากลสำหรับรูปแบบวันที่และเวลา)
| `player`                                     | `object`           | ✔️                 |                                              | ข้อมูลผู้เล่น (`name`, `identifiers`, `steam`)
| `player.name`                                | `string`           | ✔️                 |                                              | ชื่อผู้เล่น (อ้างอิงจาก Native: **[GET_PLAYER_NAME](https://docs.fivem.net/natives/?_0x406B4B20)**)
| `player.identifiers`                         | `object`           | ✔️                 |                                              | ข้อมูลตัวระบุผู้เล่น (`ip`, `steam`, `discord`, `license`, `license2`)
| `player.identifiers.ip`                      | `string`           | ✔️                 |                                              | ที่อยู่ **IP** ผู้เล่น
| `player.identifiers.steam`                   | `string`           | ❌                 | `null`                                       | ตัวระบุ **[Steam](https://store.steampowered.com/) (Hex)** ผู้เล่น
| `player.identifiers.discord`                 | `string`           | ❌                 | `null`                                       | ตัวระบุ **[Discord](https://discord.com/)** ผู้เล่น
| `player.identifiers.license`                 | `string`           | ✔️                 |                                              | ตัวระบุ **License** ผู้เล่น
| `player.identifiers.license2`                | `string`           | ✔️                 |                                              | ตัวระบุ **License 2** ผู้เล่น
| `player.steam`                               | `object`           | ❌                 | `null`                                       | ข้อมูลบัญชี **[Steam](https://store.steampowered.com/)** ผู้เล่น (`id`, `avatar`, `url`)
| `player.steam.id`                            | `number`           | ✔️                 |                                              | **ID** บัญชี **[Steam](https://store.steampowered.com/)** ผู้เล่น
| `player.steam.avatar`                        | `string`           | ✔️                 | Image URL                                    | ที่อยู่รูปภาพอวทาร์ บัญชี **[Steam](https://store.steampowered.com/)** ผู้เล่น
| `player.steam.url`                           | `string`           | ✔️                 | Profile URL                                  | ที่อยู่โปรไฟล์ บัญชี **[Steam](https://store.steampowered.com/)** ผู้เล่น
| `hardware`                                   | `array`            | ❌                 | `null`                                       | ข้อมูล **[Hardware Tokens](./config/server#hardwareenable)** ของอุปกรณ์คอมพิวเตอร์ที่ผู้เล่นใช้งาน (สำหรับเหตุการณ์ **`Login`** เท่านั้น)

### REST API (PHP & MongoDB)

ใช้งานฐานข้อมูล **[MongoDB](https://www.mongodb.com/)** และ **[MongoDB PHP Driver](https://www.mongodb.com/docs/drivers/php/)**

<Tabs>
<TabItem value="php" label="PHP">

```php
/**
* REST API Example (azael_dc-serverlogs)
*
* @author Azael Dev <contact@azael.dev>
* @link https://www.azael.dev
*/

// Config - MongoDB
$mongodb_uri = 'mongodb://localhost:27017'; // Connection
$mongodb_data = 'azael_logs';               // Database Name

// Config - Authorization Header
$auth_method = 'Log';                       // Method
$auth_token = 'security_token';             // Token

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $headers = apache_request_headers();

    if (isset($headers['Authorization'])) {
        list($method, $token) = explode(' ', $headers['Authorization']);

        if ($method === $auth_method && $token === $auth_token) {
            $data = json_decode(file_get_contents('php://input'), false);

            if (isValidDataTypes($data)) {
                $col_mongodb = $data->event;  // ชื่อ Collection ที่ใช้ในการเก็บข้อมูล (อ้างอิงจากชื่อของเหตุการณ์)

                /* MongoDB (PHP Driver: https://www.php.net/manual/en/set.mongodb.php) */
                $manager = new MongoDB\Driver\Manager($mongodb_uri);
                $bulk = new MongoDB\Driver\BulkWrite;
                $bulk->insert($data);
                $result = $manager->executeBulkWrite("${mongodb_data}.${col_mongodb}", $bulk);

                if ($result->getInsertedCount() == 1) {
                    http_response_code(204);    // สำเร็จ (200, 201 หรือ 204)
                } else {
                    http_response_code(500);    // ข้อผิดพลาดภายในเซิร์ฟเวอร์
                }

                exit;
            } else {
                http_response_code(400);    // รูปแบบคำขอไม่ถูกต้อง
                exit;
            }
        } else {
            http_response_code(403);        // ไม่มีสิทธิ์เข้าถึงเนื้อหา
            exit;
        }
    } else {
        http_response_code(404);            // ใช้ 404 แทน 401 เพื่อปิดบังเส้นทาง API
        exit;
    }
} else {
    http_response_code(404);                // ใช้ 404 เพื่อปิดบังเส้นทาง API
    exit;
}

function isValidDataTypes($data) {
    if (count((array) $data) === 0) return false;
    
    $event = gettype($data->event);
    $content = gettype($data->content);
    $source = gettype($data->source);
    $color = gettype($data->color);
    $image = gettype($data->image);
    $timestamp = gettype($data->timestamp);
    $options = gettype($data->options);
    $player = gettype($data->player);

    if ($event !== 'string'
        || $content !== 'string'
        || $source !== 'integer'
        || $color !== 'NULL' && $color !== 'string'
        || $image !== 'NULL' && $image !== 'string'
        || $timestamp !== 'string'
        || $options !== 'NULL' && $options !== 'object'
        || $player !== 'object'
    ) return false;

    if ($options === 'object') {
        $public = gettype($data->options->public);
        $important = gettype($data->options->important);

        if ($public !== 'NULL' && $public !== 'boolean'
            || $important !== 'NULL' && $important !== 'boolean'
        ) return false;
    }

    $name = gettype($data->player->name);
    $identifiers = gettype($data->player->identifiers);
    $steam = gettype($data->player->steam);

    if ($name !== 'string'
        || $identifiers !== 'object'
        || $steam !== 'NULL' && $steam !== 'object'
    ) return false;

    $ip = gettype($data->player->identifiers->ip);
    $steamHex = gettype($data->player->identifiers->steam);
    $discord = gettype($data->player->identifiers->discord);
    $license = gettype($data->player->identifiers->license);
    $license2 = gettype($data->player->identifiers->license2);

    if ($ip !== 'NULL' && $ip !== 'string'
        || $steamHex !== 'NULL' && $steamHex !== 'string'
        || $discord !== 'NULL' && $discord !== 'string'
        || $license !== 'NULL' && $license !== 'string'
        || $license2 !== 'NULL' && $license2 !== 'string'
    ) return false;

    if ($steam === 'object') {
        $id = gettype($data->player->steam->id);
        $url = gettype($data->player->steam->url);
        $avatar = gettype($data->player->steam->avatar);

        if ($id !== 'integer'
            || $url !== 'string'
            || $avatar !== 'string'
        ) return false;
    }

    return true;
}
```

</TabItem>
</Tabs>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
