import { StyleSheet, Image, Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import React from 'react';
import { Tables } from '@/app/types';
import { Link, useSegments } from 'expo-router';

export const defaultPizza ='https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png';

type ProductListItemProps = {
    product: Tables<'products'>;
}

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`${segments[0]}/menu/${product.id}`} asChild>
    <Pressable  style={styles.container}>
      <Image source={{uri: product.image || defaultPizza}}
       style={styles.image} 
       resizeMode='contain'/>
   <Text style={styles.title}>{product.name}</Text>
    <Text style={styles.price}>€{product.price}</Text>

    </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
   backgroundColor: 'white',
   padding: 10,
   borderRadius: 20,
   flex: 1,
   maxWidth: '50%',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint, 
    fontWeight: 'bold',
  },
  image: {
    width:'100%',
    aspectRatio: 1  }
});
