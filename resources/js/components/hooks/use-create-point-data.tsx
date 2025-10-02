import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/api/axios';
import axios from 'axios';
import { toast } from 'sonner';

export function useCreatePoint(storyId: number){
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async ({text, scene_id}: {text: string, scene_id: number}) => {
            const response = await apiClient.post(import.meta.env.VITE_APP_URL + '/api/v1/points/store', {
                text: text,
                scene_id: scene_id,
                story_id: storyId
            });

            return response.data;
        },
        onSuccess: (newNode) => {
            toast.success(newNode.message);

            qc.invalidateQueries({queryKey: ['story', storyId, 'nodes']});
        },
        onError: (error) => {
            let errorMessage = 'An unexpected error occurred.';
            if (axios.isAxiosError(error) && error.response) {
                errorMessage = error.response.data.message || `Request failed...`;
            }

            toast.error(errorMessage);
        },
    });
}