import axios from "axios";
import React, { useEffect, useState } from "react";
import Toaster from "@/shared-uis/components/toaster/Toaster";
import { ActivityIndicator } from "react-native-paper";
import { useOrganizationContext } from "@/contexts";
import { AuthApp } from "@/shared-libs/utilities/auth";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { View } from "react-native";
import Button from "../ui/button/Button";

interface FacebookLoginButtonProps {
  onFacebookLogin: (userId: string | null) => void;
  isConnected?: boolean;
}

WebBrowser.maybeCompleteAuthSession();

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({
  isConnected,
  onFacebookLogin,
}) => {
  const { currentOrganization } = useOrganizationContext();
  const FB_APP_ID = "425629530178452";
  const [isLoading, setIsLoading] = useState(false);

  const handleFacebookSignIn = async () => {
    await promptAsync();
  };

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: FB_APP_ID,
      redirectUri: AuthSession.makeRedirectUri({
        native: `fb${FB_APP_ID}://authorize`,
      }),
      responseType: AuthSession.ResponseType.Token,
      scopes: [
        "public_profile",
        "email",
        "pages_show_list",
        "pages_read_engagement",
        "instagram_basic",
        "instagram_manage_messages",
      ],
    },
    { authorizationEndpoint: "https://www.facebook.com/v10.0/dialog/oauth" }
  );

  const fetchGraphAPI = async (accessToken: string) => {
    try {
      const graphAPIResponse = await axios.get(
        `https://graph.facebook.com/v21.0/me`,
        {
          params: {
            fields: "accounts,name,id",
            access_token: accessToken,
          },
        }
      );
      return graphAPIResponse.data;
    } catch (error) {
      console.error("Error fetching data from Graph API:", error);
      throw error;
    }
  };

  const responseFacebook = async (response: any) => {
    const user = await AuthApp.currentUser?.getIdToken();
    if (response.access_token) {
      setIsLoading(true); // Start the loader
      const graphData = await fetchGraphAPI(response.access_token)
        .then(async (responseFromGraph) => {
          await axios.post(
            "https://be.crowdy.chat/api/v1/sources/facebook",
            {
              accounts: responseFromGraph.accounts,
              name: responseFromGraph.name,
              id: responseFromGraph.id,
              expiresIn: Number(response.expires_in),
              accessToken: response.access_token,
              signedRequest: response.signedRequest,
              graphDomain: response.graphDomain,
              data_access_expiration_time: Number(
                response.data_access_expiration_time
              ),
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
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      Toaster.error("Something went wrong");
      onFacebookLogin(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      responseFacebook(response.params);
    }
  }, [response]);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          style={{ marginVertical: 10 }}
        />
      ) : (
        <Button
          icon="facebook"
          mode="contained"
          style={{ marginVertical: 10, paddingVertical: 5 }}
          onPress={handleFacebookSignIn}
        >
          Connect with Facebook
        </Button>
      )}
    </View>
  );
};

export default FacebookLoginButton;
