import { PostsItem } from "../-page"
import { styled } from "styled-components"
import { ArticleDetail } from "./article-detail"
import { LoaderFunction, useLoaderData } from "react-router-dom"
import { Helmet } from "react-helmet-async"

const StyledDiv = styled.div`
  
`

export default function Page() {
  const { articleData } = useLoaderData() as {
    articleData: PostsItem | null | undefined
  }

  return <StyledDiv>
    {
      !!articleData && <>
        <Helmet>
          <title>{articleData.title}</title>
          <meta name="keywords" content={articleData.keywords.join(',')} />
        </Helmet>
        <ArticleDetail article={articleData}></ArticleDetail>
      </>
    }
    {
      articleData === null && <h3>文章不存在</h3>
    }
    {
      articleData === undefined && <h3>文章加载中</h3>
    }
  </StyledDiv>
}

/**
 * @param param0 
 * @returns 
 */
export const loader: LoaderFunction = async ({ request, params }) => {
  console.log('posts page loader func run')
  console.log(request.url, params)

  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  const urlOrigin = import.meta.env.SSR ? 'http://127.0.0.1:5000' : '';

  const rsp = await fetch(urlOrigin + '/api/posts/detail?id=' + id, {
    signal: request.signal,
    headers: {
      ...request.headers,
    }
  });

  if (rsp.status === 200) {
    const rspData = await rsp.json() as {
      success: boolean,
      message: string;
      data: PostsItem | null
    };
    if (rspData.success) {
      return {
        articleData: rspData.data
      };
    }
  }

  throw new Error('请求文章数据出错')
}