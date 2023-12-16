---
sidebar_label: Client
---

# Export Functions (Client-Side)

ฟังก์ชันส่งออกเพื่อให้สามารถใช้งานได้จากทรัพยากรอื่นๆทางฝั่ง **[Client](https://en.wikipedia.org/wiki/Client-side)**

## UseSnorkel

**เปิด** หรือ **ปิด** ใช้งาน **ชุดดำน้ำตื้น**

<Tabs>
<TabItem value="lua" label="Lua">

```lua
exports['azael_ui-diving']:UseSnorkel()
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
exports['azael_ui-diving']['UseSnorkel']();
```

</TabItem>
</Tabs>

## UseScuba

**เปิด** หรือ **ปิด** ใช้งาน **ชุดดำน้ำลึก**

<Tabs>
<TabItem value="lua" label="Lua">

```lua
exports['azael_ui-diving']:UseScuba()
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
exports['azael_ui-diving']['UseScuba']();
```

</TabItem>
</Tabs>

## IsSnorkelActive

รับสถานะการใช้งาน **ชุดดำน้ำตื้น**

<Tabs>
<TabItem value="lua" label="Lua">

```lua
exports['azael_ui-diving']:IsSnorkelActive()
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
exports['azael_ui-diving']['IsSnorkelActive']();
```

</TabItem>
</Tabs>

### Return

| Type               | Description                                                
|--------------------|--------------------------------------------------
| `boolean`          | สถานะการใช้งาน "ชุดดำน้ำตื้น" จะตอบกลับ `true` หากใช้งานอยู่ หรือ `false` หากไม่ได้ใช้งาน

## IsScubaActive

รับสถานะการใช้งาน **ชุดดำน้ำลึก**

<Tabs>
<TabItem value="lua" label="Lua">

```lua
exports['azael_ui-diving']:IsScubaActive()
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
exports['azael_ui-diving']['IsScubaActive']();
```

</TabItem>
</Tabs>

### Return

| Type               | Description                                                
|--------------------|--------------------------------------------------
| `boolean`          | สถานะการใช้งาน "ชุดดำน้ำลึก" จะตอบกลับ `true` หากใช้งานอยู่ หรือ `false` หากไม่ได้ใช้งาน

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
