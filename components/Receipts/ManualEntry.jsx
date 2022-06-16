import React, { useState, useEffect } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import SearchDropDown from '../ManualEntryComponents/SearchDropdown.js'
import IngredientList from '../ManualEntryComponents/IngredientList.js';
import { VStack } from 'native-base';
import axios from 'axios';
import { BACKEND_URL } from '../../store.js';

export default function ManualEntry() {
  const [filteredList, setFilteredList] = useState(null);
  const [foodItems, setFoodItems] = useState(null);

  useEffect(()=>{
    const fetchFoodItems = async() => {
      const foodItemsResponse = await axios.get(`${BACKEND_URL}/foodItems/index`);
      console.log(foodItemsResponse);
      setFoodItems(foodItemsResponse.data)
      setFilteredList(foodItemsResponse.data);
    }
    fetchFoodItems();
  },[])

  const styles = StyleSheet.create({
    searchBar: {
      color: 'black',
      backgroundColor: 'grey',
      borderRadius: 10,
      padding: 10
    }
  });

  const [searchStatus, setSearchStatus] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    if (e) {
      setSearchStatus(true)
      const searchText = e.toLowerCase();
      setSearchInput(searchText);
      const filteredSearch = foodItems.filter((x)=>x.name.match(searchText) && !selectedList.map((x)=>x.name).includes(x.name))
      setFilteredList(filteredSearch)
    } else {
      setSearchStatus(false)
      setSearchInput('');
      setFilteredList(foodItems)
    }
  }

  return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <VStack space={3} alignItems='center'>
        <TextInput 
        placeholder='Search'
        placeholderTextColor='white'
        onChangeText={handleSearch}
        value={searchInput}
        style={styles.searchBar}
        />
        {searchStatus && <SearchDropDown filtered={filteredList} setSelectedList={setSelectedList} setSearchInput={setSearchInput} setFilteredList={setFilteredList} />}
        {selectedList && <IngredientList selected={selectedList} setSelectedList={setSelectedList} />}
      </VStack>
    </View>

  )
}