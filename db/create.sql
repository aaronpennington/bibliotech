CREATE SCHEMA public;

CREATE TABLE author (
  id SERIAL NOT NULL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL
);

CREATE TABLE book (
  id SERIAL NOT NULL PRIMARY KEY, 
  title VARCHAR(255) NOT NULL,
  author INT NOT NULL REFERENCES author(id)
);

CREATE TABLE category (
  id SERIAL NOT NULL PRIMARY KEY, 
  category_name VARCHAR(255) NOT NULL
);

CREATE TABLE shelf (
  id SERIAL NOT NULL PRIMARY KEY,
  category_id INT NOT NULL REFERENCES category(id),
  book_id INT NOT NULL REFERENCES book(id)
);