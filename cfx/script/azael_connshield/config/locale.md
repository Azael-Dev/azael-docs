---
sidebar_label: Locale
---

# Locale

การกำหนดค่าภาษาที่ต้องการใช้งานสำหรับทรัพยากรนี้

## locale

ภาษาที่ต้องการใช้งาน

```lua title="บรรทัดที่ 13"
locale = GetConvar('locale', 'th-TH')
```

- locale: `string`
    - [BCP 47 Locale Tag](https://en.wikipedia.org/wiki/IETF_language_tag) ต้องกำหนดในรูปแบบ `ภาษา-ประเทศ`
    - เส้นทางไฟล์ `./locales/<locale>.json`

:::info

ค่าเริ่มต้นจะรับข้อมูลจาก [`sets locale`](https://docs.fivem.net/docs/server-manual/server-commands/#sets-valuename-value) ที่ไฟล์ `server.cfg` หากไม่มีจะใช้ `th-TH` เป็นค่าเริ่มต้น

:::

#### ตัวอย่างค่า Locale

| Locale Tag | Description |
|---|---|
| `th-TH` | ภาษาไทย (ประเทศไทย) |
| `en-US` | ภาษาอังกฤษ (สหรัฐอเมริกา) |
