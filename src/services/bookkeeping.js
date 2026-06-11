import { apiHeaderConfiguration } from '../lib/utils/global';
import { EMPTY, MULTIPART, TOKEN } from '../lib/utils/constants';
import axiosInstance from './Interceptor';
import axios from 'axios';
import { BASE_URL } from '../enviroments';

const Api = {
    getBookkeepingStats: function (data, token) {
        return axiosInstance.post(
            `bookkeeping/get-stats`,
            data,
            apiHeaderConfiguration(token, TOKEN)
        );
    },
    getCurrentBalance: function (token) {
        return axiosInstance.get(
            `bookkeeping/get-balance`,
            apiHeaderConfiguration(token, TOKEN),
        );
    },
    addBalance: function (data, token) {
        return axiosInstance.post(
            `bookkeeping/add-balance`,
            data,
            apiHeaderConfiguration(token, TOKEN),
        );
    },
    transferAmount: function (data, token) {
        return axiosInstance.post(
            `bookkeeping/transfer-amount`,
            data,
            apiHeaderConfiguration(token, TOKEN),
        );
    },
    createGoalCategory: function (data, token) {
        return axiosInstance.post(
            `bookkeeping/goal/create-goal-category`,
            data,
            apiHeaderConfiguration(token, TOKEN),
        );
    },
    createExpenseCategory: function (data, token) {
        return axiosInstance.post(
            `bookkeeping/expense/create-expense-category`,
            data,
            apiHeaderConfiguration(token, TOKEN),
        );
    },
    getExpenseCategories: function (token) {
        return axiosInstance.get(
            `bookkeeping/expense/get-expense-categories`,
            apiHeaderConfiguration(token, TOKEN),
        );
    },
    getGoalCategories: function (token) {
        return axiosInstance.get(
            `bookkeeping/goal/get-goal-categories`,
            apiHeaderConfiguration(token, TOKEN),
        );
    },
    getGoalCategoryById: function (id, token) {
        return axiosInstance.get(
            `bookkeeping/goal/get-goal-category/${id}`,
            apiHeaderConfiguration(token, TOKEN),
        );
    },
    getExpenseCategoryById: function (id, token) {
        return axiosInstance.get(
            `bookkeeping/expense/get-expense-category/${id}`,
            apiHeaderConfiguration(token, TOKEN),
        );
    },
    updateGoalCategory: function (id, data, token) {
        return axiosInstance.put(
            `bookkeeping/goal/update-goal-category/${id}`,
            data,
            apiHeaderConfiguration(token, TOKEN),
        );
    },
    updateExpenseCategory: function (id, data, token) {
        return axiosInstance.put(
            `bookkeeping/expense/update-expense-category/${id}`,
            data,
            apiHeaderConfiguration(token, TOKEN),
        );
    },
    addExpenseAmount: function (data, token) {
        return axiosInstance.post(
            `bookkeeping/expense/add-expense-amount`,
            data,
            apiHeaderConfiguration(token, TOKEN),
        );
    },
    addGoalAmount: function (data, token) {
        return axiosInstance.post(
            `bookkeeping/goal/add-goal-amount`,
            data,
            apiHeaderConfiguration(token, TOKEN),
        );
    },
    deleteExpense: function (id, token) {
        return axiosInstance.delete(
            `bookkeeping/expense/delete-expense-category/${id}`,
            apiHeaderConfiguration(token, TOKEN),
        );
    },
    deleteGoal: function (id, token) {
        return axiosInstance.delete(
            `bookkeeping/goal/delete-goal-category/${id}`,
            apiHeaderConfiguration(token, TOKEN),
        );
    }
};

export default Api;
