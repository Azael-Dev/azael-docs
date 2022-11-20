# server.config.lua

ไฟล์การกำหนดค่าของทรัพยากรทางฝั่ง **[Server](https://en.wikipedia.org/wiki/Server-side)**

## General

ทั่วไป

```lua title="บรรทัดที่ 11"
CONFIG.General = {} -- [[ table ]]
```

### Item.Snorkel.Name

ชื่อไอเทม **ชุดดำน้ำตื้น** บนฐานข้อมูล

```lua title="บรรทัดที่ 14"
CONFIG.General.Item.Snorkel.Name = 'snorkelling_gear' -- [[ string ]]
```

### Item.Scuba.Name

ชื่อไอเทม **ชุดดำน้ำลึก** บนฐานข้อมูล

```lua title="บรรทัดที่ 18"
CONFIG.General.Item.Scuba.Name = 'scuba_gear' -- [[ string ]]
```

### Item.OxygenTank.Name

ชื่อไอเทม **ถังออกซิเจน** (**ชุดดำน้ำลึก**) บนฐานข้อมูล

```lua title="บรรทัดที่ 22"
CONFIG.General.Item.OxygenTank.Name = 'scuba_oxygen_tank' -- [[ string ]]
```
