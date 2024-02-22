class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    if (!this.nodes.has(vertex)) return;

    this.nodes.forEach((vertex2) => {
      if (vertex2 !== vertex) {
        this.removeEdge(vertex, vertex2);
      }
    });

    // Entfernen des Knotens aus der Sammlung der Knoten
    this.nodes.delete(vertex);
  }

  // This function performs a Depth-First Search (DFS) on a graph from a start node
  // and returns an array of visited node values.
  depthFirstSearch(start) {
    // Array to store the order of visited nodes
    const result = [];
    // Use a Set to keep track of visited nodes
    const visited = new Set();
    // Helper function for DFS
    const dfs = (node) => {
      // If the node is null or undefined, return early
      if (!node) return;
      // Add node to visited set
      visited.add(node);
      // Push the value of the node to the result array
      result.push(node.value);
      // Recursively visit all the adjacent nodes that haven't been visited
      node.adjacent.forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      });
    };
    // Initialize DFS with the start node
    dfs(start);
    // Return the array of visited node values
    return result;
  }

  // This function performs a Breadth-First Search (BFS) on a graph from a start node
  // and returns an array of visited node values.
  breadthFirstSearch(start) {
    // Array to store the order of visited nodes
    const result = [];
    // Use a Queue to manage the nodes to be visited
    const queue = [start];
    // Use a Set to keep track of visited nodes
    const visited = new Set();
    // Mark the start node as visited
    visited.add(start);

    // While there are nodes to be visited in the queue
    while (queue.length) {
      // Remove the first node from the queue
      let current = queue.shift();
      // Add the value of the node to the result array
      result.push(current.value);
      // Iterate over each adjacent node
      current.adjacent.forEach((neighbor) => {
        // If the neighbor hasn't been visited
        if (!visited.has(neighbor)) {
          // Mark it as visited
          visited.add(neighbor);
          // Add it to the queue for visiting
          queue.push(neighbor);
        }
      });
    }
    // Return the array of visited node values
    return result;
  }
}

module.exports = { Graph, Node };
