import type { Employee } from '../types/employee';

export const filterHighSalaryEmployees = (employees: Employee[]): Employee[] => {
  return employees.filter((employee) => employee.employee_salary > 500000);
};

export const getEmployeeCardColor = (age: number): string => {
  if (age >= 50) return '#008000';
  if (age >= 40) return '#FFFF00';
  if (age >= 30) return '#add8e6';
  if (age >= 20) return '#ffcccc';
  return '#FFF3E0';
};