class GraphAlgorithms {
    // DFS Spanning Tree
    static dfsSpanningTree(graph, startVertex) {
        const visited = new Array(graph.getVertices()).fill(false);
        const spanningTree = [];
        const visitedOrder = [];
        let totalWeight = 0;

        const dfs = (vertex) => {
            visited[vertex] = true;
            visitedOrder.push(vertex);

            const adjacent = graph.getAdjacent(vertex);
            for (let edge of adjacent) {
                if (!visited[edge.vertex]) {
                    spanningTree.push({ u: vertex, v: edge.vertex, weight: edge.weight });
                    totalWeight += edge.weight;
                    dfs(edge.vertex);
                }
            }
        };

        dfs(startVertex);
        return { spanningTree, visitedOrder, totalWeight };
    }

    // BFS Spanning Tree
    static bfsSpanningTree(graph, startVertex) {
        const visited = new Array(graph.getVertices()).fill(false);
        const spanningTree = [];
        const visitedOrder = [];
        const queue = [startVertex];
        visited[startVertex] = true;
        let totalWeight = 0;

        while (queue.length > 0) {
            const vertex = queue.shift();
            visitedOrder.push(vertex);

            const adjacent = graph.getAdjacent(vertex);
            for (let edge of adjacent) {
                if (!visited[edge.vertex]) {
                    visited[edge.vertex] = true;
                    spanningTree.push({ u: vertex, v: edge.vertex, weight: edge.weight });
                    totalWeight += edge.weight;
                    queue.push(edge.vertex);
                }
            }
        }

        return { spanningTree, visitedOrder, totalWeight };
    }

    // Dijkstra's Shortest Path
    static dijkstra(graph, source, destination) {
        const vertices = graph.getVertices();
        const distances = new Array(vertices).fill(Infinity);
        const previous = new Array(vertices).fill(null);
        const visited = new Array(vertices).fill(false);

        distances[source] = 0;

        for (let i = 0; i < vertices - 1; i++) {
            let minVertex = -1;
            let minDistance = Infinity;

            for (let v = 0; v < vertices; v++) {
                if (!visited[v] && distances[v] < minDistance) {
                    minDistance = distances[v];
                    minVertex = v;
                }
            }

            if (minVertex === -1) break;
            visited[minVertex] = true;

            const adjacent = graph.getAdjacent(minVertex);
            for (let edge of adjacent) {
                if (!visited[edge.vertex]) {
                    const alt = distances[minVertex] + edge.weight;
                    if (alt < distances[edge.vertex]) {
                        distances[edge.vertex] = alt;
                        previous[edge.vertex] = minVertex;
                    }
                }
            }
        }

        // Reconstruct path
        const path = [];
        let current = destination;
        while (current !== null) {
            path.unshift(current);
            current = previous[current];
        }

        return {
            distance: distances[destination],
            path: distances[destination] === Infinity ? [] : path,
            distances
        };
    }

    // Prim's Minimum Spanning Tree
    static prim(graph) {
        const vertices = graph.getVertices();
        const inMST = new Array(vertices).fill(false);
        const mstEdges = [];
        let totalWeight = 0;

        inMST[0] = true;

        for (let count = 0; count < vertices - 1; count++) {
            let minWeight = Infinity;
            let u = -1, v = -1;

            for (let i = 0; i < vertices; i++) {
                if (inMST[i]) {
                    const adjacent = graph.getAdjacent(i);
                    for (let edge of adjacent) {
                        if (!inMST[edge.vertex] && edge.weight < minWeight) {
                            minWeight = edge.weight;
                            u = i;
                            v = edge.vertex;
                        }
                    }
                }
            }

            if (u !== -1) {
                inMST[v] = true;
                mstEdges.push({ u, v, weight: minWeight });
                totalWeight += minWeight;
            }
        }

        return { mstEdges, totalWeight };
    }

    // Kruskal's Minimum Spanning Tree
    static kruskal(graph) {
        const edges = graph.getEdges().map(e => ({ ...e }));
        edges.sort((a, b) => a.weight - b.weight);

        const parent = Array.from({ length: graph.getVertices() }, (_, i) => i);

        const find = (x) => {
            if (parent[x] !== x) {
                parent[x] = find(parent[x]);
            }
            return parent[x];
        };

        const union = (x, y) => {
            const px = find(x);
            const py = find(y);
            if (px !== py) {
                parent[px] = py;
                return true;
            }
            return false;
        };

        const mstEdges = [];
        let totalWeight = 0;

        for (let edge of edges) {
            if (union(edge.u, edge.v)) {
                mstEdges.push(edge);
                totalWeight += edge.weight;
                if (mstEdges.length === graph.getVertices() - 1) break;
            }
        }

        return { mstEdges, totalWeight };
    }
}
