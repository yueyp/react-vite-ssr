
import express from 'express';
import { postsDataList } from './posts-mock';

export const apiPostsRouter = express.Router();

apiPostsRouter.use('/list', (req, res) => {
  res.json({
    success: true,
    message: '',
    data: postsDataList.map((t) => {
      return {
        ...t,
        content: undefined
      }
    })
  })
})

apiPostsRouter.use('/detail', (req, res) => {
  const id = String(req.query.id ?? '');

  const postsItem = postsDataList.find((t) => {
    return String(t.id) === id;
  })

  if (postsItem) {
    res.json({
      success: true,
      message: '',
      data: postsItem,
    })
    return;
  }



  res.json({
    success: false,
    message: '文章未找到',
    data: null
  })
})