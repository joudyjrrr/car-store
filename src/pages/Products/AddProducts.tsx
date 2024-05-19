import { PageContainer } from "@/components/containers";
import RHFInputFile from "@/components/hook-form/RHFInputFile";
import SelectFiled from "@/components/hook-form/RHFSelect";
import RHFSwitch from "@/components/hook-form/RHFSwitch";
import RHFTextArea from "@/components/hook-form/RHFTextArea";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import axios from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddProducts = () => {
  const form = useForm();
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
  const submitHandler = (data: any) => {
    console.log(data);
    const formData = new FormData() as any;
    data.name && formData.append("name", data.name);
    data.product_category_id &&
      formData.append("product_category_id", data.product_category_id);
    data.description && formData.append("description", data.description);
    data.cost && formData.append("cost", data.cost);
    data.price && formData.append("price", data.price);
    data.price_discount &&
      formData.append("price_discount", data.price_discount);
    data.current_count && formData.append("current_count", data.current_count);
    data.bar_code && formData.append("bar_code", data.bar_code);
    data.is_active && formData.append("is_active", data.is_active);
    data.evaluation && formData.append("evaluation", data.evaluation);
    data.brand_id && formData.append("brand_id", data.brand_id);
    // typeof data?.main_image_id === "object" &&
    //   formData.append("main_image_id", data.main_image_id);
    mutate(formData, {
      onSuccess() {
        toast("تمت الاضافة بنجاح");
      },
      onError(error: any) {
        console.log(error?.response?.data);
        toast(error?.response?.data.message);
      },
    });
  };
  return (
    <PageContainer
      breadcrumb={[{ title: "اضافة منتج" }]}
      className="overflow-x-hidden"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <div className="flex gap-8 max-md:flex-col">
            <div className="flex flex-col w-full">
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
                name="bar_code"
                placeholder="الباركود"
                label="الباركود"
              />
              <RHFTextField
                control={form.control}
                name="evaluation"
                min={1}
                max={5}
                placeholder="تقييم المنتج"
                label="تقييم المنتج"
              />
              <div className="bg-white my-6 p-4 rounded-lg flex justify-between shadow items-center">
                <p>Status</p>
                <RHFSwitch name="is_active" control={form.control} checked />
              </div>
            </div>
            <div className="flex  flex-col w-full">
              <RHFInputFile
                control={form.control}
                name="main_image_id"
                setValue={form.setValue}
                watch={form.watch}
                label="اضافة صورة رئيسية"
              />
              <div className="flex gap-2 w-full justify-between">
                <RHFInputFile
                  labelClasName="!text-xs"
                  className="w-full"
                  control={form.control}
                  name="image"
                  setValue={form.setValue}
                  watch={form.watch}
                  label="اضافة صورة فرعية"
                />
                <RHFInputFile
                  className="w-full"
                  labelClasName="!text-xs"
                  control={form.control}
                  name="image"
                  setValue={form.setValue}
                  watch={form.watch}
                  label="اضافة صورة فرعية"
                />
                <RHFInputFile
                  className="w-full"
                  labelClasName="!text-xs"
                  control={form.control}
                  name="image"
                  setValue={form.setValue}
                  watch={form.watch}
                  label="اضافة صورة فرعية"
                />
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
          <div className="flex gap-2 my-6 justify-center w-full">
            <Button className="w-full">اضافة</Button>
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
