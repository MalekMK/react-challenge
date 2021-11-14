import { Document } from 'mongoose'

export interface INode extends Document {
    data: IData
    position: IPosition
    type: string
}

export interface IPosition extends Document {
    x: number
    y: number
}

export interface IData extends Document {
    label: string
}