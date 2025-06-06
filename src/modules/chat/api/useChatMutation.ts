import { useMutation } from '@tanstack/react-query';
import { fetchOpenAIChat } from './openaiApi';

export function useChatMutation() {
  return useMutation({
    mutationFn: fetchOpenAIChat,
  });
} 