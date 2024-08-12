import AppLayout from "@/layouts/app-layout";
import { View } from "@/components/Themed";
import { Button, ScrollView } from "react-native";
import styles from "@/styles/organization/CreateOrganizationForm.styles";
import ImagePicker from "@/components/ui/image-picker/ImagePicker";
import InputField from "@/components/ui/input/InputField";
import { useBreakPoints } from "@/hooks";

interface CreateOrganizationFormProps {
  onSubmit: () => void;
}

const CreateOrganizationForm: React.FC<CreateOrganizationFormProps> = ({
  onSubmit,
}) => {
  const { lg } = useBreakPoints();

  const onUploadImage = (image: string) => {
    console.log(image);
  }

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <AppLayout>
      <ScrollView
        contentContainerStyle={[
          styles.scrollViewContent,
          {
            paddingTop: lg ? 40 : 0,
          }
        ]}
      >
        <View
          style={[
            styles.container,
            {
              maxWidth: lg ? 1000 : '100%',
            }
          ]}
        >
          <View
            style={[
              styles.row,
              {
                flexDirection: lg ? 'row' : 'column',
                alignItems: lg ? 'center' : 'stretch',
              },
            ]}
          >
            <View style={styles.imagePickerContainer}>
              <ImagePicker onUploadImage={onUploadImage} />
            </View>
            <View style={styles.flex}>
              <InputField
                label="Name"
                placeholder="Enter organization name"
              />
            </View>
          </View>

          <InputField
            label="Description"
            placeholder="Enter organization description"
            multiline
            numberOfLines={4}
          />

          <InputField
            label="Industry"
            placeholder="Enter industry"
          />

          <InputField
            label="Website"
            placeholder="Enter website URL"
          />

          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </AppLayout>
  );
};

export default CreateOrganizationForm;
