import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Card from "./Book";
import { Link } from "react-router-dom";
import "./combined.css";

function Books(props) {
  const [books, setBooks] = useState([]);
  const [data, setData] = useState([]);

  const getUserName = sessionStorage.getItem("name");

  // const downTo = document.getElementsByClassName('logo')

  const scrollDown = useRef(null);
  // console.log(getUserName);

  useEffect((props) => {
    axios
      .get(
        "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=Gf320LcIwemeR0aKzOcGSXaa0azfw89n"
      )
      .then((response) => {
        // handle the response data
        setBooks(response.data.results.books);
        setData(response.data.results.books);
      })
      .catch((error) => {
        // handle the error
        console.log(error.message);
      });
  }, []);

  function onChangeHandler(el) {
    if (el.target.value === "") setBooks(data);
    let arr = [];
    data.map((e) => {
      if (e.title.toLowerCase().search(el.target.value.toLowerCase()) >= 0) {
        arr.push(e);
      }
      return 0;
    });
    setBooks(arr);
  }

  const goToBooks = () => {
    const element = document.getElementById("booksHolder");
    element.scrollIntoView();
  };

  return (
    <>
      <div className="navBar">
        <div className="navTop">
          <Link to={"/"}>
            {" "}
            <h2 id="logo" ref={scrollDown}>
              Kalvium Books
            </h2>
          </Link>
          {getUserName === null ? (
            <Link to={"/form"}>
              <button id="register">Register</button>
            </Link>
          ) : (
            <h1 className="user">Welcome {getUserName} !</h1>
          )}
        </div>

        <div className="navBottom">
          <input
            type="text"
            id="searchBar"
            placeholder="Search Books..."
            onChange={onChangeHandler}
          ></input>
          <button id="searchBox" onClick={goToBooks}></button>
        </div>
      </div>
      <div className="booksView" id="booksHolder">
        <div className="booksContainer">
          {books.length === 0 ? (
            <h1>Books not found!</h1>
          ) : (
            books.map(function (book, i) {
              return (
                <Card
                  keys={book.rank}
                  id={i}
                  image={book.book_image}
                  title={book.title}
                  author={book.author}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default Books;
