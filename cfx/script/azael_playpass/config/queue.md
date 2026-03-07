---
sidebar_label: Queue
---

# Queue

การกำหนดค่าเกี่ยวกับระบบคิวเชื่อมต่อกับเซิร์ฟเวอร์

## svFullQueueLimit

จำนวนผู้เล่นสูงสุดที่สามารถรอในคิวเมื่อเซิร์ฟเวอร์สล็อตเต็ม

```lua title="บรรทัดที่ 13"
svFullQueueLimit = 128
```

- svFullQueueLimit: `integer`
    - ระบุ **`0`** เพื่อปิดใช้งานการจำกัด

:::tip

รองรับการกำหนดค่า **แบบไดนามิก** ผ่านคำสั่ง [**convar**](https://docs.fivem.net/docs/scripting-reference/convars/) เพื่อปรับขนาดคิวสูงสุด **ได้ทันทีระหว่างรันไทม์** เมื่อใช้คำสั่งด้านล่างนี้ ขนาดคิวสูงสุดจะเปลี่ยนจาก **`128`** เป็น **`256`**

```diff
set azael_playpass:svFullQueueLimit 256
```

:::

## releaseQueueLimit

จำนวนผู้เล่นสูงสุดที่จะปล่อยเข้าเซิร์ฟเวอร์ในแต่ละรอบเมื่อสล็อตว่าง

```lua title="บรรทัดที่ 15"
releaseQueueLimit = 6
```

- releaseQueueLimit: `integer`

## updateQueueInterval

ระยะเวลาในการอัปเดตการประมวลผลของระบบคิวและข้อความที่แสดงผลต่อผู้เล่น

```lua title="บรรทัดที่ 17"
 updateQueueInterval = 3
```

- updateQueueInterval: `integer`
    - หน่วยเป็น **วินาที**

## playerCheckInterval

ระยะเวลาในการตรวจสอบว่าผู้เล่นยังอยู่ในคิวหรือระหว่างดาวน์โหลดไฟล์ทรัพยากรหรือไม่

```lua title="บรรทัดที่ 19"
playerCheckInterval = 5
```

- playerCheckInterval: `integer`
    - หน่วยเป็น **วินาที**

## resourceDownload

การกำหนดค่าการดาวน์โหลดไฟล์ทรัพยากรก่อนเข้าสู่ [Loading Screen](https://docs.fivem.net/docs/scripting-manual/nui-development/loading-screens/)

```lua title="บรรทัดที่ 21"
resourceDownload = {
    maxLimit = 64,
    allowRetryOnFail = {
        enable = true,
        timeout = 1
    }
}
```

- maxLimit: `integer`
    - จำนวนผู้เล่นสูงสุดที่สามารถดาวน์โหลดไฟล์ทรัพยากรพร้อมกันได้ (ระบุ **`0`** เพื่อปิดใช้งานการจำกัด)

    :::tip

    - หากเซิร์ฟเวอร์ของคุณมีการเพิ่มประสิทธิภาพการดาวน์โหลดทรัพยากรด้วย [**Proxy Caching**](https://docs.fivem.net/docs/server-manual/proxy-setup/) หรือใช้งานทรัพยากร [**bt_optimize**](https://betters.dev/) แนะนำให้ตั้งค่า **`maxLimit`** เป็น **`0`** เพื่อปิดการจำกัดจำนวนการดาวน์โหลด เนื่องจากระบบเหล่านี้ช่วยเพิ่มประสิทธิภาพการส่งไฟล์อยู่แล้ว ซึ่งจะช่วยให้ผู้เล่นสามารถเข้าสู่เซิร์ฟเวอร์ได้เร็วขึ้น

    :::

- allowRetryOnFail: `table<{ [key]: boolean|integer }>`
    - การกำหนดค่าให้ผู้เล่นเชื่อมต่อใหม่ได้ทันทีโดยไม่ต้องรอคิวเมื่อเกิดข้อผิดพลาด
        - enable: `boolean`
            - เปิดใช้งานการอนุญาตให้ผู้เล่นเชื่อมต่อใหม่ได้ทันทีเมื่อเกิดข้อผิดพลาด
        - timeout: `integer`
            - ระยะเวลาที่ผู้เล่นสามารถเชื่อมต่อใหม่ได้อีกครั้งโดยไม่ต้องรอคิว (หน่วยเป็น **นาที**)
    :::warning

    - การเปิดใช้งานฟีเจอร์นี้อาจทำให้การจัดการคิวช้าลงหากเกิดข้อผิดพลาดกับผู้เล่นจำนวนมากพร้อมกัน แต่จะช่วยให้ผู้เล่นที่พบปัญหาได้รับประสบการณ์ที่ดียิ่งขึ้น
    - แนะนำให้กำหนดค่า **`timeout`** ไม่เกิน **2** นาที เนื่องจาก **`timeout`** จะเริ่มนับก็ต่อเมื่อ **FXServer** ตัดการเชื่อมต่อผู้เล่นเรียบร้อยแล้ว
    - ผู้เล่นควร รีสตาร์ท **FiveM**/**RedM** ก่อนเชื่อมต่อใหม่ เนื่องจาก **FXServer** อาจใช้เวลา **30** ถึง **120** วินาทีในการตัดการเชื่อมต่อเดิม
    - การกดปุ่ม **ยกเลิก** จะไม่อยู่ในเงื่อนไขการผ่อนผันของการเชื่อมต่อใหม่ จะเข้าเงื่อนไขการผ่อนผันก็ต่อเมื่อ **FXServer** ตัดการเชื่อมต่อผู้เล่นเท่านั้น

    :::

## queueDisplayLists

แสดงรายชื่อผู้เล่นในคิวที่กำลังจะเข้าสู่เซิร์ฟเวอร์

```lua title="บรรทัดที่ 34"
queueDisplayLists = {
    enable = true,
    hideName = false,
    maxPlayers = 3,
    ordinalEmojis = {
        [1] = '🥇',
        [2] = '🥈',
        [3] = '🥉'
    }
}
```

- enable: `boolean`
    - เปิดใช้งานการแสดงลำดับคิวของผู้เล่น
- hideName: `boolean`
    - ซ่อนชื่อผู้เล่น
- maxPlayers: `integer`
    - จำนวนสูงสุดของผู้เล่นที่จะแสดงในลำดับคิว (แนะนำไม่เกิน **5** ลำดับ)
- ordinalEmojis: `table<{ [integer]: string }>`
    - รายการอีโมจิสำหรับแต่ละลำดับในคิว (ค่าเริ่มต้นแสดงอีโมจิเฉพาะ **3** ลำดับแรก)

## queueSessionPoints

ระบบคิวพอยท์สะสมสำหรับผู้เล่นที่รอคิว ช่วยให้ผู้เล่นที่ไม่มีพ้อยท์มีโอกาสเข้าร่วมเซิร์ฟเวอร์ได้ง่ายขึ้น

```lua title="บรรทัดที่ 45"
queueSessionPoints = {
    enable = true,
    increment = 2,
    interval = 10
}
```

- enable: `boolean`
    - เปิดใช้งานการสะสมคิวพอยท์
- increment: `integer`
    - จำนวนคิวพอยท์ที่ผู้เล่นจะได้รับในแต่ละช่วงเวลา (ค่าเริ่มต้นหากรอคิว **60 นาที** จะได้รับพอยท์เพิ่ม **720 พอยท์**)
- interval: `integer`
    - ช่วงเวลาที่ผู้เล่นจะได้รับคิวพอยท์สะสม (หน่วยเป็น **วินาที**)

:::tip INFO

- พอยท์จะถูกรีเซ็ตเมื่อตัดการเชื่อมต่อ
- เป็นเพียงพอยท์ชั่วคราวและไม่ถูกบันทึกในฐานข้อมูล

:::

## luckySlots

กิจกรรม Lucky Slots สำหรับผู้เล่นที่รอคิวเข้าเซิร์ฟ

```lua title="บรรทัดที่ 51"
luckySlots = {
    enable = true,
    timeRequired = 60 * 10,
    spinCooldown = 10,
    numSlots = 5,
    emojis = {
        '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'
    },
    winChance = 3,
    winRandomReward = {
        { points = 5 },
        { points = 5, days = 1 }
    }
}
```

- enable: `boolean`
    - เปิดใช้งานกิจกรรม Lucky Slots
- timeRequired: `integer`
    - เวลาที่ผู้เล่นต้องรอในคิวเพื่อมีสิทธิ์เข้าร่วมกิจกรรม (หน่วยเป็น **วินาที** หรือ **0** เพื่อเข้าร่วมโดยทันที)
- spinCooldown: `integer`
    - คูลดาวน์การหมุนในแต่ละรอบ (หน่วยเป็น **วินาที**)
- numSlots: `integer`
    - จำนวน Slots (แนะนำ **3** ขึ้นไป)
- emojis: `table<{ [index]: string }>`
    - รายการ Emojis สำหรับการสุ่ม
- winChance: `integer`
    - โอกาสชนะ (**1** ถึง **100** หรือ **0** เพื่อสุ่มแบบปกติ)
- winRandomReward: `table<{ [index]: table<{ points: integer, days: integer|nil }> }>` | `table<{}>`
    - รางวัล Queue Points แบบสุ่มที่ผู้เล่นจะได้รับเมื่อชนะ
        - points: `integer`
            - จำนวนคิวพอยท์ที่ต้องการเพิ่มให้ผู้เล่น
        - days: `integer` | `nil`
            - จำนวนวันหมดอายุของคิวพอยท์

:::warning

รางวัลจะถูกเพิ่มไปยังฐานข้อมูลให้กับผู้เล่นเมื่อผู้เล่นเข้าร่วมกับเซิร์ฟเวอร์แล้วเท่านั้น

:::

## rejoinOnCrashes

ผู้เล่นกลับเข้าสู่เซิร์ฟเวอร์ได้ทันทีโดยไม่ต้องรอคิวหากเกิดการขัดข้อง

```lua title="บรรทัดที่ 66"
rejoinOnCrashes = {
    enable = true,
    timeout = 2,
    allowReasons = {
        [1] = false,
        [2] = {
            'Game crashed: '
        },
        [3] = false,
        [4] = false,
        [5] = false,
        [6] = true,
        [7] = false,
        [8] = false,
        [9] = false,
        [10] = false,
        [11] = false,
        [12] = true
    },
    denyReasons = {
        [2] = {
            -- 'Game crashed: FiveM has stopped responding',
            -- 'Game crashed: Corrupted game files: '
        }
    }
}
```

- enable: `boolean`
    - เปิดใช้งานอนุญาตให้ผู้เล่นกลับเข้าสู่เซิร์ฟเวอร์ได้ทันทีโดยไม่ต้องรอคิวหากเกิดการขัดข้อง
- timeout: `integer`
    - ระยะเวลาที่ผู้เล่นสามารถกลับเข้าสู่เซิร์ฟเวอร์ได้ทันทีก่อนจะหมดเวลา (หน่วยเป็น **นาที**)
- allowReasons: `table<{ [integer]: boolean }>`
    - ประเภทของการหลุดออกจากเซิร์ฟเวอร์ที่อนุญาตและเข้าเงื่อนไขการผ่อนผัน (อ้างอิงจาก [ClientDropReasons](https://github.com/citizenfx/fivem/blob/master/code/components/citizen-server-impl/include/ClientDropReasons.h))
- denyReasons: `table<{ [integer]: boolean }>`
    - ปฏิเสธเหตุผลจากประเภทของการหลุดออกจากเซิร์ฟเวอร์ที่กำหนดและไม่เข้าเงื่อนไขการผ่อนผัน (อ้างอิงจาก [ClientDropReasons](https://github.com/citizenfx/fivem/blob/master/code/components/citizen-server-impl/include/ClientDropReasons.h))

#### clientDropReasons
1. `RESOURCE` (กระบวนการของเซิร์ฟเวอร์หรือรีซอร์สทำให้ไคลเอนต์หลุดออกจากเซิร์ฟเวอร์)
2. `CLIENT` (ไคลเอนต์เป็นฝ่ายยกเลิกการเชื่อมต่อเอง)
3. `SERVER` (เซิร์ฟเวอร์เป็นฝ่ายยกเลิกการเชื่อมต่อของไคลเอนต์)
4. `CLIENT_REPLACED` (ไคลเอนต์ถูกแทนที่โดยการเชื่อมต่อจากอุปกรณ์อื่นที่ใช้ GUID เดียวกัน)
5. `CLIENT_CONNECTION_TIMED_OUT` (การเชื่อมต่อระหว่างเซิร์ฟเวอร์และไคลเอนต์หมดเวลา)
6. `CLIENT_CONNECTION_TIMED_OUT_WITH_PENDING_COMMANDS` (การเชื่อมต่อระหว่างเซิร์ฟเวอร์และไคลเอนต์หมดเวลา ขณะยังมีคำสั่งที่รอดำเนินการ)
7. `SERVER_SHUTDOWN` (เซิร์ฟเวอร์ปิดระบบ ส่งผลให้ไคลเอนต์ถูกตัดการเชื่อมต่อ)
8. `STATE_BAG_RATE_LIMIT` (มีการใช้งาน State Bag เกินอัตราที่กำหนด)
9. `NET_EVENT_RATE_LIMIT` (มีการส่ง Net Event เกินอัตราที่กำหนด)
10. `LATENT_NET_EVENT_RATE_LIMIT` (มีการส่ง Latent Net Event เกินอัตราที่กำหนด)
11. `COMMAND_RATE_LIMIT` (มีการส่งคำสั่งเกินอัตราที่กำหนด)
12. `ONE_SYNC_TOO_MANY_MISSED_FRAMES` (มีเฟรมที่ขาดหายมากเกินไปในระบบ OneSync)
