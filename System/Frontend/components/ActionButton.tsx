import type { ReactNode } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

type Variant = "primary" | "secondary" | "success" | "warning" | "danger";

type Props = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
};

const buttonClasses: Record<Variant, string> = {
  primary: "bg-blue-600",
  secondary: "bg-slate-700",
  success: "bg-emerald-600",
  warning: "bg-orange-500",
  danger: "bg-red-600",
};

export default function ActionButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  icon,
}: Props) {
  const blocked = disabled || loading;

  return (
    <TouchableOpacity
      className={`min-h-12 flex-row items-center justify-center rounded-xl px-4 py-3 ${buttonClasses[variant]} ${
        blocked ? "opacity-50" : "opacity-100"
      }`}
      onPress={onPress}
      disabled={blocked}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <>
          {icon ? <View className="mr-2">{icon}</View> : null}
          <Text className="text-center text-base font-bold text-white">{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
