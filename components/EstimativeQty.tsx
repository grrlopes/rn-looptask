import { Text } from 'react-native'
import { FC } from 'react'
import { message } from '@/app/(tabs)';

interface Props {
  currentDay: message
}

const EstimativeQty: FC<Props> = ({ currentDay }) => {
  const smallDifference = currentDay.estimate.small - currentDay.small_count;
  const isNegative = smallDifference < 0;
  const isPositive = currentDay.small_count > 0;

  let quantity: string;
  let textColor: string;

  if (isNegative) {
    quantity = `${smallDifference}`;
    textColor = "red";
  } else if (isPositive) {
    quantity = `+${smallDifference}`;
    textColor = "green";
  } else {
    quantity = "0";
    textColor = "green";
  }

  return (
    <Text style={{ color: textColor }}>{quantity}</Text>
  );
};

export default EstimativeQty
