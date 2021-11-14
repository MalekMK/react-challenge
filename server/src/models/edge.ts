import { IEdge } from '../types/edge';
import { model, Schema } from 'mongoose'

const edgeSchema: Schema = new Schema({
    source: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    },
    sourceHandle: {
        type: String,
        required: false
    },
    targetHandle: {
        type: String,
        required: false
    },
    animated: {
        type: Boolean,
        required: true
    },
    arrowHeadType: {
        type: String,
        required: true
    },
    
})

edgeSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

export default model<IEdge>('Edge', edgeSchema)