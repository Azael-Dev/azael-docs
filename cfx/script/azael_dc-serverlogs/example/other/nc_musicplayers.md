---
sidebar_label: nc_musicplayers
---

# nc_musicplayers

ตัวอย่างรหัสที่ใช้เพิ่มไปยังทรัพยากร **[nc_musicplayers](https://fivem.nc-developer.com/product/655557f45a3af)** เพื่อส่งข้อมูลมายัง **[azael_dc-serverlogs](../../index.md)**

:::danger

โปรดตรวจสอบตัวแปรของรหัสทุกครั้ง เนื่องจากเวอร์ชันของทรัพยากรในตัวอย่างอาจจะไม่มีความเข้ากันได้กับทรัพยากรในเวอร์ชันที่คุณกำลังใช้งานอยู่ และส่งผลให้ไม่มีการส่งข้อมูลไปยัง **[azael_dc-serverlogs](../../index.md)** เนื่องจากมีข้อผิดพลาดเกิดขึ้นจากรหัสที่คุณดำเนินการเพิ่ม

:::

## config.functions.server.lua

ไปยัง **`config.functions.server.lua`** แล้วดำเนินการเปิดไฟล์

### ลำโพง-วาง

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_MusicPlacedSpeaker`                | ลำโพง-วาง

วางรหัสด้านล่างนี้ภายใน `Config.ServerPlacedBluetoothSpeaker = function`

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'NC_MusicPlacedSpeaker',
        content = ('วางลำโพง (NAME: %s)'):format(name),
        coords = coords,
        source = playerId,
        color = 2
    })
end)
```

### ลำโพง-เก็บ

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_MusicPickupSpeaker`                | ลำโพง-เก็บ

วางรหัสด้านล่างนี้ภายใน `Config.ServerPickedupBluetoothSpeaker = function`

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'NC_MusicPickupSpeaker',
        content = ('เก็บลำโพง (NAME: %s)'):format(name),
        coords = coords,
        source = playerId,
        color = 7
    })
end)
```

### ลำโพง-ใช้งาน

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_MusicEnteredController`            | ลำโพง-ใช้งาน

วางรหัสด้านล่างนี้ภายใน `Config.ServerEnteredController = function`

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'NC_MusicEnteredController',
        content = ('ใช้งานลำโพง (NAME: %s | TYPE: %s | OWNER ID: %s)'):format(name, controllerType, ownerId),
        source = playerId,
        color = 2
    })
end)
```

### ลำโพง-ยกเลิกใช้งาน

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_MusicLeftController`               | ลำโพง-ยกเลิกใช้งาน

วางรหัสด้านล่างนี้ภายใน `Config.ServerLeftController = function`

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'NC_MusicLeftController',
        content = ('ยกเลิกการใช้งานลำโพง (NAME: %s | TYPE: %s | OWNER ID: %s)'):format(name, controllerType, ownerId),
        source = playerId,
        color = 1
    })
end)
```

### ลำโพง-เพิ่มเพลง

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_MusicAdded`                        | ลำโพง-เพิ่มเพลง

วางรหัสด้านล่างนี้ภายใน `Config.ServerAddedMusic = function`

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'NC_MusicAdded',
        content = ('เพิ่มเพลงลงรายชื่อ (NAME: %s | TYPE: %s | YOUTUBE ID: %s | OWNER ID: %s)'):format(name, controllerType, youtubeId, ownerId),
        source = playerId,
        color = 2
    })
end)
```

### ลำโพง-ลบเพลง

| Event                                  | Label
|----------------------------------------|----------------------------------------
| `NC_MusicRemoved`                      | ลำโพง-ลบเพลง

วางรหัสด้านล่างนี้ภายใน `Config.ServerRemovedMusic = function`

```lua
pcall(function()
    exports['azael_dc-serverlogs']:insertData({
        event = 'NC_MusicRemoved',
        content = ('ลบเพลงออกจากรายชื่อ (NAME: %s | TYPE: %s | YOUTUBE ID: %s | OWNER ID: %s)'):format(name, controllerType, youtubeId, ownerId),
        source = playerId,
        color = 1
    })
end)
```
