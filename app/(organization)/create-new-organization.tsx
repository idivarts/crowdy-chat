
import CreateOrganizationForm, { OrganizationForm } from "@/components/organization/CreateOrganizationForm";
import { useOrganizationContext } from "@/contexts";

const CreateNewOrganization = () => {
  const {
    createOrganization,
  } = useOrganizationContext();

  const handleSubmit = async (data: OrganizationForm) => {
    await createOrganization(data);
  };

  return (
    <CreateOrganizationForm onSubmit={handleSubmit} />
  );
};

export default CreateNewOrganization;
