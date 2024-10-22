import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import ImagePicker from '@/shared-uis/components/image-picker/ImagePicker';
import InputField from '@/components/ui/input/InputField';
import useBreakpoints from '@/hooks/use-breakpoints';
import AppLayout from '@/layouts/app-layout';
import Button from '@/components/ui/button/Button';
import { useOrganizationContext } from '@/contexts';
import { ActivityIndicator } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import stylesFn from '@/styles/organization/OrganizationProfile.styles';
import { View } from '@/components/Themed';

const OrganizationProfile: React.FC = () => {
  const theme = useTheme();
  const styles = stylesFn(theme);
  const [isEditable, setIsEditable] = useState(false);
  const {
    currentOrganization: organization,
    updateOrganization,
  } = useOrganizationContext();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [website, setWebsite] = useState('');
  const { lg } = useBreakpoints();

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSave = async () => {
    if (!organization) {
      return;
    }

    updateOrganization(organization.id, {
      name,
      image,
      description,
      industry,
      website,
    }).then(() => {
      setIsEditable(false);
    });
  };

  const onUploadImage = (image: string) => {
    setImage(image);
  };

  const handleCancel = () => {
    setIsEditable(false);
  };

  useEffect(() => {
    setName(organization?.name || '');
    setImage(organization?.image || '');
    setDescription(organization?.description || '');
    setIndustry(organization?.industry || '');
    setWebsite(organization?.website || '');
  }, [organization]);

  if (!organization) {
    return (
      <AppLayout>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator />
        </View>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <ScrollView
        contentContainerStyle={[
          styles.scrollViewContent,
          {
            paddingTop: lg ? 40 : 20,
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
            style={styles.row}
          >
            <View style={styles.imagePickerContainer}>
              <ImagePicker
                editable={isEditable}
                image={image}
                onUploadImage={onUploadImage}
                setImage={setImage}
              />
            </View>

            <InputField
              label="Name"
              editable={isEditable}
              value={name}
              onChangeText={setName}
              placeholder="Enter organization name"
            />

            <InputField
              label="Description"
              value={description}
              editable={isEditable}
              onChangeText={setDescription}
              placeholder="Enter organization description"
              multiline
              numberOfLines={4}
            />

            <InputField
              label="Industry"
              value={industry}
              editable={isEditable}
              onChangeText={setIndustry}
              placeholder="Enter your industry"
            />

            <InputField
              label="Website"
              editable={isEditable}
              value={website}
              onChangeText={setWebsite}
              placeholder="Enter your website"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 16,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              width: '100%',
            }}
          >
            {isEditable ? (
              <>
                <Button
                  mode="contained"
                  onPress={handleSave}
                >
                  Save
                </Button>
                <Button
                  mode="contained"
                  onPress={handleCancel}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                mode='contained'
                onPress={handleEdit}
              >
                Edit
              </Button>
            )}
          </View>
        </View>
      </ScrollView>
    </AppLayout>
  );
};



export default OrganizationProfile;
