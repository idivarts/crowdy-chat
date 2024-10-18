import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import { Text, View } from '../Themed';

const App = () => {
  return (
    <DragDropContext onDragEnd={() => { }}>
      <View style={styles.container}>
        <Text style={styles.header}>TRENDSHUB</Text>
        <ScrollView horizontal style={styles.board}>
          <Column title="Initial" items={['th_chat1', 'Rahul Sinha', 'Creato AI']} />
          <Column title="Take Action" items={[]} />
          <Column title="Data Collection" items={[]} />
          <Column title="Beta Intro" items={['Rahul']} />
          <Column title="Brands" items={[]} />
          <Column title="Wait Stage" items={[]} />
        </ScrollView>
      </View>
    </DragDropContext>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  board: {
    flexDirection: 'row',
  },
});

export default App;