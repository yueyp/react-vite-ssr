/**
 * 生成自百度AI
 * 
 你是一个编程高手，请以 {
    id: number;
    time: string;
    title: string;
    keywords: string[];
    description: string;
    content: string;
    author: string;
} 为数据项，使用React，typescript, styled-components，帮我实现一个文章列表的组件
 * 
 * 
 */
import styled from 'styled-components';
import { PostsItem } from '../../api/posts';
import { NavLink } from 'react-router-dom';

const ArticleListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
`;

const ArticleItem = styled.div`
  margin-right: 1rem;
  margin-bottom: 1rem;
  width: 30%;

  &:last-child {
    margin-right: 0;
  }
`;

const ArticleMeta = styled.div`
  font-size: 0.9rem;
  color: #888;
`;

const ArticleTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Article = ({ article }: {
  article: PostsItem
}) => {
  return (
    <ArticleItem>
      <ArticleTitle>
        <NavLink to={'/posts/detail?id=' + article.id}>{article.title}</NavLink>
      </ArticleTitle>
      <ArticleMeta>
        {article.time} by {article.author} - {article.keywords.join(', ')}
      </ArticleMeta>
      <p>{article.description}</p>
    </ArticleItem>
  );
};

export const ArticleList = ({ articles }: {
  articles: PostsItem[]
}) => {
  return (
    <ArticleListWrapper>
      {articles.map((article, index) => (
        <Article key={index} article={article} />
      ))}
    </ArticleListWrapper>
  );
};

export default ArticleList;