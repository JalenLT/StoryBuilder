import { SettingData } from "@/types";

export function settingToPayload(setting: SettingData, storyId: number){
    return {
        id: Number(setting.id),
        name: setting.name?.value,
        description: setting.description?.value,
        world: setting.world?.value,
        era: setting.era?.value,
        climate: setting.climate?.value,
        story_id: storyId
    }
}