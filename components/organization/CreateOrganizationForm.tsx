import AppLayout from "@/layouts/app-layout";
import { View } from "@/components/Themed";
import { ScrollView } from "react-native";
import ImagePicker from "@/shared-uis/components/image-picker/ImagePicker";
import InputField from "@/components/ui/input/InputField";
import { useBreakPoints } from "@/hooks";
import Button from "../ui/button/Button";
import { useState } from "react";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { useTheme } from "@react-navigation/native";
import stylesFn from "@/styles/organization/CreateOrganizationForm.styles";

export interface OrganizationForm {
  name: string;
  description?: string;
  industry?: string;
  website?: string;
  image?: string;
}

interface CreateOrganizationFormProps {
  onSubmit: (data: OrganizationForm) => void;
}

const CreateOrganizationForm: React.FC<CreateOrganizationFormProps> = ({
  onSubmit,
}) => {
  const theme = useTheme();
  const styles = stylesFn(theme);
  const { lg } = useBreakPoints();
  const [image, setImage] = useState<string>("");
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
    if (!organizationFormData.name) {
      Toaster.error("Name is required");
      return;
    }
    onSubmit(organizationFormData);
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
              />
            </View>
            <InputField
              label="Name"
              placeholder="Enter organization name"
              value={organizationFormData.name}
              onChangeText={(value) => handleChange("name", value)}
            />
          </View>

          <InputField
            label="Description"
            placeholder="Enter organization description"
            multiline
            numberOfLines={4}
            value={organizationFormData.description}
            onChangeText={(value) => handleChange("description", value)}
          />

          <InputField
            label="Industry"
            placeholder="Enter industry"
            value={organizationFormData.industry}
            onChangeText={(value) => handleChange("industry", value)}
          />

          <InputField
            label="Website"
            placeholder="Enter website URL"
            value={organizationFormData.website}
            onChangeText={(value) => handleChange("website", value)}
          />

          <Button mode="contained" onPress={handleSubmit}>
            Submit
          </Button>
        </View>
      </ScrollView>
    </AppLayout>
  );
};

export default CreateOrganizationForm;
