class GraphVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.graph = null;
        this.positions = [];
        this.highlightedEdges = [];
        this.highlightedVertices = [];
        this.scale = 1;
        this.panX = 0;
        this.panY = 0;
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.setupZoomAndPan();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight - 70;
        if (this.graph) this.drawGraph();
    }

    setupZoomAndPan() {
        // Mouse wheel zoom
        this.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const zoom = e.deltaY < 0 ? 1.1 : 0.9;
            const newScale = Math.max(0.1, Math.min(5, this.scale * zoom));
            
            // Zoom toward mouse position
            this.panX = mouseX - (mouseX - this.panX) * (newScale / this.scale);
            this.panY = mouseY - (mouseY - this.panY) * (newScale / this.scale);
            this.scale = newScale;
            
            this.drawGraph();
        });

        // Mouse drag to pan
        this.canvas.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.dragStartX = e.clientX - this.panX;
            this.dragStartY = e.clientY - this.panY;
            this.canvas.style.cursor = 'grabbing';
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                this.panX = e.clientX - this.dragStartX;
                this.panY = e.clientY - this.dragStartY;
                this.drawGraph();
            }
        });

        this.canvas.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.canvas.style.cursor = 'grab';
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.isDragging = false;
            this.canvas.style.cursor = 'grab';
        });

        this.canvas.style.cursor = 'grab';
    }

    resetView() {
        this.scale = 1;
        this.panX = 0;
        this.panY = 0;
        this.drawGraph();
    }

    zoomIn() {
        this.scale = Math.min(5, this.scale * 1.2);
        this.drawGraph();
    }

    zoomOut() {
        this.scale = Math.max(0.1, this.scale / 1.2);
        this.drawGraph();
    }

    generatePositions(vertices, customPositions = null) {
        this.positions = [];
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        if (customPositions) {
            // Use custom positions (relative to canvas size)
            for (let i = 0; i < vertices; i++) {
                if (customPositions[i]) {
                    this.positions.push({
                        x: centerX + customPositions[i].x * (this.canvas.width / 1200),
                        y: centerY + customPositions[i].y * (this.canvas.height / 800)
                    });
                } else {
                    // Fallback to polygon if position not defined
                    const radius = Math.min(this.canvas.width, this.canvas.height) / 3.5;
                    const angle = (i / vertices) * 2 * Math.PI - Math.PI / 2;
                    this.positions.push({
                        x: centerX + radius * Math.cos(angle),
                        y: centerY + radius * Math.sin(angle)
                    });
                }
            }
        } else {
            // Default polygon layout
            const radius = Math.min(this.canvas.width, this.canvas.height) / 3.5;
            for (let i = 0; i < vertices; i++) {
                const angle = (i / vertices) * 2 * Math.PI - Math.PI / 2;
                this.positions.push({
                    x: centerX + radius * Math.cos(angle),
                    y: centerY + radius * Math.sin(angle)
                });
            }
        }
    }

    getColors() {
        const isDark = document.body.classList.contains('dark-theme');
        return {
            edgeNormal: isDark ? '#666666' : '#cccccc',
            edgeHighlight: isDark ? '#cccccc' : '#333333',
            vertexNormal: isDark ? '#666666' : '#cccccc',
            vertexHighlight: isDark ? '#cccccc' : '#333333',
            weightText: isDark ? '#b0b0b0' : '#555555',
            vertexText: '#ffffff'
        };
    }

    drawGraph() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        
        // Apply pan and zoom transformations
        this.ctx.translate(this.panX, this.panY);
        this.ctx.scale(this.scale, this.scale);
        
        const colors = this.getColors();

        // Draw edges
        const edges = this.graph.getEdges();
        for (let edge of edges) {
            const highlighted = this.highlightedEdges.some(
                e => (e.u === edge.u && e.v === edge.v) || (e.u === edge.v && e.v === edge.u)
            );

            this.drawEdge(edge.u, edge.v, edge.weight, highlighted, colors);
        }

        // Draw vertices
        for (let i = 0; i < this.graph.getVertices(); i++) {
            const highlighted = this.highlightedVertices.includes(i);
            this.drawVertex(i, highlighted, colors);
        }
        
        this.ctx.restore();
    }

    drawCustomMode() {
        this.drawGraph();
    }

    drawEdge(u, v, weight, highlighted = false, colors) {
        const pos1 = this.positions[u];
        const pos2 = this.positions[v];

        this.ctx.strokeStyle = highlighted ? colors.edgeHighlight : colors.edgeNormal;
        this.ctx.lineWidth = highlighted ? 3 : 1.5;
        this.ctx.beginPath();
        this.ctx.moveTo(pos1.x, pos1.y);
        this.ctx.lineTo(pos2.x, pos2.y);
        this.ctx.stroke();

        // Draw weight with larger font and offset
        const midX = (pos1.x + pos2.x) / 2;
        const midY = (pos1.y + pos2.y) / 2;
        
        // Calculate perpendicular offset for better positioning
        const dx = pos2.x - pos1.x;
        const dy = pos2.y - pos1.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const offsetX = (-dy / length) * 12;
        const offsetY = (dx / length) * 12;
        
        this.ctx.fillStyle = colors.weightText;
        this.ctx.font = 'bold 14px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(weight, midX + offsetX, midY + offsetY);
    }

    drawVertex(vertex, highlighted = false, colors) {
        const pos = this.positions[vertex];
        const radius = 22;

        this.ctx.fillStyle = highlighted ? colors.vertexHighlight : colors.vertexNormal;
        this.ctx.beginPath();
        this.ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
        this.ctx.fill();

        this.ctx.strokeStyle = colors.vertexText;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        this.ctx.fillStyle = colors.vertexText;
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(vertex, pos.x, pos.y);
    }

    highlightPath(vertices, edges = []) {
        this.highlightedVertices = vertices;
        this.highlightedEdges = edges;
        this.drawGraph();
    }

    clear() {
        this.highlightedVertices = [];
        this.highlightedEdges = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

const app = {
    graph: null,
    visualizer: null,
    currentGraphKey: null,

    customBuilder: {
        active: false,
        points: [],
        nextPointId: 0
    },

    init() {
        this.visualizer = new GraphVisualizer('graphCanvas');
        this.loadTheme();
    },

    startCustomMode() {
        this.customBuilder.active = true;
        this.customBuilder.points = [];
        this.customBuilder.nextPointId = 0;

        this.graph = new Graph(0);
        this.visualizer.graph = this.graph;
        this.visualizer.positions = [];

        this.visualizer.drawGraph();
        this.updatePointsList();
    },

    addPoint() {
        const centerX = this.visualizer.canvas.width / 2;
        const centerY = this.visualizer.canvas.height / 2;
        const numPoints = this.customBuilder.points.length + 1;
        const radius = Math.min(this.visualizer.canvas.width, this.visualizer.canvas.height) / 4;
        const angle = (this.customBuilder.nextPointId / numPoints) * 2 * Math.PI - Math.PI / 2;

        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        this.customBuilder.points.push({
            id: this.customBuilder.nextPointId,
            x: x,
            y: y
        });

        // Recalculate all positions for perfect polygon
        this.recalculatePolygonPositions();
        
        const newGraph = new Graph(this.customBuilder.points.length);
        for (let edge of this.graph.getEdges()) {
            newGraph.addEdge(edge.u, edge.v, edge.weight);
        }
        this.graph = newGraph;
        this.visualizer.graph = this.graph;

        this.customBuilder.nextPointId++;
        this.updatePointsList();
        this.visualizer.drawGraph();
    },

    recalculatePolygonPositions() {
        const centerX = this.visualizer.canvas.width / 2;
        const centerY = this.visualizer.canvas.height / 2;
        const numPoints = this.customBuilder.points.length;
        const radius = Math.min(this.visualizer.canvas.width, this.visualizer.canvas.height) / 4;

        this.visualizer.positions = [];
        
        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * 2 * Math.PI - Math.PI / 2;
            this.visualizer.positions.push({
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle)
            });
        }
    },

    updatePointsList() {
        const fromSelect = document.getElementById('fromPoint');
        const toSelect = document.getElementById('toPoint');

        fromSelect.innerHTML = '<option value="">From Point</option>';
        toSelect.innerHTML = '<option value="">To Point</option>';

        this.customBuilder.points.forEach(point => {
            const optionFrom = document.createElement('option');
            optionFrom.value = point.id;
            optionFrom.textContent = `Point ${point.id}`;
            fromSelect.appendChild(optionFrom);

            const optionTo = document.createElement('option');
            optionTo.value = point.id;
            optionTo.textContent = `Point ${point.id}`;
            toSelect.appendChild(optionTo);
        });
    },

    addEdge() {
        const fromId = parseInt(document.getElementById('fromPoint').value);
        const toId = parseInt(document.getElementById('toPoint').value);
        const weight = parseInt(document.getElementById('edgeWeight').value);

        if (isNaN(fromId) || isNaN(toId)) {
            alert('Please select both points');
            return;
        }

        if (fromId === toId) {
            alert('Cannot connect a point to itself');
            return;
        }

        // Check if edge already exists
        const edges = this.graph.getEdges();
        const existingEdge = edges.find(e => 
            (e.u === fromId && e.v === toId) || (e.u === toId && e.v === fromId)
        );

        if (existingEdge) {
            // Remove existing edge
            const newGraph = new Graph(this.customBuilder.points.length);
            for (let edge of edges) {
                if (!((edge.u === fromId && edge.v === toId) || (edge.u === toId && edge.v === fromId))) {
                    newGraph.addEdge(edge.u, edge.v, edge.weight);
                }
            }
            // Add with new weight
            newGraph.addEdge(fromId, toId, weight);
            this.graph = newGraph;
            this.visualizer.graph = this.graph;
        } else {
            // Add new edge
            this.graph.addEdge(fromId, toId, weight);
        }

        this.visualizer.drawGraph();

        document.getElementById('fromPoint').value = '';
        document.getElementById('toPoint').value = '';
        document.getElementById('edgeWeight').value = '1';
    },

    finishCustomMode() {
        this.customBuilder.active = false;
        document.getElementById('customStartBtn').textContent = 'Start Custom Mode';
        document.getElementById('customStartBtn').disabled = false;
        document.getElementById('customModePanel').style.display = 'none';
        this.visualizer.drawGraph();
    },

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    },

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        if (this.graph) this.visualizer.drawGraph();
    },

    onGraphSelect() {
        const graphKey = document.getElementById('graphList').value;
        const customDiv = document.getElementById('customGraphDiv');
        
        if (graphKey === 'custom') {
            customDiv.style.display = 'block';
            this.startCustomMode();
        } else if (graphKey) {
            customDiv.style.display = 'none';
            this.loadFixedGraph(graphKey);
        } else {
            customDiv.style.display = 'none';
            this.clearVisualization();
        }
    },

    loadFixedGraph(graphKey) {
        if (!FIXED_GRAPHS[graphKey]) return;

        const graphData = FIXED_GRAPHS[graphKey];
        this.currentGraphKey = graphKey;

        this.graph = new Graph(graphData.vertices);
        this.visualizer.generatePositions(graphData.vertices, graphData.positions);

        for (let edge of graphData.edges) {
            this.graph.addEdge(edge.u, edge.v, edge.weight);
        }

        this.visualizer.graph = this.graph;
        this.visualizer.drawGraph();
    },

    updateAlgorithmOptions() {
        const algo = document.getElementById('algorithmList').value;
        const optionsDiv = document.getElementById('algorithmOptions');
        optionsDiv.innerHTML = '';

        if (algo === 'dfs' || algo === 'bfs') {
            optionsDiv.innerHTML = `
                <label>Start Vertex:</label>
                <input type="number" id="startVertex" min="0" value="0">
            `;
        } else if (algo === 'dijkstra') {
            optionsDiv.innerHTML = `
                <label>Source Vertex:</label>
                <input type="number" id="sourceVertex" min="0" value="0">
                <label>Destination Vertex:</label>
                <input type="number" id="destVertex" min="0" value="0">
            `;
        } else if (algo === 'prim') {
            optionsDiv.innerHTML = `
                <label>Start Vertex:</label>
                <input type="number" id="primStartVertex" min="0" value="0">
            `;
        }
    },

    runAlgorithm() {
        if (!this.graph) {
            alert('Please select and load a graph first');
            return;
        }

        const algo = document.getElementById('algorithmList').value;

        if (algo === 'dfs') this.runDFS();
        else if (algo === 'bfs') this.runBFS();
        else if (algo === 'dijkstra') this.runDijkstra();
        else if (algo === 'prim') this.runPrim();
        else if (algo === 'kruskal') this.runKruskal();
        else alert('Please select an algorithm');
    },

    runDFS() {
        const start = parseInt(document.getElementById('startVertex').value);
        const result = GraphAlgorithms.dfsSpanningTree(this.graph, start);
        this.visualizer.highlightPath(result.visitedOrder, result.spanningTree);
        this.displayResult(`DFS Spanning Tree<br>Total Weight: <strong>${result.totalWeight}</strong><br>Edges: ${result.spanningTree.length}`);
    },

    runBFS() {
        const start = parseInt(document.getElementById('startVertex').value);
        const result = GraphAlgorithms.bfsSpanningTree(this.graph, start);
        this.visualizer.highlightPath(result.visitedOrder, result.spanningTree);
        this.displayResult(`BFS Spanning Tree<br>Total Weight: <strong>${result.totalWeight}</strong><br>Edges: ${result.spanningTree.length}`);
    },

    runDijkstra() {
        const source = parseInt(document.getElementById('sourceVertex').value);
        const destination = parseInt(document.getElementById('destVertex').value);
        const result = GraphAlgorithms.dijkstra(this.graph, source, destination);

        const edges = [];
        for (let i = 0; i < result.path.length - 1; i++) {
            edges.push({ u: result.path[i], v: result.path[i + 1] });
        }
        this.visualizer.highlightPath(result.path, edges);
        if (result.distance === Infinity) {
            this.displayResult(`Dijkstra's Shortest Path<br><strong>No path found</strong>`);
        } else {
            this.displayResult(`Dijkstra's Shortest Path<br>Total Distance: <strong>${result.distance}</strong><br>Path: ${result.path.join(' → ')}`);
        }
    },

    runPrim() {
        const start = parseInt(document.getElementById('primStartVertex').value);
        const result = GraphAlgorithms.prim(this.graph, start);
        const vertices = this.getVerticesFromEdges(result.mstEdges);
        this.visualizer.highlightPath(vertices, result.mstEdges);
        this.displayResult(`Prim's MST<br>Total Weight: <strong>${result.totalWeight}</strong><br>Edges: ${result.mstEdges.length}`);
    },

    runKruskal() {
        const result = GraphAlgorithms.kruskal(this.graph);
        const vertices = this.getVerticesFromEdges(result.mstEdges);
        this.visualizer.highlightPath(vertices, result.mstEdges);
        this.displayResult(`Kruskal's MST<br>Total Weight: <strong>${result.totalWeight}</strong><br>Edges: ${result.mstEdges.length}`);
    },

    getVerticesFromEdges(edges) {
        const vertexSet = new Set();
        for (let edge of edges) {
            vertexSet.add(edge.u);
            vertexSet.add(edge.v);
        }
        return Array.from(vertexSet);
    },

    displayResult(content) {
        const resultDisplay = document.getElementById('resultDisplay');
        const resultContent = document.getElementById('resultContent');
        resultDisplay.style.display = 'block';
        resultContent.innerHTML = content;
    },

    hideResult() {
        document.getElementById('resultDisplay').style.display = 'none';
    },

    clearVisualization() {
        document.getElementById('graphList').value = '';
        document.getElementById('customGraphDiv').style.display = 'none';
        document.getElementById('algorithmList').value = '';
        document.getElementById('algorithmOptions').innerHTML = '';
        this.hideResult();
        
        this.graph = null;
        this.visualizer.positions = [];
        this.visualizer.highlightedVertices = [];
        this.visualizer.highlightedEdges = [];
        
        this.customBuilder.active = false;
        this.customBuilder.points = [];
        this.customBuilder.nextPointId = 0;
        
        this.visualizer.ctx.clearRect(0, 0, this.visualizer.canvas.width, this.visualizer.canvas.height);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
