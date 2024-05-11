import { PageContainer } from "@/components/containers";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import AddCustomers from "./AddCustomers";
const data = [
  {
    name: "Jason Price",
    role: "Admin",
    email: "janick_parisian@yahoo.com",
  },
  {
    name: "Jason Price",
    role: "Admin",
    email: "janick_parisian@yahoo.com",
  },
  {
    name: "Jason Price",
    role: "Admin",
    email: "janick_parisian@yahoo.com",
  },
  {
    name: "Jason Price",
    role: "Admin",
    email: "janick_parisian@yahoo.com",
  },
];
const Customers = () => {
  const [open, setOpen] = useState(false);
  return (
    <PageContainer breadcrumb={[{ title: "الزبائن" }]}>
      <div className="flex justify-end w-full my-4">
        <Button onClick={() => setOpen(true)}>اضافة زبون</Button>
      </div>
      <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {data.map((d) => (
          <div className="bg-white px-6 py-4 rounded-[30px] shadow flex flex-col justify-center items-center gap-2">
            <img
              src="/src/assets/image/Bitmap.jpg"
              className="w-20 h-20 rounded-full"
            />
            <p className="text-lg">{d.name}</p>
            <p className="text-gray-500 text-sm">{d.role}</p>
            <p className="text-gray-500 text-sm">{d.email}</p>
          </div>
        ))}
      </div>
      <AddCustomers onClose={() => setOpen(false)} open={open} />
    </PageContainer>
  );
};

export default Customers;
