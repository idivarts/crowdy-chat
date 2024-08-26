
import CreateOrganizationForm from "@/components/organization/CreateOrganizationForm";
import { IMembers } from "@/shared-libs/firestore/crowdy-chat/models/members";
import { IOrganizations } from "@/shared-libs/firestore/crowdy-chat/models/organizations";
import { AuthApp } from "@/shared-libs/utilities/auth";
import { FirestoreDB } from "@/shared-libs/utilities/firestore";
import { router } from "expo-router";
import { signInAnonymously } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const CreateNewOrganization = () => {
  const handleSubmit = async () => {
    let authUser = await signInAnonymously(AuthApp)
    const colRef = collection(FirestoreDB, "organizations")
    let orgData: IOrganizations = {
      name: "",
      createdAt: Date.now(),
      createdBy: authUser.user.uid
    }
    let orgDoc = await addDoc(colRef, orgData)

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

    let memberColRef = collection(FirestoreDB, "organizations", orgDoc.id, "members")
    let memberDocRef = doc(memberColRef, authUser.user.uid)
    let memberData: IMembers = {
      userId: authUser.user.uid,
      organizationId: orgDoc.id,
      permissions: {
        admin: true
      }
    }
    await setDoc(memberDocRef, memberData)
    // parent id -> authUser.user.uid

    router.push("/(main)/organization-profile");
  };

  return (
    <CreateOrganizationForm onSubmit={handleSubmit} />
  );
};

export default CreateNewOrganization;
