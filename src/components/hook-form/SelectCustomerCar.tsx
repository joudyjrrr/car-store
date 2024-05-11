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
import AddCustmourCompany from "@/pages/Customers/AddCustmourCompany";
import AddCustomers from "@/pages/Customers/AddCustomers";
import { CustomerData, ModalStates } from "@/types";
import { FaPlus } from "react-icons/fa6";
import { TableColumn } from "react-data-table-component";
import { Table } from "@/components/ui/Layout";

interface DialogContainerProps {
  dialogKey?: string;
  isOpen: boolean;
  onClose: () => void;
  formValues?: ServiceForm | null;
  returnedValue: (value: object) => void;
}
const SelectCustomer: React.FC<DialogContainerProps> = ({
  isOpen,
  returnedValue,
  onClose,
}) => {
  const { data: Customer, isPending } = useQuery({
    queryKey: ["get-customer"],
    queryFn: async () => {
      const { data } = await axios.get(apiRoutes.customer.index);
      return data.data;
    },
    select: (data) =>
      data.data.map((d: any) => ({
        id: d.customer_id,
        name: d.name,
      })),
  });
  const handleChoose = (data: any) => {
    returnedValue(data);
    onClose();
  };
  const cols: TableColumn<any>[] = [
    {
      id: "image",
      name: "الصورة ",
      cell: (row) => (
        <div
          onClick={() => {
            setSelectedRow(row);
          }}
          className="my-2"
          title={row?.name + "here"}
        >
          <img
            className="w-20"
            src={
              row?.image
                ? `${BASE_URL_IMG}/${row?.image?.id}/${row?.image?.file_name}`
                : "/vite.svg"
            }
            alt=""
          />
        </div>
      ),
    },
    {
      id: "name",
      name: "اسم العميل",
      cell: (row) => (
        <div
          onClick={() => {
            setSelectedRow(row);
          }}
          title={row.name}
        >
          {row.name}
        </div>
      ),
    },

    {
      id: "actions",
      name: "التحكم",
      cell: (row) => (
        <div className="flex justify-center gap-2  items-center text-center cursor-pointer">
          <Button
            disabled={isPending}
            onClick={() => {
              handleChoose(row);
            }}
            className="rounded-md flex-grow"
          >
            {isPending ? "الرجاء الانتظار" : "أختر"}
          </Button>
        </div>
      ),
    },
  ];
  useEffect(() => {}, []);
  const [modalState, setModalState] = useState<ModalStates>(null);
  const [modalStateCompany, setModalStateCompany] = useState<ModalStates>(null);
  const [selectedRow, setSelectedRow] = useState<CustomerData | null>(null);
  const [openModelComoany, setOpenModelComoany] = useState<boolean>(false);
  const [openModelCustmoer, setOpenModelCustmoer] = useState<boolean>(false);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[40rem] ">
        <div className="flex justify-around">
          <h1 className="text-center text-xl font-md">أختر العميل</h1>
          <Button onClick={() => setOpenModelCustmoer(true)}>
            <FaPlus className="text-white text-md" />
            <p>إضافة </p>
          </Button>
          <Button onClick={() => setOpenModelComoany(true)}>
            <FaPlus className="text-white text-md" />
            اضافة شركة الزبون
          </Button>
        </div>

        <div>
          <Table
            table={{
              columns: cols,
              data: Customer,
            }}
          />
        </div>
      </DialogContent>
      <AddCustmourCompany
        isOpen={openModelComoany === true || modalStateCompany === "edit"}
        onClose={() => {
          setOpenModelComoany(false);
          setModalStateCompany(null);
        }}
        formValuesCompany={modalStateCompany === "edit" ? selectedRow : null}
      />
      <AddCustomers
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

export default SelectCustomer;
