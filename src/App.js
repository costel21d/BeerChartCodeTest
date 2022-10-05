import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useWindowDimensions } from "react-native-web";

const App = () => {
  const { height, width } = useWindowDimensions();
  const [workData, setWorkData] = useState([]);

  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers")
      .then((resp) => resp.json())
      .then((data) => setWorkData(data.map((item) => item.abv)));
  }, []);

  const allIntervals = workData.map((item) => Math.floor(item));
  const allUniqueIntervals = [...new Set(allIntervals)];

  const chartData = allUniqueIntervals.map((item) => {
    return {
      key: item,
      count: allIntervals.filter((el) => el === item).length,
    };
  });

  useEffect(() => {
    console.log(JSON.stringify(chartData, null, 2));
  }, [chartData]);

  return (
    <SafeAreaView
      style={{ backgroundColor: "rgba(240, 240, 240, 0.5)", height }}
    >
      <View
        style={{
          ...styles.app,
          borderWidth: 1,
          flex: 1,
          alignItems: "flex-end",
        }}
      >
        {chartData.map((item) => (
          <View style={{ borderWidth: 0 }}>
            <Text
              style={{
                width: 140,
                textAlign: "center",
              }}
            >
              Range: [{item.key} - {item.key + 1}] - {item.count}
            </Text>
            <View
              style={{
                marginHorizontal: 15,
                backgroundColor: "pink",
                height: item.count * 100,
              }}
            ></View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    flexDirection: "row",
  },
});

export default App;
