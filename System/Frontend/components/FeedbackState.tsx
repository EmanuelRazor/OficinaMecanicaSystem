import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

type Props = {
  loading?: boolean;
  message?: string;
  retryLabel?: string;
  onRetry?: () => void;
};

export default function FeedbackState({
  loading = false,
  message,
  retryLabel = "Tentar novamente",
  onRetry,
}: Props) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-10">
      {loading ? <ActivityIndicator size="large" color="#2563eb" /> : null}

      {message ? (
        <Text className="mt-4 text-center text-base text-slate-600">{message}</Text>
      ) : null}

      {!loading && onRetry ? (
        <TouchableOpacity
          className="mt-5 rounded-xl bg-blue-600 px-5 py-3"
          onPress={onRetry}
        >
          <Text className="font-bold text-white">{retryLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
