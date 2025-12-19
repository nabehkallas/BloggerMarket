import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput
} from 'react-native'
import React, { useState } from 'react'
import { fetchBloggers } from '../../services/bloggerService'
import { useQuery } from '@tanstack/react-query'
import { Card } from '@rneui/themed';
import { Link } from 'expo-router';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  type ColumnFiltersState,
  type ColumnDef,
} from '@tanstack/react-table';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSearchStore } from '../../store/searchStore';
import CustomModal from '../../components/CustomModal';

interface Blogger {
  id: string;
  name: string;
  description: string;
  picture: string;
  basePricePerVideo: number;
}

const CardItem = ({ item, onPress }: { item: Blogger, onPress: () => void }) => { 
  return (
    <TouchableOpacity onPress={onPress}>
      <Card containerStyle={styles.cardContainer}>
          <Card.Title style={styles.cardTitle}>{item.name}</Card.Title>
          <Card.Image source={{uri:item.picture}} resizeMode='contain' style={styles.cardImage}/>
          <Text style={styles.cardPriceText}>
            Base Price: ${item.basePricePerVideo}
          </Text>
          <Card.Divider style={styles.cardDivider}/>
      </Card>
    </TouchableOpacity>
  );
}

const bloggerColumns: ColumnDef<Blogger>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    filterFn: 'includesString',
  },
  {
    accessorKey: 'basePricePerVideo',
    header: 'Price',
  },
];

export default function BloggerCatalogScreen() {
    const { data: bloggers, isLoading , isError, error } = useQuery<Blogger[], Error>({
      queryKey: ['bloggers'],
      queryFn: fetchBloggers,
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBlogger, setSelectedBlogger] = useState<Blogger | null>(null);

    const openModal = (blogger: Blogger) => {
      setSelectedBlogger(blogger);
      setModalVisible(true);
    };

    const closeModal = () => {
      setModalVisible(false);
      setSelectedBlogger(null);
    };

    const isSearchVisible = useSearchStore((state) => state.isSearchVisible);
    
    const searchContainerHeight = useSharedValue(0);
    const searchContainerOpacity = useSharedValue(0);

    const animatedSearchContainerStyle = useAnimatedStyle(() => {
      return {
        height: searchContainerHeight.value,
        opacity: searchContainerOpacity.value,
        overflow: 'hidden',
      };
    });

    React.useEffect(() => {
      if (isSearchVisible) {
        searchContainerHeight.value = withTiming(60, { duration: 300 });
        searchContainerOpacity.value = withTiming(1, { duration: 300 });
      } else {
        searchContainerHeight.value = withTiming(0, { duration: 300 });
        searchContainerOpacity.value = withTiming(0, { duration: 200 });
      }
    }, [isSearchVisible]);

    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data: bloggers || [],
        columns: bloggerColumns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
    });

    const nameColumn = table.getColumn('name');
    const filteredBloggers = table.getRowModel().rows.map(row => row.original);

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    if (isError) {
        return (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>Error: {error.message}</Text>
          </View>
        );
    }

    return (
      <View style={{ flex: 1 }}>
        <Animated.View style={animatedSearchContainerStyle}>
          <TextInput
              style={styles.searchInput}
              placeholder="Search Blogger Name..."
              value={(nameColumn?.getFilterValue() ?? '') as string}
              onChangeText={text => nameColumn?.setFilterValue(text)}
          />
        </Animated.View>
        <FlatList 
            data={filteredBloggers}
            contentContainerStyle={styles.listContentContainer}
            style={styles.list} 
            renderItem={({ item }) => (
              <CardItem item={item} onPress={() => openModal(item)} /> 
            )} 
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
        />
        {selectedBlogger && (
          <CustomModal visible={modalVisible} onClose={closeModal}>
            <Card containerStyle={styles.cardContainer}>
              <Card.Title style={{fontSize: 18,
    fontWeight: '700', // Bold
    color: '#1A1A1A',
    marginBottom: 4,
    }}>{selectedBlogger.name}</Card.Title>
              <Card.Image source={{uri:selectedBlogger.picture}} resizeMode='contain' style={styles.cardImage}/>
              <Text style={styles.cardPriceText}>
                Base Price: ${selectedBlogger.basePricePerVideo}
              </Text>
            </Card>
              <Text style={{fontSize: 15,
              marginTop: 40,
    fontWeight: '400', 
    lineHeight: 22, 
    color: '#333333',
    
    fontStyle: 'italic',
    marginBottom: 20
    }}>
                {selectedBlogger.description}
              </Text>

          </CustomModal>
        )}
      </View>
    )
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  list: {
    width:'100%', 
    flex: 1, 
    backgroundColor:' #FAFAFA'
  },
  listContentContainer: {
    alignItems:'center',
    paddingVertical: 20,
  },
  cardContainer: {
    padding:20,
    alignItems:'center',
    borderRadius:15,
    backgroundColor:'#FFFFFF'
  },
  cardTitle: {
    fontFamily: 'Inter-SemiBold', 
    fontSize: 20,
    fontWeight: '600', 
    color: '#1A1A1A',
  },
  cardImage: {
    width:200,
    height:200,
    borderRadius:15
  },
  cardPriceText: {
    marginTop: 30,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    fontWeight: '400', 
    color: '#666666',
  },
  cardDivider: {
    marginTop: 20
  },
  searchInput: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    margin: 10,
    backgroundColor: '#FFFFFF',
  }
});