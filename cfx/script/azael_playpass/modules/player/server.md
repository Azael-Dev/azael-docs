---
sidebar_label: Server
---

# Player (Server-side)

## Player

### getIdentifier

ฟังก์ชันรับตัวระบุของผู้เล่น

```lua title="บรรทัดที่ 17"
function Player.getIdentifier(playerId, identifierType)
    return GetPlayerIdentifierByType(playerId, identifierType)
end
```

#### Parameters

- playerId: `integer`
    - [Net ID / Temp ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น
- identifierType: `string`
    - [ประเภทของตัวระบุ](https://docs.fivem.net/docs/scripting-reference/runtimes/lua/functions/GetPlayerIdentifiers/#identifier-types)

#### Returns

- identifier: `string` | `nil`
    - ตัวระบุของผู้เล่น หรือ ไม่มีค่า
