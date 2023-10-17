import { EditForm } from "@/schemas";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { FieldPath, useFormContext } from "react-hook-form";

const SettingInputControl = ({
  name,
  label,
}: {
  name: FieldPath<EditForm>;
  label: string;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<EditForm>();
  return (
    <FormControl isInvalid={!!errors[name]}>
      <FormLabel color="blackAlpha.600" htmlFor={name}>
        {label}
      </FormLabel>
      <InputGroup>
        <Input {...register(name)} />
      </InputGroup>
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default SettingInputControl;
