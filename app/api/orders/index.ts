import { Tables } from "@/app/database.types";
import { supabase } from "@/app/lib/supabase";
import { insertTables } from "@/app/types";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery, useMutation, Mutation, useQueryClient} from "@tanstack/react-query";

export const useAdminOrderList = ({archived = false}) =>{
    const statuses= archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering'];
  return useQuery({
        queryKey: ['orders', {archived}],
        queryFn: async ()=>{
            const {data, error} = await supabase
                .from('orders')
                .select('*')      
                .in('status',statuses);
            if(error){
              throw new Error(error.message);
            }
            return data;
        }
      });  
    
}  

export const useMyOrderList = () =>{

    const {session} = useAuth();
    const id = session?.user.id;

    return useQuery({
          queryKey: ['orders', {userId:id}],
          queryFn: async ()=>{
            if(!id) return null;
              const {data, error} = await supabase
              .from('orders')
              .select('*')
              .eq('user_id', id);
              if(error){
                throw new Error(error.message);
              }
              return data;
          },
        });  
      
  }  

  export const useOrderDetails = (id: number)=>{
    return useQuery({
      queryKey: ['orders', id],
      queryFn: async ()=>{
          const {data, error} = await supabase
          .from('products')
          .select('*')
          .eq('id',id)
          .single();
          if(error){
            throw new Error(error.message);
          }
          return data;
      }
    });  
  
  }

  export const useInsertOrder = ()=>{
    const queryClient = useQueryClient();
    const { session} = useAuth();
    const userId = session?.user.id;

  return useMutation({
    async mutationFn(data:insertTables<'orders'>){
     const {error, data: newProduct} = await supabase.
     from('orders')
     .insert({user_id:userId, ...data})
     .select()
     .single();
  
      if(error){
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess(){
     await queryClient.invalidateQueries(['products']);
    },
  });
  };