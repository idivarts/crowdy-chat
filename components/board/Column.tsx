import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

interface IProps { title: string, items: any[] }
const Column: React.FC<IProps> = ({ title, items }) => {
    return (
        <View style={styles.column}>
            <Text style={styles.columnTitle}>{title}</Text>
            <Droppable droppableId={title}>
                {(provided) => (
                    <View
                        // @ts-ignore
                        ref={provided.innerRef}
                        style={styles.cardList}
                        {...provided.droppableProps}
                    >
                        {items.map((item, index) => (
                            <Card key={item} item={item} index={index} />
                        ))}
                        {provided.placeholder}
                    </View>
                )}
            </Droppable>
        </View>
    );
};

const styles = StyleSheet.create({
    column: {
        backgroundColor: '#e2e4e6',
        borderRadius: 3,
        width: 250,
        padding: 10,
        marginHorizontal: 10,
    },
    columnTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardList: {
        minHeight: 100,
    },
});

export default Column;