INSERT INTO author (full_name)
        VALUES("John Steinbeck");

INSERT INTO author (full_name)
        VALUES("CS Lewis");

INSERT INTO author (full_name)
        VALUES("Robert Frost");

INSERT INTO book (title, author)
        VALUES("East of Eden", 1);

INSERT INTO book (title, author)
        VALUES("Grapes of Wrath", 1);

INSERT INTO book (title, author)
        VALUES("Lion, Witch, Wardrobe", 2);

INSERT INTO book (title, author)
        VALUES("Road Not Taken", 3);

INSERT INTO category (category_name)
        VALUES("Fiction")

INSERT INTO category (category_name)
        VALUES("Fantasy")

INSERT INTO category (category_name)
        VALUES("Poetry")

INSERT INTO shelf (shelf_name, category_id, book_id)
        VALUES(1, 1)

INSERT INTO shelf (shelf_name, category_id, book_id)
        VALUES(1, 2)

INSERT INTO shelf (shelf_name, category_id, book_id)
        VALUES(1, 3)

INSERT INTO shelf (shelf_name, category_id, book_id)
        VALUES(3, 4)