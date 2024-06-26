import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ProductData } from "@/types";
import React, { FC } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

const ModalDetails: FC<{
  open: boolean;
  calculateTotalCost:any
  calculateTotalPrice: any;
  selectedProducts: ProductData[];
  setSelectedProducts: (a: ProductData[]) => void;
  Product: any;
  setSelectedProduc: (a: ProductData) => void;
  setOpen: (arg: boolean) => void;
}> = ({
  open,
  setOpen,
  calculateTotalPrice,
  Product,
  setSelectedProduc,
  selectedProducts,
  calculateTotalCost,
  setSelectedProducts,
}) => {
  const handleQuantityChange = (action: string) => {
    const updatedProducts = selectedProducts?.map((p) => {
      if (p.id === Product.id) {
        if (action === "increase") {
          return { ...p, quantity: p.quantity + 1 };
        } else if (action === "decrease") {
          if (p.quantity > 0) {
            return { ...p, quantity: p.quantity - 1 };
          }
        }
      }
      return p;
    });
    if (action === "increase") {
      setSelectedProduc({ ...Product, quantity: Product.quantity + 1 });
    } else {
      setSelectedProduc({ ...Product, quantity: Product.quantity - 1 });
    }
    setSelectedProducts(updatedProducts);
    calculateTotalPrice(updatedProducts);
  };
  // console.log(selectedProducts);
  const addNewProduct = (product: any) => {
    const updatedProduct = { ...product };
    const updatedProducts = [...selectedProducts, updatedProduct];
    setSelectedProducts(updatedProducts);
    calculateTotalPrice(updatedProducts);
    calculateTotalCost(updatedProducts)
  };
  const handleProductSelect = () => {
    if (selectedProducts.includes(Product)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== Product));
    } else {
      addNewProduct(Product);
    }

    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <h1 className="font-md text-xl text-center">تفاصيل المنتج</h1>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Button
              variant={"link"}
              onClick={() => handleQuantityChange("decrease")}
            >
              <CiCircleMinus className="text-primary text-2xl" />
            </Button>
            <Input
              className="p-1 w-10 h-10"
              value={Product?.quantity}
              onChange={(e) =>
                setSelectedProduc({
                  ...Product,
                  quantity: parseInt(e.target.value),
                })
              }
            />{" "}
            <Button
              variant={"link"}
              onClick={() => handleQuantityChange("increase")}
            >
              <CiCirclePlus className="text-primary text-2xl" />
            </Button>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col">
              <span>{Product?.name}</span>
              <span>السعر:{Product?.price}</span>
              <span>الكلفة:{Product?.cost}</span>
              {/* <span>{Product.}</span> */}
            </div>
            {/* <img
              src={`https://warsha.htc-company.com/public/getImage/${Product?.main_image.id}/${Product?.main_image.file_name}`}
              alt={Product?.main_image.file_name}
              className="w-[60px] aspect-square h-[60px]  object-cover"
            /> */}
          </div>
        </div>
        <Button onClick={() => handleProductSelect()}>اضافة المنتج</Button>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetails;
