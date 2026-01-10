---
sidebar_label: RedM
---

# redm.json

ไฟล์การกำหนดค่าของทรัพยากรทางฝั่ง **[Client](https://en.wikipedia.org/wiki/Client-side)**

## RedM Weapons

รายการ **[Weapon](https://www.vespura.com/fivem/weapons/stats/)**, **[Model](https://vespura.com/fivem/objects/)**, **[Object](https://vespura.com/fivem/objects/)** สำหรับ สาเหตุการตาย

<details>
    <summary>คำอธิบายเพิ่มเติมเกี่ยวกับการกำหนดค่า</summary>

สามารถกำหนด **[Key](http://lua-users.org/wiki/TablesTutorial)** สาเหตุการตายเป็น **ชื่อ** หรือ **แฮช** ประเภท **String** ได้

```lua title="Name"
"WEAPON_MELEE_MACHETE": {
    "Label": "Melee Machete,
    "Type": "MELEE"
}
```

```lua title="Hash"
"680856689": {
    "Label": "Melee Machete",
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
    "WEAPON_MELEE_HATCHET_MELEEONLY": {
        "Label": "Melee Hatchet Meleeonly",
        "Type": "MELEE"
    },
    "WEAPON_MELEE_KNIFE_MINER": {
        "Label": "Melee Knife Miner",
        "Type": "MELEE"
    },
    "WEAPON_MELEE_KNIFE_JAWBONE": {
        "Label": "Melee Knife Jawbone",
        "Type": "MELEE"
    },
    "WEAPON_MELEE_KNIFE_VAMPIRE": {
        "Label": "Melee Knife Vampire",
        "Type": "MELEE"
    },
    "WEAPON_MELEE_KNIFE_JOHN": {
        "Label": "Melee Knife John",
        "Type": "MELEE"
    },
    "WEAPON_MELEE_MACHETE": {
        "Label": "Melee Machete",
        "Type": "MELEE"
    },
    "WEAPON_MELEE_KNIFE_BEAR": {
        "Label": "Melee Knife Bear",
        "Type": "MELEE"
    },
    "WEAPON_MELEE_KNIFE_DUTCH": {
        "Label": "Melee Knife Dutch",
        "Type": "MELEE"
    },
    "WEAPON_MELEE_KNIFE_KIERAN": {
        "Label": "Melee Knife Kieran",
        "Type": "MELEE"
    },
    "WEAPON_MELEE_KNIFE_UNCLE": {
        "Label": "Melee Knife Uncle",
        "Type": "MELEE"
    },
    "WEAPON_MELEE_KNIFE_SEAN": {
        "Label": "Melee Knife Sean",
        "Type": "MELEE"
    },
    "WEAPON_MELEE_TORCH": {
        "Label": "Melee Torch",
        "Type": "BURN"
    },
    "WEAPON_MELEE_KNIFE_LENNY": {
        "Label": "Melee Knife Lenny",
        "Type": "MELEE"
    },
    "WEAPON_MELEE_KNIFE_SADIE": {
        "Label": "Melee Knife Sadie",
        "Type": "MELEE"
    },
    "WEAPON_MELEE_KNIFE_CHARLES": {
        "Label": "Melee Knife Charles",
        "Type": "MELEE"
    },
    "WEAPON_MELEE_KNIFE_HOSEA": {
        "Label": "Melee Knife Hosea",
        "Type": "MELEE"
    },
    "WEAPON_MELEE_TORCH_CROWD": {
        "Label": "Melee Torch Crowd",
        "Type": "BURN"
    },
    "WEAPON_MELEE_KNIFE_BILL": {
        "Label": "Melee Knife Bill",
        "Type": "MELEE"
    },
    "WEAPON_MELEE_KNIFE_CIVIL_WAR": {
        "Label": "Melee Knife Civil War",
        "Type": "MELEE"
    },
    "WEAPON_MELEE_KNIFE": {
        "Label": "Melee Knife",
        "Type": "MELEE"
    },
    "WEAPON_MELEE_KNIFE_MICAH": {
        "Label": "Melee Knife Micah",
        "Type": "MELEE"
    },
    "WEAPON_MELEE_BROKEN_SWORD": {
        "Label": "Melee Broken Sword",
        "Type": "MELEE"
    },
    "WEAPON_MELEE_KNIFE_JAVIER": {
        "Label": "Melee Knife Javier",
        "Type": "MELEE"
    },
    "WEAPON_PISTOL_VOLCANIC": {
        "Label": "Pistol Volcanic",
        "Type": "BULLET"
    },
    "WEAPON_PISTOL_MAUSER_DRUNK": {
        "Label": "Pistol Mauser Drunk",
        "Type": "BULLET"
    },
    "WEAPON_PISTOL_M1899": {
        "Label": "Pistol M1899",
        "Type": "BULLET"
    },
    "WEAPON_PISTOL_SEMIAUTO": {
        "Label": "Pistol Semiauto",
        "Type": "BULLET"
    },
    "WEAPON_PISTOL_MAUSER": {
        "Label": "Pistol Mauser",
        "Type": "BULLET"
    },
    "WEAPON_REPEATER_EVANS": {
        "Label": "Repeater Evans",
        "Type": "BULLET"
    },
    "WEAPON_REPEATER_CARBINE_SADIE": {
        "Label": "Repeater Carbine Sadie",
        "Type": "BULLET"
    },
    "WEAPON_REPEATER_HENRY": {
        "Label": "Repeater Henry",
        "Type": "BULLET"
    },
    "WEAPON_REPEATER_WINCHESTER": {
        "Label": "Repeater Winchester",
        "Type": "BULLET"
    },
    "WEAPON_REPEATER_WINCHESTER_JOHN": {
        "Label": "Repeater Winchester John",
        "Type": "BULLET"
    },
    "WEAPON_REPEATER_CARBINE": {
        "Label": "Repeater Carbine",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_DOUBLEACTION_MICAH_DUALWIELD": {
        "Label": "Revolver Doubleaction Micah Dualwield",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_DOUBLEACTION_MICAH": {
        "Label": "Revolver Doubleaction Micah",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_SCHOFIELD_CALLOWAY": {
        "Label": "Revolver Schofield Calloway",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_DOUBLEACTION": {
        "Label": "Revolver Doubleaction",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_CATTLEMAN": {
        "Label": "Revolver Cattleman",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_CATTLEMAN_MEXICAN": {
        "Label": "Revolver Cattleman Mexican",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_CATTLEMAN_HOSEA_DUALWIELD": {
        "Label": "Revolver Cattleman Hosea Dualwield",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_DOUBLEACTION_EXOTIC": {
        "Label": "Revolver Doubleaction Exotic",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_CATTLEMAN_SEAN": {
        "Label": "Revolver Cattleman Sean",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_CATTLEMAN_SADIE": {
        "Label": "Revolver Cattleman Sadie",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_DOUBLEACTION_JAVIER": {
        "Label": "Revolver Doubleaction Javier",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_LEMAT": {
        "Label": "Revolver Lemat",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_SCHOFIELD_BILL": {
        "Label": "Revolver Schofield Bill",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_SCHOFIELD": {
        "Label": "Revolver Schofield",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_CATTLEMAN_SADIE_DUALWIELD": {
        "Label": "Revolver Cattleman Sadie Dualwield",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_DOUBLEACTION_GAMBLER": {
        "Label": "Revolver Doubleaction Gambler",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_CATTLEMAN_KIERAN": {
        "Label": "Revolver Cattleman Kieran",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_SCHOFIELD_UNCLE": {
        "Label": "Revolver Schofield Uncle",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_CATTLEMAN_HOSEA": {
        "Label": "Revolver Cattleman Hosea",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_CATTLEMAN_LENNY": {
        "Label": "Revolver Cattleman Lenny",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_CATTLEMAN_JOHN": {
        "Label": "Revolver Cattleman John",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_SCHOFIELD_DUTCH_DUALWIELD": {
        "Label": "Revolver Schofield Dutch Dualwield",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_SCHOFIELD_GOLDEN": {
        "Label": "Revolver Schofield Golden",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_CATTLEMAN_PIG": {
        "Label": "Revolver Cattleman Pig",
        "Type": "BULLET"
    },
    "WEAPON_REVOLVER_SCHOFIELD_DUTCH": {
        "Label": "Revolver Schofield Dutch",
        "Type": "BULLET"
    },
    "WEAPON_RIFLE_SPRINGFIELD": {
        "Label": "Rifle Springfield",
        "Type": "BULLET"
    },
    "WEAPON_RIFLE_BOLTACTION": {
        "Label": "Rifle Boltaction",
        "Type": "BULLET"
    },
    "WEAPON_RIFLE_BOLTACTION_BILL": {
        "Label": "Rifle Boltaction Bill",
        "Type": "BULLET"
    },
    "WEAPON_RIFLE_VARMINT": {
        "Label": "Rifle Varmint",
        "Type": "BULLET"
    },
    "WEAPON_SHOTGUN_SAWEDOFF": {
        "Label": "Shotgun Sawedoff",
        "Type": "BULLET"
    },
    "WEAPON_SHOTGUN_DOUBLEBARREL_EXOTIC": {
        "Label": "Shotgun Doublebarrel Exotic",
        "Type": "BULLET"
    },
    "WEAPON_SHOTGUN_PUMP": {
        "Label": "Shotgun Pump",
        "Type": "BULLET"
    },
    "WEAPON_SHOTGUN_REPEATING": {
        "Label": "Shotgun Repeating",
        "Type": "BULLET"
    },
    "WEAPON_SHOTGUN_SEMIAUTO": {
        "Label": "Shotgun Semiauto",
        "Type": "BULLET"
    },
    "WEAPON_SHOTGUN_DOUBLEBARREL": {
        "Label": "Shotgun Doublebarrel",
        "Type": "BULLET"
    },
    "WEAPON_SHOTGUN_DOUBLEBARREL_UNCLE": {
        "Label": "Shotgun Doublebarrel Uncle",
        "Type": "BULLET"
    },
    "WEAPON_SHOTGUN_SAWEDOFF_CHARLES": {
        "Label": "Shotgun Sawedoff Charles",
        "Type": "BULLET"
    },
    "WEAPON_SHOTGUN_SEMIAUTO_HOSEA": {
        "Label": "Shotgun Semiauto Hosea",
        "Type": "BULLET"
    },
    "WEAPON_SNIPERRIFLE_ROLLINGBLOCK_LENNY": {
        "Label": "Sniperrifle Rollingblock Lenny",
        "Type": "BULLET"
    },
    "WEAPON_SNIPERRIFLE_ROLLINGBLOCK_EXOTIC": {
        "Label": "Sniperrifle Rollingblock Exotic",
        "Type": "BULLET"
    },
    "WEAPON_SNIPERRIFLE_CARCANO": {
        "Label": "Sniperrifle Carcano",
        "Type": "BULLET"
    },
    "WEAPON_SNIPERRIFLE_ROLLINGBLOCK": {
        "Label": "Sniperrifle Rollingblock",
        "Type": "BULLET"
    },
    "WEAPON_THROWN_DYNAMITE": {
        "Label": "Thrown Dynamite",
        "Type": "EXPLOSION"
    },
    "WEAPON_THROWN_MOLOTOV": {
        "Label": "Thrown Molotov",
        "Type": "EXPLOSION"
    },
    "WEAPON_EXPLOSION": {
        "Label": "Explosion",
        "Type": "EXPLOSION"
    },
    "WEAPON_THROWN_POISONBOTTLE": {
        "Label": "Thrown Poisonbottle",
        "Type": "GAS"
    },
    "WEAPON_FIRE": {
        "Label": "Fire",
        "Type": "BURN"
    },
    "WEAPON_BLEEDING": {
        "Label": "Bleeding",
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
    "WEAPON_WOLF": {
        "Label": "หมาป่า",
        "Type": "ANIMAL"
    },
    "WEAPON_WOLF_MEDIUM": {
        "Label": "หมาป่าขนาดกลาง",
        "Type": "ANIMAL"
    },
    "WEAPON_WOLF_SMALL": {
        "Label": "หมาป่าขนาดเล็ก",
        "Type": "ANIMAL"
    },
    "WEAPON_ALLIGATOR": {
        "Label": "อัลลิเกเตอร์",
        "Type": "ANIMAL"
    },
    "WEAPON_ANIMAL": {
        "Label": "สัตว์",
        "Type": "ANIMAL"
    },
    "WEAPON_BADGER": {
        "Label": "แบดเจอร์",
        "Type": "ANIMAL"
    },
    "WEAPON_BEAR": {
        "Label": "หมี",
        "Type": "ANIMAL"
    },
    "WEAPON_BEAVER": {
        "Label": "บีเวอร์",
        "Type": "ANIMAL"
    },
    "WEAPON_COUGAR": {
        "Label": "เสือภูเขา",
        "Type": "ANIMAL"
    },
    "WEAPON_COYOTE": {
        "Label": "โคโยตี้",
        "Type": "ANIMAL"
    },
    "WEAPON_DEER": {
        "Label": "กวาง",
        "Type": "ANIMAL"
    },
    "WEAPON_FOX": {
        "Label": "สุนัขจิ้งจอก",
        "Type": "ANIMAL"
    },
    "WEAPON_HORSE": {
        "Label": "ม้า",
        "Type": "ANIMAL"
    },
    "WEAPON_MUSKRAT": {
        "Label": "หนูมัสก์แรต",
        "Type": "ANIMAL"
    },
    "WEAPON_RACCOON": {
        "Label": "แรคคูน",
        "Type": "ANIMAL"
    },
    "WEAPON_SNAKE": {
        "Label": "งู",
        "Type": "ANIMAL"
    },
    "WEAPON_DROWNING": {
        "Label": "จมน้ำ",
        "Type": "DROWN"
    },
    "WEAPON_DROWNING_IN_VEHICLE": {
        "Label": "จมน้ำในยานพาหนะ",
        "Type": "DROWN"
    },
    "WEAPON_FALL": {
        "Label": "ตกจากที่สูง",
        "Type": "GENERAL"
    }
}
```
