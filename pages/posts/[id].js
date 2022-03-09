import Layout from '../../components/Layout';
import { getAllPostsIds, getPostData } from '../../lib/posts';

import Head from 'next/head';
import Date from '../../components/Date';
import styles from '../../styles/Utils.module.css';

const Post = ({ post }) => {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={styles.headingXl}>{post.title}</h1>
        <div className={styles.lightText}>
          <Date dateString={post.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const paths = getAllPostsIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const post = await getPostData(id);

  return {
    props: {
      post,
    },
  };
};

export default Post;
