const FIXED_GRAPHS = {
    graph1: {
        name: 'Simple Connected Graph',
        vertices: 5,
        edges: [
            { u: 0, v: 1, weight: 4 },
            { u: 0, v: 2, weight: 2 },
            { u: 1, v: 2, weight: 5 },
            { u: 1, v: 3, weight: 10 },
            { u: 2, v: 3, weight: 3 },
            { u: 2, v: 4, weight: 7 },
            { u: 3, v: 4, weight: 1 }
        ],
        positions: [
            { x: -200, y: -100 },  // 0
            { x: 0, y: -150 },     // 1
            { x: 0, y: 0 },        // 2
            { x: 200, y: -50 },    // 3
            { x: 200, y: 100 }     // 4
        ]
    },
    graph2: {
        name: 'Dense Network',
        vertices: 6,
        edges: [
            { u: 0, v: 1, weight: 3 },
            { u: 0, v: 2, weight: 8 },
            { u: 0, v: 3, weight: 5 },
            { u: 1, v: 2, weight: 1 },
            { u: 1, v: 4, weight: 6 },
            { u: 2, v: 3, weight: 4 },
            { u: 2, v: 4, weight: 2 },
            { u: 2, v: 5, weight: 9 },
            { u: 3, v: 5, weight: 7 },
            { u: 4, v: 5, weight: 3 }
        ],
        positions: [
            { x: -250, y: -80 },   // 0
            { x: -100, y: -150 },  // 1
            { x: -50, y: 0 },      // 2
            { x: -150, y: 100 },   // 3
            { x: 150, y: -50 },    // 4
            { x: 150, y: 120 }     // 5
        ]
    },
    graph3: {
        name: 'Complex Path Graph',
        vertices: 8,
        edges: [
            { u: 0, v: 1, weight: 4 },
            { u: 0, v: 2, weight: 8 },
            { u: 1, v: 2, weight: 11 },
            { u: 1, v: 3, weight: 8 },
            { u: 2, v: 4, weight: 7 },
            { u: 2, v: 5, weight: 1 },
            { u: 3, v: 4, weight: 2 },
            { u: 3, v: 6, weight: 7 },
            { u: 4, v: 5, weight: 6 },
            { u: 4, v: 6, weight: 4 },
            { u: 5, v: 6, weight: 2 },
            { u: 5, v: 7, weight: 9 },
            { u: 6, v: 7, weight: 14 }
        ],
        positions: [
            { x: -280, y: -80 },   // 0
            { x: -150, y: -150 },  // 1
            { x: -120, y: 0 },     // 2
            { x: 0, y: -150 },     // 3
            { x: 50, y: 0 },       // 4
            { x: 0, y: 80 },       // 5
            { x: 180, y: -50 },    // 6
            { x: 200, y: 120 }     // 7
        ]
    },
    graph4: {
        name: 'Weighted Pentagon',
        vertices: 7,
        edges: [
            { u: 0, v: 1, weight: 2 },
            { u: 0, v: 3, weight: 6 },
            { u: 1, v: 2, weight: 3 },
            { u: 1, v: 4, weight: 5 },
            { u: 2, v: 4, weight: 7 },
            { u: 2, v: 5, weight: 4 },
            { u: 3, v: 4, weight: 8 },
            { u: 3, v: 6, weight: 9 },
            { u: 4, v: 5, weight: 2 },
            { u: 4, v: 6, weight: 4 },
            { u: 5, v: 6, weight: 5 }
        ],
        positions: [
            { x: -250, y: -50 },   // 0
            { x: -100, y: -150 },  // 1
            { x: 50, y: -150 },    // 2
            { x: -180, y: 80 },    // 3
            { x: 0, y: 0 },        // 4
            { x: 150, y: 0 },      // 5
            { x: 0, y: 130 }       // 6
        ]
    },
    graph5: {
        name: 'Complex Network',
        vertices: 9,
        edges: [
            { u: 0, v: 1, weight: 4 },
            { u: 0, v: 7, weight: 8 },
            { u: 1, v: 2, weight: 8 },
            { u: 1, v: 7, weight: 11 },
            { u: 2, v: 3, weight: 7 },
            { u: 2, v: 5, weight: 4 },
            { u: 2, v: 8, weight: 2 },
            { u: 3, v: 4, weight: 9 },
            { u: 3, v: 5, weight: 14 },
            { u: 4, v: 5, weight: 10 },
            { u: 5, v: 6, weight: 2 },
            { u: 6, v: 7, weight: 1 },
            { u: 6, v: 8, weight: 6 },
            { u: 7, v: 8, weight: 7 }
        ],
        positions: [
            { x: -300, y: 0 },     // 0
            { x: -150, y: -120 },  // 1
            { x: 0, y: -120 },     // 2
            { x: 150, y: -120 },   // 3
            { x: 300, y: 0 },      // 4
            { x: 150, y: 80 },     // 5
            { x: 0, y: 80 },       // 6
            { x: -150, y: 80 },    // 7
            { x: 0, y: 0 }         // 8
        ]
    }
};
