import { doGet, doPost, doPut,doDelete, baseurl } from "./request"

 export const imageUrl =  (imagePath)  => {
    return (`${baseurl}/images/${imagePath}`)
 }

//  Category APIs
export const getAllCategories = async () => {
   return await doGet("api/shop/getAllCategory")
  }
  export const getAddCategory= async(data) =>{
    return await doPost('api/shop/addCategory',data);
  }
  export const getEditCategory = async(data) =>{
    return await doPut('api/shop/editCategory',data);
  }
  export const getDeleteCategory = async(data) =>{
    return await doDelete('api/shop/deleteCategory',data);
  }
  

//Product APIs 
  export const getAllShops = async () => {
    return await doGet("api/shop/get")
   }
   export const getAddShop= async(data) =>{
     return await doPost('api/shop/add',data);
   }
   export const getEditShop = async(data) =>{
     return await doPut('api/shop/edit',data);
   }
   export const getDeleteShop = async(data) =>{
     return await doDelete('api/shop/delete',data);
   }
   export const getShopsByCategory = async(data) =>{
     return await doPost('api/shop/getShopByCategory',data)
   }
   export const getShopsByName = async(data) =>{
    return await doPost('api/shop/getShopByBusinessName',data)
  }

   //ContactUs APIs
   export const getAllContactUs = async () => {
    return await doGet("api/contactUs/getAllContactUs")
   }
   export const getAddContactUs = async(data) =>{
     return await doPost('api/contactUs/addContactUs',data);
   }
   export const getDeleteContactUs = async(data) =>{
     return await doDelete('api/contactUs/deleteContactUs',data);
   }
