import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import OrderItemListItem from '../../../components/OrderItemListItem';
import OrderListItem from '../../../components/OrderListItem';
import { useOrderDetails } from '@/app/api/orders';
import { userUpdateOrderSubscription } from '@/app/api/orders/subscriptions';



const OrderDetailScreen =()=>{
  const {id: idString} = useLocalSearchParams();
  const id = idString !== undefined ? parseFloat(typeof idString === 'string' ? idString : idString[0]) : NaN;
  
    const {data: order, isLoading, error} = useOrderDetails(id);
    // const order = orders.find((o)=> o.id.toString()===id)
  userUpdateOrderSubscription(id);
    if(isLoading){
      return <ActivityIndicator/>;
    }
    if(error){
      return <Text>Failed to fetch products</Text>
    }
    return(
        <View style={styles.container}>
            <Stack.Screen options={{title: `Order #${id}`}}/>

            <FlatList
            data={order?.order_items}
            contentContainerStyle={{gap:10}}
            renderItem={({item})=> <OrderItemListItem item={item}/>}

            
            />
        </View>
    );

};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});

export default OrderDetailScreen;