import AsyncStorage from '@react-native-async-storage/async-storage';
export function setAsyncStorage (result)  {
       //set the value to async storage   this is for autologin

        try {
           AsyncStorage.setItem('isLoggedIn', 'YES');
           const token = JSON.stringify(result.result.authResponse.id_token);
           const data = JSON.stringify(result.result);
           const userId = JSON.stringify(result.result.userId);
           const userName= JSON.stringify(result.result.userName);
           const userPhone= JSON.stringify(result.result.userPhone);
           const userImage= JSON.stringify(result.result.userImage);
           const roleListName= JSON.stringify(result.result.roleList[0].name);
           AsyncStorage.setItem('isLoggedInn', token); 
           AsyncStorage.setItem('userId', userId);
           AsyncStorage.setItem('userName', userName);   
           AsyncStorage.setItem('data', data);    
           AsyncStorage.setItem('userPhone', userPhone);   
           AsyncStorage.setItem('userImage', userImage);
           AsyncStorage.setItem('roleListName', roleListName);
           //this.props.navigation.navigate('HomeScreen',{result});  //(optional)
           
        } catch (error) {
          console.log(error);
        }
       
  };

  export const setInLocalStorge = async (key: String, token) => {
    try {
      const res = await AsyncStorage.setItem(key, JSON.stringify(token));
      console.log('setInLocalStorge', res);
    } catch (err) {
      console.log('setInLocalStorge Error', err);
    }
  };

  export const getFromLocalStorge = async (key: String) => {
    try {
      const token = await AsyncStorage.getItem("roleListName");
      return token ? JSON.parse(token) : null;
    } catch (err) {
      console.log('getFromLocalStorge Error', err);
    }
  };

  export const getAccessKey =  () => {
     AsyncStorage.getItem('roleListName').then((value2) => {
       return JSON.parse(value2)
    })
   }