import { useMyOrderList } from "@/app/api/orders";
import OrderListItem from "@/components/OrderListItem";
import { Stack } from "expo-router";
import { ActivityIndicator, FlatList, Text} from "react-native";



export default function OrdersScreen(){

    const {data: orders, isLoading, error} = useMyOrderList();

  if(isLoading){
    return <ActivityIndicator/>;
  }
  if(error){
    return <Text>Failed to fetch products</Text>
  }
  
    return(
        <>
        <Stack.Screen options={{title: 'Orders'}}/>
        <FlatList
        data={orders}
        contentContainerStyle={{gap: 10, padding: 10}}
        renderItem={({item})=><OrderListItem order={item}/>}
        
        
        />
        </>
    );
};