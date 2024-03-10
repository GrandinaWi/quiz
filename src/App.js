import React,{useEffect,useState} from 'react';
import Collection from './collection'
import data from './data.json'
import './index.scss';



function App() {
    const [collections, setCollections] = React.useState([]);
    const [category,setCattegory]=useState([]);
    const [searchInput,setSearchInput]=useState('');
    const [changeTab,setChangeTab]=useState(0);
    const [isLoading,setIsLoading]=useState(true);
    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            try {
                const response = await fetch('./data.json');
                const data = await response.json();
                setCollections(data.collections);
                setCattegory(data.categories);

            } catch (error) {
                alert('Ошибка при загрузке данных:');
            }
            finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }
        };
        fetchData();
    }, [changeTab]);

    function onChangeTab(index){
        setChangeTab(index)
    }


  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
            {
                category.map((cat,index)=> (
                    <li onClick={()=>onChangeTab(index)} key={index} className={changeTab === index ? 'active' : ''}>{cat.name}</li>
                ))
            }
        </ul>
        <input value={searchInput} onChange={e => setSearchInput(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
          {
              collections.filter((obj)=>{
                  return obj.name.toLowerCase().includes(searchInput.toLowerCase())
              }).filter((obj)=>{
                  if (changeTab==0) {
                      return true
                  }else {
                      return obj.category === changeTab;
                  }
              }).map((obj,index)=>(
                  <Collection
                      key={index}
                      name={obj.name}
                      images={obj.photos}
                      isLoading={isLoading}
                  />
              ))
          }

      </div>
    </div>
  );
}

export default App;
