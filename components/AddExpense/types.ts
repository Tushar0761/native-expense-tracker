export type ExpenseItem = {
  createdAt: Date;
  amount: number;
  description: string;
  category?: string | null;
  day: string;
  month: string;
};

export type ExpenseItemArray = ExpenseItem[];
