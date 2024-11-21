// FacebookLoginButton.tsx

import axios from "axios";
import React from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { HttpService } from "@/services/httpService";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { Button } from "react-native-paper";
import { useOrganizationContext } from "@/contexts";
import { AuthApp } from "@/shared-libs/utilities/auth";

interface FacebookLoginButtonProps {
  onFacebookLogin: (userId: string | null) => void;
  isConnected?: boolean;
}

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({
  isConnected,
  onFacebookLogin,
}) => {
  const { currentOrganization } = useOrganizationContext();

  const responseFacebook = async (response: any) => {
    const user = await AuthApp.currentUser?.getIdToken();
    if (response.accessToken) {
      HttpService.login({
        accessToken: response.accessToken,
        userId: response.userID,
        name: response.name,
        id: response.userID,
      })
        .then(async (r) => {
          const responseToSend = r.data.user;

          await axios.post(
            "https://be.crowdy.chat/api/v1/sources/facebook",
            {
              accounts: responseToSend.accounts,
              name: responseToSend.name,
              id: responseToSend.id,
              userID: responseToSend.userID,
              expiresIn: responseToSend.expiresIn,
              accessToken: responseToSend.accessToken,
              signedRequest: responseToSend.signedRequest,
              graphDomain: responseToSend.graphDomain,
              data_access_expiration_time:
                responseToSend.data_access_expiration_time,
            },
            {
              headers: {
                Authorization: `Bearer ${user}`,
                "X-Organization-ID": currentOrganization?.id,
              },
            }
          );
          Toaster.success("Successfully Logged in");
          onFacebookLogin(response.id);
        })
        .catch((e) => {
          Toaster.error("Something went wrong");
        });
    } else {
      Toaster.error("Something went wrong");
      onFacebookLogin(null);
      // Handle login error
    }
  };

  return (
    <FacebookLogin
      appId="425629530178452"
      autoLoad={true}
      fields="accounts{access_token,id,instagram_business_account,name},name,id"
      scope="read_insights,business_management,pages_show_list,pages_messaging,instagram_basic,instagram_manage_insights,instagram_content_publish,instagram_manage_messages,pages_read_engagement,pages_manage_metadata"
      onSuccess={responseFacebook}
      render={({ onClick, logout }) => (
        <Button
          icon="facebook"
          mode="contained"
          style={{ marginVertical: 10, paddingVertical: 5 }}
          onPress={onClick}
        >
          Connect with Facebook
        </Button>
      )}
      onFail={(e) => {
        Toaster.error("Something went wrong");
        onFacebookLogin(null);
      }}

      //   containerStyle={{
      //     height: "100px",
      //     width: "100%",
      //     borderWidth: 0,
      //     backgroundColor: "#1976D2",
      //   }}
    />
  );
};

export default FacebookLoginButton;
