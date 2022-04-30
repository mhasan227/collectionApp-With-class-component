/*const login = async (user,pass) => {
    const gwUrl = 'http://apigw-maxis.nagadpay.com/';

    try {
        let res = await fetch(gwUrl + 'authentication-service/endpoint/oauth/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user,
                password: pass
            })
        });

        let result = await res.json();
        return result;
        
        //console.warn(result.result.userId);
        //console.warn(result.result.message);
        if(result.result.result=== 'SUCCESS'){
            //this.setAsyncStorage(result); // this is implemented for auto login
            
            //this.props.navigation.navigate('HomeScreen',{result});
        }
        //this.setInputValue( "responseMessage", result.result.message );
        //this.state.test = result.result.message;
        

        
        

    }catch (e) {
        
    }
    
    //console.warn('api');
    
   
    
}
export  {login};*/

export default {
    login: async (body) => {
        //const {username,password}=body
        const gwUrl = 'http://apigw-maxis.nagadpay.com/';

        try {
            let res = await fetch(gwUrl + 'authentication-service/endpoint/oauth/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            let result = await res.json();
            return result;
            

        }catch (e) {
            
        }
    },

    setfcmToken: async(body,token)=> {
        //const {username,password}=body
        const gwUrl = 'http://apigw-maxis.nagadpay.com/';

        try {
            let res = await fetch(gwUrl + 'collection-service/endpoint/firebase/set-firebase-token', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    token: "Bearer " + token,
                },
                body: JSON.stringify(body)
            });

            let result = await res.json();
            return result;
            

        }catch (e) {
            
        }
    },

    api: async(body,token,path)=> {
        //const {username,password}=body
        const gwUrl = 'http://apigw-maxis.nagadpay.com/';

        try {
            let res = await fetch(gwUrl + path, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    token: "Bearer " + token,
                },
                body: JSON.stringify(body)
            });

            let result = await res.json();
            return result;
            

        }catch (e) {
            
        }
    },

    apiget: async(token,path)=> {
        
        const gwUrl = 'http://apigw-maxis.nagadpay.com/';

        try {
            let res = await fetch(gwUrl + path, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    token: "Bearer " + token,
                },
                
            });

            let result = await res.json();
            return result;
            

        }catch (e) {
            
        }
    }
}