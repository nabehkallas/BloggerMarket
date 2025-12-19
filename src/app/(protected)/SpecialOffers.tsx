import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card } from '@rneui/themed';
import { Link } from 'expo-router';
import { fetchOffers } from '../../services/SpecialOfferService';
import { fetchBloggers } from '../../services/bloggerService';
import CustomModal from '../../components/CustomModal';

interface SpecialOffer {
  id: number;
  name: string;
  description: string;
  bloggerIds: number[];
  picture: string | number;
  fixedPrice: number;
}
interface Blogger {
  id: string;
  name: string;
  description: string;
  picture: string;
  basePricePerVideo: number;
}

const CardItem = ({ item, onPress }: { item: SpecialOffer, onPress: () => void }) => { 
  return (
    <TouchableOpacity onPress={onPress}>
      <Card containerStyle={styles.cardContainer}>
          <Card.Title style={styles.cardTitle}>{item.name}</Card.Title>
          <Card.Image source={typeof item.picture === 'string' ? { uri: item.picture } : item.picture} resizeMode='contain' style={styles.cardImage}/>
          <Text style={styles.cardPriceText}>
            Offer Price: ${item.fixedPrice}
          </Text>
          <Card.Divider style={styles.cardDivider}/>
      </Card>
    </TouchableOpacity>
  );
}

export default function SpecialOffers() {
    const { data: specialOffers, isLoading , isError, error } = useQuery<SpecialOffer[], Error>({
      queryKey: ['SpecialOffers'],
      queryFn: fetchOffers,
    });

    const { data: bloggers } = useQuery<Blogger[], Error>({
      queryKey: ['bloggers'],
      queryFn: fetchBloggers,
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState<SpecialOffer | null>(null);

    const openModal = (offer: SpecialOffer) => {
      setSelectedOffer(offer);
      setModalVisible(true);
    };

    const closeModal = () => {
      setModalVisible(false);
      setSelectedOffer(null);
    };

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
       <FlatList 
            data={specialOffers}
            contentContainerStyle={styles.listContentContainer}
            style={styles.list} 
            renderItem={({ item }) => (
              <CardItem item={item} onPress={() => openModal(item)} /> 
            )} 
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
        />
        {selectedOffer && (
          <CustomModal visible={modalVisible} onClose={closeModal}>
            <Card containerStyle={styles.cardContainer}>
              <Card.Title style={styles.cardTitle}>{selectedOffer.name}</Card.Title>
              
              <Text style={styles.cardPriceText}>
                Offer Price: ${selectedOffer.fixedPrice}
              </Text>
               <Text style={{fontSize: 15,
                              marginTop: 40,
                    fontWeight: '400', 
                    lineHeight: 22, 
                    color: '#333333',
                    
                    fontStyle: 'italic',
                    marginBottom: 20
                    }}>
                                {selectedOffer.description}
                              </Text>
              <Card.Divider style={styles.cardDivider}/>
              <View style={styles.bloggerListContainer}>
               
                <Text style={styles.bloggerListTitle}>Included Bloggers:</Text>
                <View style={styles.bloggerAvatars}>
                  {selectedOffer.bloggerIds.map((bloggerId) => {
                    const blogger = (bloggers || []).find((b) => b.id.toString() === bloggerId.toString());
                    if (!blogger) return null;
                    return (
                      <Image key={bloggerId} source={{ uri: blogger.picture }} style={styles.bloggerAvatar} />
                    );
                  })}
                </View>
              </View>
              <Link href={`/Offer/${selectedOffer.id}`} asChild>
                
              </Link>
            </Card>
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
  },
  bloggerListContainer: {
    width: '100%',
    marginVertical: 10,
  },
  bloggerListTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  bloggerAvatars: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bloggerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
});