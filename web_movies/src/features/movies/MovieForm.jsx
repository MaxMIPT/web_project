import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Textarea,
  HStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const allGenres = ["Боевик", "Триллер", "Комедия", "Драма"];

const genreColors = {
  Боевик: { text: "orange.500", bg: "orange.100" },
  Триллер: { text: "green.500", bg: "green.100" },
  Комедия: { text: "blue.500", bg: "blue.100" },
  Драма: { text: "gray.800", bg: "gray.200" },
};

export default function MovieForm({
  initialData = {},
  onSave,
  submitLabel = "Добавить фильм",
}) {
  const [title, setTitle] = useState(initialData.title || "");
  const [selectedGenres, setSelectedGenres] = useState(
    initialData.genre ? [initialData.genre] : ["Боевик"]
  );
  const [description, setDescription] = useState(initialData.description || "");
  const [duration, setDuration] = useState(
    initialData.duration !== undefined ? initialData.duration : 0
  );
  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [previewImage, setPreviewImage] = useState(initialData.image || "");

  useEffect(() => {
    if (imageFile) {
      setFileName(imageFile.name);
      const objectUrl = URL.createObjectURL(imageFile);
      setPreviewImage(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setFileName("");
      setPreviewImage(initialData.image || "");
    }
  }, [imageFile, initialData.image]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      genre: selectedGenres[0] || "Боевик",
      description,
      duration: parseInt(duration, 10),
      image: previewImage,
      imageFile,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} maxW="600px">
      <FormControl mb={4} isRequired>
        <Flex align="center">
          <FormLabel minW="130px" m={0} textAlign="right">
            Название
          </FormLabel>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите название"
            ml={4}
          />
        </Flex>
      </FormControl>

      <FormControl mb={4}>
        <Flex align="start">
          <FormLabel minW="130px" m={0} pt={2} textAlign="right">
            Жанр
          </FormLabel>
          <HStack spacing={4} ml={4}>
            {allGenres.map((genre) => {
              const isChecked = selectedGenres.includes(genre);
              return (
                <Checkbox
                  key={genre}
                  isChecked={isChecked}
                  onChange={() => {
                    setSelectedGenres(isChecked ? [] : [genre]);
                  }}
                  sx={{
                    ".chakra-checkbox__control": {
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      borderWidth: "2px",
                      borderColor: genreColors[genre]?.text || "gray.500",
                    },
                    ".chakra-checkbox__control[data-checked]": {
                      bg: genreColors[genre]?.text || "gray.500",
                      borderColor: genreColors[genre]?.text || "gray.500",
                    },
                    ".chakra-checkbox__icon": {
                      color: "white",
                      fontSize: "16px",
                    },
                  }}
                >
                  <Text ml={2}>{genre}</Text>
                </Checkbox>
              );
            })}
          </HStack>
        </Flex>
      </FormControl>

      <FormControl mb={4}>
        <Flex align="center">
          <FormLabel minW="130px" m={0} textAlign="right">
            Длительность
          </FormLabel>
          <HStack ml={4}>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="0"
              min={0}
              max={1000}
              w="100px"
            />
            <Text>мин.</Text>
          </HStack>
        </Flex>
      </FormControl>

      <FormControl mb={4}>
        <Flex align="start">
          <FormLabel minW="130px" m={0} pt={2} textAlign="right">
            Описание
          </FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Введите описание"
            ml={4}
          />
        </Flex>
      </FormControl>

      <FormControl mb={6}>
        <Flex align="center">
          <FormLabel minW="130px" m={0} textAlign="right">
            Фото
          </FormLabel>
          <HStack ml={4}>
            <Button
              as="label"
              bg="gray.100"
              color="black"
              border="1px solid black"
              cursor="pointer"
              _hover={{ bg: "gray.200" }}
            >
              Выбрать файл
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setImageFile(file || null);
                }}
                hidden
              />
            </Button>
            <Text
              fontSize="sm"
              border="1px solid black"
              px={3}
              py={1}
              borderRadius="md"
              bg="transparent"
            >
              {fileName || initialData.image || ""}
            </Text>
          </HStack>
        </Flex>
      </FormControl>

      <Flex pl="146px">
        <Button
          type="submit"
          bg="blue.500"
          color="white"
          _hover={{ bg: "blue.600" }}
        >
          {submitLabel}
        </Button>
      </Flex>
    </Box>
  );
}
