import React from 'react';
import Tile from '../../component/Tile';
import {FlatList, Text, View} from 'react-native';

class ListingViewDetails extends React.Component {  
    constructor(props) {
        super(props);
        console.log(this.props);
        const data = this.props.route.params;
        let wallets = [];
        
        console.log("working",+data);
       
        this.state = {
         
        }
    }   

		render() {   
          let data= this.props.route.params.data;
          console.log(data);
	        return (
            <View style={{flex: 1}}>
              <FlatList
                keyExtractor={(item, index) => `${index}`}
                ListEmptyComponent={() => (
                  <View style={{padding: 32, alignItems: 'center'}}>
                    <Text style={{fontSize: 18}}>No Data</Text>
                  </View>
                )}
                ItemSeparatorComponent={({highlighted}) => (
                  <View
                    style={[
                      {height: 1, backgroundColor: '#ddd'},
                      highlighted && {marginLeft: 0},
                    ]}
                  />
                )}
                data={data}
                renderItem={({item}) => (
                  <Tile title={item.label} rightHeading={item.value} />
                )}
              />
            </View>
	       )
    }
        
    }

export default ListingViewDetails