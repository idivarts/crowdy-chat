// FacebookLoginButton.tsx

import axios from "axios";
import React from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { HttpService } from "@/services/httpService";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { Button } from "react-native-paper";

interface FacebookLoginButtonProps {
  onFacebookLogin: (userId: string | null) => void;
  isConnected?: boolean;
}

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({
  isConnected,
  onFacebookLogin,
}) => {
  const responseFacebook = (response: any) => {
    console.log("Success ", JSON.stringify(response));

    if (response.accessToken) {
      HttpService.login({
        accessToken: response.accessToken,
        userId: response.userID,
        name: response.name,
        id: response.userID,
      })
        .then((r) => {
          Toaster.success("Successfully Logged in");
          onFacebookLogin(response.id);
          console.log(r);
        })
        .catch((e) => {
          Toaster.error("Something went wrong");
          console.log(e);
        });
    } else {
      console.log(response);
      Toaster.error("Something went wrong");
      onFacebookLogin(null);
      // Handle login error
    }
  };

  return (
    <FacebookLogin
      appId="425629530178452"
      autoLoad={false}
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
        console.log("Fail ", e);
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
