import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {
  VStack, Input, Button, ScrollView,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import SearchDropDown from '../ManualEntryComponents/SearchDropdown.jsx';
import IngredientList from '../ManualEntryComponents/IngredientList.jsx';
import { BACKEND_URL } from '../../store.js';
import { useFridgeContext } from '../FridgeContext.jsx';

export default function ManualEntry({ navigation }) {
  const {
    reviewIdsDispatch,
    dispatchHelpers: { addReviewIds },
  } = useFridgeContext();

  const [foodItems, setFoodItems] = useState(null);
  const [filteredList, setFilteredList] = useState(null);
  const [searchStatus, setSearchStatus] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchFoodItems = async () => {
      const foodItemsResponse = await axios.get(`${BACKEND_URL}/foodItems/index`);
      setFoodItems(foodItemsResponse.data);
      setFilteredList(foodItemsResponse.data);
    };
    fetchFoodItems();
  }, []);

  const handleSearch = (e) => {
    if (e) {
      setSearchStatus(true);
      const searchText = e.toLowerCase();
      setSearchInput(e);
      const filteredSearch = foodItems.filter((x) => x.name.match(searchText)
          && !selectedList.map((y) => y.name).includes(x.name));
      setFilteredList(filteredSearch);
    } else {
      setSearchStatus(false);
      setSearchInput('');
      setFilteredList(foodItems);
    }
  };

  return (
    <View style={{
      height: '100%', alignItems: 'center', justifyContent: 'center', padding: 10,
    }}
    >
      <ScrollView width="sm">
        <VStack space={3} width="xs" marginX="auto" alignItems="center">
          <Input
            size="xl"
            placeholder="Search"
            bg="primary.100"
            marginTop={3}
            value={searchInput}
            onChangeText={handleSearch}
          />
          {searchStatus && (
          <SearchDropDown
            filtered={filteredList}
            setSelectedList={setSelectedList}
            setSearchInput={setSearchInput}
            setFilteredList={setFilteredList}
            setSearchStatus={setSearchStatus}
          />
          )}
          {selectedList && (
          <IngredientList
            selected={selectedList}
            setSelectedList={setSelectedList}
          />
          )}
          {selectedList.length > 0 && (
          <Button
            marginTop={2}
            alignSelf="flex-end"
            colorScheme="primary"
            _text={{ fontSize: 'md' }}
            endIcon={
              <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
            }
            onPress={() => {
              reviewIdsDispatch(addReviewIds(selectedList.map((x) => x.id)));
              setSelectedList([]);
              navigation.navigate('Review Items');
            }}
          >
            Review Items
          </Button>
          )}
        </VStack>
      </ScrollView>
    </View>
  );
}
