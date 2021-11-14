import { Response, Request } from 'express'
import { IEdge } from '../../types/edge'
import Edge from '../../models/edge'

export const getEdges = async (req: Request, res: Response): Promise<void> => {
    try {
        const allEdges: IEdge[] = await Edge.find()
        res.status(200).json(allEdges)
    } catch (error) {
        throw error
    }
}

export const addEdge = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IEdge, 'source' | 'target'| 'sourceHandle'| 'targetHandle'| 'animated'| 'arrowHeadType'>
		const edge: IEdge = new Edge({
            source: body.source,
            target: body.target,
            sourceHandle: body.sourceHandle,
            targetHandle: body.targetHandle,
            animated: body.animated,
            arrowHeadType: body.arrowHeadType,
        }) 
        await edge.save()
        const allEdges: IEdge[] = await Edge.find()
        res.status(201).json(allEdges)
    } catch (error) {
        throw error
    }
}

export const updateEdge = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req
        await Edge.findByIdAndUpdate(
            { _id: id },
            body
        )
        const allEdges: IEdge[] = await Edge.find()
        res.status(200).json(allEdges)
    } catch (error) {
        throw error
    }
}

export const deleteEdge = async (req: Request, res: Response): Promise<void> => {
    try {
        await Edge.findByIdAndRemove(
            req.params.id
        )
        const allEdges: IEdge[] = await Edge.find()
        res.status(200).json(allEdges)
    } catch (error) {
        throw error
    }
}
