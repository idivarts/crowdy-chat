
import CreateOrganizationForm, { OrganizationForm } from "@/components/organization/CreateOrganizationForm";
import { IOrganizations } from "@/shared-libs/firestore/crowdy-chat/models/organizations";
import { AuthApp } from "@/shared-libs/utilities/auth";
import { FirestoreDB } from "@/shared-libs/utilities/firestore";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { router } from "expo-router";
import { signInAnonymously } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const CreateNewOrganization = () => {
  const handleSubmit = async (data: OrganizationForm) => {
    let authUser = await signInAnonymously(AuthApp)
    const colRef = collection(FirestoreDB, "organizations")
    let orgData: IOrganizations = {
      name: data.name,
      createdAt: Date.now(),
      createdBy: authUser.user.uid,
      description: data.description,
      industry: data.industry,
      website: data.website,
      image: data.image,
    }
    let orgDoc = await addDoc(colRef, orgData)

    if (!orgDoc.id) {
      Toaster.error("Organization creation failed");
    } else {
      Toaster.success("Organization created successfully");
      router.push("/(main)/organization-profile");
    }

    // let memberColRef = collection(FirestoreDB, "organizations", orgDoc.id, "members")
    // let memberData: IMembers = {
    //   userId: authUser.user.uid,
    //   organizationId: orgDoc.id,
    //   permissions: {
    //     admin: true
    //   }
    // }
    // let memberDoc = await addDoc(memberColRef, memberData)
    // memberDoc.id //auto-generated

    // let memberColRef = collection(FirestoreDB, "organizations", orgDoc.id, "members")
    // let memberDocRef = doc(memberColRef, authUser.user.uid)
    // let memberData: IMembers = {
    //   userId: authUser.user.uid,
    //   organizationId: orgDoc.id,
    //   permissions: {
    //     admin: true
    //   }
    // }
    // await setDoc(memberDocRef, memberData)
    // parent id -> authUser.user.uid
  };

  return (
    <CreateOrganizationForm onSubmit={handleSubmit} />
  );
};

export default CreateNewOrganization;
