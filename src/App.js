import React,{useEffect,useState} from 'react';
import Collection from './collection'
import data from './data.json'
import './index.scss';



function App() {
    const [collections, setCollections] = React.useState([]);
    const [category,setCattegory]=useState([]);
    const [searchInput,setSearchInput]=useState('');
    const [changeTab,setChangeTab]=useState(0);
    useEffect(() => {
        // Поскольку данные уже импортированы, вы можете напрямую использовать переменную `data`
        setCollections(data.collections);
        setCattegory(data.categories)
        console.log(data.collections);
    }, []);

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
                      category={changeTab}
                      key={index}
                      name={obj.name}
                      images={obj.photos}
                  />
              ))
          }

      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
