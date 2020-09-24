use employees_db;

INSERT into department (name) VALUES ("Pilots");
INSERT into department (name) VALUES ("Science");
INSERT into department (name) VALUES ("Field Expertise");
INSERT into department (name) VALUES ("Civil");

INSERT into role (title, salary, department_id) VALUES ("Spaceship Pilot", 250000, 1);
INSERT into role (title, salary, department_id) VALUES ("Flight Engineer", 100000, 1);
INSERT into role (title, salary, department_id) VALUES ("Scientist", 100000, 2);
INSERT into role (title, salary, department_id) VALUES ("Moon Scientist", 900000, 2);
INSERT into role (title, salary, department_id) VALUES ("IT expertise", 100000, 3);
INSERT into role (title, salary, department_id) VALUES ("Com expertise", 30000, 3);
INSERT into role (title, salary, department_id) VALUES ("Rover expertise", 30000, 3);
INSERT into role (title, salary, department_id) VALUES ("Satelite expertise", 30000, 3);
INSERT into role (title, salary, department_id) VALUES ("Moon lab expertise", 80000, 4);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Gus", "Grissom", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Ed", "White", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Roger B.", "Chafee", 6, 1);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Wally", "Schirra", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Walt", "Cunnungham", 3, 2);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Donn", "Eisele", 9, 2);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Frank", "Borman", 8, 2);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Neil", "Armstrong", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Michael", "Collins", 7, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Buzz", "Aldrin", 6 , 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("James", "Lovell", 5 , 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Edgar", "Mitchel", 4 , 3);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("C. Pete", "Conrad", 9, null);