import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";

export const MyResponsiveBar = (data: any) => {
  data = [
    {
      country: "AD",
      "hot dog": 48,
      "hot dogColor": "hsl(3, 70%, 50%)",
    },
    {
      country: "AE",
      "hot dog": 47,
      "hot dogColor": "hsl(326, 70%, 50%)",
    },
    {
      country: "AF",
      "hot dog": 121,
      "hot dogColor": "hsl(67, 70%, 50%)",
    },
    {
      country: "AG",
      "hot dog": 5,
      "hot dogColor": "hsl(33, 70%, 50%)",
    },
    {
      country: "AI",
      "hot dog": 52,
      "hot dogColor": "hsl(178, 70%, 50%)",
    },
    {
      country: "AL",
      "hot dog": 67,
      "hot dogColor": "hsl(136, 70%, 50%)",
    },
    {
      country: "AM",
      "hot dog": 2,
      "hot dogColor": "hsl(61, 70%, 50%)",
    },
  ];

  return (
    <ResponsiveBar
      data={data}
      keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
      indexBy="country"
      margin={{ top: 50, right: 40, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "food",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    />
  );
};

export const MyResponsivePie = (data: any /* see data tab */) => {
  data = [
    {
      id: "sass",
      label: "sass",
      value: 327,
      color: "hsl(20, 70%, 50%)",
    },
    {
      id: "hack",
      label: "hack",
      value: 479,
      color: "hsl(277, 70%, 50%)",
    },
    {
      id: "make",
      label: "make",
      value: 233,
      color: "hsl(9, 70%, 50%)",
    },
    {
      id: "scala",
      label: "scala",
      value: 276,
      color: "hsl(158, 70%, 50%)",
    },
    {
      id: "javascript",
      label: "javascript",
      value: 170,
      color: "hsl(332, 70%, 50%)",
    },
  ];
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "ruby",
          },
          id: "dots",
        },
        {
          match: {
            id: "c",
          },
          id: "dots",
        },
        {
          match: {
            id: "go",
          },
          id: "dots",
        },
        {
          match: {
            id: "python",
          },
          id: "dots",
        },
        {
          match: {
            id: "scala",
          },
          id: "lines",
        },
        {
          match: {
            id: "lisp",
          },
          id: "lines",
        },
        {
          match: {
            id: "elixir",
          },
          id: "lines",
        },
        {
          match: {
            id: "javascript",
          },
          id: "lines",
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};
