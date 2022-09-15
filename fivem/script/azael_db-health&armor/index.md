---
sidebar_position: 4
---

# azael_db-health&armor

# ความต้องการ
- **[es_extended](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx%5D/es_extended)**
- **[esx_status](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_status)**

## ติดตั้งและใช้งาน

1. ดาวน์โหลดและแตกไฟล์ลงในโฟลเดอร์ `resources` ของคุณ
2. ชื่อของทรัพยากรจะต้องเป็น `azael_db-health&armor` ห้ามแก้ไขโดยเด็ดขาด
3. เปิดไฟล์ `server.cfg` และทำการเพิ่ม `ensure azael_db-health&armor` ไว้บริเวณด้านล่าง **[esx_status](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_status)** บรรทัดใดก็ได้

```diff  title="server.cfg"
ensure azael_db-health&armor
```

:::caution

ไม่เเนะนำให้รีสตาร์ททรัพยากรนี้ เนื่องจากทรัพยากรนี้ทำงานร่วมกับทรัพยากร **[esx_status](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx_addons%5D/esx_status)** เเละอาจจะทำให้เกิดข้อผิดพลาดได้

:::

## ยกเลิกใช้งาน

1. เปิดไฟล์ `server.cfg` และค้นหา `ensure azael_db-health&armor`
2. ทำการเพิ่ม `#` ไว้ข้างหน้า `ensure azael_db-health&armor`

```diff  title="server.cfg"
#ensure azael_db-health&armor
```
