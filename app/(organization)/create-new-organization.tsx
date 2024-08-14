
import CreateOrganizationForm from "@/components/organization/CreateOrganizationForm";
import { router } from "expo-router";

const CreateNewOrganization = () => {
  const handleSubmit = () => {
    // Validate form fields
    // Handle form submission
    router.push("/(main)/organization-profile");
  };

  return (
    <CreateOrganizationForm onSubmit={handleSubmit} />
  );
};

export default CreateNewOrganization;
