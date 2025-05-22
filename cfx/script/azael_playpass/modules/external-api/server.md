---
sidebar_label: Server
---

# External API (Server-side)

## CustomAPI

:::tip
โฟลเดอร์ **test-api** เป็นเพียงตัวอย่าง API ไว้สำหรับทดสอบ [HTTP Request](https://en.wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages) จาก `azael_playpass` เพื่อตรวจสอบสิทธิ์การอนุญาตสำหรับ [Custom API](../../config/external_api.md#custom) เท่านั้น

#### File Structure
```bash
test-api
├── .gitignore
├── index.js
└── package.json
```

#### How to Run

```bash
cd test-api
```

<Tabs>
    <TabItem value="npm" label="npm">
        ```bash
        npm i
        ```
        ```bash
        npm run dev
        ```
    </TabItem>
    <TabItem value="pnpm" label="pnpm">
        ```bash
        pnpm i
        ```
        ```bash
        pnpm run dev
        ```
    </TabItem>
    <TabItem value="yarn" label="yarn">
        ```bash
        yarn i
        ```
        ```bash
        yarn dev
        ```
    </TabItem>
    <TabItem value="bun" label="bun">
        ```bash
        bun i
        ```
        ```bash
        bun run dev
        ```
    </TabItem>
</Tabs>
:::

### httpRequest

ฟังก์ชัน [HTTP Request](https://en.wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages) ไปยัง [Custom API](../../config/external_api.md#custom) ทำงานเมื่อเปิดใช้งานอ้างอิงสิทธิ์การเชื่อมต่อจาก API แบบกำหนดเองที่ [activeAPI](../../config/external_api.md#activeapi) ไฟล์ [`./config/external_api.lua`](../../config/external_api.md)

```lua title="บรรทัดที่ 19"
function CustomAPI.httpRequest(req, identifier)
    local reqUrl <const> = ('%s/%s'):format(req.url, identifier)
    local resStatus <const>, resBody <const> = PerformHttpRequestAwait(reqUrl, 'GET', '', {
        ['Content-Type'] = 'application/json; charset=utf-8',
        ['Authorization'] = req.auth
    })
    
    if resStatus == 200 then
        local resData <const> = json.decode(resBody)
        
        if not resData or not resData.success then  -- disallow
            return false, {
                code = resStatus,
                message = resData?.message  -- หาก resData.message เป็น nil จะเรียกใช้ข้อความ "join_not_permitted" ที่ไฟล์ ./locales/<langcode>.json แทน
            }
        end
        
        return true
    end
    
    return false, {
        code = resStatus,
        message = ('HTTP status code %d (%s)'):format(resStatus, 'For more details: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/' .. resStatus)
    }
end
```

#### Parameters

- req: `table<{ [key]: string }>`
    - ช้อมูลการร้องขอ ([HTTP Request](https://en.wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages))
        - url: `string`
            - [Base URL](../../config/external_api.md#baseurl-1) ที่จะร้องขอไปยัง [Custom API](../../config/external_api.md#custom)
        - auth: `string`
            - [สิทธิ์ที่อนุญาต](../../config/external_api.md#authorization)ให้เข้าถึง [Custom API](../../config/external_api.md#custom)
- identifier: `string`
    - [ตัวระบุ](../../config/core.md#identifiertype)ของผู้เล่น

#### Returns

- success: `boolean`
    - ตอบกลับเป็น `true` หากอนุญาตให้เข้าร่วมเซิร์ฟเวอร์
- err: `table<{ [key]: any }>` | `nil`
    - ข้อมูลการปฏิเสธหรือไม่อนุญาตให้เข้าร่วมเซิร์ฟเวอร์ เมื่อ success ตอบกลับเป็น `false`
        - code: `integer`
            - รหัสสถานะ HTTP ที่ตอบกลับโดย [Custom API](../../config/external_api.md#custom)
        - message: `string` | `nil`
            - ข้อความการปฏิเสธหรือไม่อนุญาตให้เข้าร่วมเซิร์ฟเวอร์ (หากเป็น `nil` จะใช้ข้อความจาก [`join_not_permitted`](../../config/core.md#locale))

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
