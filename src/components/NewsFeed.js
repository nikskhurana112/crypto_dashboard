import { useEffect , useState} from "react";
import axios from 'axios'
const NewsFeed = () => {

  const [articles, setArticles] = useState(null)
  
  useEffect(() => {

    const options = {
      method: 'GET',
      url: 'http://localhost:8000/news/'
    }

    axios.request(options).then(function (response) {
      setArticles(response.data)
    }).catch(function (error) {
      console.log(error)
    });
  }, [])
  
  const first7Articles = articles?.slice(0, 7)
  
  return ( 
  <div className="news-feed">
    <h3>News Feed</h3>
    {first7Articles && first7Articles.map((article, _index) => (<div key={_index}><a href={article.url}><p>{article.title}</p></a></div>))}
  </div>)
}
 
export default NewsFeed;