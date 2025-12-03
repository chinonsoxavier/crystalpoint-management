"use client"
import DashboardTransactionsLayout from "@/components/layouts/dashboard_transactions_layout";
import useDepositStore from "../../deposit/_deposit_store";
import { useEffect } from "react";
type Transactions = {
  id: string;
  amount: number;
  date: Date;
  status: "pending" | "processing" | "success" | "failed";
  recipient: string;
  type: string;
};



async function getData(): Promise<Transactions[]> {


  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      date: new Date(),
      recipient: "m@example.com",
      type: "deposit",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      date: new Date(),
      recipient: "m@example.com",
      type: "deposit",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      date: new Date(),
      recipient: "m@example.com",
      type: "deposit",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      date: new Date(),
      recipient: "m@example.com",
      type: "deposit",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      date: new Date(),
      recipient: "m@example.com",
      type: "deposit",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      date: new Date(),
      recipient: "m@example.com",
      type: "deposit",
    },
    // ...
  ];
};

const Page =  () => {
  const {fetchDepositHistory,depositHistory} = useDepositStore();
  // const data = await getData();

  useEffect(() => {
   fetchDepositHistory(1);
  }, [])
  

  return <DashboardTransactionsLayout data={depositHistory} />;
};

export default Page;
