import DashboardTransactionsLayout from "@/components/layouts/dashboard_transactions_layout";
type Transactions = {
  id: string;
  amount: number;
  date: Date;
  status: "pending" | "processing" | "success" | "failed";
  recipient: string;
  type: string;
    method: string;
  transactionHash: string; 
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
        method: "ETH",
      transactionHash: "0xabcdef1234567891"
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      date: new Date(),
      recipient: "m@example.com",
      type: "deposit",
      method: "TRON",
      transactionHash: "0xabcdef1234567892"
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      date: new Date(),
      recipient: "m@example.com",
      type: "deposit",
         method: "BSC",
      transactionHash: "0xabcdef1234567893"
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      date: new Date(),
      recipient: "m@example.com",
      type: "deposit",
       method: "BTC",
      transactionHash: "0xabcdef1234567894"
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      date: new Date(),
      recipient: "m@example.com",
      type: "deposit",
       method: "BSC",
      transactionHash: "0xabcdef1234567895"
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      date: new Date(),
      recipient: "m@example.com",
      type: "deposit",
        method: "TRON",
      transactionHash: "0xabcdef1234567890"
    },
    // ...
  ];
}

const Page = async () => {
  const data = await getData();

  return <DashboardTransactionsLayout data={data} />;
};

export default Page;
