---
sidebar_label: Profile
---

# Profile

การกำหนดค่าเกี่ยวกับการแสดงโปรไฟล์ข้อมูลบัญชีของผู้เล่นเมื่อเชื่อมต่อกับเซิร์ฟเวอร์

## timeoutAfter

ระยะเวลาที่จะแสดงข้อมูลโปรไฟล์ก่อนหมดเวลา


```lua title="บรรทัดที่ 12"
timeoutAfter = 10
```

- timeoutAfter: `integer`
    - หน่วยเป็น **วินาที**

## autoConnectOnTimeout

เชื่อมต่ออัตโนมัติเมื่อหมดเวลา

```lua title="บรรทัดที่ 13"
autoConnectOnTimeout = true
```

- autoConnectOnTimeout: `boolean`
    - เปิดใช้งานการเชื่อมต่ออัตโนมัติเมื่อหมดเวลา 
        - ⚠️ **หากปิดใช้งาน** ผู้เล่นจะถูกตัดการเชื่อมต่อทันทีเมื่อไม่ดำเนินการที่ปุ่มภายในเวลาที่กำหนดใน [`timeoutAfter`](./profile.md#timeoutafter)

## preventAutoBindAccounts

ป้องกันการผูกบัญชีอัตโนมัติสำหรับผู้เล่นใหม่

```lua title="บรรทัดที่ 14"
preventAutoBindAccounts = true
```

- preventAutoBindAccounts: `boolean`
    - เปิดใช้งานป้องกันการผูกบัญชีอัตโนมัติสำหรับผู้เล่นใหม่ เพื่อป้องกันการเชื่อมต่ออัตโนมัติเมื่อเปิดใช้งาน [`autoConnectOnTimeout`](./profile.md#autoconnectontimeout)
    - `true`: ไม่ผูกบัญชีและตัดการเชื่อมต่อ
    - `false`: อนุญาตให้ผูกบัญชีและเชื่อมต่ออัตโนมัติ

## userProfileAPIs

การกำหนดค่ารับข้อมูลโปรไฟล์ผู้ใช้จาก API ของผู้ให้บริการ

```lua title="บรรทัดที่ 16"
userProfileAPIs = {
    provider = {
        steam = { ... },
        discord = { ... },
    },
    requestLimits = { ... }
}
```

- provider: `table<{ steam: table, discord: table }>`
    - รายการผู้ให้บริการที่รองรับการดึงข้อมูลผู้ใช้จาก API
        - steam: `table`
            - ผู้ให้บริการ [Steam Web API](https://steamcommunity.com/dev)
        - discord: `table`
            - ผู้ให้บริการ [Discord API](https://discord.com/developers/docs/reference)
- requestLimits: `table`
    - กำหนดค่าการจำกัดจำนวนคำขอ (แนะนำให้เปิดใช้งานเพื่อป้องกันรหัสสถานะ [HTTP 429 Too Many Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/429))

### steam

การตั้งค่ารับข้อมูลโปรไฟล์ผู้ใช้จาก [Steam Web API](https://steamcommunity.com/dev)

```lua title="บรรทัดที่ 18"
steam = { 
    enable = true,
    endpointUrl = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${WEB_API_KEY}&steamids=${STEAM_ID}',
    webApiKey = GetConvar('steam_webApiKey', '')
}
```

- enable: `boolean`
    - เปิดใช้งานการดึงข้อมูลโปรไฟล์จาก [Steam Web API](https://steamcommunity.com/dev)
- endpointUrl: `string`
    - URL สำหรับเรียกข้อมูลโปรไฟล์ผู้ใช้จาก [Steam Web API](https://steamcommunity.com/dev)
        - ⚠️ `${WEB_API_KEY}` และ `${STEAM_ID}` จะถูกแทนที่โดยรหัสภายใน
- webApiKey: `string`
    - API Key สำหรับการเข้าถึงข้อมูลโปรไฟล์ โดยคุณสามารถสร้างคีย์ได้ที่ [ลงทะเบียนรับรหัส Steam Web API](https://steamcommunity.com/dev/apikey)

:::tip

การกำหนดค่าเริ่มต้นจะรับ [Steam Web API Key](https://steamcommunity.com/dev/apikey) มาจาก `steam_webApiKey` ที่กำหนดไว้ภายในไฟล์ [`server.cfg`](https://docs.fivem.net/docs/server-manual/setting-up-a-server-vanilla/#servercfg)

```diff title="server.cfg"
set steam_webApiKey "your_api_key"
```

:::

### discord

การตั้งค่ารับข้อมูลโปรไฟล์ผู้ใช้จาก [Discord API](https://discord.com/developers/docs/reference)

```lua title="บรรทัดที่ 23"
discord = {
    enable = true,
    endpointUrl = 'https://discord.com/api/v10/users/${USER_ID}',
    botToken = GetConvar('discord_botToken', '')
}
```

- enable: `boolean`
    - เปิดใช้งานการดึงข้อมูลโปรไฟล์จาก [Discord API](https://discord.com/developers/docs/reference)
- endpointUrl: `string`
    - URL สำหรับดึงข้อมูลโปรไฟล์ผู้ใช้จาก [Discord API](https://discord.com/developers/docs/reference)
        - ⚠️ `${USER_ID}` จะถูกแทนที่โดยรหัสภายใน
- botToken: `string`
    - [Bot Token](./external_api.md#bottoken) ใช้สำหรับยืนยันตัวตนของบอท เพื่อให้สามารถเข้าถึง [Discord API](https://discord.com/developers/docs/reference) ได้

:::tip

การกำหนดค่าเริ่มต้นจะรับ Bot Token มาจาก `discord_botToken` ที่กำหนดไว้ภายในไฟล์ [`server.cfg`](https://docs.fivem.net/docs/server-manual/setting-up-a-server-vanilla/#servercfg)

```diff title="server.cfg"
set discord_botToken "your_bot_token"
```

:::

### requestLimits

กำหนดค่าการจำกัดจำนวนคำขอ

```lua title="บรรทัดที่ 30"
 requestLimits = {
    enable = true,
    rate = 30,
    per = 1
}
```

- enable: `boolean`
    - เปิดใช้งานการจำกัดจำนวนคำขอ
- rate: `integer`
    - จำนวนคำขอสูงสุดที่อนุญาตให้ทำได้ภายในระยะเวลาที่กำหนด
- per: `integer`
    - ระยะเวลาที่ต้องรอก่อนที่จะรีเซ็ตจำนวนคำขอใหม่ (หน่วยเป็น **วินาที**)

:::danger

จำเป็นที่จะต้องเปิดใช้งานเพื่อป้องกันรหัสสถานะ [HTTP 429 Too Many Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/429)

:::

## imageUrl

การกำหนดค่า URL ของรูปภาพที่ใช้ในการ์ดโปรไฟล์

```lua title="บรรทัดที่ 37"
imageUrl = {
    logo = {
        steam = 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg',
        discord = 'https://cdn.discordapp.com/embed/avatars/0.png',
        license = 'https://upload.wikimedia.org/wikipedia/commons/5/53/Rockstar_Games_Logo.svg',
        license2 = 'https://upload.wikimedia.org/wikipedia/commons/5/53/Rockstar_Games_Logo.svg',
        fivem = 'https://upload.wikimedia.org/wikipedia/commons/5/5a/FiveM-Logo.png'
    },
    avatar = 'https://avatars.cloudflare.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg'
}
```

- logo: `table`
    - กำหนดค่ารูปภาพ Logo ของผู้ให้บริการ
        - steam: `string`
            - URL รูปภาพ Logo ของ [Steam](https://store.steampowered.com/)
        - discord: `string`
            - URL รูปภาพ Logo ของ [Discord](https://discord.com/)
        - license: `string`
            - URL รูปภาพ Logo ของ [Rockstar Games](https://www.rockstargames.com/)
        - license2: `string`
            - URL รูปภาพ Logo ของ [Rockstar Games](https://www.rockstargames.com/) ที่ใช้งาน [Steam](https://store.steampowered.com/)
        - fivem: `string`
            - URL รูปภาพ Logo ของ [Cfx.re](https://cfx.re/)
- avatar: `string`
    - URL รูปภาพ Avatar เริ่มต้น (ใช้ในกรณีไม่สามารถรับข้อมูลผู้ใช้จากผู้ให้บริการ API ได้)

## labelTypes

การกำหนดค่าประเภทฉลากเพื่อใช้เเสดงในการ์ดโปรไฟล์

```lua title="บรรทัดที่ 48"
labelTypes = {
    steam = {
        [1] = 'HEX ID:',
        [2] = 'DEC ID:',
        [3] = 'DISPLAY NAME:'
    },
    discord = {
        [1] = 'USER ID:',
        [2] = 'USERNAME:',
        [3] = 'DISPLAY NAME:'
    },
    license = {
        [1] = 'LICENSE:',
        [2] = 'DISPLAY NAME:'
    },
    license2 = {
        [1] = 'LICENSE(2):',
        [2] = 'DISPLAY NAME:'
    },
    fivem = {
        [1] = 'USER ID:',
        [2] = 'DISPLAY NAME:'
    }
}
```

- steam: `table<{ [integer]: string }>`
    - โปรไฟล์ผู้ใช้ [Steam](https://store.steampowered.com/)
- discord: `table<{ [integer]: string }>`
    - โปรไฟล์ผู้ใช้ [Discord](https://discord.com/)
- license: `table<{ [integer]: string }>`
    - โปรไฟล์ผู้ใช้ [Rockstar Online Services](https://www.rockstargames.com/)
- license2: `table<{ [integer]: string }>`
    - โปรไฟล์ผู้ใช้ [Rockstar Online Services](https://www.rockstargames.com/) สำหรับผู้ที่ใช้ [Steam](https://store.steampowered.com/)
- fivem:  `table<{ [integer]: string }>`
    - โปรไฟล์ผู้ใช้ [Cfx.re](https://cfx.re/)
