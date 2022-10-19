# azael_active-identifiers

## ความต้องการ

### เซิร์ฟเวอร์

- ไม่มี (**[Standalone](https://en.wikipedia.org/wiki/Stand-alone)**)

### ทรัพยากร

- ไม่มี (**[Standalone](https://en.wikipedia.org/wiki/Stand-alone)**)

## ติดตั้งและใช้งาน

1. ดาวน์โหลดและแตกไฟล์ลงในโฟลเดอร์ `resources` ของคุณ
2. ชื่อของทรัพยากรจะต้องเป็น `azael_active-identifiers` ห้ามแก้ไขโดยเด็ดขาด
3. ไปยังโฟลเดอร์ `config` และดำเนินการเปิดไฟล์ **[auth.config.lua](./config/auth.md)** เพื่อระบุ **[Token](./config/auth#token)** ของสินค้า
4. ไปยังไฟล์ `server.cfg` และทำการเพิ่ม `ensure azael_active-identifiers` (บรรทัดใดก็ได้)

```diff title="server.cfg"
ensure azael_active-identifiers
```

## ยกเลิกใช้งาน

1. ไปยังไฟล์ `server.cfg` และค้นหา `ensure azael_active-identifiers`
2. ทำการเพิ่ม `#` ไว้ข้างหน้า `ensure azael_active-identifiers`

```diff title="server.cfg"
#ensure azael_active-identifiers
```
