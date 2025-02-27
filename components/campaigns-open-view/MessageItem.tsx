import Colors from "@/constants/Colors";
import { MessageObject } from "@/types/Message";
import { useTheme } from "@react-navigation/native";
import { ResizeMode, Video } from "expo-av";
import { useRef, useState } from "react";
import { Image } from "react-native";
import { Text, View } from "../Themed";

interface MessageItemProps {
  igsid: string;
  index: number;
  messages: MessageObject[];
  msg: MessageObject;
  theme: any;
  shouldRenderData: (
    ind: any,
    prevMsg: MessageObject,
    msg: MessageObject
  ) => boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({
  igsid,
  index,
  messages,
  msg,
  theme,
  shouldRenderData,
}) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <View
      key={msg.id}
      style={[
        {
          marginBottom: 2,
          backgroundColor: Colors(theme).background,
        },
      ]}
    >
      {msg.attachments?.data?.map((v) => {
        return (
          <View>
            {v.image_data && (
              <Image
                src={v.image_data.url}
                style={{ width: 300, height: "auto" }}
              />
            )}
            {v.video_data && (
              <Video
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                ref={video}
                style={{
                  height: 200,
                  width: 320,
                }}
                source={{
                  uri: v.video_data.url,
                }}
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
              />
            )}
          </View>
        );
      })}
      {msg.message && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: msg.from.id != igsid ? "flex-end" : "flex-start",
            flexWrap: "wrap",
            backgroundColor: Colors(theme).background,
          }}
        >
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              borderRadius: 10,
              backgroundColor:
                msg.from.id != igsid
                  ? Colors(theme).primary
                  : Colors(theme).platinum,
              maxWidth: "100%",
            }}
          >
            <Text
              style={{
                color:
                  msg.from.id != igsid
                    ? Colors(theme).white
                    : Colors(theme).black,
                lineHeight: 24,
                textAlign: msg.from.id != igsid ? "left" : "right",
              }}
            >
              {msg.message}
            </Text>
          </View>
        </View>
      )}
      {shouldRenderData(
        index,
        // @ts-ignore
        index > 0 ? messages[index - 1] : undefined,
        msg
      ) && (
        <View
          style={{
            marginTop: 5,
            marginBottom: 5,
            flexDirection: "row",
            justifyContent: msg.from.id != igsid ? "flex-end" : "flex-start",
            flexWrap: "wrap",
            backgroundColor: Colors(theme).background,
          }}
        >
          <View
            style={{
              maxWidth: "100%",
              backgroundColor: Colors(theme).background,
            }}
          >
            <Text
              style={{
                color: "#999",
                fontSize: 12,
              }}
            >
              {new Date(msg.created_time).toLocaleString()}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default MessageItem;
