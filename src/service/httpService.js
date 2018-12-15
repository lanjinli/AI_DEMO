export default class httpService {
    static get(url){
        return new Promise((resolve,reject)=>{
            fetch(url)
                .then(response=>response.json())
                .then(result=>{
                    resolve(result);
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }
    static post(url,data){
        return new Promise((resolve,reject)=>{
            fetch(url,{
                method: 'POST',
                headers: {
            　　　　 'Accept': 'application/json',
            　　　　 'Content-Type': 'application/json',
        　　　　 },
                body: JSON.stringify(data)
            })
                .then(response =>{
                    try {
                        return response.json()
                    }catch(error) {
                        reject(error);
                    }
                })
                .then(result=>{
                    console.log(result);
                    resolve(result);
                })
                .catch(error=>{
                    console.log(error);
                    reject(error);
                })
                .done();
        })
    }
};