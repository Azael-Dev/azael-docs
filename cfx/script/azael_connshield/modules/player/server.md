---
sidebar_label: Server
---

# Player (Server-side)

## Player

### getIdentifier

รับตัวระบุของผู้เล่นตามประเภทที่ระบุ

```lua title="บรรทัดที่ 18"
function Player.getIdentifier(playerId, identifierType)
    return GetPlayerIdentifierByType(playerId, identifierType)
end
```

#### Parameters

- playerId: `integer`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น
- identifierType: `string`
    - ประเภทตัวระบุ (`steam`, `discord`, `license`, `license2`, `fivem`, `ip`)

#### Returns

- identifier: `string` | `nil`
    - ตัวระบุที่พบ หรือ `nil` หากไม่พบ

### getIdentifiers

รับตัวระบุทั้งหมดของผู้เล่น

```lua title="บรรทัดที่ 25"
function Player.getIdentifiers(playerId)
    return GetPlayerIdentifiers(playerId)
end
```

#### Parameters

- playerId: `integer`
    - [Net ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น

#### Returns

- identifiers: `string[]`
    - ตัวระบุทั้งหมดของผู้เล่น
