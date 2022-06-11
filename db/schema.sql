DROP DATABASE IF EXISTS bookstore_db;

CREATE DATABASE bookstore_db;

USE bookstore_db; 

CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    booktype VARCHAR(30) NOT NULL, 
    bookname VARCHAR(30) NOT NULL,
    bookimage VARCHAR(60) NOT NULL,
    price DECIMAL NOT NULL
);