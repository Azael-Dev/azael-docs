# client.config.lua

## Death

สาเหตุการตาย

```lua title="บรรทัดที่ 11"
CONFIG.Death = {} -- [[ table ]]
```

### Ignore.Enable

เปิดใช้งาน ละเว้นสาเหตุการตายภายโซนที่กำหนดใน **[Ignore.Zones](./client#ignorezones)**

```lua title="บรรทัดที่ 13"
CONFIG.Death.Ignore.Enable = true -- [[ boolean ]]
```

:::info

`true` เท่ากับ เปิดใช้งาน | `false` เท่ากับ ปิดใช้งาน

:::

### Ignore.Zones

รายการโซนที่ต้องการละเว้น (**สามารถเพิ่มโซนได้**)

```lua title="บรรทัดที่ 15"
CONFIG.Death.Ignore.Zones = { -- [[ table ]]
    --[[ Boxing - Los Santos International Airport ]]
    {
        Coords = vector3(-1096.59, -3007.87, 13.94),-- พิกัด X, Y, Z (รูปแบบ vector3)
        Radius = 170                                -- รัศมี (ขอบเขต)
    }
}
```

:::info

- `Coords` หมายถึง พิกัดของโซนที่กำหนด (`X`, `Y`, `Z`) ในรูปแบบ **[vector3](https://docs.fivem.net/docs/scripting-reference/runtimes/lua/functions/vector3/)**<br/>
- `Radius` หมายถึง รัศมี หรือ ขอบเขต โดยอ้างอิงจากจุดศูนย์กลางของพิกีดที่กำหนดใน `Coords`

:::

### Reason

เหตุผลสาเหตุการตาย

```lua title="บรรทัดที่ 24"
CONFIG.Death.Reason = { -- [[ table ]]
    Default = 'เสียชีวิต โดย %s',
    Suicide = 'ฆ่าตัวตาย โดย %s',
    Player = 'ถูก %s ฆ่า โดย %s',
    Killer = 'ฆ่า %s โดย %s',
    Vehicle = '%s ทะเบียน %s',
    Unknown = 'เสียชีวิต โดย ไม่ทราบสาเหตุ (Hash: %s)',
    Note = {
        Melee = 'อาวุธระยะประชิด',
        Bullet = 'อาวุธปืน',
        Explosion = 'แรงระเบิด',
        Gas = 'แก๊สพิษ',
        Burn = 'ไฟคลอก',
        Vehicle = 'ตกจากยานพาหนะ',
        Hunger = 'ขาดอาหาร',
        Thirst = 'ขาดน้ำ',
        Addon = 'อาวุธเสริม'
    }
}
```

### Causes

รายการ **[Weapon](https://www.vespura.com/fivem/weapons/stats/)**, **[Model](https://vespura.com/fivem/objects/)**, **[Object](https://vespura.com/fivem/objects/)** สำหรับ สาเหตุการตาย

<details>
<summary>คำอธิบายเพิ่มเติมเกี่ยวกับการกำหนดค่า</summary>

สามารถกำหนด **[Key](http://lua-users.org/wiki/TablesTutorial)** ของสาเหตุการตายเป็น **ชื่อ** หรือ **แฮช** ได้

```lua title="Name"
['WEAPON_DAGGER'] -- [[ string ]]
```

```lua title="Hash"
[2460120199] -- [[ number ]]
```

ประเภทข้อมูลของสาเหตุการตาย (**Types of Causes**)

- `MELEE` อาวุธระยะประชิด<br/>
- `BULLET` อาวุธปืน (กระสุน)<br/>
- `EXPLOSION` แรงระเบิด<br/>
- `GAS` แก๊สพิษ<br/>
- `BURN` ไฟคลอก (เผา)<br/>
- `VEHICLE` ยานพาหนะ<br/>
- `ANIMAL` สัตว์<br/>
- `FALL` ตกจากที่สูง<br/>
- `DROWN` จมน้ำ<br/>
- `ADDONS` อาวุธเสริม (อ้างอิงจากการตั้งค่า **[config.weapons.lua](https://github.com/esx-framework/esx-legacy/blob/main/%5Besx%5D/es_extended/config.weapons.lua)** ของ **[es_extended](https://github.com/esx-framework/esx-legacy/tree/main/%5Besx%5D/es_extended)** โดยอัตโนมัติ)

</details>

```lua title="บรรทัดที่ 45"
CONFIG.Death.Causes = { -- [[ table ]]
    --[[ MELEE - ระยะประชิด ]]
    ['WEAPON_DAGGER'] = {                                   -- ชื่อ หรือ แฮช
        Label = 'Antique Cavalry Dagger',                   -- ป้าย
        Type = 'MELEE'                                      -- ประเภท
    },

    ['WEAPON_BAT'] = {                                      -- ชื่อ หรือ แฮช
        Label = 'Baseball Bat',                             -- ป้าย
        Type = 'MELEE'                                      -- ประเภท
    },

    ['WEAPON_BOTTLE'] = {                                   -- ชื่อ หรือ แฮช
        Label = 'Broken Bottle',                            -- ป้าย
        Type = 'MELEE'                                      -- ประเภท
    },

    ['WEAPON_CROWBAR'] = {                                  -- ชื่อ หรือ แฮช
        Label = 'Crowbar',                                  -- ป้าย
        Type = 'MELEE'                                      -- ประเภท
    },

    ['WEAPON_UNARMED'] = {                                  -- ชื่อ หรือ แฮช
        Label = 'Fist',                                     -- ป้าย
        Type = 'MELEE'                                      -- ประเภท
    },

    ['WEAPON_FLASHLIGHT'] = {                               -- ชื่อ หรือ แฮช
        Label = 'Flashlight',                               -- ป้าย
        Type = 'MELEE'                                      -- ประเภท
    },

    ['WEAPON_GOLFCLUB'] = {                                 -- ชื่อ หรือ แฮช
        Label = 'FlasGolf Clubhlight',                      -- ป้าย
        Type = 'MELEE'                                      -- ประเภท
    },

    ['WEAPON_HAMMER'] = {                                   -- ชื่อ หรือ แฮช
        Label = 'Hammer',                                   -- ป้าย
        Type = 'MELEE'                                      -- ประเภท
    },

    ['WEAPON_HATCHET'] = {                                  -- ชื่อ หรือ แฮช
        Label = 'Hatchet',                                  -- ป้าย
        Type = 'MELEE'                                      -- ประเภท
    },

    ['WEAPON_KNUCKLE'] = {                                  -- ชื่อ หรือ แฮช
        Label = 'Brass Knuckles',                           -- ป้าย
        Type = 'MELEE'                                      -- ประเภท
    },

    ['WEAPON_KNIFE'] = {                                    -- ชื่อ หรือ แฮช
        Label = 'Knife',                                    -- ป้าย
        Type = 'MELEE'                                      -- ประเภท
    },

    ['WEAPON_MACHETE'] = {                                  -- ชื่อ หรือ แฮช
        Label = 'Machete',                                  -- ป้าย
        Type = 'MELEE'                                      -- ประเภท
    },

    ['WEAPON_SWITCHBLADE'] = {                              -- ชื่อ หรือ แฮช
        Label = 'Switchblade',                              -- ป้าย
        Type = 'MELEE'                                      -- ประเภท
    },

    ['WEAPON_NIGHTSTICK'] = {                               -- ชื่อ หรือ แฮช
        Label = 'Nightstick',                               -- ป้าย
        Type = 'MELEE'                                      -- ประเภท
    },

    ['WEAPON_WRENCH'] = {                                   -- ชื่อ หรือ แฮช
        Label = 'Pipe Wrench',                              -- ป้าย
        Type = 'MELEE'                                      -- ประเภท
    },

    ['WEAPON_BATTLEAXE'] = {                                -- ชื่อ หรือ แฮช
        Label = 'Battle Axe',                               -- ป้าย
        Type = 'MELEE'                                      -- ประเภท
    },

    ['WEAPON_POOLCUE'] = {                                  -- ชื่อ หรือ แฮช
        Label = 'Pool Cue',                                 -- ป้าย
        Type = 'MELEE'                                      -- ประเภท
    },

    ['WEAPON_STONE_HATCHET'] = {                            -- ชื่อ หรือ แฮช
        Label = 'Stone Hatchet',                            -- ป้าย
        Type = 'MELEE'                                      -- ประเภท
    },

    --[[ BULLET - กระสุน ]]
    ['WEAPON_PISTOL'] = {                                   -- ชื่อ หรือ แฮช
        Label = 'Pistol',                                   -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_PISTOL_MK2'] = {                               -- ชื่อ หรือ แฮช
        Label = 'Pistol Mk II',                             -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_COMBATPISTOL'] = {                             -- ชื่อ หรือ แฮช
        Label = 'Combat Pistol',                            -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_APPISTOL'] = {                                 -- ชื่อ หรือ แฮช
        Label = 'AP Pistol',                                -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_STUNGUN'] = {                                  -- ชื่อ หรือ แฮช
        Label = 'Stun Gun',                                 -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_PISTOL50'] = {                                 -- ชื่อ หรือ แฮช
        Label = 'Pistol .50',                               -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_SNSPISTOL'] = {                                -- ชื่อ หรือ แฮช
        Label = 'SNS Pistol',                               -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_SNSPISTOL_MK2'] = {                            -- ชื่อ หรือ แฮช
        Label = 'SNS Pistol Mk II',                         -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_HEAVYPISTOL'] = {                              -- ชื่อ หรือ แฮช
        Label = 'Heavy Pistol',                             -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_VINTAGEPISTOL'] = {                            -- ชื่อ หรือ แฮช
        Label = 'Vintage Pistol',                           -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_FLAREGUN'] = {                                 -- ชื่อ หรือ แฮช
        Label = 'Flare Gun',                                -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_MARKSMANPISTOL'] = {                           -- ชื่อ หรือ แฮช
        Label = 'Marksman Pistol',                          -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_REVOLVER'] = {                                 -- ชื่อ หรือ แฮช
        Label = 'Heavy Revolver',                           -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_REVOLVER_MK2'] = {                             -- ชื่อ หรือ แฮช
        Label = 'Heavy Revolver Mk II',                     -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_DOUBLEACTION'] = {                             -- ชื่อ หรือ แฮช
        Label = 'Double Action Revolver',                   -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_RAYPISTOL'] = {                                -- ชื่อ หรือ แฮช
        Label = 'Up-n-Atomizer',                            -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_CERAMICPISTOL'] = {                            -- ชื่อ หรือ แฮช
        Label = 'Ceramic Pistol',                           -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_NAVYREVOLVER'] = {                             -- ชื่อ หรือ แฮช
        Label = 'Navy Revolver',                            -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_MICROSMG'] = {                                 -- ชื่อ หรือ แฮช
        Label = 'Micro SMG',                                -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_SMG'] = {                                      -- ชื่อ หรือ แฮช
        Label = 'SMG',                                      -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_SMG_MK2'] = {                                  -- ชื่อ หรือ แฮช
        Label = 'SMG Mk II',                                -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_ASSAULTSMG'] = {                               -- ชื่อ หรือ แฮช
        Label = 'Assault SMG',                              -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_COMBATPDW'] = {                                -- ชื่อ หรือ แฮช
        Label = 'Combat PDW',                               -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_MACHINEPISTOL'] = {                            -- ชื่อ หรือ แฮช
        Label = 'Machine Pistol',                           -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_MINISMG'] = {                                  -- ชื่อ หรือ แฮช
        Label = 'Mini SMG',                                 -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_RAYCARBINE'] = {                               -- ชื่อ หรือ แฮช
        Label = 'Unholy Hellbringer',                       -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_PUMPSHOTGUN'] = {                              -- ชื่อ หรือ แฮช
        Label = 'Pump Shotgun',                             -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_PUMPSHOTGUN_MK2'] = {                          -- ชื่อ หรือ แฮช
        Label = 'Pump Shotgun Mk II',                       -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_SAWNOFFSHOTGUN'] = {                           -- ชื่อ หรือ แฮช
        Label = 'Sawed-Off Shotgun',                        -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_ASSAULTSHOTGUN'] = {                           -- ชื่อ หรือ แฮช
        Label = 'Assault Shotgun',                          -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_BULLPUPSHOTGUN'] = {                           -- ชื่อ หรือ แฮช
        Label = 'Bullpup Shotgun',                          -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_MUSKET'] = {                                   -- ชื่อ หรือ แฮช
        Label = 'Musket',                                   -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_HEAVYSHOTGUN'] = {                             -- ชื่อ หรือ แฮช
        Label = 'Heavy Shotgun',                            -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_DBSHOTGUN'] = {                                -- ชื่อ หรือ แฮช
        Label = 'Double Barrel Shotgun',                    -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_AUTOSHOTGUN'] = {                              -- ชื่อ หรือ แฮช
        Label = 'Sweeper Shotgun',                          -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_ASSAULTRIFLE'] = {                             -- ชื่อ หรือ แฮช
        Label = 'Assault Rifle',                            -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_ASSAULTRIFLE_MK2'] = {                         -- ชื่อ หรือ แฮช
        Label = 'Assault Rifle Mk II',                      -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_CARBINERIFLE'] = {                             -- ชื่อ หรือ แฮช
        Label = 'Carbine Rifle',                            -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_CARBINERIFLE_MK2'] = {                         -- ชื่อ หรือ แฮช
        Label = 'Carbine Rifle Mk II',                      -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_ADVANCEDRIFLE'] = {                            -- ชื่อ หรือ แฮช
        Label = 'Advanced Rifle',                           -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_SPECIALCARBINE'] = {                           -- ชื่อ หรือ แฮช
        Label = 'Special Carbine',                          -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_SPECIALCARBINE_MK2'] = {                       -- ชื่อ หรือ แฮช
        Label = 'Special Carbine Mk II',                    -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_BULLPUPRIFLE'] = {                             -- ชื่อ หรือ แฮช
        Label = 'Bullpup Rifle',                            -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_BULLPUPRIFLE_MK2'] = {                         -- ชื่อ หรือ แฮช
        Label = 'Bullpup Rifle Mk II',                      -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_COMPACTRIFLE'] = {                             -- ชื่อ หรือ แฮช
        Label = 'Compact Rifle',                            -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_MG'] = {                                       -- ชื่อ หรือ แฮช
        Label = 'MG',                                       -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_COMBATMG'] = {                                 -- ชื่อ หรือ แฮช
        Label = 'Combat MG',                                -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_COMBATMG_MK2'] = {                             -- ชื่อ หรือ แฮช
        Label = 'Combat MG Mk II',                          -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_GUSENBERG'] = {                                -- ชื่อ หรือ แฮช
        Label = 'Gusenberg Sweeper',                        -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_SNIPERRIFLE'] = {                              -- ชื่อ หรือ แฮช
        Label = 'Sniper Rifle',                             -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_HEAVYSNIPER'] = {                              -- ชื่อ หรือ แฮช
        Label = 'Heavy Sniper',                             -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_HEAVYSNIPER_MK2'] = {                          -- ชื่อ หรือ แฮช
        Label = 'Heavy Sniper Mk II',                       -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_MARKSMANRIFLE'] = {                            -- ชื่อ หรือ แฮช
        Label = 'Marksman Rifle',                           -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_MARKSMANRIFLE_MK2'] = {                        -- ชื่อ หรือ แฮช
        Label = 'Marksman Rifle Mk II',                     -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    ['WEAPON_MINIGUN'] = {                                  -- ชื่อ หรือ แฮช
        Label = 'Minigun',                                  -- ป้าย
        Type = 'BULLET'                                     -- ประเภท
    },

    --[[ EXPLOSION - แรงระเบิด ]]
    ['WEAPON_RPG'] = {                                      -- ชื่อ หรือ แฮช
        Label = 'RPG',                                      -- ป้าย
        Type = 'EXPLOSION'                                  -- ประเภท
    },

    ['WEAPON_GRENADELAUNCHER'] = {                          -- ชื่อ หรือ แฮช
        Label = 'Grenade Launcher',                         -- ป้าย
        Type = 'EXPLOSION'                                  -- ประเภท
    },

    ['WEAPON_GRENADELAUNCHER_SMOKE'] = {                    -- ชื่อ หรือ แฮช
        Label = 'Grenade Launcher Smoke',                   -- ป้าย
        Type = 'EXPLOSION'                                  -- ประเภท
    },

    ['WEAPON_RAILGUN'] = {                                  -- ชื่อ หรือ แฮช
        Label = 'Railgun',                                  -- ป้าย
        Type = 'EXPLOSION'                                  -- ประเภท
    },

    ['WEAPON_HOMINGLAUNCHER'] = {                           -- ชื่อ หรือ แฮช
        Label = 'Homing Launcher',                          -- ป้าย
        Type = 'EXPLOSION'                                  -- ประเภท
    },

    ['WEAPON_COMPACTLAUNCHER'] = {                          -- ชื่อ หรือ แฮช
        Label = 'Compact Grenade',                          -- ป้าย
        Type = 'EXPLOSION'                                  -- ประเภท
    },

    ['WEAPON_RAYMINIGUN'] = {                               -- ชื่อ หรือ แฮช
        Label = 'Widowmaker',                              -- ป้าย
        Type = 'EXPLOSION'                                  -- ประเภท
    },

    ['WEAPON_PASSENGER_ROCKET'] = {                         -- ชื่อ หรือ แฮช
        Label = 'Passenger Rocket',                         -- ป้าย
        Type = 'EXPLOSION'                                  -- ประเภท
    },

    ['WEAPON_AIRSTRIKE_ROCKET'] = {                         -- ชื่อ หรือ แฮช
        Label = 'Airstrike Rocket',                         -- ป้าย
        Type = 'EXPLOSION'                                  -- ประเภท
    },

    ['WEAPON_STINGER'] = {                                  -- ชื่อ หรือ แฮช
        Label = 'Stinger (VEHICLE)',                        -- ป้าย
        Type = 'EXPLOSION'                                  -- ประเภท
    },

    ['WEAPON_GRENADE'] = {                                  -- ชื่อ หรือ แฮช
        Label = 'Grenade',                                  -- ป้าย
        Type = 'EXPLOSION'                                  -- ประเภท
    },

    ['WEAPON_STICKYBOMB'] = {                               -- ชื่อ หรือ แฮช
        Label = 'Sticky Bomb',                              -- ป้าย
        Type = 'EXPLOSION'                                  -- ประเภท
    },

    ['WEAPON_EXPLOSION'] = {                                -- ชื่อ หรือ แฮช
        Label = 'EXPLOSION',                                -- ป้าย
        Type = 'EXPLOSION'                                  -- ประเภท
    },

    ['WEAPON_HELI_CRASH'] = {                               -- ชื่อ หรือ แฮช
        Label = 'Helicopter Crash',                         -- ป้าย
        Type = 'EXPLOSION'                                  -- ประเภท
    },

    ['WEAPON_VEHICLE_ROCKET'] = {                           -- ชื่อ หรือ แฮช
        Label = 'VEHICLE Rocket',                           -- ป้าย
        Type = 'EXPLOSION'                                  -- ประเภท
    },

    ['WEAPON_PROXMINE'] = {                                 -- ชื่อ หรือ แฮช
        Label = 'Proximity Mines',                          -- ป้าย
        Type = 'EXPLOSION'                                  -- ประเภท
    },

    ['WEAPON_PIPEBOMB'] = {                                 -- ชื่อ หรือ แฮช
        Label = 'Pipe Bombs',                               -- ป้าย
        Type = 'EXPLOSION'                                  -- ประเภท
    },

    --[[ GAS - แก๊สพิษ ]]
    ['WEAPON_BZGAS'] = {                                    -- ชื่อ หรือ แฮช
        Label = 'BZ GAS',                                   -- ป้าย
        Type = 'GAS'                                        -- ประเภท
    },

    ['WEAPON_SMOKEGRENADE'] = {                             -- ชื่อ หรือ แฮช
        Label = 'Tear GAS',                                 -- ป้าย
        Type = 'GAS'                                        -- ประเภท
    },

    --[[ BURN - เผา ]]
    ['WEAPON_MOLOTOV'] = {                                  -- ชื่อ หรือ แฮช
        Label = 'Molotov Cocktail',                         -- ป้าย
        Type = 'BURN'                                       -- ประเภท
    },

    ['WEAPON_PETROLCAN'] = {                                -- ชื่อ หรือ แฮช
        Label = 'Jerry Can',                                -- ป้าย
        Type = 'BURN'                                       -- ประเภท
    },

    ['WEAPON_FIREWORK'] = {                                 -- ชื่อ หรือ แฮช
        Label = 'Firework Launcher',                        -- ป้าย
        Type = 'BURN'                                       -- ประเภท
    },

    --[[ VEHICLE - ยานพาหนะ ]]
    ['WEAPON_RAMMED_BY_CAR'] = {                            -- ชื่อ หรือ แฮช
        Label = 'ยานพาหนะ',                                 -- ป้าย
        Type = 'VEHICLE'                                    -- ประเภท
    },

    ['WEAPON_RUN_OVER_BY_CAR'] = {                          -- ชื่อ หรือ แฮช
        Label = 'ยานพาหนะ',                                 -- ป้าย
        Type = 'VEHICLE'                                    -- ประเภท
    },

    --[[ ANIMAL - สัตว์ ]]
    ['WEAPON_ANIMAL'] = {                                   -- ชื่อ หรือ แฮช
        Label = 'สัตว์ทำร้าย',                                 -- ป้าย
        Type = 'ANIMAL'                                     -- ประเภท
    },

    ['WEAPON_COUGAR'] = {                                   -- ชื่อ หรือ แฮช
        Label = 'เสือภูเขาทำร้าย',                              -- ป้าย
        Type = 'ANIMAL'                                     -- ประเภท
    },

    --[[ FALL - ตกจากที่สูง ]]
    ['WEAPON_FALL'] = {                                     -- ชื่อ หรือ แฮช
        Label = 'ตกจากที่สูง',                                 -- ป้าย
        Type = 'FALL'                                       -- ประเภท
    },

    --[[ DROWN - จมน้ำ ]]
    ['WEAPON_DROWNING'] = {                                 -- ชื่อ หรือ แฮช
        Label = 'จมน้ำ',                                      -- ป้าย
        Type = 'DROWN'                                      -- ประเภท
    },

    ['WEAPON_DROWNING_IN_VEHICLE'] = {                      -- ชื่อ หรือ แฮช
        Label = 'จมน้ำ (ภายในยานพาหนะ)',                     -- ป้าย
        Type = 'DROWN'                                      -- ประเภท
    }
}
```
