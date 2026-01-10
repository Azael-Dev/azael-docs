---
sidebar_label: FiveM
---

# fivem.json

ไฟล์การกำหนดค่าของทรัพยากรทางฝั่ง **[Client](https://en.wikipedia.org/wiki/Client-side)**

## FiveM Weapons

รายการ **[Weapon](https://www.vespura.com/fivem/weapons/stats/)**, **[Model](https://vespura.com/fivem/objects/)**, **[Object](https://vespura.com/fivem/objects/)** สำหรับ สาเหตุการตาย

<details>
    <summary>คำอธิบายเพิ่มเติมเกี่ยวกับการกำหนดค่า</summary>

สามารถกำหนด **[Key](http://lua-users.org/wiki/TablesTutorial)** สาเหตุการตายเป็น **ชื่อ** หรือ **แฮช** ประเภท **String** ได้

```lua title="Name"
"WEAPON_DAGGER": {
    "Label": "Antique Cavalry Dagger",
    "Type": "MELEE"
}
```

```lua title="Hash"
"2460120199": {
    "Label": "Antique Cavalry Dagger",
    "Type": "MELEE"
}
```

ประเภทของสาเหตุการตาย (**Types of Causes**)

- `MELEE` อาวุธระยะประชิด
- `BULLET` อาวุธปืน (กระสุน)
- `EXPLOSION` แรงระเบิด
- `GAS` แก๊สพิษ
- `BURN` ไฟคลอก (เผา)
- `VEHICLE` ยานพาหนะ
- `ANIMAL` สัตว์
- `DROWN` จมน้ำ
- `GENERAL` ทั่วไป
- `ADDONS` อาวุธเสริม (ระบบจะดำเนินการโหลดรายการ **อาวุธ** ใน **Framework** ที่คุณใช้งานโดยอัตโนมัติ)

</details>

```json title="JSON"
{
    "WEAPON_DAGGER": {
        "Label": "Antique Cavalry Dagger",
        "Type": "MELEE"
    },
    "WEAPON_BAT": {
        "Label": "Baseball Bat",
        "Type": "MELEE"
    },
    "WEAPON_BOTTLE": {
        "Label": "Broken Bottle",
        "Type": "MELEE"
    },
    "WEAPON_CROWBAR": {
        "Label": "Crowbar",
        "Type": "MELEE"
    },
    "WEAPON_UNARMED": {
        "Label": "Fist",
        "Type": "MELEE"
    },
    "WEAPON_FLASHLIGHT": {
        "Label": "Flashlight",
        "Type": "MELEE"
    },
    "WEAPON_GOLFCLUB": {
        "Label": "FlasGolf Clubhlight",
        "Type": "MELEE"
    },
    "WEAPON_HAMMER": {
        "Label": "Hammer",
        "Type": "MELEE"
    },
    "WEAPON_HATCHET": {
        "Label": "Hatchet",
        "Type": "MELEE"
    },
    "WEAPON_KNUCKLE": {
        "Label": "Brass Knuckles",
        "Type": "MELEE"
    },
    "WEAPON_KNIFE": {
        "Label": "Knife",
        "Type": "MELEE"
    },
    "WEAPON_MACHETE": {
        "Label": "Machete",
        "Type": "MELEE"
    },
    "WEAPON_SWITCHBLADE": {
        "Label": "Switchblade",
        "Type": "MELEE"
    },
    "WEAPON_NIGHTSTICK": {
        "Label": "Nightstick",
        "Type": "MELEE"
    },
    "WEAPON_WRENCH": {
        "Label": "Pipe Wrench",
        "Type": "MELEE"
    },
    "WEAPON_BATTLEAXE": {
        "Label": "Battle Axe",
        "Type": "MELEE"
    },
    "WEAPON_POOLCUE": {
        "Label": "Pool Cue",
        "Type": "MELEE"
    },
    "WEAPON_STONE_HATCHET": {
        "Label": "Stone Hatchet",
        "Type": "MELEE"
    },
    "WEAPON_BARBED_WIRE": {
        "Label": "Barbed Wire",
        "Type": "MELEE"
    },
    "WEAPON_BALL": {
        "Label": "Ball",
        "Type": "MELEE"
    },
    "WEAPON_CANDYCANE": {
        "Label": "Candy Cane",
        "Type": "MELEE"
    },
    "WEAPON_STUNROD": {
        "Label": "The Shocker",
        "Type": "MELEE"
    },
    "WEAPON_PISTOL": {
        "Label": "Pistol",
        "Type": "BULLET"
    },
    "WEAPON_PISTOL_MK2": {
        "Label": "Pistol Mk II",
        "Type": "BULLET"
    },
    "WEAPON_COMBATPISTOL": {
        "Label": "Combat Pistol",
        "Type": "BULLET"
    },
    "WEAPON_APPISTOL": {
        "Label": "AP Pistol",
        "Type": "BULLET"
    },
    "WEAPON_STUNGUN": {
        "Label": "Stun Gun",
        "Type": "BULLET"
    },
    "WEAPON_PISTOL50": {
        "Label": "Pistol .50",
        "Type": "BULLET"
    },
    "WEAPON_SNSPISTOL": {
        "Label": "SNS Pistol",
        "Type": "BULLET"
    },
    "WEAPON_SNSPISTOL_MK2": {
        "Label": "SNS Pistol Mk II",
        "Type": "BULLET"
    },
    "WEAPON_HEAVYPISTOL": {
        "Label": "Heavy Pistol",
        "Type": "BULLET"
    },
    "WEAPON_VINTAGEPISTOL": {
        "Label": "Vintage Pistol",
        "Type": "BULLET"
    },
    "WEAPON_FLAREGUN": {
        "Label": "Flare Gun",
        "Type": "BULLET"
    },
    "WEAPON_MARKSMANPISTOL": {
        "Label": "Marksman Pistol",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER": {
        "Label": "Heavy Revolver",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_MK2": {
        "Label": "Heavy Revolver Mk II",
        "Type": "BULLET"
    },
    "WEAPON_DOUBLEACTION": {
        "Label": "Double Action Revolver",
        "Type": "BULLET"
    },
    "WEAPON_RAYPISTOL": {
        "Label": "Up-n-Atomizer",
        "Type": "BULLET"
    },
    "WEAPON_CERAMICPISTOL": {
        "Label": "Ceramic Pistol",
        "Type": "BULLET"
    },
    "WEAPON_NAVYREVOLVER": {
        "Label": "Navy Revolver",
        "Type": "BULLET"
    },
    "WEAPON_MICROSMG": {
        "Label": "Micro SMG",
        "Type": "BULLET"
    },
    "WEAPON_SMG": {
        "Label": "SMG",
        "Type": "BULLET"
    },
    "WEAPON_SMG_MK2": {
        "Label": "SMG Mk II",
        "Type": "BULLET"
    },
    "WEAPON_ASSAULTSMG": {
        "Label": "Assault SMG",
        "Type": "BULLET"
    },
    "WEAPON_COMBATPDW": {
        "Label": "Combat PDW",
        "Type": "BULLET"
    },
    "WEAPON_MACHINEPISTOL": {
        "Label": "Machine Pistol",
        "Type": "BULLET"
    },
    "WEAPON_MINISMG": {
        "Label": "Mini SMG",
        "Type": "BULLET"
    },
    "WEAPON_RAYCARBINE": {
        "Label": "Unholy Hellbringer",
        "Type": "BULLET"
    },
    "WEAPON_PUMPSHOTGUN": {
        "Label": "Pump Shotgun",
        "Type": "BULLET"
    },
    "WEAPON_PUMPSHOTGUN_MK2": {
        "Label": "Pump Shotgun Mk II",
        "Type": "BULLET"
    },
    "WEAPON_SAWNOFFSHOTGUN": {
        "Label": "Sawed-Off Shotgun",
        "Type": "BULLET"
    },
    "WEAPON_ASSAULTSHOTGUN": {
        "Label": "Assault Shotgun",
        "Type": "BULLET"
    },
    "WEAPON_BULLPUPSHOTGUN": {
        "Label": "Bullpup Shotgun",
        "Type": "BULLET"
    },
    "WEAPON_MUSKET": {
        "Label": "Musket",
        "Type": "BULLET"
    },
    "WEAPON_HEAVYSHOTGUN": {
        "Label": "Heavy Shotgun",
        "Type": "BULLET"
    },
    "WEAPON_DBSHOTGUN": {
        "Label": "Double Barrel Shotgun",
        "Type": "BULLET"
    },
    "WEAPON_AUTOSHOTGUN": {
        "Label": "Sweeper Shotgun",
        "Type": "BULLET"
    },
    "WEAPON_ASSAULTRIFLE": {
        "Label": "Assault Rifle",
        "Type": "BULLET"
    },
    "WEAPON_ASSAULTRIFLE_MK2": {
        "Label": "Assault Rifle Mk II",
        "Type": "BULLET"
    },
    "WEAPON_CARBINERIFLE": {
        "Label": "Carbine Rifle",
        "Type": "BULLET"
    },
    "WEAPON_CARBINERIFLE_MK2": {
        "Label": "Carbine Rifle Mk II",
        "Type": "BULLET"
    },
    "WEAPON_ADVANCEDRIFLE": {
        "Label": "Advanced Rifle",
        "Type": "BULLET"
    },
    "WEAPON_SPECIALCARBINE": {
        "Label": "Special Carbine",
        "Type": "BULLET"
    },
    "WEAPON_SPECIALCARBINE_MK2": {
        "Label": "Special Carbine Mk II",
        "Type": "BULLET"
    },
    "WEAPON_BULLPUPRIFLE": {
        "Label": "Bullpup Rifle",
        "Type": "BULLET"
    },
    "WEAPON_BULLPUPRIFLE_MK2": {
        "Label": "Bullpup Rifle Mk II",
        "Type": "BULLET"
    },
    "WEAPON_COMPACTRIFLE": {
        "Label": "Compact Rifle",
        "Type": "BULLET"
    },
    "WEAPON_MG": {
        "Label": "MG",
        "Type": "BULLET"
    },
    "WEAPON_COMBATMG": {
        "Label": "Combat MG",
        "Type": "BULLET"
    },
    "WEAPON_COMBATMG_MK2": {
        "Label": "Combat MG Mk II",
        "Type": "BULLET"
    },
    "WEAPON_GUSENBERG": {
        "Label": "Gusenberg Sweeper",
        "Type": "BULLET"
    },
    "WEAPON_SNIPERRIFLE": {
        "Label": "Sniper Rifle",
        "Type": "BULLET"
    },
    "WEAPON_HEAVYSNIPER": {
        "Label": "Heavy Sniper",
        "Type": "BULLET"
    },
    "WEAPON_HEAVYSNIPER_MK2": {
        "Label": "Heavy Sniper Mk II",
        "Type": "BULLET"
    },
    "WEAPON_MARKSMANRIFLE": {
        "Label": "Marksman Rifle",
        "Type": "BULLET"
    },
    "WEAPON_MARKSMANRIFLE_MK2": {
        "Label": "Marksman Rifle Mk II",
        "Type": "BULLET"
    },
    "WEAPON_MINIGUN": {
        "Label": "Minigun",
        "Type": "BULLET"
    },
    "WEAPON_GADGETPISTOL": {
        "Label": "Perico Pistol",
        "Type": "BULLET"
    },
    "WEAPON_MILITARYRIFLE": {
        "Label": "Military Rifle",
        "Type": "BULLET"
    },
    "WEAPON_COMBATSHOTGUN": {
        "Label": "Combat Shotgun",
        "Type": "BULLET"
    },
    "WEAPON_HEAVYRIFLE": {
        "Label": "Heavy Rifle",
        "Type": "BULLET"
    },
    "WEAPON_STUNGUN_MP": {
        "Label": "Stungun MP",
        "Type": "BULLET"
    },
    "WEAPON_TACTICALRIFLE": {
        "Label": "Tactical Rifle",
        "Type": "BULLET"
    },
    "WEAPON_PRECISIONRIFLE": {
        "Label": "Precision Rifle",
        "Type": "BULLET"
    },
    "WEAPON_PISTOLXM3": {
        "Label": "WM 29 Pistol",
        "Type": "BULLET"
    },
    "WEAPON_TECPISTOL": {
        "Label": "Tactical SMG",
        "Type": "BULLET"
    },
    "WEAPON_BATTLERIFLE": {
        "Label": "Battle Rifle",
        "Type": "BULLET"
    },
    "WEAPON_RPG": {
        "Label": "RPG",
        "Type": "EXPLOSION"
    },
    "WEAPON_GRENADELAUNCHER": {
        "Label": "Grenade Launcher",
        "Type": "EXPLOSION"
    },
    "WEAPON_GRENADELAUNCHER_SMOKE": {
        "Label": "Grenade Launcher Smoke",
        "Type": "EXPLOSION"
    },
    "WEAPON_RAILGUN": {
        "Label": "Railgun",
        "Type": "EXPLOSION"
    },
    "WEAPON_HOMINGLAUNCHER": {
        "Label": "Homing Launcher",
        "Type": "EXPLOSION"
    },
    "WEAPON_COMPACTLAUNCHER": {
        "Label": "Compact Grenade",
        "Type": "EXPLOSION"
    },
    "WEAPON_RAYMINIGUN": {
        "Label": "Widowmaker",
        "Type": "EXPLOSION"
    },
    "WEAPON_PASSENGER_ROCKET": {
        "Label": "Passenger Rocket",
        "Type": "EXPLOSION"
    },
    "WEAPON_AIRSTRIKE_ROCKET": {
        "Label": "Airstrike Rocket",
        "Type": "EXPLOSION"
    },
    "WEAPON_STINGER": {
        "Label": "Stinger",
        "Type": "EXPLOSION"
    },
    "WEAPON_GRENADE": {
        "Label": "Grenade",
        "Type": "EXPLOSION"
    },
    "WEAPON_STICKYBOMB": {
        "Label": "Sticky Bomb",
        "Type": "EXPLOSION"
    },
    "WEAPON_EXPLOSION": {
        "Label": "Explosion",
        "Type": "EXPLOSION"
    },
    "WEAPON_PROXMINE": {
        "Label": "Proximity Mines",
        "Type": "EXPLOSION"
    },
    "WEAPON_PIPEBOMB": {
        "Label": "Pipe Bombs",
        "Type": "EXPLOSION"
    },
    "WEAPON_EMPLAUNCHER": {
        "Label": "EMP Launcher",
        "Type": "EXPLOSION"
    },
    "WEAPON_RAILGUNXM3": {
        "Label": "Railgun XM3",
        "Type": "EXPLOSION"
    },
    "WEAPON_SNOWLAUNCHER": {
        "Label": "Snowball Launcher",
        "Type": "EXPLOSION"
    },
    "WEAPON_BZGAS": {
        "Label": "BZ GAS",
        "Type": "GAS"
    },
    "WEAPON_ACIDPACKAGE": {
        "Label": "Acid Package",
        "Type": "GAS"
    },
    "WEAPON_SMOKEGRENADE": {
        "Label": "Tear GAS",
        "Type": "GAS"
    },
    "WEAPON_FIRE": {
        "Label": "Fire",
        "Type": "BURN"
    },
    "WEAPON_MOLOTOV": {
        "Label": "Molotov Cocktail",
        "Type": "BURN"
    },
    "WEAPON_PETROLCAN": {
        "Label": "Jerry Can",
        "Type": "BURN"
    },
    "WEAPON_HAZARDCAN": {
        "Label": "Hazardous Jerry Can",
        "Type": "BURN"
    },
    "WEAPON_FERTILIZERCAN": {
        "Label": "Fertilizer Can",
        "Type": "BURN"
    },
    "WEAPON_FIREWORK": {
        "Label": "Firework Launcher",
        "Type": "BURN"
    },
    "WEAPON_RAMMED_BY_CAR": {
        "Label": "ยานพาหนะชน",
        "Type": "VEHICLE"
    },
    "WEAPON_RUN_OVER_BY_CAR": {
        "Label": "ถูกพาหนะทับ",
        "Type": "VEHICLE"
    },
    "WEAPON_HELI_CRASH": {
        "Label": "เฮลิคอปเตอร์ตก",
        "Type": "VEHICLE"
    },
    "VEHICLE_WEAPON_TANK": {
        "Label": "Tank",
        "Type": "VEHICLE"
    },
    "VEHICLE_WEAPON_ROTORS": {
        "Label": "Rotors",
        "Type": "VEHICLE"
    },
    "VEHICLE_WEAPON_PLAYER_LASER": {
        "Label": "Lasers",
        "Type": "VEHICLE"
    },
    "VEHICLE_WEAPON_SPACE_ROCKET": {
        "Label": "Space Rocket",
        "Type": "VEHICLE"
    },
    "WEAPON_VEHICLE_ROCKET": {
        "Label": "Rocket",
        "Type": "VEHICLE"
    },
    "WEAPON_HIT_BY_WATER_CANNON": {
        "Label": "Water Cannon",
        "Type": "VEHICLE"
    },
    "WEAPON_ANIMAL": {
        "Label": "สัตว์ทำร้าย",
        "Type": "ANIMAL"
    },
    "WEAPON_COUGAR": {
        "Label": "เสือภูเขาทำร้าย",
        "Type": "ANIMAL"
    },
    "WEAPON_DROWNING": {
        "Label": "จมน้ำ",
        "Type": "DROWN"
    },
    "WEAPON_DROWNING_IN_VEHICLE": {
        "Label": "จมน้ำ (ภายในยานพาหนะ)",
        "Type": "DROWN"
    },
    "WEAPON_FALL": {
        "Label": "ตกจากที่สูง",
        "Type": "GENERAL"
    },
    "WEAPON_BLEEDING": {
        "Label": "เลือดออก",
        "Type": "GENERAL"
    },
    "WEAPON_EXHAUSTION": {
        "Label": "ความเหนื่อยล้า",
        "Type": "GENERAL"
    },
    "WEAPON_ELECTRIC_FENCE": {
        "Label": "รั้วไฟฟ้า",
        "Type": "GENERAL"
    },
    "WEAPON_FLARE": {
        "Label": "Flare",
        "Type": "GENERAL"
    },
    "WEAPON_FIREEXTINGUISHER": {
        "Label": "Fire Extinguisher",
        "Type": "GENERAL"
    },
    "OBJECT": {
        "Label": "Object",
        "Type": "GENERAL"
    },
    "WEAPON_HACKINGDEVICE": {
        "Label": "Hacking Device",
        "Type": "GENERAL"
    }
}
```
