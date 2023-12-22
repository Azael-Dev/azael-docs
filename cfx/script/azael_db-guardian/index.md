# azael_db-guardian

[**สำรองฐานข้อมูลเซิร์ฟเวอร์**](./config/server#backupserverdataenable) และ [**ลบข้อมูลผู้เล่นที่ไม่ได้ใช้งาน**](./config/server#autodeleteenable) ออกจากฐานข้อมูลของเซิร์ฟเวอร์ พร้อมการ [**สำรองข้อมูลผู้เล่นที่ถูกลบ**](./config/server#backupplayerdataenable) รายบุคคล และยังสามารถอัปโหลดไฟล์สำรองข้อมูลไปยัง [**Google Drive API (GCP)**](https://console.cloud.google.com/apis/library/drive.googleapis.com), [**Discord API (Webhook)**](https://discord.com/developers/docs/resources/webhook) หรือ [**Custom API**](./public/fileupload) ได้

## ความต้องการ

### เซิร์ฟเวอร์

- เวอร์ชัน [**Server**](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master) ขั้นต่ำ **`N/A`** (อ้างอิงจาก [**oxmysql**](https://github.com/overextended/oxmysql))

### ทรัพยากร

- [**oxmysql**](https://github.com/overextended/oxmysql)
- **[es_extended](https://github.com/esx-framework/esx_core/tree/main/%5Bcore%5D/es_extended)** สำหรับเซิร์ฟเวอร์ที่ใช้ **[ESX Framework](https://github.com/esx-framework)**
- **[qb-core](https://github.com/qbcore-framework/qb-core)** สำหรับเซิร์ฟเวอร์ที่ใช้ **[QBCore Framework](https://github.com/qbcore-framework)**
- **[vorp_core](https://github.com/VORPCORE/vorp-core-lua)** สำหรับเซิร์ฟเวอร์ที่ใช้ **[VORPCore Framework](https://github.com/VORPCORE)**

:::tip

- หากคุณไม่ได้ใช้งาน **[oxmysql](https://github.com/overextended/oxmysql)** คุณสามารถดูรายละเอียดได้ที่ **[public/database](./public/database)**
- หากคุณไม่ได้ใช้งาน **[ESX Framework](https://github.com/esx-framework)**, **[QBCore Framework](https://github.com/qbcore-framework)** หรือ **[VORPCore Framework](https://github.com/VORPCORE)** คุณสามารถดูรายละเอียดได้ที่ **[public/framework](./public/framework)**

:::

## ติดตั้งและใช้งาน

1. ดาวน์โหลดและแตกไฟล์ลงในโฟลเดอร์ `resources` ของคุณ
2. ชื่อของทรัพยากรจะต้องเป็น `azael_db-guardian` ห้ามแก้ไขโดยเด็ดขาด
3. ไปยังโฟลเดอร์ `config` และดำเนินการเปิดไฟล์ **[auth.config.lua](./config/auth.md)** เพื่อระบุ **[Token](./config/auth#token)** ของสินค้า
4. ไปยังไฟล์ `server.cfg` และทำการเพิ่ม `ensure azael_db-guardian`

```diff title="server.cfg"
ensure azael_db-guardian
```

:::tip

- หากคุณใช้งานทรัพยากรนี้ในครั้งแรก เราขอแนะนำให้คุณดู [**บทช่วยสอนและคำแนะนำ**](./tutorial)
- ระบบจะดำเนินการตรวจสอบและติดตั้งฐานข้อมูล (**SQL**) ของทรัพยากรนี้โดยอัตโนมัติ
    - คัดลอกข้อมูล ตัวระบุ และ วันที่เชื่อมต่อครั้งล่าสุด ของผู้เล่น จากตารางของเฟรมเวิร์กที่ใช้งาน หากเฟรมเวิร์กไม่ได้จัดเก็บข้อมูลการเชื่อมต่อของผู้เล่น จะคัดลอกเฉพาะข้อมูล ตัวระบุ และ กำหนดวันที่เชื่อมต่อครั้งล่าสุดเป็น วันเวลาปัจจุบัน
    - ดูรายละเอียดของรหัสได้ที่ **[public/database](./public/database)** ฟังก์ชัน **[InitDatabase (function)](./public/database#initdatabase-function)**

:::

:::caution

- หากเซิร์ฟเวอร์ของคุณมีผู้เล่นออนไลน์อยู่เป็นจำนวนมาก โปรดหลีกเลี่ยงการรีสตาร์ททรัพยากรนี้

:::

## ยกเลิกใช้งาน

1. ไปยังไฟล์ `server.cfg` และค้นหา `ensure azael_db-guardian`
2. ทำการเพิ่ม `#` ไว้ข้างหน้า `ensure azael_db-guardian`

```diff title="server.cfg"
#ensure azael_db-guardian
```
