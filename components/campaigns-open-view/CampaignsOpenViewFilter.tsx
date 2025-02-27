import Colors from "@/constants/Colors";
import { useOrganizationContext } from "@/contexts";
import SourceCampaignService from "@/services/sources-campaign.service";
import { ISources } from "@/shared-libs/firestore/crowdy-chat/models/sources";
import { AuthApp } from "@/utils/auth";
import { FirestoreDB } from "@/utils/firestore";
import { useTheme } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  TouchableOpacity
} from "react-native";
import { Icon, Menu } from "react-native-paper";
import { Text, View } from "../Themed";

const CampaignsOpenViewFilter = (props: any) => {
  const theme = useTheme();
  const { pageID } = useLocalSearchParams<any>();
  const [value, setValue] = useState(pageID ? pageID : "all");
  const [pages, setPages] = useState<ISources[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [loadingSourceId, setLoadingSourceId] = useState<string | null>(null);
  const campaignId = props.campaignId;
  const { currentOrganization } = useOrganizationContext();

  const getAllPages = async () => {
    if (!currentOrganization) return;
    const sourcesRef = collection(
      FirestoreDB,
      "organizations",
      currentOrganization?.id,
      "sources"
    );
    const sourceData = await getDocs(sourcesRef);
    let sourceList = sourceData.docs.map((doc) => doc.data() as ISources);

    if (pageID) {
      sourceList = sourceList.map((result: any) => ({
        ...result,
        isConnected: result.id === pageID,
      }));
    }

    setPages(sourceList);
  };

  useEffect(() => {
    setValue(pageID ? pageID : "all");
  }, [pageID]);

  useEffect(() => {
    getAllPages();
  }, []);

  const onChangePage = (v: string) => {
    setValue(v);

    if (v === "all") {
      router.push({
        pathname: "/campaign-detailed-view",
        params: { campaignId },
      });
    } else {
      router.push({
        pathname: `/campaign-detailed-view`,
        params: {
          pageID: v,
          campaignId,
        },
      });
    }

    setMenuVisible(false);
  };

  const connectSource = async (sourceId: string) => {
    const user = await AuthApp.currentUser?.getIdToken();
    if (!user || !currentOrganization) return;
    setLoadingSourceId(sourceId);
    await SourceCampaignService.connectSource({
      sourceId,
      campaignId,
      organizationId: currentOrganization?.id,
      firebaseId: user,
    }).then(() => {
      getAllPages();
      setLoadingSourceId(null);
    });
  };

  const disconnectSource = async (sourceId: string) => {
    const user = await AuthApp.currentUser?.getIdToken();
    if (!user || !currentOrganization) return;
    setLoadingSourceId(sourceId);
    await SourceCampaignService.disconnectSource({
      sourceId,
      campaignId,
      organizationId: currentOrganization?.id,
      firebaseId: user,
    }).then(() => {
      getAllPages();
      setLoadingSourceId(null);
    });
  };

  if (pages.length === 0) {
    return null;
  }

  const selectedPageName =
    value === "all"
      ? "Select Source"
      : pages.find((page) => page.id === value)?.name || "Select Page";

  return (
    <Menu
      visible={menuVisible}
      onDismiss={() => setMenuVisible(false)}
      anchor={
        <Pressable onPress={() => setMenuVisible(true)}>
          <View
            style={{
              backgroundColor: Colors(theme).background,
              borderColor: Colors(theme).border,
              borderWidth: 1,
              paddingVertical: 13,
              paddingHorizontal: 20,
              borderRadius: 4,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text>{selectedPageName}</Text>
            <Icon size={20} color={Colors(theme).text} source="chevron-down" />
          </View>
        </Pressable>
      }
      contentStyle={{
        paddingVertical: 0,
        borderRadius: 5,
        backgroundColor: Colors(theme).background,
      }}
    >
      {pages.map((page) => (
        <View
          key={page.id}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: Colors(theme).background,
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              page.campaignId && page.campaignId === campaignId
                ? disconnectSource(page.id)
                : connectSource(page.id)
            }
          >
            {loadingSourceId === page.id ? (
              <ActivityIndicator size="small" color={Colors(theme).primary} />
            ) : (
              <Icon
                size={20}
                color={Colors(theme).text}
                source={
                  page.campaignId && page.campaignId === campaignId
                    ? "link-off"
                    : "plus"
                }
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              page.campaignId && page.campaignId === campaignId
                ? onChangePage(page.id)
                : alert("This page is not connected to this campaign")
            }
          >
            <Menu.Item
              key={page.id}
              title={page.name + " (" + page.sourceType + ")"}
            />
          </TouchableOpacity>
        </View>
      ))}
    </Menu>
  );
};

export default CampaignsOpenViewFilter;
