import { PointData } from "@/types";

export function pointToPayload(point: PointData, storyId: number){
    return {
        id: Number(point.id),
        text: point.text?.value,
        story_id: storyId
    }
}