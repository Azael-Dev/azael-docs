# Commands

คำสั่งที่สามารถใช้งานได้ของทรัพยากร **[azael_db-guardian](./)**

## Default Commands

คำสั่งเริ่มต้นของทรัพยากร **[azael_db-guardian](./)**

### สำรองฐานข้อมูลเซิร์ฟเวอร์

- คำสั่ง สำรองฐานข้อมูลเซิร์ฟเวอร์
- ชื่อคำสั่งเริ่มต้นคือ **`dbbackup`** (อ้างอิงจากการกำหนดค่า [**Command.DatabaseBackup**](./config/server#commanddatabasebackup))

```sh
dbbackup
```

:::caution

สามารถใช้งานคำสั่งนี้ได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Server-side) เท่านั้น ไม่สามารถใช้งานทางฝั่ง [**Client**](https://en.wikipedia.org/wiki/Client-side) ได้

:::

### ตรวจสอบและลบข้อมูลผู้เล่น

- คำสั่ง ตรวจสอบ และ ลบข้อมูลผู้เล่น ที่ไม่เชื่อมต่อกับเซิร์ฟเวอร์มากกว่าวันที่กำหนด ตามการกำหนดค่า [**UserIdle.LimitDays**](./config/server#useridlelimitdays)
- ชื่อคำสั่งเริ่มต้นคือ **`dbdelidle`** (อ้างอิงจากการกำหนดค่า [**Command.DatabaseBackup**](./config/server#commanddeleteuseridle))

```sh
dbdelidle
```

:::caution

สามารถใช้งานคำสั่งนี้ได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Server-side) เท่านั้น ไม่สามารถใช้งานทางฝั่ง [**Client**](https://en.wikipedia.org/wiki/Client-side) ได้

:::

### ลบข้อมูลเฉพาะผู้เล่น

- คำสั่ง ลบข้อมูลเฉพาะผู้เล่น โดยจะไม่ตรวจสอบวันที่เชื่อมต่อครั้งล่าสุดของผู้เล่น
- ชื่อคำสั่งเริ่มต้นคือ **`dbdeluser`** (อ้างอิงจากการกำหนดค่า [**Command.DeleteUserData**](./config/server#commanddeleteuserdata))

```sh
dbdeluser [identifier]
```

#### Argument

| Name                    | Type               | Required           | Default                                      | Description                                                
|-------------------------|--------------------|--------------------|----------------------------------------------|--------------------------------------------------
| `identifier`            | `string`           | ✔️                 | `nil`                                        | ตัวระบุผู้เล่น โดยอ้างอิงจากฐานข้อมูลของ [**Framework**](./config/server#frameworks) ที่ใช้งาน

:::note

- [**ESX**](https://github.com/esx-framework) อ้างอิง **ตัวระบุผู้เล่น** จากตาราง **`users`** คอลัมน์ **`identifier`**<br />
- [**QBCore**](https://github.com/qbcore-framework) อ้างอิง **ตัวระบุผู้เล่น** จากตาราง **`players`** คอลัมน์ **`license`**<br />
- [**VORPCore**](https://github.com/VORPCORE) อ้างอิง **ตัวระบุผู้เล่น** จากตาราง **`users`** คอลัมน์ **`identifier`**

:::

:::caution

สามารถใช้งานคำสั่งนี้ได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Server-side) เท่านั้น ไม่สามารถใช้งานทางฝั่ง [**Client**](https://en.wikipedia.org/wiki/Client-side) ได้

:::

### ยกเลิกสถานะถูกลบข้อมูลผู้เล่น

- คำสั่ง ยกเลิกสถานะถูกลบข้อมูล ให้ผู้เล่น
- ชื่อคำสั่งเริ่มต้นคือ **`dbundeluser`** (อ้างอิงจากการกำหนดค่า [**Command.UndeleteUser**](./config/server#commandundeleteuser))

```sh
dbundeluser [identifier]
```

#### Argument

| Name                    | Type               | Required           | Default                                      | Description                                                
|-------------------------|--------------------|--------------------|----------------------------------------------|--------------------------------------------------
| `identifier`            | `string`           | ✔️                 | `nil`                                        | ตัวระบุผู้เล่น โดยอ้างอิงจากฐานข้อมูลของ [**Framework**](./config/server#frameworks) ที่ใช้งาน

:::note

- [**ESX**](https://github.com/esx-framework) อ้างอิง **ตัวระบุผู้เล่น** จากตาราง **`users`** คอลัมน์ **`identifier`**<br />
- [**QBCore**](https://github.com/qbcore-framework) อ้างอิง **ตัวระบุผู้เล่น** จากตาราง **`players`** คอลัมน์ **`license`**<br />
- [**VORPCore**](https://github.com/VORPCORE) อ้างอิง **ตัวระบุผู้เล่น** จากตาราง **`users`** คอลัมน์ **`identifier`**

:::

:::info

สามารถใช้งานคำสั่งนี้ได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Server-side) และ [**Client**](https://en.wikipedia.org/wiki/Client-side) ได้ (ฝั่ง [**Client**](https://en.wikipedia.org/wiki/Client-side) จะต้องมีสิทธิ์ [**ACE**](https://forum.cfx.re/t/basic-aces-principals-overview-guide/90917?u=azael.dev) อนุญาตใช้งานคำสั่ง)

:::

### ตรวจสอบข้อมูลผู้เล่น

- คำสั่ง แสดงข้อมูลผู้เล่น จากตาราง **`azael_db_guardian`**
- ชื่อคำสั่งเริ่มต้นคือ **`dbuserinfo`** (อ้างอิงจากการกำหนดค่า [**Command.GetUserInfo**](./config/server#commandgetuserinfo))

```sh
dbuserinfo [identifier]
```

#### Argument

| Name                    | Type               | Required           | Default                                      | Description                                                
|-------------------------|--------------------|--------------------|----------------------------------------------|--------------------------------------------------
| `identifier`            | `string`           | ✔️                 | `nil`                                        | ตัวระบุผู้เล่น โดยอ้างอิงจากฐานข้อมูลของ [**Framework**](./config/server#frameworks) ที่ใช้งาน

:::note

- [**ESX**](https://github.com/esx-framework) อ้างอิง **ตัวระบุผู้เล่น** จากตาราง **`users`** คอลัมน์ **`identifier`**<br />
- [**QBCore**](https://github.com/qbcore-framework) อ้างอิง **ตัวระบุผู้เล่น** จากตาราง **`players`** คอลัมน์ **`license`**<br />
- [**VORPCore**](https://github.com/VORPCORE) อ้างอิง **ตัวระบุผู้เล่น** จากตาราง **`users`** คอลัมน์ **`identifier`**

:::

:::info

สามารถใช้งานคำสั่งนี้ได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Server-side) และ [**Client**](https://en.wikipedia.org/wiki/Client-side) ได้ (ฝั่ง [**Client**](https://en.wikipedia.org/wiki/Client-side) จะต้องมีสิทธิ์ [**ACE**](https://forum.cfx.re/t/basic-aces-principals-overview-guide/90917?u=azael.dev) อนุญาตใช้งานคำสั่ง)

:::

### เพิ่มจำนวนวันให้ผู้เล่น (ในกรณีเเจ้งลาหยุดต่างๆ)

- คำสั่ง เพิ่มจำนวนวันให้ผู้เล่น ในกรณีผู้เล่นเเจ้งลาหยุดต่างๆ เพื่อไม่ให้เข้าเงื่อนไขการถูกลบข้อมูล
- ชื่อคำสั่งเริ่มต้นคือ **`dbaddleave`** (อ้างอิงจากการกำหนดค่า [**Command.AddLeaveDays**](./config/server#commandaddleavedays))

```sh
dbaddleave [identifier] [days]
```

#### Argument

| Name                    | Type               | Required           | Default                                      | Description                                                
|-------------------------|--------------------|--------------------|----------------------------------------------|--------------------------------------------------
| `identifier`            | `string`           | ✔️                 | `nil`                                        | ตัวระบุผู้เล่น โดยอ้างอิงจากฐานข้อมูลของ [**Framework**](./config/server#frameworks) ที่ใช้งาน
| `days`                  | `number`           | ✔️                 | `nil`                                        | จำนวนวันลา (อ้างอิงจากวันเวลาที่ใช้งานคำสั่ง และเพิ่มจำนวนวันให้ตามที่กำหนด)

:::note

- [**ESX**](https://github.com/esx-framework) อ้างอิง **ตัวระบุผู้เล่น** จากตาราง **`users`** คอลัมน์ **`identifier`**<br />
- [**QBCore**](https://github.com/qbcore-framework) อ้างอิง **ตัวระบุผู้เล่น** จากตาราง **`players`** คอลัมน์ **`license`**<br />
- [**VORPCore**](https://github.com/VORPCORE) อ้างอิง **ตัวระบุผู้เล่น** จากตาราง **`users`** คอลัมน์ **`identifier`**

:::

:::info

สามารถใช้งานคำสั่งนี้ได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Server-side) และ [**Client**](https://en.wikipedia.org/wiki/Client-side) ได้ (ฝั่ง [**Client**](https://en.wikipedia.org/wiki/Client-side) จะต้องมีสิทธิ์ [**ACE**](https://forum.cfx.re/t/basic-aces-principals-overview-guide/90917?u=azael.dev) อนุญาตใช้งานคำสั่ง)

:::

:::danger

หากผู้เล่นทำการเชื่อมต่อกับเซิร์ฟเวอร์หลังจากดำเนินการใช้งานคำสั่งนี้ ระบบจะอัพเดทวันที่เชื่อมต่อล่าสุดเป็นวันและเวลาปัจจุบัน

:::

## Google Drive Commands

คำสั่ง [**Google Drive**](https://drive.google.com) เมื่อกำหนด [**Option.Type**](./config/server#optiontype) เป็น **`1`** (อัปโหลดไฟล์ไปยัง [**Google Drive API (GCP)**](https://console.cloud.google.com/apis/library/drive.googleapis.com))

### รับรายชื่อไฟล์ สำรองข้อมูลเซิร์ฟเวอร์

- คำสั่ง รับรายชื่อไฟล์ สำรองข้อมูลของเซิร์ฟเวอร์
- ชื่อคำสั่งเริ่มต้นคือ **`gdserverlist`** (อ้างอิงจากการกำหนดค่า [**GoogleDriveAPI.Command.ServerBackups.FileList**](./config/server#googledriveapicommandserverbackups))

```sh
gdserverlist
```

:::caution

สามารถใช้งานคำสั่งนี้ได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Server-side) เท่านั้น ไม่สามารถใช้งานทางฝั่ง [**Client**](https://en.wikipedia.org/wiki/Client-side) ได้

:::

### ลบไฟล์ สำรองข้อมูลเซิร์ฟเวอร์ (ระบุชื่อไฟล์)

- คำสั่ง ลบไฟล์ สำรองข้อมูลของเซิร์ฟเวอร์ โดยอ้างอิงจาก ชื่อไฟล์
- ชื่อคำสั่งเริ่มต้นคือ **`gdserverdel`** (อ้างอิงจากการกำหนดค่า [**GoogleDriveAPI.Command.ServerBackups.FileDelete**](./config/server#googledriveapicommandserverbackups))

```sh
gdserverdel [filename]
```

#### Argument

| Name                    | Type               | Required           | Default                                      | Description                                                
|-------------------------|--------------------|--------------------|----------------------------------------------|--------------------------------------------------
| `filename`              | `string`           | ✔️                 | `nil`                                        | ชื่อไฟล์ที่ต้องการลบ

:::caution

สามารถใช้งานคำสั่งนี้ได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Server-side) เท่านั้น ไม่สามารถใช้งานทางฝั่ง [**Client**](https://en.wikipedia.org/wiki/Client-side) ได้

:::

### ลบไฟล์ สำรองข้อมูลเซิร์ฟเวอร์ (ทั้งหมด)

- คำสั่ง ลบไฟล์ สำรองข้อมูลของเซิร์ฟเวอร์ ทั้งหมด
- ชื่อคำสั่งเริ่มต้นคือ **`gdserverpurge`** (อ้างอิงจากการกำหนดค่า [**GoogleDriveAPI.Command.ServerBackups.FilePurge**](./config/server#googledriveapicommandserverbackups))

```sh
gdserverpurge
```

:::caution

สามารถใช้งานคำสั่งนี้ได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Server-side) เท่านั้น ไม่สามารถใช้งานทางฝั่ง [**Client**](https://en.wikipedia.org/wiki/Client-side) ได้

:::

:::danger

โปรดระมัดระวังในการใช้งานคำสั่งนี้

:::

### รับรายชื่อไฟล์ สำรองข้อมูลผู้เล่น

- คำสั่ง รับรายชื่อไฟล์ สำรองข้อมูลของผู้เล่น ที่ถูกลบข้อมูล
- ชื่อคำสั่งเริ่มต้นคือ **`gdplayerlist`** (อ้างอิงจากการกำหนดค่า [**GoogleDriveAPI.Command.PlayerBackups.FileList**](./config/server#googledriveapicommandplayerbackups))

```sh
gdplayerlist
```

:::caution

สามารถใช้งานคำสั่งนี้ได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Server-side) เท่านั้น ไม่สามารถใช้งานทางฝั่ง [**Client**](https://en.wikipedia.org/wiki/Client-side) ได้

:::

### ลบไฟล์ สำรองข้อมูลผู้เล่น (ระบุชื่อไฟล์)

- คำสั่ง ลบไฟล์ สำรองข้อมูลของผู้เล่น ที่ถูกลบข้อมูล โดยอ้างอิงจาก ชื่อไฟล์
- ชื่อคำสั่งเริ่มต้นคือ **`gdplayerdel`** (อ้างอิงจากการกำหนดค่า [**GoogleDriveAPI.Command.PlayerBackups.FileDelete**](./config/server#googledriveapicommandplayerbackups))

```sh
gdplayerdel [filename]
```

#### Argument

| Name                    | Type               | Required           | Default                                      | Description                                                
|-------------------------|--------------------|--------------------|----------------------------------------------|--------------------------------------------------
| `filename`              | `string`           | ✔️                 | `nil`                                        | ชื่อไฟล์ที่ต้องการลบ

:::caution

สามารถใช้งานคำสั่งนี้ได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Server-side) เท่านั้น ไม่สามารถใช้งานทางฝั่ง [**Client**](https://en.wikipedia.org/wiki/Client-side) ได้

:::

### ลบไฟล์ สำรองข้อมูลผู้เล่น (ทั้งหมด)

- คำสั่ง ลบไฟล์ สำรองข้อมูลของผู้เล่น ที่ถูกลบข้อมูล ทั้งหมด
- ชื่อคำสั่งเริ่มต้นคือ **`gdplayerpurge`** (อ้างอิงจากการกำหนดค่า [**GoogleDriveAPI.Command.PlayerBackups.FilePurge**](./config/server#googledriveapicommandplayerbackups))

```sh
gdplayerpurge
```

:::caution

สามารถใช้งานคำสั่งนี้ได้ทางฝั่ง [**Server**](https://en.wikipedia.org/wiki/Server-side) เท่านั้น ไม่สามารถใช้งานทางฝั่ง [**Client**](https://en.wikipedia.org/wiki/Client-side) ได้

:::

:::danger

โปรดระมัดระวังในการใช้งานคำสั่งนี้

:::
