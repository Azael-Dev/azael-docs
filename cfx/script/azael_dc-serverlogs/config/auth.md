---
sidebar_label: Auth
---

# auth.config

ไฟล์การกำหนดค่าของทรัพยากรทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)**

## Auth

ตรวจสอบสิทธิ์การใช้งานสินค้า

```lua title="บรรทัดที่ 11"
CONFIG.Auth = {} -- [[ table ]]
```

### Token

ระบุ **Token** ของสินค้า เพื่อใช้ในการตรวจสอบสิทธิ์การใช้งาน

```lua title="บรรทัดที่ 12"
CONFIG.Auth.Token = 'product_token' -- [[ string ]]
```

:::info

ตรวจสอบ Token สินค้าของคุณได้ที่หน้า **[สินค้าที่ซื้อ](https://cfx.azael.dev/dashboard/digishop/)**

:::
