import type { TextInputProps } from "react-native";
import { Text, TextInput, View } from "react-native";

type Props = TextInputProps & {
  label: string;
  required?: boolean;
  helperText?: string;
};

export default function FormField({
  label,
  required = false,
  helperText,
  ...props
}: Props) {
  return (
    <View className="mb-4">
      <Text className="mb-2 font-semibold text-slate-700">
        {label}
        {required ? " *" : ""}
      </Text>

      <TextInput
        className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900"
        placeholderTextColor="#94a3b8"
        {...props}
      />

      {helperText ? (
        <Text className="mt-1 text-xs text-slate-500">{helperText}</Text>
      ) : null}
    </View>
  );
}
