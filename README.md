# Graph Algorithms Visualizer

An interactive web-based tool for visualizing and understanding various graph algorithms. This application provides real-time visualization of graph traversal, shortest path, and minimum spanning tree algorithms.

## Features

### Algorithms Supported
- **DFS (Depth-First Search) Spanning Tree** - Explores graph depth-first to create a spanning tree
- **BFS (Breadth-First Search) Spanning Tree** - Explores graph level-by-level to create a spanning tree
- **Dijkstra's Shortest Path** - Finds the shortest path between two vertices
- **Prim's Minimum Spanning Tree** - Builds MST by growing from a starting vertex
- **Kruskal's Minimum Spanning Tree** - Builds MST by selecting edges in order of weight

### Key Features
- 🎨 **Dark/Light Theme** - Toggle between dark and light modes
- 📊 **Pre-built Sample Graphs** - 6 example graphs demonstrating different scenarios
- ✏️ **Custom Graph Builder** - Create your own graphs with custom nodes and weighted edges
- 📈 **Real-time Visualization** - See algorithms in action with highlighted paths
- 📊 **Result Display** - View total weight, distance, and edge count for each algorithm
- 🔄 **Responsive Design** - Works on various screen sizes

## Sample Graphs

1. **Simple Connected Graph (5 nodes)** - Basic graph for learning fundamentals
2. **Dense Network (6 nodes)** - Multiple interconnected paths
3. **Complex Path Graph (8 nodes)** - Larger graph with varied weights
4. **Weighted Pentagon (7 nodes)** - Interesting structure for visualizing different spanning trees
5. **Complex Network (9 nodes)** - Advanced graph with multiple paths
6. **Prim vs Kruskal Demo (4 nodes)** - Specifically designed to show differences between Prim's and Kruskal's algorithms

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No installation required - runs directly in the browser

### Running the Application

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Select a graph from the dropdown menu or create a custom graph
4. Choose an algorithm to visualize
5. Configure algorithm parameters (if needed)
6. Click "Run" to see the visualization

## How to Use

### Using Pre-built Graphs
1. Select a graph from the "Select Graph" dropdown
2. The graph will be displayed on the canvas
3. Choose an algorithm from the "Select Algorithm" dropdown
4. Configure any required parameters (start vertex, source/destination, etc.)
5. Click "Run" to execute the algorithm
6. View the results in the "Result" panel

### Creating Custom Graphs
1. Select "Custom Graph" from the graph dropdown
2. Click "+ Add Point" to add vertices to your graph
3. Use the "Connect Points" section to add weighted edges:
   - Select "From Point" and "To Point"
   - Enter the edge weight
   - Click "Connect"
4. Click "Done" when finished
5. Run algorithms on your custom graph

### Algorithm-Specific Options

**DFS/BFS Spanning Tree:**
- Select a starting vertex for traversal

**Dijkstra's Shortest Path:**
- Select a source vertex (starting point)
- Select a destination vertex (end point)

**Prim's MST:**
- Select a starting vertex for the algorithm

**Kruskal's MST:**
- No additional parameters needed

## Visualization Guide

- **Gray nodes/edges** - Unselected elements
- **Highlighted nodes/edges** - Part of the algorithm's result
- **Thicker edges** - Selected edges in the result
- **Numbers on edges** - Edge weights
- **Numbers in nodes** - Vertex identifiers

## Result Information

After running an algorithm, the Result panel displays:
- **Total Weight/Distance** - Sum of edge weights in the result
- **Number of Edges** - Count of edges used
- **Path** - (For Dijkstra) The complete path from source to destination

## Technical Details

### Files Structure
```
graph-algorithms-visualizer/
├── index.html          # Main HTML file
├── style.css           # Styling and themes
├── graph.js            # Graph data structure implementation
├── algorithms.js       # Algorithm implementations
├── graphs-data.js      # Pre-defined sample graphs
├── visualizer.js       # Visualization and UI logic
└── README.md          # This file
```

### Technologies Used
- HTML5 Canvas for rendering
- Vanilla JavaScript (no frameworks)
- CSS3 for styling and themes

## Algorithm Complexity

- **DFS/BFS**: O(V + E) where V = vertices, E = edges
- **Dijkstra**: O(V²) or O(E + V log V) with priority queue
- **Prim's MST**: O(V²) with simple implementation
- **Kruskal's MST**: O(E log E) due to edge sorting

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with HTML5 Canvas support

## Contributing

Feel free to fork this project and submit pull requests for improvements or bug fixes.

## License

This project is open source and available under the MIT License.

## Educational Use

This tool is designed for educational purposes to help students and developers understand how graph algorithms work through visual representation. Perfect for:
- Computer Science students learning algorithms
- Teachers demonstrating graph concepts
- Developers reviewing algorithm behavior
- Interview preparation

## Future Enhancements

Potential features for future versions:
- Step-by-step animation
- Algorithm speed control
- Export/import graph data
- More algorithms (Bellman-Ford, Floyd-Warshall, etc.)
- Graph layout algorithms
- Directed graph support

## Contact

For questions or suggestions, please open an issue on the GitHub repository.

---

Made with ❤️ for learning and education
