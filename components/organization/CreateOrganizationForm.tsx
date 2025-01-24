import { View } from "@/components/Themed";
import { useBreakPoints } from "@/hooks";
import AppLayout from "@/layouts/app-layout";
import ImagePicker from "@/shared-uis/components/image-picker/ImagePicker";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import stylesFn from "@/styles/organization/CreateOrganizationForm.styles";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { Platform, ScrollView } from "react-native";
import Button from "../ui/button/Button";
import TextInput from "../ui/text-input/TextInput";

export interface OrganizationForm {
  name: string;
  description?: string;
  industry?: string;
  website?: string;
  image?: string;
}

interface CreateOrganizationFormProps {
  onSubmit: (data: OrganizationForm) => Promise<void>;
}

const CreateOrganizationForm: React.FC<CreateOrganizationFormProps> = ({
  onSubmit,
}) => {
  const theme = useTheme();
  const styles = stylesFn(theme);
  const { lg } = useBreakPoints();
  const [image, setImage] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [organizationFormData, setOrganizationFormData] =
    useState<OrganizationForm>({
      name: "",
      description: "",
      industry: "",
      website: "",
    });

  const handleChange = (key: keyof OrganizationForm, value: string) => {
    setOrganizationFormData({
      ...organizationFormData,
      [key]: value,
      image,
    });
  };

  const onUploadImage = (imageUrl: string) => {
    setImage(imageUrl);
  };

  const handleSubmit = () => {
    setSubmitting(true);

    if (!organizationFormData.name) {
      Toaster.error("Name is required");
      setSubmitting(false);
      return;
    }

    onSubmit(organizationFormData).then(() => {
      setSubmitting(false);
    });
  };

  return (
    <AppLayout>
      <ScrollView
        contentContainerStyle={[
          styles.scrollViewContent,
          {
            paddingTop: lg ? 40 : 0,
          },
        ]}
      >
        <View
          style={[
            styles.container,
            {
              maxWidth: lg ? 1000 : "100%",
            },
          ]}
        >
          <View
            style={[
              styles.row,
              {
                flexDirection: lg ? "row" : "column",
                alignItems: lg ? "center" : "stretch",
              },
            ]}
          >
            <View style={styles.imagePickerContainer}>
              <ImagePicker
                image={image}
                onUploadImage={onUploadImage}
                setImage={setImage}
                theme={theme}
              />
            </View>
            <TextInput
              containerStyle={{
                flex: Platform.select({
                  web: 1,
                  default: 0,
                }),
              }}
              label="Name"
              placeholder="Enter organization name"
              value={organizationFormData.name}
              onChangeText={(value) => handleChange("name", value)}
            />
          </View>

          <TextInput
            label="Description"
            placeholder="Enter organization description"
            multiline
            numberOfLines={4}
            value={organizationFormData.description}
            onChangeText={(value) => handleChange("description", value)}
          />

          <TextInput
            label="Industry"
            placeholder="Enter industry"
            value={organizationFormData.industry}
            onChangeText={(value) => handleChange("industry", value)}
          />

          <TextInput
            label="Website"
            placeholder="Enter website URL"
            value={organizationFormData.website}
            onChangeText={(value) => handleChange("website", value)}
          />

          <Button
            loading={submitting}
            mode="contained"
            onPress={handleSubmit}
            style={{
              marginTop: 6,
            }}
          >
            Submit
          </Button>
        </View>
      </ScrollView>
    </AppLayout>
  );
};

export default CreateOrganizationForm;
