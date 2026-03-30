package com.yogesh.smart_expense_tracker.service;

import com.yogesh.smart_expense_tracker.model.Expense;
import com.yogesh.smart_expense_tracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository repository;

    public List<Expense> getAllExpenses() {
        return repository.findAll();
    }

    public Expense saveExpense(Expense expense) {
        return repository.save(expense);
    }

    public void deleteExpense(Long id) {
        repository.deleteById(id);
    }

    public Expense updateExpense(Long id, Expense updatedExpense) {
        Expense expense = repository.findById(id).orElseThrow();

        expense.setTitle(updatedExpense.getTitle());
        expense.setAmount(updatedExpense.getAmount());
        expense.setCategory(updatedExpense.getCategory());
        expense.setDate(updatedExpense.getDate());

        return repository.save(expense);
    }

    public List<Expense> getByCategory(String category) {
        return repository.findByCategory(category);
    }

    public Double getMonthlyTotal(int year, int month) {
        return repository.findAll().stream()
                .filter(e -> e.getDate().getYear() == year &&
                        e.getDate().getMonthValue() == month)
                .mapToDouble(Expense::getAmount)
                .sum();
    }

    public List<Expense> getUserExpenses(Long userId) {
        return repository.findByUserId(userId);
    }

//    public void deleteAll() {
//        repository.deleteAll();
//    }

    public void deleteByUserId(Long userId) {
        repository.deleteAll(repository.findByUserId(userId));
    }
}
