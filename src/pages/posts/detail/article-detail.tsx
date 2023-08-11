/**
生成自百度AI
你是一个编程高手，请以 {
    id: number;
    time: string;
    title: string;
    keywords: string[];
    description: string;
    content: string;
    author: string;
} 为数据项，使用React，TS，styled-components，帮我实现一个文章详情的组件

 */
import styled from 'styled-components';
import { PostsItem } from '../../../api/posts';

const ArticleDetailWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const ArticleTitle = styled.h1`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const ArticleMeta = styled.div`
  font-size: 0.9rem;
  color: #888;
`;

const ArticleContent = styled.div`
  font-size: 1rem;
  color: #333;
`;

export const ArticleDetail = ({ article }: {
  article: PostsItem
}) => {
  return (
    <ArticleDetailWrapper>
      <ArticleTitle>{article.title}</ArticleTitle>
      <ArticleMeta>
        {article.time} by {article.author} - {article.keywords.join(', ')}
      </ArticleMeta>
      <ArticleContent>{article.content}</ArticleContent>
    </ArticleDetailWrapper>
  );
};
