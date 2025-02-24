import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import "../../css/WorldMapD3.css";

// Dummy Data using Latitude and Longitude
const dummyData = [
    { latitude: 37.0902, longitude: -95.7129, per_capita_income: 65000, total_debt: 200000, num_credit_cards: 4 },
    { latitude: 56.1304, longitude: -106.3468, per_capita_income: 48000, total_debt: 150000, num_credit_cards: 3 },
    { latitude: 55.3781, longitude: -3.4360, per_capita_income: 42000, total_debt: 120000, num_credit_cards: 2 },
    { latitude: -25.2744, longitude: 133.7751, per_capita_income: 54000, total_debt: 180000, num_credit_cards: 3 },
    { latitude: 36.2048, longitude: 138.2529, per_capita_income: 40000, total_debt: 100000, num_credit_cards: 2 }
];

const WorldMapD3 = () => {
    const svgRef = useRef(null);

    useEffect(() => {
        const drawMap = () => {
            const containerWidth = 800;
            const containerHeight = 450;

            const projection = d3.geoEqualEarth()
                .scale(containerWidth / 5)
                .translate([containerWidth / 2, containerHeight / 2]);

            const path = d3.geoPath().projection(projection);

            const colorScale = d3.scaleQuantize()
                .domain([30000, 70000])
                .range(d3.schemeBlues[5]);

            const bubbleSize = d3.scaleSqrt()
                .domain([100000, 300000])
                .range([5, 20]);

            d3.select(svgRef.current).selectAll("*").remove();

            const svg = d3.select(svgRef.current)
                .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
                .attr("preserveAspectRatio", "xMidYMid meet");

            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            fetch("https://unpkg.com/world-atlas@2.0.2/countries-50m.json")
                .then(res => res.json())
                .then(topojsonData => {
                    const countries = feature(topojsonData, topojsonData.objects.countries).features;

                    svg.selectAll("path")
                        .data(countries)
                        .join("path")
                        .attr("d", path)
                        .attr("fill", "#e0e0e0")
                        .attr("stroke", "#333")
                        .attr("stroke-width", 0.5);

                    svg.selectAll("circle")
                        .data(dummyData)
                        .join("circle")
                        .attr("cx", d => projection([d.longitude, d.latitude])[0])
                        .attr("cy", d => projection([d.longitude, d.latitude])[1])
                        .attr("r", d => bubbleSize(d.total_debt))
                        .attr("fill", d => colorScale(d.per_capita_income))
                        .attr("stroke", "#000")
                        .attr("stroke-width", 0.5)
                        .attr("opacity", 0.75)
                        .on("mouseover", (event, d) => {
                            tooltip.transition()
                                .duration(200)
                                .style("opacity", .9);
                            tooltip.html(`
                                <strong>Coordinates:</strong> ${d.latitude}, ${d.longitude}<br>
                                Per Capita Income: $${d.per_capita_income}<br>
                                Total Debt: $${d.total_debt}<br>
                                Credit Cards: ${d.num_credit_cards}
                            `)
                                .style("left", (event.pageX + 10) + "px")
                                .style("top", (event.pageY - 28) + "px");
                        })
                        .on("mouseout", () => {
                            tooltip.transition()
                                .duration(500)
                                .style("opacity", 0);
                        });
                });
        };

        drawMap();
    }, []);

    return (
        <div className="flex flex-col col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
            <div className="px-5 pt-5">
                <header className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">World Per Capita Income Map</h2>
                </header>
            </div>
            <div className="relative h-[400px] w-full">
                <svg ref={svgRef} className="absolute inset-0 w-full h-full"></svg>
            </div>
        </div>
    );
};

export default WorldMapD3;
