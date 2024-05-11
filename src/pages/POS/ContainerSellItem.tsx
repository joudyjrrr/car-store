import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFRadioGroup from "@/components/hook-form/RHFRadioGroup";
import RHFSelect from "@/components/hook-form/RHFSelect";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Table } from "@/components/ui/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { FC, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useForm } from "react-hook-form";
import { BiSolidTrashAlt } from "react-icons/bi";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import orderImg from "../../assets/svgs/image 56.svg";
import delvrryImg from "../../assets/svgs/image 56(1).svg";
import DeliveryInfo from "./DeliveryInfo";
import CouponCode from "./CouponCode";
const ContainerSellItem: FC<{
  setSelectedProducts: (arg: any) => void;
  selectedProducts: any;
  selectCurrency?: any;
  setSelectCurrency?: any;
}> = ({ selectedProducts, setSelectedProducts, selectCurrency }) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleQuantityChange = (product: any, action: any) => {
    const updatedProducts = [...selectedProducts];
    const selectedProductIndex = updatedProducts.findIndex(
      (p) => p.id === product.id
    );

    if (selectedProductIndex !== -1) {
      const quantity = updatedProducts[selectedProductIndex].quantity;

      switch (action) {
        case "increase":
          updatedProducts[selectedProductIndex].quantity = quantity + 1;
          break;
        case "decrease":
          updatedProducts[selectedProductIndex].quantity = Math.max(
            quantity - 1,
            0
          );
          if (quantity === 0) {
            handleProductDelete(updatedProducts[selectedProductIndex]);
            return;
          }
          break;
        default:
          updatedProducts[selectedProductIndex].quantity = action;
      }

      setSelectedProducts((prevState: any) => {
        const newState = [...prevState];
        newState[selectedProductIndex] = updatedProducts[selectedProductIndex];
        return newState;
      });

      calculateTotalPrice(updatedProducts);
    }
  };
  const handleProductDelete = (product: any) => {
    const updatedProducts = selectedProducts.filter(
      (p: any) => p.id !== product.id
    );
    setSelectedProducts(updatedProducts);
    calculateTotalPrice(updatedProducts);
  };

  const calculateTotalPrice = (products: any) => {
    const totalPrice: any = products.reduce((sum: any, product: any) => {
      return (
        (sum + product.price * product.quantity) *
        selectCurrency.dollar_price
      ).toFixed(2);
    }, 0);

    setTotalPrice(totalPrice);
  };
  const cols: TableColumn<any>[] = [
    {
      id: "name",
      name: "الاسم",
      cell: (row) => <div>{row.name}</div>,
    },
    {
      id: "price",
      name: "السعر",
      cell: (row) => <div>{row.price}</div>,
    },
    {
      id: "quantity",
      name: "الكمية",
      cell: (row) => (
        <div className="flex gap-2 items-center">
          <Button
            type="button"
            variant={"link"}
            onClick={() => handleQuantityChange(row, "decrease")}
          >
            <CiCircleMinus className="text-primary text-2xl" />
          </Button>
          <Input
            className="p-2 w-10 h-10"
            value={row.quantity}
            min={0}
            onChange={(e) =>
              handleQuantityChange(row, parseInt(e.target.value) as any)
            }
          />
          <Button
            type="button"
            variant={"link"}
            onClick={() => handleQuantityChange(row, "increase")}
          >
            <CiCirclePlus className="text-primary text-2xl" />
          </Button>
        </div>
      ),
    },
    {
      id: "price",
      name: "الحذف",
      cell: (row) => (
        <Button onClick={() => handleProductDelete(row)} variant={"link"}>
          <BiSolidTrashAlt
            className={`text-destructive text-lg hover:text-pretty`}
          />
        </Button>
      ),
    },
  ];
  const [openDelvery, setOpenDelevry] = useState(false);
  const [openCode, setOpenCode] = useState(false);
  const methods = useForm();
  const { handleSubmit, watch, reset, setValue } = methods;

  return (
    <div className="p-4 bg-white rounded-xl w-[430px] h-fit transition-all drop-shadow-lg flex flex-col gap-4">
      <FormProvider onSubmit={handleSubmit(() => {})} methods={methods}>
        <div className="flex flex-col gap-2">
          <RHFSelect
            name="customer_id"
            options={[{ id: "0", name: "tt" }]}
            label="اختر زبون"
          />
          <RHFRadioGroup
            onChange={(value: any) =>
              value == "delivery" && setOpenDelevry(true)
            }
            label="نوع التوصيل"
            withoutIcon
            name="order_typr"
            options={[
              { id: "store", name: "Store", icon: <img src={orderImg} /> },
              {
                id: "delivery",
                name: "Delivery",
                icon: <img src={delvrryImg} />,
              },
            ]}
          />
          {selectedProducts?.length > 0 && (
            <Table
              width="500px"
              table={{
                columns: cols,
                data: selectedProducts ?? [],
              }}
            />
          )}
          <Button variant={"outline"} onClick={() => setOpenCode(true)}>
            اضافة كوبون
          </Button>
          {!watch("latitude") && !watch("longitude") && openDelvery ? (
            <div className="flex flex-col">
              <DeliveryInfo
                open={openDelvery}
                setOpen={() => setOpenDelevry(false)}
              />
            </div>
          ) : (
            <></>
          )}
          <RHFSelect
            defaultValue={"$"}
            name="currency"
            options={[{ id: "0", name: "test" }]}
            label="طريقة الدفع"
          />
          <div className="mt-6 flex basis-full  gap-4">
            <Button type="submit" className="rounded-md flex-grow">
              اضافة
            </Button>
          </div>
        </div>
      </FormProvider>
      {/* <DeliveryInfo setOpen={setOpenDelevry} open={openDelvery} /> */}
      <CouponCode open={openCode} setOpen={setOpenCode} />
      {/* <CompleteOrder open={openComplete} setOpen={setOpenComplete} /> */}
    </div>
  );
};

export default ContainerSellItem;
