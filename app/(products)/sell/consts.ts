import { z } from "zod";

interface Choice {
  label: string;
  value: string;
}

export const choices = [
  "Women's Clothes",
  "Men's Clothing",
  "Women's Accessories",
  "Men's Accessories",
];

export const governorates: Choice[] = [
  { label: "Alexandria", value: "Alexandria" },
  { label: "Aswan", value: "Aswan" },
  { label: "Assiut", value: "Assiut" },
  { label: "Beheira", value: "Beheira" },
  { label: "Beni Suef", value: "Beni Suef" },
  { label: "Cairo", value: "Cairo" },
  { label: "Dakahlia", value: "Dakahlia" },
  { label: "Damietta", value: "Damietta" },
  { label: "Fayoum", value: "Fayoum" },
  { label: "Gharbia", value: "Gharbia" },
  { label: "Ismailia", value: "Ismailia" },
  { label: "Kafr el-Sheikh", value: "Kafr el-Sheikh" },
  { label: "Matrouh", value: "Matrouh" },
  { label: "Minya", value: "Minya" },
  { label: "Menofia", value: "Menofia" },
  { label: "New Valley", value: "New Valley" },
  { label: "North Sinai", value: "North Sinai" },
  { label: "Port Said", value: "Port Said" },
  { label: "Qualyubia", value: "Qualyubia" },
  { label: "Qena", value: "Qena" },
  { label: "Red Sea", value: "Red Sea" },
  { label: "Al-Sharqia", value: "Al-Sharqia" },
  { label: "Sohag", value: "Sohag" },
  { label: "South Sinai", value: "South Sinai" },
  { label: "Suez", value: "Suez" },
  { label: "Luxor", value: "Luxor" },
];

export const sellFormSchema = z.object({
  type: z.string(),
  title: z.string().min(3),
  description: z.string(),
  imageUrls: z.array(z.string()),
  governorate: z.string().min(1),
});

export type SellFormSchema = z.infer<typeof sellFormSchema>;
