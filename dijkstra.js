const PriorityQueue = require('./PriorityQueue.js');
const testGraph = require('./testGraph.js');

const dijkstras = (graph, startingVertex) => {
	const distances = {};
	const previous = {};
  const queue = new PriorityQueue;
  queue.add({vertex: startingVertex, priority: 0});

	graph.vertices.forEach((vertex) => {
		distances[vertex.data] = Infinity;
		previous[vertex.data] = null;
	});

	distances[startingVertex.data] = 0;

  while (!queue.isEmpty()) {
    const {vertex} = queue.popMin();

    vertex.edges.forEach((edge) => {
      const alternate = edge.weight + distances[vertex.data];
      const neighborValue = edge.end.data;

      if (alternate < distances[neighborValue]) {
        distances[neighborValue] = alternate;
        previous[neighborValue] = vertex;
        queue.add({vertex: edge.end, priority: distances[neighborValue]});
      }
	  });
  }
	return { distances, previous };
};

const results = dijkstras(testGraph, testGraph.vertices[0]);
console.log(results);

module.exports = dijkstras;
