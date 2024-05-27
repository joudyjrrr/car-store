import { PageContainer } from "@/components/containers";
import { DeleteModal } from "@/components/dialog";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router-dom";

const Carss = () => {
  const { data: cars, refetch } = useQuery({
    queryKey: ["get-cars"],
    queryFn: async () => {
      const { data } = await axios.get(`/getCars`);
      return data.data;
    },
  });
  const cols: TableColumn<any>[] = [
    {
      id: "currency",
      name: "سنة الصنع",
      cell: (row) => <div title={row.value}>{row.car_year?.name}</div>,
    },
    {
      id: "currency",
      name: "قوة الحصان",
      cell: (row) => <div title={row.value}>{row.car_horsepower?.name}</div>,
    },
    {
      id: "currency",
      name: "شركة السيارة",
      cell: (row) => <div title={row.value}>{row.car_company?.name}</div>,
    },
    {
      id: "currency",
      name: "موديل السيارة",
      cell: (row) => <div title={row.value}>{row.car_model?.name}</div>,
    },
    {
      id: "currency",
      name: "قوة المحرك",
      cell: (row) => <div title={row.value}>{row.car_motor?.name}</div>,
    },

    {
      id: "currency",
      name: "لون السيارة",
      cell: (row) => <div title={row.value}>{row.color?.name}</div>,
    },

    {
      id: "actions",
      name: "التحكم",
      cell: (row) => (
        <div className="flex justify-center  items-center text-center cursor-pointer">
          <DeleteModal
            MassegeSuccess="تم الحذف بنجاح"
            apiPath={`/deleteCar/${row.id}`}
            refetch={refetch}
          />
        </div>
      ),
    },
  ];
  const navigate = useNavigate();
  return (
    <PageContainer breadcrumb={[{ title: "السيارات" }]}>
      <div className="w-full flex justify-end my-4">
        <Button onClick={() => navigate("/product/add")}>اضافة سيارة</Button>
      </div>
      <DataTable columns={cols} data={cars} />
    </PageContainer>
  );
};

export default Carss;
