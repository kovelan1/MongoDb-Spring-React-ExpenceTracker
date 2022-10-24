import axios from "axios";
import qs from "qs";
import Alert from '@mui/material/Alert';

export const local = "http://localhost:8080";

export const LicenseData = async (image) => {
    try {
      var res = await axios({
        method: "post",
        url: local + "api/b/image",
        data: image,
        headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + CookieService.getCookie("axTok"),
          },
      });
      return res;
    } catch (error) {
      
     console.log(error)
    }
  };

  export const getAuthondicated=async (data)=>{
   
      var res = await axios({
        method: "post",
        url: local + "/api/authenticate",
        data: data,
        headers: {
            "Content-Type": "application/json",
            
          },
      })
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
      return res;
    
  }

  export const signup=async (data)=>{
   
    var res = await axios({
      method: "post",
      url: local + "/api/signup",
      data: data,
      headers: {
          "Content-Type": "application/json",
          
        },
    })
    return res;
  
}

export const getUser=async (id)=>{
   
  var res = await axios({
    method: "get",
    url: local + `/api/user/${id}` ,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+localStorage.getItem('token')
      },
  })
  return res;

}

export const updateUser=async (id,data)=>{
   
  var res = await axios({
    method: "put",
    url: local + "/api/user/"+id,
    data: data,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+localStorage.getItem('token')
      },
  })

  return res;

}

export const pieChartData=async (id,date)=>{
   
  var res = await axios({
    method: "get",
    url: local + `/api/expense/user/${id}/${date}/percentage-visual` ,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+localStorage.getItem('token')
      },
  })
  return res;

}

export const expensesByUserAndDate=async (id,dates, datee)=>{
   
  var res = await axios({
    method: "get",
    url: local + `/api/expense/user/${id}/date/${dates}/${datee}` ,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+localStorage.getItem('token')
      },
  })
  return res;

}

export const expensesLimitAlertByUser=async (id,date)=>{
   
  var res = await axios({
    method: "get",
    url: local + `/api/expense/user/${id}/isExcided/${date}`,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+localStorage.getItem('token')
      },
  })
  return res;

}

export const createExpences=async (data)=>{
   
  var res = await axios({
    method: "post",
    url: local + "/api/expense",
    data: data,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+localStorage.getItem('token')
      },
  })

  return res;

}


export const updateExpences=async (id,data)=>{
   
  var res = await axios({
    method: "put",
    url: local + "/api/expense/"+id,
    data: data,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+localStorage.getItem('token')
      },
  })

  return res;

}

export const deleteExpences=async (id)=>{
   
  var res = await axios({
    method: "delete",
    url: local + "/api/expense/"+id,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+localStorage.getItem('token')
      },
  })

  return res;

}

export const filterExpences=async (userName,category,description,startDate,endDate)=>{
  var formData = new FormData();
  formData.append("category","food");
  formData.append("description",description);
  formData.append("startDate",startDate);
  formData.append("endDate",endDate);
  formData.append("userName",userName)
  var res = await axios({
    method: "get",
    url: local + "/api/expense/filter/search",
    params:{
      'category':category,
      'description':description,
      'minPrice':'',
      'maxPrice':'',
      'startDate':startDate,
      'endDate':endDate
      
    },
    headers: {
      "Content-Type": "multipart/form-data",
        "Authorization": "Bearer "+localStorage.getItem('token'),
      },
  })

  return res;

}