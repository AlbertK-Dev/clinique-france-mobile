import React, { useState } from "react";
import { Box, Input, Text, VStack, ScrollView, HStack } from "native-base";
import Header from "../../components/Header";
import { styles } from "./styles";
import colors from "../../constants/colours";
import { MagicStar, SearchNormal1, FolderOpen } from "iconsax-react-native";
import { allAstuces } from "../../utils/helper";

const SanteAstucesComponent = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredAstuces, setFilteredAstuces] = useState(allAstuces);
  const [errorMessage, setErrorMessage] = useState("");

  const filterAstuces = (text) => {
    const filtered = allAstuces.filter((section) =>
      section.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredAstuces(filtered);
    setSearchText(text);
    if (filtered.length === 0) {
      setErrorMessage("Aucune spécialité médicale correspondante trouvée.");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <Box h={"100%"}>
      <Header bg={colors.white} title={"Plus de 1000 astuces santé"} />
      <Box style={styles.container}>
        <Input
          placeholder="Rechercher par spécialité médicale..."
          value={searchText}
          onChangeText={filterAstuces}
          variant={"rounded"}
          size={"md"}
          leftElement={
            <SearchNormal1
              style={{ marginLeft: 10 }}
              color={colors.text_grey_hint}
            />
          }
        />
        <ScrollView showsVerticalScrollIndicator={false} marginTop={30}>
          {errorMessage ? (
            <VStack space={3} style={styles.empty}>
              <FolderOpen size={80} color={colors.text_grey_hint} />
              <Text
                style={{ textAlign: "center", color: colors.text_grey_hint }}
              >
                {errorMessage}
              </Text>
            </VStack>
          ) : (
            filteredAstuces.map((section, sectionIndex) => (
              <VStack key={sectionIndex} mt={3}>
                <HStack style={styles.boxSection}>
                  <MagicStar color={colors.primary} />
                    <Text style={styles.title} fontWeight="bold" p={2}>
                      {section.title}
                    </Text>
                </HStack>
                <Box p={1}>
                  {section.content.map((astuce, astuceIndex) => (
                    <VStack
                      style={styles.boxText}
                      key={astuceIndex}
                      my={1}
                      borderRadius="md"
                      bg="white"
                      p={2}
                    >
                  <Box>
                        <Text
                          backgroundColor={"red.200"}
                          style={styles.astuceTilte}
                        >
                         Astuce {astuceIndex + 1}
                        </Text>
                      </Box>
                      <Text style={{ textAlign: "justify" }}>
                        {astuce.body}
                      </Text>
                    </VStack>
                  ))}
                </Box>
              </VStack>
            ))
          )}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default SanteAstucesComponent;
