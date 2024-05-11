import { Logo } from "@/assets/svgs";
import { PageContainer } from "@/components/containers";
import React, { useState } from "react";
import { toast } from "sonner";
import ContainerSellItem from "./ContainerSellItem";
import ModalDetails from "./ModalDetails";
const data = [
  {
    name: "fuel shell Helix ",
    price: "120$",
    category: "Shell",
  },
  {
    name: "fuel shell Helix ",
    price: "120$",
    category: "Shell",
  },
  {
    name: "fuel shell Helix ",
    price: "120$",
    category: "Shell",
  },
  {
    name: "fuel shell Helix ",
    price: "120$",
    category: "Shell",
  },
];
const SellItem = () => {
  const [selectedProduc, setSelectedProduc] = useState<any>();
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [open, setOpen] = useState<boolean>();
  const [selectCurrency, setSelectCurrency] = useState<any>({});
  return (
    <PageContainer breadcrumb={[{ title: "الاصناف" }]}>
      <div className="w-full flex gap-4 items-start">
        <div
          className={` grid grid-cols-4 gap-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 px-2`}
        >
          {data?.map((product: any, index: number) => (
            <div
              onClick={() => {
                setSelectedProduc({ ...product, quantity: 1 });
                setOpen(true);
              }}
              key={index}
              className="p-5 my-2 flex-grow  bg-white h-fit rounded-xl cursor-pointer transition-all drop-shadow-lg items-center justify-center flex flex-col gap-4"
            >
              <p className="text-md">{product?.name}</p>
              <Logo width={70} height={70} />
              <div className="w-full">
                <div className="flex w-full justify-between text-xl">
                  <p className="text-sm">{product.category}</p>
                  <span className="text-sm text-gray-500">{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ContainerSellItem
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />
      </div>
      <ModalDetails
        selectedProducts={selectedProducts}
        setSelectedProduc={setSelectedProduc}
        setSelectedProducts={setSelectedProducts}
        Product={selectedProduc!}
        open={open!}
        setOpen={setOpen}
      />
    </PageContainer>
  );
};

export default SellItem;
