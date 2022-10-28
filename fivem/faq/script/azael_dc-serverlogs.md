# azael_dc-serverlogs

คำถามที่พบบ่อยเกียวกับวิธีแก้ไขปัญหาของทรัพยากร **[azael_dc-serverlogs](../../script/azael_dc-serverlogs/)**

## Discord API

คำถามที่พบบ่อยสำหรับการใช้งาน **[Discord API](../../script/azael_dc-serverlogs/config/server#discord-api)**

### Webhooks ไม่ทำงาน (ดับทั้งหมด)

ไม่มีข้อมูลส่งมายังกลุ่ม **[Discord](https://discord.com/)** และ **[Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)** ไม่ทำงาน (ดับทั้งหมด) สาเหตุนี้เกิดจากเครื่องเซิร์ฟเวอร์ของคุณกำลังถูก **[Discord](https://discord.com/)** ระงับการใช้งาน **[API](https://discord.com/developers/docs/resources/webhook#execute-webhook)** (ติดสถานะ **[429 - Global Rate Limit](https://discord.com/developers/docs/topics/rate-limits#global-rate-limit)**) ซึ่งสาเหตุเกิดมาจากทรัพยากรภายในเซิร์ฟเวอร์ของคุณมีการใช้งาน **[Discord API](https://discord.com/developers/docs/resources/webhook#execute-webhook)** ที่ไม่เป็นไปตามเงื่อนไขการใช้งาน **[Rate Limits](https://discord.com/developers/docs/topics/rate-limits#rate-limits)** ของ **[Discord](https://discord.com/)**

:::tip

คุณสามารถตรวจสอบว่าเซิร์ฟเวอร์ของคุณกำลังติดสถานะ **[429 - Global Rate Limit](https://discord.com/developers/docs/topics/rate-limits#global-rate-limit)** อยู่หรือไม่ได้ดังนี้
1. เปิด **[Web Browser](https://en.wikipedia.org/wiki/Web_browser)** ผ่านเครื่องเซิร์ฟเวอร์ที่คุณใช้งาน
2. ไปยัง **https://discord.com/api/v10** เพื่อดำเนินการตรวจสอบ

**สามารถใช้งาน API ได้ตามปกติ**

```json
{"code": 0,"message": "404: Not Found"}
```

**กำลังติดสถานะ [429 - Global Rate Limit](https://discord.com/developers/docs/topics/rate-limits#global-rate-limit)**

```json
{"code": 0,"message": "You are being blocked from accessing our API temporarily due to exceeding our rate limits frequently."}
```

:::

### ขีดจำกัดอัตราการใช้งาน Webhooks

ขีดจำกัดอัตราการใช้งาน **[Webhooks](https://discord.com/developers/docs/resources/webhook#execute-webhook)** ในปัจจุบัน ภายใน **`1`** ช่อง จะสามารถรับคำต่อเนื่องได้เพียง **`5`** คำขอ ต่อ **`2`** วินาที และ สามารถรับคำขอสูงสุดได้เพียง **`30`** คำขอ ต่อ **`1`** นาที เท่านั้น หากมีการส่งคำขอมาเกิน **[Rate Limits](https://discord.com/developers/docs/topics/rate-limits#rate-limits)** อาจจะส่งผลให้เซิร์ฟเวอร์ของคุณติดสถานะ **[429 - Global Rate Limit](https://discord.com/developers/docs/topics/rate-limits#global-rate-limit)** ได้

![Webhook Rate Limit](../../../static/img/faqs/api-webhook-incessant.png)

### ขีดจำกัดอัตราการใช้งาน API ทั้งหมด (Global)

**[Global Rate Limit](https://discord.com/developers/docs/topics/rate-limits#global-rate-limit)** สำหรับการใช้งาน **[API](https://discord.com/developers/docs/topics/rate-limits#global-rate-limit)** ทั้งหมด จะอยู่ที่ **`10,000`** คำขอ ต่อ **`10`** นาที  และ **[IP Address](https://en.wikipedia.org/wiki/IP_address)** ที่สร้างคำขอ **[HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)** ที่ไม่ถูกต้องมากเกินไป จะถูกจำกัดไม่ให้เข้าถึง **[API](https://discord.com/developers/docs/intro)** ของ **[Discord](https://discord.com/)**

:::tip

หากคุณประสบปัญหาการถูกแบนโดย **[CloudFlare](https://www.cloudflare.com)** ซ้ำๆ จาก **[Discord API](https://discord.com/developers/docs/topics/rate-limits#global-rate-limit)** ภายในการทำงานปกติ คุณสามารถติดต่อฝ่ายสนับสนุนเพื่อดูว่าคุณมีสิทธิ์ได้รับขีดจำกัดอัตราทั่วโลกที่เพิ่มขึ้นหรือไม่ คุณสามารถติดต่อฝ่ายสนับสนุนของ **[Discord](https://discord.com/)** ได้ที่ **https://dis.gd/contact**

:::
