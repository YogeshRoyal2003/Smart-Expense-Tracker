package com.yogesh.smart_expense_tracker.repository;

import com.yogesh.smart_expense_tracker.model.Expense;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByCategory(String category);
    List<Expense> findByUserId(Long userId);

    @Transactional
    void deleteByUserId(Long userId);
}
