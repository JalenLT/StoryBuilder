import {useMutation, useQueryClient} from "@tanstack/react-query";
import apiClient from "@/api/axios";
import axios from "axios";
import {toast} from "sonner";

export function useUpdateFeatureData(storyId: number){
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async ({id, name = '', description = '', type = ''}: {id: number, name?: string, description?: string, type?: string}) => {
            const response = await apiClient.post(import.meta.env.VITE_APP_URL + '/api/v1/features/update', {
                id,
                name,
                description,
                type,
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