import { Logo } from "@/assets/svgs";
import { PageContainer } from "@/components/containers";
import React, { useState } from "react";
import { toast } from "sonner";
import ContainerSellItem from "./ContainerSellItem";
import ModalDetails from "./ModalDetails";
import { useQuery } from "@tanstack/react-query";
import axios, { BASE_URL_IMG } from "@/lib/axios";
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
  const { data, isFetching } = useQuery({
    queryKey: ["get-prod"],
    queryFn: async () => {
      const { data } = await axios.get(`/getProduct`);
      return data.data;
    },
  });
  const [selectedProduc, setSelectedProduc] = useState<any>();
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [open, setOpen] = useState<boolean>();
  const [totalPrice, setTotalPrice] = useState(
    selectedProducts[0] ? selectedProducts[0].price : 0
  );
  const [totalCost, setTotalCost] = useState(
    selectedProducts[0] ? selectedProducts[0].cost : 0
  );

  const calculateTotalCost = (products) => {
    const total = products.reduce((acc, curr) => acc + curr.cost, 0);
    setTotalCost(total);
  };

  const calculateTotalPrice = (products: any) => {
    const totalPrice = products.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);

    setTotalPrice(totalPrice);
  };

  return (
    <PageContainer breadcrumb={[{ title: "الاصناف" }]}>
      <div className="w-full flex gap-4 items-start max-[560px]:flex-col">
        <ContainerSellItem
          calculateTotalCost={calculateTotalCost}
          totalCost={totalCost}
          calculateTotalPrice={calculateTotalPrice}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />
        <div
          className={` grid grid-cols-4 gap-4 max-xl:grid-cols-3 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 px-2`}
        >
          {data?.data?.map((product: any, index: number) => (
            <div
              onClick={() => {
                setSelectedProduc({ ...product, quantity: 1 });
                setOpen(true);
              }}
              key={index}
              className="p-5 my-2 flex-grow  bg-white h-fit rounded-xl cursor-pointer transition-all drop-shadow-lg items-center justify-center flex flex-col gap-4"
            >
              <p className="text-md">{product?.name}</p>
              <img
                className="w-[70px] h-[70px] rounded-lg my-6"
                src={`${BASE_URL_IMG}/${product.images[0]?.id}/${product.images[0]?.file_name}`}
              />
              <div className="w-full">
                <div className="flex w-full  flex-col text-xl">
                  <p className="text-sm">{product.product_category.name}</p>
                  <span className="text-sm text-gray-600">
                    السعر:{product.price}
                  </span>
                  <span className="text-sm text-gray-600">
                    الكلفة:{product.cost}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ModalDetails
        calculateTotalCost={calculateTotalCost}
        calculateTotalPrice={calculateTotalPrice}
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
