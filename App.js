import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  View,
  Text,
  Dimensions,
} from 'react-native';
import {LineChart, BarChart} from 'react-native-chart-kit';
import moment from 'moment';

const App = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState(0);

  const [data, setData] = useState([
    {date: moment().format('LL'), amount: 2000},
    {date: moment().subtract(1, 'days').format('LL'), amount: 2500},
    {date: moment().subtract(2, 'days').format('LL'), amount: 3500},
    {date: moment().subtract(3, 'days').format('LL'), amount: 1500},
    {date: moment().subtract(4, 'days').format('LL'), amount: 500},
  ]);

  const getDates = () => data.map((pair) => pair.date);
  const getAmounts = () => data.map((pair) => pair.amount);

  const groupBy = (array, key) => {
    xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const [gigs, setGigs] = useState([
    {
      description: 'Tuition',
      amount: 100.0,
      timestamp: new Date(),
    },
  ]);

  useEffect(() => {
    setTotal(gigs.reduce((total, gig) => total + Number(gig.amount), 0));
  }, [gigs]);

  const addGig = () => {
    setGigs([
      ...gigs,
      {
        description: description,
        amount: amount,
        timestamp: new Date(),
      },
    ]);

    setDescription('');
    setAmount('');
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Income Manager</Text>
      </View>
      <View>
        <LineChart
          data={{
            labels: getDates(),
            datasets: [
              {
                data: getAmounts(),
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: 'green',
            backgroundGradientTo: 'green',
            decimalPlaces: null, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      <Text>Total Amount: $ {total}</Text>

      <TextInput
        style={styles.input}
        value={description}
        placeholder="Enter a description"
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        style={styles.input}
        value={amount}
        placeholder="Enter the amount you made in USD"
        keyboardType="numeric"
        onChangeText={(text) => setAmount(text)}
      />
      <Button
        disabled={!amount && !description}
        onPress={addGig}
        title="Add Gig"
      />

      {gigs &&
        gigs.map((gig) => (
          <View>
            <Text>{gig.description}</Text>
            <Text>${gig.amount}</Text>
          </View>
        ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'red',
    borderWidth: 1,
    margin: 10,
    height: 40,
    padding: 10,
  },
});

export default App;
