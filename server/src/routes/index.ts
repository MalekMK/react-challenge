import { Router } from 'express'
import { getEdges, addEdge, updateEdge, deleteEdge } from '../controllers/edge'
import { getNodes, addNode, updateNode, deleteNode } from '../controllers/node'

const router: Router = Router()

router.get('/api/nodes/all', getNodes)

router.post('/api/nodes/add', addNode)

router.put('/api/nodes/edit/:id', updateNode)

router.delete('/api/nodes/delete/:id', deleteNode)

router.get('/api/edges/all', getEdges)

router.post('/api/edges/add', addEdge)

router.put('/api/edges/edit/:id', updateEdge)

router.delete('/api/edges/delete/:id', deleteEdge)

export default router
