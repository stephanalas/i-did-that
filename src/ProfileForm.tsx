import { useEffect } from "react";
import { Group, Button, Box, TextInput, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";

type FormProps = {
  handleSubmit: (values: { profile: string }) => void;
  isLoading: boolean;
  clearData: () => void;
};

export default function ProfileForm(props: FormProps) {
  const form = useForm({
    initialValues: {
      profile: "",
    },
    validate: {
      profile: (value) => (!value.length ? "missing github profile" : null),
    },
  });
  const profile = form.values.profile;
  useEffect(() => {
    if (!profile.length) props.clearData();
  }, [profile, props]);
  return (
    <Box maw={600} mx="auto">
      <form onSubmit={form.onSubmit(props.handleSubmit)}>
        <TextInput
          // withAsterisk
          size="lg"
          label="Github profile"
          placeholder="e.g. limberflapjack"
          disabled={props.isLoading}
          {...form.getInputProps("profile")}
        />
        <Group position="center" mt="md" w={"100%"}>
          <Button
            variant="outline"
            uppercase
            size="lg"
            type="submit"
            disabled={props.isLoading}
          >
            {props.isLoading ? <Loader /> : "check repos"}
          </Button>
        </Group>
      </form>
    </Box>
  );
}
