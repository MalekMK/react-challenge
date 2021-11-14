import React, { useState, DragEvent, MouseEvent } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  OnLoadParams,
  Elements,
  Connection,
  Edge,
  Node,
  ArrowHeadType,
} from 'react-flow-renderer';

import Sidebar from './Sidebar';
import {
  getNodesList,
  addNode,
  updateNode,
  deletetNode,
  getEdgesList,
  addEdgeSaga,
  deleteEdge,
} from './eventSaga'
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

export const DnDFlow = () => {
  const dispatch = useAppDispatch()
  const [nodeName, setNodeName] = React.useState('')
  const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
  const [elements, setElements] = useState<Elements>([]);
  const [links, setLinks] = useState<Edge[]>([]);
  const { nodesList, edgesList } = useAppSelector(state => state.events)

  React.useEffect(() => {
    dispatch(getNodesList())
    dispatch(getEdgesList())
  }, [dispatch])

  React.useEffect(() => {
    setElements([...nodesList, ...edgesList])
    setLinks(edgesList)
  }, [edgesList, nodesList])


  const onConnect = (params: Connection | Edge) => {
    if (links.every(elt => elt.target !== params.target && elt.source !== params.source)) {
      dispatch(addEdgeSaga({
        id: '',
        source: params.source || '',
        sourceHandle: null,
        target: params.target || '',
        targetHandle: null,
        arrowHeadType: ArrowHeadType.Arrow,
        animated: true
      }))
    }
  }
  const onElementsRemove = (elementsToRemove: Elements) => {
    elementsToRemove.forEach(elt => {
      console.log({ elt })
      if (elt.data) {
        dispatch(deletetNode(elt.id))
      } else {
        dispatch(deleteEdge(elt.id))
      }
    })
  };
  const onLoad = (_reactFlowInstance: OnLoadParams) => setReactFlowInstance(_reactFlowInstance);
  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    if (reactFlowInstance) {
      const type = event.dataTransfer.getData('nodeType');
      const name = event.dataTransfer.getData('nodeName');
      const position = reactFlowInstance.project({ x: event.clientX, y: event.clientY - 40 });
      dispatch(addNode({
        id: '',
        type,
        position,
        data: { label: name },
      }))
      setNodeName('')
    }
  };
  const onUpdateDrop = (event: MouseEvent, node: Node<any>) => {
    event.preventDefault();
    dispatch(updateNode({
      id: node.id,
      type: node.type,
      position: { x: node.position.x + event.movementX, y: node.position.y + event.movementY },
      data: node.data,
    }))
  };
  return (
    <div className="flex flex-column h-full">
      <ReactFlowProvider>
        <Sidebar nodeName={nodeName} setNodeName={setNodeName} />
        <div className="h-full flex-grow">
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeDragStop={onUpdateDrop}
          >
            <Controls />
          </ReactFlow>
        </div>


      </ReactFlowProvider>
    </div>
  );
};