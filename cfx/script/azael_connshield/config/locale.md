---
sidebar_label: Locale
---

# Locale

การกำหนดค่าภาษาที่ต้องการใช้งานสำหรับทรัพยากรนี้

## locale

กำหนดภาษาที่ต้องการใช้งาน

```lua title="บรรทัดที่ 13"
locale = GetConvar('locale', 'th-TH')
```

- locale: `string`
    - [BCP 47 Locale Tag](https://en.wikipedia.org/wiki/IETF_language_tag) ต้องกำหนดในรูปแบบ `ภาษา-ประเทศ`
    - เส้นทางไฟล์ `./locales/<language>.json` เช่น `th.json`, `en.json`

:::info

ต้องกำหนดในรูปแบบ **ภาษา-ประเทศ** เช่น `th-TH` สำหรับภาษาไทย (ประเทศไทย) หรือ `en-US` สำหรับภาษาอังกฤษ (สหรัฐอเมริกา)

:::

:::tip

การกำหนดค่าเริ่มต้นจะรับภาษามาจาก `locale` ที่กำหนดไว้ภายในไฟล์ [`server.cfg`](https://docs.fivem.net/docs/server-manual/setting-up-a-server-vanilla/#servercfg)

```diff title="server.cfg"
sets locale "th-TH"
```

:::
