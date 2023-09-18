import {  Button, View, StyleSheet, TouchableOpacity, TextInput, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import { IReview } from '../models/iReview';
import { Props } from './homescreen';
import { ReviewService } from '../services/reviewApi';
import { Rating } from '../models/enums/rating';
import { getEnumValueDynamically } from '../utils/utils';

export default function SubmitReviewScreen({ navigation: { navigate }, route}: Props) {
  const [data, setData] = useState<IReview[]>([]);
  const [newInputRating, setRating] = useState(0);
  const [fullName, setFullName] = useState("");
  const [reviewText, setText] = useState("");

  const handleStarPress = (selectedRating:number) => {
    setRating(selectedRating);
  };

  const saveReview = async (): Promise<void> => {
    const review : IReview = {
        rating: newInputRating > 0 ? newInputRating : route?.params?.userInputRating,
        text: reviewText,
        fullName,
    };
    ReviewService.getInstance().saveReview(review);
    navigate("home", { userSubmitted: true, fullName, text: reviewText });
  };

  const getRatingText = (): string => {
    const rating = (newInputRating > 0) ? newInputRating : route?.params?.userInputRating;
    return getEnumValueDynamically(Rating, "STARS_" + rating);
  };

  const renderStars = (size: number) => {
    const stars = [];
    const rating = newInputRating > 0 ? newInputRating : route?.params?.userInputRating;
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
            <View style={styles.bigStars}>
                { renderStars(40) }
             </View>
              <Text style={styles.ratingDescription}>{ getRatingText() } </Text>
             <TextInput style={styles.textBox} placeholder="Full Name" onChangeText={setFullName} value={fullName}/>
             <TextInput style={styles.textBox} placeholder="Describe your experience" onChangeText={setText} value={reviewText}/>
             <Button title='submit' onPress={saveReview}/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({ 
  ratingDescription: {
    textAlign: "center",
    marginBottom: 10,
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
    marginBottom: 30
  },
  textBox: {
    marginBottom: 15,
    borderTopColor: "lightgray",
    borderTopWidth: 2,
    height: 40
  },
  bigStars: {
    paddingHorizontal: 65,
    paddingVertical: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }
});
