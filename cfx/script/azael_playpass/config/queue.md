---
sidebar_label: Queue
---

# Queue

การกำหนดค่าเกี่ยวกับระบบคิวเชื่อมต่อกับเซิร์ฟเวอร์

## svFullQueueLimit

จำนวนผู้เล่นสูงสุดที่สามารถรอในคิวเมื่อเซิร์ฟเวอร์สล็อตเต็ม

```lua title="บรรทัดที่ 12"
svFullQueueLimit = 52
```

- svFullQueueLimit: `integer`
    - ระบุ **`0`** เพื่อปิดใช้งานการจำกัด

## releaseQueueLimit

จำนวนผู้เล่นสูงสุดที่จะปล่อยเข้าเซิร์ฟเวอร์ในแต่ละรอบเมื่อสล็อตว่าง

```lua title="บรรทัดที่ 14"
releaseQueueLimit = 2
```

- releaseQueueLimit: `integer`

## updateQueueInterval

ระยะเวลาในการอัปเดตการประมวลผลของระบบคิวและข้อความที่แสดงผลต่อผู้เล่น

```lua title="บรรทัดที่ 16"
 updateQueueInterval = 3
```

- updateQueueInterval: `integer`
    - หน่วยเป็น **วินาที**

## resourceDownloadLimit

จำนวนผู้เล่นสูงสุดที่สามารถดาวน์โหลดไฟล์ทรัพยากรพร้อมกันได้

```lua title="บรรทัดที่ 18"
resourceDownloadLimit = 10
```

- resourceDownloadLimit: `integer`
    - ระบุ **`0`** เพื่อปิดใช้งานการจำกัด

## queueDisplayLists

แสดงรายชื่อผู้เล่นในคิวที่กำลังจะเข้าสู่เซิร์ฟเวอร์

```lua title="บรรทัดที่ 20"
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

## luckySlots

กิจกรรม Lucky Slots สำหรับผู้เล่นที่รอคิวเข้าเซิร์ฟ

```lua title="บรรทัดที่ 31"
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
- emojis: `table<{ [string], [string] }>`
    - รายการ Emojis สำหรับการสุ่ม
- winChance: `integer`
    - โอกาสชนะ (**1** ถึง **100** หรือ **0** เพื่อสุ่มแบบปกติ)
- winRandomReward: `table<{ [table], [table] }>` | `table`
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

```lua title="บรรทัดที่ 46"
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
