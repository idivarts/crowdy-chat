import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Draggable } from 'react-beautiful-dnd';

const Card: React.FC<{ item: any, index: any }> = ({ item, index }) => {
    return (
        <Draggable draggableId={item} index={index}>
            {(provided) => (
                <View
                    // @ts-ignore
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={styles.card}
                >
                    <Text>{item}</Text>
                </View>
            )}
        </Draggable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 3,
        padding: 10,
        marginBottom: 10,
        shadowColor: '0 1px 0 rgba(9,30,66,.25)',
    },
});

export default Card;