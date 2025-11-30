import DashboardTransactionsLayout from "@/components/layouts/dashboard_transactions_layout";
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
}

const Page = async () => {
  const data = await getData();

  return <DashboardTransactionsLayout data={data} />;
};

export default Page;
