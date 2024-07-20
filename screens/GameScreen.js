import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  Text,
  Dimensions,
  SafeAreaView,
} from "react-native";
import Svg, { Circle, Line, Polygon } from "react-native-svg";

var halfWidth = Math.round(Dimensions.get("window").width) / 2;
var halfHeight = Math.round(Dimensions.get("window").height) / 2.5;

const hexGrid = [
  [
    { x: halfWidth - 72, y: halfHeight - 135, id: "0-0" },
    { x: halfWidth - 24, y: halfHeight - 135, id: "0-1" },
    { x: halfWidth + 24, y: halfHeight - 135, id: "0-2" },
    { x: halfWidth + 72, y: halfHeight - 135, id: "0-3" },
  ],
  [
    { x: halfWidth - 96, y: halfHeight - 90, id: "1-0" },
    { x: halfWidth - 48, y: halfHeight - 90, id: "1-1" },
    { x: halfWidth, y: halfHeight - 90, id: "1-2" },
    { x: halfWidth + 48, y: halfHeight - 90, id: "1-3" },
    { x: halfWidth + 96, y: halfHeight - 90, id: "1-4" },
  ],
  [
    { x: halfWidth - 120, y: halfHeight - 45, id: "2-0" },
    { x: halfWidth - 72, y: halfHeight - 45, id: "2-1" },
    { x: halfWidth - 24, y: halfHeight - 45, id: "2-2" },
    { x: halfWidth + 24, y: halfHeight - 45, id: "2-3" },
    { x: halfWidth + 72, y: halfHeight - 45, id: "2-4" },
    { x: halfWidth + 120, y: halfHeight - 45, id: "2-5" },
  ],
  [
    { x: halfWidth - 144, y: halfHeight, id: "3-0" },
    { x: halfWidth - 96, y: halfHeight, id: "3-1" },
    { x: halfWidth - 48, y: halfHeight, id: "3-2" },
    { x: halfWidth, y: halfHeight, id: "3-3" },
    { x: halfWidth + 48, y: halfHeight, id: "3-4" },
    { x: halfWidth + 96, y: halfHeight, id: "3-5" },
    { x: halfWidth + 144, y: halfHeight, id: "3-6" },
  ],
  [
    { x: halfWidth - 120, y: halfHeight + 45, id: "4-0" },
    { x: halfWidth - 72, y: halfHeight + 45, id: "4-1" },
    { x: halfWidth - 24, y: halfHeight + 45, id: "4-2" },
    { x: halfWidth + 24, y: halfHeight + 45, id: "4-3" },
    { x: halfWidth + 72, y: halfHeight + 45, id: "4-4" },
    { x: halfWidth + 120, y: halfHeight + 45, id: "4-5" },
  ],
  [
    { x: halfWidth - 96, y: halfHeight + 90, id: "5-0" },
    { x: halfWidth - 48, y: halfHeight + 90, id: "5-1" },
    { x: halfWidth, y: halfHeight + 90, id: "5-2" },
    { x: halfWidth + 48, y: halfHeight + 90, id: "5-3" },
    { x: halfWidth + 96, y: halfHeight + 90, id: "5-4" },
  ],
  [
    { x: halfWidth - 72, y: halfHeight + 135, id: "6-0" },
    { x: halfWidth - 24, y: halfHeight + 135, id: "6-1" },
    { x: halfWidth + 24, y: halfHeight + 135, id: "6-2" },
    { x: halfWidth + 72, y: halfHeight + 135, id: "6-3" },
  ],
];

