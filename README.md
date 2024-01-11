# JsonPowerDB Form Project

## Table of Contents
1. [Title of the Project](#title-of-the-project)
2. [Description](#description)
3. [Benefits of using JsonPowerDB](#benefits-of-using-jsonpowerdb)
4. [Release History](#release-history)
5. [Scope of Functionalities](#form-functionality)
6. [Project Status](#project-status)
7. [Sources](#sources)
8. [Other Information](#other-information)

## Title of the Project
JsonPowerDB Micro Project: Student Enrollment Form

## Description
This project focuses on creating a Student Enrollment Form that stores data in the STUDENT-TABLE relation of the SCHOOL-DB database using JsonPowerDB. The form features essential functionalities such as data entry, validation, saving, updating, and resetting.

## Benefits of using JsonPowerDB
- JsonPowerDB provides a schema-free and serverless database solution.
- It supports multi-model functionality, accommodating various data structures.
- Real-time data processing enhances application responsiveness.
- The REST API-based approach simplifies integration and interaction with the database.

## Release History
- v1.0 (Date): Initial release of the Student Enrollment Form project on Github.

## Form Functionality
- The form ensures an empty state on page load or button click.
- The cursor remains at the primary key field, 'Roll-No,' which is disabled initially.
- Buttons ([Save], [Update], [Reset]) are disabled, except [Save] and [Reset] when the primary key value is absent in the database.
- Users enter data, ensuring validity with no empty fields.
- Clicking [Save] stores the data in the database.
- If the primary key exists, data is displayed, enabling [Update] and [Reset] for modifications.
- [Update] updates the data in the database.
- [Reset] resets the form as per the initial state.

## Project Status
Active

## Sources
- JsonPowerDB Documentation
- Web Development Resources

## Other Information
For detailed implementation and usage instructions, refer to the project documentation.
