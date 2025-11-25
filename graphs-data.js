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
        ]
    }
};