const triangles = [
  [
    {
      points:
        [hexGrid[0][0].x, hexGrid[0][0].y + 15].join(",") +
        " " +
        [hexGrid[1][0].x + 10, hexGrid[1][0].y - 10].join(",") +
        " " +
        [hexGrid[1][1].x - 10, hexGrid[1][1].y - 10].join(","),
      id: "0-0+1-0+1-1",
      position: ["0-0", "1-0", "1-1"],
    },
    {
      points:
        [hexGrid[1][1].x, hexGrid[1][1].y - 15].join(",") +
        " " +
        [hexGrid[0][0].x + 10, hexGrid[0][0].y + 10].join(",") +
        " " +
        [hexGrid[0][1].x - 10, hexGrid[0][1].y + 10].join(","),
      id: "0-0+0-1+1-1",
      position: ["0-0", "0-1", "1-1"],
    },
    {
      points:
        [hexGrid[0][1].x, hexGrid[0][1].y + 15].join(",") +
        " " +
        [hexGrid[1][1].x + 10, hexGrid[1][1].y - 10].join(",") +
        " " +
        [hexGrid[1][2].x - 10, hexGrid[1][2].y - 10].join(","),
      id: "0-1+1-1+1-2",
      position: ["0-1", "1-1", "1-2"],
    },
    {
      points:
        [hexGrid[1][2].x, hexGrid[1][2].y - 15].join(",") +
        " " +
        [hexGrid[0][1].x + 10, hexGrid[0][1].y + 10].join(",") +
        " " +
        [hexGrid[0][2].x - 10, hexGrid[0][2].y + 10].join(","),
      id: "1-2+0-1+0-2",
      position: ["1-2", "0-1", "0-2"],
    },
    {
      points:
        [hexGrid[0][2].x, hexGrid[0][2].y + 15].join(",") +
        " " +
        [hexGrid[1][2].x + 10, hexGrid[1][2].y - 10].join(",") +
        " " +
        [hexGrid[1][3].x - 10, hexGrid[1][3].y - 10].join(","),
      id: "0-2+1-2+1-3",
      position: ["0-2", "1-2", "1-3"],
    },
    {
      points:
        [hexGrid[1][3].x, hexGrid[1][3].y - 15].join(",") +
        " " +
        [hexGrid[0][2].x + 10, hexGrid[0][2].y + 10].join(",") +
        " " +
        [hexGrid[0][3].x - 10, hexGrid[0][3].y + 10].join(","),
      id: "1-3+0-2+0-3",
      position: ["1-3", "0-2", "0-3"],
    },
    {
      points:
        [hexGrid[0][3].x, hexGrid[0][3].y + 15].join(",") +
        " " +
        [hexGrid[1][3].x + 10, hexGrid[1][3].y - 10].join(",") +
        " " +
        [hexGrid[1][4].x - 10, hexGrid[1][4].y - 10].join(","),
      id: "0-3+1-3+1-4",
      position: ["0-3", "1-3", "1-4"],
    },
  ],
  [
    {
      points:
        [hexGrid[1][0].x, hexGrid[1][0].y + 15].join(",") +
        " " +
        [hexGrid[2][0].x + 10, hexGrid[2][0].y - 10].join(",") +
        " " +
        [hexGrid[2][1].x - 10, hexGrid[2][1].y - 10].join(","),
      id: "1-0+2-0+2-1",
      position: ["1-0", "2-0", "2-1"],
    },
    {
      points:
        [hexGrid[2][1].x, hexGrid[2][1].y - 15].join(",") +
        " " +
        [hexGrid[1][0].x + 10, hexGrid[1][0].y + 10].join(",") +
        " " +
        [hexGrid[1][1].x - 10, hexGrid[1][1].y + 10].join(","),
      id: "2-1+1-0+1-1",
      position: ["2-1", "1-0", "1-1"],
    },
    {
      points:
        [hexGrid[1][1].x, hexGrid[1][1].y + 15].join(",") +
        " " +
        [hexGrid[2][1].x + 10, hexGrid[2][1].y - 10].join(",") +
        " " +
        [hexGrid[2][2].x - 10, hexGrid[2][2].y - 10].join(","),
      id: "1-1+2-1+2-2",
      position: ["1-1", "2-1", "2-2"],
    },
    {
      points:
        [hexGrid[2][2].x, hexGrid[2][2].y - 15].join(",") +
        " " +
        [hexGrid[1][1].x + 10, hexGrid[1][1].y + 10].join(",") +
        " " +
        [hexGrid[1][2].x - 10, hexGrid[1][2].y + 10].join(","),
      id: "2-2+1-1+1-2",
      position: ["2-2", "1-1", "1-2"],
    },
    {
      points:
        [hexGrid[1][2].x, hexGrid[1][2].y + 15].join(",") +
        " " +
        [hexGrid[2][2].x + 10, hexGrid[2][2].y - 10].join(",") +
        " " +
        [hexGrid[2][3].x - 10, hexGrid[2][3].y - 10].join(","),
      id: "1-2+2-2+2-3",
      position: ["1-2", "2-2", "2-3"],
    },
    {
      points:
        [hexGrid[2][3].x, hexGrid[2][3].y - 15].join(",") +
        " " +
        [hexGrid[1][2].x + 10, hexGrid[1][2].y + 10].join(",") +
        " " +
        [hexGrid[1][3].x - 10, hexGrid[1][3].y + 10].join(","),
      id: "2-3+1-2+1-3",
      position: ["2-3", "1-2", "1-3"],
    },
    {
      points:
        [hexGrid[1][3].x, hexGrid[1][3].y + 15].join(",") +
        " " +
        [hexGrid[2][3].x + 10, hexGrid[2][3].y - 10].join(",") +
        " " +
        [hexGrid[2][4].x - 10, hexGrid[2][4].y - 10].join(","),
      id: "1-3+2-3+2-4",
      position: ["1-3", "2-3", "2-4"],
    },

    {
      points:
        [hexGrid[2][4].x, hexGrid[2][4].y - 15].join(",") +
        " " +
        [hexGrid[1][3].x + 10, hexGrid[1][3].y + 10].join(",") +
        " " +
        [hexGrid[1][4].x - 10, hexGrid[1][4].y + 10].join(","),
      id: "2-4+1-3+1-4",
      position: ["2-4", "1-3", "1-4"],
    },
    {
      points:
        [hexGrid[1][4].x, hexGrid[1][4].y + 15].join(",") +
        " " +
        [hexGrid[2][4].x + 10, hexGrid[2][4].y - 10].join(",") +
        " " +
        [hexGrid[2][5].x - 10, hexGrid[2][5].y - 10].join(","),
      id: "1-4+2-4+2-5",
      position: ["1-4", "2-4", "2-5"],
    },
  ],
  [
    {
      points:
        [hexGrid[2][0].x, hexGrid[2][0].y + 15].join(",") +
        " " +
        [hexGrid[3][0].x + 10, hexGrid[3][0].y - 10].join(",") +
        " " +
        [hexGrid[3][1].x - 10, hexGrid[3][1].y - 10].join(","),
      id: "2-0+3-0+3-1",
      position: ["2-0", "3-0", "3-1"],
    },
    {
      points:
        [hexGrid[3][1].x, hexGrid[3][1].y - 15].join(",") +
        " " +
        [hexGrid[2][0].x + 10, hexGrid[2][0].y + 10].join(",") +
        " " +
        [hexGrid[2][1].x - 10, hexGrid[2][1].y + 10].join(","),
      id: "3-1+2-0+2-1",
      position: ["3-1", "2-0", "2-1"],
    },
    {
      points:
        [hexGrid[2][1].x, hexGrid[2][1].y + 15].join(",") +
        " " +
        [hexGrid[3][1].x + 10, hexGrid[3][1].y - 10].join(",") +
        " " +
        [hexGrid[3][2].x - 10, hexGrid[3][2].y - 10].join(","),
      id: "2-1+3-1+3-2",
      position: ["2-1", "3-1", "3-2"],
    },
    {
      points:
        [hexGrid[3][2].x, hexGrid[3][2].y - 15].join(",") +
        " " +
        [hexGrid[2][1].x + 10, hexGrid[2][1].y + 10].join(",") +
        " " +
        [hexGrid[2][2].x - 10, hexGrid[2][2].y + 10].join(","),
      id: "3-2+2-1+2-2",
      position: ["3-2", "2-1", "2-2"],
    },
    {
      points:
        [hexGrid[2][2].x, hexGrid[2][2].y + 15].join(",") +
        " " +
        [hexGrid[3][2].x + 10, hexGrid[3][2].y - 10].join(",") +
        " " +
        [hexGrid[3][3].x - 10, hexGrid[3][3].y - 10].join(","),
      id: "2-2+3-2+3-3",
      position: ["2-2", "3-2", "3-3"],
    },
    {
      points:
        [hexGrid[3][3].x, hexGrid[3][3].y - 15].join(",") +
        " " +
        [hexGrid[2][2].x + 10, hexGrid[2][2].y + 10].join(",") +
        " " +
        [hexGrid[2][3].x - 10, hexGrid[2][3].y + 10].join(","),
      id: "3-3+2-2+2-3",
      position: ["3-3", "2-2", "2-3"],
    },
    {
      points:
        [hexGrid[2][3].x, hexGrid[2][3].y + 15].join(",") +
        " " +
        [hexGrid[3][3].x + 10, hexGrid[3][3].y - 10].join(",") +
        " " +
        [hexGrid[3][4].x - 10, hexGrid[3][4].y - 10].join(","),
      id: "2-3+3-3+3-4",
      position: ["2-3", "3-3", "3-4"],
    },
    {
      points:
        [hexGrid[3][4].x, hexGrid[3][4].y - 15].join(",") +
        " " +
        [hexGrid[2][3].x + 10, hexGrid[2][3].y + 10].join(",") +
        " " +
        [hexGrid[2][4].x - 10, hexGrid[2][4].y + 10].join(","),
      id: "3-4+2-3+2-4",
      position: ["3-4", "2-3", "2-4"],
    },
    {
      points:
        [hexGrid[2][4].x, hexGrid[2][4].y + 15].join(",") +
        " " +
        [hexGrid[3][4].x + 10, hexGrid[3][4].y - 10].join(",") +
        " " +
        [hexGrid[3][5].x - 10, hexGrid[3][5].y - 10].join(","),
      id: "2-4+3-4+3-5",
      position: ["2-4", "3-4", "3-5"],
    },
    {
      points:
        [hexGrid[3][5].x, hexGrid[3][5].y - 15].join(",") +
        " " +
        [hexGrid[2][4].x + 10, hexGrid[2][4].y + 10].join(",") +
        " " +
        [hexGrid[2][5].x - 10, hexGrid[2][5].y + 10].join(","),
      id: "3-5+2-4+2-5",
      position: ["3-5", "2-4", "2-5"],
    },
    {
      points:
        [hexGrid[2][5].x, hexGrid[2][5].y + 15].join(",") +
        " " +
        [hexGrid[3][5].x + 10, hexGrid[3][5].y - 10].join(",") +
        " " +
        [hexGrid[3][6].x - 10, hexGrid[3][6].y - 10].join(","),
      id: "2-5+3-5+3-6",
      position: ["2-5", "3-5", "3-6"],
    },
  ],
  [
    {
      points:
        [hexGrid[4][0].x, hexGrid[4][0].y - 15].join(",") +
        " " +
        [hexGrid[3][0].x + 10, hexGrid[3][0].y + 10].join(",") +
        " " +
        [hexGrid[3][1].x - 10, hexGrid[3][1].y + 10].join(","),
      id: "4-0+3-0+3-1",
      position: ["4-0", "3-0", "3-1"],
    },
    {
      points:
        [hexGrid[3][1].x, hexGrid[3][1].y + 15].join(",") +
        " " +
        [hexGrid[4][0].x + 10, hexGrid[4][0].y - 10].join(",") +
        " " +
        [hexGrid[4][1].x - 10, hexGrid[4][1].y - 10].join(","),
      id: "3-1+4-0+4-1",
      position: ["3-1", "4-0", "4-1"],
    },
    {
      points:
        [hexGrid[4][1].x, hexGrid[4][1].y - 15].join(",") +
        " " +
        [hexGrid[3][1].x + 10, hexGrid[3][1].y + 10].join(",") +
        " " +
        [hexGrid[3][2].x - 10, hexGrid[3][2].y + 10].join(","),
      id: "4-1+3-1+3-2",
      position: ["4-1", "3-1", "3-2"],
    },
    {
      points:
        [hexGrid[3][2].x, hexGrid[3][2].y + 15].join(",") +
        " " +
        [hexGrid[4][1].x + 10, hexGrid[4][1].y - 10].join(",") +
        " " +
        [hexGrid[4][2].x - 10, hexGrid[4][2].y - 10].join(","),
      id: "3-2+4-1+4-2",
      position: ["3-2", "4-1", "4-2"],
    },
    {
      points:
        [hexGrid[4][2].x, hexGrid[4][2].y - 15].join(",") +
        " " +
        [hexGrid[3][2].x + 10, hexGrid[3][2].y + 10].join(",") +
        " " +
        [hexGrid[3][3].x - 10, hexGrid[3][3].y + 10].join(","),
      id: "4-2+3-2+3-3",
      position: ["4-2", "3-2", "3-3"],
    },
    {
      points:
        [hexGrid[3][3].x, hexGrid[3][3].y + 15].join(",") +
        " " +
        [hexGrid[4][2].x + 10, hexGrid[4][2].y - 10].join(",") +
        " " +
        [hexGrid[4][3].x - 10, hexGrid[4][3].y - 10].join(","),
      id: "3-3+4-2+4-3",
      position: ["3-3", "4-2", "4-3"],
    },
    {
      points:
        [hexGrid[4][3].x, hexGrid[4][3].y - 15].join(",") +
        " " +
        [hexGrid[3][3].x + 10, hexGrid[3][3].y + 10].join(",") +
        " " +
        [hexGrid[3][4].x - 10, hexGrid[3][4].y + 10].join(","),
      id: "4-3+3-3+3-4",
      position: ["4-3", "3-3", "3-4"],
    },
    {
      points:
        [hexGrid[3][4].x, hexGrid[3][4].y + 15].join(",") +
        " " +
        [hexGrid[4][3].x + 10, hexGrid[4][3].y - 10].join(",") +
        " " +
        [hexGrid[4][4].x - 10, hexGrid[4][4].y - 10].join(","),
      id: "3-4+4-3+4-4",
      position: ["3-4", "4-3", "4-4"],
    },
    {
      points:
        [hexGrid[4][4].x, hexGrid[4][4].y - 15].join(",") +
        " " +
        [hexGrid[3][4].x + 10, hexGrid[3][4].y + 10].join(",") +
        " " +
        [hexGrid[3][5].x - 10, hexGrid[3][5].y + 10].join(","),
      id: "4-4+3-4+3-5",
      position: ["4-4", "3-4", "3-5"],
    },
    {
      points:
        [hexGrid[3][5].x, hexGrid[3][5].y + 15].join(",") +
        " " +
        [hexGrid[4][4].x + 10, hexGrid[4][4].y - 10].join(",") +
        " " +
        [hexGrid[4][5].x - 10, hexGrid[4][5].y - 10].join(","),
      id: "3-5+4-4+4-5",
      position: ["3-5", "4-4", "4-5"],
    },
    {
      points:
        [hexGrid[4][5].x, hexGrid[4][5].y - 15].join(",") +
        " " +
        [hexGrid[3][5].x + 10, hexGrid[3][5].y + 10].join(",") +
        " " +
        [hexGrid[3][6].x - 10, hexGrid[3][6].y + 10].join(","),
      id: "4-5+3-5+3-6",
      position: ["4-5", "3-5", "3-6"],
    },
  ],
  [
    {
      points:
        [hexGrid[5][0].x, hexGrid[5][0].y - 15].join(",") +
        " " +
        [hexGrid[4][0].x + 10, hexGrid[4][0].y + 10].join(",") +
        " " +
        [hexGrid[4][1].x - 10, hexGrid[4][1].y + 10].join(","),
      id: "5-0+4-0+4-1",
      position: ["5-0", "4-0", "4-1"],
    },
    {
      points:
        [hexGrid[4][1].x, hexGrid[4][1].y + 15].join(",") +
        " " +
        [hexGrid[5][0].x + 10, hexGrid[5][0].y - 10].join(",") +
        " " +
        [hexGrid[5][1].x - 10, hexGrid[5][1].y - 10].join(","),
      id: "4-1+5-0+5-1",
      position: ["4-1", "5-0", "5-1"],
    },
    {
      points:
        [hexGrid[5][1].x, hexGrid[5][1].y - 15].join(",") +
        " " +
        [hexGrid[4][1].x + 10, hexGrid[4][1].y + 10].join(",") +
        " " +
        [hexGrid[4][2].x - 10, hexGrid[4][2].y + 10].join(","),
      id: "5-1+4-1+4-2",
      position: ["5-1", "4-1", "4-2"],
    },
    {
      points:
        [hexGrid[4][2].x, hexGrid[4][2].y + 15].join(",") +
        " " +
        [hexGrid[5][1].x + 10, hexGrid[5][1].y - 10].join(",") +
        " " +
        [hexGrid[5][2].x - 10, hexGrid[5][2].y - 10].join(","),
      id: "4-2+5-1+5-2",
      position: ["4-2", "5-1", "5-2"],
    },
    {
      points:
        [hexGrid[5][2].x, hexGrid[5][2].y - 15].join(",") +
        " " +
        [hexGrid[4][2].x + 10, hexGrid[4][2].y + 10].join(",") +
        " " +
        [hexGrid[4][3].x - 10, hexGrid[4][3].y + 10].join(","),
      id: "5-2+4-2+4-3",
      position: ["5-2", "4-2", "4-3"],
    },
    {
      points:
        [hexGrid[4][3].x, hexGrid[4][3].y + 15].join(",") +
        " " +
        [hexGrid[5][2].x + 10, hexGrid[5][2].y - 10].join(",") +
        " " +
        [hexGrid[5][3].x - 10, hexGrid[5][3].y - 10].join(","),
      id: "4-3+5-2+5-3",
      position: ["4-3", "5-2", "5-3"],
    },
    {
      points:
        [hexGrid[5][3].x, hexGrid[5][3].y - 15].join(",") +
        " " +
        [hexGrid[4][3].x + 10, hexGrid[4][3].y + 10].join(",") +
        " " +
        [hexGrid[4][4].x - 10, hexGrid[4][4].y + 10].join(","),
      id: "5-3+4-3+4-4",
      position: ["5-3", "4-3", "4-4"],
    },

    {
      points:
        [hexGrid[4][4].x, hexGrid[4][4].y + 15].join(",") +
        " " +
        [hexGrid[5][3].x + 10, hexGrid[5][3].y - 10].join(",") +
        " " +
        [hexGrid[5][4].x - 10, hexGrid[5][4].y - 10].join(","),
      id: "4-4+5-3+5-4",
      position: ["4-4", "5-3", "5-4"],
    },
    {
      points:
        [hexGrid[5][4].x, hexGrid[5][4].y - 15].join(",") +
        " " +
        [hexGrid[4][4].x + 10, hexGrid[4][4].y + 10].join(",") +
        " " +
        [hexGrid[4][5].x - 10, hexGrid[4][5].y + 10].join(","),
      id: "5-4+4-4+4-5",
      position: ["5-4", "4-4", "4-5"],
    },
  ],
  [
    {
      points:
        [hexGrid[6][0].x, hexGrid[6][0].y - 15].join(",") +
        " " +
        [hexGrid[5][0].x + 10, hexGrid[5][0].y + 10].join(",") +
        " " +
        [hexGrid[5][1].x - 10, hexGrid[5][1].y + 10].join(","),
      id: "6-0+5-0+5-1",
      position: ["6-0", "5-0", "5-1"],
    },
    {
      points:
        [hexGrid[5][1].x, hexGrid[5][1].y + 15].join(",") +
        " " +
        [hexGrid[6][0].x + 10, hexGrid[6][0].y - 10].join(",") +
        " " +
        [hexGrid[6][1].x - 10, hexGrid[6][1].y - 10].join(","),
      id: "5-1+6-0+6-1",
      position: ["5-1", "6-0", "6-1"],
    },
    {
      points:
        [hexGrid[6][1].x, hexGrid[6][1].y - 15].join(",") +
        " " +
        [hexGrid[5][1].x + 10, hexGrid[5][1].y + 10].join(",") +
        " " +
        [hexGrid[5][2].x - 10, hexGrid[5][2].y + 10].join(","),
      id: "6-1+5-1+5-2",
      position: ["6-1", "5-1", "5-2"],
    },
    {
      points:
        [hexGrid[5][2].x, hexGrid[5][2].y + 15].join(",") +
        " " +
        [hexGrid[6][1].x + 10, hexGrid[6][1].y - 10].join(",") +
        " " +
        [hexGrid[6][2].x - 10, hexGrid[6][2].y - 10].join(","),
      id: "5-2+6-1+6-2",
      position: ["5-2", "6-1", "6-2"],
    },
    {
      points:
        [hexGrid[6][2].x, hexGrid[6][2].y - 15].join(",") +
        " " +
        [hexGrid[5][2].x + 10, hexGrid[5][2].y + 10].join(",") +
        " " +
        [hexGrid[5][3].x - 10, hexGrid[5][3].y + 10].join(","),
      id: "6-2+5-2+5-3",
      position: ["6-2", "5-2", "5-3"],
    },
    {
      points:
        [hexGrid[5][3].x, hexGrid[5][3].y + 15].join(",") +
        " " +
        [hexGrid[6][2].x + 10, hexGrid[6][2].y - 10].join(",") +
        " " +
        [hexGrid[6][3].x - 10, hexGrid[6][3].y - 10].join(","),
      id: "5-3+6-2+6-3",
      position: ["5-3", "6-2", "6-3"],
    },
    {
      points:
        [hexGrid[6][3].x, hexGrid[6][3].y - 15].join(",") +
        " " +
        [hexGrid[5][3].x + 10, hexGrid[5][3].y + 10].join(",") +
        " " +
        [hexGrid[5][4].x - 10, hexGrid[5][4].y + 10].join(","),
      id: "6-3+5-3+5-4",
      position: ["6-3", "5-3", "5-4"],
    },
  ],
];

