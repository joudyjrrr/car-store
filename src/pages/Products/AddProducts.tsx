import { PageContainer } from "@/components/containers";
import RHFInputFile from "@/components/hook-form/RHFInputFile";
import SelectFiled from "@/components/hook-form/RHFSelect";
import RHFSwitch from "@/components/hook-form/RHFSwitch";
import RHFTextArea from "@/components/hook-form/RHFTextArea";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import axios, { BASE_URL_IMG } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import image from "../../assets/Login.jpg";
import MultiSelectField from "@/components/hook-form/MultiSelectField";

const AddProducts = () => {
  const { id } = useParams();
  const [gallery, setGallry] = useState<any>([]);
  const form = useForm();
  const { data: cars } = useQuery({
    queryKey: ["get-cars", id],
    queryFn: async () => {
      const { data } = await axios.get(`/getCars`);
      return data.data;
    },
  });
  console.log(cars);
  const carYearOptions = cars
    ? cars.map((car: any) => ({
        value: car.id,
        label: car.car_year?.name,
      }))
    : [];
  const car_company_name = cars
    ? cars.map((car: any) => ({
        value: car.id,
        label: car.car_company?.name,
      }))
    : [];
  const car_motor_name = cars
    ? cars.map((car: any) => ({
        value: car.id,
        label: car.car_motor?.name,
      }))
    : [];
  const car_model_name = cars
    ? cars.map((car: any) => ({
        value: car.id,
        label: car.car_model?.name,
      }))
    : [];
  console.log(carYearOptions);
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["get-prod", id],
    queryFn: async () => {
      const { data } = await axios.get(`/getProductById/${id}`);
      return data.data;
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("name", data?.product?.name);
      form.setValue("price", data?.product?.price);
      form.setValue("price_discount", data?.product?.price_discount);
      form.setValue("cost", data?.product?.cost);
      form.setValue("current_count", data?.product?.current_count);
      form.setValue("barcode", data?.product?.barcode);
      form.setValue("is_active", data?.product?.is_active);
      form.setValue("evaluation", data?.product?.evaluation);
      form.setValue("brand_id", data?.product?.brand_id);
      form.setValue("product_category_id", data?.product?.product_category_id);
      form.setValue("description", data?.product?.description);
      setGallry(
        data?.product?.images?.map(
          (g: any) => `${BASE_URL_IMG}/${g.id}/${g.file_name}`
        ) || []
      );
    }
  }, [data, form]);

  console.log(data?.product!);
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`/createProduct`, data, {
        headers: {
          "Content-Type": "multipart/formData",
        },
      });
      return res;
    },
  });
  const { mutate: Update } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`/updateProduct/${id}`, data, {
        headers: {
          "Content-Type": "multipart/formData",
        },
      });
      return res;
    },
  });
  console.log(gallery);
  const { data: categoryOptions } = useQuery({
    queryKey: ["get-prod-cat"],
    queryFn: async () => {
      const { data } = await axios.get(`/getProductCategory`);
      return data.data;
    },
  });
  const { data: brandOptions } = useQuery({
    queryKey: ["get-Brand"],
    queryFn: async () => {
      const { data } = await axios.get(`/getBrand`);
      return data.data;
    },
  });
  const navigate = useNavigate();
  const submitHandler = (data: any) => {
    const formData = new FormData() as any;
    formData.append("car_id", data.car_id);
    data.name && formData.append("name", data.name);
    data.product_category_id &&
      formData.append("product_category_id", data.product_category_id);
    data.description && formData.append("description", data.description);
    data.cost && formData.append("cost", data.cost);
    data.price && formData.append("price", data.price);
    data.price_discount &&
      formData.append("price_discount", data.price_discount);
    data.current_count && formData.append("current_count", data.current_count);
    data.barcode && formData.append("barcode", data.barcode);
    data.is_active && formData.append("is_active", data.is_active);
    data.evaluation && formData.append("evaluation", data.evaluation);
    data.brand_id && formData.append("brand_id", data.brand_id);
    for (let i = 0; i < gallery?.length; i++) {
      formData.append(`image${i + 1}`, gallery[i]);
    }
    console.log(formData);
    if (id) {
      Update(formData, {
        onSuccess() {
          toast("تم التعديل بنجاح");
          navigate("/product");
        },
        onError(error: any) {
          console.log(error?.response?.data);
          toast(error?.response?.data.message);
        },
      });
    } else {
      mutate(formData, {
        onSuccess() {
          toast("تمت الاضافة بنجاح");
          navigate("/product");
        },
        onError(error: any) {
          console.log(error?.response?.data);
          toast(error?.response?.data.message);
        },
      });
    }
  };
  return (
    <PageContainer
      breadcrumb={[{ title: id ? "تعديل المنتج" : "اضافة منتج" }]}
      className="overflow-x-hidden"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <div className="flex flex-col gap-8 max-md:flex-col">
            <div className="grid grid-cols-3 gap-2 w-full">
              <RHFTextField
                control={form.control}
                name="name"
                placeholder="اسم المنتج"
                label="اسم المنتج"
              />
              <RHFTextField
                control={form.control}
                name="price"
                placeholder="سعر المنتج"
                type="number"
                label="سعر المنتج"
              />
              <RHFTextField
                control={form.control}
                name="price_discount"
                type="number"
                placeholder="سعر الحسم"
                label="سعر الحسم"
              />
              <RHFTextField
                control={form.control}
                name="cost"
                type="number"
                placeholder="تكلفة الشراء"
                label="تكلفة الشراء"
              />
              <RHFTextField
                control={form.control}
                name="current_count"
                placeholder=" العدد الحالي"
                label="العدد الحالي "
              />
              <SelectFiled
                label="الماركة"
                placeholder="الماركة"
                name="brand_id"
                watch={form.watch}
                options={brandOptions}
                control={form.control}
              />
              <SelectFiled
                label="الصنف"
                name="product_category_id"
                placeholder="الصنف"
                watch={form.watch}
                options={categoryOptions}
                control={form.control}
              />
              <RHFTextField
                control={form.control}
                name="barcode"
                placeholder="الباركود"
                label="الباركود"
              />
              <RHFTextField
                control={form.control}
                name="evaluation"
                min={1}
                max={5}
                type="number"
                placeholder="تقييم المنتج"
                label="تقييم المنتج"
              />
              <div className="bg-white my-6 p-4 rounded-lg flex justify-between shadow items-center">
                <p>Status</p>
                <RHFSwitch name="is_active" control={form.control} checked />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <RHFInputFile
                labelClasName="!text-xs"
                className="w-full"
                control={form.control}
                name="image"
                setValue={form.setValue}
                watch={form.watch}
                label="اضافة الصور "
                multiple
                gallery={gallery}
                setGallry={setGallry}
              />
              <div className="grid grid-cols-3 gap-2">
                {gallery?.map((g: any) => (
                  <img
                    width={40}
                    crossOrigin="anonymous"
                    height={40}
                    className="w-full h-full  rounded-xl object-cover"
                    alt=""
                    src={id ? g : URL.createObjectURL(g)}
                  />
                ))}
              </div>
            </div>
          </div>
          <RHFTextArea
            trigger={form.trigger}
            control={form.control}
            name="description"
            placeholder="وصف المنتج هنا"
            label="الوصف"
          />
          <div className="bg-white px-6 my-6 py-2 flex flex-col gap-4 shadow rounded-lg">
            <div className="flex max-md:flex-col gap-4 w-full justify-center">
              <MultiSelectField
                control={form.control}
                label="سنة الصنع"
                name="car_id"
                watch={form.watch}
                options={carYearOptions}
                placeholder="سنة الصنع"
              />
              <MultiSelectField
                label="حجم المحرك"
                placeholder="حجم المحرك"
                name="car_id"
                watch={form.watch}
                options={car_motor_name}
                control={form.control}
              />
              <MultiSelectField
                label="موديل السيارة"
                placeholder="موديل السيارة"
                name="car_id"
                watch={form.watch}
                options={car_model_name}
                control={form.control}
              />
              <MultiSelectField
                label="شركة السيارة"
                placeholder="شركة السيارة"
                name="car_id"
                watch={form.watch}
                options={car_company_name}
                control={form.control}
              />
            </div>
          </div>
          <div className="flex gap-2 my-6 justify-center w-full">
            <Button className="w-full">{id ? "تعديل" : "اضافة"}</Button>
            <Button className="w-full" variant={`cancel`}>
              الغاء
            </Button>
          </div>
        </form>
      </Form>
    </PageContainer>
  );
};

export default AddProducts;
