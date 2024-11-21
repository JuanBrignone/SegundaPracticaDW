import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const PlanetDetails = ({ route, navigation }) => {
  const { planet } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{planet.name} Details:</Text>
      <Image source={{ uri: planet.image }} style={styles.planetImage} />
      <Text style={styles.description}>Description: {planet.description}</Text>
      <Text style={styles.moons}>Moons Amount: {planet.moons}</Text>
      <Text style={styles.moonsNames}>Moons: {planet.moon_names.join(', ')}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => { /* Implementar edición */ }} />
        <Button title="Delete" onPress={() => { /* Implementar eliminación */ }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  planetImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
  },
  description: {
    fontSize: 18,
    marginTop: 10,
  },
  moons: {
    fontSize: 18,
    marginTop: 5,
  },
  moonsNames: {
    fontSize: 18,
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default PlanetDetails;
