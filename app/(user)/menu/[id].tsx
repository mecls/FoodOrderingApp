import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator} from "react-native";
import { defaultPizza } from "@/components/ProductListItem";
import { useState } from "react";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/app/types";
import { useProduct } from "@/app/api/products";
import RemoteImage from "@/components/RemoteImage";

const sizes: PizzaSize[] =['S','M','L','XL'];


 const ProductDetailsScreen = () => {
    const {id: idString} = useLocalSearchParams();
    const id = idString !== undefined ? parseFloat(typeof idString === 'string' ? idString : idString[0]) : NaN;
    
    const {data:product, error, isLoading } = useProduct(id);

    const {addItem} = useCart();

    const router = useRouter();

    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
    // const product = products.find((p)=> p.id.toString() == id);

    const addToCart = () =>{
        if(!product){
            return;
        }
        addItem(product, selectedSize);
        router.push('/cart');
    }
    if(!product){
        return <Text>Product not Found</Text>
    }

  if(isLoading){
    return <ActivityIndicator/>;
  }
  if(error){
    return <Text>Failed to fetch products</Text>
  }

    return(
        <View style={styles.container}>
            <Stack.Screen options={{title: product.name}}/>
            <RemoteImage path={product?.image}
            fallback={defaultPizza}
            style={styles.image}/>
        <Text>Select Size</Text>
        <View style={styles.sizes}>
        {sizes.map(size=>(
            <Pressable onPress={()=> {setSelectedSize(size)}} style={[styles.size, {backgroundColor: selectedSize == size ? 'gainsboro': 'white'}]}  key={size}> 
                  <Text style={[styles.sizeText,  {color: selectedSize == size ? 'black': 'gray'}]}>{size}</Text>
            </Pressable>
          
        ))} 
        </View>
       
            <Text style={styles.price}>price: €{product.price}</Text>

            <Button onPress={addToCart} text="Add to cart"/>
        </View>
    );
};

const styles = StyleSheet.create({
     container:{
        backgroundColor: 'white',
        flex:1,
        padding:10,
     },
     image:{
        width: '100%',
        aspectRatio:1,
     },
     price:{
        fontSize: 18,
        fontWeight: 'bold',
        marginTop:'auto',
     },
     sizes:{
        flexDirection: 'row',
        justifyContent: 'space-around'
     },
     size:{
        backgroundColor: 'yellow',
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent:'center'

     },
     sizeText:{
        fontSize: 20,
        fontWeight:'bold'
     }
})

export default ProductDetailsScreen;

