import { Box, Button, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { colors } from '@/components/ui/colors';

const formSchema = z.object({
  content: z.string().min(1),
});

const PostComposer = () => {
  const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
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
    </Box>
  );
};

export default PostComposer;
