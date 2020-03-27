/**
 * @fileOverview Shape 工厂方法的测试
 * @author dxq613@gmai.com
 */

import G6 from '../../../src';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('register node', () => {
  
  const data = {
    nodes: [
      // group1 group2 -> p1
      {
        id: 'node1',
        label: 'node1',
        groupId: 'group1',
        parentId: 'p1',
        x: 100,
        y: 100,
      },
      {
        id: 'node2',
        label: 'node2',
        groupId: 'group1',
        parentId: 'p1',
        x: 100,
        y: 150,
      },
      {
        id: 'node3',
        label: 'node3',
        groupId: 'group1',
        parentId: 'p1',
        x: 100,
        y: 200,
      },
      {
        id: 'node10',
        label: 'node10',
        groupId: 'group2',
        parentId: 'p1',
        x: 200,
        y: 100,
      },
      {
        id: 'node11',
        label: 'node10',
        groupId: 'group2',
        parentId: 'p1',
        x: 200,
        y: 150,
      },
      {
        id: 'node12',
        label: 'node10',
        parentId: 'p1',
        groupId: 'group2',
        x: 200,
        y: 200,
      },

      // group3 -> p2
      {
        id: 'node3-1',
        label: 'node1',
        groupId: 'group3',
        parentId: 'p2',
        x: 350,
        y: 100,
      },
      {
        id: 'node3-2',
        label: 'node2',
        groupId: 'group3',
        parentId: 'p2',
        x: 350,
        y: 150,
      },
      {
        id: 'node3-3',
        label: 'node3',
        groupId: 'group3',
        parentId: 'p2',
        x: 350,
        y: 200,
      },

      // 集群2 
      // group5 group6 -> p4
      {
        id: 'node2-1',
        label: 'node1',
        groupId: 'group5',
        parentId: 'p4',
        x: 530,
        y: 100,
      },
      {
        id: 'node2-2',
        label: 'node2',
        groupId: 'group5',
        parentId: 'p4',
        x: 530,
        y: 150,
      },
      {
        id: 'node2-3',
        label: 'node3',
        groupId: 'group5',
        parentId: 'p4',
        x: 530,
        y: 200,
      },
      {
        id: 'node10-1',
        label: 'node',
        groupId: 'group6',
        parentId: 'p4',
        x: 630,
        y: 100,
      },
      {
        id: 'node11-1',
        label: 'node',
        groupId: 'group6',
        parentId: 'p4',
        x: 630,
        y: 150,
      },
      {
        id: 'node12-1',
        label: 'node',
        parentId: 'p4',
        groupId: 'group6',
        x: 630,
        y: 200,
      },

      // group7 -> p5
      {
        id: 'nod-1',
        label: 'node',
        groupId: 'group7',
        parentId: 'p5',
        x: 800,
        y: 100,
      },
      {
        id: 'nod-2',
        label: 'node',
        groupId: 'group7',
        parentId: 'p5',
        x: 800,
        y: 150,
      },
      {
        id: 'nod-3',
        label: 'node',
        parentId: 'p5',
        groupId: 'group7',
        x: 800,
        y: 200,
      },
    ],
    groups: [
      {
        id: 'group1',
        title: {
          text: '副本1',
          stroke: 'red',
          fill: 'yellow'
        },
        parentId: 'p1',
      },
      {
        id: 'group2',
        title: {
          text: '副本2',
          stroke: '#444',
          fill: 'yellow'
        },
        parentId: 'p1',
      },
      {
        id: 'group3',
        title: {
          text: '副本1',
          stroke: 'red',
          fill: 'yellow'
        },
        parentId: 'p2',
      },
      {
        id: 'group5',
        title: {
          text: '副本1',
          stroke: '#444',
          fill: 'yellow'
        },
        parentId: 'p4',
      },
      {
        id: 'group6',
        title: {
          text: '副本2',
          stroke: '#444',
          fill: 'yellow'
        },
        parentId: 'p4',
      },
      {
        id: 'group7',
        title: {
          text: '副本2',
          stroke: '#444',
          fill: 'yellow'
        },
        parentId: 'p5',
      },
      {
        id: 'p1',
        title: 'OC27',
        parentId: 'p3'
      },
      {
        id: 'p2',
        title: 'UTW',
        parentId: 'p3'
      },
      {
        id: 'p3',
        title: '集群1',
        parentId: 'gro'
      },
      {
        id: 'p4',
        title: 'OC27',
        parentId: 'p6'
      },
      {
        id: 'p5',
        title: 'UTW',
        parentId: 'p6'
      },
      {
        id: 'p6',
        title: '集群2',
        parentId: 'gro'
      },
      {
        id: 'gro',
        title: '集群组A'
      }
    ],
  };
  

  it('register node', () => {
    const graph = new G6.Graph({
      container: 'graph-spec',
      width: 1200,
      height: 800,
      defaultNode: {
        type: 'rect',
        size: [50,30],
        style: {
          fill: '#DEE9FF',
          stroke: '#5B8FF9',
        },
      },
      defaultEdge: {
        color: '#e2e2e2',
      },
      modes: {
        default: ['drag-canvas', 'zoom-canvas', 'drag-group', 'drag-node-with-group', 'collapse-expand-group'],
      },
      groupType: 'rect',
    });
    
    graph.data(data);
    graph.render();
  });
});
