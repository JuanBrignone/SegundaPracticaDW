import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const AddPlanet = ({ onAddPlanet }) => {
  const [newPlanet, setNewPlanet] = useState({
    name: '',
    description: '',
    moons: '',
    moonNames: '',
    image: '',
  });

  const handleAddPlanet = async () => {
    // Validación de campos antes de enviar
    if (
      newPlanet.name &&
      newPlanet.description &&
      !isNaN(newPlanet.moons) && // Validar que `moons` sea un número
      Array.isArray(newPlanet.moonNames) && // Validar que `moonNames` sea un array
      newPlanet.image
    ) {
      try {
        const response = await fetch('http://192.168.1.9:3000/planets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newPlanet.name,
            description: newPlanet.description,
            moons: parseInt(newPlanet.moons), // Convertir a número
            moon_names: newPlanet.moonNames, // Enviar como array
            image: newPlanet.image,
          }),
        });
  
        if (response.ok) {
          const addedPlanet = await response.json();
          onAddPlanet(addedPlanet); // Pasar el nuevo planeta al componente padre
          setNewPlanet({
            name: '',
            description: '',
            moons: '',
            moonNames: '',
            image: '',
          });
        } else {
          console.error(`Error en el POST: ${response.status}`);
        }
      } catch (error) {
        console.error('Error al agregar el planeta:', error);
      }
    } else {
      alert('Por favor, complete todos los campos correctamente.');
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
