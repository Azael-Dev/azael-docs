---
sidebar_label: Client
---

# Player (Client-side)

## Player

### onFirstSpawn

ฟังก์ชันรับเหตุการณ์การเกิดของตัวละครเมื่อผู้เล่นเข้าสู่เกม

```lua title="บรรทัดที่ 6"
function Player.onFirstSpawn(cb)
    local eventHandler
    
    eventHandler = AddEventHandler('playerSpawned', function()
        RemoveEventHandler(eventHandler)
        cb(true)
    end)
end
```

#### Parameters

- cb: `function`
    - ฟังก์ชันตอบกลับเมื่อผู้เล่นเกิดแล้ว
        - **Arguments**
            - spawned: `boolean`
                - ส่งคืน `true` เมื่อผู้เล่นเกิดแล้ว

### initNewbieLabel

ฟังก์ชันสร้าง[ป้ายกำกับผู้เล่นใหม่](../../config/core.md#newplayerlabel) โดยจะแสดงข้อความบนส่วนหัวของผู้เล่น

```lua title="บรรทัดที่ 29"
function Player.initNewbieLabel(getNewbieState)
    Citizen.CreateThread(function()
        local playerId <const> = PlayerId()
        
        while true do
            local playerCoords <const> = GetEntityCoords(PlayerPedId())
            
            for _, id in ipairs(GetActivePlayers()) do
                if id ~= playerId then
                    if NetworkIsPlayerActive(id) then
                        local isNewbie <const>, createdAgo <const> = getNewbieState(GetPlayerServerId(id))
                        
                        if isNewbie then
                            local targetCoords <const> = GetEntityCoords(GetPlayerPed(id))
                            
                            if #(playerCoords - targetCoords) <= 22 then
                                if not IsMpGamerTagActive(id) and IsMpGamerTagFree(id) then
                                    CreateMpGamerTagWithCrewColor(id, '', false, false, '', 0, 255, 255, 255)
                                end
                                
                                SetMpGamerTagBigText(id, 'NEWBIE')
                                SetMpGamerTagColour(id, 3, 234)
                                SetMpGamerTagVisibility(id, 3, true)
                            elseif IsMpGamerTagActive(id) then
                                SetMpGamerTagVisibility(id, 3, false)
                            end
                        end
                    elseif IsMpGamerTagActive(id) then
                        RemoveMpGamerTag(id)
                    end
                end
            end
            
            Citizen.Wait(1000)
        end
    end)
end
```

#### Parameters

- getNewbieState: `function`
    - ฟังก์ชันรับข้อมูลผู้เล่นใหม่
        - **Arguments**
            - serverId: `integer` | `string`
                - [Server ID](https://docs.fivem.net/docs/scripting-manual/networking/ids/#server-id) ของผู้เล่น
        - **Returns**
            - isNewbie: `boolean`
                - เป็นผู้เล่นใหม่?
            - createdAgo: `integer` | `nil`
                - สร้างบัญชีมาแล้วกี่วินาที (อ้างอิงจากคอลัมน์ [`created_at`](../database/server.md#table-structure) บนฐานข้อมูล)
