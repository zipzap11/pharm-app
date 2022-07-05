import { StyleSheet } from "react-native";
import React from "react";
import SearchingBar from "../components/SearchingBar";
import Separator from "../components/Separator";
import Banner from "../components/Home/Banner";
import Categories from "../components/Home/Categories";
import Wrapper from "../components/Wrapper";

export default function Home({ navigation }) {
  const handleSearch = (query) => {
    navigation.navigate("Search", { query: query });
  };

  return (
    <Wrapper>
      <SearchingBar onSubmit={handleSearch} />
      <Separator size={15} />
      <Banner />
      <Separator size={15} />
      <Categories />
    </Wrapper>
  );
}

const styles = StyleSheet.create({});
