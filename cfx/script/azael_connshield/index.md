# azael_connshield

ระบบป้องกันและควบคุมการเชื่อมต่อของผู้เล่นอย่างมีประสิทธิภาพ ด้วยการป้องกันการใช้งานตัวระบุซ้ำ ([Identifier Uniqueness](./config/core.md#identifieruniqueness)), การจำกัดการเชื่อมต่อจากที่อยู่ IP เดียวกัน ([IP Connection Limit](./config/core.md#connectionlimit)) และการตรวจสอบความน่าเชื่อถือของที่อยู่ IP ([IP Reputation](./config/core.md#ipreputation)) เพื่อเพิ่มความปลอดภัยและเสถียรภาพให้กับเซิร์ฟเวอร์ รองรับการใช้งานทั้งบนเซิร์ฟเวอร์ [FiveM](https://fivem.net/) และ [RedM](https://redm.net/)

:::info

- ทรัพยากรนี้เป็นเวอร์ชันใหม่ของ [**azael_active-identifiers**](../azael_active-identifiers/index.md) ซึ่งมีการเปลี่ยนชื่อและถูกเขียนใหม่ทั้งหมด โดยยังคงจุดประสงค์หลักของผลิตภัณฑ์เดิมไว้ พร้อมเพิ่มความสามารถในการป้องกันและควบคุมการเชื่อมต่อจากที่อยู่ IP

:::

## ความต้องการ

### เซิร์ฟเวอร์

- เวอร์ชัน [**FXServer**](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master) ขั้นต่ำ **`12933`**
- เปิดใช้งาน [**OneSync**](https://docs.fivem.net/docs/scripting-reference/onesync)

## ติดตั้งและใช้งาน

1. ดาวน์โหลดและแตกไฟล์ลงในโฟลเดอร์ **resources** ของคุณ
2. ชื่อของทรัพยากรจะต้องเป็น **azael_connshield** ห้ามแก้ไขโดยเด็ดขาด
3. ไปยังโฟลเดอร์ **config** และดำเนินการเปิดไฟล์ [**auth.lua**](./config/auth.md) เพื่อระบุ [**Token**](./config/auth.md#producttoken) ของผลิตภัณฑ์
4. ไปยังไฟล์ **server.cfg** และเพิ่มรหัสด้านล่างนี้

```diff title="server.cfg"
exec resources/<PATH_TO_RESOURCE>/azael_connshield/config/permissions.cfg
ensure azael_connshield
```

5. หากต้องการใช้งาน [IP Reputation Check](./config/core.md#ipreputation) ให้ดำเนินการ [ลงทะเบียน API Key จาก proxycheck.io](https://proxycheck.io/dashboard/) และนำ API Key ไปกำหนดที่ [apiKey](./config/core.md#proxycheck)

:::tip

การกำหนดค่าในส่วนอื่นๆ ถูกตั้งค่าไว้เป็นค่าเริ่มต้นที่พร้อมใช้งานแล้ว อย่างไรก็ตาม แนะนำให้ศึกษารายละเอียดเพิ่มเติมเพื่อปรับแต่งให้เหมาะสมกับการใช้งานในแต่ละเซิร์ฟเวอร์

:::

:::caution

- หากเซิร์ฟเวอร์ของคุณมีผู้เล่นออนไลน์อยู่เป็นจำนวนมาก โปรดหลีกเลี่ยงการรีสตาร์ททรัพยากรนี้

:::

## ยกเลิกใช้งาน

1. ไปยังไฟล์ `server.cfg` และค้นหา `ensure azael_connshield`
2. ทำการเพิ่ม `#` ไว้ข้างหน้า `ensure azael_connshield`

```diff title="server.cfg"
#ensure azael_connshield
```
