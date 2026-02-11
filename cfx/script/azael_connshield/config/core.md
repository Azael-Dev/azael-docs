---
sidebar_label: Core
---

# Core

การกำหนดค่าหลักของทรัพยากรนี้

## locale

ภาษาที่ต้องการใช้งาน

```lua title="บรรทัดที่ 22"
locale = 'th'
```

- locale: `string`
    - เส้นทางไฟล์ `./locales/<langcode>.json`

## debugMode

โหมดดีบัก (Debug Mode) ใช้สำหรับแสดงข้อมูลดีบักในคอนโซลเซิร์ฟเวอร์

```lua title="บรรทัดที่ 24"
debugMode = true
```

- debugMode: `boolean`

:::tip

ในขณะเซิร์ฟเวอร์ทำงานอยู่ คุณสามารถ เปิด/ปิด โหมดดีบักได้โดยใช้ [Convar](https://docs.fivem.net/docs/scripting-reference/convars/)
- `set azael_connshield:debug true` เพื่อ **เปิด**ใช้งานโหมดดีบัก
- `set azael_connshield:debug false` เพื่อ **ปิด**ใช้งานโหมดดีบัก

:::

## identifierUniqueness

ป้องกันการใช้งานตัวระบุเดียวกันเชื่อมต่อพร้อมกัน (Identifier Uniqueness)

```lua title="บรรทัดที่ 30"
identifierUniqueness = {
    enable = true,
    provider = IDENTIFIER_TYPE.STEAM
}
```

- enable: `boolean`
    - เปิดใช้งาน ป้องกันการใช้งานตัวระบุเดียวกันเชื่อมต่อพร้อมกัน (`true` = เปิดใช้งาน, `false` = ปิดใช้งาน)
- provider: `string`
    - ประเภทตัวระบุที่ต้องการใช้งาน
        - ประเภทตัวระบุที่รองรับ: `steam`, `discord`, `license`, `license2`, `fivem`

:::info

ค่าเริ่มต้น (**Default**) จะดำเนินการ **เตะผู้เล่นที่ออนไลน์อยู่แล้ว** ออกหากตรวจพบว่ามีการเชื่อมต่อด้วยตัวระบุเดียวกัน คุณสามารถเปลี่ยนพฤติกรรมนี้ได้โดยการแก้ไขฟังก์ชัน [Hooks.onPlayerDuplicateIdentifier](../modules/hooks/server.md#onplayerduplicateidentifier) ที่ไฟล์ `./modules/hooks/server.lua`

:::

## ipProtection

การป้องกันและควบคุมการเชื่อมต่อจากที่อยู่ IP (IP Protection)

```lua title="บรรทัดที่ 36"
ipProtection = {
    enable = true,
    connectionLimit = { ... },
    ipReputation = { ... }
}
```

- enable: `boolean`
    - เปิดใช้งาน การป้องกันและควบคุมการเชื่อมต่อจากที่อยู่ IP (`true` = เปิดใช้งาน, `false` = ปิดใช้งาน)

### connectionLimit

การจำกัดการเชื่อมต่อจากที่อยู่ IP เดียวกัน (IP Connection Limit)

```lua title="บรรทัดที่ 39"
connectionLimit = {
    enable = true,
    maxConnections = 3
}
```

- enable: `boolean`
    - เปิดใช้งาน การจำกัดการเชื่อมต่อจากที่อยู่ IP เดียวกัน (`true` = เปิดใช้งาน, `false` = ปิดใช้งาน)
- maxConnections: `integer`
    - จำนวนการเชื่อมต่อจากที่อยู่ IP เดียวกันที่อนุญาตให้เข้าร่วมเซิร์ฟเวอร์พร้อมกันได้

:::tip

ในขณะเซิร์ฟเวอร์ทำงานอยู่ คุณสามารถเปลี่ยนค่าจำนวนนี้ได้โดยใช้ [Convar](https://docs.fivem.net/docs/scripting-reference/convars/)
- `set azael_connshield:ipLimits 5` เพื่อเปลี่ยนจำนวนการเชื่อมต่อสูงสุดเป็น **5**

:::

### ipReputation

การตรวจสอบความน่าเชื่อถือของที่อยู่ IP (IP Reputation Check)

```lua title="บรรทัดที่ 44"
ipReputation = {
    enable = true,
    provider = IP_PROVIDER.PROXYCHECK,
    allowOnFailure = true,
    providers = { ... }
}
```

- enable: `boolean`
    - เปิดใช้งาน การตรวจสอบความน่าเชื่อถือของที่อยู่ IP (`true` = เปิดใช้งาน, `false` = ปิดใช้งาน)
- provider: `string`
    - ผู้ให้บริการตรวจสอบ IP Reputation
        - ผู้ให้บริการที่รองรับ: `proxycheck`
- allowOnFailure: `boolean`
    - อนุญาตให้ผู้เล่นเชื่อมต่อหากการตรวจสอบล้มเหลว (`true` = อนุญาต, `false` = ไม่อนุญาต)

:::info

ระบบมีการ **Cache** ผลลัพธ์เพื่อลดจำนวนคำขอ API และจะข้ามการตรวจสอบในครั้งแรกเมื่อเซิร์ฟเวอร์เริ่มทำงาน เพื่อป้องกันการเรียก API จำนวนมากพร้อมกัน

:::

#### proxycheck

การตั้งค่าผู้ให้บริการ [proxycheck.io](https://proxycheck.io/)

```lua title="บรรทัดที่ 50"
proxycheck = {
    apiKey = 'YOUR_API_KEY',
    blockVPN = true,
    blockProxy = true,
    allowCountries = {
        'TH'
    }
}
```

- apiKey: `string`
    - ระบุ API Key ที่ได้รับจาก [proxycheck.io Dashboard](https://proxycheck.io/dashboard/)
- blockVPN: `boolean`
    - บล็อกการเชื่อมต่อผ่าน VPN (`true` = บล็อก, `false` = ไม่บล็อก)
- blockProxy: `boolean`
    - บล็อกการเชื่อมต่อผ่าน Proxy (`true` = บล็อก, `false` = ไม่บล็อก)
- allowCountries: `table<{ [index]: string }>` | `table<{}>`
    - อนุญาตให้เชื่อมต่อจากประเทศที่ระบุเท่านั้น โดยระบุ [รหัสประเทศ ISO](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) เช่น `TH`, `LA`, `VN`, `SG`
        - หากไม่ต้องการจำกัดประเทศ ให้เว้นว่างตารางนี้ไว้ `{}`

:::tip

ใช้งาน API ได้ฟรี **1,000 คำขอต่อวัน** ดูรายละเอียดราคาเพิ่มเติมได้ที่ [proxycheck.io/pricing](https://proxycheck.io/pricing)

:::

## bypassRules

ข้ามการตรวจสอบตามกฎที่กำหนด (Bypass Rules) สำหรับกลุ่ม ACE ที่กำหนดไว้

```lua title="บรรทัดที่ 61"
bypassRules = {
    enable = true,
    groups = {
        {
            name = 'superadmin',
            rules = {
                BYPASS_RULE.IDENTIFIER_UNIQUENESS,
                BYPASS_RULE.IP_PROTECTIONS
            }
        },
        ...
    }
}
```

- enable: `boolean`
    - เปิดใช้งาน ข้ามการตรวจสอบตามกฎที่กำหนด (`true` = เปิดใช้งาน, `false` = ปิดใช้งาน)
- groups: `table<{ [index]: table }>`
    - รายชื่อกลุ่ม ACE ที่จะข้ามการตรวจสอบตามกฎที่กำหนด
        - name: `string`
            - ชื่อกลุ่ม ACE (เช่น `superadmin`, `admin`, `moderator`, `bypass_all`, `bypass_id`, `bypass_ip`)
        - rules: `table<{ [index]: string }>`
            - กฎที่ต้องการข้ามการตรวจสอบ
                - `BYPASS_RULE.IDENTIFIER_UNIQUENESS` — ข้ามการตรวจสอบ ป้องกันการใช้งานตัวระบุเดียวกันเชื่อมต่อพร้อมกัน
                - `BYPASS_RULE.IP_PROTECTIONS` — ข้ามการตรวจสอบ การป้องกันและควบคุมการเชื่อมต่อจากที่อยู่ IP

:::info

ดูรายละเอียดเกี่ยวกับการตั้งค่ากลุ่ม ACE ได้ที่ไฟล์ [**`./config/permissions.cfg`**](./permissions.md) และดูข้อมูลเพิ่มเติมเกี่ยวกับ ACE Permission ได้ที่ [**Cfx.re Documentation**](https://docs.fivem.net/docs/server-manual/server-commands/#access-control-commands)

:::

### กลุ่มเริ่มต้น {#default-groups}

| ชื่อกลุ่ม | Bypass Rules | คำอธิบาย |
|---|---|---|
| `superadmin` | `IDENTIFIER_UNIQUENESS`, `IP_PROTECTIONS` | ข้ามการตรวจสอบทั้งหมด |
| `admin` | `IDENTIFIER_UNIQUENESS`, `IP_PROTECTIONS` | ข้ามการตรวจสอบทั้งหมด |
| `moderator` | `IDENTIFIER_UNIQUENESS`, `IP_PROTECTIONS` | ข้ามการตรวจสอบทั้งหมด |
| `bypass_all` | `IDENTIFIER_UNIQUENESS`, `IP_PROTECTIONS` | ข้ามการตรวจสอบทั้งหมด |
| `bypass_id` | `IDENTIFIER_UNIQUENESS` | ข้ามการตรวจสอบตัวระบุซ้ำเท่านั้น |
| `bypass_ip` | `IP_PROTECTIONS` | ข้ามการตรวจสอบ IP เท่านั้น |

## resourceBlocks

บล็อกทรัพยากรที่ส่งผลต่อการทำงาน หรือทำงานซ้ำซ้อนกับทรัพยากรนี้

```lua title="บรรทัดที่ 92"
resourceBlocks = {
    'azael_active-identifiers'
}
```

- resourceBlocks: `table<{ [index]: string }>`
    - รายชื่อทรัพยากรที่ต้องการบล็อก (ระบบจะหยุดทรัพยากรที่ระบุโดยอัตโนมัติ)

:::warning

**azael_active-identifiers** เป็นเวอร์ชันเก่าของทรัพยากรนี้ หากคุณกำลังใช้งานอยู่ ระบบจะบล็อกโดยอัตโนมัติเพื่อป้องกันการทำงานซ้ำซ้อน

:::
