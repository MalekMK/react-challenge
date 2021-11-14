import { Response, Request } from 'express'
import { INode } from '../../types/node'
import Node from '../../models/node'

export const getNodes = async (req: Request, res: Response): Promise<void> => {
    try {
        const allNodes: INode[] = await Node.find()
        res.status(200).json(allNodes)
    } catch (error) {
        throw error
    }
}

export const addNode = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<INode, 'data' | 'position' | 'type'>
		const node: INode = new Node({
            data: body.data,
            position: body.position,
            type: body.type,
        }) 
        await node.save()
        const allNodes: INode[] = await Node.find()
        res.status(201).json(allNodes)
    } catch (error) {
        throw error
    }
}

export const updateNode = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req
        await Node.findByIdAndUpdate(
            { _id: id },
            body
        )
        const allNodes: INode[] = await Node.find()
        res.status(200).json(allNodes)
    } catch (error) {
        throw error
    }
}

export const deleteNode = async (req: Request, res: Response): Promise<void> => {
    try {
        await Node.findByIdAndRemove(
            req.params.id
        )
        const allNodes: INode[] = await Node.find()
        res.status(200).json(allNodes)
    } catch (error) {
        throw error
    }
}
