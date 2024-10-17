import React from 'react';
import ImageComponent from './ImageComponent';
import { IConversationUnit } from '@/types/CampaignsBoard';
import Colors from '@/constants/Colors';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface IProps {
  task: IConversationUnit;
  handleCurrentConversation: (task: IConversationUnit) => void;
}

const ConversationCard: React.FC<IProps> = (props) => {
  const theme = useTheme();

  return (
    <Pressable
      onPress={() => {
        props.handleCurrentConversation(props.task);
      }}
    >
      <View
        style={{
          backgroundColor: Colors(theme).white,
          borderColor: props.task.status > 0 ? '#11ca27' : '#e2e4e6',
          borderRadius: 10,
          borderWidth: 1,
          flexDirection: 'row',
          marginHorizontal: 0,
          marginVertical: 4,
          paddingHorizontal: 8,
          paddingVertical: 6,
          zIndex: 1,
        }}
      >
        <ImageComponent
          url={props.task.user?.profilePic}
          style={{
            width: 40,
            height: 40,
            marginRight: 8,
            borderRadius: '50%'
          }}
        />
        <View
          style={{
            flex: 1,
            marginLeft: 2,
            flexDirection: 'column'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: 4
            }}
          >
            <Text>
              {props.task.user.name || props.task.user.userName || props.task.igsid}
            </Text>
            <Text>
              ({props.task.user?.userName})
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Text>
              {props.task.page?.name}
            </Text>
          </View>
          <View
            style={{
              borderBottomColor: Colors(theme).aliceBlue,
              borderBottomWidth: 1,
              marginVertical: 8,
            }}
          />
          <View>
            <Text>{"Bot Message Count: " + props.task.botMessageCount}</Text>
            {props.task.lastBotMessageTime > 0 && (
              <Text>{"Last Message Time: " + new Date(props.task.lastBotMessageTime).toUTCString()}</Text>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ConversationCard;
