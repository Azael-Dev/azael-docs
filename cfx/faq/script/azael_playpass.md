# azael_playpass

คำถามที่พบบ่อยเกียวกับวิธีแก้ไขปัญหาของทรัพยากร **[azael_playpass](../../script/azael_playpass/index.md)**

## Discord

คำถามที่พบบ่อยที่เกียวข้องกับ [**Discord**](https://discord.com)

### ไม่พบบัญชี Discord

ในกรณีที่ระบบแสดงข้อความว่า “ไม่พบบัญชี Discord” อาจเกิดจากการที่ **FiveM/RedM** ไม่สามารถตรวจสอบสิทธิ์ผ่านบัญชี Discord ได้อย่างถูกต้อง 

:::danger
- จำเป็นต้องติดตั้งและใช้งาน **Discord เวอร์ชันสำหรับ Windows (Desktop Application)** เท่านั้น ไม่สามารถใช้งานผ่านเวอร์ชันเว็บได้
- หากข้อความนี้แจ้งไปยังผู้เล่นทุกคน ให้ตรวจสอบที่ไฟล์ **`server.cfg`** หรือ **`.cmd`**, **`.bat`** ว่ามีการใช้งาน **`set sv_lan 1`** หรือไม่ หากมีการกำหนดค่านี้ให้ดำเนินการ **ปิดใช้งาน** หรือ **ลบออก** เนื่องจาก **`set sv_lan 1`** เปรียบเสมือนการเปิดเซิร์ฟเวอร์แบบออฟไลน์และจะไม่พึ่งพาบริการจาก [**Cfx.re**](https://cfx.re/)
:::

#### โปรดดำเนินการตามขั้นตอนต่อไปนี้เพื่อแก้ไขปัญหา

1. ปิดโปรแกรม **FiveM/RedM** และ **Discord (เวอร์ชันติดตั้งสำหรับ PC)** ให้เรียบร้อย
2. ถอนการติดตั้งโปรแกรม Discord ออกจากเครื่อง
3. กด <kbd>Windows</kbd> + <kbd>R</kbd> เพื่อเปิดหน้าต่าง Run  
   - พิมพ์คำว่า `%appdata%` แล้วกด Enter  
   - ลบโฟลเดอร์ที่ชื่อว่า `discord`
4. กด <kbd>Windows</kbd> + <kbd>R</kbd> อีกครั้ง  
   - พิมพ์คำว่า `%localappdata%` แล้วกด Enter  
   - ลบโฟลเดอร์ที่ชื่อว่า `Discord`
5. ดาวน์โหลด Discord เวอร์ชันล่าสุดสำหรับ PC จากเว็บไซต์ทางการ [https://discord.com](https://discord.com) และติดตั้งใหม่
6. เปิดโปรแกรม Discord และเข้าสู่ระบบด้วยบัญชีที่ต้องการใช้งาน
7. เปิดโปรแกรม **FiveM/RedM**  
   - หากยังไม่เคยอนุญาตให้ FiveM/RedM เข้าถึงบัญชี Discord มาก่อน จะมีหน้าต่างป๊อปอัปจาก Discord ปรากฏขึ้นเพื่อขอสิทธิ์การเข้าถึง
   - กรุณาตรวจสอบรายละเอียดและคลิก **"อนุญาต (Authorize)"** เพื่อให้ระบบสามารถเชื่อมโยงกับบัญชี Discord ได้อย่างถูกต้อง

:::note
หากยังพบปัญหาแม้ดำเนินการตามขั้นตอนข้างต้นเรียบร้อยแล้ว โปรดติดต่อฝ่ายสนับสนุนเพื่อขอความช่วยเหลือเพิ่มเติม
:::

<iframe width="100%" height="444" src="https://www.youtube.com/embed/akfmE3rKgpc?si=rM7Q_zqjy2IP6VH4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

### รหัสข้อผิดพลาด `401 Unauthorized`

เกิดจากการใช้ Token ของบอทที่ไม่ถูกต้อง, หมดอายุ หรือ ถูกลบไปแล้ว

#### แนวทางการตรวจสอบและแก้ไข

- ตรวจสอบว่า Bot Token ที่ใช้งานถูกต้องหรือไม่
- หากมีการรีเซ็ต Token ให้แน่ใจว่าได้อัปเดต Token ใหม่ในระบบทั้งหมด
- ตรวจสอบว่า Header `Authorization` มีค่าเป็น `Bot <token>` อย่างถูกต้อง

### รหัสข้อผิดพลาด `403 Forbidden`

บอทไม่มีสิทธิ์เข้าถึงทรัพยากรที่ร้องขอ เช่น เข้าร่วมเซิร์ฟเวอร์ที่ไม่มีสิทธิ์ หรือ จัดการ Channel หรือ Role โดยไม่ได้รับอนุญาต

#### แนวทางการตรวจสอบและแก้ไข

- ตรวจสอบสิทธิ์ (Permissions) ที่บอทได้รับในเซิร์ฟเวอร์นั้น
- ตรวจสอบว่า OAuth2 scopes และ permission integers ครอบคลุมการใช้งานที่ต้องการ
- หากใช้ Slash Commands ให้แน่ใจว่าบอทได้รับการอนุญาตให้จัดการคำสั่งในเซิร์ฟเวอร์เป้าหมาย

### รหัสข้อผิดพลาด `404 Not Found`

ไม่พบทรัพยากรที่ร้องขอ เช่น ID ของ Channel, Guild, User หรือ Message ไม่ถูกต้อง หรือ ทรัพยากรถูกลบไปแล้ว

#### แนวทางการตรวจสอบและแก้ไข

- ตรวจสอบว่า ID ที่ใช้งานถูกต้องและตรงกับทรัพยากรจริง
- ตรวจสอบว่าทรัพยากรยังคงอยู่และบอทมีสิทธิ์เข้าถึง
- ตรวจสอบความถูกต้องของ API Endpoint ที่เรียกใช้งาน

### รหัสข้อผิดพลาด `429 Too Many Requests`

มีการส่งคำขอไปยัง API ของ Discord ถี่เกินไปจนเกิน **Rate Limit**

:::warning
- หากเกิดข้อผิดพลาด `429 Too Many Requests` ขณะตรวจสอบสิทธิ์ผ่าน Discord API ระบบจะใช้ข้อมูลจากฐานข้อมูลภายในแทน
- ผู้เล่นใหม่ที่เพิ่งได้รับบทบาทบน Discord จะยังไม่สามารถเข้าร่วมเซิร์ฟเวอร์ได้ จนกว่าผู้ดูแลจะใช้คำสั่ง [**เพิ่มข้อมูลผู้ใช้**](../../script/azael_playpass/commands.md#adduser)
:::

#### แนวทางการตรวจสอบและแก้ไข

- ใช้ระบบจัดคิว (Queue) หรือดีเลย์ระหว่างคำขอ
- ตรวจสอบค่า `Retry-After` ใน Header ของ Response เพื่อรอระยะเวลาที่เหมาะสมก่อนส่งคำขอใหม่
- หลีกเลี่ยงการวนลูปหรือส่งคำขอซ้ำโดยไม่จำเป็น

:::tip

- Discord ใช้ระบบ Rate Limiting แบบ "Per-route" และ "Per-user" ดังนั้นควรออกแบบระบบให้จัดการกับข้อจำกัดเหล่านี้อย่างเหมาะสม
- หากยังพบปัญหาที่เกี่ยวข้องกับสถานะเหล่านี้ แนะนำให้อ้างอิงเอกสารทางการของ Discord ที่ [**Rate Limits**](https://discord.com/developers/docs/topics/rate-limits)

:::

## HWIDs (Player Tokens) คืออะไร?

[Player Tokens](https://docs.fivem.net/natives/?_0x54C06897) หรือที่นิยมเรียกกันว่า HWIDs คือรหัสเฉพาะที่ [FXServer](https://github.com/citizenfx/fivem/blob/60beca63fbd365f7900170aa71f9798325f03609/code/components/citizen-server-impl/src/PlayerScriptFunctions.cpp#L85) สร้างขึ้นจากข้อมูลฝั่งเครื่องของผู้เล่น ([Client-side](https://en.wikipedia.org/wiki/Client-side)). อย่างไรก็ตาม แหล่งข้อมูลที่ใช้สร้าง Token ไม่ได้ถูกระบุไว้อย่างชัดเจนในเอกสารสาธารณะ จึงไม่ควรตีความโดยตรงว่าเป็น “ข้อมูลฮาร์ดแวร์” เสมอไป — HWIDs ถูกออกแบบมาเพื่อบ่งชี้ความเชื่อมโยงหรือความเป็นไปได้ที่ไคลเอนต์เดียวกันถูกใช้งาน มากกว่าจะเป็นการระบุฮาร์ดแวร์จริงโดยตรง

:::danger

[Player Tokens](https://docs.fivem.net/natives/?_0x54C06897) จะมีความเฉพาะเจาะจงกับแต่ละเซิร์ฟเวอร์เท่านั้น จึงไม่สามารถนำไปใช้ตรวจสอบหรือบังคับใช้การแบนแบบ Global ได้โดยตรง  

:::

## ยกเลิกการแบน HWIDs (Player Tokens)

ในบางครั้ง การแบนด้วย HWIDs อาจส่งผลกระทบกับบัญชีอื่นที่เชื่อมโยงกันโดยไม่ตั้งใจ เช่น บัญชีที่ใช้คอมพิวเตอร์เครื่องเดียวกันหรือมี HWID Tokens ซ้ำกัน ระบบจะมองว่าบัญชีเหล่านั้นเกี่ยวข้องกับการกระทำผิด และทำการแบนพ่วงโดยอัตโนมัติ

#### ตัวอย่างสถานการณ์

* **บัญชี A** (`443334508020891658`) ถูกแบนด้วยเหตุผลการใช้งานผิดกฎ → HWID Tokens ของบัญชีนี้ถูกบันทึกไว้
* **บัญชี B** (`845951838691393546`) เชื่อมต่อเข้ามา และพบว่า HWID Tokens ตรงกับบัญชี A ตามจำนวนขั้นต่ำที่เซิร์ฟเวอร์กำหนด → จึงถูกแบนพ่วง

#### ขั้นตอนการยกเลิกแบน

1. **ตรวจสอบรายละเอียด HWIDs และการแบน เพื่อดูรายการ HWIDs ที่เกี่ยวข้องและเหตุผลการแบนของทั้งสองบัญชี**

```
app baninfo 443334508020891658
app baninfo 845951838691393546
```

:::tip

คำสั่ง `app baninfo` รองรับทั้ง `<identifier>` และ `<banRefId>` คุณสามารถใช้ตัวใดตัวหนึ่งเพื่อดึงข้อมูลรายละเอียดการแบนได้

:::

2. **รีเซ็ต HWIDs ของบัญชีต้นทาง (บัญชี A) โดยระบบจะลบ HWID Tokens ที่ผูกกับบัญชี A ออกจากฐานข้อมูลการแบน**

```
app resethwids 443334508020891658
```

3. **ยกเลิกการแบนบัญชี B เพื่อให้สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ตามปกติ**

```
app unbanuser 845951838691393546
```

## ตรวจสอบการเชื่อมโยงบัญชีที่ถูกแบน (Ban Chain)

คุณสามารถตรวจสอบว่า `identifier` ของผู้เล่นถูกแบนและเชื่อมโยงกับบัญชีอื่น ๆ ที่ถูกแบนในฐานข้อมูลของเซิร์ฟเวอร์หรือไม่ ระบบจะตรวจสอบต่อเนื่องสูงสุด 20 ระดับ ผลลัพธ์จะแสดงรายการบัญชีที่ถูกแบนทั้งหมดจากผู้เล่นคนเดียวกัน

### ตัวอย่างคำสั่ง SQL

:::danger ข้อกำหนดฐานข้อมูล

- **MySQL**: **`8.0.4`** ขึ้นไป  
- **MariaDB**: **`10.6.4`** ขึ้นไป

:::

```sql
SET @identifier_input = 'discord:443334508020891658';

WITH RECURSIVE ban_chain AS (
   SELECT 
      p.identifier,
      JSON_UNQUOTE(JSON_EXTRACT(p.ban_details, '$.associated_id')) AS associated_id,
      p.bound_id,
      p.ban_details,
      p.last_hwids,
      0 AS level
   FROM azael_playpass p
   WHERE p.status = 'banned'
     AND (p.identifier = @identifier_input
         OR JSON_UNQUOTE(JSON_EXTRACT(p.ban_details, '$.associated_id')) = @identifier_input)

   UNION ALL

   SELECT 
      p.identifier,
      JSON_UNQUOTE(JSON_EXTRACT(p.ban_details, '$.associated_id')) AS associated_id,
      p.bound_id,
      p.ban_details,
      p.last_hwids,
      bc.level + 1 AS level
   FROM azael_playpass p
   INNER JOIN ban_chain bc 
      ON p.identifier = bc.associated_id
      OR JSON_UNQUOTE(JSON_EXTRACT(p.ban_details, '$.associated_id')) = bc.identifier
   WHERE p.status = 'banned'
     AND bc.level < 20
)
SELECT DISTINCT
   bc.identifier,
   bc.associated_id,
   bc.bound_id,
   JSON_UNQUOTE(JSON_EXTRACT(bc.ban_details, '$.banned_by')) AS banned_by,
   JSON_UNQUOTE(JSON_EXTRACT(bc.ban_details, '$.type')) AS ban_type, 
   JSON_UNQUOTE(JSON_EXTRACT(bc.ban_details, '$.reason')) AS ban_reason,
   JSON_UNQUOTE(JSON_EXTRACT(bc.ban_details, '$.start_datetime')) AS ban_start,
   JSON_UNQUOTE(JSON_EXTRACT(bc.ban_details, '$.end_datetime')) AS ban_end,
   bc.last_hwids AS ban_hwids,
   COALESCE(m.matching_hwids_count, 0) AS ban_hwid_tokens
FROM ban_chain bc
LEFT JOIN (
   SELECT 
      bc.identifier AS id,
      bc.associated_id AS assoc_id,
      COUNT(DISTINCT j1.hw1) AS matching_hwids_count
   FROM ban_chain bc
   JOIN azael_playpass assoc
      ON assoc.identifier = bc.associated_id
   JOIN JSON_TABLE(bc.last_hwids, '$[*]' COLUMNS(hw1 VARCHAR(255) PATH '$')) AS j1
   JOIN JSON_TABLE(assoc.last_hwids, '$[*]' COLUMNS(hw2 VARCHAR(255) PATH '$')) AS j2
      ON j1.hw1 = j2.hw2
   GROUP BY bc.identifier, bc.associated_id
) AS m
   ON bc.identifier = m.id AND bc.associated_id = m.assoc_id
ORDER BY ban_start ASC;
```

### คำอธิบายฟิลด์ผลลัพธ์

| ฟิลด์               | ความหมาย                                                              |
| ----------------- | ---------------------------------------------------------------------- |
| `identifier`      | บัญชีหลักที่ถูกแบน                                                         |
| `associated_id`   | บัญชีที่ทำให้เกิดการแบนพ่วง                                                  |
| `bound_id`        | บัญชีที่ผูกกับบัญชี `identifier`                                        |
| `banned_by`       | ผู้แบน                                                                  |
| `ban_type`        | ประเภทการแบน                                                           |
| `ban_reason`      | เหตุผลการแบน                                                           |
| `ban_start`       | วันที่เริ่มแบน                                                             |
| `ban_end`         | วันที่สิ้นสุดการแบน (ถ้ามี)                                                  |
| `ban_hwids`       | รายการ HWID / Player Tokens ของบัญชีที่ถูกแบน                             |
| `ban_hwid_tokens` | จำนวน HWID / Player Tokens ที่ถูกแบนและตรงกับบัญชีใน `associated_id`       |

#### หมายเหตุ

- คำสั่งนี้ใช้ฟังก์ชัน **JSON** (`JSON_EXTRACT`, `JSON_UNQUOTE`, `JSON_TABLE`) ดังนั้นต้องใช้ [MySQL](https://www.mysql.com/) 8.0.4+ หรือ [MariaDB](https://mariadb.com/) 10.6.4+
- ความลึกสูงสุด `20` สามารถปรับเปลี่ยนได้ตามความต้องการ
- `associated_id` คือบัญชีที่ทำให้เกิดการแบนพ่วง
- `bound_id` คืบัญชีที่ผูกเอาไว้กับบัญชี `identifier`
- `ban_hwid_tokens` ใช้ระบุจำนวน HWID / Player Tokens ที่ตรงกับบัญชีใน `associated_id`
