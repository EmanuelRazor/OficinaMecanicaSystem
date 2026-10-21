import { Text, View } from "react-native";

type Props = {
  label: string;
  value?: string | number | null;
};

export default function InfoRow({ label, value }: Props) {
  return (
    <View className="border-b border-slate-200 py-3 last:border-b-0">
      <Text className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </Text>
      <Text className="mt-1 text-base text-slate-900">
        {value === undefined || value === null || value === "" ? "—" : String(value)}
      </Text>
    </View>
  );
}
