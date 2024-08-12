import ImagePicker from '@/components/ui/image-picker/ImagePicker';
import InputField from '@/components/ui/input/InputField';
import Colors from '@/constants/Colors';
import useBreakpoints from '@/hooks/use-breakpoints';
import AppLayout from '@/layouts/app-layout';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';

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
          <View>
            <Text style={styles.title}>{isEditable ? 'Edit Profile' : 'View Profile'}</Text>
          </View>
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
              width: '100%',
            }}
          >
            {isEditable ? (
              <>
                <Button title="Save" onPress={handleSave} />
                <Button title="Cancel" onPress={handleCancel} />
              </>
            ) : (
              <Button title="Edit" onPress={handleEdit} />
            )}
          </View>
        </View>
      </ScrollView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    padding: 20,
    paddingTop: 0,
    gap: 20,
    justifyContent: 'space-between',
    backgroundColor: Colors.regular.white,
    width: '100%',
  },
  row: {
    gap: 20,
  },
  image: {
    borderRadius: 75,
    width: 100,
    height: 100,
    borderColor: Colors.regular.primary,
    borderWidth: 5,
  },
  imagePickerContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    paddingBottom: 20,
  },
});

export default OrganizationProfile;
