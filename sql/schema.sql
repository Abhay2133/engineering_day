CREATE TABLE RegistrationForm (
    UniversityRollNo VARCHAR(50) PRIMARY KEY,
    EmailAddress VARCHAR(255) UNIQUE NOT NULL,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Branch VARCHAR(100) NOT NULL,
    Department VARCHAR(100) NOT NULL,
    Year INT NOT NULL,
    PhoneNumber VARCHAR(15) NOT NULL,
    SelectedEvents TEXT NOT NULL
);
