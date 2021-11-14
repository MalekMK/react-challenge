import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Edge,Node } from "react-flow-renderer";

interface EventState {
  nodesList: Node[];
  edgesList: Edge[];
}

const initialState: EventState = {
  nodesList: [],
  edgesList: [],
};

export const eventSlice = createSlice({
  name: "eventReducer",
  initialState,
  reducers: {
    setEdgesList: (state, action: PayloadAction<Edge[]>) => {
      state.edgesList = action.payload;
    },
    setNodesList: (state, action: PayloadAction<Node[]>) => {
      state.nodesList = action.payload;
    },
  },
});

export const { setEdgesList,setNodesList } = eventSlice.actions;
