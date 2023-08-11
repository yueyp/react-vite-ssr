import ArticleList from "./article-list";
import styled from 'styled-components'
import { ActionFunction, LoaderFunction, useLoaderData } from "react-router-dom";
export interface PostsItem {
  id: number;
  time: string;
  title: string;
  keywords: string[];
  description: string;
  content: string;
  author: string;
}

const StyledDiv = styled.div`
>h2 {
  text-align: center;
}
`

export default function Page() {
  // useLoaderData提供从路由加载器返回的值
  const {
    postsList
  } = useLoaderData() as {
    postsList: PostsItem[]
  };
  
  return <StyledDiv>
    <h2>
      文章列表页
    </h2>
    <ArticleList articles={postsList}></ArticleList>
  </StyledDiv>
}

/**
 * @param param0 
 * @returns 
 */
export const loader: LoaderFunction = async ({ request, params }) => {
  console.log('posts page loader func run')
  console.log(request.url, params)

  const urlOrigin = import.meta.env.SSR ? 'http://127.0.0.1:5000' : '';

  const rsp = await fetch(urlOrigin + '/api/posts/list',{
    signal: request.signal,
    headers: {
      ...request.headers,
    }
  });

  if (rsp.status === 200) {
    const rspData = await rsp.json() as {
      success: boolean,
      message: string;
      data: PostsItem[]
    };
    if (rspData.success) {
      return {
        postsList: rspData.data
      };
    }
  }

  throw new Error('请求文章列表数据出错')
}

/**
 * action 函数仅在非get方式的请求中触发
 * Actions are called whenever the app sends a non-get submission ("post", "put", "patch", "delete") to your route. 
 */
export const action: ActionFunction = () => {
  console.log('posts page action func run');

  return {
    ok: true,
  }
}