# Framework

รหัสเริ่มต้นรองรับ **[ESX Framework](https://github.com/esx-framework)**, **[QBCore Framework](https://github.com/qbcore-framework)** และ **[VORPCore Framework](https://github.com/VORPCORE)** หากคุณกำลังใช้งาน **[Framework](https://en.wikipedia.org/wiki/Framework)** อื่นๆ คุณสามารถดูรายละเอียดได้ที่นี่

## ขั้นตอนการเพิ่ม Framework

หากคุณกำลังใช้งาน **[Framework](https://en.wikipedia.org/wiki/Framework)** อื่นๆ คุณสามารถเพิ่ม **[Framework](https://en.wikipedia.org/wiki/Framework)** เพื่อให้รองรับกับเซิร์ฟเวอร์ของคุณได้ดังนี้

1. ดำเนินการคัดลอกโฟลเดอร์ `esx`, `qb` หรือ `vorp` ตามที่คุณต้องการ
2. เปลี่ยนชื่อโฟลเดอร์ที่คุณคัดลอกเป็นชื่อโฟลเดอร์ที่คุณต้องการ
3. ดำเนินการแก้ไขรหัสไฟล์ภายในโฟลเดอร์ ให้มีความเข้ากันได้กับ **[Framework](https://en.wikipedia.org/wiki/Framework)** ที่คุณกำลังใช้งานอยู่
4. ไปที่ `config/server.config.lua` การกำหนดค่า **[CONFIG.Frameworks](../config/server#frameworks)** และดำเนินการเพิ่มข้อมูลเพื่อเรียกใช้งาน

### รายละเอียดไฟล์

| File                     | Description                                                
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------
| `server.framework.lua`   | ไฟล์จะถูกโหลดทางฝั่ง **[Server](https://docs.fivem.net/docs/scripting-reference/resource-manifest/resource-manifest/#server_script)**
| `client.framework.lua`   | ไฟล์จะถูกโหลดทางฝั่ง **[Client](https://docs.fivem.net/docs/scripting-reference/resource-manifest/resource-manifest/#client_script)**
