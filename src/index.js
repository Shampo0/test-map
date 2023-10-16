import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
cytoscape.use(coseBilkent);

import './style.css';
const data = [ 
    {
        "data": {
            "id": "robotncom",
            "url": "http://www.robotncom.com/",
            "label": "robotncom"
        }
    },
    {
        "data": {
            "id": "history",
            "url": "https://taktaguri.com/",
            "label": "history"
        }
    },
    {
        "data": { "id": "robotncom->history", "source": "history", "target": "robotncom" }
    },
    {
        "data": {
            "id": "platform",
            "label": "platform"

        }
    },
    {
        "data": { "id": "robotncom->platform", "source": "platform", "target": "robotncom" }
    },
    {
        "data": {
            "id": "taktaguri",
            "label": "taktaguri"

        }
    },
    {
        "data": { "id": "platform->taktaguri", "source": "taktaguri", "target": "platform" }
    },
    {
        "data": {
            "id": "naafaa",
            "url": "https://naafaa.co.kr/",
            "label": "naafaa"

        }
    },
    {
        "data": { "id": "platform->naafaa", "source": "naafaa", "target": "platform" }
    },
    {
        "data": {
            "id": "solution",
            "label": "solution"

        }
    },
    {
        "data": { "id": "robotncom->solution", "source": "solution", "target": "robotncom" }
    },
    {
        "data": {
            "id": "sever",
            "label": "sever"

        }
    },
    {
        "data": {
            "id": "security",
            "label": "security"

        }
    },
    {
        "data": {
            "id": "network",
            "label": "network"

        }
    },
    {
        "data": { "id": "solution->sever", "source": "sever", "target": "solution" }
    },
    {
        "data": { "id": "solution->security", "source": "security", "target": "solution" }
    },
    {
        "data": { "id": "solution->network", "source": "network", "target": "solution" }
    },
    {
        "data": {
            "id": "computer HW + SW",
            "label": "computer HW + SW"

        }
    },
    {
        "data": { "id": "robotncom->computer HW + SW", "source": "computer HW + SW", "target": "robotncom" }
    },
];
// 공식 사이트 예제 코드
const cy = cytoscape({

    container: document.getElementById('cy'), // container to render in

    elements: data,

    style: [ // the stylesheet for the graph
        {
            selector: 'node',
            style: {
                'background-color': '#666',
                'label': 'data(label)'
            }
        },

        {
            selector: 'edge',
            style: {
                'width': 3,
                'curve-style': 'bezier',
                'line-color': '#ccc',
                'source-arrow-color': '#ccc',
                'source-arrow-shape': 'triangle'
            }
        }
        
    ],
    layout: {
        name: 'cose-bilkent',
        animate: false,
        gravityRangeCompound: 1.5,
        fit: true,
        tile: true
    }
});