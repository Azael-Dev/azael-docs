# azael_playpass

ระบบจัดการการเชื่อมต่อของผู้เล่นอย่างมีประสิทธิภาพ ด้วยการตรวจสอบสิทธิ์ผ่าน [Discord API](./config/external_api.md#discord) หรือ [Custom API](./config/external_api.md#custom) และมีระบบ [Queue](./config/queue.md) เข้าร่วมเซิร์ฟเวอร์ ช่วยลดภาระเซิร์ฟเวอร์ในช่วงที่มีผู้เล่นหนาแน่น ควบคุมปริมาณการเข้าเล่นได้อย่างยืดหยุ่น เพิ่มความเสถียรและมอบประสบการณ์ที่ดีขึ้นให้กับผู้เล่น รองรับการใช้งานทั้งบนเซิร์ฟเวอร์ [FiveM](https://fivem.net/) และ [RedM](https://redm.net/)

:::info

- ทรัพยากรนี้เป็นเวอร์ชันใหม่ของ **azael_dc-whitelisted** ซึ่งมีการเปลี่ยนชื่อและถูกเขียนใหม่ทั้งหมด โดยยังคงจุดประสงค์หลักของผลิตภัณฑ์เดิมไว้ การพัฒนาครั้งนี้ปรับปรุงประสิทธิภาพ เพิ่มความยืดหยุ่น และรองรับการใช้งานที่ทันสมัยยิ่งขึ้น
- หากผู้ใช้ต้องการดูเอกสารสำหรับ **azael_dc-whitelisted** สามารถดูได้ที่ [**เอกสารเวอร์ชันเก่า**](https://docs-old.azael.dev/docs/azael_dc-whitelisted)

:::

## ความต้องการ

### เซิร์ฟเวอร์

- เวอร์ชัน [**FXServer**](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master) ขั้นต่ำ **`12933`**
- เปิดใช้งาน [**OneSync**](https://docs.fivem.net/docs/scripting-reference/onesync)

### ทรัพยากร

- [**oxmysql**](https://github.com/CommunityOx/oxmysql)

:::tip

- หากคุณไม่ได้ใช้งาน [**oxmysql**](https://github.com/CommunityOx/oxmysql) คุณสามารถดูรายละเอียดได้ที่ไฟล์ [**`./modules/database/server.lua`**](./modules/database/server.md)

:::

## ติดตั้งและใช้งาน

1. ดาวน์โหลดและแตกไฟล์ลงในโฟลเดอร์ **resources** ของคุณ
2. ชื่อของทรัพยากรจะต้องเป็น **azael_playpass** ห้ามแก้ไขโดยเด็ดขาด
3. ไปยังโฟลเดอร์ **config** และดำเนินการเปิดไฟล์ [**auth.lua**](./config/auth.md) เพื่อระบุ [**Token**](./config/auth.md#producttoken) ของผลิตภัณฑ์
4. ไปยังไฟล์ **server.cfg** และทำการเพิ่ม `ensure azael_playpass`

```diff title="server.cfg"
ensure azael_playpass
```

:::tip

- ระบบจะดำเนินการตรวจสอบและติดตั้งฐานข้อมูล (**SQL**) ของทรัพยากรนี้โดยอัตโนมัติ
    - หากใช้งาน **azael_dc-whitelisted** มาก่อนและเปลี่ยนมาใช้ทรัพยากรนี้ ระบบจะดำเนินการคัดลอกข้อมูลจากตาราง **`azael_dc_whitelisted`** มายัง **`azael_playpass`** เมื่อเริ่มต้นทรัพยากรนี้ในครั้งแรก
    - ดูรายละเอียดของรหัสได้ที่ไฟล์ [**`./modules/database/server.lua`**](./modules/database/server.md) ฟังก์ชัน [**Database.setupTables**](./modules/database/server.md#setuptables)

:::

:::caution

- หากเซิร์ฟเวอร์ของคุณมีผู้เล่นออนไลน์อยู่เป็นจำนวนมาก โปรดหลีกเลี่ยงการรีสตาร์ททรัพยากรนี้

:::

## ยกเลิกใช้งาน

1. ไปยังไฟล์ `server.cfg` และค้นหา `ensure azael_playpass`
2. ทำการเพิ่ม `#` ไว้ข้างหน้า `ensure azael_playpass`

```diff title="server.cfg"
#ensure azael_playpass
```

## โครงสร้าง

:::danger

คุณสามารถเข้าถึงไฟล์ทั้งหมดได้ ยกเว้นไฟล์ภายในโฟลเดอร์ **core** ซึ่งจะถูกเข้ารหัสไฟล์ไว้

:::

```bash
azael_playpass
├── config
│   ├── auth.lua
│   ├── command.lua
│   ├── core.lua
│   ├── external_api.lua
│   ├── nui.lua
│   ├── profile.lua
│   ├── queue.lua
│   └── setup.lua
├── core # คุณไม่สามารถดำเนินการใดๆภายในโฟลเดอร์นี้ได้ เนื่องจากไฟล์ทั้งหมดภายในโฟลเดอร์นี้ถูกจะถูกเข้ารหัสไว้
│   ├── modules
│   │   ├── anti-spam
│   │   │   └── server.lua
│   │   ├── azael-auth
│   │   │   ├── client.lua
│   │   │   └── server.lua
│   │   ├── commands
│   │   │   └── server.lua
│   │   ├── external-api
│   │   │   └── server.lua
│   │   ├── locale
│   │   │   └── shared.lua
│   │   ├── player
│   │   │   └── server.lua
│   │   ├── profile
│   │   │   └── server.lua
│   │   ├── queue
│   │   │   └── server.lua
│   │   └── utils
│   │       ├── client.lua
│   │       └── server.lua
│   ├── client.lua
│   ├── init.lua
│   └── server.lua
├── locales
│   └── th.json
├── modules
│   ├── commands
│   │   └── server.lua
│   ├── database
│   │   └── server.lua
│   ├── external-api
│   │   ├── test-api
│   │   │   ├── .gitignore
│   │   │   ├── index.js
│   │   │   └── package.json
│   │   └── server.lua
│   ├── hooks
│   │   └── server.lua
│   ├── logger
│   │   └── server.lua
│   ├── nui
│   │   └── client.lua
│   ├── player
│   │   ├── client.lua
│   │   └── server.lua
│   ├── profile
│   │   ├── templates
│   │   │   ├── bind-account.json
│   │   │   └── single-account.json
│   │   └── server.lua
│   └── queue
│       └── server.lua
├── web
│   ├── css
│   │   └── styles.css
│   ├── js
│   │   └── script.js
│   └── index.html
└── fxmanifest.lua
```
