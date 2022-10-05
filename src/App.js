import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const App = () => {
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
      count: allIntervals.filter((el) => el === item).length
    };
  });

  useEffect(() => {
    console.log(JSON.stringify(chartData, null, 2));
  }, [chartData]);

  return (
    <View style={styles.app}>
      {chartData.map((item) => (
        <>
          <View
            style={{
              width: 40,
              marginHorizontal: 15,
              backgroundColor: "pink",
              height: item.count * 20
            }}
          >
            <Text style={{}}>{item.count}</Text>
          </View>
          <Text style={{ transform: [{ rotate: "90deg" }], height: 40 }}>
            Range: [{item.key} - {item.key + 1}]
          </Text>
        </>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    flexDirection: "row"
  },
  logo: {
    height: 80
  },
  header: {
    padding: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  text: {
    lineHeight: "1.5em",
    fontSize: "1.125rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  link: {
    color: "#1B95E0"
  },
  code: {
    fontFamily: "monospace, monospace"
  }
});

export default App;
