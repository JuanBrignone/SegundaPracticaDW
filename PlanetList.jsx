import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Image, Button } from 'react-native';
import AddPlanet from './AddPlanet'; // Componente para agregar planetas

const PlanetsList = ({ navigation }) => {
  const [planets, setPlanets] = useState([]); // Estado para los planetas
  const [isModalVisible, setModalVisible] = useState(false); // Estado para el modal

  // Obtener la lista de planetas al cargar el componente
  useEffect(() => {
    fetchPlanets();
  }, []);

  const fetchPlanets = async () => {
    try {
      const response = await fetch('http://172.20.10.2:3000/planets'); // Cambia por tu URL del backend
      if (response.ok) {
        const data = await response.json();
        setPlanets(data); // Almacena los planetas en el estado
      } else {
        console.error('Error al obtener los planetas:', response.status);
      }
    } catch (error) {
      console.error('Error al obtener los planetas:', error);
    }
  };

  const handleAddPlanet = (newPlanet) => {
    if (newPlanet) {
      setPlanets((prevPlanets) => [...prevPlanets, newPlanet]); // Agregar nuevo planeta
    }
    setModalVisible(false); // Cerrar el modal
  };

  const renderPlanet = ({ item }) => (
    <TouchableOpacity
      style={styles.planetCard}
      onPress={() => navigation.navigate('PlanetDetails', { planet: item })}
    >
      <Image source={{ uri: item.image }} style={styles.planetImage} />
      <Text style={styles.planetName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Planetario UCU</Text>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Agregar Planeta</Text>
      </TouchableOpacity>

      <FlatList
        data={planets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPlanet}
      />

      {/* Modal para agregar un nuevo planeta */}
      <Modal visible={isModalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <AddPlanet onAddPlanet={handleAddPlanet} />
        <Button title="Volver" onPress={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  planetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  planetImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  planetName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PlanetsList;
