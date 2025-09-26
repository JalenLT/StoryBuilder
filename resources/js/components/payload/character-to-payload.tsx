import { CharacterData } from "@/types";

export function characterToPayload(character: CharacterData, storyId: number){
    return {
        id: Number(character.id),
        first_name: character.first_name?.value,
        last_name: character.last_name?.value,
        alias: character.alias?.value,
        age: character.age?.value,
        gender: character.gender?.value,
        description: character.description?.value,
        background: character.background?.value,
        motivation: character.motivation?.value,
        story_id: storyId
    }
}