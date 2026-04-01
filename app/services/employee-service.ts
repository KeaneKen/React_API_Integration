import type { ApiResponse, Employee } from '../types/employee';

const EMPLOYEES_URL = 'https://dummy.restapiexample.com/api/v1/employees';

export const fetchEmployeesFromApi = async (): Promise<Employee[]> => {
  const response = await fetch(EMPLOYEES_URL);
  const json: ApiResponse = await response.json();

  return json.data.map((employee) => ({
    ...employee,
    employee_age: Number(employee.employee_age),
    employee_salary: Number(employee.employee_salary),
  }));
};