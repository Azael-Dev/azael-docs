# File Upload (Custom API)

การอัปโหลดไฟล์ไปยัง [**Custom API**](../config/server#optiontype) (**API ที่กำหนดเอง**) คุณสามารถแก้ไขรหัสได้ที่ไฟล์ **`custom.fileupload.js`**

:::tip

กำหนด [**Option.Type**](../config/server#optiontype) เป็น **`3`** เพื่อเปิดใช้งานการอัปโหลดไฟล์ไปยัง [**Custom API**](../config/server#optiontype) (**API ที่กำหนดเอง**)

:::

## uploadFile

ฟังก์ชันอัปโหลดไฟล์ไปยัง [**Custom API**](../config/server#optiontype) (**API ที่กำหนดเอง**)

```js
const uploadFile = async(fileName, filePath, isFullBackup) => {
    /**
     * SUCCESS
     */
    // return { success: true, url: 'https://yourdomain.com/file/XXXXXXXXXXXX' };
    
    /**
     * ERROR
     */
    console.error('[Custom API] Please edit code in file "public/fileupload/custom.fileupload.js"');
    
    return { success: false, error: `Custom API Error: Please edit code in file "public/fileupload/custom.fileupload.js"` };
};
```

### Parameter

| Name                                             | Type                                   | Description                                                
|--------------------------------------------------|----------------------------------------|-------------------------------------------------
| `fileName`                                       | `string`                               | ชื่อของไฟล์ที่จะอัปโหลด
| `filePath`                                       | `string`                               | เส้นทางของไฟล์ที่จะอัปโหลด
| `isFullBackup`                                   | `boolean`                              | เป็นการ [**สำรองข้อมูลเซิร์ฟเวอร์**](../config/server#backupserverdataenable) หรือไม่ <br />• **`true`** เท่ากับ [**สำรองข้อมูลเซิร์ฟเวอร์**](../config/server#backupserverdataenable) <br />• **`false`** เท่ากับ [**สำรองข้อมูลผู้เล่นที่ถูกลบข้อมูล**](../config/server#backupplayerdataenable)

### Return

| Name                         | Type               | Description                                                
|------------------------------|--------------------|--------------------------------------------------
| `data`                       | `object`           | ตารางข้อมูลการอัปโหลดไฟล์
| `data.success`               | `boolean`          | สถานะการอัปโหลดไฟล์ **สำเร็จ** หรือ **ล้มเหลว**
| `data.url`                   | `string`           | หากอัปโหลดไฟล์ **สำเร็จ** จะตอบกลับ **URL** ของไฟล์
| `data.error`                 | `string`           | หากอัปโหลดไฟล์ **ล้มเหลว** จะตอบกลับ **ข้อผิดพลาด**

