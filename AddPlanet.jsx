import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddPlanet = ({ onAddPlanet }) => {
  const navigation = useNavigation(); // Hook para acceder a la navegación

  const [newPlanet, setNewPlanet] = useState({
    name: '',
    description: '',
    moons: '',
    moonNames: '',
    image: '',
  });

  const handleAddPlanet = async () => {
    if (
      newPlanet.name &&
      newPlanet.description &&
      newPlanet.moons &&
      newPlanet.moonNames &&
      newPlanet.image
    ) {
      try {
        const response = await fetch('http://172.20.10.2:3000/planets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPlanet),
        });

        if (response.ok) {
          const addedPlanet = await response.json();
          onAddPlanet(addedPlanet); // Pasa el planeta agregado al componente padre
          setNewPlanet({
            name: '',
            description: '',
            moons: '',
            moonNames: '',
            image: '',
          });
        } else {
          alert('Error al agregar el planeta');
        }
      } catch (error) {
        console.error('Error al agregar el planeta:', error);
        alert('Error al agregar el planeta');
      }
    } else {
      alert('Por favor, complete todos los campos');
    }
  };

  return (
    <View style={styles.modalContainer}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del planeta"
        value={newPlanet.name}
        onChangeText={(text) => setNewPlanet({ ...newPlanet, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={newPlanet.description}
        onChangeText={(text) => setNewPlanet({ ...newPlanet, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de lunas"
        keyboardType="numeric"
        value={newPlanet.moons}
        onChangeText={(text) => setNewPlanet({ ...newPlanet, moons: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombres de las lunas (separados por coma)"
        value={newPlanet.moonNames}
        onChangeText={(text) => setNewPlanet({ ...newPlanet, moonNames: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="URL de la imagen"
        value={newPlanet.image}
        onChangeText={(text) => setNewPlanet({ ...newPlanet, image: text })}
      />
      <Button title="Agregar" onPress={handleAddPlanet} />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default AddPlanet;
