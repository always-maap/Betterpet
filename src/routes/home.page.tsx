import { useQuery } from '@apollo/client';

import { POSTS } from '../apis/posts';

function HomePage() {
  const { data } = useQuery(POSTS);

  console.log(data);

  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

export default HomePage;
