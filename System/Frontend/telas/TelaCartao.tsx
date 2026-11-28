import {useRef} from 'react';
import {Animated, Pressable, Text, View} from 'react-native';

export default function TelaCartao() {
    const opacidade = useRef(new Animated.Value(0)).current;

    function animar(){
        opacidade.setValue(0);
        Animated.timing(opacidade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        }).start();
        
    }
    
    return (
        <View className="flex-1 items-center justify-center bg-slate-100 p6">
            <Text className="text-2xl font-bold">Tela do Cartão</Text>
            <Text className="mt-2">Clique no botão para animar a opacidade do cartão</Text>

        <Animated.View style={{opacity: opacidade}}>
            <View className="mt-5 rounded-lg bg-blue p-4 shadow-lg">
                <Text>Meu jogo favorito é Minecraft</Text>  
            </View>
        </Animated.View>
        <Pressable onPress={animar} className="mt-4 bg-green p-2 rounded-lg bg-blue-300 p-3">
            <Text className="font-bold text-white">Animar</Text>
        </Pressable>
        </View>
    );
}
