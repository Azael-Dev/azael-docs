---
sidebar_label: Server
---

# IP Reputation (Server-side)

## IpReputation

### customProvider

ฟังก์ชันตรวจสอบ IP ด้วยผู้ให้บริการที่กำหนดเอง ทำงานเมื่อตั้งค่า [Provider](../../config/core.md#ipreputation) เป็น `IP_PROVIDER.CUSTOM` ในไฟล์ [`./config/core.lua`](../../config/core.md)

```lua title="บรรทัดที่ 20"
function IpReputation.customProvider(ipAddress)
    -- ตัวอย่าง: เรียก API ที่กำหนดเอง
    local reqUrl <const> = ('https://your-api.example.com/check?ip=%s'):format(ipAddress)
    local reqHeaders <const> = {
        ['Content-Type'] = 'application/json; charset=utf-8'
    }
    local statusCode <const>, responseBody <const> = PerformHttpRequestAwait(reqUrl, 'GET', '', reqHeaders)

    if statusCode ~= 200 then
        return nil, ('[custom] API returned status code: %s'):format(statusCode)
    end

    local ok <const>, responseData <const> = pcall(json.decode, responseBody)

    if not ok or not responseData then
        return nil, '[custom] Failed to decode API response'
    end

    -- ปรับตามโครงสร้าง response ของ API ที่ใช้
    local isVPN <const> = responseData.vpn == true                  -- true = ตรวจพบว่าเป็น VPN
    local isProxy <const> = responseData.proxy == true              -- true = ตรวจพบว่าเป็น Proxy
    local riskScore <const> = responseData.risk or 0                -- คะแนนความเสี่ยง (ถ้ามี)
    local confidenceScore <const> = responseData.confidence or 0    -- คะแนนความมั่นใจ (ถ้ามี)
    local country <const> = responseData.country_name               -- ชื่อประเทศ เช่น "Thailand"
    local isoCode <const> = responseData.country_code               -- รหัสประเทศ ISO เช่น "TH"
    local blocked = false
    local blockReason = nil

    -- ตัวอย่างตรรกะการตัดสินใจบล็อก (ปรับตามความต้องการ)
    if isVPN then
        blocked = true
        blockReason = 'VPN detected'
    elseif isProxy then
        blocked = true
        blockReason = 'Proxy detected'
    elseif isoCode and isoCode ~= 'TH' then
        blocked = true
        blockReason = ('Country not allowed: %s (%s)'):format(country or 'Unknown', isoCode or 'Unknown')
    end

    ---@type ProxycheckResult
    local result <const> = {
        isVPN = isVPN,
        isProxy = isProxy,
        country = country,
        isoCode = isoCode,
        riskScore = riskScore,
        confidenceScore = confidenceScore,
        blocked = blocked,
        blockReason = blockReason
    }

    return result, nil
end
```

#### Parameters

- ipAddress: `string`
    - ที่อยู่ IP ของผู้เล่น (ไม่รวม prefix เช่น `127.0.0.1`)

#### Returns

- result: `ProxycheckResult?`
    - ผลลัพธ์การตรวจสอบ ตอบกลับ `nil` หากเกิดข้อผิดพลาด
        - isVPN: `boolean`
            - ตรวจพบว่าเป็น VPN
        - isProxy: `boolean`
            - ตรวจพบว่าเป็น Proxy
        - country: `string?`
            - ชื่อประเทศที่ตรวจพบ เช่น `Thailand`
        - isoCode: `string?`
            - [รหัสประเทศ ISO](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) เช่น `TH`
        - riskScore: `integer?`
            - คะแนนความเสี่ยง (ถ้า API มีข้อมูล)
        - confidenceScore: `integer?`
            - คะแนนความมั่นใจ (ถ้า API มีข้อมูล)
        - blocked: `boolean`
            - ผลลัพธ์ว่าถูกบล็อกหรือไม่
        - blockReason: `string?`
            - เหตุผลที่ถูกบล็อก
- error: `string?`
    - ข้อความข้อผิดพลาด ตอบกลับ `nil` หากสำเร็จ

:::info

**วิธีเปิดใช้งาน Custom Provider:**
1. ตั้งค่า `provider = IP_PROVIDER.CUSTOM` ในไฟล์ [**`./config/core.lua`**](../../config/core.md#custom-provider)
2. แก้ไขฟังก์ชันนี้ให้เรียก API ของตนเองและ map ผลลัพธ์ตามโครงสร้าง `ProxycheckResult` ที่กำหนด

:::

:::warning

ฟังก์ชันนี้ต้องส่งคืนค่า **2 ค่าเสมอ** ตามลำดับ `result, error` หากส่งคืนไม่ถูก signature ระบบจะไม่สามารถประมวลผลผลลัพธ์ได้อย่างถูกต้อง

:::
