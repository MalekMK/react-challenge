import { Document } from 'mongoose'

export interface IEdge extends Document {
    source: string
    target: string
    sourceHandle: string
    targetHandle: string
    animated: boolean
    arrowHeadType: string
}