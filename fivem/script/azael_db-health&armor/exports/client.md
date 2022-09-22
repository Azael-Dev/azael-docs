---
sidebar_label: client
---

# Exports (Client-side)

ส่งออกฟังก์ชันเพื่อให้สามารถใช้งานได้จากทรัพยากรอื่นๆทางฝั่ง **[Client](https://en.wikipedia.org/wiki/Client-side)**

## DisablePlayerHealth

**ปิดใช้งาน** การการตรวจสอบ **"พลังชีวิต"** ของตัวละคร

<Tabs>
<TabItem value="lua" label="Lua">

```lua
exports['azael_db-health&armor']:DisablePlayerHealth()
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
exports['azael_db-health&armor']['DisablePlayerHealth']();
```

</TabItem>
</Tabs>

## EnablePlayerHealth

**เปิดใช้งาน** การการตรวจสอบ **"พลังชีวิต"** ของตัวละคร

<Tabs>
<TabItem value="lua" label="Lua">

```lua
exports['azael_db-health&armor']:EnablePlayerHealth()
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
exports['azael_db-health&armor']['EnablePlayerHealth']();
```

</TabItem>
</Tabs>

## GetPlayerHealth

รับสถานะ **"พลังชีวิต"** ปัจจุบันของตัวละคร

<Tabs>
<TabItem value="lua" label="Lua">

```lua
exports['azael_db-health&armor']:GetPlayerHealth()
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
exports['azael_db-health&armor']['GetPlayerHealth']();
```

</TabItem>
</Tabs>

### Return

| Type               | Value              | Description                                                
|--------------------|--------------------|--------------------------------------------------
| number             | -                  | ค่าสถานะ "พลังชีวิต" ปัจจุบันของตัวละคร

## GetPlayerArmour

รับสถานะ **"เกราะ"** ปัจจุบันของตัวละคร

<Tabs>
<TabItem value="lua" label="Lua">

```lua
exports['azael_db-health&armor']:GetPlayerArmour()
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
exports['azael_db-health&armor']['GetPlayerArmour']();
```

</TabItem>
</Tabs>

### Return

| Type               | Value              | Description                                                
|--------------------|--------------------|--------------------------------------------------
| number             | -                  | ค่าสถานะ "เกราะ" ปัจจุบันของตัวละคร

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
