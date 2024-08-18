import { Text,  } from '@/components/Themed';
import React from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import ProductListItem from '@/components/ProductListItem';
import { supabase } from '@/app/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { useProductList } from '@/app/api/products';

export default function MenuScreen() {

  const { data: products, error, isLoading} = useProductList();
    

  if(isLoading){
    return <ActivityIndicator/>;
  }
  if(error){
    return <Text>Failed to fetch products</Text>
  }
  
  // useEffect(()=>{
  //     const fetchProduct = async ()=>{
  //       const {data, error} = await supabase.from('products').select('*');
  //       console.log(error);
  //       console.log(data);
  //     };
  //     fetchProduct();
  // },[]);

  return (
    <FlatList
     data={products} 
     renderItem={({item}) => <ProductListItem product={item}/>}
     numColumns={2}
     contentContainerStyle={{gap:10, padding: 10}}
     columnWrapperStyle={{gap:10}}
     />
  );
}



