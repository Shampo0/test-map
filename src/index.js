import cytoscape from "cytoscape";
import coseBilkent from "cytoscape-cose-bilkent";

cytoscape.use(coseBilkent);

import "./style.css";
// webpack으로 묶어줘야 하니 css파일을 진입점인 index.js 에 import 합니다
const data = [
  {
    data: {
      id: "robotncom",
      url: "",
      label: "robotncom",
    },
  },
  {
    data: {
      id: "platform",
      label: "platform",
    },
  },
  {
    data: {
      id: "robotncom->platform",
      source: "platform",
      target: "robotncom",
    },
  },
  {
    data: {
      id: "taktaguri",
      label: "taktaguri",
    },
  },
  {
    data: {
      id: "naafaa",
      label: "naafaa",
    },
  },
  {
    data: {
      id: "platform->taktaguri",
      source: "taktaguri",
      target: "platform",
    },
  },
  {
    data: { id: "platform->naafaa", source: "naafaa", target: "platform" },
  },
  {
    data: {
      id: "solution",
      label: "solution",
    },
  },
  {
    data: {
      id: "robotncom->solution",
      source: "solution",
      target: "robotncom",
    },
  },
  {
    data: {
      id: "sever",
      label: "sever",
    },
  },
  {
    data: { id: "solution->sever", source: "sever", target: "solution" },
  },
  {
    data: {
      id: "security",
      label: "security",
    },
  },
  {
    data: { id: "solution->security", source: "security", target: "solution" },
  },
  {
    data: {
      id: "network",
      label: "network",
    },
  },
  {
    data: { id: "solution->network", source: "network", target: "solution" },
  },
  {
    data: {
      id: "history",
      label: "history",
    },
  },
  {
    data: { id: "robotncom->history", source: "history", target: "robotncom" },
  },
  {
    data: {
      id: "computer",
      label: "computer HW + SW",
    },
  },
  {
    data: {
      id: "robotncom->computer",
      source: "computer",
      target: "robotncom",
    },
  },
];

const cy_for_rank = cytoscape({
  elements: data,
});
// rank를 활용하기 위해 data만 입력한 cytoscape 객체입니다

const pageRank = cy_for_rank.elements().pageRank();
// elements들의 rank들입니다.

const nodeMaxSize = 50;
const nodeMinSize = 5;
const nodeActiveSize = 28;
const fontMaxSize = 8;
const fontMinSize = 5;
// 추후 마우스 인/아웃 시에도 활용해야 하니 node와 font의 최대값/최소값은 변수로 빼줍니다
const fontActiveSize = 7;
// node & font 크기 값

const edgeWidth = '2px';
var edgeActiveWidth = '4px';
const arrowScale = 0.8;
const arrowActiveScale = 1.2;
// edge & arrow 크기값

const dimColor = '#dfe4ea';
const edgeColor = '#ced6e0';
const nodeColor = '#57606f';
const nodeActiveColor = '#ffa502';

const successorColor = '#ff6348';
// 상위 node & edge color
const predecessorsColor = '#1e90ff';
// 하위 node & edge color
const cy = cytoscape({
  container: document.getElementById("cy"), 

  elements: data,

  style: [
    {
      selector: "node",
      style: {
        'background-color': nodeColor,
        label: "data(label)",
        width: function (ele) {
          return nodeMaxSize * pageRank.rank("#" + ele.id()) + nodeMinSize;
        },
        height: function (ele) {
          return nodeMaxSize * pageRank.rank("#" + ele.id()) + nodeMinSize;
        },
        "font-size": function (ele) {
          return fontMaxSize * pageRank.rank("#" + ele.id()) + fontMinSize;
        },
      },
    },

    {
      selector: "edge",
      style: {
        'width': edgeWidth,
        'line-color': edgeColor,
        'source-arrow-color': edgeColor,
        'source-arrow-shape': 'vee',
        'arrow-scale': arrowScale
      },
    },
  ],

  layout: {
    name: "cose-bilkent",
    animate: false,
    gravityRangeCompound: 1.5,
    fit: true,
    tile: true,
  },

  layout: {
    name: "cose-bilkent",
    animate: false,
    gravityRangeCompound: 1.5,
    fit: true,
    tile: true,
  },
});

function setDimStyle(target_cy, style) {
    target_cy.nodes().forEach(function (target) {
        target.style(style);
    });
    target_cy.edges().forEach(function (target) {
        target.style(style);
    });
}

function setFocus(target_element, successorColor, predecessorsColor, edgeWidth, arrowScale) {
    target_element.style('background-color', nodeActiveColor);
    target_element.style('color', nodeColor);
    target_element.successors().each(function (e) {
        // 상위  엣지와 노드
        if (e.isEdge()) {
            e.style('width', edgeWidth);
            e.style('arrow-scale', arrowScale);
        }
        e.style('color', nodeColor);
        e.style('background-color', successorColor);
        e.style('line-color', successorColor);
        e.style('source-arrow-color', successorColor);
        setOpacityElement(e, 0.5);
    }
    );
    target_element.predecessors().each(function (e) {
        // 하위 엣지와 노드
        if (e.isEdge()) {
            e.style('width', edgeWidth);
            e.style('arrow-scale', arrowScale);
        }
        e.style('color', nodeColor);
        e.style('background-color', predecessorsColor);
        e.style('line-color', predecessorsColor);
        e.style('source-arrow-color', predecessorsColor);
        setOpacityElement(e, 0.5);
    });
    target_element.neighborhood().each(function (e) {
        // 이웃한 엣지와 노드
        setOpacityElement(e, 1);
    }
    );
    target_element.style('width', Math.max(parseFloat(target_element.style('width')), nodeActiveSize));
    target_element.style('height', Math.max(parseFloat(target_element.style('height')), nodeActiveSize));
    target_element.style('font-size', Math.max(parseFloat(target_element.style('font-size')), fontActiveSize));
}

function setOpacityElement(target_element, degree) {
    target_element.style('opacity', degree);
}

function setResetFocus(target_cy) {
    target_cy.nodes().forEach(function (target) {
        target.style('background-color', nodeColor);
        var rank = pageRank.rank(target);
        target.style('width', nodeMaxSize * rank + nodeMinSize);
        target.style('height', nodeMaxSize * rank + nodeMinSize);
        target.style('font-size', fontMaxSize * rank + fontMinSize);
        target.style('color', nodeColor);
        target.style('opacity', 1);
    });
    target_cy.edges().forEach(function (target) {
        target.style('line-color', edgeColor);
        target.style('source-arrow-color', edgeColor);
        target.style('width', edgeWidth);
        target.style('arrow-scale', arrowScale);
        target.style('opacity', 1);
    });
}

cy.on("tap", function (e) {
  const url = e.target.data("url");
  if (url && url !== "") {
    window.open(url);
  }
});
cy.on('tapstart mouseover', 'node', function (e) {
    setDimStyle(cy, {
        'background-color': dimColor,
        'line-color': dimColor,
        'source-arrow-color': dimColor,
        'color': dimColor
    });

    setFocus(e.target, successorColor, predecessorsColor, edgeActiveWidth, arrowActiveScale);
});

cy.on('tapend mouseout', 'node', function (e) {
    setResetFocus(e.cy);
});