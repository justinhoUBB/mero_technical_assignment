import {  Text, Button, View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ReviewService } from '../services/reviewApi';
import { useEffect, useState } from 'react';
import { computeAverageRating } from '../utils/utils';
import { IReview } from '../models/iReview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type Props = NativeStackScreenProps<any, any>;

export default function HomeScreen({ navigation: { navigate }, route}: Props) {
  const [data, setData] = useState<IReview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userInputRating, setRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ReviewService.getInstance().getReviews();
        setData(response?.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCurrentUserName = (): string => {
    var currentUserName = "Rate and review";
    if (route?.params?.userSubmitted) {
      currentUserName = route?.params?.fullName != "" ?  route?.params?.fullName : "Anonym";
    }
    return currentUserName;
  };

  const getCurrentUserReview = (): string => {
    var currentUserReview = "Share your experience to help others";
    if (route?.params?.userSubmitted) {
      currentUserReview = route?.params?.text;
    }
    return currentUserReview;
  };

  const handleStarPress = (selectedRating:number) => {
    setRating(selectedRating);
    navigate('inputscreen', { userInputRating: selectedRating });
  };

  const renderStars = (size: number, loadedReviewRating? : number) => {
    const stars = [];
    const rating = loadedReviewRating ?? userInputRating;
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= rating;
      const starColor = isFilled ? 'gold' : 'gray';

      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
        >
          <Icon
            name={isFilled ? 'star' : 'star-o'}
            size={size}
            color={starColor}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}> 
          <Text style={styles.title}>Reviews </Text>
          <View style={styles.subHeader}>
            <Text style={styles.grayContent}>{ computeAverageRating(data) } from {data.length} ratings </Text>
            <Button title='View all reviews'/>
          </View>
          <View>
            <View style={styles.rateAndReviewHeader}> 
            <Image style={styles.profilePic} source={require('../assets/profile_pic.png')} />
              <View style={styles.rateAndReviewText}> 
                <Text style={styles.subtitle}>{ getCurrentUserName() } </Text>
                <Text style={styles.grayContent}> { getCurrentUserReview() }</Text>
              </View>
            </View>
            <View style={styles.bigStars}>
                { renderStars(40) }
             </View>
          </View>
        </View>
      <View style={styles.reviewsList}>
       <Text style={styles.subtitle}>Latest reviews </Text>
       <FlatList 
          data={data.slice(0,3)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.rating}>
            <View style={styles.rateAndReviewHeader}> 
              <Image style={styles.profilePic} source={require('../assets/profile_pic.png')} />
              <View style={styles.userAndRating}> 
                  <Text style={styles.subtitle}> {item.fullName ?? "Anonym"} </Text>
                  <View style={styles.smallStars}>
                    { renderStars(15, item.rating) }
                  </View>
                </View>
              </View>
              <Text style={styles.reviewContent}> {item.text} </Text>
            </View>
          )}
        />
        <Button title='View all reviews'/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profilePic: {
    width: 50,
    height: 50,
  },
  rating: {
    paddingVertical: 20
  },
  container: {
    paddingTop: 35,
    paddingBottom: 85,
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    flex: 1
  },
  inputContainer: {
    flex: 1,
    marginBottom: 30,
  },
  reviewsList: {
    flex: 3,
    paddingTop: 20
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  smallStars: {
    flexDirection: "row",
    marginLeft: 5
  },
  bigStars: {
    paddingHorizontal: 65,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rateAndReviewHeader:{
    flexDirection: "row",
    alignItems: "center",
  },
  rateAndReviewText:{
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: 10
  },
  userAndRating:{
    flexDirection: "column",
    flex: 3,
    paddingLeft: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 15,
  },
  grayContent: {
    fontSize: 14,
    color: 'gray',
  },
  reviewContent: {
    fontSize: 15,
    marginLeft: 70
  }
});
