import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import Colors from "@/constants/Colors";
import AppLayout from "@/layouts/app-layout";
import Button from "@/components/ui/button/Button";
import DraggableFlatList, { DragEndParams, RenderItemParams, ScaleDecorator } from "react-native-draggable-flatlist";
import { useRouter } from "expo-router";
import Haptics from "expo-haptics";

type CampaignCardData = {
  id: number;
  name: string;
  description: string;
  position?: number;
};

type CampaignData = {
  id: number;
  step: string;
  cards: CampaignCardData[];
};

const ListItem = ({
  item,
  drag,
  isActive,
}: RenderItemParams<CampaignCardData>) => {
  const router = useRouter();

  const openChatModal = () => {
    console.log("Open chat modal");
  };

  return (
    <ScaleDecorator>
      <Pressable
        onLongPress={drag}
        onPress={openChatModal}
        disabled={isActive}
        style={[
          {
            // transform: [{ rotate: isActive ? "-5deg" : "0deg" }],
            opacity: isActive ? 0.7 : 1,
          },
        ]}
      >
        <View
          style={styles.card}
          key={item.id}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>{item.name}</Text>
            <Text style={styles.cardText}>{item.description}</Text>
          </View>
        </View>
      </Pressable>
    </ScaleDecorator>
  );
};

const CampaignsBoard: React.FC = () => {
  const [campaigns, setCampaigns] = useState<CampaignData[]>([
    {
      id: 1,
      step: 'Initial',
      cards: [
        {
          id: 1,
          name: "Campaign 1",
          description: "Campaign 1 description",
          position: 0,
        },
        {
          id: 2,
          name: "Campaign 2",
          description: "Campaign 2 description",
          position: 1,
        },
        {
          id: 3,
          name: "Campaign 3",
          description: "Campaign 3 description",
          position: 2,
        },
      ],
    },
    {
      id: 2,
      step: 'Take action',
      cards: [
        {
          id: 4,
          name: "Campaign 4",
          description: "Campaign 4 description",
          position: 0,
        },
        {
          id: 5,
          name: "Campaign 5",
          description: "Campaign 5 description",
          position: 1,
        },
      ],
    },
    {
      id: 3,
      step: 'Data collection',
      cards: [
        {
          id: 6,
          name: "Campaign 6",
          description: "Campaign 6 description",
          position: 0,
        },
      ],
    },
  ]);

  const onCardDragBegin = () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

  const onCardDragEnd = (params: DragEndParams<CampaignCardData>, campaign: CampaignData) => {
    const { data, from, to } = params;
    console.log(params);

    if (from !== to) {
      const updatedCampaigns = campaigns.map((c) => {
        if (c.id === campaign.id) {
          return {
            ...c,
            cards: data,
          };
        }

        return c;
      });

      setCampaigns(updatedCampaigns);
    }
  };

  const onPlaceholderIndexChange = () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

  return (
    <AppLayout>
      <View style={styles.container}>
        {
          campaigns.map((campaign, index) => {
            return (
              <View key={index} style={styles.innerContainer}>
                <Text style={styles.innerContainerHeaderText}>{campaign.step}</Text>
                <DraggableFlatList
                  data={campaign.cards}
                  renderItem={ListItem}
                  keyExtractor={(item: CampaignCardData) => `draggable-item-${campaign.id}-${item.id}`}
                  style={{
                    overflow: "visible",
                  }}
                  containerStyle={{
                    flex: 1,
                  }}
                  contentContainerStyle={{
                    gap: 20,
                  }}
                  onDragEnd={(params: DragEndParams<CampaignCardData>) => onCardDragEnd(params, campaign)}
                // onDragBegin={onCardDragBegin}
                // onPlaceholderIndexChange={onPlaceholderIndexChange}
                />
                <View style={styles.innerContainerFooter}>
                  <Button
                    mode="contained"
                    onPress={() => { }}
                  >
                    Add a card
                  </Button>
                </View>
              </View>
            );
          })
        }
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
    gap: 20,
    backgroundColor: Colors.regular.primary,
  },
  innerContainer: {
    width: 320,
    borderRadius: 10,
    padding: 20,
    gap: 20,
    backgroundColor: Colors.regular.white,
  },
  innerContainerHeaderText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: Colors.regular.black,
  },
  innerContainerBody: {
    overflow: "visible",
    gap: 20,
    flex: 1,
  },
  innerContainerFooter: {
  },
  card: {
    alignItems: "center",
    backgroundColor: Colors.regular.aliceBlue,
    borderRadius: 10,
    cursor: "pointer",
    height: 120,
    justifyContent: "center",
    padding: 20,
    width: "100%",
  },
  cardContent: {
  },
  cardText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.regular.black,
  },
});

export default CampaignsBoard;
