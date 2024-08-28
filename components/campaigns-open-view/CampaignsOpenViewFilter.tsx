import Colors from "@/constants/Colors";
import { PageActionsService } from "@/services";
import { PageUnit } from "@/types/PageActions";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Pressable } from "react-native";
import { Icon, Menu } from "react-native-paper";

const CampaignsOpenViewFilter = () => {
  const { pageId } = useLocalSearchParams<any>()
  const [value, setValue] = useState(pageId ? pageId : "all")
  const [pages, setPages] = useState<PageUnit[]>([])
  const [menuVisible, setMenuVisible] = useState(false);

  const getAllPages = async () => {
    const res = await PageActionsService.getPages();
    setPages(res.otherPages);
  }

  useEffect(() => {
    setValue(pageId ? pageId : "all")
  }, [pageId])

  useEffect(() => {
    getAllPages()
  }, [])

  const onChangePage = (v: string) => {
    if (v == "all") {
      router.push("/campaign-detailed-view")
    } else {
      router.push(`/campaign-detailed-view/${v}`)
    }
    setMenuVisible(false);
  }

  if (pages.length === 0) {
    return null;
  }

  return (
    <Menu
      visible={menuVisible}
      onDismiss={() => setMenuVisible(false)}
      anchor={
        <Pressable onPress={() => setMenuVisible(true)}>
          <View
            style={{
              backgroundColor: Colors.regular.white,
              borderColor: Colors.regular.black,
              borderWidth: 1,
              paddingVertical: 13,
              paddingHorizontal: 20,
              borderRadius: 5,
              flexDirection: "row",
              gap: 8,
              marginTop: 12,
            }}
          >
            <Text>Select Page</Text>
            <Icon
              size={20}
              color={Colors.regular.black}
              source="chevron-down"
            />
          </View>
        </Pressable>
      }
      contentStyle={{
        paddingVertical: 0,
        borderRadius: 5,
        backgroundColor: Colors.regular.white,
      }}
    >
      <Menu.Item
        key="all-pages"
        onPress={() => onChangePage("all")}
        title={"All pages"}
      />
      {
        pages.map((page) => (
          <Menu.Item
            key={page.id}
            onPress={() => onChangePage(page.id)}
            title={page.name}
          />
        ))
      }
    </Menu>
  );
};

export default CampaignsOpenViewFilter;
