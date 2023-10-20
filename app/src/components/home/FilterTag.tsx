import { Tag, Badge, HStack, TagLabel, TagCloseButton } from "@chakra-ui/react";

const FilterTag = ({
  name,
  field,
  onDelete,
}: {
  name: string;
  field: string;
  onDelete: (key: string) => void;
}) => {
  return (
    <HStack>
      <Tag p="2" variant="subtle" colorScheme="red" rounded="md">
        <TagLabel>
          {field}
          <Badge colorScheme="red" ml="2" p="1">
            {name}
          </Badge>
        </TagLabel>
        <TagCloseButton onClick={() => onDelete(field)} />
      </Tag>
    </HStack>
  );
};

export default FilterTag;
