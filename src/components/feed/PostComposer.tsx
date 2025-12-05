import { Box, Button, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { colors } from '@/components/ui/colors';
import { Toaster, toaster } from '@/components/ui/toaster';

const formSchema = z.object({
  content: z.string().min(1),
});

const PostComposer = () => {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<z.infer<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
    }
  );

  const postPost = async ({ content }: { content: string }) => {
    const response = await fetch('http://localhost:4000/api/posts', {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
    return response.json();
  };

  const { mutate: postPostMutation } = useMutation({
    mutationFn: postPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toaster.success({
        title: 'Post created successfully',
      });
      reset();
    },
    onError: (error) => {
      console.error(error);
      toaster.error({
        title: 'Failed to create post',
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    postPostMutation({ content: data.content });
  };

  return (
    <Box
      bg={colors.bgLight}
      color={colors.text}
      border="1px solid"
      borderColor={colors.border}
      borderRadius="md"
      shadow="md"
      w="100%"
      p={6}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          placeholder="What's on your mind?"
          rows={3}
          {...register('content')}
        />
        <Button type="submit">Post</Button>
      </form>
      <Toaster />
    </Box>
  );
};

export default PostComposer;
