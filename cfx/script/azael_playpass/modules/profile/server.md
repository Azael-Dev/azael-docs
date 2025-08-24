---
sidebar_label: Server
---

# Profile (Server-side)

## Profile

:::tip คุณสามารถปรับเเต่ง [Adaptive Cards](https://adaptivecards.io/) ได้ที่
- `./modules/profile/templates/bind-account.json` หากเปิดใช้งาน [bindIdentifier](../../config/core.md#bindidentifier)
- `./modules/profile/templates/single-account.json` หากปิดใช้งาน [bindIdentifier](../../config/core.md#bindidentifier)
:::

### sanitizeDisplayName

ทำความสะอาดชื่อที่แสดงเพื่อหลีกเลี่ยงข้อผิดพลาดทางไวยากรณ์เมื่อใช้กับ `gsub` และ `JSON`

```lua title="บรรทัดที่ 19"
local function sanitizeDisplayName(str)
    if not str then return '' end
    
    local cleaned = tostring(str)
    
    -- แปลง backslash ก่อน (สำคัญสำหรับ JSON)
    cleaned = cleaned:gsub('\\', '\\\\')
    
    -- Escape % สำหรับ gsub replacement string (ต้องทำก่อน JSON escaping)
    cleaned = cleaned:gsub('%%', '%%%%')
    
    -- ทำให้อักขระปลอดภัยสำหรับ JSON
    cleaned = cleaned:gsub('"', '\\"')
    cleaned = cleaned:gsub('\n', '\\n')
    cleaned = cleaned:gsub('\r', '\\r')
    cleaned = cleaned:gsub('\t', '\\t')
    cleaned = cleaned:gsub('\b', '\\b')
    cleaned = cleaned:gsub('\f', '\\f')
    
    -- แปลงอักขระพิเศษทั่วไป
    cleaned = cleaned:gsub('/', '\\/')
    
    -- ลบอักขระ Unicode ที่ไม่พึงประสงค์
    cleaned = cleaned:gsub('[\200-\255][\128-\191]*', function(char)
        local byte1 <const> = string.byte(char, 1)
        
        if byte1 >= 226 and byte1 <= 239 then
            return ''
        end
        
        return char
    end)
    
    -- ลบอักขระควบคุม (ASCII 0–31) ยกเว้นที่จำเป็น
    cleaned = cleaned:gsub('[\1-\31]', '')
    
    return cleaned
end
```

#### Parameters

- str: `string`
    - ชื่อที่แสดง
    
#### Returns

- cleaned: `string`
    - ชื่อที่แสดง หลังทำความสะอาดแล้ว

### loadTemplate

โหลดเทมเพลตโปรไฟล์

```lua title="บรรทัดที่ 61"
function Profile.loadTemplate(name)
    local filePath <const> = ('modules/profile/templates/%s.json'):format(name)
    local fileContents <const> = LoadResourceFile(resourceName, filePath)
    
    if not fileContents then
        print(("[^1ERROR^7] Failed to load file: '^3%s^7'. (Error: ^1File could not be found.^7)"):format(filePath))
        return
    elseif #fileContents == 0 then
        print(("[^1ERROR^7] Failed to load file: '^3%s^7'. (Error: ^1File is empty.^7)"):format(filePath))
        return
    end
    
    return fileContents
end
```

#### Parameters

- name: `string`
    - ชื่อไฟล์ที่ต้องการโหลด `bind-account` หรือ `single-account`

#### Returns

- fileContents: `string` | `nil`
    - เนื้อหาไฟล์ที่ถูกโหลด

### getSteamUser

ดึงข้อมูลผู้ใช้จากผู้ให้บริการ [Steam](https://steamcommunity.com/)

```lua title="บรรทัดที่ 80"
function Profile.getSteamUser(req, id)
    local reqUrl <const> = req.url:gsub('${WEB_API_KEY}', req.auth):gsub('${STEAM_ID}', id)
    local resStatus <const>, resBody <const> = PerformHttpRequestAwait(reqUrl, 'GET', '', {
        ['Content-Type'] = 'application/json; charset=utf-8'
    })
    
    if resStatus == 200 then
        local resData <const> = json.decode(resBody)
        
        if not resData then
            return false, {
                code = resStatus,
                message = ('Invalid JSON format in response data (Type: %s, Data: %.100s)'):format(type(resBody), tostring(resBody))
            }
        end
        
        local userData <const> = resData.response.players[1]
        
        return true, {
            id = userData.steamid,
            name = userData.personaname,
            avatar = userData.avatarfull
        }
    end
    
    return false, {
        code = resStatus,
        message = ('HTTP status code %d (%s)'):format(resStatus, 'For more details: https://partner.steamgames.com/doc/webapi_overview/responses#status_codes')
    }
end
```

#### Parameters

- req: `table<{ [key]: string }>`
    - ข้อมูลการร้องขอ ([HTTP Request](https://en.wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages))
        - url: `string`
            - URL สำหรับเรียกข้อมูลโปรไฟล์ผู้ใช้จาก [Steam Web API](https://steamcommunity.com/dev) ที่กำหนดใน [endpointUrl](../../config/profile.md#steam)
        - auth: `string`
            - API Key สำหรับการเข้าถึงข้อมูลโปรไฟล์ ที่กำหนดใน [webApiKey](../../config/profile.md#steam)
- id: `string`
    - [SteamID64 (DEC)](https://developer.valvesoftware.com/wiki/SteamID) ของผู้เล่น เช่น `"76561198818940078"`

#### Returns

- success: `boolean`
    - ตอบกลับเป็น `true` หากอนุญาตให้เข้าร่วมเซิร์ฟเวอร์
- response: `table<{ [key]: any }>`
    - ข้อมูลการตอบกลับเมื่อ success มีค่าเป็น `true`
        - id: `string`
            - [SteamID64 (DEC)](https://developer.valvesoftware.com/wiki/SteamID) เช่น `"76561198818940078"`
        - name: `string`
            - ชื่อที่แสดง
        - avatar: `string`
            - URL รูปภาพโปรไฟล์
    - ข้อมูลการตอบกลับเมื่อ success มีค่าเป็น `false`
        - code: `integer`
            - รหัสสถานะ HTTP ที่ตอบกลับโดย [Steam Web API](https://steamcommunity.com/dev)
        - message: `string`
            - ข้อความแสดงข้อผิดพลาด

### getDiscordUser

ดึงข้อมูลผู้ใช้จากผู้ให้บริการ [Discord](https://discord.com/)

```lua title="บรรทัดที่ 115"
function Profile.getDiscordUser(req, id)
    local reqUrl <const> = req.url:gsub('${USER_ID}', id)
    local resStatus <const>, resBody <const> = PerformHttpRequestAwait(reqUrl, 'GET', '', {
        ['Content-Type'] = 'application/json; charset=utf-8',
        ['Authorization'] = ('Bot %s'):format(req.auth)
    })

    if resStatus == 200 then
        local userData <const> = json.decode(resBody)
        
        if not userData then
            return false, {
                code = resStatus,
                message = ('Invalid JSON format in response data (Type: %s, Data: %.100s)'):format(type(resBody), tostring(resBody))
            }
        end
        
        return true, {
            id = userData.id,
            name = userData.global_name,
            username = userData.username,
            avatar = userData.avatar and ('https://cdn.discordapp.com/avatars/%d/%s.%s'):format(userData.id, userData.avatar, (userData.avatar:sub(1, 2) == 'a_' and 'gif' or 'webp')) or nil
        }
    end
    
    return false, {
        code = resStatus,
        message = ('HTTP status code %d (%s)'):format(resStatus, 'For more details: https://discord.com/developers/docs/topics/opcodes-and-status-codes#http')
    }
end
```

#### Parameters

- req: `table<{ [key]: string }>`
    - ข้อมูลการร้องขอ ([HTTP Request](https://en.wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages))
        - url: `string`
            - URL สำหรับเรียกข้อมูลโปรไฟล์ผู้ใช้จาก [Discord API](https://discord.com/developers/docs/reference) ที่กำหนดใน [endpointUrl](../../config/profile.md#discord)
        - auth: `string`
            - [Bot Token](../../config//external_api.md#bottoken) ใช้สำหรับยืนยันตัวตนของบอท ที่กำหนดใน [botToken](../../config/profile.md#discord)
- id: `string`
    - [Discord ID](https://discord.com/developers/docs/resources/user#user-object) ของผู้เล่น เช่น `"443334508020890078"`

#### Returns

- success: `boolean`
    - ตอบกลับเป็น `true` หากอนุญาตให้เข้าร่วมเซิร์ฟเวอร์
- response: `table<{ [key]: any }>`
    - ข้อมูลการตอบกลับเมื่อ success มีค่าเป็น `true`
        - id: `string`
            - รหัสผู้ใช้ เช่น `"443334508020890078"`
        - name: `string`
            - ชื่อที่แสดงของผู้ใช้
        - username
            - ชื่อของผู้ใช้
        - avatar: `string`
            - แฮชอวาตาร์ของผู้ใช้
    - ข้อมูลการตอบกลับเมื่อ success มีค่าเป็น `false`
        - code: `integer`
            - รหัสสถานะ HTTP ที่ตอบกลับโดย [Discord API](https://discord.com/developers/docs/reference)
        - message: `string`
            - ข้อความแสดงข้อผิดพลาด
