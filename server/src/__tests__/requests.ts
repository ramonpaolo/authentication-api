import axios from "axios";

export default class RequestsToTests{
    async createUser(name: string, email: string, password: string){
        var response = await axios.post(`http://localhost:${process.env.PORT}/user/register`, 
            {
                name,
                email,
                password,
              
        })
        return response
    }

    async loginUser(email: string, password: string){
        var response = await axios.post(`http://localhost:${process.env.PORT}/user/login`, 
            {
                email,
                password,
              
        })
        return response
    }

    async verifyUser(token: string){
        var response = await axios.get(`http://localhost:${process.env.PORT}/user/verifyAccount`, 
            {
              headers: {
                  "Authorization": `Bearer ${token}`
              }
        })
        return response
    }
}