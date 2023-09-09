import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import bg from "./assets/bg.jpg";
import { BsGooglePlay } from "react-icons/bs";

const App = () => {
  const [search, setSearch] = useState("");
  const [trigger, setTrigger] = useState(true);
  const [fetchedData, setFetchedData] = useState();

  const fetch = async () => {
    try {
      const fetchedTask = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
      if (fetchedTask) {
        setFetchedData(fetchedTask.data.meals);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, [trigger]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (search === "") {
      alert("please enter receipe to search");
    } else {
      try {
        const fetchedTask = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
        );
        if (fetchedTask) {
          setFetchedData(fetchedTask.data.meals);
          setTrigger(!trigger);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setTrigger(!trigger);
    }
  };

  return (
    <div>
      <nav className='navbar d-flex justify-content-center'>
        <form
          className='d-flex gap-3'
          onSubmit={handleSearch}
        >
          <input
            type='text'
            name='search'
            id='search'
            value={search}
            onChange={(e) => handleInputChange(e)}
            className='search__input rounded px-2'
            placeholder='Search...'
          />
          <button className='button text-white rounded'>Search</button>
        </form>
      </nav>
      <img
        src={bg}
        className='img__bg'
        alt='...'
      />
      <main className='container mt-4 main__body'>
        <div className='results d-flex gap-3'>
          {fetchedData ? (
            fetchedData.map((item) => {
              return (
                <div
                  className='card'
                  key={item.idMeal}
                >
                  <div className='card-body'>
                    <h3 className='card-title text-center'>{item.strMeal}</h3>
                    <div className='img__holder'>
                      <img
                        className='card__img rounded'
                        src={item.strMealThumb}
                        alt='Card image'
                        style={{ width: "100%" }}
                      />
                    </div>

                    <div className='cuisine'>
                      <span>Cuisine types :{item.strArea}</span>
                      <span>Cuisine Category :{item.strCategory}</span>
                    </div>
                    <div className='text-center'>
                      <a
                        href={item.strYoutube}
                        target='_blank'
                        className='btn btn-primary play '
                      >
                        Watch Video <BsGooglePlay />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className='noitem text-white p-2 rounded'>No food found</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