export default function GameScreen() {
  const [rubberBands, setRubberBands] = useState([]);
  const [currentBand, setCurrentBand] = useState([]);
  const [message, setMessage] = useState("");
  const [connectedRods, setConnectedRods] = useState([]);
  const [triangleColors, setTriangleColors] = useState(
    triangles
      .flat()
      .reduce((acc, point) => ({ ...acc, [point.id]: "#f5f5f5" }), {})
  );
  const [firstPlayerTurn, setFirstPlayerTurn] = useState(true);
  const firstPlayerColor = "#e55a53";
  const secondPlayerColor = "#2394d2";

  const countValues = (obj, value) => {
    return Object.values(obj).reduce((acc, curr) => {
      return curr === value ? acc + 1 : acc;
    }, 0);
  };

  function isStraightLine(points) {
    if (points.length < 2) return true;

    let dx = points[1].x - points[0].x;
    let dy = points[1].y - points[0].y;
    let initialSlope = dy / dx;

    for (let i = 1; i < points.length - 1; i++) {
      dx = points[i + 1].x - points[i].x;
      dy = points[i + 1].y - points[i].y;
      let slope = dy / dx;

      if (slope !== initialSlope) {
        return false;
      }
    }

    return true;
  }

  const isHorizontalOrDiagonal = (start, end) => {
    const dx = Math.abs(start.x - end.x);
    const dy = Math.abs(start.y - end.y);
    return dx === dy || dy === 0 || dy === 45;
  };

  const changeTriangleColorById = (ids, color) => {
    const newColors = { ...triangleColors };
    ids.forEach((id) => {
      if (
        newColors[id] &&
        newColors[id] != firstPlayerColor &&
        newColors[id] != secondPlayerColor
      ) {
        newColors[id] = color;
      }
    });

    if (newColors) {
      setTriangleColors(newColors);
    }
  };

  const checkDuplicateLine = (newLine, lines) => {
    newLine = newLine.map((item) => item.id);
    const sortedNewLine = newLine.slice().sort().join(",");
    const seen = new Set(lines.map((line) => line.slice().sort().join(",")));

    if (seen.has(sortedNewLine)) {
      return true;
    } else {
      return false;
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (e, gestureState) => {
      const { locationX, locationY } = e.nativeEvent;
      const startPoint = hexGrid
        .flat()
        .find(
          (point) =>
            Math.abs(point.x - locationX) < 20 &&
            Math.abs(point.y - locationY) < 20
        );
      if (startPoint) {
        setCurrentBand([startPoint]);
      }
    },
    onPanResponderMove: (e, gestureState) => {
      if (currentBand.length > 0) {
        const { locationX, locationY } = e.nativeEvent;
        const nextPoint = hexGrid
          .flat()
          .find(
            (point) =>
              Math.abs(point.x - locationX) < 20 &&
              Math.abs(point.y - locationY) < 20 &&
              !currentBand.some((p) => p.id === point.id)
          );
        if (
          nextPoint &&
          isHorizontalOrDiagonal(currentBand[currentBand.length - 1], nextPoint)
        ) {
          setCurrentBand([...currentBand, nextPoint]);
        }
      }
    },
    onPanResponderRelease: () => {
      if (
        currentBand.length === 4 &&
        isStraightLine(currentBand) &&
        !checkDuplicateLine(currentBand, connectedRods)
      ) {
        setRubberBands([...rubberBands, currentBand]);
        setConnectedRods([...connectedRods, currentBand.map((p) => p.id)]);
        setFirstPlayerTurn(!firstPlayerTurn);
      } else {
        setMessage("Need exactly 4 points.");
      }
      setCurrentBand([]);
    },
  });

  const renderRubberBand = (band, i) => {
    if (band.length < 2) return null;

    if (i == undefined) {
      i = firstPlayerTurn ? 2 : 3;
    }

    return band.map((point, index) => {
      if (index === 0) return null;
      const prevPoint = band[index - 1];
      return (
        <Line
          key={`${prevPoint.id}-${point.id}`}
          x1={prevPoint.x}
          y1={prevPoint.y}
          x2={point.x}
          y2={point.y}
          stroke={i % 2 == 0 ? firstPlayerColor : secondPlayerColor}
          strokeWidth="7"
        />
      );
    });
  };

  const checkIfTriangleExists = (triangle, lines) => {
    const isEdgeInLines = (point1, point2, lines) => {
      for (let line of lines) {
        if (line.includes(point1) && line.includes(point2)) {
          return true;
        }
      }
      return false;
    };

    const [p1, p2, p3] = triangle;
    if (
      isEdgeInLines(p1, p2, lines) &&
      isEdgeInLines(p2, p3, lines) &&
      isEdgeInLines(p3, p1, lines)
    ) {
      return true;
    }

    return false;
  };

  const detectTriangles = (lines, triangle) => {
    if (checkIfTriangleExists(triangle, lines)) {
      return true;
    } else {
      return false;
    }
  };

  const changeColorCalculation = () => {
    let ids = [];
    triangles.flat().forEach((triangle) => {
      let check = detectTriangles(connectedRods, triangle.position);
      if (check) {
        ids.push(triangle.position.join("+"));
      }
    });
    changeTriangleColorById(
      ids,
      firstPlayerTurn ? secondPlayerColor : firstPlayerColor
    );
  };

  const pointsCalculation = () => {
    let firstPlayerPoint = countValues(triangleColors, firstPlayerColor);
    let secondPlayerPoint = countValues(triangleColors, secondPlayerColor);

    return [firstPlayerPoint, secondPlayerPoint];
  };

  useEffect(() => {
    changeColorCalculation();
  }, [connectedRods]);

  return (
    <SafeAreaView style={styles.container} {...panResponder.panHandlers}>
      <Svg width="100%" height="100%">
        <Polygon
          points={
            [hexGrid[0][0].x - 20, hexGrid[0][0].y - 30].join(",") +
            " " +
            [hexGrid[0][3].x + 20, hexGrid[0][3].y - 30].join(",") +
            " " +
            [hexGrid[3][6].x + 30, hexGrid[3][6].y].join(",") +
            " " +
            [hexGrid[6][3].x + 20, hexGrid[6][3].y + 30].join(",") +
            " " +
            [hexGrid[6][0].x - 20, hexGrid[6][0].y + 30].join(",") +
            " " +
            [hexGrid[3][0].x - 30, hexGrid[3][0].y].join(",")
          }
          fill="#f9f9f9"
          stroke="#f5f5f5"
          strokeWidth="5"
        />
        {hexGrid.flat().map((point, index) => (
          <Circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="10"
            stroke="#ccc"
            strokeWidth="2.5"
            fill="#eee"
          />
        ))}
        {triangles.flat().map((point, index) => (
          <Polygon
            key={index}
            points={point.points}
            fill={triangleColors[point.id]}
            stroke="#fff"
            strokeWidth="1"
          />
        ))}
        {rubberBands.map((band, index) => (
          <React.Fragment key={index}>
            {renderRubberBand(band, index)}
          </React.Fragment>
        ))}
        {currentBand.length > 0 && (
          <React.Fragment>{renderRubberBand(currentBand)}</React.Fragment>
        )}
      </Svg>
      <View style={{ width: "100%", backgroundColor: "green", flex: 1 }}></View>
      {/* <Text style={styles.message}>{message}</Text> */}
      {/* <Text style={styles.connectedRods}>{JSON.stringify(connectedRods)}</Text> */}
      <View
        style={{
          width: "100%",
          padding: 20,
          backgroundColor: firstPlayerColor,
          position: "absolute",
          top: 0,
        }}
      >
        <Text style={{ fontSize: 20 }}>
          Player 1 : {pointsCalculation()[0]}
        </Text>
      </View>

      <View
        style={{
          width: "100%",
          padding: 20,
          backgroundColor: secondPlayerColor,
          position: "absolute",
          bottom: 0,
          transform: "rotate(180deg)",
        }}
      >
        <Text style={{ fontSize: 20 }}>
          Player 2 : {pointsCalculation()[1]}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  message: {
    position: "absolute",
    bottom: 60,
    fontSize: 18,
    color: "black",
  },
  connectedRods: {
    position: "absolute",
    bottom: 20,
    fontSize: 16,
    color: "black",
  },
});
/**
 * sdk.dir=/Users/hajhos3in/Library/Android/sdk
ANDROID_HOME=/Users/hajhos3in/Library/Android/sdk
 */