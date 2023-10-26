// import React from "react";

// function Dashboard(){
//     return(
//         <div>Dashboard</div>
//     )
// }

// export default Dashboard;



// import React, { useEffect, useState } from "react";
// import Header from "../components/Header";
// import Cards from "../components/Cards";
// import { Modal } from "antd";
// import pftImage from "./../images/pft.png";
// import pftImage from "./../assist/images/pft.png";
// import AddExpense from "../components/Modals/AddExpense";
// import AddIncome from "../components/Modals/AddIncome";
// import { Button, message, Popconfirm } from 'antd';
// import {
//   Transaction,
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDocs,
//   query,
// } from "firebase/firestore";
// import { auth, db } from "../firebase";
// import { toast } from "react-toastify";
// import moment from "moment";
// import TransactionsTable from "../components/TransactionsTable";
// import ChartsComponent from "../components/Charts";
// function Dashboard() {
//   const [user, setUser] = useState(auth.currentUser);
//   const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
//   const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
//   const [transactions, setTransactions] = useState([]);
//   const [Loader, setLoader] = useState(false);
//   const [BtnLoader, setBtnLoader] = useState(false);
//   const [income, setIncome] = useState(0);
//   const [expense, setExpense] = useState(0);
//   const [totalBalance, setTotalBalance] = useState(0);
//   const [allDataId, setAllDataId] = useState([]);
//   const onFinish = (values, type) => {
//     setBtnLoader(true);
//     console.log("on Finish", values, type);
//     const newTransaction = {
//       type: type,
//       date: values.date.format("YYYY-MM-DD"),
//       amount: parseFloat(values.Amount),
//       tag: values.tag,
//       name: values.name,
//     };
//     console.log(newTransaction, "<<<newTransaction");
//     addTransaction(newTransaction);
//     setBtnLoader(false);
//   };
//   async function addTransaction(transaction, type = "") {
//     try {
//       // Create our initial doc
//       const docRef = await addDoc(
//         collection(db, `users/${user.uid}/transactions`),
//         transaction
//       );
//       console.log("Document written with ID: ", docRef.id);
//       if (!type) {
//         toast.success("Transaction Added!");
//       }
//       let newArr = transactions;
//       newArr.push(transaction);
//       setTransactions(newArr);
//       calculateBalance();
//     } catch (err) {
//       console.error("Error adding Document:");
//       toast.error("Couldn't add transaction!");
//     }
//   }
//   const showExpenseModal = () => {
//     setIsExpenseModalVisible(true);
//   };
//   const showIncomeModal = () => {
//     setIsIncomeModalVisible(true);
//   };
//   const handelExpenseModalCancel = () => {
//     setIsExpenseModalVisible(false);
//   };
//   const handelIncomeModalCancel = () => {
//     setIsIncomeModalVisible(false);
//   };
//   useEffect(() => {
//     // get all docs from the collection
//     fetchTransactions();
//   }, []);
//   useEffect(() => {
//     // get all docs from the collection
//     fetchTransactions();
//   }, [user]);
//   // transactions change
//   useEffect(() => {
//     calculateBalance();
//   }, [transactions]);
//   function calculateBalance() {
//     let incomeTotal = 0;
//     let expenseTotal = 0;
//     transactions.forEach((transaction) => {
//       if (transaction.type === "income") {
//         incomeTotal += transaction.amount;
//       } else if (transaction.type === "expense") {
//         expenseTotal += transaction.amount;
//       }
//     });
//     setExpense(expenseTotal);
//     setIncome(incomeTotal);
//     setTotalBalance(incomeTotal - expenseTotal);
//   }
//   async function fetchTransactions() {
//     setLoader(true);
//     if (user) {
//       const q = query(collection(db, `users/${user.uid}/transactions`));
//       const querySnapshot = await getDocs(q);
//       let transactionsArray = [];
//       let userDocId = [];
//       querySnapshot.forEach((doc) => {
//         userDocId.push(doc.id);
//         // doc.data() is never undefined for query doc snapshots
//         transactionsArray.push(doc.data());
//       });
//       setAllDataId(userDocId);
//       setTransactions(transactionsArray);
//       console.log("transactions Array>>>", transactionsArray);
//       toast.success("Transactions Fetched!");
//     }
//     setLoader(false);
//   }
//   let sortedTransaction = transactions.sort(
//     (a, b) => new Date(a.date) - new Date(b.date)
//   );
//   // restDAta all
//   async function restAllData() {
    
    
//       try {
//         allDataId.forEach((docIdThis) => {
//           deleteDoc(doc(db, `users/${user.uid}/transactions/${docIdThis}`));
//         });
//         toast.success("All Data Reset");
//         fetchTransactions();
//       } catch (error) {
//         console.log(error, "my error Delete");
//         toast.error(error.message);
//       }
    
//   }
  
