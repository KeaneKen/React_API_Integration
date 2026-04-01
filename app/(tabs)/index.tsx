import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { fetchEmployeesFromApi } from '../services/employee-service';
import type { Employee } from '../types/employee';
import {
  filterHighSalaryEmployees,
  getEmployeeCardColor,
} from '../utils/employee';

export default function IndexScreen() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const fetchedEmployees = await fetchEmployeesFromApi();
      setEmployees(fetchedEmployees);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const filteredEmployees = filterHighSalaryEmployees(employees);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading employees...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Failed to load data</Text>
        <Button title="Reload" onPress={fetchEmployees} />
      </View>
    );
  }

  if (filteredEmployees.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No employees found (salary {'>'} 5000)</Text>
        <Button title="Reload" onPress={fetchEmployees} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Filter</Text>
      <Button title="Reload" onPress={fetchEmployees} />
      <FlatList<Employee>
        data={filteredEmployees}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingTop: 12 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { backgroundColor: getEmployeeCardColor(item.employee_age) },
            ]}>
            <Text>Name: {item.employee_name}</Text>
            <Text>Age: {item.employee_age}</Text>
            <Text>Salary: {item.employee_salary}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  card: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
});