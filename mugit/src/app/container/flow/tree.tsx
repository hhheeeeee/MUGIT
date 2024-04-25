import { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function Tree() {
  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    var series = root.container.children.push(
      am5hierarchy.ForceDirected.new(root, {
        downDepth: 1,
        initialDepth: 10,
        topDepth: 0,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        xField: "x",
        yField: "y",
        minRadius: 30,
        manyBodyStrength: -40,
      })
    );

    // Disable circles
    // series.circles.template.set("forceHidden", true);
    // series.outerCircles.template.set("forceHidden", true);

    // Set up labels
    series.labels.template.setAll({
      fill: am5.color(0x000000),
      y: 45,
      //y: am5.percent(10),
      oversizedBehavior: "none",
    });

    series.nodes.template.setup = function (target) {
      target.events.on("dataitemchanged", function (ev) {
        var container = target.children.push(
          am5.Container.new(root, {
            width: 80,
            height: 80,
            centerX: am5.percent(0),
            centerY: am5.percent(0),
          })
        );

        var circleMask = container.children.push(
          am5.Circle.new(root, {
            radius: 40,
            centerX: am5.percent(50),
            centerY: am5.percent(50),
          })
        );

        container.set("mask", circleMask);
        let imageSrc = (ev.target.dataItem?.dataContext as any)?.image;

        if (imageSrc) {
          var icon = container.children.push(
            am5.Picture.new(root, {
              width: 80,
              height: 80,
              centerX: am5.percent(50),
              centerY: am5.percent(50),
              src: imageSrc,
              wheelable: true,
            })
          );
        }
      });
    };

    series.data.setAll([
      {
        name: "Browsers",
        image: "/person.jpg",
        x: am5.percent(50),
        y: am5.percent(50),
        children: [
          {
            name: "Chrome",
            value: 1,
            image: "/Rectangle 35.png",
          },
          {
            name: "Firefox",
            value: 1,
            image: "/Rectangle 35.png",
          },
          {
            name: "Firefox",
            value: 1,
            image: "/Rectangle 35.png",
          },
          {
            name: "Firefox",
            value: 1,
            image: "/Rectangle 35.png",
          },
          {
            name: "HHHHHHHH",
            value: 1,
            image: "/Rectangle 35.png",
            children: [
              {
                name: "Chrome",
                value: 1,
                image: "/Rectangle 35.png",
              },
              {
                name: "Firefox",
                value: 1,
                image: "/Rectangle 35.png",
              },
            ],
          },
        ],
      },
    ]);

    series.set("selectedDataItem", series.dataItems[0]);

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: "900px", height: "500px" }}></div>;
}
