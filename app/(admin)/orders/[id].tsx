import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import orders from '../../../assets/data/orders';
import OrderItemListItem from '../../../components/OrderItemListItem';
import OrderListItem from '../../../components/OrderListItem';
import { OrderStatusList } from '@/app/types';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useOrderDetails } from '@/app/api/orders';



const OrderDetailScreen =()=>{
  const {id: idString} = useLocalSearchParams();
  const id = parseFloat(typeof idString == 'string' ? idString : idString[0]);

    const {data: order, isLoading, error} = useOrderDetails(id);
    // const order = orders.find((o)=> o.id.toString()===id)

    if(isLoading){
      return <ActivityIndicator/>;
    }
    if(error){
      return <Text>Failed to fetch products</Text>
    }

    return(
        <View style={styles.container}>
            <Stack.Screen options={{title: `Order #${id}`}}/>
            <OrderListItem order={order}/>

            <FlatList
            data={order.order_items}
            contentContainerStyle={{gap:10}}
            renderItem={({item})=> <OrderItemListItem item={item}
            />}
            ListHeaderComponent={()=> <OrderListItem order={order}/>}
            ListFooterComponent={()=> <>
              <Text style={{ fontWeight: 'bold' }}>Status</Text>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                {OrderStatusList.map((status) => (
                  <Pressable
                    key={status}
                    onPress={() => console.warn('Update status')}
                    style={{
                      borderColor: Colors.light.tint,
                      borderWidth: 1,
                      padding: 10,
                      borderRadius: 5,
                      marginVertical: 10,
                      backgroundColor:
                        order.status === status
                          ? Colors.light.tint
                          : 'transparent',
                    }}
                  >
                    <Text
                      style={{
                        color:
                          order.status === status ? 'white' : Colors.light.tint,
                      }}
                    >
                      {status}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </>
            }
            
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