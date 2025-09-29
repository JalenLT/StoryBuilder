import { FeatureData } from "@/types";

export function featureToPayload(feature: FeatureData, storyId: number){
    return {
        id: Number(feature.id),
        name: feature.name?.value,
        type: feature.type?.value,
        description: feature.description?.value,
        story_id: storyId
    }
}