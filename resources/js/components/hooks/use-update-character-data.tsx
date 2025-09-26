import {useMutation, useQueryClient} from "@tanstack/react-query";
import apiClient from "@/api/axios";
import axios from "axios";
import {toast} from "sonner";

export function useUpdateCharacterData(storyId: number){
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async ({id, first_name = '', last_name = '', alias = '', age = undefined, gender = '', description = '', background = '', motivation = ''}: {id: number, first_name?: string, last_name?: string, alias?: string, age?: number, gender?: string, description?: string, background?: string, motivation?: string}) => {
            const response = await apiClient.post(import.meta.env.VITE_APP_URL + '/api/v1/characters/update', {
                id,
                first_name,
                last_name,
                alias,
                age,
                gender,
                description,
                background,
                motivation,
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