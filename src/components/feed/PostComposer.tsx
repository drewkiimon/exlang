import { Box, Button, Field, Input, Textarea, VStack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { colors } from '@/components/ui/colors';
import { Toaster, toaster } from '@/components/ui/toaster';
import exlangFetch from '@/utils/exlangFetch';

const formSchema = z.object({
  title: z.string().optional(),
  content: z
    .string()
    .min(64, { message: 'Content must be at least 64 characters' }),
});

const PostComposer = () => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const postPost = async ({
    title,
    content,
  }: {
    title?: string;
    content: string;
  }) => {
    const response = await exlangFetch('/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
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
      form.reset();
    },
    onError: (_error) => {
      toaster.error({
        title: 'Failed to create post',
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    postPostMutation({ title: data.title ?? undefined, content: data.content });
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
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <VStack gap={2}>
            <Field.Root invalid={!!form.formState.errors.title}>
              <Field.Label>Title</Field.Label>
              <Input placeholder="Title" {...form.register('title')} />
            </Field.Root>
            <Field.Root invalid={!!form.formState.errors.content}>
              <Field.Label>Body</Field.Label>
              <Textarea
                placeholder="What's on your mind?"
                rows={6}
                resize="none"
                {...form.register('content')}
              />
              <Field.ErrorText>
                {form.formState.errors.content?.message}
              </Field.ErrorText>
            </Field.Root>
            <Button w="100%" type="submit" bg={colors.primary}>
              Post
            </Button>
          </VStack>
        </form>
      </FormProvider>
      <Toaster />
    </Box>
  );
};

export default PostComposer;
