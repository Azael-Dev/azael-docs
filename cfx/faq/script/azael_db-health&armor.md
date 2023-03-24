# azael_db-health&armor

คำถามที่พบบ่อยเกียวกับวิธีแก้ไขปัญหาของทรัพยากร **[azael_db-health&armor](../../script/azael_db-health&armor/)**

## เข้าเกม "พลังชีวิต" เต็ม

มี **[Native](https://docs.fivem.net/natives/?_0x6B76DC1F3AE6E6A3)** เพิ่ม **"พลังชีวิต"** ภายในสคริปต์อื่นๆที่คุณกำลังใช้งานอยู่ คุณสามารถเปิดใช้งาน **[Debug](../../../fivem/script/azael_db-health&armor/config/client#debugenable)** เพื่อดำเนินการตรวจสอบได้ หรือ ค้นหา **[Native](https://docs.fivem.net/natives/?_0x6B76DC1F3AE6E6A3)** เพิ่ม **"พลังชีวิต"** จากทรัพยากรอื่นๆทางทางฝั่ง **[Client](https://en.wikipedia.org/wiki/Client-side)**

```lua
SetEntityHealth(PlayerPedId(), 200)
```

หรือ

```lua
SetEntityHealth(GetPlayerPed(-1), 200)
```

:::tip

**Native** นี้จะอยู่ภายในเหตุการณ์ **`playerSpawned`** หรือ **`esx:playerLoaded`** สำหรับ **[ESX Framework](https://github.com/esx-framework)**

:::
