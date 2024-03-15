import axios from "axios";

export const location = async () => {
  try {
    const response = await axios.get("http://localhost:3003/api/location");
    const responseData = response.data;
    return responseData;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

export const allTrxValet = async (
  page,
  limit,
  sortBy,
  sortDirection,
  search
) => {
  try {
    const response = await axios.get(
      `http://localhost:3003/api/transactionsValet?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDirection=${sortDirection}&search=${search}`
    );
    const responseData = response.data;
    return responseData;
  } catch (e) {
    console.log(e);
  }
};

export const reportDaily = async (dateFilter) => {
  try {
    const response = await axios.get(
      `http://localhost:3003/api/dailyreport?date=${dateFilter}`
    );
    const responseData = response.data;
    return responseData;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};
export const reportMonthly = async (month) => {
  try {
    const response = await axios.get(
      `http://localhost:3003/api/monthlyreport?month=${month}`
    );
    const responseData = response.data;
    return responseData;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};
export const reportYearly = async (year) => {
  try {
    const response = await axios.get(
      `http://localhost:3003/api/yearlyreport?year=${year}`
    );
    const responseData = response.data;
    return responseData;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};
export const jsonDataTrx = async (startDate, endDate) => {
  try {
    const response = await axios.get(
      `http://localhost:3003/api/exportDailyData?startDate=${startDate}&endDate=${endDate}`
    );
    const responseData = response.data;
    return responseData;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};
