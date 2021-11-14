import React, { DragEvent } from 'react';

interface SidebarProps {
  setNodeName: (value: string) => void;
  nodeName: string;
}

const onDragStart = (event: DragEvent, nodeType: string, nodeName: string) => {
  event.dataTransfer.setData('nodeType', nodeType);
  event.dataTransfer.setData('nodeName', nodeName);
  event.dataTransfer.effectAllowed = 'move';
};

const Sidebar = (props: SidebarProps) => {
  const { nodeName, setNodeName } = props
  const [eventType, setEventType] = React.useState('default')
  return (
    <aside className="w-1/6 bg-blue-400">
      <div className="mx-5 mt-2">Type the event name and choose the type then drag and drop the block in the right panel</div>
      <input type='text' className="my-4 mx-5 w-4/5 rounded-sm" value={nodeName} onChange={(event) => setNodeName(event.target.value)} />
        <div className="block mt-2 mx-5">
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="radio"
                onChange={(event) => setEventType('input')}
              />
              <span className="ml-2">Input Node</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input type="radio" className="form-radio" name="radio" defaultChecked onChange={(event) => setEventType('default')} />
              <span className="ml-2">Default Node</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input type="radio" className="form-radio" name="radio" onChange={(event) => setEventType('output')} />
              <span className="ml-2">Output Node</span>
            </label>
          </div>
      </div>
      <div className={`mx-16 my-10 react-flow__node-${eventType}`} onDragStart={(event: DragEvent) => onDragStart(event, eventType, nodeName)} draggable>
        {nodeName}
      </div>
    </aside>
  );
};

export default Sidebar;