-- Create students table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    age INTEGER NOT NULL,
    parent_id INTEGER NULL
);

-- Create marks table
CREATE TABLE marks (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL,
    subject VARCHAR(100) NOT NULL,
    marks INTEGER NOT NULL CHECK (marks >= 0 AND marks <= 100),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

INSERT INTO students (id, name, email, age, parent_id) VALUES
(1, 'Shubham', 'shubham@gmail.com', 21, NULL),
(2, 'Sanket', 'sanket@gmail.com', 22, NULL),
(3, 'Parag', 'parag@gmail.com', 20, NULL),
(4, 'Pratik', 'pratik@gmail.com', 23, NULL),
(5, 'Hrushikesh', 'hrushikesh@gmail.com', 21, NULL),
(6, 'Nayan', 'nayan@gmail.com', 22, NULL),
(7, 'Kartik', 'kartik@gmail.com', 20, NULL),
(8, 'Girish', 'girish@gmail.com', 24, NULL),
(9, 'Krushna', 'krushna@gmail.com', 22, NULL),
(10, 'Sanjay', 'sanjay@gmail.com', 23, NULL),
(11, 'Amit', 'amit@gmail.com', 21, NULL),
(12, 'Rahul', 'rahul@gmail.com', 22, NULL),
(13, 'Rohit', 'rohit@gmail.com', 20, NULL),
(14, 'Akash', 'akash@gmail.com', 21, NULL),
(15, 'Vishal', 'vishal@gmail.com', 23, NULL),
(16, 'Swapnil', 'swapnil@gmail.com', 22, NULL),
(17, 'Pankaj', 'pankaj@gmail.com', 24, NULL),
(18, 'Manoj', 'manoj@gmail.com', 25, NULL),
(19, 'Deepak', 'deepak@gmail.com', 21, NULL),
(20, 'Aniket', 'aniket@gmail.com', 22, NULL),
(23, 'Arjun', 'arjun@gmail.com', 30, NULL);


SELECT setval('students_id_seq', (SELECT MAX(id) FROM students));

INSERT INTO marks (student_id, subject, marks) VALUES
(1, 'Mathematics', 85),
(1, 'Science', 78),
(1, 'English', 92),

(2, 'Mathematics', 88),
(2, 'Science', 82),
(2, 'English', 76),

(3, 'Mathematics', 90),
(3, 'Science', 85),
(3, 'English', 88),

(4, 'Mathematics', 75),
(4, 'Science', 80),
(4, 'English', 84),

(5, 'Mathematics', 92),
(5, 'Science', 89),
(5, 'English', 87),

(6, 'Mathematics', 78),
(6, 'Science', 75),
(6, 'English', 81),

(7, 'Mathematics', 86),
(7, 'Science', 90),
(7, 'English', 79),

(8, 'Mathematics', 91),
(8, 'Science', 88),
(8, 'English', 85),

(9, 'Mathematics', 83),
(9, 'Science', 86),
(9, 'English', 90),

(10, 'Mathematics', 87),
(10, 'Science', 84),
(10, 'English', 82),

(11, 'Mathematics', 89),
(11, 'Science', 91),

(12, 'Mathematics', 77),
(12, 'English', 86);
