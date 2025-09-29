import { SceneData } from "@/types";

export function sceneToPayload(scene: SceneData, storyId: number){
    return {
        id: Number(scene.id),
        title: scene.title?.value,
        story_id: storyId
    }
}