## Information Security Projects - SHA-1 Password Cracker

This project is a simple SHA-1 password cracker. It has fulfilled all the requirements and pass all the tests for the FCC [Information Security Projects - SHA-1 Password Cracker](https://www.freecodecamp.org/learn/information-security/information-security-projects/sha-1-password-cracker) project.

### About

This project is completed as an assignment of Free Code Camp. It is coded using Python 3 and utilises the hashlib library.

It works by bruteforcing and checking for collisions between the provided hash and the hash result returned by hashing the passwords provided in the top-10000-passwords list.

### Assignment & Documentation

Passwords should never be stored in plain text. They should be stored as hashes, just in case the password list is discovered. However, not all hashes are created equal. 

For this project, I have creating a password cracker to figure out passwords that were hashed using SHA-1.

It has a function that takes in a SHA-1 hash of a password and returns the password if it is one of the top 10,000 passwords used. If the SHA-1 hash is NOT of a password in the database, it would return "PASSWORD NOT IN DATABASE".

The function hashes each password from `top-10000-passwords.txt` and compare it to the hash passed into the function.

The function can take an optional second argument named `use_salts`. If set to true, each salt string from the file `known-salts.txt` would be **appended** AND **prepended** to each password from `top-10000-passwords.txt` before hashing and before comparing it to the hash passed into the function.

Here are some hashed passwords to test the function with:
* `b305921a3723cd5d70a375cd21a61e60aabb84ec` should return "sammy123"
* `c7ab388a5ebefbf4d550652f1eb4d833e5316e3e` should return "abacab"
* `5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8` should return "password"

Here are some hashed passwords to test the function with when `use_salts` is set to `True`:
* `53d8b3dc9d39f0184144674e310185e41a87ffd5` should return "superman"
* `da5a4e8cf89539e66097acd2f8af128acae2f8ae` should return "q1w2e3r4t5"
* `ea3f62d498e3b98557f9f9cd0d905028b3b019e1` should return "bubbles1"

### Development

The code is written in `password_cracker.py`. For development, you can use `main.py` to test your code. Click the "run" button and `main.py` will run.

### Testing 

The unit tests for this project are in `test_module.py`. Tests are imported from `test_module.py` to `main.py` for your convenience. The tests will run automatically whenever you hit the "run" button.
