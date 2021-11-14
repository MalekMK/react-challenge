import { INode } from '../types/node';
import { model, Schema } from 'mongoose';

const nodeSchema: Schema = new Schema({
    data: {
        label: {
            type: String,
            required: true
        },
    },

    position: {
        x: {
            type: Number,
            required: true
        },
        y:{
            type: Number,
            required: true
        },
    },

    type: {
        type: String,
        required: false
    },

})

nodeSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

export default model<INode>('Node', nodeSchema)