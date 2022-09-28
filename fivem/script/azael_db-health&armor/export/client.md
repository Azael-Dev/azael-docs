---
sidebar_label: client
---

# Export Functions (Client-Side)

ฟังก์ชันส่งออกเพื่อให้สามารถใช้งานได้จากทรัพยากรอื่นๆทางฝั่ง **[Client](https://en.wikipedia.org/wiki/Client-side)**

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

| Type               | Default            | Description                                                
|--------------------|--------------------|--------------------------------------------------
| `number`           | Health Value       | ค่าสถานะ "พลังชีวิต" ปัจจุบันของตัวละคร

:::caution

หากคุณไม่ได้เปิดใช้งาน **[Health.Enable](../config/client#healthenable)** คุณจะไม่สามารถเรียกใช้งานฟังก์ชันนี้ได้

:::

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

:::caution

หากคุณไม่ได้เปิดใช้งาน **[Health.Enable](../config/client#healthenable)** คุณจะไม่สามารถเรียกใช้งานฟังก์ชันนี้ได้

:::

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

:::caution

หากคุณไม่ได้เปิดใช้งาน **[Health.Enable](../config/client#healthenable)** คุณจะไม่สามารถเรียกใช้งานฟังก์ชันนี้ได้

:::

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

| Type               | Default            | Description                                                
|--------------------|--------------------|--------------------------------------------------
| `number`           | Armour Value       | ค่าสถานะ "เกราะ" ปัจจุบันของตัวละคร

:::caution

หากคุณไม่ได้เปิดใช้งาน **[Armour.Enable](../config/client#armourenable)** คุณจะไม่สามารถเรียกใช้งานฟังก์ชันนี้ได้

:::

## DisablePlayerArmour

**ปิดใช้งาน** การการตรวจสอบ **"เกราะ"** ของตัวละคร

<Tabs>
<TabItem value="lua" label="Lua">

```lua
exports['azael_db-health&armor']:DisablePlayerArmour()
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
exports['azael_db-health&armor']['DisablePlayerArmour']();
```

</TabItem>
</Tabs>

:::caution

หากคุณไม่ได้เปิดใช้งาน **[Armour.Enable](../config/client#armourenable)** คุณจะไม่สามารถเรียกใช้งานฟังก์ชันนี้ได้

:::

## EnablePlayerArmour

**เปิดใช้งาน** การการตรวจสอบ **"เกราะ"** ของตัวละคร

<Tabs>
<TabItem value="lua" label="Lua">

```lua
exports['azael_db-health&armor']:EnablePlayerArmour()
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
exports['azael_db-health&armor']['EnablePlayerArmour']();
```

</TabItem>
</Tabs>

:::caution

หากคุณไม่ได้เปิดใช้งาน **[Armour.Enable](../config/client#armourenable)** คุณจะไม่สามารถเรียกใช้งานฟังก์ชันนี้ได้

:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
