class Graph {
    constructor(vertices) {
        this.vertices = vertices;
        this.adjacencyList = Array.from({ length: vertices }, () => []);
        this.edges = [];
    }

    addEdge(u, v, weight = 1, directed = false) {
        if (u >= this.vertices || v >= this.vertices || u < 0 || v < 0) return;
        
        this.adjacencyList[u].push({ vertex: v, weight });
        this.edges.push({ u, v, weight });
        
        if (!directed) {
            this.adjacencyList[v].push({ vertex: u, weight });
        }
    }

    getVertices() {
        return this.vertices;
    }

    getAdjacent(vertex) {
        return this.adjacencyList[vertex] || [];
    }

    getEdges() {
        return this.edges;
    }

    isConnected(u, v) {
        return this.adjacencyList[u].some(edge => edge.vertex === v);
    }
}
