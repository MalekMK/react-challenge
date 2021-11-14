import { put, call } from "typed-redux-saga";
import { createSliceSaga } from "redux-toolkit-saga";
import axios, { AxiosResponse } from "axios";
import { setEdgesList, setNodesList } from "./eventSlice";
import { Edge, Node } from "react-flow-renderer";
import { PayloadAction } from "@reduxjs/toolkit";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
});

export const eventSaga = createSliceSaga({
  name: "eventSaga",
  caseSagas: {
    *getNodesList() {
      const response: AxiosResponse<Node[]> = yield* call(() =>
      api.get<Node[]>("/api/nodes/all")
      );
      yield* put(setNodesList(response.data));
    },
    *addNode(node: PayloadAction<Node>) {
      const data: any = {
        data: node.payload.data,
        position: node.payload.position,
        type: node.payload.type,
      };
      const response: AxiosResponse<Node[]> = yield* call(() =>
      api.post<Node[]>("/api/nodes/add", data)
      );
      yield* put(setNodesList(response.data));
    },
    *updateNode(node: PayloadAction<Node>) {
      const data: any = {
        data: node.payload.data,
        position: node.payload.position,
        type: node.payload.type,
      };
      const response: AxiosResponse<Node[]> = yield* call(() =>
      api.put<Node[]>(`/api/nodes/edit/${node.payload.id}`, data)
      );
      yield* put(setNodesList(response.data));
    },
    *deletetNode(id: PayloadAction<string>) {
      const response: AxiosResponse<Node[]> = yield* call(() =>
      api.delete<Node[]>(`/api/nodes/delete/${id.payload}`)
      );
      yield* put(setNodesList(response.data));
    },
    *getEdgesList() {
      const response: AxiosResponse<Edge[]> = yield* call(() =>
      api.get<Edge[]>("/api/edges/all")
      );
      yield* put(setEdgesList(response.data));
    },
    *addEdgeSaga(edge: PayloadAction<Edge>) {
      const data: any = edge.payload;
      const response: AxiosResponse<Edge[]> = yield* call(() =>
      api.post<Edge[]>("/api/edges/add", data)
      );
      yield* put(setEdgesList(response.data));
    },
    *updateEdge(edge: PayloadAction<Edge>) {
      const data: any = {
        source: edge.payload.source,
        target: edge.payload.target,
        sourceHandle: edge.payload.sourceHandle,
        targetHandle: edge.payload.targetHandle,
        animated: edge.payload.animated,
        arrowHeadType: edge.payload.arrowHeadType,
      };
      const response: AxiosResponse<Edge[]> = yield* call(() =>
      api.put<Edge[]>(`/api/edges/edit/${edge.payload.id}`, data)
      );
      yield* put(setEdgesList(response.data));
    },
    *deleteEdge(id: PayloadAction<string>) {
      const response: AxiosResponse<Edge[]> = yield* call(() =>
      api.delete<Edge[]>(`/api/edges/delete/${id.payload}`)
      );
      yield* put(setEdgesList(response.data));
    },
  },
});

export const {
  getNodesList,
  addNode,
  updateNode,
  deletetNode,
  getEdgesList,
  addEdgeSaga,
  updateEdge,
  deleteEdge,
} = eventSaga.actions;
