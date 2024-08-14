import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';

import ImagePicker from '@/shared-uis/components/image-picker/ImagePicker';
import InputField from '@/components/ui/input/InputField';
import useBreakpoints from '@/hooks/use-breakpoints';
import AppLayout from '@/layouts/app-layout';
import styles from '@/styles/organization/OrganizationProfile.styles';
import Button from '@/components/ui/button/Button';

const OrganizationProfile: React.FC = () => {
  const organization = {
    name: 'Organization Name',
    image: 'https://via.placeholder.com/150',
    description: 'Description',
    industry: 'Industry',
    website: 'https://example.com',
  };

  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState(organization.name);
  const [image, setImage] = useState(organization.image);
  const [description, setDescription] = useState(organization.description);
  const [industry, setIndustry] = useState(organization.industry);
  const [website, setWebsite] = useState(organization.website);
  const { lg } = useBreakpoints();

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSave = () => {
    setIsEditable(false);
  };

  const onUploadImage = (image: string) => {
    setImage(image);
  };

  const handleCancel = () => {
    setIsEditable(false);
  };

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
                initialImage={image}
                onUploadImage={onUploadImage}
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
