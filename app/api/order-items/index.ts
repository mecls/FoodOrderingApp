import { supabase } from "@/app/lib/supabase";
import { insertTables } from "@/app/types";
import {  useMutation, useQueryClient} from "@tanstack/react-query";

export const useInsertOrderItems = ()=>{
    const queryClient = useQueryClient();
  
  return useMutation({
    async mutationFn(items:insertTables<'order_items'>[]){
     const {error, data: newProduct} = await supabase.
     from('order_items')
     .insert(items)
     .select();
  
      if(error){
        throw new Error(error.message);
      }
      return newProduct;
    }
  });
  };