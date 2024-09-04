CREATE TABLE RegistrationForm (
    UniversityRollNo VARCHAR(50) PRIMARY KEY,
    EmailAddress VARCHAR(255) UNIQUE NOT NULL,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Branch VARCHAR(100) NOT NULL,
    Department VARCHAR(100) NOT NULL,
    Year INT NOT NULL,
    PhoneNumber VARCHAR(15) NOT NULL,
    SelectedEvents TEXT[],
    Gender VARCHAR(10) NOT NULL,
    Semester int NOT NULL,
    Payment_Verified BOOLEAN NOT NULL DEFAULT FALSE,
    Transaction_ID VARCHAR(255),
    Transaction_Amount DECIMAL(10, 2)
);

CREATE TABLE BGMI_Registrations (
    UniversityRollNo VARCHAR(50) PRIMARY KEY,
    TeamName VARCHAR(100) NOT NULL,
    TeamLeader VARCHAR(100) NOT NULL,
    Player2 VARCHAR(100),
    Player3 VARCHAR(100),
    Player4 VARCHAR(100),
    Year INT NOT NULL,
    Semester INT NOT NULL,
    Gender VARCHAR(10) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Phone VARCHAR(15) NOT NULL,
    Department VARCHAR(100) NOT NULL,
    
    Payment_Verified BOOLEAN NOT NULL DEFAULT FALSE,
    Transaction_ID VARCHAR(255),
    Transaction_Amount DECIMAL(10, 2)
);

