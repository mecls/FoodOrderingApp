import { Text, View } from '@/components/Themed';
import React from 'react';
import products from '@/assets/data/products';
import ProductListItem from '@/components/ProductListItem';

export default function MenuScreen() {
  return (
    <View >
     <ProductListItem product={products[5]}/>
     <ProductListItem product={products[1]}/>
    </View>
  );
}

