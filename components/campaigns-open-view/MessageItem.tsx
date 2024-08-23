import { MessageObject } from "@/types/Message";
import { Text, View } from "react-native";

interface MessageItemProps {
  igsid: string;
  index: number;
  messages: MessageObject[];
  msg: MessageObject;
  shouldRenderData: (ind: any, prevMsg: MessageObject, msg: MessageObject) => boolean;
};

const MessageItem: React.FC<MessageItemProps> = ({
  igsid,
  index,
  messages,
  msg,
  shouldRenderData,
}) => {
  return (
    <View
      key={msg.id}
      style={[{
        marginBottom: 2,
      }]}
    >
      {/* {msg.attachments?.data?.map(v => {
        return <View>
          {v.image_data && <img src={v.image_data.url} style={{ width: "300px", height: "auto" }} />}
          {v.video_data && <video src={v.image_data!.url} style={{ width: "300px", height: "auto" }} />}
        </View>
      })} */}
      {
        msg.message && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: msg.from.id != igsid ? 'flex-end' : 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 20,
                borderRadius: 10,
                backgroundColor: msg.from.id != igsid ? "#007bff" : "#ccc",
                maxWidth: "100%",
              }}
            >
              <Text
                style={{
                  color: msg.from.id != igsid ? "#fff" : "#000",
                  lineHeight: 24,
                  textAlign: msg.from.id != igsid ? 'left' : 'right',
                }}
              >
                {msg.message}
              </Text>
            </View>
          </View>
        )
      }
      {
        // @ts-ignore
        shouldRenderData(index, index > 0 ? messages[index - 1] : undefined, msg) &&
        <View
          style={{
            marginTop: 5,
            marginBottom: 5,
            flexDirection: 'row',
            justifyContent: msg.from.id != igsid ? 'flex-end' : 'flex-start',
            flexWrap: 'wrap',
          }}
        >
          <View
            style={{
              maxWidth: "100%",
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
      }
    </View>
  );
};

export default MessageItem;
