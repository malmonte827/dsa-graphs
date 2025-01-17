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
        for (let node of this.nodes) {
            if (node.adjacent.has(vertex)) {
                node.adjacent.delete(vertex);
            }
        }
        this.nodes.delete(vertex);
    }

    // this function returns an array of Node values using DFS
    depthFirstSearch(start) {
        let visited = new Set();
        let results = [];

        function transverse(vertex) {
            if (!vertex) {
                return null;
            }

            visited.add(vertex);
            results.push(results);

            vertex.adjacent.forEach((value) => {
                if (!visited.has(value)) {
                    return transverse(value);
                }
            });
        }
        transverse(start);

        return results;
    }

    // this function returns an array of Node values using BFS
    breadthFirstSearch(start) {
        let queue = [start];
        let visited = new Set();
        let results = [];
        let currentVertex;

        visited.add(start);

        while (queue.length) {
            currentVertex = queue.shift();
            results.push(currentVertex.value);

            currentVertex.adjacent.forEach((value) => {
                if (!visited.has(value)) {
                    visited.add(value);
                    queue.push(value);
                }
            });
        }
        return results;
    }
}

module.exports = { Graph, Node };
