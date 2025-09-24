---
sidebar_label: Tutorials
---

# Tutorials & Guides

บทช่วยสอนและคำแนะนำที่เกี่ยวข้องกับทรัพยากร **[azael_playpass](./index.md)**

## Installation

บทช่วยสอนและคำแนะนำที่เกี่ยวกับการติดตั้ง (⚠️ เฉพาะเซิร์ฟเวอร์ที่ใช้งานบัญชี [Discord](https://discord.com/) และ [Steam](https://steamcommunity.com) เป็น [ตัวระบุหลัก](./config/core.md#identifiertype) หรือ [ตัวระบุที่ผูก](./config/core.md#bindidentifier))

1. ดำเนินการตามขั้นตอน [ติดตั้งและใช้งาน](./index.md#ติดตั้งและใช้งาน) ก่อน
2. [สร้างแอปพลิเคชันและบอท](./tutorials.md#สร้างแอปพลิเคชันและบอท) และ [เพิ่มบอทไปยังเซิร์ฟเวอร์](./tutorials.md#เพิ่มบอทไปยังเซิร์ฟเวอร์) ให้เรียบร้อย
3. ไปทีไฟล์ `server.cfg` และเพิ่มรหัสด้านล่างนี้
```lua
set discord_guildId "your_guild_id"
set discord_botToken "your_bot_token"
```
4. นำ [ID ของเซิร์ฟเวอร์](./tutorials.md#รับ-id-ของเซิร์ฟเวอร์-guild-id) ไปแทนที่ `your_guild_id`
5. นำ [โทเค็นของบอท](./tutorials.md#รับโทเค็นของบอท) ไปแทนที่ `your_bot_token`
6. นำ [ID ของบทบาท](./tutorials.md#รับ-id-ของบทบาท-role-id) ที่อนุญาตให้เข้าร่วมเซิร์ฟเวอร์ได้ ไปกำหนดที่ [allowedRoleIds](./config/external_api.md#allowedroleids) ไฟล์ `config/external_api.lua`
7. ไปทีไฟล์ `server.cfg` และเพิ่มรหัสด้านล่างนี้ (หากมีอยู่แล้วให้ข้ามไปยังหัวข้อที่ 9)
```lua
set steam_webApiKey "your_api_key"
```
8. ดำเนินการ [ลงทะเบียนรับรหัส Steam Web API](https://steamcommunity.com/dev/apikey) และนำรหัสไปแทนที่ `your_api_key`
9. เสร็จแล้ว! เริ่มต้นเซิร์ฟเวอร์ของคุณ และลองเชื่อมต่อกับเซิร์ฟเวอร์เพื่อทดสอบ

:::tip
การกำหนดค่าในส่วนอื่นๆ ถูกตั้งค่าไว้เป็นค่าเริ่มต้นที่พร้อมใช้งานแล้ว อย่างไรก็ตาม แนะนำให้ศึกษารายละเอียดเพิ่มเติมเพื่อปรับแต่งให้เหมาะสมกับการใช้งานในแต่ละเซิร์ฟเวอร์
:::

## Discord Client

บทช่วยสอนและคำแนะนำเกี่ยวกับการใช้งานแอป [**Discord**](https://discord.com)

### เปิดใช้งานโหมดผู้พัฒนา

ขั้นตอนการเปิดใช้งานโหมดผู้พัฒนา ซึ่งจะแสดงรายการเมนูเฉพาะกับบุคคลที่ต้องการเขียนแอปโดยใช้ [**Discord API**](https://discord.com/developers/docs/intro)

1. เปิดแอปพลิเคชัน [**Discord**](discord://) หรือเข้าใช้งานผ่านเว็บไซต์ [**Discord**](https://discord.com/channels/@me)
2. คลิกที่ไอคอน **ฟันเฟือง  (<Icon icon="fa-solid fa-gear" size="lg" />)** ที่มุมล่างซ้ายข้างชื่อผู้ใช้ เพื่อเข้าสู่ **ตั้งค่าผู้ใช้ (User Settings)**
3. ในแถบด้านซ้ายให้เลื่อนลงไปที่หมวดหมู่ **การตั้งค่าแอป (App Settings)** แล้วคลิกที่เมนู **ขั้นสูง (Advanced)**
4. ดำเนินการเปิดสวิตช์ **โหมดผู้พัฒนา (Developer Mode)**
5. **เสร็จแล้ว!** ตอนนี้คุณสามารถคลิกขวาที่ **ข้อความ**, **เซิร์ฟเวอร์**, หรือ **ช่องแชท** เพื่อดูและ **คัดลอก ID** ได้

![Enable Developer Mode](../../../static/img/scripts/discord-devmode.webp)

### รับ ID ของเซิร์ฟเวอร์ (Guild ID)

ขั้นตอนการรับ ID ของเซิร์ฟเวอร์บน [**Discord**](https://discord.com) หรือที่เรียกว่า ([**Guild ID**](https://discord.com/developers/docs/resources/guild))

1. เปิดแอปพลิเคชัน [**Discord**](discord://) หรือเข้าใช้งานผ่านเว็บไซต์ [**Discord**](https://discord.com/channels/@me)
2. ที่แถบด้านซ้ายในรายการเซิร์ฟเวอร์ ให้ **คลิกขวาที่ชื่อเซิร์ฟเวอร์** ที่คุณต้องการ
3. เลือกเมนู **“คัดลอก ID เซิร์ฟเวอร์” (Copy Server ID)** เพื่อคัดลอกรหัสไปยังคลิปบอร์ด

:::warning
คุณจำเป็นต้อง [**เปิดใช้งานโหมดผู้พัฒนา**](./tutorials.md#เปิดใช้งานโหมดผู้พัฒนา) ก่อน จึงจะเห็นเมนู **“คัดลอก ID เซิร์ฟเวอร์” (Copy Server ID)**
:::

![Copy Guild ID](../../../static/img/scripts/discord-copyguild.webp)

### รับ ID ของบทบาท (Role ID)

ขั้นตอนการรับ ID ของบทบาทบน [**Discord**](https://discord.com) หรือที่เรียกว่า ([**Role ID**](https://discord.com/developers/docs/topics/permissions#role-object))

1. เปิดแอปพลิเคชัน [**Discord**](discord://) หรือเข้าใช้งานผ่านเว็บไซต์ [**Discord**](https://discord.com/channels/@me)
2. ที่แถบด้านซ้ายในรายการเซิร์ฟเวอร์ ให้ **เลือกเซิร์ฟเวอร์** ที่คุณต้องการรับ ID ของบทบาท
3. คลิกที่ชื่อเซิร์ฟเวอร์ด้านบนซ้ายเพื่อเปิดเมนู แล้วเลือก **ตั้งค่าเซิร์ฟเวอร์ (Server Settings)**
4. ในแถบด้านซ้ายให้เลื่อนลงไปที่หมวดหมู่ **บุคคล (People)** แล้วคลิกที่เมนู **บทบาท (Roles)**
5. จากรายการบทบาททั้งหมด ให้คลิกขวาที่บทบาทที่คุณต้องการรับ ID
6. เลือกเมนู **“คัดลอก ID บทบาท” (Copy Role ID)** เพื่อคัดลอกรหัสไปยังคลิปบอร์ด

:::warning
คุณจำเป็นต้อง [**เปิดใช้งานโหมดผู้พัฒนา**](./tutorials.md#เปิดใช้งานโหมดผู้พัฒนา) ก่อน จึงจะเห็นเมนู **“คัดลอก ID บทบาท” (Copy Role ID)**
:::

![Copy Role ID](../../../static/img/scripts/discord-copyrole.webp)

## Discord Developer

บทช่วยสอนและคำแนะนำเกี่ยวกับ [**Discord**](https://discord.com/developers) สำหรับนักพัฒนา

### สร้างแอปพลิเคชันและบอท

ขั้นตอนการสร้างแอปพลิเคชันและบอท เพื่อใช้งาน [**Discord API**](https://discord.com/developers/docs/intro)

1. เข้าใช้งานเว็บไซต์ [**Discord Developer Portal**](https://discord.com/developers/applications) และเข้าสู่ระบบด้วยบัญชี **Discord** ของคุณ
2. คลิกปุ่ม **“New Application”** จะมีหน้าต่างป๊อปอัปชื่อ **Create an application** ปรากฏขึ้น
3. กรอกชื่อแอปพลิเคชันและเลือกทีม (หากมี) จากนั้นคลิกเพือยอมรับ **Terms of Service and Developer Policy**
4. คลิกปุ่ม **“Create”** เพื่อยืนยันการสร้างแอปพลิเคชันและบอท

:::tip
คุณสามารถแก้ไข ชื่อ, คำอธิบาย และ อวาตาร์ ของแอปพลิเคชันได้ที่นี่เมื่อคุณสร้างเสร็จแล้ว
:::

![Create Application & Bot](../../../static/img/scripts/discord-createapps.webp)

### เพิ่มบอทไปยังเซิร์ฟเวอร์

ขั้นตอนการเพิ่มบอทไปยังเซิร์ฟเวอร์ของคุณ

<Tabs>
    <TabItem value="invite_link" label="ลิงค์เชิญบอท">
    ```html
    https://discord.com/oauth2/authorize?client_id=<APPLICATION_ID>&scope=bot%20applications.commands&permissions=1099511627780
    ```
    </TabItem>
    <TabItem value="link_structure" label="โครงสร้างลิงก์">
    - `https://discord.com/oauth2/authorize`
        - เป็นโครงสร้างมาตรฐานของ Discord สำหรับการอนุญาตให้แอปพลิเคชัน OAuth2 (เช่น แอปพลิเคชันบอทของคุณ) เข้าสู่เซิร์ฟเวอร์ Discord
    - `client_id=<APPLICATION_ID>`
        - คือการระบุแอปพลิเคชันที่คุณต้องการอนุญาต คุณจะต้องแทนที่ **`<APPLICATION_ID>`** ด้วย ID ของแอปพลิเคชันเพื่อสร้างลิงก์คำเชิญที่ถูกต้อง
    - `scope=bot%20applications.commands`
        - ระบุว่าคุณต้องการเพิ่มแอปพลิเคชันนี้เป็นบอทพร้อมความสามารถในการสร้างคำสั่ง
    - `permissions=1099511627780`
        - บอทของคุณจะมีสิทธ์อนุญาตอะไรบ้างบนเซิร์ฟเวอร์ที่คุณกำลังเพิ่มเข้าไป โดยค่าเริ่มต้นจะมีสิทธิ์ดังต่อไปนี้
            - **Ban Members:** `4`
            - **Moderate Members:** `1099511627776`
    </TabItem>
</Tabs>

1. คัดลอก **ลิงก์เชิญบอท** จากแท็บด้านบน แล้ววางลิงก์ในแถบ URL ของเบราว์เซอร์  
    - ⚠️ **อย่ากด Enter ทันที** เนื่องจากคุณต้องแก้ไข **`<APPLICATION_ID>`** ให้ถูกต้องก่อน
2. เข้าใช้งานเว็บไซต์ [**Discord Developer Portal**](https://discord.com/developers/applications) และเข้าสู่ระบบด้วยบัญชี **Discord** ของคุณ
3. เลือก **แอปพลิเคชัน** ที่คุณได้ [**สร้างแอปพลิเคชันและบอท**](tutorials.md#สร้างแอปพลิเคชันและบอท) ไว้ก่อนหน้านี้
4. ค้นหาหัวข้อ **Application ID** และคลิกปุ่ม **“Copy”** เพื่อคัดลอก ID ไปยังคลิปบอร์ด
5. กลับไปยังลิงก์เชิญบอท แล้วแทนที่ **`<APPLICATION_ID>`** ด้วย ID ที่คุณคัดลอกมา จากนั้นกด Enter เพื่อเปิดหน้าการเชิญบอท
6. ในหน้าต่างที่เปิดขึ้น จะพบหัวข้อ **เพิ่มไปยังเซิร์ฟเวอร์** ให้คุณ **“เลือกเซิร์ฟเวอร์”** ที่คุณต้องการเพิ่มบอทเข้าไป  
7. คลิกที่ปุ่ม **ไปต่อ** และจากนั้นคลิก **อนุญาต** เพื่อยืนยันการเพิ่มบอทเข้าสู่เซิร์ฟเวอร์ของคุณ

:::warning
หากคุณไม่พบเซิร์ฟเวอร์ของคุณในเมนู "**เพิ่มไปยังเซิร์ฟเวอร์**" อาจเป็นเพราะคุณไม่มีสิทธิ์ "**Manage Server**" ภายในเซิร์ฟเวอร์นั้น
:::

![Invite Bot](../../../static/img/scripts/discord-invitebot.webp)

### รับโทเค็นของบอท

ขั้นตอนการรับโทเค็นของบอทเพื่อใช้อ้างอิงสิทธิ์การใช้งาน [**Discord API**](https://discord.com/developers/docs/intro)

1. เข้าใช้งานเว็บไซต์ [**Discord Developer Portal**](https://discord.com/developers/applications) และเข้าสู่ระบบด้วยบัญชี **Discord** ของคุณ
2. เลือก **แอปพลิเคชัน** ที่คุณต้องการใช้งานร่วมกับบอท
3. ในแถบด้านซ้าย ให้คลิกที่เมนู **“Bot”** แล้วเลื่อนไปยังหัวข้อ **Token**
4. คลิกที่ปุ่ม **“Reset Token”** จะมีหน้าต่างป๊อปอัปชื่อ **Reset Bot's Token?** ปรากฏขึ้น
5. คลิกที่ปุ่ม **“Yes, do it!”** เพื่อยอมรับคำเตือนที่ป๊อปอัปชื่อแสดง **“บอทของคุณจะไม่สามารถทำงานได้จนกว่าคุณจะอัปเดตโทเค็นใหม่ในโค้ดของบอท”**
6. คลิกที่ปุ่ม **“Copy”** เพื่อคัดลอกโทเค็นไปยังคลิปบอร์ด

:::danger
- หากคุณดำเนินการ **“Reset Token”** บอทจะไม่สามารถทำงานได้ จนกว่าจะอัปเดตโทเค็นใหม่ในโครงการที่กำลังใช้งาน  
- หากโทเค็นของบอทถูกเปิดเผยหรือมีความเสี่ยง ให้กลับมาที่หน้านี้และกด **“Reset Token”** เพื่อเพิกถอนโทเค็นเดิมทั้งหมด แล้วอย่าลืมอัปเดตโทเค็นใหม่ในโครงการของคุณ
:::

![Get Bot Token](../../../static/img/scripts/discord-getbottoken.webp)

### เปิดใช้งานบอทส่วนตัว

ขั้นตอนการเปิดใช้งานบอทส่วนตัว เพื่อป้องกันไม่ให้บุคคลอื่นสามารถใช้งานหรือเพิ่มบอทของคุณไปยังเซิร์ฟเวอร์อื่นได้โดยไม่ได้รับอนุญาต 

1. เข้าใช้งานเว็บไซต์ [**Discord Developer Portal**](https://discord.com/developers/applications) และเข้าสู่ระบบด้วยบัญชี **Discord** ของคุณ
2. เลือก **แอปพลิเคชัน** ที่คุณได้ [**สร้างแอปพลิเคชันและบอท**](tutorials.md#สร้างแอปพลิเคชันและบอท) ไว้ก่อนหน้านี้
3. ในแถบด้านซ้าย คลิกที่เมนู **“Bot”**
4. ภายใต้หัวข้อ **Public Bot** ให้ปิดสวิตช์เพื่อปิดการใช้งาน **บอทสาธารณะ**
5. คลิกที่ปุ่ม **“Save Changes”** จากป๊อปอัปที่แสดง เพื่อบันทึกการกำหนดค่า

:::warning
จำเป็นที่จะต้องกำหนด **Install Link** ที่หน้า **<Icon icon="fa-solid fa-gear" size="lg" /> Installation** เป็น **None** ก่อน จึงจะสามารถเปิดใช้งานบอทส่วนตัวได้
:::

:::tip
เมื่อปิดใช้งาน **บอทสาธารณะ** แล้ว บุคคลอื่นจะไม่สามารถใช้งานหรือเพิ่มบอทของคุณไปยังเซิร์ฟเวอร์ของตนเองได้
:::

![Disable Public Bot](../../../static/img/scripts/discord-disablepublicbot.webp)

## Ban Players

บทช่วยสอนและคำแนะนำเกี่ยวกับการ แบน, ยกเลิกแบน หรือตรวจสอบการแบนของผู้เล่น

### ยกเลิกการแบน HWIDs (Player Tokens)

ในบางครั้ง การแบนด้วย HWIDs อาจส่งผลกระทบกับบัญชีอื่นที่เชื่อมโยงกันโดยไม่ตั้งใจ เช่น บัญชีที่ใช้คอมพิวเตอร์เครื่องเดียวกันหรือมี HWID Tokens ซ้ำกัน ระบบจะมองว่าบัญชีเหล่านั้นเกี่ยวข้องกับการกระทำผิด และทำการแบนพ่วงโดยอัตโนมัติ

<details>
    <summary>**HWIDs (Player Tokens) คืออะไร?**</summary>

[Player Tokens](https://docs.fivem.net/natives/?_0x54C06897) หรือที่นิยมเรียกกันว่า HWIDs คือรหัสเฉพาะที่ [FXServer](https://github.com/citizenfx/fivem/blob/60beca63fbd365f7900170aa71f9798325f03609/code/components/citizen-server-impl/src/PlayerScriptFunctions.cpp#L85) สร้างขึ้นจากข้อมูลฝั่งเครื่องของผู้เล่น ([Client-side](https://en.wikipedia.org/wiki/Client-side)). อย่างไรก็ตาม แหล่งข้อมูลที่ใช้สร้าง Token ไม่ได้ถูกระบุไว้อย่างชัดเจนในเอกสารสาธารณะ จึงไม่ควรตีความโดยตรงว่าเป็น “ข้อมูลฮาร์ดแวร์” เสมอไป — HWIDs ถูกออกแบบมาเพื่อบ่งชี้ความเชื่อมโยงหรือความเป็นไปได้ที่ไคลเอนต์เดียวกันถูกใช้งาน มากกว่าจะเป็นการระบุฮาร์ดแวร์จริงโดยตรง

:::danger

[Player Tokens](https://docs.fivem.net/natives/?_0x54C06897) จะมีความเฉพาะเจาะจงกับแต่ละเซิร์ฟเวอร์เท่านั้น จึงไม่สามารถนำไปใช้ตรวจสอบหรือบังคับใช้การแบนแบบ Global ได้โดยตรง  

:::

</details>

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

### ตรวจสอบการเชื่อมโยงบัญชีที่ถูกแบน (Ban Chain)

คุณสามารถตรวจสอบว่า `identifier` ของผู้เล่นถูกแบนและเชื่อมโยงกับบัญชีอื่น ๆ ที่ถูกแบนในฐานข้อมูลของเซิร์ฟเวอร์หรือไม่ ระบบจะตรวจสอบต่อเนื่องสูงสุด 20 ระดับ ผลลัพธ์จะแสดงรายการบัญชีที่ถูกแบนทั้งหมดจากผู้เล่นคนเดียวกัน

#### ตัวอย่างคำสั่ง SQL

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

#### คำอธิบายฟิลด์ผลลัพธ์

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

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