//   return (
//     <>
//       <Header />
//       {Loader ? (
//         <p style={{ textAlign: "center", marginTop: "20rem" }}>Loading...</p>
//       ) : (
//         <div>
//           <Cards
//             income={income}
//             expense={expense}
//             totalBalance={totalBalance}
//             showExpenseModal={showExpenseModal}
//             showIncomeModal={showIncomeModal}
//             restAllData={restAllData}
//           />
//           <AddIncome
//             isIncomeModalVisible={isIncomeModalVisible}
//             handelIncomeModalCancel={handelIncomeModalCancel}
//             onFinish={onFinish}
//             BtnLoader={BtnLoader}
//           />
//           <AddExpense
//             isExpenseModalVisible={isExpenseModalVisible}
//             handelExpenseModalCancel={handelExpenseModalCancel}
//             onFinish={onFinish}
//             BtnLoader={BtnLoader}
//           />
//           {transactions.length > 0 ? (
//             <ChartsComponent sortedTransaction={sortedTransaction} />
//           ) : (
//             <div className="pft-img-cover">
//               <img
//                 src={pftImage}
//                 alt="Not Transactions Still"
//                 className="pftImge"
//               />
//               <div className="no-pft-data">Not Transactions Still</div>
//             </div>
//           )}
//           <TransactionsTable
//             transactions={transactions}
//             addTransaction={addTransaction}
//             fetchTransactions={fetchTransactions}
//           />
//         </div>
//       )}
//     </>
//   );
// }
// export default Dashboard;



import React, { useEffect, useState } from "react";
import { Card, Row } from "antd";
import { Line, Pie } from "@ant-design/charts";
import moment from "moment";
import TransactionSearch from "./TransactionSearch";
import Header from "./Header";
import AddIncomeModal from "./Modals/AddIncome";
import AddExpenseModal from "./Modals/AddExpense";
import Cards from "./Cards";
import NoTransactions from "./NoTransactions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { unparse } from "papaparse";

const Dashboard = () => {
  const [user] = useAuthState(auth);

  // const sampleTransactions = [
  // {
  //   name: "Pay day",
  //   type: "income",
  //   date: "2023-01-15",
  //   amount: 2000,
  //   tag: "salary",
  // },
  // {
  //   name: "Dinner",
  //   type: "expense",
  //   date: "2023-01-20",
  //   amount: 500,
  //   tag: "food",
  // },
  // {
  //   name: "Books",
  //   type: "expense",
  //   date: "2023-01-25",
  //   amount: 300,
  //   tag: "education",
  // },
  // ];
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const navigate = useNavigate();

  const processChartData = () => {
    const balanceData = [];
    const spendingData = {};

    transactions.forEach((transaction) => {
      const monthYear = moment(transaction.date).format("MMM YYYY");
      const tag = transaction.tag;

      if (transaction.type === "income") {
        if (balanceData.some((data) => data.month === monthYear)) {
          balanceData.find((data) => data.month === monthYear).balance +=
            transaction.amount;
        } else {
          balanceData.push({ month: monthYear, balance: transaction.amount });
        }
      } else {
        if (balanceData.some((data) => data.month === monthYear)) {
          balanceData.find((data) => data.month === monthYear).balance -=
            transaction.amount;
        } else {
          balanceData.push({ month: monthYear, balance: -transaction.amount });
        }

        if (spendingData[tag]) {
          spendingData[tag] += transaction.amount;
        } else {
          spendingData[tag] = transaction.amount;
        }
      }
    });

    const spendingDataArray = Object.keys(spendingData).map((key) => ({
      category: key,
      value: spendingData[key],
    }));

    return { balanceData, spendingDataArray };
  };

  const { balanceData, spendingDataArray } = processChartData();
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    setTransactions([...transactions, newTransaction]);
    setIsExpenseModalVisible(false);
    setIsIncomeModalVisible(false);
    addTransaction(newTransaction);
    calculateBalance();
  };

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpenses(expensesTotal);
    setCurrentBalance(incomeTotal - expensesTotal);
  };

  // Calculate the initial balance, income, and expenses
  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      if (!many) {
        toast.success("Transaction Added!");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      if (!many) {
        toast.error("Couldn't add transaction");
      }
    }
  }

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  const balanceConfig = {
    data: balanceData,
    xField: "month",
    yField: "balance",
  };

  const spendingConfig = {
    data: spendingDataArray,
    angleField: "value",
    colorField: "category",
  };

  function reset() {
    console.log("resetting");
  }
  const cardStyle = {
    boxShadow: "0px 0px 30px 8px rgba(227, 227, 227, 0.75)",
    margin: "2rem",
    borderRadius: "0.5rem",
    minWidth: "400px",
    flex: 1,
  };

  function exportToCsv() {
    const csv = unparse(transactions, {
      fields: ["name", "type", "date", "amount", "tag"],
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="dashboard-container">
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Cards
            currentBalance={currentBalance}
            income={income}
            expenses={expenses}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
            cardStyle={cardStyle}
            reset={reset}
          />

          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          {transactions.length === 0 ? (
            <NoTransactions />
          ) : (
            <>
              <Row gutter={16}>
                <Card bordered={true} style={cardStyle}>
                  <h2>Financial Statistics</h2>
                  <Line {...{ ...balanceConfig, data: balanceData }} />
                </Card>

                <Card bordered={true} style={{ ...cardStyle, flex: 0.45 }}>
                  <h2>Total Spending</h2>
                  {spendingDataArray.length == 0 ? (
                    <p>Seems like you haven't spent anything till now...</p>
                  ) : (
                    <Pie {...{ ...spendingConfig, data: spendingDataArray }} />
                  )}
                </Card>
              </Row>
            </>
          )}
          <TransactionSearch
            transactions={transactions}
            exportToCsv={exportToCsv}
            fetchTransactions={fetchTransactions}
            addTransaction={addTransaction}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard




