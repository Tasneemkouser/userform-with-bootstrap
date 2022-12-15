import React, { createContext, useState, useEffect } from "react";

export const EmployeeContext = createContext();

export default function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem("employees") || "[]")
  );
  /* {
			id: (new Date()).getTime(),
            firstName: 'Syed',
            lastName: 'Tasneem',
            email: 'syed@tasneem.me',
            contactNo: '9876543210',
            dateOfBirth: '01/01/1999',
            gender: 'Female',
            country: 'India',
            state: 'AP',
            city: 'Ongole',
            address: 'Islampet Area',
            hobbies: ['Reading Books', 'Tv'],
        },
		{
			id: (new Date()).getTime() + 1,
            firstName: 'Ranga',
            lastName: 'Raju',
            email: 'Ranga@Raju.me',
            contactNo: '787878900',
            dateOfBirth: '01/05/1992',
            gender: 'Male',
            country: 'India',
            state: 'Andhra Pradesh',
            city: 'Guntur',
            address: 'Arundelpet 4th lane',
            hobbies: ['Tv'],
        },
		{
			id: (new Date()).getTime() + 2,
            firstName: 'Shaik',
            lastName: 'Afrah',
            email: 'shaik@afrah.me',
            contactNo: '9876543210',
            dateOfBirth: '01/01/1999',
            gender: 'Female',
            country: 'India',
            state: 'AP',
            city: 'Ongole',
            address: 'Islampet Area',
            hobbies: ['Reading', 'Browsing'],
        }
    }

*/

  useEffect(() => {
    // Get the data from local storage
    const employees = JSON.parse(localStorage.getItem("employees") || "[]");

    // Update the state with the data from local storage
    if (employees) {
      setEmployees(employees);
    }
  }, []);

  useEffect(() => {
    // Store the data in local storage
    if (employees) {
      localStorage.setItem("employees", JSON.stringify(employees));
    }
  }, [employees]);

  // Create state variables to store the data
  const [data, setData] = useState({});

  // Use the useEffect hook to retrieve the data from local storage
  useEffect(() => {
    const dataFromStorage = localStorage.getItem("data");
    if (dataFromStorage) {
      setData(JSON.parse(dataFromStorage));
    }
  }, []);

  const [selectEmployee, setSelectEmployee] = useState(null);

  const createEmployee = (newUserDetails) => {
    setEmployees([...employees, { id: Date.now(), ...newUserDetails }]);
  };

  const readEmployee = (id) => {
    return employees.find((employee) => employee.id === id);
  };

  const updateEmployee = (id, updateFields) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === id ? { id, ...updateFields } : employee
      )
    );
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const getEmployee = (id) => {
    return data[id];
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        createEmployee,
        readEmployee,
        updateEmployee,
        deleteEmployee,
        setSelectEmployee,
        selectEmployee,
        getEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}
