import apiRoutes from "@/api";
import { FormProvider } from "@/components/hook-form/FormProvider";
import RHFInputFile from "@/components/hook-form/RHFInputFile";
import RHFSelect from "@/components/hook-form/RHFSelect";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { BASE_URL_IMG } from "@/lib/axios";
import React, { FC, useEffect, useState } from "react";
import { ServiceForm } from "@/types/service";
import { CustomerData, ModalStates } from "@/types";
import { FaPlus } from "react-icons/fa6";
import { TableColumn } from "react-data-table-component";
import { Table } from "@/components/ui/Layout";
import AddCustomerCar from "@/pages/Customers/AddCustomerCar";

interface DialogContainerProps {
  dialogKey?: string;
  isOpen: boolean;
  onClose: () => void;
  formValues?: ServiceForm | null;
  returnedValue: (value: object) => void;
  customer_id: number | string | null;
  toSelect?:any
}
interface car_type {
  car_type_id: number;
  car_company_id: number;
  car_hrsepower_id: number;
  car_model_id: number;
  car_motor_id: number;
  car: {
    car_model: {
      value: string;
    };
  };

  car_year_id: number;
  car_number: string;
  toSelect?: boolean | undefined;
}
const SelectCar: React.FC<DialogContainerProps> = ({
  isOpen,
  returnedValue,
  onClose,
  customer_id,
  toSelect,
}) => {
  const {
    data: Car,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["get-customer-car"],
    queryFn: async () => {
      const { data } = await axios.get(
        apiRoutes.customer.customerCar(customer_id!)
      );
      return data.data.data;
    },
  });
  const handleChoose = (data: any) => {
    returnedValue({
      id: data.id,
      name: data?.car.car_model?.value,
      km: data.car_number,
    });
    onClose();
  };
  useEffect(() => {
    refetch();
  }, [customer_id]);
  const cols: TableColumn<car_type>[] = [
    {
      id: "car_model_id",
      name: "موديل السيارة",
      cell: (row) => (
        <div className="flex" title={row?.car?.car_model?.value}>
          {row?.car?.car_model?.value}
        </div>
      ),
    },
    {
      id: "car_number",
      name: "رقم العداد",
      cell: (row) => (
        <div className="flex" title={row?.car_number}>
          {row?.car_number}
        </div>
      ),
    },
    {
      id: "actions",
      name: "التحكم",
      cell: (row) => (
        <div className="flex justify-center gap-2  items-center text-center cursor-pointer">
          {toSelect == undefined && (
            <Button
              disabled={isPending}
              onClick={() => {
                handleChoose(row);
              }}
              className="rounded-md flex-grow"
            >
              {isPending ? "الرجاء الانتظار" : "أختر"}
            </Button>
          )}
        </div>
      ),
    },
  ];
  useEffect(() => {}, []);
  const [modalState, setModalState] = useState<ModalStates>(null);
  const [selectedRow, setSelectedRow] = useState<CustomerData | null>(null);
  const [openModelCustmoer, setOpenModelCustmoer] = useState<boolean>(false);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[40rem] ">
        <div className="flex justify-around">
          <h1 className="text-center text-xl font-md">أختر سيارة</h1>
          <Button onClick={() => setOpenModelCustmoer(true)}>
            <FaPlus className="text-white text-md" />
            <p>إضافة </p>
          </Button>
        </div>

        <div>
          <Table
            table={{
              columns: cols,
              data: Car,
            }}
          />
        </div>
      </DialogContent>
      <AddCustomerCar
        customer_id={customer_id}
        formValues={modalState === "edit" ? selectedRow : null}
        isOpen={openModelCustmoer === true || modalState === "edit"}
        onClose={() => {
          setModalState(null);
          setOpenModelCustmoer(false);
          setSelectedRow(null);
        }}
      />
    </Dialog>
  );
};

export default SelectCar;
